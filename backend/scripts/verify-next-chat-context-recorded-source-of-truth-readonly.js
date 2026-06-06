#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const selfCheckPath = path.join(repoRoot, 'backend/scripts/verify-latest-milestone-self-check-readonly.js');

function read(relativePath) {
  if (!fs.existsSync(relativePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(relativePath, 'utf8');
}

const context = read(contextPath);
const selfCheck = read(selfCheckPath);

const milestoneArrayMatch = selfCheck.match(/const requiredMilestones = \[\n([\s\S]*?)\n\];/);

if (!milestoneArrayMatch) {
  console.error('Recorded source-of-truth verification failed:');
  console.error('- Could not find requiredMilestones array in latest milestone self-check.');
  process.exit(1);
}

const firstMilestoneMatch = milestoneArrayMatch[1].match(/'([^']+)'/);

if (!firstMilestoneMatch) {
  console.error('Recorded source-of-truth verification failed:');
  console.error('- Could not find first required milestone in latest milestone self-check.');
  process.exit(1);
}

const latestRecordedMilestone = firstMilestoneMatch[1];

const requiredText = [
  latestRecordedMilestone,
  'Latest verified source-of-truth commit',
  'Recorded Source-of-Truth Baseline',
  'verify-next-chat-context-recorded-source-of-truth-readonly.js',
];

const missing = requiredText.filter((text) => !context.includes(text));

if (missing.length > 0) {
  console.error('Recorded source-of-truth verification failed:');
  for (const text of missing) {
    console.error(`- Missing required context text: ${text}`);
  }
  process.exit(1);
}

console.log(`Recorded source-of-truth verification passed for ${latestRecordedMilestone}.`);
