#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const setupChecklistPath = path.join(repoRoot, 'docs', 'FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md');

const requiredReferences = [
  'docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md',
  'docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md',
  'docs/FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md',
  'docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js'
];

const requiredPhrases = [
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Contractor intake complete',
  'Dashboard access prepared',
  'Manual Outreach expectations confirmed',
  'Vapi phone lead intake expectations confirmed',
  'Reporting cadence confirmed',
  'Homeowner contact rules confirmed',
  'Launch packet reviewed',
  'Kickoff email sent/reviewed',
  'Daily operations rhythm ready',
  'Safety approvals documented'
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

function readSetupChecklist() {
  if (!fs.existsSync(setupChecklistPath)) {
    fail('docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md is missing');
    return null;
  }

  return fs.readFileSync(setupChecklistPath, 'utf8');
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

console.log('=== RoofLeadHQ First Paid Contractor Setup Checklist Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');

const source = readSetupChecklist();

if (source) {
  checkContains(source, 'First Paid Contractor Setup Checklist', 'setup checklist title');

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
  console.error('FAIL: First paid contractor setup checklist read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid contractor setup checklist read-only verification passed.');
