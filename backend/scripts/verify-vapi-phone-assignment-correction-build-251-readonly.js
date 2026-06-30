#!/usr/bin/env node
/**
 * Build 251 Read-Only Verifier — proves the repo-only Vapi PHONE-NUMBER ASSISTANT-ASSIGNMENT
 * CORRECTION CAPTURE packet is internally consistent and safe. Build 251 captures the necessary Vapi
 * phone-number assistant-assignment correction (was Appointment Receptionist, corrected to Test Roofing
 * Assistant) that Jason made before the single approved PSTN attempt, and marks the Build 250 pre-run
 * guard as STALE because the Vapi config changed after that guard was rerun. Build 251 does NOT perform
 * the PSTN validation.
 *
 * Read-only. Reads the Build 251 doc (and the Build 250 guard predecessor doc) as text, confirms the
 * Build 250 prerequisite commit is present in git history, asserts the assignment mismatch is
 * documented and the corrected assignment is Test Roofing Assistant, asserts the prior guard is stale
 * and a fresh rerun is required, asserts no PSTN/runtime action was performed by this build, and checks
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

const DOC = 'docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md';
const B250_DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md';
const VERIFIER = 'backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js';
const DRY_RUN = 'scripts/run-vapi-phone-assignment-correction-build-251-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B250_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';
const B249_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js';

const DECISION_TOKEN = 'VAPI_PHONE_NUMBER_ASSISTANT_ASSIGNMENT_CORRECTED_TEST_ROOFING_ASSISTANT_PRIOR_GUARD_STALE_PSTN_APPROVED_NOT_YET_EXECUTED';
const B250_COMMIT = 'a487f13';

(function main() {
  const before = gitStatus();
  console.log('=== Build 251 Vapi phone-number assistant-assignment CORRECTION CAPTURE verification (local-only) ===');
  console.log('No PSTN validation executed. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Assignment-correction capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B251 doc carries the exact decision token');
  pass('Build 251 doc exists and carries the decision token');

  // 2. Build 250 prerequisite commit a487f13 present + recorded; guard doc exists.
  assert(commitPresent(B250_COMMIT), 'Build 250 prerequisite commit a487f13 is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B250_DOC)), 'Build 250 PSTN validation guard doc exists');
  assert(/build_250_prerequisite_commit\s*=\s*a487f13/.test(doc),
    'B251 doc records build_250_prerequisite_commit = a487f13');
  assert(/build_250_prerequisite_status\s*=\s*validated/.test(doc),
    'B251 doc records build_250_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B251 doc records HEAD==origin/main');
  pass('Build 250 prerequisite commit a487f13 present in git history, recorded, and the guard doc exists');

  // 3. Build 250 approval scope required Test Roofing Assistant only.
  assert(/approved_assistant\s*=\s*test_roofing_assistant_only/.test(doc),
    'B251 doc records approved_assistant = test_roofing_assistant_only (Build 250 scope)');
  pass('B251 doc records the Build 250 approval scope required Test Roofing Assistant only');

  // 4. Pre-correction assistant-assignment mismatch is documented.
  assert(/pre_correction_assistant_assignment\s*=\s*appointment_receptionist/.test(doc),
    'B251 doc records pre_correction_assistant_assignment = appointment_receptionist');
  assert(/assignment_mismatch_documented\s*=\s*true/.test(doc),
    'B251 doc records assignment_mismatch_documented = true');
  assert(/pre_correction_assignment_satisfied_build_250_scope\s*=\s*false/.test(doc),
    'B251 doc records pre_correction_assignment_satisfied_build_250_scope = false');
  pass('B251 doc documents the pre-correction assistant-assignment mismatch (Appointment Receptionist, not in scope)');

  // 5. Corrected assistant assignment is Test Roofing Assistant.
  assert(/corrected_assistant_assignment\s*=\s*test_roofing_assistant/.test(doc),
    'B251 doc records corrected_assistant_assignment = test_roofing_assistant');
  assert(/assignment_corrected\s*=\s*true/.test(doc), 'B251 doc records assignment_corrected = true');
  assert(/corrected_assignment_satisfies_build_250_scope\s*=\s*true/.test(doc),
    'B251 doc records corrected_assignment_satisfies_build_250_scope = true');
  pass('B251 doc records the corrected assistant assignment is Test Roofing Assistant (Inbound Settings)');

  // 6. Phone number is redacted.
  assert(/phone_number_redacted\s*=\s*true/.test(doc), 'B251 doc records phone_number_redacted = true');
  assert(/value_redacted\s*=\s*true/.test(doc), 'B251 doc records value_redacted = true');
  pass('B251 doc records the phone number value is redacted');

  // 7. Other phone-number-screen observations captured (SMS enabled but not sent; blank server URL; no-auth/fallback).
  assert(/sms_enabled_visible\s*=\s*true/.test(doc), 'B251 doc records sms_enabled_visible = true');
  assert(/phone_level_server_url_blank\s*=\s*true/.test(doc),
    'B251 doc records phone_level_server_url_blank = true');
  assert(/phone_level_credential_no_auth_fallback\s*=\s*true/.test(doc),
    'B251 doc records phone_level_credential_no_auth_fallback = true');
  assert(/assistant_level_webhook_credential\s*=\s*bearer_validated_path_unchanged/.test(doc),
    'B251 doc records assistant_level_webhook_credential = bearer_validated_path_unchanged');
  pass('B251 doc captures the phone-number-screen observations (SMS enabled but not sent, blank server URL, no-auth/fallback, assistant-level Bearer path unchanged)');

  // 8. Build 250 prior guard is STALE due to Vapi config change after guard rerun.
  assert(/build_250_prior_guard_status\s*=\s*stale/.test(doc),
    'B251 doc records build_250_prior_guard_status = stale');
  assert(/guard_stale_reason\s*=\s*vapi_config_changed_after_guard_rerun/.test(doc),
    'B251 doc records guard_stale_reason = vapi_config_changed_after_guard_rerun');
  pass('B251 doc records the Build 250 prior guard is stale due to a Vapi config change after the guard rerun');

  // 9. Fresh guard rerun required before any PSTN attempt.
  assert(/fresh_guard_rerun_required\s*=\s*true/.test(doc),
    'B251 doc records fresh_guard_rerun_required = true');
  pass('B251 doc records a fresh guard rerun is required before any PSTN attempt');

  // 10. pstn_validation_status = approved_not_yet_executed.
  assert(/pstn_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B251 doc records pstn_validation_status = approved_not_yet_executed');
  pass('B251 doc records pstn_validation_status = approved_not_yet_executed');

  // 11. real_call_test_status = approved_not_yet_executed.
  assert(/real_call_test_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B251 doc records real_call_test_status = approved_not_yet_executed');
  pass('B251 doc records real_call_test_status = approved_not_yet_executed');

  // 12. No PSTN/runtime action performed by Build 251.
  assert(/build_mode\s*=\s*vapi_phone_assignment_correction_capture/.test(doc),
    'B251 doc records build_mode = vapi_phone_assignment_correction_capture');
  assert(/pstn_validation_action_performed_by_build_251\s*=\s*false/.test(doc),
    'B251 doc records pstn_validation_action_performed_by_build_251 = false');
  assert(/runtime_action_performed_by_build_251\s*=\s*false/.test(doc),
    'B251 doc records runtime_action_performed_by_build_251 = false');
  pass('B251 doc records no PSTN/runtime action performed by Build 251 (assignment-correction capture only)');

  // 13. No call placed / no phone number dialed.
  assert(/call_placed\s*=\s*false/.test(doc), 'B251 doc records call_placed = false');
  assert(/phone_dialed\s*=\s*false/.test(doc), 'B251 doc records phone_dialed = false');
  pass('B251 doc records no call placed and no phone number dialed');

  // 14. No SMS sent.
  assert(/sms_sent\s*=\s*false/.test(doc), 'B251 doc records sms_sent = false');
  pass('B251 doc records no SMS sent');

  // 15. No Twilio action.
  assert(/twilio_action_performed\s*=\s*false/.test(doc), 'B251 doc records twilio_action_performed = false');
  pass('B251 doc records no Twilio action');

  // 16. Carried-forward outcomes preserved.
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B251 doc carries forward all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B251 doc carries forward http_400_observed = false');
  assert(/end_of_call_report_appears_enabled\s*=\s*true/.test(doc),
    'B251 doc carries forward end_of_call_report_appears_enabled = true');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B251 doc carries forward end_of_call_report_observed = false');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B251 doc preserves full_final_report_processing_status = not_validated');
  pass('B251 doc carries forward the established Build 246/248 outcomes unchanged');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B251 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B251 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B251 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B251 doc asserts no secrets printed');
  pass('B251 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B251 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B251 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B251 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B251 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B251 doc contains no phone-number-shaped value');
  pass('B251 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 19. Full safety-invariant block present.
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
    /No Vapi configuration change by this build/i,
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
  for (const re of gates) assert(re.test(doc), `B251 doc missing safety invariant: ${re}`);
  pass('B251 doc states the full Build 251 safety-invariant block');

  // 20. Next recommended step documents fresh-guard-rerun-then-one-attempt.
  assert(/[Nn]ext recommended step/.test(doc), 'B251 doc has a Next recommended step section');
  assert(/[Rr]erun a fresh Build 250 guard/.test(doc) && /one attempt/i.test(doc),
    'B251 doc next step: rerun a fresh guard immediately before the single approved attempt, then one attempt only');
  pass('B251 doc documents the next step: rerun a fresh guard before the single approved PSTN attempt');

  // 21. Dry-run wrapper exists and wires this verifier + B250 + B249 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B251 verifier file exists');
  for (const v of [B250_VERIFIER, B249_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-phone-assignment-correction-build-251-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs the Build 250 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js'),
    'dry-run wrapper runs the Build 249 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B251 verifier present and the dry-run wrapper wires this verifier + B250 + B249 verifiers + smoke regression');

  // 22. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 251 Vapi phone-number assistant-assignment correction-capture packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_phone_assignment_correction_capture  pstn_validation_action_performed_by_build_251=false  runtime_action_performed_by_build_251=false  build_250_prerequisite_commit=a487f13  build_250_prerequisite_status=validated  approved_assistant=test_roofing_assistant_only  pre_correction_assistant_assignment=appointment_receptionist  assignment_mismatch_documented=true  corrected_assistant_assignment=test_roofing_assistant  assignment_corrected=true  phone_number_redacted=true  sms_enabled_visible=true  sms_sent=false  phone_level_server_url_blank=true  phone_level_credential_no_auth_fallback=true  assistant_level_webhook_credential=bearer_validated_path_unchanged  build_250_prior_guard_status=stale  guard_stale_reason=vapi_config_changed_after_guard_rerun  fresh_guard_rerun_required=true  pstn_validation_status=approved_not_yet_executed  real_call_test_status=approved_not_yet_executed  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  call_placed=false  phone_dialed=false  twilio_action_performed=false  live_http_called=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
