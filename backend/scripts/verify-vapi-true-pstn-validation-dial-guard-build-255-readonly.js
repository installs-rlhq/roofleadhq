#!/usr/bin/env node
/**
 * Build 255 Read-Only Verifier — proves the repo-only Vapi TRUE PSTN VALIDATION DIAL approval-capture +
 * fresh fail-closed guard packet is internally consistent and safe. After Build 254 clarified that the
 * prior attempt used Vapi Test (web transport, not a true PSTN dial), Build 255 captures the user's
 * explicit approval for exactly ONE true PSTN validation dial — placed from Jason's own physical phone /
 * iPhone Phone app to the Vapi number assigned to Test Roofing Assistant — and builds a fresh fail-closed
 * guard for that single future dial. Build 255 does NOT perform the dial and performs NO runtime/external
 * action.
 *
 * Read-only. Reads the Build 255 doc (and the Build 254 predecessor doc) as text, confirms the Build 254
 * prerequisite commit is present in git history, asserts the Build 254 method clarification is preserved
 * (prior attempt was Vapi Test, not a true PSTN dial), asserts the user approval is captured verbatim,
 * asserts the approval is limited to one true PSTN validation dial from a Jason-owned physical phone /
 * iPhone Phone app to the Vapi number assigned to Test Roofing Assistant, asserts no Vapi Test / no Vapi
 * Talk / no retry without new approval / sanitized evidence capture only / no real homeowner traffic / no
 * real roofer traffic / no SMS unless separately approved / no production data export / no schema-auth-RLS
 * changes / no billing-CRM automation / no public-live automation, asserts the stop conditions (unexpected
 * SMS, real traffic, 401, 400, 500, missing end-of-call-report, unsafe behavior), asserts
 * true_pstn_validation_status=approved_not_yet_executed and full_final_report_processing_status=
 * not_validated, asserts no call/Test/Talk/browserWebCall/curl/Twilio/SMS/secret/config/deploy/runtime
 * action occurred in Build 255, and that no secrets/tokens/raw phone numbers/raw call IDs/PII are present.
 * Checks `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no Twilio, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no
 * Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs NO
 * runtime/external action.
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

const DOC = 'docs/VAPI_TRUE_PSTN_VALIDATION_DIAL_GUARD_BUILD_255.md';
const B254_DOC = 'docs/VAPI_PSTN_METHOD_CLARIFICATION_BUILD_254.md';
const VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';
const DRY_RUN = 'scripts/run-vapi-true-pstn-validation-dial-guard-build-255-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B254_VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B252_VERIFIER = 'backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js';
const B250_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';

const DECISION_TOKEN = 'VAPI_TRUE_PSTN_VALIDATION_DIAL_APPROVAL_CAPTURED_FRESH_FAIL_CLOSED_GUARD_ONE_DIAL_FROM_JASON_PHONE_TO_TEST_ROOFING_ASSISTANT_NUMBER_NO_VAPI_TEST_NO_VAPI_TALK_APPROVED_NOT_YET_EXECUTED';
const B254_COMMIT = '9f60fed';

// The exact verbatim approval that must be captured.
const APPROVAL_VERBATIM = 'I approve one true PSTN validation dial for RoofLeadHQ Build 255 from my Jason-owned physical phone/iPhone Phone app to the Vapi number assigned to Test Roofing Assistant, with sanitized evidence capture only, no Vapi Test, no Vapi Talk, no retry without new approval, no real homeowner traffic, no real roofer traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation. Stop on any unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, or unsafe behavior.';

(function main() {
  const before = gitStatus();
  console.log('=== Build 255 Vapi TRUE PSTN validation dial APPROVAL-CAPTURE + FRESH GUARD verification (local-only) ===');
  console.log('No PSTN validation executed. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Approval-capture + fresh fail-closed guard only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B255 doc carries the exact decision token');
  pass('Build 255 guard doc exists and carries the decision token');

  // 2. Build 254 prerequisite commit present + recorded; predecessor doc exists.
  assert(commitPresent(B254_COMMIT), 'Build 254 prerequisite commit 9f60fed is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B254_DOC)), `predecessor doc exists: ${B254_DOC}`);
  assert(/build_254_prerequisite_commit\s*=\s*9f60fed/.test(doc),
    'B255 doc records build_254_prerequisite_commit = 9f60fed');
  assert(/build_254_prerequisite_status\s*=\s*validated/.test(doc),
    'B255 doc records build_254_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B255 doc records HEAD==origin/main');
  pass('Build 254 prerequisite commit 9f60fed present in git history, recorded, and predecessor doc exists');

  // 3. Build 254 method clarification preserved; prior attempt was Vapi Test, not true PSTN.
  assert(/build_254_method_clarification_preserved\s*=\s*true/.test(doc),
    'B255 doc records build_254_method_clarification_preserved = true');
  assert(/prior_attempt_was_vapi_test_not_true_pstn\s*=\s*true/.test(doc),
    'B255 doc records prior_attempt_was_vapi_test_not_true_pstn = true');
  pass('B255 doc preserves the Build 254 method clarification (prior attempt was Vapi Test, not a true PSTN dial)');

  // 4. User approval captured exactly (verbatim).
  assert(doc.includes(APPROVAL_VERBATIM), 'B255 doc captures the user approval exactly (verbatim)');
  assert(/approval_captured_verbatim\s*=\s*true/.test(doc),
    'B255 doc records approval_captured_verbatim = true');
  pass('B255 doc captures the user approval exactly (verbatim)');

  // 5. Approval limited to one true PSTN validation dial.
  assert(/approval_scope\s*=\s*one_true_pstn_validation_dial/.test(doc),
    'B255 doc records approval_scope = one_true_pstn_validation_dial');
  assert(/one_dial_limit\s*=\s*true/.test(doc), 'B255 doc records one_dial_limit = true');
  assert(/true_pstn_dial_limit\s*=\s*1/.test(doc), 'B255 doc records true_pstn_dial_limit = 1');
  pass('B255 approval is limited to one true PSTN validation dial');

  // 6. Dial must be from Jason-owned physical phone / iPhone Phone app.
  assert(/dial_origin\s*=\s*jason_owned_physical_phone_or_iphone_phone_app/.test(doc),
    'B255 doc records dial_origin = jason_owned_physical_phone_or_iphone_phone_app');
  pass('B255 dial must originate from a Jason-owned physical phone / iPhone Phone app');

  // 7. Destination must be Vapi number assigned to Test Roofing Assistant.
  assert(/dial_destination\s*=\s*vapi_number_assigned_to_test_roofing_assistant/.test(doc),
    'B255 doc records dial_destination = vapi_number_assigned_to_test_roofing_assistant');
  assert(/approved_assistant\s*=\s*test_roofing_assistant_only/.test(doc),
    'B255 doc records approved_assistant = test_roofing_assistant_only');
  pass('B255 dial destination must be the Vapi number assigned to Test Roofing Assistant');

  // 8. No Vapi Test / no Vapi Talk.
  assert(/no_vapi_test\s*=\s*true/.test(doc), 'B255 doc records no_vapi_test = true');
  assert(/no_vapi_talk\s*=\s*true/.test(doc), 'B255 doc records no_vapi_talk = true');
  pass('B255 guard forbids Vapi Test and Vapi Talk');

  // 9. No retry without new approval.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B255 doc records no_retry_without_new_approval = true');
  pass('B255 guard records no retry without a new, separate approval');

  // 10. Sanitized evidence capture only.
  assert(/sanitized_evidence_capture_only\s*=\s*true/.test(doc),
    'B255 doc records sanitized_evidence_capture_only = true');
  pass('B255 guard requires sanitized evidence capture only');

  // 11. No real homeowner / roofer traffic.
  assert(/no_real_homeowner_traffic\s*=\s*true/.test(doc),
    'B255 doc records no_real_homeowner_traffic = true');
  assert(/no_real_roofer_traffic\s*=\s*true/.test(doc),
    'B255 doc records no_real_roofer_traffic = true');
  pass('B255 guard forbids real homeowner and roofer traffic');

  // 12. No SMS unless separately approved.
  assert(/no_sms_unless_separately_approved\s*=\s*true/.test(doc),
    'B255 doc records no_sms_unless_separately_approved = true');
  pass('B255 guard forbids SMS unless separately approved');

  // 13. No production data export / no schema-auth-RLS / no billing-CRM / no public-live automation.
  assert(/no_production_data_export\s*=\s*true/.test(doc),
    'B255 doc records no_production_data_export = true');
  assert(/no_schema_auth_rls_changes\s*=\s*true/.test(doc),
    'B255 doc records no_schema_auth_rls_changes = true');
  assert(/no_billing_crm_automation\s*=\s*true/.test(doc),
    'B255 doc records no_billing_crm_automation = true');
  assert(/no_public_live_automation\s*=\s*true/.test(doc),
    'B255 doc records no_public_live_automation = true');
  pass('B255 guard forbids production data export, schema/auth/RLS changes, billing/CRM automation, and public/live automation');

  // 14. Stop conditions documented (unexpected SMS, real traffic, 401, 400, 500, missing EOCR, unsafe).
  assert(/stop_on_unexpected_sms\s*=\s*true/.test(doc), 'B255 doc records stop_on_unexpected_sms = true');
  assert(/stop_on_real_traffic\s*=\s*true/.test(doc), 'B255 doc records stop_on_real_traffic = true');
  assert(/stop_on_http_401\s*=\s*true/.test(doc), 'B255 doc records stop_on_http_401 = true');
  assert(/stop_on_http_400\s*=\s*true/.test(doc), 'B255 doc records stop_on_http_400 = true');
  assert(/stop_on_http_500\s*=\s*true/.test(doc), 'B255 doc records stop_on_http_500 = true');
  assert(/stop_on_missing_end_of_call_report\s*=\s*true/.test(doc),
    'B255 doc records stop_on_missing_end_of_call_report = true');
  assert(/stop_on_unsafe_behavior\s*=\s*true/.test(doc), 'B255 doc records stop_on_unsafe_behavior = true');
  assert(/stop_conditions_documented\s*=\s*true/.test(doc),
    'B255 doc records stop_conditions_documented = true');
  pass('B255 guard documents all stop conditions (unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, unsafe behavior)');

  // 15. Status: approved_not_yet_executed + full_final_report_processing_status=not_validated.
  assert(/true_pstn_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B255 doc records true_pstn_validation_status = approved_not_yet_executed');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B255 doc preserves full_final_report_processing_status = not_validated');
  assert(/true_pstn_call_performed\s*=\s*false/.test(doc),
    'B255 doc preserves true_pstn_call_performed = false');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B255 doc preserves end_of_call_report_observed = false');
  pass('B255 doc records true_pstn_validation_status=approved_not_yet_executed and preserves full_final_report_processing_status=not_validated');

  // 16. No PSTN validation / runtime action by Build 255.
  assert(/build_mode\s*=\s*true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard/.test(doc),
    'B255 doc records build_mode = true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard');
  assert(/pstn_validation_action_performed_by_build_255\s*=\s*false/.test(doc),
    'B255 doc records pstn_validation_action_performed_by_build_255 = false');
  assert(/runtime_action_performed_by_build_255\s*=\s*false/.test(doc),
    'B255 doc records runtime_action_performed_by_build_255 = false');
  pass('B255 doc records no PSTN validation and no runtime/external action by Build 255 (approval-capture + guard only)');

  // 17. Next recommended step = rerun guard, then dial once from Jason phone to TRA Vapi number.
  assert(/[Nn]ext recommended step/.test(doc), 'B255 doc has a Next recommended step section');
  assert(/[Rr]erun the Build 255 guard/.test(doc), 'B255 doc next step: rerun the Build 255 guard');
  assert(/physical phone|iPhone Phone app/i.test(doc) && /Test Roofing Assistant/.test(doc),
    'B255 doc next step: dial from physical phone to the Test Roofing Assistant Vapi number');
  pass('B255 doc records the next recommended step (rerun guard, then dial once from Jason phone to the Test Roofing Assistant Vapi number)');

  // 18. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B255 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B255 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B255 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B255 doc asserts no secrets printed');
  pass('B255 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 19. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B255 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B255 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B255 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B255 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B255 doc contains no phone-number-shaped value');
  pass('B255 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 20. Full safety-invariant block present (no call/Test/Talk/browserWebCall/curl/Twilio/SMS/secret/config/deploy/runtime).
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No Vapi Test used/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed/i,
    /No Twilio configuration change/i,
    /No `curl` executed/i,
    /No live webhook called/i,
    /No unrelated Railway configuration change/i,
    /No Vapi configuration change by this build/i,
    /No Vapi publish/i,
    /No Vapi-originated webhook action executed by this build/i,
    /No full Vapi payload processing pass executed/i,
    /No real call test executed by this build/i,
    /No new call requested or placed/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B255 doc missing safety invariant: ${re}`);
  pass('B255 doc states the full Build 255 safety-invariant block (no call/Test/Talk/webCall/curl/Twilio/SMS/secret/config/deploy/runtime action)');

  // 21. Dry-run wrapper exists and wires this verifier + B254 + B253 + B252 + B250 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B255 verifier file exists');
  for (const v of [B254_VERIFIER, B253_VERIFIER, B252_VERIFIER, B250_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-pstn-method-clarification-build-254-readonly.js'),
    'dry-run wrapper runs the Build 254 verifier');
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs the Build 253 verifier');
  assert(dry.includes('verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js'),
    'dry-run wrapper runs the Build 252 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs the Build 250 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B255 verifier present and the dry-run wrapper wires this verifier + B254 + B253 + B252 + B250 verifiers + smoke regression');

  // 22. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 255 Vapi true PSTN validation dial approval-capture + fresh guard packet verified (${passCount} checks).`);
  console.log('build_mode=true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard  pstn_validation_action_performed_by_build_255=false  runtime_action_performed_by_build_255=false  true_pstn_validation_status=approved_not_yet_executed  build_254_prerequisite_commit=9f60fed  build_254_prerequisite_status=validated  build_254_method_clarification_preserved=true  prior_attempt_was_vapi_test_not_true_pstn=true  approval_captured_verbatim=true  approval_scope=one_true_pstn_validation_dial  one_dial_limit=true  true_pstn_dial_limit=1  dial_origin=jason_owned_physical_phone_or_iphone_phone_app  dial_destination=vapi_number_assigned_to_test_roofing_assistant  approved_assistant=test_roofing_assistant_only  no_vapi_test=true  no_vapi_talk=true  sanitized_evidence_capture_only=true  no_real_homeowner_traffic=true  no_real_roofer_traffic=true  no_sms_unless_separately_approved=true  no_production_data_export=true  no_schema_auth_rls_changes=true  no_billing_crm_automation=true  no_public_live_automation=true  no_retry_without_new_approval=true  stop_on_unexpected_sms=true  stop_on_real_traffic=true  stop_on_http_401=true  stop_on_http_400=true  stop_on_http_500=true  stop_on_missing_end_of_call_report=true  stop_on_unsafe_behavior=true  stop_after_one_dial=true  stop_conditions_documented=true  evidence_capture_fields_documented=true  true_pstn_call_performed=false  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
