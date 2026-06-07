#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const packetPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md';
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
  'Roofer Dry-Run First Roofer Manual Follow-Up Packet',
  'planning-only',
  'scripts/qa-first-roofer-readiness-packet.sh <roofer-slug>',
  'docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md',
  'READY TO CONTACT ROOFER',
  'HOLD FOR INTERNAL REVIEW',
  'BLOCKED BY SAFETY RISK',
  'Founder/operator opening script',
  'This is still a manual planning step.',
  'We are not activating live texts, calls, calendar booking, notifications, or production automation from this review.',
  'Company profile questions',
  'Service area questions',
  'Services and qualification questions',
  'Booking preference questions',
  'Emergency and insurance questions',
  'Lead source questions',
  'Manual review and reporting questions',
  'Follow-up notes',
  'Missing company details',
  'Missing service area details',
  'Missing services or qualification details',
  'Missing booking preference details',
  'Missing emergency or insurance details',
  'Missing lead source details',
  'Missing manual review or reporting details',
  'Founder/operator follow-up owner',
  'Target follow-up date',
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
  'No Supabase mutation is approved.',
  'No contractor or homeowner notification is approved.',
  'No Calendar booking activation is approved.',
  'No Vapi production webhook ingestion is approved.',
  'No Retell production route is approved.',
  'No cron, scheduler, dispatcher, or public route activation is approved.',
  'No secrets are exposed.',
  'ROOFER FOLLOW-UP READY',
  'HOLD FOR CLEANUP',
  'Do not activate production.',
  'Do not send live SMS.',
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
  'verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run First Roofer Manual Follow-Up Packet'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run First Roofer Manual Follow-Up Packet'
);

console.log('Roofer dry-run first roofer manual follow-up packet verifier passed.');
