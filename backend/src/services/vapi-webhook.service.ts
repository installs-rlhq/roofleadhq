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

// Build 281: Vapi "Structured Outputs" ingestion.
//
// Vapi has TWO distinct analysis features that both surface user-defined fields:
//   1. Legacy "Structured Data" — a single analysis JSON schema delivered at
//      `message.analysis.structuredData` (already read directly above).
//   2. Newer "Structured Outputs" — one or more named output objects delivered at
//      `message.analysis.structuredOutputs`, keyed differently from structuredData.
//
// Build 279 evidence shows Jason configured the Test Roofing Assistant via Analysis -> Structured
// Outputs, so the live Build 280 EOCR delivered appointment_booked/appointment_time/appointment_requested
// under `structuredOutputs` — a path the normalizer did not read, so it normalized them false/null and
// createVapiBooking was gated off (booking_id=null) even though the UI/transcript showed a booked visit.
//
// Vapi's structuredOutputs container shape is not fixed across versions, so this reader is
// shape-tolerant. It resolves a single named field from any of these observed shapes:
//   A. array of entries:            [{ name: 'appointment_booked', result: true }, ...]
//   B. object keyed by field name:  { appointment_booked: true }
//   C. object keyed by name -> box: { appointment_booked: { result: true } }
//   D. object keyed by output id:   { 'so_abc123': { name: 'appointment_booked', result: true } }
// It returns `undefined` when the field is absent, so callers can fall through to other candidates
// without changing any existing structuredData behavior.
function unwrapStructuredOutputEntry(entry: unknown): unknown {
  if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
    const box = entry as Record<string, unknown>;

    if ('result' in box) {
      return box.result;
    }

    if ('value' in box) {
      return box.value;
    }
  }

  return entry;
}

function extractStructuredOutputValue(
  container: unknown,
  targetName: string
): unknown {
  if (!container || typeof container !== 'object') {
    return undefined;
  }

  // Shape A: array of named entries.
  if (Array.isArray(container)) {
    for (const entry of container) {
      if (entry && typeof entry === 'object') {
        const box = entry as Record<string, unknown>;
        const name = firstStringValue(box.name, box.key, box.title);

        if (name === targetName) {
          return unwrapStructuredOutputEntry(entry);
        }
      }
    }

    return undefined;
  }

  const record = container as Record<string, unknown>;

  // Shapes B/C: object keyed directly by the field name.
  if (Object.prototype.hasOwnProperty.call(record, targetName)) {
    return unwrapStructuredOutputEntry(record[targetName]);
  }

  // Shape D: object keyed by output id, each carrying its own `name`.
  for (const key of Object.keys(record)) {
    const entry = record[key];

    if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
      const box = entry as Record<string, unknown>;
      const name = firstStringValue(box.name, box.key, box.title);

      if (name === targetName) {
        return unwrapStructuredOutputEntry(entry);
      }
    }
  }

  return undefined;
}

// Build 284: conservative summary/transcript booking fallback.
//
// Build 283 live evidence: with the Build 281 structuredOutputs fix DEPLOYED, a real mapped-roofer
// PSTN call still normalized appointment_booked=false / appointment_requested=false /
// appointment_time=null (booking_id=null) even though the Vapi summary AND transcript clearly stated
// an in-person site visit was scheduled for "Thursday, July 2nd, at 2 PM". So the live call-completed
// webhook payload carried NO usable structured appointment fields at backend-processing time (neither
// structuredData nor structuredOutputs) — the structured-only path (opt1) is insufficient live.
//
// This fallback derives a booking ONLY when the structured signal is absent (not booked, or no time),
// and only from TRUSTED Vapi analysis text (summary preferred, then transcript). It is deliberately
// strict to avoid over-eager bookings: it requires ALL of
//   (a) explicit confirmed-booking language (scheduled / booked / arranged / confirmed / "all set" /
//       "agreed to a … visit"), AND
//   (b) an appointment noun (site visit / appointment / inspection / visit), AND
//   (c) an explicit CALENDAR DATE (month name + day-of-month) — a bare weekday like "Thursday" is too
//       ambiguous to auto-create a booking, so it is intentionally NOT sufficient, AND
//   (d) an explicit clock time (e.g. "2 PM").
// Vague interest, callback-only, or emergency-without-a-scheduled-visit conversations do NOT book.
// The clock time is interpreted in UTC to stay consistent with the rest of this normalizer (which
// treats all timestamps via new Date(...).toISOString(), matching the structured fixtures' ...Z times).
const BOOKING_LANGUAGE =
  /\b(scheduled|booked|arranged|reserved|confirmed|all set|agreed to (?:a |an |the )?(?:free )?(?:in[-\s]?person |on[-\s]?site )?(?:site\s?visit|appointment|inspection|visit))\b/i;
