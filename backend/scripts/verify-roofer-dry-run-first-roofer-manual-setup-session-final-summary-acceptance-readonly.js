#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const repoRoot = path.resolve(__dirname, '../..');

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function read(relPath) {
  const p = path.join(repoRoot, relPath);
  if (!fs.existsSync(p)) fail(`missing ${relPath}`);
  return fs.readFileSync(p, 'utf8');
}

[
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY_ACCEPTANCE.md',
  'scripts/accept-first-roofer-manual-setup-session-final-summary-dry-run.sh',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-acceptance-readonly.js',
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js',
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
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md'
].forEach(read);

const doc = read('docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY_ACCEPTANCE.md');
const wrapper = read('scripts/accept-first-roofer-manual-setup-session-final-summary-dry-run.sh');
const aggregate = read('backend/scripts/verify-first-paid-pilot-readiness-readonly.js');
const index = read('docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md');
const firstPaid = read('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const roofer = read('docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md');

[
  'This packet is dry-run only.',
  'internal only, founder/operator only, and session-final-summary-acceptance-only',
  'MANUAL SETUP SESSION FINAL SUMMARY ACCEPTANCE PASS',
  'MANUAL SETUP SESSION FINAL SUMMARY ACCEPTANCE HOLD',
  'MANUAL SETUP SESSION FINAL SUMMARY ACCEPTANCE BLOCKED',
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
  'It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose credentials, expose secrets, run destructive actions, or perform external sends.'
].forEach(s => { if (!doc.includes(s)) fail(`doc missing: ${s}`); });

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
  'npm run start'
].forEach(s => { if (wrapper.includes(s)) fail(`wrapper contains forbidden text: ${s}`); });

[
  'scripts/verify-source-of-truth.sh',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-acceptance-readonly.js',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh'
].forEach(s => { if (!wrapper.includes(s)) fail(`wrapper missing: ${s}`); });

if (!aggregate.includes('verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-acceptance-readonly.js')) fail('aggregate missing session final summary acceptance verifier');
if (!index.includes('ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_FINAL_SUMMARY_ACCEPTANCE.md')) fail('index missing session final summary acceptance packet');
if (!firstPaid.includes('First Roofer Manual Setup Session Final Summary Acceptance Packet')) fail('first-paid context missing session final summary acceptance packet');
if (!roofer.includes('First Roofer Manual Setup Session Final Summary Acceptance Packet')) fail('roofer context missing session final summary acceptance packet');

console.log('PASS: first-roofer manual setup session final summary acceptance verifier passed.');
