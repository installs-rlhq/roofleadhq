#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const gatePath = path.join(repoRoot, 'docs', 'FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md');

const requiredReferences = [
  'docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md',
  'docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md',
  'docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'website/dashboard/pilot-status.html'
];

const requiredPhrases = [
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Aggregate verifier passes',
  'Launch packet reviewed',
  'Contractor intake complete',
  'Setup checklist complete',
  'Kickoff email ready or sent',
  'Dashboard access ready',
  'Daily operations rhythm ready',
  'Manual Outreach expectations confirmed',
  'Vapi phone lead intake expectations confirmed',
  'Reporting expectations confirmed',
  'All live automation disabled',
  'Explicit approval required before any production automation'
];

const forbiddenPhrases = [
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

function readGate() {
  if (!fs.existsSync(gatePath)) {
    fail('docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md is missing');
    return null;
  }

  return fs.readFileSync(gatePath, 'utf8');
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

console.log('=== RoofLeadHQ First Paid Client Launch Readiness Gate Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');

const source = readGate();

if (source) {
  checkContains(source, 'First Paid Client Launch Readiness Gate', 'gate title');

  for (const reference of requiredReferences) {
    checkContains(source, reference, `required reference ${reference}`);
  }

  for (const phrase of requiredPhrases) {
    checkContains(source, phrase, `required phrase ${phrase}`);
  }

  for (const phrase of forbiddenPhrases) {
    checkNotContains(source, phrase, `forbidden phrase ${phrase}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid client launch readiness gate read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid client launch readiness gate read-only verification passed.');
