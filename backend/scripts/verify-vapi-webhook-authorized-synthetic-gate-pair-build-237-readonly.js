#!/usr/bin/env node
/**
 * Build 237 Read-Only Verifier — Vapi webhook authorized synthetic gate-pair evidence packet.
 *
 * Read-only. Reads the Build 237 evidence doc (and the real route/guard/service source) as text and
 * checks `git status` before/after. No network, no Supabase call, no credential/secret access, no
 * provider client, no SMS, no call, no live HTTP, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build.
 *
 * Build 237 records the authorized synthetic GATE PAIR against the live redeployed runtime:
 *   - Unauthenticated POST (no secret) -> HTTP 401 unauthorized (traffic blocked).
 *   - Authorized POST (x-vapi-webhook-secret = final B237 secret) -> HTTP 400 missing_required_field
 *     (passed auth, reached normal payload validation).
 * That pair is a PASS for webhook auth gate-pair validation. It is NOT a full payload processing
 * pass and NOT a real call test.
 *
 * This verifier proves the evidence packet is internally consistent, grounded in real source, and
 * safe:
 *  - The Build 237 evidence doc exists and carries the exact decision token.
 *  - It references source commit c6b90e1 (HEAD == origin/main).
 *  - It records FINAL_SECRET_LOCAL_LENGTH=64 AND carries no secret value (length only).
 *  - It records UNAUTH_HTTP_STATUS=401.
 *  - It records AUTH_X_HEADER_HTTP_STATUS=400 and authorized error missing_required_field.
 *  - The sanitized normalized.provider_call_id is synthetic-redacted-build-237-final-auth.
 *  - normalized.caller_phone and normalized.roofer_destination_number are null.
 *  - auth_gate_pair_status = pass.
 *  - full_payload_processing_status = not_yet_validated (or not_started).
 *  - real_call_test_status = not_started.
 *  - It asserts no real call, no SMS, no real roofer/homeowner contact, no live automation.
 *  - The real route/guard/service source grounds the 401 (guard) and 400 missing_required_field path.
 *  - The doc contains no secret-shaped or phone-number-shaped values.
 *  - The next gated step is: update the Vapi assistant Webhook Server Authorization credential to the
 *    same final B237 secret, then run a Vapi-originated synthetic/controlled validation only after
 *    separate approval.
 *  - The full Build 237 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + the B236 + B235 + B234 + B233 + B232 verifiers + the
 *    smoke regression.
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

const DOC = 'docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const SERVICE = 'backend/src/services/vapi-webhook.service.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-authorized-synthetic-gate-pair-build-237-dry-run.sh';
const B236_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js';
const B235_VERIFIER = 'backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js';
const B234_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js';
const B233_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_VALIDATED_401_UNAUTH_400_AUTH_PASS';
const SOURCE_COMMIT = 'c6b90e1';
const SYNTHETIC_CALL_ID = 'synthetic-redacted-build-237-final-auth';

(function main() {
  const before = gitStatus();
  console.log('=== Build 237 Vapi webhook authorized synthetic gate-pair read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No full-payload pass. No real call test. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B237 doc carries the exact decision token');
  pass('Build 237 evidence doc exists and carries the decision token');

  // 2. References source commit c6b90e1 + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B237 doc references source commit c6b90e1');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B237 doc records HEAD==origin/main');
  pass('B237 doc references source commit c6b90e1 (HEAD==origin/main)');

  // 3. Final secret length recorded as 64 but NO secret value present (length only).
  assert(/FINAL_SECRET_LOCAL_LENGTH\s*=\s*64/.test(doc), 'B237 doc records FINAL_SECRET_LOCAL_LENGTH=64');
  assert(/64[- ]character/.test(doc), 'B237 doc describes the final secret as 64-character');
  assert(/value_redacted\s*=\s*true/i.test(doc) || /secret_value_recorded\s*=\s*false/i.test(doc),
    'B237 doc marks the secret value as redacted/not-recorded');
  pass('B237 doc records final secret length 64 with the value redacted/not recorded');

  // 4. Unauth status 401.
  assert(/UNAUTH_HTTP_STATUS\s*=\s*401/.test(doc), 'B237 doc records UNAUTH_HTTP_STATUS=401');
  assert(/401/.test(doc) && /unauthorized/.test(doc), 'B237 doc records HTTP 401 unauthorized for the unauth gate');
  pass('B237 doc records unauthenticated POST status 401 unauthorized');

  // 5. Authorized status 400 + error missing_required_field.
  assert(/AUTH_X_HEADER_HTTP_STATUS\s*=\s*400/.test(doc), 'B237 doc records AUTH_X_HEADER_HTTP_STATUS=400');
  assert(/missing_required_field/.test(doc), 'B237 doc records authorized error missing_required_field');
  assert(/x-vapi-webhook-secret/.test(doc), 'B237 doc references the x-vapi-webhook-secret header used on the authorized POST');
  pass('B237 doc records authorized POST status 400 missing_required_field via x-vapi-webhook-secret');

  // 6. Sanitized normalized fields.
  assert(doc.includes(`"provider_call_id":"${SYNTHETIC_CALL_ID}"`),
    'B237 doc sanitized body has normalized.provider_call_id = synthetic-redacted-build-237-final-auth');
  assert(/"caller_phone":null/.test(doc), 'B237 doc sanitized body has normalized.caller_phone = null');
  assert(/"roofer_destination_number":null/.test(doc),
    'B237 doc sanitized body has normalized.roofer_destination_number = null');
  pass('B237 doc sanitized body: provider_call_id synthetic-redacted, caller_phone & roofer_destination_number null');

  // 7. Status fields: auth_gate_pair_status pass, full_payload not-yet, real_call not_started.
  assert(/auth_gate_pair_status\s*=\s*pass/.test(doc), 'B237 doc records auth_gate_pair_status = pass');
  assert(/full_payload_processing_status\s*=\s*(not_yet_validated|not_started)/.test(doc),
    'B237 doc records full_payload_processing_status = not_yet_validated or not_started');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc), 'B237 doc records real_call_test_status = not_started');
  pass('B237 doc records auth_gate_pair_status=pass, full_payload not yet validated, real_call_test not started');

  // 8. Real route/guard/service source grounds the 401 (guard) and 400 missing_required_field path.
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  assert(/error\s*===\s*'missing_required_field'/.test(route) && /status\(400\)/.test(route),
    'real route source maps missing_required_field to HTTP 400');
  const guard = read(GUARD);
  assert(/requireVapiWebhookSecret/.test(guard) && /timingSafeEqual/.test(guard) &&
    /x-vapi-webhook-secret/.test(guard) && /unauthorized/.test(guard),
    'real guard middleware exists, constant-time, accepts x-vapi-webhook-secret, returns 401 unauthorized');
  const service = read(SERVICE);
  assert(/error:\s*'missing_required_field'/.test(service) &&
    /!normalized\.provider_call_id/.test(service) &&
    /!normalized\.caller_phone/.test(service) &&
    /!normalized\.roofer_destination_number/.test(service),
    'real service returns missing_required_field when provider_call_id/caller_phone/roofer_destination_number missing');
  pass('B237 grounding matches real source: guard 401 + route 400 missing_required_field + service validation path');

  // 9. No real call / no SMS / no real roofer-homeowner contact / no live automation.
  assert(/[Nn]o real call/.test(doc), 'B237 doc asserts no real call');
  assert(/[Nn]o SMS/.test(doc), 'B237 doc asserts no SMS');
  assert(/[Nn]o real roofer contact/.test(doc) && /[Nn]o real homeowner contact/.test(doc),
    'B237 doc asserts no real roofer/homeowner contact');
  assert(/external live automation occurred|public automation expansion/i.test(doc),
    'B237 doc asserts no external/live automation occurred');
  pass('B237 doc asserts no real call, no SMS, no real roofer/homeowner contact, no live automation');

  // 10. Not a full payload pass, not a real call test (explicit).
  assert(/NOT\W{0,4}(a )?full Vapi payload processing pass/i.test(doc),
    'B237 doc explicitly states it is NOT a full Vapi payload processing pass');
  assert(/NOT\W{0,4}a real call test/i.test(doc),
    'B237 doc explicitly states it is NOT a real call test');
  pass('B237 doc explicitly states it is NOT a full payload pass and NOT a real call test');

  // 11. Secret file was NOT read + no secret committed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) &&
    /not[- ]read/i.test(doc),
    'B237 doc states the local secret file was not read');
  assert(/[Nn]o secret committed/.test(doc), 'B237 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B237 doc asserts no secrets printed');
  pass('B237 doc states the local secret file was not read and no secret was printed or committed');

  // 12. No phone-number-shaped or secret-shaped values, except the recorded length 64.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B237 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B237 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B237 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B237 doc contains no phone-number-shaped value');
  pass('B237 doc contains no secret-shaped or phone-number-shaped values');

  // 13. Next gated step: update Vapi assistant credential to same final secret, then Vapi-originated
  //     synthetic/controlled validation only after separate approval.
  assert(/[Nn]ext gated step/.test(doc), 'B237 doc records the exact next gated step');
  assert(/Vapi assistant Webhook Server Authorization credential/i.test(doc),
    'B237 doc next step updates the Vapi assistant Webhook Server Authorization credential');
  assert(/same final Build 237\s+secret/i.test(doc),
    'B237 doc next step uses the same final Build 237 secret');
  assert(/Vapi-originated synthetic\s*\/?\s*controlled[\s\S]{0,30}?validation/i.test(doc),
    'B237 doc next step is a Vapi-originated synthetic/controlled validation');
  assert(/separate approval|separately[- ]approved/i.test(doc),
    'B237 doc next step requires separate approval');
  pass('B237 doc next gated step: update Vapi credential to same final secret, then Vapi-originated validation after separate approval');

  // 14. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No SMS sent/i,
    /No Twilio configuration change/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No full Vapi payload processing pass executed/i,
    /No real call test executed/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B237 doc missing safety invariant: ${re}`);
  pass('B237 doc states the full Build 237 safety-invariant block');

  // 15. Dry-run wrapper exists and wires this verifier + B236 + B235 + B234 + B233 + B232 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B237 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B236_VERIFIER)), 'B236 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B235_VERIFIER)), 'B235 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B234_VERIFIER)), 'B234 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B233_VERIFIER)), 'B233 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js'),
    'dry-run wrapper runs the Build 236 verifier');
  assert(dry.includes('verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js'),
    'dry-run wrapper runs the Build 235 verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js'),
    'dry-run wrapper runs the Build 234 verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js'),
    'dry-run wrapper runs the Build 233 verifier');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'),
    'dry-run wrapper runs the Build 232 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B237 verifier present and the dry-run wrapper wires this verifier + B236 + B235 + B234 + B233 + B232 verifiers + smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 237 Vapi webhook authorized synthetic gate-pair evidence verified (${passCount} checks).`);
  console.log('live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  guard_in_code=true  unauth_smoke=401_live  authorized_smoke=400_missing_required_field_live  auth_gate_pair=pass  full_payload_processing=not_yet_validated  real_call_test=not_started  call_placed=false  live_sms_sent=false  secrets_in_repo=0  final_secret_length_recorded=64  repo_unchanged=true');
})();
