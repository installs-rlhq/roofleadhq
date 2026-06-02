import { createClient } from '@supabase/supabase-js';
import config from '../config/config';

if (!config.supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for internal admin errors service');
}

const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

const DEFAULT_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';

type AdminErrorsParams = {
  rooferId?: string | null;
  limit?: number;
  since?: string | null;
};

function safeLimit(value?: number): number {
  if (!value || Number.isNaN(value)) return 50;
  return Math.min(Math.max(Math.floor(value), 1), 100);
}

function sinceOrDefault(value?: string | null): string {
  if (value) {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }

  const fallback = new Date();
  fallback.setDate(fallback.getDate() - 30);
  return fallback.toISOString();
}

function maskPhone(phone: string | null | undefined): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, '');
  const last4 = digits.slice(-4);
  if (!last4) return null;
  return `(***) ***-${last4}`;
}

function truncate(value: unknown, maxLength = 300): string | null {
  if (value === null || value === undefined) return null;

  const text =
    typeof value === 'string'
      ? value
      : JSON.stringify(value);

  if (!text) return null;
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function getRooferId(params: AdminErrorsParams): string {
  return params.rooferId && params.rooferId.trim()
    ? params.rooferId.trim()
    : DEFAULT_ROOFER_ID;
}

export async function getInternalAdminErrors(params: AdminErrorsParams) {
  const rooferId = getRooferId(params);
  const limit = safeLimit(params.limit);
  const since = sinceOrDefault(params.since);
  const now = new Date().toISOString();

  const [
    workflowErrorsResult,
    failedMessagesResult,
    stuckFollowupsResult,
    bookingFailuresResult,
    vapiReviewResult,
    unmatchedMessagesResult,
  ] = await Promise.all([
    supabase
      .from('workflow_events')
      .select('id,created_at,roofer_id,lead_id,event_type,metadata,roofers(business_name),leads(homeowner_name)')
      .eq('roofer_id', rooferId)
      .eq('event_type', 'workflow_error')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit),

    supabase
      .from('messages')
      .select('id,created_at,roofer_id,lead_id,channel,direction,provider,status,error_message,from_number,to_number,roofers(business_name),leads(homeowner_name)')
      .eq('roofer_id', rooferId)
      .eq('status', 'failed')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit),

    supabase
      .from('follow_ups')
      .select('id,roofer_id,lead_id,followup_type,status,scheduled_for,stopped_reason,roofers(business_name),leads(homeowner_name)')
      .eq('roofer_id', rooferId)
      .or(`status.eq.failed,and(status.eq.scheduled,scheduled_for.lt.${now}),and(status.eq.skipped,stopped_reason.not.is.null)`)
      .order('scheduled_for', { ascending: true })
      .limit(limit),

    supabase
      .from('workflow_events')
      .select('id,created_at,roofer_id,lead_id,event_type,metadata,roofers(business_name),leads(homeowner_name)')
      .eq('roofer_id', rooferId)
      .eq('event_type', 'booking_failed')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit),

    supabase
      .from('calls')
      .select('id,created_at,roofer_id,lead_id,provider,provider_call_id,caller_phone,summary,outcome,roofers(business_name),leads(homeowner_name)')
      .eq('roofer_id', rooferId)
      .eq('provider', 'vapi')
      .or('caller_phone.is.null,summary.is.null,outcome.is.null,lead_id.is.null')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit),

    supabase
      .from('messages')
      .select('id,created_at,roofer_id,lead_id,channel,direction,from_number,to_number,message_body,roofers(business_name)')
      .eq('roofer_id', rooferId)
      .eq('direction', 'inbound')
      .is('lead_id', null)
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(limit),
  ]);

  const results = [
    workflowErrorsResult,
    failedMessagesResult,
    stuckFollowupsResult,
    bookingFailuresResult,
    vapiReviewResult,
    unmatchedMessagesResult,
  ];

  const firstError = results.find((result) => result.error)?.error;
  if (firstError) {
    throw new Error(firstError.message);
  }

  const recentWorkflowErrors = (workflowErrorsResult.data || []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    roofer_id: row.roofer_id,
    business_name: row.roofers?.business_name || null,
    lead_id: row.lead_id,
    homeowner_name: row.leads?.homeowner_name || null,
    event_type: row.event_type,
    summary: truncate(row.metadata?.summary || row.metadata?.error || row.metadata),
    metadata_excerpt: truncate(row.metadata),
  }));

  const failedMessages = (failedMessagesResult.data || []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    roofer_id: row.roofer_id,
    business_name: row.roofers?.business_name || null,
    lead_id: row.lead_id,
    homeowner_name: row.leads?.homeowner_name || null,
    channel: row.channel || null,
    direction: row.direction || null,
    provider: row.provider || null,
    status: row.status || null,
    from_number: maskPhone(row.from_number),
    to_number: maskPhone(row.to_number),
    error_summary: truncate(row.error_message),
  }));

  const stuckFollowups = (stuckFollowupsResult.data || []).map((row: any) => ({
    id: row.id,
    due_at: row.scheduled_for || null,
    roofer_id: row.roofer_id,
    business_name: row.roofers?.business_name || null,
    lead_id: row.lead_id,
    homeowner_name: row.leads?.homeowner_name || null,
    followup_type: row.followup_type || null,
    status: row.status || null,
    stopped_reason: row.stopped_reason || null,
  }));

  const bookingFailures = (bookingFailuresResult.data || []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    roofer_id: row.roofer_id,
    business_name: row.roofers?.business_name || null,
    lead_id: row.lead_id,
    homeowner_name: row.leads?.homeowner_name || null,
    requested_time: row.metadata?.requested_time || row.metadata?.appointment_time || null,
    failure_summary: truncate(row.metadata?.summary || row.metadata?.error || row.metadata),
  }));

  const vapiReviewNeeded = (vapiReviewResult.data || []).map((row: any) => {
    const missingFields = [
      !row.caller_phone ? 'caller_phone' : null,
      !row.summary ? 'summary' : null,
      !row.outcome ? 'outcome' : null,
      !row.lead_id ? 'lead_id' : null,
    ].filter(Boolean);

    return {
      id: row.id,
      created_at: row.created_at,
      roofer_id: row.roofer_id,
      business_name: row.roofers?.business_name || null,
      lead_id: row.lead_id,
      homeowner_name: row.leads?.homeowner_name || null,
      caller_phone: maskPhone(row.caller_phone),
      provider_call_id: row.provider_call_id || null,
      missing_fields: missingFields,
      summary: truncate(row.summary),
    };
  });

  const unmatchedMessages = (unmatchedMessagesResult.data || []).map((row: any) => ({
    id: row.id,
    created_at: row.created_at,
    roofer_id: row.roofer_id,
    business_name: row.roofers?.business_name || null,
    from_number: maskPhone(row.from_number),
    to_number: maskPhone(row.to_number),
    channel: row.channel || null,
    body_preview: truncate(row.message_body, 160),
    reason: 'Inbound message has no matched lead_id',
  }));

  return {
    kpi: {
      workflowErrors: recentWorkflowErrors.length,
      failedMessages: failedMessages.length,
      overdueFollowups: stuckFollowups.length,
      bookingFailures: bookingFailures.length,
      vapiReviewNeeded: vapiReviewNeeded.length,
      unmatchedMessages: unmatchedMessages.length,
    },
    recentWorkflowErrors,
    failedMessages,
    stuckFollowups,
    bookingFailures,
    vapiReviewNeeded,
    unmatchedMessages,
  };
}
