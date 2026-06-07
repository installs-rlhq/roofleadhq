#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');
const checklistPath = 'docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md';
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

read(checklistPath);

[
  'Roofer Dry-Run Operator Acceptance Checklist',
  'planning-only',
  'scripts/qa-roofer-dry-run-onboarding.sh <roofer-slug>',
  'PASS: dry-run onboarding workspace is ready for founder/operator manual review.',
  'HOLD: dry-run onboarding workspace needs correction before review.',
  'BLOCKED: production activation, data mutation, notification, route, credential, or approval risk was found.',
  'README.md',
  'intake.md',
  'safety-flags.env',
  'activation-flags.env',
  'workspace-metadata.env',
  'onboarding-checklist.md',
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
  'Emergency leak handling preference',
  'Storm damage and insurance claim handling preference',
  'Appointment booking preference',
  'Calendar readiness is marked as dry-run only or not ready',
  'Lead source channels',
  'Missed-call recovery preference',
  'Manual review preference',
  'Reporting preference',
  'No secrets are exposed',
  'No live SMS, calls, emails, notifications, routes, cron, scheduler, dispatcher, or Supabase writes are requested',
  'Production activation remains disabled.',
  'Do not activate production.',
  'Do not send live SMS.',
  'Do not mutate Supabase.',
  'Do not notify contractors or homeowners.',
].forEach((expected) => {
  assertIncludes(checklistPath, expected);
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
  const content = read(checklistPath);
  if (content.includes(forbidden)) {
    throw new Error(`Forbidden phrase found in ${checklistPath}: ${forbidden}`);
  }
});

assertIncludes(
  aggregatePath,
  'verify-roofer-dry-run-operator-acceptance-checklist-readonly.js'
);

assertIncludes(
  indexPath,
  'verify-roofer-dry-run-operator-acceptance-checklist-readonly.js'
);

assertIncludes(
  firstPaidContextPath,
  'Roofer Dry-Run Operator Acceptance Checklist'
);

assertIncludes(
  rooferContextPath,
  'Roofer Dry-Run Operator Acceptance Checklist'
);

console.log('Roofer dry-run operator acceptance checklist verifier passed.');
