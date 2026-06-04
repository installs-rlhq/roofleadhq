export interface SmsDuplicateSendLookupFollowUp {
  id?: string | null;
  roofer_id?: string | null;
  lead_id?: string | null;
  message_body?: string | null;
}

export interface SmsDuplicateSendLookupResult {
  duplicateSendExists: boolean;
  lookupSource: string;
  lookupError?: string;
}

export async function detectDuplicateSmsSend(
  supabaseClient: any,
  followUp: SmsDuplicateSendLookupFollowUp
): Promise<SmsDuplicateSendLookupResult> {
  const followUpId = followUp?.id;

  if (!followUpId || !followUp?.roofer_id || !followUp?.lead_id) {
    return {
      duplicateSendExists: true,
      lookupError: 'missing follow-up duplicate lookup fields',
      lookupSource: 'missing_required_field'
    };
  }

  const { data: workflowEvents, error: workflowEventError } = await supabaseClient
    .from('workflow_events')
    .select('id')
    .eq('roofer_id', followUp.roofer_id)
    .eq('lead_id', followUp.lead_id)
    .contains('metadata', { follow_up_id: followUpId })
    .or('event_type.ilike.%sms%,event_source.ilike.%sms%,description.ilike.%sms%')
    .limit(1);

  if (workflowEventError) {
    return {
      duplicateSendExists: true,
      lookupError: workflowEventError.message,
      lookupSource: 'workflow_events'
    };
  }

  if ((workflowEvents || []).length > 0) {
    return {
      duplicateSendExists: true,
      lookupSource: 'workflow_events.metadata.follow_up_id'
    };
  }

  let messageQuery = supabaseClient
    .from('messages')
    .select('id')
    .eq('roofer_id', followUp.roofer_id)
    .eq('lead_id', followUp.lead_id)
    .eq('channel', 'sms')
    .eq('direction', 'outbound')
    .not('sent_at', 'is', null)
    .limit(1);

  if (followUp.message_body) {
    messageQuery = messageQuery.eq('message_body', followUp.message_body);
  }

  const { data: messages, error: messageError } = await messageQuery;

  if (messageError) {
    return {
      duplicateSendExists: true,
      lookupError: messageError.message,
      lookupSource: 'messages'
    };
  }

  return {
    duplicateSendExists: (messages || []).length > 0,
    lookupSource: followUp.message_body
      ? 'messages.roofer_id.lead_id.message_body.sent_at'
      : 'messages.roofer_id.lead_id.sent_at'
  };
}
