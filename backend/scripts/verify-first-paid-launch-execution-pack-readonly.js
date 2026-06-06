#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_EXECUTION_PACK.md');

const requiredStrings = [
  '9d0c1df docs(pilot): update launch handoff with status endpoint path',
  'Current status: demo ready with live automation disabled',
  'backend/src/routes/first-paid-launch-status.ts is test-safe/unregistered',
  'website/dashboard/first-paid-launch-status.html exists',
  'backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js exists',
  'No route was registered for the first paid launch status smoke path',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
  'Manual Outreach Path C is dry-run/test-safe unless separately approved',
  'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Source of Truth',
  'Current Launch State',
  'Before Contractor Call',
  'During Contractor Call',
  'After Contractor Call',
  'Demo Script',
  'Manual Outreach Path C Dry-Run Steps',
  'Status Smoke Path Review',
  'Go/No-Go Checklist',
  'Explicit Approval Gates',
  'Verification Commands',
  'What Not To Do',
  'Next Build Batch'
];

const forbiddenStrings = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guarantee jobs',
  'guarantee revenue',
  'send sms',
  'send text',
  'call twilio',
  'trigger automation',
  'enable live',
  'sync calendar',
  'run dispatcher',
  'start dispatcher',
  'activate dispatcher',
  'production dispatcher activation'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ First Paid Launch Execution Pack Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(packPath)) {
  fail('FIRST_PAID_LAUNCH_EXECUTION_PACK.md does not exist', { path: packPath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_EXECUTION_PACK.md exists');

const content = fs.readFileSync(packPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Execution pack includes required string: ${required}`);
  } else {
    fail(`Execution pack is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Execution pack contains forbidden string: ${forbidden}`);
  } else {
    pass(`Execution pack does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch execution pack verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch execution pack verification passed.');