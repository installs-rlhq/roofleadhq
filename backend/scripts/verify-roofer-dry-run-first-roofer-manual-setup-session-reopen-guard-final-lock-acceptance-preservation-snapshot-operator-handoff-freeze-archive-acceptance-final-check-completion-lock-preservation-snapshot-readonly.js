#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const requiredFiles = [
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md',
  'scripts/snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_LOCK_ACCEPTANCE.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js',
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
  'First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Preservation Snapshot',
  'dry-run only, internal-only, founder/operator-only',
  'MANUAL SETUP SESSION PRESERVATION SNAPSHOT PASS',
  'MANUAL SETUP SESSION PRESERVATION SNAPSHOT HOLD',
  'MANUAL SETUP SESSION PRESERVATION SNAPSHOT BLOCKED',
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
  'write to Supabase',
  'expose a public route',
];

const requiredWrapperStrings = [
  'scripts/verify-source-of-truth.sh',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh',
];

const requiredIntegrationChecks = {
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
  ],
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md',
    'snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md',
    'snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh',
  ],
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md': [
    'verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
    'ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md',
    'snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh',
  ],
};

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

const doc = read('docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK_PRESERVATION_SNAPSHOT.md');
const wrapper = read('scripts/snapshot-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-dry-run.sh');

for (const value of requiredDocStrings) {
  assert(doc.includes(value), `Preservation snapshot doc missing required text: ${value}`);
}

for (const value of requiredWrapperStrings) {
  assert(wrapper.includes(value), `Preservation snapshot wrapper missing required command: ${value}`);
}

for (const value of forbiddenWrapperStrings) {
  assert(!wrapper.includes(value), `Preservation snapshot wrapper contains forbidden live/prod pattern: ${value}`);
}

for (const [file, requiredStrings] of Object.entries(requiredIntegrationChecks)) {
  const content = read(file);
  for (const value of requiredStrings) {
    assert(content.includes(value), `${file} missing reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot integration text: ${value}`);
  }
}

console.log('PASS: First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot verifier passed.');
