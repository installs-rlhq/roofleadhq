#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_REPORTING_PREFERENCES_PACKET.md');

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
  fail('First Paid Launch reporting preferences packet is missing', { packetPath });
}

const packet = fs.readFileSync(packetPath, 'utf8');

const requiredSections = [
  'Packet Purpose',
  'Source-of-Truth Workflow',
  'Reporting Language Rules',
  'Report Recipients',
  'Weekly Report Preferences',
  'Monthly Report Preferences',
  'KPI Definitions',
  'Lead Source Reporting',
  'Appointment Reporting',
  'Follow-Up Reporting',
  'Weather, Trends, and Recommended Actions',
  'Manual Report Assembly',
  'Report Delivery Readiness',
  'Explicit Approval Gates',
  'Completion Criteria',
];

const requiredLinkedDocs = [
  'docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md',
  'docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md',
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
  'recommended actions',
  'storm season readiness',
  'Avoid prohibited language',
  'book jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  '7-day pilot',
  '5 qualified appointments in 7 days',
];

const requiredReportingRules = [
  'Weekly Report Preferences',
  'Monthly Report Preferences',
  'KPI Definitions',
  'Lead Source Reporting',
  'Appointment Reporting',
  'Follow-Up Reporting',
  'Weather, Trends, and Recommended Actions',
  'Manual Report Assembly',
  'Report Delivery Readiness',
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
  'No Resend or Lindy production activation is allowed without explicit approval.',
  'No live SMS/Twilio sends or production Supabase writes are allowed without explicit approval.',
  'Resend, Lindy, cron, scheduler, dispatcher, and automated report delivery remain disabled unless explicitly approved.',
];

for (const section of requiredSections) {
  if (!packet.includes(section)) {
    fail('Reporting preferences packet missing required section', { section });
  }
}

for (const doc of requiredLinkedDocs) {
  if (!packet.includes(doc)) {
    fail('Reporting preferences packet missing linked doc reference', { doc });
  }
}

for (const item of requiredWorkflow) {
  if (!packet.includes(item)) {
    fail('Reporting preferences packet missing source-of-truth workflow requirement', { item });
  }
}

for (const rule of requiredLanguageRules) {
  if (!packet.includes(rule)) {
    fail('Reporting preferences packet missing reporting language rule', { rule });
  }
}

for (const rule of requiredReportingRules) {
  if (!packet.includes(rule)) {
    fail('Reporting preferences packet missing reporting rule', { rule });
  }
}

for (const gate of requiredSafetyGates) {
  if (!packet.includes(gate)) {
    fail('Reporting preferences packet missing explicit approval gate', { gate });
  }
}

for (const operationalRule of requiredOperationalRules) {
  if (!packet.includes(operationalRule)) {
    fail('Reporting preferences packet missing manual/safety operational rule', { operationalRule });
  }
}

pass('First Paid Launch reporting preferences packet completed successfully');
