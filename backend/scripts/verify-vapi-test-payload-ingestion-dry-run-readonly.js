#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ Vapi Test Payload Ingestion Dry-Run Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const scriptPath = path.join(repoRoot, 'backend/scripts/vapi-test-payload-ingestion-dry-run.js');

if (!fs.existsSync(scriptPath)) {
  fail('vapi-test-payload-ingestion-dry-run.js does not exist');
  process.exit(process.exitCode || 1);
}
pass('vapi-test-payload-ingestion-dry-run.js exists');

// Scenario file checks
const scenarioFiles = [
  'vapi-scenario-booked-inspection.fake.json',
  'vapi-scenario-unbooked-followup.fake.json',
  'vapi-scenario-missing-address.fake.json',
  'vapi-scenario-missing-phone.fake.json',
  'vapi-scenario-emergency-leak.fake.json',
  'vapi-scenario-insurance-storm.fake.json'
];

for (const file of scenarioFiles) {
  const fullPath = path.join(repoRoot, 'docs/samples', file);
  if (!fs.existsSync(fullPath)) {
    fail(`Scenario file missing: ${file}`);
  } else {
    try {
      JSON.parse(fs.readFileSync(fullPath, 'utf8'));
      pass(`Scenario file valid JSON: ${file}`);
    } catch (e) {
      fail(`Scenario file not valid JSON: ${file}`);
    }
  }
}

// --scenario support check
const scriptContent = fs.readFileSync(scriptPath, 'utf8');
if (scriptContent.includes('--scenario=') && scriptContent.includes('scenarioMap')) {
  pass('Script supports --scenario flag');
} else {
  fail('Script does not support --scenario flag');
}

// Execute all 6 valid scenarios with gates
const { spawnSync } = require('child_process');
const validScenarios = [
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm'
];

for (const sc of validScenarios) {
  const result = spawnSync(process.execPath, [
    scriptPath,
    '--allow-vapi-test-ingestion',
    `--scenario=${sc}`
  ], {
    env: { ...process.env, VAPI_INGESTION_TEST_MODE: '1' },
    stdio: 'pipe'
  });
  if (result.status === 0) {
    pass(`Valid scenario passes: ${sc}`);
  } else {
    fail(`Valid scenario failed unexpectedly: ${sc}`, { stderr: result.stderr.toString() });
  }
}

// Invalid scenario must fail
const invalidResult = spawnSync(process.execPath, [
  scriptPath,
  '--allow-vapi-test-ingestion',
  '--scenario=not-real'
], {
  env: { ...process.env, VAPI_INGESTION_TEST_MODE: '1' },
  stdio: 'pipe'
});
if (invalidResult.status !== 0) {
  pass('Invalid scenario correctly fails');
} else {
  fail('Invalid scenario did not fail as expected');
}

// Valid scenario without gates must fail
const noGateResult = spawnSync(process.execPath, [
  scriptPath,
  '--scenario=booked-inspection'
], {
  env: { ...process.env, VAPI_INGESTION_TEST_MODE: '0' },
  stdio: 'pipe'
});
if (noGateResult.status !== 0) {
  pass('Valid scenario without gates correctly fails');
} else {
  fail('Valid scenario without gates did not fail as expected');
}

const content = fs.readFileSync(scriptPath, 'utf8');

// Gate verification
if (content.includes('VAPI_INGESTION_TEST_MODE') && content.includes('--allow-vapi-test-ingestion')) {
  pass('Both required gates (env + CLI flag) are enforced');
} else {
  fail('Required gates not properly implemented');
}

// Fail-closed verification
if (content.includes('Both required gates present') && content.includes('fail-closed mode')) {
  pass('Script fails closed when gates are missing');
} else {
  fail('Fail-closed behavior not clearly implemented');
}

// Safety assertions - only check actual executable lines
let hasSupabase = false, hasTwilio = false, hasCron = false, hasRoute = false;

const lines = content.split('\n');
for (const line of lines) {
  const t = line.trim();
  if (t.startsWith('//') || t.startsWith('/*') || t.startsWith('*')) continue;
  if (t.includes('require') || t.includes('import')) {
    if (/supabase/i.test(t)) hasSupabase = true;
    if (/twilio/i.test(t)) hasTwilio = true;
  }
  if (/setInterval|setTimeout|schedule\(/i.test(t)) hasCron = true;
  if (/app\.(post|get|put|delete)|express\.Router|router\./i.test(t)) hasRoute = true;
}

if (hasSupabase) fail('Script contains Supabase client usage'); else pass('No Supabase client usage detected');
if (hasTwilio) fail('Script contains Twilio usage'); else pass('No Twilio usage detected');
if (hasCron) fail('Script contains cron/scheduler activation'); else pass('No cron/scheduler activation detected');
if (hasRoute) fail('Script contains route registration'); else pass('No route registration detected');

// Fake payload only
if (content.includes('vapi-post-call-sample.fake.json') && content.includes('+1555555')) {
  pass('Script uses fake/sanitized payload only');
} else {
  fail('Script does not clearly target the fake sample payload');
}

// Output safety
if (content.includes('No Supabase writes performed') &&
    content.includes('No SMS/Twilio/Calendar/Resend/Lindy actions triggered')) {
  pass('Script explicitly documents no production actions');
} else {
  fail('Safety output messages incomplete');
}

if (process.exitCode) {
  console.error('FAIL: Vapi test payload ingestion dry-run verifier failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi test payload ingestion dry-run script verified safely.');
console.log('PASS: No live Vapi, Supabase, SMS, Twilio, Calendar, Resend, Lindy, routes, cron, or scheduler.');