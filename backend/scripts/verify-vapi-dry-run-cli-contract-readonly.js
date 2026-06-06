#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const dryRunScript = path.join(repoRoot, 'backend', 'scripts', 'vapi-test-payload-ingestion-dry-run.js');

const scenarios = [
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm',
];

function fail(message, details = null) {
  console.error(`❌ ${message}`);
  if (details) console.error(details);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function runDryRun(args, env = {}) {
  return spawnSync(process.execPath, [dryRunScript, ...args], {
    cwd: repoRoot,
    env: {
      ...process.env,
      ...env,
    },
    encoding: 'utf8',
    maxBuffer: 1024 * 1024,
  });
}

function parseJson(stdout, label) {
  const firstBrace = stdout.indexOf('{');
  const lastBrace = stdout.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    fail(`Could not locate normalized JSON for ${label}`, stdout);
  }

  try {
    return JSON.parse(stdout.slice(firstBrace, lastBrace + 1));
  } catch (error) {
    fail(`Could not parse normalized JSON for ${label}: ${error.message}`, stdout);
  }
}

console.log('=== RoofLeadHQ Vapi Dry-Run CLI Contract Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');

if (!fs.existsSync(dryRunScript)) {
  fail('Missing vapi-test-payload-ingestion-dry-run.js');
}

const scriptText = fs.readFileSync(dryRunScript, 'utf8');

[
  'scenarioEqualsArg',
  "args.indexOf('--scenario')",
  '--allow-vapi-test-ingestion',
  'VAPI_INGESTION_TEST_MODE',
  'scenarioMap',
  'insurance-storm',
  'emergency-leak',
].forEach((needle) => {
  if (!scriptText.includes(needle)) {
    fail(`Dry-run script missing CLI contract marker: ${needle}`);
  }
});

for (const scenario of scenarios) {
  const equalsResult = runDryRun(
    [`--scenario=${scenario}`, '--allow-vapi-test-ingestion'],
    { VAPI_INGESTION_TEST_MODE: '1' }
  );

  if (equalsResult.status !== 0) {
    fail(`--scenario=${scenario} should pass with gates`, `${equalsResult.stdout}\n${equalsResult.stderr}`);
  }

  const equalsJson = parseJson(equalsResult.stdout, `--scenario=${scenario}`);
  if (!String(equalsJson.call_id || '').includes('fake')) {
    fail(`--scenario=${scenario} must return fake call_id`);
  }

  const spaceResult = runDryRun(
    ['--scenario', scenario, '--allow-vapi-test-ingestion'],
    { VAPI_INGESTION_TEST_MODE: '1' }
  );

  if (spaceResult.status !== 0) {
    fail(`--scenario ${scenario} should pass with gates`, `${spaceResult.stdout}\n${spaceResult.stderr}`);
  }

  const spaceJson = parseJson(spaceResult.stdout, `--scenario ${scenario}`);

  if (spaceJson.call_id !== equalsJson.call_id) {
    fail(`Scenario parser mismatch for ${scenario}: equals and space forms loaded different call ids`);
  }

  if (spaceJson.source !== 'vapi' || spaceJson.test_only !== true) {
    fail(`Scenario ${scenario} output must remain vapi/test_only`);
  }

  pass(`${scenario} accepts both --scenario=value and --scenario value`);
}

const invalidResult = runDryRun(
  ['--scenario=not-real', '--allow-vapi-test-ingestion'],
  { VAPI_INGESTION_TEST_MODE: '1' }
);

if (invalidResult.status === 0) {
  fail('Invalid scenario must fail closed');
}

pass('Invalid scenario fails closed');

const missingGateResult = runDryRun(['--scenario=booked-inspection']);
if (missingGateResult.status === 0) {
  fail('Scenario dry-run must fail closed without env + CLI gates');
}

pass('Scenario dry-run fails closed without required gates');
console.log('✅ Vapi dry-run CLI contract verifier passed');
