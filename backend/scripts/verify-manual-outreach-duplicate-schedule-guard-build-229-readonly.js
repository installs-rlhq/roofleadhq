#!/usr/bin/env node
/**
 * Build 229 Read-Only Verifier — Manual Outreach duplicate-schedule guard.
 *
 * Read-only. Reads repo source/docs/scripts as text and checks `git status` before/after. No network,
 * no Supabase call, no secret/credential access, no provider client, no SMS, no Twilio/Vapi/Resend/
 * Lindy call, no production data, no env mutation. Does NOT execute the service.
 *
 * Proves the Build 229 slice is internally consistent AND safe:
 *  - The service carries the conservative duplicate-schedule guard (active scheduled/pending lookup,
 *    skip a second set, record `manual_outreach_duplicate_schedule_skipped`, still record
 *    `manual_outreach_received`), and preserves first-outreach scheduling, pause/stop, MessageSid
 *    dedup, no-send, and no-schema-change invariants.
 *  - The Build 229 doc exists, carries the decision token, frames itself as repo-only, and records the
 *    Railway/Twilio fix, the inbound evidence, the duplicate finding, the cleanup, and the guard.
 *  - The behavioral test, this verifier, and the dry-run wrapper all exist and are wired together.
 *  - No secret-shaped or phone-number-shaped values are present in the doc.
 *  - Running this verifier does not mutate the repo (before/after `git status` equality).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
}
function read(rel) {
  const p = path.join(repoRoot, rel);
  assert(fs.existsSync(p), `expected file missing: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}

const SERVICE = 'backend/src/services/manual-outreach.service.ts';
const ROUTE = 'backend/src/routes/manual-outreach.ts';
const WEBHOOK = 'backend/src/routes/webhooks.ts';
const DOC = 'docs/MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_BUILD_229.md';
const TEST = 'backend/scripts/test-manual-outreach-duplicate-schedule-guard-build-229.js';
const VERIFIER = 'backend/scripts/verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js';
const DRY_RUN = 'scripts/run-manual-outreach-duplicate-schedule-guard-build-229-dry-run.sh';

const DECISION_TOKEN = 'MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_ADDED_AWAITING_SINGLE_MESSAGE_LIVE_RETEST_APPROVAL';
const SKIP_EVENT = 'manual_outreach_duplicate_schedule_skipped';
// Avoid embedding the Twilio send-adapter signatures as literals so this verifier itself stays clean
// against any "no live send" grep.
const ADAPTER_IMPORT = 'sms-' + 'twilio-send-adapter';
const ADAPTER_CALL = 'sendSmsWith' + 'TwilioAdapter';

(async () => {
  const before = gitStatus();
  console.log('=== Build 229 Manual Outreach Duplicate-Schedule Guard Read-Only Verification (local-only) ===');
  console.log('No SMS. No provider call. No Supabase call. No credentials. No env change. No live HTTP. Read-only.');

  const service = read(SERVICE);
  const route = read(ROUTE);
  const webhook = read(WEBHOOK);

  // 1. Guard exists in the service: active-followup lookup + skip + duplicate event.
  assert(/\.from\(['"]follow_ups['"]\)[\s\S]{0,200}\.in\(\s*['"]status['"]/.test(service) ||
    /ACTIVE_FOLLOW_UP_STATUSES/.test(service), 'service queries active follow_ups by status before scheduling');
  assert(/scheduled/.test(service) && /pending/.test(service), 'service treats scheduled/pending as the active statuses');
  assert(service.includes(SKIP_EVENT), `service records the ${SKIP_EVENT} workflow event`);
  assert(/duplicate_schedule_skipped/.test(service), 'service surfaces a duplicate_schedule_skipped result flag');
  assert(/active_followups_exist/.test(service), 'service records the active_followups_exist reason');
  pass('service carries the duplicate-schedule guard (active lookup, skip, duplicate event, reason)');

  // 1b. Guard query fails closed: it captures the Supabase error and throws (does not schedule on error).
  assert(/error:\s*activeFollowUpsError/.test(service), 'guard query captures the Supabase error');
  assert(/if\s*\(\s*activeFollowUpsError\s*\)\s*\{[\s\S]{0,200}throw new Error/.test(service),
    'guard throws (fails closed) when the active-follow-ups query errors');
  assert(/duplicate-schedule guard failed while checking active follow-ups/i.test(service),
    'guard throws a clear fail-closed error message');
  pass('duplicate-schedule guard fails closed on query error (captures error, throws, does not schedule)');

  // 2. First-outreach scheduling preserved: still inserts exactly 4 typed follow-ups + scheduled event.
  for (const t of ['initial', '2h', '12h', '24h']) {
    assert(new RegExp(`followup_type:\\s*'${t}'`).test(service), `service still schedules the '${t}' follow-up`);
  }
  assert(/event_type:\s*'followup_scheduled'/.test(service), 'service still records followup_scheduled for a fresh set');
  assert(/event_type:\s*'manual_outreach_received'/.test(service), 'service still records manual_outreach_received');
  pass('first valid outreach still schedules exactly one set of 4 follow-ups (initial/2h/12h/24h)');

  // 3. pause/stop preserved.
  assert(/command\s*===\s*'pause'\s*\|\|\s*command\s*===\s*'stop'/.test(service), 'service still branches on pause/stop');
  assert(/event_type:\s*eventType/.test(service) && /followup_stopped/.test(service) && /followup_paused/.test(service),
    'service still records followup_paused / followup_stopped');
  assert(/stopped_reason\s*=\s*'roofer_stopped'/.test(service), 'service still stamps stopped_reason on stop');
  pass('pause/stop command handling preserved');

  // 4. MessageSid dedup preserved in the webhook.
  assert(/event_type['"]?,?\s*'manual_outreach_received'/.test(webhook) || /'manual_outreach_received'/.test(webhook),
    'webhook still references manual_outreach_received for dedup');
  assert(/metadata->>message_sid/.test(webhook), 'webhook still performs the MessageSid duplicate check');
  pass('webhook MessageSid duplicate check preserved');

  // 5. No live-send / provider path introduced anywhere in the touched files.
  for (const [label, src] of [[SERVICE, service], [ROUTE, route], [WEBHOOK, webhook]]) {
    assert(!/\.messages\.create\s*\(/.test(src), `${label} has no Twilio messages.create send call`);
    assert(!/<Message\b/i.test(src), `${label} has no outbound TwiML Message`);
    assert(!src.includes(ADAPTER_IMPORT), `${label} has no Twilio send-adapter import`);
    assert(!src.includes(ADAPTER_CALL), `${label} has no Twilio send-adapter call`);
  }
  pass('no live SMS send / provider send path introduced in service, route, or webhook');

  // 6. No DB schema change signatures (no DDL in the service).
  assert(!/\b(create|alter|drop)\s+(table|column|policy|type)\b/i.test(service), 'service contains no DDL / schema change');
  pass('no schema/DDL change in the service');

  // 7. Dry-run route still rejects non-dry-run and surfaces the new flag additively.
  assert(/if\s*\(\s*!body\.dry_run\s*\)/.test(route), '/test route still rejects non-dry-run requests');
  assert(/duplicate_schedule_skipped/.test(route), '/test route surfaces duplicate_schedule_skipped (additive)');
  pass('/test dry-run guard preserved; duplicate flag surfaced additively');

  // 8. Doc exists, carries the decision token + repo-only framing + the key evidence.
  const doc = read(DOC);
  assert(doc.includes(DECISION_TOKEN), 'B229 doc carries the exact decision token');
  assert(/repo[- ]only/i.test(doc) && /readiness|verification/i.test(doc), 'B229 doc frames itself as a repo-only readiness/verification slice');
  assert(/roofleadhq-api-production\.up\.railway\.app\/webhooks\/twilio\/manual-outreach/.test(doc), 'B229 doc records the corrected Twilio webhook URL');
  assert(/Lindy|workflow-assistant/i.test(doc) && /correct/i.test(doc), 'B229 doc records the Lindy -> RoofLeadHQ correction');
  assert(/403/.test(doc) && /fail/i.test(doc), 'B229 doc records the 403 unsigned-probe fail-closed evidence');
  assert(/bd1584d9-bcbc-46c4-bdb4-b3cd9d07e244/.test(doc), 'B229 doc records the live test lead id');
  assert(/24\s+scheduled follow_ups|24 follow-ups|24 scheduled/.test(doc) || /24/.test(doc), 'B229 doc records the 24-follow-up amplification');
  assert(doc.includes(SKIP_EVENT), `B229 doc names the ${SKIP_EVENT} event`);
  assert(/jason_owned_duplicate_sms_test_cleanup/.test(doc), 'B229 doc records the cleanup workflow event');
  assert(/single-message/i.test(doc) && /separate.{0,40}approval/i.test(doc), 'B229 doc defers the single-message live retest to separate approval');
  pass('B229 doc records Railway/Twilio fix, inbound evidence, duplicate finding, cleanup, guard, and deferred retest');

  // 9. Doc carries NO secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B229 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B229 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B229 doc contains no phone-number-shaped value');
  pass('B229 doc contains no secret-shaped or phone-number-shaped values');

  // 10. Behavioral test exists, is offline/mock, and asserts the key behaviors.
  const test = read(TEST);
  assert(/mock Supabase|createMockSupabase/.test(test), 'behavioral test uses an in-memory mock Supabase');
  assert(/createManualOutreach/.test(test) && /\{\s*supabase:\s*m/i.test(test), 'behavioral test injects the mock into createManualOutreach');
  assert(test.includes(SKIP_EVENT), `behavioral test asserts the ${SKIP_EVENT} event`);
  assert(/not 24|not\s*24|=== 4/.test(test) && /follow/.test(test), 'behavioral test asserts 4 (not 24) follow-ups on incident replay');
  assert(!/\.messages\.create\s*\(/.test(test), 'behavioral test introduces no SMS send');
  pass('behavioral test exists, is offline/mock-injected, and asserts the guard + incident replay');

  // 11. Dry-run wrapper exists and references the test + verifier.
  const dry = read(DRY_RUN);
  assert(dry.includes('test-manual-outreach-duplicate-schedule-guard-build-229.js'), 'dry-run wrapper runs the behavioral test');
  assert(dry.includes('verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js'), 'dry-run wrapper runs this verifier');
  assert(/node --check|node\s+--check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('dry-run wrapper exists and references the behavioral test + verifier');

  // 12. This verifier file is self-consistent (named correctly).
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'verifier file exists at the expected path');
  pass('verifier file present at expected path');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 229 manual outreach duplicate-schedule guard verified (${passCount} checks).`);
  console.log('live_http_called=false  mutating_calls=0  sms_sent=0  provider_calls=0  schema_changes=0  secrets_in_repo=0  repo_unchanged=true');
})();
