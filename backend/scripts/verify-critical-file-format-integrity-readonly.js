#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const criticalJsFiles = [
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
  'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
  'backend/scripts/verify-handoff-integrity-readonly.js',
  'backend/scripts/verify-vapi-aggregate-coverage-readonly.js',
  'backend/scripts/verify-vapi-guard-layer-readonly.js',
  'backend/scripts/verify-vapi-scenario-registry-readonly.js',
  'backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js',
  'backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js',
];

const criticalDocFiles = [
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
];

const failures = [];

function readFile(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    failures.push(`${relativePath}: missing file`);
    return null;
  }

  return fs.readFileSync(absolutePath, 'utf8');
}

function assertNoLiteralBackslashN(relativePath, content) {
  if (content.includes('\\\\n')) {
    failures.push(`${relativePath}: contains literal backslash-n artifact`);
  }
}

function assertMinimumLines(relativePath, content, minimumLines) {
  const lineCount = content.split(/\r?\n/).length;

  if (lineCount < minimumLines) {
    failures.push(`${relativePath}: suspicious line count ${lineCount}; expected at least ${minimumLines}`);
  }
}

function assertNodeShebang(relativePath, content) {
  if (!content.startsWith('#!/usr/bin/env node')) {
    failures.push(`${relativePath}: missing node shebang`);
  }
}

for (const relativePath of criticalJsFiles) {
  const content = readFile(relativePath);
  if (!content) continue;

  assertNoLiteralBackslashN(relativePath, content);
  assertMinimumLines(relativePath, content, 20);
  assertNodeShebang(relativePath, content);
}

for (const relativePath of criticalDocFiles) {
  const content = readFile(relativePath);
  if (!content) continue;

  assertNoLiteralBackslashN(relativePath, content);
  assertMinimumLines(relativePath, content, 20);
}

if (failures.length > 0) {
  console.error('Critical file format integrity verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Critical file format integrity verification passed.');
