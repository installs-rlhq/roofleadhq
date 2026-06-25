#!/usr/bin/env node
/**
 * Build 200 Read-Only Verifier — Corrected Destination Validation + Fresh Expansion Approval/Preflight.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no destination/phone numbers,
 * no production data, no live activation, no SMS, no external Twilio call, no retry, no real contacts.
 * Does NOT invoke the live execution runner; does NOT construct a Twilio client; does NOT call
 * messages.create.
 *
 * Proves:
 *  - The Build 200 destination validation marker records that Jason validated/corrected the approved
 *    destination OUTSIDE the repo (names/booleans/codes only), addresses root_cause_class
 *    recipient_destination_validation_rejection, and does NOT store/inspect/print the destination value.
 *  - The Build 200 fresh signed approval is a NEW one-time, one-message, no-retry, Jason-operated
 *    approval (NOT a retry of the consumed Build 198 approval), gated on destination validation, and
 *    does NOT authorize a build-environment send.
 *  - The Build 200 send-time preflight evaluates to
 *    READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION with
 *    send_attempt_count=0, no live send, and is not a retry of the consumed approval.
 *  - The launch-readiness summary records the destination validation, fresh approval, and ready
 *    preflight, keeps broader automation disabled, and keeps launch pilot-gated.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const validationPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-destination-validation-build-200.json`;
const approvalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-final-send-approval-build-200-signed.json`;
const preflightPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-send-time-preflight-build-200.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-200.json`;
const priorApprovalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-final-send-approval-build-198-signed.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-failure-closeout-build-199.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_DESTINATION_VALIDATION_APPROVAL_BUILD_200.md';
const runbookPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_JASON_OPERATED_SEND_COMMAND_RUNBOOK_BUILD_200.md';
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';

const OPTION_B = 'B_same_roofer_second_controlled_sms';
const ROOT_CAUSE = 'recipient_destination_validation_rejection';
const PREFLIGHT_DECISION = 'READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION';
const VALIDATION_STATUS = 'validated_or_corrected_outside_repo_in_jason_controlled_environment';

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

console.log('== Build 200 Corrected Destination Validation + Fresh Expansion Approval/Preflight Verification (local-only) ==');

const validation = readJson(validationPath);
const approval = readJson(approvalPath);
const preflight = readJson(preflightPath);
const summary = readJson(summaryPath);
const priorApproval = readJson(priorApprovalPath);
const priorCloseout = readJson(priorCloseoutPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
const runbook = read(runbookPath);

// --- Destination validation marker: corrected/validated outside repo, value NOT stored ---
if (validation.build !== 200) fail('validation build must be 200');
const requiredValidation = {
  destination_validated_or_corrected_outside_repo: true,
  destination_validation_status: VALIDATION_STATUS,
  destination_validation_done_in_jason_controlled_environment_only: true,
  addresses_root_cause_class: ROOT_CAUSE,
  prior_failure_error_code: 21211,
  prior_failure_error_status: 400,
  corrected_destination_ready_for_jason_operated_send: true,
  corrected_destination_supplied_in_jason_shell_only: true,
  destination_value_recorded: false,
  destination_value_inspected_by_build: false,
  destination_value_printed_or_committed: false,
  phone_number_recorded: false,
  next_step_requires_fresh_signed_approval: true,
  next_step_is_retry_of_consumed_approval: false,
  next_step_is_unrestricted_launch: false,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredValidation)) {
  if (validation[k] !== v) fail('validation ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(validation[k]) + ')');
}
pass('build_200_destination_validation_marker_corrected_outside_repo_value_not_stored');

// --- Fresh signed approval: new one-time, one-message, no-retry, Jason-operated, gated on validation ---
if (approval.build !== 200) fail('approval build must be 200');
const requiredApproval = {
  selected_option: OPTION_B,
  is_fresh_signed_approval: true,
  is_retry_of_consumed_approval: false,
  prior_build_198_approval_consumed: true,
  destination_validation_confirmed_before_approval: true,
  approval_signed: true,
  authorizes_jason_operated_one_message_send: true,
  authorizes_build_environment_send: false,
  sms_only: true,
  max_message_count: 1,
  retry_allowed: false,
  homeowner_contact_allowed: false,
  production_data_allowed: false,
  approved_destination_number_recorded: false,
  same_consenting_test_roofer_only: true,
  additional_roofer_added: false,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredApproval)) {
  if (approval[k] !== v) fail('approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(approval[k]) + ')');
}
if (approval.destination_validation_marker_reference !== validationPath) fail('approval must reference the Build 200 destination validation marker');
if (approval.what_this_approval_does_not_authorize.retry_of_consumed_build_198_approval !== false) fail('approval must not authorize retry of consumed Build 198 approval');
pass('build_200_fresh_signed_approval_one_time_one_message_no_retry_not_build_send_gated_on_validation');

// --- Prior Build 198 approval was consumed by the failed Build 199 attempt ---
if (priorApproval.build !== 198) fail('prior approval build must be 198');
if (priorCloseout.approval_consumed !== true) fail('Build 199 closeout must record the prior approval consumed');
if (priorCloseout.sms_was_sent !== false || priorCloseout.error_code !== 21211) fail('Build 199 closeout must record the failed 21211 attempt');
pass('build_200_confirms_prior_build_198_approval_consumed_by_failed_attempt');

// --- Send-time preflight: READY_FOR_..._RETRY_AFTER_DESTINATION_VALIDATION, no live action ---
if (preflight.build !== 200) fail('preflight build must be 200');
const requiredPreflight = {
  selected_option: OPTION_B,
  decision: PREFLIGHT_DECISION,
  destination_validation_confirmed: true,
  send_attempt_count: 0,
  sms_sent: false,
  live_send_executed_by_build: false,
  live_send_armed_by_build: false,
  no_network_external_action: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  is_retry_of_consumed_approval: false,
  is_fresh_one_time_approval: true,
  launch_status: 'pilot_gated_not_unrestricted',
  next_step_is_unrestricted_launch: false,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredPreflight)) {
  if (preflight[k] !== v) fail('preflight ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(preflight[k]) + ')');
}
const pin = preflight.preflight_inputs || {};
if (pin.destination_validation_confirmed !== true) fail('preflight inputs must confirm destination validation');
if (pin.fresh_final_send_approval_signed !== true) fail('preflight inputs must record fresh signed approval');
if (pin.is_fresh_approval_not_retry_of_consumed_approval !== true) fail('preflight inputs must mark fresh approval, not retry of consumed approval');
if (pin.max_message_count !== 1 || pin.retry_allowed !== false) fail('preflight inputs must be one message, no retry');
if (preflight.destination_validation_marker_reference !== validationPath) fail('preflight must reference the destination validation marker');
if (preflight.fresh_final_send_approval_reference !== approvalPath) fail('preflight must reference the fresh signed approval');
pass('build_200_send_time_preflight_ready_for_jason_operated_one_message_retry_after_validation_no_live_action');

// --- Safety attestations across validation + approval + preflight ---
const attBlocks = [
  ['validation', validation.destination_validation_safety_attestations],
  ['approval', approval.final_send_approval_safety_attestations],
  ['preflight', preflight.send_time_preflight_safety_attestations]
];
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'schema_auth_rls_security_changes'];
for (const [label, att] of attBlocks) {
  if (!att) fail(label + ' missing safety attestations');
  for (const k of mustBeFalse) {
    if (att[k] !== false) fail(label + ' safety attestation must be false: ' + k);
  }
  if (att.other_live_automation_remains_disabled !== true) fail(label + ' other_live_automation_remains_disabled must be true');
}
pass('build_200_validation_approval_preflight_local_only_no_send_no_network_no_retry_no_secrets');

// --- Launch-readiness summary records validation + fresh approval + ready preflight, stays pilot-gated ---
if (summary.build !== 200) fail('summary build must be 200');
const lanes = summary.readiness_lanes || {};
const valLane = lanes.controlled_pilot_expansion_destination_validation || {};
if (valLane.destination_validated_or_corrected_outside_repo !== true) fail('summary must record destination validated outside repo');
if (valLane.destination_value_recorded !== false) fail('summary validation lane must not record destination value');
if (valLane.addresses_root_cause_class !== ROOT_CAUSE) fail('summary validation lane must address the destination-validation root cause');
const apprLane = lanes.controlled_pilot_expansion_fresh_approval || {};
if (apprLane.is_fresh_signed_approval !== true || apprLane.is_retry_of_consumed_approval !== false) fail('summary must record a fresh signed approval, not a retry');
if (apprLane.max_message_count !== 1 || apprLane.retry_allowed !== false) fail('summary fresh approval lane must be one message, no retry');
const preLane = lanes.controlled_pilot_expansion_send_time_preflight || {};
if (preLane.decision !== PREFLIGHT_DECISION) fail('summary preflight lane decision must be ' + PREFLIGHT_DECISION);
if (preLane.send_attempt_count !== 0 || preLane.sms_sent !== false) fail('summary preflight lane must record no live send');
const attemptLane = lanes.controlled_pilot_expansion_option_b_attempt || {};
if (attemptLane.sms_was_sent !== false || attemptLane.error_code !== 21211 || attemptLane.approval_consumed !== true) fail('summary must preserve the failed Option B attempt context');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.next_step_is_jason_operated_one_message_retry_after_destination_validation !== true) fail('summary next step must be Jason-operated one-message retry after destination validation');
if (summary.next_step_is_retry_of_consumed_approval !== false) fail('summary next step must not be retry of consumed approval');
if (summary.jason_operated_expansion_retry_ready !== true) fail('summary must mark the Jason-operated expansion retry ready');
pass('build_200_launch_readiness_summary_records_validation_fresh_approval_ready_preflight_keeps_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 200 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(validation), JSON.stringify(approval), JSON.stringify(preflight), JSON.stringify(summary), doc, runbook].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|error_code|error_status|prior_failure_error_code|prior_failure_error_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_200_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-readonly.js')) fail('wrapper must run the Build 200 verifier');
pass('build_200_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke the live runner or messages.create ---
const selfText = read('backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
if (!fs.existsSync(fullPath(liveRunnerPath))) fail('expected existing fail-closed live runner to remain present: ' + liveRunnerPath);
pass('build_200_verifier_is_read_only_does_not_send');

// --- Doc + runbook present and labeled with required markers ---
for (const needle of ['Build 200', PREFLIGHT_DECISION, 'Option B', ROOT_CAUSE, '21211', 'destination validation',
  'fresh', 'no retry', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
for (const needle of ['Build 200', 'Jason', 'one message', 'no retry', 'CONTROLLED_LIVE_SMS_CONFIRM',
  'CONTROLLED_LIVE_SMS_TO_NUMBER', 'demo_ready_with_live_automation_disabled']) {
  if (!runbook.includes(needle)) fail('runbook missing required marker: ' + needle);
}
pass('build_200_doc_and_jason_operated_runbook_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['validation', validation], ['approval', approval], ['preflight', preflight], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 200 records corrected destination validation OUTSIDE the repo (value not stored).');
console.log('PASS: Fresh one-time, one-message, no-retry, Jason-operated approval captured (NOT a retry of the consumed Build 198 approval).');
console.log('PASS: Send-time preflight = ' + PREFLIGHT_DECISION + ' with no live action.');
console.log('PASS: Build 200 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Jason-operated expansion retry is ready (separate Jason-operated send outside the repo).');
console.log('PASS: Build 200 verifier passed (' + passCount + ' assertions).');
