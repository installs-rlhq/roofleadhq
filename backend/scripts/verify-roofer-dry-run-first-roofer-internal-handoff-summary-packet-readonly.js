#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const packetPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md';
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
  'Roofer Dry-Run First Roofer Internal Handoff Summary Packet',
  'planning-only',
  'scripts/qa-first-roofer-readiness-packet.sh <roofer-slug>',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md',
  'READY FOR FOUNDER/OPERATOR HANDOFF',
  'HOLD FOR ROOFER FOLLOW-UP',
  'HOLD FOR INTERNAL CLEANUP',
  'BLOCKED BY SAFETY RISK',
  'Handoff summary',
  'Readiness chain reviewed',
  'Accepted setup state',
  'Remaining roofer follow-up items',
  'Founder/operator handoff note',
  'Next manual planning action',
  'Production automation remains disabled.',
  'No live texts, calls, emails, contractor notifications, homeowner notifications, calendar booking, Vapi production webhook ingestion, Retell production routes, Supabase mutations, cron, scheduler, dispatcher, or public production routes are approved by this handoff.',
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
  'HANDOFF READY FOR MANUAL PLANNING',
  'HOLD FOR ROOFER FOLLOW-UP',
  'HOLD FOR INTERNAL CLEANUP',
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
  'verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run First Roofer Internal Handoff Summary Packet'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run First Roofer Internal Handoff Summary Packet'
);

console.log('Roofer dry-run first roofer internal handoff summary packet verifier passed.');
