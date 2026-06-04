#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  ['sms-safety.service', 'backend/src/services/sms-safety.service.ts', '/tmp/sms-safety.production-runner.js'],
  ['sms-dispatcher-planner.service', 'backend/src/services/sms-dispatcher-planner.service.ts', '/tmp/sms-dispatcher-planner.production-runner.js'],
  ['sms-duplicate-send-detector.service', 'backend/src/services/sms-duplicate-send-detector.service.ts', '/tmp/sms-duplicate-send-detector.production-runner.js'],
  ['sms-dispatcher-write-plan.service', 'backend/src/services/sms-dispatcher-write-plan.service.ts', '/tmp/sms-dispatcher-write-plan.production-runner.js'],
  ['sms-dispatcher-dry-run-executor.service', 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts', '/tmp/sms-dispatcher-dry-run-executor.production-runner.js'],
  ['sms-dispatcher-db-write-executor.service', 'backend/src/services/sms-dispatcher-db-write-executor.service.ts', '/tmp/sms-dispatcher-db-write-executor.production-runner.js'],
  ['sms-dispatcher-production-runner.service', 'backend/src/services/sms-dispatcher-production-runner.service.ts', '/tmp/sms-dispatcher-production-runner.js']
];

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

function hasLiveCliGate(argv = process.argv) {
  return (
    argv.includes('--allow-live-supabase-production-runner') &&
    argv.includes('--production-runner')
  );
}

function liveSupabaseRequested(env = process.env) {
  return env.SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE === 'true';
}

function liveModeRequested(env = process.env, argv = process.argv) {
  return liveSupabaseRequested(env) && hasLiveCliGate(argv);
}

function hasLiveEnvGate(env = process.env) {
  return (
    env.SMS_DISPATCHER_PRODUCTION_RUNNER === 'true' &&
    env.SMS_DISPATCHER_PRODUCTION_TARGET === 'sms_dispatcher_production_runner' &&
    env.SMS_DISPATCHER_DB_EXECUTOR_WRITE === 'true' &&
    env.SMS_DB_EXECUTOR_TARGET === 'sms_dispatcher_db_executor' &&
    env.SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN === 'true' &&
    parseSmsDispatcherProductionAllowedRooferIds(
      env.SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS
    ).length > 0
  );
}

function failedClosedCliResult(reason, error) {
  return {
    noSmsSent: true,
    noTwilioCallsMade: true,
    routeAdded: false,
    cronAdded: false,
    productionDispatcherActivated: false,
    applied: false,
    failedClosed: true,
    reason,
    requestedBatchSize: 1,
    cappedBatchSize: 1,
    allowedRooferIds: [],
    dryRunPlanCount: 0,
    selectedPlanCount: 0,
    applications: [],
    error
  };
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

function createFakeSupabase(rooferId) {
  return {
    calls: [],
    rows: {
      follow_ups: [
        {
          id: 'production-cli-followup-1',
          roofer_id: rooferId,
          lead_id: 'production-cli-lead-1',
          status: 'scheduled',
          followup_type: '2h',
          scheduled_for: '2026-06-04T16:00:00.000Z',
          message_body: 'Production runner CLI scaffold follow-up.',
          leads: {
            id: 'production-cli-lead-1',
            phone: '+15551234567',
            status: 'new'
          },
          roofers: {
            id: rooferId,
            business_name: 'Production CLI Scaffold Roofer',
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

async function buildSupabase(defaultRooferId, env = process.env, argv = process.argv) {
  if (!liveModeRequested(env, argv)) {
    return createFakeSupabase(defaultRooferId);
  }

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase environment variables for live production runner');
  }

  const { createClient } = require('@supabase/supabase-js');
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
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
  buildSmsDispatcherProductionRunnerInputFromEnv,
  parseSmsDispatcherProductionAllowedRooferIds,
  executeSmsDispatcherProductionRunner
} = require('/tmp/sms-dispatcher-production-runner.js');

async function runProductionRunnerCli(env = process.env, argv = process.argv) {
  if (liveSupabaseRequested(env) && !hasLiveCliGate(argv)) {
    return {
      mode: 'live_blocked',
      liveSupabaseRequested: true,
      result: failedClosedCliResult(
        'missing_live_supabase_cli_gate',
        'Live Supabase production runner requires --allow-live-supabase-production-runner and --production-runner'
      )
    };
  }

  if (liveSupabaseRequested(env) && !hasLiveEnvGate(env)) {
    return {
      mode: 'live_blocked',
      liveSupabaseRequested: true,
      result: failedClosedCliResult(
        'missing_live_supabase_env_gate',
        'Live Supabase production runner requires production runner env gates, DB executor env gates, and allowed roofer UUIDs'
      )
    };
  }

  const allowedRooferIds = parseSmsDispatcherProductionAllowedRooferIds(
    env.SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS
  );
  const defaultRooferId = allowedRooferIds[0] || '11111111-1111-4111-8111-111111111111';
  const supabase = await buildSupabase(defaultRooferId, env, argv);
  const input = buildSmsDispatcherProductionRunnerInputFromEnv(
    env,
    supabase,
    env.SMS_DISPATCHER_PRODUCTION_CURRENT_TIME || '2026-06-04T18:00:00.000Z'
  );
  const result = await executeSmsDispatcherProductionRunner(input);

  return {
    mode: liveModeRequested(env, argv) ? 'live' : 'fake',
    liveSupabaseRequested: liveSupabaseRequested(env),
    result
  };
}

async function main() {
  console.log('=== RoofLeadHQ SMS Dispatcher Production Runner CLI ===');
  console.log('Fake Supabase is used by default.');
  console.log('No SMS is sent.');
  console.log('No Twilio calls are made.');
  console.log('No route, cron, scheduler, or auto-start is activated.');

  const payload = await runProductionRunnerCli(process.env, process.argv);
  console.log(JSON.stringify(payload, null, 2));

  if (payload.result.failedClosed) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch((error) => {
    console.log(JSON.stringify({
      mode: liveModeRequested() ? 'live' : 'fake',
      liveSupabaseRequested: liveSupabaseRequested(),
      result: failedClosedCliResult('cli_error', error.message)
    }, null, 2));
    process.exit(1);
  });
}

module.exports = {
  createFakeSupabase,
  failedClosedCliResult,
  hasLiveCliGate,
  hasLiveEnvGate,
  liveModeRequested,
  liveSupabaseRequested,
  runProductionRunnerCli
};
