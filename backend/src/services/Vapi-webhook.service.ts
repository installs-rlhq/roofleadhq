import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

type VapiWebhookPayload = Record<string, any>;

type NormalizedVapiDryRunPayload = {
  provider_call_id: string | null;
  caller_phone: string | null;
  roofer_destination_number: string | null;
  appointment_booked: boolean;
  appointment_requested: boolean;
  appointment_time: string | null;
};

type VapiDryRunLookupResult = {
  ok: boolean;
  dry_run: true;
  normalized: NormalizedVapiDryRunPayload;
  roofer_id?: string;
  roofer?: {
    id: string;
    business_name: string | null;
    twilio_number: string | null;
  };
  error?: 'missing_required_field' | 'unknown_roofer' | 'lookup_failed';
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

export function normalizeVapiCallCompletedPayload(
  payload: VapiWebhookPayload
): NormalizedVapiDryRunPayload {
  const call = payload.call ?? payload.message?.call ?? {};
  const customer = call.customer ?? payload.customer ?? {};
  const phoneNumber = call.phoneNumber ?? payload.phoneNumber ?? {};
  const analysis = call.analysis ?? payload.analysis ?? {};
  const structuredData =
    analysis.structuredData ??
    analysis.structured_data ??
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
    payload.message?.call?.id
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
      payload.message?.customer?.phone,
      payload.message?.customer?.number
    )
  );

  const rooferDestinationNumber = normalizePhone(
    firstStringValue(
      payload.roofer_destination_number,
      payload.destination_number,
      payload.destinationNumber,
      payload.to,
      call.destination_number,
      call.destinationNumber,
      call.to,
      phoneNumber.number,
      phoneNumber.phoneNumber,
      payload.message?.phoneNumber?.number,
      payload.message?.phoneNumber?.phoneNumber
    )
  );

  const appointmentBooked = firstBooleanValue(
    payload.appointment_booked,
    payload.appointmentBooked,
    structuredData.appointment_booked,
    structuredData.appointmentBooked,
    structuredData.booked,
    analysis.appointment_booked,
    analysis.appointmentBooked
  );

  const appointmentRequested = firstBooleanValue(
    payload.appointment_requested,
    payload.appointmentRequested,
    structuredData.appointment_requested,
    structuredData.appointmentRequested,
    structuredData.requested_appointment,
    structuredData.requestedAppointment,
    analysis.appointment_requested,
    analysis.appointmentRequested
  );

  const appointmentTime = firstStringValue(
    payload.appointment_time,
    payload.appointmentTime,
    structuredData.appointment_time,
    structuredData.appointmentTime,
    structuredData.preferred_time,
    structuredData.preferredTime,
    analysis.appointment_time,
    analysis.appointmentTime
  );

  return {
    provider_call_id: providerCallId,
    caller_phone: callerPhone,
    roofer_destination_number: rooferDestinationNumber,
    appointment_booked: appointmentBooked,
    appointment_requested: appointmentRequested,
    appointment_time: appointmentTime,
  };
}

export async function processVapiCallCompletedDryRun(
  payload: VapiWebhookPayload
): Promise<VapiDryRunLookupResult> {
  const normalized = normalizeVapiCallCompletedPayload(payload);

  if (
    !normalized.provider_call_id ||
    !normalized.caller_phone ||
    !normalized.roofer_destination_number
  ) {
    return {
      ok: false,
      dry_run: true,
      error: 'missing_required_field',
      normalized,
    };
  }

  if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
    console.error('Supabase server configuration is missing for Vapi dry-run lookup');

    return {
      ok: false,
      dry_run: true,
      error: 'lookup_failed',
      normalized,
    };
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

  const { data: roofer, error } = await supabase
    .from('roofers')
    .select('id, business_name, twilio_number')
    .eq('twilio_number', normalized.roofer_destination_number)
    .maybeSingle();

  if (error) {
    console.error('Vapi dry-run roofer lookup failed', {
      code: error.code,
      message: error.message,
    });

    return {
      ok: false,
      dry_run: true,
      error: 'lookup_failed',
      normalized,
    };
  }

  if (!roofer) {
    return {
      ok: false,
      dry_run: true,
      error: 'unknown_roofer',
      normalized,
    };
  }

  return {
    ok: true,
    dry_run: true,
    normalized,
    roofer_id: roofer.id,
    roofer,
  };
}
