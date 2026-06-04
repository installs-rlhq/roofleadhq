#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  ['sms-safety.service', 'backend/src/services/sms-safety.service.ts', '/tmp/sms-safety.production-runner-verify.js'],
  ['sms-dispatcher-planner.service', 'backend/src/services/sms-dispatcher-planner.service.ts', '/tmp/sms-dispatcher-planner.production-runner-verify.js'],
  ['sms-duplicate-send-detector.service', 'backend/src/services/sms-duplicate-send-detector.service.ts', '/tmp/sms-duplicate-send-detector.production-runner-verify.js'],
  ['sms-dispatcher-write-plan.service', 'backend/src/services/sms-dispatcher-write-plan.service.ts', '/tmp/sms-dispatcher-write-plan.production-runner-verify.js'],
  ['sms-dispatcher-dry-run-executor.service', 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts', '/tmp/sms-dispatcher-dry-run-executor.production-runner-verify.js'],
  ['sms-dispatcher-db-write-executor.service', 'backend/src/services/sms-dispatcher-db-write-executor.service.ts', '/tmp/sms-dispatcher-db-write-executor.production-runner-verify.js'],
  ['sms-dispatcher-production-runner.service', 'backend/src/services/sms-dispatcher-production-runner.service.ts', '/tmp/sms-dispatcher-production-runner.verify.js']
];

const staticCheckFiles = [
  'backend/src/services/sms-dispatcher-production-runner.service.ts',
  'backend/scripts/verify-sms-dispatcher-production-runner.js'
];

console.log('=== RoofLeadHQ SMS Dispatcher Production Runner Scaffold Verification ===');
console.log('Fake Supabase only.');
console.log('No live database writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');
console.log('No route, cron, scheduler, or auto-start is added.');

