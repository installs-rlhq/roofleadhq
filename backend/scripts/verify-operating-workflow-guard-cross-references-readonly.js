#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const files = {
  context: 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  verifierIndex: 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  businessGuide: 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
  launchSafetyMeta: 'backend/scripts/verify-launch-safety-meta-readonly.js',
  operatingWorkflowGuard: 'backend/scripts/verify-next-safe-build-operating-workflow-readonly.js',
};

function read(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }

  return fs.readFileSync(absolutePath, 'utf8');
}

function requireIncludes(label, content, expected) {
  if (!content.includes(expected)) {
    throw new Error(`${label} missing required text: ${expected}`);
  }
}

const contentByFile = Object.fromEntries(
  Object.entries(files).map(([label, relativePath]) => [label, read(relativePath)]),
);

const sharedRequiredText = [
  'verify-next-safe-build-operating-workflow-readonly.js',
  'Operating Workflow Guard',
];

for (const [label, content] of [
  ['next-chat context', contentByFile.context],
  ['first paid launch verifier index', contentByFile.verifierIndex],
  ['business buildout daily guide', contentByFile.businessGuide],
]) {
  for (const expected of sharedRequiredText) {
    requireIncludes(label, content, expected);
  }
}

requireIncludes(
  'launch safety meta verifier',
  contentByFile.launchSafetyMeta,
  'backend/scripts/verify-next-safe-build-operating-workflow-readonly.js',
);

requireIncludes(
  'launch safety meta verifier',
  contentByFile.launchSafetyMeta,
  'Next safe build operating workflow',
);

for (const expected of [
  'Terminal 1',
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'OpenClaw summaries alone are not trusted',
  'staged diff review',
  'Safe verified doc/test/read-only verifier changes may be committed and pushed without repeated approval',
  'Safety posture remains demo-ready with live automation disabled',
]) {
  requireIncludes('operating workflow guard verifier', contentByFile.operatingWorkflowGuard, expected);
}

console.log('Operating workflow guard cross-reference verification passed.');
