#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  ['sms-safety.service', 'backend/src/services/sms-safety.service.ts', '/tmp/sms-safety.manual-test.js'],
  ['sms-dispatcher-planner.service', 'backend/src/services/sms-dispatcher-planner.service.ts', '/tmp/sms-dispatcher-planner.manual-test.js'],
  ['sms-duplicate-send-detector.service', 'backend/src/services/sms-duplicate-send-detector.service.ts', '/tmp/sms-duplicate-send-detector.manual-test.js'],
  ['sms-dispatcher-write-plan.service', 'backend/src/services/sms-dispatcher-write-plan.service.ts', '/tmp/sms-dispatcher-write-plan.manual-test.js'],
  ['sms-dispatcher-dry-run-executor.service', 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts', '/tmp/sms-dispatcher-dry-run-executor.manual-test.js'],
  ['sms-dispatcher-db-write-executor.service', 'backend/src/services/sms-dispatcher-db-write-executor.service.ts', '/tmp/sms-dispatcher-db-write-executor.manual-test.js'],
  ['sms-dispatcher-manual-test-runner.service', 'backend/src/services/sms-dispatcher-manual-test-runner.service.ts', '/tmp/sms-dispatcher-manual-test-runner.js']
];

console.log('=== RoofLeadHQ SMS Dispatcher Manual Test-Only Runner ===');
console.log('Fake Supabase is used by default.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');
console.log('No route, cron, or production dispatcher is activated.');

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

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

function createFakeSupabase(rooferId) {
  return {
    calls: [],
    rows: {
      follow_ups: [
        {
          id: 'manual-test-followup-1',
          roofer_id: rooferId,
          lead_id: 'manual-test-lead-1',
          status: 'scheduled',
          followup_type: '2h',
          scheduled_for: '2026-06-04T18:00:00.000Z',
          message_body: 'Manual test-only dispatcher follow-up.',
          leads: {
            id: 'manual-test-lead-1',
            phone: '+15551234567',
            status: 'new'
          },
          roofers: {
            id: rooferId,
            business_name: 'Manual Test Roofer',
            sms_confirmation_enabled: true,
            timezone: 'America/Denver'
          }
        }
      ],
      messages: [],
      workflow_events: []
    },
    from(table) {
      this.calls.push({ table, method: 'from' });
      if (!this.rows[table]) throw new Error(`Unexpected fake table ${table}`);
      return new FakeQuery(table, this);
    }
  };
}

function liveModeRequested() {
  return (
    process.env.SMS_MANUAL_TEST_USE_LIVE_SUPABASE === 'true' &&
    process.argv.includes('--allow-live-supabase-manual-test') &&
    process.argv.includes('--test-only')
  );
}

async function buildSupabase(approvedRooferId) {
  if (!liveModeRequested()) {
    return createFakeSupabase(approvedRooferId || 'manual-test-roofer-1');
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables for live manual test');
  }

  const { createClient } = require('@supabase/supabase-js');
  return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

const {
  SMS_DISPATCHER_MANUAL_TEST_RUNNER_TARGET,
  runSmsDispatcherManualTestOnly
} = require('/tmp/sms-dispatcher-manual-test-runner.js');
const {
  SMS_DISPATCHER_DB_EXECUTOR_TARGET
} = require('/tmp/sms-dispatcher-db-write-executor.manual-test.js');

(async () => {
  const approvedRooferId = getArgValue('--approved-roofer-id') || process.env.SMS_MANUAL_TEST_ROOFER_ID || null;
  const maxBatchSize = Number(getArgValue('--max-batch-size') || process.env.SMS_MANUAL_TEST_MAX_BATCH_SIZE || 1);
  const supabase = await buildSupabase(approvedRooferId);

  const result = await runSmsDispatcherManualTestOnly({
    supabase,
    maxBatchSize,
    manualGate: {
      testOnly: process.argv.includes('--test-only') || process.env.SMS_MANUAL_TEST_ONLY === 'true',
      allowManualTestRunner: process.env.SMS_MANUAL_TEST_RUNNER === 'true',
      runnerTarget: process.env.SMS_MANUAL_TEST_TARGET,
      approvedRooferId
    },
    dbExecutorGate: {
      allowLiveDbWrite: process.env.SMS_DISPATCHER_DB_EXECUTOR_WRITE === 'true',
      liveWriteTarget: process.env.SMS_DB_EXECUTOR_TARGET,
      confirmWritePlan: process.env.SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN === 'true'
    }
  });

  console.log(JSON.stringify({
    mode: liveModeRequested() ? 'live' : 'fake',
    result
  }, null, 2));

  if (result.failedClosed) {
    process.exit(1);
  }
})();
