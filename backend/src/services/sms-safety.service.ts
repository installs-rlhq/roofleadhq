export type SmsSafetyAction = 'send' | 'skip' | 'reschedule';

export type SmsSafetyReason =
  | 'eligible'
  | 'sms_disabled'
  | 'invalid_phone'
  | 'opted_out'
  | 'booked'
  | 'cancelled'
  | 'lost'
  | 'follow_up_not_due'
  | 'template_not_approved'
  | 'duplicate_send'
  | 'quiet_hours'
  | 'missing_required_field';

export interface SmsSafetyInput {
  rooferSmsEnabled: boolean;
  homeownerPhone: string;
  leadStatus: string;
  followUpStatus: string;
  scheduledFor: string | Date;
  currentTime: string | Date;
  rooferTimezone: string;
  templateType: string;
  duplicateSendExists?: boolean;
}

export interface SmsSafetyDecision {
  allowed: boolean;
  action: SmsSafetyAction;
  reason: SmsSafetyReason;
  rescheduledFor?: string;
}

const APPROVED_TEMPLATE_TYPES = new Set([
  'manual_outreach_initial',
  'digital_initial',
  'phone_followup',
  'followup_2h',
  'followup_12h',
  'followup_24h',
  'booking_confirmation',
  'appointment_reminder'
]);

const BLOCKED_LEAD_STATUS_REASON: Record<string, SmsSafetyReason> = {
  opted_out: 'opted_out',
  booked: 'booked',
  cancelled: 'cancelled',
  lost: 'lost'
};

export function isValidE164(phone: string): boolean {
  return /^\+[1-9]\d{1,14}$/.test(phone);
}

const OPT_OUT_KEYWORDS = new Set([
  'STOP',
  'STOPALL',
  'UNSUBSCRIBE',
  'CANCEL',
  'END',
  'QUIT'
]);

export interface SmsOptOutDecision {
  isOptOut: boolean;
  keyword?: string;
}

export function parseSmsOptOut(messageBody: string): SmsOptOutDecision {
  const normalized = messageBody.trim().toUpperCase();

  if (OPT_OUT_KEYWORDS.has(normalized)) {
    return { isOptOut: true, keyword: normalized };
  }

  return { isOptOut: false };
}

function getLocalParts(date: Date, timeZone: string): {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
} {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).formatToParts(date);

  const values: Record<string, number> = {};
  for (const part of parts) {
    if (part.type !== 'literal') values[part.type] = Number(part.value);
  }

  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
    second: values.second
  };
}

function getTimeZoneOffsetMs(date: Date, timeZone: string): number {
  const local = getLocalParts(date, timeZone);
  const asUtc = Date.UTC(
    local.year,
    local.month - 1,
    local.day,
    local.hour,
    local.minute,
    local.second
  );

  return asUtc - date.getTime();
}

function zonedDateTimeToUtc(
  timeZone: string,
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second: number
): Date {
  const utcGuess = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  const offset = getTimeZoneOffsetMs(utcGuess, timeZone);
  return new Date(utcGuess.getTime() - offset);
}

export function isQuietHours(currentTime: string | Date, rooferTimezone: string): boolean {
  const date = new Date(currentTime);
  const local = getLocalParts(date, rooferTimezone);

  return local.hour >= 21 || local.hour < 8;
}

export function getNextAllowedSendTime(
  currentTime: string | Date,
  rooferTimezone: string
): string {
  const date = new Date(currentTime);
  const local = getLocalParts(date, rooferTimezone);

  let year = local.year;
  let month = local.month;
  let day = local.day;

  if (local.hour >= 21) {
    const nextDayNoonUtc = zonedDateTimeToUtc(rooferTimezone, year, month, day, 12, 0, 0);
    nextDayNoonUtc.setUTCDate(nextDayNoonUtc.getUTCDate() + 1);
    const nextLocal = getLocalParts(nextDayNoonUtc, rooferTimezone);
    year = nextLocal.year;
    month = nextLocal.month;
    day = nextLocal.day;
  }

  return zonedDateTimeToUtc(rooferTimezone, year, month, day, 8, 0, 0).toISOString();
}

