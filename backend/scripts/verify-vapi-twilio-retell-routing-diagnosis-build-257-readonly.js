#!/usr/bin/env node
/**
 * Build 257 Read-Only Verifier — proves the repo-only Twilio / Retell / Vapi NUMBER-ROUTING DIAGNOSIS
 * packet is internally consistent, grounded in real prior repo evidence, and safe. After Build 256
 * captured the stop-condition evidence (the single approved true PSTN dial surfaced as a Retell call and
 * never appeared in Vapi logs), Build 257 diagnoses — using repo files and previously captured read-only
 * UI evidence only — why a PSTN dial to the supposed Vapi number was answered by Retell. It fixes nothing
 * and performs NO runtime/external action.
 *
 * Read-only. Reads the Build 257 doc, the Build 256 predecessor doc, and the Build 231 call-path
 * inspection doc as text; confirms the Build 256 prerequisite commit is present in git history; asserts
 * the Build 256 stop-condition state is preserved (one true PSTN dial performed, approval consumed, no
 * retry without new approval, vapi_call_record_observed=false, retell_notification_observed=true,
 * likely path Retell/Twilio, blocked_by_unexpected_retell_path, full_final_report/real_pstn_vapi_call_path
 * not_validated, stop_condition_triggered=true); asserts the expected Vapi path and the actual Retell path
 * are documented; asserts prior repo evidence about Twilio/Retell/Vapi routing is inspected and
 * summarized (Build 231 §1 Twilio voice = Retell Trunk); asserts the phone-number-level blank Server URL
 * and fallback/no-auth credential are documented as webhook-leg clues / open questions not relevant to
 * inbound call routing; asserts the assistant-level Bearer webhook path remains validated but received
 * nothing for this PSTN dial; asserts the likely-cause classification; asserts the safest next step is a
 * read-only dashboard inspection of Twilio/Retell/Vapi ownership/routing before any new approval/retry;
 * asserts no call/Test/Talk/browserWebCall/curl/Twilio/Retell/SMS/secret/config/deploy/runtime action in
 * Build 257; and that no secrets/tokens/raw phone numbers/raw call IDs/PII are present. Checks `git status`
 * before/after. No network, no Supabase call, no credential/secret access, no provider client, no SMS, no
 * Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi
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

const DOC = 'docs/VAPI_TWILIO_RETELL_ROUTING_DIAGNOSIS_BUILD_257.md';
const B256_DOC = 'docs/VAPI_TRUE_PSTN_DIAL_RETELL_STOP_CONDITION_BUILD_256.md';
const B231_DOC = 'docs/CALL_PATH_INSPECTION_AND_JASON_OWNED_CALL_TEST_READINESS_BUILD_231.md';
const VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js';
const DRY_RUN = 'scripts/run-vapi-twilio-retell-routing-diagnosis-build-257-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';
const B255_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';
const B254_VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B231_VERIFIER = 'backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js';

const DECISION_TOKEN = 'TWILIO_RETELL_VAPI_NUMBER_ROUTING_DIAGNOSED_REPO_ONLY_LIKELY_INBOUND_VOICE_STILL_RETELL_TRUNK_READONLY_DASHBOARD_INSPECTION_NEXT_NO_RETRY_WITHOUT_NEW_APPROVAL';
const B256_COMMIT = '1f9dd92';

(function main() {
  const before = gitStatus();
  console.log('=== Build 257 Twilio / Retell / Vapi NUMBER-ROUTING DIAGNOSIS verification (repo-only, read-only) ===');
  console.log('No fix. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Diagnosis only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B257 doc carries the exact decision token');
  pass('Build 257 diagnosis doc exists and carries the decision token');

  // 2. Build 256 prerequisite commit present + recorded; predecessor doc exists.
  assert(commitPresent(B256_COMMIT), 'Build 256 prerequisite commit 1f9dd92 is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B256_DOC)), `predecessor doc exists: ${B256_DOC}`);
  assert(/build_256_prerequisite_commit\s*=\s*1f9dd92/.test(doc),
    'B257 doc records build_256_prerequisite_commit = 1f9dd92');
  assert(/build_256_prerequisite_status\s*=\s*validated/.test(doc),
    'B257 doc records build_256_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B257 doc records HEAD==origin/main');
  pass('Build 256 prerequisite commit 1f9dd92 present in git history, recorded, and predecessor doc exists');

  // 3. Build 256 stop-condition state preserved.
  assert(/stop_condition_triggered\s*=\s*true/.test(doc), 'B257 doc preserves stop_condition_triggered = true');
  assert(/vapi_pstn_validation_result\s*=\s*blocked_by_unexpected_retell_path/.test(doc),
    'B257 doc preserves vapi_pstn_validation_result = blocked_by_unexpected_retell_path');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B257 doc preserves full_final_report_processing_status = not_validated');
  assert(/real_pstn_vapi_call_path_status\s*=\s*not_validated/.test(doc),
    'B257 doc preserves real_pstn_vapi_call_path_status = not_validated');
  pass('B257 doc preserves the Build 256 stop-condition state');

  // 4. True PSTN dial performed once.
  assert(/true_pstn_dial_performed\s*=\s*true/.test(doc), 'B257 doc records true_pstn_dial_performed = true');
  assert(/true_pstn_dial_count\s*=\s*1/.test(doc), 'B257 doc records true_pstn_dial_count = 1');
  pass('B257 doc records the true PSTN dial was performed exactly once');

  // 5. Approval consumed.
  assert(/approved_attempt_consumed\s*=\s*true/.test(doc), 'B257 doc records approved_attempt_consumed = true');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B257 doc records approval_consumed = true');
  pass('B257 doc records the approval was consumed');

  // 6. No retry without new approval.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B257 doc records no_retry_without_new_approval = true');
  pass('B257 doc records no retry permitted without a new, separate approval');

  // 7. Vapi call record observed = false.
  assert(/vapi_call_record_observed\s*=\s*false/.test(doc),
    'B257 doc records vapi_call_record_observed = false');
  pass('B257 doc records the Vapi call record was not observed (false)');

  // 8. Retell notification observed = true.
  assert(/retell_notification_observed\s*=\s*true/.test(doc),
    'B257 doc records retell_notification_observed = true');
  assert(/NEW RETELL CALL/i.test(doc), 'B257 doc references the "NEW RETELL CALL" notification');
  pass('B257 doc records the Retell notification was observed (true)');

  // 9. Likely actual path Retell/Twilio documented + expected Vapi path documented.
  assert(/likely_path_was_retell_twilio_not_vapi\s*=\s*true/.test(doc),
    'B257 doc records likely_path_was_retell_twilio_not_vapi = true');
  assert(/actual_path_documented\s*=\s*true/.test(doc), 'B257 doc records actual_path_documented = true');
  assert(/expected_vapi_path_documented\s*=\s*true/.test(doc),
    'B257 doc records expected_vapi_path_documented = true');
  assert(/actual_inbound_answer_owner\s*=\s*retell/.test(doc),
    'B257 doc records actual_inbound_answer_owner = retell');
  assert(/expected_inbound_answer_owner\s*=\s*vapi_test_roofing_assistant/.test(doc),
    'B257 doc records expected_inbound_answer_owner = vapi_test_roofing_assistant');
  pass('B257 doc documents both the expected Vapi path and the actual Retell/Twilio path');

  // 10. Prior repo evidence about Twilio/Retell/Vapi routing is inspected and summarized; predecessor docs exist.
  assert(fs.existsSync(path.join(repoRoot, B231_DOC)), `Build 231 call-path doc exists: ${B231_DOC}`);
  const b231 = read(B231_DOC);
  assert(/Retell Trunk/i.test(b231) && /voice/i.test(b231),
    'Build 231 doc actually documents the Twilio voice → Retell Trunk finding (grounding)');
  assert(/prior_evidence_twilio_voice_retell_trunk_documented\s*=\s*true/.test(doc),
    'B257 doc records prior_evidence_twilio_voice_retell_trunk_documented = true');
  assert(/prior_evidence_source\s*=\s*build_231_call_path_inspection/.test(doc),
    'B257 doc records prior_evidence_source = build_231_call_path_inspection');
  assert(/Build 231/.test(doc) && /Retell Trunk/i.test(doc),
    'B257 doc summarizes the Build 231 Twilio-voice-Retell-Trunk evidence');
  pass('B257 doc inspects and summarizes prior repo evidence (Build 231 §1 Twilio voice = Retell Trunk)');

  // 11. Vapi UI assignment alone does not prove carrier routing.
  assert(/vapi_ui_assignment_alone_proves_carrier_routing\s*=\s*false/.test(doc),
    'B257 doc records vapi_ui_assignment_alone_proves_carrier_routing = false');
  pass('B257 doc records the Vapi UI assignment alone does not prove the carrier/Twilio voice webhook points to Vapi');

  // 12. Phone-number-level blank Server URL + fallback/no-auth credential documented as routing clues / open questions.
  assert(/phone_level_blank_server_url_scope\s*=\s*webhook_delivery_leg_only/.test(doc),
    'B257 doc records phone_level_blank_server_url_scope = webhook_delivery_leg_only');
  assert(/phone_level_blank_server_url_relevant_to_inbound_call_routing\s*=\s*false/.test(doc),
    'B257 doc records phone_level_blank_server_url_relevant_to_inbound_call_routing = false');
  assert(/phone_level_blank_server_url_open_question_clue\s*=\s*true/.test(doc),
    'B257 doc records phone_level_blank_server_url_open_question_clue = true');
  assert(/phone_level_no_auth_fallback_scope\s*=\s*webhook_auth_leg_only/.test(doc),
    'B257 doc records phone_level_no_auth_fallback_scope = webhook_auth_leg_only');
  assert(/phone_level_no_auth_fallback_relevant_to_inbound_call_routing\s*=\s*false/.test(doc),
    'B257 doc records phone_level_no_auth_fallback_relevant_to_inbound_call_routing = false');
  assert(/phone_level_no_auth_fallback_open_question_clue\s*=\s*true/.test(doc),
    'B257 doc records phone_level_no_auth_fallback_open_question_clue = true');
  assert(/phone_level_credential_likely_not_direct_cause_while_server_url_blank\s*=\s*true/.test(doc),
    'B257 doc records phone_level_credential_likely_not_direct_cause_while_server_url_blank = true');
  pass('B257 doc documents the phone-number-level blank Server URL and fallback/no-auth credential as webhook-leg clues / open questions (not inbound-routing causes)');

  // 13. Assistant-level Bearer webhook path remains validated but received nothing for this dial.
  assert(/assistant_level_bearer_webhook_path_validated\s*=\s*true/.test(doc),
    'B257 doc records assistant_level_bearer_webhook_path_validated = true');
  assert(/assistant_level_bearer_webhook_received_this_pstn_dial\s*=\s*false/.test(doc),
    'B257 doc records assistant_level_bearer_webhook_received_this_pstn_dial = false');
  assert(/\/webhooks\/vapi\/call-completed/.test(doc),
    'B257 doc references the /webhooks/vapi/call-completed backend path');
  pass('B257 doc records the assistant-level Bearer webhook path remains validated but did not receive this PSTN dial');

  // 14. Likely cause classification documented.
  assert(/likely_cause_primary\s*=\s*inbound_voice_routing_still_retell_twilio_trunk_not_vapi/.test(doc),
    'B257 doc records likely_cause_primary = inbound_voice_routing_still_retell_twilio_trunk_not_vapi');
  assert(/likely_cause_secondary\s*=\s*number_ownership_or_routing_mismatch/.test(doc),
    'B257 doc records likely_cause_secondary = number_ownership_or_routing_mismatch');
  assert(/likely_cause_tertiary_less_likely\s*=\s*vapi_phone_number_level_settings_webhook_leg_only/.test(doc),
    'B257 doc records likely_cause_tertiary_less_likely = vapi_phone_number_level_settings_webhook_leg_only');
  assert(/backend_webhook_auth_ruled_out_as_cause\s*=\s*true/.test(doc),
    'B257 doc records backend_webhook_auth_ruled_out_as_cause = true');
  assert(/likely_cause_unknown_without_readonly_inspection\s*=\s*true/.test(doc),
    'B257 doc records likely_cause_unknown_without_readonly_inspection = true');
  pass('B257 doc documents the likely-cause classification (primary/secondary/tertiary/ruled-out/unknown)');

  // 15. Safest next step = read-only dashboard inspection before any new approval/retry.
  assert(/recommended_readonly_dashboard_checks_documented\s*=\s*true/.test(doc),
    'B257 doc records recommended_readonly_dashboard_checks_documented = true');
  assert(/safest_next_step\s*=\s*readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval/.test(doc),
    'B257 doc records safest_next_step = readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval');
  assert(/Twilio[\s\S]{0,40}Voice Configuration/i.test(doc),
    'B257 doc names the Twilio Voice Configuration read-only check');
  pass('B257 doc records the safest next step is a read-only dashboard inspection of Twilio/Retell/Vapi ownership/routing before any new approval or retry');

  // 16. Stop/approval rule in force.
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B257 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B257 doc records the exact stop/approval rule that remains in force');

  // 17. No fix / no runtime action by Build 257.
  assert(/build_mode\s*=\s*twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly/.test(doc),
    'B257 doc records build_mode = twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly');
  assert(/runtime_action_performed_by_build_257\s*=\s*false/.test(doc),
    'B257 doc records runtime_action_performed_by_build_257 = false');
  assert(/fix_or_config_change_performed_by_build_257\s*=\s*false/.test(doc),
    'B257 doc records fix_or_config_change_performed_by_build_257 = false');
  pass('B257 doc records no fix, no config change, and no runtime/external action by Build 257');

  // 18. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B257 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B257 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B257 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B257 doc asserts no secrets printed');
  pass('B257 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 19. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B257 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B257 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B257 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B257 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B257 doc contains no phone-number-shaped value');
  pass('B257 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 20. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No new call requested or placed/i,
    /No retry of any prior consumed approval/i,
    /No Vapi Test used/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Retell API used/i,
    /No Retell configuration change/i,
    /No `curl` executed/i,
    /No live webhook called/i,
    /No unrelated Railway configuration change/i,
    /No Vapi configuration change by this build/i,
    /No Vapi publish/i,
    /No Vapi-originated webhook action executed by this build/i,
    /No full Vapi payload processing pass executed/i,
    /No real call test executed by this build/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B257 doc missing safety invariant: ${re}`);
  pass('B257 doc states the full Build 257 safety-invariant block (no call/Test/Talk/webCall/curl/Twilio/Retell/SMS/secret/config/deploy/runtime action)');

  // 21. Dry-run wrapper exists and wires this verifier + B256 + B255 + B254 + B253 + B231 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B257 verifier file exists');
  for (const v of [B256_VERIFIER, B255_VERIFIER, B254_VERIFIER, B253_VERIFIER, B231_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs the Build 256 verifier');
  assert(dry.includes('verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js'),
    'dry-run wrapper runs the Build 255 verifier');
  assert(dry.includes('verify-vapi-pstn-method-clarification-build-254-readonly.js'),
    'dry-run wrapper runs the Build 254 verifier');
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs the Build 253 verifier');
  assert(dry.includes('verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js'),
    'dry-run wrapper runs the Build 231 call-path inspection verifier (routing evidence regression)');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B257 verifier present and the dry-run wrapper wires this verifier + B256 + B255 + B254 + B253 + B231 verifiers + smoke regression');

  // 22. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 257 Twilio/Retell/Vapi number-routing diagnosis packet verified (${passCount} checks).`);
  console.log('build_mode=twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly  runtime_action_performed_by_build_257=false  fix_or_config_change_performed_by_build_257=false  build_256_prerequisite_commit=1f9dd92  build_256_prerequisite_status=validated  true_pstn_dial_performed=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  vapi_pstn_validation_result=blocked_by_unexpected_retell_path  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  stop_condition_triggered=true  expected_vapi_path_documented=true  actual_path_documented=true  prior_evidence_twilio_voice_retell_trunk_documented=true  prior_evidence_source=build_231_call_path_inspection  vapi_ui_assignment_alone_proves_carrier_routing=false  phone_level_blank_server_url_scope=webhook_delivery_leg_only  phone_level_blank_server_url_relevant_to_inbound_call_routing=false  phone_level_no_auth_fallback_scope=webhook_auth_leg_only  phone_level_no_auth_fallback_relevant_to_inbound_call_routing=false  phone_level_credential_likely_not_direct_cause_while_server_url_blank=true  assistant_level_bearer_webhook_path_validated=true  assistant_level_bearer_webhook_received_this_pstn_dial=false  likely_cause_primary=inbound_voice_routing_still_retell_twilio_trunk_not_vapi  likely_cause_secondary=number_ownership_or_routing_mismatch  likely_cause_tertiary_less_likely=vapi_phone_number_level_settings_webhook_leg_only  backend_webhook_auth_ruled_out_as_cause=true  likely_cause_unknown_without_readonly_inspection=true  safest_next_step=readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
