import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

type VapiWebhookPayload = Record<string, any>;

type NormalizedVapiCallCompletedPayload = {
  provider_call_id: string | null;
  caller_phone: string | null;
  roofer_destination_number: string | null;
  call_started_at: string | null;
  call_ended_at: string | null;
  duration_seconds: number | null;
  transcript: string | null;
  summary: string | null;
  outcome: string | null;
  appointment_booked: boolean;
  appointment_requested: boolean;
  recording_url: string | null;
  appointment_time: string | null;
};

type VapiCallCompletedResult = {
  ok: boolean;
  dry_run: false;
  normalized: NormalizedVapiCallCompletedPayload;
  roofer_id?: string;
  roofer?: {
    id: string;
    business_name: string | null;
    twilio_number: string | null;
  };
  inserted?: boolean;
  duplicate?: boolean;
  call_id?: string;
  provider_call_id?: string;
  matched_lead_id?: string | null;
  booking_id?: string | null;
  // Build 244: payload-shape routing. A non-terminal Vapi server-message event, or a
  // browser/webCall final report with no PSTN routing target, is acknowledged as a no-op
  // (`acknowledged: true`, `processed: false`) rather than processed as a phone-lead call.
  acknowledged?: boolean;
  processed?: boolean;
  web_call?: boolean;
  event_type?: string | null;
  reason?: string;
  error?:
    | 'missing_required_field'
    | 'unknown_roofer'
    | 'lookup_failed'
    | 'insert_failed';
};

function normalizePhone(rawPhone: unknown): string | null {
  if (typeof rawPhone !== 'string') {
    return null;
  }

  const trimmed = rawPhone.trim();

  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('+')) {
    const digitsOnly = trimmed.replace(/[^\d+]/g, '');

    if (/^\+[1-9]\d{1,14}$/.test(digitsOnly)) {
      return digitsOnly;
    }

    return null;
  }

  const digits = trimmed.replace(/\D/g, '');

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  return null;
}

function firstStringValue(...values: unknown[]): string | null {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return null;
}

function firstBooleanValue(...values: unknown[]): boolean {
  for (const value of values) {
    if (typeof value === 'boolean') {
      return value;
    }

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();

      if (['true', 'yes', 'booked', 'requested'].includes(normalized)) {
        return true;
      }

      if (['false', 'no', 'not_booked', 'not_requested'].includes(normalized)) {
        return false;
      }
    }
  }

  return false;
}

function firstNumberValue(...values: unknown[]): number | null {
  for (const value of values) {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return Math.round(value);
    }

    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return Math.round(parsed);
      }
    }
  }

  return null;
}

