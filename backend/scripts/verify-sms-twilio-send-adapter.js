#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const servicePath = 'backend/src/services/sms-twilio-send-adapter.service.ts';
const plannerPath = 'backend/src/services/sms-send-intent-planner.service.ts';
const compiledServicePath = '/tmp/sms-twilio-send-adapter.verify.js';
const compiledPlannerPath = '/tmp/sms-send-intent-planner.twilio-adapter-verify.js';

console.log('=== RoofLeadHQ SMS Twilio Send Adapter Verification ===');
console.log('Fake verification only.');
console.log('No live Twilio client is constructed.');
console.log('No live SMS is sent.');
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

function walkFiles(rootDir) {
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath));
    } else {
      files.push(absolutePath);
    }
  }

  return files;
}

function runStaticSafetyChecks() {
  const serviceSource = fs.readFileSync(path.join(repoRoot, servicePath), 'utf8');
  const verifierSource = fs.readFileSync(__filename, 'utf8');

  assert(!/^\s*import .*twilio/im.test(serviceSource), 'adapter has no top-level Twilio import');
  assert(!/^\s*const .*=\s*require\(['"]twilio['"]\)/im.test(serviceSource), 'adapter has no top-level Twilio require');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(serviceSource), 'adapter has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i.test(serviceSource), 'adapter has no cron or scheduler activation');
  assert(!/\bapp\.(get|post|put|patch|delete)\s*\(/.test(verifierSource), 'verifier has no route registration');
  assert(!/scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i.test(verifierSource), 'verifier has no cron or scheduler activation');

  const scannedFiles = [
    ...walkFiles(path.join(repoRoot, 'backend/src')),
    ...walkFiles(path.join(repoRoot, 'backend/scripts'))
  ].filter((absolutePath) => {
    const relativePath = path.relative(repoRoot, absolutePath);
    return (
      /\.(ts|js)$/.test(relativePath) &&
      relativePath !== servicePath &&
      relativePath !== 'backend/scripts/verify-sms-twilio-send-adapter.js'
    );
  });

  for (const absolutePath of scannedFiles) {
    const relativePath = path.relative(repoRoot, absolutePath);
    const source = fs.readFileSync(absolutePath, 'utf8');

    assert(
      !source.includes('sms-twilio-send-adapter.service'),
      `${relativePath} does not import Twilio send adapter`
    );
    assert(
      !source.includes('sendSmsWithTwilioAdapter'),
      `${relativePath} does not invoke Twilio send adapter`
    );
  }

  const productionRunnerSource = fs.readFileSync(
    path.join(repoRoot, 'backend/src/services/sms-dispatcher-production-runner.service.ts'),
    'utf8'
  );
  assert(
    !productionRunnerSource.includes('sms-twilio-send-adapter.service'),
    'production runner does not import Twilio send adapter'
  );
  assert(
    !productionRunnerSource.includes('sendSmsWithTwilioAdapter'),
    'production runner does not invoke Twilio send adapter'
  );
}

compile(servicePath, compiledServicePath);
compile(plannerPath, compiledPlannerPath);

const {
  SMS_TWILIO_SEND_ADAPTER_TARGET,
  buildSmsTwilioSendAdapterGateFromEnv,
  sendSmsWithTwilioAdapter
} = require(compiledServicePath);
const {
  planSmsSendIntent
} = require(compiledPlannerPath);

const validInput = {
  roofer_id: 'roofer-1',
  lead_id: 'lead-1',
  to: '+15551234567',
  from: '+15557654321',
  body: 'RoofLeadHQ fake Twilio adapter verification.'
};

const validGate = {
  allowTwilioSendAdapter: true,
  sendTarget: SMS_TWILIO_SEND_ADAPTER_TARGET,
  confirmSend: true
};

(async () => {
  runStaticSafetyChecks();

  const envGate = buildSmsTwilioSendAdapterGateFromEnv({
    SMS_TWILIO_SEND_ADAPTER: 'true',
    SMS_TWILIO_SEND_TARGET: SMS_TWILIO_SEND_ADAPTER_TARGET,
    SMS_TWILIO_CONFIRM_SEND: 'true'
  });
  assert(envGate.allowTwilioSendAdapter === true, 'env gate reads adapter enable flag');
  assert(envGate.sendTarget === SMS_TWILIO_SEND_ADAPTER_TARGET, 'env gate reads target');
  assert(envGate.confirmSend === true, 'env gate reads confirm send flag');

  const defaultResult = await sendSmsWithTwilioAdapter(validInput);
  assert(defaultResult.failedClosed === true, 'default mode fails closed');
  assert(defaultResult.reason === 'missing_send_gate', 'default mode requires send gate');
  assert(defaultResult.provider_message_id === null, 'default mode returns no provider message id');
  assert(defaultResult.status === 'blocked', 'default mode returns blocked status');
  assert(defaultResult.noSmsSent === true, 'default mode sends no SMS');
  assert(defaultResult.noLiveTwilioClientConstructed === true, 'default mode constructs no live Twilio client');

  const missingFieldResult = await sendSmsWithTwilioAdapter({
    ...validInput,
    body: '',
    gate: validGate,
    fakeMode: true
  });
  assert(missingFieldResult.failedClosed === true, 'missing required field fails closed');
  assert(missingFieldResult.reason === 'missing_required_field', 'missing required field reports reason');
  assert(missingFieldResult.noSmsSent === true, 'missing required field sends no SMS');
  assert(missingFieldResult.noLiveTwilioClientConstructed === true, 'missing required field constructs no live Twilio client');

  const fakeResult = await sendSmsWithTwilioAdapter({
    ...validInput,
    gate: validGate,
    fakeMode: true,
    fakeProviderMessageId: 'SM_fake_verified_adapter'
  });
  assert(fakeResult.failedClosed === false, 'fake mode succeeds with gates');
  assert(fakeResult.provider_message_id === 'SM_fake_verified_adapter', 'fake mode returns provider message id');
  assert(fakeResult.status === 'sent', 'fake mode returns future sent status');
  assert(fakeResult.error === null, 'fake mode returns no error');
  assert(fakeResult.noSmsSent === true, 'fake mode sends no live SMS');
  assert(fakeResult.noLiveTwilioClientConstructed === true, 'fake mode constructs no live Twilio client');
  assert(fakeResult.roofer_id === validInput.roofer_id, 'fake mode returns roofer_id contract field');
  assert(fakeResult.lead_id === validInput.lead_id, 'fake mode returns lead_id contract field');
  assert(fakeResult.to === validInput.to, 'fake mode returns to contract field');
  assert(fakeResult.from === validInput.from, 'fake mode returns from contract field');
  assert(fakeResult.body === validInput.body, 'fake mode returns body contract field');

  const sendIntentPlan = planSmsSendIntent({
    roofer_id: 'roofer-send-intent-1',
    lead_id: 'lead-send-intent-1',
    follow_up_id: 'followup-send-intent-1',
    approved_follow_up_id: 'followup-send-intent-1',
    run_id: 'twilio-adapter-send-intent-contract-verify',
    to: '+15551234567',
    from: '+15557654321',
    body: 'RoofLeadHQ fake send-intent adapter contract verification.'
  });
  assert(sendIntentPlan.shouldSend === true, 'send-intent planner creates approved fake Twilio send intent');
  assert(sendIntentPlan.sendIntent.provider === 'twilio', 'send-intent planner targets Twilio provider');

  const sendIntentAdapterResult = await sendSmsWithTwilioAdapter({
    roofer_id: sendIntentPlan.sendIntent.roofer_id,
    lead_id: sendIntentPlan.sendIntent.lead_id,
    to: sendIntentPlan.sendIntent.to,
    from: sendIntentPlan.sendIntent.from,
    body: sendIntentPlan.sendIntent.body,
    gate: validGate,
    fakeMode: true,
    fakeProviderMessageId: 'SM_fake_send_intent_contract'
  });
  assert(sendIntentAdapterResult.failedClosed === false, 'approved fake send intent maps to adapter fake success');
  assert(sendIntentAdapterResult.provider_message_id === 'SM_fake_send_intent_contract', 'approved fake send intent returns fake provider message id');
  assert(sendIntentAdapterResult.status === 'sent', 'approved fake send intent returns future sent status');
  assert(sendIntentAdapterResult.noSmsSent === true, 'approved fake send intent sends no live SMS');
  assert(sendIntentAdapterResult.noLiveTwilioClientConstructed === true, 'approved fake send intent constructs no live Twilio client');
  assert(sendIntentAdapterResult.roofer_id === sendIntentPlan.sendIntent.roofer_id, 'approved fake send intent preserves roofer_id');
  assert(sendIntentAdapterResult.lead_id === sendIntentPlan.sendIntent.lead_id, 'approved fake send intent preserves lead_id');
  assert(sendIntentAdapterResult.to === sendIntentPlan.sendIntent.to, 'approved fake send intent preserves to number');
  assert(sendIntentAdapterResult.from === sendIntentPlan.sendIntent.from, 'approved fake send intent preserves from number');
  assert(sendIntentAdapterResult.body === sendIntentPlan.sendIntent.body, 'approved fake send intent preserves body');

  const noCredentialsResult = await sendSmsWithTwilioAdapter({
    ...validInput,
    gate: validGate,
    fakeMode: false
  });
  assert(noCredentialsResult.failedClosed === true, 'non-fake mode without credentials fails closed');
  assert(noCredentialsResult.reason === 'missing_twilio_credentials', 'non-fake mode without credentials reports reason');
  assert(noCredentialsResult.noSmsSent === true, 'non-fake mode without credentials sends no SMS');
  assert(noCredentialsResult.noLiveTwilioClientConstructed === true, 'non-fake mode without credentials constructs no live Twilio client');

  console.log('PASS: SMS Twilio send adapter fake-only verification passed.');
  console.log('No live SMS sent.');
  console.log('No live Twilio client constructed.');
})();
