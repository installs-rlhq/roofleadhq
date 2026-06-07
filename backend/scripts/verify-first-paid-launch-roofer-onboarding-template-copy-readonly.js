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

const script = 'scripts/onboard-roofer.sh';
const aggregate = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const index = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const context = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const guide = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

[
  script,
  aggregate,
  index,
  context,
  guide,
  'templates/roofer-dry-run-workspace/README.md',
  'templates/roofer-dry-run-workspace/intake.md',
  'templates/roofer-dry-run-workspace/safety-flags.env',
].forEach(read);

[
  'TEMPLATE_DIR="templates/roofer-dry-run-workspace"',
  'cp "${TEMPLATE_DIR}/README.md" "${BASE_DIR}/README.md"',
  'cp "${TEMPLATE_DIR}/intake.md" "${BASE_DIR}/intake.md"',
  'cp "${TEMPLATE_DIR}/safety-flags.env" "${BASE_DIR}/safety-flags.env"',
  'cp "${TEMPLATE_DIR}/safety-flags.env" "${BASE_DIR}/activation-flags.env"',
  'workspace-metadata.env',
  'WORKSPACE_MODE=dry-run',
  'Do not activate production',
  'Do not send live SMS',
  'Do not mutate Supabase',
].forEach((expected) => assertIncludes(script, expected));

assertIncludes(aggregate, 'verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js');
assertIncludes(index, 'verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js');
assertIncludes(context, 'Roofer Onboarding Template Copy');
assertIncludes(guide, 'Roofer Onboarding Template Copy');

const testSlug = 'template-copy-verifier';
const workspace = path.join(repoRoot, '.roofleadhq/onboarding', testSlug);

try {
  if (fs.existsSync(workspace)) {
    fs.rmSync(workspace, { recursive: true, force: true });
  }

  execFileSync(path.join(repoRoot, script), [testSlug], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  [
    '.roofleadhq/onboarding/template-copy-verifier/README.md',
    '.roofleadhq/onboarding/template-copy-verifier/intake.md',
    '.roofleadhq/onboarding/template-copy-verifier/safety-flags.env',
    '.roofleadhq/onboarding/template-copy-verifier/activation-flags.env',
    '.roofleadhq/onboarding/template-copy-verifier/workspace-metadata.env',
    '.roofleadhq/onboarding/template-copy-verifier/onboarding-checklist.md',
  ].forEach(read);

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
    assertIncludes('.roofleadhq/onboarding/template-copy-verifier/safety-flags.env', expected);
    assertIncludes('.roofleadhq/onboarding/template-copy-verifier/activation-flags.env', expected);
    assertIncludes('.roofleadhq/onboarding/template-copy-verifier/workspace-metadata.env', expected);
  });

  assertIncludes('.roofleadhq/onboarding/template-copy-verifier/intake.md', 'Roofing company name');
  assertIncludes('.roofleadhq/onboarding/template-copy-verifier/onboarding-checklist.md', 'Production activation remains disabled');
} finally {
  if (fs.existsSync(workspace)) {
    fs.rmSync(workspace, { recursive: true, force: true });
  }
}

console.log('Roofer onboarding template copy verifier passed.');