const APPOINTMENT_NOUN = /\b(site\s?visit|appointment|inspection|visit)\b/i;
const MONTH_INDEX: Record<string, number> = {
  january: 0, jan: 0, february: 1, feb: 1, march: 2, mar: 2, april: 3, apr: 3,
  may: 4, june: 5, jun: 5, july: 6, jul: 6, august: 7, aug: 7,
  september: 8, sept: 8, sep: 8, october: 9, oct: 9, november: 10, nov: 10,
  december: 11, dec: 11,
};

function extractClockTimeFromText(text: string): { hour: number; minute: number } | null {
  const m = text.match(/\b(1[0-2]|0?[1-9])(?::([0-5]\d))?\s*(a\.?m\.?|p\.?m\.?)\b/i);

  if (!m) {
    return null;
  }

  let hour = parseInt(m[1], 10);
  const minute = m[2] ? parseInt(m[2], 10) : 0;
  const meridiem = m[3].replace(/\./g, '').toLowerCase();

  if (meridiem === 'pm' && hour < 12) {
    hour += 12;
  }

  if (meridiem === 'am' && hour === 12) {
    hour = 0;
  }

  return { hour, minute };
}

function extractCalendarDateFromText(text: string): { month: number; day: number } | null {
  // Require an explicit month name + day-of-month. Longer month names precede abbreviations so the
  // fuller token wins. A bare weekday is intentionally NOT accepted here.
  const m = text.match(
    /\b(january|jan|february|feb|march|mar|april|apr|may|june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec)\.?\s+(\d{1,2})(?:st|nd|rd|th)?\b/i
  );

  if (!m) {
    return null;
  }

  const month = MONTH_INDEX[m[1].toLowerCase()];
  const day = parseInt(m[2], 10);

  if (month === undefined || day < 1 || day > 31) {
    return null;
  }

  return { month, day };
}

