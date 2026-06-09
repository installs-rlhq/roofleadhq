#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const requiredFiles = [
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md',
  'scripts/freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_PRESERVATION_SNAPSHOT.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-preservation-snapshot-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_LOCK_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_LOCK.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_COMPLETION_LOCK_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_COMPLETION_LOCK.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_FINAL_CHECK_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_FINAL_CHECK.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OUTCOME_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OUTCOME.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NEXT_ACTION_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NEXT_ACTION.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_HANDOFF_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_HANDOFF.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_CLOSEOUT.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_QA_ACCEPTANCE.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_QA.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md',
];

const requiredDocStrings = [
  'First Roofer Manual Setup Session Operator Handoff Freeze',
  'dry-run only, internal-only, founder/operator-only',
  'preservation snapshot has passed',
  'Future operators should rely on the preserved session chain',
  'MANUAL SETUP SESSION OPERATOR HANDOFF FREEZE PASS',
  'MANUAL SETUP SESSION OPERATOR HANDOFF FREEZE HOLD',
  'MANUAL SETUP SESSION OPERATOR HANDOFF FREEZE BLOCKED',
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
  'does not send SMS',
  'does not send email',
  'does not write to Supabase',
  'does not expose a public route',
];

const requiredWrapperStrings = [
  'scripts/verify-source-of-truth.sh',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-preservation-snapshot-readonly.js',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
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
    'verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
  ],
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md',
    'freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md',
    'freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md',
    'freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh',
  ],
};

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
}

for (const file of requiredFiles) {
  assert(fs.existsSync(path.join(repoRoot, file)), `Missing required file: ${file}`);
}

const doc = read('docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_OPERATOR_HANDOFF_FREEZE.md');
const wrapper = read('scripts/freeze-first-roofer-manual-setup-session-operator-handoff-dry-run.sh');

for (const value of requiredDocStrings) {
  assert(doc.includes(value), `Operator handoff freeze doc missing required text: ${value}`);
}

for (const value of requiredWrapperStrings) {
  assert(wrapper.includes(value), `Operator handoff freeze wrapper missing required command: ${value}`);
}

for (const value of forbiddenWrapperStrings) {
  assert(!wrapper.includes(value), `Operator handoff freeze wrapper contains forbidden live/prod pattern: ${value}`);
}

for (const [file, requiredStrings] of Object.entries(requiredIntegrationChecks)) {
  const content = read(file);
  for (const value of requiredStrings) {
    assert(content.includes(value), `${file} missing operator handoff freeze integration text: ${value}`);
  }
}

console.log('PASS: First roofer manual setup session operator handoff freeze verifier passed.');
