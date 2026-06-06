#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const docPath = path.join(repoRoot, 'docs', 'LIVE_SMS_APPROVAL_PACKAGE.md');

const requiredStrings = [
  '# Live SMS Approval Package',
  'Status: stale - do not use for live send approval',
  '## Stale Package Warning',
  'Do not use this package to approve or run a live SMS send.',
  'Do not run the live SMS command in this stale package.',
  'This package does not enable live SMS, Twilio sends, routes, cron, scheduler, auto-start, or production runner automation.',
  'Step 66 production send intent bridge is verified fake-only. It does not approve live SMS sending.',
  'A future live SMS test requires a fresh read-only candidate review, fresh exact approval language, and a new approval package.',
  'Do not run. This command references stale skipped follow-up'
];

const forbiddenActiveApprovalStrings = [
  'Status: approved',
  'Status: active',
  'Status: ready for live send',
  'Status: live send approved'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ Live SMS Approval Package Stale Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS or Twilio calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(docPath)) {
  fail('LIVE_SMS_APPROVAL_PACKAGE.md does not exist', { path: docPath });
  process.exit(process.exitCode || 1);
}

pass('LIVE_SMS_APPROVAL_PACKAGE.md exists');

const content = fs.readFileSync(docPath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Stale approval package includes required string: ${required}`);
  } else {
    fail(`Stale approval package is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenActiveApprovalStrings) {
  if (content.includes(forbidden)) {
    fail(`Stale approval package contains active approval string: ${forbidden}`);
  } else {
    pass(`Stale approval package does not contain active approval string: ${forbidden}`);
  }
}

if (!content.includes('Status: stale - do not use for live send approval')) {
  fail('Package status is not explicitly stale');
}

if (content.includes('I approve sending exactly one live SMS') && !content.includes('Do not run the live SMS command in this stale package.')) {
  fail('Package contains approval language without stale hard rule');
}

if (process.exitCode) {
  console.error('FAIL: Live SMS approval package stale verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Live SMS approval package is safely marked stale and blocked from use.');
