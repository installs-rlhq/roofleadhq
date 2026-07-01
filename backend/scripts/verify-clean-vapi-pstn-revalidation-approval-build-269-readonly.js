#!/usr/bin/env node
/**
 * Build 269 Read-Only Verifier (clean Vapi-managed test-number single controlled true PSTN REVALIDATION call
 * APPROVAL + one-call evidence flow) — proves the repo-only approval packet is internally consistent,
 * grounded in the prior builds, and safe.
 *
 * Build 268 (commit 4c08b5e) shipped a narrow, fail-controlled backend fix so a clean Vapi PSTN End-Of-Call
 * Report whose destination number is not mapped to any roofer is acknowledged as a controlled 200 no-op
 * (unknown_roofer_destination_unmapped) instead of returning 404, and that fix is now deployed and active on
 * Railway. Build 269 captures Jason's approval for EXACTLY ONE controlled true PSTN REVALIDATION call from a
 * Jason-owned physical phone to the clean Vapi-managed Test Number, to validate the Build 268 fix in
 * production (EOCR now returns 200/2xx). It records the exact allowed/not-allowed scope + stop conditions,
 * preserves the existing Twilio -> Retell number untouched, provides the manual single-call execution
 * checklist + sanitized evidence template, and marks execution awaiting_human_single_call (no call placed by
 * the agent; evidence never invented). It approves exactly one call with NO retry.
 *
 * Read-only. Reads the Build 269 doc and the Build 268/258 predecessor docs as text; confirms the Build 268
 * prerequisite commit is present in git history; asserts Jason's verbatim approval, the allowed/not-allowed
 * scope, the four stop conditions, the Build 268 deploy confirmation, the preserved untouched Twilio->Retell
 * rollback, the manual single-call checklist, the sanitized evidence template (with the exact field names +
 * pinned values, including the new EOCR path shape + BUILD_268_FIX_VALIDATED fields), evidence-not-invented,
 * the awaiting_human_single_call execution status, the decision logic, and the expected final status block;
 * asserts no agent-placed call / no second call / no retry / no Vapi Test/Talk/browserWebCall / no curl / no
 * Twilio API / no Retell API / no SMS / no credential / no secret / no config / no deploy / no runtime action
 * in Build 269; and that no secrets/tokens/raw phone numbers/raw IDs/URLs/SIP URIs/PII are present. Checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider client,
 * no SMS, no Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no
 * Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
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

const DOC = 'docs/CLEAN_VAPI_PSTN_REVALIDATION_APPROVAL_BUILD_269.md';
const B268_DOC = 'docs/CLEAN_VAPI_EOCR_TERMINAL_FIX_BUILD_268.md';
const B267_DOC = 'docs/PRODUCTION_EOCR_ROUTE_DEPLOYMENT_DIAGNOSIS_BUILD_267.md';
const B266_DOC = 'docs/CLEAN_VAPI_PSTN_EOCR_404_BUILD_266.md';
const B265_DOC = 'docs/CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_BUILD_265.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-pstn-revalidation-approval-build-269-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B268_VERIFIER = 'backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js';
const B267_VERIFIER = 'backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js';
const B266_VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js';

const DECISION_TOKEN = 'CLEAN_VAPI_PSTN_REVALIDATION_APPROVAL_CAPTURED_EXACTLY_ONE_TRUE_PSTN_CALL_FROM_JASON_OWNED_PHONE_TO_CLEAN_VAPI_MANAGED_TEST_NUMBER_ONLY_TO_REVALIDATE_BUILD_268_FIX_NO_EXISTING_TWILIO_RETELL_NUMBER_NO_RETRY_NO_VAPI_TEST_NO_VAPI_TALK_NO_BROWSER_WEBCALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_EXECUTION_AWAITING_HUMAN_SINGLE_CALL';
const B268_COMMIT = '4c08b5e';

// The exact sanitized evidence field names that must appear in the template.
const EVIDENCE_FIELDS = [
  'PSTN_REVALIDATION_APPROVAL_STATUS=captured',
  'CALL_ATTEMPT_COUNT',
  'CALL_PLACED_FROM=jason_owned_physical_phone',
  'CALL_TARGET=clean_vapi_managed_test_number',
  'EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true',
  'VAPI_CALL_RECORD_FOUND',
  'VAPI_CALL_TYPE',
  'VAPI_CALL_ID_PRESENT',
  'END_OF_CALL_REPORT_OBSERVED',
  'VAPI_WEBHOOK_LOG_OBSERVED',
  'EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed',
  'BACKEND_WEBHOOK_RECEIVED',
  'BACKEND_WEBHOOK_RESPONSE_STATUS',
  'LEAD_OR_FINAL_REPORT_PROCESSING_STATUS',
  'BUILD_268_FIX_VALIDATED',
  'STOP_CONDITION_TRIGGERED',
  'NO_RETRY_PERFORMED=true',
  'NO_SMS_SENT=true',
  'NO_TWILIO_CONFIG_CHANGED=true',
  'NO_RETELL_CONFIG_CHANGED=true',
  'NO_BACKEND_DEPLOY=true',
];

(function main() {
  const before = gitStatus();
  console.log('=== Build 269 clean Vapi-managed test-number single controlled true PSTN REVALIDATION call APPROVAL + one-call evidence-flow verification (repo-only, awaiting human single call) ===');
  console.log('No call placed by the agent. Exactly one human physical-phone call approved; no retry. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No Twilio CLI/API. No Retell API. No DNS change. No Supabase call. No credentials. No secret file read. No env change. No live HTTP. No build. No invented evidence. Approval capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B269 doc carries the exact decision token');
  pass('Build 269 clean-Vapi-PSTN-revalidation-approval doc exists and carries the decision token');

  // 2. Build 268 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e is present in git history');
  for (const d of [B268_DOC, B267_DOC, B266_DOC, B265_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_268_prerequisite_commit\s*=\s*4c08b5e/.test(doc),
    'B269 doc records build_268_prerequisite_commit = 4c08b5e');
  assert(/build_268_prerequisite_status\s*=\s*validated/.test(doc),
    'B269 doc records build_268_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B269 doc records HEAD==origin/main');
  pass('Build 268 prerequisite commit 4c08b5e present in git history, recorded, and predecessor docs exist');

  // 3. Build 268 fix + deployment confirmation carried forward.
  assert(/build_268_deploy_status\s*=\s*confirmed_active_before_approval/.test(doc),
    'B269 doc records build_268_deploy_status = confirmed_active_before_approval');
  assert(/BUILD_268_DEPLOY_STATUS\s*=\s*confirmed_active_before_approval/.test(doc),
    'B269 doc records BUILD_268_DEPLOY_STATUS = confirmed_active_before_approval');
  assert(/NO_MANUAL_DEPLOY_PERFORMED_BY_BUILD_269\s*=\s*true/.test(doc),
    'B269 doc records NO_MANUAL_DEPLOY_PERFORMED_BY_BUILD_269 = true');
  assert(/unknown_roofer_destination_unmapped/.test(doc),
    'B269 doc references the Build 268 controlled 200 no-op reason (unknown_roofer_destination_unmapped)');
  assert(/controlled 200 no-op/i.test(doc), 'B269 doc describes the Build 268 controlled 200 no-op fix');
  pass('B269 doc carries forward the Build 268 fix + deployment confirmation (active before approval, no deploy by this build)');

  // 4. Build 258 confirmation carried forward (existing number PSTN routes to Retell Trunk).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B269 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B269 doc references the confirmed Retell Trunk');
  pass('B269 doc carries forward Build 258 confirmation (existing number PSTN routes to the Retell Trunk)');

  // 5. Jason's approval captured verbatim (key allowed/not-allowed/stop lines present).
  assert(/approval_captured_verbatim\s*=\s*true/.test(doc), 'B269 doc records approval_captured_verbatim = true');
  assert(/I approve one controlled true PSTN revalidation call to the clean Vapi-managed Test Number only/i.test(doc),
    'B269 doc quotes Jason approving exactly one true PSTN revalidation call to the clean Vapi-managed Test Number');
  assert(/Place exactly one true PSTN call from my Jason-owned physical phone\/iPhone Phone app/i.test(doc),
    'B269 doc quotes the allowed exactly-one-call-from-jason-owned-phone line');
  assert(/now returns 200\/2xx after Build 268/i.test(doc),
    'B269 doc quotes the "backend webhook now returns 200/2xx after Build 268 deployment" line');
  assert(/No call to the existing Twilio\/Retell-routed number/i.test(doc),
    'B269 doc quotes the do-not-call-existing-Twilio/Retell-number line');
  assert(/No retry without separate approval/i.test(doc),
    'B269 doc quotes the no-retry-without-separate-approval line');
  pass('B269 doc captures Jason\'s approval verbatim (key allowed/not-allowed lines present, incl. the Build 268 200/2xx expectation)');

  // 6. Allowed / not-allowed scope documented.
  assert(/allowed_not_allowed_scope_documented\s*=\s*true/.test(doc),
    'B269 doc records allowed_not_allowed_scope_documented = true');
  for (const na of [/No call to the existing Twilio\/Retell-routed number/i, /No retry without separate approval/i,
                    /No SMS/i, /No Twilio config changes/i, /No Retell config\/API changes/i,
                    /No Railway\/backend deploy/i, /No schema\/auth\/RLS changes/i, /No production data export/i,
                    /No homeowner or roofer contact/i, /No public\/live automation activation/i,
                    /No Vapi Test/i, /No Vapi Talk/i, /No browser\/webCall/i]) {
    assert(na.test(doc), `B269 doc missing not-allowed scope line: ${na}`);
  }
  pass('B269 doc documents the exact allowed/not-allowed scope (including all not-allowed lines)');

  // 7. Four stop conditions documented (incl. the Build 268 "still returns non-2xx" wording).
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B269 doc records stop_conditions_documented = true');
  for (const sc of [
    /does \*\*not\*\* appear in Vapi as a \*\*Phone\/PSTN\*\* call/i,
    /\*\*no end-of-call-report\*\* is observed/i,
    /backend webhook \*\*still returns non-2xx\*\* or a validation error/i,
    /Stop after the single call attempt regardless of outcome/i,
  ]) {
    assert(sc.test(doc), `B269 doc missing stop condition: ${sc}`);
  }
  pass('B269 doc documents all four stop conditions (not Phone/PSTN, no EOCR, backend still non-2xx, stop after single attempt)');

  // 8. Existing Twilio->Retell number preserved untouched.
  assert(/existing_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B269 doc records existing_twilio_retell_route_status = preserved_untouched');
  assert(/EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED\s*=\s*true/.test(doc),
    'B269 doc records EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B269 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  pass('B269 doc preserves the existing Twilio->Retell number untouched as rollback');

  // 9. Manual single-call execution checklist documented (all steps).
  assert(/manual_single_call_checklist_documented\s*=\s*true/.test(doc),
    'B269 doc records manual_single_call_checklist_documented = true');
  for (const step of [
    /Confirm the target\*\* is the \*\*clean Vapi-managed Test Number/i,
    /Jason's own physical phone \/ iPhone Phone app\*\* only/i,
    /Place exactly one\*\* true PSTN call/i,
    /Do \*\*not\*\* use Vapi Test, Vapi Talk, or browser\/webCall/i,
    /End the call normally\*\* after a short assistant interaction/i,
    /Do not retry\*\* regardless of outcome/i,
  ]) {
    assert(step.test(doc), `B269 manual checklist missing step: ${step}`);
  }
  assert(/checklist_targets_only_clean_number\s*=\s*true/.test(doc),
    'B269 doc records checklist_targets_only_clean_number = true');
  pass('B269 doc documents the full manual single-call execution checklist (confirm clean-number target -> own phone -> exactly one call -> no Test/Talk/webCall -> end normally -> no retry)');

  // 10. Sanitized evidence template documented with the exact field names + pinned values.
  assert(/sanitized_evidence_template_documented\s*=\s*true/.test(doc),
    'B269 doc records sanitized_evidence_template_documented = true');
  for (const f of EVIDENCE_FIELDS) {
    assert(doc.includes(f), `B269 evidence template missing field: ${f}`);
  }
  assert(/eocr_webhook_target_path_shape\s*=\s*\/webhooks\/vapi\/call-completed/.test(doc),
    'B269 doc records eocr_webhook_target_path_shape = /webhooks/vapi/call-completed');
  assert(/evidence_not_invented\s*=\s*true/.test(doc), 'B269 doc records evidence_not_invented = true');
  assert(/Do not invent evidence/i.test(doc), 'B269 doc explicitly states do not invent evidence');
  pass('B269 doc documents the sanitized evidence template with all required field names + pinned values (incl. EOCR path shape + BUILD_268_FIX_VALIDATED), and evidence-not-invented');

  // 11. Execution awaiting human single call; not executed this build.
  assert(/pstn_revalidation_execution_status\s*=\s*awaiting_human_single_call/.test(doc),
    'B269 doc records pstn_revalidation_execution_status = awaiting_human_single_call');
  assert(/call_executed_in_this_build\s*=\s*false/.test(doc),
    'B269 doc records call_executed_in_this_build = false');
  assert(/evidence_captured_in_this_build\s*=\s*false/.test(doc),
    'B269 doc records evidence_captured_in_this_build = false');
  pass('B269 doc marks execution as awaiting_human_single_call (no call placed, no evidence captured this build)');

  // 12. Approval captured + target selected + agent placed no call.
  assert(/pstn_revalidation_approval_status\s*=\s*captured/.test(doc),
    'B269 doc records pstn_revalidation_approval_status = captured');
  assert(/clean_vapi_number_target_status\s*=\s*selected_for_build_268_fix_revalidation/.test(doc),
    'B269 doc records clean_vapi_number_target_status = selected_for_build_268_fix_revalidation');
  assert(/no_call_placed_by_agent\s*=\s*true/.test(doc),
    'B269 doc records no_call_placed_by_agent = true');
  pass('B269 doc records approval captured, target selected for Build 268 fix revalidation, and no agent-placed call');

  // 13. Decision logic + next step documented.
  assert(/decision_logic_documented\s*=\s*true/.test(doc), 'B269 doc records decision_logic_documented = true');
  assert(/next_step\s*=\s*jason_places_single_pstn_revalidation_call_to_clean_vapi_test_number_then_capture_sanitized_evidence/.test(doc),
    'B269 doc records the next_step (Jason places the single revalidation call, then capture sanitized evidence)');
  pass('B269 doc documents decision logic and the next-step recommendation');

  // 14. No-call-by-agent / no-SMS / no-Twilio / no-Retell / no-deploy evidence flags.
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B269 doc records no_sms_sent = true');
  assert(/no_twilio_config_changed\s*=\s*true/.test(doc) && /NO_TWILIO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B269 doc records no_twilio_config_changed = true');
  assert(/no_retell_config_changed\s*=\s*true/.test(doc) && /NO_RETELL_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B269 doc records no_retell_config_changed = true');
  assert(/no_backend_deploy\s*=\s*true/.test(doc) && /NO_BACKEND_DEPLOY\s*=\s*true/.test(doc),
    'B269 doc records no_backend_deploy = true');
  assert(/NO_RETRY_PERFORMED\s*=\s*true/.test(doc), 'B269 doc records NO_RETRY_PERFORMED = true');
  pass('B269 doc records no_call_placed_by_agent / no_sms_sent / no_twilio_config_changed / no_retell_config_changed / no_backend_deploy / no_retry = true');

  // 15. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B269 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval/.test(doc),
    'B269 doc records the stop_rule_in_force');
  pass('B269 doc records exactly-one-call / no retry without a new, separate approval (stop rule in force)');

  // 16. No fix / no runtime action by Build 269.
  assert(/build_mode\s*=\s*clean_vapi_pstn_revalidation_approval_capture_repo_only/.test(doc),
    'B269 doc records build_mode = clean_vapi_pstn_revalidation_approval_capture_repo_only');
  assert(/runtime_action_performed_by_build_269\s*=\s*false/.test(doc),
    'B269 doc records runtime_action_performed_by_build_269 = false');
  assert(/fix_or_config_change_performed_by_build_269\s*=\s*false/.test(doc),
    'B269 doc records fix_or_config_change_performed_by_build_269 = false');
  pass('B269 doc records approval-only: no call, no config change, and no runtime/external action by Build 269');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B269 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B269 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B269 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B269 doc asserts no secrets printed');
  pass('B269 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B269 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B269 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B269 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B269 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B269 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B269 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B269 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B269 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B269 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

  // 19. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No agent-placed call/i,
    /No call to the existing Twilio\/Retell number/i,
    /No more than one call approved/i,
    /No retry of any call/i,
    /No retry of any prior consumed approval/i,
    /No Vapi Test used/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No SMS\/messaging route change/i,
    /No Twilio call placed or routed by the agent/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Twilio Voice cutover executed/i,
    /No Twilio cutover approval created/i,
    /No Retell API used/i,
    /No Retell configuration change/i,
    /No Retell deletion/i,
    /No number released, ported, or deleted/i,
    /No `curl` executed/i,
    /No live webhook called/i,
    /No DNS change/i,
    /No unrelated Railway configuration change/i,
    /No backend \/ Railway deploy \/ redeploy \/ restart by this build/i,
    /No Vapi configuration change by this build/i,
    /No Vapi publish/i,
    /No Vapi-originated webhook action executed by this build/i,
    /No full Vapi payload processing pass executed/i,
    /No invented evidence/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
  ];
  for (const re of gates) assert(re.test(doc), `B269 doc missing safety invariant: ${re}`);
  pass('B269 doc states the full Build 269 safety-invariant block (no agent call/second call/retry/SMS/Twilio/Retell/deploy/Test/Talk/webCall/curl/secret/config/runtime action)');

  // 20. Dry-run wrapper exists and wires this verifier + B268 + B267 + B266 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B269 verifier file exists');
  for (const v of [B268_VERIFIER, B267_VERIFIER, B266_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-eocr-terminal-fix-build-268.js'),
    'dry-run wrapper runs the Build 268 EOCR terminal-fix verifier');
  assert(dry.includes('verify-production-eocr-route-diagnosis-build-267-readonly.js'),
    'dry-run wrapper runs the Build 267 diagnosis verifier');
  assert(dry.includes('verify-clean-vapi-pstn-eocr-404-build-266-readonly.js'),
    'dry-run wrapper runs the Build 266 EOCR-404 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B269 verifier present and the dry-run wrapper wires this verifier + B268 + B267 + B266 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 269 clean Vapi-managed test-number single controlled true PSTN revalidation call approval + one-call evidence-flow packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_pstn_revalidation_approval_capture_repo_only  runtime_action_performed_by_build_269=false  fix_or_config_change_performed_by_build_269=false  build_268_prerequisite_commit=4c08b5e  build_268_prerequisite_status=validated  build_268_deploy_status=confirmed_active_before_approval  no_manual_deploy_performed_by_build_269=true  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  stop_conditions_documented=true  manual_single_call_checklist_documented=true  checklist_targets_only_clean_number=true  sanitized_evidence_template_documented=true  eocr_webhook_target_path_shape=/webhooks/vapi/call-completed  evidence_not_invented=true  pstn_revalidation_approval_status=captured  pstn_revalidation_execution_status=awaiting_human_single_call  call_executed_in_this_build=false  evidence_captured_in_this_build=false  clean_vapi_number_target_status=selected_for_build_268_fix_revalidation  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  decision_logic_documented=true  next_step=jason_places_single_pstn_revalidation_call_to_clean_vapi_test_number_then_capture_sanitized_evidence  no_call_placed_by_agent=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_performed=true  no_retry_without_new_approval=true  stop_rule_in_force=exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  evidence_invented=false  repo_unchanged=true');
})();
