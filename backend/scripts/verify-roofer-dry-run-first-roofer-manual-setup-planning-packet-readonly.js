#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const packetPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_PACKET.md';
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
  'Roofer Dry-Run First Roofer Manual Setup Planning Packet',
  'planning-only',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md',
  'FOUNDER PASS',
  'READY FOR MANUAL SETUP PLANNING',
  'HOLD FOR FOUNDER REVIEW',
  'HOLD FOR ROOFER FOLLOW-UP',
  'BLOCKED BY SAFETY RISK',
  'Required inputs',
  'Manual setup planning checklist',
  'Explicit do-not-activate gates',
  'Planning-only allowed work',
  'Manual setup planning note',
  'Next safe action',
  'This packet does not approve production activation.',
  'Any live service action requires a separate explicit approval and a separate production gate.',
  'Activate production.',
  'Send live SMS.',
  'Place live calls.',
  'Send live emails.',
  'Mutate Supabase.',
  'Notify contractors.',
  'Notify homeowners.',
  'Enable Calendar booking.',
  'Enable Vapi production webhook ingestion.',
  'Enable Retell production routes.',
  'Enable cron, scheduler, dispatcher, or public production routes.',
  'Add or expose secrets.',
  'Run destructive actions.',
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
  'SETUP PLANNING READY',
  'SETUP PLANNING HOLD',
  'SETUP PLANNING BLOCKED',
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
  'verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run First Roofer Manual Setup Planning Packet'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run First Roofer Manual Setup Planning Packet'
);

console.log('Roofer dry-run first roofer manual setup planning packet verifier passed.');
