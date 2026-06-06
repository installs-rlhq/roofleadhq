#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const indexPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_VERIFIER_INDEX.md');
const aggregatePath = path.join(repoRoot, 'backend', 'scripts', 'verify-first-paid-pilot-readiness-readonly.js');

const requiredReferences = [
  'backend/scripts/verify-first-paid-pilot-launch-packet-readonly.js',
  'backend/scripts/verify-first-paid-contractor-kickoff-email-readonly.js',
  'backend/scripts/verify-first-paid-contractor-setup-checklist-readonly.js',
  'backend/scripts/verify-first-paid-client-launch-readiness-gate-readonly.js',
  'backend/scripts/verify-pilot-dashboard-smoke-readonly.js',
  'backend/scripts/verify-manual-outreach-smoke-readonly.js',
  'backend/scripts/verify-vapi-phone-lead-smoke-readonly.js',
  'backend/scripts/verify-reporting-smoke-readonly.js',
  'backend/scripts/verify-pilot-operator-status-page-readonly.js',
  'backend/scripts/verify-pilot-operator-status-endpoint-readonly.js',
  'backend/scripts/verify-dashboard-navigation-readonly.js'
];

const requiredPhrases = [
  'First Paid Launch Verifier Index',
  'Exact Command',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'local/read-only verification steps',
  'no Supabase reads or writes',
  'no external service calls',
  'no live service activations'
];

const forbiddenPhrases = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'booked-job',
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

function readFileOrFail(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} is missing`);
    return null;
  }

  return fs.readFileSync(filePath, 'utf8');
}

function checkContains(source, needle, label) {
  if (source.includes(needle)) {
    pass(`${label} is present`);
  } else {
    fail(`${label} is missing`, { needle });
  }
}

function checkNotContains(source, needle, label) {
  if (source.includes(needle)) {
    fail(`${label} is present`, { needle });
  } else {
    pass(`${label} is absent`);
  }
}

console.log('=== RoofLeadHQ First Paid Launch Verifier Index Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');

const indexSource = readFileOrFail(indexPath, 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md');
const aggregateSource = readFileOrFail(aggregatePath, 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js');

if (indexSource) {
  checkContains(indexSource, 'First Paid Launch Verifier Index', 'index title');
  checkContains(indexSource, 'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js', 'exact aggregate command');

  for (const reference of requiredReferences) {
    checkContains(indexSource, reference, `required reference ${reference}`);
  }

  for (const phrase of requiredPhrases) {
    checkContains(indexSource, phrase, `required phrase ${phrase}`);
  }

  for (const phrase of forbiddenPhrases) {
    checkNotContains(indexSource, phrase, `forbidden phrase ${phrase}`);
  }
}

if (aggregateSource) {
  for (const reference of requiredReferences) {
    checkContains(aggregateSource, reference, `aggregate script reference ${reference}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch verifier index read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch verifier index read-only verification passed.');
