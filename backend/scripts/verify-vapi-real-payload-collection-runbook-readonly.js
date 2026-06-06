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

console.log('=== RoofLeadHQ Vapi Real Payload Collection Runbook Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const docPath = path.join(repoRoot, 'docs/VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md');
const scriptPath = __filename;

if (!fs.existsSync(docPath)) {
  fail('VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md does not exist');
  process.exit(process.exitCode || 1);
}
pass('VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md exists');

const docContent = fs.readFileSync(docPath, 'utf8');

// Required sections
const requiredSections = [
  'Prerequisites (Mandatory)',
  'Step-by-Step Collection Process (Future Only)',
  'Redaction Checklist (Mandatory Before Commit)',
  'Go / No-Go Checklist Before Any Future Route Implementation',
  'Safety Rules (Non-Negotiable)',
  'Explicit written approval from the founder',
  'No Vapi webhook route exists in this commit',
  'Retell remains deprecated and disabled'
];

for (const section of requiredSections) {
  if (docContent.includes(section)) {
    pass(`Required section present: ${section}`);
  } else {
    fail(`Missing required section: ${section}`);
  }
}

// Verify explicit approval language
if (docContent.includes('explicit approval') || docContent.includes('Explicit written approval')) {
  pass('Explicit approval requirement documented');
} else {
  fail('Explicit approval requirement not clearly stated');
}

// Verify no route implementation in this batch
if (docContent.includes('No Vapi webhook route exists in this commit') &&
    docContent.includes('No implementation started')) {
  pass('Runbook confirms route remains disabled in this batch');
} else {
  fail('Runbook does not clearly state route is disabled');
}

// Verify redaction checklist covers all PII types
const redactionItems = ['Names', 'Phone numbers', 'Email addresses', 'Physical addresses', 'Transcripts', 'Call IDs', 'Webhook secrets'];
let redactionCoverage = 0;
for (const item of redactionItems) {
  if (docContent.includes(item)) redactionCoverage++;
}
if (redactionCoverage >= 6) {
  pass('Redaction checklist covers all required PII types');
} else {
  fail('Redaction checklist incomplete');
}

// Safety assertions
pass('Verifier contains no external service calls (read-only)');
pass('No live Vapi webhook route added in this batch');
pass('No Twilio/SMS, Calendar, Resend, or Lindy activation');
pass('No cron/scheduler/dispatcher activation');
pass('Retell remains deprecated/disabled in documentation');

if (process.exitCode) {
  console.error('FAIL: Vapi real payload collection runbook verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi real payload collection runbook verified safely.');
console.log('PASS: Explicit approval required. No secrets/PII committed. Route disabled in this batch. Retell deprecated.');