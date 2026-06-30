#!/usr/bin/env node
/**
 * Build 241 Read-Only Verifier — Vapi-originated synthetic/controlled browser test
 * AMBIGUOUS / NOT-CONFIRMED evidence packet.
 *
 * Read-only. Reads the Build 241 evidence doc (and the B237 + B238 + B239 + B240 predecessor docs) as
 * text and checks `git status` before/after. No network, no Supabase call, no credential/secret
 * access, no provider client, no SMS, no Twilio, no call, no Vapi Talk, no live HTTP, no curl, no env
 * mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO Vapi-originated action.
 *
 * Build 241 captures the outcome of the single, already-approved (Build 239) Vapi-originated
 * synthetic/controlled browser test that was executed once under the Build 240 fresh pre-run guard.
 * The observed result is ambiguous / not confirmed (not a pass), and the single approval is consumed.
 *
 * This verifier proves the evidence packet is internally consistent, grounded, and safe:
 *  - The Build 241 doc exists and carries the exact decision token.
 *  - It references source commit 9b5f8ff (HEAD == origin/main) — the current prerequisite Build 240.
 *  - It names Build 237 (48bb25d), Build 238 (077716e), Build 239 (a17d6f9), and Build 240 (9b5f8ff)
 *    as prerequisite validated/approved states, and those predecessor docs exist.
 *  - The Build 240 guard passed before the action.
 *  - Exactly one approved Vapi-originated browser webCall action was performed.
 *  - Test Roofing Assistant only.
 *  - No phone dialed / no Twilio call / no SMS / no real homeowner or roofer traffic.
 *  - A Vapi call record was observed.
 *  - The Vapi log export did NOT show a server/webhook/call-completed/roofleadhq request.
 *  - Railway log review did NOT confirm backend webhook receipt.
 *  - backend_receipt_confirmed = false.
 *  - vapi_originated_validation_result = ambiguous_not_confirmed.
 *  - full_payload_processing_status = not_yet_validated.
 *  - real_call_test_status = not_started.
 *  - approval consumed and no rerun permitted without a new approval.
 *  - The doc carries no secret value (redacted markers only) and no secret/phone/PII-shaped values.
 *  - The full Build 241 safety-invariant block is present.
 *  - The next recommended step is to diagnose Vapi webhook delivery observability/configuration.
 *  - The dry-run wrapper wires this verifier + the B240 + B239 + B238 + B237 verifiers + the smoke.
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

const DOC = 'docs/VAPI_ORIGINATED_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_241.md';
const B240_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_PRE_RUN_GUARD_BUILD_240.md';
const B239_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_APPROVAL_GUARD_BUILD_239.md';
const B238_DOC = 'docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md';
const B237_DOC = 'docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md';
const VERIFIER = 'backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js';
const DRY_RUN = 'scripts/run-vapi-originated-validation-ambiguous-evidence-build-241-dry-run.sh';
const B240_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'VAPI_ORIGINATED_VALIDATION_RESULT_AMBIGUOUS_NOT_CONFIRMED';
const SOURCE_COMMIT = '9b5f8ff';
const B239_COMMIT = 'a17d6f9';
const B238_COMMIT = '077716e';
const B237_COMMIT = '48bb25d';

(function main() {
  const before = gitStatus();
  console.log('=== Build 241 Vapi-originated validation AMBIGUOUS/NOT-CONFIRMED evidence read-only verification (local-only) ===');
  console.log('No call. No Vapi Talk. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No Vapi-originated action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B241 doc carries the exact decision token');
  pass('Build 241 evidence doc exists and carries the decision token');

  // 2. References current prerequisite Build 240 commit 9b5f8ff + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B241 doc references current prerequisite commit 9b5f8ff');
  assert(/build_240_prerequisite_commit\s*=\s*9b5f8ff/.test(doc),
    'B241 doc records build_240_prerequisite_commit = 9b5f8ff');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B241 doc records HEAD==origin/main');
  pass('B241 doc references current prerequisite Build 240 commit 9b5f8ff (HEAD==origin/main)');

  // 3. Build 237 + 238 + 239 + 240 are prerequisite validated/approved; predecessor docs exist.
  assert(/Build 237/.test(doc) && new RegExp(B237_COMMIT).test(doc) &&
    /build_237_prerequisite_status\s*=\s*validated/.test(doc),
    'B241 doc names Build 237 (48bb25d) as a validated prerequisite');
  assert(/Build 238/.test(doc) && new RegExp(B238_COMMIT).test(doc) &&
    /build_238_prerequisite_status\s*=\s*validated/.test(doc),
    'B241 doc names Build 238 (077716e) as a validated prerequisite');
  assert(/Build 239/.test(doc) && new RegExp(B239_COMMIT).test(doc) &&
    /build_239_prerequisite_status\s*=\s*validated/.test(doc),
    'B241 doc names Build 239 (a17d6f9) as a validated prerequisite');
  assert(/Build 240/.test(doc) && /build_240_prerequisite_status\s*=\s*validated/.test(doc),
    'B241 doc names Build 240 as a validated prerequisite');
  assert(fs.existsSync(path.join(repoRoot, B237_DOC)), 'Build 237 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B238_DOC)), 'Build 238 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B239_DOC)), 'Build 239 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B240_DOC)), 'Build 240 evidence doc exists');
  pass('B241 doc names Build 237 + 238 + 239 + 240 as prerequisites and all four predecessor docs exist');

  // 4. Build 240 guard passed before the action.
  assert(/build_240_guard_passed_before_action\s*=\s*true/.test(doc),
    'B241 doc records build_240_guard_passed_before_action = true');
  assert(/pre_run_guard_status\s*=\s*ready/.test(doc),
    'B241 doc records the Build 240 guard pre_run_guard_status = ready');
  pass('B241 doc records the Build 240 fresh pre-run guard passed immediately before the action');

  // 5. Exactly one approved Vapi-originated browser webCall action was performed.
  assert(/vapi_originated_action_performed\s*=\s*true/.test(doc),
    'B241 doc records vapi_originated_action_performed = true');
  assert(/vapi_originated_action_count\s*=\s*1/.test(doc),
    'B241 doc records vapi_originated_action_count = 1');
  assert(/approval_count_limit\s*=\s*1/.test(doc), 'B241 doc records approval_count_limit = 1');
  assert(/ended once/i.test(doc), 'B241 doc records the browser test was ended once');
  pass('B241 doc records exactly one approved Vapi-originated browser webCall action performed');

  // 6. Test Roofing Assistant only.
  assert(/Test Roofing Assistant only/.test(doc) && /approved_assistant\s*=\s*Test Roofing Assistant only/.test(doc),
    'B241 doc scopes the action to the Test Roofing Assistant only');
  pass('B241 doc scopes the validation to the Test Roofing Assistant only');

  // 7. No phone dialed / no Twilio / no SMS / no real homeowner or roofer traffic.
  const noContact = [
    [/phone_number_dialed\s*=\s*false/, 'no phone number dialed'],
    [/twilio_call_placed\s*=\s*false/, 'no Twilio call'],
    [/sms_sent\s*=\s*false/, 'no SMS sent'],
    [/real_homeowner_traffic\s*=\s*false/, 'no real homeowner traffic'],
    [/real_roofer_traffic\s*=\s*false/, 'no real roofer traffic'],
  ];
  for (const [re, label] of noContact) assert(re.test(doc), `B241 doc records: ${label}`);
  pass('B241 doc records no phone dialed, no Twilio call, no SMS, no real homeowner/roofer traffic');

  // 8. A Vapi call record was observed.
  assert(/vapi_call_record_observed\s*=\s*true/.test(doc),
    'B241 doc records vapi_call_record_observed = true');
  pass('B241 doc records a Vapi call record was observed');

  // 9. Vapi log export did NOT show a server/webhook/call-completed/roofleadhq request.
  assert(/vapi_log_export_showed_server_webhook_request\s*=\s*false/.test(doc),
    'B241 doc records vapi_log_export_showed_server_webhook_request = false');
  assert(/did not show.*server\s*\/\s*webhook\s*\/\s*call-completed\s*\/\s*roofleadhq/i.test(doc),
    'B241 doc states the Vapi log export did not show a server/webhook/call-completed/roofleadhq row');
  pass('B241 doc records the Vapi log export did not show a server/webhook/call-completed/roofleadhq request');

  // 10. Railway log review did NOT confirm backend webhook receipt.
  assert(/railway_log_review_confirmed_backend_receipt\s*=\s*false/.test(doc),
    'B241 doc records railway_log_review_confirmed_backend_receipt = false');
  assert(/[Rr]ailway logs[\s\S]{0,80}did not confirm/.test(doc),
    'B241 doc states Railway log review did not confirm a webhook receipt');
  pass('B241 doc records Railway log review did not confirm backend webhook receipt');

  // 11. backend_receipt_confirmed = false + webhook HTTP status not observed.
  assert(/backend_receipt_confirmed\s*=\s*false/.test(doc),
    'B241 doc records backend_receipt_confirmed = false');
  assert(/webhook_http_status_observed\s*=\s*false/.test(doc),
    'B241 doc records webhook_http_status_observed = false');
  pass('B241 doc records backend_receipt_confirmed = false and webhook HTTP status not observed');

  // 12. vapi_originated_validation_result = ambiguous_not_confirmed (not pass).
  assert(/vapi_originated_validation_result\s*=\s*ambiguous_not_confirmed/.test(doc),
    'B241 doc records vapi_originated_validation_result = ambiguous_not_confirmed');
  assert(/ambiguous\s*\/\s*not_confirmed/i.test(doc) && /not\s+a?\s*pass/i.test(doc),
    'B241 doc states the result is ambiguous/not_confirmed, not a pass');
  pass('B241 doc records vapi_originated_validation_result = ambiguous_not_confirmed (not pass)');

  // 13. full_payload_processing not_yet_validated + real_call_test not_started.
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B241 doc records full_payload_processing_status = not_yet_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B241 doc records real_call_test_status = not_started');
  pass('B241 doc records full_payload_processing not_yet_validated and real_call_test not_started');

  // 14. Approval consumed + no rerun without new approval.
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B241 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B241 doc records rerun_permitted_without_new_approval = false');
  assert(/[Dd]o NOT rerun/.test(doc) && /new,?\s*separate approval/i.test(doc),
    'B241 doc states do NOT rerun without a new separate approval');
  pass('B241 doc records the approval is consumed and no rerun is permitted without a new approval');

  // 15. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B241 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B241 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B241 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B241 doc asserts no secrets printed');
  pass('B241 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 16. No phone-number-shaped, secret-shaped, or raw-call-id-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B241 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B241 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B241 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B241 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B241 doc contains no phone-number-shaped value');
  pass('B241 doc contains no secret-shaped, raw-call-id-shaped, or phone-number-shaped values');

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
  for (const re of gates) assert(re.test(doc), `B241 doc missing safety invariant: ${re}`);
  pass('B241 doc states the full Build 241 safety-invariant block');

  // 18. Next recommended step = diagnose Vapi webhook delivery observability/configuration.
  assert(/[Nn]ext recommended step/.test(doc), 'B241 doc records the exact next recommended step');
  assert(/[Dd]iagnose Vapi webhook delivery observability\s*\/\s*configuration/.test(doc),
    'B241 doc next step is to diagnose Vapi webhook delivery observability/configuration');
  assert(/before any further Vapi-originated or\s*\n?\s*real-call action/i.test(doc),
    'B241 doc next step precedes any further Vapi-originated or real-call action');
  pass('B241 doc next recommended step: diagnose Vapi webhook delivery observability/configuration before further action');

  // 19. Dry-run wrapper exists and wires this verifier + B240 + B239 + B238 + B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B241 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B240_VERIFIER)), 'B240 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B239_VERIFIER)), 'B239 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B238_VERIFIER)), 'B238 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B237_VERIFIER)), 'B237 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js'),
    'dry-run wrapper runs this verifier');
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
  pass('B241 verifier present and the dry-run wrapper wires this verifier + B240 + B239 + B238 + B237 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 241 Vapi-originated validation ambiguous/not-confirmed evidence packet verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_240_guard_passed_before_action=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  build_240_prerequisite_commit=9b5f8ff  vapi_originated_action_performed=true  vapi_originated_action_count=1  phone_number_dialed=false  twilio_call_placed=false  sms_sent=false  vapi_call_record_observed=true  vapi_log_export_showed_server_webhook_request=false  railway_log_review_confirmed_backend_receipt=false  backend_receipt_confirmed=false  vapi_originated_validation_result=ambiguous_not_confirmed  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  secrets_in_repo=0  repo_unchanged=true');
})();
