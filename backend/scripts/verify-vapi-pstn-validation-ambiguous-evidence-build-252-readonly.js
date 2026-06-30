#!/usr/bin/env node
/**
 * Build 252 Read-Only Verifier — proves the repo-only Vapi PSTN-VALIDATION AMBIGUOUS-EVIDENCE
 * CAPTURE packet is internally consistent and safe. Build 252 captures that the single approved
 * controlled PSTN end-of-call-report validation attempt was reported completed once (the attempt is
 * now consumed), and that the post-attempt evidence is ambiguous / not confirmed: the Vapi-visible
 * records show web/browser call evidence only, with no confirmed PSTN call record and no
 * end-of-call-report observed. Build 252 does NOT perform the PSTN validation and does NOT retry it.
 *
 * Read-only. Reads the Build 252 doc (and the Build 250 guard + Build 251 correction predecessor docs)
 * as text, confirms the Build 250 and Build 251 prerequisite commits are present in git history,
 * asserts the approval scope was one controlled PSTN end-of-call-report validation attempt, asserts
 * Build 251 corrected the phone assignment to Test Roofing Assistant, asserts the guard was rerun after
 * Build 251 and passed, asserts one approved attempt was reported completed and is consumed with no
 * retry permitted without new approval, asserts the CSV/Logs evidence appeared web/browser (not PSTN),
 * asserts pstn_call_record_confirmed=false, end_of_call_report_observed=false,
 * full_final_report_processing_status=not_validated, real_pstn_call_path_validation_status=
 * ambiguous_not_confirmed, no SMS reported, no Twilio action confirmed, no secrets/tokens/raw-call-ids/
 * phone-numbers/PII present, and no runtime/external action performed by this build. Checks
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

const DOC = 'docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md';
const B250_DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md';
const B251_DOC = 'docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md';
const VERIFIER = 'backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js';
const DRY_RUN = 'scripts/run-vapi-pstn-validation-ambiguous-evidence-build-252-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B251_VERIFIER = 'backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js';
const B250_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';
const B249_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js';

const DECISION_TOKEN = 'VAPI_PSTN_VALIDATION_ATTEMPT_CONSUMED_EVIDENCE_AMBIGUOUS_WEB_ONLY_NO_PSTN_RECORD_NO_RETRY_WITHOUT_NEW_APPROVAL';
const B250_COMMIT = 'a487f13';
const B251_COMMIT = '828ea19';

(function main() {
  const before = gitStatus();
  console.log('=== Build 252 Vapi PSTN-validation AMBIGUOUS-EVIDENCE CAPTURE verification (local-only) ===');
  console.log('No PSTN validation executed. No retry of the consumed attempt. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Evidence capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B252 doc carries the exact decision token');
  pass('Build 252 doc exists and carries the decision token');

  // 2. Build 250 + Build 251 prerequisite commits/docs present + recorded.
  assert(commitPresent(B250_COMMIT), 'Build 250 prerequisite commit a487f13 is present in git history');
  assert(commitPresent(B251_COMMIT), 'Build 251 prerequisite commit 828ea19 is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B250_DOC)), 'Build 250 PSTN validation guard doc exists');
  assert(fs.existsSync(path.join(repoRoot, B251_DOC)), 'Build 251 phone-assignment correction doc exists');
  assert(/build_250_prerequisite_commit\s*=\s*a487f13/.test(doc),
    'B252 doc records build_250_prerequisite_commit = a487f13');
  assert(/build_250_prerequisite_status\s*=\s*validated/.test(doc),
    'B252 doc records build_250_prerequisite_status = validated');
  assert(/build_251_prerequisite_commit\s*=\s*828ea19/.test(doc),
    'B252 doc records build_251_prerequisite_commit = 828ea19');
  assert(/build_251_prerequisite_status\s*=\s*validated/.test(doc),
    'B252 doc records build_251_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B252 doc records HEAD==origin/main');
  pass('Build 250 + Build 251 prerequisite commits present in git history, recorded, and both docs exist');

  // 3. Build 250 approval limited to one controlled PSTN end-of-call-report validation attempt.
  assert(/approval_scope\s*=\s*one_controlled_pstn_end_of_call_report_validation_attempt/.test(doc),
    'B252 doc records approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt');
  assert(/approved_assistant\s*=\s*test_roofing_assistant_only/.test(doc),
    'B252 doc records approved_assistant = test_roofing_assistant_only');
  assert(/approved_number\s*=\s*jason_owned_or_test_number_only/.test(doc),
    'B252 doc records approved_number = jason_owned_or_test_number_only');
  assert(/one_attempt_limit\s*=\s*true/.test(doc), 'B252 doc records one_attempt_limit = true');
  pass('B252 doc records the Build 250 approval was limited to one controlled PSTN end-of-call-report validation attempt (Test Roofing Assistant + Jason-owned/test number only)');

  // 4. Build 251 corrected phone assignment to Test Roofing Assistant.
  assert(/corrected_assistant_assignment\s*=\s*test_roofing_assistant/.test(doc),
    'B252 doc records corrected_assistant_assignment = test_roofing_assistant (Build 251)');
  pass('B252 doc records Build 251 corrected the phone assignment to Test Roofing Assistant');

  // 5. Guard was rerun after Build 251 and passed.
  assert(/guard_rerun_after_build_251\s*=\s*passed/.test(doc),
    'B252 doc records guard_rerun_after_build_251 = passed');
  pass('B252 doc records the Build 250 guard was rerun after Build 251 and passed');

  // 6. One approved attempt was reported completed; approval consumed.
  assert(/pstn_validation_attempt_reported_completed\s*=\s*true/.test(doc),
    'B252 doc records pstn_validation_attempt_reported_completed = true');
  assert(/pstn_validation_attempt_consumed\s*=\s*true/.test(doc),
    'B252 doc records pstn_validation_attempt_consumed = true');
  assert(/attempt_count\s*=\s*1/.test(doc), 'B252 doc records attempt_count = 1');
  pass('B252 doc records one approved attempt was reported completed and the approval is consumed');

  // 7. No retry performed; no retry permitted without new approval.
  assert(/retry_performed\s*=\s*false/.test(doc), 'B252 doc records retry_performed = false');
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B252 doc records no_retry_without_new_approval = true');
  pass('B252 doc records no retry performed and no retry permitted without a new, separate approval');

  // 8. Uploaded CSV evidence appeared web/browser, not PSTN.
  assert(/webhook_rows_observed\s*=\s*true/.test(doc), 'B252 doc records webhook_rows_observed = true');
  assert(/all_observed_webhook_responses_http_200\s*=\s*true/.test(doc),
    'B252 doc records all_observed_webhook_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B252 doc records http_400_observed = false');
  assert(/csv_call_type_appeared\s*=\s*web_browser/.test(doc),
    'B252 doc records csv_call_type_appeared = web_browser');
  assert(/pstn_twilio_indicators_observed\s*=\s*false/.test(doc),
    'B252 doc records pstn_twilio_indicators_observed = false');
  pass('B252 doc records the uploaded CSV evidence appeared web/browser (webhook rows HTTP 200, no HTTP 400, no PSTN/Twilio indicators)');

  // 9. Visible Vapi Calls records were Type=Web only.
  assert(/visible_vapi_calls_type\s*=\s*web_only/.test(doc),
    'B252 doc records visible_vapi_calls_type = web_only');
  pass('B252 doc records the visible Vapi Calls records for Test Roofing Assistant were Type = Web only');

  // 10. User reported no PSTN results found through filters.
  assert(/user_reported_no_pstn_results\s*=\s*true/.test(doc),
    'B252 doc records user_reported_no_pstn_results = true');
  pass('B252 doc records the user reported no PSTN results found through filters');

  // 11. pstn_call_record_confirmed = false.
  assert(/pstn_call_record_confirmed\s*=\s*false/.test(doc),
    'B252 doc records pstn_call_record_confirmed = false');
  pass('B252 doc records pstn_call_record_confirmed = false');

  // 12. end_of_call_report_observed = false.
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B252 doc records end_of_call_report_observed = false');
  pass('B252 doc records end_of_call_report_observed = false');

  // 13. full_final_report_processing_status = not_validated.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B252 doc records full_final_report_processing_status = not_validated');
  pass('B252 doc records full_final_report_processing_status = not_validated');

  // 14. real_pstn_call_path_validation_status = ambiguous_not_confirmed.
  assert(/real_pstn_call_path_validation_status\s*=\s*ambiguous_not_confirmed/.test(doc),
    'B252 doc records real_pstn_call_path_validation_status = ambiguous_not_confirmed');
  assert(/pstn_validation_result\s*=\s*ambiguous_not_confirmed/.test(doc),
    'B252 doc records pstn_validation_result = ambiguous_not_confirmed');
  pass('B252 doc records real_pstn_call_path_validation_status = ambiguous_not_confirmed');

  // 15. No SMS reported.
  assert(/sms_reported\s*=\s*false/.test(doc), 'B252 doc records sms_reported = false');
  assert(/live_sms_sent\s*=\s*false/.test(doc), 'B252 doc records live_sms_sent = false');
  pass('B252 doc records no SMS reported / no live SMS sent');

  // 16. No Twilio action confirmed.
  assert(/twilio_action_confirmed\s*=\s*false/.test(doc),
    'B252 doc records twilio_action_confirmed = false');
  pass('B252 doc records no Twilio action confirmed');

  // 17. No PSTN/runtime action performed by Build 252.
  assert(/build_mode\s*=\s*vapi_pstn_validation_ambiguous_evidence_capture/.test(doc),
    'B252 doc records build_mode = vapi_pstn_validation_ambiguous_evidence_capture');
  assert(/pstn_validation_action_performed_by_build_252\s*=\s*false/.test(doc),
    'B252 doc records pstn_validation_action_performed_by_build_252 = false');
  assert(/runtime_action_performed_by_build_252\s*=\s*false/.test(doc),
    'B252 doc records runtime_action_performed_by_build_252 = false');
  assert(/phone_dialed\s*=\s*false/.test(doc), 'B252 doc records phone_dialed = false');
  pass('B252 doc records no PSTN/runtime action performed by Build 252 (evidence capture only)');

  // 18. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B252 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B252 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B252 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B252 doc asserts no secrets printed');
  pass('B252 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 19. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B252 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B252 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B252 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B252 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B252 doc contains no phone-number-shaped value');
  pass('B252 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 20. Full safety-invariant block present.
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
  for (const re of gates) assert(re.test(doc), `B252 doc missing safety invariant: ${re}`);
  pass('B252 doc states the full Build 252 safety-invariant block');

  // 21. Next recommended step documents repo-only/read-only PSTN call-path diagnosis before any new approval/retry.
  assert(/[Nn]ext recommended step/.test(doc), 'B252 doc has a Next recommended step section');
  assert(/read-only/i.test(doc) && /diagnos/i.test(doc) && /PSTN call-path/i.test(doc),
    'B252 doc next step: repo-only/read-only diagnose the PSTN call-path setup');
  assert(/new,? separate approval/i.test(doc),
    'B252 doc next step requires a new, separate approval before any new attempt/retry');
  pass('B252 doc documents the next step: repo-only/read-only diagnose the PSTN call-path before any new approval/retry');

  // 22. Dry-run wrapper exists and wires this verifier + B251 + B250 + B249 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B252 verifier file exists');
  for (const v of [B251_VERIFIER, B250_VERIFIER, B249_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-phone-assignment-correction-build-251-readonly.js'),
    'dry-run wrapper runs the Build 251 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs the Build 250 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js'),
    'dry-run wrapper runs the Build 249 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B252 verifier present and the dry-run wrapper wires this verifier + B251 + B250 + B249 verifiers + smoke regression');

  // 23. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 252 Vapi PSTN-validation ambiguous-evidence-capture packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_pstn_validation_ambiguous_evidence_capture  pstn_validation_action_performed_by_build_252=false  runtime_action_performed_by_build_252=false  build_250_prerequisite_commit=a487f13  build_250_prerequisite_status=validated  build_251_prerequisite_commit=828ea19  build_251_prerequisite_status=validated  approval_scope=one_controlled_pstn_end_of_call_report_validation_attempt  approved_assistant=test_roofing_assistant_only  approved_number=jason_owned_or_test_number_only  corrected_assistant_assignment=test_roofing_assistant  guard_rerun_after_build_251=passed  one_attempt_limit=true  attempt_count=1  pstn_validation_attempt_reported_completed=true  pstn_validation_attempt_consumed=true  retry_performed=false  no_retry_without_new_approval=true  webhook_rows_observed=true  all_observed_webhook_responses_http_200=true  http_400_observed=false  csv_call_type_appeared=web_browser  pstn_twilio_indicators_observed=false  visible_vapi_calls_type=web_only  user_reported_no_pstn_results=true  pstn_call_record_confirmed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  sms_reported=false  twilio_action_confirmed=false  full_final_report_processing_status=not_validated  pstn_validation_result=ambiguous_not_confirmed  real_pstn_call_path_validation_status=ambiguous_not_confirmed  phone_dialed=false  live_sms_sent=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
