/**
 * Roofer Alert Message Binding Service — native, pure, production-aligned.
 *
 * Pure module. No network clients, no environment access, no secret handling, no external/provider
 * calls, no database access. This is the EXACT outbound message binding step for roofer-facing
 * notifications. It owns the approved roofer-facing copy, binds an outbound body to a SPECIFIC
 * scenario, and fail-closes on empty / generic / substituted / wrong-scenario copy.
 *
 * It also provides the guarded support for a FUTURE Jason-owned live M1/M2 validation send. That
 * support computes PERMISSION ONLY — it never constructs a provider client, never performs a send,
 * never reads a credential, and never touches a destination value. A live-capable path fails closed
 * unless a fresh, signed, scenario-specific approval AND an explicit confirmation token are present.
 * Approval for M1 can never permit M2 and vice versa.
 *
 * Labels and booleans only — no raw phone numbers, email addresses, secrets, or production data.
 */

export type RooferAlertScenarioKey =
  | 'new_roof_inspection_lead_alert'
  | 'missed_or_slow_lead_follow_up_nudge'
  | 'daily_open_lead_recap'
  | 'hot_lead_needs_review_alert';

export type RooferAlertChannel = 'sms' | 'internal';

export interface ApprovedRooferAlert {
  message_id: 'M1' | 'M2' | 'M3' | 'M4';
  channel: RooferAlertChannel;
  /** True when this scenario is eligible to be a future Jason-owned live SMS validation send. */
  live_capable: boolean;
  text: string;
}

// Approved roofer-facing copy. M1/M2 are exact, fixed SMS strings (live-capable in future, gated).
// M3 is an internal, count-parameterized recap (never a live external send).
export const APPROVED_ROOFER_ALERTS: Record<RooferAlertScenarioKey, ApprovedRooferAlert> = {
  new_roof_inspection_lead_alert: {
    message_id: 'M1',
    channel: 'sms',
    live_capable: true,
    text:
      "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out."
  },
  missed_or_slow_lead_follow_up_nudge: {
    message_id: 'M2',
    channel: 'sms',
    live_capable: true,
    text:
      'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.'
  },
  daily_open_lead_recap: {
    message_id: 'M3',
    channel: 'internal',
    live_capable: false,
    text: 'RoofLeadHQ daily recap: you have open roof inspection leads still waiting on a first reply. Open RoofLeadHQ to see them.'
  },
  // M4 — human-takeover escalation notice. INTERNAL ONLY, never a live external send (live_capable
  // false). Parameterized form is produced by buildHotLeadReviewAlert(); this fixed entry holds the
  // labeled template so the catalog stays verifiable and bindRooferAlert can echo the template shape.
  hot_lead_needs_review_alert: {
    message_id: 'M4',
    channel: 'internal',
    live_capable: false,
    text: 'RoofLeadHQ: Hot lead needs review — [name], [issue summary], [area]. Reply or open dashboard.'
  }
};

// Generic / stale bodies that must never be bound or sent (substituted-copy protection).
export const FORBIDDEN_GENERIC_BODIES = new Set<string>([
  'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.',
  'RoofLeadHQ test message. No action needed.',
  'Test message.'
]);

export interface RooferAlertBindingResult {
  ok: boolean;
  scenarioKey: RooferAlertScenarioKey | null;
  messageId: ApprovedRooferAlert['message_id'] | null;
  channel: RooferAlertChannel | null;
  boundBody: string | null;
  reasons: string[];
}

function isKnownScenario(key: string): key is RooferAlertScenarioKey {
  return Object.prototype.hasOwnProperty.call(APPROVED_ROOFER_ALERTS, key);
}

/**
 * Fail-closed guard. Returns an array of block reasons (empty array == exact match permitted).
 * Rejects empty, generic, substituted, and wrong-scenario bodies.
 */
