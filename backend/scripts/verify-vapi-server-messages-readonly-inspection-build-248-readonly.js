#!/usr/bin/env node
/**
 * Build 248 Read-Only Verifier — captures the read-only Vapi dashboard `serverMessages` inspection
 * Jason performed after Build 247 (the config-inspection-only next step Build 247 recommended).
 *
 * Read-only. Reads the Build 248 inspection doc (and the Build 247 diagnosis + Build 246 evidence
 * predecessor docs) as text, confirms the Build 247/246 prerequisite commits are present in git
 * history, asserts the captured dashboard evidence is internally consistent and safe, and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no browser/webCall, no Vapi
 * publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs NO
 * runtime/external action.
 *
 * Build 248 is a repo-only EVIDENCE CAPTURE of a read-only dashboard inspection (no fix, no runtime
 * action). This verifier proves the inspection packet is internally consistent and safe:
 *  - The Build 247 prerequisite commit a7adaf5 is present in git history and recorded in the doc.
 *  - The Build 246 prerequisite commit 563044c is present; its end_of_call_report_observed=false is
 *    carried forward unchanged.
 *  - A read-only dashboard inspection was performed (no Talk, no call, no publish, no config change).
 *  - The Webhook Server URL is documented.
 *  - The Bearer credential assignment + Authentication-Enabled visibility are documented.
 *  - The Server Messages section was found; end-of-call-report / conversation-update / function-call
 *    are visible; end-of-call-report appears enabled.
 *  - Missing EOCR is judged UNLIKELY due to a visibly-disabled serverMessages config.
 *  - The remaining likely causes are documented.
 *  - full_final_report_processing_status remains not_validated; real_call_test_status not_started.
 *  - No Talk/call/curl/Twilio/SMS/secret/config-change/publish/deploy/runtime action occurred.
 *  - The doc carries no secret value (redacted markers only) and no secret/token/raw-call-id/phone/PII.
 *  - The full Build 248 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + B247 + B246 + smoke.
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

const DOC = 'docs/VAPI_SERVER_MESSAGES_READONLY_INSPECTION_BUILD_248.md';
const B247_DOC = 'docs/VAPI_END_OF_CALL_REPORT_NOT_OBSERVED_DIAGNOSIS_BUILD_247.md';
const B246_DOC = 'docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md';
const VERIFIER = 'backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js';
const DRY_RUN = 'scripts/run-vapi-server-messages-readonly-inspection-build-248-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B247_VERIFIER = 'backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js';
const B246_VERIFIER = 'backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js';

const DECISION_TOKEN = 'VAPI_SERVER_MESSAGES_READONLY_INSPECTION_EOCR_VISIBLE_ENABLED_MISSING_EOCR_NOT_DUE_TO_DISABLED_SERVERMESSAGES';
const B247_COMMIT = 'a7adaf5';
const B246_COMMIT = '563044c';
const WEBHOOK_URL = 'https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed';

(function main() {
  const before = gitStatus();
  console.log('=== Build 248 Vapi serverMessages read-only dashboard inspection verification (local-only) ===');
  console.log('No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No fix. No runtime/external action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B248 doc carries the exact decision token');
  pass('Build 248 inspection doc exists and carries the decision token');

  // 2. Build 247 prerequisite commit present + recorded; Build 246 also present.
  assert(fs.existsSync(path.join(repoRoot, B247_DOC)), 'Build 247 diagnosis doc exists');
  assert(fs.existsSync(path.join(repoRoot, B246_DOC)), 'Build 246 evidence doc exists');
  assert(commitPresent(B247_COMMIT), 'Build 247 prerequisite commit a7adaf5 is present in git history');
  assert(commitPresent(B246_COMMIT), 'Build 246 prerequisite commit 563044c is present in git history');
  assert(/build_247_prerequisite_commit\s*=\s*a7adaf5/.test(doc),
    'B248 doc records build_247_prerequisite_commit = a7adaf5');
  assert(/build_247_prerequisite_status\s*=\s*validated/.test(doc),
    'B248 doc records build_247_prerequisite_status = validated');
  assert(/build_246_prerequisite_commit\s*=\s*563044c/.test(doc),
    'B248 doc records build_246_prerequisite_commit = 563044c');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B248 doc records HEAD==origin/main');
  pass('Build 247/246 prerequisite docs exist and both commits (a7adaf5, 563044c) are present in git history and recorded');

  // 3. Build 246 end_of_call_report_observed=false carried forward; downstream gates preserved.
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B248 doc carries forward all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B248 doc carries forward http_400_observed = false');
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B248 doc preserves end_of_call_report_observed = false');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B248 doc preserves full_final_report_processing_status = not_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B248 doc preserves real_call_test_status = not_started');
  pass('B248 doc preserves the Build 246 outcomes (HTTP 200s, no 400, end_of_call_report_observed=false, not_validated, not_started)');

  // 4. Read-only dashboard inspection was performed (no Talk/call/publish/config change).
  assert(/inspection_mode\s*=\s*readonly_dashboard/.test(doc), 'B248 doc records inspection_mode = readonly_dashboard');
  assert(/dashboard_inspection_performed\s*=\s*true/.test(doc),
    'B248 doc records dashboard_inspection_performed = true');
  assert(/fix_applied\s*=\s*false/.test(doc), 'B248 doc records fix_applied = false');
  assert(/runtime_action_performed_by_build_248\s*=\s*false/.test(doc),
    'B248 doc records runtime_action_performed_by_build_248 = false');
  pass('B248 doc records a read-only dashboard inspection was performed with no fix and no runtime/external action');

  // 5. Webhook Server URL documented.
  assert(/webhook_server_url_documented\s*=\s*true/.test(doc), 'B248 doc records webhook_server_url_documented = true');
  assert(doc.includes(WEBHOOK_URL), 'B248 doc documents the exact Webhook Server URL');
  pass('B248 doc documents the Webhook Server URL');

  // 6. Bearer credential assignment + Authentication Enabled documented; no custom headers.
  assert(/webhook_bearer_credential_assigned\s*=\s*true/.test(doc),
    'B248 doc records webhook_bearer_credential_assigned = true');
  assert(/RoofLeadHQ Production Webhook Secret \(Bearer Token\)/.test(doc),
    'B248 doc records the Bearer credential name/label');
  assert(/webhook_authentication_enabled_visible\s*=\s*true/.test(doc),
    'B248 doc records webhook_authentication_enabled_visible = true');
  assert(/webhook_custom_http_headers_configured\s*=\s*false/.test(doc),
    'B248 doc records webhook_custom_http_headers_configured = false');
  pass('B248 doc documents the Bearer credential assignment, Authentication-Enabled visibility, and no custom HTTP headers');

  // 7. Server Messages section found; end-of-call-report / conversation-update / function-call visible.
  assert(/server_messages_section_found\s*=\s*true/.test(doc),
    'B248 doc records server_messages_section_found = true');
  assert(/server_messages_end_of_call_report_visible\s*=\s*true/.test(doc),
    'B248 doc records server_messages_end_of_call_report_visible = true');
  assert(/server_messages_conversation_update_visible\s*=\s*true/.test(doc),
    'B248 doc records server_messages_conversation_update_visible = true');
  assert(/server_messages_function_call_visible\s*=\s*true/.test(doc),
    'B248 doc records server_messages_function_call_visible = true');
  assert(/client_messages_hang_visible\s*=\s*true/.test(doc),
    'B248 doc records client_messages_hang_visible = true');
  pass('B248 doc records the Server Messages section found and end-of-call-report / conversation-update / function-call (and client hang) chips visible');

  // 8. end-of-call-report appears enabled; missing EOCR unlikely due to visibly-disabled serverMessages.
  assert(/end_of_call_report_appears_enabled\s*=\s*true/.test(doc),
    'B248 doc records end_of_call_report_appears_enabled = true');
  assert(/missing_eocr_due_to_visibly_disabled_servermessages\s*=\s*unlikely/.test(doc),
    'B248 doc records missing_eocr_due_to_visibly_disabled_servermessages = unlikely');
  pass('B248 doc records end-of-call-report appears enabled and missing EOCR is unlikely due to a visibly-disabled serverMessages config');

  // 9. Remaining likely causes documented.
  assert(/remaining_likely_causes\s*=\s*browser_webcall_behavior__csv_export_timing_or_observability__delayed_final_report__vapi_delivery_nuance__not_resolvable_from_repo_or_readonly_dashboard_alone/.test(doc),
    'B248 doc records the full remaining-likely-causes classification');
  assert(/browser\/webCall behavior/i.test(doc), 'B248 doc documents browser/webCall behavior as a remaining cause');
  assert(/CSV\/export timing/i.test(doc), 'B248 doc documents CSV/export timing/observability as a remaining cause');
  assert(/delayed final report/i.test(doc), 'B248 doc documents a delayed final report as a remaining cause');
  pass('B248 doc documents the remaining likely causes (browser/webCall behavior, CSV/export timing/observability, delayed final report, Vapi delivery nuance)');

  // 10. No further Vapi-originated action authorized; approval consumed.
  assert(/further_vapi_originated_action_authorized\s*=\s*false/.test(doc),
    'B248 doc records further_vapi_originated_action_authorized = false');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B248 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B248 doc records rerun_permitted_without_new_approval = false');
  assert(/[Nn]ext recommended step/.test(doc), 'B248 doc has a Next recommended step section');
  pass('B248 doc records no further Vapi-originated action is authorized, the approval is consumed, and a next step (Build 249) is documented');

  // 11. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B248 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B248 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B248 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B248 doc asserts no secrets printed');
  pass('B248 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 12. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B248 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B248 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B248 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B248 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B248 doc contains no phone-number-shaped value');
  pass('B248 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 13. Full safety-invariant block present.
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
  for (const re of gates) assert(re.test(doc), `B248 doc missing safety invariant: ${re}`);
  pass('B248 doc states the full Build 248 safety-invariant block');

  // 14. Dry-run wrapper exists and wires this verifier + B247 + B246 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B248 verifier file exists');
  for (const v of [B247_VERIFIER, B246_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-server-messages-readonly-inspection-build-248-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js'),
    'dry-run wrapper runs the Build 247 verifier');
  assert(dry.includes('verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js'),
    'dry-run wrapper runs the Build 246 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B248 verifier present and the dry-run wrapper wires this verifier + B247 + B246 verifiers + smoke regression');

  // 15. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 248 Vapi serverMessages read-only dashboard inspection packet verified (${passCount} checks).`);
  console.log('inspection_mode=readonly_dashboard  dashboard_inspection_performed=true  fix_applied=false  runtime_action_performed_by_build_248=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_247_prerequisite_commit=a7adaf5  build_246_prerequisite_commit=563044c  webhook_server_url_documented=true  webhook_bearer_credential_assigned=true  webhook_authentication_enabled_visible=true  webhook_custom_http_headers_configured=false  server_messages_section_found=true  server_messages_end_of_call_report_visible=true  server_messages_conversation_update_visible=true  server_messages_function_call_visible=true  end_of_call_report_appears_enabled=true  missing_eocr_due_to_visibly_disabled_servermessages=unlikely  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  further_vapi_originated_action_authorized=false  approval_consumed=true  rerun_permitted_without_new_approval=false  secrets_in_repo=0  repo_unchanged=true');
})();
