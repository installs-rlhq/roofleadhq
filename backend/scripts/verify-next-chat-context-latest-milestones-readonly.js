#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const requiredText = [
  'd74f311 test(pilot): guard recorded source of truth baseline',
  'Latest Source-of-Truth Milestone — Recorded Source-of-Truth Baseline Guard',
  'backend/scripts/verify-next-chat-context-recorded-source-of-truth-readonly.js',
  'recorded source-of-truth baseline drift guard',
  '162bb6b test(pilot): add operating workflow guard suite',
  'Latest Source-of-Truth Milestone — Operating Workflow Guard Suite',
  'backend/scripts/verify-operating-workflow-guard-suite-readonly.js',
  'standalone, non-recursive operating workflow guard suite',
  '9059c67 test(pilot): guard operating workflow cross references',
  'Latest Source-of-Truth Milestone — Operating Workflow Guard Cross References',
  'backend/scripts/verify-operating-workflow-guard-cross-references-readonly.js',
  'Operating Workflow Guard Cross References',
  '6375675 docs(pilot): document operating workflow guard',
  'Latest Source-of-Truth Milestone — Operating Workflow Guard Discoverability',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
  'Operating Workflow Guard Reference',
  '700b5ab test(pilot): guard next safe build operating workflow',
  'backend/scripts/verify-next-safe-build-operating-workflow-readonly.js',
  'Latest Source-of-Truth Milestone — Next Safe Build Operating Workflow Guard',
  'OpenClaw summaries alone are not trusted',
  'staged diff review',
  'bc71ad1 test(pilot): record latest self check context milestone',
  '17a300f test(pilot): require latest milestone self check context',
  '3c03c72 test(pilot): add latest milestone self check',
  'badb124 test(pilot): record launch safety source milestone',
  '574a822 test(pilot): require launch safety in source verifier',
  '3ceb537 test(pilot): record launch safety meta milestone',
  '5977e78 test(pilot): record stabilized context verifier milestone',
  '3789630 test(pilot): record stabilized source verifier milestone',
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
