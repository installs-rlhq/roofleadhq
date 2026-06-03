#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const serviceTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-planner.service.ts');
const safetyTs = path.join(repoRoot, 'backend/src/services/sms-safety.service.ts');
const compiledPlannerJs = '/tmp/sms-dispatcher-planner.service.js';
const compiledSafetyJs = '/tmp/sms-safety.service.js';

console.log('=== RoofLeadHQ SMS Dispatcher Planner Verification ===');
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

compile(safetyTs, compiledSafetyJs);
compile(serviceTs, compiledPlannerJs);

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-safety.service') {
    return require(compiledSafetyJs);
  }
  return originalLoad(request, parent, isMain);
};

const {
  mapFollowUpTypeToSmsTemplate,
  planSmsDispatch
} = require(compiledPlannerJs);

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

const baseInput = {
  followUp: {
    id: 'followup-1',
    roofer_id: 'roofer-1',
    lead_id: 'lead-1',
    status: 'scheduled',
    followup_type: '2h',
    scheduled_for: '2026-06-02T15:00:00.000Z',
    message_body: 'Just following up on your roofing request.'
  },
  lead: {
    id: 'lead-1',
    phone: '+15551234567',
    status: 'new'
  },
  roofer: {
    id: 'roofer-1',
    sms_confirmation_enabled: true,
    timezone: 'America/Denver'
  },
  currentTime: '2026-06-02T16:00:00.000Z',
  duplicateSendExists: false
};

assert(mapFollowUpTypeToSmsTemplate('initial') === 'manual_outreach_initial', 'initial maps to manual_outreach_initial');
assert(mapFollowUpTypeToSmsTemplate('2h') === 'followup_2h', '2h maps to followup_2h');
assert(mapFollowUpTypeToSmsTemplate('12h') === 'followup_12h', '12h maps to followup_12h');
assert(mapFollowUpTypeToSmsTemplate('24h') === 'followup_24h', '24h maps to followup_24h');
assert(mapFollowUpTypeToSmsTemplate('48h') === null, '48h is not approved without explicit template');
assert(mapFollowUpTypeToSmsTemplate('unknown') === null, 'unknown follow-up type is blocked');

const allowed = planSmsDispatch(baseInput);
assert(allowed.shouldSend === true, 'eligible scheduled follow-up plans send');
assert(allowed.action === 'send', 'eligible action is send');
assert(allowed.templateType === 'followup_2h', 'eligible plan includes mapped template');

const disabled = planSmsDispatch({
  ...baseInput,
  roofer: { ...baseInput.roofer, sms_confirmation_enabled: false }
});
assert(disabled.shouldSend === false, 'roofer SMS disabled blocks send');
assert(disabled.reason === 'sms_disabled', 'disabled reason is sms_disabled');

const duplicate = planSmsDispatch({
  ...baseInput,
  duplicateSendExists: true
});
assert(duplicate.shouldSend === false, 'duplicate send blocks send');
assert(duplicate.reason === 'duplicate_send', 'duplicate reason is duplicate_send');

const quietHours = planSmsDispatch({
  ...baseInput,
  currentTime: '2026-06-03T04:00:00.000Z'
});
assert(quietHours.shouldSend === false, 'quiet hours blocks immediate send');
assert(quietHours.action === 'reschedule', 'quiet hours action is reschedule');
assert(Boolean(quietHours.rescheduledFor), 'quiet hours returns rescheduled time');

const optedOut = planSmsDispatch({
  ...baseInput,
  lead: { ...baseInput.lead, status: 'opted_out' }
});
assert(optedOut.shouldSend === false, 'opted_out lead blocks send');
assert(optedOut.reason === 'opted_out', 'opted_out reason is opted_out');

const missing = planSmsDispatch({
  ...baseInput,
  followUp: { ...baseInput.followUp, scheduled_for: undefined }
});
assert(missing.shouldSend === false, 'missing scheduled_for blocks send');
assert(missing.reason === 'missing_required_field', 'missing field reason is missing_required_field');

const unapproved = planSmsDispatch({
  ...baseInput,
  followUp: { ...baseInput.followUp, followup_type: '48h' }
});
assert(unapproved.shouldSend === false, 'unapproved follow-up type blocks send');
assert(unapproved.reason === 'template_not_approved', 'unapproved reason is template_not_approved');

console.log('OK: SMS dispatcher planner verification passed.');
console.log('No writes performed.');
console.log('No SMS sent.');
console.log('No Twilio calls made.');
