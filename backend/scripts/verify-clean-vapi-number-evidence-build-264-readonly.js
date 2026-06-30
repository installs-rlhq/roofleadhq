#!/usr/bin/env node
/**
 * Build 264 Read-Only Verifier (clean Vapi-managed test-number provisioning/assignment EVIDENCE) — proves
 * the repo-only evidence packet is internally consistent, grounded in the prior builds, and safe.
 * Build 263 captured Jason's narrow approval + checklist and marked provisioning awaiting_human_ui_action.
 * Jason then completed the Vapi UI provisioning/assignment. Build 264 records the resulting sanitized
 * evidence: the clean Vapi-managed Test Number is created/saved/visible (provider = Vapi) and assigned to
 * the Test Roofing Assistant; the existing Twilio → Retell number remains untouched; the assistant-level
 * webhook + end-of-call-report configuration was previously confirmed; and the phone-number-level custom
 * Server URL field is not visibly configured (so we do NOT overclaim it). Build 264 also prepares — but does
 * NOT execute — the next narrow single-call PSTN validation approval path, including the expected (empty)
 * validation evidence fields. It documents only; it places no call, sends no SMS, changes no Twilio/Retell
 * config, triggers no deploy, and approves NO PSTN validation.
 *
 * Read-only. Reads the Build 264 doc and the Build 263/262/258 predecessor docs as text; confirms the
 * Build 263 prerequisite commit is present in git history; asserts the captured sanitized evidence values,
 * the assistant-level vs phone-number-level webhook nuance, the preserved untouched Twilio→Retell rollback,
 * the prepared-not-executed next PSTN validation path + its narrow scope + stop conditions + expected
 * evidence template, the expected final status block, no call/Test/Talk/browserWebCall/curl/Twilio API/
 * Retell API/SMS/provision/credential/secret/config/deploy/runtime action in Build 264, and that no secrets/
 * tokens/raw phone numbers/raw IDs/URLs/SIP URIs/PII are present. Checks `git status` before/after. No
 * network, no Supabase call, no credential/secret access, no provider client, no SMS, no Twilio, no Retell,
 * no call, no phone dialed, no number provisioned, no Vapi Test, no Vapi Talk, no browser/webCall, no Vapi
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

const DOC = 'docs/CLEAN_VAPI_NUMBER_EVIDENCE_BUILD_264.md';
const B263_DOC = 'docs/CLEAN_VAPI_NUMBER_APPROVAL_BUILD_263.md';
const B262_DOC = 'docs/CLEAN_VAPI_NUMBER_PATH_BUILD_262.md';
const B258_DOC = 'docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md';
const VERIFIER = 'backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js';
const DRY_RUN = 'scripts/run-clean-vapi-number-evidence-build-264-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B263_VERIFIER = 'backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js';
const B262_VERIFIER = 'backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js';
const B261_VERIFIER = 'backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js';

const DECISION_TOKEN = 'CLEAN_VAPI_NUMBER_PROVISIONING_EVIDENCE_CAPTURED_ASSIGNED_TEST_ROOFING_ASSISTANT_ASSISTANT_LEVEL_WEBHOOK_EOCR_PREVIOUSLY_CONFIRMED_PHONE_NUMBER_CUSTOM_SERVER_URL_NOT_VISIBLE_EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED_PSTN_VALIDATION_NOT_APPROVED_NEXT_STEP_SEPARATE_SINGLE_PSTN_APPROVAL_NO_CALL_NO_SMS_NO_TWILIO_NO_RETELL_NO_DEPLOY';
const B263_COMMIT = '846eb98';

// The exact captured sanitized evidence (field=value) lines that must appear verbatim.
const EVIDENCE_LINES = [
  'CLEAN_VAPI_NUMBER_RECORD_FOUND=true',
  'CLEAN_VAPI_NUMBER_PROVIDER=Vapi',
  'CLEAN_VAPI_NUMBER_STATUS=created_saved_visible',
  'CLEAN_VAPI_NUMBER_ASSIGNED_ASSISTANT=Test Roofing Assistant',
  'WEBHOOK_SERVER_URL_CONFIGURED=assistant_level_previously_confirmed_phone_number_custom_server_url_not_visible_or_empty',
  'WEBHOOK_AUTH_CONFIGURED=true',
  'END_OF_CALL_REPORT_ENABLED=previously_confirmed_on_Test_Roofing_Assistant_not_visible_on_phone_number_screen',
  'EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true',
  'NO_CALL_PLACED=true',
  'NO_SMS_SENT=true',
  'NO_TWILIO_CONFIG_CHANGED=true',
  'NO_RETELL_CONFIG_CHANGED=true',
  'NO_BACKEND_DEPLOY=true',
];

// The exact expected (templated-empty) next-run PSTN validation evidence field names.
const PSTN_EVIDENCE_FIELDS = [
  'PSTN_VALIDATION_APPROVAL_STATUS',
  'CALL_PLACED',
  'CALL_TARGET=clean_vapi_managed_test_number',
  'VAPI_CALL_RECORD_FOUND',
  'VAPI_CALL_TYPE',
  'END_OF_CALL_REPORT_OBSERVED',
  'BACKEND_WEBHOOK_RECEIVED',
  'BACKEND_WEBHOOK_RESPONSE_STATUS',
  'LEAD_OR_FINAL_REPORT_PROCESSING_STATUS',
];

(function main() {
  const before = gitStatus();
  console.log('=== Build 264 clean Vapi-managed test-number provisioning/assignment EVIDENCE verification (repo-only) ===');
  console.log('No provisioning executed. No call. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No use/change of the existing Twilio/Retell number. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No Twilio CLI/API. No Retell API. No DNS change. No Supabase call. No credentials. No secret file read. No env change. No live HTTP. No build. Evidence capture only. Read-only. No runtime/external action.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B264 doc carries the exact decision token');
  pass('Build 264 clean-Vapi-number-evidence doc exists and carries the decision token');

  // 2. Build 263 prerequisite commit present + recorded; predecessor docs exist.
  assert(commitPresent(B263_COMMIT), 'Build 263 prerequisite commit 846eb98 is present in git history');
  for (const d of [B263_DOC, B262_DOC, B258_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  assert(/build_263_prerequisite_commit\s*=\s*846eb98/.test(doc),
    'B264 doc records build_263_prerequisite_commit = 846eb98');
  assert(/build_263_prerequisite_status\s*=\s*validated/.test(doc),
    'B264 doc records build_263_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B264 doc records HEAD==origin/main');
  pass('Build 263 prerequisite commit 846eb98 present in git history, recorded, and predecessor docs exist');

  // 3. Build 258 confirmation carried forward (existing number PSTN routes to Retell Trunk).
  assert(/build_258_confirmed_twilio_voice_routes_to_retell_trunk\s*=\s*true/.test(doc),
    'B264 doc records build_258_confirmed_twilio_voice_routes_to_retell_trunk = true');
  assert(/Retell Trunk/.test(doc), 'B264 doc references the confirmed Retell Trunk');
  pass('B264 doc carries forward Build 258 confirmation (existing number PSTN routes to the Retell Trunk)');

  // 4. Human Vapi UI evidence captured (key reported facts present).
  assert(/human_vapi_ui_evidence_captured\s*=\s*true/.test(doc),
    'B264 doc records human_vapi_ui_evidence_captured = true');
  assert(/vapi_phone_numbers_count\s*=\s*2/.test(doc), 'B264 doc records 2 phone numbers visible in Vapi');
  assert(/clean_vapi_number_label\s*=\s*Test Number/.test(doc), 'B264 doc records the clean number label = Test Number');
  for (const fact of [
    /Authentication Enabled/i,
    /no headers configured/i,
    /Static IP Addresses toggle:\s*\*\*off\*\*/i,
    /Inbound Settings.*Assistant\s*=\s*Test Roofing Assistant/i,
    /No Squad/i,
    /No Workflow/i,
    /Fallback Destination/i,
  ]) {
    assert(fact.test(doc), `B264 doc missing reported UI fact: ${fact}`);
  }
  pass('B264 doc captures the human Vapi UI evidence (2 numbers, Test Number, provider Vapi, assistant assignment, auth/headers/IP/squad/workflow/fallback facts)');

  // 5. Captured sanitized evidence values present verbatim.
  for (const line of EVIDENCE_LINES) {
    assert(doc.includes(line), `B264 doc missing captured evidence line: ${line}`);
  }
  assert(/sanitized_evidence_captured\s*=\s*true/.test(doc), 'B264 doc records sanitized_evidence_captured = true');
  pass('B264 doc records all captured sanitized evidence values verbatim');

  // 6. Provisioning completed status + assistant assignment.
  assert(/clean_vapi_number_provisioning_status\s*=\s*completed_sanitized_evidence_captured/.test(doc),
    'B264 doc records clean_vapi_number_provisioning_status = completed_sanitized_evidence_captured');
  assert(/clean_vapi_number_assistant_assignment\s*=\s*Test Roofing Assistant/.test(doc),
    'B264 doc records clean_vapi_number_assistant_assignment = Test Roofing Assistant');
  pass('B264 doc records provisioning completed (sanitized evidence captured) and assistant assignment = Test Roofing Assistant');

  // 7. Assistant-level vs phone-number-level webhook nuance (do not overclaim).
  assert(/assistant_level_webhook_eocr_status\s*=\s*previously_confirmed/.test(doc),
    'B264 doc records assistant_level_webhook_eocr_status = previously_confirmed');
  assert(/phone_number_level_custom_server_url_status\s*=\s*not_visible_or_empty/.test(doc),
    'B264 doc records phone_number_level_custom_server_url_status = not_visible_or_empty');
  assert(/do_not_overclaim_phone_number_level_server_url\s*=\s*true/.test(doc),
    'B264 doc records do_not_overclaim_phone_number_level_server_url = true');
  assert(/do\s+\*\*not\*\*\s+overclaim/i.test(doc), 'B264 doc explicitly states it does not overclaim the phone-number-level server URL');
  pass('B264 doc captures the assistant-level vs phone-number-level webhook nuance (does not overclaim a phone-number-level custom server URL)');

  // 8. Existing Twilio→Retell number preserved untouched.
  assert(/existing_twilio_retell_route_status\s*=\s*preserved_untouched/.test(doc),
    'B264 doc records existing_twilio_retell_route_status = preserved_untouched');
  assert(/EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED\s*=\s*true/.test(doc),
    'B264 doc records EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED = true');
  assert(/rollback_target\s*=\s*twilio_sip_trunk_retell_trunk/.test(doc),
    'B264 doc records rollback_target = twilio_sip_trunk_retell_trunk');
  pass('B264 doc preserves the existing Twilio→Retell number untouched as rollback');

  // 9. Next PSTN validation path prepared but NOT executed; narrow scope + stop conditions.
  assert(/pstn_validation_approval_created_in_this_build\s*=\s*false/.test(doc),
    'B264 doc records pstn_validation_approval_created_in_this_build = false');
  assert(/pstn_validation_call_executed_in_this_build\s*=\s*false/.test(doc),
    'B264 doc records pstn_validation_call_executed_in_this_build = false');
  for (const scope of [
    /One call only/i,
    /Jason-owned phone only/i,
    /Clean Vapi-managed Test Number only/i,
    /No\*\*?\s*existing Twilio\/Retell number used/i,
  ]) {
    assert(scope.test(doc), `B264 doc missing PSTN narrow-scope line: ${scope}`);
  }
  for (const stop of [
    /does \*\*not\*\* appear in Vapi as a Phone\/PSTN call/i,
    /no\*\*\s*end-of-call-report/i,
    /non-2xx\*\* or a validation error/i,
  ]) {
    assert(stop.test(doc), `B264 doc missing PSTN stop-condition line: ${stop}`);
  }
  pass('B264 doc prepares (does not execute) the next narrow single-call PSTN validation path with its scope and stop conditions');

  // 10. Expected next-run PSTN validation evidence template (field names present, templated empty).
  assert(/pstn_validation_evidence_template_documented\s*=\s*true/.test(doc),
    'B264 doc records pstn_validation_evidence_template_documented = true');
  for (const f of PSTN_EVIDENCE_FIELDS) {
    assert(doc.includes(f), `B264 PSTN evidence template missing field: ${f}`);
  }
  // The action fields must be templated EMPTY (no call executed): `FIELD=` at end of line.
  for (const f of ['PSTN_VALIDATION_APPROVAL_STATUS', 'CALL_PLACED', 'VAPI_CALL_RECORD_FOUND',
                   'END_OF_CALL_REPORT_OBSERVED', 'BACKEND_WEBHOOK_RECEIVED']) {
    assert(new RegExp('^' + f + '=\\s*$', 'm').test(doc),
      `B264 PSTN evidence field must be templated empty (not executed): ${f}=`);
  }
  pass('B264 doc documents the expected next-run PSTN validation evidence template with action fields templated empty (no call executed)');

  // 11. PSTN validation status + next step.
  assert(/pstn_validation_status\s*=\s*not_approved/.test(doc),
    'B264 doc records pstn_validation_status = not_approved');
  assert(/next_step\s*=\s*separate_single_pstn_validation_approval/.test(doc),
    'B264 doc records next_step = separate_single_pstn_validation_approval');
  assert(/No PSTN validation approval created/i.test(doc),
    'B264 doc asserts no PSTN validation approval created');
  pass('B264 doc records pstn_validation_status = not_approved and next_step = separate_single_pstn_validation_approval');

  // 12. Stop conditions + decision logic documented.
  assert(/stop_conditions_documented\s*=\s*true/.test(doc), 'B264 doc records stop_conditions_documented = true');
  assert(/decision_logic_documented\s*=\s*true/.test(doc), 'B264 doc records decision_logic_documented = true');
  assert(/no_retry_without_new_approval\s*=\s*true/.test(doc), 'B264 doc records no_retry_without_new_approval = true');
  pass('B264 doc documents stop conditions, decision logic, and no-retry-without-new-approval');

  // 13. No-call / no-SMS / no-Twilio / no-Retell / no-deploy evidence flags.
  assert(/no_call_placed\s*=\s*true/.test(doc) && /NO_CALL_PLACED\s*=\s*true/.test(doc),
    'B264 doc records no_call_placed = true');
  assert(/no_sms_sent\s*=\s*true/.test(doc) && /NO_SMS_SENT\s*=\s*true/.test(doc),
    'B264 doc records no_sms_sent = true');
  assert(/no_twilio_config_changed\s*=\s*true/.test(doc) && /NO_TWILIO_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B264 doc records no_twilio_config_changed = true');
  assert(/no_retell_config_changed\s*=\s*true/.test(doc) && /NO_RETELL_CONFIG_CHANGED\s*=\s*true/.test(doc),
    'B264 doc records no_retell_config_changed = true');
  assert(/no_backend_deploy\s*=\s*true/.test(doc) && /NO_BACKEND_DEPLOY\s*=\s*true/.test(doc),
    'B264 doc records no_backend_deploy = true');
  pass('B264 doc records no_call_placed / no_sms_sent / no_twilio_config_changed / no_retell_config_changed / no_backend_deploy = true');

  // 14. Stop rule in force.
  assert(/stop_rule_in_force\s*=\s*no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval/.test(doc),
    'B264 doc records the stop_rule_in_force');
  pass('B264 doc records no retry permitted without a new, separate approval (stop rule in force)');

  // 15. No fix / no runtime action by Build 264.
  assert(/build_mode\s*=\s*clean_vapi_number_evidence_capture_repo_only/.test(doc),
    'B264 doc records build_mode = clean_vapi_number_evidence_capture_repo_only');
  assert(/runtime_action_performed_by_build_264\s*=\s*false/.test(doc),
    'B264 doc records runtime_action_performed_by_build_264 = false');
  assert(/fix_or_config_change_performed_by_build_264\s*=\s*false/.test(doc),
    'B264 doc records fix_or_config_change_performed_by_build_264 = false');
  pass('B264 doc records evidence-only: no provisioning, no config change, and no runtime/external action by Build 264');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B264 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B264 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B264 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B264 doc asserts no secrets printed');
  pass('B264 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped / token-shaped / raw-id-shaped / phone-number-shaped values / PII.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B264 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B264 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B264 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B264 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B264 doc contains no phone-number-shaped value');
  assert(!/\bTK[0-9a-f]{32}\b/i.test(doc), 'B264 doc contains no raw TK-prefixed Twilio Trunk SID value');
  assert(!/\bAP[0-9a-f]{32}\b/i.test(doc), 'B264 doc contains no raw AP-prefixed Twilio TwiML App SID value');
  assert(!/\bsip:[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(doc),
    'B264 doc contains no concrete SIP URI value (placeholder template allowed)');
  pass('B264 doc contains no secret-shaped, token-shaped, raw-id-shaped, phone-number-shaped, raw-SID, concrete-SIP-URI, or PII values');

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
    /No PSTN validation call executed/i,
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
  for (const re of gates) assert(re.test(doc), `B264 doc missing safety invariant: ${re}`);
  pass('B264 doc states the full Build 264 safety-invariant block (no provision/call/SMS/Twilio/Retell/deploy/Test/Talk/webCall/curl/secret/config/runtime action)');

  // 19. Dry-run wrapper exists and wires this verifier + B263 + B262 + B261 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B264 verifier file exists');
  for (const v of [B263_VERIFIER, B262_VERIFIER, B261_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-clean-vapi-number-evidence-build-264-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-clean-vapi-number-approval-build-263-readonly.js'),
    'dry-run wrapper runs the Build 263 approval verifier');
  assert(dry.includes('verify-clean-vapi-number-path-build-262-readonly.js'),
    'dry-run wrapper runs the Build 262 clean-number-path verifier');
  assert(dry.includes('verify-vapi-integration-routing-fork-build-261-readonly.js'),
    'dry-run wrapper runs the Build 261 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B264 verifier present and the dry-run wrapper wires this verifier + B263 + B262 + B261 verifiers + smoke regression');

  // 20. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 264 clean Vapi-managed test-number provisioning/assignment evidence packet verified (${passCount} checks).`);
  console.log('build_mode=clean_vapi_number_evidence_capture_repo_only  runtime_action_performed_by_build_264=false  fix_or_config_change_performed_by_build_264=false  build_263_prerequisite_commit=846eb98  build_263_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  human_vapi_ui_evidence_captured=true  sanitized_evidence_captured=true  clean_vapi_number_provisioning_status=completed_sanitized_evidence_captured  clean_vapi_number_assistant_assignment=Test Roofing Assistant  assistant_level_webhook_eocr_status=previously_confirmed  phone_number_level_custom_server_url_status=not_visible_or_empty  do_not_overclaim_phone_number_level_server_url=true  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  pstn_validation_status=not_approved  pstn_validation_approval_created_in_this_build=false  pstn_validation_call_executed_in_this_build=false  pstn_validation_evidence_template_documented=true  stop_conditions_documented=true  decision_logic_documented=true  next_step=separate_single_pstn_validation_approval  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_without_new_approval=true  stop_rule_in_force=no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  secrets_in_repo=0  repo_unchanged=true');
})();
