#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const servicePath = 'backend/src/services/sms-send-intent-planner.service.ts';
const compiledServicePath = '/tmp/sms-send-intent-planner.verify.js';

console.log('=== RoofLeadHQ SMS Send Intent Planner Verification ===');
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
  const serviceSource = fs.readFileSync(path.join(repoRoot, servicePath), 'utf8');
  const verifierSource = fs.readFileSync(__filename, 'utf8');

  assert(!/^\s*import .*twilio/im.test(serviceSource), 'service has no Twilio import');
  assert(!/\brequire\(['"]twilio['"]\)/im.test(serviceSource), 'service has no Twilio require');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(serviceSource), 'service has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\./i.test(serviceSource), 'service has no cron or scheduler activation');
  assert(!/\b(insert|update|upsert|delete)\s*\(/.test(serviceSource), 'service has no mutating DB calls');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(verifierSource), 'verifier has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\./i.test(verifierSource), 'verifier has no cron or scheduler activation');
}

compile(servicePath, compiledServicePath);

const { planSmsSendIntent } = require(compiledServicePath);

const validInput = {
  roofer_id: 'roofer-1',
  lead_id: 'lead-1',
  follow_up_id: 'followup-1',
  approved_follow_up_id: 'followup-1',
  to: '+15551234567',
  from: '+15557654321',
  body: 'Future Twilio send intent verification.',
  run_id: 'run-1'
};

function expectFailClosed(overrides, reason, label) {
  const result = planSmsSendIntent({
    ...validInput,
    ...overrides
  });

  assert(result.shouldSend === false, `${label} does not allow send`);
  assert(result.reason === reason, `${label} reports ${reason}`);
  assert(result.sendIntent === null, `${label} returns no send intent`);
  assert(result.noSmsSent === true, `${label} sends no SMS`);
  assert(result.noTwilioCallsMade === true, `${label} makes no Twilio calls`);
}

runStaticSafetyChecks();

expectFailClosed({ roofer_id: undefined }, 'missing_required_field', 'missing roofer_id');
expectFailClosed({ lead_id: undefined }, 'missing_required_field', 'missing lead_id');
expectFailClosed({ follow_up_id: undefined }, 'missing_required_field', 'missing follow_up_id');
expectFailClosed({ approved_follow_up_id: 'followup-2' }, 'approved_follow_up_mismatch', 'approved follow-up mismatch');
expectFailClosed({ to: '5551234567' }, 'invalid_e164', 'invalid to number');
expectFailClosed({ from: '5557654321' }, 'invalid_e164', 'invalid from number');
expectFailClosed({ body: undefined }, 'missing_required_field', 'missing body');
expectFailClosed({ run_id: undefined }, 'missing_required_field', 'missing run_id');

const validResult = planSmsSendIntent(validInput);

assert(validResult.shouldSend === true, 'valid input allows send intent');
assert(validResult.reason === 'eligible', 'valid input reports eligible');
assert(validResult.sendIntent !== null, 'valid input returns a send intent');
assert(validResult.sendIntent.provider === 'twilio', 'valid input intent targets twilio');
assert(validResult.sendIntent.channel === 'sms', 'valid input intent targets sms');
assert(validResult.sendIntent.intent_type === 'future_twilio_send', 'valid input intent uses future send type');
assert(validResult.sendIntent.follow_up_id === validInput.follow_up_id, 'valid input intent includes follow_up_id');
assert(validResult.sendIntent.approved_follow_up_id === validInput.approved_follow_up_id, 'valid input intent includes approved_follow_up_id');
assert(validResult.sendIntent.run_id === validInput.run_id, 'valid input intent includes run_id');
assert(validResult.noSmsSent === true, 'valid input sends no SMS');
assert(validResult.noTwilioCallsMade === true, 'valid input makes no Twilio calls');

console.log('PASS: SMS send intent planner fake-only verification passed.');
console.log('No SMS sent.');
console.log('No Twilio calls made.');
