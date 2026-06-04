#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const writePlanTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-write-plan.service.ts');
const compiledWritePlanJs = '/tmp/sms-dispatcher-write-plan.verify.js';

const dispatcherPathFiles = [
  path.join(repoRoot, 'backend/src/services/sms-dispatcher-dry-run-executor.service.ts'),
  path.join(repoRoot, 'backend/src/services/sms-dispatcher-planner.service.ts'),
  path.join(repoRoot, 'backend/src/services/sms-dispatcher-write-plan.service.ts'),
  path.join(repoRoot, 'backend/src/services/sms-duplicate-send-detector.service.ts')
];

console.log('=== RoofLeadHQ SMS Dispatcher Write-Plan Verification ===');
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

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

compile(writePlanTs, compiledWritePlanJs);

const { buildSmsDispatcherWritePlan } = require(compiledWritePlanJs);

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

const eligibleSend = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'send',
  reason: 'eligible',
  shouldSend: true
});

assert(eligibleSend.requiresLiveWriteGate === true, 'eligible send requires live write gate');
assert(Boolean(eligibleSend.messageInsertPlan), 'eligible send creates proposed message insert payload only');
assert(eligibleSend.messageInsertPlan.status === 'planned', 'eligible send message status is planned');
assert(eligibleSend.messageInsertPlan.provider === null, 'eligible send does not select SMS provider yet');
assert(eligibleSend.followUpUpdatePlan.status === 'sent', 'eligible send proposes follow-up sent update');
assert(eligibleSend.workflowEventInsertPlan.event_type === 'sms_send_planned', 'eligible send creates send audit plan');
assert(
  eligibleSend.workflowEventInsertPlan.metadata.follow_up_id === 'followup-1',
  'eligible send audit metadata includes follow_up_id'
);

const duplicateSkip = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'skip',
  reason: 'duplicate_send',
  shouldSend: false,
  duplicateSendExists: true
});

assert(duplicateSkip.messageInsertPlan === null, 'duplicate creates no message insert plan');
assert(duplicateSkip.followUpUpdatePlan.status === 'skipped', 'duplicate proposes skipped follow-up update');
assert(duplicateSkip.followUpUpdatePlan.skipped_reason === 'duplicate_send', 'duplicate skip reason is preserved');
assert(duplicateSkip.workflowEventInsertPlan.event_type === 'sms_skip_planned', 'duplicate creates skip audit plan');

const disabledSkip = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'skip',
  reason: 'sms_disabled',
  shouldSend: false
});

assert(disabledSkip.messageInsertPlan === null, 'disabled lead creates no message insert plan');
assert(disabledSkip.followUpUpdatePlan.status === 'skipped', 'disabled lead proposes skipped follow-up update');
assert(disabledSkip.workflowEventInsertPlan.metadata.follow_up_id === 'followup-1', 'disabled audit metadata includes follow_up_id');

const quietHours = buildSmsDispatcherWritePlan({
  ...baseInput,
  action: 'reschedule',
  reason: 'quiet_hours',
  shouldSend: false,
  rescheduledFor: '2026-06-03T14:00:00.000Z'
});

assert(quietHours.messageInsertPlan === null, 'quiet hours creates no message insert plan');
assert(quietHours.followUpUpdatePlan.scheduled_for === '2026-06-03T14:00:00.000Z', 'quiet hours proposes reschedule update');
assert(quietHours.workflowEventInsertPlan.event_type === 'sms_reschedule_planned', 'quiet hours creates reschedule audit plan');

for (const file of dispatcherPathFiles) {
  const source = fs.readFileSync(file, 'utf8');
  assert(!/\.(insert|update|upsert|delete)\s*\(/.test(source), `${path.basename(file)} has no mutating Supabase method calls`);
  assert(!/require\(['"]twilio['"]\)|from ['"]twilio['"]|new Twilio|twilio\(/i.test(source), `${path.basename(file)} has no reachable Twilio client usage`);
}

console.log('PASS: SMS dispatcher write-plan verification passed.');
console.log('No writes performed.');
console.log('No SMS sent.');
console.log('No Twilio calls made.');