export function assertExactRooferAlertBinding(
  scenarioKey: string,
  body: unknown
): string[] {
  const reasons: string[] = [];
  if (!isKnownScenario(scenarioKey)) {
    reasons.push('unknown_scenario_key');
    return reasons;
  }
  const approved = APPROVED_ROOFER_ALERTS[scenarioKey];
  if (typeof body !== 'string' || body.trim().length === 0) {
    reasons.push('outbound_body_empty');
    return reasons;
  }
  if (FORBIDDEN_GENERIC_BODIES.has(body)) {
    reasons.push('outbound_body_is_generic_or_stale_copy');
  }
  if (body !== approved.text) {
    reasons.push('outbound_body_does_not_match_approved_scenario_copy');
  }
  return reasons;
}

/**
 * Bind an outbound roofer-facing body to a SPECIFIC scenario. When `requestedBody` is supplied it must
 * equal the approved scenario copy exactly, otherwise binding fails closed. With no `requestedBody` the
 * approved scenario copy is returned. The result is verifiable against the approved catalog.
 */
export function bindRooferAlert(
  scenarioKey: string,
  options: { requestedBody?: string } = {}
): RooferAlertBindingResult {
  if (!isKnownScenario(scenarioKey)) {
    return {
      ok: false,
      scenarioKey: null,
      messageId: null,
      channel: null,
      boundBody: null,
      reasons: ['unknown_scenario_key']
    };
  }

  const approved = APPROVED_ROOFER_ALERTS[scenarioKey];
  const candidateBody =
    typeof options.requestedBody === 'string' ? options.requestedBody : approved.text;
  const reasons = assertExactRooferAlertBinding(scenarioKey, candidateBody);

  return {
    ok: reasons.length === 0,
    scenarioKey,
    messageId: approved.message_id,
    channel: approved.channel,
    boundBody: reasons.length === 0 ? candidateBody : null,
    reasons
  };
}

/**
 * Build the internal daily open-lead recap body for a deterministic open-lead count. Internal only —
 * never an external send. The count is embedded so downstream evidence can assert the actual number.
 */
export function buildDailyOpenLeadRecap(openLeadCount: number): {
  channel: 'internal';
  messageId: 'M3';
  openLeadCount: number;
  body: string;
} {
  const safeCount = Number.isFinite(openLeadCount) && openLeadCount >= 0 ? Math.floor(openLeadCount) : 0;
  const noun = safeCount === 1 ? 'open roof inspection lead' : 'open roof inspection leads';
  return {
    channel: 'internal',
    messageId: 'M3',
    openLeadCount: safeCount,
    body: `RoofLeadHQ daily recap: you have ${safeCount} ${noun} still waiting on a first reply. Open RoofLeadHQ to see them.`
  };
}

/**
 * Build the INTERNAL human-takeover escalation notice (M4) for a specific lead. Internal only — this
 * is NOT an external send and has no live-capable path; it is the copy a roofer would see in-app /
 * future internal channel when a hot or complex lead is flagged for review. Inputs are sanitized to a
 * single line; empty fields fall back to neutral placeholders so no blank/garbled copy is produced.
 */
export function buildHotLeadReviewAlert(input: {
  name?: string | null;
  issueSummary?: string | null;
  area?: string | null;
}): {
  channel: 'internal';
  messageId: 'M4';
  liveSend: false;
  body: string;
} {
  const oneLine = (value: string | null | undefined, fallback: string): string => {
    const cleaned = (value || '').replace(/\s+/g, ' ').trim();
    return cleaned.length > 0 ? cleaned : fallback;
  };
  const name = oneLine(input.name, 'a lead');
  const issue = oneLine(input.issueSummary, 'no issue summary');
  const area = oneLine(input.area, 'unspecified area');
  return {
    channel: 'internal',
    messageId: 'M4',
    liveSend: false,
    body: `RoofLeadHQ: Hot lead needs review — ${name}, ${issue}, ${area}. Reply or open dashboard.`
  };
}

// --- Homeowner consent boundary ---------------------------------------------------------------

/** Homeowner contact is NOT authorized. Homeowner-facing copy is draft-only and gated behind consent. */
export const HOMEOWNER_CONTACT_AUTHORIZED = false;

