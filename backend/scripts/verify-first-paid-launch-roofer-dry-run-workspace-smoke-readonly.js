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

const slug = 'workspace-smoke-verifier';
const workspaceRelative = `.roofleadhq/onboarding/${slug}`;
const workspacePath = path.join(repoRoot, workspaceRelative);

if (fs.existsSync(workspacePath)) {
  fs.rmSync(workspacePath, { recursive: true, force: true });
}

try {
  execFileSync(path.join(repoRoot, 'scripts/onboard-roofer.sh'), [slug], {
    cwd: repoRoot,
    stdio: 'inherit',
  });

  [
    `${workspaceRelative}/README.md`,
    `${workspaceRelative}/intake.md`,
    `${workspaceRelative}/safety-flags.env`,
    `${workspaceRelative}/activation-flags.env`,
    `${workspaceRelative}/workspace-metadata.env`,
    `${workspaceRelative}/onboarding-checklist.md`,
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
  ].forEach((flag) => {
    assertIncludes(`${workspaceRelative}/safety-flags.env`, flag);
    assertIncludes(`${workspaceRelative}/activation-flags.env`, flag);
    assertIncludes(`${workspaceRelative}/workspace-metadata.env`, flag);
  });

  [
    'Roofing company name',
    'Owner/operator name',
    'Primary phone',
    'Primary email',
    'Booking Preferences',
    'Lead Sources',
    'Manual Review',
  ].forEach((expected) => assertIncludes(`${workspaceRelative}/intake.md`, expected));

  [
    'This workspace is planning-only.',
    'Do not activate production.',
    'Do not send live SMS.',
    'Do not mutate Supabase.',
    'does not authorize live SMS sends',
  ].forEach((expected) => assertIncludes(`${workspaceRelative}/README.md`, expected));

  assertIncludes(`${workspaceRelative}/workspace-metadata.env`, `ROOFER_SLUG=${slug}`);
  assertIncludes(`${workspaceRelative}/workspace-metadata.env`, 'WORKSPACE_MODE=dry-run');
  assertIncludes(`${workspaceRelative}/onboarding-checklist.md`, 'Production activation remains disabled');
} finally {
  if (fs.existsSync(workspacePath)) {
    fs.rmSync(workspacePath, { recursive: true, force: true });
  }
}

if (fs.existsSync(workspacePath)) {
  throw new Error(`Expected smoke verifier to clean up workspace: ${workspaceRelative}`);
}

console.log('Roofer dry-run workspace smoke verifier passed.');
