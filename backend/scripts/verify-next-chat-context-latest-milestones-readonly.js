#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const contextPath = path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const context = fs.readFileSync(contextPath, 'utf8');

const requiredText = [
  'e7b3d8b test(pilot): add first roofer readiness packet qa',
  '935b2db test(pilot): add first roofer dry-run setup packet',
  '9def760 test(pilot): add roofer dry-run operator acceptance checklist',
  '71b25ec test(pilot): add roofer dry-run onboarding qa wrapper',
  '2050309 docs(pilot): refresh roofer dry-run onboarding context package',
  '6a01421 test(pilot): wire roofer onboarding runbook into readiness',
  '346aecd docs(pilot): add roofer dry-run onboarding operator runbook',
  '65af4bf docs(pilot): add roofer dry-run onboarding context package',
  '933e4f7 test(pilot): add roofer dry-run workspace comparison',
  '4f80990 test(pilot): add roofer dry-run workspace sample packet',
  '454080a test(pilot): add roofer dry-run workspace smoke packet',
  '076029e test(pilot): fix roofer onboarding template copy cleanup',
  'caa4e2f test(pilot): add roofer dry-run workspace template packet',
  'c87ccf6 test(pilot): fix roofer dry-run intake verifier language guard',
  '05248c8 test(pilot): fix production gate readiness wiring',
  'b9480fd test(pilot): add production gate check script packet',
  '3093835 test(pilot): record roofer onboarding script packet milestone',
  'c870c62 test(pilot): add roofer onboarding script packet',
  '130f337 test(pilot): add automation foundation packet',
  'b135b14 test(pilot): add voice path cleanup packet',
  'e417093 test(pilot): add stopped lead handling packet',
  '642f0da test(pilot): add schema blockers packet',
  '2266b3d test(pilot): add manual review queue packet',
  '295fe51 test(pilot): add first paid missing information recovery packet',
  'ab2e16a test(pilot): add first paid lead source quality packet',
  '4e390f1 test(pilot): add first paid appointment outcome packet',
  '29b3662 test(pilot): add first paid contractor notification packet',
  '4e8520f test(pilot): add first paid emergency escalation packet',
  '992a1ff test(pilot): add first paid reporting preferences packet',
  '65250dd test(pilot): add first paid follow up cadence packet',
  '8939e98 test(pilot): add first paid booking preferences packet',
  '2383450 test(pilot): add first paid customer intake packet',
  'ac12597 test(pilot): add first paid launch day one checklist',
  '129a18d docs(pilot): refresh safe build snapshot source of truth',
  'Latest Source-of-Truth Milestone — Safe Build Snapshot Source-of-Truth Refresh',
  'Refresh the safe build snapshot source-of-truth confirmation from `d953701` to `129a18d`',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md',
  '7fc4f1a docs(pilot): add safe build context snapshot',
  'Latest Source-of-Truth Milestone — Safe Build Context Snapshot',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md',
  'backend/scripts/verify-next-chat-context-safe-build-snapshot-readonly.js',
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
