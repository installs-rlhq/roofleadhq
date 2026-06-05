#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const launchPacketPath = path.join(repoRoot, 'docs', 'FIRST_PAID_PILOT_LAUNCH_PACKET.md');

const requiredReferences = [
  'docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md',
  'docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md',
  'docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md',
  'docs/FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md',
  'node backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'website/dashboard/pilot-status.html'
];

const requiredPhrases = [
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Not Live Without Explicit Approval',
  'Homeowner SMS outreach',
  'Roofer SMS notifications',
  'Follow-up dispatcher live sending',
  'Calendar event creation or synchronization',
  'Vapi outbound actions',
  'Resend production emails',
  'Lindy production automations',
  'Any automation that attempts to book inspections or book appointments without founder review'
];

const requiredDisabledAutomationLanguage = [
  'Production automations remain disabled until explicitly approved.',
  'No automated production outreach is used without separate explicit approval.',
  'Keep the launch framed as a controlled Founder-Led Launch Program, not as a guaranteed outcome program.'
];

const forbiddenPhrases = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
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

function readLaunchPacket() {
  if (!fs.existsSync(launchPacketPath)) {
    fail('docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md is missing');
    return null;
  }

  return fs.readFileSync(launchPacketPath, 'utf8');
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

console.log('=== RoofLeadHQ First Paid Pilot Launch Packet Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');

const source = readLaunchPacket();

if (source) {
  checkContains(source, 'First Paid Pilot Launch Packet', 'launch packet title');
  checkContains(source, 'Founder-Led Launch Program', 'Founder-Led Launch Program wording');
  checkContains(source, 'book inspections / book appointments', 'book inspections / book appointments wording');

  for (const reference of requiredReferences) {
    checkContains(source, reference, `required reference ${reference}`);
  }

  for (const phrase of requiredPhrases) {
    checkContains(source, phrase, `required phrase ${phrase}`);
  }

  for (const phrase of requiredDisabledAutomationLanguage) {
    checkContains(source, phrase, `disabled automation language ${phrase}`);
  }

  for (const phrase of forbiddenPhrases) {
    checkNotContains(source, phrase, `forbidden phrase ${phrase}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid pilot launch packet read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid pilot launch packet read-only verification passed.');
