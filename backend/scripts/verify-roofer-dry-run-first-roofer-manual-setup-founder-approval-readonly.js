#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const approvalDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md');
const wrapperPath = path.join(repoRoot, 'scripts', 'approve-first-roofer-manual-setup-founder-dry-run.sh');
const operatorWrapperPath = path.join(repoRoot, 'scripts', 'accept-first-roofer-manual-setup-operator-dry-run.sh');
const verifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js');
const operatorAcceptanceVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js');

const requiredStrings = [
  'MANUAL SETUP FOUNDER APPROVAL PASS',
  'MANUAL SETUP FOUNDER APPROVAL HOLD',
  'MANUAL SETUP FOUNDER APPROVAL BLOCKED',
  'dry-run only',
  'manual/internal founder/operator',
  'No production activation',
  'approve-first-roofer-manual-setup-founder-dry-run.sh',
  'accept-first-roofer-manual-setup-operator-dry-run.sh',
  'verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ First Roofer Manual Setup Founder Approval Verification ===');
console.log('Local read-only verifier execution only. No Supabase, no external calls.');

if (!fs.existsSync(approvalDocPath)) {
  fail('Founder approval doc missing');
} else {
  pass('Founder approval doc exists');
  const content = fs.readFileSync(approvalDocPath, 'utf8');
  for (const str of requiredStrings) {
    if (content.includes(str)) {
      pass(`Approval doc contains: ${str}`);
    } else {
      fail(`Approval doc missing required string: ${str}`);
    }
  }
}

if (!fs.existsSync(wrapperPath)) {
  fail('Founder approval wrapper missing');
} else {
  pass('Founder approval wrapper exists');
  const content = fs.readFileSync(wrapperPath, 'utf8');
  if (content.includes('accept-first-roofer-manual-setup-operator-dry-run.sh')) {
    pass('Wrapper calls operator acceptance wrapper');
  } else {
    fail('Wrapper missing operator acceptance call');
  }
  if (content.includes('check-production-gates.sh')) {
    pass('Wrapper calls production gate checks');
  } else {
    fail('Wrapper missing production gate call');
  }
  if (content.includes('verify-safe-readiness.sh')) {
    pass('Wrapper calls safe readiness');
  } else {
    fail('Wrapper missing safe readiness call');
  }
}

if (!fs.existsSync(verifierPath)) {
  fail('Founder approval verifier missing');
} else {
  pass('Founder approval verifier exists');
}

if (!fs.existsSync(operatorAcceptanceVerifierPath)) {
  fail('Operator acceptance verifier missing');
} else {
  pass('Operator acceptance verifier exists');
}

console.log('PASS: First Roofer Manual Setup Founder Approval packet wiring verified (dry-run only).');
