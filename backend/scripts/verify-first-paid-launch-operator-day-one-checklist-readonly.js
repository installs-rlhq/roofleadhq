#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const target = path.join(
  process.cwd(),
  'docs',
  'FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md'
);

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

if (!fs.existsSync(target)) {
  fail('First Paid Launch operator day-one checklist is missing', { target });
}

const text = fs.readFileSync(target, 'utf8');

const requiredSections = [
  'Terminal 1 Source-of-Truth Verification',
  'Environment Sanity Check',
  'Demo-Mode Confirmation',
  'First Paid Customer Readiness Review',
  'Roofer Business Info Checklist',
  'Lead Source Intake Checklist',
  'Calendar and Booking Preferences Checklist',
  'Emergency or Urgent Lead Handling Policy',
  'Follow-Up Cadence Review',
  'Reporting Expectations',
  'Operator Manual Handoff',
  'Explicit Approval Gates Before Live Activation',
  'Day-One Stop Conditions',
  'Day-One Completion Criteria',
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

const requiredWorkflowStrings = [
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'HEAD and origin/main must match',
  'OpenClaw summaries alone are not trusted',
  'Safety remains demo-ready with live automation disabled',
  'Use “book inspections” or “book appointments,” not “book jobs.”',
];

for (const section of requiredSections) {
  if (!text.includes(section)) {
    fail('Checklist missing required day-one section', { section });
  }
}

for (const gate of requiredSafetyGates) {
  if (!text.includes(gate)) {
    fail('Checklist missing required safety gate', { gate });
  }
}

for (const required of requiredWorkflowStrings) {
  if (!text.includes(required)) {
    fail('Checklist missing required workflow/business language', { required });
  }
}

pass('First Paid Launch operator day-one checklist completed successfully');
