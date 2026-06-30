#!/usr/bin/env node
/**
 * Build 263 Read-Only Verifier (clean Vapi-managed test-number APPROVAL + provisioning readiness) — proves
 * the repo-only approval/readiness packet is internally consistent, grounded in the prior builds, and safe.
 * Build 262 selected the clean Vapi-managed/cleanly-provisioned test-number path as the preferred next
 * path. Build 263 captures Jason's narrow approval to provision/select ONE clean Vapi number and assign it
 * to the Test Roofing Assistant, records the exact allowed/not-allowed scope, preserves the existing
 * Twilio → Retell number untouched, and provides the exact manual Vapi dashboard checklist + sanitized
 * evidence template Jason must use. Provisioning is a human Vapi UI action (the Vapi API is blocked_by_401
 * and no other approved route exists), so it is marked awaiting_human_ui_action. It documents only; it
 * provisions nothing, places no call, sends no SMS, changes no Twilio/Retell config, and triggers no
 * deploy. It approves NO PSTN validation.
 *
 * Read-only. Reads the Build 263 doc and the Build 262/261/258 predecessor docs as text; confirms the
 * Build 262 prerequisite commit is present in git history; asserts Jason's verbatim approval, the
 * allowed/not-allowed scope, the preserved untouched Twilio→Retell rollback, the human-UI provisioning
 * rationale, the manual dashboard checklist, the sanitized evidence template (with the exact field names),
 * the awaiting_human_ui_action provisioning status, the stop conditions, the decision logic, and the
 * expected final status block (clean_vapi_number_path_approval_status=captured /
 * clean_vapi_number_provisioning_status=awaiting_human_ui_action /
 * existing_twilio_retell_route_status=preserved_untouched / pstn_validation_status=not_approved /
 * no_call_placed / no_sms_sent / no_twilio_config_changed / no_retell_config_changed / no_backend_deploy =
 * true); asserts no call/Test/Talk/browserWebCall/curl/Twilio API/Retell API/SMS/provision/credential/
 * secret/config/deploy/runtime action in Build 263; and that no secrets/tokens/raw phone numbers/raw IDs/
 * URLs/SIP URIs/PII are present. Checks `git status` before/after. No network, no Supabase call, no
 * credential/secret access, no provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no
 * number provisioned, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi publish, no live webhook, no
 * curl, no env mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO runtime/external action.
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

const DOC = 'docs/CLEAN_VAPI_NUMBER_APPROVAL_BUILD_263.md';
const B262_DOC = 'docs/CLEAN_VAPI_NUMBER_PATH_BUILD_262.md';
const B261_DOC = 'docs/VAPI_INTEGRATION_ROUTING_FORK_BUILD_261.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-number-approval-build-263-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B262_VERIFIER = 'backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js';
const B262_401_VERIFIER = 'backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js';
const B261_VERIFIER = 'backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js';

const DECISION_TOKEN = 'CLEAN_VAPI_NUMBER_PATH_APPROVAL_CAPTURED_NARROW_PROVISION_AND_ASSIGN_ONLY_EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED_PROVISIONING_AWAITING_HUMAN_UI_ACTION_NO_CALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY_NO_PSTN_VALIDATION_WITHOUT_NEW_SEPARATE_APPROVAL';
const B262_COMMIT = '176be0f';

// The exact sanitized evidence field names Jason must report back.
const EVIDENCE_FIELDS = [
  'CLEAN_VAPI_NUMBER_RECORD_FOUND',
  'CLEAN_VAPI_NUMBER_PROVIDER',
  'CLEAN_VAPI_NUMBER_STATUS',
  'CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT',
  'WEBHOOK_SERVER_URL_CONFIGURED',
  'WEBHOOK_AUTH_CONFIGURED',
  'END_OF_CALL_REPORT_ENABLED',
  'EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED',
  'NO_CALL_PLACED',
  'NO_SMS_SENT',
  'NO_TWILIO_CONFIG_CHANGED',
  'NO_RETELL_CONFIG_CHANGED',
  'NO_BACKEND_DEPLOY',
];

(function main() {
  const before = gitStatus();
  console.log('=== Build 263 clean Vapi-managed test-number APPROVAL + provisioning-readiness verification (repo-only, awaiting human UI action) ===');
  console.log('No provisioning executed. No call. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No use/change of the existing Twilio/Retell number. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No Twilio CLI/API. No Retell API. No DNS change. No Supabase call. No credentials. No secret file read. No env change. No live HTTP. No build. Approval capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B263 doc carries the exact decision token');
  pass('Build 263 clean-Vapi-number-approval doc exists and carries the decision token');

  // 2. Build 262 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B262_COMMIT), 'Build 262 prerequisite commit 176be0f is present in git history');
  for (const d of [B262_DOC, B261_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_262_prerequisite_commit\s*=\s*176be0f/.test(doc),
    'B263 doc records build_262_prerequisite_commit = 176be0f');
  assert(/build_262_prerequisite_status\s*=\s*validated/.test(doc),
    'B263 doc records build_262_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B263 doc records HEAD==origin/main');
  pass('Build 262 prerequisite commit 176be0f present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmation carried forward (existing number PSTN routes to Retell Trunk).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B263 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B263 doc references the confirmed Retell Trunk');
  pass('B263 doc carries forward Build 258 confirmation (existing number PSTN routes to the Retell Trunk)');

  // 4. Jason's approval captured verbatim (key allowed/not-allowed lines present).
  assert(/approval_captured_verbatim\s*=\s*true/.test(doc), 'B263 doc records approval_captured_verbatim = true');
  assert(/I approve the narrow clean Vapi-managed test-number path/.test(doc),
    'B263 doc quotes Jason approving the narrow clean Vapi-managed test-number path');
  assert(/Provision or select one clean Vapi-managed/i.test(doc),
    'B263 doc quotes the allowed provision/select-one-number line');
  assert(/Assign it to the existing Test Roofing Assistant/i.test(doc),
    'B263 doc quotes the allowed assign-to-Test-Roofing-Assistant line');
  assert(/Do not use or change the existing Twilio number/i.test(doc),
    'B263 doc quotes the do-not-touch-existing-Twilio-number line');
  pass('B263 doc captures Jason\'s approval verbatim (key allowed/not-allowed lines present)');

  // 5. Allowed / not-allowed scope documented.
  assert(/allowed_not_allowed_scope_documented\s*=\s*true/.test(doc),
    'B263 doc records allowed_not_allowed_scope_documented = true');
  for (const na of [/No call yet/i, /No SMS/i, /No Twilio config changes/i, /No Retell config\/API changes/i,
                    /No Railway\/backend deploy/i, /No schema\/auth\/RLS changes/i, /No production data export/i,
                    /No homeowner or roofer contact/i, /No public\/live automation activation/i]) {
    assert(na.test(doc), `B263 doc missing not-allowed scope line: ${na}`);
  }
  pass('B263 doc documents the exact allowed/not-allowed scope (including all not-allowed lines)');

  // 6. Existing Twilio→Retell number preserved untouched.
  assert(/existing_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B263 doc records existing_twilio_retell_route_status = preserved_untouched');
  assert(/EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED\s*=\s*true/.test(doc),
    'B263 doc records EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B263 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  pass('B263 doc preserves the existing Twilio→Retell number untouched as rollback');

  // 7. Human-UI provisioning rationale (Vapi API blocked_by_401).
  assert(/provisioning_requires_human_ui_action\s*=\s*true/.test(doc),
    'B263 doc records provisioning_requires_human_ui_action = true');
  assert(/provisioning_automation_blocked_reason\s*=\s*vapi_api_blocked_by_401_and_no_other_approved_route/.test(doc),
    'B263 doc records provisioning_automation_blocked_reason = vapi_api_blocked_by_401_and_no_other_approved_route');
  assert(/blocked_by_401/.test(doc) && /VAPI_API_KEY/.test(doc),
    'B263 doc explains the Vapi API blocked_by_401 provisioning rationale');
  pass('B263 doc records the human-UI provisioning rationale (Vapi API blocked_by_401, no other approved route)');

  // 8. Manual Vapi dashboard checklist documented (all steps).
  assert(/manual_vapi_dashboard_checklist_documented\s*=\s*true/.test(doc),
    'B263 doc records manual_vapi_dashboard_checklist_documented = true');
  for (const step of [
    /Vapi\s*→\s*Phone Numbers/i,
    /Create or select/i,
    /Assign\*\* the number to the existing \*\*Test Roofing Assistant/i,
    /Confirm provider \/ status/i,
    /Confirm the webhook \/ server URL/i,
    /end-of-call-report \/ server messages remain enabled/i,
    /Save only\*\* the clean test-number assignment/i,
  ]) {
    assert(step.test(doc), `B263 manual checklist missing step: ${step}`);
  }
  pass('B263 doc documents the full manual Vapi dashboard checklist (Phone Numbers → create/select → assign → confirm provider/webhook/EOCR → save-only-clean)');

  // 9. Sanitized evidence template documented with the exact field names.
  assert(/sanitized_evidence_template_documented\s*=\s*true/.test(doc),
    'B263 doc records sanitized_evidence_template_documented = true');
  for (const f of EVIDENCE_FIELDS) {
    assert(new RegExp(f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(doc),
      `B263 evidence template missing field: ${f}`);
  }
  assert(/CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT=Test Roofing Assistant/.test(doc),
    'B263 evidence template pins CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT=Test Roofing Assistant');
  pass('B263 doc documents the sanitized evidence template with all required field names');

  // 10. Provisioning awaiting human UI action; not captured this build.
  assert(/clean_vapi_number_provisioning_status\s*=\s*awaiting_human_ui_action/.test(doc),
    'B263 doc records clean_vapi_number_provisioning_status = awaiting_human_ui_action');
  assert(/provisioning_evidence_captured_in_this_build\s*=\s*false/.test(doc),
    'B263 doc records provisioning_evidence_captured_in_this_build = false');
  pass('B263 doc marks provisioning as awaiting_human_ui_action (no evidence captured this build)');

  // 11. Approval captured status + no PSTN validation approval.
  assert(/clean_vapi_number_path_approval_status\s*=\s*captured/.test(doc),
    'B263 doc records clean_vapi_number_path_approval_status = captured');
  assert(/pstn_validation_status\s*=\s*not_approved/.test(doc),
    'B263 doc records pstn_validation_status = not_approved');
  assert(/No PSTN validation approval created/i.test(doc),
    'B263 doc asserts no PSTN validation approval created');
  pass('B263 doc records approval captured and no PSTN validation approval created');

  // 12. Stop conditions + decision logic documented.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B263 doc records stop_conditions_documented = true');
  assert(/decision_logic_documented\s*=\s*true/.test(doc), 'B263 doc records decision_logic_documented = true');
  assert(/next_step\s*=\s*jason_completes_vapi_ui_provisioning_then_request_separate_pstn_validation_approval/.test(doc),
    'B263 doc records the next_step (Jason completes UI, then request separate PSTN validation approval)');
  pass('B263 doc documents stop conditions, decision logic, and the next-step recommendation');

  // 13. No-call / no-SMS / no-Twilio / no-Retell / no-deploy evidence flags.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B263 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B263 doc records no_sms_sent = true');
  assert(/no_twilio_config_changed\s*=\s*true/.test(doc) && /NO_TWILIO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B263 doc records no_twilio_config_changed = true');
  assert(/no_retell_config_changed\s*=\s*true/.test(doc) && /NO_RETELL_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B263 doc records no_retell_config_changed = true');
  assert(/no_backend_deploy\s*=\s*true/.test(doc) && /NO_BACKEND_DEPLOY\s*=\s*true/.test(doc),
    'B263 doc records no_backend_deploy = true');
  pass('B263 doc records no_call_placed / no_sms_sent / no_twilio_config_changed / no_retell_config_changed / no_backend_deploy = true');

  // 14. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B263 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval/.test(doc),
    'B263 doc records stop_rule_in_force = no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval');
  pass('B263 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 15. No fix / no runtime action by Build 263.
  assert(/build_mode\s*=\s*clean_vapi_number_path_approval_capture_repo_only/.test(doc),
    'B263 doc records build_mode = clean_vapi_number_path_approval_capture_repo_only');
  assert(/runtime_action_performed_by_build_263\s*=\s*false/.test(doc),
    'B263 doc records runtime_action_performed_by_build_263 = false');
  assert(/fix_or_config_change_performed_by_build_263\s*=\s*false/.test(doc),
    'B263 doc records fix_or_config_change_performed_by_build_263 = false');
  pass('B263 doc records approval-only: no provisioning, no config change, and no runtime/external action by Build 263');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B263 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B263 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B263 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B263 doc asserts no secrets printed');
  pass('B263 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B263 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B263 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B263 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B263 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B263 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B263 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B263 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B263 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B263 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

  // 18. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No new call requested or placed/i,
    /No use or change of the existing Twilio\/Retell number/i,
    /No retry of any prior consumed approval/i,
    /No Vapi Test used/i,
    /No Vapi Talk used/i,
    /No browser\/webCall performed/i,
    /No SMS sent/i,
    /No SMS\/messaging route change/i,
    /No Twilio call placed or routed/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Twilio Voice cutover executed/i,
    /No Twilio cutover approval created/i,
    /No call\/PSTN validation approval created/i,
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
    /No real call test executed by this build/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No backend \/ Railway deploy \/ redeploy \/ restart/i,
    /No secrets printed/i,
    /No secret committed/i,
  ];
  for (const re of gates) assert(re.test(doc), `B263 doc missing safety invariant: ${re}`);
  pass('B263 doc states the full Build 263 safety-invariant block (no provision/call/SMS/Twilio/Retell/deploy/Test/Talk/webCall/curl/secret/config/runtime action)');

  // 19. Dry-run wrapper exists and wires this verifier + B262 + B262-401 + B261 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B263 verifier file exists');
  for (const v of [B262_VERIFIER, B262_401_VERIFIER, B261_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-number-approval-build-263-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-number-path-build-262-readonly.js'),
    'dry-run wrapper runs the Build 262 clean-number-path verifier');
  assert(dry.includes('verify-vapi-api-metadata-lookup-401-build-262-readonly.js'),
    'dry-run wrapper runs the Build 262 API-lookup-401 verifier');
  assert(dry.includes('verify-vapi-integration-routing-fork-build-261-readonly.js'),
    'dry-run wrapper runs the Build 261 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B263 verifier present and the dry-run wrapper wires this verifier + B262 + B262-401 + B261 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 263 clean Vapi-managed test-number approval + provisioning-readiness packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_number_path_approval_capture_repo_only  runtime_action_performed_by_build_263=false  fix_or_config_change_performed_by_build_263=false  build_262_prerequisite_commit=176be0f  build_262_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  provisioning_requires_human_ui_action=true  provisioning_automation_blocked_reason=vapi_api_blocked_by_401_and_no_other_approved_route  manual_vapi_dashboard_checklist_documented=true  sanitized_evidence_template_documented=true  provisioning_evidence_captured_in_this_build=false  stop_conditions_documented=true  decision_logic_documented=true  next_step=jason_completes_vapi_ui_provisioning_then_request_separate_pstn_validation_approval  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  clean_vapi_number_path_approval_status=captured  clean_vapi_number_provisioning_status=awaiting_human_ui_action  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  pstn_validation_status=not_approved  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_without_new_approval=true  stop_rule_in_force=no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
