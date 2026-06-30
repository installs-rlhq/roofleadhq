#!/usr/bin/env node
/**
 * Build 242 Read-Only Verifier — Vapi-originated webhook delivery CORRECTED evidence.
 *
 * Read-only. Reads the Build 242 correction doc (and the B237 + B238 + B239 + B240 + B241 predecessor
 * docs) as text and checks `git status` before/after. No network, no Supabase call, no
 * credential/secret access, no provider client, no SMS, no Twilio, no call, no Vapi Talk, no Vapi
 * rerun, no live HTTP, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs NO
 * runtime/external action.
 *
 * Build 242 corrects the Build 241 outcome (ambiguous/not_confirmed) using a later Vapi Observe →
 * Logs → Webhooks inspection that surfaced the webhook-delivery evidence the first review had missed.
 * Backend receipt is confirmed at /webhooks/vapi/call-completed; each visible row returned HTTP 400
 * (auth-passed, application/payload validation failure). This is still NOT a full payload processing
 * pass.
 *
 * This verifier proves the correction packet is internally consistent, grounded, and safe:
 *  - The Build 242 doc exists and carries the exact decision token.
 *  - It references source commit 5f70e03 (HEAD == origin/main) — the current prerequisite Build 241.
 *  - It names Build 237 (48bb25d), 238 (077716e), 239 (a17d6f9), 240 (9b5f8ff), 241 (5f70e03) as
 *    prerequisite validated states, and those predecessor docs exist.
 *  - Build 241 recorded ambiguous/not_confirmed; Build 242 corrects it via later Webhooks-log inspection.
 *  - Vapi-originated webhook rows observed = true.
 *  - Webhook types include End Of Call Report, Status Update, Conversation Update, Speech Update.
 *  - Request URL equals/contains the Railway call-completed endpoint.
 *  - Request path = /webhooks/vapi/call-completed; method POST; response code 400; body {}.
 *  - backend_receipt_confirmed = true.
 *  - auth_likely_passed = true because 400 rather than 401.
 *  - vapi_originated_delivery_status = observed.
 *  - full_payload_processing_status = not_yet_validated.
 *  - real_call_test_status = not_started.
 *  - approval_consumed = true; no rerun permitted without a new approval.
 *  - The doc carries no secret value (redacted markers only) and no secret/token/raw-call-id/phone/PII.
 *  - No runtime/external action was performed by Build 242.
 *  - The full Build 242 safety-invariant block is present.
 *  - The next recommended step is to diagnose/fix backend Vapi payload-shape handling (repo-only first).
 *  - The dry-run wrapper wires this verifier + B241 + B240 + B239 + B238 + B237 verifiers + smoke.
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

const DOC = 'docs/VAPI_ORIGINATED_WEBHOOK_DELIVERY_CORRECTED_EVIDENCE_BUILD_242.md';
const B241_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_241.md';
const B240_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_PRE_RUN_GUARD_BUILD_240.md';
const B239_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_APPROVAL_GUARD_BUILD_239.md';
const B238_DOC = 'docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md';
const B237_DOC = 'docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md';
const VERIFIER = 'backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js';
const DRY_RUN = 'scripts/run-vapi-originated-webhook-delivery-corrected-evidence-build-242-dry-run.sh';
const B241_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js';
const B240_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'VAPI_ORIGINATED_WEBHOOK_DELIVERY_OBSERVED_RECEIPT_CONFIRMED_400';
const SOURCE_COMMIT = '5f70e03';
const B240_COMMIT = '9b5f8ff';
const B239_COMMIT = 'a17d6f9';
const B238_COMMIT = '077716e';
const B237_COMMIT = '48bb25d';
const ENDPOINT = 'https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed';

(function main() {
  const before = gitStatus();
  console.log('=== Build 242 Vapi-originated webhook delivery CORRECTED evidence read-only verification (local-only) ===');
  console.log('No call. No Vapi Talk. No Vapi rerun. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No runtime/external action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B242 doc carries the exact decision token');
  pass('Build 242 correction doc exists and carries the decision token');

  // 2. References current prerequisite Build 241 commit 5f70e03 + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B242 doc references current prerequisite commit 5f70e03');
  assert(/build_241_prerequisite_commit\s*=\s*5f70e03/.test(doc),
    'B242 doc records build_241_prerequisite_commit = 5f70e03');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B242 doc records HEAD==origin/main');
  pass('B242 doc references current prerequisite Build 241 commit 5f70e03 (HEAD==origin/main)');

  // 3. Build 237 + 238 + 239 + 240 + 241 prerequisite validated states; predecessor docs exist.
  assert(/Build 237/.test(doc) && new RegExp(B237_COMMIT).test(doc) &&
    /build_237_prerequisite_status\s*=\s*validated/.test(doc),
    'B242 doc names Build 237 (48bb25d) as a validated prerequisite');
  assert(/Build 238/.test(doc) && new RegExp(B238_COMMIT).test(doc) &&
    /build_238_prerequisite_status\s*=\s*validated/.test(doc),
    'B242 doc names Build 238 (077716e) as a validated prerequisite');
  assert(/Build 239/.test(doc) && new RegExp(B239_COMMIT).test(doc) &&
    /build_239_prerequisite_status\s*=\s*validated/.test(doc),
    'B242 doc names Build 239 (a17d6f9) as a validated prerequisite');
  assert(/Build 240/.test(doc) && new RegExp(B240_COMMIT).test(doc) &&
    /build_240_prerequisite_status\s*=\s*validated/.test(doc),
    'B242 doc names Build 240 (9b5f8ff) as a validated prerequisite');
  assert(/Build 241/.test(doc) && /build_241_prerequisite_status\s*=\s*validated/.test(doc),
    'B242 doc names Build 241 as a validated prerequisite');
  for (const [d, label] of [[B237_DOC, '237'], [B238_DOC, '238'], [B239_DOC, '239'], [B240_DOC, '240'], [B241_DOC, '241']]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `Build ${label} evidence doc exists`);
  }
  pass('B242 doc names Build 237/238/239/240/241 as prerequisites and all five predecessor docs exist');

  // 4. Build 241 recorded ambiguous/not_confirmed; Build 242 corrects via later Webhooks-log inspection.
  assert(/build_241_recorded_result\s*=\s*ambiguous_not_confirmed/.test(doc),
    'B242 doc records build_241_recorded_result = ambiguous_not_confirmed');
  assert(/build_242_correction\s*=\s*vapi_originated_webhook_delivery_observed/.test(doc),
    'B242 doc records build_242_correction = vapi_originated_webhook_delivery_observed');
  assert(/Observe\s*→\s*Logs\s*→\s*Webhooks/.test(doc),
    'B242 doc cites the later Vapi Observe → Logs → Webhooks inspection');
  pass('B242 doc records Build 241 ambiguous/not_confirmed and the Build 242 correction via later Webhooks-log inspection');

  // 5. Vapi-originated webhook rows observed = true.
  assert(/vapi_originated_webhook_rows_observed\s*=\s*true/.test(doc),
    'B242 doc records vapi_originated_webhook_rows_observed = true');
  assert(/multiple POST webhook rows/.test(doc), 'B242 doc states multiple POST webhook rows were observed');
  pass('B242 doc records Vapi-originated webhook rows observed = true (multiple POST rows)');

  // 6. Webhook types include End Of Call Report, Status Update, Conversation Update, Speech Update.
  const types = [
    [/End Of Call Report/, /webhook_type_end_of_call_report\s*=\s*observed/, 'End Of Call Report'],
    [/Status Update/, /webhook_type_status_update\s*=\s*observed/, 'Status Update'],
    [/Conversation Update/, /webhook_type_conversation_update\s*=\s*observed/, 'Conversation Update'],
    [/Speech Update/, /webhook_type_speech_update\s*=\s*observed/, 'Speech Update'],
  ];
  for (const [label, status, name] of types) {
    assert(label.test(doc) && status.test(doc), `B242 doc records webhook type observed: ${name}`);
  }
  pass('B242 doc records webhook types observed: End Of Call Report, Status Update, Conversation Update, Speech Update');

  // 7. Request URL equals/contains the Railway call-completed endpoint.
  assert(doc.includes(ENDPOINT), 'B242 doc contains the exact request URL endpoint');
  assert(new RegExp('request_url\\s*=\\s*' + ENDPOINT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(doc),
    'B242 doc records request_url = the Railway call-completed endpoint');
  pass('B242 doc records the request URL equal to the Railway /webhooks/vapi/call-completed endpoint');

  // 8. Request path /webhooks/vapi/call-completed, method POST, response 400, body {}.
  assert(/request_path\s*=\s*\/webhooks\/vapi\/call-completed/.test(doc),
    'B242 doc records request_path = /webhooks/vapi/call-completed');
  assert(/request_method\s*=\s*POST/.test(doc), 'B242 doc records request_method = POST');
  assert(/response_code\s*=\s*400/.test(doc), 'B242 doc records response_code = 400');
  assert(/response_body\s*=\s*\{\}/.test(doc), 'B242 doc records response_body = {}');
  assert(/Each visible row showed response \*\*HTTP code 400\*\*/.test(doc) || /Each visible row showed response HTTP code 400/.test(doc),
    'B242 doc states each visible row showed HTTP code 400');
  pass('B242 doc records request path /webhooks/vapi/call-completed, method POST, response code 400, body {}');

  // 9. backend_receipt_confirmed = true.
  assert(/backend_receipt_confirmed\s*=\s*true/.test(doc), 'B242 doc records backend_receipt_confirmed = true');
  pass('B242 doc records backend_receipt_confirmed = true');

  // 10. auth_likely_passed = true because 400 rather than 401.
  assert(/auth_likely_passed\s*=\s*true/.test(doc), 'B242 doc records auth_likely_passed = true');
  assert(/400 rather than 401|400 rather than \*\*401\*\*/.test(doc) || /returns? \*\*HTTP 401\*\*[\s\S]{0,160}returned \*\*HTTP 400\*\*/.test(doc),
    'B242 doc reasons auth likely passed from 400 rather than 401');
  pass('B242 doc records auth_likely_passed = true because the request returned 400 rather than 401');

  // 11. vapi_originated_delivery_status = observed.
  assert(/vapi_originated_delivery_status\s*=\s*observed/.test(doc),
    'B242 doc records vapi_originated_delivery_status = observed');
  pass('B242 doc records vapi_originated_delivery_status = observed');

  // 12. Still NOT a full payload processing pass; full_payload_processing not_yet_validated; real_call not_started.
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B242 doc records full_payload_processing_status = not_yet_validated');
  assert(/NOT\b[\s\S]{0,40}full payload processing pass/i.test(doc),
    'B242 doc states this is still NOT a full payload processing pass');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B242 doc records real_call_test_status = not_started');
  pass('B242 doc records still-not-a-full-pass, full_payload_processing not_yet_validated, real_call_test not_started');

  // 13. Approval consumed + no rerun without new approval.
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B242 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B242 doc records rerun_permitted_without_new_approval = false');
  assert(/no rerun is permitted without a new|[Mm]ake \*\*no\*\* further Vapi-originated action \*\*without a new/.test(doc),
    'B242 doc states no rerun is permitted without a new separate approval');
  pass('B242 doc records the approval is consumed and no rerun is permitted without a new approval');

  // 14. No runtime/external action performed by Build 242.
  assert(/runtime_action_performed_by_build_242\s*=\s*false/.test(doc),
    'B242 doc records runtime_action_performed_by_build_242 = false');
  assert(/No Vapi rerun/.test(doc), 'B242 doc states no Vapi rerun was performed');
  pass('B242 doc records no runtime/external action was performed by Build 242');

  // 15. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B242 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B242 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B242 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B242 doc asserts no secrets printed');
  pass('B242 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 16. No phone-number-shaped, secret-shaped, token-shaped, or raw-call-id-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B242 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B242 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B242 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B242 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B242 doc contains no phone-number-shaped value');
  pass('B242 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 17. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed/i,
    /No Twilio configuration change/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No Vapi-originated webhook action executed by this build/i,
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
  for (const re of gates) assert(re.test(doc), `B242 doc missing safety invariant: ${re}`);
  pass('B242 doc states the full Build 242 safety-invariant block');

  // 18. Next recommended step = diagnose/fix backend Vapi payload-shape handling (repo-only first).
  assert(/[Nn]ext recommended step/.test(doc), 'B242 doc records the exact next recommended step');
  assert(/[Dd]iagnose\/fix[\s\S]{0,80}payload-shape handling/.test(doc),
    'B242 doc next step is to diagnose/fix backend Vapi payload-shape handling');
  assert(/repo-only\s+source inspection first/i.test(doc),
    'B242 doc next step uses repo-only source inspection first');
  assert(/[Nn]o further Vapi-originated action \*\*without a new|no further Vapi-originated action without a new|without a new, separate\s*\n?\s*approval/i.test(doc),
    'B242 doc next step forbids further Vapi-originated action without a new approval');
  pass('B242 doc next recommended step: diagnose/fix backend Vapi payload-shape handling, repo-only first, no further Vapi action without new approval');

  // 19. Dry-run wrapper exists and wires this verifier + B241 + B240 + B239 + B238 + B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B242 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B241_VERIFIER)), 'B241 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B240_VERIFIER)), 'B240 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B239_VERIFIER)), 'B239 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B238_VERIFIER)), 'B238 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B237_VERIFIER)), 'B237 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js'),
    'dry-run wrapper runs the Build 241 verifier');
  assert(dry.includes('verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js'),
    'dry-run wrapper runs the Build 240 verifier');
  assert(dry.includes('verify-vapi-originated-validation-approval-guard-build-239-readonly.js'),
    'dry-run wrapper runs the Build 239 verifier');
  assert(dry.includes('verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js'),
    'dry-run wrapper runs the Build 238 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B242 verifier present and the dry-run wrapper wires this verifier + B241 + B240 + B239 + B238 + B237 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 242 Vapi-originated webhook delivery corrected evidence packet verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_241_prerequisite_commit=5f70e03  build_241_recorded_result=ambiguous_not_confirmed  build_242_correction=vapi_originated_webhook_delivery_observed  vapi_originated_webhook_rows_observed=true  request_path=/webhooks/vapi/call-completed  request_method=POST  response_code=400  response_body={}  backend_receipt_confirmed=true  auth_likely_passed=true  vapi_originated_delivery_status=observed  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_242=false  secrets_in_repo=0  repo_unchanged=true');
})();
