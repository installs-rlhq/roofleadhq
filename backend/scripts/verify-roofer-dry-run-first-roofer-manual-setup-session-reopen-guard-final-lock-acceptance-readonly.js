#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const requiredFiles = [
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md',
  'scripts/accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_PRESERVATION_SNAPSHOT.md',
];

const requiredDocStrings = [
  'First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance',
  'dry-run only, internal-only, founder/operator-only',
  'final lock has been reviewed, verified, and accepted',
  'the reopen guard final lock has passed',
  'the accepted reopen guard remains protected',
  'the preserved and frozen session chain remains protected from accidental mutation',
  'future reopen scope must be explicit, narrow, dry-run only, and non-production',
  'live automation remains disabled',
  'MANUAL SETUP SESSION REOPEN GUARD FINAL LOCK ACCEPTANCE PASS',
  'MANUAL SETUP SESSION REOPEN GUARD FINAL LOCK ACCEPTANCE HOLD',
  'MANUAL SETUP SESSION REOPEN GUARD FINAL LOCK ACCEPTANCE BLOCKED',
];

const requiredSafetyFlags = [
  'WORKSPACE_MODE=dry-run',
  'SMS_ACTIVATION=false',
  'CALENDAR_ACTIVATION=false',
  'VAPI_ACTIVATION=false',
  'SUPABASE_WRITES=false',
  'CONTRACTOR_NOTIFICATION=false',
  'HOMEOWNER_NOTIFICATION=false',
  'CRON_ACTIVATION=false',
  'SCHEDULER_ACTIVATION=false',
  'DISPATCHER_ACTIVATION=false',
  'PUBLIC_ROUTE_ACTIVATION=false',
];

const requiredWrapperStrings = [
  'scripts/verify-source-of-truth.sh',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-readonly.js',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh',
];

const forbiddenWrapperStrings = [
  'curl ',
  'twilio.messages.create',
  'supabase.from(',
  'resend.emails.send',
  'calendar.events.insert',
  'vapi.calls.create',
  'retell.call',
  'fetch("https://',
  "fetch('https://",
  'npm run start',
];

const requiredIntegrationChecks = {
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
  ],
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md',
    'accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md',
    'accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md',
    'accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh',
  ],
};

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(repoRoot, file)), `Missing required file: ${file}`);
}

const doc = read('docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE.md');
for (const value of requiredDocStrings) {
  assert(doc.includes(value), `Final lock acceptance doc missing required text: ${value}`);
}
for (const value of requiredSafetyFlags) {
  assert(doc.includes(value), `Final lock acceptance doc missing safety flag: ${value}`);
}

const wrapper = read('scripts/accept-first-roofer-manual-setup-session-reopen-guard-final-lock-dry-run.sh');
for (const value of requiredWrapperStrings) {
  assert(wrapper.includes(value), `Final lock acceptance wrapper missing required command: ${value}`);
}
for (const value of forbiddenWrapperStrings) {
  assert(!wrapper.includes(value), `Final lock acceptance wrapper contains forbidden live/prod pattern: ${value}`);
}

for (const [file, requiredStrings] of Object.entries(requiredIntegrationChecks)) {
  const content = read(file);
  for (const value of requiredStrings) {
    assert(content.includes(value), `${file} missing reopen guard final lock acceptance integration text: ${value}`);
  }
}

console.log('PASS: First roofer manual setup session reopen guard final lock acceptance verifier passed.');
