#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = process.cwd();
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md');

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
  fail('First Paid Launch customer intake packet is missing', { packetPath });
}

const packet = fs.readFileSync(packetPath, 'utf8');

const requiredSections = [
  'Packet Purpose',
  'Required Source-of-Truth Workflow',
  'Business Identity Intake',
  'Offer and Language Confirmation',
  'Lead Source Intake',
  'Lead Qualification Fields',
  'Emergency and Urgent Lead Policy',
  'Booking Preferences',
  'Follow-Up Preferences',
  'Reporting Preferences',
  'Manual Operator Handoff',
  'Explicit Approval Gates',
  'Customer Intake Completion Criteria',
];

const requiredLinkedDocs = [
  'docs/FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md',
  'docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md',
  'docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md',
  'docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md',
  'docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md',
];

const requiredWorkflow = [
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'HEAD and origin/main must match',
  'OpenClaw summaries alone are not trusted',
];

const requiredLanguageRules = [
  'Founder-led during launch',
  'System-led after setup',
  'book inspections',
  'book appointments',
  'Do not say “book jobs.”',
  'Do not promise guaranteed jobs.',
  'Do not promise guaranteed revenue.',
  'Do not use “7-day pilot.”',
  'Do not use “5 qualified appointments in 7 days.”',
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

for (const section of requiredSections) {
  if (!packet.includes(section)) {
    fail('Customer intake packet missing required section', { section });
  }
}

for (const doc of requiredLinkedDocs) {
  if (!packet.includes(doc)) {
    fail('Customer intake packet missing linked intake/onboarding doc reference', { doc });
  }
}

for (const item of requiredWorkflow) {
  if (!packet.includes(item)) {
    fail('Customer intake packet missing source-of-truth workflow requirement', { item });
  }
}

for (const rule of requiredLanguageRules) {
  if (!packet.includes(rule)) {
    fail('Customer intake packet missing offer/language rule', { rule });
  }
}

for (const gate of requiredSafetyGates) {
  if (!packet.includes(gate)) {
    fail('Customer intake packet missing explicit approval gate', { gate });
  }
}

pass('First Paid Launch customer intake packet completed successfully');
