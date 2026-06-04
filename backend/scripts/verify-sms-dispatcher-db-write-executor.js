#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const writePlanTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-write-plan.service.ts');
const dbExecutorTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-db-write-executor.service.ts');
const compiledWritePlanJs = '/tmp/sms-dispatcher-write-plan.db-executor-verify.js';
const compiledDbExecutorJs = '/tmp/sms-dispatcher-db-write-executor.verify.js';

console.log('=== RoofLeadHQ SMS Dispatcher DB Write Executor Verification ===');
console.log('Fake Supabase only.');
console.log('No live database writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');
console.log('No route, cron, or production dispatcher is activated.');

function compile(sourcePath, outputPath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
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
  }

  select(columns) {
    this.db.calls.push({ table: this.table, method: 'select', columns });
    return this;
  }

  eq(column, value) {
    this.db.calls.push({ table: this.table, method: 'eq', column, value });
    this.filters.push({ column, value });
    return this;
  }

  limit(count) {
    this.db.calls.push({ table: this.table, method: 'limit', count });
    return Promise.resolve({ data: this.matchingRows().slice(0, count), error: null });
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
      const inserted = {
        id: `${this.table}-${this.db.rows[this.table].length + 1}`,
        ...this.payload
      };
      this.db.rows[this.table].push(inserted);
      return Promise.resolve({ data: inserted, error: null });
    }

    if (this.mode === 'update') {
      const matches = this.matchingRows();
      if (matches.length !== 1) {
        return Promise.resolve({
          data: null,
          error: { message: `Expected one ${this.table} row, found ${matches.length}` }
        });
      }
      Object.assign(matches[0], this.payload);
      return Promise.resolve({ data: matches[0], error: null });
    }

    const matches = this.matchingRows();
    return Promise.resolve({
      data: matches[0] || null,
      error: matches.length === 1 ? null : { message: `Expected one ${this.table} row, found ${matches.length}` }
    });
  }

  matchingRows() {
    return this.db.rows[this.table].filter((row) => {
      return this.filters.every((filter) => row[filter.column] === filter.value);
    });
  }
}

function createFakeSupabase(seed = {}) {
  return {
    calls: [],
    rows: {
      messages: [...(seed.messages || [])],
      follow_ups: [...(seed.follow_ups || [])],
      workflow_events: [...(seed.workflow_events || [])]
    },
    from(table) {
      this.calls.push({ table, method: 'from' });
      if (!this.rows[table]) {
        throw new Error(`Unexpected table ${table}`);
      }
      return new FakeQuery(table, this);
    }
  };
}

function mutatingCallCount(fake) {
  return fake.calls.filter((call) => ['insert', 'update', 'upsert', 'delete'].includes(call.method)).length;
}

