#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packagePath = path.join(repoRoot, 'docs', 'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');

const requiredStrings = [
  'Baseline verified source-of-truth commit before next-chat handoff:',
  '/root/roofleadhq',
  'Terminal 1 Source-of-Truth Rule',
  'Current Safety Posture',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'npm --prefix backend run build',
  'First Paid Launch Docs List',
  'First Paid Launch Verifier Scripts List',
  'Business Language Rules',
  'Live Automation Approval Rules',
  'Recommended Next Build Direction',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  '5053554 docs(pilot): refresh context after vapi scenario contract enforcement',
  '9ddb8ec test(vapi): enforce scenario-specific dry-run contract',
  'VAPI_NORMALIZED_DRY_RUN_CONTRACT.md',
  'scenario-specific verifier checks',
  'emergency-leak',
  'insurance-storm',
  'Retell remains deprecated/disabled',
  'verify-vapi-normalized-contract-doc-readonly.js',
  'Current Safe Batch — Vapi Normalized Contract Doc Verifier',
  'nullable rules for `missing-phone`, `missing-address`, and `appointment_suggested`',
  'Workflow Rule Update — Combined Verify and Commit/Push',
  'combine verification, commit/push, final fetch/status/log',
  'The combined command should commit and push only after all required checks pass'
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

console.log('=== RoofLeadHQ Next Chat Context Package First Paid Launch Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(packagePath)) {
  fail('NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md does not exist', { path: packagePath });
  process.exit(process.exitCode || 1);
}

pass('NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md exists');

const content = fs.readFileSync(packagePath, 'utf8');

for (const required of requiredStrings) {
  if (content.includes(required)) {
    pass(`Context package includes required string: ${required}`);
  } else {
    fail(`Context package is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  if (content.includes(forbidden)) {
    fail(`Context package contains forbidden string: ${forbidden}`);
  } else {
    pass(`Context package does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: Next chat context package first paid launch verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Next chat context package first paid launch verification passed.');
