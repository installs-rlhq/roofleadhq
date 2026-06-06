#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const handoffNotePath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md');

const requiredStrings = [
  'Current verified source-of-truth commit:',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'website/dashboard/pilot-status.html',
  'docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md',
  'docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md',
  'docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md',
  'docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md',
  'docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Disabled Live Automation Reminder',
  'Approval Reminder Before Production Automation',
  'No Supabase/SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls'
];

const forbiddenStrings = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guarantee jobs',
  'guarantee revenue'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ First Paid Launch Operator Handoff Note Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(handoffNotePath)) {
  fail('FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md does not exist', { path: handoffNotePath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md exists');

const content = fs.readFileSync(handoffNotePath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Note includes required string: ${required}`);
  } else {
    fail(`Note is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Note contains forbidden string: ${forbidden}`);
  } else {
    pass(`Note does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch operator handoff note verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch operator handoff note verification passed.');