function runStaticSafetyChecks() {
  const serviceSource = fs.readFileSync(dbExecutorTs, 'utf8');
  const scriptSource = fs.readFileSync(__filename, 'utf8');

  assert(!serviceSource.includes("require('" + "twilio')"), 'service has no Twilio require');
  assert(!serviceSource.includes('from "' + 'twilio"'), 'service has no Twilio import');
  assert(!serviceSource.includes("from '" + "twilio'"), 'service has no Twilio import');
  assert(!/new Twilio|twilio\(/i.test(serviceSource), 'service has no Twilio client usage');
  assert(!/\.messages\.create\s*\(/.test(serviceSource), 'service has no SMS provider send call');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(serviceSource), 'service has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(/i.test(serviceSource), 'service has no cron or scheduler activation');
  assert(!/runSmsDispatcher\s*\(|dispatchSms\s*\(|sendSms\s*\(/i.test(serviceSource), 'service has no production dispatcher activation');
  assert(!scriptSource.includes("require('" + "twilio')"), 'verifier has no Twilio require');
  assert(!scriptSource.includes('from "' + 'twilio"'), 'verifier has no Twilio import');
  assert(!scriptSource.includes("from '" + "twilio'"), 'verifier has no Twilio import');
}

compile(writePlanTs, compiledWritePlanJs);
compile(dbExecutorTs, compiledDbExecutorJs);

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-dispatcher-write-plan.service') {
    return require(compiledWritePlanJs);
  }

  return originalLoad(request, parent, isMain);
};

const { buildSmsDispatcherWritePlan } = require(compiledWritePlanJs);
const {
  SMS_DISPATCHER_DB_EXECUTOR_TARGET,
  executeSmsDispatcherDbWritePlan
} = require(compiledDbExecutorJs);

const baseInput = {
  followUpId: 'followup-1',
  rooferId: 'roofer-1',
  leadId: 'lead-1',
  toNumber: '+15551234567',
  fromNumber: '+15557654321',
  messageBody: 'Just following up on your roofing request.',
  templateType: 'followup_2h',
  currentTime: '2026-06-04T20:00:00.000Z',
  duplicateSendExists: false,
  duplicateLookupSource: 'messages.roofer_id.lead_id.message_body.sent_at',
  duplicateLookupError: null
};

const validGate = {
  allowLiveDbWrite: true,
  liveWriteTarget: SMS_DISPATCHER_DB_EXECUTOR_TARGET,
  confirmWritePlan: true
};

const sendPlan = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'send',
  reason: 'eligible',
  shouldSend: true
});

(async () => {
  runStaticSafetyChecks();

  const defaultFake = createFakeSupabase();
  const defaultResult = await executeSmsDispatcherDbWritePlan({
    supabase: defaultFake,
    writePlan: sendPlan
  });
  assert(defaultResult.failedClosed === true, 'default mode fails closed');
  assert(defaultResult.reason === 'missing_executor_live_gate', 'default mode requires executor live gate');
  assert(mutatingCallCount(defaultFake) === 0, 'default mode writes nothing');

  const missingGateFake = createFakeSupabase();
  const missingGateResult = await executeSmsDispatcherDbWritePlan({
    supabase: missingGateFake,
    writePlan: {
      ...sendPlan,
      requiresLiveWriteGate: false
    },
    gate: validGate
  });
  assert(missingGateResult.failedClosed === true, 'missing write-plan gate fails closed');
  assert(missingGateResult.reason === 'missing_write_plan_live_gate', 'missing write-plan gate reports reason');
  assert(mutatingCallCount(missingGateFake) === 0, 'missing write-plan gate writes nothing');

  const duplicateFake = createFakeSupabase({
    messages: [
      {
        id: 'message-existing',
        roofer_id: 'roofer-1',
        lead_id: 'lead-1',
        channel: 'sms',
        direction: 'outbound',
        message_body: 'Just following up on your roofing request.'
      }
    ],
    follow_ups: [{ id: 'followup-1', status: 'scheduled' }]
  });
  const duplicateResult = await executeSmsDispatcherDbWritePlan({
    supabase: duplicateFake,
    writePlan: sendPlan,
    gate: validGate
  });
  assert(duplicateResult.failedClosed === true, 'duplicate message blocks insert');
  assert(duplicateResult.reason === 'duplicate_message_found', 'duplicate message reports duplicate reason');
  assert(mutatingCallCount(duplicateFake) === 0, 'duplicate message path writes nothing');

  const validFake = createFakeSupabase({
    follow_ups: [{ id: 'followup-1', status: 'scheduled' }]
  });
  const validResult = await executeSmsDispatcherDbWritePlan({
    supabase: validFake,
    writePlan: sendPlan,
    gate: validGate
  });

  assert(validResult.applied === true, 'valid fake Supabase path applies');
  assert(validResult.failedClosed === false, 'valid fake Supabase path does not fail closed');
  assert(validResult.noSmsSent === true, 'valid fake path reports no SMS sent');
  assert(validResult.noTwilioCallsMade === true, 'valid fake path reports no Twilio calls');
  assert(
    validResult.operations.map((operation) => operation.type).join(',') ===
      'message_insert,follow_up_update,workflow_event_insert',
    'valid fake path applies message, follow-up, workflow event order'
  );
  assert(validFake.rows.messages.length === 1, 'valid fake path inserts one message row');
  assert(validFake.rows.follow_ups[0].status === 'sent', 'valid fake path updates one follow-up row');
  assert(validFake.rows.workflow_events.length === 1, 'valid fake path inserts one workflow event row');
  assert(
    validFake.calls.filter((call) => call.method === 'insert' && call.table === 'messages').length === 1,
    'valid fake path performs one messages insert'
  );
  assert(
    validFake.calls.filter((call) => call.method === 'update' && call.table === 'follow_ups').length === 1,
    'valid fake path performs one follow_ups update'
  );
  assert(
    validFake.calls.filter((call) => call.method === 'insert' && call.table === 'workflow_events').length === 1,
    'valid fake path performs one workflow_events insert'
  );

  console.log('PASS: SMS dispatcher DB write executor verification passed.');
  console.log('No live database writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');
})();
