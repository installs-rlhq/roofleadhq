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


const packet = 'docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_INTAKE_PACKET.md';
const aggregate = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const index = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const context = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const guide = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

[
  packet,
  aggregate,
  index,
  context,
  guide,
  'scripts/onboard-roofer.sh',
  'scripts/verify-roofer-dry-run-onboarding-workspace.sh',
  'scripts/check-production-gates.sh',
].forEach(read);

[
  'Roofer Dry-Run Intake Packet',
  'Founder-Led Launch Program',
  'planning-only',
  'Do not activate production',
  'Do not send live SMS',
  'Do not mutate Supabase',
  'Do not notify contractors or homeowners',
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
  'Step 66 production send intent bridge remains present and guarded',
  'does not authorize live SMS sends',
  'book inspections',
  'book appointments',
  'missed-call recovery',
  'speed-to-lead',
  'manual review',
].forEach((expected) => assertIncludes(packet, expected));

[
  'Roofing company name',
  'Primary owner/operator name',
  'Primary phone',
  'Primary email',
  'Service area cities',
  'Service area states',
  'Emergency leak handling preference',
  'Storm damage / insurance claim handling preference',
  'Appointment booking preference',
  'Calendar readiness status',
  'Lead source channels',
  'Reporting preference',
].forEach((expected) => assertIncludes(packet, expected));

assertIncludes(aggregate, 'verify-first-paid-launch-roofer-dry-run-intake-packet-readonly.js');
assertIncludes(index, 'verify-first-paid-launch-roofer-dry-run-intake-packet-readonly.js');
assertIncludes(context, 'FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_INTAKE_PACKET.md');
assertIncludes(guide, 'Roofer Dry-Run Intake Packet');

[
  'Avoid:',
  'guaranteed revenue',
  'guaranteed jobs',
  'job-booking language',
  'legacy short-pilot promises',
  'specific appointment-count promises',
].forEach((expected) => assertIncludes(packet, expected));

console.log('Roofer dry-run intake packet verifier passed.');
