#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const expectedScenarios = [
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm',
];

const expectedFiles = expectedScenarios.map((scenario) => `vapi-scenario-${scenario}.fake.json`);

const filesToCheck = [
  'backend/scripts/vapi-test-payload-ingestion-dry-run.js',
  'backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js',
  'backend/scripts/verify-vapi-scenario-samples-readonly.js',
  'backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js',
  'backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js',
  'docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function readRelative(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(absolutePath)) {
    fail(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, 'utf8');
}

console.log('=== RoofLeadHQ Vapi Scenario Registry Verification ===');
console.log('Local read-only verifier execution only.');
console.log('Checks scenario registry consistency across scripts, samples, and docs.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');

const samplesDir = path.join(repoRoot, 'docs', 'samples');
if (!fs.existsSync(samplesDir)) {
  fail('Missing docs/samples directory');
}

const actualScenarioFiles = fs.readdirSync(samplesDir)
  .filter((file) => file.startsWith('vapi-scenario-') && file.endsWith('.json'))
  .sort();

const expectedSorted = [...expectedFiles].sort();

if (JSON.stringify(actualScenarioFiles) !== JSON.stringify(expectedSorted)) {
  fail(`Vapi scenario sample file set mismatch. Expected ${expectedSorted.join(', ')} but found ${actualScenarioFiles.join(', ')}`);
}

pass('docs/samples contains exactly the expected six .fake.json scenario files');

for (const file of actualScenarioFiles) {
  if (!file.endsWith('.fake.json')) {
    fail(`Vapi scenario file must use .fake.json suffix: ${file}`);
  }

  const raw = readRelative(path.join('docs', 'samples', file));
  let parsed;

  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Scenario sample JSON does not parse: ${file}: ${error.message}`);
  }

  if (!parsed.call || !String(parsed.call.id || '').startsWith('call_fake')) {
    fail(`Scenario sample must use fake call id: ${file}`);
  }

  if (!raw.includes('example.com') && !raw.includes('+1555555') && !raw.toLowerCase().includes('fake')) {
    fail(`Scenario sample must visibly remain fake/sanitized: ${file}`);
  }
}

pass('All scenario sample files parse and remain visibly fake/sanitized');

for (const relativePath of filesToCheck) {
  const content = readRelative(relativePath);

  for (const scenario of expectedScenarios) {
    if (!content.includes(scenario)) {
      fail(`${relativePath} is missing scenario name: ${scenario}`);
    }
  }

  pass(`${relativePath} references all six scenario names`);
}

const dryRunScript = readRelative('backend/scripts/vapi-test-payload-ingestion-dry-run.js');

for (const [scenario, file] of expectedScenarios.map((scenario, index) => [scenario, expectedFiles[index]])) {
  if (!dryRunScript.includes(`'${scenario}': '${file}'`)) {
    fail(`Dry-run scenarioMap missing exact mapping ${scenario} -> ${file}`);
  }
}

pass('Dry-run scenarioMap contains exact expected scenario-to-file mappings');

const dryRunVerifier = readRelative('backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js');
const snapshotVerifier = readRelative('backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js');
const cliVerifier = readRelative('backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js');
const samplesVerifier = readRelative('backend/scripts/verify-vapi-scenario-samples-readonly.js');

[
  ['dry-run verifier', dryRunVerifier],
  ['snapshot verifier', snapshotVerifier],
  ['CLI contract verifier', cliVerifier],
  ['scenario samples verifier', samplesVerifier],
].forEach(([label, content]) => {
  for (const scenario of expectedScenarios) {
    if (!content.includes(scenario)) {
      fail(`${label} missing scenario ${scenario}`);
    }
  }
});

pass('All Vapi scenario verifiers include the complete scenario set');

[
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm',
  'Retell remains deprecated/disabled',
  'no live Vapi calls',
  'no Supabase writes',
  'no SMS/Twilio',
].forEach((needle) => {
  const context = readRelative('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
  if (!context.includes(needle)) {
    fail(`Next-chat context missing scenario registry/safety marker: ${needle}`);
  }
});

pass('Next-chat context preserves scenario registry and safety markers');

console.log('✅ Vapi scenario registry verifier passed');
