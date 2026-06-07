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

const slug = 'workspace-comparison-verifier';
const generatedDir = `.roofleadhq/onboarding/${slug}`;
const generatedPath = path.join(repoRoot, generatedDir);
const sampleDir = 'fixtures/roofer-dry-run-workspace/sample-roofer';

const requiredFiles = [
  'README.md',
  'intake.md',
  'safety-flags.env',
  'activation-flags.env',
  'workspace-metadata.env',
  'onboarding-checklist.md',
];

if (fs.existsSync(generatedPath)) {
  fs.rmSync(generatedPath, { recursive: true, force: true });
}

try {
  execFileSync(path.join(repoRoot, 'scripts/onboard-roofer.sh'), [slug], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  requiredFiles.forEach((file) => {
    read(`${sampleDir}/${file}`);
    read(`${generatedDir}/${file}`);
  });

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
    assertIncludes(`${sampleDir}/safety-flags.env`, flag);
    assertIncludes(`${sampleDir}/activation-flags.env`, flag);
    assertIncludes(`${sampleDir}/workspace-metadata.env`, flag);
    assertIncludes(`${generatedDir}/safety-flags.env`, flag);
    assertIncludes(`${generatedDir}/activation-flags.env`, flag);
    assertIncludes(`${generatedDir}/workspace-metadata.env`, flag);
  });

  [
    'Roofing company name',
    'Owner/operator name',
    'Primary phone',
    'Primary email',
    'Booking Preferences',
    'Lead Sources',
    'Manual Review',
  ].forEach((expected) => {
    assertIncludes(`${sampleDir}/intake.md`, expected);
    assertIncludes(`${generatedDir}/intake.md`, expected);
  });

  [
    'This workspace is planning-only.',
    'Do not activate production.',
    'Do not send live SMS.',
    'Do not mutate Supabase.',
  ].forEach((expected) => {
    assertIncludes(`${sampleDir}/README.md`, expected);
    assertIncludes(`${generatedDir}/README.md`, expected);
  });

  assertIncludes(`${generatedDir}/workspace-metadata.env`, `ROOFER_SLUG=${slug}`);
  assertIncludes(`${generatedDir}/workspace-metadata.env`, 'WORKSPACE_MODE=dry-run');
  assertIncludes(`${sampleDir}/workspace-metadata.env`, 'ROOFER_SLUG=sample-roofer');
  assertIncludes(`${sampleDir}/workspace-metadata.env`, 'WORKSPACE_MODE=dry-run');

  assertIncludes(`${generatedDir}/onboarding-checklist.md`, 'Production activation remains disabled');
  assertIncludes(`${sampleDir}/onboarding-checklist.md`, 'Production activation remains disabled');
} finally {
  if (fs.existsSync(generatedPath)) {
    fs.rmSync(generatedPath, { recursive: true, force: true });
  }
}

if (fs.existsSync(generatedPath)) {
  throw new Error(`Expected comparison verifier to clean up workspace: ${generatedDir}`);
}

[
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
].forEach(read);

assertIncludes(
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js'
);
assertIncludes(
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js'
);
assertIncludes(
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'Roofer Dry-Run Workspace Comparison'
);
assertIncludes(
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
  'Roofer Dry-Run Workspace Comparison'
);

console.log('Roofer dry-run workspace comparison verifier passed.');
