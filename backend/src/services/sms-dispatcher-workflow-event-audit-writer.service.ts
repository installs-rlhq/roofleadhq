export const SMS_DISPATCHER_TEST_AUDIT_EVENT_SOURCE = 'sms_dispatcher_test_audit_writer';

export interface SmsDispatcherWorkflowEventAuditPayload {
  roofer_id?: string | null;
  lead_id?: string | null;
  event_type: string;
  event_source: string;
  event_status: string;
  description?: string | null;
  metadata: {
    test_only?: boolean;
    [key: string]: unknown;
  };
}

export interface SmsDispatcherWorkflowEventAuditWriterInput {
  supabase: {
    from: (table: 'workflow_events') => {
      insert: (payload: SmsDispatcherWorkflowEventAuditPayload) => Promise<{
        data?: unknown;
        error?: { message?: string } | null;
      }>;
    };
  };
  tableName?: string;
  workflowEventInsertPlan?: SmsDispatcherWorkflowEventAuditPayload | null;
  messageInsertPlan?: unknown;
  followUpUpdatePlan?: unknown;
}

export interface SmsDispatcherWorkflowEventAuditWriterResult {
  testOnly: true;
  fakeSupabaseOnly: true;
  noLiveSupabaseWrites: true;
  noMessagesWritten: true;
  noFollowUpsUpdated: true;
  noSmsSent: true;
  noTwilioCallsMade: true;
  applied: boolean;
  failedClosed: boolean;
  reason:
    | 'applied'
    | 'missing_fake_supabase'
    | 'wrong_table'
    | 'full_dispatcher_write_plan_rejected'
    | 'message_payload_rejected'
    | 'follow_up_payload_rejected'
    | 'missing_workflow_event_plan'
    | 'missing_test_only_metadata'
    | 'invalid_event_source'
    | 'forbidden_payload_field'
    | 'insert_failed';
  tableName: 'workflow_events' | null;
  insertedPayload: SmsDispatcherWorkflowEventAuditPayload | null;
  errorMessage?: string;
}

const WORKFLOW_EVENTS_TABLE = 'workflow_events';

function result(
  applied: boolean,
  failedClosed: boolean,
  reason: SmsDispatcherWorkflowEventAuditWriterResult['reason'],
  insertedPayload: SmsDispatcherWorkflowEventAuditPayload | null = null,
  errorMessage?: string
): SmsDispatcherWorkflowEventAuditWriterResult {
  return {
    testOnly: true,
    fakeSupabaseOnly: true,
    noLiveSupabaseWrites: true,
    noMessagesWritten: true,
    noFollowUpsUpdated: true,
    noSmsSent: true,
    noTwilioCallsMade: true,
    applied,
    failedClosed,
    reason,
    tableName: insertedPayload ? WORKFLOW_EVENTS_TABLE : null,
    insertedPayload,
    errorMessage
  };
}

function hasOwn(input: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(input, key);
}

function hasForbiddenPayloadField(payload: SmsDispatcherWorkflowEventAuditPayload): boolean {
  return (
    hasOwn(payload, 'message_body') ||
    hasOwn(payload, 'provider') ||
    hasOwn(payload, 'provider_message_id')
  );
}

export async function writeSmsDispatcherWorkflowEventAuditTestOnly(
  input: SmsDispatcherWorkflowEventAuditWriterInput
): Promise<SmsDispatcherWorkflowEventAuditWriterResult> {
  if (!input.supabase || typeof input.supabase.from !== 'function') {
    return result(false, true, 'missing_fake_supabase');
  }

  if (input.tableName && input.tableName !== WORKFLOW_EVENTS_TABLE) {
    return result(false, true, 'wrong_table');
  }

  if (input.messageInsertPlan !== undefined && input.followUpUpdatePlan !== undefined) {
    return result(false, true, 'full_dispatcher_write_plan_rejected');
  }

  if (input.messageInsertPlan !== undefined) {
    return result(false, true, 'message_payload_rejected');
  }

  if (input.followUpUpdatePlan !== undefined) {
    return result(false, true, 'follow_up_payload_rejected');
  }

  if (!input.workflowEventInsertPlan) {
    return result(false, true, 'missing_workflow_event_plan');
  }

  const payload = input.workflowEventInsertPlan;

  if (payload.metadata?.test_only !== true) {
    return result(false, true, 'missing_test_only_metadata');
  }

  if (payload.event_source !== SMS_DISPATCHER_TEST_AUDIT_EVENT_SOURCE) {
    return result(false, true, 'invalid_event_source');
  }

  if (hasForbiddenPayloadField(payload)) {
    return result(false, true, 'forbidden_payload_field');
  }

  const { error } = await input.supabase.from(WORKFLOW_EVENTS_TABLE).insert(payload);

  if (error) {
    return result(false, true, 'insert_failed', null, error.message);
  }

  return result(true, false, 'applied', payload);
}
