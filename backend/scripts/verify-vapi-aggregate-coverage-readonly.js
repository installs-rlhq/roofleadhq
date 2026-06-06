#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const aggregatePath = path.join(repoRoot, 'backend', 'scripts', 'verify-first-paid-pilot-readiness-readonly.js');
const scriptsDir = path.join(repoRoot, 'backend', 'scripts');
const indexPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_VERIFIER_INDEX.md');
const contextPath = path.join(repoRoot, 'docs', 'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const guidePath = path.join(repoRoot, 'docs', 'ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md');

const expectedVapiVerifiers = [
  'verify-vapi-phone-lead-smoke-readonly.js',
  'verify-vapi-post-call-payload-discovery-readonly.js',
  'verify-vapi-raw-payload-capture-plan-readonly.js',
  'verify-vapi-sample-payload-mapping-readonly.js',
  'verify-vapi-missing-fields-readiness-gate-readonly.js',
  'verify-vapi-real-payload-collection-runbook-readonly.js',
  'verify-vapi-operator-payload-review-checklist-readonly.js',
  'verify-vapi-test-payload-ingestion-plan-readonly.js',
  'verify-vapi-test-payload-ingestion-dry-run-readonly.js',
  'verify-vapi-normalized-contract-doc-readonly.js',
  'verify-vapi-scenario-samples-readonly.js',
  'verify-vapi-dry-run-output-snapshots-readonly.js',
  'verify-vapi-dry-run-cli-contract-readonly.js',
  'verify-vapi-scenario-registry-readonly.js',
  'verify-vapi-aggregate-coverage-readonly.js',
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function readFile(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`Missing required ${label}: ${filePath}`);
  }
  return fs.readFileSync(filePath, 'utf8');
}

console.log('=== RoofLeadHQ Vapi Aggregate Coverage Verification ===');
console.log('Local read-only verifier execution only.');
console.log('Checks every Vapi verifier is wired into aggregate readiness and documented.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');

const aggregate = readFile(aggregatePath, 'aggregate readiness verifier');
const index = readFile(indexPath, 'verifier index');
const context = readFile(contextPath, 'next-chat context');
const guide = readFile(guidePath, 'business guide');

for (const verifier of expectedVapiVerifiers) {
  const fullPath = path.join(scriptsDir, verifier);

  if (!fs.existsSync(fullPath)) {
    fail(`Expected Vapi verifier script missing: ${verifier}`);
  }

  if (!aggregate.includes(`script: 'backend/scripts/${verifier}'`)) {
    fail(`Aggregate readiness verifier is missing Vapi script wiring: ${verifier}`);
  }

  if (!index.includes(verifier)) {
    fail(`Verifier index is missing Vapi verifier: ${verifier}`);
  }

  if (!context.includes(verifier)) {
    fail(`Next-chat context is missing Vapi verifier: ${verifier}`);
  }

  pass(`${verifier} exists, is aggregated, and is documented in index/context`);
}

const actualVapiVerifierFiles = fs.readdirSync(scriptsDir)
  .filter((file) => file.startsWith('verify-vapi-') && file.endsWith('-readonly.js'))
  .sort();

const expectedSorted = [...expectedVapiVerifiers].sort();

const missingFromExpected = actualVapiVerifierFiles.filter((file) => !expectedSorted.includes(file));
const missingFromActual = expectedSorted.filter((file) => !actualVapiVerifierFiles.includes(file));

if (missingFromExpected.length || missingFromActual.length) {
  fail(
    `Vapi verifier registry mismatch. Unexpected: ${missingFromExpected.join(', ') || 'none'}; Missing: ${missingFromActual.join(', ') || 'none'}`
  );
}

pass('Expected Vapi verifier registry exactly matches backend/scripts verify-vapi-*-readonly.js files');

[
  'Vapi scenario registry consistency',
  'Vapi dry-run CLI contract',
  'Vapi dry-run output snapshots',
  'Vapi scenario sample files',
  'Vapi normalized contract documentation',
  'Vapi test payload ingestion dry-run',
].forEach((aggregateName) => {
  if (!aggregate.includes(`name: '${aggregateName}'`)) {
    fail(`Aggregate readiness verifier missing command name: ${aggregateName}`);
  }
});

pass('Aggregate readiness includes expected Vapi command names');

[
  'Retell remains deprecated/disabled',
  'no live Vapi calls',
  'no Supabase writes',
  'no SMS/Twilio sends',
  'no Calendar/Resend/Lindy activation',
  'no routes',
  'no cron/scheduler/dispatcher activation',
].forEach((needle) => {
  if (!context.includes(needle)) {
    fail(`Next-chat context missing safety marker: ${needle}`);
  }

  if (!guide.includes(needle) && !index.includes(needle)) {
    fail(`Docs missing safety marker outside next-chat context: ${needle}`);
  }
});

pass('Vapi aggregate coverage docs preserve required safety markers');

console.log('✅ Vapi aggregate coverage verifier passed');
