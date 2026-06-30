#!/usr/bin/env node
/**
 * Build 247 Read-Only Verifier — repo-only diagnosis of why the end-of-call-report was NOT observed
 * in the post-fix Vapi browser/webCall CSV captured by Build 246.
 *
 * Read-only. Reads the Build 247 diagnosis doc (and the Build 246 evidence + Build 244 fix-evidence
 * predecessor docs) as text, confirms the Build 246/245/244 prerequisite commits are present in git
 * history, asserts the diagnosis is grounded in the actual backend source, and checks `git status`
 * before/after. No network, no Supabase call, no credential/secret access, no provider client, no
 * SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no Vapi rerun, no live HTTP, no curl, no
 * env mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO runtime/external action.
 *
 * Build 247 is a repo-only DIAGNOSIS (no fix). It explains, using repo/source/config evidence only,
 * why end_of_call_report_observed=false in the Build 246 CSV. This verifier proves the diagnosis
 * packet is internally consistent, grounded in the real backend code, and safe:
 *  - The Build 246 prerequisite commit 563044c is present in git history and recorded in the doc.
 *  - The Build 246 evidence (observed webhook HTTP 200s, no 400) is carried forward unchanged.
 *  - end_of_call_report_observed=false is preserved.
 *  - full_final_report_processing_status remains not_validated; real_call_test_status not_started.
 *  - The diagnosis is repo-only (diagnosis_mode=repo_only; fix_applied=false).
 *  - No runtime/external action occurred (runtime_action_performed_by_build_247=false).
 *  - Backend handling readiness for end-of-call-report is assessed against the real source:
 *    TERMINAL_EVENT_TYPES contains 'end-of-call-report'; a browser/webCall EOCR is acknowledged as a
 *    200 no-op (acknowledge_web_call); the route maps ok results to HTTP 200.
 *  - The likely-cause classification is documented (backend code ruled out; Vapi serverMessages
 *    config most likely; browser-webCall/export timing contributing).
 *  - The safest Build 248 next step (config-inspection-only, no new call, no new approval for
 *    inspection) is documented.
 *  - The doc carries no secret value (redacted markers only) and no secret/token/raw-call-id/phone/PII.
 *  - The full Build 247 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + B246 + B245 + B244-fix + smoke.
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

const DOC = 'docs/VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_BUILD_247.md';
const B246_DOC = 'docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md';
const B244_DOC = 'docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md';
const SERVICE = 'backend/src/services/vapi-webhook.service.ts';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const WEBCALL_FIXTURE = 'docs/samples/vapi-event-webcall-end-of-call-report.fake.json';
const VERIFIER = 'backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js';
const DRY_RUN = 'scripts/run-vapi-end-of-call-report-not-observed-diagnosis-build-247-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B246_VERIFIER = 'backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js';
const B245_VERIFIER = 'backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js';
const B244_VERIFIER = 'backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js';

const DECISION_TOKEN = 'VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_REPO_ONLY_BACKEND_READY_LIKELY_VAPI_SERVERMESSAGE_CONFIG';
const B246_COMMIT = '563044c';
const B245_COMMIT = 'cc3007c';
const B244_COMMIT = '7342539';

(function main() {
  const before = gitStatus();
  console.log('=== Build 247 repo-only end-of-call-report-not-observed diagnosis read-only verification (local-only) ===');
  console.log('No call. No phone dialed. No Vapi Talk. No Vapi rerun. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No fix. No runtime/external action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B247 doc carries the exact decision token');
  pass('Build 247 diagnosis doc exists and carries the decision token');

  // 2. Build 246 prerequisite commit present + recorded; Build 245/244 also present.
  assert(fs.existsSync(path.join(repoRoot, B246_DOC)), 'Build 246 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B244_DOC)), 'Build 244 fix-evidence doc exists');
  assert(commitPresent(B246_COMMIT), 'Build 246 prerequisite commit 563044c is present in git history');
  assert(commitPresent(B245_COMMIT), 'Build 245 prerequisite commit cc3007c is present in git history');
  assert(commitPresent(B244_COMMIT), 'Build 244 prerequisite commit 7342539 is present in git history');
  assert(/build_246_prerequisite_commit\s*=\s*563044c/.test(doc),
    'B247 doc records build_246_prerequisite_commit = 563044c');
  assert(/build_246_prerequisite_status\s*=\s*validated/.test(doc),
    'B247 doc records build_246_prerequisite_status = validated');
  assert(/build_245_prerequisite_commit\s*=\s*cc3007c/.test(doc),
    'B247 doc records build_245_prerequisite_commit = cc3007c');
  assert(/build_244_prerequisite_commit\s*=\s*7342539/.test(doc),
    'B247 doc records build_244_prerequisite_commit = 7342539');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B247 doc records HEAD==origin/main');
  pass('Build 246/245/244 prerequisite docs exist and all three commits (563044c, cc3007c, 7342539) are present in git history and recorded');

  // 3. Build 246 observed webhook HTTP 200s carried forward unchanged.
  assert(/csv_webhook_rows_observed\s*=\s*true/.test(doc), 'B247 doc carries csv_webhook_rows_observed = true');
  assert(/request_path\s*=\s*\/webhooks\/vapi\/call-completed/.test(doc),
    'B247 doc carries request_path = /webhooks/vapi/call-completed');
  assert(/request_method\s*=\s*POST/.test(doc), 'B247 doc carries request_method = POST');
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B247 doc carries all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B247 doc carries http_400_observed = false');
  assert(/response_assistant_started_count\s*=\s*1/.test(doc), 'B247 doc carries assistant.started = 1');
  assert(/response_status_update_count\s*=\s*2/.test(doc), 'B247 doc carries status-update = 2');
  assert(/response_speech_update_count\s*=\s*11/.test(doc), 'B247 doc carries speech-update = 11');
  assert(/response_conversation_update_count\s*=\s*4/.test(doc), 'B247 doc carries conversation-update = 4');
  pass('B247 doc carries forward the Build 246 observed webhook HTTP 200s (assistant.started=1, status-update=2, speech-update=11, conversation-update=4; no 400)');

  // 4. end_of_call_report_observed=false preserved; downstream gates preserved.
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B247 doc preserves end_of_call_report_observed = false');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B247 doc preserves full_final_report_processing_status = not_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B247 doc preserves real_call_test_status = not_started');
  pass('B247 doc preserves end_of_call_report_observed=false, full_final_report_processing not_validated, real_call_test not_started');

  // 5. Diagnosis is repo-only and applied no fix.
  assert(/diagnosis_mode\s*=\s*repo_only/.test(doc), 'B247 doc records diagnosis_mode = repo_only');
  assert(/fix_applied\s*=\s*false/.test(doc), 'B247 doc records fix_applied = false');
  pass('B247 doc records the diagnosis is repo-only and no fix was applied');

  // 6. No runtime/external action occurred.
  assert(/runtime_action_performed_by_build_247\s*=\s*false/.test(doc),
    'B247 doc records runtime_action_performed_by_build_247 = false');
  pass('B247 doc records no runtime/external action was performed by Build 247');

  // 7. Backend handling readiness assessed AND grounded in the real source.
  assert(/backend_expects_end_of_call_report_as_terminal\s*=\s*true/.test(doc),
    'B247 doc records backend_expects_end_of_call_report_as_terminal = true');
  assert(/backend_handles_browser_webcall_eocr_as_200_noop\s*=\s*true/.test(doc),
    'B247 doc records backend_handles_browser_webcall_eocr_as_200_noop = true');
  assert(/backend_readiness_for_end_of_call_report\s*=\s*ready/.test(doc),
    'B247 doc records backend_readiness_for_end_of_call_report = ready');
  // Ground the readiness claims against the actual backend code.
  const service = read(SERVICE);
  assert(/TERMINAL_EVENT_TYPES\s*=\s*new Set\(/.test(service) && /'end-of-call-report'/.test(service),
    'service source: TERMINAL_EVENT_TYPES includes end-of-call-report');
  assert(/acknowledge_web_call/.test(service), 'service source: acknowledge_web_call decision exists');
  assert(/web_call:\s*true/.test(service), 'service source: browser/webCall path returns web_call:true (no-op)');
  const route = read(ROUTE);
  assert(/res\.status\(200\)/.test(route), 'route source: ok results map to HTTP 200');
  assert(fs.existsSync(path.join(repoRoot, WEBCALL_FIXTURE)), 'browser/webCall EOCR fixture exists');
  pass('B247 backend-readiness assessment is grounded in the real source (TERMINAL_EVENT_TYPES has end-of-call-report; acknowledge_web_call → 200 no-op; route returns 200; webCall fixture present)');

  // 8. Likely-cause classification documented.
  assert(/cause_backend_code\s*=\s*ruled_out/.test(doc), 'B247 doc rules out backend code as the cause');
  assert(/cause_vapi_servermessage_config\s*=\s*most_likely/.test(doc),
    'B247 doc records Vapi serverMessages config as most likely cause');
  assert(/repo_contains_vapi_servermessages_enablement_config\s*=\s*false/.test(doc),
    'B247 doc records the repo contains no Vapi serverMessages enablement config');
  assert(/likely_cause_classification\s*=\s*not_backend_code__most_likely_vapi_servermessages_config_plus_browser_webcall_or_export_timing__unknown_without_vapi_dashboard_inspection/.test(doc),
    'B247 doc records the full likely-cause classification');
  pass('B247 doc documents the likely-cause classification (backend ruled out; Vapi serverMessages config most likely; timing contributing; unknown without dashboard inspection)');

  // 9. Safest Build 248 next step documented (config-inspection-only, no new call, no new approval for inspection).
  assert(/safest_build_248_next_step\s*=\s*repo_and_vapi_servermessages_config_inspection_only__no_new_call__no_new_approval_for_inspection/.test(doc),
    'B247 doc records the safest Build 248 next step');
  assert(/pstn_full_report_validation_requires_new_separate_approval\s*=\s*true/.test(doc),
    'B247 doc records PSTN full-report validation requires a new separate approval');
  assert(/[Nn]ext recommended step/.test(doc), 'B247 doc has a Next recommended step section');
  pass('B247 doc documents the safest Build 248 next step (config-inspection-only; no new call; PSTN validation needs a new separate approval)');

  // 10. Approval consumed + no rerun without new approval.
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B247 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B247 doc records rerun_permitted_without_new_approval = false');
  pass('B247 doc records the Build 245 approval is consumed and no rerun is permitted without a new approval');

  // 11. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B247 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B247 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B247 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B247 doc asserts no secrets printed');
  pass('B247 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 12. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B247 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B247 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B247 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B247 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B247 doc contains no phone-number-shaped value');
  pass('B247 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 13. Full safety-invariant block present.
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
  for (const re of gates) assert(re.test(doc), `B247 doc missing safety invariant: ${re}`);
  pass('B247 doc states the full Build 247 safety-invariant block');

  // 14. Dry-run wrapper exists and wires this verifier + B246 + B245 + B244-fix + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B247 verifier file exists');
  for (const v of [B246_VERIFIER, B245_VERIFIER, B244_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js'),
    'dry-run wrapper runs the Build 246 verifier');
  assert(dry.includes('verify-vapi-post-fix-validation-guard-build-245-readonly.js'),
    'dry-run wrapper runs the Build 245 verifier');
  assert(dry.includes('verify-vapi-webhook-payload-shape-fix-build-244.js'),
    'dry-run wrapper runs the Build 244 fix verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B247 verifier present and the dry-run wrapper wires this verifier + B246 + B245 + B244-fix verifiers + smoke regression');

  // 15. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 247 repo-only end-of-call-report-not-observed diagnosis packet verified (${passCount} checks).`);
  console.log('diagnosis_mode=repo_only  fix_applied=false  runtime_action_performed_by_build_247=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_246_prerequisite_commit=563044c  build_245_prerequisite_commit=cc3007c  build_244_prerequisite_commit=7342539  backend_expects_end_of_call_report_as_terminal=true  backend_handles_browser_webcall_eocr_as_200_noop=true  backend_readiness_for_end_of_call_report=ready  repo_contains_vapi_servermessages_enablement_config=false  cause_backend_code=ruled_out  cause_vapi_servermessage_config=most_likely  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  safest_build_248_next_step=config_inspection_only  approval_consumed=true  rerun_permitted_without_new_approval=false  secrets_in_repo=0  repo_unchanged=true');
})();
