#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const writePlanTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-write-plan.service.ts');
const mockExecutorTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-mock-write-executor.service.ts');
const compiledWritePlanJs = '/tmp/sms-dispatcher-write-plan.mock-verify.js';
const compiledMockExecutorJs = '/tmp/sms-dispatcher-mock-write-executor.verify.js';

const staticCheckFiles = [
  mockExecutorTs,
  path.join(repoRoot, 'backend/src/services/sms-dispatcher-write-plan.service.ts')
];

console.log('=== RoofLeadHQ SMS Dispatcher Mock Write Executor Verification ===');
console.log('No Supabase writes are performed.');
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

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

compile(writePlanTs, compiledWritePlanJs);
compile(mockExecutorTs, compiledMockExecutorJs);

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-dispatcher-write-plan.service') {
    return require(compiledWritePlanJs);
  }

  return originalLoad(request, parent, isMain);
};

const { buildSmsDispatcherWritePlan } = require(compiledWritePlanJs);
const { executeSmsDispatcherMockWritePlan } = require(compiledMockExecutorJs);

const baseInput = {
  followUpId: 'followup-1',
  rooferId: 'roofer-1',
  leadId: 'lead-1',
  toNumber: '+15551234567',
  fromNumber: null,
  messageBody: 'Just following up on your roofing request.',
  templateType: 'followup_2h',
  currentTime: '2026-06-02T16:00:00.000Z',
  duplicateSendExists: false,
  duplicateLookupSource: 'messages.roofer_id.lead_id.message_body.sent_at',
  duplicateLookupError: null
};

const sendPlan = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'send',
  reason: 'eligible',
  shouldSend: true
});
const sendResult = executeSmsDispatcherMockWritePlan(sendPlan);

assert(sendResult.testOnly === true, 'mock executor is test-only');
assert(sendResult.noSupabaseWrites === true, 'mock executor reports no Supabase writes');
assert(sendResult.noSmsSent === true, 'mock executor reports no SMS sent');
assert(sendResult.noTwilioCallsMade === true, 'mock executor reports no Twilio calls');
assert(sendResult.applied === true, 'send plan applies in mock memory only');
assert(
  sendResult.operations.map((operation) => operation.type).join(',') ===
    'messageInsertPlan,followUpUpdatePlan,workflowEventInsertPlan',
  'send plan applies message, follow-up, workflow event order'
);

const duplicatePlan = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'skip',
  reason: 'duplicate_send',
  shouldSend: false,
  duplicateSendExists: true
});
const duplicateResult = executeSmsDispatcherMockWritePlan(duplicatePlan);

assert(duplicateResult.applied === true, 'duplicate skip plan applies in mock memory only');
assert(
  duplicateResult.operations.map((operation) => operation.type).join(',') ===
    'followUpUpdatePlan,workflowEventInsertPlan',
  'duplicate skip plan applies only follow-up and workflow event'
);
assert(
  duplicateResult.operations.every((operation) => operation.type !== 'messageInsertPlan'),
  'duplicate skip plan has no message insert operation'
);

const disabledPlan = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'skip',
  reason: 'sms_disabled',
  shouldSend: false
});
const disabledResult = executeSmsDispatcherMockWritePlan(disabledPlan);

assert(disabledResult.applied === true, 'disabled skip plan applies in mock memory only');
assert(
  disabledResult.operations.map((operation) => operation.type).join(',') ===
    'followUpUpdatePlan,workflowEventInsertPlan',
  'disabled skip plan applies only follow-up and workflow event'
);

const reschedulePlan = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'reschedule',
  reason: 'quiet_hours',
  shouldSend: false,
  rescheduledFor: '2026-06-03T14:00:00.000Z'
});
const rescheduleResult = executeSmsDispatcherMockWritePlan(reschedulePlan);

assert(rescheduleResult.applied === true, 'reschedule plan applies in mock memory only');
assert(
  rescheduleResult.operations.map((operation) => operation.type).join(',') ===
    'followUpUpdatePlan,workflowEventInsertPlan',
  'reschedule plan applies only follow-up and workflow event'
);
assert(
  rescheduleResult.operations[0].payload.scheduled_for === '2026-06-03T14:00:00.000Z',
  'reschedule plan preserves scheduled_for payload'
);

const missingGateResult = executeSmsDispatcherMockWritePlan({
  ...sendPlan,
  requiresLiveWriteGate: false
});
assert(missingGateResult.failedClosed === true, 'missing requiresLiveWriteGate fails closed');
assert(missingGateResult.operations.length === 0, 'missing gate applies no operations');

const nullResult = executeSmsDispatcherMockWritePlan(null);
assert(nullResult.failedClosed === true, 'null write plan fails closed safely');
assert(nullResult.operations.length === 0, 'null write plan applies no operations');

const emptyResult = executeSmsDispatcherMockWritePlan({
  requiresLiveWriteGate: true,
  messageInsertPlan: null,
  followUpUpdatePlan: null,
  workflowEventInsertPlan: null
});
assert(emptyResult.failedClosed === true, 'empty write plan fails closed safely');
assert(emptyResult.operations.length === 0, 'empty write plan applies no operations');

for (const file of staticCheckFiles) {
  const source = fs.readFileSync(file, 'utf8');
  assert(!/createClient/.test(source), `${path.basename(file)} has no createClient`);
  assert(!/\.from\s*\(/.test(source), `${path.basename(file)} has no .from calls`);
  assert(!/\.(insert|update|upsert|delete)\s*\(/.test(source), `${path.basename(file)} has no mutating Supabase method calls`);
  assert(!/twilio/.test(source), `${path.basename(file)} has no lowercase twilio reference`);
}

console.log('PASS: SMS dispatcher mock write executor verification passed.');
console.log('No Supabase writes performed.');
console.log('No SMS sent.');
console.log('No Twilio calls made.');
