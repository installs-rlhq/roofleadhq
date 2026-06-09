#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const notesDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md');
const wrapperPath = path.join(repoRoot, 'scripts', 'record-first-roofer-manual-setup-session-notes-dry-run.sh');
const verifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-session-notes-readonly.js');

const runbookDocPath = path.join(repoRoot, 'docs', 'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md');
const runbookWrapperPath = path.join(repoRoot, 'scripts', 'run-first-roofer-manual-setup-session-runbook-dry-run.sh');
const runbookVerifierPath = path.join(repoRoot, 'backend', 'scripts', 'verify-roofer-dry-run-first-roofer-manual-setup-session-runbook-readonly.js');

const requiredStrings = [
  'MANUAL SETUP SESSION NOTES PASS',
  'MANUAL SETUP SESSION NOTES HOLD',
  'MANUAL SETUP SESSION NOTES BLOCKED',
  'dry-run only',
  'internal/founder/operator session-notes',
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

console.log('=== RoofLeadHQ First Roofer Manual Setup Session Notes Verification ===');
console.log('Local read-only verifier execution only. No Supabase, no external calls.');

if (!fs.existsSync(notesDocPath)) {
  fail('Session notes doc missing');
} else {
  pass('Session notes doc exists');
  const content = fs.readFileSync(notesDocPath, 'utf8');
  for (const str of requiredStrings) {
    if (content.includes(str)) {
      pass(`Session notes doc contains: ${str}`);
    } else {
      fail(`Session notes doc missing required string: ${str}`);
    }
  }
}

if (!fs.existsSync(wrapperPath)) {
  fail('Session notes wrapper missing');
} else {
  pass('Session notes wrapper exists');
  const content = fs.readFileSync(wrapperPath, 'utf8');
  if (content.includes('verify-source-of-truth.sh')) pass('Wrapper calls source-of-truth verification');
  else fail('Wrapper missing source-of-truth call');
  if (content.includes('run-first-roofer-manual-setup-session-runbook-dry-run.sh')) pass('Wrapper calls session runbook wrapper');
  else fail('Wrapper missing session runbook call');
  if (content.includes('check-production-gates.sh')) pass('Wrapper calls production gate checks');
  else fail('Wrapper missing production gate call');
  if (content.includes('verify-safe-readiness.sh')) pass('Wrapper calls safe readiness');
  else fail('Wrapper missing safe readiness call');
}

if (!fs.existsSync(verifierPath)) {
  fail('Session notes verifier missing');
} else {
  pass('Session notes verifier exists');
}

if (!fs.existsSync(runbookDocPath) || !fs.existsSync(runbookWrapperPath) || !fs.existsSync(runbookVerifierPath)) {
  fail('Session runbook chain incomplete');
} else {
  pass('Session runbook doc/wrapper/verifier exist');
}

console.log('PASS: First Roofer Manual Setup Session Notes packet wiring verified (dry-run only).');
