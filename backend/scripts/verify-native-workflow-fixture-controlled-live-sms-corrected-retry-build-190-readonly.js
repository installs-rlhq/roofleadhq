#!/usr/bin/env node
/**
 * Build 190 Read-Only Verifier —
 * Corrected Controlled Live-SMS Retry: signed approval capture, credential revalidation attestation,
 * corrected credential self-check (PASS), corrected pre-flight gate (PERMITTED), and one-message
 * execution evidence (gate-permitted but NOT armable in the build environment; zero send attempts).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner or any actual external/sandbox runner stub.
 *
 * Proves:
 *  - The Build 190 signed approval is granted/signed for EXACTLY ONE attempt, SMS only, retry=0, to
 *    Jason's consenting test identity, and does NOT carry over the consumed Build 184 approval.
 *  - Jason's credential revalidation attestation records the post-186 revalidation as complete,
 *    attributed to his signed statement (the assistant did NOT independently verify secret values).
 *  - The corrected self-check PASSED and the corrected pre-flight gate is PERMITTED with all
 *    preconditions true and no blocked reasons.
 *  - The execution evidence records pre_flight_permitted=true, live send NOT armable in the build
 *    environment (creds/recipient/SDK/confirm-token absent by design), send_attempt_count=0,
 *    sms_was_sent=false, retry_performed=false, twilio_result_metadata=null, no recipient number.
 *  - The single approved attempt is pending Jason's human-operated execution in his controlled env.
 *  - Names/metadata/booleans/codes only; no secret values anywhere; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const attestationPath = `${FIXTURE_DIR}/controlled-live-sms-credential-revalidation-attestation-build-190.json`;
const approvalPath = `${FIXTURE_DIR}/controlled-live-sms-corrected-one-message-approval-signed-build-190.json`;
const selfCheckPath = `${FIXTURE_DIR}/controlled-live-sms-credential-readiness-self-check-result-build-190.json`;
const gatePath = `${FIXTURE_DIR}/controlled-live-sms-corrected-preflight-gate-result-build-190.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence-build-190.json`;
const closeoutPath = `${FIXTURE_DIR}/controlled-live-sms-one-message-build-190-closeout.json`;

const executionRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_CORRECTED_RETRY_BUILD_190.md';

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

console.log('== Build 190 Corrected Controlled Live SMS Retry Verification ==');

const attestation = readJson(attestationPath);
const approval = readJson(approvalPath);
const selfCheck = readJson(selfCheckPath);
const gate = readJson(gatePath);
const evidence = readJson(evidencePath);
const closeout = readJson(closeoutPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
read(executionRunnerPath); // presence only; never executed

// --- Signed approval: granted/signed, exactly one attempt, SMS only, retry=0, no carry-over ---
if (approval.build !== 190) fail('approval build must be 190');
if (approval.status !== 'APPROVAL_SIGNED_AND_GRANTED_ONE_ATTEMPT_ONLY') fail('approval status must be APPROVAL_SIGNED_AND_GRANTED_ONE_ATTEMPT_ONLY');
if (approval.approval_granted !== true || approval.approval_signed !== true) fail('approval must be granted and signed');
if (approval.approval_signed_by !== 'Jason Lohse') fail('approval must be signed by Jason Lohse');
if (approval.approved_channel_only_sms !== true) fail('approval channel must be sms only');
if (approval.approved_one_message_cap_value !== 1) fail('approval one-message cap must be 1');
if (approval.approved_retry_count !== 0 || approval.retry_permitted !== false) fail('approval retry must be 0 and not permitted');
if (approval.authorizes_send_now !== true || approval.authorizes_retry_now !== false) fail('approval must authorize one send now and no retry');
if (approval.approved_recipient_is_real_homeowner !== false) fail('approval recipient must not be a real homeowner');
if (approval.recipient_number_recorded_in_approval !== false) fail('approval must not record a recipient number');
if (approval.reads_secret_values !== false || approval.records_secret_values !== false) fail('approval must not read/record secret values');
if (!approval.supersedes || approval.supersedes.build_184_one_message_approval.carries_over !== false) fail('approval must not carry over consumed Build 184 approval');
for (const k of ['no_retry', 'no_other_channels', 'no_production_data', 'no_real_homeowner_contact',
  'no_billing_payment_quote_invoice_deposit_automation', 'no_public_routes_webhooks_cron_schedulers',
  'no_schema_auth_rls_security_changes', 'no_secret_values_or_recipient_number_logged_or_committed']) {
  if ((approval.approval_explicit_prohibitions || {})[k] !== true) fail('approval prohibition must be true: ' + k);
}
pass('build_190_approval_signed_granted_one_attempt_sms_only_retry_zero_no_carryover');

// --- Revalidation attestation: complete, attributed to Jason's signed statement, not assistant-verified ---
if (attestation.build !== 190) fail('attestation build must be 190');
if (attestation.values_recorded !== false || attestation.names_only !== true || attestation.records_secret_values !== false) fail('attestation must be names-only with no recorded values');
if (attestation.credential_revalidation_complete !== true) fail('attestation must record revalidation complete');
if (attestation.attested_by_name !== 'Jason Lohse') fail('attestation must be by Jason Lohse');
if (attestation.assistant_independently_verified_credential_values !== false) fail('attestation must record assistant did NOT independently verify secret values');
if (attestation.revalidation_performed_in_repo !== false) fail('attestation must record revalidation was not performed in repo');
const rs = attestation.post_build_186_revalidation_state || {};
for (const k of ['credentials_independently_revalidated_after_build_186_authentication_failure',
  'account_sid_auth_token_and_from_number_confirmed_same_active_account',
  'from_number_confirmed_sms_capable_and_authorized_for_destination',
  'revalidation_performed_by_jason_in_controlled_store_never_in_repo']) {
  if (rs[k] !== true) fail('attestation revalidation state must be true: ' + k);
}
for (const name of REQUIRED_LIVE_SMS_CONFIG_NAMES) {
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('config entry is not a bare NAME identifier: ' + name);
}
pass('build_190_revalidation_attested_by_jason_complete_and_not_assistant_verified_names_only');

// --- Corrected self-check PASSED ---
if (selfCheck.build !== 190) fail('self-check build must be 190');
if (selfCheck.self_check_decision !== 'CREDENTIAL_READINESS_SELF_CHECK_PASSED') fail('self-check decision must be PASSED');
if (selfCheck.credential_self_check_passed !== true) fail('self-check passed must be true');
if (selfCheck.all_live_config_names_present !== true) fail('self-check must confirm all names present');
if (selfCheck.credential_revalidation_complete !== true) fail('self-check must record revalidation complete');
if (selfCheck.name_presence_is_not_validity !== true) fail('self-check must still assert name presence is not validity');
if (!Array.isArray(selfCheck.blocked_reasons) || selfCheck.blocked_reasons.length !== 0) fail('self-check must have no blocked reasons');
if (selfCheck.assistant_independently_verified_credential_values !== false) fail('self-check must record assistant did not verify secret values');
if (selfCheck.prior_build_186_authentication_failure.error_code_names_only.code !== 20003 ||
    selfCheck.prior_build_186_authentication_failure.error_code_names_only.status !== 401) {
  fail('self-check must still carry the 20003/401 prior-failure metadata');
}
pass('build_190_corrected_self_check_passed_with_revalidation_complete_and_prior_failure_recorded');

// --- Corrected pre-flight gate PERMITTED with all preconditions and no blocked reasons ---
if (gate.build !== 190) fail('gate build must be 190');
if (gate.gate_decision !== 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED') fail('gate decision must be CORRECTED_PREFLIGHT_PERMITTED');
if (!Array.isArray(gate.blocked_reasons) || gate.blocked_reasons.length !== 0) fail('gate must have no blocked reasons');
if (gate.proposed_retry_count !== 0) fail('gate retry count must be 0');
if (gate.one_message_cap_value !== 1) fail('gate one-message cap must be 1');
if (gate.channel_only_sms !== true || gate.approved_channel_for_controlled_live_test !== 'sms') fail('gate channel must be sms only');
const pc = gate.preconditions || {};
for (const k of ['credential_self_check_passed', 'fresh_one_message_approval_signed',
  'fresh_approval_does_not_carry_over_prior_consumed_approval', 'credential_revalidation_attested_by_jason',
  'one_message_cap_confirmed_value_1', 'recipient_is_jason_own_consenting_test_identity_by_marker',
  'retry_count_is_zero', 'other_live_automation_remains_disabled', 'markers_are_names_only']) {
  if (pc[k] !== true) fail('gate precondition must be true: ' + k);
}
if (gate.live_send_executed_by_this_gate !== false) fail('gate must not have executed a live send');
if (gate.live_send_must_be_executed_by_jason_in_controlled_environment !== true) fail('gate must defer execution to Jason controlled environment');
for (const k of ['performed_external_call', 'performed_external_twilio_call', 'performed_live_action', 'sent_sms', 'reads_secret_values', 'prints_secret_values']) {
  if (gate[k] !== false) fail('gate ' + k + ' must be false');
}
pass('build_190_corrected_preflight_gate_permitted_all_preconditions_true_no_live_action_by_gate');

// --- Execution evidence: permitted, NOT armable in build env, zero attempts, not sent, no retry ---
if (evidence.build !== 190) fail('evidence build must be 190');
if (evidence.pre_flight_permitted !== true) fail('evidence pre_flight_permitted must be true');
if (evidence.live_send_armable_in_build_environment !== false) fail('evidence must record live send NOT armable in build environment');
if (evidence.live_send_armed !== false) fail('evidence live_send_armed must be false');
if (evidence.send_attempt_count !== 0) fail('evidence send_attempt_count must be 0');
if (evidence.sms_was_sent !== false) fail('evidence sms_was_sent must be false');
if (evidence.retry_performed !== false || evidence.auto_retry_performed !== false || evidence.auto_retry_on_failure !== false) fail('evidence must record no retry');
if (evidence.twilio_result_metadata !== null) fail('evidence twilio_result_metadata must be null');
if (evidence.send_error_metadata !== null) fail('evidence send_error_metadata must be null (no attempt made)');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('evidence must not record a recipient number');
if (evidence.channel_only_sms !== true) fail('evidence channel must be sms only');
if (evidence.approved_single_attempt_pending_jason_controlled_execution !== true) fail('evidence must record single attempt pending Jason controlled execution');
const arm = evidence.build_environment_live_send_arming_check_names_only || {};
for (const k of ['TWILIO_LIVE_ACCOUNT_SID_present', 'TWILIO_LIVE_AUTH_TOKEN_present', 'TWILIO_LIVE_FROM_NUMBER_present',
  'CONTROLLED_LIVE_SMS_TO_NUMBER_present', 'CONTROLLED_LIVE_SMS_CONFIRM_token_present', 'twilio_sdk_installed_in_build_environment']) {
  if (arm[k] !== false) fail('build-env arming check must record absent (false): ' + k);
}
for (const k of ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'production_data_used',
  'used_production_supabase', 'real_homeowner_contact', 'channel_expanded_beyond_sms',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'schema_auth_rls_security_changes',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created']) {
  if (evidence[k] !== false) fail('evidence safety attestation must be false: ' + k);
}
if (evidence.other_live_automation_remains_disabled !== true) fail('evidence other_live_automation_remains_disabled must be true');
pass('build_190_execution_evidence_permitted_but_not_armable_zero_attempts_not_sent_no_retry');

// --- Closeout consistent with evidence ---
if (closeout.build !== 190) fail('closeout build must be 190');
if (closeout.gate_decision !== 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED') fail('closeout gate decision must match');
if (closeout.send_attempt_count !== 0 || closeout.sms_was_sent !== false || closeout.retry_performed !== false) fail('closeout must record zero attempts, not sent, no retry');
if (closeout.single_approved_attempt_pending_jason_controlled_execution !== true) fail('closeout must record single attempt pending Jason execution');
if (closeout.live_send_armable_in_build_environment !== false) fail('closeout must record send not armable in build env');
pass('build_190_closeout_consistent_zero_attempts_pending_jason_controlled_execution');

// --- No secret values anywhere in Build 190 artifacts (names/booleans/codes only) ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(attestation), JSON.stringify(approval), JSON.stringify(selfCheck),
  JSON.stringify(gate), JSON.stringify(evidence), JSON.stringify(closeout), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
// No phone-number-shaped strings (E.164 or 10+ consecutive digits) in any artifact.
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(dataArtifactText.replace(/"(?:code|status|build)"\s*:\s*\d+/g, ''))) {
  fail('a phone-number-shaped digit run appears in artifacts');
}
pass('no_secret_values_or_phone_numbers_present_in_any_build_190_artifact');

// --- No false "sms sent" / "armed" / "live action performed" claims anywhere ---
const forbiddenClaims = [
  '"sms_was_sent": true', '"live_send_armed": true', '"live_send_armable_in_build_environment": true',
  '"performed_live_action": true', '"performed_external_twilio_call": true', '"sent_sms": true',
  '"retry_performed": true', '"auto_retry_performed": true', '"send_attempt_count": 1'
];
const combined = dataArtifactText + '\n' + wrapper;
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden send/retry/live-action claim present: ' + claim);
}
pass('no_false_sms_sent_armed_or_live_action_claims_anywhere');

// --- Dry-run wrapper: local-only, runs the verifier; never runs the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('node "$EXEC"') || /node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('wrapper must NOT set the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-readonly.js')) fail('wrapper must run the Build 190 verifier');
pass('build_190_dry_run_wrapper_runs_verifier_only_and_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 190', 'PERMITTED', 'one', 'no retry', 'Jason', 'No SMS', 'controlled environment']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_190_runbook_doc_present_and_labeled');

// --- Safety posture preserved across artifacts + pilot readiness helper ---
for (const [label, obj] of [['attestation', attestation], ['approval', approval], ['selfCheck', selfCheck],
  ['gate', gate], ['evidence', evidence], ['closeout', closeout]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + readiness.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 190 signed approval captured (one attempt, SMS only, retry=0, no carry-over of consumed Build 184 approval).');
console.log('PASS: Jason credential revalidation attested (complete; assistant did not independently verify secret values).');
console.log('PASS: corrected self-check PASSED; corrected pre-flight gate PERMITTED (all preconditions true).');
console.log('PASS: live send PERMITTED at gate but NOT armable in build environment; 0 attempts; not sent; no retry.');
console.log('PASS: single approved attempt pending Jason human-operated execution in his controlled environment.');
console.log('PASS: names/metadata/booleans/codes only; no secret values or phone numbers; safety_status preserved.');
console.log('PASS: Build 190 verifier passed (' + passCount + ' assertions).');
