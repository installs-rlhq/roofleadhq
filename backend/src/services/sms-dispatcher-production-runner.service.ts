import {
  executeSmsDispatcherDbWritePlan,
  type SmsDispatcherDbWriteExecutorGate,
  type SmsDispatcherDbWriteExecutorResult
} from './sms-dispatcher-db-write-executor.service';
import {
  executeSmsDispatcherDryRun,
  type SmsDispatcherDryRunPlanResult
} from './sms-dispatcher-dry-run-executor.service';

export const SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET = 'sms_dispatcher_production_runner';
export const SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE = 10;
export const SMS_DISPATCHER_PRODUCTION_DEFAULT_BATCH_SIZE = 1;

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface SmsDispatcherProductionRunnerGate {
  allowProductionRunner?: boolean;
  runnerTarget?: string;
  allowedRooferIds?: string[];
}

export interface SmsDispatcherProductionRunnerInput {
  supabase?: any;
  currentTime?: string | Date;
  maxBatchSize?: number;
  productionGate?: SmsDispatcherProductionRunnerGate;
  dbExecutorGate?: SmsDispatcherDbWriteExecutorGate;
}

export type SmsDispatcherProductionRunnerReason =
  | 'applied'
  | 'missing_supabase_client'
  | 'missing_production_runner_gate'
  | 'missing_allowed_roofer_ids'
  | 'invalid_batch_size'
  | 'dry_run_failed_closed'
  | 'no_allowed_roofer_plans'
  | 'db_executor_failed_closed';

export interface SmsDispatcherProductionRunnerPlanApplication {
  follow_up_id?: string;
  roofer_id?: string;
  action: SmsDispatcherDryRunPlanResult['action'];
  reason: SmsDispatcherDryRunPlanResult['reason'];
  dbResult: SmsDispatcherDbWriteExecutorResult;
}

export interface SmsDispatcherProductionRunnerResult {
  noSmsSent: true;
  noTwilioCallsMade: true;
  routeAdded: false;
  cronAdded: false;
  productionDispatcherActivated: boolean;
  applied: boolean;
  failedClosed: boolean;
  reason: SmsDispatcherProductionRunnerReason;
  requestedBatchSize: number;
  cappedBatchSize: number;
  allowedRooferIds: string[];
  dryRunPlanCount: number;
  selectedPlanCount: number;
  applications: SmsDispatcherProductionRunnerPlanApplication[];
  error?: string;
}

export function parseSmsDispatcherProductionAllowedRooferIds(value?: string | null): string[] {
  if (!value) return [];

  return Array.from(
    new Set(
      value
        .split(',')
        .map((id) => id.trim())
        .filter((id) => UUID_PATTERN.test(id))
    )
  );
}

export function parseSmsDispatcherProductionMaxBatchSize(value?: string | number | null): number {
  if (value === undefined || value === null || value === '') {
    return SMS_DISPATCHER_PRODUCTION_DEFAULT_BATCH_SIZE;
  }

  const parsed = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) return 0;

  return Math.min(parsed, SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE);
}

export function buildSmsDispatcherProductionRunnerInputFromEnv(
  env: Record<string, string | undefined>,
  supabase?: any,
  currentTime?: string | Date
): SmsDispatcherProductionRunnerInput {
  return {
    supabase,
    currentTime,
    maxBatchSize: parseSmsDispatcherProductionMaxBatchSize(
      env.SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE
    ),
    productionGate: {
      allowProductionRunner: env.SMS_DISPATCHER_PRODUCTION_RUNNER === 'true',
      runnerTarget: env.SMS_DISPATCHER_PRODUCTION_TARGET,
      allowedRooferIds: parseSmsDispatcherProductionAllowedRooferIds(
        env.SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS
      )
    },
    dbExecutorGate: {
      allowLiveDbWrite: env.SMS_DISPATCHER_DB_EXECUTOR_WRITE === 'true',
      liveWriteTarget: env.SMS_DB_EXECUTOR_TARGET,
      confirmWritePlan: env.SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN === 'true'
    }
  };
}

