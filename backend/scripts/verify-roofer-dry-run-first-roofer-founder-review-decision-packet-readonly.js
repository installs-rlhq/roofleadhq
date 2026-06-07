#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const packetPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const rooferContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';

function read(relativePath) {
  const fullPath = path.join(repoRoot, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function assertIncludes(relativePath, expected) {
  const content = read(relativePath);
  if (!content.includes(expected)) {
    throw new Error(`Expected ${relativePath} to include: ${expected}`);
  }
}

read(packetPath);

[
  'Roofer Dry-Run First Roofer Founder Review Decision Packet',
  'planning-only',
  'PASS / HOLD / BLOCKED',
  'scripts/qa-first-roofer-readiness-packet.sh <roofer-slug>',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md',
  'PASS TO MANUAL SETUP PLANNING',
  'HOLD FOR ROOFER FOLLOW-UP',
  'HOLD FOR INTERNAL CLEANUP',
  'BLOCKED BY SAFETY RISK',
  'Review inputs',
  'Founder/operator decision summary',
  'PASS criteria',
  'HOLD criteria',
  'BLOCKED criteria',
  'Founder/operator decision note',
  'Approved next manual action',
  'A PASS means manual setup planning may continue, not production activation.',
  'A HOLD means manual follow-up or internal cleanup is required.',
  'A BLOCKED decision means the safety risk must be resolved before any further setup planning.',
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'CALENDAR_ACTIVATION=false',
  'VAPI_ACTIVATION=false',
  'SUPABASE_WRITES=false',
  'CONTRACTOR_NOTIFICATION=false',
  'HOMEOWNER_NOTIFICATION=false',
  'CRON_ACTIVATION=false',
  'SCHEDULER_ACTIVATION=false',
  'DISPATCHER_ACTIVATION=false',
  'PUBLIC_ROUTE_ACTIVATION=false',
  'Production activation remains disabled.',
  'No live SMS or Twilio send is approved.',
  'No live calls are approved.',
  'No live email send is approved.',
  'No Supabase mutation is approved.',
  'No contractor or homeowner notification is approved.',
  'No Calendar booking activation is approved.',
  'No Vapi production webhook ingestion is approved.',
  'No Retell production route is approved.',
  'No cron, scheduler, dispatcher, or public route activation is approved.',
  'No secrets are exposed.',
  'FOUNDER PASS: continue to manual setup planning only.',
  'FOUNDER HOLD: collect missing roofer information manually.',
  'FOUNDER HOLD: clean up internal packet before review.',
  'FOUNDER BLOCKED: resolve safety risk before continuing.',
  'Do not activate production.',
  'Do not send live SMS.',
  'Do not place live calls.',
  'Do not send live emails.',
  'Do not mutate Supabase.',
  'Do not notify contractors or homeowners.',
].forEach((expected) => {
  assertIncludes(packetPath, expected);
});

[
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'guaranteed jobs',
  'guaranteed revenue',
  'book jobs',
  'booked jobs',
  'job-booking',
].forEach((forbidden) => {
  if (read(packetPath).includes(forbidden)) {
    throw new Error(`Forbidden phrase found in ${packetPath}: ${forbidden}`);
  }
});

assertIncludes(
  aggregatePath,
  'verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run First Roofer Founder Review Decision Packet'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run First Roofer Founder Review Decision Packet'
);

console.log('Roofer dry-run first roofer founder review decision packet verifier passed.');
