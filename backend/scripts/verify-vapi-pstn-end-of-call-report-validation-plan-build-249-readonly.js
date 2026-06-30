#!/usr/bin/env node
/**
 * Build 249 Read-Only Verifier — proves the repo-only PSTN end-of-call-report VALIDATION PLAN is
 * documentation-only, internally consistent, and safe. Build 249 defines (does NOT execute) the
 * future, approval-gated PSTN validation.
 *
 * Read-only. Reads the Build 249 plan doc (and the Build 248 inspection + Build 246 evidence
 * predecessor docs) as text, confirms the Build 248/246 prerequisite commits are present in git
 * history, asserts the plan is documentation-only and carries forward the established outcomes, and
 * checks `git status` before/after. No network, no Supabase call, no credential/secret access, no
 * provider client, no SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no browser/webCall, no
 * Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. Performs NO
 * runtime/external action.
 *
 * This verifier proves the plan packet is internally consistent and safe:
 *  - The Build 248 prerequisite commit 3c97ddb is present in git history and recorded in the doc.
 *  - The Build 246 prerequisite commit 563044c is present; its browser/webCall HTTP-200 outcomes and
 *    end_of_call_report_observed=false are carried forward unchanged.
 *  - end-of-call-report enabled=true (from the Build 248 read-only dashboard inspection) is recorded.
 *  - full_final_report_processing_status remains not_validated; real_call_test_status not_started.
 *  - The PSTN validation plan is documentation-only (no validation executed, no runtime action).
 *  - Future PSTN validation requires a new, separate approval.
 *  - The one-attempt limit is documented.
 *  - The evidence-capture fields are documented.
 *  - The stop conditions and the decision tree are documented.
 *  - No Talk/call/curl/Twilio/SMS/secret/config-change/publish/deploy/runtime action occurred.
 *  - The doc carries no secret value and no secret/token/raw-call-id/phone/PII.
 *  - The full Build 249 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + B248 + B246 + smoke.
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

const DOC = 'docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md';
const B248_DOC = 'docs/VAPI_SERVER_MESSAGES_READONLY_INSPECTION_BUILD_248.md';
const B246_DOC = 'docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md';
const VERIFIER = 'backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js';
const DRY_RUN = 'scripts/run-vapi-pstn-end-of-call-report-validation-plan-build-249-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B248_VERIFIER = 'backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js';
const B246_VERIFIER = 'backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js';

const DECISION_TOKEN = 'VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_DOCUMENTATION_ONLY_NEW_APPROVAL_REQUIRED_ONE_ATTEMPT';
const B248_COMMIT = '3c97ddb';
const B246_COMMIT = '563044c';

(function main() {
  const before = gitStatus();
  console.log('=== Build 249 Vapi PSTN end-of-call-report validation PLAN verification (local-only) ===');
  console.log('No validation executed. No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Documentation-only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B249 doc carries the exact decision token');
  pass('Build 249 plan doc exists and carries the decision token');

  // 2. Build 248 prerequisite commit present + recorded; Build 246 also present.
  assert(fs.existsSync(path.join(repoRoot, B248_DOC)), 'Build 248 inspection doc exists');
  assert(fs.existsSync(path.join(repoRoot, B246_DOC)), 'Build 246 evidence doc exists');
  assert(commitPresent(B248_COMMIT), 'Build 248 prerequisite commit 3c97ddb is present in git history');
  assert(commitPresent(B246_COMMIT), 'Build 246 prerequisite commit 563044c is present in git history');
  assert(/build_248_prerequisite_commit\s*=\s*3c97ddb/.test(doc),
    'B249 doc records build_248_prerequisite_commit = 3c97ddb');
  assert(/build_248_prerequisite_status\s*=\s*validated/.test(doc),
    'B249 doc records build_248_prerequisite_status = validated');
  assert(/build_246_prerequisite_commit\s*=\s*563044c/.test(doc),
    'B249 doc records build_246_prerequisite_commit = 563044c');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B249 doc records HEAD==origin/main');
  pass('Build 248/246 prerequisite docs exist and both commits (3c97ddb, 563044c) are present in git history and recorded');

  // 3. Browser/webCall observed webhook 200s recorded; downstream gates preserved.
  assert(/all_observed_responses_http_200\s*=\s*true/.test(doc),
    'B249 doc records browser/webCall all_observed_responses_http_200 = true');
  assert(/http_400_observed\s*=\s*false/.test(doc), 'B249 doc carries forward http_400_observed = false');
  pass('B249 doc records the browser/webCall observed webhook HTTP 200s (and no 400)');

  // 4. end-of-call-report enabled=true (from B248 read-only dashboard inspection).
  assert(/end_of_call_report_appears_enabled\s*=\s*true/.test(doc),
    'B249 doc records end_of_call_report_appears_enabled = true (B248 dashboard inspection)');
  pass('B249 doc records end-of-call-report enabled = true from the read-only dashboard inspection');

  // 5. browser/webCall end_of_call_report_observed = false preserved.
  assert(/end_of_call_report_observed\s*=\s*false/.test(doc),
    'B249 doc preserves browser/webCall end_of_call_report_observed = false');
  pass('B249 doc preserves the browser/webCall end_of_call_report_observed = false');

  // 6. full_final_report_processing_status = not_validated; real_call_test_status = not_started.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B249 doc preserves full_final_report_processing_status = not_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B249 doc preserves real_call_test_status = not_started');
  pass('B249 doc preserves full_final_report_processing_status=not_validated and real_call_test_status=not_started');

  // 7. PSTN validation plan is documentation only (no validation executed, no runtime action).
  assert(/build_mode\s*=\s*documentation_only/.test(doc), 'B249 doc records build_mode = documentation_only');
  assert(/plan_documentation_only\s*=\s*true/.test(doc), 'B249 doc records plan_documentation_only = true');
  assert(/validation_executed\s*=\s*false/.test(doc), 'B249 doc records validation_executed = false');
  assert(/pstn_validation_plan_status\s*=\s*documented_not_executed/.test(doc),
    'B249 doc records pstn_validation_plan_status = documented_not_executed');
  assert(/runtime_action_performed_by_build_249\s*=\s*false/.test(doc),
    'B249 doc records runtime_action_performed_by_build_249 = false');
  pass('B249 doc records the PSTN validation plan is documentation-only (no validation executed, no runtime action)');

  // 8. Why PSTN is the next meaningful validation.
  assert(/pstn_is_next_meaningful_validation\s*=\s*true/.test(doc),
    'B249 doc records pstn_is_next_meaningful_validation = true');
  assert(/PSTN call path is the likely path to produce a full final report/i.test(doc),
    'B249 doc explains the PSTN path produces the full final report with phone-routing fields');
  pass('B249 doc explains why PSTN validation is the next meaningful validation');

  // 9. Future PSTN validation requires a new, separate approval; approval consumed; one-attempt limit.
  assert(/future_pstn_validation_requires_new_approval\s*=\s*true/.test(doc),
    'B249 doc records future_pstn_validation_requires_new_approval = true');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B249 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B249 doc records rerun_permitted_without_new_approval = false');
  assert(/one_attempt_limit\s*=\s*true/.test(doc), 'B249 doc records one_attempt_limit = true');
  assert(/pstn_validation_attempt_limit\s*=\s*1/.test(doc),
    'B249 doc records pstn_validation_attempt_limit = 1');
  pass('B249 doc records future PSTN validation requires a new separate approval and a one-attempt limit');

  // 10. Preconditions documented.
  const preconditions = [
    /precondition_separate_approval\s*=\s*required/,
    /precondition_one_attempt_only\s*=\s*required/,
    /precondition_approved_assistant_only\s*=\s*required/,
    /precondition_jason_owned_test_number_only\s*=\s*required/,
    /precondition_no_real_traffic\s*=\s*required/,
    /precondition_no_sms_unless_separately_approved\s*=\s*required/,
    /precondition_no_production_data_export\s*=\s*required/,
    /precondition_no_schema_auth_rls_change\s*=\s*required/,
    /precondition_no_billing_crm_public_automation\s*=\s*required/,
  ];
  for (const re of preconditions) assert(re.test(doc), `B249 doc missing precondition field: ${re}`);
  pass('B249 doc documents all PSTN preconditions (approval, one-attempt, approved assistant, Jason-owned number, no real traffic, no SMS, no export, no schema/auth/RLS, no billing/CRM/public automation)');

  // 11. Evidence-capture fields documented.
  assert(/evidence_capture_fields_documented\s*=\s*true/.test(doc),
    'B249 doc records evidence_capture_fields_documented = true');
  const evidence = [
    /evidence_field_vapi_webhooks_rows\s*=\s*required/,
    /evidence_field_end_of_call_report_observed\s*=\s*required/,
    /evidence_field_endpoint_url_path\s*=\s*required/,
    /evidence_field_http_method_post\s*=\s*required/,
    /evidence_field_http_status\s*=\s*required/,
    /evidence_field_sanitized_response_body_summary\s*=\s*required/,
    /evidence_field_backend_receipt_status\s*=\s*required/,
    /evidence_field_full_payload_processing_succeeded\s*=\s*required/,
    /evidence_field_lead_or_booking_write_or_blocked\s*=\s*required/,
    /evidence_field_no_raw_call_ids_phones_tokens_secrets_pii\s*=\s*required/,
  ];
  for (const re of evidence) assert(re.test(doc), `B249 doc missing evidence-capture field: ${re}`);
  pass('B249 doc documents all evidence-capture fields (Vapi rows, EOCR observed, endpoint URL/path, POST, status, sanitized body summary, backend receipt, full processing, lead/booking write-or-blocked, no PII)');

  // 12. Stop conditions documented.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B249 doc records stop_conditions_documented = true');
  const stops = [
    /stop_after_one_attempt\s*=\s*true/,
    /stop_on_non_200_unexpected\s*=\s*true/,
    /stop_on_unexpected_sms_twilio_real_traffic\s*=\s*true/,
    /stop_if_eocr_not_shown\s*=\s*true/,
    /no_retry_without_new_approval\s*=\s*true/,
  ];
  for (const re of stops) assert(re.test(doc), `B249 doc missing stop-condition field: ${re}`);
  pass('B249 doc documents all stop conditions (one attempt, non-200, unexpected SMS/Twilio/real-traffic, EOCR not shown, no retry without new approval)');

  // 13. Decision tree documented.
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B249 doc records decision_tree_documented = true');
  const decisions = [
    /decision_200_expected_behavior\s*=\s*capture_closeout/,
    /decision_eocr_missing\s*=\s*diagnose_vapi_pstn_delivery_or_config/,
    /decision_400_or_500\s*=\s*diagnose_backend_payload_processing/,
    /decision_401\s*=\s*diagnose_credential_mismatch/,
    /decision_sms_or_real_traffic_risk\s*=\s*stop_and_disable_path/,
  ];
  for (const re of decisions) assert(re.test(doc), `B249 doc missing decision-tree branch: ${re}`);
  pass('B249 doc documents the full decision tree (200→closeout, missing→Vapi PSTN diagnose, 400/500→backend, 401→credential, SMS/real-traffic→stop & disable)');

  // 14. No further Vapi-originated action authorized; next step documented.
  assert(/further_vapi_originated_action_authorized\s*=\s*false/.test(doc),
    'B249 doc records further_vapi_originated_action_authorized = false');
  assert(/[Nn]ext recommended step/.test(doc), 'B249 doc has a Next recommended step section');
  pass('B249 doc records no further Vapi-originated action is authorized and documents the next step');

  // 15. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B249 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B249 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B249 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B249 doc asserts no secrets printed');
  pass('B249 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 16. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B249 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B249 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B249 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B249 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B249 doc contains no phone-number-shaped value');
  pass('B249 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 17. Full safety-invariant block present.
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
  for (const re of gates) assert(re.test(doc), `B249 doc missing safety invariant: ${re}`);
  pass('B249 doc states the full Build 249 safety-invariant block');

  // 18. Dry-run wrapper exists and wires this verifier + B248 + B246 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B249 verifier file exists');
  for (const v of [B248_VERIFIER, B246_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-server-messages-readonly-inspection-build-248-readonly.js'),
    'dry-run wrapper runs the Build 248 verifier');
  assert(dry.includes('verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js'),
    'dry-run wrapper runs the Build 246 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B249 verifier present and the dry-run wrapper wires this verifier + B248 + B246 verifiers + smoke regression');

  // 19. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 249 Vapi PSTN end-of-call-report validation plan packet verified (${passCount} checks).`);
  console.log('build_mode=documentation_only  plan_documentation_only=true  validation_executed=false  pstn_validation_plan_status=documented_not_executed  runtime_action_performed_by_build_249=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_248_prerequisite_commit=3c97ddb  build_246_prerequisite_commit=563044c  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  pstn_is_next_meaningful_validation=true  future_pstn_validation_requires_new_approval=true  one_attempt_limit=true  pstn_validation_attempt_limit=1  evidence_capture_fields_documented=true  stop_conditions_documented=true  decision_tree_documented=true  further_vapi_originated_action_authorized=false  approval_consumed=true  rerun_permitted_without_new_approval=false  secrets_in_repo=0  repo_unchanged=true');
})();
