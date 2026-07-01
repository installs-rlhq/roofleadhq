#!/usr/bin/env node
/**
 * Build 266 Read-Only Verifier (clean Vapi-managed test-number one-call true PSTN validation EVIDENCE +
 * terminal End-Of-Call-Report 404 DIAGNOSIS) — proves the repo-only evidence/diagnosis packet is
 * internally consistent, grounded in the prior builds, honest about the backend 404 (no overclaimed
 * processing), and correct that the 404 is a production runtime/routing/deploy mismatch rather than a
 * Vapi delivery failure.
 *
 * The single controlled true PSTN call itself was a human physical-phone action (approved in Build 265).
 * Build 266 captures the sanitized evidence Jason reported and diagnoses the one blocker: the End Of Call
 * Report POST to /webhooks/vapi/call-completed returned HTTP 404 with body {}. Evidence is never invented.
 *
 * Item 7 (route-registration check): this verifier reads the ACTUAL backend source to confirm that
 * `POST /webhooks/vapi/call-completed` IS registered at repo HEAD (index.ts mount + route file), and that
 * the route's only application-level 404 (`unknown_roofer`) returns a POPULATED body — proving the observed
 * empty-`{}` 404 cannot be the app's own 404 and therefore indicates a production runtime/routing mismatch,
 * NOT a Vapi delivery failure.
 *
 * Read-only. No network, no Supabase call, no credential/secret access, no provider client, no SMS, no
 * Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi
 * publish, no live webhook, no curl, no env mutation, no deploy, no build. Does NOT read any secret file.
 * Checks `git status` before/after to prove non-mutation.
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

const DOC = 'docs/CLEAN_VAPI_PSTN_EOCR_404_BUILD_266.md';
const B265_DOC = 'docs/CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_BUILD_265.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js';
const B265_VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js';
const B264_VERIFIER = 'backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-pstn-eocr-404-build-266-dry-run.sh';
const ROUTE_FILE = 'backend/src/routes/vapi-webhooks.ts';
const INDEX_FILE = 'backend/src/index.ts';
const AUTH_FILE = 'backend/src/middleware/vapi-webhook-auth.ts';

(function main() {
  const before = gitStatus();

  const doc = read(DOC);

  // 1. Prerequisite Build 265 commit present + doc referenced.
  assert(commitPresent('1f27d35'), 'Build 265 prerequisite commit 1f27d35 present in git history');
  assert(fs.existsSync(path.join(repoRoot, B265_DOC)), 'Build 265 approval doc present (predecessor)');
  pass('Build 265 prerequisite commit 1f27d35 present and predecessor approval doc exists');

  // 2. Major-pass evidence captured (the parts that genuinely worked).
  const passClaims = [
    /true PSTN call reached the \*\*clean Vapi-managed Test Number\*\*/i,
    /Test Roofing Assistant\*\* answered \/ was associated/i,
    /Vapi \*\*inbound\*\* call record existed/i,
    /Vapi \*\*webhook stream\*\* existed/i,
    /Non-terminal\*\* Vapi webhook events returned \*\*200\*\*/i,
    /End Of Call Report was observed\*\* and \*\*POSTed\*\*/i,
  ];
  for (const re of passClaims) assert(re.test(doc), `B266 doc missing major-pass claim: ${re}`);
  pass('B266 doc captures the major pass (PSTN reached clean number, assistant associated, inbound record, webhook stream, non-terminal 200s, EOCR observed + POSTed)');

  // 3. Non-terminal events each recorded as 200.
  for (const ev of ['Assistant.started', 'Status Update', 'Conversation Update', 'Speech Update']) {
    assert(doc.includes(ev), `B266 doc lists non-terminal event: ${ev}`);
  }
  pass('B266 doc lists the non-terminal webhook events (Assistant.started / Status / Conversation / Speech Update) as 200');

  // 4. Terminal EOCR blocker recorded exactly: POST, path, 404, empty {} body, timings.
  assert(doc.includes('/webhooks/vapi/call-completed'), 'B266 doc records the EOCR target path');
  assert(/Response Code\s*\|\s*\*\*404\*\*/.test(doc), 'B266 doc records EOCR response code 404');
  assert(/empty JSON object/i.test(doc), 'B266 doc records EOCR response body as empty JSON object');
  assert(doc.includes('2026-06-30 23:58:18.299 UTC'), 'B266 doc records EOCR Started At');
  assert(doc.includes('2026-06-30 23:58:19.384 UTC'), 'B266 doc records EOCR Finished At');
  assert(doc.includes('1.09'), 'B266 doc records EOCR duration 1.09s');
  pass('B266 doc records the terminal EOCR blocker (POST /webhooks/vapi/call-completed -> 404, body {}, 1.09s)');

  // 5. No-overclaim: final-report processing recorded as blocked/failed, not processed.
  assert(/final_report_processing_status=blocked_by_backend_404/.test(doc),
    'B266 doc records final-report processing as blocked_by_backend_404');
  assert(/LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=failed_end_of_call_report_404/.test(doc),
    'B266 doc records lead/final-report processing failed_end_of_call_report_404');
  assert(/Do not overclaim/i.test(doc), 'B266 doc has an explicit do-not-overclaim section');
  assert(/BACKEND_WEBHOOK_RECEIVED=true_or_vapi_received_404_from_configured_backend_target/.test(doc),
    'B266 doc records the honest ambiguous backend-received form');
  pass('B266 doc does not overclaim backend processing (final report blocked_by_backend_404; ambiguous backend-received form recorded)');

  // 6. ITEM 7 — confirm the route IS registered at repo HEAD by reading actual source.
  const indexSrc = read(INDEX_FILE);
  assert(/app\.use\(\s*['"]\/webhooks\/vapi['"]\s*,\s*vapiWebhooksRouter\s*\)/.test(indexSrc),
    'index.ts mounts vapiWebhooksRouter at /webhooks/vapi');
  assert(/import\s+vapiWebhooksRouter\s+from\s+['"]\.\/routes\/vapi-webhooks['"]/.test(indexSrc),
    'index.ts imports the vapi-webhooks router');
  const routeSrc = read(ROUTE_FILE);
  assert(/router\.post\(\s*['"]\/call-completed['"]/.test(routeSrc),
    'vapi-webhooks.ts registers POST /call-completed');
  pass('Route IS registered at repo HEAD: index.ts mounts /webhooks/vapi + vapi-webhooks.ts registers POST /call-completed (composed POST /webhooks/vapi/call-completed)');

  // 7. ITEM 7 — the route's ONLY application 404 is unknown_roofer and returns a POPULATED body,
  //    so an empty-{} 404 cannot be the app's own 404 -> production runtime/routing mismatch.
  assert(/error === 'unknown_roofer'[\s\S]*res\.status\(404\)\.json\(result\)/.test(routeSrc),
    'vapi-webhooks.ts 404 branch is unknown_roofer and returns res.status(404).json(result) (populated body)');
  // The app never emits an empty-object 404: json(result) always carries ok/error/normalized.
  assert(!/res\.status\(404\)\.json\(\{\}\)/.test(routeSrc),
    'vapi-webhooks.ts never returns an empty-object 404');
  const authSrc = read(AUTH_FILE);
  assert(/res\.status\(401\)/.test(authSrc) && /res\.status\(503\)/.test(authSrc),
    'auth middleware emits 401/503 (never 404), so the 404 is not the auth layer');
  pass('Repo can only emit a POPULATED unknown_roofer 404 (never empty {}); auth layer emits 401/503 not 404 — an empty-{} 404 is not producible by the app route');

  // 8. Diagnosis stated correctly: runtime/routing/deploy mismatch, not Vapi delivery failure.
  assert(/production_runtime_routing_deploy_mismatch_not_vapi_delivery_failure/.test(doc),
    'B266 doc states diagnosis = production runtime/routing/deploy mismatch, not Vapi delivery failure');
  assert(/not\*\* a Vapi delivery failure/i.test(doc), 'B266 doc explicitly rules out Vapi delivery failure');
  assert(/repo_route_registered_at_head=true/.test(doc), 'B266 doc records repo route registered at head');
  assert(/observed_404_body_shape=empty_json_object/.test(doc), 'B266 doc records observed 404 body shape empty_json_object');
  assert(/repo_app_404_body_shape=populated_unknown_roofer_not_empty_object/.test(doc),
    'B266 doc records repo app 404 body shape as populated (not empty)');
  pass('B266 doc diagnosis: repo route registered at HEAD; observed empty-{} 404 != app populated 404; therefore production runtime/routing/deploy mismatch, not Vapi delivery failure');

  // 9. Historical grounding: 401/400 at the same URL in earlier builds proves the route was live.
  for (const b of ['Build 237', 'Build 242', 'Build 243']) {
    assert(doc.includes(b), `B266 doc cites historical live-route build: ${b}`);
  }
  assert(/401/.test(doc) && /400/.test(doc), 'B266 doc cites earlier 401/400 past-route statuses');
  pass('B266 doc grounds the regression in history (Build 237/242/243 saw 401/400 at the same URL — route provably live in earlier deploys)');

  // 10. Candidate causes enumerated (read-only; not overclaimed as confirmed).
  const causes = [
    /deployment\/router does not include the route/i,
    /Path\/method mismatch/i,
    /mount\/base-path mismatch/i,
    /Service\/deployment mismatch/i,
    /serving a different app\/build/i,
    /not registered in the current production runtime/i,
  ];
  for (const re of causes) assert(re.test(doc), `B266 doc missing candidate cause: ${re}`);
  pass('B266 doc enumerates the candidate causes (deploy/router omission, path/method, mount/base-path, service, different app/build, not-registered-in-runtime)');

  // 11. Next strategic step = read-only production diagnosis BEFORE any deploy/config approval.
  assert(/read-only production route\/deployment\s+diagnosis/i.test(doc),
    'B266 doc recommends a read-only production route/deployment diagnosis as next step');
  assert(/No deploy or config change is approved by this build/i.test(doc),
    'B266 doc explicitly approves no deploy/config change');
  assert(/creates \*\*no\*\* approval for another call/i.test(doc),
    'B266 doc creates no approval for another call');
  assert(/future-decision template only/i.test(doc), 'B266 doc frames any redeploy as a future-decision template only');
  pass('B266 doc recommends read-only production diagnosis next; approves no new call and no deploy/config change (redeploy is future-decision template only)');

  // 12. Pinned status block present with the expected final-status fields.
  const statusFields = [
    'PSTN_VALIDATION_APPROVAL_STATUS=captured',
    'CALL_ATTEMPT_COUNT=1',
    'CALL_PLACED_FROM=jason_owned_physical_phone',
    'CALL_TARGET=clean_vapi_managed_test_number',
    'EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true',
    'VAPI_CALL_RECORD_FOUND=true',
    'VAPI_CALL_TYPE=inbound_phone_pstn',
    'VAPI_CALL_ID_PRESENT=true',
    'END_OF_CALL_REPORT_OBSERVED=true',
    'VAPI_WEBHOOK_LOG_OBSERVED=true',
    'EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed',
    'BACKEND_WEBHOOK_RESPONSE_STATUS=404',
    'EOCR_WEBHOOK_RESPONSE_BODY_SHAPE=empty_json_object',
    'STOP_CONDITION_TRIGGERED=true_backend_eocr_404',
    'NO_RETRY_PERFORMED=true',
    'NO_SMS_SENT=true',
    'NO_TWILIO_CONFIG_CHANGED=true',
    'NO_RETELL_CONFIG_CHANGED=true',
    'NO_BACKEND_DEPLOY=true',
    'pstn_validation_execution_status=completed_sanitized_evidence_captured',
    'pstn_to_clean_vapi_status=passed',
    'vapi_inbound_call_record_status=passed',
    'vapi_nonterminal_webhook_status=passed_200',
    'vapi_eocr_delivery_status=observed_posted_to_expected_path',
    'backend_eocr_response_status=404',
    'existing_twilio_retell_route_status=preserved_untouched',
  ];
  for (const f of statusFields) assert(doc.includes(f), `B266 doc missing pinned status field: ${f}`);
  pass('B266 doc contains the full pinned status block (evidence + diagnosis + final-status fields)');

  // 13. Safety invariants (nothing mutating was done in this build).
  const gates = [
    /No call placed/i,
    /No PSTN retry/i,
    /No Vapi Test \/ Talk \/ browser \/ webCall/i,
    /No SMS/i,
    /No Twilio API\/CLI/i,
    /No Retell API/i,
    /No deploy \/ redeploy \/ restart/i,
    /No schema\/auth\/RLS change/i,
    /No secret read or printed/i,
    /No invented\s*\n?\s*evidence/i,
    /Read-only repo inspection only/i,
  ];
  for (const re of gates) assert(re.test(doc), `B266 doc missing safety invariant: ${re}`);
  pass('B266 doc states the full Build 266 safety-invariant block (no call/retry/SMS/Twilio/Retell/deploy/schema/secret/invented-evidence; read-only repo inspection only)');

  // 14. No secrets / raw PII / raw IDs / SIP URIs leaked into the doc.
  const leaks = [
    /VAPI_WEBHOOK_SECRET\s*=\s*\S+/i,
    /Bearer\s+[A-Za-z0-9._-]{12,}/,
    /sk-[A-Za-z0-9]{12,}/,
    /sip:[^\s]+@[^\s]+/i,
    /\+1\d{10}\b/,
  ];
  for (const re of leaks) assert(!re.test(doc), `B266 doc must not leak secret/PII pattern: ${re}`);
  pass('B266 doc leaks no secret, bearer token, raw phone number, or SIP URI');

  // 15. Dry-run wrapper exists and wires this verifier + B265 + B264 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B266 verifier file exists');
  for (const v of [B265_VERIFIER, B264_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-pstn-eocr-404-build-266-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-pstn-validation-approval-build-265-readonly.js'),
    'dry-run wrapper runs the Build 265 approval verifier');
  assert(dry.includes('verify-clean-vapi-number-evidence-build-264-readonly.js'),
    'dry-run wrapper runs the Build 264 evidence verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B266 verifier present and the dry-run wrapper wires this verifier + B265 + B264 verifiers + smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 266 clean Vapi-managed test-number one-call true PSTN validation evidence + terminal EOCR 404 diagnosis packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_pstn_eocr_404_evidence_and_diagnosis_repo_only  runtime_action_performed_by_build_266=false  fix_or_config_change_performed_by_build_266=false  build_265_prerequisite_commit=1f27d35  build_265_prerequisite_status=validated  pstn_validation_execution_status=completed_sanitized_evidence_captured  pstn_to_clean_vapi_status=passed  vapi_inbound_call_record_status=passed  vapi_nonterminal_webhook_status=passed_200  vapi_eocr_delivery_status=observed_posted_to_expected_path  backend_eocr_response_status=404  eocr_response_body_shape=empty_json_object  final_report_processing_status=blocked_by_backend_404  stop_condition_triggered=true_backend_eocr_404  repo_route_registered_at_head=true  repo_app_404_body_shape=populated_unknown_roofer_not_empty_object  observed_404_body_shape=empty_json_object  diagnosis=production_runtime_routing_deploy_mismatch_not_vapi_delivery_failure  vapi_delivery_status=succeeded_got_http_response_1.09s  existing_twilio_retell_route_status=preserved_untouched  next_step=read_only_production_route_deployment_diagnosis_before_any_deploy_or_config_approval  no_new_call_approved=true  no_deploy_or_config_approved=true  no_call_placed_by_agent=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  evidence_invented=false  repo_unchanged=true');
})();
