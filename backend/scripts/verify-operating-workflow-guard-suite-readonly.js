#!/usr/bin/env node

const { spawnSync } = require('child_process');

const commands = [
  {
    name: 'Next safe build operating workflow',
    script: 'backend/scripts/verify-next-safe-build-operating-workflow-readonly.js',
  },
  {
    name: 'Operating workflow guard cross references',
    script: 'backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js',
  },
  {
    name: 'Next-chat latest milestones',
    script: 'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
  },
  {
    name: 'Latest milestone self-check',
    script: 'backend/scripts/verify-latest-milestone-self-check-readonly.js',
  },
  {
    name: 'Launch safety meta',
    script: 'backend/scripts/verify-launch-safety-meta-readonly.js',
  },
];

const failures = [];

for (const command of commands) {
  const result = spawnSync('node', [command.script], {
    stdio: 'inherit',
    shell: false,
  });

  if (result.status !== 0) {
    failures.push(`${command.name} failed with exit code ${result.status}`);
  }
}

if (failures.length > 0) {
  console.error('Operating workflow guard suite verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Operating workflow guard suite verification passed.');
