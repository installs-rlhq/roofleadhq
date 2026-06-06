#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const servicePath = path.join(repoRoot, 'backend', 'src', 'services', 'first-paid-launch-status-contract.service.ts');

const requiredStrings = [
  'demo_ready_with_live_automation_disabled',
  '19d0272 docs(pilot): add launch control center',
  'sms: false',
  'twilio: false',
  'calendar: false',
  'vapiOutbound: false',
  'resend: false',
  'lindy: false',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
  'Manual Outreach Path C is dry-run/test-safe unless separately approved',
  'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval',
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

console.log('=== RoofLeadHQ First Paid Launch Status Contract Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(servicePath)) {
  fail('first-paid-launch-status-contract.service.ts does not exist', { path: servicePath });
  process.exit(process.exitCode || 1);
}

pass('first-paid-launch-status-contract.service.ts exists');

const content = fs.readFileSync(servicePath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Status contract includes required string: ${required}`);
  } else {
    fail(`Status contract is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Status contract contains forbidden string: ${forbidden}`);
  } else {
    pass(`Status contract does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch status contract verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch status contract verification passed.');