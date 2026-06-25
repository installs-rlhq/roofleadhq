#!/usr/bin/env node
/**
 * Build 199 Read-Only Verifier — Controlled Pilot Expansion (Option B) Failure Closeout + Diagnosis.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The preserved manual execution evidence records the failed Option B attempt: send_attempt_count=1,
 *    sms_was_sent=false, final_decision=CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY,
 *    send_error_metadata.code=21211 / status=400, no retry, no recipient number, no secret values.
 *  - The Build 199 closeout captures that outcome (names/booleans/codes only), consumes the one-time
 *    approval, and performs no live action.
 *  - The Build 199 diagnosis derives root_cause_class=recipient_destination_validation_rejection from
 *    metadata only, rules out the specified false leads, and requires destination validation + a fresh
 *    signed approval before any further attempt (NOT a retry of the consumed approval).
 *  - The launch-readiness summary records first pilot success, the Option B failed attempt (21211/400,
 *    no retry, approval consumed), broader automation disabled, and keeps launch pilot-gated.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const closeoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-failure-closeout-build-199.json`;
const diagnosisPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-failure-diagnosis-build-199.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-199.json`;
const approvalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-final-send-approval-build-198-signed.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_FAILURE_CLOSEOUT_BUILD_199.md';
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';

const OPTION_B = 'B_same_roofer_second_controlled_sms';
const FINAL_DECISION = 'CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY';
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

console.log('== Build 199 Controlled Pilot Expansion (Option B) Failure Closeout + Diagnosis Verification (local-only) ==');

const evidence = readJson(evidencePath);
const closeout = readJson(closeoutPath);
const diagnosis = readJson(diagnosisPath);
const summary = readJson(summaryPath);
const approval = readJson(approvalPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Preserved manual execution evidence records the failed attempt (codes/booleans only) ---
if (evidence.send_attempt_count !== 1) fail('evidence send_attempt_count must be 1');
if (evidence.sms_was_sent !== false) fail('evidence sms_was_sent must be false');
if (evidence.auto_retry_performed !== false) fail('evidence auto_retry_performed must be false');
if (evidence.final_decision !== FINAL_DECISION) fail('evidence final_decision must be ' + FINAL_DECISION);
if (evidence.twilio_result_metadata !== null) fail('evidence twilio_result_metadata must be null (no send)');
const sem = evidence.send_error_metadata || {};
if (sem.code !== 21211) fail('evidence send_error_metadata.code must be 21211');
if (sem.status !== 400) fail('evidence send_error_metadata.status must be 400');
if (sem.name !== 'Error') fail('evidence send_error_metadata.name must be Error');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('evidence must not record recipient number');
if (evidence.secret_values_printed_logged_or_committed !== false) fail('evidence must not commit secret values');
if (evidence.real_homeowner_contact !== false) fail('evidence real_homeowner_contact must be false');
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('evidence safety_status must be preserved');
pass('build_199_manual_execution_evidence_preserved_records_failed_attempt_21211_no_retry');

// --- Build 199 closeout: required names/booleans/codes ---
if (closeout.build !== 199) fail('closeout build must be 199');
const requiredCloseout = {
  expansion_option: OPTION_B,
  manual_attempt_captured: true,
  send_attempt_count: 1,
  sms_was_sent: false,
  final_decision: FINAL_DECISION,
  error_code: 21211,
  error_status: 400,
  retry_performed: false,
  approval_consumed: true,
  no_live_action_during_closeout: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseout)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
if (closeout.manual_evidence_preserved !== true) fail('closeout must record manual evidence preserved');
if (closeout.next_step_is_unrestricted_launch !== false) fail('closeout next_step_is_unrestricted_launch must be false');
if (closeout.launch_status !== 'pilot_gated_not_unrestricted') fail('closeout launch_status must be pilot_gated_not_unrestricted');
pass('build_199_closeout_captures_failed_option_b_attempt_consumes_approval_no_live_action');

// --- Build 199 diagnosis: metadata-only root cause + ruled-out + next step ---
if (diagnosis.build !== 199) fail('diagnosis build must be 199');
if (diagnosis.root_cause_class !== ROOT_CAUSE) fail('diagnosis root_cause_class must be ' + ROOT_CAUSE);
if (diagnosis.likely_issue !== 'approved destination value/format/carrier/reachability rejected by Twilio') fail('diagnosis likely_issue mismatch');
if (diagnosis.diagnosis_is_metadata_only !== true) fail('diagnosis must be metadata-only');
if (diagnosis.destination_value_recorded !== false) fail('diagnosis must not record destination value');
const om = diagnosis.observed_metadata_only || {};
if (om.error_code !== 21211 || om.error_status !== 400) fail('diagnosis observed metadata must be 21211/400');
const ro = diagnosis.ruled_out || {};
for (const k of ['missing_gate', 'missing_approval', 'missing_credential_presence', 'retry_loop',
  'homeowner_contact', 'production_data', 'secret_leak']) {
  if (ro[k] !== true) fail('diagnosis must rule out: ' + k);
}
if (diagnosis.next_step_requires_destination_validation_first !== true) fail('diagnosis next step must require destination validation first');
if (diagnosis.next_step_requires_fresh_signed_approval !== true) fail('diagnosis next step must require a fresh signed approval');
if (diagnosis.next_step_is_retry_of_consumed_approval !== false) fail('diagnosis next step must NOT be a retry of the consumed approval');
if (diagnosis.next_step_is_unrestricted_launch !== false) fail('diagnosis next step must not be unrestricted launch');
pass('build_199_diagnosis_metadata_only_destination_validation_rejection_rules_out_false_leads');

// --- Approval was consumed (one-time, no further send under it) ---
if (approval.selected_option !== OPTION_B) fail('approval selected_option must be ' + OPTION_B);
if (approval.max_message_count !== 1 || approval.retry_allowed !== false) fail('approval must be one message, no retry');
if (approval.authorizes_build_environment_send !== false) fail('approval must not authorize build-environment send');
pass('build_199_consumed_approval_was_one_time_one_message_no_retry_not_build_send');

// --- Safety attestations across closeout + diagnosis ---
const attBlocks = [
  ['closeout', closeout.closeout_safety_attestations],
  ['diagnosis', diagnosis.diagnosis_safety_attestations]
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
pass('build_199_closeout_and_diagnosis_local_only_no_send_no_network_no_retry_no_secrets');

// --- Launch-readiness summary records the failed Option B attempt + keeps launch pilot-gated ---
if (summary.build !== 199) fail('summary build must be 199');
const lanes = summary.readiness_lanes || {};
const firstPilot = lanes.first_controlled_roofer_pilot_one_message_sms || {};
if (firstPilot.sms_was_sent !== true || firstPilot.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary must record the first controlled roofer pilot succeeded');
if (firstPilot.first_controlled_roofer_pilot_succeeded !== true) fail('summary must mark first pilot succeeded');
const attempt = lanes.controlled_pilot_expansion_option_b_attempt || {};
if (attempt.send_attempt_count !== 1) fail('summary expansion attempt send_attempt_count must be 1');
if (attempt.sms_was_sent !== false) fail('summary expansion attempt sms_was_sent must be false');
if (attempt.final_decision !== FINAL_DECISION) fail('summary expansion attempt final_decision must be ' + FINAL_DECISION);
if (attempt.error_code !== 21211 || attempt.error_status !== 400) fail('summary expansion attempt must record 21211/400');
if (attempt.retry_performed !== false) fail('summary expansion attempt retry_performed must be false');
if (attempt.approval_consumed !== true) fail('summary expansion attempt approval_consumed must be true');
const diagLane = lanes.controlled_pilot_expansion_failure_diagnosis || {};
if (diagLane.root_cause_class !== ROOT_CAUSE) fail('summary diagnosis lane root_cause_class must be ' + ROOT_CAUSE);
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.next_step_is_destination_validation_plus_fresh_approval !== true) fail('summary next step must be destination validation + fresh approval');
if (summary.next_step_is_retry_of_consumed_approval !== false) fail('summary next step must not be retry of consumed approval');
pass('build_199_launch_readiness_summary_records_failed_attempt_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 199 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(diagnosis), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|error_code|error_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_199_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-readonly.js')) fail('wrapper must run the Build 199 verifier');
pass('build_199_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke the live runner or messages.create ---
const selfText = read('backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
if (!fs.existsSync(fullPath(liveRunnerPath))) fail('expected existing fail-closed live runner to remain present: ' + liveRunnerPath);
pass('build_199_verifier_is_read_only_does_not_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 199', FINAL_DECISION, 'Option B', ROOT_CAUSE, '21211', 'no retry',
  'destination validation', 'fresh', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_199_closeout_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['evidence', evidence], ['closeout', closeout], ['diagnosis', diagnosis], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 199 preserves the failed Option B manual execution evidence (21211/400, 1 attempt, no retry).');
console.log('PASS: Closeout consumes the one-time expansion approval and records no live action.');
console.log('PASS: Diagnosis = ' + ROOT_CAUSE + ' from metadata only; false leads ruled out.');
console.log('PASS: Next step = Jason validates destination + fresh signed approval (NOT a retry, NOT unrestricted launch).');
console.log('PASS: Build 199 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 199 verifier passed (' + passCount + ' assertions).');
