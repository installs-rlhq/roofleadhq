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

const docPath = 'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_COMPLETION_LOCK.md';
const wrapperPath = 'scripts/lock-first-roofer-manual-setup-session-extended-archive-completion-dry-run.sh';
const verifierPath = 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-lock-readonly.js';

[
  docPath,
  wrapperPath,
  verifierPath,
  'docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_FINAL_CHECK.md',
  'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js'
].forEach(read);

const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read('backend/scripts/verify-first-paid-pilot-readiness-readonly.js');
const index = read('docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md');
const firstPaid = read('docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md');
const roofer = read('docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md');

[
  'This packet is dry-run only.',
  'internal only, founder/operator only, and extended archive-completion-lock-only',
  'MANUAL SETUP SESSION EXTENDED ARCHIVE COMPLETION LOCK PASS',
  'MANUAL SETUP SESSION EXTENDED ARCHIVE COMPLETION LOCK HOLD',
  'MANUAL SETUP SESSION EXTENDED ARCHIVE COMPLETION LOCK BLOCKED',
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
  'verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js',
  'verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-lock-readonly.js',
  'scripts/check-production-gates.sh',
  'scripts/verify-safe-readiness.sh'
].forEach(s => { if (!wrapper.includes(s)) fail(`wrapper missing: ${s}`); });

if (!aggregate.includes('verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-lock-readonly.js')) fail('aggregate missing extended archive completion lock verifier');
if (!index.includes('ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_EXTENDED_ARCHIVE_COMPLETION_LOCK.md')) fail('index missing extended archive completion lock packet');
if (!firstPaid.includes('First Roofer Manual Setup Session Extended Archive Completion Lock Packet')) fail('first-paid context missing extended archive completion lock packet');
if (!roofer.includes('First Roofer Manual Setup Session Extended Archive Completion Lock Packet')) fail('roofer context missing extended archive completion lock packet');

console.log('PASS: first-roofer manual setup session extended archive completion lock verifier passed.');
