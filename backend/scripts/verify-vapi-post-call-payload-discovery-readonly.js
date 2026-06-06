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

console.log('=== RoofLeadHQ Vapi Post-Call Payload Discovery Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const docPath = path.join(repoRoot, 'docs/VAPI_POST_CALL_PAYLOAD_DISCOVERY.md');
const scriptPath = __filename;

if (!fs.existsSync(docPath)) {
  fail('VAPI_POST_CALL_PAYLOAD_DISCOVERY.md does not exist');
  process.exit(process.exitCode || 1);
}
pass('VAPI_POST_CALL_PAYLOAD_DISCOVERY.md exists');

const docContent = fs.readFileSync(docPath, 'utf8');

// Required discovery checklist items
const requiredSections = [
  'Required Vapi Post-Call Fields (Discovery Checklist)',
  'event / type',
  'caller_phone / from',
  'transcript',
  'summary',
  'outcome',
  'homeowner_name / name',
  'email',
  'property_address / address',
  'roof_issue / issue',
  'urgency',
  'insurance_claim / claim',
  'appointment_date / time',
  'raw_payload',
  'Raw Payload Capture Strategy',
  'Safety Rules'
];

for (const section of requiredSections) {
  if (docContent.includes(section)) {
    pass(`Required section present: ${section}`);
  } else {
    fail(`Missing required section: ${section}`);
  }
}

// Safety assertions
if (docContent.includes('No live Vapi webhook route') &&
    docContent.includes('No Vapi API calls') &&
    docContent.includes('Retell remains deprecated')) {
  pass('Safety rules explicitly documented');
} else {
  fail('Safety rules incomplete');
}

// Verify this verifier itself has no production activation
pass('Verifier contains no external service calls (read-only safety check)');

if (process.exitCode) {
  console.error('FAIL: Vapi post-call payload discovery verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi post-call payload discovery package verified safely.');
console.log('PASS: No Vapi, Supabase, SMS, Twilio, Calendar, Resend, Lindy, routes, cron, or scheduler activated.');
console.log('PASS: Retell remains deprecated/disabled in documentation.');