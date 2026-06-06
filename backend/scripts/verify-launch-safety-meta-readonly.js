#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const commands = [
  {
    name: 'Critical file format integrity',
    script: 'backend/scripts/verify-critical-file-format-integrity-readonly.js',
  },
  {
    name: 'Next safe build operating workflow',
    script: 'backend/scripts/verify-next-safe-build-operating-workflow-readonly.js',
  },
  {
    name: 'Operating workflow guard cross references',
    script: 'backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js',
  },
  {
    name: 'Source-of-truth process integrity',
    script: 'backend/scripts/verify-source-of-truth-commit-chain-readonly.js',
  },
  {
    name: 'Handoff integrity aggregate',
    script: 'backend/scripts/verify-handoff-integrity-readonly.js',
  },
  {
    name: 'Handoff integrity context',
    script: 'backend/scripts/verify-handoff-integrity-context-readonly.js',
  },
  {
    name: 'Next-chat latest milestones',
    script: 'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
  },
  {
    name: 'Next-chat context package',
    script: 'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
  },
  {
    name: 'Latest milestone self-check',
    script: 'backend/scripts/verify-latest-milestone-self-check-readonly.js',
  },
];

const failures = [];

for (const command of commands) {
  const result = spawnSync('node', [command.script], {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);

  if (result.status !== 0) {
    failures.push(`${command.name} failed with exit code ${result.status}`);
  }
}

if (failures.length > 0) {
  console.error('Launch safety meta verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Launch safety meta verification passed.');
