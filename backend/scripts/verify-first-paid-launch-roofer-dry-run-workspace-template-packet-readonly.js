#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

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

const packet = 'docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_TEMPLATE_PACKET.md';
const intake = 'templates/roofer-dry-run-workspace/intake.md';
const flags = 'templates/roofer-dry-run-workspace/safety-flags.env';
const readme = 'templates/roofer-dry-run-workspace/README.md';
const aggregate = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const index = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const context = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const guide = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

[
  packet,
  intake,
  flags,
  readme,
  aggregate,
  index,
  context,
  guide,
  'scripts/check-production-gates.sh',
].forEach(read);

[
  'Roofer Dry-Run Workspace Template Packet',
  'planning-only',
  'Founder-Led Launch Program',
  'templates/roofer-dry-run-workspace/intake.md',
  'templates/roofer-dry-run-workspace/safety-flags.env',
  'templates/roofer-dry-run-workspace/README.md',
  'Step 66 production send intent bridge remains present and guarded',
  'does not authorize live SMS sends',
].forEach((expected) => assertIncludes(packet, expected));

[
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
].forEach((expected) => {
  assertIncludes(packet, expected);
  assertIncludes(flags, expected);
});

[
  'Do not activate production',
  'Do not send live SMS',
  'Do not mutate Supabase',
  'Do not notify contractors or homeowners',
  'Vapi production webhook ingestion',
  'Retell routes',
].forEach((expected) => {
  assertIncludes(packet, expected);
  assertIncludes(readme, expected);
});

[
  'Roofing company name',
  'Owner/operator name',
  'Primary phone',
  'Primary email',
  'Service Area',
  'Booking Preferences',
  'Lead Sources',
  'Manual Review',
].forEach((expected) => assertIncludes(intake, expected));

assertIncludes(aggregate, 'verify-first-paid-launch-roofer-dry-run-workspace-template-packet-readonly.js');
assertIncludes(index, 'verify-first-paid-launch-roofer-dry-run-workspace-template-packet-readonly.js');
assertIncludes(context, 'FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_TEMPLATE_PACKET.md');
assertIncludes(guide, 'Roofer Dry-Run Workspace Template Packet');

console.log('Roofer dry-run workspace template packet verifier passed.');
