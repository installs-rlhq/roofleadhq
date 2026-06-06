#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const expectedCommits = [
  '8ce410c test(pilot): record handoff aggregate milestone',
  '93bed54 test(pilot): include handoff context in aggregate',
  '133e5c0 test(pilot): guard handoff integrity context',
  '5286ef3 test(pilot): require handoff integrity context',
  '61e13bb test(pilot): add handoff integrity aggregate',
  '123d667 test(pilot): protect latest milestones verifier integrity',
  '61c09b5 test(pilot): guard latest context milestones',
];

const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const logResult = spawnSync('git', ['log', '--oneline', '-8'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const statusResult = spawnSync('git', ['status', '--short'], {
  cwd: repoRoot,
  encoding: 'utf8',
});

const failures = [];

if (logResult.status !== 0) {
  failures.push('Could not read git log --oneline -8');
} else {
  const log = logResult.stdout;

  for (const expected of expectedCommits) {
    if (!log.includes(expected)) {
      failures.push(`Missing expected commit in git log: ${expected}`);
    }
  }
}

if (statusResult.status !== 0) {
  failures.push('Could not read git status --short');
}

for (const expected of expectedCommits.slice(0, 3)) {
  if (!context.includes(expected)) {
    failures.push(`Missing expected source-of-truth context entry: ${expected}`);
  }
}

if (!context.includes('demo-ready with live automation disabled')) {
  failures.push('Missing demo-ready with live automation disabled safety posture');
}

if (failures.length > 0) {
  console.error('Source-of-truth commit chain verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Source-of-truth commit chain verification passed.');
