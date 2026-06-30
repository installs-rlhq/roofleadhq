#!/usr/bin/env node
/**
 * Build 256 Read-Only Verifier — proves the repo-only Vapi TRUE PSTN DIAL unexpected-Retell-path
 * STOP-CONDITION evidence packet is internally consistent and safe. After Build 255 captured the approval
 * and built a fresh fail-closed guard for exactly ONE true PSTN validation dial, Jason reran that guard
 * (passed) and performed exactly one true PSTN dial out-of-band from his own physical phone / iPhone Phone
 * app to the Vapi number assigned to Test Roofing Assistant. The call never appeared in Vapi logs; instead
 * a "NEW RETELL CALL — RoofLeadHQ" notification appeared, indicating the dial likely hit an unexpected
 * Retell / Twilio path rather than the intended Vapi path. That is a stop-condition event; the single
 * approval is consumed; no retry without new approval. Build 256 records this sanitized evidence ONLY and
 * performs NO runtime/external action.
 *
 * Read-only. Reads the Build 256 doc (and the Build 255 predecessor doc) as text, confirms the Build 255
 * prerequisite commit is present in git history, asserts the Build 255 guard passed before the action,
 * asserts exactly one true PSTN dial was performed, asserts the approval is consumed, asserts no retry
 * without new approval, asserts the Vapi call record was NOT observed, asserts the Retell notification WAS
 * observed, asserts the likely path was Retell/Twilio rather than the intended Vapi call path, asserts the
 * phone-number-level credential / Server-URL detail is documented as an open routing/config clue, asserts
 * the assistant-level Bearer webhook credential remains the relevant validated backend path, asserts
 * stop_condition_triggered=true, vapi_pstn_validation_result=blocked_by_unexpected_retell_path,
 * full_final_report_processing_status=not_validated, real_pstn_vapi_call_path_status=not_validated, asserts
 * no runtime/external action was performed by Build 256, and that no secrets/tokens/raw phone numbers/raw
 * call IDs/PII are present. Checks `git status` before/after. No network, no Supabase call, no
 * credential/secret access, no provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no
 * Vapi Test, no Vapi Talk, no browser/webCall, no Vapi publish, no live webhook, no curl, no env mutation,
 * no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT
 * build. Performs NO runtime/external action.
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

const DOC = 'docs/VAPI_TRUE_PSTN_DIAL_RETELL_STOP_CONDITION_BUILD_256.md';
const B255_DOC = 'docs/VAPI_TRUE_PSTN_VALIDATION_DIAL_GUARD_BUILD_255.md';
const VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';
const DRY_RUN = 'scripts/run-vapi-true-pstn-dial-retell-stop-condition-build-256-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B255_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';
const B254_VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B252_VERIFIER = 'backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js';

const DECISION_TOKEN = 'VAPI_TRUE_PSTN_DIAL_HIT_UNEXPECTED_RETELL_PATH_NO_VAPI_CALL_RECORD_STOP_CONDITION_TRIGGERED_NO_RETRY_WITHOUT_NEW_APPROVAL';
const B255_COMMIT = '1838a7d';

(function main() {
  const before = gitStatus();
  console.log('=== Build 256 Vapi TRUE PSTN dial UNEXPECTED-RETELL-PATH STOP-CONDITION evidence verification (local-only) ===');
  console.log('No new PSTN dial executed by Build 256. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No Retell. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Sanitized stop-condition evidence capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B256 doc carries the exact decision token');
  pass('Build 256 stop-condition doc exists and carries the decision token');

  // 2. Build 255 prerequisite commit present + recorded; predecessor doc exists.
  assert(commitPresent(B255_COMMIT), 'Build 255 prerequisite commit 1838a7d is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B255_DOC)), `predecessor doc exists: ${B255_DOC}`);
  assert(/build_255_prerequisite_commit\s*=\s*1838a7d/.test(doc),
    'B256 doc records build_255_prerequisite_commit = 1838a7d');
  assert(/build_255_prerequisite_status\s*=\s*validated/.test(doc),
    'B256 doc records build_255_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B256 doc records HEAD==origin/main');
  pass('Build 255 prerequisite commit 1838a7d present in git history, recorded, and predecessor doc exists');

  // 3. Build 255 guard passed before the action.
  assert(/build_255_guard_passed_before_action\s*=\s*true/.test(doc),
    'B256 doc records build_255_guard_passed_before_action = true');
  assert(/rerun[\s\S]{0,40}immediately before[\s\S]{0,40}(dial|action)/i.test(doc)
    || /guard was rerun immediately before dialing and \*\*passed\*\*/i.test(doc),
    'B256 doc states the Build 255 guard was rerun immediately before the dial and passed');
  pass('B256 doc records the Build 255 guard passed (rerun immediately before the action)');

  // 4. Exactly one true PSTN dial was performed.
  assert(/true_pstn_dial_performed\s*=\s*true/.test(doc),
    'B256 doc records true_pstn_dial_performed = true');
  assert(/one_dial_limit\s*=\s*true/.test(doc), 'B256 doc records one_dial_limit = true');
  assert(/true_pstn_dial_count\s*=\s*1/.test(doc), 'B256 doc records true_pstn_dial_count = 1');
  assert(/exactly\s+\*?\*?one\*?\*?\s+true PSTN/i.test(doc),
    'B256 doc states exactly one true PSTN dial was performed');
  pass('B256 doc records exactly one true PSTN dial was performed');

  // 5. Approval is consumed.
  assert(/approved_attempt_consumed\s*=\s*true/.test(doc),
    'B256 doc records approved_attempt_consumed = true');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B256 doc records approval_consumed = true');
  pass('B256 doc records the single approval is consumed');

  // 6. No retry without new approval.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B256 doc records no_retry_without_new_approval = true');
  pass('B256 doc records no retry without a new, separate approval');

  // 7. Vapi call record was NOT observed.
  assert(/vapi_call_record_observed\s*=\s*false/.test(doc),
    'B256 doc records vapi_call_record_observed = false');
  assert(/did not appear in Vapi logs/i.test(doc),
    'B256 doc states the call did not appear in Vapi logs');
  pass('B256 doc records the Vapi call record was NOT observed');

  // 8. Retell notification WAS observed.
  assert(/retell_notification_observed\s*=\s*true/.test(doc),
    'B256 doc records retell_notification_observed = true');
  assert(/NEW RETELL CALL/i.test(doc), 'B256 doc records the "NEW RETELL CALL" notification');
  pass('B256 doc records the Retell notification WAS observed');

  // 9. Likely path was Retell/Twilio rather than the intended Vapi call path.
  assert(/likely_path_was_retell_twilio_not_vapi\s*=\s*true/.test(doc),
    'B256 doc records likely_path_was_retell_twilio_not_vapi = true');
  assert(/likely hit (a|an) (unexpected )?Retell ?\/ ?Twilio path/i.test(doc)
    || /likely hit a Retell \/ Twilio path/i.test(doc),
    'B256 doc states the dial likely hit a Retell/Twilio path');
  pass('B256 doc records the likely path was Retell/Twilio rather than the intended Vapi call path');

  // 10. Phone-number-level credential / Server-URL detail documented as an open routing/config clue.
  assert(/phone_number_level_credential_authentication\s*=\s*no_authentication_fallback_active/.test(doc),
    'B256 doc records phone_number_level_credential_authentication = no_authentication_fallback_active');
  assert(/phone_number_level_server_url\s*=\s*blank/.test(doc),
    'B256 doc records phone_number_level_server_url = blank');
  assert(/phone_number_level_credential_open_routing_clue\s*=\s*true/.test(doc),
    'B256 doc records phone_number_level_credential_open_routing_clue = true');
  pass('B256 doc documents the phone-number-level credential/Server-URL detail as an open routing/config clue');

  // 11. Assistant-level Bearer webhook credential remains the relevant validated backend path.
  assert(/assistant_level_bearer_webhook_credential_remains_validated_backend_path\s*=\s*true/.test(doc),
    'B256 doc records assistant_level_bearer_webhook_credential_remains_validated_backend_path = true');
  assert(/assistant_level_webhook_credential_relevant\s*=\s*true/.test(doc),
    'B256 doc records assistant_level_webhook_credential_relevant = true');
  assert(/backend_webhook_auth_ruled_out_as_cause\s*=\s*true/.test(doc),
    'B256 doc records backend_webhook_auth_ruled_out_as_cause = true');
  assert(/\/webhooks\/vapi\/call-completed/.test(doc),
    'B256 doc references the /webhooks/vapi/call-completed backend path');
  pass('B256 doc records the assistant-level Bearer webhook credential remains the relevant validated backend path');

  // 12. stop_condition_triggered = true.
  assert(/stop_condition_triggered\s*=\s*true/.test(doc),
    'B256 doc records stop_condition_triggered = true');
  pass('B256 doc records stop_condition_triggered = true');

  // 13. vapi_pstn_validation_result = blocked_by_unexpected_retell_path.
  assert(/vapi_pstn_validation_result\s*=\s*blocked_by_unexpected_retell_path/.test(doc),
    'B256 doc records vapi_pstn_validation_result = blocked_by_unexpected_retell_path');
  pass('B256 doc records vapi_pstn_validation_result = blocked_by_unexpected_retell_path');

  // 14. full_final_report_processing_status = not_validated.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B256 doc records full_final_report_processing_status = not_validated');
  pass('B256 doc records full_final_report_processing_status = not_validated');

  // 15. real_pstn_vapi_call_path_status = not_validated.
  assert(/real_pstn_vapi_call_path_status\s*=\s*not_validated/.test(doc),
    'B256 doc records real_pstn_vapi_call_path_status = not_validated');
  pass('B256 doc records real_pstn_vapi_call_path_status = not_validated');

  // 16. No runtime/external action by Build 256.
  assert(/build_mode\s*=\s*true_pstn_dial_retell_stop_condition_evidence_capture/.test(doc),
    'B256 doc records build_mode = true_pstn_dial_retell_stop_condition_evidence_capture');
  assert(/runtime_action_performed_by_build_256\s*=\s*false/.test(doc),
    'B256 doc records runtime_action_performed_by_build_256 = false');
  assert(/pstn_dial_performed_by_jason_out_of_band\s*=\s*true/.test(doc),
    'B256 doc records pstn_dial_performed_by_jason_out_of_band = true');
  pass('B256 doc records no runtime/external action by Build 256 (out-of-band dial; evidence capture only)');

  // 17. Next recommended step = repo-only/read-only diagnose Twilio/Retell/Vapi number routing first.
  assert(/[Nn]ext recommended step/.test(doc), 'B256 doc has a Next recommended step section');
  assert(/[Rr]epo-only \/ read-only diagnosis/.test(doc) || /[Rr]epo-only\/read-only diagnose/i.test(doc),
    'B256 doc next step is repo-only/read-only diagnosis');
  assert(/Twilio \/ Retell \/ Vapi number routing/i.test(doc) || /Twilio\/Retell\/Vapi number routing/i.test(doc),
    'B256 doc next step names Twilio/Retell/Vapi number routing diagnosis before any new call or config change');
  pass('B256 doc records the next recommended step (repo-only/read-only diagnose Twilio/Retell/Vapi number routing before any new call or config change)');

  // 18. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B256 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B256 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B256 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B256 doc asserts no secrets printed');
  pass('B256 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 19. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B256 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B256 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B256 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B256 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B256 doc contains no phone-number-shaped value');
  pass('B256 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

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
    /No Twilio configuration change/i,
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
  for (const re of gates) assert(re.test(doc), `B256 doc missing safety invariant: ${re}`);
  pass('B256 doc states the full Build 256 safety-invariant block (no call/Test/Talk/webCall/curl/Twilio/Retell/SMS/secret/config/deploy/runtime action)');

  // 21. Dry-run wrapper exists and wires this verifier + B255 + B254 + B253 + B252 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B256 verifier file exists');
  for (const v of [B255_VERIFIER, B254_VERIFIER, B253_VERIFIER, B252_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js'),
    'dry-run wrapper runs the Build 255 verifier');
  assert(dry.includes('verify-vapi-pstn-method-clarification-build-254-readonly.js'),
    'dry-run wrapper runs the Build 254 verifier');
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs the Build 253 verifier');
  assert(dry.includes('verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js'),
    'dry-run wrapper runs the Build 252 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B256 verifier present and the dry-run wrapper wires this verifier + B255 + B254 + B253 + B252 verifiers + smoke regression');

  // 22. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 256 Vapi true PSTN dial unexpected-Retell-path stop-condition evidence packet verified (${passCount} checks).`);
  console.log('build_mode=true_pstn_dial_retell_stop_condition_evidence_capture  runtime_action_performed_by_build_256=false  pstn_dial_performed_by_jason_out_of_band=true  build_255_prerequisite_commit=1838a7d  build_255_prerequisite_status=validated  build_255_guard_passed_before_action=true  true_pstn_dial_performed=true  one_dial_limit=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  vapi_pstn_validation_result=blocked_by_unexpected_retell_path  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  stop_condition_triggered=true  phone_number_level_credential_authentication=no_authentication_fallback_active  phone_number_level_server_url=blank  phone_number_level_credential_open_routing_clue=true  assistant_level_bearer_webhook_credential_remains_validated_backend_path=true  assistant_level_webhook_credential_relevant=true  backend_webhook_auth_ruled_out_as_cause=true  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_config_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
