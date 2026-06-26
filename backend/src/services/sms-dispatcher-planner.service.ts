import { evaluateSmsSafety, type SmsSafetyDecision } from './sms-safety.service';

export type SmsDispatcherPlannedAction = 'send' | 'skip' | 'reschedule';

export interface SmsDispatcherPlannerInput {
  followUp: {
    id: string;
    roofer_id?: string;
    lead_id?: string;
    status?: string;
    followup_type?: string;
    scheduled_for?: string | Date;
    message_body?: string | null;
  };
  lead: {
    id: string;
    phone?: string | null;
    status?: string | null;
    /**
     * Optional human-takeover pause flag. Surfaced by the dry-run executor only when the takeover
     * schema is applied (gated); absent/undefined coerces to false, leaving behavior unchanged.
     */
    needs_human_takeover?: boolean | null;
  };
  roofer: {
    id: string;
    sms_confirmation_enabled?: boolean | null;
    timezone?: string | null;
  };
  currentTime: string | Date;
  duplicateSendExists?: boolean;
}

export interface SmsDispatcherPlan {
  shouldSend: boolean;
  action: SmsDispatcherPlannedAction;
  reason: SmsSafetyDecision['reason'] | 'missing_required_field' | 'template_not_approved';
  followUpId?: string;
  leadId?: string;
  rooferId?: string;
  templateType?: string;
  rescheduledFor?: string;
  messageBody?: string | null;
}

const FOLLOW_UP_TEMPLATE_MAP: Record<string, string> = {
  initial: 'manual_outreach_initial',
  '2h': 'followup_2h',
  '12h': 'followup_12h',
  '24h': 'followup_24h',
  manual_outreach: 'manual_outreach_initial',
  manual_outreach_initial: 'manual_outreach_initial',
  digital_initial: 'digital_initial',
  phone_followup: 'phone_followup',
  followup_2h: 'followup_2h',
  followup_12h: 'followup_12h',
  followup_24h: 'followup_24h',
  booking_confirmation: 'booking_confirmation',
  appointment_reminder: 'appointment_reminder'
};

export function mapFollowUpTypeToSmsTemplate(followUpType?: string | null): string | null {
  if (!followUpType) return null;
  return FOLLOW_UP_TEMPLATE_MAP[followUpType] || null;
}

export function planSmsDispatch(input: SmsDispatcherPlannerInput): SmsDispatcherPlan {
  const { followUp, lead, roofer } = input;

  if (
    !followUp?.id ||
    !followUp?.status ||
    !followUp?.scheduled_for ||
    !followUp?.followup_type ||
    !lead?.id ||
    !roofer?.id
  ) {
    return {
      shouldSend: false,
      action: 'skip',
      reason: 'missing_required_field',
      followUpId: followUp?.id,
      leadId: lead?.id,
      rooferId: roofer?.id
    };
  }

  const templateType = mapFollowUpTypeToSmsTemplate(followUp.followup_type);

  if (!templateType) {
    return {
      shouldSend: false,
      action: 'skip',
      reason: 'template_not_approved',
      followUpId: followUp.id,
      leadId: lead.id,
      rooferId: roofer.id
    };
  }

  const decision = evaluateSmsSafety({
    rooferSmsEnabled: Boolean(roofer.sms_confirmation_enabled),
    homeownerPhone: lead.phone || '',
    leadStatus: lead.status || '',
    followUpStatus: followUp.status,
    scheduledFor: followUp.scheduled_for,
    currentTime: input.currentTime,
    rooferTimezone: roofer.timezone || 'America/Denver',
    templateType,
    duplicateSendExists: input.duplicateSendExists,
    needsHumanTakeover: Boolean(lead.needs_human_takeover)
  });

  return {
    shouldSend: decision.allowed,
    action: decision.action,
    reason: decision.reason,
    followUpId: followUp.id,
    leadId: lead.id,
    rooferId: roofer.id,
    templateType,
    rescheduledFor: decision.rescheduledFor,
    messageBody: followUp.message_body || null
  };
}
