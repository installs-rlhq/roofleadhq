const E164_PATTERN = /^\+[1-9]\d{1,14}$/;

export interface SmsSendIntentPlannerInput {
  roofer_id?: string;
  lead_id?: string;
  follow_up_id?: string;
  to?: string;
  from?: string;
  body?: string;
  approved_follow_up_id?: string;
  run_id?: string;
}

export type SmsSendIntentPlannerReason =
  | 'eligible'
  | 'missing_required_field'
  | 'approved_follow_up_mismatch'
  | 'invalid_e164';

export interface SmsSendIntent {
  provider: 'twilio';
  channel: 'sms';
  intent_type: 'future_twilio_send';
  roofer_id: string;
  lead_id: string;
  follow_up_id: string;
  approved_follow_up_id: string;
  run_id: string;
  to: string;
  from: string;
  body: string;
}

export interface SmsSendIntentPlannerResult {
  shouldSend: boolean;
  reason: SmsSendIntentPlannerReason;
  sendIntent: SmsSendIntent | null;
  noSmsSent: true;
  noTwilioCallsMade: true;
}

function isValidE164(phone?: string): boolean {
  return Boolean(phone && E164_PATTERN.test(phone));
}

function hasRequiredFields(input: SmsSendIntentPlannerInput): boolean {
  return Boolean(
    input.roofer_id &&
      input.lead_id &&
      input.follow_up_id &&
      input.to &&
      input.from &&
      input.body &&
      input.approved_follow_up_id &&
      input.run_id
  );
}

export function planSmsSendIntent(
  input: SmsSendIntentPlannerInput
): SmsSendIntentPlannerResult {
  if (!hasRequiredFields(input)) {
    return {
      shouldSend: false,
      reason: 'missing_required_field',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  if (input.follow_up_id !== input.approved_follow_up_id) {
    return {
      shouldSend: false,
      reason: 'approved_follow_up_mismatch',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  if (!isValidE164(input.to) || !isValidE164(input.from)) {
    return {
      shouldSend: false,
      reason: 'invalid_e164',
      sendIntent: null,
      noSmsSent: true,
      noTwilioCallsMade: true
    };
  }

  const rooferId = input.roofer_id!;
  const leadId = input.lead_id!;
  const followUpId = input.follow_up_id!;
  const approvedFollowUpId = input.approved_follow_up_id!;
  const runId = input.run_id!;
  const to = input.to!;
  const from = input.from!;
  const body = input.body!;

  return {
    shouldSend: true,
    reason: 'eligible',
    sendIntent: {
      provider: 'twilio',
      channel: 'sms',
      intent_type: 'future_twilio_send',
      roofer_id: rooferId,
      lead_id: leadId,
      follow_up_id: followUpId,
      approved_follow_up_id: approvedFollowUpId,
      run_id: runId,
      to,
      from,
      body
    },
    noSmsSent: true,
    noTwilioCallsMade: true
  };
}
