#!/usr/bin/env node
/**
 * Build 202 Read-Only Verifier — Successful Controlled Pilot Expansion (Option B) Retry Closeout.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The preserved manual execution evidence records the SUCCESSFUL Jason-operated expansion retry send:
 *    send_attempt_count=1, sms_was_sent=true, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT,
 *    twilio_result_metadata present (sid_present=true, status=queued, no error), send_error_metadata=null,
 *    no retry, no recipient number, no secret values.
 *  - The Build 202 closeout captures that outcome (names/booleans/codes only) with
 *    expansion_retry_manual_attempt_captured=true, sms_was_sent=true, send_attempt_count=1,
 *    retry_performed=false, build_environment_send=false, jason_operated_send=true, consumes the fresh
 *    one-time Build 200 approval, and performs no live action.
 *  - The launch-readiness summary records first pilot success, the failed first Option B attempt
 *    (21211/400, approval consumed), destination validation corrected outside the repo, the SUCCESSFUL
 *    expansion retry, broader automation disabled, and that the next step is a real-customer pilot
 *    decision (NOT unrestricted launch).
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const closeoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-retry-closeout-build-202.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-202.json`;
const freshApprovalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-final-send-approval-build-200-signed.json`;
const validationPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-destination-validation-build-200.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-failure-closeout-build-199.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_RETRY_CLOSEOUT_BUILD_202.md';
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';

const OPTION_B = 'B_same_roofer_second_controlled_sms';
const FINAL_DECISION = 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT';
const ROOT_CAUSE = 'recipient_destination_validation_rejection';

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

console.log('== Build 202 Successful Controlled Pilot Expansion (Option B) Retry Closeout Verification (local-only) ==');

const evidence = readJson(evidencePath);
const closeout = readJson(closeoutPath);
const summary = readJson(summaryPath);
const freshApproval = readJson(freshApprovalPath);
const validation = readJson(validationPath);
const priorCloseout = readJson(priorCloseoutPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Preserved manual execution evidence records the SUCCESSFUL send (codes/booleans only) ---
if (evidence.send_attempt_count !== 1) fail('evidence send_attempt_count must be 1');
if (evidence.sms_was_sent !== true) fail('evidence sms_was_sent must be true');
if (evidence.auto_retry_performed !== false) fail('evidence auto_retry_performed must be false');
if (evidence.final_decision !== FINAL_DECISION) fail('evidence final_decision must be ' + FINAL_DECISION);
if (evidence.delivery_was_simulated_or_live !== 'live') fail('evidence delivery_was_simulated_or_live must be live');
if (evidence.send_error_metadata !== null) fail('evidence send_error_metadata must be null (successful send)');
const trm = evidence.twilio_result_metadata || {};
if (trm.sid_present !== true) fail('evidence twilio_result_metadata.sid_present must be true');
if (trm.error_code !== null) fail('evidence twilio_result_metadata.error_code must be null');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('evidence must not record recipient number');
if (evidence.secret_values_printed_logged_or_committed !== false) fail('evidence must not commit secret values');
if (evidence.reads_secret_values !== false) fail('evidence reads_secret_values must be false');
if (evidence.real_homeowner_contact !== false) fail('evidence real_homeowner_contact must be false');
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('evidence safety_status must be preserved');
pass('build_202_manual_execution_evidence_preserved_records_successful_one_message_send_no_retry');

// --- Build 202 closeout: required names/booleans/codes ---
if (closeout.build !== 202) fail('closeout build must be 202');
const requiredCloseout = {
  expansion_option: OPTION_B,
  expansion_retry_manual_attempt_captured: true,
  send_attempt_count: 1,
  sms_was_sent: true,
  final_decision: FINAL_DECISION,
  exit_status: 0,
  retry_performed: false,
  no_live_action_during_closeout: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  build_environment_send: false,
  jason_operated_send: true,
  is_retry_of_failed_first_option_b_attempt: true,
  is_retry_of_consumed_approval: false,
  ran_under_fresh_build_200_signed_approval: true,
  destination_validation_corrected_outside_repo: true,
  addressed_prior_failure_error_code: 21211,
  addressed_prior_failure_error_status: 400,
  fresh_approval_consumed: true,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseout)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
if (closeout.send_error_metadata !== null) fail('closeout send_error_metadata must be null (successful send)');
if (closeout.manual_evidence_preserved !== true) fail('closeout must record manual evidence preserved');
if (closeout.manual_evidence_unmodified_by_closeout !== true) fail('closeout must record manual evidence unmodified by closeout');
if (closeout.next_step_is_unrestricted_launch !== false) fail('closeout next_step_is_unrestricted_launch must be false');
if (closeout.next_step_is_real_customer_pilot_decision !== true) fail('closeout next step must be a real-customer pilot decision');
if (closeout.launch_status !== 'pilot_gated_not_unrestricted') fail('closeout launch_status must be pilot_gated_not_unrestricted');
if (closeout.manual_execution_evidence_reference !== evidencePath) fail('closeout must reference the preserved manual execution evidence');
pass('build_202_closeout_captures_successful_expansion_retry_consumes_fresh_approval_no_live_action');

// --- The successful retry ran under the fresh Build 200 approval after the failed Build 199 attempt ---
if (freshApproval.build !== 200) fail('fresh approval build must be 200');
if (freshApproval.is_fresh_signed_approval !== true || freshApproval.is_retry_of_consumed_approval !== false) fail('fresh approval must be a fresh signed approval, not a retry of consumed approval');
if (freshApproval.max_message_count !== 1 || freshApproval.retry_allowed !== false) fail('fresh approval must be one message, no retry');
if (freshApproval.authorizes_build_environment_send !== false) fail('fresh approval must not authorize build-environment send');
if (validation.destination_validated_or_corrected_outside_repo !== true) fail('destination validation marker must record correction outside repo');
if (validation.addresses_root_cause_class !== ROOT_CAUSE) fail('validation must address the destination-validation root cause');
if (priorCloseout.sms_was_sent !== false || priorCloseout.error_code !== 21211) fail('Build 199 closeout must record the failed first attempt (21211)');
if (priorCloseout.approval_consumed !== true) fail('Build 199 closeout must record the prior approval consumed');
pass('build_202_confirms_retry_ran_under_fresh_build_200_approval_after_failed_build_199_attempt');

// --- Safety attestations on the closeout ---
const att = closeout.closeout_safety_attestations;
if (!att) fail('closeout missing safety attestations');
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'schema_auth_rls_security_changes'];
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
pass('build_202_closeout_local_only_no_send_no_network_no_retry_no_secrets');

// --- Launch-readiness summary records the successful retry + keeps launch pilot-gated ---
if (summary.build !== 202) fail('summary build must be 202');
const lanes = summary.readiness_lanes || {};
const firstPilot = lanes.first_controlled_roofer_pilot_one_message_sms || {};
if (firstPilot.sms_was_sent !== true || firstPilot.final_decision !== FINAL_DECISION) fail('summary must record the first controlled roofer pilot succeeded');
if (firstPilot.first_controlled_roofer_pilot_succeeded !== true) fail('summary must mark first pilot succeeded');
const firstAttempt = lanes.controlled_pilot_expansion_option_b_first_attempt || {};
if (firstAttempt.sms_was_sent !== false || firstAttempt.error_code !== 21211 || firstAttempt.error_status !== 400) fail('summary must preserve the failed first Option B attempt (21211/400)');
if (firstAttempt.approval_consumed !== true) fail('summary first attempt approval_consumed must be true');
const valLane = lanes.controlled_pilot_expansion_destination_validation || {};
if (valLane.destination_validated_or_corrected_outside_repo !== true) fail('summary must record destination validated outside repo');
if (valLane.destination_value_recorded !== false) fail('summary validation lane must not record destination value');
const retryLane = lanes.controlled_pilot_expansion_retry_send || {};
if (retryLane.send_attempt_count !== 1) fail('summary retry lane send_attempt_count must be 1');
if (retryLane.sms_was_sent !== true) fail('summary retry lane sms_was_sent must be true');
if (retryLane.final_decision !== FINAL_DECISION) fail('summary retry lane final_decision must be ' + FINAL_DECISION);
if (retryLane.retry_performed !== false) fail('summary retry lane retry_performed must be false');
if (retryLane.build_environment_send !== false) fail('summary retry lane build_environment_send must be false');
if (retryLane.jason_operated_send !== true) fail('summary retry lane jason_operated_send must be true');
if (retryLane.controlled_pilot_expansion_retry_succeeded !== true) fail('summary must mark the expansion retry succeeded');
const narrative = summary.narrative || {};
for (const k of ['first_controlled_roofer_pilot_succeeded', 'option_b_expansion_initially_failed_21211_400',
  'destination_validation_corrected_outside_repo', 'expansion_retry_succeeded',
  'broader_live_automation_remains_disabled', 'next_step_is_real_customer_pilot_decision_not_unrestricted_launch']) {
  if (narrative[k] !== true) fail('summary narrative must record: ' + k);
}
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.next_step_is_real_customer_pilot_decision !== true) fail('summary next step must be a real-customer pilot decision');
pass('build_202_launch_readiness_summary_records_successful_retry_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 202 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|error_code|error_status|exit_status|addressed_prior_failure_error_code|addressed_prior_failure_error_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_202_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-readonly.js')) fail('wrapper must run the Build 202 verifier');
pass('build_202_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke the live runner or messages.create ---
const selfText = read('backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
if (!fs.existsSync(fullPath(liveRunnerPath))) fail('expected existing fail-closed live runner to remain present: ' + liveRunnerPath);
pass('build_202_verifier_is_read_only_does_not_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 202', FINAL_DECISION, 'Option B', '21211', 'no retry', 'destination validation',
  'expansion retry', 'real-customer pilot decision', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_202_closeout_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['evidence', evidence], ['closeout', closeout], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 202 preserves the successful Option B expansion retry manual execution evidence (1 attempt, SMS sent, no retry).');
console.log('PASS: Closeout consumes the fresh one-time Build 200 approval and records no live action during closeout.');
console.log('PASS: Retry ran under the fresh Build 200 signed approval after the failed Build 199 attempt (21211/400), with destination validated outside the repo.');
console.log('PASS: Next step = real-customer pilot decision with explicit per-attempt approval (NOT unrestricted launch).');
console.log('PASS: Build 202 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 202 verifier passed (' + passCount + ' assertions).');
