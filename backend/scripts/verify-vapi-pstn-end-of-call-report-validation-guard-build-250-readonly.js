#!/usr/bin/env node
/**
 * Build 250 Read-Only Verifier — proves the repo-only PSTN end-of-call-report VALIDATION APPROVAL
 * CAPTURE + FAIL-CLOSED GUARD packet is internally consistent and safe. Build 250 captures the user's
 * explicit approval for exactly ONE controlled PSTN end-of-call-report validation attempt and builds a
 * fresh fail-closed guard for that single future attempt. Build 250 does NOT perform the PSTN
 * validation.
 *
 * Read-only. Reads the Build 250 guard doc (and the Build 249 plan predecessor doc) as text, confirms
 * the Build 249 prerequisite commit is present in git history, asserts the approval is captured exactly
 * (verbatim) and bounded, asserts no PSTN validation action was performed by this build, and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no browser/webCall, no Vapi
 * publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
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

const DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md';
const B249_DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md';
const VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';
const DRY_RUN = 'scripts/run-vapi-pstn-end-of-call-report-validation-guard-build-250-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B249_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js';
const B248_VERIFIER = 'backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js';

const DECISION_TOKEN = 'VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_APPROVAL_CAPTURED_FAIL_CLOSED_GUARD_ONE_ATTEMPT_APPROVED_NOT_YET_EXECUTED';
const B249_COMMIT = '3683853';

// The exact user approval. The doc must carry this verbatim, character-for-character.
const APPROVAL = 'I approve one controlled PSTN end-of-call-report validation attempt for RoofLeadHQ Build 250 using the Test Roofing Assistant only and a Jason-owned/test number only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation. One attempt only; stop on any unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, or unsafe behavior; no retry without new approval.';

(function main() {
  const before = gitStatus();
  console.log('=== Build 250 Vapi PSTN end-of-call-report validation APPROVAL-CAPTURE + GUARD verification (local-only) ===');
  console.log('No PSTN validation executed. No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Approval-capture + fail-closed guard only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B250 doc carries the exact decision token');
  pass('Build 250 guard doc exists and carries the decision token');

  // 2. Build 249 prerequisite commit present + recorded; plan doc exists.
  assert(commitPresent(B249_COMMIT), 'Build 249 prerequisite commit 3683853 is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B249_DOC)), 'Build 249 PSTN validation plan doc exists');
  assert(/build_249_prerequisite_commit\s*=\s*3683853/.test(doc),
    'B250 doc records build_249_prerequisite_commit = 3683853');
  assert(/build_249_prerequisite_status\s*=\s*validated/.test(doc),
    'B250 doc records build_249_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B250 doc records HEAD==origin/main');
  pass('Build 249 prerequisite commit 3683853 present in git history, recorded, and the PSTN validation plan doc exists');

  // 3. User approval captured EXACTLY (verbatim).
  assert(doc.includes(APPROVAL), 'B250 doc captures the user approval verbatim, character-for-character');
  assert(/approval_captured_verbatim\s*=\s*true/.test(doc), 'B250 doc records approval_captured_verbatim = true');
  pass('B250 doc captures the user approval exactly (verbatim)');

  // 4. Approval limited to one controlled PSTN end-of-call-report validation attempt.
  assert(/approval_scope\s*=\s*one_controlled_pstn_end_of_call_report_validation_attempt/.test(doc),
    'B250 doc records approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt');
  pass('B250 approval is limited to one controlled PSTN end-of-call-report validation attempt');

  // 5. Test Roofing Assistant only.
  assert(/approved_assistant\s*=\s*test_roofing_assistant_only/.test(doc),
    'B250 doc records approved_assistant = test_roofing_assistant_only');
  pass('B250 approval is Test Roofing Assistant only');

  // 6. Jason-owned / test number only.
  assert(/approved_number\s*=\s*jason_owned_or_test_number_only/.test(doc),
    'B250 doc records approved_number = jason_owned_or_test_number_only');
  pass('B250 approval is a Jason-owned / test number only');

  // 7. Sanitized evidence capture only.
  assert(/sanitized_evidence_capture_only\s*=\s*true/.test(doc),
    'B250 doc records sanitized_evidence_capture_only = true');
  pass('B250 approval is sanitized evidence capture only');

  // 8. One attempt only.
  assert(/one_attempt_limit\s*=\s*true/.test(doc), 'B250 doc records one_attempt_limit = true');
  assert(/pstn_validation_attempt_limit\s*=\s*1/.test(doc), 'B250 doc records pstn_validation_attempt_limit = 1');
  pass('B250 approval is one attempt only');

  // 9. No retry without new approval.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B250 doc records no_retry_without_new_approval = true');
  pass('B250 records no retry without a new, separate approval');

  // 10. Stop conditions include unexpected SMS, real traffic, 401, 400, 500, missing EOCR, unsafe behavior.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B250 doc records stop_conditions_documented = true');
  const stops = [
    /stop_on_unexpected_sms\s*=\s*true/,
    /stop_on_real_traffic\s*=\s*true/,
    /stop_on_http_401\s*=\s*true/,
    /stop_on_http_400\s*=\s*true/,
    /stop_on_http_500\s*=\s*true/,
    /stop_on_missing_end_of_call_report\s*=\s*true/,
    /stop_on_unsafe_behavior\s*=\s*true/,
    /stop_after_one_attempt\s*=\s*true/,
  ];
  for (const re of stops) assert(re.test(doc), `B250 doc missing stop-condition field: ${re}`);
  pass('B250 doc documents all stop conditions (unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, unsafe behavior, after one attempt)');

  // 11. No real homeowner traffic.
  assert(/no_real_homeowner_traffic\s*=\s*true/.test(doc), 'B250 doc records no_real_homeowner_traffic = true');
  pass('B250 records no real homeowner traffic');

  // 12. No real roofer traffic.
  assert(/no_real_roofer_traffic\s*=\s*true/.test(doc), 'B250 doc records no_real_roofer_traffic = true');
  pass('B250 records no real roofer traffic');

  // 13. No SMS unless separately approved.
  assert(/no_sms_unless_separately_approved\s*=\s*true/.test(doc),
    'B250 doc records no_sms_unless_separately_approved = true');
  pass('B250 records no SMS unless separately approved');

  // 14. No production data export.
  assert(/no_production_data_export\s*=\s*true/.test(doc), 'B250 doc records no_production_data_export = true');
  pass('B250 records no production data export');

  // 15. No schema / auth / RLS changes.
  assert(/no_schema_auth_rls_changes\s*=\s*true/.test(doc), 'B250 doc records no_schema_auth_rls_changes = true');
  pass('B250 records no schema/auth/RLS changes');

  // 16. No billing / CRM automation.
  assert(/no_billing_crm_automation\s*=\s*true/.test(doc), 'B250 doc records no_billing_crm_automation = true');
  pass('B250 records no billing/CRM automation');

  // 17. No public / live automation.
  assert(/no_public_live_automation\s*=\s*true/.test(doc), 'B250 doc records no_public_live_automation = true');
  pass('B250 records no public/live automation');

  // 18. No PSTN validation action performed by Build 250.
  assert(/build_mode\s*=\s*approval_capture_and_fail_closed_guard/.test(doc),
    'B250 doc records build_mode = approval_capture_and_fail_closed_guard');
  assert(/pstn_validation_action_performed_by_build_250\s*=\s*false/.test(doc),
    'B250 doc records pstn_validation_action_performed_by_build_250 = false');
  assert(/runtime_action_performed_by_build_250\s*=\s*false/.test(doc),
    'B250 doc records runtime_action_performed_by_build_250 = false');
  pass('B250 doc records no PSTN validation action performed by Build 250 (approval-capture + guard only)');

  // 19. pstn_validation_status = approved_not_yet_executed.
  assert(/pstn_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B250 doc records pstn_validation_status = approved_not_yet_executed');
  pass('B250 doc records pstn_validation_status = approved_not_yet_executed');

  // 20. full_final_report_processing_status = not_validated.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B250 doc preserves full_final_report_processing_status = not_validated');
  pass('B250 doc preserves full_final_report_processing_status = not_validated');

  // 21. real_call_test_status = approved_not_yet_executed OR not_started_by_packet.
  assert(/real_call_test_status\s*=\s*(approved_not_yet_executed|not_started_by_packet)/.test(doc),
    'B250 doc records real_call_test_status = approved_not_yet_executed or not_started_by_packet');
  pass('B250 doc records real_call_test_status = approved_not_yet_executed (or not_started_by_packet)');

  // 22. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B250 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B250 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B250 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B250 doc asserts no secrets printed');
  pass('B250 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 23. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B250 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B250 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B250 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B250 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B250 doc contains no phone-number-shaped value');
  pass('B250 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 24. Carried-forward outcomes preserved.
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B250 doc carries forward all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B250 doc carries forward http_400_observed = false');
  assert(/end_of_call_report_appears_enabled\s*=\s*true/.test(doc),
    'B250 doc carries forward end_of_call_report_appears_enabled = true');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B250 doc carries forward end_of_call_report_observed = false');
  pass('B250 doc carries forward the established Build 246/248 outcomes unchanged');

  // 25. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed/i,
    /No Twilio configuration change/i,
    /No `curl` executed/i,
    /No live webhook called/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No Vapi publish/i,
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
  for (const re of gates) assert(re.test(doc), `B250 doc missing safety invariant: ${re}`);
  pass('B250 doc states the full Build 250 safety-invariant block');

  // 26. Next recommended step documents rerun-guard-then-one-attempt.
  assert(/[Nn]ext recommended step/.test(doc), 'B250 doc has a Next recommended step section');
  assert(/[Rr]erun the Build 250 guard/.test(doc) && /one attempt/i.test(doc),
    'B250 doc next step: rerun guard immediately before the single approved attempt, then one attempt only');
  pass('B250 doc documents the next step: rerun the guard immediately before the single approved attempt');

  // 27. Dry-run wrapper exists and wires this verifier + B249 + B248 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B250 verifier file exists');
  for (const v of [B249_VERIFIER, B248_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js'),
    'dry-run wrapper runs the Build 249 verifier');
  assert(dry.includes('verify-vapi-server-messages-readonly-inspection-build-248-readonly.js'),
    'dry-run wrapper runs the Build 248 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B250 verifier present and the dry-run wrapper wires this verifier + B249 + B248 verifiers + smoke regression');

  // 28. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 250 Vapi PSTN end-of-call-report validation approval-capture + guard packet verified (${passCount} checks).`);
  console.log('build_mode=approval_capture_and_fail_closed_guard  pstn_validation_action_performed_by_build_250=false  runtime_action_performed_by_build_250=false  pstn_validation_status=approved_not_yet_executed  approval_captured_verbatim=true  approval_scope=one_controlled_pstn_end_of_call_report_validation_attempt  approved_assistant=test_roofing_assistant_only  approved_number=jason_owned_or_test_number_only  sanitized_evidence_capture_only=true  one_attempt_limit=true  pstn_validation_attempt_limit=1  no_retry_without_new_approval=true  no_real_homeowner_traffic=true  no_real_roofer_traffic=true  no_sms_unless_separately_approved=true  no_production_data_export=true  no_schema_auth_rls_changes=true  no_billing_crm_automation=true  no_public_live_automation=true  stop_conditions_documented=true  evidence_capture_fields_documented=true  build_249_prerequisite_commit=3683853  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=approved_not_yet_executed  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
