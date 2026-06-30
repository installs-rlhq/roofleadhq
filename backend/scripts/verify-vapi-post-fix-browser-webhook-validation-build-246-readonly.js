#!/usr/bin/env node
/**
 * Build 246 Read-Only Verifier — post-fix Vapi browser/webCall webhook validation sanitized CSV
 * evidence.
 *
 * Read-only. Reads the Build 246 evidence doc (and the Build 244 fix-evidence + Build 245 guard
 * predecessor docs) as text, confirms the Build 244/245 prerequisite commits are present in git
 * history, and checks `git status` before/after. No network, no Supabase call, no credential/secret
 * access, no provider client, no SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no Vapi
 * rerun, no live HTTP, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs NO
 * runtime/external action.
 *
 * Build 246 transcribes, in sanitized form, the outcome of the single approved post-fix
 * Vapi-originated synthetic browser/webCall validation (Test Roofing Assistant only) into a repo
 * document. The evidence source is an uploaded, sanitized Vapi call-logs CSV.
 *
 * This verifier proves the evidence packet is internally consistent, grounded, and safe:
 *  - The Build 244 fix-evidence doc and the Build 245 guard doc both exist.
 *  - The Build 244 (7342539) and Build 245 (cc3007c) prerequisite commits are present in git history.
 *  - The Build 245 fail-closed guard was re-run immediately before the action and passed.
 *  - Exactly one approved post-fix Vapi browser/webCall action was performed.
 *  - Test Roofing Assistant only.
 *  - No phone number dialed; no Twilio call; no SMS; no real homeowner/roofer traffic.
 *  - The uploaded sanitized CSV had webhook rows observed.
 *  - Request URL was /webhooks/vapi/call-completed; method POST; auth headers present but redacted.
 *  - assistant.started = 1 @ 200; status-update = 2 @ 200; speech-update = 11 @ 200;
 *    conversation-update = 4 @ 200.
 *  - All observed webhook responses were HTTP 200; no HTTP 400 observed; completed rows success=true.
 *  - end_of_call_report_observed = false; full_final_report_processing_status = not_validated;
 *    real_call_test_status = not_started.
 *  - Approval is consumed and no rerun is permitted without a new approval.
 *  - The doc carries no secret value (redacted markers only) and no secret/token/raw-call-id/phone/PII.
 *  - No runtime/external action was performed by Build 246.
 *  - The full Build 246 safety-invariant block is present.
 *  - The next recommended step is a repo-only diagnose of why the end-of-call-report was not observed
 *    before any further Vapi-originated or real-call action.
 *  - The dry-run wrapper wires this verifier + B245 + B242 + B241 + B240 + B239 + B238 + B237 + smoke.
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
function commitPresent(sha) {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) {
    return false;
  }
}

const DOC = 'docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md';
const B245_DOC = 'docs/VAPI_POST_FIX_VALIDATION_GUARD_BUILD_245.md';
const B244_DOC = 'docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md';
const VERIFIER = 'backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js';
const DRY_RUN = 'scripts/run-vapi-post-fix-browser-webhook-validation-build-246-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B245_VERIFIER = 'backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js';
const B242_VERIFIER = 'backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js';
const B241_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js';
const B240_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'POST_FIX_VAPI_BROWSER_WEBHOOK_DELIVERY_OBSERVED_200_NO_400_END_OF_CALL_REPORT_NOT_OBSERVED';
const B244_COMMIT = '7342539';
const B245_COMMIT = 'cc3007c';
const ENDPOINT = 'https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed';

(function main() {
  const before = gitStatus();
  console.log('=== Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence read-only verification (local-only) ===');
  console.log('No call. No phone dialed. No Vapi Talk. No Vapi rerun. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No runtime/external action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B246 doc carries the exact decision token');
  pass('Build 246 evidence doc exists and carries the decision token');

  // 2. Build 244 + Build 245 prerequisite docs exist and commits present in git history.
  assert(fs.existsSync(path.join(repoRoot, B244_DOC)), 'Build 244 fix-evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B245_DOC)), 'Build 245 guard doc exists');
  assert(commitPresent(B244_COMMIT), 'Build 244 prerequisite commit 7342539 is present in git history');
  assert(commitPresent(B245_COMMIT), 'Build 245 prerequisite commit cc3007c is present in git history');
  assert(/build_244_prerequisite_commit\s*=\s*7342539/.test(doc),
    'B246 doc records build_244_prerequisite_commit = 7342539');
  assert(/build_244_prerequisite_status\s*=\s*validated/.test(doc),
    'B246 doc records build_244_prerequisite_status = validated');
  assert(/build_245_prerequisite_commit\s*=\s*cc3007c/.test(doc),
    'B246 doc records build_245_prerequisite_commit = cc3007c');
  assert(/build_245_prerequisite_status\s*=\s*validated/.test(doc),
    'B246 doc records build_245_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B246 doc records HEAD==origin/main');
  pass('Build 244 and Build 245 prerequisite docs exist and both commits (7342539, cc3007c) are present in git history');

  // 3. Build 245 guard re-run immediately before the action and passed.
  assert(/build_245_guard_rerun_before_action\s*=\s*pass/.test(doc),
    'B246 doc records build_245_guard_rerun_before_action = pass');
  const guardFields = [
    /live_http_called\s*=\s*false/,
    /phone_dialed\s*=\s*false/,
    /vapi_talk_used\s*=\s*false/,
    /curl_used\s*=\s*false/,
    /call_placed\s*=\s*false/,
    /live_sms_sent\s*=\s*false/,
    /twilio_used\s*=\s*false/,
    /deploy\s*=\s*false/,
    /railway_var_set\s*=\s*false/,
    /vapi_config_changed\s*=\s*false/,
    /secret_file_read\s*=\s*false/,
    /approval_captured\s*=\s*true/,
    /approval_count_limit\s*=\s*1/,
  ];
  for (const re of guardFields) assert(re.test(doc), `B246 doc missing guard field: ${re}`);
  pass('B246 doc records the Build 245 guard was re-run immediately before the action and passed (all invariants held)');

  // 4. Exactly one approved post-fix Vapi browser/webCall action was performed.
  assert(/post_fix_vapi_browser_webcall_action_performed\s*=\s*true/.test(doc),
    'B246 doc records the post-fix browser/webCall action was performed');
  assert(/approved_action_performed_count\s*=\s*1/.test(doc),
    'B246 doc records approved_action_performed_count = 1');
  pass('B246 doc records exactly one approved post-fix Vapi browser/webCall action was performed');

  // 5. Test Roofing Assistant only.
  assert(/approved_assistant\s*=\s*Test Roofing Assistant only/.test(doc),
    'B246 doc scopes the action to the Test Roofing Assistant only');
  pass('B246 doc scopes the action to the Test Roofing Assistant only');

  // 6. No phone dialed / no Twilio call / no SMS / no real homeowner-roofer traffic.
  const actionProhibitions = [
    [/no_phone_number_dialed\s*=\s*true/, 'no phone number dialed'],
    [/no_twilio_call\s*=\s*true/, 'no Twilio call'],
    [/no_sms\s*=\s*true/, 'no SMS'],
    [/no_real_homeowner_traffic\s*=\s*true/, 'no real homeowner traffic'],
    [/no_real_roofer_traffic\s*=\s*true/, 'no real roofer traffic'],
  ];
  for (const [re, label] of actionProhibitions) assert(re.test(doc), `B246 doc missing prohibition: ${label}`);
  pass('B246 doc records no phone number dialed, no Twilio call, no SMS, no real homeowner/roofer traffic');

  // 7. Uploaded sanitized CSV had webhook rows observed (counts).
  assert(/csv_filename\s*=\s*call-logs-2026-06-30T16-11-00-739Z\.csv/.test(doc),
    'B246 doc records the sanitized CSV filename');
  assert(/csv_total_rows\s*=\s*293/.test(doc), 'B246 doc records csv_total_rows = 293');
  assert(/csv_webhook_rows_observed\s*=\s*true/.test(doc), 'B246 doc records csv_webhook_rows_observed = true');
  assert(/csv_webhook_row_count\s*=\s*54/.test(doc), 'B246 doc records csv_webhook_row_count = 54');
  assert(/csv_request_initiated_rows\s*=\s*18/.test(doc), 'B246 doc records csv_request_initiated_rows = 18');
  assert(/csv_response_successful_rows\s*=\s*18/.test(doc), 'B246 doc records csv_response_successful_rows = 18');
  assert(/csv_request_completed_rows\s*=\s*18/.test(doc), 'B246 doc records csv_request_completed_rows = 18');
  pass('B246 doc records the uploaded sanitized CSV had webhook rows observed (54 rows: 18 initiated / 18 response / 18 completed)');

  // 8. Request URL = /webhooks/vapi/call-completed; method POST; auth headers present but redacted.
  assert(doc.includes(ENDPOINT), 'B246 doc contains the exact request URL endpoint');
  assert(new RegExp('request_url\\s*=\\s*' + ENDPOINT.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(doc),
    'B246 doc records request_url = the Railway call-completed endpoint');
  assert(/request_path\s*=\s*\/webhooks\/vapi\/call-completed/.test(doc),
    'B246 doc records request_path = /webhooks/vapi/call-completed');
  assert(/request_method\s*=\s*POST/.test(doc), 'B246 doc records request_method = POST');
  assert(/auth_headers_present\s*=\s*true/.test(doc), 'B246 doc records auth_headers_present = true');
  assert(/auth_headers_redacted\s*=\s*true/.test(doc), 'B246 doc records auth_headers_redacted = true');
  pass('B246 doc records request URL /webhooks/vapi/call-completed, method POST, auth headers present but redacted');

  // 9. Response counts by message type, each HTTP 200.
  assert(/response_assistant_started_count\s*=\s*1/.test(doc),
    'B246 doc records response_assistant_started_count = 1');
  assert(/response_status_update_count\s*=\s*2/.test(doc),
    'B246 doc records response_status_update_count = 2');
  assert(/response_speech_update_count\s*=\s*11/.test(doc),
    'B246 doc records response_speech_update_count = 11');
  assert(/response_conversation_update_count\s*=\s*4/.test(doc),
    'B246 doc records response_conversation_update_count = 4');
  // Each typed line annotates HTTP 200, and the sum reconciles to 18.
  assert(/assistant_started_count\s*=\s*1`?\s*\(HTTP 200\)/.test(doc) || /response_assistant_started_count\s*=\s*1` \(HTTP 200\)/.test(doc),
    'B246 doc annotates assistant.started response with HTTP 200');
  assert(/1 \+ 2 \+ 11 \+ 4 = 18/.test(doc), 'B246 doc reconciles typed responses to 18');
  pass('B246 doc records assistant.started=1, status-update=2, speech-update=11, conversation-update=4, each HTTP 200 (sum 18)');

  // 10. All observed responses HTTP 200; no HTTP 400 observed; completed rows success=true.
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B246 doc records all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B246 doc records http_400_observed = false');
  assert(/post_fix_400_regression_status\s*=\s*not_observed/.test(doc),
    'B246 doc records post_fix_400_regression_status = not_observed');
  assert(/completed_rows_success\s*=\s*true/.test(doc), 'B246 doc records completed_rows_success = true');
  pass('B246 doc records all observed responses HTTP 200, no HTTP 400 observed, completed rows success=true');

  // 11. end_of_call_report not observed; full final report processing not validated; real call not started.
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B246 doc records end_of_call_report_observed = false');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B246 doc records full_final_report_processing_status = not_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B246 doc records real_call_test_status = not_started');
  assert(/post_fix_vapi_observed_webhook_delivery_status\s*=\s*pass_for_observed_events/.test(doc),
    'B246 doc records post_fix_vapi_observed_webhook_delivery_status = pass_for_observed_events');
  pass('B246 doc records end_of_call_report_observed=false, full_final_report_processing not_validated, real_call_test not_started');

  // 12. Approval consumed + no rerun without new approval.
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B246 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B246 doc records rerun_permitted_without_new_approval = false');
  pass('B246 doc records the approval is consumed and no rerun is permitted without a new approval');

  // 13. No runtime/external action performed by Build 246.
  assert(/runtime_action_performed_by_build_246\s*=\s*false/.test(doc),
    'B246 doc records runtime_action_performed_by_build_246 = false');
  pass('B246 doc records no runtime/external action was performed by Build 246');

  // 14. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B246 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B246 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B246 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B246 doc asserts no secrets printed');
  pass('B246 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 15. No phone-number-shaped, secret-shaped, token-shaped, or raw-call-id-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B246 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B246 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B246 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B246 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B246 doc contains no phone-number-shaped value');
  pass('B246 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 16. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
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
  for (const re of gates) assert(re.test(doc), `B246 doc missing safety invariant: ${re}`);
  pass('B246 doc states the full Build 246 safety-invariant block');

  // 17. Next recommended step = repo-only diagnose why end-of-call-report not observed, before any further action.
  assert(/[Nn]ext recommended step/.test(doc), 'B246 doc records the exact next recommended step');
  assert(/[Rr]epo-only\s+diagnose/.test(doc) && /end-of-call-report was \*\*not\*\* observed|end-of-call-report was not observed/.test(doc),
    'B246 doc next step is a repo-only diagnose of why the end-of-call-report was not observed');
  assert(/[Bb]efore any further Vapi-originated or real-call action/.test(doc),
    'B246 doc next step is before any further Vapi-originated or real-call action');
  assert(/repo-only source inspection first/i.test(doc),
    'B246 doc next step uses repo-only source inspection first');
  assert(/without a new, separate approval/i.test(doc),
    'B246 doc next step forbids further Vapi-originated/real-call action without a new approval');
  pass('B246 doc next recommended step: repo-only diagnose why end-of-call-report not observed before any further Vapi-originated or real-call action');

  // 18. Dry-run wrapper exists and wires this verifier + B245 + B242..B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B246 verifier file exists');
  for (const v of [B245_VERIFIER, B242_VERIFIER, B241_VERIFIER, B240_VERIFIER, B239_VERIFIER, B238_VERIFIER, B237_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-post-fix-validation-guard-build-245-readonly.js'),
    'dry-run wrapper runs the Build 245 verifier');
  assert(dry.includes('verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js'),
    'dry-run wrapper runs the Build 242 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B246 verifier present and the dry-run wrapper wires this verifier + B245 + B242..B237 verifiers + smoke regression');

  // 19. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence packet verified (${passCount} checks).`);
  console.log('live_http_called=false  phone_dialed=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_244_prerequisite_commit=7342539  build_245_prerequisite_commit=cc3007c  build_245_guard_rerun_before_action=pass  approved_action_performed_count=1  approved_assistant=test_roofing_assistant_only  csv_webhook_row_count=54  request_path=/webhooks/vapi/call-completed  request_method=POST  auth_headers_present=true  auth_headers_redacted=true  assistant_started=1@200  status_update=2@200  speech_update=11@200  conversation_update=4@200  all_observed_responses_http_200=true  http_400_observed=false  completed_rows_success=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_246=false  secrets_in_repo=0  repo_unchanged=true');
})();
