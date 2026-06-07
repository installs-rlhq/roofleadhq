#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

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

const scriptPath = path.join(repoRoot, 'scripts/qa-roofer-dry-run-onboarding.sh');
const docPath = 'docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md';
const slug = 'qa-wrapper-verifier';
const workspaceDir = `.roofleadhq/onboarding/${slug}`;
const workspacePath = path.join(repoRoot, workspaceDir);

read('scripts/qa-roofer-dry-run-onboarding.sh');
read(docPath);

[
  'scripts/verify-source-of-truth.sh',
  'scripts/onboard-roofer.sh "$SLUG"',
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
  'This workspace is planning-only.',
  'Do not activate production.',
  'Do not send live SMS.',
  'Do not mutate Supabase.',
  'Do not notify contractors or homeowners.',
  'fixtures/roofer-dry-run-workspace/sample-roofer',
  'rm -rf "$WORKSPACE_DIR"',
  'production activation disabled',
].forEach((expected) => {
  assertIncludes('scripts/qa-roofer-dry-run-onboarding.sh', expected);
});

[
  'Roofer Dry-Run Onboarding QA Wrapper',
  'scripts/qa-roofer-dry-run-onboarding.sh',
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'SUPABASE_WRITES=false',
  'PUBLIC_ROUTE_ACTIVATION=false',
  'Production activation remains disabled',
  'Do not activate production.',
  'Do not send live SMS.',
  'Do not mutate Supabase.',
].forEach((expected) => {
  assertIncludes(docPath, expected);
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
  if (read(docPath).includes(forbidden)) {
    throw new Error(`Forbidden phrase found in ${docPath}: ${forbidden}`);
  }
  if (read('scripts/qa-roofer-dry-run-onboarding.sh').includes(forbidden)) {
    throw new Error(`Forbidden phrase found in QA wrapper script: ${forbidden}`);
  }
});

if (fs.existsSync(workspacePath)) {
  fs.rmSync(workspacePath, { recursive: true, force: true });
}

execFileSync(scriptPath, [slug], {
  cwd: repoRoot,
  stdio: 'inherit',
});

if (fs.existsSync(workspacePath)) {
  throw new Error(`Expected QA wrapper to clean up temporary workspace: ${workspaceDir}`);
}

assertIncludes(
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js'
);

assertIncludes(
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js'
);

assertIncludes(
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'Roofer Dry-Run Onboarding QA Wrapper'
);

assertIncludes(
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
  'Roofer Dry-Run Onboarding QA Wrapper'
);

console.log('Roofer dry-run onboarding QA wrapper verifier passed.');
