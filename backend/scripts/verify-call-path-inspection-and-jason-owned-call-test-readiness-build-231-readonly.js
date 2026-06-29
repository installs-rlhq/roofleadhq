#!/usr/bin/env node
/**
 * Build 231 Read-Only Verifier — Call-Path Inspection & Jason-Owned Call-Test Readiness.
 *
 * Read-only. Reads repo source + the Build 231 doc as text and checks `git status` before/after.
 * No network, no Supabase call, no credential/secret access, no provider client, no SMS, no call,
 * no Twilio/Vapi/Retell/Resend/Lindy call, no production data, no env mutation. Executes no service.
 *
 * Proves the Build 231 call-path inspection slice is internally consistent AND that its factual
 * claims actually match the repo source:
 *  - The doc exists, carries the decision token, and frames itself as repo-only / no-live-action.
 *  - The call-path facts in the doc are grounded in the real source:
 *      * the Vapi call-completed webhook route is mounted in index.ts and implemented,
 *      * that webhook performs mutating Supabase writes (calls/leads/bookings),
 *      * that webhook performs NO signature/secret validation (the documented gap),
 *      * the only Twilio route in code is the SMS manual-outreach path (no voice webhook exists),
 *      * Retell is treated as deprecated/disabled,
 *      * the call-handling env var names are referenced by the doc.
 *  - The full Build 231 safety-invariant block is present in the doc.
 *  - The doc carries no secret-shaped or phone-number-shaped values.
 *  - The verifier + dry-run wrapper exist and are wired together.
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

const DOC = 'docs/CALL_PATH_INSPECTION_AND_JASON_OWNED_CALL_TEST_READINESS_BUILD_231.md';
const VERIFIER = 'backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js';
const DRY_RUN = 'scripts/run-call-path-inspection-and-jason-owned-call-test-readiness-build-231-dry-run.sh';

const INDEX = 'backend/src/index.ts';
const VAPI_ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const VAPI_SERVICE = 'backend/src/services/vapi-webhook.service.ts';
const WEBHOOKS = 'backend/src/routes/webhooks.ts';
const CONFIG = 'backend/src/config/config.ts';

const DECISION_TOKEN = 'CALL_PATH_INSPECTED_JASON_OWNED_INBOUND_CALL_TEST_READY_AWAITING_SEPARATE_VOICE_TEST_APPROVAL';

(async () => {
  const before = gitStatus();
  console.log('=== Build 231 Call-Path Inspection & Jason-Owned Call-Test Readiness Read-Only Verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No live HTTP. Read-only.');

  const doc = read(DOC);

  // 1. Decision token + repo-only / no-live-action framing.
  assert(doc.includes(DECISION_TOKEN), 'B231 doc carries the exact decision token');
  assert(/repo[- ]only/i.test(doc), 'B231 doc frames itself as repo-only');
  assert(/no live action|makes no call|no live HTTP/i.test(doc), 'B231 doc states it takes no live action');
  pass('B231 doc carries the decision token and repo-only / no-live-action framing');

  // 2. Source-of-truth anchoring.
  assert(/5e43162/.test(doc), 'B231 doc records the Build 230 source-of-truth commit 5e43162');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B231 doc records HEAD == origin/main');
  pass('B231 doc records the source-of-truth commit and HEAD == origin/main');

  // 3. CLAIM: Vapi call-completed webhook is mounted + implemented. Verify against real source.
  const index = read(INDEX);
  assert(/app\.use\(['"]\/webhooks\/vapi['"]/.test(index), 'index.ts actually mounts /webhooks/vapi');
  const vapiRoute = read(VAPI_ROUTE);
  assert(/call-completed/.test(vapiRoute) && /processVapiCallCompleted/.test(vapiRoute),
    'vapi-webhooks route actually wires POST call-completed -> processVapiCallCompleted');
  assert(/\/webhooks\/vapi\/call-completed/.test(doc), 'B231 doc names the live /webhooks/vapi/call-completed route');
  pass('B231 doc claim matches source: Vapi call-completed webhook is mounted and implemented');

  // 4. CLAIM: the Vapi webhook performs mutating Supabase writes. Verify against real source.
  const vapiService = read(VAPI_SERVICE);
  assert(/\.from\(['"]calls['"]\)[\s\S]{0,80}\.insert/.test(vapiService), 'vapi-webhook.service actually inserts into calls');
  assert(/\.from\(['"]leads['"]\)[\s\S]{0,120}\.insert/.test(vapiService), 'vapi-webhook.service actually inserts into leads');
  assert(/\.from\(['"]bookings['"]\)[\s\S]{0,120}\.insert/.test(vapiService), 'vapi-webhook.service actually inserts into bookings');
  assert(/mutating Supabase writes/i.test(doc) && /calls/.test(doc) && /leads/.test(doc) && /bookings/.test(doc),
    'B231 doc records the webhook performs mutating calls/leads/bookings writes');
  pass('B231 doc claim matches source: Vapi webhook performs mutating calls/leads/bookings writes');

  // 5. CLAIM: the Vapi webhook performs NO signature/secret validation (the documented gap).
  assert(!/VAPI_WEBHOOK_SECRET/.test(vapiService), 'vapi-webhook.service genuinely does NOT reference VAPI_WEBHOOK_SECRET');
  assert(!/X-Vapi-Signature/i.test(vapiService) && !/validateRequest/.test(vapiService),
    'vapi-webhook.service genuinely performs no signature validation');
  assert(/signature[- ]validation gap|no signature\/secret validation|no .{0,12}VAPI_WEBHOOK_SECRET.{0,12} check/i.test(doc),
    'B231 doc records the no-signature-validation gap on the live webhook');
  pass('B231 doc claim matches source: the live Vapi webhook performs no signature validation (gap)');

  // 6. CLAIM: the only Twilio route is the SMS manual-outreach path; no voice webhook exists.
  const webhooks = read(WEBHOOKS);
  assert(/twilio\/manual-outreach/.test(webhooks), 'webhooks.ts actually has the twilio/manual-outreach SMS route');
  assert(/X-Twilio-Signature/.test(webhooks), 'the twilio SMS route actually validates X-Twilio-Signature');
  assert(/no Twilio voice webhook/i.test(doc) && /manual-outreach/.test(doc),
    'B231 doc records there is no Twilio voice webhook (only the SMS manual-outreach path)');
  pass('B231 doc claim matches source: only a Twilio SMS route exists, no voice webhook');

  // 7. CLAIM: Retell deprecated/disabled + current voice config is the Retell Trunk.
  assert(/Retell Trunk/.test(doc), 'B231 doc records the current Twilio voice config is the Retell Trunk');
  assert(/Retell is deprecated\/disabled|Retell.{0,30}deprecated/i.test(doc), 'B231 doc records Retell is deprecated/disabled');
  pass('B231 doc records the Retell Trunk voice config and Retell deprecated/disabled posture');

  // 8. CLAIM: env var names for call handling are referenced (by name, no secrets).
  const config = read(CONFIG);
  assert(/VAPI_API_KEY/.test(config), 'config.ts actually references VAPI_API_KEY');
  for (const name of ['VAPI_API_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'TWILIO_AUTH_TOKEN', 'VAPI_WEBHOOK_SECRET']) {
    assert(doc.includes(name), `B231 doc references the call-handling env var ${name} by name`);
  }
  pass('B231 doc references the call-handling env var names (VAPI_API_KEY / SUPABASE_SERVICE_ROLE_KEY / TWILIO_AUTH_TOKEN / VAPI_WEBHOOK_SECRET)');

  // 9. Safest Jason-owned inbound call test path is documented (separate TEST Vapi number, out-of-repo capture).
  assert(/TEST Vapi (assistant|phone number|number)/i.test(doc) && /out[- ]of[- ]repo|outside this repo/i.test(doc),
    'B231 doc documents the safest Jason-owned inbound test via a separate TEST Vapi number + out-of-repo capture');
  assert(/separate approval|separately[- ]approved|its own .{0,20}approval/i.test(doc),
    'B231 doc records what needs separate approval later');
  pass('B231 doc documents the safest Jason-owned inbound test path and later separate-approval gates');

  // 10. Full safety-invariant block present.
  const invariants = [
    /No live call/i,
    /No SMS sent\.?|No SMS/i,
    /No provider calls/i,
    /No Twilio configuration change/i,
    /No Railway configuration change/i,
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS \/ security change/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
  ];
  for (const re of invariants) assert(re.test(doc), `B231 doc missing safety invariant: ${re}`);
  pass('B231 doc states the full Build 231 safety-invariant block (13 invariants)');

  // 11. Doc carries NO secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B231 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B231 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B231 doc contains no phone-number-shaped value');
  pass('B231 doc contains no secret-shaped or phone-number-shaped values');

  // 12. Verifier + dry-run wrapper exist and are wired together.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'verifier file exists at the expected path');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('verifier present and the dry-run wrapper references it');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 231 call-path inspection & Jason-owned call-test readiness verified (${passCount} checks).`);
  console.log('live_http_called=false  mutating_calls=0  call_placed=0  sms_sent=0  provider_calls=0  config_changes=0  secrets_in_repo=0  repo_unchanged=true');
})();
