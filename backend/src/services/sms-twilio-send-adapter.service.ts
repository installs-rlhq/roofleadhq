export const SMS_TWILIO_SEND_ADAPTER_TARGET = 'sms_twilio_send_adapter';

export interface SmsTwilioSendAdapterGate {
  allowTwilioSendAdapter?: boolean;
  sendTarget?: string;
  confirmSend?: boolean;
}

export interface SmsTwilioSendAdapterInput {
  roofer_id?: string;
  lead_id?: string;
  to?: string;
  from?: string;
  body?: string;
  gate?: SmsTwilioSendAdapterGate;
  fakeMode?: boolean;
  fakeProviderMessageId?: string;
  twilioClient?: any;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
}

export type SmsTwilioSendAdapterStatus = 'sent' | 'failed' | 'blocked';

export type SmsTwilioSendAdapterReason =
  | 'sent'
  | 'missing_send_gate'
  | 'missing_required_field'
  | 'missing_twilio_credentials'
  | 'twilio_send_failed';

export interface SmsTwilioSendAdapterResult {
  roofer_id?: string;
  lead_id?: string;
  to?: string;
  from?: string;
  body?: string;
  provider_message_id: string | null;
  status: SmsTwilioSendAdapterStatus;
  error: string | null;
  failedClosed: boolean;
  noSmsSent: boolean;
  noLiveTwilioClientConstructed: boolean;
  reason: SmsTwilioSendAdapterReason;
}

export function buildSmsTwilioSendAdapterGateFromEnv(
  env: Record<string, string | undefined>
): SmsTwilioSendAdapterGate {
  return {
    allowTwilioSendAdapter: env.SMS_TWILIO_SEND_ADAPTER === 'true',
    sendTarget: env.SMS_TWILIO_SEND_TARGET,
    confirmSend: env.SMS_TWILIO_CONFIRM_SEND === 'true'
  };
}

function hasSendGate(gate?: SmsTwilioSendAdapterGate): boolean {
  return Boolean(
    gate?.allowTwilioSendAdapter === true &&
      gate.sendTarget === SMS_TWILIO_SEND_ADAPTER_TARGET &&
      gate.confirmSend === true
  );
}

function baseResult(
  input: SmsTwilioSendAdapterInput,
  reason: SmsTwilioSendAdapterReason,
  error: string | null = null
): SmsTwilioSendAdapterResult {
  return {
    roofer_id: input.roofer_id,
    lead_id: input.lead_id,
    to: input.to,
    from: input.from,
    body: input.body,
    provider_message_id: null,
    status: reason === 'sent' ? 'sent' : reason === 'twilio_send_failed' ? 'failed' : 'blocked',
    error,
    failedClosed: reason !== 'sent',
    noSmsSent: true,
    noLiveTwilioClientConstructed: true,
    reason
  };
}

function hasRequiredSendFields(input: SmsTwilioSendAdapterInput): boolean {
  return Boolean(input.roofer_id && input.lead_id && input.to && input.from && input.body);
}

export async function sendSmsWithTwilioAdapter(
  input: SmsTwilioSendAdapterInput
): Promise<SmsTwilioSendAdapterResult> {
  if (!hasSendGate(input.gate)) {
    return baseResult(input, 'missing_send_gate');
  }

  if (!hasRequiredSendFields(input)) {
    return baseResult(input, 'missing_required_field');
  }

  if (input.fakeMode === true) {
    return {
      roofer_id: input.roofer_id,
      lead_id: input.lead_id,
      to: input.to,
      from: input.from,
      body: input.body,
      provider_message_id: input.fakeProviderMessageId || 'SM_fake_sms_twilio_send_adapter',
      status: 'sent',
      error: null,
      failedClosed: false,
      noSmsSent: true,
      noLiveTwilioClientConstructed: true,
      reason: 'sent'
    };
  }

  if (!input.twilioClient && (!input.twilioAccountSid || !input.twilioAuthToken)) {
    return baseResult(input, 'missing_twilio_credentials');
  }

  try {
    const client =
      input.twilioClient ||
      // Dynamic require prevents top-level Twilio client construction and keeps default paths inert.
      require('twilio')(input.twilioAccountSid, input.twilioAuthToken);

    const message = await client.messages.create({
      to: input.to,
      from: input.from,
      body: input.body
    });

    return {
      roofer_id: input.roofer_id,
      lead_id: input.lead_id,
      to: input.to,
      from: input.from,
      body: input.body,
      provider_message_id: message.sid || null,
      status: 'sent',
      error: null,
      failedClosed: false,
      noSmsSent: false,
      noLiveTwilioClientConstructed: Boolean(input.twilioClient),
      reason: 'sent'
    };
  } catch (error: any) {
    return {
      ...baseResult(input, 'twilio_send_failed', error?.message || 'Twilio send failed'),
      noSmsSent: false,
      noLiveTwilioClientConstructed: Boolean(input.twilioClient)
    };
  }
}
