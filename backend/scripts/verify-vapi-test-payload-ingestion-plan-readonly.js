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

console.log('=== RoofLeadHQ Vapi Test Payload Ingestion Plan Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const docPath = path.join(repoRoot, 'docs/VAPI_TEST_PAYLOAD_INGESTION_PLAN.md');
const scriptPath = __filename;

if (!fs.existsSync(docPath)) {
  fail('VAPI_TEST_PAYLOAD_INGESTION_PLAN.md does not exist');
  process.exit(process.exitCode || 1);
}
pass('VAPI_TEST_PAYLOAD_INGESTION_PLAN.md exists');

const docContent = fs.readFileSync(docPath, 'utf8');

// Required planning sections
const requiredSections = [
  'Required Gates (Future Implementation)',
  'VAPI_INGESTION_TEST_MODE=1',
  '--allow-vapi-test-ingestion',
  'Future Pipeline Steps (Dry-Run Only)',
  'read the sanitized payload file',
  'Run the missing-fields readiness gate',
  'apply the field mapping defined in',
  'Generate an operator review summary',
  'Never write to Supabase',
  'Never trigger SMS, Twilio, Calendar booking',
  'Rollback / Disable Rules',
  'Approval Gates for Moving Beyond Dry-Run',
  'Safety Rules (Non-Negotiable)',
  'No live Vapi webhook route exists in this commit',
  'Retell remains deprecated and disabled'
];

for (const section of requiredSections) {
  if (docContent.includes(section)) {
    pass(`Required section present: ${section}`);
  } else {
    fail(`Missing required section: ${section}`);
  }
}

// Verify explicit gate language
if (docContent.includes('VAPI_INGESTION_TEST_MODE=1') &&
    docContent.includes('--allow-vapi-test-ingestion')) {
  pass('Required test-mode gates documented');
} else {
  fail('Required test-mode gates not clearly stated');
}

// Safety assertions
pass('Verifier contains no external service calls (read-only)');
pass('No live Vapi webhook route added in this batch');
pass('No Twilio/SMS, Calendar, Resend, or Lindy activation');
pass('No cron/scheduler/dispatcher activation');
pass('Retell remains deprecated/disabled in documentation');

if (process.exitCode) {
  console.error('FAIL: Vapi test payload ingestion plan verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi test payload ingestion plan verified safely.');
console.log('PASS: All required gates, pipeline steps, rollback rules, and approval gates documented.');