function baseResult(
  reason: SmsDispatcherProductionRunnerReason,
  requestedBatchSize: number,
  cappedBatchSize: number,
  allowedRooferIds: string[] = [],
  failedClosed = true,
  error?: string
): SmsDispatcherProductionRunnerResult {
  return {
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
    allowedRooferIds,
    dryRunPlanCount: 0,
    selectedPlanCount: 0,
    applications: [],
    error
  };
}

function hasProductionRunnerGate(gate?: SmsDispatcherProductionRunnerGate): boolean {
  return Boolean(
    gate?.allowProductionRunner === true &&
      gate.runnerTarget === SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET
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

export async function executeSmsDispatcherProductionRunner(
  input: SmsDispatcherProductionRunnerInput
): Promise<SmsDispatcherProductionRunnerResult> {
  const requestedBatchSize = input.maxBatchSize ?? SMS_DISPATCHER_PRODUCTION_DEFAULT_BATCH_SIZE;
  const cappedBatchSize = parseSmsDispatcherProductionMaxBatchSize(requestedBatchSize);
  const allowedRooferIds = input.productionGate?.allowedRooferIds || [];
  const allowedRooferIdSet = new Set(allowedRooferIds);

  if (!input.supabase) {
    return baseResult('missing_supabase_client', requestedBatchSize, cappedBatchSize, allowedRooferIds);
  }

  if (cappedBatchSize < 1) {
    return baseResult('invalid_batch_size', requestedBatchSize, cappedBatchSize, allowedRooferIds);
  }

  if (!hasProductionRunnerGate(input.productionGate)) {
    return baseResult(
      'missing_production_runner_gate',
      requestedBatchSize,
      cappedBatchSize,
      allowedRooferIds
    );
  }

  if (allowedRooferIds.length === 0) {
    return baseResult(
      'missing_allowed_roofer_ids',
      requestedBatchSize,
      cappedBatchSize,
      allowedRooferIds
    );
  }

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
      allowedRooferIds,
      true,
      dryRun.lookupError
    );
    failed.dryRunPlanCount = dryRun.plans.length;
    return failed;
  }

  const selectedPlans = dryRun.plans
    .filter((plan) => {
      const rooferId = writePlanRooferId(plan);
      return Boolean(plan.writePlan && rooferId && allowedRooferIdSet.has(rooferId));
    })
    .slice(0, cappedBatchSize);

  if (selectedPlans.length === 0) {
    const empty = baseResult(
      'no_allowed_roofer_plans',
      requestedBatchSize,
      cappedBatchSize,
      allowedRooferIds
    );
    empty.dryRunPlanCount = dryRun.plans.length;
    return empty;
  }

  const applications: SmsDispatcherProductionRunnerPlanApplication[] = [];

  for (const plan of selectedPlans) {
    const dbResult = await executeSmsDispatcherDbWritePlan({
      supabase: input.supabase,
      writePlan: plan.writePlan,
      gate: input.dbExecutorGate
    });

    applications.push({
      follow_up_id: plan.follow_up_id,
      roofer_id: writePlanRooferId(plan) || undefined,
      action: plan.action,
      reason: plan.reason,
      dbResult
    });

    if (dbResult.failedClosed) {
      return {
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
        allowedRooferIds,
        dryRunPlanCount: dryRun.plans.length,
        selectedPlanCount: selectedPlans.length,
        applications
      };
    }
  }

  return {
    noSmsSent: true,
    noTwilioCallsMade: true,
    routeAdded: false,
    cronAdded: false,
    productionDispatcherActivated: true,
    applied: true,
    failedClosed: false,
    reason: 'applied',
    requestedBatchSize,
    cappedBatchSize,
    allowedRooferIds,
    dryRunPlanCount: dryRun.plans.length,
    selectedPlanCount: selectedPlans.length,
    applications
  };
}
