#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const requiredText = [
  '5286ef3 test(pilot): require handoff integrity context',
  '61e13bb test(pilot): add handoff integrity aggregate',
  'backend/scripts/verify-handoff-integrity-readonly.js',
  'handoff integrity aggregate',
  'backend/scripts/verify-critical-file-format-integrity-readonly.js',
  'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
  'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'source-of-truth process checks',
  'HEAD and origin/main alignment',
  'Terminal 1 process alignment',
  'befef91 test(pilot): stabilize source of truth verifier',
  '3789630 test(pilot): record stabilized source verifier milestone',
  'demo-ready with live automation disabled',
];

const forbiddenText = [
  '5 qualified appointments in 7 days',
  'guaranteed revenue',
  'guaranteed jobs',
];

const failures = [];

for (const text of requiredText) {
  if (!context.includes(text)) {
    failures.push(`Missing required handoff context text: ${text}`);
  }
}

for (const text of forbiddenText) {
  if (context.includes(text)) {
    failures.push(`Forbidden legacy/guarantee text found: ${text}`);
  }
}

if (failures.length > 0) {
  console.error('Handoff integrity context verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Handoff integrity context verification passed.');
