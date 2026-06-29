import { createClient, SupabaseClient } from '@supabase/supabase-js';
import config from '../config/config';

if (!config.supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for manual outreach service');
}

const defaultSupabaseService = createClient(
  config.supabaseUrl,
  config.supabaseServiceRoleKey
);

// Status values that represent a follow-up set that is still active (not yet
// sent, skipped, or stopped). Used by the duplicate-schedule guard.
const ACTIVE_FOLLOW_UP_STATUSES = ['scheduled', 'pending'] as const;

const VALID_SOURCE_DETAILS = ['angi', 'thumbtack', 'referral', 'homeadvisor', 'other', 'unknown'] as const;
type SourceDetail = typeof VALID_SOURCE_DETAILS[number];

interface SourceContext {
  twilio_from?: string;
  twilio_to?: string;
  message_sid?: string;
  inbound_body?: string;
  webhook_source?: 'twilio_manual_outreach';
}

interface ManualOutreachPayload {
  roofer_id: string;
  homeowner_phone: string;
  homeowner_name?: string;
  source_detail?: string;
  issue_description?: string;
  source_context?: SourceContext;
  command?: 'start' | 'pause' | 'stop';
}

interface ManualOutreachResult {
  lead_id: string;
  follow_up_count: number;
  workflow_event_count: number;
  // True when an inbound manual outreach was acknowledged but a duplicate
  // follow-up set was intentionally NOT scheduled because an active set already
  // exists for this roofer + homeowner lead (Build 229 duplicate-schedule guard).
  duplicate_schedule_skipped?: boolean;
}

// Optional dependency injection for offline/unit testing. Production call sites
// (route + Twilio webhook) call createManualOutreach with no deps, so they keep
// using the module-level service-role client unchanged.
interface ManualOutreachDeps {
  supabase?: SupabaseClient;
}

function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{1,14}$/.test(phone);
}