function compile(sourcePath, outputPath) {
  const source = fs.readFileSync(path.join(repoRoot, sourcePath), 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  fs.writeFileSync(outputPath, output);
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

function walkFiles(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

class FakeQuery {
  constructor(table, db) {
    this.table = table;
    this.db = db;
    this.filters = [];
    this.mode = 'select';
    this.payload = null;
    this.rowLimit = null;
  }

  select(columns) {
    this.db.calls.push({ table: this.table, method: 'select', columns });
    return this;
  }

  eq(column, value) {
    this.db.calls.push({ table: this.table, method: 'eq', column, value });
    this.filters.push({ column, op: 'eq', value });
    return this;
  }

  lte(column, value) {
    this.db.calls.push({ table: this.table, method: 'lte', column, value });
    this.filters.push({ column, op: 'lte', value });
    return this;
  }

  not(column, operator, value) {
    this.db.calls.push({ table: this.table, method: 'not', column, operator, value });
    this.filters.push({ column, op: 'not', operator, value });
    return this;
  }

  contains(column, value) {
    this.db.calls.push({ table: this.table, method: 'contains', column, value });
    this.filters.push({ column, op: 'contains', value });
    return this;
  }

  or(condition) {
    this.db.calls.push({ table: this.table, method: 'or', condition });
    return this;
  }

  limit(count) {
    this.db.calls.push({ table: this.table, method: 'limit', count });
    this.rowLimit = count;
    return this;
  }

  insert(payload) {
    this.db.calls.push({ table: this.table, method: 'insert', payload });
    this.mode = 'insert';
    this.payload = payload;
    return this;
  }

  update(payload) {
    this.db.calls.push({ table: this.table, method: 'update', payload });
    this.mode = 'update';
    this.payload = payload;
    return this;
  }

  single() {
    this.db.calls.push({ table: this.table, method: 'single' });

    if (this.mode === 'insert') {
      const row = { id: `${this.table}-${this.db.rows[this.table].length + 1}`, ...this.payload };
      this.db.rows[this.table].push(row);
      return Promise.resolve({ data: row, error: null });
    }

    if (this.mode === 'update') {
      const matches = this.matchingRows();
      if (matches.length !== 1) {
        return Promise.resolve({ data: null, error: { message: `Expected one ${this.table} row` } });
      }
      Object.assign(matches[0], this.payload);
      return Promise.resolve({ data: matches[0], error: null });
    }

    const matches = this.matchingRows();
    return Promise.resolve({ data: matches[0] || null, error: matches.length === 1 ? null : { message: 'not one row' } });
  }

  matchingRows() {
    const rows = this.db.rows[this.table].filter((row) => {
      return this.filters.every((filter) => {
        if (filter.op === 'eq') return row[filter.column] === filter.value;
        if (filter.op === 'lte') return new Date(row[filter.column]).getTime() <= new Date(filter.value).getTime();
        if (filter.op === 'not' && filter.operator === 'is' && filter.value === null) return row[filter.column] !== null;
        if (filter.op === 'contains') {
          return Object.entries(filter.value || {}).every(([key, expected]) => {
            return row[filter.column] && row[filter.column][key] === expected;
          });
        }
        return true;
      });
    });

    return this.rowLimit ? rows.slice(0, this.rowLimit) : rows;
  }

  then(resolve, reject) {
    return Promise.resolve({ data: this.matchingRows(), error: null }).then(resolve, reject);
  }
}

const allowedRooferId = '11111111-1111-4111-8111-111111111111';
const otherRooferId = '22222222-2222-4222-8222-222222222222';

function dueFollowUp(index, rooferId) {
  return {
    id: `production-followup-${index}`,
    roofer_id: rooferId,
    lead_id: `production-lead-${index}`,
    status: 'scheduled',
    followup_type: '2h',
    scheduled_for: '2026-06-04T16:00:00.000Z',
    message_body: `Production dispatcher scaffold follow-up ${index}.`,
    leads: {
      id: `production-lead-${index}`,
      phone: `+15551234${String(index).padStart(3, '0')}`,
      status: 'new'
    },
    roofers: {
      id: rooferId,
      business_name: 'Production Scaffold Roofer',
      sms_confirmation_enabled: true,
      timezone: 'America/Denver'
    }
  };
}

function createFakeSupabase({ followUps } = {}) {
  return {
    calls: [],
    rows: {
      follow_ups: followUps || [dueFollowUp(1, allowedRooferId)],
      messages: [],
      workflow_events: []
    },
    from(table) {
      this.calls.push({ table, method: 'from' });
      if (!this.rows[table]) throw new Error(`Unexpected table ${table}`);
      return new FakeQuery(table, this);
    }
  };
}

function mutatingCallCount(fake) {
  return fake.calls.filter((call) => ['insert', 'update', 'upsert', 'delete'].includes(call.method)).length;
}

function runStaticSafetyChecks() {
  const twilioClientPattern = new RegExp('new ' + 'Twilio|' + 'twilio' + '\\(', 'i');
  for (const relativePath of staticCheckFiles) {
    const source = fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
    assert(!source.includes("require('" + "twilio')"), `${relativePath} has no Twilio require`);
    assert(!source.includes('from "' + 'twilio"'), `${relativePath} has no Twilio import`);
    assert(!source.includes("from '" + "twilio'"), `${relativePath} has no Twilio import`);
    assert(!twilioClientPattern.test(source), `${relativePath} has no Twilio client usage`);
    assert(!/\.messages\.create\s*\(/.test(source), `${relativePath} has no SMS provider send call`);
    assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(source), `${relativePath} has no route registration`);
    assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i.test(source), `${relativePath} has no cron or scheduler activation`);
  }

  const scanFiles = [
    ...walkFiles(path.join(repoRoot, 'backend/src')),
    ...walkFiles(path.join(repoRoot, 'backend/scripts'))
  ].filter((absolutePath) => {
    const relativePath = path.relative(repoRoot, absolutePath);
    return (
      /\.(ts|js)$/.test(relativePath) &&
      relativePath !== 'backend/src/services/sms-dispatcher-production-runner.service.ts' &&
      relativePath !== 'backend/scripts/verify-sms-dispatcher-production-runner.js'
    );
  });

  for (const absolutePath of scanFiles) {
    const relativePath = path.relative(repoRoot, absolutePath);
    const source = fs.readFileSync(absolutePath, 'utf8');
    assert(
      !source.includes('sms-dispatcher-production-runner.service'),
      `${relativePath} does not import production runner`
    );
    assert(
      !source.includes('executeSmsDispatcherProductionRunner'),
      `${relativePath} does not invoke production runner`
    );
  }
}

for (const [, source, output] of sourceFiles) {
  compile(source, output);
}

const Module = require('module');
const originalLoad = Module._load;
const compiledByRequest = Object.fromEntries(
  sourceFiles.map(([requestName, , output]) => [`./${requestName}`, output])
);

Module._load = function patchedLoad(request, parent, isMain) {
  if (compiledByRequest[request]) {
    return require(compiledByRequest[request]);
  }

  return originalLoad(request, parent, isMain);
};

const {
  SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET,
  SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE,
  buildSmsDispatcherProductionRunnerInputFromEnv,
  executeSmsDispatcherProductionRunner,
  parseSmsDispatcherProductionAllowedRooferIds,
  parseSmsDispatcherProductionMaxBatchSize
} = require('/tmp/sms-dispatcher-production-runner.verify.js');
const {
  SMS_DISPATCHER_DB_EXECUTOR_TARGET
} = require('/tmp/sms-dispatcher-db-write-executor.production-runner-verify.js');

const productionGate = {
  allowProductionRunner: true,
  runnerTarget: SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET,
  allowedRooferIds: [allowedRooferId]
};

const dbExecutorGate = {
  allowLiveDbWrite: true,
  liveWriteTarget: SMS_DISPATCHER_DB_EXECUTOR_TARGET,
  confirmWritePlan: true
};

(async () => {
  runStaticSafetyChecks();

  assert(parseSmsDispatcherProductionMaxBatchSize(undefined) === 1, 'production batch size defaults to 1');
  assert(parseSmsDispatcherProductionMaxBatchSize('99') === 10, 'production batch size caps at 10');
  assert(parseSmsDispatcherProductionMaxBatchSize('0') === 0, 'invalid production batch size fails closed');
  assert(
    parseSmsDispatcherProductionAllowedRooferIds(`${allowedRooferId},not-a-uuid,${allowedRooferId}`).length === 1,
    'allowed roofer env parser keeps unique UUIDs only'
  );

  const envInput = buildSmsDispatcherProductionRunnerInputFromEnv(
    {
      SMS_DISPATCHER_PRODUCTION_RUNNER: 'true',
      SMS_DISPATCHER_PRODUCTION_TARGET: SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET,
      SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS: allowedRooferId,
      SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE: '99',
      SMS_DISPATCHER_DB_EXECUTOR_WRITE: 'true',
      SMS_DB_EXECUTOR_TARGET: SMS_DISPATCHER_DB_EXECUTOR_TARGET,
      SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN: 'true'
    },
    createFakeSupabase(),
    '2026-06-04T18:00:00.000Z'
  );
  assert(envInput.maxBatchSize === SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE, 'env input applies batch cap');
  assert(envInput.productionGate.allowedRooferIds[0] === allowedRooferId, 'env input applies allowed roofer allowlist');

  const defaultFake = createFakeSupabase();
  const defaultResult = await executeSmsDispatcherProductionRunner({
    supabase: defaultFake,
    dbExecutorGate
  });
  assert(defaultResult.failedClosed === true, 'default mode fails closed');
  assert(defaultResult.reason === 'missing_production_runner_gate', 'default mode requires production runner gate');
  assert(defaultResult.productionDispatcherActivated === false, 'default mode reports production dispatcher not activated');
  assert(mutatingCallCount(defaultFake) === 0, 'default mode writes nothing');
  assert(defaultFake.calls.length === 0, 'default mode makes no Supabase calls');

  const missingAllowlistFake = createFakeSupabase();
  const missingAllowlistResult = await executeSmsDispatcherProductionRunner({
    supabase: missingAllowlistFake,
    productionGate: {
      allowProductionRunner: true,
      runnerTarget: SMS_DISPATCHER_PRODUCTION_RUNNER_TARGET,
      allowedRooferIds: []
    },
    dbExecutorGate
  });
  assert(missingAllowlistResult.failedClosed === true, 'missing allowlist fails closed');
  assert(missingAllowlistResult.reason === 'missing_allowed_roofer_ids', 'missing allowlist reports reason');
  assert(mutatingCallCount(missingAllowlistFake) === 0, 'missing allowlist writes nothing');
  assert(missingAllowlistFake.calls.length === 0, 'missing allowlist makes no Supabase calls');

  const wrongTargetFake = createFakeSupabase();
  const wrongTargetResult = await executeSmsDispatcherProductionRunner({
    supabase: wrongTargetFake,
    productionGate: {
      allowProductionRunner: true,
      runnerTarget: 'wrong_target',
      allowedRooferIds: [allowedRooferId]
    },
    dbExecutorGate
  });
  assert(wrongTargetResult.failedClosed === true, 'wrong target fails closed');
  assert(wrongTargetResult.reason === 'missing_production_runner_gate', 'wrong target reports missing production gate');
  assert(mutatingCallCount(wrongTargetFake) === 0, 'wrong target writes nothing');
  assert(wrongTargetFake.calls.length === 0, 'wrong target makes no Supabase calls');

  const missingDbGateFake = createFakeSupabase();
  const missingDbGateResult = await executeSmsDispatcherProductionRunner({
    supabase: missingDbGateFake,
    productionGate,
    maxBatchSize: 1,
    currentTime: '2026-06-04T18:00:00.000Z'
  });
  assert(missingDbGateResult.failedClosed === true, 'missing DB executor gates fail closed');
  assert(missingDbGateResult.reason === 'db_executor_failed_closed', 'missing DB executor gates report executor failure');
  assert(mutatingCallCount(missingDbGateFake) === 0, 'missing DB executor gates write nothing');

  const allowedFilterFake = createFakeSupabase({
    followUps: [
      dueFollowUp(1, otherRooferId),
      dueFollowUp(2, allowedRooferId),
      dueFollowUp(3, otherRooferId),
      dueFollowUp(4, allowedRooferId)
    ]
  });
  const allowedFilterResult = await executeSmsDispatcherProductionRunner({
    supabase: allowedFilterFake,
    productionGate,
    dbExecutorGate,
    maxBatchSize: 4,
    currentTime: '2026-06-04T18:00:00.000Z'
  });
  assert(allowedFilterResult.applied === true, 'allowed roofer filter applies eligible allowed plans');
  assert(allowedFilterResult.selectedPlanCount === 2, 'allowed roofer filter selects only allowed roofer plans');
  assert(
    allowedFilterResult.applications.every((application) => application.roofer_id === allowedRooferId),
    'all selected applications are for allowed roofers'
  );
  assert(allowedFilterFake.rows.messages.length === 2, 'allowed roofer filter writes only allowed plans in fake mode');

  const cappedFake = createFakeSupabase({
    followUps: Array.from({ length: 12 }, (_, index) => dueFollowUp(index + 1, allowedRooferId))
  });
  const cappedResult = await executeSmsDispatcherProductionRunner({
    supabase: cappedFake,
    productionGate,
    dbExecutorGate,
    maxBatchSize: 99,
    currentTime: '2026-06-04T18:00:00.000Z'
  });
  assert(cappedResult.requestedBatchSize === 99, 'requested production batch size is recorded');
  assert(cappedResult.cappedBatchSize === SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE, 'production batch size is capped');
  assert(cappedResult.selectedPlanCount === SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE, 'only capped production batch size is selected');
  assert(cappedFake.rows.messages.length === SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE, 'only capped production batch size is written in fake mode');
  assert(cappedResult.noSmsSent === true, 'production runner reports no SMS sent');
  assert(cappedResult.noTwilioCallsMade === true, 'production runner reports no Twilio calls');
  assert(cappedResult.routeAdded === false, 'production runner reports no route added');
  assert(cappedResult.cronAdded === false, 'production runner reports no cron added');
  assert(cappedResult.productionDispatcherActivated === true, 'explicit function invocation can activate gated DB writes');

  console.log('PASS: SMS dispatcher production runner scaffold verification passed.');
  console.log('No live database writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');
})();
