/**
 * Human Takeover / Escalation state-transition service (Build 225).
 *
 * Pure, dependency-injected, unit-testable without a live Supabase connection: every function takes
 * the supabase client as an argument (mockable) plus an explicit `schemaReady` gate. It performs NO
 * provider calls, sends NO SMS, reads NO credentials, and contacts no roofer or homeowner.
 *
 * SCHEMA-SAFETY GATE: the human-takeover columns (`needs_human_takeover`, `human_takeover_at`,
 * `human_takeover_by`, `human_takeover_notes`, `human_takeover_resolved_at`) are NOT applied to the
 * live schema yet. Until the operator confirms the Build 225 migration is applied and sets
 * HUMAN_TAKEOVER_SCHEMA_READY=true, every write/read path here returns `schema_not_applied` WITHOUT
 * issuing any query that references a not-yet-existing column. This guarantees no production runtime
 * failure from a missing column.
 *
 * Ownership: callers pass the authenticated rooferId (resolved from the dashboard token in the route);
 * every transition re-verifies the lead belongs to that roofer and returns lead_not_found (404)
 * otherwise — existence is not leaked across tenants.
 */

export type LeadTakeoverReason =
  | 'applied'
  | 'already_in_takeover'
  | 'not_in_takeover'
  | 'schema_not_applied'
  | 'lead_not_found'
  | 'missing_required_field'
  | 'lookup_error'
  | 'write_error';

export interface PendingReviewLead {
  id: string;
  homeownerName: string;
  phone: string; // masked
  sourcePath: string;
  sourceDetail: string;
  issueDescription: string;
  urgency: string;
  status: string;
  needsHumanTakeover: boolean;
  takenOverAt: string | null;
  takenOverBy: string | null;
  notes: string | null;
  resolvedAt: string | null;
}

export interface LeadTakeoverResult {
  ok: boolean;
  httpStatus: number;
  reason: LeadTakeoverReason;
  schemaReady: boolean;
  noLiveSms: true;
  noProviderCall: true;
  lead: PendingReviewLead | null;
}

export interface PendingReviewResult {
  ok: boolean;
  httpStatus: number;
  reason: 'ok' | 'schema_not_applied' | 'missing_required_field' | 'lookup_error';
  schemaReady: boolean;
  count: number;
  pendingReview: PendingReviewLead[];
  noLiveSms: true;
  noProviderCall: true;
}

export interface LeadTakeoverInput {
  supabase: any;
  schemaReady: boolean;
  rooferId: string;
  leadId: string;
  notes?: string | null;
  now?: string | Date;
}

export interface PendingReviewInput {
  supabase: any;
  schemaReady: boolean;
  rooferId: string;
}

/** Reads the documented readiness gate. Default false: all write/read paths stay inert pre-schema. */
export function isHumanTakeoverSchemaReady(
  env?: Record<string, string | undefined>
): boolean {
  const source = env || (globalThis as any).process?.env || {};
  return source.HUMAN_TAKEOVER_SCHEMA_READY === 'true';
}

function maskPhone(phone: string | null | undefined): string {
  if (!phone) return '(***) ***-0000';
  const digits = String(phone).replace(/\D/g, '');
  const last4 = digits.slice(-4) || '0000';
  return `(***) ***-${last4}`;
}

function shapeLead(row: any): PendingReviewLead {
  return {
    id: row.id,
    homeownerName: row.homeowner_name || 'Unknown homeowner',
    phone: maskPhone(row.phone),
    sourcePath: row.source_path || 'unknown',
    sourceDetail: row.source_detail || 'unknown',
    issueDescription: row.issue_description || '',
    urgency: row.urgency || 'normal',
    status: row.status || 'unknown',
    needsHumanTakeover: row.needs_human_takeover === true,
    takenOverAt: row.human_takeover_at || null,
    takenOverBy: row.human_takeover_by || null,
    notes: row.human_takeover_notes || null,
    resolvedAt: row.human_takeover_resolved_at || null
  };
}

function nowIso(now?: string | Date): string {
  return new Date(now || new Date()).toISOString();
}

function decision(
  ok: boolean,
  httpStatus: number,
  reason: LeadTakeoverReason,
  schemaReady: boolean,
  lead: PendingReviewLead | null = null
): LeadTakeoverResult {
  return {
    ok,
    httpStatus,
    reason,
    schemaReady,
    noLiveSms: true,
    noProviderCall: true,
    lead
  };
}

const OWNERSHIP_COLUMNS =
  'id, roofer_id, homeowner_name, phone, source_path, source_detail, issue_description, urgency, status, needs_human_takeover, human_takeover_at, human_takeover_by, human_takeover_notes, human_takeover_resolved_at';

/** Best-effort append to the existing workflow_events audit table. Never throws into the caller. */
async function appendWorkflowEvent(
  supabase: any,
  event: { roofer_id: string; lead_id: string; event_type: string; metadata: Record<string, unknown> }
): Promise<void> {
  try {
    await supabase.from('workflow_events').insert(event);
  } catch {
    // Audit is best-effort; a failed event insert must not roll back the takeover state change.
  }
}

async function loadOwnedLead(
  supabase: any,
  rooferId: string,
  leadId: string
): Promise<{ row: any | null; lookupError: boolean }> {
  const { data, error } = await supabase
    .from('leads')
    .select(OWNERSHIP_COLUMNS)
    .eq('id', leadId)
    .maybeSingle();

  if (error) return { row: null, lookupError: true };
  if (!data || data.roofer_id !== rooferId) return { row: null, lookupError: false };
  return { row: data, lookupError: false };
}

