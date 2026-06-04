import type { SmsDispatcherPlannedAction } from './sms-dispatcher-planner.service';

export interface SmsDispatcherWritePlanInput {
  followUpId?: string;
  rooferId?: string;
  leadId?: string;
  toNumber?: string | null;
  fromNumber?: string | null;
  messageBody?: string | null;
  templateType?: string | null;
  action: SmsDispatcherPlannedAction | 'fail_closed';
  reason: string;
  shouldSend: boolean;
  rescheduledFor?: string | null;
  currentTime: string;
  duplicateSendExists?: boolean;
  duplicateLookupSource?: string;
  duplicateLookupError?: string | null;
}

export interface SmsDispatcherWritePlan {
  requiresLiveWriteGate: true;
  messageInsertPlan: Record<string, unknown> | null;
  followUpUpdatePlan: Record<string, unknown> | null;
  workflowEventInsertPlan: Record<string, unknown> | null;
}

function baseMetadata(input: SmsDispatcherWritePlanInput): Record<string, unknown> {
  return {
    follow_up_id: input.followUpId,
    template_type: input.templateType || null,
    dispatcher_mode: 'dry_run_write_plan',
    duplicate_send_exists: Boolean(input.duplicateSendExists),
    duplicate_lookup_source: input.duplicateLookupSource || null,
    duplicate_lookup_error: input.duplicateLookupError || null,
    requires_live_write_gate: true
  };
}

export function buildSmsDispatcherWritePlan(
  input: SmsDispatcherWritePlanInput
): SmsDispatcherWritePlan {
  const workflowEventBase = {
    roofer_id: input.rooferId,
    lead_id: input.leadId,
    event_source: 'sms_dispatcher_write_plan',
    event_status: 'planned',
    metadata: baseMetadata(input)
  };

  if (input.action === 'send' && input.shouldSend) {
    return {
      requiresLiveWriteGate: true,
      messageInsertPlan: {
        roofer_id: input.rooferId,
        lead_id: input.leadId,
        channel: 'sms',
        direction: 'outbound',
        status: 'planned',
        provider: null,
        to_number: input.toNumber || null,
        from_number: input.fromNumber || null,
        message_body: input.messageBody || null,
        sent_at: null,
        provider_message_id: null,
        error_message: null
      },
      followUpUpdatePlan: {
        id: input.followUpId,
        status: 'sent',
        sent_at: input.currentTime
      },
      workflowEventInsertPlan: {
        ...workflowEventBase,
        event_type: 'sms_send_planned',
        description: 'SMS send write plan generated'
      }
    };
  }

  if (input.action === 'reschedule') {
    return {
      requiresLiveWriteGate: true,
      messageInsertPlan: null,
      followUpUpdatePlan: {
        id: input.followUpId,
        scheduled_for: input.rescheduledFor || null
      },
      workflowEventInsertPlan: {
        ...workflowEventBase,
        event_type: 'sms_reschedule_planned',
        description: 'SMS reschedule write plan generated'
      }
    };
  }

  return {
    requiresLiveWriteGate: true,
    messageInsertPlan: null,
    followUpUpdatePlan: {
      id: input.followUpId,
      status: 'skipped',
      skipped_reason: input.reason
    },
    workflowEventInsertPlan: {
      ...workflowEventBase,
      event_type: 'sms_skip_planned',
      description: 'SMS skip write plan generated'
    }
  };
}
