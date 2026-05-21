interface VapiCallPayload {
  callId: string;
  phoneNumber: string;
  transcript?: string;
}

export const handleVapiWebhook = (payload: VapiCallPayload) => {
  console.log('Received Vapi webhook:', payload);
  // TODO: Process call data and trigger follow-ups
  return { success: true };
};
