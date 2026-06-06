#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const checklistPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_DAY_CHECKLIST.md');

const requiredStrings = [
  'Source-of-truth commit:',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'website/dashboard/pilot-status.html',
  'Required Docs to Review',
  'Contractor Setup Confirmation',
  'Kickoff Email Confirmation',
  'Dashboard Access Confirmation',
  'Manual Outreach Check',
  'Vapi Phone Lead Intake Check',
  'Reporting Check',
  'Disabled Automation Check',
  'Explicit Approval Required Before Live Automation',
  'Day-One Operating Rhythm',
  'End-of-Day Closeout',
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

console.log('=== RoofLeadHQ First Paid Launch Day Checklist Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(checklistPath)) {
  fail('FIRST_PAID_LAUNCH_DAY_CHECKLIST.md does not exist', { path: checklistPath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_DAY_CHECKLIST.md exists');

const content = fs.readFileSync(checklistPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Checklist includes required string: ${required}`);
  } else {
    fail(`Checklist is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Checklist contains forbidden string: ${forbidden}`);
  } else {
    pass(`Checklist does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch day checklist verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch day checklist verification passed.');
