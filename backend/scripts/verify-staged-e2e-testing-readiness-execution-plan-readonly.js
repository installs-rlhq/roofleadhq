#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const docPath = path.join(root, 'docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md');
const wrapperPath = path.join(root, 'scripts/run-staged-e2e-testing-readiness-dry-run.sh');

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) fail(`Missing required file: ${path.relative(root, filePath)}`);
  return fs.readFileSync(filePath, 'utf8');
}

const doc = read(docPath);
const wrapper = read(wrapperPath);

const requiredDocPhrases = [
  'Staged End-to-End Testing Readiness + Execution Plan',
  'demo_ready_with_live_automation_disabled',
  'Fixture/sample lead intake',
  'AI response generation',
  'AI follow-up generation',
  'lead qualification',
  'missed-lead recovery path',
  'appointment/inspection readiness',
  'roofer calendar handoff simulation',
  'homeowner/roofer communication review',
  'reporting snapshot',
  'trial/payment language handling',
  'operator visibility and review',
  'PASS/HOLD/BLOCKED',
  'Stage 1 - Fixture dry-run',
  'Stage 2 - Local/test-mode full-flow',
  'Stage 3 - Sandbox integration testing',
  'Stage 4 - Founder-approved limited live test',
  'This stage is not approved by this packet.',
  'No live sends occurred.',
  'No production writes occurred.',
  'fixture/sample leads only',
  'No external sends',
  'No production Supabase writes',
  'Next implementation step after this packet'
];

for (const phrase of requiredDocPhrases) {
  if (!doc.includes(phrase)) fail(`Document missing required phrase: ${phrase}`);
}

const forbiddenPatterns = [
  /enable live sms/i,
  /send real sms/i,
  /send live email/i,
  /write to production supabase/i,
  /public route activation approved/i,
  /calendar booking automation approved/i,
  /payment automation approved/i,
  /guaranteed jobs/i,
  /guaranteed revenue/i,
  /booked jobs/i,
  /book jobs/i
];

for (const pattern of forbiddenPatterns) {
  if (pattern.test(doc)) fail(`Document contains unsafe or forbidden language: ${pattern}`);
}

const requiredWrapperPhrases = [
  'verify-staged-e2e-testing-readiness-execution-plan-readonly.js',
  'DRY RUN ONLY',
  'No live SMS',
  'No external sends',
  'No production writes'
];

for (const phrase of requiredWrapperPhrases) {
  if (!wrapper.includes(phrase)) fail(`Wrapper missing required phrase: ${phrase}`);
}


const wiringTargets = [
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js'
];

const wiringNeedles = [
  'STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md',
  'run-staged-e2e-testing-readiness-dry-run.sh',
  'verify-staged-e2e-testing-readiness-execution-plan-readonly.js'
];

for (const target of wiringTargets) {
  const content = read(path.join(root, target));
  for (const needle of wiringNeedles) {
    if (!content.includes(needle)) fail(`Wiring target ${target} missing ${needle}`);
  }
}

console.log('PASS: staged E2E testing readiness execution plan is present, safe, and aligned');
