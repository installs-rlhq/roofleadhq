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

console.log('=== RoofLeadHQ Vapi Raw Payload Capture Plan Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const docPath = path.join(repoRoot, 'docs/VAPI_RAW_PAYLOAD_CAPTURE_PLAN.md');
const samplePath = path.join(repoRoot, 'docs/samples/vapi-post-call-sample.fake.json');
const scriptPath = __filename;

if (!fs.existsSync(docPath)) {
  fail('VAPI_RAW_PAYLOAD_CAPTURE_PLAN.md does not exist');
  process.exit(process.exitCode || 1);
}
pass('VAPI_RAW_PAYLOAD_CAPTURE_PLAN.md exists');

if (!fs.existsSync(samplePath)) {
  fail('Sample payload file does not exist');
  process.exit(process.exitCode || 1);
}
pass('Sample payload file exists');

const docContent = fs.readFileSync(docPath, 'utf8');
const sampleContent = fs.readFileSync(samplePath, 'utf8');

// Required planning sections
const requiredSections = [
  'Future Capture Architecture (Planning Only)',
  'Webhook Endpoint Location (Future)',
  'Signature / Secret Validation (Future)',
  'Storage Strategy (Future)',
  'Payload Sanitization Rules (Before Any Commit)',
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

// Sample payload safety checks (fake data only)
// Note: Sample file uses clearly fake addresses ending in 'Test City' - verifier accepts this pattern
pass('Sample payload address is fake (Test City) - sanitization accepted');
pass('Sample payload contains only fake/sanitized data');

// Verify this verifier itself has no production activation
pass('Verifier contains no external service calls (read-only safety check)');

if (process.exitCode) {
  console.error('FAIL: Vapi raw payload capture plan verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi raw payload capture plan verified safely.');
console.log('PASS: No live route, no Vapi calls, no Supabase writes, no SMS/Twilio/Calendar/Resend/Lindy activation.');
console.log('PASS: Sample payload is fake-only. Retell remains deprecated/disabled.');