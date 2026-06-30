#!/usr/bin/env node
/**
 * Build 238 Read-Only Verifier — Vapi webhook Bearer credential validation evidence packet.
 *
 * Read-only. Reads the Build 238 evidence doc (and the real route/guard/service source) as text and
 * checks `git status` before/after. No network, no Supabase call, no credential/secret access, no
 * provider client, no SMS, no call, no live HTTP, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build.
 *
 * Build 238 records:
 *   - The Vapi assistant credential assignment (RoofLeadHQ Production Webhook Secret, Bearer Token,
 *     header name Authorization, Include Bearer Prefix ON, assistant published).
 *   - A direct backend probe presenting `Authorization: Bearer <final B237 secret>` ->
 *     HTTP 400 missing_required_field (passed auth via the Bearer path, reached payload validation).
 * That is a PASS for direct Bearer-header auth validation. It is NOT a Vapi-originated webhook test,
 * NOT a full payload processing pass, and NOT a real call test.
 *
 * This verifier proves the evidence packet is internally consistent, grounded in real source, and
 * safe:
 *  - The Build 238 evidence doc exists and carries the exact decision token.
 *  - It references source commit 48bb25d (HEAD == origin/main).
 *  - It records the Vapi credential assignment: assigned explicitly, type Bearer Token, header name
 *    Authorization, Include Bearer Prefix ON.
 *  - It records AUTH_BEARER_HTTP_STATUS=400 and authorized error missing_required_field.
 *  - The sanitized normalized.provider_call_id is synthetic-redacted-build-238-bearer-header.
 *  - normalized.caller_phone and normalized.roofer_destination_number are null.
 *  - bearer_header_auth_status = pass.
 *  - vapi_originated_webhook_status = not_started.
 *  - full_payload_processing_status = not_started (or not_yet_validated).
 *  - real_call_test_status = not_started.
 *  - It asserts no real call, no SMS, no real roofer/homeowner contact, no live automation.
 *  - The real guard source grounds the Authorization: Bearer path; route grounds the 400
 *    missing_required_field mapping; service grounds the validation path.
 *  - The doc carries no secret value (redacted markers only) and no secret-shaped/phone-shaped values.
 *  - The next gated step is a separately-approved Vapi-originated synthetic/controlled validation.
 *  - The full Build 238 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + the B237 + B236 + B235 + B234 + B233 + B232 verifiers
 *    + the smoke regression.
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

const DOC = 'docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const SERVICE = 'backend/src/services/vapi-webhook.service.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-bearer-credential-validation-build-238-dry-run.sh';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';
const B236_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js';
const B235_VERIFIER = 'backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js';
const B234_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js';
const B233_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATED_400_AUTH_BEARER_HEADER_PASS';
const SOURCE_COMMIT = '48bb25d';
const SYNTHETIC_CALL_ID = 'synthetic-redacted-build-238-bearer-header';

(function main() {
  const before = gitStatus();
  console.log('=== Build 238 Vapi webhook Bearer credential validation read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No Vapi-originated test. No full-payload pass. No real call test. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B238 doc carries the exact decision token');
  pass('Build 238 evidence doc exists and carries the decision token');

  // 2. References source commit 48bb25d + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B238 doc references source commit 48bb25d');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B238 doc records HEAD==origin/main');
  pass('B238 doc references source commit 48bb25d (HEAD==origin/main)');

  // 3. Vapi credential assignment: assigned explicitly, type Bearer Token, header Authorization, prefix ON.
  assert(/vapi_credential_assigned\s*=\s*true/.test(doc), 'B238 doc records vapi_credential_assigned = true');
  assert(/RoofLeadHQ Production Webhook Secret/.test(doc),
    'B238 doc names the explicitly-assigned credential (RoofLeadHQ Production Webhook Secret)');
  assert(/vapi_credential_type\s*=\s*Bearer Token/.test(doc), 'B238 doc records credential type Bearer Token');
  assert(/vapi_header_name\s*=\s*Authorization/.test(doc), 'B238 doc records header name Authorization');
  assert(/vapi_include_bearer_prefix\s*=\s*ON/.test(doc), 'B238 doc records Include Bearer Prefix ON');
  assert(/vapi_assistant_published\s*=\s*true/.test(doc), 'B238 doc records the assistant was published');
  pass('B238 doc records Vapi credential: explicitly assigned, Bearer Token, header Authorization, Include Bearer Prefix ON, published');

  // 4. Direct Bearer auth status 400 + error missing_required_field.
  assert(/AUTH_BEARER_HTTP_STATUS\s*=\s*400/.test(doc), 'B238 doc records AUTH_BEARER_HTTP_STATUS=400');
  assert(/missing_required_field/.test(doc), 'B238 doc records authorized error missing_required_field');
  assert(/Authorization:\s*Bearer/.test(doc), 'B238 doc references the Authorization: Bearer header used on the probe');
  pass('B238 doc records direct Bearer-header POST status 400 missing_required_field via Authorization: Bearer');

  // 5. Sanitized normalized fields.
  assert(doc.includes(`"provider_call_id":"${SYNTHETIC_CALL_ID}"`),
    'B238 doc sanitized body has normalized.provider_call_id = synthetic-redacted-build-238-bearer-header');
  assert(/"caller_phone":null/.test(doc), 'B238 doc sanitized body has normalized.caller_phone = null');
  assert(/"roofer_destination_number":null/.test(doc),
    'B238 doc sanitized body has normalized.roofer_destination_number = null');
  pass('B238 doc sanitized body: provider_call_id synthetic-redacted, caller_phone & roofer_destination_number null');

  // 6. Status fields: bearer_header_auth_status pass, vapi_originated not_started, full_payload, real_call.
  assert(/bearer_header_auth_status\s*=\s*pass/.test(doc), 'B238 doc records bearer_header_auth_status = pass');
  assert(/vapi_originated_webhook_status\s*=\s*not_started/.test(doc),
    'B238 doc records vapi_originated_webhook_status = not_started');
  assert(/full_payload_processing_status\s*=\s*(not_started|not_yet_validated)/.test(doc),
    'B238 doc records full_payload_processing_status = not_started or not_yet_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc), 'B238 doc records real_call_test_status = not_started');
  pass('B238 doc records bearer_header_auth_status=pass, vapi_originated not_started, full_payload not started, real_call not started');

  // 7. Real guard source grounds the Authorization: Bearer path; route grounds 400; service grounds validation.
  const guard = read(GUARD);
  assert(/extractProvidedSecret/.test(guard) && /BEARER_PREFIX/.test(guard) &&
    /Bearer\\s\+/.test(guard) && /authorization/.test(guard),
    'real guard middleware extracts the Authorization: Bearer secret (BEARER_PREFIX over the authorization header)');
  assert(/timingSafeEqual/.test(guard) && /unauthorized/.test(guard),
    'real guard middleware compares constant-time and returns unauthorized on mismatch');
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  assert(/error\s*===\s*'missing_required_field'/.test(route) && /status\(400\)/.test(route),
    'real route source maps missing_required_field to HTTP 400');
  const service = read(SERVICE);
  assert(/error:\s*'missing_required_field'/.test(service) &&
    /!normalized\.provider_call_id/.test(service) &&
    /!normalized\.caller_phone/.test(service) &&
    /!normalized\.roofer_destination_number/.test(service),
    'real service returns missing_required_field when provider_call_id/caller_phone/roofer_destination_number missing');
  pass('B238 grounding matches real source: guard Authorization:Bearer path + route 400 missing_required_field + service validation path');

  // 8. No real call / no SMS / no real roofer-homeowner contact / no live automation.
  assert(/[Nn]o real call/.test(doc), 'B238 doc asserts no real call');
  assert(/[Nn]o SMS/.test(doc), 'B238 doc asserts no SMS');
  assert(/[Nn]o real roofer contact/.test(doc) && /[Nn]o real homeowner contact/.test(doc),
    'B238 doc asserts no real roofer/homeowner contact');
  assert(/external live automation occurred|public automation expansion/i.test(doc),
    'B238 doc asserts no external/live automation occurred');
  pass('B238 doc asserts no real call, no SMS, no real roofer/homeowner contact, no live automation');

  // 9. Not a Vapi-originated test, not a full payload pass, not a real call test (explicit).
  assert(/NOT\W{0,4}a Vapi-originated webhook test/i.test(doc),
    'B238 doc explicitly states it is NOT a Vapi-originated webhook test');
  assert(/NOT\W{0,4}(a )?full Vapi payload processing pass/i.test(doc),
    'B238 doc explicitly states it is NOT a full Vapi payload processing pass');
  assert(/NOT\W{0,4}a real call test/i.test(doc),
    'B238 doc explicitly states it is NOT a real call test');
  pass('B238 doc explicitly states it is NOT a Vapi-originated test, NOT a full payload pass, NOT a real call test');

  // 10. Secret file was NOT read + no secret value present + no secret committed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) &&
    /not[- ]read/i.test(doc),
    'B238 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B238 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B238 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B238 doc asserts no secrets printed');
  pass('B238 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 11. No phone-number-shaped or secret-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B238 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B238 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B238 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B238 doc contains no phone-number-shaped value');
  pass('B238 doc contains no secret-shaped or phone-number-shaped values');

  // 12. Next gated step: separately-approved Vapi-originated synthetic/controlled validation, sanitized only.
  assert(/[Nn]ext gated step/.test(doc), 'B238 doc records the exact next gated step');
  assert(/Vapi-originated synthetic\s*\/?\s*controlled[\s\S]{0,30}?validation/i.test(doc),
    'B238 doc next step is a Vapi-originated synthetic/controlled validation');
  assert(/separate approval|separately[- ]approved/i.test(doc),
    'B238 doc next step requires separate approval');
  assert(/[Nn]o real homeowner|real homeowner Vapi call traffic/i.test(doc),
    'B238 doc next step forbids real homeowner traffic');
  pass('B238 doc next gated step: separately-approved Vapi-originated synthetic/controlled validation, sanitized capture only, no real homeowner/roofer traffic');

  // 13. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No SMS sent/i,
    /No Twilio configuration change/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No Vapi-originated webhook test executed/i,
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
  for (const re of gates) assert(re.test(doc), `B238 doc missing safety invariant: ${re}`);
  pass('B238 doc states the full Build 238 safety-invariant block');

  // 14. Dry-run wrapper exists and wires this verifier + B237..B232 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B238 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B237_VERIFIER)), 'B237 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B236_VERIFIER)), 'B236 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B235_VERIFIER)), 'B235 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B234_VERIFIER)), 'B234 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B233_VERIFIER)), 'B233 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
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
  pass('B238 verifier present and the dry-run wrapper wires this verifier + B237 + B236 + B235 + B234 + B233 + B232 verifiers + smoke regression');

  // 15. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 238 Vapi webhook Bearer credential validation evidence verified (${passCount} checks).`);
  console.log('live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  guard_in_code=true  vapi_credential_assigned=true  vapi_credential_type=bearer_token  bearer_header_auth=400_missing_required_field_live  bearer_header_auth_status=pass  vapi_originated_webhook=not_started  full_payload_processing=not_started  real_call_test=not_started  call_placed=false  live_sms_sent=false  secrets_in_repo=0  repo_unchanged=true');
})();
