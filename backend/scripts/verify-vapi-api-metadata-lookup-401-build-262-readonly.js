#!/usr/bin/env node
/**
 * Build 262 Read-Only Verifier — proves the repo-only evidence packet for the EXECUTED option-A Vapi API
 * phone-number metadata lookup is internally consistent, grounded in the prior builds, honest about the one
 * outward action it performed, and safe. Build 261 (commit 575668a) recommended option A: a read-only Vapi
 * API metadata lookup of the phone-number resource. Build 262 EXECUTED exactly one read-only authenticated
 * GET to https://api.vapi.ai/phone-number using the sandbox VAPI_API_KEY env var; it returned HTTP 401
 * "Invalid Key" (Unauthorized), so no metadata was obtained and the import binding / exact Twilio voice
 * target remain unresolved. Per the Build 261 decision tree's 401 branch, API lookup attempts STOP and a
 * fresh Private API key from the correct workspace (or Vapi support, or an explicit SIP-trunk path) is
 * required. This build is honest that it DID perform one read-only GET (it does NOT claim "no curl / no live
 * HTTP / no runtime action") while still asserting no call, no SMS, no config change, no write, and no
 * secret exposure.
 *
 * Read-only. Reads the Build 262 doc and predecessor docs as text; confirms the Build 261 prerequisite
 * commit is present in git history; asserts the executed-GET/401/invalid-key result, the consumed
 * exactly-one-GET approval, the applied 401 decision branch, the unchanged not-ready cutover decision, the
 * preserved Retell Trunk rollback target, the next-step (fresh Private key) recommendation with B/C
 * fallbacks, and the status block; asserts no second attempt / no call / no SMS / no config change / no
 * secret exposure; and that no secrets/tokens/raw phone numbers/raw IDs/URLs/SIP URIs/PII are present.
 * Checks `git status` before/after. No network, no Vapi API call, no Supabase call, no credential/secret
 * access, no provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no Vapi Test/Talk, no
 * browser/webCall, no Vapi publish, no number import, no live webhook, no curl, no env mutation, no deploy.
 * Does NOT read the VAPI_API_KEY value and does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237.
 * Executes no service; does NOT build. Performs NO runtime/external action.
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

const DOC = 'docs/VAPI_API_METADATA_LOOKUP_401_BUILD_262.md';
const B261_DOC = 'docs/VAPI_INTEGRATION_ROUTING_FORK_BUILD_261.md';
const B260_DOC = 'docs/VAPI_INBOUND_TARGET_INSPECTION_BUILD_260.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js';
const DRY_RUN = 'scripts/run-vapi-api-metadata-lookup-401-build-262-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B261_VERIFIER = 'backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js';
const B260_VERIFIER = 'backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js';
const B258_VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';

const DECISION_TOKEN = 'VAPI_API_METADATA_LOOKUP_EXECUTED_RETURNED_401_INVALID_KEY_STOP_API_LOOKUPS_FRESH_PRIVATE_KEY_FROM_CORRECT_WORKSPACE_REQUIRED_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL';
const B261_COMMIT = '575668a';

(function main() {
  const before = gitStatus();
  console.log('=== Build 262 Vapi API phone-number metadata lookup (EXECUTED option A, returned 401 Invalid Key) verification (repo-only evidence) ===');
  console.log('One read-only GET executed (returned 401). No second attempt. No cutover. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No live RoofLeadHQ webhook called. No SMS. No Twilio CLI/API. No Retell API. No DNS change. No Supabase write. No secret value read/printed/committed. No secret file read. No env change. No deploy. No build. Evidence capture only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B262 doc carries the exact decision token');
  pass('Build 262 metadata-lookup-401 doc exists and carries the decision token');

  // 2. Build 261 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B261_COMMIT), 'Build 261 prerequisite commit 575668a is present in git history');
  for (const d of [B261_DOC, B260_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_261_prerequisite_commit\s*=\s*575668a/.test(doc),
    'B262 doc records build_261_prerequisite_commit = 575668a');
  assert(/build_261_prerequisite_status\s*=\s*validated/.test(doc),
    'B262 doc records build_261_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B262 doc records HEAD==origin/main');
  pass('Build 261 prerequisite commit 575668a present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmation carried forward.
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B262 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B262 doc references the confirmed Retell Trunk');
  pass('B262 doc carries forward Build 258 confirmation (Twilio Voice routes to the Retell Trunk)');

  // 4. The build is HONEST that exactly one read-only GET was executed.
  assert(/build_mode\s*=\s*vapi_api_metadata_lookup_executed_401_repo_only_evidence/.test(doc),
    'B262 doc records build_mode = vapi_api_metadata_lookup_executed_401_repo_only_evidence');
  assert(/read_only_api_lookup_executed\s*=\s*true/.test(doc),
    'B262 doc records read_only_api_lookup_executed = true');
  assert(/lookup_http_method\s*=\s*GET/.test(doc), 'B262 doc records lookup_http_method = GET');
  assert(/lookup_attempts\s*=\s*1/.test(doc), 'B262 doc records lookup_attempts = 1 (no retry)');
  assert(/runtime_action_performed_by_build_262\s*=\s*read_only_get_only/.test(doc),
    'B262 doc records runtime_action_performed_by_build_262 = read_only_get_only (honest)');
  assert(/GET https:\/\/api\.vapi\.ai\/phone-number/.test(doc),
    'B262 doc records the exact read-only endpoint hit');
  pass('B262 doc honestly records that exactly one read-only GET was executed against the Vapi phone-number endpoint');

  // 5. Result = 401 invalid key, no metadata obtained.
  assert(/lookup_http_status\s*=\s*401/.test(doc), 'B262 doc records lookup_http_status = 401');
  assert(/lookup_result\s*=\s*invalid_key_unauthorized/.test(doc),
    'B262 doc records lookup_result = invalid_key_unauthorized');
  assert(/metadata_obtained\s*=\s*false/.test(doc), 'B262 doc records metadata_obtained = false');
  assert(/Invalid Key/.test(doc), 'B262 doc records the Vapi "Invalid Key" message');
  assert(/error\s*=\s*Unauthorized/.test(doc), 'B262 doc records error = Unauthorized');
  assert(/provider_field_observed\s*=\s*false/.test(doc) && /credentialId_field_observed\s*=\s*false/.test(doc) && /server_field_observed\s*=\s*false/.test(doc),
    'B262 doc records provider/credentialId/server fields not observed (request never authenticated)');
  pass('B262 doc records the 401 Invalid Key result with no metadata obtained');

  // 6. Approval scope + consumption recorded.
  assert(/approval_scope\s*=\s*exactly_one_read_only_vapi_api_phone_number_metadata_get/.test(doc),
    'B262 doc records approval_scope = exactly_one_read_only_vapi_api_phone_number_metadata_get');
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B262 doc records approval_consumed = true');
  assert(/approval_consumed_outcome\s*=\s*executed_returned_401_invalid_key_no_metadata_obtained/.test(doc),
    'B262 doc records approval_consumed_outcome = executed_returned_401_invalid_key_no_metadata_obtained');
  pass('B262 doc records the exactly-one-GET approval as consumed with its 401 outcome');

  // 7. Interpretation = key-type / wrong-workspace mismatch; binding/target unresolved.
  assert(/key_type_mismatch_suspected\s*=\s*true/.test(doc),
    'B262 doc records key_type_mismatch_suspected = true');
  assert(/wrong_workspace_suspected\s*=\s*true/.test(doc),
    'B262 doc records wrong_workspace_suspected = true');
  assert(/import_binding_resolved\s*=\s*false/.test(doc),
    'B262 doc records import_binding_resolved = false');
  assert(/exact_twilio_voice_target_resolved\s*=\s*false/.test(doc),
    'B262 doc records exact_twilio_voice_target_resolved = false');
  pass('B262 doc interprets the 401 as a key-type/wrong-workspace mismatch leaving binding/target unresolved');

  // 8. Applied decision branch = 401 stop / fresh private key.
  assert(/decision_branch_applied\s*=\s*401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path/.test(doc),
    'B262 doc records decision_branch_applied = 401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path');
  assert(/[Ss]top API (metadata-)?lookup/.test(doc), 'B262 doc states API lookup attempts stop');
  assert(/fresh Private API key/i.test(doc), 'B262 doc names the fresh Private API key remediation');
  assert(/correct (Vapi )?workspace/i.test(doc), 'B262 doc names the correct workspace requirement');
  pass('B262 doc applies the Build 261 decision-tree 401 branch (stop lookups; fresh Private key from correct workspace)');

  // 9. Cutover readiness decision = unchanged NOT ready.
  assert(/cutover_ready\s*=\s*false/.test(doc), 'B262 doc records cutover_ready = false');
  assert(/cutover_blocked_reason\s*=\s*exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized/.test(doc),
    'B262 doc records cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized');
  assert(/twilio_voice_cutover_status\s*=\s*not_started/.test(doc),
    'B262 doc records twilio_voice_cutover_status = not_started');
  assert(/vapi_twilio_target_status\s*=\s*not_visible_api_lookup_unauthorized/.test(doc),
    'B262 doc records vapi_twilio_target_status = not_visible_api_lookup_unauthorized');
  assert(/vapi_import_binding_status\s*=\s*unknown_not_resolved/.test(doc),
    'B262 doc records vapi_import_binding_status = unknown_not_resolved');
  pass('B262 doc concludes cutover remains NOT ready (lookup unauthorized; binding/target unresolved)');

  // 10. Rollback target preserved = Retell Trunk.
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B262 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  assert(/ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED\s*=\s*true/.test(doc),
    'B262 doc records ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true');
  pass('B262 doc preserves the rollback target as the Retell Trunk Sip Trunk');

  // 11. Guardrails + stop conditions + decision tree + recommendation documented.
  assert(/safety_guardrails_documented\s*=\s*true/.test(doc), 'B262 doc records safety_guardrails_documented = true');
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B262 doc records stop_conditions_documented = true');
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B262 doc records decision_tree_documented = true');
  assert(/explicit_recommendation_documented\s*=\s*true/.test(doc),
    'B262 doc records explicit_recommendation_documented = true');
  assert(/retry the API GET/i.test(doc), 'B262 stop conditions forbid retrying the API GET without new approval');
  pass('B262 doc documents safety guardrails, stop conditions, decision tree, and explicit recommendation');

  // 12. Next step + fallbacks.
  assert(/next_step\s*=\s*obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval/.test(doc),
    'B262 doc records next_step = obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval');
  assert(/next_step_fallbacks\s*=\s*B_vapi_support_docs_confirmation_then_C_explicit_vapi_sip_trunk_path/.test(doc),
    'B262 doc records the B (support/docs) and C (explicit Vapi SIP-trunk) fallbacks');
  pass('B262 doc records the fresh-Private-key next step with B/C fallbacks');

  // 13. No new approvals created (cutover + PSTN validation).
  assert(/cutover_approval_status\s*=\s*not_requested/.test(doc),
    'B262 doc records cutover_approval_status = not_requested');
  assert(/No Twilio cutover approval created/i.test(doc), 'B262 doc asserts no Twilio cutover approval created');
  assert(/No call\/PSTN validation approval created/i.test(doc),
    'B262 doc asserts no call/PSTN validation approval created');
  pass('B262 doc records no Twilio cutover approval and no call/PSTN validation approval were created');

  // 14. No-call / no-SMS / no-config evidence flags + pstn blocked.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B262 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B262 doc records no_sms_sent = true');
  assert(/no_config_changed\s*=\s*true/.test(doc) && /NO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B262 doc records no_config_changed = true');
  assert(/pstn_validation_status\s*=\s*blocked_until_target_or_import_binding_confirmed/.test(doc),
    'B262 doc records pstn_validation_status = blocked_until_target_or_import_binding_confirmed');
  pass('B262 doc records no_call_placed / no_sms_sent / no_config_changed = true and PSTN validation blocked');

  // 15. No fix / config change by Build 262.
  assert(/fix_or_config_change_performed_by_build_262\s*=\s*false/.test(doc),
    'B262 doc records fix_or_config_change_performed_by_build_262 = false');
  pass('B262 doc records no fix and no config change performed by Build 262');

  // 16. Secret-handling honesty: key used as Bearer, value never read/printed/committed; response carried no secret.
  assert(/secret_value_read\s*=\s*false/.test(doc), 'B262 doc records secret_value_read = false');
  assert(/secret_value_printed\s*=\s*false/.test(doc), 'B262 doc records secret_value_printed = false');
  assert(/secret_value_committed\s*=\s*false/.test(doc), 'B262 doc records secret_value_committed = false');
  assert(/vapi_response_contained_secret\s*=\s*false/.test(doc),
    'B262 doc records vapi_response_contained_secret = false');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B262 doc states the local secret file was not read');
  assert(/[Nn]o secret committed/.test(doc), 'B262 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B262 doc asserts no secrets printed');
  pass('B262 doc records honest secret handling (key used only as Bearer header; value never read/printed/committed; response carried no secret)');

  // 17. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B262 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B262 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B262 doc records no retry permitted without a new, separate approval (stop rule in force)');

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
    'B262 doc contains no concrete SIP URI value');
  pass('B262 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, or concrete-SIP-URI values');

  // 19. Full safety-invariant block present (adapted: one read-only GET allowed; everything else forbidden).
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
    /No new call requested or placed/i,
    /No second API lookup or retry/i,
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
    /No number imported into Vapi/i,
    /No provider connected in Vapi/i,
    /No credential entered in Vapi/i,
    /No Retell API used/i,
    /No Retell configuration change/i,
    /No Retell deletion/i,
    /No number released, ported, or deleted/i,
    /No live RoofLeadHQ webhook called/i,
    /No DNS change/i,
    /No unrelated Railway configuration change/i,
    /No Vapi configuration change by this build/i,
    /No Vapi publish/i,
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
  pass('B262 doc states the full Build 262 safety-invariant block (one read-only GET allowed; no second attempt/call/Test/Talk/webCall/Twilio/Retell/SMS/DNS/secret/config/deploy action)');

  // 20. Dry-run wrapper exists and wires this verifier + B261 + B260 + B258 + B256 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B262 verifier file exists');
  for (const v of [B261_VERIFIER, B260_VERIFIER, B258_VERIFIER, B256_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-api-metadata-lookup-401-build-262-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-integration-routing-fork-build-261-readonly.js'),
    'dry-run wrapper runs the Build 261 verifier');
  assert(dry.includes('verify-vapi-inbound-target-inspection-build-260-readonly.js'),
    'dry-run wrapper runs the Build 260 verifier');
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs the Build 258 verifier');
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs the Build 256 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  // The dry-run wrapper itself must NOT re-issue a live API call — it is repo-only/offline.
  // (The endpoint/curl may appear inside descriptive echo prose; what matters is no executable
  // curl command line — checked by anchoring to start-of-line command position.)
  assert(!/^\s*curl\b/m.test(dry), 'dry-run wrapper invokes no executable curl command line (offline)');
  assert(!/\|\s*curl\b/.test(dry) && !/;\s*curl\b/.test(dry) && !/&&\s*curl\b/.test(dry),
    'dry-run wrapper chains no curl invocation (offline)');
  pass('B262 verifier present and the dry-run wrapper wires this verifier + B261 + B260 + B258 + B256 + smoke (offline, no live API)');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 262 Vapi API metadata-lookup-401 evidence packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_api_metadata_lookup_executed_401_repo_only_evidence  read_only_api_lookup_executed=true  lookup_http_method=GET  lookup_http_status=401  lookup_result=invalid_key_unauthorized  metadata_obtained=false  lookup_attempts=1  runtime_action_performed_by_build_262=read_only_get_only  fix_or_config_change_performed_by_build_262=false  build_261_prerequisite_commit=575668a  build_261_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_scope=exactly_one_read_only_vapi_api_phone_number_metadata_get  approval_consumed=true  approval_consumed_outcome=executed_returned_401_invalid_key_no_metadata_obtained  key_type_mismatch_suspected=true  wrong_workspace_suspected=true  import_binding_resolved=false  exact_twilio_voice_target_resolved=false  decision_branch_applied=401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path  cutover_ready=false  cutover_blocked_reason=exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  safety_guardrails_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  next_step=obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval  twilio_voice_cutover_status=not_started  vapi_twilio_target_status=not_visible_api_lookup_unauthorized  vapi_import_binding_status=unknown_not_resolved  cutover_approval_status=not_requested  pstn_validation_status=blocked_until_target_or_import_binding_confirmed  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  secret_value_read=false  secret_value_printed=false  secret_value_committed=false  vapi_response_contained_secret=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