export function evaluateSmsSafety(input: SmsSafetyInput): SmsSafetyDecision {
  if (
    !input.homeownerPhone ||
    !input.leadStatus ||
    !input.followUpStatus ||
    !input.scheduledFor ||
    !input.currentTime ||
    !input.rooferTimezone ||
    !input.templateType
  ) {
    return { allowed: false, action: 'skip', reason: 'missing_required_field' };
  }

  if (!input.rooferSmsEnabled) {
    return { allowed: false, action: 'skip', reason: 'sms_disabled' };
  }

  if (!isValidE164(input.homeownerPhone)) {
    return { allowed: false, action: 'skip', reason: 'invalid_phone' };
  }

  const blockedStatusReason = BLOCKED_LEAD_STATUS_REASON[input.leadStatus];
  if (blockedStatusReason) {
    return { allowed: false, action: 'skip', reason: blockedStatusReason };
  }

  if (input.followUpStatus !== 'scheduled') {
    return { allowed: false, action: 'skip', reason: 'follow_up_not_due' };
  }

  if (new Date(input.scheduledFor).getTime() > new Date(input.currentTime).getTime()) {
    return { allowed: false, action: 'skip', reason: 'follow_up_not_due' };
  }

  if (!APPROVED_TEMPLATE_TYPES.has(input.templateType)) {
    return { allowed: false, action: 'skip', reason: 'template_not_approved' };
  }

  if (input.duplicateSendExists) {
    return { allowed: false, action: 'skip', reason: 'duplicate_send' };
  }

  if (isQuietHours(input.currentTime, input.rooferTimezone)) {
    return {
      allowed: false,
      action: 'reschedule',
      reason: 'quiet_hours',
      rescheduledFor: getNextAllowedSendTime(input.currentTime, input.rooferTimezone)
    };
  }

  return { allowed: true, action: 'send', reason: 'eligible' };
}

export interface SmsOptOutWorkflowInput {
  rooferId?: string;
  leadId?: string;
  homeownerPhone: string;
  inboundBody: string;
  messageSid?: string;
  pendingFollowUpIds?: string[];
}

export interface SmsOptOutWorkflowPlan {
  shouldProcess: boolean;
  reason: 'opt_out_detected' | 'not_opt_out' | 'missing_required_field' | 'invalid_phone';
  keyword?: string;
  leadUpdate?: {
    id: string;
    status: 'opted_out';
  };
  followUpUpdates: Array<{
    id: string;
    status: 'skipped';
    stopped_reason: 'homeowner_opted_out';
  }>;
  workflowEvent?: {
    event_type: 'homeowner_opted_out';
    event_source: 'sms_safety_service';
    event_status: 'planned';
    metadata: {
      keyword: string;
      message_sid?: string;
      homeowner_phone: string;
    };
  };
}

export function planSmsOptOutWorkflow(input: SmsOptOutWorkflowInput): SmsOptOutWorkflowPlan {
  if (!input.rooferId || !input.leadId || !input.homeownerPhone || !input.inboundBody) {
    return {
      shouldProcess: false,
      reason: 'missing_required_field',
      followUpUpdates: []
    };
  }

  if (!isValidE164(input.homeownerPhone)) {
    return {
      shouldProcess: false,
      reason: 'invalid_phone',
      followUpUpdates: []
    };
  }

  const optOut = parseSmsOptOut(input.inboundBody);

  if (!optOut.isOptOut || !optOut.keyword) {
    return {
      shouldProcess: false,
      reason: 'not_opt_out',
      followUpUpdates: []
    };
  }

  return {
    shouldProcess: true,
    reason: 'opt_out_detected',
    keyword: optOut.keyword,
    leadUpdate: {
      id: input.leadId,
      status: 'opted_out'
    },
    followUpUpdates: (input.pendingFollowUpIds || []).map((id) => ({
      id,
      status: 'skipped',
      stopped_reason: 'homeowner_opted_out'
    })),
    workflowEvent: {
      event_type: 'homeowner_opted_out',
      event_source: 'sms_safety_service',
      event_status: 'planned',
      metadata: {
        keyword: optOut.keyword,
        message_sid: input.messageSid,
        homeowner_phone: input.homeownerPhone
      }
    }
  };
}

