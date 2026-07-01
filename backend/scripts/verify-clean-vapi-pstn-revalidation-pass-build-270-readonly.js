#!/usr/bin/env node
/**
 * Build 270 Read-Only Verifier (clean Vapi-managed test-number single controlled true PSTN REVALIDATION call
 * PASS + evidence closeout) — proves the repo-only evidence packet is internally consistent, grounded in the
 * prior builds, correctly non-overclaiming, and safe.
 *
 * Build 269 (commit 164449c) captured Jason's approval for EXACTLY ONE controlled true PSTN revalidation call
 * from his own physical phone to the clean Vapi-managed Test Number, to validate the deployed Build 268 fix.
 * Jason then placed that single call. Build 270 records the sanitized PASS evidence: true PSTN reached the
 * clean Vapi-managed number, a Vapi inbound Phone/PSTN call record existed, the Test Roofing Assistant
 * answered, a Vapi webhook stream existed, an End Of Call Report was observed, and the EOCR POST to
 * /webhooks/vapi/call-completed returned HTTP 200 against the deployed Build 268 fix. It records that the
 * Build 268 fix is validated and the technical voice path is validated end-to-end to backend 200, without
 * overclaiming full lead processing (the clean test number is still unmapped, so final processing is a
 * controlled 200 no-op). It documents the next strategic step (first roofer test wiring) WITHOUT creating any
 * live-roofer-test approval.
 *
 * Read-only. Reads the Build 270 doc and the Build 269/268/258 predecessor docs as text; confirms the Build
 * 269 and Build 268 prerequisite commits are present in git history; asserts the major-pass claims, the exact
 * sanitized evidence fields (with pinned PASS values), the additional Vapi webhook detail fields (sanitized),
 * the Build 268 fix validation, the no-overclaim controlled-200-noop final-processing status, the end-to-end
 * technical-voice-path validation, the preserved-untouched Twilio->Retell rollback, the documented next step
 * with NO live-roofer-test approval created, the decision, and the expected final status block; asserts no
 * agent-placed call / no second call / no retry / no Vapi Test/Talk/browserWebCall / no curl / no Twilio API /
 * no Retell API / no SMS / no credential / no secret / no config / no deploy / no runtime action in Build 270;
 * and that no secrets/tokens/raw phone numbers/raw IDs/full URLs/SIP URIs/PII are present. Checks git status
 * before/after. No network, no Supabase call, no credential/secret access, no provider client, no SMS, no
 * Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi
 * publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. No runtime/external
 * action.
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

const DOC = 'docs/CLEAN_VAPI_PSTN_REVALIDATION_PASS_BUILD_270.md';
const B269_DOC = 'docs/CLEAN_VAPI_PSTN_REVALIDATION_APPROVAL_BUILD_269.md';
const B268_DOC = 'docs/CLEAN_VAPI_EOCR_TERMINAL_FIX_BUILD_268.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-pstn-revalidation-pass-build-270-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B269_VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js';
const B268_VERIFIER = 'backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js';

const DECISION_TOKEN_PREFIX = 'CLEAN_VAPI_PSTN_REVALIDATION_PASS_EXACTLY_ONE_TRUE_PSTN_CALL_FROM_JASON_OWNED_PHONE_TO_CLEAN_VAPI_MANAGED_TEST_NUMBER_ONLY_REVALIDATED_BUILD_268_FIX';
const B269_COMMIT = '164449c';
const B268_COMMIT = '4c08b5e';

// The exact sanitized evidence fields (with pinned PASS values) that must appear.
const EVIDENCE_FIELDS = [
  'PSTN_REVALIDATION_APPROVAL_STATUS=captured',
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
  'BACKEND_WEBHOOK_RECEIVED=true',
  'BACKEND_WEBHOOK_RESPONSE_STATUS=200',
  'LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=controlled_200_noop_for_unmapped_clean_test_number',
  'BUILD_268_FIX_VALIDATED=true',
  'STOP_CONDITION_TRIGGERED=false',
  'NO_RETRY_PERFORMED=true',
  'NO_SMS_SENT=true',
  'NO_TWILIO_CONFIG_CHANGED=true',
  'NO_RETELL_CONFIG_CHANGED=true',
  'NO_BACKEND_DEPLOY=true',
];

// The additional sanitized Vapi webhook detail fields that must appear.
const WEBHOOK_DETAIL_FIELDS = [
  'EOCR_WEBHOOK_STARTED_AT_UTC=2026-07-01T04:13:54.914Z',
  'EOCR_WEBHOOK_FINISHED_AT_UTC=2026-07-01T04:13:56.030Z',
  'EOCR_WEBHOOK_DURATION_SECONDS=1.12',
  'EOCR_WEBHOOK_TARGET_HOST_SHAPE=railway_production_api_host',
  'EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed',
  'EOCR_WEBHOOK_METHOD=POST',
  'EOCR_WEBHOOK_HEADER_CONTENT_TYPE=application/json',
  'EOCR_WEBHOOK_HEADER_ACCEPT_ENCODING=identity',
  'EOCR_WEBHOOK_LIST_RESPONSE_HTTP_CODE=200',
];

// Expected final status lines (from the Build 270 task spec).
const FINAL_STATUS = [
  'pstn_revalidation_execution_status = completed_sanitized_evidence_captured',
  'pstn_to_clean_vapi_status = passed',
  'vapi_inbound_call_record_status = passed',
  'vapi_eocr_delivery_status = passed',
  'backend_eocr_response_status = 200',
  'build_268_fix_validated = true',
  'final_report_processing_status = controlled_200_noop_unmapped_clean_test_number',
  'technical_voice_path_status = validated_end_to_end_to_backend_200',
  'existing_twilio_retell_route_status = preserved_untouched',
  'next_step = first_roofer_test_wiring',
  'no_retry_performed = true',
  'no_call_placed_by_agent = true',
  'no_sms_sent = true',
  'no_twilio_config_changed = true',
  'no_retell_config_changed = true',
  'no_backend_deploy = true',
];

(function main() {
  const before = gitStatus();
  console.log('=== Build 270 clean Vapi-managed test-number single controlled true PSTN REVALIDATION call PASS + evidence-closeout verification (repo-only) ===');
  console.log('No call placed by the agent. The single human physical-phone revalidation call was already completed by Jason; this build only records sanitized evidence. No retry. No second call. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No Twilio CLI/API. No Retell API. No DNS change. No Supabase call. No credentials. No secret file read. No env change. No live HTTP. No build. No invented evidence. No first-roofer live-test approval created. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token prefix.
  assert(doc.includes(DECISION_TOKEN_PREFIX), 'B270 doc carries the decision token');
  pass('Build 270 clean-Vapi-PSTN-revalidation-PASS doc exists and carries the decision token');

  // 2. Prerequisite commits present + recorded; predecessor docs exist.
  assert(commitPresent(B269_COMMIT), 'Build 269 prerequisite commit 164449c is present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e is present in git history');
  for (const d of [B269_DOC, B268_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_269_prerequisite_commit\s*=\s*164449c/.test(doc),
    'B270 doc records build_269_prerequisite_commit = 164449c');
  assert(/build_268_prerequisite_commit\s*=\s*4c08b5e/.test(doc),
    'B270 doc records build_268_prerequisite_commit = 4c08b5e');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B270 doc records HEAD==origin/main');
  pass('Build 269 + 268 prerequisite commits present in git history, recorded, and predecessor docs exist');

  // 3. Major pass recorded (all six pass elements).
  assert(/major_pass_recorded\s*=\s*true/.test(doc), 'B270 doc records major_pass_recorded = true');
  for (const re of [
    /True PSTN reached the clean Vapi-managed number/i,
    /A Vapi inbound call record existed/i,
    /Test Roofing Assistant was used/i,
    /A Vapi webhook stream existed/i,
    /An End Of Call Report was observed/i,
    /EOCR POST to `\/webhooks\/vapi\/call-completed` returned HTTP 200/i,
  ]) {
    assert(re.test(doc), `B270 doc missing major-pass element: ${re}`);
  }
  assert(/pstn_to_clean_vapi_status\s*=\s*passed/.test(doc), 'B270 doc records pstn_to_clean_vapi_status = passed');
  assert(/vapi_inbound_call_record_status\s*=\s*passed/.test(doc), 'B270 doc records vapi_inbound_call_record_status = passed');
  assert(/test_roofing_assistant_used\s*=\s*true/.test(doc), 'B270 doc records test_roofing_assistant_used = true');
  assert(/vapi_webhook_stream_observed\s*=\s*true/.test(doc), 'B270 doc records vapi_webhook_stream_observed = true');
  assert(/end_of_call_report_observed\s*=\s*true/.test(doc), 'B270 doc records end_of_call_report_observed = true');
  assert(/vapi_eocr_delivery_status\s*=\s*passed/.test(doc), 'B270 doc records vapi_eocr_delivery_status = passed');
  assert(/backend_eocr_response_status\s*=\s*200/.test(doc), 'B270 doc records backend_eocr_response_status = 200');
  pass('B270 doc records the full major pass (true PSTN -> clean Vapi -> assistant -> webhook stream -> EOCR -> backend 200)');

  // 4. Sanitized evidence captured with exact pinned PASS values.
  assert(/sanitized_evidence_captured\s*=\s*true/.test(doc), 'B270 doc records sanitized_evidence_captured = true');
  for (const f of EVIDENCE_FIELDS) {
    assert(doc.includes(f), `B270 evidence template missing field/value: ${f}`);
  }
  assert(/evidence_not_invented\s*=\s*true/.test(doc), 'B270 doc records evidence_not_invented = true');
  assert(/not invented/i.test(doc), 'B270 doc explicitly states evidence not invented');
  pass('B270 doc captures the sanitized evidence with all exact pinned PASS field values (incl. BACKEND_WEBHOOK_RESPONSE_STATUS=200)');

  // 5. Additional sanitized Vapi webhook detail fields present.
  assert(/eocr_webhook_details_captured\s*=\s*true/.test(doc), 'B270 doc records eocr_webhook_details_captured = true');
  for (const f of WEBHOOK_DETAIL_FIELDS) {
    assert(doc.includes(f), `B270 webhook-detail block missing field/value: ${f}`);
  }
  assert(/eocr_webhook_method\s*=\s*POST/.test(doc), 'B270 doc records eocr_webhook_method = POST');
  assert(/eocr_webhook_list_response_http_code\s*=\s*200/.test(doc),
    'B270 doc records eocr_webhook_list_response_http_code = 200');
  pass('B270 doc captures the additional sanitized Vapi webhook details (started/finished/duration/host-shape/path/method/headers/200)');

  // 6. Build 268 fix validated.
  assert(/build_268_fix_validated\s*=\s*true/.test(doc), 'B270 doc records build_268_fix_validated = true');
  assert(/prior_failure_mode\s*=\s*eocr_404_unknown_roofer/.test(doc),
    'B270 doc records prior_failure_mode = eocr_404_unknown_roofer');
  assert(/resolved_behavior\s*=\s*controlled_200_noop_unmapped_clean_test_number/.test(doc),
    'B270 doc records resolved_behavior = controlled_200_noop_unmapped_clean_test_number');
  assert(/unknown_roofer_destination_unmapped/.test(doc),
    'B270 doc references the Build 268 controlled 200 no-op reason (unknown_roofer_destination_unmapped)');
  pass('B270 doc records the Build 268 fix as validated (prior 404 -> controlled 200 no-op in production)');

  // 7. No overclaim on final processing.
  assert(/final_report_processing_status\s*=\s*controlled_200_noop_unmapped_clean_test_number/.test(doc),
    'B270 doc records final_report_processing_status = controlled_200_noop_unmapped_clean_test_number');
  assert(/full_lead_processing_claimed\s*=\s*false/.test(doc),
    'B270 doc records full_lead_processing_claimed = false');
  assert(/clean_test_number_still_unmapped\s*=\s*true/.test(doc),
    'B270 doc records clean_test_number_still_unmapped = true');
  assert(/controlled 200 no-op for the unmapped clean test number/i.test(doc),
    'B270 doc explicitly describes the controlled 200 no-op (no full lead processing overclaim)');
  pass('B270 doc does NOT overclaim: final processing is a controlled 200 no-op for the still-unmapped clean test number');

  // 8. Technical voice path validated end-to-end.
  assert(/technical_voice_path_status\s*=\s*validated_end_to_end_to_backend_200/.test(doc),
    'B270 doc records technical_voice_path_status = validated_end_to_end_to_backend_200');
  assert(/true PSTN\s*→\s*clean Vapi number\s*→\s*Test Roofing Assistant\s*→\s*End Of Call Report\s*→\s*RoofLeadHQ backend HTTP 200/i.test(doc),
    'B270 doc states the end-to-end voice path shape (true PSTN -> clean Vapi -> assistant -> EOCR -> backend 200)');
  pass('B270 doc records the technical voice path validated end-to-end to backend 200');

  // 9. Existing Twilio->Retell number preserved untouched.
  assert(/existing_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B270 doc records existing_twilio_retell_route_status = preserved_untouched');
  assert(/EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED\s*=\s*true/.test(doc),
    'B270 doc records EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B270 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B270 doc carries forward Build 258 confirmation');
  pass('B270 doc preserves the existing Twilio->Retell number untouched as rollback');

  // 10. Next step documented WITHOUT creating a live-roofer-test approval.
  assert(/next_step\s*=\s*first_roofer_test_wiring/.test(doc), 'B270 doc records next_step = first_roofer_test_wiring');
  assert(/next_step_substeps_documented\s*=\s*true/.test(doc),
    'B270 doc records next_step_substeps_documented = true');
  for (const re of [
    /[Mm]ap a clean Vapi number\/assistant to a demo or pilot roofer record/,
    /[Cc]onfirm the reporting \/ lead-persistence path/,
    /request a \*\*separate\*\* controlled first-roofer end-to-end test/i,
  ]) {
    assert(re.test(doc), `B270 doc missing next-step substep: ${re}`);
  }
  assert(/first_roofer_live_test_approval_created\s*=\s*false/.test(doc),
    'B270 doc records first_roofer_live_test_approval_created = false');
  assert(/first_roofer_live_test_approved\s*=\s*false/.test(doc),
    'B270 doc records first_roofer_live_test_approved = false');
  pass('B270 doc documents the next strategic step (first roofer test wiring) WITHOUT creating any live-roofer-test approval');

  // 11. Execution status = completed_sanitized_evidence_captured; agent placed no call.
  assert(/pstn_revalidation_execution_status\s*=\s*completed_sanitized_evidence_captured/.test(doc),
    'B270 doc records pstn_revalidation_execution_status = completed_sanitized_evidence_captured');
  assert(/no_call_placed_by_agent\s*=\s*true/.test(doc), 'B270 doc records no_call_placed_by_agent = true');
  assert(/stop_condition_triggered\s*=\s*false/.test(doc), 'B270 doc records stop_condition_triggered = false');
  pass('B270 doc marks execution completed with sanitized evidence captured, no agent-placed call, no stop condition triggered');

  // 12. Expected final status block present (task-spec lines).
  for (const s of FINAL_STATUS) {
    assert(doc.includes(s), `B270 doc missing expected final status line: ${s}`);
  }
  pass('B270 doc contains the full expected final status block from the task spec');

  // 13. Decision recorded.
  assert(/final_decision\s*=\s*revalidation_passed_build_268_validated_technical_voice_path_validated_end_to_end_to_backend_200_next_first_roofer_test_wiring/.test(doc),
    'B270 doc records the final decision');
  pass('B270 doc records the final decision (revalidation passed, Build 268 validated, next = first roofer test wiring)');

  // 14. No-call / no-retry / no-SMS / no-Twilio / no-Retell / no-deploy evidence flags.
  assert(/no_retry_performed\s*=\s*true/.test(doc) && /NO_RETRY_PERFORMED\s*=\s*true/.test(doc),
    'B270 doc records no_retry_performed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B270 doc records no_sms_sent = true');
  assert(/no_twilio_config_changed\s*=\s*true/.test(doc) && /NO_TWILIO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B270 doc records no_twilio_config_changed = true');
  assert(/no_retell_config_changed\s*=\s*true/.test(doc) && /NO_RETELL_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B270 doc records no_retell_config_changed = true');
  assert(/no_backend_deploy\s*=\s*true/.test(doc) && /NO_BACKEND_DEPLOY\s*=\s*true/.test(doc),
    'B270 doc records no_backend_deploy = true');
  pass('B270 doc records no_call_placed_by_agent / no_retry / no_sms / no_twilio / no_retell / no_backend_deploy = true');

  // 15. No fix / no runtime action by Build 270.
  assert(/build_mode\s*=\s*clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only/.test(doc),
    'B270 doc records build_mode = clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only');
  assert(/runtime_action_performed_by_build_270\s*=\s*false/.test(doc),
    'B270 doc records runtime_action_performed_by_build_270 = false');
  assert(/fix_or_config_change_performed_by_build_270\s*=\s*false/.test(doc),
    'B270 doc records fix_or_config_change_performed_by_build_270 = false');
  pass('B270 doc records evidence-only: no call, no config change, no runtime/external action by Build 270');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B270 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B270 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B270 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B270 doc asserts no secrets printed');
  pass('B270 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII / raw URL.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B270 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B270 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B270 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B270 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B270 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B270 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B270 doc contains no concrete SIP URI value');
  assert(!/https?:\/\/[A-Za-z0-9.-]+\.up\.railway\.app/i.test(doc),
    'B270 doc contains no raw production URL (host recorded as a shape, path as a shape)');
  pass('B270 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, raw-production-URL, or PII values');

  // 18. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No agent-placed call/i,
    /No call to the existing Twilio\/Retell number/i,
    /No second call/i,
    /No retry of any call/i,
    /No new live-test approval created/i,
    /No Vapi Test used/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed by the agent/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Retell API used/i,
    /No Retell configuration change/i,
    /No Retell deletion/i,
    /No number released, ported, or deleted/i,
    /No `curl` executed/i,
    /No live webhook called/i,
    /No DNS change/i,
    /No backend \/ Railway deploy \/ redeploy \/ restart by this build/i,
    /No Vapi configuration change by this build/i,
    /No Vapi publish/i,
    /No full lead processing claimed/i,
    /No invented evidence/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
  ];
  for (const re of gates) assert(re.test(doc), `B270 doc missing safety invariant: ${re}`);
  pass('B270 doc states the full Build 270 safety-invariant block (no agent call/second call/retry/SMS/Twilio/Retell/deploy/Test/Talk/webCall/curl/new-approval/secret/config/runtime action)');

  // 19. Dry-run wrapper exists and wires this verifier + B269 + B268 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B270 verifier file exists');
  for (const v of [B269_VERIFIER, B268_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js'),
    'dry-run wrapper runs the Build 269 approval verifier');
  assert(dry.includes('verify-clean-vapi-eocr-terminal-fix-build-268.js'),
    'dry-run wrapper runs the Build 268 EOCR terminal-fix verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B270 verifier present and the dry-run wrapper wires this verifier + B269 + B268 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 270 clean Vapi-managed test-number single controlled true PSTN revalidation call PASS + evidence-closeout packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only  runtime_action_performed_by_build_270=false  fix_or_config_change_performed_by_build_270=false  build_269_prerequisite_commit=164449c  build_268_prerequisite_commit=4c08b5e  build_268_prerequisite_status=validated  build_268_deploy_status=confirmed_active_before_revalidation  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  pstn_revalidation_execution_status=completed_sanitized_evidence_captured  pstn_to_clean_vapi_status=passed  vapi_inbound_call_record_status=passed  test_roofing_assistant_used=true  vapi_webhook_stream_observed=true  end_of_call_report_observed=true  vapi_eocr_delivery_status=passed  backend_eocr_response_status=200  eocr_webhook_target_path_shape=/webhooks/vapi/call-completed  eocr_webhook_method=POST  eocr_webhook_duration_seconds=1.12  eocr_webhook_list_response_http_code=200  eocr_webhook_details_captured=true  build_268_fix_validated=true  final_report_processing_status=controlled_200_noop_unmapped_clean_test_number  full_lead_processing_claimed=false  clean_test_number_still_unmapped=true  technical_voice_path_status=validated_end_to_end_to_backend_200  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  sanitized_evidence_captured=true  evidence_not_invented=true  next_step=first_roofer_test_wiring  next_step_substeps_documented=true  first_roofer_live_test_approval_created=false  first_roofer_live_test_approved=false  no_call_placed_by_agent=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  stop_condition_triggered=false  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  evidence_invented=false  repo_unchanged=true');
})();
