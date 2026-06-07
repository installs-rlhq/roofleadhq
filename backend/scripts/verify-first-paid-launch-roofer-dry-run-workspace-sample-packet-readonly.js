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

const packet = 'docs/FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_SAMPLE_PACKET.md';
const fixtureDir = 'fixtures/roofer-dry-run-workspace/sample-roofer';
const files = [
  `${fixtureDir}/README.md`,
  `${fixtureDir}/intake.md`,
  `${fixtureDir}/safety-flags.env`,
  `${fixtureDir}/activation-flags.env`,
  `${fixtureDir}/workspace-metadata.env`,
  `${fixtureDir}/onboarding-checklist.md`,
];

[
  packet,
  ...files,
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
].forEach(read);

[
  'Roofer Dry-Run Workspace Sample Packet',
  'known-good sample roofer dry-run workspace fixture',
  'planning-only',
  'Do not activate production',
  'Do not send live SMS',
  'Do not mutate Supabase',
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
].forEach((flag) => {
  assertIncludes(packet, flag);
  assertIncludes(`${fixtureDir}/safety-flags.env`, flag);
  assertIncludes(`${fixtureDir}/activation-flags.env`, flag);
  assertIncludes(`${fixtureDir}/workspace-metadata.env`, flag);
});

assertIncludes(`${fixtureDir}/workspace-metadata.env`, 'ROOFER_SLUG=sample-roofer');
assertIncludes(`${fixtureDir}/workspace-metadata.env`, 'WORKSPACE_MODE=dry-run');
assertIncludes(`${fixtureDir}/intake.md`, 'Roofing company name');
assertIncludes(`${fixtureDir}/intake.md`, 'Booking Preferences');
assertIncludes(`${fixtureDir}/intake.md`, 'Lead Sources');
assertIncludes(`${fixtureDir}/onboarding-checklist.md`, 'Production activation remains disabled');

assertIncludes('backend/scripts/verify-first-paid-pilot-readiness-readonly.js', 'verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js');
assertIncludes('docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md', 'verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js');
assertIncludes('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md', 'FIRST_PAID_LAUNCH_ROOFER_DRY_RUN_WORKSPACE_SAMPLE_PACKET.md');
assertIncludes('docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md', 'Roofer Dry-Run Workspace Sample Packet');

console.log('Roofer dry-run workspace sample packet verifier passed.');
