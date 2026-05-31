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

export async function processVapiCallCompleted(
  payload: VapiWebhookPayload
): Promise<VapiCallCompletedResult> {
  const normalized = normalizeVapiCallCompletedPayload(payload);

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

  const insertPayload = {
    roofer_id: roofer.id,
    lead_id: null,
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
    roofer_id: roofer.id,
    roofer,
    normalized,
  };
}
