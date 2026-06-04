#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const bridgePath = 'backend/src/services/sms-production-send-intent-bridge.service.ts';
const plannerPath = 'backend/src/services/sms-send-intent-planner.service.ts';
const compiledBridgePath = '/tmp/sms-production-send-intent-bridge.verify.js';
const compiledPlannerPath = '/tmp/sms-send-intent-planner.bridge.verify.js';

console.log('=== RoofLeadHQ SMS Production Send Intent Bridge Verification ===');
console.log('Fake verification only.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');
console.log('No route, cron, scheduler, or auto-start is added.');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
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

function runStaticSafetyChecks() {
  const bridgeSource = fs.readFileSync(path.join(repoRoot, bridgePath), 'utf8');
  const verifierSource = fs.readFileSync(__filename, 'utf8');

  assert(!/^\s*import .*twilio/im.test(bridgeSource), 'bridge has no Twilio import');
  assert(!/\brequire\(['"]twilio['"]\)/im.test(bridgeSource), 'bridge has no Twilio require');
  assert(!/\b(insert|update|upsert|delete)\s*\(/.test(bridgeSource), 'bridge has no mutating DB calls');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(bridgeSource), 'bridge has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\./i.test(bridgeSource), 'bridge has no cron or scheduler activation');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(verifierSource), 'verifier has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\./i.test(verifierSource), 'verifier has no cron or scheduler activation');
}

compile(plannerPath, compiledPlannerPath);
compile(bridgePath, compiledBridgePath);

const { planSmsSendIntent } = require(compiledPlannerPath);
const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-send-intent-planner.service') {
    return require(compiledPlannerPath);
  }

  return originalLoad(request, parent, isMain);
};

const { bridgeProductionRunnerToSmsSendIntent } = require(compiledBridgePath);

const validBridgeInput = {
  application: {
    follow_up_id: 'followup-1',
    roofer_id: 'roofer-1',
    lead_id: 'lead-1',
    action: 'send',
    reason: 'eligible'
  },
  writePlan: {
    messageInsertPlan: {
      lead_id: 'lead-1',
      to_number: '+15551234567',
      from_number: '+15557654321',
      message_body: 'Bridge verification body.'
    }
  },
  approved_follow_up_id: 'followup-1',
  run_id: 'run-bridge-1'
};

function expectFailClosed(overrides, reason, label) {
  const result = bridgeProductionRunnerToSmsSendIntent({
    ...validBridgeInput,
    ...overrides
  });

  assert(result.shouldSend === false, `${label} does not allow send`);
  assert(result.reason === reason, `${label} reports ${reason}`);
  assert(result.sendIntent === null, `${label} returns no send intent`);
  assert(result.noSmsSent === true, `${label} sends no SMS`);
  assert(result.noTwilioCallsMade === true, `${label} makes no Twilio calls`);
  assert(result.bridgedFromProductionRunner === true, `${label} reports bridge origin`);
}

runStaticSafetyChecks();

expectFailClosed({ application: { ...validBridgeInput.application, action: 'skip' } }, 'missing_required_field', 'non-send action');
expectFailClosed({ application: { ...validBridgeInput.application, reason: 'duplicate_send' } }, 'missing_required_field', 'non-eligible reason');
expectFailClosed({ approved_follow_up_id: undefined }, 'missing_required_field', 'missing approved_follow_up_id');
expectFailClosed({ application: { ...validBridgeInput.application, follow_up_id: 'followup-2' } }, 'approved_follow_up_mismatch', 'follow-up mismatch');
expectFailClosed({ run_id: undefined }, 'missing_required_field', 'missing run_id');
expectFailClosed({ writePlan: { messageInsertPlan: { lead_id: 'lead-1', to_number: null, from_number: '+15557654321', message_body: 'x' } } }, 'missing_required_field', 'missing to');
expectFailClosed({ writePlan: { messageInsertPlan: { lead_id: 'lead-1', to_number: '+15551234567', from_number: null, message_body: 'x' } } }, 'missing_required_field', 'missing from');
expectFailClosed({ writePlan: { messageInsertPlan: { lead_id: 'lead-1', to_number: '+15551234567', from_number: '+15557654321', message_body: null } } }, 'missing_required_field', 'missing body');
expectFailClosed({ writePlan: { messageInsertPlan: { lead_id: 'lead-1', to_number: '5551234567', from_number: '+15557654321', message_body: 'x' } } }, 'invalid_e164', 'invalid to number');
expectFailClosed({ writePlan: { messageInsertPlan: { lead_id: 'lead-1', to_number: '+15551234567', from_number: '5557654321', message_body: 'x' } } }, 'invalid_e164', 'invalid from number');

const validResult = bridgeProductionRunnerToSmsSendIntent(validBridgeInput);

assert(validResult.shouldSend === true, 'valid bridge input allows send intent');
assert(validResult.reason === 'eligible', 'valid bridge input reports eligible');
assert(validResult.sendIntent !== null, 'valid bridge input returns a send intent');
assert(validResult.sendIntent.provider === 'twilio', 'valid bridge input intent targets twilio');
assert(validResult.noSmsSent === true, 'valid bridge input sends no SMS');
assert(validResult.noTwilioCallsMade === true, 'valid bridge input makes no Twilio calls');
assert(validResult.bridgedFromProductionRunner === true, 'valid bridge input reports bridge origin');

const plannerResult = planSmsSendIntent({
  roofer_id: 'roofer-1',
  lead_id: 'lead-1',
  follow_up_id: 'followup-1',
  approved_follow_up_id: 'followup-1',
  to: '+15551234567',
  from: '+15557654321',
  body: 'Bridge verification body.',
  run_id: 'run-bridge-1'
});

assert(
  JSON.stringify(validResult.sendIntent) === JSON.stringify(plannerResult.sendIntent),
  'bridge send intent matches planner output for approved fake case'
);

console.log('PASS: SMS production send intent bridge fake-only verification passed.');
console.log('No SMS sent.');
console.log('No Twilio calls made.');
