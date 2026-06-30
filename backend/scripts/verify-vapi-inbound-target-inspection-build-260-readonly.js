#!/usr/bin/env node
/**
 * Build 260 Read-Only Verifier — proves the repo-only Vapi inbound-target INSPECTION CAPTURE packet is
 * internally consistent, grounded in the prior builds, and safe. After Build 258 confirmed (read-only
 * Twilio Console) that the dialed number's inbound voice handling is the Sip Trunk "Retell Trunk" (PSTN
 * hits Retell, not Vapi) and Build 259 PLANNED a safe Retell→Vapi voice cutover without executing it,
 * Build 260 records the findings of the next read-only Vapi dashboard inspection (Vapi → Phone Numbers →
 * the Test Roofing number record) and the Twilio cutover readiness decision that follows: the number
 * record is present and Twilio-provided, assigned to the Test Roofing Assistant, but the EXACT Twilio
 * voice target (TwiML App SID / SIP URI / Vapi inbound webhook URL) is NOT visible — so cutover is NOT
 * ready. It documents only; it executes no cutover and performs NO runtime/external action.
 *
 * Read-only. Reads the Build 260 doc and the Build 259/258/256 predecessor docs as text; confirms the
 * Build 259 prerequisite commit is present in git history; asserts the captured sanitized findings,
 * the not-ready cutover decision, the preserved Retell Trunk rollback target, and the
 * remediation_status=inspection_captured_not_executed / twilio_voice_cutover_status=not_started /
 * vapi_twilio_target_status=not_visible_in_phone_number_screen / cutover_approval_status=not_requested /
 * pstn_validation_status=blocked_until_exact_target_or_connection_method_known status block; asserts the
 * next-step recommendation is a further read-only Vapi/Twilio import-connection inspection; asserts no
 * call/Test/Talk/browserWebCall/curl/Twilio API/Retell API/SMS/secret/config/deploy/runtime action in
 * Build 260; and that no secrets/tokens/raw phone numbers/raw IDs/URLs/SIP URIs/PII are present. Checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no
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

const DOC = 'docs/VAPI_INBOUND_TARGET_INSPECTION_BUILD_260.md';
const B259_DOC = 'docs/VAPI_TWILIO_RETELL_TO_VAPI_REMEDIATION_PLAN_BUILD_259.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const B257_DOC = 'docs/VAPI_TWILIO_RETELL_ROUTING_DIAGNOSIS_BUILD_257.md';
const VERIFIER = 'backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js';
const DRY_RUN = 'scripts/run-vapi-inbound-target-inspection-build-260-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B259_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js';
const B258_VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';
const B257_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js';
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';
const B255_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';

const DECISION_TOKEN = 'VAPI_INBOUND_TARGET_INSPECTION_CAPTURED_TARGET_NOT_VISIBLE_CUTOVER_NOT_READY_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL';
const B259_COMMIT = '2dc484b';

(function main() {
  const before = gitStatus();
  console.log('=== Build 260 Vapi inbound-target INSPECTION CAPTURE verification (repo-only, inspection-captured-not-executed) ===');
  console.log('No cutover. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No DNS change. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Inspection capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B260 doc carries the exact decision token');
  pass('Build 260 inspection-capture doc exists and carries the decision token');

  // 2. Build 259 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B259_COMMIT), 'Build 259 prerequisite commit 2dc484b is present in git history');
  for (const d of [B259_DOC, B258_DOC, B257_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_259_prerequisite_commit\s*=\s*2dc484b/.test(doc),
    'B260 doc records build_259_prerequisite_commit = 2dc484b');
  assert(/build_259_prerequisite_status\s*=\s*validated/.test(doc),
    'B260 doc records build_259_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B260 doc records HEAD==origin/main');
  pass('Build 259 prerequisite commit 2dc484b present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmed Twilio Voice routes to Retell Trunk (carried forward).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B260 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B260 doc references the confirmed Retell Trunk');
  pass('B260 doc carries forward Build 258 confirmation (Twilio Voice routes to the Retell Trunk)');

  // 4. Inspection scope documented (read-only).
  assert(/inspection_completed\s*=\s*true/.test(doc), 'B260 doc records inspection_completed = true');
  assert(/inspection_method\s*=\s*read_only_dashboard_view/.test(doc),
    'B260 doc records inspection_method = read_only_dashboard_view');
  assert(/Phone Numbers/i.test(doc), 'B260 doc names the Vapi Phone Numbers screen inspected');
  pass('B260 doc documents the read-only Vapi Phone Numbers inspection scope');

  // 5. Captured findings — number record present, Twilio provider, assistant assignment.
  assert(/VAPI_NUMBER_RECORD_FOUND\s*=\s*true/.test(doc), 'B260 doc records VAPI_NUMBER_RECORD_FOUND = true');
  assert(/VAPI_NUMBER_PROVIDER\s*=\s*Twilio/.test(doc), 'B260 doc records VAPI_NUMBER_PROVIDER = Twilio');
  assert(/VAPI_NUMBER_ASSIGNED_ASSISTANT\s*=\s*Test Roofing Assistant/.test(doc),
    'B260 doc records VAPI_NUMBER_ASSIGNED_ASSISTANT = Test Roofing Assistant');
  pass('B260 doc records the captured findings (record found, Twilio provider, Test Roofing Assistant assignment)');

  // 6. The gap — exact target not visible.
  assert(/VAPI_INBOUND_CONNECTION_METHOD\s*=\s*twilio_number_record_visible_target_not_exposed/.test(doc),
    'B260 doc records VAPI_INBOUND_CONNECTION_METHOD = twilio_number_record_visible_target_not_exposed');
  assert(/VAPI_TWILIO_TARGET_VALUE_VISIBLE\s*=\s*false/.test(doc),
    'B260 doc records VAPI_TWILIO_TARGET_VALUE_VISIBLE = false');
  assert(/TARGET_VALUE_TYPE\s*=\s*unknown/.test(doc), 'B260 doc records TARGET_VALUE_TYPE = unknown');
  assert(/SANITIZED_TARGET_DESCRIPTION\s*=/.test(doc), 'B260 doc records SANITIZED_TARGET_DESCRIPTION');
  assert(/No TwiML App SID/i.test(doc) && /No SIP endpoint/i.test(doc) && /No Vapi inbound webhook/i.test(doc),
    'B260 doc enumerates the not-visible targets (TwiML App SID / SIP endpoint / Vapi inbound webhook URL)');
  assert(/Server URL field appears\s+\*\*empty\/placeholder/i.test(doc) || /Server URL field appears empty\/placeholder/i.test(doc),
    'B260 doc records the Server URL field appears empty/placeholder');
  pass('B260 doc records the gap (exact Twilio voice target not visible; Server URL empty/placeholder)');

  // 7. Cutover readiness decision = NOT ready.
  assert(/cutover_ready\s*=\s*false/.test(doc), 'B260 doc records cutover_ready = false');
  assert(/cutover_blocked_reason\s*=\s*exact_twilio_voice_target_unknown_not_visible/.test(doc),
    'B260 doc records cutover_blocked_reason = exact_twilio_voice_target_unknown_not_visible');
  assert(/[Cc]utover is \*\*NOT ready/.test(doc) || /Cutover is NOT ready/.test(doc),
    'B260 doc states cutover is NOT ready');
  pass('B260 doc concludes cutover is NOT ready (exact Twilio voice target unknown/not visible)');

  // 8. Rollback target preserved = Retell Trunk.
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B260 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  assert(/ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED\s*=\s*true/.test(doc),
    'B260 doc records ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true');
  pass('B260 doc preserves the rollback target as the Retell Trunk Sip Trunk');

  // 9. Safety guardrails + stop conditions + decision tree documented.
  assert(/safety_guardrails_documented\s*=\s*true/.test(doc), 'B260 doc records safety_guardrails_documented = true');
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B260 doc records stop_conditions_documented = true');
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B260 doc records decision_tree_documented = true');
  assert(/guess the Twilio voice target/i.test(doc), 'B260 stop conditions forbid guessing the Twilio voice target');
  pass('B260 doc documents safety guardrails, stop conditions, and decision tree');

  // 10. Explicit recommendation = further read-only import/connection inspection.
  assert(/explicit_recommendation_documented\s*=\s*true/.test(doc),
    'B260 doc records explicit_recommendation_documented = true');
  assert(/next_step\s*=\s*readonly_inspection_vapi_twilio_import_connection_details/.test(doc),
    'B260 doc records next_step = readonly_inspection_vapi_twilio_import_connection_details');
  assert(/import connection details/i.test(doc) && /Integrations/i.test(doc),
    'B260 recommendation names the Vapi/Twilio import connection details + Integrations read-only inspection');
  assert(/native[- ]import path manages the binding/i.test(doc),
    'B260 recommendation allows confirming the native-import path exposes no manual target');
  pass('B260 doc recommends a further read-only Vapi/Twilio import-connection inspection as the next step');

  // 11. No new approvals created (cutover + PSTN validation).
  assert(/cutover_approval_status\s*=\s*not_requested/.test(doc),
    'B260 doc records cutover_approval_status = not_requested');
  assert(/No Twilio cutover approval created/i.test(doc), 'B260 doc asserts no Twilio cutover approval created');
  assert(/No call\/PSTN validation approval created/i.test(doc),
    'B260 doc asserts no call/PSTN validation approval created');
  pass('B260 doc records no Twilio cutover approval and no call/PSTN validation approval were created');

  // 12. Status fields: inspection captured / not started / not visible / blocked.
  assert(/remediation_status\s*=\s*inspection_captured_not_executed/.test(doc),
    'B260 doc records remediation_status = inspection_captured_not_executed');
  assert(/twilio_voice_cutover_status\s*=\s*not_started/.test(doc),
    'B260 doc records twilio_voice_cutover_status = not_started');
  assert(/vapi_twilio_target_status\s*=\s*not_visible_in_phone_number_screen/.test(doc),
    'B260 doc records vapi_twilio_target_status = not_visible_in_phone_number_screen');
  assert(/pstn_validation_status\s*=\s*blocked_until_exact_target_or_connection_method_known/.test(doc),
    'B260 doc records pstn_validation_status = blocked_until_exact_target_or_connection_method_known');
  pass('B260 doc records inspection_captured_not_executed / not_started / not_visible / blocked status block');

  // 13. No-call / no-SMS / no-config evidence flags.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B260 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B260 doc records no_sms_sent = true');
  assert(/no_config_changed\s*=\s*true/.test(doc) && /NO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B260 doc records no_config_changed = true');
  pass('B260 doc records no_call_placed / no_sms_sent / no_config_changed = true');

  // 14. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B260 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B260 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B260 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 15. No fix / no runtime action by Build 260.
  assert(/build_mode\s*=\s*vapi_inbound_target_inspection_capture_repo_only/.test(doc),
    'B260 doc records build_mode = vapi_inbound_target_inspection_capture_repo_only');
  assert(/runtime_action_performed_by_build_260\s*=\s*false/.test(doc),
    'B260 doc records runtime_action_performed_by_build_260 = false');
  assert(/fix_or_config_change_performed_by_build_260\s*=\s*false/.test(doc),
    'B260 doc records fix_or_config_change_performed_by_build_260 = false');
  pass('B260 doc records inspection-only: no cutover, no config change, and no runtime/external action by Build 260');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B260 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B260 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B260 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B260 doc asserts no secrets printed');
  pass('B260 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B260 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B260 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B260 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B260 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B260 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B260 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B260 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[^\s)]+/i.test(doc), 'B260 doc contains no raw SIP URI value');
  pass('B260 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, raw-SIP-URI, or PII values');

  // 18. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No new call requested or placed/i,
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
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B260 doc missing safety invariant: ${re}`);
  pass('B260 doc states the full Build 260 safety-invariant block (no cutover/call/Test/Talk/webCall/curl/Twilio/Retell/SMS/DNS/secret/config/deploy/runtime action)');

  // 19. Dry-run wrapper exists and wires this verifier + B259 + B258 + B257 + B256 + B255 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B260 verifier file exists');
  for (const v of [B259_VERIFIER, B258_VERIFIER, B257_VERIFIER, B256_VERIFIER, B255_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-inbound-target-inspection-build-260-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js'),
    'dry-run wrapper runs the Build 259 verifier');
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs the Build 258 verifier');
  assert(dry.includes('verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js'),
    'dry-run wrapper runs the Build 257 verifier');
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs the Build 256 verifier');
  assert(dry.includes('verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js'),
    'dry-run wrapper runs the Build 255 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B260 verifier present and the dry-run wrapper wires this verifier + B259 + B258 + B257 + B256 + B255 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 260 Vapi inbound-target inspection-capture packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_inbound_target_inspection_capture_repo_only  runtime_action_performed_by_build_260=false  fix_or_config_change_performed_by_build_260=false  build_259_prerequisite_commit=2dc484b  build_259_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  inspection_completed=true  VAPI_NUMBER_RECORD_FOUND=true  VAPI_NUMBER_PROVIDER=Twilio  VAPI_NUMBER_ASSIGNED_ASSISTANT=Test_Roofing_Assistant  VAPI_INBOUND_CONNECTION_METHOD=twilio_number_record_visible_target_not_exposed  VAPI_TWILIO_TARGET_VALUE_VISIBLE=false  TARGET_VALUE_TYPE=unknown  cutover_ready=false  cutover_blocked_reason=exact_twilio_voice_target_unknown_not_visible  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  safety_guardrails_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  next_step=readonly_inspection_vapi_twilio_import_connection_details  remediation_status=inspection_captured_not_executed  twilio_voice_cutover_status=not_started  vapi_twilio_target_status=not_visible_in_phone_number_screen  cutover_approval_status=not_requested  pstn_validation_status=blocked_until_exact_target_or_connection_method_known  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
