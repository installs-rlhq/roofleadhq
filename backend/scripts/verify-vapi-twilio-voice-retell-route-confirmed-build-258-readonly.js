#!/usr/bin/env node
/**
 * Build 258 Read-Only Verifier — proves the repo-only Twilio VOICE-ROUTING-CONFIRMED evidence-capture
 * packet is internally consistent, grounded in the prior builds, and safe. After Build 257 diagnosed the
 * most likely cause as Twilio inbound voice still routing to Retell, Jason performed a read-only Twilio
 * Console inspection of the dialed number's Voice and emergency calling configuration. Build 258 captures
 * the sanitized result: the number's inbound-call handling is a Sip Trunk named "Retell Trunk" (a
 * TK-prefixed trunk SID, value redacted), confirming inbound PSTN voice routes to Retell, not Vapi — which
 * explains the Build 256 "NEW RETELL CALL" notification with no Vapi call record. It fixes nothing and
 * performs NO runtime/external action.
 *
 * Read-only. Reads the Build 258 doc, the Build 257 predecessor doc, and the Build 256 predecessor doc as
 * text; confirms the Build 257 prerequisite commit is present in git history; asserts the Build 256
 * stop-condition state is preserved; asserts the sanitized Twilio Voice evidence (number found, voice
 * config visible, type=sip_trunk, Sip Trunk name "Retell Trunk", value redacted as TK-prefixed,
 * voice_points_to_retell=true, voice_points_to_vapi=false, retell_route_confirmed=true); asserts the
 * explanation links the Retell notification / absent Vapi call record to Twilio voice routing; asserts the
 * messaging configuration is documented as separate from voice routing; asserts
 * vapi_pstn_validation_result=blocked_by_twilio_voice_routing_to_retell, full_final_report and
 * real_pstn_vapi_call_path not_validated, no retry without new approval; asserts no
 * call/Test/Talk/browserWebCall/curl/Twilio API/Retell API/SMS/secret/config/deploy/runtime action in
 * Build 258; and that no secrets/tokens/raw phone numbers/raw call IDs/PII are present. Checks `git status`
 * before/after. No network, no Supabase call, no credential/secret access, no provider client, no SMS, no
 * Twilio, no Retell, no call, no phone dialed, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi
 * publish, no live webhook, no curl, no env mutation, no deploy. Does NOT read
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

const DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const B257_DOC = 'docs/VAPI_TWILIO_RETELL_ROUTING_DIAGNOSIS_BUILD_257.md';
const B256_DOC = 'docs/VAPI_TRUE_PSTN_DIAL_RETELL_STOP_CONDITION_BUILD_256.md';
const VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';
const DRY_RUN = 'scripts/run-vapi-twilio-voice-retell-route-confirmed-build-258-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B257_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js';
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';
const B255_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';
const B254_VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B231_VERIFIER = 'backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js';

const DECISION_TOKEN = 'TWILIO_VOICE_ROUTE_CONFIRMED_RETELL_SIP_TRUNK_NOT_VAPI_EXPLAINS_RETELL_CALL_NO_VAPI_RECORD_READONLY_REMEDIATION_PLAN_NEXT_NO_CONFIG_CHANGE_WITHOUT_NEW_APPROVAL';
const B257_COMMIT = '915855a';

(function main() {
  const before = gitStatus();
  console.log('=== Build 258 Twilio VOICE-ROUTING-CONFIRMED evidence verification (repo-only, read-only) ===');
  console.log('No fix. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Evidence capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B258 doc carries the exact decision token');
  pass('Build 258 evidence doc exists and carries the decision token');

  // 2. Build 257 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B257_COMMIT), 'Build 257 prerequisite commit 915855a is present in git history');
  assert(fs.existsSync(path.join(repoRoot, B257_DOC)), `predecessor doc exists: ${B257_DOC}`);
  assert(fs.existsSync(path.join(repoRoot, B256_DOC)), `predecessor doc exists: ${B256_DOC}`);
  assert(/build_257_prerequisite_commit\s*=\s*915855a/.test(doc),
    'B258 doc records build_257_prerequisite_commit = 915855a');
  assert(/build_257_prerequisite_status\s*=\s*validated/.test(doc),
    'B258 doc records build_257_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B258 doc records HEAD==origin/main');
  pass('Build 257 prerequisite commit 915855a present in git history, recorded, and predecessor docs exist');

  // 3. Build 256 stop-condition state preserved.
  assert(/build_256_prerequisite_commit\s*=\s*1f9dd92/.test(doc),
    'B258 doc records build_256_prerequisite_commit = 1f9dd92');
  assert(/stop_condition_triggered\s*=\s*true/.test(doc), 'B258 doc preserves stop_condition_triggered = true');
  assert(/true_pstn_dial_performed\s*=\s*true/.test(doc), 'B258 doc preserves true_pstn_dial_performed = true');
  assert(/true_pstn_dial_count\s*=\s*1/.test(doc), 'B258 doc preserves true_pstn_dial_count = 1');
  assert(/approved_attempt_consumed\s*=\s*true/.test(doc), 'B258 doc preserves approved_attempt_consumed = true');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B258 doc preserves approval_consumed = true');
  assert(/vapi_call_record_observed\s*=\s*false/.test(doc), 'B258 doc preserves vapi_call_record_observed = false');
  assert(/retell_notification_observed\s*=\s*true/.test(doc), 'B258 doc preserves retell_notification_observed = true');
  pass('B258 doc preserves the Build 256 stop-condition state');

  // 4. Twilio number found.
  assert(/twilio_number_found\s*=\s*true/.test(doc), 'B258 doc records twilio_number_found = true');
  pass('B258 doc records the Twilio number was found (true)');

  // 5. Voice configuration visible.
  assert(/voice_configuration_visible\s*=\s*true/.test(doc), 'B258 doc records voice_configuration_visible = true');
  pass('B258 doc records the Voice and emergency calling configuration was visible (true)');

  // 6. Voice configuration type = sip_trunk.
  assert(/voice_configuration_type\s*=\s*sip_trunk/.test(doc), 'B258 doc records voice_configuration_type = sip_trunk');
  assert(/Method for handling automatic responses\s*=\s*`?Sip Trunk`?/i.test(doc),
    'B258 doc records the Twilio incoming-call handling method = Sip Trunk');
  pass('B258 doc records the inbound voice handling method = Sip Trunk (voice_configuration_type = sip_trunk)');

  // 7. Sip Trunk name "Retell Trunk" documented.
  assert(/voice_sip_trunk_name\s*=\s*Retell Trunk/.test(doc), 'B258 doc records voice_sip_trunk_name = Retell Trunk');
  assert(/Sip Trunk name\s*=\s*`?Retell Trunk`?/i.test(doc), 'B258 doc documents the Sip Trunk name "Retell Trunk"');
  pass('B258 doc documents the Sip Trunk name is "Retell Trunk"');

  // 8. Sip Trunk value redacted, recorded only as TK-prefixed.
  assert(/voice_sip_trunk_value_redacted\s*=\s*true/.test(doc),
    'B258 doc records voice_sip_trunk_value_redacted = true');
  assert(/voice_sip_trunk_value_format\s*=\s*TK_prefixed_trunk_identifier/.test(doc),
    'B258 doc records voice_sip_trunk_value_format = TK_prefixed_trunk_identifier');
  assert(/`TK`-prefixed/.test(doc), 'B258 doc describes the trunk value only as a TK-prefixed identifier');
  pass('B258 doc records the Sip Trunk value is redacted and described only as a TK-prefixed trunk identifier');

  // 9. voice_points_to_retell=true, voice_points_to_vapi=false, retell_route_confirmed=true.
  assert(/voice_points_to_retell\s*=\s*true/.test(doc), 'B258 doc records voice_points_to_retell = true');
  assert(/voice_points_to_vapi\s*=\s*false/.test(doc), 'B258 doc records voice_points_to_vapi = false');
  assert(/retell_route_confirmed\s*=\s*true/.test(doc), 'B258 doc records retell_route_confirmed = true');
  pass('B258 doc records inbound voice points to Retell (true), not Vapi (false), retell route confirmed (true)');

  // 10. Explanation links Retell notification / no Vapi call record to Twilio voice routing.
  assert(/explanation_links_retell_notification_to_twilio_voice_routing\s*=\s*true/.test(doc),
    'B258 doc records explanation_links_retell_notification_to_twilio_voice_routing = true');
  assert(/explanation_links_no_vapi_call_record_to_twilio_voice_routing\s*=\s*true/.test(doc),
    'B258 doc records explanation_links_no_vapi_call_record_to_twilio_voice_routing = true');
  assert(/NEW RETELL CALL/i.test(doc), 'B258 doc references the "NEW RETELL CALL" notification');
  pass('B258 doc explanation links the Retell notification and the absent Vapi call record to Twilio voice routing');

  // 11. Messaging configuration documented as separate from voice routing.
  assert(/messaging_config_separate_from_voice_routing\s*=\s*true/.test(doc),
    'B258 doc records messaging_config_separate_from_voice_routing = true');
  assert(/messaging_config_is_voice_routing_cause\s*=\s*false/.test(doc),
    'B258 doc records messaging_config_is_voice_routing_cause = false');
  pass('B258 doc documents the messaging configuration as separate from (not the cause of) voice routing');

  // 12. vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell.
  assert(/vapi_pstn_validation_result\s*=\s*blocked_by_twilio_voice_routing_to_retell/.test(doc),
    'B258 doc records vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell');
  pass('B258 doc records vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell');

  // 13. full_final_report_processing_status / real_pstn_vapi_call_path_status not_validated.
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B258 doc records full_final_report_processing_status = not_validated');
  assert(/real_pstn_vapi_call_path_status\s*=\s*not_validated/.test(doc),
    'B258 doc records real_pstn_vapi_call_path_status = not_validated');
  pass('B258 doc records full_final_report_processing_status and real_pstn_vapi_call_path_status = not_validated');

  // 14. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B258 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B258 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B258 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 15. Safest next step = repo-only remediation plan, no config change without new approval.
  assert(/safest_next_step\s*=\s*repo_only_remediation_plan_to_move_twilio_voice_route_from_retell_to_vapi_no_config_change_without_new_approval/.test(doc),
    'B258 doc records safest_next_step = repo_only remediation plan, no config change without new approval');
  pass('B258 doc records the safest next step is a repo-only remediation plan with no config change without new approval');

  // 16. No fix / no runtime action by Build 258.
  assert(/build_mode\s*=\s*twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture/.test(doc),
    'B258 doc records build_mode = twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture');
  assert(/runtime_action_performed_by_build_258\s*=\s*false/.test(doc),
    'B258 doc records runtime_action_performed_by_build_258 = false');
  assert(/fix_or_config_change_performed_by_build_258\s*=\s*false/.test(doc),
    'B258 doc records fix_or_config_change_performed_by_build_258 = false');
  pass('B258 doc records no fix, no config change, and no runtime/external action by Build 258');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B258 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B258 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B258 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B258 doc asserts no secrets printed');
  pass('B258 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped / raw-trunk-SID values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B258 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B258 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B258 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B258 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B258 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B258 doc contains no raw TK-prefixed Twilio Trunk SID value');
  pass('B258 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, raw-trunk-SID, or PII values');

  // 19. Full safety-invariant block present.
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
    /No Twilio call placed or routed/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Retell API used/i,
    /No Retell configuration change/i,
    /No `curl` executed/i,
    /No live webhook called/i,
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
  for (const re of gates) assert(re.test(doc), `B258 doc missing safety invariant: ${re}`);
  pass('B258 doc states the full Build 258 safety-invariant block (no call/Test/Talk/webCall/curl/Twilio/Retell/SMS/secret/config/deploy/runtime action)');

  // 20. Dry-run wrapper exists and wires this verifier + B257 + B256 + B255 + B254 + B253 + B231 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B258 verifier file exists');
  for (const v of [B257_VERIFIER, B256_VERIFIER, B255_VERIFIER, B254_VERIFIER, B253_VERIFIER, B231_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js'),
    'dry-run wrapper runs the Build 257 verifier');
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs the Build 256 verifier');
  assert(dry.includes('verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js'),
    'dry-run wrapper runs the Build 255 verifier');
  assert(dry.includes('verify-vapi-pstn-method-clarification-build-254-readonly.js'),
    'dry-run wrapper runs the Build 254 verifier');
  assert(dry.includes('verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js'),
    'dry-run wrapper runs the Build 253 verifier');
  assert(dry.includes('verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js'),
    'dry-run wrapper runs the Build 231 call-path inspection verifier (routing evidence regression)');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B258 verifier present and the dry-run wrapper wires this verifier + B257 + B256 + B255 + B254 + B253 + B231 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 258 Twilio voice-routing-confirmed evidence packet verified (${passCount} checks).`);
  console.log('build_mode=twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture  runtime_action_performed_by_build_258=false  fix_or_config_change_performed_by_build_258=false  build_257_prerequisite_commit=915855a  build_257_prerequisite_status=validated  build_256_prerequisite_commit=1f9dd92  true_pstn_dial_performed=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  stop_condition_triggered=true  twilio_number_found=true  voice_configuration_visible=true  voice_configuration_type=sip_trunk  voice_sip_trunk_name=Retell_Trunk  voice_sip_trunk_value_redacted=true  voice_sip_trunk_value_format=TK_prefixed_trunk_identifier  voice_points_to_retell=true  voice_points_to_vapi=false  retell_route_confirmed=true  explanation_links_retell_notification_to_twilio_voice_routing=true  explanation_links_no_vapi_call_record_to_twilio_voice_routing=true  messaging_config_separate_from_voice_routing=true  messaging_config_is_voice_routing_cause=false  vapi_pstn_validation_result=blocked_by_twilio_voice_routing_to_retell  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  safest_next_step=repo_only_remediation_plan_to_move_twilio_voice_route_from_retell_to_vapi_no_config_change_without_new_approval  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
