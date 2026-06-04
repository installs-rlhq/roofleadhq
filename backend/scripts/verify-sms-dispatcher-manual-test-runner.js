#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  ['sms-safety.service', 'backend/src/services/sms-safety.service.ts', '/tmp/sms-safety.manual-runner-verify.js'],
  ['sms-dispatcher-planner.service', 'backend/src/services/sms-dispatcher-planner.service.ts', '/tmp/sms-dispatcher-planner.manual-runner-verify.js'],
  ['sms-duplicate-send-detector.service', 'backend/src/services/sms-duplicate-send-detector.service.ts', '/tmp/sms-duplicate-send-detector.manual-runner-verify.js'],
  ['sms-dispatcher-write-plan.service', 'backend/src/services/sms-dispatcher-write-plan.service.ts', '/tmp/sms-dispatcher-write-plan.manual-runner-verify.js'],
  ['sms-dispatcher-dry-run-executor.service', 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts', '/tmp/sms-dispatcher-dry-run-executor.manual-runner-verify.js'],
  ['sms-dispatcher-db-write-executor.service', 'backend/src/services/sms-dispatcher-db-write-executor.service.ts', '/tmp/sms-dispatcher-db-write-executor.manual-runner-verify.js'],
  ['sms-dispatcher-manual-test-runner.service', 'backend/src/services/sms-dispatcher-manual-test-runner.service.ts', '/tmp/sms-dispatcher-manual-test-runner.verify.js']
];

const staticCheckFiles = [
  'backend/src/services/sms-dispatcher-manual-test-runner.service.ts',
  'backend/scripts/run-sms-dispatcher-manual-test-only.js',
  'backend/scripts/verify-sms-dispatcher-manual-test-runner.js'
];

console.log('=== RoofLeadHQ SMS Dispatcher Manual Test Runner Verification ===');
console.log('Fake Supabase only.');
console.log('No live database writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');
console.log('No route, cron, or production dispatcher is activated.');

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

class FakeQuery {
  constructor(table, db) {
    this.table = table;
    this.db = db;
    this.filters = [];
    this.mode = 'select';
    this.payload = null;
    this.rowLimit = null;
  }

  select() {
    this.db.calls.push({ table: this.table, method: 'select' });
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

  contains() {
    this.db.calls.push({ table: this.table, method: 'contains' });
    return this;
  }

  or() {
    this.db.calls.push({ table: this.table, method: 'or' });
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
        return true;
      });
    });

    return this.rowLimit ? rows.slice(0, this.rowLimit) : rows;
  }

  then(resolve, reject) {
    return Promise.resolve({ data: this.matchingRows(), error: null }).then(resolve, reject);
  }
}

function dueFollowUp(index, rooferId) {
  return {
    id: `followup-${index}`,
    roofer_id: rooferId,
    lead_id: `lead-${index}`,
    status: 'scheduled',
    followup_type: '2h',
    scheduled_for: '2026-06-04T18:00:00.000Z',
    message_body: `Manual test-only dispatcher follow-up ${index}.`,
    leads: {
      id: `lead-${index}`,
      phone: `+1555123456${index}`,
      status: 'new'
    },
    roofers: {
      id: rooferId,
      business_name: 'Manual Test Roofer',
      sms_confirmation_enabled: true,
      timezone: 'America/Denver'
    }
  };
}

function createFakeSupabase({ count = 1, rooferId = 'roofer-1' } = {}) {
  return {
    calls: [],
    rows: {
      follow_ups: Array.from({ length: count }, (_, index) => dueFollowUp(index + 1, rooferId)),
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
    assert(!/scheduleJob\s*\(|setInterval\s*\(/i.test(source), `${relativePath} has no cron or scheduler activation`);
    assert(!/runProductionSmsDispatcher\s*\(/i.test(source), `${relativePath} has no production dispatcher activation`);
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
  SMS_DISPATCHER_MANUAL_TEST_RUNNER_TARGET,
  SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE,
  runSmsDispatcherManualTestOnly
} = require('/tmp/sms-dispatcher-manual-test-runner.verify.js');
const {
  SMS_DISPATCHER_DB_EXECUTOR_TARGET
} = require('/tmp/sms-dispatcher-db-write-executor.manual-runner-verify.js');

const manualGate = {
  testOnly: true,
  allowManualTestRunner: true,
  runnerTarget: SMS_DISPATCHER_MANUAL_TEST_RUNNER_TARGET,
  approvedRooferId: 'roofer-1'
};

const dbExecutorGate = {
  allowLiveDbWrite: true,
  liveWriteTarget: SMS_DISPATCHER_DB_EXECUTOR_TARGET,
  confirmWritePlan: true
};

(async () => {
  runStaticSafetyChecks();

  const defaultFake = createFakeSupabase();
  const defaultResult = await runSmsDispatcherManualTestOnly({
    supabase: defaultFake,
    dbExecutorGate
  });
  assert(defaultResult.failedClosed === true, 'default mode fails closed');
  assert(defaultResult.reason === 'missing_manual_runner_gate', 'default mode requires manual runner gate');
  assert(mutatingCallCount(defaultFake) === 0, 'default mode writes nothing');
  assert(defaultFake.calls.length === 0, 'default mode makes no Supabase calls');

  const liveMissingGateFake = createFakeSupabase();
  const liveMissingGateResult = await runSmsDispatcherManualTestOnly({
    supabase: liveMissingGateFake,
    manualGate,
    maxBatchSize: 1
  });
  assert(liveMissingGateResult.failedClosed === true, 'live-style mode without every gate fails closed');
  assert(liveMissingGateResult.reason === 'db_executor_failed_closed', 'missing DB executor gate fails through executor');
  assert(mutatingCallCount(liveMissingGateFake) === 0, 'missing DB executor gate writes nothing');

  const validFake = createFakeSupabase();
  const validResult = await runSmsDispatcherManualTestOnly({
    supabase: validFake,
    manualGate,
    dbExecutorGate,
    maxBatchSize: 1,
    currentTime: '2026-06-04T20:00:00.000Z'
  });
  assert(validResult.applied === true, 'fake mode applies through DB executor');
  assert(validResult.failedClosed === false, 'fake mode does not fail closed with all gates');
  assert(validResult.selectedPlanCount === 1, 'fake mode selects one plan by default');
  assert(validFake.rows.messages.length === 1, 'fake mode inserts one message through DB executor');
  assert(validFake.rows.follow_ups[0].status === 'sent', 'fake mode updates one follow-up through DB executor');
  assert(validFake.rows.workflow_events.length === 1, 'fake mode inserts one workflow event through DB executor');
  assert(validResult.noSmsSent === true, 'fake mode reports no SMS sent');
  assert(validResult.noTwilioCallsMade === true, 'fake mode reports no Twilio calls');

  const cappedFake = createFakeSupabase({ count: 5 });
  const cappedResult = await runSmsDispatcherManualTestOnly({
    supabase: cappedFake,
    manualGate,
    dbExecutorGate,
    maxBatchSize: 99,
    currentTime: '2026-06-04T20:00:00.000Z'
  });
  assert(cappedResult.requestedBatchSize === 99, 'requested batch size is recorded');
  assert(cappedResult.cappedBatchSize === SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE, 'batch size is capped');
  assert(cappedResult.selectedPlanCount === SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE, 'only capped batch size is selected');
  assert(cappedFake.rows.messages.length === SMS_DISPATCHER_MANUAL_TEST_MAX_BATCH_SIZE, 'only capped batch size is written in fake mode');

  console.log('PASS: SMS dispatcher manual test runner verification passed.');
  console.log('No live database writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');
})();
