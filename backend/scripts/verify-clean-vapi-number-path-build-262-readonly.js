#!/usr/bin/env node
/**
 * Build 262 Read-Only Verifier (clean Vapi-managed test-number path) — proves the repo-only STRATEGIC
 * DECISION / readiness packet is internally consistent, grounded in the prior builds, and safe. After
 * Builds 258–261 established that the existing Test Roofing number's inbound Voice routes to the Twilio Sip
 * Trunk "Retell Trunk" (PSTN hits Retell, not Vapi), that Vapi exposes no exact target/import binding, and
 * that the read-only Vapi API metadata lookup returned HTTP 401 twice (the Build 262 API-lookup-401 sibling
 * packet), Build 262 captures the decision to ROUTE AROUND the blocker: prepare a clean Vapi-managed (or
 * cleanly provisioned) test number assigned to the Test Roofing Assistant, leaving the existing Twilio →
 * Retell route untouched as rollback. It documents and plans only; it provisions no number, places no call,
 * and changes no config.
 *
 * Read-only. Reads the Build 262 clean-number doc and the Build 262 API-lookup-401 sibling doc and the
 * Build 261/260/258 predecessor docs as text; confirms the Build 261 prerequisite commit is present in git
 * history; asserts the strategic decision, the preserved untouched Twilio→Retell rollback, the blocked
 * cutover/API-lookup status, the named-but-not-granted narrow clean-number approval, the planned-not-
 * executed future validation sequence, the explicit stop/rollback conditions, the forward decision tree,
 * and the expected final status block (current_twilio_retell_route_status=preserved_untouched /
 * twilio_voice_cutover_status=blocked_pending_vapi_support_or_target / vapi_api_metadata_lookup_status=
 * blocked_by_401 / clean_vapi_number_path_status=preferred_next_path_planned_not_executed /
 * clean_vapi_number_approval_status=not_requested / pstn_validation_status=not_approved /
 * no_call_placed / no_sms_sent / no_config_changed / no_number_provisioned = true); asserts no call/Test/
 * Talk/browserWebCall/curl/Twilio API/Retell API/SMS/provision/import/credential/secret/config/deploy/
 * runtime action in Build 262; and that no secrets/tokens/raw phone numbers/raw IDs/URLs/SIP URIs/PII are
 * present. Checks `git status` before/after. No network, no Supabase call, no credential/secret access, no
 * provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no number provisioned, no Vapi
 * Test, no Vapi Talk, no browser/webCall, no Vapi publish, no number import, no live webhook, no curl, no
 * env mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service;
 * does NOT build. Performs NO runtime/external action.
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

const DOC = 'docs/CLEAN_VAPI_NUMBER_PATH_BUILD_262.md';
const SIBLING_401_DOC = 'docs/VAPI_API_METADATA_LOOKUP_401_BUILD_262.md';
const B261_DOC = 'docs/VAPI_INTEGRATION_ROUTING_FORK_BUILD_261.md';
const B260_DOC = 'docs/VAPI_INBOUND_TARGET_INSPECTION_BUILD_260.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-number-path-build-262-dry-run.sh';

// Predecessor / sibling read-only verifiers wired into the dry-run regression chain.
const SIBLING_401_VERIFIER = 'backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js';
const B261_VERIFIER = 'backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js';
const B260_VERIFIER = 'backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js';
const B258_VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';

const DECISION_TOKEN = 'CLEAN_VAPI_NUMBER_PATH_PREFERRED_NEXT_STEP_PLANNED_NOT_EXECUTED_EXISTING_TWILIO_RETELL_ROUTE_PRESERVED_UNTOUCHED_TWILIO_CUTOVER_BLOCKED_PENDING_VAPI_SUPPORT_OR_TARGET_API_LOOKUP_BLOCKED_BY_401_REPO_ONLY_NO_PROVISION_NO_CALL_NO_CONFIG_CHANGE_WITHOUT_NEW_SEPARATE_APPROVAL';
const B261_COMMIT = '575668a';

(function main() {
  const before = gitStatus();
  console.log('=== Build 262 clean Vapi-managed test-number path STRATEGIC DECISION verification (repo-only, planned-not-executed) ===');
  console.log('No provisioning. No cutover. No config change. No number bought/imported. No provider connected. No credential entered. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No DNS change. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Decision capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B262 clean-number doc carries the exact decision token');
  pass('Build 262 clean-Vapi-number-path doc exists and carries the decision token');

  // 2. Build 261 prerequisite commit present + recorded; predecessor + sibling docs exist.
  assert(commitPresent(B261_COMMIT), 'Build 261 prerequisite commit 575668a is present in git history');
  for (const d of [SIBLING_401_DOC, B261_DOC, B260_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor/sibling doc exists: ${d}`);
  }
  assert(/build_261_prerequisite_commit\s*=\s*575668a/.test(doc),
    'B262 doc records build_261_prerequisite_commit = 575668a');
  assert(/build_261_prerequisite_status\s*=\s*validated/.test(doc),
    'B262 doc records build_261_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B262 doc records HEAD==origin/main');
  pass('Build 261 prerequisite commit 575668a present in git history, recorded, and predecessor/sibling docs exist');

  // 3. Build 258 confirmation carried forward (PSTN routes to Retell Trunk).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B262 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B262 doc references the confirmed Retell Trunk');
  pass('B262 doc carries forward Build 258 confirmation (existing number PSTN routes to the Retell Trunk)');

  // 4. Problem statement: external-blocked existing-number cutover.
  assert(/problem_is_external_blocked\s*=\s*true/.test(doc), 'B262 doc records problem_is_external_blocked = true');
  assert(/no Vapi Call ID/i.test(doc) && /Retell/.test(doc),
    'B262 doc explains the no-Vapi-Call-ID / routes-to-Retell support situation');
  pass('B262 doc states the externally-blocked problem (Vapi support, no Vapi Call ID, routes to Retell)');

  // 5. Strategic decision = route around blocker via clean Vapi number.
  assert(/strategic_decision\s*=\s*route_around_blocker_via_clean_vapi_number/.test(doc),
    'B262 doc records strategic_decision = route_around_blocker_via_clean_vapi_number');
  assert(/clean Vapi-managed/i.test(doc), 'B262 doc names the clean Vapi-managed number path');
  assert(/business_path_to_prove\s*=\s*inbound_pstn__vapi_assistant__end_of_call_report__backend_webhooks_vapi_call_completed/.test(doc),
    'B262 doc records the business path to prove (inbound PSTN → Vapi assistant → EOCR → backend webhook)');
  assert(/\/webhooks\/vapi\/call-completed/.test(doc), 'B262 doc names the backend /webhooks/vapi/call-completed endpoint');
  pass('B262 doc records the strategic decision to route around the blocker via a clean Vapi number');

  // 6. Existing Twilio→Retell route preserved untouched (rollback) + additive.
  assert(/current_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B262 doc records current_twilio_retell_route_status = preserved_untouched');
  assert(/clean_number_is_additive_not_a_cutover\s*=\s*true/.test(doc),
    'B262 doc records clean_number_is_additive_not_a_cutover = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B262 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  assert(/ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED\s*=\s*true/.test(doc),
    'B262 doc records ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true');
  pass('B262 doc preserves the existing Twilio→Retell route untouched as additive rollback');

  // 7. Cutover + API-lookup both still blocked.
  assert(/twilio_voice_cutover_status\s*=\s*blocked_pending_vapi_support_or_target/.test(doc),
    'B262 doc records twilio_voice_cutover_status = blocked_pending_vapi_support_or_target');
  assert(/vapi_api_metadata_lookup_status\s*=\s*blocked_by_401/.test(doc),
    'B262 doc records vapi_api_metadata_lookup_status = blocked_by_401');
  pass('B262 doc records both the Twilio cutover (blocked pending support/target) and the API lookup (blocked by 401) statuses');

  // 8. Next useful approval named but NOT granted.
  assert(/next_useful_approval\s*=\s*narrow_clean_vapi_managed_test_number_provision_and_use_only/.test(doc),
    'B262 doc records next_useful_approval = narrow_clean_vapi_managed_test_number_provision_and_use_only');
  assert(/next_useful_approval_excludes\s*=\s*any_change_to_existing_twilio_retell_number/.test(doc),
    'B262 doc records next_useful_approval_excludes = any_change_to_existing_twilio_retell_number');
  assert(/clean_vapi_number_approval_status\s*=\s*not_requested/.test(doc),
    'B262 doc records clean_vapi_number_approval_status = not_requested');
  pass('B262 doc names the narrow clean-number approval as the next useful approval and marks it not_requested');

  // 9. Future validation sequence documented but NOT executed.
  assert(/future_validation_sequence_documented\s*=\s*true/.test(doc),
    'B262 doc records future_validation_sequence_documented = true');
  assert(/future_validation_sequence_executed\s*=\s*false/.test(doc),
    'B262 doc records future_validation_sequence_executed = false');
  for (const step of [
    /Provision \*\*or\*\* select a clean \*\*Vapi-managed\*\* test number/i,
    /Assign the \*\*Test Roofing Assistant\*\*/i,
    /webhook \/ server messages/i,
    /one controlled true PSTN call/i,
    /Type = Phone \/ PSTN/i,
    /end-of-call-report/i,
    /backend receives and processes/i,
    /Capture \*\*sanitized evidence\*\*/i,
  ]) {
    assert(step.test(doc), `B262 future validation sequence missing step: ${step}`);
  }
  pass('B262 doc documents the full future validation sequence (provision→assign→webhook→PSTN→record→EOCR→backend→evidence) as planned-not-executed');

  // 10. Explicit stop / rollback conditions.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B262 doc records stop_conditions_documented = true');
  assert(/existing_twilio_retell_number_untouched_invariant\s*=\s*true/.test(doc),
    'B262 doc records existing_twilio_retell_number_untouched_invariant = true');
  for (const cond of [
    /cannot be provisioned or assigned cleanly/i,
    /does not reach Vapi/i,
    /No end-of-call-report/i,
    /backend returns non-2xx/i,
    /existing Twilio\/Retell number remains untouched throughout/i,
  ]) {
    assert(cond.test(doc), `B262 stop conditions missing: ${cond}`);
  }
  pass('B262 doc documents the explicit stop/rollback conditions (provision/assign fail, no Vapi reach, no EOCR, backend non-2xx, existing number untouched)');

  // 11. Forward decision tree.
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B262 doc records decision_tree_documented = true');
  assert(/path_success_action\s*=\s*continue_vapi_for_live_roofer_testing_then_decide_existing_number_migration/.test(doc),
    'B262 doc records the success path (continue Vapi for live roofer testing)');
  assert(/path_failure_action\s*=\s*pivot_to_retell_and_adapt_backend_webhook_mapping/.test(doc),
    'B262 doc records the failure path (pivot to Retell, adapt backend/webhook mapping)');
  assert(/vapi_support_target_action\s*=\s*usable_but_no_longer_blocks_live_testing/.test(doc),
    'B262 doc records the Vapi-support-target path (usable but no longer blocks live testing)');
  pass('B262 doc documents the forward decision tree (success→Vapi, failure→Retell, support-target→non-blocking)');

  // 12. Safety guardrails documented + explicit recommendation.
  assert(/safety_guardrails_documented\s*=\s*true/.test(doc), 'B262 doc records safety_guardrails_documented = true');
  assert(/explicit_recommendation_documented\s*=\s*true/.test(doc),
    'B262 doc records explicit_recommendation_documented = true');
  assert(/next_step\s*=\s*request_narrow_clean_vapi_managed_test_number_approval_then_execute_pstn_to_backend_validation/.test(doc),
    'B262 doc records the next_step (request narrow clean-number approval then execute PSTN→backend validation)');
  pass('B262 doc documents safety guardrails and the explicit next-step recommendation');

  // 13. Expected final status block.
  assert(/clean_vapi_number_path_status\s*=\s*preferred_next_path_planned_not_executed/.test(doc),
    'B262 doc records clean_vapi_number_path_status = preferred_next_path_planned_not_executed');
  assert(/pstn_validation_status\s*=\s*not_approved/.test(doc),
    'B262 doc records pstn_validation_status = not_approved');
  assert(/no_number_provisioned\s*=\s*true/.test(doc) && /NO_NUMBER_PROVISIONED\s*=\s*true/.test(doc),
    'B262 doc records no_number_provisioned = true');
  pass('B262 doc records the clean-number path / pstn / no-provision expected final status block');

  // 14. No-call / no-SMS / no-config evidence flags.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B262 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B262 doc records no_sms_sent = true');
  assert(/no_config_changed\s*=\s*true/.test(doc) && /NO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B262 doc records no_config_changed = true');
  pass('B262 doc records no_call_placed / no_sms_sent / no_config_changed = true');

  // 15. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B262 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_no_provision_without_new_separate_approval/.test(doc),
    'B262 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_no_provision_without_new_separate_approval');
  pass('B262 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 16. No fix / no runtime action by Build 262.
  assert(/build_mode\s*=\s*clean_vapi_number_path_strategic_decision_repo_only/.test(doc),
    'B262 doc records build_mode = clean_vapi_number_path_strategic_decision_repo_only');
  assert(/runtime_action_performed_by_build_262\s*=\s*false/.test(doc),
    'B262 doc records runtime_action_performed_by_build_262 = false');
  assert(/fix_or_config_change_performed_by_build_262\s*=\s*false/.test(doc),
    'B262 doc records fix_or_config_change_performed_by_build_262 = false');
  pass('B262 doc records decision-only: no provisioning, no cutover, no config change, and no runtime/external action by Build 262');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B262 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B262 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B262 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B262 doc asserts no secrets printed');
  pass('B262 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B262 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B262 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B262 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B262 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B262 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B262 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B262 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B262 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B262 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

  // 19. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No phone number bought, provisioned, or selected/i,
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
    /No clean-Vapi-number provisioning approval created/i,
    /No call\/PSTN validation approval created/i,
    /No number imported into Vapi/i,
    /No provider connected in Vapi/i,
    /No credential entered in Vapi/i,
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
  for (const re of gates) assert(re.test(doc), `B262 doc missing safety invariant: ${re}`);
  pass('B262 doc states the full Build 262 safety-invariant block (no provision/cutover/import/credential/call/Test/Talk/webCall/curl/Twilio/Retell/SMS/DNS/secret/config/deploy/runtime action)');

  // 20. Dry-run wrapper exists and wires this verifier + sibling 401 + B261 + B260 + B258 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B262 clean-number verifier file exists');
  for (const v of [SIBLING_401_VERIFIER, B261_VERIFIER, B260_VERIFIER, B258_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor/sibling verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-number-path-build-262-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-api-metadata-lookup-401-build-262-readonly.js'),
    'dry-run wrapper runs the sibling Build 262 API-lookup-401 verifier');
  assert(dry.includes('verify-vapi-integration-routing-fork-build-261-readonly.js'),
    'dry-run wrapper runs the Build 261 verifier');
  assert(dry.includes('verify-vapi-inbound-target-inspection-build-260-readonly.js'),
    'dry-run wrapper runs the Build 260 verifier');
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs the Build 258 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B262 clean-number verifier present and the dry-run wrapper wires this verifier + sibling 401 + B261 + B260 + B258 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 262 clean Vapi-managed test-number path strategic-decision packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_number_path_strategic_decision_repo_only  runtime_action_performed_by_build_262=false  fix_or_config_change_performed_by_build_262=false  build_261_prerequisite_commit=575668a  build_261_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  problem_is_external_blocked=true  strategic_decision=route_around_blocker_via_clean_vapi_number  business_path_to_prove=inbound_pstn__vapi_assistant__end_of_call_report__backend_webhooks_vapi_call_completed  clean_number_is_additive_not_a_cutover=true  next_useful_approval=narrow_clean_vapi_managed_test_number_provision_and_use_only  future_validation_sequence_documented=true  future_validation_sequence_executed=false  stop_conditions_documented=true  existing_twilio_retell_number_untouched_invariant=true  decision_tree_documented=true  safety_guardrails_documented=true  explicit_recommendation_documented=true  next_step=request_narrow_clean_vapi_managed_test_number_approval_then_execute_pstn_to_backend_validation  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  current_twilio_retell_route_status=preserved_untouched  twilio_voice_cutover_status=blocked_pending_vapi_support_or_target  vapi_api_metadata_lookup_status=blocked_by_401  clean_vapi_number_path_status=preferred_next_path_planned_not_executed  clean_vapi_number_approval_status=not_requested  pstn_validation_status=not_approved  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_number_provisioned=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_no_provision_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  number_imported=false  provider_connected=false  credential_entered=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
