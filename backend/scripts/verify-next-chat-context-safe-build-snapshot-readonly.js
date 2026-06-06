#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const snapshotPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md');

if (!fs.existsSync(snapshotPath)) {
  console.error('Safe build snapshot verification failed:');
  console.error('- Missing docs/NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md');
  process.exit(1);
}

const snapshot = fs.readFileSync(snapshotPath, 'utf8');

const requiredText = [
  '129a18d docs(pilot): refresh safe build snapshot source of truth',
  'b978eab test(pilot): record source of truth baseline guard milestone',
  'd74f311 test(pilot): guard recorded source of truth baseline',
  '919eee6 test(pilot): record operating workflow guard suite milestone',
  '162bb6b test(pilot): add operating workflow guard suite',
  '9059c67 test(pilot): guard operating workflow cross references',
  '700b5ab test(pilot): guard next safe build operating workflow',
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'OpenClaw summaries alone are not trusted',
  'verify-next-safe-build-operating-workflow-readonly.js',
  'verify-operating-workflow-guard-cross-references-readonly.js',
  'verify-operating-workflow-guard-suite-readonly.js',
  'verify-next-chat-context-recorded-source-of-truth-readonly.js',
  'verify-next-chat-context-latest-milestones-readonly.js',
  'verify-latest-milestone-self-check-readonly.js',
  'verify-launch-safety-meta-readonly.js',
  'verify-first-paid-pilot-readiness-readonly.js',
  'git diff --stat',
  'git diff',
  'git diff --cached --stat',
  'git diff --cached --name-status',
  'npm --prefix backend run build',
  'Safe to commit/push without repeated confirmation',
  'Require explicit approval before',
  'live SMS/Twilio sends',
  'production Supabase writes',
  'Vapi production webhook ingestion',
  'Safety remains demo-ready with live automation disabled',
  'Founder-Led Launch Program',
  'book inspections',
  'book appointments',
];

const missing = requiredText.filter((text) => !snapshot.includes(text));

if (missing.length > 0) {
  console.error('Safe build snapshot verification failed:');
  for (const text of missing) {
    console.error(`- Missing required text: ${text}`);
  }
  process.exit(1);
}

console.log('Safe build snapshot verification passed.');
