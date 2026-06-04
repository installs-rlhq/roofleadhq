import type { SmsDispatcherWritePlan } from './sms-dispatcher-write-plan.service';

export type SmsDispatcherMockWriteOperationType =
  | 'messageInsertPlan'
  | 'followUpUpdatePlan'
  | 'workflowEventInsertPlan';

export interface SmsDispatcherMockWriteOperation {
  type: SmsDispatcherMockWriteOperationType;
  payload: Record<string, unknown>;
}

export interface SmsDispatcherMockWriteExecutorResult {
  testOnly: true;
  noSupabaseWrites: true;
  noSmsSent: true;
  noTwilioCallsMade: true;
  applied: boolean;
  failedClosed: boolean;
  reason: 'applied' | 'missing_write_plan' | 'missing_live_write_gate' | 'empty_write_plan';
  operations: SmsDispatcherMockWriteOperation[];
}

function result(
  applied: boolean,
  failedClosed: boolean,
  reason: SmsDispatcherMockWriteExecutorResult['reason'],
  operations: SmsDispatcherMockWriteOperation[] = []
): SmsDispatcherMockWriteExecutorResult {
  return {
    testOnly: true,
    noSupabaseWrites: true,
    noSmsSent: true,
    noTwilioCallsMade: true,
    applied,
    failedClosed,
    reason,
    operations
  };
}

export function executeSmsDispatcherMockWritePlan(
  writePlan?: SmsDispatcherWritePlan | null
): SmsDispatcherMockWriteExecutorResult {
  if (!writePlan) {
    return result(false, true, 'missing_write_plan');
  }

  if (writePlan.requiresLiveWriteGate !== true) {
    return result(false, true, 'missing_live_write_gate');
  }

  const operations: SmsDispatcherMockWriteOperation[] = [];

  if (writePlan.messageInsertPlan) {
    operations.push({
      type: 'messageInsertPlan',
      payload: writePlan.messageInsertPlan
    });
  }

  if (writePlan.followUpUpdatePlan) {
    operations.push({
      type: 'followUpUpdatePlan',
      payload: writePlan.followUpUpdatePlan
    });
  }

  if (writePlan.workflowEventInsertPlan) {
    operations.push({
      type: 'workflowEventInsertPlan',
      payload: writePlan.workflowEventInsertPlan
    });
  }

  if (operations.length === 0) {
    return result(false, true, 'empty_write_plan');
  }

  return result(true, false, 'applied', operations);
}
