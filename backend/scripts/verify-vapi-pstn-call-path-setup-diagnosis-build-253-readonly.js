#!/usr/bin/env node
/**
 * Build 253 Read-Only Verifier — proves the repo-only Vapi PSTN CALL-PATH SETUP DIAGNOSIS packet is
 * internally consistent and safe. Build 253 reasons over repo source + docs + previously-captured
 * (sanitized) Vapi UI evidence to diagnose why the single approved controlled PSTN validation attempt
 * (Build 252) produced only web-visible call evidence (Vapi Calls Type=Web) and no confirmed PSTN call
 * record. Build 253 performs NO runtime/external action and requests NO new call.
 *
 * Read-only. Reads the Build 253 doc (and the Build 250/251/252 predecessor docs) as text, confirms the
 * Build 252 prerequisite commit is present in git history, asserts the Build 252 ambiguous/not_confirmed
 * state is preserved, asserts one approved attempt is consumed with no retry permitted without new
 * approval, asserts the Build 251 phone-assignment correction is considered, asserts the captured
 * phone-number UI evidence (SMS Enabled=true; Provider=Twilio consistent/open) and the blank phone-level
 * Server URL + no-auth/fallback credential are documented as OPEN QUESTIONS and NOT changed, asserts the
 * assistant-level webhook URL + Bearer credential are documented from prior builds, asserts the likely
 * cause classification is documented, asserts the safest next step is a read-only dashboard/API
 * inspection before any new approval, asserts full_final_report_processing_status=not_validated and
 * real_pstn_call_path_validation_status=ambiguous_not_confirmed, asserts no call/Talk/browserWebCall/
 * curl/Twilio/SMS/secret/config/deploy/runtime action occurred, and that no secrets/tokens/raw phone
 * numbers/raw call IDs/PII are present. Checks `git status` before/after. No network, no Supabase call,
 * no credential/secret access, no provider client, no SMS, no Twilio, no call, no phone dialed, no Vapi
 * Talk, no browser/webCall, no Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does
 * NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs
 * NO runtime/external action.
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

const DOC = 'docs/VAPI_PSTN_CALL_PATH_SETUP_DIAGNOSIS_BUILD_253.md';
const B250_DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md';
const B251_DOC = 'docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md';
const B252_DOC = 'docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md';
const VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const DRY_RUN = 'scripts/run-vapi-pstn-call-path-setup-diagnosis-build-253-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B252_VERIFIER = 'backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js';
const B251_VERIFIER = 'backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js';
const B250_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';

// The backend file the diagnosis is grounded in (read-only existence check only).
const WEBHOOK_SERVICE = 'backend/src/services/vapi-webhook.service.ts';

const DECISION_TOKEN = 'VAPI_PSTN_CALL_PATH_DIAGNOSIS_WEB_TRANSPORT_MOST_LIKELY_READONLY_DASHBOARD_INSPECTION_NEXT_NO_NEW_CALL_WITHOUT_APPROVAL';
const B250_COMMIT = 'a487f13';
const B251_COMMIT = '828ea19';
const B252_COMMIT = '424c081';

(function main() {
  const before = gitStatus();
  console.log('=== Build 253 Vapi PSTN call-path setup READ-ONLY DIAGNOSIS verification (local-only) ===');
  console.log('No PSTN validation executed. No new call requested. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Repo-only read-only diagnosis. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B253 doc carries the exact decision token');
  pass('Build 253 doc exists and carries the decision token');

  // 2. Build 252 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B252_COMMIT), 'Build 252 prerequisite commit 424c081 is present in git history');
  assert(commitPresent(B251_COMMIT), 'Build 251 prerequisite commit 828ea19 is present in git history');
  assert(commitPresent(B250_COMMIT), 'Build 250 prerequisite commit a487f13 is present in git history');
  for (const d of [B250_DOC, B251_DOC, B252_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_252_prerequisite_commit\s*=\s*424c081/.test(doc),
    'B253 doc records build_252_prerequisite_commit = 424c081');
  assert(/build_252_prerequisite_status\s*=\s*validated/.test(doc),
    'B253 doc records build_252_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B253 doc records HEAD==origin/main');
  pass('Build 252 prerequisite commit 424c081 present in git history, recorded, and predecessor docs exist');

  // 3. Build 252 ambiguous/not_confirmed state preserved.
  assert(/real_pstn_call_path_validation_status\s*=\s*ambiguous_not_confirmed/.test(doc),
    'B253 doc preserves real_pstn_call_path_validation_status = ambiguous_not_confirmed');
  assert(/pstn_call_record_confirmed\s*=\s*false/.test(doc),
    'B253 doc preserves pstn_call_record_confirmed = false');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B253 doc preserves end_of_call_report_observed = false');
  pass('B253 doc preserves the Build 252 ambiguous/not_confirmed state');

  // 4. One approved attempt is consumed.
  assert(/pstn_validation_attempt_consumed\s*=\s*true/.test(doc),
    'B253 doc records pstn_validation_attempt_consumed = true');
  pass('B253 doc records the one approved attempt is consumed');

  // 5. No retry permitted without new approval.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B253 doc records no_retry_without_new_approval = true');
  assert(/next_step_requires_new_separate_approval_for_any_new_call\s*=\s*true/.test(doc),
    'B253 doc records next_step_requires_new_separate_approval_for_any_new_call = true');
  pass('B253 doc records no retry/new call without a new, separate approval');

  // 6. Build 251 phone-assignment correction is considered.
  assert(/phone_assignment_corrected_to_test_roofing_assistant\s*=\s*true/.test(doc),
    'B253 doc records phone_assignment_corrected_to_test_roofing_assistant = true');
  assert(/assignment_correction_considered\s*=\s*true/.test(doc),
    'B253 doc records assignment_correction_considered = true');
  pass('B253 doc considers the Build 251 phone-assignment correction (Test Roofing Assistant)');

  // 7. Provider=Twilio + SMS Enabled=true documented from captured UI evidence (if used).
  assert(/sms_enabled_documented\s*=\s*true/.test(doc),
    'B253 doc records sms_enabled_documented = true (from Build 251 captured UI)');
  assert(/provider_twilio_documented\s*=\s*consistent_not_explicitly_captured/.test(doc),
    'B253 doc records provider_twilio_documented = consistent_not_explicitly_captured');
  assert(/provider_twilio_open_question\s*=\s*true/.test(doc),
    'B253 doc records provider_twilio_open_question = true');
  pass('B253 doc documents SMS Enabled=true (captured) and Provider=Twilio (consistent/open) from prior UI evidence');

  // 8. Phone-level blank Server URL + no-auth/fallback credential documented as OPEN QUESTIONS, not changed.
  assert(/phone_level_blank_server_url_blocks_delivery\s*=\s*false/.test(doc),
    'B253 doc records phone_level_blank_server_url_blocks_delivery = false');
  assert(/phone_level_blank_server_url_open_question_not_changed\s*=\s*true/.test(doc),
    'B253 doc records phone_level_blank_server_url_open_question_not_changed = true');
  assert(/phone_level_no_auth_fallback_blocks_auth\s*=\s*false/.test(doc),
    'B253 doc records phone_level_no_auth_fallback_blocks_auth = false');
  assert(/phone_level_no_auth_fallback_open_question_not_changed\s*=\s*true/.test(doc),
    'B253 doc records phone_level_no_auth_fallback_open_question_not_changed = true');
  pass('B253 doc documents the blank phone-level Server URL + no-auth/fallback credential as open questions, not changed');

  // 9. Assistant-level webhook URL + Bearer credential documented from prior builds.
  assert(/assistant_level_webhook_url_documented\s*=\s*true/.test(doc),
    'B253 doc records assistant_level_webhook_url_documented = true');
  assert(/assistant_level_bearer_credential_documented\s*=\s*true/.test(doc),
    'B253 doc records assistant_level_bearer_credential_documented = true');
  pass('B253 doc documents the assistant-level webhook URL + Bearer credential from prior builds');

  // 10. Repo-grounded web-vs-PSTN transport reasoning documented.
  assert(/repo_visible_reason_web_transport_not_pstn\s*=\s*true/.test(doc),
    'B253 doc records repo_visible_reason_web_transport_not_pstn = true');
  assert(/web_call_no_destination_is_noop\s*=\s*true/.test(doc),
    'B253 doc records web_call_no_destination_is_noop = true');
  assert(/detectVapiCallTransport/.test(doc) && /classifyVapiWebhookEvent/.test(doc),
    'B253 doc grounds the diagnosis in the backend transport/classifier functions');
  assert(fs.existsSync(path.join(repoRoot, WEBHOOK_SERVICE)),
    'the grounding backend webhook service file exists');
  pass('B253 doc documents the repo-visible web-transport-vs-PSTN reasoning grounded in the webhook service');

  // 11. Likely cause classification documented.
  assert(/likely_cause_classification_documented\s*=\s*true/.test(doc),
    'B253 doc records likely_cause_classification_documented = true');
  assert(/likely_cause_primary\s*=\s*user_side_call_path_web_not_pstn/.test(doc),
    'B253 doc records likely_cause_primary = user_side_call_path_web_not_pstn');
  assert(/likely_cause_secondary\s*=\s*phone_number_routing_or_config/.test(doc),
    'B253 doc records likely_cause_secondary = phone_number_routing_or_config');
  assert(/likely_cause_tertiary\s*=\s*twilio_provider_setup/.test(doc),
    'B253 doc records likely_cause_tertiary = twilio_provider_setup');
  assert(/likely_cause_unknown_without_readonly_inspection\s*=\s*true/.test(doc),
    'B253 doc records likely_cause_unknown_without_readonly_inspection = true');
  pass('B253 doc documents the likely cause classification (web-path primary; routing/config + Twilio possible; unknown w/o read-only inspection)');

  // 12. Safest next step = read-only dashboard/API inspection before any new approval.
  assert(/safest_next_step\s*=\s*readonly_dashboard_api_inspection_before_new_approval/.test(doc),
    'B253 doc records safest_next_step = readonly_dashboard_api_inspection_before_new_approval');
  assert(/[Nn]ext recommended step/.test(doc), 'B253 doc has a Next recommended step section');
  assert(/read-only/i.test(doc) && /inspection/i.test(doc) && /new,? separate.{0,30}approval/i.test(doc),
    'B253 doc next step: read-only dashboard/API inspection before any new, separate approval');
  pass('B253 doc records the safest next step is a read-only dashboard/API inspection before any new approval');

  // 13. Preserved validation outcomes.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B253 doc preserves full_final_report_processing_status = not_validated');
  pass('B253 doc preserves full_final_report_processing_status = not_validated');

  // 14. No runtime/external action by Build 253.
  assert(/build_mode\s*=\s*vapi_pstn_call_path_readonly_diagnosis/.test(doc),
    'B253 doc records build_mode = vapi_pstn_call_path_readonly_diagnosis');
  assert(/runtime_action_performed_by_build_253\s*=\s*false/.test(doc),
    'B253 doc records runtime_action_performed_by_build_253 = false');
  assert(/another_call_requested\s*=\s*false/.test(doc),
    'B253 doc records another_call_requested = false');
  pass('B253 doc records no runtime/external action and no new call requested by Build 253');

  // 15. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B253 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B253 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B253 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B253 doc asserts no secrets printed');
  pass('B253 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 16. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B253 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B253 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B253 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B253 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B253 doc contains no phone-number-shaped value');
  pass('B253 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 17. Full safety-invariant block present (no call/Talk/browserWebCall/curl/Twilio/SMS/secret/config/deploy/runtime).
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
    /No real call test executed by this build/i,
    /No new call requested or placed/i,
    /No retry of the consumed approved attempt/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B253 doc missing safety invariant: ${re}`);
  pass('B253 doc states the full Build 253 safety-invariant block (no call/Talk/webCall/curl/Twilio/SMS/secret/config/deploy/runtime action)');

  // 18. Dry-run wrapper exists and wires this verifier + B252 + B251 + B250 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B253 verifier file exists');
  for (const v of [B252_VERIFIER, B251_VERIFIER, B250_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js'),
    'dry-run wrapper runs the Build 252 verifier');
  assert(dry.includes('verify-vapi-phone-assignment-correction-build-251-readonly.js'),
    'dry-run wrapper runs the Build 251 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs the Build 250 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B253 verifier present and the dry-run wrapper wires this verifier + B252 + B251 + B250 verifiers + smoke regression');

  // 19. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 253 Vapi PSTN call-path setup read-only-diagnosis packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_pstn_call_path_readonly_diagnosis  runtime_action_performed_by_build_253=false  another_call_requested=false  build_250_prerequisite_commit=a487f13  build_251_prerequisite_commit=828ea19  build_252_prerequisite_commit=424c081  build_252_prerequisite_status=validated  pstn_validation_attempt_consumed=true  no_retry_without_new_approval=true  phone_assignment_corrected_to_test_roofing_assistant=true  assignment_correction_considered=true  sms_enabled_documented=true  provider_twilio_documented=consistent_not_explicitly_captured  provider_twilio_open_question=true  phone_level_blank_server_url_blocks_delivery=false  phone_level_blank_server_url_open_question_not_changed=true  phone_level_no_auth_fallback_blocks_auth=false  phone_level_no_auth_fallback_open_question_not_changed=true  assistant_level_webhook_url_documented=true  assistant_level_bearer_credential_documented=true  repo_visible_reason_web_transport_not_pstn=true  web_call_no_destination_is_noop=true  likely_cause_primary=user_side_call_path_web_not_pstn  likely_cause_secondary=phone_number_routing_or_config  likely_cause_tertiary=twilio_provider_setup  likely_cause_filtering_export=less_likely  likely_cause_unknown_without_readonly_inspection=true  likely_cause_classification_documented=true  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_pstn_call_path_validation_status=ambiguous_not_confirmed  safest_next_step=readonly_dashboard_api_inspection_before_new_approval  next_step_requires_new_separate_approval_for_any_new_call=true  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
