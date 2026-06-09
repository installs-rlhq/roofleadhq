#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const runbookDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md');
const wrapperPath = path.join(repoRoot, 'scripts', 'run-first-roofer-manual-setup-session-runbook-dry-run.sh');
const verifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-session-runbook-readonly.js');

const readinessDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md');
const readinessWrapperPath = path.join(repoRoot, 'scripts', 'check-first-roofer-manual-setup-execution-readiness-dry-run.sh');
const readinessVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-execution-readiness-readonly.js');

const goNoGoDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FINAL_GO_NO_GO.md');
const goNoGoWrapperPath = path.join(repoRoot, 'scripts', 'review-first-roofer-manual-setup-final-go-no-go-dry-run.sh');
const goNoGoVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-final-go-no-go-readonly.js');

const qaDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md');
const qaWrapperPath = path.join(repoRoot, 'scripts', 'qa-first-roofer-manual-setup-founder-approval-evidence.sh');
const qaVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-qa-readonly.js');

const evidenceDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md');
const evidenceWrapperPath = path.join(repoRoot, 'scripts', 'collect-first-roofer-manual-setup-founder-approval-evidence-dry-run.sh');
const evidenceVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js');

const founderApprovalDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md');
const founderApprovalWrapperPath = path.join(repoRoot, 'scripts', 'approve-first-roofer-manual-setup-founder-dry-run.sh');
const founderApprovalVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js');

const operatorAcceptanceDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md');
const operatorAcceptanceWrapperPath = path.join(repoRoot, 'scripts', 'accept-first-roofer-manual-setup-operator-dry-run.sh');
const operatorAcceptanceVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js');

const requiredRunbookStrings = [
  'MANUAL SETUP SESSION RUNBOOK PASS',
  'MANUAL SETUP SESSION RUNBOOK HOLD',
  'MANUAL SETUP SESSION RUNBOOK BLOCKED',
  'dry-run only',
  'internal/founder/operator session-runbook',
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'No production activation',
  'No live SMS/Twilio',
  'No Supabase writes',
  'No contractor/homeowner notifications',
  'No Calendar booking',
  'No Vapi production ingestion',
  'No Retell routes',
  'No cron/scheduler/dispatcher/public route activation',
  'No secrets',
  'No destructive actions'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ First Roofer Manual Setup Session Runbook Verification ===');
console.log('Local read-only verifier execution only. No Supabase, no external calls.');

if (!fs.existsSync(runbookDocPath)) {
  fail('Session runbook doc missing');
} else {
  pass('Session runbook doc exists');
  const content = fs.readFileSync(runbookDocPath, 'utf8');
  for (const str of requiredRunbookStrings) {
    if (content.includes(str)) {
      pass(`Session runbook doc contains: ${str}`);
    } else {
      fail(`Session runbook doc missing required string: ${str}`);
    }
  }
}

if (!fs.existsSync(wrapperPath)) {
  fail('Session runbook wrapper missing');
} else {
  pass('Session runbook wrapper exists');
  const content = fs.readFileSync(wrapperPath, 'utf8');
  if (content.includes('verify-source-of-truth.sh')) pass('Wrapper calls source-of-truth verification');
  else fail('Wrapper missing source-of-truth call');
  if (content.includes('check-first-roofer-manual-setup-execution-readiness-dry-run.sh')) pass('Wrapper calls execution readiness wrapper');
  else fail('Wrapper missing execution readiness call');
  if (content.includes('check-production-gates.sh')) pass('Wrapper calls production gate checks');
  else fail('Wrapper missing production gate call');
  if (content.includes('verify-safe-readiness.sh')) pass('Wrapper calls safe readiness');
  else fail('Wrapper missing safe readiness call');
}

if (!fs.existsSync(verifierPath)) {
  fail('Session runbook verifier missing');
} else {
  pass('Session runbook verifier exists');
}

if (!fs.existsSync(readinessDocPath) || !fs.existsSync(readinessWrapperPath) || !fs.existsSync(readinessVerifierPath)) {
  fail('Execution readiness chain incomplete');
} else {
  pass('Execution readiness doc/wrapper/verifier exist');
}

if (!fs.existsSync(goNoGoDocPath) || !fs.existsSync(goNoGoWrapperPath) || !fs.existsSync(goNoGoVerifierPath)) {
  fail('Final go/no-go chain incomplete');
} else {
  pass('Final go/no-go doc/wrapper/verifier exist');
}

if (!fs.existsSync(qaDocPath) || !fs.existsSync(qaWrapperPath) || !fs.existsSync(qaVerifierPath)) {
  fail('Founder approval evidence QA chain incomplete');
} else {
  pass('Founder approval evidence QA doc/wrapper/verifier exist');
}

if (!fs.existsSync(evidenceDocPath) || !fs.existsSync(evidenceWrapperPath) || !fs.existsSync(evidenceVerifierPath)) {
  fail('Founder approval evidence chain incomplete');
} else {
  pass('Founder approval evidence doc/wrapper/verifier exist');
}

if (!fs.existsSync(founderApprovalDocPath) || !fs.existsSync(founderApprovalWrapperPath) || !fs.existsSync(founderApprovalVerifierPath)) {
  fail('Founder approval chain incomplete');
} else {
  pass('Founder approval doc/wrapper/verifier exist');
}

if (!fs.existsSync(operatorAcceptanceDocPath) || !fs.existsSync(operatorAcceptanceWrapperPath) || !fs.existsSync(operatorAcceptanceVerifierPath)) {
  fail('Operator acceptance chain incomplete');
} else {
  pass('Operator acceptance doc/wrapper/verifier exist');
}

console.log('PASS: First Roofer Manual Setup Session Runbook packet wiring verified (dry-run only).');
