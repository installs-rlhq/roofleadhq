#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const sourceFiles = [
  {
    source: path.join(repoRoot, 'backend/src/services/sms-safety.service.ts'),
    output: '/tmp/sms-safety.dry-run-verify.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-dispatcher-planner.service.ts'),
    output: '/tmp/sms-dispatcher-planner.dry-run-verify.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-duplicate-send-detector.service.ts'),
    output: '/tmp/sms-duplicate-send-detector.dry-run-verify.js'
  },
  {
    source: path.join(repoRoot, 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts'),
    output: '/tmp/sms-dispatcher-dry-run-executor.verify.js'
  }
];

console.log('=== RoofLeadHQ SMS Dispatcher Dry-Run Executor Verification ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');

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

for (const file of sourceFiles) {
  compile(file.source, file.output);
}

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-safety.service') {
    return require('/tmp/sms-safety.dry-run-verify.js');
  }
  if (request === './sms-dispatcher-planner.service') {
    return require('/tmp/sms-dispatcher-planner.dry-run-verify.js');
  }
  if (request === './sms-duplicate-send-detector.service') {
    return require('/tmp/sms-duplicate-send-detector.dry-run-verify.js');
  }

  return originalLoad(request, parent, isMain);
};

const { executeSmsDispatcherDryRun } = require('/tmp/sms-dispatcher-dry-run-executor.verify.js');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

class Query {
  constructor(table, mock) {
    this.table = table;
    this.mock = mock;
  }

  select() {
    this.mock.calls.push(`${this.table}.select`);
    return this;
  }

  eq() {
    this.mock.calls.push(`${this.table}.eq`);
    return this;
  }

  lte() {
    this.mock.calls.push(`${this.table}.lte`);
    return this;
  }

  not() {
    this.mock.calls.push(`${this.table}.not`);
    return this;
  }

  contains() {
    this.mock.calls.push(`${this.table}.contains`);
    return this;
  }

  or() {
    this.mock.calls.push(`${this.table}.or`);
    return this;
  }

  limit() {
    this.mock.calls.push(`${this.table}.limit`);
    return this;
  }

  insert() {
    this.mock.calls.push(`${this.table}.insert`);
    throw new Error('insert should not be reachable in dry-run verification');
  }

  update() {
    this.mock.calls.push(`${this.table}.update`);
    throw new Error('update should not be reachable in dry-run verification');
  }

  upsert() {
    this.mock.calls.push(`${this.table}.upsert`);
    throw new Error('upsert should not be reachable in dry-run verification');
  }

  delete() {
    this.mock.calls.push(`${this.table}.delete`);
    throw new Error('delete should not be reachable in dry-run verification');
  }

  then(resolve, reject) {
    return Promise.resolve(this.mock.responseFor(this.table)).then(resolve, reject);
  }
}

function createMockSupabase(options = {}) {
  return {
    calls: [],
    from(table) {
      this.calls.push(`${table}.from`);
      return new Query(table, this);
    },
    responseFor(table) {
      if (options.errors?.[table]) {
        return { data: null, error: { message: options.errors[table] } };
      }
      if (table === 'follow_ups') {
        return { data: options.followUps || [], error: null };
      }
      if (table === 'workflow_events') {
        return { data: options.workflowEvents || [], error: null };
      }
      if (table === 'messages') {
        return { data: options.messages || [], error: null };
      }
      return { data: [], error: null };
    }
  };
}

const dueFollowUp = {
  id: 'followup-1',
  roofer_id: 'roofer-1',
  lead_id: 'lead-1',
  status: 'scheduled',
  followup_type: '2h',
  scheduled_for: '2026-06-02T15:00:00.000Z',
  message_body: 'Just following up on your roofing request.',
  leads: {
    id: 'lead-1',
    phone: '+15551234567',
    status: 'new'
  },
  roofers: {
    id: 'roofer-1',
    business_name: 'Test Roofing',
    sms_confirmation_enabled: true,
    timezone: 'America/Denver'
  }
};

(async () => {
  const eligibleMock = createMockSupabase({ followUps: [dueFollowUp] });
  const eligible = await executeSmsDispatcherDryRun({
    supabase: eligibleMock,
    currentTime: '2026-06-02T16:00:00.000Z'
  });

  assert(eligible.dryRun === true, 'executor defaults to dry-run');
  assert(eligible.readOnly === true, 'executor result is read-only');
  assert(eligible.noWritesPerformed === true, 'executor reports no writes');
  assert(eligible.noSmsSent === true, 'executor reports no SMS sent');
  assert(eligible.noTwilioCallsMade === true, 'executor reports no Twilio calls');
  assert(eligible.counts.send === 1, 'eligible row is planned only, not sent');

  const duplicateMock = createMockSupabase({
    followUps: [dueFollowUp],
    messages: [{ id: 'message-1' }]
  });
  const duplicate = await executeSmsDispatcherDryRun({
    supabase: duplicateMock,
    currentTime: '2026-06-02T16:00:00.000Z'
  });
  assert(duplicate.counts.send === 0, 'duplicate send is not planned as send');
  assert(duplicate.plans[0].reason === 'duplicate_send', 'duplicate reason is duplicate_send');

  const lookupErrorMock = createMockSupabase({
    followUps: [dueFollowUp],
    errors: { messages: 'read failed' }
  });
  const lookupError = await executeSmsDispatcherDryRun({
    supabase: lookupErrorMock,
    currentTime: '2026-06-02T16:00:00.000Z'
  });
  assert(lookupError.failedClosed === true, 'duplicate lookup error fails closed');
  assert(lookupError.counts.send === 0, 'lookup error does not plan send');
  assert(lookupError.plans[0].duplicate_lookup_error === 'read failed', 'lookup error is surfaced');

  const queryErrorMock = createMockSupabase({
    errors: { follow_ups: 'follow-up read failed' }
  });
  const queryError = await executeSmsDispatcherDryRun({
    supabase: queryErrorMock,
    currentTime: '2026-06-02T16:00:00.000Z'
  });
  assert(queryError.failedClosed === true, 'follow-up query error fails closed');
  assert(queryError.counts.send === 0, 'follow-up query error does not plan send');

  const liveAttemptMock = createMockSupabase({ followUps: [dueFollowUp] });
  const liveAttempt = await executeSmsDispatcherDryRun({
    supabase: liveAttemptMock,
    dryRun: false,
    currentTime: '2026-06-02T16:00:00.000Z'
  });
  assert(liveAttempt.failedClosed === true, 'dryRun=false is blocked');
  assert(liveAttempt.counts.send === 0, 'dryRun=false does not query or send');
  assert(liveAttemptMock.calls.length === 0, 'dryRun=false makes no Supabase calls');

  const mutatingCalls = [
    ...eligibleMock.calls,
    ...duplicateMock.calls,
    ...lookupErrorMock.calls,
    ...queryErrorMock.calls,
    ...liveAttemptMock.calls
  ].filter((call) => /\.(insert|update|upsert|delete)$/.test(call));

  assert(mutatingCalls.length === 0, 'no insert/update/upsert/delete calls are reachable');

  console.log('PASS: SMS dispatcher dry-run executor verification passed.');
  console.log('No writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');
})();
