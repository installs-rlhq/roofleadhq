#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md');

if (!fs.existsSync(contextPath)) {
  throw new Error('Missing roofer dry-run onboarding context package');
}

const context = fs.readFileSync(contextPath, 'utf8');

[
  '6f224b4 test(pilot): record roofer dry-run workspace comparison milestone',
  '933e4f7 test(pilot): add roofer dry-run workspace comparison',
  'bb273d1 test(pilot): record roofer dry-run workspace sample milestone',
  '4f80990 test(pilot): add roofer dry-run workspace sample packet',
  'scripts/onboard-roofer.sh',
  'fixtures/roofer-dry-run-workspace/sample-roofer/',
  'verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js',
  'scripts/verify-source-of-truth.sh',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh',
  'npm --prefix backend run build',
  'Do not activate production',
  'Do not send live SMS',
  'Do not mutate Supabase',
  'Do not notify contractors or homeowners',
  'Roofer Dry-Run Onboarding Operator Runbook',
].forEach((expected) => {
  if (!context.includes(expected)) {
    throw new Error(`Missing expected context text: ${expected}`);
  }
});

[
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
].forEach((forbidden) => {
  if (context.includes(forbidden)) {
    throw new Error(`Forbidden phrase found: ${forbidden}`);
  }
});

console.log('Next chat roofer dry-run onboarding context package verifier passed.');