export interface HomeownerOutreachDecision {
  homeownerContactAuthorized: false;
  status: 'blocked_approval_required';
  draftOnly: true;
  preparedSend: null;
  reason: 'homeowner_contact_not_authorized_requires_consent_and_separate_approval';
}

/** Always blocks any homeowner-facing send; emits an internal approval-required result. */
export function prepareHomeownerOutreach(): HomeownerOutreachDecision {
  return {
    homeownerContactAuthorized: false,
    status: 'blocked_approval_required',
    draftOnly: true,
    preparedSend: null,
    reason: 'homeowner_contact_not_authorized_requires_consent_and_separate_approval'
  };
}

// --- Guarded FUTURE live M1/M2 send support (permission-only; never sends) ---------------------

export const GUARDED_LIVE_CONFIRM_TOKEN = 'SEND_ONE_LIVE_VALIDATION_SMS';

export interface ScenarioSpecificApproval {
  approval_signed?: boolean;
  approval_granted?: boolean;
  scenario_key?: string;
  message_id?: string;
  selected_variant_text?: string;
  max_message_count?: number;
  retry_allowed?: boolean;
  homeowner_contact_authorized?: boolean;
}

export interface GuardedFutureSendDecision {
  permitted: boolean;
  scenarioKey: string;
  messageId: ApprovedRooferAlert['message_id'] | null;
  boundBody: string | null;
  blockedReasons: string[];
  /** Always true in this module: it computes permission only and performs no send. */
  noSendPerformed: true;
  noProviderClientConstructed: true;
  noCredentialRead: true;
}

/**
 * Compute whether a FUTURE Jason-owned live validation send for a specific scenario would be permitted.
 * This NEVER sends. It fails closed unless ALL of these hold:
 *  - scenario is live-capable (M1 or M2 only),
 *  - a fresh approval is signed AND granted,
 *  - the approval's scenario_key matches the requested scenario (M1 approval can never permit M2),
 *  - the approval's selected_variant_text equals the approved scenario copy exactly,
 *  - max_message_count === 1, retry not allowed, homeowner contact not authorized,
 *  - the explicit live confirmation token is supplied.
 */
export function prepareGuardedFutureSend(
  scenarioKey: string,
  approval: ScenarioSpecificApproval | null | undefined,
  confirmToken?: string
): GuardedFutureSendDecision {
  const blockedReasons: string[] = [];

  if (!isKnownScenario(scenarioKey)) {
    return {
      permitted: false,
      scenarioKey,
      messageId: null,
      boundBody: null,
      blockedReasons: ['unknown_scenario_key'],
      noSendPerformed: true,
      noProviderClientConstructed: true,
      noCredentialRead: true
    };
  }

  const approved = APPROVED_ROOFER_ALERTS[scenarioKey];
  if (!approved.live_capable) blockedReasons.push('scenario_not_live_capable');

  const appr = approval || {};
  if (appr.approval_signed !== true) blockedReasons.push('approval_not_signed');
  if (appr.approval_granted !== true) blockedReasons.push('approval_not_granted');
  if (appr.scenario_key !== scenarioKey) blockedReasons.push('approval_scenario_mismatch');
  if (appr.selected_variant_text !== approved.text) blockedReasons.push('approval_variant_text_mismatch');
  if (appr.max_message_count !== 1) blockedReasons.push('approval_max_message_count_not_1');
  if (appr.retry_allowed !== false) blockedReasons.push('approval_retry_not_disallowed');
  if (appr.homeowner_contact_authorized !== false) blockedReasons.push('approval_homeowner_contact_must_be_false');
  if (confirmToken !== GUARDED_LIVE_CONFIRM_TOKEN) blockedReasons.push('live_confirm_token_absent');

  const permitted = blockedReasons.length === 0;
  return {
    permitted,
    scenarioKey,
    messageId: approved.message_id,
    boundBody: permitted ? approved.text : null,
    blockedReasons,
    noSendPerformed: true,
    noProviderClientConstructed: true,
    noCredentialRead: true
  };
}
