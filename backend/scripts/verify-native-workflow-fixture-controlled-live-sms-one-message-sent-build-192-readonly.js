#!/usr/bin/env node
/**
 * Build 192 Read-Only Verifier — Controlled Live SMS One-Message Sent Closeout (local-only).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The preserved manual execution evidence records the successful one-message result:
 *    gate PERMITTED, send_attempt_count=1, sms_was_sent=true, no retry, recipient number NOT
 *    recorded, no secret values recorded.
 *  - The Build 192 closeout fixture captures that result using names/booleans/codes only, with the
 *    required closeout booleans (manual_attempt_captured, send_attempt_count, sms_was_sent,
 *    final_decision, retry_performed, no_live_action_during_closeout, no_secret_values_recorded,
 *    no_recipient_number_recorded, safety_posture).
 *  - The launch-readiness summary records local 30/30, mock adapter 30/30, sandbox test SMS
 *    simulated safely, controlled live SMS one message succeeded, all broader live automation
 *    disabled, and next step = controlled live roofer pilot readiness (not unrestricted launch).
 *  - The dry-run/closeout wrapper is local-only and never arms or runs a live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const closeoutPath = `${FIXTURE_DIR}/controlled-live-sms-one-message-build-192-closeout.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-192.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT_BUILD_192.md';

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

console.log('== Build 192 Controlled Live SMS One-Message Sent Closeout Verification (local-only) ==');

const evidence = readJson(evidencePath);
const closeout = readJson(closeoutPath);
const summary = readJson(summaryPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Preserved manual execution evidence records the successful one-message result ---
if (evidence.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('evidence gate decision must be CONTROLLED_LIVE_SMS_PERMITTED');
if (evidence.pre_flight_permitted !== true) fail('evidence pre_flight_permitted must be true');
if (evidence.send_attempt_count !== 1) fail('evidence send_attempt_count must be 1');
if (evidence.sms_was_sent !== true) fail('evidence sms_was_sent must be true');
if (evidence.auto_retry_performed !== false) fail('evidence auto_retry_performed must be false');
if (evidence.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('evidence final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('evidence must NOT record the recipient number');
if (evidence.reads_secret_values !== false) fail('evidence reads_secret_values must be false');
if (evidence.secret_values_printed_logged_or_committed !== false) fail('evidence must not print/log/commit secret values');
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('evidence safety_status must be preserved');
pass('build_192_preserved_manual_evidence_records_permitted_one_attempt_sent_no_retry_no_secrets');

// --- Build 192 closeout fixture: required booleans/codes only ---
if (closeout.build !== 192) fail('closeout build must be 192');
const requiredCloseout = {
  manual_attempt_captured: true,
  send_attempt_count: 1,
  sms_was_sent: true,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  retry_performed: false,
  no_live_action_during_closeout: true,
  no_secret_values_recorded: true,
  no_recipient_number_recorded: true,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseout)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
if (closeout.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('closeout gate decision must be CONTROLLED_LIVE_SMS_PERMITTED');
if (closeout.auto_retry_performed !== false) fail('closeout auto_retry_performed must be false');
if (closeout.one_time_approval_consumed !== true) fail('closeout one_time_approval_consumed must be true');
if (closeout.execution_evidence_path !== evidencePath) fail('closeout must point at the preserved execution evidence');
const att = closeout.closeout_safety_attestations || {};
for (const k of ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'recipient_number_recorded_in_evidence',
  'production_data_used', 'used_production_supabase', 'real_homeowner_contact', 'channel_expanded_beyond_sms',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'schema_auth_rls_security_changes']) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
for (const k of ['contacted_only_approved_test_identity', 'other_live_automation_remains_disabled',
  'no_network_call_during_closeout', 'no_twilio_client_constructed_during_closeout', 'no_messages_create_called_during_closeout']) {
  if (att[k] !== true) fail('closeout safety attestation must be true: ' + k);
}
pass('build_192_closeout_fixture_captures_result_names_booleans_codes_only');

// --- Launch-readiness summary reflects the lanes ---
if (summary.build !== 192) fail('summary build must be 192');
const lanes = summary.readiness_lanes || {};
if (!lanes.local_suite || lanes.local_suite.passed !== 30 || lanes.local_suite.total !== 30 || lanes.local_suite.all_passed !== true) fail('summary local suite must be 30/30 passed');
if (!lanes.mock_adapter_suite || lanes.mock_adapter_suite.passed !== 30 || lanes.mock_adapter_suite.total !== 30 || lanes.mock_adapter_suite.all_passed !== true) fail('summary mock adapter suite must be 30/30 passed');
if (!lanes.sandbox_test_sms || lanes.sandbox_test_sms.simulated_safely !== true || lanes.sandbox_test_sms.live_send !== false) fail('summary sandbox test SMS must be simulated safely with no live send');
const live = lanes.controlled_live_sms || {};
if (live.send_attempt_count !== 1 || live.sms_was_sent !== true || live.retry_performed !== false || live.one_message_succeeded !== true) {
  fail('summary controlled live SMS lane must record one message succeeded, 1 attempt, no retry');
}
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.next_step !== 'controlled_live_roofer_pilot_readiness_not_unrestricted_launch') fail('summary next_step must be controlled live roofer pilot readiness, not unrestricted launch');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.safety_status !== 'demo_ready_with_live_automation_disabled') fail('summary safety_status must be preserved');
pass('build_192_launch_readiness_summary_records_all_lanes_and_next_step');

// --- No secret values / phone numbers anywhere in Build 192 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(dataArtifactText.replace(/"(?:code|status|build|passed|total)"\s*:\s*\d+/g, ''))) {
  fail('a phone-number-shaped digit run appears in artifacts');
}
pass('no_secret_values_or_phone_numbers_present_in_any_build_192_artifact');

// --- Dry-run/closeout wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('wrapper must NOT set the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-readonly.js')) fail('wrapper must run the Build 192 verifier');
pass('build_192_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 192', 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT', 'send_attempt_count', 'no retry',
  'controlled live roofer pilot readiness', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_192_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
if (closeout.safety_status !== 'demo_ready_with_live_automation_disabled') fail('closeout safety_status must be demo_ready_with_live_automation_disabled');
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 192 preserves the manual one-message execution evidence (PERMITTED, 1 attempt, sent, no retry).');
console.log('PASS: Build 192 closeout + launch-readiness summary capture the result using names/booleans/codes only.');
console.log('PASS: Build 192 is local-only — no live action, no network, no SMS, no retry; one-time approval consumed.');
console.log('PASS: next step is controlled live roofer pilot readiness (not unrestricted launch); broader automation disabled.');
console.log('PASS: Build 192 verifier passed (' + passCount + ' assertions).');
