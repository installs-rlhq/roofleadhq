#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const requiredText = [
  '6048d21 test(pilot): guard critical file format integrity',
  '9147664 test(pilot): guard critical file context package',
  '693aa0d test(pilot): add launch safety meta verifier',
  'c1acc89 test(pilot): require stabilized source verifier context',
  'befef91 test(pilot): stabilize source of truth verifier',
  '93bed54 test(pilot): include handoff context in aggregate',
  'backend/scripts/verify-critical-file-format-integrity-readonly.js',
  'Critical file format integrity',
  'literal backslash-n artifacts',
  'collapsed one-line JS verifier files',
  'missing Node shebang',
  'suspiciously low line counts',
  'demo-ready with live automation disabled',
  'Retell remains deprecated/disabled',
  'No live Vapi webhook route',
  'No Vapi-to-Supabase writes',
  'No Vapi-to-SMS/Twilio sends',
  'No Vapi-to-Calendar booking activation',
  'No Resend/Lindy production activation from Vapi flows',
  'No route/cron/scheduler/dispatcher activation',
];

const failures = [];

for (const text of requiredText) {
  if (!context.includes(text)) {
    failures.push(`Missing required context text: ${text}`);
  }
}

if (context.includes('7-day pilot') || context.includes('5 qualified appointments in 7 days')) {
  failures.push('Legacy pilot/guarantee language found in next-chat context package');
}

if (failures.length > 0) {
  console.error('Next-chat latest milestones verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Next-chat latest milestones verification passed.');
