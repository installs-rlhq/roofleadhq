#!/usr/bin/env node
/**
 * Build 259 Read-Only Verifier — proves the repo-only Twilio-voice-route Retell→Vapi REMEDIATION PLAN
 * packet is internally consistent, grounded in the prior builds, and safe. After Build 258 confirmed (via
 * read-only Twilio Console inspection) that the dialed number's inbound voice handling is a Sip Trunk named
 * "Retell Trunk" (so PSTN routes to Retell, not Vapi), Build 259 documents a PLAN — current state, target
 * state, required read-only confirmations, proposed change plan, rollback path, safety guardrails,
 * post-cutover validation plan, stop conditions, decision tree, and an explicit recommendation — for safely
 * moving that voice route to Vapi. It PLANS ONLY; it executes no cutover and performs NO runtime/external
 * action.
 *
 * Read-only. Reads the Build 259 doc and the Build 258/257/256 predecessor docs as text; confirms the Build
 * 258 prerequisite commit is present in git history; asserts the Build 258 confirmation (Twilio voice routes
 * to the Retell Trunk) is recorded; asserts all nine plan sections are documented (current routing, target
 * routing, read-only confirmations, change plan, rollback plan, safety guardrails, validation plan, stop
 * conditions, decision tree, explicit recommendation); asserts remediation_status=planned_not_executed,
 * twilio_voice_cutover_status=not_started, vapi_pstn_validation_status=blocked_until_cutover,
 * full_final_report_processing_status=not_validated, no retry without new approval; asserts no
 * call/Test/Talk/browserWebCall/curl/Twilio API/Retell API/SMS/secret/config/deploy/runtime action in Build
 * 259; and that no secrets/tokens/raw phone numbers/raw call IDs/PII are present. Checks `git status`
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

const DOC = 'docs/VAPI_TWILIO_RETELL_TO_VAPI_REMEDIATION_PLAN_BUILD_259.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const B257_DOC = 'docs/VAPI_TWILIO_RETELL_ROUTING_DIAGNOSIS_BUILD_257.md';
const B256_DOC = 'docs/VAPI_TRUE_PSTN_DIAL_RETELL_STOP_CONDITION_BUILD_256.md';
const VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js';
const DRY_RUN = 'scripts/run-vapi-twilio-retell-to-vapi-remediation-plan-build-259-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B258_VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';
const B257_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js';
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';
const B255_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js';
const B254_VERIFIER = 'backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js';
const B253_VERIFIER = 'backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js';
const B231_VERIFIER = 'backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js';

const DECISION_TOKEN = 'TWILIO_VOICE_ROUTE_RETELL_TO_VAPI_REMEDIATION_PLANNED_NOT_EXECUTED_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL';
const B258_COMMIT = 'c8a8adb';

(function main() {
  const before = gitStatus();
  console.log('=== Build 259 Twilio voice-route Retell→Vapi REMEDIATION PLAN verification (repo-only, planned-not-executed) ===');
  console.log('No cutover. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No DNS change. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Plan only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B259 doc carries the exact decision token');
  pass('Build 259 remediation-plan doc exists and carries the decision token');

  // 2. Build 258 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B258_COMMIT), 'Build 258 prerequisite commit c8a8adb is present in git history');
  for (const d of [B258_DOC, B257_DOC, B256_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_258_prerequisite_commit\s*=\s*c8a8adb/.test(doc),
    'B259 doc records build_258_prerequisite_commit = c8a8adb');
  assert(/build_258_prerequisite_status\s*=\s*validated/.test(doc),
    'B259 doc records build_258_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B259 doc records HEAD==origin/main');
  pass('Build 258 prerequisite commit c8a8adb present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmed Twilio Voice routes to Retell Trunk.
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B259 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B259 doc references the confirmed Retell Trunk');
  pass('B259 doc records Build 258 confirmed Twilio Voice routes to the Retell Trunk');

  // 4. Current routing documented.
  assert(/current_routing_confirmed\s*=\s*true/.test(doc), 'B259 doc records current_routing_confirmed = true');
  assert(/current_voice_route\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B259 doc records current_voice_route = twilio_sip_trunk_retell_trunk');
  pass('B259 doc documents the current confirmed routing (Twilio Sip Trunk = Retell Trunk)');

  // 5. Target routing documented.
  assert(/target_routing_documented\s*=\s*true/.test(doc), 'B259 doc records target_routing_documented = true');
  assert(/target_voice_route\s*=\s*inbound_pstn_to_vapi_test_roofing_assistant/.test(doc),
    'B259 doc records target_voice_route = inbound_pstn_to_vapi_test_roofing_assistant');
  pass('B259 doc documents the target routing (inbound PSTN to Vapi / Test Roofing Assistant)');

  // 6. Required read-only confirmations documented.
  assert(/readonly_confirmations_documented\s*=\s*true/.test(doc),
    'B259 doc records readonly_confirmations_documented = true');
  for (const re of [
    /readonly_confirm_twilio_voice_config\s*=\s*required/,
    /readonly_confirm_retell_ownership_and_rollback_id\s*=\s*required/,
    /readonly_confirm_vapi_number_and_assignment\s*=\s*required/,
    /readonly_confirm_vapi_inbound_connection_method\s*=\s*required/,
    /readonly_confirm_required_mechanism_class\s*=\s*required/,
  ]) assert(re.test(doc), `B259 doc missing required read-only confirmation: ${re}`);
  assert(/TwiML App/i.test(doc) && /SIP/i.test(doc) && /webhook URL/i.test(doc),
    'B259 doc enumerates Vapi inbound connection methods (TwiML App / webhook URL / SIP endpoint / import)');
  pass('B259 doc documents all required read-only confirmations before any change');

  // 7. Proposed change plan documented (NOT executed).
  assert(/change_plan_twilio_voice_fields_documented\s*=\s*true/.test(doc),
    'B259 doc records change_plan_twilio_voice_fields_documented = true');
  assert(/change_plan_vapi_target_documented\s*=\s*true/.test(doc),
    'B259 doc records change_plan_vapi_target_documented = true');
  assert(/approval_required_before_change\s*=\s*jason_new_separate_explicit_approval_as_build_artifact/.test(doc),
    'B259 doc records approval_required_before_change = jason_new_separate_explicit_approval_as_build_artifact');
  pass('B259 doc documents the proposed change plan (Twilio Voice fields, Vapi target, approver) without executing it');

  // 8. Rollback plan documented.
  assert(/rollback_path_documented\s*=\s*true/.test(doc), 'B259 doc records rollback_path_documented = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B259 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  pass('B259 doc documents the rollback path (revert Twilio Voice to the Retell Trunk Sip Trunk)');

  // 9. Safety guardrails documented.
  assert(/safety_guardrails_documented\s*=\s*true/.test(doc), 'B259 doc records safety_guardrails_documented = true');
  for (const re of [
    /No production homeowner\/roofer traffic/i,
    /No SMS change/i,
    /No Retell deletion/i,
    /No releasing\/porting\/deleting the phone number/i,
    /No irreversible action/i,
    /No call until \*\*after\*\* a fresh cutover guard/i,
  ]) assert(re.test(doc), `B259 doc missing safety guardrail: ${re}`);
  pass('B259 doc documents the safety guardrails (no homeowner/roofer traffic, no SMS change, no Retell deletion, no number release, no irreversible action, no call until guard+approval)');

  // 10. Validation plan documented.
  assert(/validation_plan_documented\s*=\s*true/.test(doc), 'B259 doc records validation_plan_documented = true');
  assert(/validation_requires_post_cutover_and_fresh_approval\s*=\s*true/.test(doc),
    'B259 doc records validation_requires_post_cutover_and_fresh_approval = true');
  assert(/physical phone \/ iPhone Phone app/i.test(doc),
    'B259 validation plan specifies one true PSTN dial from Jason-owned physical phone / iPhone Phone app');
  assert(/Type\s*=\s*Phone\s*\/\s*PSTN/i.test(doc) && /not\s+Web/i.test(doc),
    'B259 validation plan confirms Vapi Calls Type=Phone/PSTN not Web');
  assert(/end-of-call-report/i.test(doc), 'B259 validation plan confirms Vapi Webhooks end-of-call-report');
  pass('B259 doc documents the post-cutover validation plan (PSTN dial, Vapi Type=Phone, end-of-call-report, HTTP status, no SMS, sanitized evidence)');

  // 11. Stop conditions documented.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B259 doc records stop_conditions_documented = true');
  for (const re of [
    /Unexpected SMS/i,
    /real homeowner\/roofer traffic/i,
    /No Vapi call record/i,
    /Retell still answers/i,
    /401\s*\/\s*400\s*\/\s*500/,
    /Missing end-of-call-report/i,
  ]) assert(re.test(doc), `B259 doc missing stop condition: ${re}`);
  pass('B259 doc documents the stop conditions (unexpected SMS, real traffic, no Vapi record, Retell answers, 401/400/500, missing report, unsafe behavior)');

  // 12. Decision tree documented.
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B259 doc records decision_tree_documented = true');
  assert(/cutover target is unclear/i.test(doc), 'B259 decision tree covers unclear cutover target');
  assert(/Twilio still routes to Retell/i.test(doc), 'B259 decision tree covers Twilio still routing to Retell');
  assert(/no end-of-call-report/i.test(doc), 'B259 decision tree covers Vapi receives PSTN but no end-of-call-report');
  assert(/backend returns non-200/i.test(doc), 'B259 decision tree covers backend non-200');
  pass('B259 doc documents the decision tree (unclear target, still Retell, no report, 200 pass, non-200 backend)');

  // 13. Explicit recommendation documented.
  assert(/explicit_recommendation_documented\s*=\s*true/.test(doc),
    'B259 doc records explicit_recommendation_documented = true');
  assert(/read-only dashboard inspection of the Vapi\/Twilio cutover target/i.test(doc),
    'B259 recommendation names the read-only dashboard inspection of the cutover target');
  assert(/approval\/guard packet for a narrow Twilio Voice routing cutover/i.test(doc),
    'B259 recommendation names the narrow Twilio Voice cutover approval/guard packet (only after target known)');
  pass('B259 doc documents the explicit recommendation for the next build');

  // 14. Status fields: planned/not-started/blocked/not-validated.
  assert(/remediation_status\s*=\s*planned_not_executed/.test(doc),
    'B259 doc records remediation_status = planned_not_executed');
  assert(/twilio_voice_cutover_status\s*=\s*not_started/.test(doc),
    'B259 doc records twilio_voice_cutover_status = not_started');
  assert(/vapi_pstn_validation_status\s*=\s*blocked_until_cutover/.test(doc),
    'B259 doc records vapi_pstn_validation_status = blocked_until_cutover');
  assert(/full_final_report_processing_status\s*=\s*not_validated/.test(doc),
    'B259 doc records full_final_report_processing_status = not_validated');
  assert(/real_pstn_vapi_call_path_status\s*=\s*not_validated/.test(doc),
    'B259 doc records real_pstn_vapi_call_path_status = not_validated');
  pass('B259 doc records remediation_status=planned_not_executed, cutover not_started, validation blocked_until_cutover, report/path not_validated');

  // 15. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B259 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B259 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B259 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 16. No fix / no runtime action by Build 259.
  assert(/build_mode\s*=\s*twilio_retell_to_vapi_voice_route_remediation_plan_repo_only/.test(doc),
    'B259 doc records build_mode = twilio_retell_to_vapi_voice_route_remediation_plan_repo_only');
  assert(/runtime_action_performed_by_build_259\s*=\s*false/.test(doc),
    'B259 doc records runtime_action_performed_by_build_259 = false');
  assert(/fix_or_config_change_performed_by_build_259\s*=\s*false/.test(doc),
    'B259 doc records fix_or_config_change_performed_by_build_259 = false');
  pass('B259 doc records plan-only: no cutover, no config change, and no runtime/external action by Build 259');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B259 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B259 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B259 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B259 doc asserts no secrets printed');
  pass('B259 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-call-id-shaped / phone-number-shaped / raw-trunk-SID values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B259 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B259 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B259 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B259 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B259 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B259 doc contains no raw TK-prefixed Twilio Trunk SID value');
  pass('B259 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, phone-number-shaped, raw-trunk-SID, or PII values');

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
    /No SMS\/messaging route change/i,
    /No Twilio call placed or routed/i,
    /No Twilio CLI\/API used/i,
    /No Twilio configuration change/i,
    /No Twilio Voice cutover executed/i,
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
  for (const re of gates) assert(re.test(doc), `B259 doc missing safety invariant: ${re}`);
  pass('B259 doc states the full Build 259 safety-invariant block (no cutover/call/Test/Talk/webCall/curl/Twilio/Retell/SMS/DNS/secret/config/deploy/runtime action)');

  // 20. Dry-run wrapper exists and wires this verifier + B258 + B257 + B256 + B255 + B254 + B253 + B231 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B259 verifier file exists');
  for (const v of [B258_VERIFIER, B257_VERIFIER, B256_VERIFIER, B255_VERIFIER, B254_VERIFIER, B253_VERIFIER, B231_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs the Build 258 verifier');
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
  pass('B259 verifier present and the dry-run wrapper wires this verifier + B258 + B257 + B256 + B255 + B254 + B253 + B231 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 259 Twilio voice-route Retell→Vapi remediation-plan packet verified (${passCount} checks).`);
  console.log('build_mode=twilio_retell_to_vapi_voice_route_remediation_plan_repo_only  runtime_action_performed_by_build_259=false  fix_or_config_change_performed_by_build_259=false  build_258_prerequisite_commit=c8a8adb  build_258_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  current_routing_confirmed=true  current_voice_route=twilio_sip_trunk_retell_trunk  target_routing_documented=true  target_voice_route=inbound_pstn_to_vapi_test_roofing_assistant  readonly_confirmations_documented=true  change_plan_twilio_voice_fields_documented=true  change_plan_vapi_target_documented=true  rollback_path_documented=true  rollback_target=twilio_sip_trunk_retell_trunk  safety_guardrails_documented=true  validation_plan_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  remediation_status=planned_not_executed  twilio_voice_cutover_status=not_started  vapi_pstn_validation_status=blocked_until_cutover  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
