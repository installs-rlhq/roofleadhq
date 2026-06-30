#!/usr/bin/env node
/**
 * Build 261 Read-Only Verifier — proves the repo-only Vapi integration/connection INSPECTION + Twilio
 * ROUTING FORK packet is internally consistent, grounded in the prior builds, and safe. After Build 258
 * confirmed (read-only Twilio Console) that the dialed number's inbound voice handling is the Sip Trunk
 * "Retell Trunk" (PSTN hits Retell, not Vapi), Build 259 PLANNED a Retell→Vapi cutover, and Build 260
 * captured the read-only Phone-Numbers inspection (Twilio-provider record assigned to Test Roofing
 * Assistant, exact target not visible), Build 261 records the findings of the next read-only Vapi
 * Integrations/connection inspection and the Twilio routing fork that follows: Integrations shows only the
 * Server Configuration; Phone Number Providers visible are SIP Trunk / Telnyx / Vonage; no Twilio provider
 * card, Twilio credential binding, import/connection panel, or exact voice target is visible. Two
 * docs-based paths (native Twilio import; Vapi SIP trunk) are DOCUMENTED but neither is configured or
 * confirmed. Cutover remains NOT ready. It documents only; it executes no cutover and performs NO
 * runtime/external action.
 *
 * Read-only. Reads the Build 261 doc and the Build 260/259/258/257 predecessor docs as text; confirms the
 * Build 260 prerequisite commit is present in git history; asserts the captured sanitized findings, the
 * documented routing fork, the not-ready cutover decision, the preserved Retell Trunk rollback target, and
 * the remediation_status=inspection_captured_not_executed / twilio_voice_cutover_status=not_started /
 * vapi_twilio_target_status=not_visible_in_ui_or_integrations / vapi_import_binding_status=unknown_not_visible
 * / sip_trunk_path_status=possible_but_not_configured_or_confirmed / cutover_approval_status=not_requested /
 * pstn_validation_status=blocked_until_target_or_import_binding_confirmed status block; asserts the
 * next-step recommendation is a read-only Vapi API phone-number metadata lookup (option A) with B/C
 * fallbacks; asserts no call/Test/Talk/browserWebCall/curl/Twilio API/Retell API/SMS/import/credential/
 * secret/config/deploy/runtime action in Build 261; and that no secrets/tokens/raw phone numbers/raw IDs/
 * URLs/SIP URIs/PII are present. Checks `git status` before/after. No network, no Supabase call, no
 * credential/secret access, no provider client, no SMS, no Twilio, no Retell, no call, no phone dialed, no
 * Vapi Test, no Vapi Talk, no browser/webCall, no Vapi publish, no number import, no live webhook, no curl,
 * no env mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
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

const DOC = 'docs/VAPI_INTEGRATION_ROUTING_FORK_BUILD_261.md';
const B260_DOC = 'docs/VAPI_INBOUND_TARGET_INSPECTION_BUILD_260.md';
const B259_DOC = 'docs/VAPI_TWILIO_RETELL_TO_VAPI_REMEDIATION_PLAN_BUILD_259.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js';
const DRY_RUN = 'scripts/run-vapi-integration-routing-fork-build-261-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B260_VERIFIER = 'backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js';
const B259_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js';
const B258_VERIFIER = 'backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js';
const B257_VERIFIER = 'backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js';
const B256_VERIFIER = 'backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js';

const DECISION_TOKEN = 'VAPI_TWILIO_INTEGRATION_ROUTING_FORK_CAPTURED_TARGET_NOT_VISIBLE_IMPORT_BINDING_UNKNOWN_SIP_PATH_POSSIBLE_NOT_CONFIGURED_CUTOVER_NOT_READY_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL';
const B260_COMMIT = 'caef83c';

(function main() {
  const before = gitStatus();
  console.log('=== Build 261 Vapi integration/connection INSPECTION + Twilio ROUTING FORK verification (repo-only, inspection-captured-not-executed) ===');
  console.log('No cutover. No config change. No number imported. No provider connected. No credential entered. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No SMS. No Twilio CLI/API. No Retell API. No DNS change. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. Inspection capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B261 doc carries the exact decision token');
  pass('Build 261 integration/routing-fork doc exists and carries the decision token');

  // 2. Build 260 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B260_COMMIT), 'Build 260 prerequisite commit caef83c is present in git history');
  for (const d of [B260_DOC, B259_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_260_prerequisite_commit\s*=\s*caef83c/.test(doc),
    'B261 doc records build_260_prerequisite_commit = caef83c');
  assert(/build_260_prerequisite_status\s*=\s*validated/.test(doc),
    'B261 doc records build_260_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B261 doc records HEAD==origin/main');
  pass('Build 260 prerequisite commit caef83c present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmed Twilio Voice routes to Retell Trunk (carried forward).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B261 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B261 doc references the confirmed Retell Trunk');
  pass('B261 doc carries forward Build 258 confirmation (Twilio Voice routes to the Retell Trunk)');

  // 4. Inspection scope documented (read-only).
  assert(/inspection_completed\s*=\s*true/.test(doc), 'B261 doc records inspection_completed = true');
  assert(/inspection_method\s*=\s*read_only_dashboard_view/.test(doc),
    'B261 doc records inspection_method = read_only_dashboard_view');
  assert(/Integrations/i.test(doc), 'B261 doc names the Vapi Integrations screen inspected');
  pass('B261 doc documents the read-only Vapi Integrations/connection inspection scope');

  // 5. Captured findings — Twilio integration / credential binding / connection panel NOT visible.
  assert(/VAPI_TWILIO_INTEGRATION_FOUND\s*=\s*false_or_not_visible/.test(doc),
    'B261 doc records VAPI_TWILIO_INTEGRATION_FOUND = false_or_not_visible');
  assert(/TWILIO_CREDENTIAL_BINDING_VISIBLE\s*=\s*false/.test(doc),
    'B261 doc records TWILIO_CREDENTIAL_BINDING_VISIBLE = false');
  assert(/PHONE_NUMBER_CONNECTION_PANEL_FOUND\s*=\s*false/.test(doc),
    'B261 doc records PHONE_NUMBER_CONNECTION_PANEL_FOUND = false');
  assert(/SIP Trunk/.test(doc) && /Telnyx/.test(doc) && /Vonage/.test(doc),
    'B261 doc enumerates the visible Phone Number Providers (SIP Trunk / Telnyx / Vonage)');
  assert(/No Twilio (Phone Number )?[Pp]rovider card/i.test(doc),
    'B261 doc records no Twilio provider card visible');
  assert(/Server Configuration/.test(doc) && /Bearer Token/.test(doc),
    'B261 doc records the Server Configuration Bearer Token credential');
  pass('B261 doc records the captured findings (no Twilio integration/credential/connection panel; SIP Trunk/Telnyx/Vonage visible; Server Config Bearer)');

  // 6. The gap — exact target not visible; import status unknown.
  assert(/NUMBER_IMPORT_STATUS\s*=\s*twilio_provider_record_exists_but_import_binding_not_visible/.test(doc),
    'B261 doc records NUMBER_IMPORT_STATUS = twilio_provider_record_exists_but_import_binding_not_visible');
  assert(/EXACT_TWILIO_VOICE_TARGET_VISIBLE\s*=\s*false/.test(doc),
    'B261 doc records EXACT_TWILIO_VOICE_TARGET_VISIBLE = false');
  assert(/TARGET_TYPE\s*=\s*unknown/.test(doc), 'B261 doc records TARGET_TYPE = unknown');
  assert(/NATIVE_IMPORT_MANAGED_BY_VAPI\s*=\s*unknown_not_proven/.test(doc),
    'B261 doc records NATIVE_IMPORT_MANAGED_BY_VAPI = unknown_not_proven');
  assert(/MANUAL_TWILIO_CONSOLE_TARGET_NEEDED\s*=\s*unknown/.test(doc),
    'B261 doc records MANUAL_TWILIO_CONSOLE_TARGET_NEEDED = unknown');
  assert(/SANITIZED_TARGET_DESCRIPTION\s*=/.test(doc), 'B261 doc records SANITIZED_TARGET_DESCRIPTION');
  pass('B261 doc records the gap (exact target not visible; import binding/native-import unknown)');

  // 7. Routing fork documented (native import + SIP trunk paths; neither configured).
  assert(/routing_fork_documented\s*=\s*true/.test(doc), 'B261 doc records routing_fork_documented = true');
  assert(/import_path_status\s*=\s*not_confirmed_no_credential_binding_visible/.test(doc),
    'B261 doc records import_path_status = not_confirmed_no_credential_binding_visible');
  assert(/sip_trunk_path_status\s*=\s*possible_but_not_configured_or_confirmed/.test(doc),
    'B261 doc records sip_trunk_path_status = possible_but_not_configured_or_confirmed');
  assert(/native Twilio import/i.test(doc) && /SIP trunk/i.test(doc),
    'B261 doc documents both the native Twilio import and SIP trunk paths');
  pass('B261 doc documents the Twilio routing fork (native import vs Vapi SIP trunk), neither configured/confirmed');

  // 8. Cutover readiness decision = NOT ready.
  assert(/cutover_ready\s*=\s*false/.test(doc), 'B261 doc records cutover_ready = false');
  assert(/cutover_blocked_reason\s*=\s*exact_target_unknown_and_import_binding_unconfirmed/.test(doc),
    'B261 doc records cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed');
  assert(/[Cc]utover is \*\*NOT ready/.test(doc) || /Cutover is NOT ready/.test(doc),
    'B261 doc states cutover is NOT ready');
  pass('B261 doc concludes cutover is NOT ready (exact target unknown and import binding unconfirmed)');

  // 9. Rollback target preserved = Retell Trunk.
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B261 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  assert(/ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED\s*=\s*true/.test(doc),
    'B261 doc records ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true');
  pass('B261 doc preserves the rollback target as the Retell Trunk Sip Trunk');

  // 10. Safety guardrails + stop conditions + decision tree documented.
  assert(/safety_guardrails_documented\s*=\s*true/.test(doc), 'B261 doc records safety_guardrails_documented = true');
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B261 doc records stop_conditions_documented = true');
  assert(/decision_tree_documented\s*=\s*true/.test(doc), 'B261 doc records decision_tree_documented = true');
  assert(/guess the Twilio voice target/i.test(doc), 'B261 stop conditions forbid guessing the Twilio voice target');
  pass('B261 doc documents safety guardrails, stop conditions, and decision tree');

  // 11. Explicit recommendation = read-only Vapi API metadata lookup (option A) with B/C fallbacks.
  assert(/explicit_recommendation_documented\s*=\s*true/.test(doc),
    'B261 doc records explicit_recommendation_documented = true');
  assert(/next_step\s*=\s*readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path/.test(doc),
    'B261 doc records next_step = readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path');
  assert(/read-only Vapi API metadata lookup/i.test(doc), 'B261 recommendation names the read-only Vapi API metadata lookup');
  assert(/without exposing secrets/i.test(doc), 'B261 recommendation requires no secret exposure');
  assert(/credentialId/.test(doc) && /provider/.test(doc) && /server/.test(doc),
    'B261 recommendation names the provider/status/credentialId/server fields to inspect');
  assert(/support\/docs confirmation/i.test(doc) && /SIP-trunk connection path/i.test(doc),
    'B261 recommendation includes the B (support/docs) and C (explicit Vapi SIP-trunk) fallbacks');
  pass('B261 doc recommends a read-only Vapi API metadata lookup (option A) with B/C fallbacks');

  // 12. No new approvals created (cutover + PSTN validation).
  assert(/cutover_approval_status\s*=\s*not_requested/.test(doc),
    'B261 doc records cutover_approval_status = not_requested');
  assert(/No Twilio cutover approval created/i.test(doc), 'B261 doc asserts no Twilio cutover approval created');
  assert(/No call\/PSTN validation approval created/i.test(doc),
    'B261 doc asserts no call/PSTN validation approval created');
  pass('B261 doc records no Twilio cutover approval and no call/PSTN validation approval were created');

  // 13. Status fields: inspection captured / not started / not visible / unknown binding / blocked.
  assert(/remediation_status\s*=\s*inspection_captured_not_executed/.test(doc),
    'B261 doc records remediation_status = inspection_captured_not_executed');
  assert(/twilio_voice_cutover_status\s*=\s*not_started/.test(doc),
    'B261 doc records twilio_voice_cutover_status = not_started');
  assert(/vapi_twilio_target_status\s*=\s*not_visible_in_ui_or_integrations/.test(doc),
    'B261 doc records vapi_twilio_target_status = not_visible_in_ui_or_integrations');
  assert(/vapi_import_binding_status\s*=\s*unknown_not_visible/.test(doc),
    'B261 doc records vapi_import_binding_status = unknown_not_visible');
  assert(/pstn_validation_status\s*=\s*blocked_until_target_or_import_binding_confirmed/.test(doc),
    'B261 doc records pstn_validation_status = blocked_until_target_or_import_binding_confirmed');
  pass('B261 doc records inspection_captured_not_executed / not_started / not_visible / unknown_binding / blocked status block');

  // 14. No-call / no-SMS / no-config evidence flags.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B261 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B261 doc records no_sms_sent = true');
  assert(/no_config_changed\s*=\s*true/.test(doc) && /NO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B261 doc records no_config_changed = true');
  pass('B261 doc records no_call_placed / no_sms_sent / no_config_changed = true');

  // 15. No retry without new approval + stop rule in force.
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc),
    'B261 doc records no_retry_without_new_approval = true');
  assert(/stop_rule_in_force\s*=\s*no_retry_no_new_call_no_config_change_without_new_separate_approval/.test(doc),
    'B261 doc records stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval');
  pass('B261 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 16. No fix / no runtime action by Build 261.
  assert(/build_mode\s*=\s*vapi_integration_routing_fork_capture_repo_only/.test(doc),
    'B261 doc records build_mode = vapi_integration_routing_fork_capture_repo_only');
  assert(/runtime_action_performed_by_build_261\s*=\s*false/.test(doc),
    'B261 doc records runtime_action_performed_by_build_261 = false');
  assert(/fix_or_config_change_performed_by_build_261\s*=\s*false/.test(doc),
    'B261 doc records fix_or_config_change_performed_by_build_261 = false');
  pass('B261 doc records inspection-only: no cutover, no config change, and no runtime/external action by Build 261');

  // 17. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B261 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B261 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B261 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B261 doc asserts no secrets printed');
  pass('B261 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 18. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B261 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B261 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B261 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B261 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B261 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B261 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B261 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  // Allow the docs-template placeholder form `sip:<phone_number>@<credential_id>.sip.vapi.ai`
  // (angle-bracket placeholders), but reject any concrete SIP URI with real userinfo + dotted host.
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B261 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B261 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

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
    /No Twilio cutover approval created/i,
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
  for (const re of gates) assert(re.test(doc), `B261 doc missing safety invariant: ${re}`);
  pass('B261 doc states the full Build 261 safety-invariant block (no cutover/import/credential/call/Test/Talk/webCall/curl/Twilio/Retell/SMS/DNS/secret/config/deploy/runtime action)');

  // 20. Dry-run wrapper exists and wires this verifier + B260 + B259 + B258 + B257 + B256 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B261 verifier file exists');
  for (const v of [B260_VERIFIER, B259_VERIFIER, B258_VERIFIER, B257_VERIFIER, B256_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-integration-routing-fork-build-261-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-inbound-target-inspection-build-260-readonly.js'),
    'dry-run wrapper runs the Build 260 verifier');
  assert(dry.includes('verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js'),
    'dry-run wrapper runs the Build 259 verifier');
  assert(dry.includes('verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js'),
    'dry-run wrapper runs the Build 258 verifier');
  assert(dry.includes('verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js'),
    'dry-run wrapper runs the Build 257 verifier');
  assert(dry.includes('verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js'),
    'dry-run wrapper runs the Build 256 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B261 verifier present and the dry-run wrapper wires this verifier + B260 + B259 + B258 + B257 + B256 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 261 Vapi integration/connection inspection + Twilio routing-fork packet verified (${passCount} checks).`);
  console.log('build_mode=vapi_integration_routing_fork_capture_repo_only  runtime_action_performed_by_build_261=false  fix_or_config_change_performed_by_build_261=false  build_260_prerequisite_commit=caef83c  build_260_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  inspection_completed=true  VAPI_TWILIO_INTEGRATION_FOUND=false_or_not_visible  TWILIO_CREDENTIAL_BINDING_VISIBLE=false  PHONE_NUMBER_CONNECTION_PANEL_FOUND=false  NUMBER_IMPORT_STATUS=twilio_provider_record_exists_but_import_binding_not_visible  EXACT_TWILIO_VOICE_TARGET_VISIBLE=false  TARGET_TYPE=unknown  NATIVE_IMPORT_MANAGED_BY_VAPI=unknown_not_proven  MANUAL_TWILIO_CONSOLE_TARGET_NEEDED=unknown  routing_fork_documented=true  import_path_status=not_confirmed_no_credential_binding_visible  sip_trunk_path_status=possible_but_not_configured_or_confirmed  cutover_ready=false  cutover_blocked_reason=exact_target_unknown_and_import_binding_unconfirmed  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  safety_guardrails_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  next_step=readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path  remediation_status=inspection_captured_not_executed  twilio_voice_cutover_status=not_started  vapi_twilio_target_status=not_visible_in_ui_or_integrations  vapi_import_binding_status=unknown_not_visible  cutover_approval_status=not_requested  pstn_validation_status=blocked_until_target_or_import_binding_confirmed  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  number_imported=false  provider_connected=false  credential_entered=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