/**
 * Take a lead over for manual handling. Sets the pause flag + who/when. Idempotent: re-taking an
 * already-active lead is a no-op (original taken-over-at / by preserved), reported as
 * already_in_takeover with ok=true.
 */
export async function takeOverLead(input: LeadTakeoverInput): Promise<LeadTakeoverResult> {
  const { supabase, schemaReady, rooferId, leadId, notes } = input;

  if (!schemaReady) return decision(false, 503, 'schema_not_applied', false);
  if (!supabase || !rooferId || !leadId) return decision(false, 400, 'missing_required_field', schemaReady);

  const { row, lookupError } = await loadOwnedLead(supabase, rooferId, leadId);
  if (lookupError) return decision(false, 500, 'lookup_error', schemaReady);
  if (!row) return decision(false, 404, 'lead_not_found', schemaReady);

  if (row.needs_human_takeover === true) {
    return decision(true, 200, 'already_in_takeover', schemaReady, shapeLead(row));
  }

  const update = {
    needs_human_takeover: true,
    human_takeover_at: nowIso(input.now),
    human_takeover_by: rooferId,
    human_takeover_notes: notes ?? null,
    human_takeover_resolved_at: null
  };

  const { data: updated, error: writeError } = await supabase
    .from('leads')
    .update(update)
    .eq('id', leadId)
    .eq('roofer_id', rooferId)
    .select(OWNERSHIP_COLUMNS)
    .maybeSingle();

  if (writeError) return decision(false, 500, 'write_error', schemaReady);

  await appendWorkflowEvent(supabase, {
    roofer_id: rooferId,
    lead_id: leadId,
    event_type: 'human_takeover_started',
    metadata: { notes: notes ?? null, taken_over_by: rooferId }
  });

  return decision(true, 200, 'applied', schemaReady, shapeLead(updated || { ...row, ...update }));
}

/**
 * Resolve an active takeover. `resolution` distinguishes a plain Release (resume automation) from a
 * Mark Handled (operator finished). Both clear the pause flag and stamp resolved-at. Idempotent:
 * resolving a lead that is not in takeover is a no-op reported as not_in_takeover with ok=true.
 */
export async function releaseLead(
  input: LeadTakeoverInput & { resolution?: 'released' | 'resolved' }
): Promise<LeadTakeoverResult> {
  const { supabase, schemaReady, rooferId, leadId, notes } = input;
  const resolution = input.resolution || 'released';

  if (!schemaReady) return decision(false, 503, 'schema_not_applied', false);
  if (!supabase || !rooferId || !leadId) return decision(false, 400, 'missing_required_field', schemaReady);

  const { row, lookupError } = await loadOwnedLead(supabase, rooferId, leadId);
  if (lookupError) return decision(false, 500, 'lookup_error', schemaReady);
  if (!row) return decision(false, 404, 'lead_not_found', schemaReady);

  if (row.needs_human_takeover !== true) {
    return decision(true, 200, 'not_in_takeover', schemaReady, shapeLead(row));
  }

  const update: Record<string, unknown> = {
    needs_human_takeover: false,
    human_takeover_resolved_at: nowIso(input.now)
  };
  if (notes !== undefined && notes !== null) {
    update.human_takeover_notes = notes;
  }

  const { data: updated, error: writeError } = await supabase
    .from('leads')
    .update(update)
    .eq('id', leadId)
    .eq('roofer_id', rooferId)
    .select(OWNERSHIP_COLUMNS)
    .maybeSingle();

  if (writeError) return decision(false, 500, 'write_error', schemaReady);

  await appendWorkflowEvent(supabase, {
    roofer_id: rooferId,
    lead_id: leadId,
    event_type: resolution === 'resolved' ? 'human_takeover_resolved' : 'human_takeover_released',
    metadata: { notes: notes ?? null, resolution }
  });

  return decision(true, 200, 'applied', schemaReady, shapeLead(updated || { ...row, ...update }));
}

/** Mark Handled = release with a resolved resolution (terminal operator handling). */
export async function markHandled(input: LeadTakeoverInput): Promise<LeadTakeoverResult> {
  return releaseLead({ ...input, resolution: 'resolved' });
}

/**
 * Pending Review list: leads currently flagged for human takeover, newest first, phone masked.
 * Scoped to the authenticated roofer. Pre-schema returns an empty, schema-not-ready placeholder with
 * ok=true so the dashboard never errors.
 */
export async function getPendingReview(input: PendingReviewInput): Promise<PendingReviewResult> {
  const { supabase, schemaReady, rooferId } = input;

  const empty = (
    ok: boolean,
    httpStatus: number,
    reason: PendingReviewResult['reason']
  ): PendingReviewResult => ({
    ok,
    httpStatus,
    reason,
    schemaReady,
    count: 0,
    pendingReview: [],
    noLiveSms: true,
    noProviderCall: true
  });

  if (!schemaReady) return empty(true, 200, 'schema_not_applied');
  if (!supabase || !rooferId) return empty(false, 400, 'missing_required_field');

  const { data, error } = await supabase
    .from('leads')
    .select(OWNERSHIP_COLUMNS)
    .eq('roofer_id', rooferId)
    .eq('needs_human_takeover', true)
    .order('human_takeover_at', { ascending: false });

  if (error) return empty(false, 500, 'lookup_error');

  const pendingReview = (data || []).map(shapeLead);
  return {
    ok: true,
    httpStatus: 200,
    reason: 'ok',
    schemaReady,
    count: pendingReview.length,
    pendingReview,
    noLiveSms: true,
    noProviderCall: true
  };
}
