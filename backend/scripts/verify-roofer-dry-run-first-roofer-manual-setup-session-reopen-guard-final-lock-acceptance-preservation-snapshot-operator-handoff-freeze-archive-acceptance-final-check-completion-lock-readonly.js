#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');

function readRequired(rel) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing required file: ${rel}`);
  }
  return fs.readFileSync(abs, 'utf8');
}

function mustInclude(rel, needle) {
  const text = readRequired(rel);
  if (!text.includes(needle)) {
    throw new Error(`Missing required text in ${rel}: ${needle}`);
  }
}

function mustNotInclude(rel, needle) {
  const text = readRequired(rel);
  if (text.includes(needle)) {
    throw new Error(`Forbidden text in ${rel}: ${needle}`);
  }
}

const doc = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_REOPEN_GUARD_FINAL_LOCK_ACCEPTANCE_PRESERVATION_SNAPSHOT_OPERATOR_HANDOFF_FREEZE_ARCHIVE_ACCEPTANCE_FINAL_CHECK_COMPLETION_LOCK.md';
const wrapper = 'scripts/lock-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-dry-run.sh';
const verifier = 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js';

[
  doc,
  wrapper,
  verifier,
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_ARCHIVE_FINAL_CHECK_ACCEPTANCE.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-acceptance-readonly.js',
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
].forEach(readRequired);

[
  'dry-run only',
  'internal-only',
  'founder/operator-only',
  'does not activate production automation',
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
  'MANUAL SETUP SESSION COMPLETION LOCK PASS',
  'MANUAL SETUP SESSION COMPLETION LOCK HOLD',
  'MANUAL SETUP SESSION COMPLETION LOCK BLOCKED',
].forEach((needle) => mustInclude(doc, needle));

[
  'scripts/verify-source-of-truth.sh',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-acceptance-readonly.js',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh',
].forEach((needle) => mustInclude(wrapper, needle));

[
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
].forEach((needle) => mustNotInclude(wrapper, needle));


mustInclude('backend/scripts/verify-first-paid-pilot-readiness-readonly.js', verifier);
mustInclude('docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md', 'First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock');
mustInclude('docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md', verifier);
mustInclude('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md', 'First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock');
mustInclude('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md', verifier);
mustInclude('docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md', 'First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock');
mustInclude('docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md', verifier);

console.log('PASS: First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock verifier passed.');
