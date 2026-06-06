#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const requiredContextText = [
  '/root/roofleadhq',
  'Terminal 1 Source-of-Truth Rule',
  'git fetch origin main',
  'git status --short',
  'git log --oneline -8',
  'HEAD',
  'origin/main',
  'demo-ready with live automation disabled',
  'backend/scripts/verify-handoff-integrity-readonly.js',
  'backend/scripts/verify-source-of-truth-commit-chain-readonly.js',
];

const forbiddenText = [
  '5 qualified appointments in 7 days',
  'guaranteed revenue',
  'guaranteed jobs',
];

const failures = [];

const logResult = spawnSync('git', ['log', '--oneline', '-8'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const statusResult = spawnSync('git', ['status', '--short'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const headResult = spawnSync('git', ['rev-parse', 'HEAD'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const originResult = spawnSync('git', ['rev-parse', 'origin/main'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

if (logResult.status !== 0 || !logResult.stdout.trim()) {
  failures.push('Could not read non-empty git log --oneline -8');
}

if (statusResult.status !== 0) {
  failures.push('Could not read git status --short');
}

if (headResult.status !== 0) {
  failures.push('Could not read HEAD revision');
}

if (originResult.status !== 0) {
  failures.push('Could not read origin/main revision');
}

if (
  headResult.status === 0 &&
  originResult.status === 0 &&
  headResult.stdout.trim() !== originResult.stdout.trim()
) {
  failures.push('HEAD does not match origin/main');
}

for (const text of requiredContextText) {
  if (!context.includes(text)) {
    failures.push(`Missing required source-of-truth context text: ${text}`);
  }
}

for (const text of forbiddenText) {
  if (context.includes(text)) {
    failures.push(`Forbidden legacy/guarantee text found: ${text}`);
  }
}

if (failures.length > 0) {
  console.error('Source-of-truth commit chain verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Source-of-truth commit chain verification passed.');
