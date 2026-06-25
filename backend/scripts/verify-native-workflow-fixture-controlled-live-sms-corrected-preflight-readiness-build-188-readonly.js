#!/usr/bin/env node
/**
 * Build 188 Read-Only Verifier —
 * Corrected Live-SMS Credential-Readiness Self-Check + Corrected One-Message Pre-Flight Gate
 * + Fresh Unsigned Approval Capture Template.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no real contacts. Does NOT invoke the live execution
 * runner, the pre-186 readiness gate runner, or any actual external/sandbox runner stub.
 *
 * Proves:
 *  - The corrected credential-readiness self-check is FAIL-CLOSED and BLOCKED in Build 188 because
 *    the live credential VALUES have not been independently revalidated after the Build 186
 *    authentication failure (401 / 20003) — name presence alone is explicitly insufficient.
 *  - The corrected one-message pre-flight gate is FAIL-CLOSED and BLOCKED unless ALL of: the
 *    self-check passes, a FRESH approval is signed, the one-message cap is confirmed at 1, the
 *    recipient is Jason's consenting test identity by marker, the retry count is zero, and other
 *    live automation remains disabled. In Build 188 it is BLOCKED (self-check not passed + approval
 *    unsigned).
 *  - The fresh approval capture template exists but is UNSIGNED / NOT GRANTED / NOT APPROVED and
 *    does NOT carry over the consumed Build 184 or prior Build 187 approval/template.
 *  - Runners carry no env/network/live-service/send surface and create no route/webhook/cron/
 *    scheduler/dispatcher.
 *  - Names/metadata/booleans only; no secret values anywhere; the demo safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const revalidationMarkerPath = `${FIXTURE_DIR}/controlled-live-sms-credential-revalidation-marker.json`;
const selfCheckResultPath = `${FIXTURE_DIR}/controlled-live-sms-credential-readiness-self-check-result.json`;
const gateResultPath = `${FIXTURE_DIR}/controlled-live-sms-corrected-preflight-gate-result.json`;
const freshTemplatePath = `${FIXTURE_DIR}/controlled-live-sms-corrected-one-message-retry-approval-build-188-template.json`;
const provisioningMarkerPath = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;

const selfCheckRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-credential-readiness-self-check.js';
const gateRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-gate.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_READINESS_BUILD_188.md';

const REQUIRED_LIVE_SMS_CONFIG_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function fullPath(rel) { return path.join(root, rel); }
function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }
function isExecutable(rel) {
  try { fs.accessSync(fullPath(rel), fs.constants.X_OK); return true; } catch { return false; }
}

console.log('== Build 188 Corrected Live SMS Pre-Flight Readiness Verification ==');

const revalMarker = readJson(revalidationMarkerPath);
const selfCheck = readJson(selfCheckResultPath);
const gate = readJson(gateResultPath);
const template = readJson(freshTemplatePath);
const provisioning = readJson(provisioningMarkerPath);
const selfCheckRunnerSrc = read(selfCheckRunnerPath);
const gateRunnerSrc = read(gateRunnerPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Credential self-check is FAIL-CLOSED and BLOCKED in Build 188 ---
if (selfCheck.build !== 188) fail('self-check build must be 188');
if (selfCheck.self_check_decision !== 'CREDENTIAL_READINESS_SELF_CHECK_BLOCKED') fail('self-check decision must be BLOCKED');
if (selfCheck.credential_self_check_passed !== false) fail('credential_self_check_passed must be false');
if (selfCheck.all_live_config_names_present !== true) fail('self-check should confirm all NAMES present (presence is necessary)');
if (selfCheck.credential_revalidation_complete !== false) fail('credential revalidation must be incomplete in Build 188');
if (selfCheck.name_presence_is_not_validity !== true) fail('self-check must assert name presence is not validity');
if (!Array.isArray(selfCheck.blocked_reasons) || selfCheck.blocked_reasons.length === 0) fail('self-check must list blocked_reasons');
if (!selfCheck.blocked_reasons.some((r) => r.includes('credentials_independently_revalidated_after_build_186_authentication_failure'))) {
  fail('self-check must block on missing post-186 revalidation');
}
if (selfCheck.prior_build_186_authentication_failure.observed !== true) fail('self-check must observe the Build 186 auth failure');
if (selfCheck.prior_build_186_authentication_failure.error_code_names_only.code !== 20003 ||
    selfCheck.prior_build_186_authentication_failure.error_code_names_only.status !== 401) {
  fail('self-check must carry the 20003/401 metadata (names/codes only)');
}
pass('credential_self_check_is_fail_closed_blocked_names_present_but_values_not_revalidated_after_401');

// --- Revalidation marker is names/booleans only and records NO revalidation yet ---
if (revalMarker.values_recorded !== false || revalMarker.names_only !== true || revalMarker.records_secret_values !== false) {
  fail('revalidation marker must be names-only with no recorded values');
}
const presence = revalMarker.live_config_name_presence_only || {};
for (const name of REQUIRED_LIVE_SMS_CONFIG_NAMES) {
  if (presence[name] !== true) fail('revalidation marker must record NAME presence for ' + name);
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('config entry is not a bare NAME identifier: ' + name);
}
const reval = revalMarker.post_build_186_revalidation_state || {};
for (const k of ['credentials_independently_revalidated_after_build_186_authentication_failure',
  'account_sid_auth_token_and_from_number_confirmed_same_active_account',
  'from_number_confirmed_sms_capable_and_authorized_for_destination',
  'revalidation_performed_by_jason_in_controlled_store_never_in_repo']) {
  if (reval[k] !== false) fail('revalidation state must be false (not yet revalidated): ' + k);
}
if (revalMarker.name_presence_is_not_validity !== true) fail('revalidation marker must assert name presence is not validity');
pass('revalidation_marker_is_names_booleans_only_and_records_no_post_186_revalidation_yet');

// --- Corrected pre-flight gate is FAIL-CLOSED and BLOCKED with the right preconditions ---
if (gate.build !== 188) fail('gate build must be 188');
if (gate.gate_decision !== 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED') fail('gate decision must be CORRECTED_PREFLIGHT_BLOCKED');
if (gate.supersedes_pre_186_readiness_gate !== true) fail('gate must supersede the pre-186 readiness gate');
const pc = gate.preconditions || {};
if (pc.credential_self_check_passed !== false) fail('gate precondition credential_self_check_passed must be false in Build 188');
if (pc.fresh_one_message_approval_signed !== false) fail('gate precondition fresh approval signed must be false in Build 188');
// The remaining preconditions are independently satisfied and must be encoded as true.
for (const k of ['fresh_approval_does_not_carry_over', 'one_message_cap_confirmed_value_1',
  'recipient_is_jason_own_consenting_test_identity_by_marker', 'retry_count_is_zero',
  'other_live_automation_remains_disabled', 'markers_are_names_only']) {
  if (pc[k] !== true) fail('gate precondition must be encoded true: ' + k);
}
if (gate.proposed_retry_count !== 0) fail('gate must record proposed_retry_count of 0');
if (gate.one_message_cap_value !== 1) fail('gate must record one_message_cap_value of 1');
if (!Array.isArray(gate.blocked_reasons) || gate.blocked_reasons.length === 0) fail('gate must list blocked_reasons');
if (!gate.blocked_reasons.includes('credential_readiness_self_check_not_passed')) fail('gate must block on self-check not passed');
if (!gate.blocked_reasons.includes('fresh_one_message_approval_not_signed')) fail('gate must block on unsigned fresh approval');
pass('corrected_preflight_gate_is_fail_closed_blocked_on_selfcheck_and_unsigned_approval_with_other_preconditions_encoded');

// --- Gate + self-check performed nothing live: no send, no external/twilio call, no secret values ---
for (const obj of [selfCheck, gate]) {
  for (const k of ['performed_external_call', 'performed_external_twilio_call', 'performed_live_action', 'sent_sms', 'reads_secret_values', 'prints_secret_values']) {
    if (obj[k] !== false) fail('artifact ' + k + ' must be false');
  }
  if (obj.inspects_config_names_and_booleans_only !== true) fail('artifact must inspect config names/booleans only');
}
if (gate.invoked_actual_external_sandbox_runner_stub !== false) fail('gate must not invoke the actual external/sandbox runner stub');
pass('self_check_and_gate_sent_nothing_made_no_external_twilio_call_and_read_no_secret_values');

// --- Channel is SMS only; recipient is Jason's consenting test identity by marker ---
if (gate.approved_channel_for_controlled_live_test !== 'sms' || gate.channel_only_sms !== true) fail('channel must be sms only');
if (gate.recipient_identity_label !== 'Jason Lohse / Test Roofing (own consenting test identity)') fail('recipient must be Jason own consenting test identity by marker');
const reqs = Array.isArray(gate.requires_before_any_corrected_live_sms) ? gate.requires_before_any_corrected_live_sms : [];
for (const needle of ['corrected_credential_readiness_self_check_passes_after_build_186_failure',
  'fresh_explicit_signed_one_message_controlled_live_sms_approval_build_188_template',
  'retry_count_zero_no_retry_loop']) {
  if (!reqs.includes(needle)) fail('gate future-requirements must include: ' + needle);
}
pass('channel_sms_only_recipient_jason_consenting_test_identity_and_future_requires_signed_approval_and_revalidation');

// --- Fresh approval capture template exists but is UNSIGNED / NOT GRANTED / NOT APPROVED ---
if (template.build !== 188) fail('fresh template build must be 188');
if (template.status !== 'TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED') fail('fresh template status must be TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED');
for (const k of ['approval_granted', 'approval_signed', 'authorizes_send_now', 'authorizes_retry_now', 'reads_secret_values', 'records_secret_values']) {
  if (template[k] !== false) fail('fresh template ' + k + ' must be false');
}
for (const k of ['approval_signed_by', 'approval_signed_date_time', 'approval_signature']) {
  if (template[k] !== null) fail('fresh template ' + k + ' must be null (unsigned)');
}
const sb = template.signature_block_leave_blank_until_a_future_approved_build || {};
for (const k of ['approved_by_name', 'one_message_scope_string', 'credentials_revalidated_confirmation', 'date_time_with_zone', 'signature']) {
  if (sb[k] !== '') fail('fresh template signature block field must be blank: ' + k);
}
if (template.proposed_retry_count !== 0) fail('fresh template proposed_retry_count must be 0');
if (template.proposed_one_message_cap_value !== 1) fail('fresh template one-message cap must be 1');
// Must NOT carry over the consumed Build 184 approval or the prior Build 187 template.
const sup = template.supersedes || {};
if (!sup.build_184_one_message_approval || sup.build_184_one_message_approval.carries_over !== false) fail('fresh template must not carry over Build 184 approval');
if (!sup.build_187_corrected_retry_approval_template || sup.build_187_corrected_retry_approval_template.carries_over !== false) fail('fresh template must not carry over Build 187 template');
pass('fresh_one_message_approval_template_present_but_unsigned_not_granted_and_does_not_carry_over');

// --- Runner sources: no env, no network, no live-service clients, no live send verbs ---
const forbiddenClientPatterns = [
  'process.env',
  "require('http')", 'require("http")',
  "require('https')", 'require("https")',
  "require('net')", 'require("net")',
  "require('dns')", 'require("dns")',
  "require('twilio')", 'require("twilio")',
  "require('@supabase", 'require("@supabase',
  "require('googleapis')", 'require("googleapis")',
  'createClient(',
  'new Twilio',
  'fetch(',
  'XMLHttpRequest',
  'http://',
  'https://'
];
for (const src of [selfCheckRunnerSrc, gateRunnerSrc]) {
  for (const needle of forbiddenClientPatterns) {
    if (src.includes(needle)) fail('runner must not reference: ' + needle);
  }
}
pass('runners_have_no_env_network_or_live_service_client_surface');

const forbiddenLiveVerbs = ['.messages.create', '.calls.create', '.emails.send', '.events.insert', 'sendMessage(', 'placeCall('];
for (const src of [selfCheckRunnerSrc, gateRunnerSrc]) {
  for (const verb of forbiddenLiveVerbs) {
    if (src.includes(verb)) fail('runner must not contain live send/call/book verb: ' + verb);
  }
}
pass('runners_have_no_live_send_call_or_booking_verbs');

// --- No public route / webhook / cron / scheduler / dispatcher introduced ---
const forbiddenInfra = ['app.get(', 'app.post(', 'router.get(', 'router.post(', 'express(', 'createServer(', 'cron.schedule(', 'new CronJob', 'setInterval(', 'webhook'];
for (const src of [selfCheckRunnerSrc, gateRunnerSrc]) {
  for (const needle of forbiddenInfra) {
    if (src.includes(needle)) fail('runner must not introduce route/webhook/cron/scheduler/dispatcher: ' + needle);
  }
}
pass('no_public_route_webhook_cron_scheduler_or_dispatcher_in_runners');

// --- Dry-run wrapper: local-only, runs self-check + gate (expect BLOCKED) + verifier; no live/actual-stub runners ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('run-native-workflow-fixture-controlled-live-sms-one-message-execution.js')) fail('wrapper must NOT run the live execution runner');
if (wrapper.includes('run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) fail('wrapper must NOT run the actual external/sandbox runner stub');
if (!wrapper.includes('run-native-workflow-fixture-controlled-live-sms-credential-readiness-self-check.js')) fail('wrapper must run the Build 188 self-check');
if (!wrapper.includes('run-native-workflow-fixture-controlled-live-sms-corrected-preflight-gate.js')) fail('wrapper must run the Build 188 gate');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-readonly.js')) fail('wrapper must run the Build 188 verifier');
pass('dry_run_wrapper_runs_build_188_selfcheck_gate_and_verifier_and_no_live_or_actual_stub_runner');

// --- No secret values anywhere in Build 188 DATA artifacts (names/booleans/codes only) ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(revalMarker), JSON.stringify(selfCheck), JSON.stringify(gate), JSON.stringify(template), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
pass('no_secret_values_present_in_any_build_188_artifact_names_codes_booleans_only');

// --- No live/external/send/approval activation claimed in Build 188 artifacts ---
const forbiddenClaims = [
  '"sent_sms": true', '"performed_external_call": true', '"performed_external_twilio_call": true', '"performed_live_action": true',
  '"credential_self_check_passed": true', '"approval_granted": true', '"approval_signed": true',
  '"authorizes_send_now": true', '"authorizes_retry_now": true',
  '"gate_decision": "CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED"',
  '"self_check_decision": "CREDENTIAL_READINESS_SELF_CHECK_PASSED"'
];
const combined = dataArtifactText + '\n' + wrapper + '\n' + selfCheckRunnerSrc + '\n' + gateRunnerSrc;
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden live/send/approval activation claim present: ' + claim);
}
pass('no_live_external_send_or_approval_activation_claimed_anywhere');

// --- Doc present and labeled BLOCKED with required sections ---
if (!doc.includes('CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED')) fail('doc must reference CORRECTED_PREFLIGHT_BLOCKED');
for (const needle of ['Build 188', 'credential', 'self-check', 'one-message', 'STOP', 'Jason', 'revalidat']) {
  if (!doc.includes(needle)) fail('doc missing required section/marker: ' + needle);
}
if (doc.includes('No SMS') === false && doc.includes('no SMS') === false) fail('doc must state no SMS is sent in Build 188');
pass('build_188_runbook_doc_present_and_blocked_labeled');

// --- Safety posture preserved across artifacts + pilot readiness helper ---
// Build 188 artifacts must each carry the preserved safety posture. (The pre-existing provisioning
// marker is a names-only readiness marker without a safety_status field and is intentionally excluded.)
for (const [label, obj] of [['revalMarker', revalMarker], ['selfCheck', selfCheck], ['gate', gate], ['template', template]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + readiness.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 188 corrected credential self-check verified (FAIL-CLOSED / BLOCKED; values not revalidated after 401).');
console.log('PASS: Build 188 corrected one-message pre-flight gate verified (FAIL-CLOSED / BLOCKED; self-check + signed approval required).');
console.log('PASS: fresh one-message approval template present but unsigned/not granted; no carry-over of consumed approvals.');
console.log('PASS: names/metadata/booleans only; no secret values; no SMS sent; no external Twilio call; retry count zero.');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled.');
console.log('PASS: Build 188 verifier passed (' + passCount + ' assertions).');