function firstTimestampValue(...values: unknown[]): string | null {
  const value = firstStringValue(...values);

  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

export function normalizeVapiCallCompletedPayload(
  payload: VapiWebhookPayload
): NormalizedVapiCallCompletedPayload {
  const message = payload.message ?? {};
  const call = payload.call ?? message.call ?? {};
  const customer = call.customer ?? message.customer ?? payload.customer ?? {};
  const phoneNumber =
    call.phoneNumber ??
    message.phoneNumber ??
    payload.phoneNumber ??
    {};
  const analysis =
    call.analysis ??
    message.analysis ??
    payload.analysis ??
    {};
  const structuredData =
    analysis.structuredData ??
    analysis.structured_data ??
    message.structuredData ??
    message.structured_data ??
    payload.structuredData ??
    payload.structured_data ??
    {};

  const providerCallId = firstStringValue(
    payload.provider_call_id,
    payload.providerCallId,
    payload.call_id,
    payload.callId,
    call.id,
    call.callId,
    call.provider_call_id,
    call.providerCallId,
    message.call_id,
    message.callId,
    message.provider_call_id,
    message.providerCallId
  );

  const callerPhone = normalizePhone(
    firstStringValue(
      payload.caller_phone,
      payload.callerPhone,
      payload.from,
      call.caller_phone,
      call.callerPhone,
      call.from,
      customer.phone,
      customer.number,
      customer.phoneNumber,
      message.caller_phone,
      message.callerPhone,
      message.from,
      message.customer?.phone,
      message.customer?.number,
      message.customer?.phoneNumber
    )
  );

  const rooferDestinationNumber = normalizePhone(
    firstStringValue(
      payload.roofer_destination_number,
      payload.destination_number,
      payload.destinationNumber,
      payload.to,
      call.roofer_destination_number,
      call.destination_number,
      call.destinationNumber,
      call.to,
      phoneNumber.number,
      phoneNumber.phoneNumber,
      phoneNumber.twilioNumber,
      message.roofer_destination_number,
      message.destination_number,
      message.destinationNumber,
      message.to
    )
  );

  const appointmentBooked = firstBooleanValue(
    payload.appointment_booked,
    payload.appointmentBooked,
    message.appointment_booked,
    message.appointmentBooked,
    structuredData.appointment_booked,
    structuredData.appointmentBooked,
    structuredData.booked,
    analysis.appointment_booked,
    analysis.appointmentBooked
  );

  const appointmentRequested = firstBooleanValue(
    payload.appointment_requested,
    payload.appointmentRequested,
    message.appointment_requested,
    message.appointmentRequested,
    structuredData.appointment_requested,
    structuredData.appointmentRequested,
    structuredData.requested_appointment,
    structuredData.requestedAppointment,
    analysis.appointment_requested,
    analysis.appointmentRequested
  );

  const callStartedAt = firstTimestampValue(
    payload.call_started_at,
    payload.startedAt,
    payload.started_at,
    call.startedAt,
    call.started_at,
    call.startedAtUTC,
    message.startedAt,
    message.started_at
  );

  const callEndedAt = firstTimestampValue(
    payload.call_ended_at,
    payload.endedAt,
    payload.ended_at,
    call.endedAt,
    call.ended_at,
    call.endedAtUTC,
    message.endedAt,
    message.ended_at
  );

  const durationSeconds = firstNumberValue(
    payload.duration_seconds,
    payload.durationSeconds,
    payload.duration,
    call.duration_seconds,
    call.durationSeconds,
    call.duration,
    message.duration_seconds,
    message.durationSeconds,
    message.duration
  );

  const transcript = firstStringValue(
    payload.transcript,
    call.transcript,
    message.transcript
  );

  const summary = firstStringValue(
    payload.summary,
    call.summary,
    message.summary,
    analysis.summary
  );

  const outcome = firstStringValue(
    payload.outcome,
    call.outcome,
    message.outcome,
    structuredData.outcome,
    analysis.outcome,
    analysis.successEvaluation,
    analysis.success_evaluation
  );

  const recordingUrl = firstStringValue(
    payload.recording_url,
    payload.recordingUrl,
    call.recording_url,
    call.recordingUrl,
    call.recording?.url,
    message.recording_url,
    message.recordingUrl,
    message.recording?.url
  );

  const appointmentTime = firstTimestampValue(
    payload.appointment_time,
    payload.appointmentTime,
    message.appointment_time,
    message.appointmentTime,
    structuredData.appointment_time,
    structuredData.appointmentTime,
    structuredData.booked_time,
    structuredData.bookedTime
  );

  return {
    provider_call_id: providerCallId,
    caller_phone: callerPhone,
    roofer_destination_number: rooferDestinationNumber,
    call_started_at: callStartedAt,
    call_ended_at: callEndedAt,
    duration_seconds: durationSeconds,
    transcript,
    summary,
    outcome,
    appointment_booked: appointmentBooked,
    appointment_requested: appointmentRequested,
    recording_url: recordingUrl,
    appointment_time: appointmentTime,
  };
}

// Build 244: Vapi message/event-type routing.
//
// Vapi delivers ALL server-message types (End Of Call Report, Status Update, Conversation Update,
// Speech Update, …) to the same webhook URL. Before Build 244 every event was processed as a
// call-completion and any browser/webCall or interim event returned HTTP 400 (missing_required_field).
//
// These sets use the repo's existing event/type conventions: the legacy fixtures carry
// `event: "call.completed"`, while Vapi's native server messages use `message.type:
// "end-of-call-report" | "status-update" | "conversation-update" | "speech-update"`.
const TERMINAL_EVENT_TYPES = new Set([
  'end-of-call-report',
  'call.completed',
  'call-completed',
]);

const KNOWN_NON_TERMINAL_EVENT_TYPES = new Set([
  'status-update',
  'conversation-update',
  'speech-update',
]);

function normalizeEventType(...values: unknown[]): string | null {
  const value = firstStringValue(...values);

  if (!value) {
    return null;
  }

  return value.trim().toLowerCase().replace(/[\s_]+/g, '-');
}

export function extractVapiEventType(payload: VapiWebhookPayload): string | null {
  const message = payload.message ?? {};

  return normalizeEventType(
    payload.type,
    payload.event,
    payload.event_type,
    payload.eventType,
    message.type,
    message.event,
    message.event_type,
    message.eventType
  );
}

export function detectVapiCallTransport(
  payload: VapiWebhookPayload,
  normalized: NormalizedVapiCallCompletedPayload
): 'web' | 'phone' | 'unknown' {
  const message = payload.message ?? {};
  const call = payload.call ?? message.call ?? {};

  const callType = (firstStringValue(call.type, call.transport, message.call?.type) ?? '')
    .toLowerCase();

  if (callType.includes('web')) {
    return 'web';
  }

  if (callType.includes('phone') || callType.includes('pstn')) {
    return 'phone';
  }

  // No explicit transport marker: a present PSTN destination number implies a phone call.
  if (normalized.roofer_destination_number) {
    return 'phone';
  }

  return 'unknown';
}

export type VapiWebhookRoutingDecision =
  | 'process_call_completed'
  | 'acknowledge_non_terminal'
  | 'acknowledge_web_call';

export type VapiWebhookEventClassification = {
  event_type: string | null;
  terminal: boolean;
  known_non_terminal: boolean;
  transport: 'web' | 'phone' | 'unknown';
  has_roofer_destination: boolean;
  decision: VapiWebhookRoutingDecision;
  reason: string;
};

/**
 * Build 244: decide how a Vapi webhook payload should be handled, BEFORE any Supabase access.
 *
 *  - Known interim event types (status/conversation/speech update) and any unrecognized non-terminal
 *    type are acknowledged with a no-op so full lead/booking processing is attempted only for a
 *    genuine final call report.
 *  - A browser/webCall final report with no PSTN roofer destination is treated as a synthetic,
 *    non-routed web call (no-op) — it must not become a phone-lead/booking candidate and must not
 *    fail the phone-keyed required-field gate with a 400.
 *  - A terminal report that carries a PSTN roofer destination enters the existing full processing
 *    path, where the phone-keyed required-field gate still protects real phone-lead behavior.
 *
 * This function is pure (no Supabase, no network) so it is unit-testable in isolation.
 */
export function classifyVapiWebhookEvent(
  payload: VapiWebhookPayload,
  normalized?: NormalizedVapiCallCompletedPayload
): VapiWebhookEventClassification {
  const normalizedPayload =
    normalized ?? normalizeVapiCallCompletedPayload(payload);

  const eventType = extractVapiEventType(payload);
  const transport = detectVapiCallTransport(payload, normalizedPayload);
  const hasRooferDestination = Boolean(normalizedPayload.roofer_destination_number);
  const knownNonTerminal =
    eventType !== null && KNOWN_NON_TERMINAL_EVENT_TYPES.has(eventType);
  // A null/absent event type is treated as terminal-eligible to preserve legacy/typeless payloads.
  const terminal = eventType === null || TERMINAL_EVENT_TYPES.has(eventType);

  const base = {
    event_type: eventType,
    terminal,
    known_non_terminal: knownNonTerminal,
    transport,
    has_roofer_destination: hasRooferDestination,
  };

  if (knownNonTerminal) {
    return {
      ...base,
      decision: 'acknowledge_non_terminal',
      reason: `non_terminal_event:${eventType}`,
    };
  }

  if (eventType !== null && !terminal) {
    return {
      ...base,
      decision: 'acknowledge_non_terminal',
      reason: `unrecognized_event:${eventType}`,
    };
  }

  if (!hasRooferDestination && transport !== 'phone') {
    return {
      ...base,
      decision: 'acknowledge_web_call',
      reason:
        transport === 'web' ? 'web_call_no_destination' : 'no_roofer_destination',
    };
  }

  return {
    ...base,
    decision: 'process_call_completed',
    reason: 'terminal_phone_call',
  };
}

async function findExistingCallId(
  supabase: any,
  providerCallId: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('calls')
    .select('id')
    .eq('provider', 'vapi')
    .eq('provider_call_id', providerCallId)
    .maybeSingle();

  if (error) {
    console.error('Vapi existing call lookup failed', {
      code: error.code,
      message: error.message,
    });

    return null;
  }

  const existingCall = data as { id?: string } | null;

  return existingCall?.id ?? null;
}

async function findSingleMatchingLeadId(
  supabase: any,
  rooferId: string,
  callerPhone: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('leads')
    .select('id')
    .eq('roofer_id', rooferId)
    .eq('phone', callerPhone)
    .limit(2);

  if (error) {
    console.error('Vapi lead match lookup failed', {
      code: error.code,
      message: error.message,
    });

    return null;
  }

  const matches = (data ?? []) as Array<{ id?: string }>;

  if (matches.length !== 1) {
    return null;
  }

  return matches[0]?.id ?? null;
}

async function createVapiLead(
  supabase: any,
  rooferId: string,
  normalized: NormalizedVapiCallCompletedPayload
): Promise<string | null> {
  const leadPayload = {
    roofer_id: rooferId,
    phone: normalized.caller_phone,
    source_path: 'phone',
    source_detail: 'vapi',
    status: normalized.appointment_booked ? 'booked' : 'needs_attention',
    issue_description: normalized.summary,
    notes: normalized.transcript,
    owner_notified: false,
  };

  const { data, error } = await supabase
    .from('leads')
    .insert(leadPayload)
    .select('id')
    .single();

  if (error) {
    console.error('Vapi lead creation failed', {
      code: error.code,
      message: error.message,
    });

    return null;
  }

  return data?.id ?? null;
}


async function findExistingBookingId(
  supabase: any,
  leadId: string,
  bookedTime: string
): Promise<string | null> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('lead_id', leadId)
    .eq('booked_time', bookedTime)
    .limit(1);

  if (error) {
    console.error('Vapi booking lookup failed', {
      code: error.code,
      message: error.message,
    });

    return null;
  }

  return data?.[0]?.id ?? null;
}

