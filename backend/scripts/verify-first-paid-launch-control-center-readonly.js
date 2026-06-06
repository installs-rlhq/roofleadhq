#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const centerPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_CONTROL_CENTER.md');

const requiredStrings = [
  '1ccaa20 feat(pilot): add first paid launch status endpoint smoke path',
  'Current status: demo ready with live automation disabled',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
  'Manual Outreach Path C is dry-run/test-safe unless separately approved',
  'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'backend/src/services/first-paid-launch-status-contract.service.ts',
  'backend/scripts/verify-first-paid-launch-status-contract-readonly.js',
  'Status',
  'Source of Truth',
  'Launch Readiness Snapshot',
  'Operator Pre-Launch Checklist',
  'Contractor Setup Checklist',
  'Manual Outreach Path C Checklist',
  'Demo Flow Checklist',
  'Safety Gates',
  'Explicit Approval Gates',
  'Verification Commands',
  'Go/No-Go Decision',
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

console.log('=== RoofLeadHQ First Paid Launch Control Center Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(centerPath)) {
  fail('FIRST_PAID_LAUNCH_CONTROL_CENTER.md does not exist', { path: centerPath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_CONTROL_CENTER.md exists');

const content = fs.readFileSync(centerPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Control Center includes required string: ${required}`);
  } else {
    fail(`Control Center is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Control Center contains forbidden string: ${forbidden}`);
  } else {
    pass(`Control Center does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch control center verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch control center verification passed.');