export async function createManualOutreach(
  payload: ManualOutreachPayload,
  deps?: ManualOutreachDeps
): Promise<ManualOutreachResult> {
  const supabaseService = deps?.supabase || defaultSupabaseService;
  const { roofer_id, homeowner_phone, homeowner_name, source_detail, issue_description, command, source_context } = payload;

  // Validate roofer exists
  const { data: roofer, error: rooferError } = await supabaseService
    .from('roofers')
    .select('id')
    .eq('id', roofer_id)
    .single();

  if (rooferError || !roofer) {
    throw new Error('Roofer not found');
  }

  // Validate phone
  if (!isValidE164(homeowner_phone)) {
    throw new Error('homeowner_phone must be valid E.164 format');
  }

  // Validate and default source_detail
  let sourceDetail: SourceDetail = 'unknown';
  if (source_detail) {
    if (VALID_SOURCE_DETAILS.includes(source_detail as SourceDetail)) {
      sourceDetail = source_detail as SourceDetail;
    } else {
      throw new Error('Invalid source_detail');
    }
  }

  // Find or create lead
  let leadId: string;
  let leadWasCreated = false;
  const { data: existingLead } = await supabaseService
    .from('leads')
    .select('id')
    .eq('roofer_id', roofer_id)
    .eq('phone', homeowner_phone)
    .single();

  if (existingLead) {
    leadId = existingLead.id;
  } else {
    leadWasCreated = true;
    const { data: newLead, error: leadError } = await supabaseService
      .from('leads')
      .insert({
        roofer_id,
        source_path: 'manual',
        source_detail: sourceDetail,
        homeowner_name: homeowner_name || null,
        phone: homeowner_phone,
        issue_description: issue_description || null,
        status: 'new',
        is_eligible: true,
        service_area_match: true
      })
      .select()
      .single();

    if (leadError || !newLead) {
      throw new Error(leadError?.message || 'Failed to create lead');
    }
    leadId = newLead.id;
    leadWasCreated = true;
  }

  // Handle command-specific logic
  if (command === 'pause' || command === 'stop') {
    // Update pending/scheduled follow-ups
    const updateData: any = { status: 'skipped' };
    if (command === 'stop') {
      updateData.stopped_reason = 'roofer_stopped';
    }

    await supabaseService
      .from('follow_ups')
      .update(updateData)
      .eq('roofer_id', roofer_id)
      .eq('lead_id', leadId)
      .in('status', ['scheduled', 'pending']);

    const eventType = command === 'stop' ? 'followup_stopped' : 'followup_paused';
    await supabaseService.from('workflow_events').insert({
      roofer_id,
      lead_id: leadId,
      event_type: eventType,
      metadata: source_context || null
    });

    return { lead_id: leadId, follow_up_count: 0, workflow_event_count: 1 };
  }

  // Duplicate-schedule guard (Build 229).
  //
  // Background: delayed/failed inbound SMS attempts can be re-delivered by the
  // carrier/Twilio as separate MessageSid values. The webhook's MessageSid-based
  // duplicate check (in routes/webhooks.ts) does NOT catch these because each
  // arrives with a distinct MessageSid. Without this guard, every such inbound
  // for the same roofer + homeowner lead scheduled an additional full set of 4
  // follow-ups (the live Test Roofing incident produced 24 follow-ups for one
  // lead — see docs/MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_BUILD_229.md).
  //
  // Conservative behavior:
  //   - First valid manual outreach for a lead (no active follow-ups yet) still
  //     schedules exactly one set of 4 follow-ups — unchanged.
  //   - If an active (scheduled/pending) follow-up set already exists for this
  //     lead, acknowledge the inbound but DO NOT schedule a second set. Record a
  //     `manual_outreach_duplicate_schedule_skipped` workflow event for audit.
  //   - pause/stop commands are handled above and are unaffected.
  const { data: activeFollowUps, error: activeFollowUpsError } = await supabaseService
    .from('follow_ups')
    .select('id')
    .eq('roofer_id', roofer_id)
    .eq('lead_id', leadId)
    .in('status', ACTIVE_FOLLOW_UP_STATUSES as unknown as string[]);

  // Fail closed: if the guard query itself errors we cannot tell whether an active set already
  // exists, so we must NOT proceed to schedule a (potentially duplicate) set of follow-ups.
  if (activeFollowUpsError) {
    throw new Error(
      `Manual outreach duplicate-schedule guard failed while checking active follow-ups: ${activeFollowUpsError.message}`
    );
  }

  const activeFollowUpCount = Array.isArray(activeFollowUps) ? activeFollowUps.length : 0;

  if (activeFollowUpCount > 0) {
    // An active follow-up set already exists. Acknowledge the inbound (so the
    // MessageSid duplicate check keeps working) but skip scheduling a duplicate
    // set. No SMS is sent and no provider is called here.
    const duplicateEvents = [
      {
        roofer_id,
        lead_id: leadId,
        event_type: 'manual_outreach_received',
        metadata: source_context || null
      },
      {
        roofer_id,
        lead_id: leadId,
        event_type: 'manual_outreach_duplicate_schedule_skipped',
        metadata: {
          ...(source_context || {}),
          reason: 'active_followups_exist',
          active_followup_count: activeFollowUpCount
        }
      }
    ];

    await supabaseService.from('workflow_events').insert(duplicateEvents);

    return {
      lead_id: leadId,
      follow_up_count: 0,
      workflow_event_count: duplicateEvents.length,
      duplicate_schedule_skipped: true
    };
  }

  // Default: create new follow-up sequence (start / plain phone)
  const now = new Date();
  const followUps = [
    { roofer_id, lead_id: leadId, followup_type: 'initial', scheduled_for: now.toISOString() },
    { roofer_id, lead_id: leadId, followup_type: '2h', scheduled_for: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString() },
    { roofer_id, lead_id: leadId, followup_type: '12h', scheduled_for: new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString() },
    { roofer_id, lead_id: leadId, followup_type: '24h', scheduled_for: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString() }
  ];

  await supabaseService.from('follow_ups').insert(followUps);

  const workflowEvents = [
    {
      roofer_id,
      lead_id: leadId,
      event_type: 'manual_outreach_received',
      metadata: source_context || null
    },
    ...(leadWasCreated ? [{ roofer_id, lead_id: leadId, event_type: 'lead_created' }] : []),
    { roofer_id, lead_id: leadId, event_type: 'followup_scheduled' }
  ];

  await supabaseService.from('workflow_events').insert(workflowEvents);

  return {
    lead_id: leadId,
    follow_up_count: 4,
    workflow_event_count: 2
  };
}
