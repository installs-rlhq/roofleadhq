import {
  detectDuplicateSmsSend,
  type SmsDuplicateSendLookupResult
} from './sms-duplicate-send-detector.service';
import {
  planSmsDispatch,
  type SmsDispatcherPlan,
  type SmsDispatcherPlannedAction
} from './sms-dispatcher-planner.service';
import {
  buildSmsDispatcherWritePlan,
  type SmsDispatcherWritePlan
} from './sms-dispatcher-write-plan.service';

export interface SmsDispatcherDryRunExecutorInput {
  supabase: any;
  currentTime?: string | Date;
  limit?: number;
  dryRun?: boolean;
}

export interface SmsDispatcherDryRunPlanResult {
  follow_up_id?: string;
  roofer?: string | null;
  sms_enabled?: boolean | null;
  lead_status?: string | null;
  followup_type?: string | null;
  template_type?: string | null;
  action: SmsDispatcherPlannedAction | 'fail_closed';
  reason: SmsDispatcherPlan['reason'] | 'missing_relation' | 'lookup_error' | 'dry_run_required';
  should_send: boolean;
  duplicate_send_exists?: boolean;
  duplicate_lookup_source?: string;
  duplicate_lookup_error?: string | null;
  rescheduled_for?: string | null;
  writePlan?: SmsDispatcherWritePlan;
}

export interface SmsDispatcherDryRunExecutorResult {
  dryRun: true;
  readOnly: true;
  noWritesPerformed: true;
  noSmsSent: true;
  noTwilioCallsMade: true;
  failedClosed: boolean;
  lookupError?: string;
  counts: {
    send: number;
    skip: number;
    reschedule: number;
    failClosed: number;
  };
  plans: SmsDispatcherDryRunPlanResult[];
}

function emptyDryRunResult(failedClosed = false, lookupError?: string): SmsDispatcherDryRunExecutorResult {
  return {
    dryRun: true,
    readOnly: true,
    noWritesPerformed: true,
    noSmsSent: true,
    noTwilioCallsMade: true,
    failedClosed,
    lookupError,
    counts: {
      send: 0,
      skip: 0,
      reschedule: 0,
      failClosed: failedClosed ? 1 : 0
    },
    plans: []
  };
}

export async function executeSmsDispatcherDryRun(
  input: SmsDispatcherDryRunExecutorInput
): Promise<SmsDispatcherDryRunExecutorResult> {
  if (input.dryRun === false) {
    return emptyDryRunResult(true, 'dry-run executor cannot run with dryRun=false');
  }

  if (!input.supabase) {
    return emptyDryRunResult(true, 'missing Supabase client');
  }

  const currentTime = new Date(input.currentTime || new Date()).toISOString();
  const limit = input.limit || 10;
  const result = emptyDryRunResult(false);

  const { data, error } = await input.supabase
    .from('follow_ups')
    .select(`
      id,
      roofer_id,
      lead_id,
      status,
      followup_type,
      scheduled_for,
      message_body,
      leads(id, phone, status),
      roofers(id, business_name, sms_confirmation_enabled, timezone)
    `)
    .eq('status', 'scheduled')
    .lte('scheduled_for', currentTime)
    .not('roofer_id', 'is', null)
    .not('lead_id', 'is', null)
    .limit(limit);

  if (error) {
    return emptyDryRunResult(true, error.message);
  }

  for (const row of data || []) {
    const lead = row.leads;
    const roofer = row.roofers;

    if (!lead || !roofer) {
      result.counts.skip += 1;
      result.plans.push({
        follow_up_id: row.id,
        action: 'fail_closed',
        reason: 'missing_relation',
        should_send: false
      });
      continue;
    }

    const duplicateLookup: SmsDuplicateSendLookupResult = await detectDuplicateSmsSend(
      input.supabase,
      row
    );

    if (duplicateLookup.lookupError) {
      result.failedClosed = true;
      result.counts.failClosed += 1;
    }

    const plan = planSmsDispatch({
      followUp: {
        id: row.id,
        roofer_id: row.roofer_id,
        lead_id: row.lead_id,
        status: row.status,
        followup_type: row.followup_type,
        scheduled_for: row.scheduled_for,
        message_body: row.message_body
      },
      lead: {
        id: lead.id,
        phone: lead.phone,
        status: lead.status
      },
      roofer: {
        id: roofer.id,
        sms_confirmation_enabled: roofer.sms_confirmation_enabled,
        timezone: roofer.timezone
      },
      currentTime,
      duplicateSendExists: duplicateLookup.duplicateSendExists
    });

    if (plan.action === 'send') result.counts.send += 1;
    if (plan.action === 'skip') result.counts.skip += 1;
    if (plan.action === 'reschedule') result.counts.reschedule += 1;

    result.plans.push({
      follow_up_id: row.id,
      roofer: roofer.business_name,
      sms_enabled: roofer.sms_confirmation_enabled,
      lead_status: lead.status,
      followup_type: row.followup_type,
      template_type: plan.templateType || null,
      action: plan.action,
      reason: plan.reason,
      should_send: plan.shouldSend,
      duplicate_send_exists: duplicateLookup.duplicateSendExists,
      duplicate_lookup_source: duplicateLookup.lookupSource,
      duplicate_lookup_error: duplicateLookup.lookupError || null,
      rescheduled_for: plan.rescheduledFor || null,
      writePlan: buildSmsDispatcherWritePlan({
        followUpId: row.id,
        rooferId: row.roofer_id,
        leadId: row.lead_id,
        toNumber: lead.phone,
        fromNumber: null,
        messageBody: plan.messageBody,
        templateType: plan.templateType,
        action: plan.action,
        reason: plan.reason,
        shouldSend: plan.shouldSend,
        rescheduledFor: plan.rescheduledFor || null,
        currentTime,
        duplicateSendExists: duplicateLookup.duplicateSendExists,
        duplicateLookupSource: duplicateLookup.lookupSource,
        duplicateLookupError: duplicateLookup.lookupError || null
      })
    });
  }

  return result;
}
