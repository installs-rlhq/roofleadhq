#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

const wrapperPath = 'scripts/qa-first-roofer-readiness-packet.sh';
const docPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md';
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

read(wrapperPath);
read(docPath);

[
  'First Roofer Dry-Run Readiness Packet QA',
  'scripts/verify-source-of-truth.sh',
  'scripts/qa-roofer-dry-run-onboarding.sh "$SLUG"',
  'docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md',
  'docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md',
  'backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js',
  'backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js',
  'backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js',
  'PASS: dry-run onboarding workspace is ready for founder/operator manual review.',
  'HOLD: dry-run onboarding workspace needs correction before review.',
  'BLOCKED: production activation, data mutation, notification, route, credential, or approval risk was found.',
  'PROCEED TO MANUAL SETUP PLANNING',
  'HOLD FOR MISSING INFORMATION',
  'BLOCKED BY SAFETY RISK',
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'SUPABASE_WRITES=false',
  'PUBLIC_ROUTE_ACTIVATION=false',
  'Production activation remains disabled.',
  'Do not activate production.',
  'Do not send live SMS.',
  'Do not mutate Supabase.',
  'Do not notify contractors or homeowners.',
  'No secrets are exposed.',
  'production activation disabled',
].forEach((expected) => {
  assertIncludes(wrapperPath, expected);
});

[
  'Roofer Dry-Run First Roofer Readiness Packet QA',
  'scripts/qa-first-roofer-readiness-packet.sh',
  'Roofer dry-run onboarding QA wrapper',
  'Operator acceptance checklist',
  'First roofer setup packet',
  'Required planning docs',
  'Required verifiers',
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'SUPABASE_WRITES=false',
  'PUBLIC_ROUTE_ACTIVATION=false',
  'Production activation remains disabled.',
  'No secrets are exposed.',
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
  [wrapperPath, docPath].forEach((relativePath) => {
    if (read(relativePath).includes(forbidden)) {
      throw new Error(`Forbidden phrase found in ${relativePath}: ${forbidden}`);
    }
  });
});

execFileSync(path.join(repoRoot, wrapperPath), ['first-roofer-readiness-verifier'], {
  cwd: repoRoot,
  stdio: 'inherit',
});

assertIncludes(
  aggregatePath,
  'verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run First Roofer Readiness Packet QA'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run First Roofer Readiness Packet QA'
);

console.log('Roofer dry-run first roofer readiness packet QA verifier passed.');
