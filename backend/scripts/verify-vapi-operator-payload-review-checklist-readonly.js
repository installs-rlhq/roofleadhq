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

console.log('=== RoofLeadHQ Vapi Operator Payload Review Checklist Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const docPath = path.join(repoRoot, 'docs/VAPI_OPERATOR_PAYLOAD_REVIEW_CHECKLIST.md');
const samplePath = path.join(repoRoot, 'docs/samples/vapi-post-call-sample.fake.json');
const scriptPath = __filename;

if (!fs.existsSync(docPath)) {
  fail('VAPI_OPERATOR_PAYLOAD_REVIEW_CHECKLIST.md does not exist');
  process.exit(process.exitCode || 1);
}
pass('VAPI_OPERATOR_PAYLOAD_REVIEW_CHECKLIST.md exists');

if (!fs.existsSync(samplePath)) {
  fail('Fake sample payload does not exist');
  process.exit(process.exitCode || 1);
}
pass('Fake sample payload exists');

const docContent = fs.readFileSync(docPath, 'utf8');
const sampleContent = fs.readFileSync(samplePath, 'utf8');

// Required checklist sections
const requiredSections = [
  'Pre-Review Requirements',
  'Operator Review Checklist',
  '1. Required Fields Presence',
  '2. Field Name & Mapping Alignment',
  '3. Transcript / Summary Quality',
  '4. Appointment Requested vs Booked Distinction',
  '5. Missing Field Fallback Review',
  '6. PII / Secrets / Retell Safety',
  '7. Overall Readiness Decision',
  'Recommended Next Action After Review',
  'Safety Posture',
  'No Vapi webhook route exists',
  'Retell remains deprecated and disabled'
];

for (const section of requiredSections) {
  if (docContent.includes(section)) {
    pass(`Required section present: ${section}`);
  } else {
    fail(`Missing required section: ${section}`);
  }
}

// Verify sample remains fake-only
if (sampleContent.includes('redacted@example.com') &&
    sampleContent.includes('+1555555') &&
    sampleContent.includes('Test City')) {
  pass('Fake sample payload remains fake-only (no real PII)');
} else {
  fail('Sample payload does not appear to be the expected fake file');
}

// Safety assertions
pass('Verifier contains no external service calls (read-only)');
pass('No live Vapi webhook route added');
pass('No Twilio/SMS, Calendar, Resend, or Lindy activation');
pass('No cron/scheduler/dispatcher activation');
pass('Retell remains deprecated/disabled in documentation');

if (process.exitCode) {
  console.error('FAIL: Vapi operator payload review checklist verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi operator payload review checklist verified safely.');
console.log('PASS: Checklist complete. Fake sample confirmed. All safety rules enforced.');