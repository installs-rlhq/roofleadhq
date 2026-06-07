#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md');

function fail(message, details = {}) {
  console.error(`FAIL: ${message}`);
  if (Object.keys(details).length > 0) {
    console.error(JSON.stringify(details, null, 2));
  }
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

if (!fs.existsSync(packetPath)) {
  fail('First Paid Launch follow-up cadence packet is missing', { packetPath });
}

const packet = fs.readFileSync(packetPath, 'utf8');

const requiredSections = [
  'Packet Purpose',
  'Source-of-Truth Workflow',
  'Follow-Up Language Rules',
  'Lead Status Definitions',
  'Initial Response Rules',
  'Missed-Call Recovery Rules',
  'Standard Follow-Up Cadence',
  'Appointment Reminder Rules',
  'Emergency Follow-Up Rules',
  'Opt-Out and Do-Not-Contact Rules',
  'Channel Rules',
  'Reporting Tie-In',
  'Manual Operator Handoff',
  'Explicit Approval Gates',
  'Completion Criteria',
];

const requiredLinkedDocs = [
  'docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md',
  'docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md',
  'docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md',
  'docs/FIRST_PAID_LAUNCH_DAY_CHECKLIST.md',
];

const requiredWorkflow = [
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'HEAD and origin/main must match',
  'OpenClaw summaries alone are not trusted',
];

const requiredLanguageRules = [
  'book inspections',
  'book appointments',
  'missed-call recovery',
  'speed-to-lead',
  'Avoid prohibited language',
  'book jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  '7-day pilot',
  '5 qualified appointments in 7 days',
];

const requiredSafetyGates = [
  'no live SMS/Twilio sends',
  'no production Supabase writes',
  'no Vapi production webhook ingestion',
  'no live Vapi webhook route',
  'no Calendar booking activation',
  'no Resend production activation',
  'no Lindy production activation',
  'no cron activation',
  'no scheduler activation',
  'no dispatcher activation',
  'no public production route activation',
  'no secrets exposure',
  'no destructive operations',
];

const requiredOperationalRules = [
  'No live SMS/Twilio sends are allowed without explicit approval.',
  'Missed-call recovery remains manual until live automation is explicitly approved.',
  'No automated reminders may be activated without explicit approval.',
  'Emergency follow-up remains manual until explicitly approved.',
  'SMS/Twilio automation remains disabled.',
];

for (const section of requiredSections) {
  if (!packet.includes(section)) {
    fail('Follow-up cadence packet missing required section', { section });
  }
}

for (const doc of requiredLinkedDocs) {
  if (!packet.includes(doc)) {
    fail('Follow-up cadence packet missing linked doc reference', { doc });
  }
}

for (const item of requiredWorkflow) {
  if (!packet.includes(item)) {
    fail('Follow-up cadence packet missing source-of-truth workflow requirement', { item });
  }
}

for (const rule of requiredLanguageRules) {
  if (!packet.includes(rule)) {
    fail('Follow-up cadence packet missing language rule', { rule });
  }
}

for (const gate of requiredSafetyGates) {
  if (!packet.includes(gate)) {
    fail('Follow-up cadence packet missing explicit approval gate', { gate });
  }
}

for (const operationalRule of requiredOperationalRules) {
  if (!packet.includes(operationalRule)) {
    fail('Follow-up cadence packet missing manual/safety operational rule', { operationalRule });
  }
}

pass('First Paid Launch follow-up cadence packet completed successfully');
