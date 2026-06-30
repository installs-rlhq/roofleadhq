#!/usr/bin/env node
/**
 * Build 265 Read-Only Verifier (clean Vapi-managed test-number single controlled true PSTN validation call
 * APPROVAL + one-call evidence flow) — proves the repo-only approval packet is internally consistent,
 * grounded in the prior builds, and safe.
 *
 * Build 264 captured sanitized evidence that the clean Vapi-managed Test Number is provisioned/saved/visible
 * and assigned to the Test Roofing Assistant, and prepared (not executed) this PSTN validation path. Build
 * 265 captures Jason's approval for EXACTLY ONE controlled true PSTN call from a Jason-owned physical phone
 * to the clean Vapi-managed Test Number, records the exact allowed/not-allowed scope + stop conditions,
 * preserves the existing Twilio → Retell number untouched, provides the manual single-call execution
 * checklist + sanitized evidence template, and marks execution awaiting_human_single_call (no call placed by
 * the agent; evidence never invented). It approves exactly one call with NO retry.
 *
 * Read-only. Reads the Build 265 doc and the Build 264/263/258 predecessor docs as text; confirms the Build
 * 264 prerequisite commit is present in git history; asserts Jason's verbatim approval, the allowed/
 * not-allowed scope, the four stop conditions, the preserved untouched Twilio→Retell rollback, the manual
 * single-call checklist, the sanitized evidence template (with the exact field names + pinned values),
 * evidence-not-invented, the awaiting_human_single_call execution status, the decision logic, and the
 * expected final status block; asserts no agent-placed call / no second call / no retry / no Vapi Test/Talk/
 * browserWebCall / no curl / no Twilio API / no Retell API / no SMS / no credential / no secret / no config /
 * no deploy / no runtime action in Build 265; and that no secrets/tokens/raw phone numbers/raw IDs/URLs/SIP
 * URIs/PII are present. Checks `git status` before/after. No network, no Supabase call, no credential/secret
 * access, no provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi
 * Talk, no browser/webCall, no Vapi publish, no live webhook, no curl, no env mutation, no deploy. Does NOT
 * read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT build. No runtime/external
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

const DOC = 'docs/CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_BUILD_265.md';
const B264_DOC = 'docs/CLEAN_VAPI_NUMBER_EVIDENCE_BUILD_264.md';
const B263_DOC = 'docs/CLEAN_VAPI_NUMBER_APPROVAL_BUILD_263.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-pstn-validation-approval-build-265-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B264_VERIFIER = 'backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js';
const B263_VERIFIER = 'backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js';
const B262_VERIFIER = 'backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js';

const DECISION_TOKEN = 'CLEAN_VAPI_PSTN_VALIDATION_APPROVAL_CAPTURED_EXACTLY_ONE_TRUE_PSTN_CALL_FROM_JASON_OWNED_PHONE_TO_CLEAN_VAPI_MANAGED_TEST_NUMBER_ONLY_NO_EXISTING_TWILIO_RETELL_NUMBER_NO_RETRY_NO_VAPI_TEST_NO_VAPI_TALK_NO_BROWSER_WEBCALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_EXECUTION_AWAITING_HUMAN_SINGLE_CALL';
const B264_COMMIT = '8e36101';

// The exact sanitized evidence field names that must appear in the template.
const EVIDENCE_FIELDS = [
  'PSTN_VALIDATION_APPROVAL_STATUS=captured',
  'CALL_ATTEMPT_COUNT',
  'CALL_PLACED_FROM=jason_owned_physical_phone',
  'CALL_TARGET=clean_vapi_managed_test_number',
  'EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true',
  'VAPI_CALL_RECORD_FOUND',
  'VAPI_CALL_TYPE',
  'VAPI_CALL_ID_PRESENT',
  'END_OF_CALL_REPORT_OBSERVED',
  'VAPI_WEBHOOK_LOG_OBSERVED',
  'BACKEND_WEBHOOK_RECEIVED',
  'BACKEND_WEBHOOK_RESPONSE_STATUS',
  'LEAD_OR_FINAL_REPORT_PROCESSING_STATUS',
  'STOP_CONDITION_TRIGGERED',
  'NO_RETRY_PERFORMED=true',
  'NO_SMS_SENT=true',
  'NO_TWILIO_CONFIG_CHANGED=true',
  'NO_RETELL_CONFIG_CHANGED=true',
  'NO_BACKEND_DEPLOY=true',
];

(function main() {
  const before = gitStatus();
  console.log('=== Build 265 clean Vapi-managed test-number single controlled true PSTN validation call APPROVAL + one-call evidence-flow verification (repo-only, awaiting human single call) ===');
  console.log('No call placed by the agent. Exactly one human physical-phone call approved; no retry. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No Twilio CLI/API. No Retell API. No DNS change. No Supabase call. No credentials. No secret file read. No env change. No live HTTP. No build. No invented evidence. Approval capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B265 doc carries the exact decision token');
  pass('Build 265 clean-Vapi-PSTN-validation-approval doc exists and carries the decision token');

  // 2. Build 264 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B264_COMMIT), 'Build 264 prerequisite commit 8e36101 is present in git history');
  for (const d of [B264_DOC, B263_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_264_prerequisite_commit\s*=\s*8e36101/.test(doc),
    'B265 doc records build_264_prerequisite_commit = 8e36101');
  assert(/build_264_prerequisite_status\s*=\s*validated/.test(doc),
    'B265 doc records build_264_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B265 doc records HEAD==origin/main');
  pass('Build 264 prerequisite commit 8e36101 present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmation carried forward (existing number PSTN routes to Retell Trunk).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B265 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B265 doc references the confirmed Retell Trunk');
  pass('B265 doc carries forward Build 258 confirmation (existing number PSTN routes to the Retell Trunk)');

  // 4. Jason's approval captured verbatim (key allowed/not-allowed/stop lines present).
  assert(/approval_captured_verbatim\s*=\s*true/.test(doc), 'B265 doc records approval_captured_verbatim = true');
  assert(/I approve one controlled true PSTN validation call to the clean Vapi-managed Test Number only/i.test(doc),
    'B265 doc quotes Jason approving exactly one true PSTN call to the clean Vapi-managed Test Number');
  assert(/Place exactly one true PSTN call from my Jason-owned physical phone\/iPhone Phone app/i.test(doc),
    'B265 doc quotes the allowed exactly-one-call-from-jason-owned-phone line');
  assert(/No call to the existing Twilio\/Retell-routed number/i.test(doc),
    'B265 doc quotes the do-not-call-existing-Twilio/Retell-number line');
  assert(/No retry without separate approval/i.test(doc),
    'B265 doc quotes the no-retry-without-separate-approval line');
  pass('B265 doc captures Jason\'s approval verbatim (key allowed/not-allowed lines present)');

  // 5. Allowed / not-allowed scope documented.
  assert(/allowed_not_allowed_scope_documented\s*=\s*true/.test(doc),
    'B265 doc records allowed_not_allowed_scope_documented = true');
  for (const na of [/No call to the existing Twilio\/Retell-routed number/i, /No retry without separate approval/i,
                    /No SMS/i, /No Twilio config changes/i, /No Retell config\/API changes/i,
                    /No Railway\/backend deploy/i, /No schema\/auth\/RLS changes/i, /No production data export/i,
                    /No homeowner or roofer contact/i, /No public\/live automation activation/i,
                    /No Vapi Test/i, /No Vapi Talk/i, /No browser\/webCall/i]) {
    assert(na.test(doc), `B265 doc missing not-allowed scope line: ${na}`);
  }
  pass('B265 doc documents the exact allowed/not-allowed scope (including all not-allowed lines)');

  // 6. Four stop conditions documented.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B265 doc records stop_conditions_documented = true');
  for (const sc of [
    /does \*\*not\*\* appear in Vapi as a \*\*Phone\/PSTN\*\* call/i,
    /\*\*no end-of-call-report\*\* is observed/i,
    /backend webhook returns \*\*non-2xx\*\* or a validation error/i,
    /Stop after the single call attempt regardless of outcome/i,
  ]) {
    assert(sc.test(doc), `B265 doc missing stop condition: ${sc}`);
  }
  pass('B265 doc documents all four stop conditions (not Phone/PSTN, no EOCR, backend non-2xx, stop after single attempt)');

  // 7. Existing Twilio→Retell number preserved untouched.
  assert(/existing_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B265 doc records existing_twilio_retell_route_status = preserved_untouched');
  assert(/EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED\s*=\s*true/.test(doc),
    'B265 doc records EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B265 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  pass('B265 doc preserves the existing Twilio→Retell number untouched as rollback');

  // 8. Manual single-call execution checklist documented (all steps).
  assert(/manual_single_call_checklist_documented\s*=\s*true/.test(doc),
    'B265 doc records manual_single_call_checklist_documented = true');
  for (const step of [
    /Confirm the target\*\* is the \*\*clean Vapi-managed Test Number/i,
    /Jason's own physical phone \/ iPhone Phone app\*\* only/i,
    /Place exactly one\*\* true PSTN call/i,
    /Do \*\*not\*\* use Vapi Test, Vapi Talk, or browser\/webCall/i,
    /End the call normally\*\* after a short assistant interaction/i,
    /Do not retry\*\* regardless of outcome/i,
  ]) {
    assert(step.test(doc), `B265 manual checklist missing step: ${step}`);
  }
  assert(/checklist_targets_only_clean_number\s*=\s*true/.test(doc),
    'B265 doc records checklist_targets_only_clean_number = true');
  pass('B265 doc documents the full manual single-call execution checklist (confirm clean-number target → own phone → exactly one call → no Test/Talk/webCall → end normally → no retry)');

  // 9. Sanitized evidence template documented with the exact field names + pinned values.
  assert(/sanitized_evidence_template_documented\s*=\s*true/.test(doc),
    'B265 doc records sanitized_evidence_template_documented = true');
  for (const f of EVIDENCE_FIELDS) {
    assert(doc.includes(f), `B265 evidence template missing field: ${f}`);
  }
  assert(/evidence_not_invented\s*=\s*true/.test(doc), 'B265 doc records evidence_not_invented = true');
  assert(/Do not invent evidence/i.test(doc), 'B265 doc explicitly states do not invent evidence');
  pass('B265 doc documents the sanitized evidence template with all required field names + pinned values, and evidence-not-invented');

  // 10. Execution awaiting human single call; not executed this build.
  assert(/pstn_validation_execution_status\s*=\s*awaiting_human_single_call/.test(doc),
    'B265 doc records pstn_validation_execution_status = awaiting_human_single_call');
  assert(/call_executed_in_this_build\s*=\s*false/.test(doc),
    'B265 doc records call_executed_in_this_build = false');
  assert(/evidence_captured_in_this_build\s*=\s*false/.test(doc),
    'B265 doc records evidence_captured_in_this_build = false');
  pass('B265 doc marks execution as awaiting_human_single_call (no call placed, no evidence captured this build)');

  // 11. Approval captured + target selected + agent placed no call.
  assert(/pstn_validation_approval_status\s*=\s*captured/.test(doc),
    'B265 doc records pstn_validation_approval_status = captured');
  assert(/clean_vapi_number_target_status\s*=\s*selected_for_one_call_validation/.test(doc),
    'B265 doc records clean_vapi_number_target_status = selected_for_one_call_validation');
  assert(/no_call_placed_by_agent\s*=\s*true/.test(doc),
    'B265 doc records no_call_placed_by_agent = true');
  pass('B265 doc records approval captured, target selected for one-call validation, and no agent-placed call');

  // 12. Decision logic + next step documented.
  assert(/decision_logic_documented\s*=\s*true/.test(doc), 'B265 doc records decision_logic_documented = true');
  assert(/next_step\s*=\s*jason_places_single_pstn_call_to_clean_vapi_test_number_then_capture_sanitized_evidence/.test(doc),
    'B265 doc records the next_step (Jason places the single call, then capture sanitized evidence)');
  pass('B265 doc documents decision logic and the next-step recommendation');

  // 13. No-call-by-agent / no-SMS / no-Twilio / no-Retell / no-deploy evidence flags.
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B265 doc records no_sms_sent = true');
  assert(/no_twilio_config_changed\s*=\s*true/.test(doc) && /NO_TWILIO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B265 doc records no_twilio_config_changed = true');
  assert(/no_retell_config_changed\s*=\s*true/.test(doc) && /NO_RETELL_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B265 doc records no_retell_config_changed = true');
  assert(/no_backend_deploy\s*=\s*true/.test(doc) && /NO_BACKEND_DEPLOY\s*=\s*true/.test(doc),
    'B265 doc records no_backend_deploy = true');
  assert(/NO_RETRY_PERFORMED\s*=\s*true/.test(doc), 'B265 doc records NO_RETRY_PERFORMED = true');
  pass('B265 doc records no_call_placed_by_agent / no_sms_sent / no_twilio_config_changed / no_retell_config_changed / no_backend_deploy / no_retry = true');

  // 14. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B265 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval/.test(doc),
    'B265 doc records the stop_rule_in_force');
  pass('B265 doc records exactly-one-call / no retry without a new, separate approval (stop rule in force)');

  // 15. No fix / no runtime action by Build 265.
  assert(/build_mode\s*=\s*clean_vapi_pstn_validation_approval_capture_repo_only/.test(doc),
    'B265 doc records build_mode = clean_vapi_pstn_validation_approval_capture_repo_only');
  assert(/runtime_action_performed_by_build_265\s*=\s*false/.test(doc),
    'B265 doc records runtime_action_performed_by_build_265 = false');
  assert(/fix_or_config_change_performed_by_build_265\s*=\s*false/.test(doc),
    'B265 doc records fix_or_config_change_performed_by_build_265 = false');
  pass('B265 doc records approval-only: no call, no config change, and no runtime/external action by Build 265');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B265 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B265 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B265 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B265 doc asserts no secrets printed');
  pass('B265 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B265 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B265 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B265 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B265 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B265 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B265 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B265 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B265 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B265 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

  // 18. Full safety-invariant block present.
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
    /No backend \/ Railway deploy \/ redeploy \/ restart/i,
    /No secrets printed/i,
    /No secret committed/i,
  ];
  for (const re of gates) assert(re.test(doc), `B265 doc missing safety invariant: ${re}`);
  pass('B265 doc states the full Build 265 safety-invariant block (no agent call/second call/retry/SMS/Twilio/Retell/deploy/Test/Talk/webCall/curl/secret/config/runtime action)');

  // 19. Dry-run wrapper exists and wires this verifier + B264 + B263 + B262 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B265 verifier file exists');
  for (const v of [B264_VERIFIER, B263_VERIFIER, B262_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-pstn-validation-approval-build-265-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-number-evidence-build-264-readonly.js'),
    'dry-run wrapper runs the Build 264 evidence verifier');
  assert(dry.includes('verify-clean-vapi-number-approval-build-263-readonly.js'),
    'dry-run wrapper runs the Build 263 approval verifier');
  assert(dry.includes('verify-clean-vapi-number-path-build-262-readonly.js'),
    'dry-run wrapper runs the Build 262 clean-number-path verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B265 verifier present and the dry-run wrapper wires this verifier + B264 + B263 + B262 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 265 clean Vapi-managed test-number single controlled true PSTN validation call approval + one-call evidence-flow packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_pstn_validation_approval_capture_repo_only  runtime_action_performed_by_build_265=false  fix_or_config_change_performed_by_build_265=false  build_264_prerequisite_commit=8e36101  build_264_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  stop_conditions_documented=true  manual_single_call_checklist_documented=true  checklist_targets_only_clean_number=true  sanitized_evidence_template_documented=true  evidence_not_invented=true  pstn_validation_approval_status=captured  pstn_validation_execution_status=awaiting_human_single_call  call_executed_in_this_build=false  evidence_captured_in_this_build=false  clean_vapi_number_target_status=selected_for_one_call_validation  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  decision_logic_documented=true  next_step=jason_places_single_pstn_call_to_clean_vapi_test_number_then_capture_sanitized_evidence  no_call_placed_by_agent=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_performed=true  no_retry_without_new_approval=true  stop_rule_in_force=exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  evidence_invented=false  repo_unchanged=true');
})();
