import type { SmsDispatcherWritePlan } from './sms-dispatcher-write-plan.service';

export const SMS_DISPATCHER_DB_EXECUTOR_TARGET = 'sms_dispatcher_db_executor';

export interface SmsDispatcherDbWriteExecutorGate {
  allowLiveDbWrite?: boolean;
  liveWriteTarget?: string;
  confirmWritePlan?: boolean;
}

export interface SmsDispatcherDbWriteExecutorInput {
  supabase?: any;
  writePlan?: SmsDispatcherWritePlan | null;
  gate?: SmsDispatcherDbWriteExecutorGate;
}

export type SmsDispatcherDbWriteExecutorReason =
  | 'applied'
  | 'missing_supabase_client'
  | 'missing_write_plan'
  | 'missing_write_plan_live_gate'
  | 'missing_executor_live_gate'
  | 'empty_write_plan'
  | 'duplicate_message_found'
  | 'duplicate_message_lookup_failed'
  | 'message_insert_failed'
  | 'message_post_write_verification_failed'
  | 'follow_up_update_failed'
  | 'follow_up_post_write_verification_failed'
  | 'workflow_event_insert_failed'
  | 'workflow_event_post_write_verification_failed';

export interface SmsDispatcherDbWriteExecutorOperation {
  type: 'message_insert' | 'follow_up_update' | 'workflow_event_insert';
  id?: string;
}

export interface SmsDispatcherDbWriteExecutorResult {
  liveDbWritesEnabled: boolean;
  noSmsSent: true;
  noTwilioCallsMade: true;
  applied: boolean;
  failedClosed: boolean;
  reason: SmsDispatcherDbWriteExecutorReason;
  operations: SmsDispatcherDbWriteExecutorOperation[];
  error?: string;
}

function result(
  applied: boolean,
  failedClosed: boolean,
  reason: SmsDispatcherDbWriteExecutorReason,
  operations: SmsDispatcherDbWriteExecutorOperation[] = [],
  error?: string
): SmsDispatcherDbWriteExecutorResult {
  return {
    liveDbWritesEnabled: applied,
    noSmsSent: true,
    noTwilioCallsMade: true,
    applied,
    failedClosed,
    reason,
    operations,
    error
  };
}

function hasExecutorGate(gate?: SmsDispatcherDbWriteExecutorGate): boolean {
  return Boolean(
    gate?.allowLiveDbWrite === true &&
      gate.liveWriteTarget === SMS_DISPATCHER_DB_EXECUTOR_TARGET &&
      gate.confirmWritePlan === true
  );
}

function hasAnyWritePayload(writePlan: SmsDispatcherWritePlan): boolean {
  return Boolean(
    writePlan.messageInsertPlan ||
      writePlan.followUpUpdatePlan ||
      writePlan.workflowEventInsertPlan
  );
}

function value(payload: Record<string, unknown>, key: string): any {
  return payload[key] ?? null;
}

async function findDuplicateMessage(supabase: any, payload: Record<string, unknown>) {
  let query = supabase
    .from('messages')
    .select('id')
    .eq('roofer_id', value(payload, 'roofer_id'))
    .eq('lead_id', value(payload, 'lead_id'))
    .eq('channel', value(payload, 'channel'))
    .eq('direction', value(payload, 'direction'));

  const providerMessageId = value(payload, 'provider_message_id');
  if (providerMessageId) {
    query = query.eq('provider_message_id', providerMessageId);
  } else if (value(payload, 'message_body')) {
    query = query.eq('message_body', value(payload, 'message_body'));
  }

  return query.limit(1);
}

async function verifyInsertedMessage(supabase: any, inserted: Record<string, unknown>) {
  return supabase
    .from('messages')
    .select('id,roofer_id,lead_id,channel,direction,status,provider_message_id')
    .eq('id', value(inserted, 'id'))
    .limit(1);
}

