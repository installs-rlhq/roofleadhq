#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const snapshotPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md');

const requiredStrings = [
  '1b20958 docs(pilot): update next chat context verifier guard commit',
  'Current status: demo ready with live automation disabled',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
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

console.log('=== RoofLeadHQ First Paid Launch Go/No-Go Snapshot Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(snapshotPath)) {
  fail('FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md does not exist', { path: snapshotPath });
  process.exit(process.exitCode || 1);
}

pass('FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md exists');

const content = fs.readFileSync(snapshotPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Snapshot includes required string: ${required}`);
  } else {
    fail(`Snapshot is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Snapshot contains forbidden string: ${forbidden}`);
  } else {
    pass(`Snapshot does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch go/no-go snapshot verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch go/no-go snapshot verification passed.');