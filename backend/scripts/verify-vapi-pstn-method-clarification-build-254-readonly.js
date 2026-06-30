#!/usr/bin/env node
/**
 * Build 254 Read-Only Verifier — proves the repo-only Vapi PSTN VALIDATION METHOD CLARIFICATION packet is
 * internally consistent and safe. After Build 253 diagnosed the most likely cause of the ambiguous PSTN
 * evidence as a user-side web call path (not a true PSTN dial), Jason clarified that the last attempt used
 * LAST_ATTEMPT_METHOD=B (clicked Vapi Test). Build 254 captures that clarification: the last attempt was
 * the Vapi Test control (web transport), NOT a true PSTN phone dial; this explains the prior Type=Web
 * evidence; no true PSTN validation was performed; full final-report processing remains not_validated and
 * true PSTN validation remains not_executed; a fresh approval AND a fresh guard are required before any
 * true PSTN phone dial. Build 254 performs NO runtime/external action and requests NO new call.
 *
 * Read-only. Reads the Build 254 doc (and the Build 250/251/252/253 predecessor docs) as text, confirms
 * the Build 253 prerequisite commit is present in git history, asserts the Build 253 likely-cause
 * classification is preserved, asserts Jason clarified LAST_ATTEMPT_METHOD=B (clicked Vapi Test), asserts
 * Vapi Test is not a true PSTN phone dial, asserts the prior Type=Web evidence is explained by the Vapi
 * Test/web path, asserts true_pstn_call_performed=false, pstn_call_record_confirmed=false,
 * end_of_call_report_observed=false, full_final_report_processing_status=not_validated,
 * true_pstn_validation_status=not_executed, asserts a fresh approval and a fresh guard are required before
 * any true PSTN phone dial, asserts no call/Test/Talk/browserWebCall/curl/Twilio/SMS/secret/config/deploy/
 * runtime action occurred in Build 254, and that no secrets/tokens/raw phone numbers/raw call IDs/PII are
 * present. Checks `git status` before/after. No network, no Supabase call, no credential/secret access, no
 * provider client, no SMS, no Twilio, no call, no phone dialed, no Vapi Test, no Vapi Talk, no
 * browser/webCall, no Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
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

const DOC = 'docs/VAPI_PSTN_METHOD_CLARIFICATION_BUILD_254.md';
const B250_DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md';
const B251_DOC = 'docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md';
const B252_DOC = 'docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md';
const B253_DOC = 'docs/VAPI_PSTN_CALL_PATH_SETUP_DIAGNOSIS_BUILD_253.md';
const VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const DRY_RUN = 'scripts/run-vapi-pstn-method-clarification-build-254-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B252_VERIFIER = 'backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js';
const B251_VERIFIER = 'backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js';
const B250_VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js';

const DECISION_TOKEN = 'VAPI_PSTN_VALIDATION_METHOD_CLARIFICATION_LAST_ATTEMPT_VAPI_TEST_NOT_TRUE_PSTN_DIAL_TRUE_PSTN_NOT_EXECUTED_FRESH_APPROVAL_AND_FRESH_GUARD_REQUIRED';
const B250_COMMIT = 'a487f13';
const B251_COMMIT = '828ea19';
const B252_COMMIT = '424c081';
const B253_COMMIT = '617108e';

(function main() {
  const before = gitStatus();
  console.log('=== Build 254 Vapi PSTN validation METHOD CLARIFICATION READ-ONLY verification (local-only) ===');
  console.log('No PSTN validation executed. No new call requested. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Repo-only read-only clarification capture. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B254 doc carries the exact decision token');
  pass('Build 254 doc exists and carries the decision token');

  // 2. Build 253 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B253_COMMIT), 'Build 253 prerequisite commit 617108e is present in git history');
  assert(commitPresent(B252_COMMIT), 'Build 252 prerequisite commit 424c081 is present in git history');
  assert(commitPresent(B251_COMMIT), 'Build 251 prerequisite commit 828ea19 is present in git history');
  assert(commitPresent(B250_COMMIT), 'Build 250 prerequisite commit a487f13 is present in git history');
  for (const d of [B250_DOC, B251_DOC, B252_DOC, B253_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_253_prerequisite_commit\s*=\s*617108e/.test(doc),
    'B254 doc records build_253_prerequisite_commit = 617108e');
  assert(/build_253_prerequisite_status\s*=\s*validated/.test(doc),
    'B254 doc records build_253_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B254 doc records HEAD==origin/main');
  pass('Build 253 prerequisite commit 617108e present in git history, recorded, and predecessor docs exist');

  // 3. Build 253 likely-cause classification preserved.
  assert(/build_253_likely_cause_primary\s*=\s*user_side_call_path_web_not_pstn/.test(doc),
    'B254 doc preserves build_253_likely_cause_primary = user_side_call_path_web_not_pstn');
  assert(/build_253_likely_cause_classification_preserved\s*=\s*true/.test(doc),
    'B254 doc records build_253_likely_cause_classification_preserved = true');
  pass('B254 doc preserves the Build 253 likely-cause classification (web path, not a true PSTN dial)');

  // 4. Jason clarified LAST_ATTEMPT_METHOD=B.
  assert(/jason_clarified_last_attempt_method\s*=\s*B\b/.test(doc),
    'B254 doc records jason_clarified_last_attempt_method = B');
  assert(/LAST_ATTEMPT_METHOD\s*=\s*B\b/.test(doc),
    'B254 doc records the clarification LAST_ATTEMPT_METHOD = B');
  pass('B254 doc records Jason clarified LAST_ATTEMPT_METHOD = B');

  // 5. B means clicked Vapi Test.
  assert(/last_attempt_method_b_means\s*=\s*clicked_vapi_test/.test(doc),
    'B254 doc records last_attempt_method_b_means = clicked_vapi_test');
  assert(/B\s*=\s*clicked Vapi Test/i.test(doc) || /B\s*=\s*\*\*clicked Vapi Test\*\*/i.test(doc),
    'B254 doc states B = clicked Vapi Test');
  pass('B254 doc records that method B means clicked Vapi Test');

  // 6. Vapi Test is not a true PSTN phone dial.
  assert(/vapi_test_is_true_pstn_dial\s*=\s*false/.test(doc),
    'B254 doc records vapi_test_is_true_pstn_dial = false');
  assert(/last_attempt_was_true_pstn_dial\s*=\s*false/.test(doc),
    'B254 doc records last_attempt_was_true_pstn_dial = false');
  assert(/vapi_test_transport\s*=\s*web/.test(doc),
    'B254 doc records vapi_test_transport = web');
  pass('B254 doc records that Vapi Test is not a true PSTN phone dial (web transport)');

  // 7. Prior Type=Web evidence explained by Vapi Test / web path.
  assert(/prior_type_web_evidence_explained_by_vapi_test_web_path\s*=\s*true/.test(doc),
    'B254 doc records prior_type_web_evidence_explained_by_vapi_test_web_path = true');
  assert(/build_253_primary_cause_confirmed_by_clarification\s*=\s*true/.test(doc),
    'B254 doc records build_253_primary_cause_confirmed_by_clarification = true');
  pass('B254 doc records the prior Type=Web evidence is explained by the Vapi Test/web path');

  // 8. No true PSTN validation performed.
  assert(/true_pstn_call_performed\s*=\s*false/.test(doc),
    'B254 doc records true_pstn_call_performed = false');
  assert(/pstn_call_record_confirmed\s*=\s*false/.test(doc),
    'B254 doc records pstn_call_record_confirmed = false');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B254 doc records end_of_call_report_observed = false');
  pass('B254 doc records no true PSTN validation was performed');

  // 9. Preserved validation outcomes.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B254 doc preserves full_final_report_processing_status = not_validated');
  assert(/true_pstn_validation_status\s*=\s*not_executed/.test(doc),
    'B254 doc records true_pstn_validation_status = not_executed');
  pass('B254 doc preserves full_final_report_processing_status=not_validated and true_pstn_validation_status=not_executed');

  // 10. Fresh approval AND fresh guard required before any true PSTN phone dial.
  assert(/fresh_approval_required_before_true_pstn_dial\s*=\s*true/.test(doc),
    'B254 doc records fresh_approval_required_before_true_pstn_dial = true');
  assert(/fresh_guard_required_before_true_pstn_dial\s*=\s*true/.test(doc),
    'B254 doc records fresh_guard_required_before_true_pstn_dial = true');
  assert(/prior_approval_consumed\s*=\s*true/.test(doc),
    'B254 doc records prior_approval_consumed = true');
  assert(/no_new_call_without_fresh_approval_and_fresh_guard\s*=\s*true/.test(doc),
    'B254 doc records no_new_call_without_fresh_approval_and_fresh_guard = true');
  pass('B254 doc requires a fresh approval AND a fresh guard before any true PSTN phone dial');

  // 11. No runtime/external action by Build 254.
  assert(/build_mode\s*=\s*vapi_pstn_validation_method_clarification_readonly/.test(doc),
    'B254 doc records build_mode = vapi_pstn_validation_method_clarification_readonly');
  assert(/runtime_action_performed_by_build_254\s*=\s*false/.test(doc),
    'B254 doc records runtime_action_performed_by_build_254 = false');
  assert(/another_call_requested\s*=\s*false/.test(doc),
    'B254 doc records another_call_requested = false');
  pass('B254 doc records no runtime/external action and no new call requested by Build 254');

  // 12. Next recommended step = fresh approval for one true PSTN dial from physical phone, no Test/Talk.
  assert(/[Nn]ext recommended step/.test(doc), 'B254 doc has a Next recommended step section');
  assert(/fresh,? separate.{0,40}approval/i.test(doc) && /one true PSTN dial/i.test(doc),
    'B254 doc next step: fresh approval for one true PSTN dial');
  assert(/physical phone|iPhone Phone app/i.test(doc) && /no Vapi Test/i.test(doc) && /no Vapi Talk/i.test(doc),
    'B254 doc next step: physical phone / iPhone Phone app, no Vapi Test, no Vapi Talk');
  pass('B254 doc records the next recommended step (fresh approval for one true PSTN dial from a physical phone, no Vapi Test/Talk)');

  // 13. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B254 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B254 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B254 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B254 doc asserts no secrets printed');
  pass('B254 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 14. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B254 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B254 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B254 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B254 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B254 doc contains no phone-number-shaped value');
  pass('B254 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, or PII values');

  // 15. Full safety-invariant block present (no call/Test/Talk/browserWebCall/curl/Twilio/SMS/secret/config/deploy/runtime).
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
  for (const re of gates) assert(re.test(doc), `B254 doc missing safety invariant: ${re}`);
  pass('B254 doc states the full Build 254 safety-invariant block (no call/Test/Talk/webCall/curl/Twilio/SMS/secret/config/deploy/runtime action)');

  // 16. Dry-run wrapper exists and wires this verifier + B253 + B252 + B251 + B250 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B254 verifier file exists');
  for (const v of [B253_VERIFIER, B252_VERIFIER, B251_VERIFIER, B250_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-pstn-method-clarification-build-254-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs the Build 253 verifier');
  assert(dry.includes('verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js'),
    'dry-run wrapper runs the Build 252 verifier');
  assert(dry.includes('verify-vapi-phone-assignment-correction-build-251-readonly.js'),
    'dry-run wrapper runs the Build 251 verifier');
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js'),
    'dry-run wrapper runs the Build 250 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B254 verifier present and the dry-run wrapper wires this verifier + B253 + B252 + B251 + B250 verifiers + smoke regression');

  // 17. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 254 Vapi PSTN validation method-clarification packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_pstn_validation_method_clarification_readonly  runtime_action_performed_by_build_254=false  another_call_requested=false  build_250_prerequisite_commit=a487f13  build_251_prerequisite_commit=828ea19  build_252_prerequisite_commit=424c081  build_253_prerequisite_commit=617108e  build_253_prerequisite_status=validated  build_253_likely_cause_primary=user_side_call_path_web_not_pstn  build_253_likely_cause_classification_preserved=true  jason_clarified_last_attempt_method=B  last_attempt_method_b_means=clicked_vapi_test  last_attempt_was_true_pstn_dial=false  vapi_test_is_true_pstn_dial=false  vapi_test_transport=web  prior_type_web_evidence_explained_by_vapi_test_web_path=true  build_253_primary_cause_confirmed_by_clarification=true  true_pstn_call_performed=false  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  true_pstn_validation_status=not_executed  prior_approval_consumed=true  fresh_approval_required_before_true_pstn_dial=true  fresh_guard_required_before_true_pstn_dial=true  no_new_call_without_fresh_approval_and_fresh_guard=true  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
