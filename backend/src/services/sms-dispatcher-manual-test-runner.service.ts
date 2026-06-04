import {
  executeSmsDispatcherDbWritePlan,
  type SmsDispatcherDbWriteExecutorGate,
  type SmsDispatcherDbWriteExecutorResult
} from './sms-dispatcher-db-write-executor.service';
import {
  executeSmsDispatcherDryRun,
  type SmsDispatcherDryRunPlanResult
} from './sms-dispatcher-dry-run-executor.service';

export const SMS_DISPATCHER_MANUAL_TEST_RUNNER_TARGET = 'sms_dispatcher_manual_test_runner';
export const SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE = 3;

export interface SmsDispatcherManualTestRunnerGate {
  testOnly?: boolean;
  allowManualTestRunner?: boolean;
  runnerTarget?: string;
  approvedRooferId?: string;
}

export interface SmsDispatcherManualTestRunnerInput {
  supabase?: any;
  currentTime?: string | Date;
  maxBatchSize?: number;
  manualGate?: SmsDispatcherManualTestRunnerGate;
  dbExecutorGate?: SmsDispatcherDbWriteExecutorGate;
}

export type SmsDispatcherManualTestRunnerReason =
  | 'applied'
  | 'missing_supabase_client'
  | 'missing_manual_runner_gate'
  | 'invalid_batch_size'
  | 'dry_run_failed_closed'
  | 'no_approved_roofer_plans'
  | 'db_executor_failed_closed';

export interface SmsDispatcherManualTestRunnerPlanApplication {
  follow_up_id?: string;
  action: SmsDispatcherDryRunPlanResult['action'];
  reason: SmsDispatcherDryRunPlanResult['reason'];
  dbResult: SmsDispatcherDbWriteExecutorResult;
}

export interface SmsDispatcherManualTestRunnerResult {
  testOnly: true;
  noSmsSent: true;
  noTwilioCallsMade: true;
  routeAdded: false;
  cronAdded: false;
  productionDispatcherActivated: false;
  applied: boolean;
  failedClosed: boolean;
  reason: SmsDispatcherManualTestRunnerReason;
  requestedBatchSize: number;
  cappedBatchSize: number;
  approvedRooferId?: string;
  dryRunPlanCount: number;
  selectedPlanCount: number;
  applications: SmsDispatcherManualTestRunnerPlanApplication[];
  error?: string;
}

function capBatchSize(value?: number): number {
  if (value === undefined || value === null) return 1;
  if (!Number.isInteger(value) || value < 1) return 0;
  return Math.min(value, SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE);
}

function baseResult(
  reason: SmsDispatcherManualTestRunnerReason,
  requestedBatchSize: number,
  cappedBatchSize: number,
  failedClosed = true,
  error?: string
): SmsDispatcherManualTestRunnerResult {
  return {
    testOnly: true,
    noSmsSent: true,
    noTwilioCallsMade: true,
    routeAdded: false,
    cronAdded: false,
    productionDispatcherActivated: false,
    applied: false,
    failedClosed,
    reason,
    requestedBatchSize,
    cappedBatchSize,
    dryRunPlanCount: 0,
    selectedPlanCount: 0,
    applications: [],
    error
  };
}

function hasManualGate(gate?: SmsDispatcherManualTestRunnerGate): boolean {
  return Boolean(
    gate?.testOnly === true &&
      gate.allowManualTestRunner === true &&
      gate.runnerTarget === SMS_DISPATCHER_MANUAL_TEST_RUNNER_TARGET &&
      gate.approvedRooferId
  );
}

function writePlanRooferId(plan: SmsDispatcherDryRunPlanResult): string | null {
  const writePlan = plan.writePlan;
  const payload =
    writePlan?.messageInsertPlan ||
    writePlan?.followUpUpdatePlan ||
    writePlan?.workflowEventInsertPlan;

  return (
    (payload?.roofer_id as string | undefined) ||
    (writePlan?.workflowEventInsertPlan?.roofer_id as string | undefined) ||
    null
  );
}

export async function runSmsDispatcherManualTestOnly(
  input: SmsDispatcherManualTestRunnerInput
): Promise<SmsDispatcherManualTestRunnerResult> {
  const requestedBatchSize = input.maxBatchSize ?? 1;
  const cappedBatchSize = capBatchSize(requestedBatchSize);

  if (!input.supabase) {
    return baseResult('missing_supabase_client', requestedBatchSize, cappedBatchSize);
  }

  if (cappedBatchSize < 1) {
    return baseResult('invalid_batch_size', requestedBatchSize, cappedBatchSize);
  }

  if (!hasManualGate(input.manualGate)) {
    return baseResult('missing_manual_runner_gate', requestedBatchSize, cappedBatchSize);
  }

  const approvedRooferId = input.manualGate?.approvedRooferId as string;
  const dryRun = await executeSmsDispatcherDryRun({
    supabase: input.supabase,
    dryRun: true,
    currentTime: input.currentTime,
    limit: cappedBatchSize
  });

  if (dryRun.failedClosed) {
    const failed = baseResult(
      'dry_run_failed_closed',
      requestedBatchSize,
      cappedBatchSize,
      true,
      dryRun.lookupError
    );
    failed.approvedRooferId = approvedRooferId;
    failed.dryRunPlanCount = dryRun.plans.length;
    return failed;
  }

  const selectedPlans = dryRun.plans
    .filter((plan) => plan.writePlan && writePlanRooferId(plan) === approvedRooferId)
    .slice(0, cappedBatchSize);

  if (selectedPlans.length === 0) {
    const empty = baseResult('no_approved_roofer_plans', requestedBatchSize, cappedBatchSize);
    empty.approvedRooferId = approvedRooferId;
    empty.dryRunPlanCount = dryRun.plans.length;
    return empty;
  }

  const applications: SmsDispatcherManualTestRunnerPlanApplication[] = [];

  for (const plan of selectedPlans) {
    const dbResult = await executeSmsDispatcherDbWritePlan({
      supabase: input.supabase,
      writePlan: plan.writePlan,
      gate: input.dbExecutorGate
    });

    applications.push({
      follow_up_id: plan.follow_up_id,
      action: plan.action,
      reason: plan.reason,
      dbResult
    });

    if (dbResult.failedClosed) {
      return {
        testOnly: true,
        noSmsSent: true,
        noTwilioCallsMade: true,
        routeAdded: false,
        cronAdded: false,
        productionDispatcherActivated: false,
        applied: false,
        failedClosed: true,
        reason: 'db_executor_failed_closed',
        requestedBatchSize,
        cappedBatchSize,
        approvedRooferId,
        dryRunPlanCount: dryRun.plans.length,
        selectedPlanCount: selectedPlans.length,
        applications
      };
    }
  }

  return {
    testOnly: true,
    noSmsSent: true,
    noTwilioCallsMade: true,
    routeAdded: false,
    cronAdded: false,
    productionDispatcherActivated: false,
    applied: true,
    failedClosed: false,
    reason: 'applied',
    requestedBatchSize,
    cappedBatchSize,
    approvedRooferId,
    dryRunPlanCount: dryRun.plans.length,
    selectedPlanCount: selectedPlans.length,
    applications
  };
}
