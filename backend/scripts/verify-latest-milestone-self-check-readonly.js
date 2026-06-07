#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const latestMilestones = fs.readFileSync(
  path.join(repoRoot, 'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js'),
  'utf8',
);

const context = fs.readFileSync(
  path.join(repoRoot, 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md'),
  'utf8',
);

const verifierIndex = fs.readFileSync(
  path.join(repoRoot, 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md'),
  'utf8',
);

const guide = fs.readFileSync(
  path.join(repoRoot, 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md'),
  'utf8',
);

const requiredMilestones = [
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
  '7fc4f1a docs(pilot): add safe build context snapshot',
  'd74f311 test(pilot): guard recorded source of truth baseline',
  '162bb6b test(pilot): add operating workflow guard suite',
  '9059c67 test(pilot): guard operating workflow cross references',
  '6375675 docs(pilot): document operating workflow guard',
  '700b5ab test(pilot): guard next safe build operating workflow',
  'bc71ad1 test(pilot): record latest self check context milestone',
  '17a300f test(pilot): require latest milestone self check context',
  '3c03c72 test(pilot): add latest milestone self check',
  'badb124 test(pilot): record launch safety source milestone',
  '574a822 test(pilot): require launch safety in source verifier',
  '3ceb537 test(pilot): record launch safety meta milestone',
  '693aa0d test(pilot): add launch safety meta verifier',
  '5977e78 test(pilot): record stabilized context verifier milestone',
  'c1acc89 test(pilot): require stabilized source verifier context',
  '3789630 test(pilot): record stabilized source verifier milestone',
  'befef91 test(pilot): stabilize source of truth verifier',
];

const requiredSafetyText = [
  'NEXT_CHAT_CONTEXT_PACKAGE_SAFE_BUILD_SNAPSHOT.md',
  'verify-next-chat-context-safe-build-snapshot-readonly.js',
  'Next-Chat Safe Build Snapshot',
  'Next-Chat Recorded Source-of-Truth Baseline',
  'verify-next-chat-context-recorded-source-of-truth-readonly.js',
  'Operating Workflow Guard Suite',
  'verify-operating-workflow-guard-suite-readonly.js',
  'Operating Workflow Guard Cross-Reference',
  'verify-operating-workflow-guard-cross-references-readonly.js',
  'Operating Workflow Guard',
  'verify-next-safe-build-operating-workflow-readonly.js',
  'demo-ready with live automation disabled',
  'No live Vapi webhook route',
  'No Vapi-to-Supabase writes',
  'No Vapi-to-SMS/Twilio sends',
  'No Vapi-to-Calendar booking activation',
];

const failures = [];

for (const milestone of requiredMilestones) {
  if (!latestMilestones.includes(milestone)) {
    failures.push(`Latest milestones verifier missing milestone: ${milestone}`);
  }

  if (!context.includes(milestone)) {
    failures.push(`Next-chat context package missing milestone: ${milestone}`);
  }
}

for (const text of requiredSafetyText) {
  if (!context.includes(text)) {
    failures.push(`Next-chat context package missing safety text: ${text}`);
  }
}

for (const [name, content] of [
  ['first paid launch verifier index', verifierIndex],
  ['business buildout daily guide', guide],
]) {
  if (!content.includes('verify-latest-milestone-self-check-readonly.js')) {
    failures.push(`${name} missing latest milestone self-check verifier reference`);
  }
}

if (context.includes('5 qualified appointments in 7 days')) {
  failures.push('Next-chat context package contains forbidden legacy guarantee text');
}

if (failures.length > 0) {
  console.error('Latest milestone self-check verification failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('Latest milestone self-check verification passed.');
