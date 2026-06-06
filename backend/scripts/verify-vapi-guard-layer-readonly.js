#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const files = {
  aggregate: 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  aggregateCoverage: 'backend/scripts/verify-vapi-aggregate-coverage-readonly.js',
  scenarioRegistry: 'backend/scripts/verify-vapi-scenario-registry-readonly.js',
  snapshot: 'backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js',
  cliContract: 'backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js',
  nextChatVerifier: 'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
  verifierIndex: 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  nextChatContext: 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  businessGuide: 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
};

const requiredGuardScripts = [
  'verify-vapi-aggregate-coverage-readonly.js',
  'verify-vapi-scenario-registry-readonly.js',
  'verify-vapi-dry-run-output-snapshots-readonly.js',
  'verify-vapi-dry-run-cli-contract-readonly.js',
];

const requiredSafetyMarkers = [
  'No Vapi calls',
  'No Supabase writes',
  'No SMS/Twilio',
  'No Calendar/Resend/Lindy',
  'No route/cron/scheduler/dispatcher activation',
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function read(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    fail(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, 'utf8');
}

console.log('=== RoofLeadHQ Vapi Guard Layer Verification ===');
console.log('Local read-only verifier execution only.');
console.log('Checks Vapi guard-layer verifiers remain wired, documented, and safety-scoped.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');

const contents = Object.fromEntries(
  Object.entries(files).map(([key, relativePath]) => [key, read(relativePath)])
);

for (const scriptName of requiredGuardScripts) {
  const scriptPath = path.join(repoRoot, 'backend', 'scripts', scriptName);

  if (!fs.existsSync(scriptPath)) {
    fail(`Missing guard-layer script: ${scriptName}`);
  }

  if (!contents.aggregate.includes(`script: 'backend/scripts/${scriptName}'`)) {
    fail(`Aggregate readiness does not include guard-layer script: ${scriptName}`);
  }

  if (!contents.aggregateCoverage.includes(scriptName)) {
    fail(`Aggregate coverage verifier does not include guard-layer script: ${scriptName}`);
  }

  if (!contents.nextChatVerifier.includes(scriptName)) {
    fail(`Next-chat verifier does not require guard-layer script: ${scriptName}`);
  }

  if (!contents.verifierIndex.includes(scriptName)) {
    fail(`Verifier index does not document guard-layer script: ${scriptName}`);
  }

  if (!contents.nextChatContext.includes(scriptName)) {
    fail(`Next-chat context does not document guard-layer script: ${scriptName}`);
  }

  pass(`${scriptName} remains wired and documented across guard layer`);
}

for (const marker of [
  'Current Vapi Verifier Coverage Registry',
  'Current Safe Batch — Vapi Aggregate Verifier Coverage',
  'Current Safe Batch — Vapi Scenario Registry Consistency Verifier',
  'Current Safe Batch — Vapi Dry-Run Output Snapshot Verifier',
  'Current Safe Batch — Vapi Dry-Run CLI Contract Verifier',
]) {
  if (!contents.nextChatContext.includes(marker)) {
    fail(`Next-chat context missing guard-layer marker: ${marker}`);
  }

  if (!contents.nextChatVerifier.includes(marker)) {
    fail(`Next-chat verifier missing guard-layer marker: ${marker}`);
  }
}

pass('Next-chat context and verifier preserve guard-layer markers');

for (const marker of requiredSafetyMarkers) {
  for (const [label, content] of Object.entries({
    aggregateCoverage: contents.aggregateCoverage,
    scenarioRegistry: contents.scenarioRegistry,
    snapshot: contents.snapshot,
    cliContract: contents.cliContract,
  })) {
    if (!content.includes(marker)) {
      fail(`${label} missing safety marker: ${marker}`);
    }
  }
}

pass('Guard-layer scripts preserve read-only safety markers');

for (const scriptName of [
  'verify-vapi-phone-lead-smoke-readonly.js',
  'verify-vapi-test-payload-ingestion-plan-readonly.js',
  'verify-vapi-test-payload-ingestion-dry-run-readonly.js',
  'verify-vapi-normalized-contract-doc-readonly.js',
  'verify-vapi-scenario-samples-readonly.js',
]) {
  if (!contents.aggregateCoverage.includes(scriptName)) {
    fail(`Aggregate coverage verifier missing protected downstream verifier: ${scriptName}`);
  }
}

pass('Aggregate coverage verifier still protects downstream Vapi verifiers');
console.log('✅ Vapi guard layer verifier passed');
