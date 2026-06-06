#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const recapPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_READY_RECAP.md');

const requiredStrings = [
  'Current source-of-truth commit:',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'npm --prefix backend run build',
  'docs/FIRST_PAID_LAUNCH_DAY_CHECKLIST.md',
  'docs/FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md',
  'docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'website/dashboard/pilot-status.html',
  'Current Readiness Status',
  'Disabled Automation Status',
  'What Is Ready for First Paid Contractor',
  'What Still Requires Explicit Approval',
  'Founder-Led Launch Program',
  'book inspections / book appointments'
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

console.log('=== RoofLeadHQ First Paid Launch Ready Recap Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(recapPath)) {
  fail('FIRST_PAID_LAUNCH_READY_RECAP.md does not exist', { path: recapPath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_READY_RECAP.md exists');

const content = fs.readFileSync(recapPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Recap includes required string: ${required}`);
  } else {
    fail(`Recap is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Recap contains forbidden string: ${forbidden}`);
  } else {
    pass(`Recap does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch ready recap verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch ready recap verification passed.');