async function verifyUpdatedFollowUp(supabase: any, payload: Record<string, unknown>) {
  return supabase
    .from('follow_ups')
    .select('id,status,scheduled_for,sent_at,skipped_reason')
    .eq('id', value(payload, 'id'))
    .limit(1);
}

async function verifyInsertedWorkflowEvent(supabase: any, inserted: Record<string, unknown>) {
  return supabase
    .from('workflow_events')
    .select('id,roofer_id,lead_id,event_type,event_status,event_source')
    .eq('id', value(inserted, 'id'))
    .limit(1);
}

export async function executeSmsDispatcherDbWritePlan(
  input: SmsDispatcherDbWriteExecutorInput
): Promise<SmsDispatcherDbWriteExecutorResult> {
  if (!input.supabase) {
    return result(false, true, 'missing_supabase_client');
  }

  if (!input.writePlan) {
    return result(false, true, 'missing_write_plan');
  }

  if (input.writePlan.requiresLiveWriteGate !== true) {
    return result(false, true, 'missing_write_plan_live_gate');
  }

  if (!hasExecutorGate(input.gate)) {
    return result(false, true, 'missing_executor_live_gate');
  }

  if (!hasAnyWritePayload(input.writePlan)) {
    return result(false, true, 'empty_write_plan');
  }

  const operations: SmsDispatcherDbWriteExecutorOperation[] = [];

  if (input.writePlan.messageInsertPlan) {
    const duplicate = await findDuplicateMessage(input.supabase, input.writePlan.messageInsertPlan);
    if (duplicate.error) {
      return result(false, true, 'duplicate_message_lookup_failed', operations, duplicate.error.message);
    }

    if ((duplicate.data || []).length > 0) {
      return result(false, true, 'duplicate_message_found', operations);
    }

    const inserted = await input.supabase
      .from('messages')
      .insert(input.writePlan.messageInsertPlan)
      .select('id,roofer_id,lead_id,channel,direction,status,provider_message_id')
      .single();

    if (inserted.error) {
      return result(false, true, 'message_insert_failed', operations, inserted.error.message);
    }

    const verified = await verifyInsertedMessage(input.supabase, inserted.data);
    if (verified.error || (verified.data || []).length !== 1) {
      return result(
        false,
        true,
        'message_post_write_verification_failed',
        operations,
        verified.error?.message
      );
    }

    operations.push({ type: 'message_insert', id: value(inserted.data, 'id') });
  }

  if (input.writePlan.followUpUpdatePlan) {
    const followUpId = value(input.writePlan.followUpUpdatePlan, 'id');
    const updated = await input.supabase
      .from('follow_ups')
      .update(input.writePlan.followUpUpdatePlan)
      .eq('id', followUpId)
      .select('id,status,scheduled_for,sent_at,skipped_reason')
      .single();

    if (updated.error) {
      return result(false, true, 'follow_up_update_failed', operations, updated.error.message);
    }

    const verified = await verifyUpdatedFollowUp(input.supabase, input.writePlan.followUpUpdatePlan);
    if (verified.error || (verified.data || []).length !== 1) {
      return result(
        false,
        true,
        'follow_up_post_write_verification_failed',
        operations,
        verified.error?.message
      );
    }

    operations.push({ type: 'follow_up_update', id: followUpId });
  }

  if (input.writePlan.workflowEventInsertPlan) {
    const inserted = await input.supabase
      .from('workflow_events')
      .insert(input.writePlan.workflowEventInsertPlan)
      .select('id,roofer_id,lead_id,event_type,event_status,event_source')
      .single();

    if (inserted.error) {
      return result(false, true, 'workflow_event_insert_failed', operations, inserted.error.message);
    }

    const verified = await verifyInsertedWorkflowEvent(input.supabase, inserted.data);
    if (verified.error || (verified.data || []).length !== 1) {
      return result(
        false,
        true,
        'workflow_event_post_write_verification_failed',
        operations,
        verified.error?.message
      );
    }

    operations.push({ type: 'workflow_event_insert', id: value(inserted.data, 'id') });
  }

  return result(true, false, 'applied', operations);
}
