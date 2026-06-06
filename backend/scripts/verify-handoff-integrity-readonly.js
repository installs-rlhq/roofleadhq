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
    name: 'Next-chat context package',
    script: 'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
  },
  {
    name: 'Next-chat latest milestones',
    script: 'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
  },
  {
    name: 'Handoff integrity context',
    script: 'backend/scripts/verify-handoff-integrity-context-readonly.js',
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
  console.error('Handoff integrity verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Handoff integrity verification passed.');