// Returns an ISO timestamp for a confidently-scheduled appointment described in `text`, anchored to
// the call date for the year, or null when the strict booking criteria are not all met.
function deriveBookingTimeFromText(
  text: string | null,
  anchorIso: string | null
): string | null {
  if (!text || !anchorIso) {
    return null;
  }

  if (!BOOKING_LANGUAGE.test(text) || !APPOINTMENT_NOUN.test(text)) {
    return null;
  }

  const time = extractClockTimeFromText(text);
  const date = extractCalendarDateFromText(text);

  if (!time || !date) {
    return null;
  }

  const anchor = new Date(anchorIso);

  if (Number.isNaN(anchor.getTime())) {
    return null;
  }

  const DAY_MS = 86400000;
  const year = anchor.getUTCFullYear();
  let ms = Date.UTC(year, date.month, date.day, time.hour, time.minute);

  // Year rollover: a call late in the year referencing an early-year month resolves to next year.
  if (ms < anchor.getTime() - 2 * DAY_MS) {
    ms = Date.UTC(year + 1, date.month, date.day, time.hour, time.minute);
  }

  // Forward-window guard: the appointment must fall on/around/after the call, within ~1 year.
  if (ms < anchor.getTime() - 2 * DAY_MS || ms > anchor.getTime() + 370 * DAY_MS) {
    return null;
  }

  return new Date(ms).toISOString();
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
  // Build 281: Vapi "Structured Outputs" container (distinct from legacy structuredData). Read from the
  // same analysis/message/payload precedence. Left null when absent so the extractor short-circuits.
  const structuredOutputs =
    analysis.structuredOutputs ??
    analysis.structured_outputs ??
    message.structuredOutputs ??
    message.structured_outputs ??
    payload.structuredOutputs ??
    payload.structured_outputs ??
    null;

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
    analysis.appointmentBooked,
    // Build 281: fall through to Vapi Structured Outputs when structuredData is absent.
    extractStructuredOutputValue(structuredOutputs, 'appointment_booked'),
    extractStructuredOutputValue(structuredOutputs, 'appointmentBooked'),
    extractStructuredOutputValue(structuredOutputs, 'booked')
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
    analysis.appointmentRequested,
    // Build 281: fall through to Vapi Structured Outputs when structuredData is absent.
    extractStructuredOutputValue(structuredOutputs, 'appointment_requested'),
    extractStructuredOutputValue(structuredOutputs, 'appointmentRequested'),
    extractStructuredOutputValue(structuredOutputs, 'requested_appointment')
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
    structuredData.bookedTime,
    // Build 281: fall through to Vapi Structured Outputs when structuredData is absent.
    extractStructuredOutputValue(structuredOutputs, 'appointment_time'),
    extractStructuredOutputValue(structuredOutputs, 'appointmentTime'),
    extractStructuredOutputValue(structuredOutputs, 'booked_time')
  );

  // Build 284: conservative summary/transcript fallback. Structured fields (structuredData ->
  // structuredOutputs) take precedence; this only runs when the structured signal did NOT yield a
  // booked appointment with a time. Prefer summary, then transcript. See deriveBookingTimeFromText
  // for the strict guards (booking language + appointment noun + explicit calendar date + clock time).
  let finalAppointmentBooked = appointmentBooked;
  let finalAppointmentRequested = appointmentRequested;
  let finalAppointmentTime = appointmentTime;

  if (!finalAppointmentBooked || !finalAppointmentTime) {
    const anchorIso = callStartedAt ?? callEndedAt;
    const derivedTime =
      deriveBookingTimeFromText(summary, anchorIso) ??
      deriveBookingTimeFromText(transcript, anchorIso);

    if (derivedTime) {
      finalAppointmentBooked = true;
      finalAppointmentRequested = true;
      finalAppointmentTime = finalAppointmentTime ?? derivedTime;
    }
  }

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
    appointment_booked: finalAppointmentBooked,
    appointment_requested: finalAppointmentRequested,
    recording_url: recordingUrl,
    appointment_time: finalAppointmentTime,
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
    // Build 268: the terminal end-of-call report carried a PSTN destination number that is not
    // mapped to any roofer's `twilio_number` (e.g. the clean Vapi-managed Test Number used for
    // pre-launch PSTN validation). Before Build 268 this returned the unknown_roofer error, which
    // the route mapped to HTTP 404 — and Vapi treats a 404 EOCR response as a failed delivery and
    // retries it. An unmapped destination is not an error: the report simply isn't routable to a
    // roofer yet. So acknowledge it as a controlled no-op with an explicit sanitized reason (no
    // phone value logged), writing no lead/booking/call. A genuinely routed roofer whose
    // destination number IS mapped still processes normally below. The route's `unknown_roofer`
    // → 404 branch is retained defensively but is no longer reached from this path.
    console.warn('Vapi EOCR destination not mapped to a roofer; acknowledged as controlled no-op', {
      reason: 'unknown_roofer_destination_unmapped',
      event_type: classification.event_type,
    });

    return {
      ok: true,
      dry_run: false,
      acknowledged: true,
      processed: false,
      event_type: classification.event_type,
      reason: 'unknown_roofer_destination_unmapped',
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