async function createVapiBooking(
  supabase: any,
  rooferId: string,
  leadId: string,
  normalized: NormalizedVapiCallCompletedPayload
): Promise<string | null> {
  if (!normalized.appointment_booked || !normalized.appointment_time) {
    return null;
  }

  const existingBookingId = await findExistingBookingId(
    supabase,
    leadId,
    normalized.appointment_time
  );

  if (existingBookingId) {
    return existingBookingId;
  }

  const bookingPayload = {
    roofer_id: rooferId,
    lead_id: leadId,
    appointment_type: 'site_visit',
    booked_time: normalized.appointment_time,
    calendar_provider: 'vapi',
    status: 'scheduled',
    is_qualified: true,
    qualification_status: 'qualified',
    qualification_reason:
      normalized.summary ?? 'Vapi call indicated appointment was booked.',
    counts_toward_confidence_promise: true,
    notes: normalized.transcript,
  };

  const { data, error } = await supabase
    .from('bookings')
    .insert(bookingPayload)
    .select('id')
    .single();

  if (error) {
    console.error('Vapi booking creation failed', {
      code: error.code,
      message: error.message,
    });

    return null;
  }

  return data?.id ?? null;
}

export async function processVapiCallCompleted(
  payload: VapiWebhookPayload
): Promise<VapiCallCompletedResult> {
  const normalized = normalizeVapiCallCompletedPayload(payload);

  // Build 244: route by Vapi message/event type and call transport before any write path.
  const classification = classifyVapiWebhookEvent(payload, normalized);

  if (classification.decision === 'acknowledge_non_terminal') {
    // Interim Vapi server-message events (status/conversation/speech update) and any unrecognized
    // non-terminal type are acknowledged as a no-op so Vapi stops retrying and no lead/booking is
    // created. Auth still ran first in the route middleware, so this path is only reached when
    // authorized.
    return {
      ok: true,
      dry_run: false,
      acknowledged: true,
      processed: false,
      event_type: classification.event_type,
      reason: classification.reason,
      normalized,
    };
  }

  if (classification.decision === 'acknowledge_web_call') {
    // Browser/webCall final report with no PSTN roofer destination: handle as a synthetic,
    // non-routed web call. No lead/booking is created and it does NOT fail the phone-keyed
    // required-field gate with a 400.
    return {
      ok: true,
      dry_run: false,
      acknowledged: true,
      processed: false,
      web_call: true,
      event_type: classification.event_type,
      reason: classification.reason,
      normalized,
    };
  }

  // decision === 'process_call_completed': a terminal report with a PSTN roofer destination enters
  // the existing full processing path. The phone-keyed required-field gate below still protects
  // real phone-lead behavior (e.g. a PSTN report missing caller_phone still returns 400).
  if (
    !normalized.provider_call_id ||
    !normalized.caller_phone ||
    !normalized.roofer_destination_number
  ) {
    return {
      ok: false,
      dry_run: false,
      error: 'missing_required_field',
      normalized,
    };
  }

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    console.error('Supabase server configuration is missing for Vapi calls insert');

    return {
      ok: false,
      dry_run: false,
      error: 'lookup_failed',
      normalized,
    };
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

  const { data: roofer, error: rooferError } = await supabase
    .from('roofers')
    .select('id, business_name, twilio_number')
    .eq('twilio_number', normalized.roofer_destination_number)
    .maybeSingle();

  if (rooferError) {
    console.error('Vapi roofer lookup failed', {
      code: rooferError.code,
      message: rooferError.message,
    });

    return {
      ok: false,
      dry_run: false,
      error: 'lookup_failed',
      normalized,
    };
  }

  if (!roofer) {
    return {
      ok: false,
      dry_run: false,
      error: 'unknown_roofer',
      normalized,
    };
  }

  const existingCallId = await findExistingCallId(
    supabase,
    normalized.provider_call_id
  );

  if (existingCallId) {
    return {
      ok: true,
      dry_run: false,
      duplicate: true,
      inserted: false,
      call_id: existingCallId,
      provider_call_id: normalized.provider_call_id,
      roofer_id: roofer.id,
      roofer,
      normalized,
    };
  }

  const existingLeadId = await findSingleMatchingLeadId(
    supabase,
    roofer.id,
    normalized.caller_phone
  );

  const matchedLeadId =
    existingLeadId ??
    (await createVapiLead(supabase, roofer.id, normalized));

  const bookingId = matchedLeadId
    ? await createVapiBooking(supabase, roofer.id, matchedLeadId, normalized)
    : null;

  const insertPayload = {
    roofer_id: roofer.id,
    lead_id: matchedLeadId,
    provider: 'vapi',
    provider_call_id: normalized.provider_call_id,
    caller_phone: normalized.caller_phone,
    call_started_at: normalized.call_started_at,
    call_ended_at: normalized.call_ended_at,
    duration_seconds: normalized.duration_seconds,
    transcript: normalized.transcript,
    summary: normalized.summary,
    outcome: normalized.outcome,
    appointment_requested: normalized.appointment_requested,
    appointment_booked: normalized.appointment_booked,
    recording_url: normalized.recording_url,
    raw_payload: payload,
  };

  const { data: insertedCall, error: insertError } = await supabase
    .from('calls')
    .insert(insertPayload)
    .select('id')
    .single();

  if (insertError) {
    if (insertError.code === '23505') {
      const duplicateCallId = await findExistingCallId(
        supabase,
        normalized.provider_call_id
      );

      if (duplicateCallId) {
        return {
          ok: true,
          dry_run: false,
          duplicate: true,
          inserted: false,
          call_id: duplicateCallId,
          provider_call_id: normalized.provider_call_id,
          roofer_id: roofer.id,
          roofer,
          normalized,
        };
      }
    }

    console.error('Vapi calls insert failed', {
      code: insertError.code,
      message: insertError.message,
    });

    return {
      ok: false,
      dry_run: false,
      error: 'insert_failed',
      provider_call_id: normalized.provider_call_id,
      roofer_id: roofer.id,
      roofer,
      normalized,
    };
  }

  return {
    ok: true,
    dry_run: false,
    inserted: true,
    duplicate: false,
    call_id: insertedCall.id,
    provider_call_id: normalized.provider_call_id,
    matched_lead_id: matchedLeadId,
    booking_id: bookingId,
    roofer_id: roofer.id,
    roofer,
    normalized,
  };
}
