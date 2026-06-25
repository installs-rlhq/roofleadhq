#!/usr/bin/env node
/**
 * Build 196 Read-Only Verifier — Controlled Roofer Pilot One-Message SMS Closeout.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The Build 196 closeout evidence records the successful Jason-operated one-message SMS result as
 *    names/booleans/codes only: pilot_manual_attempt_captured=true, send_attempt_count=1,
 *    sms_was_sent=true, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, retry_performed=false,
 *    no_live_action_during_closeout=true, no_secret_values_recorded=true, no_phone_number_recorded=true,
 *    build_environment_send=false, jason_operated_send=true,
 *    safety_posture=demo_ready_with_live_automation_disabled.
 *  - The preserved manual execution evidence corroborates: 1 attempt, sms_was_sent=true, no retry,
 *    final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, and records no recipient number.
 *  - The launch-readiness summary records local 30/30, mock adapter 30/30, sandbox simulated, the
 *    controlled live SMS to Jason succeeded, the controlled roofer pilot one-message SMS succeeded,
 *    broader automation disabled, and keeps launch pilot-gated (not unrestricted).
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const closeoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-closeout-build-196.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-196.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const priorApprovalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-final-send-approval-build-195-signed.json`;
const priorPreflightPath = `${FIXTURE_DIR}/controlled-roofer-pilot-send-time-preflight-build-195.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_CLOSEOUT_BUILD_196.md';

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

console.log('== Build 196 Controlled Roofer Pilot One-Message SMS Closeout Verification (local-only) ==');

const closeout = readJson(closeoutPath);
const summary = readJson(summaryPath);
const evidence = readJson(evidencePath);
const priorApproval = readJson(priorApprovalPath);
const priorPreflight = readJson(priorPreflightPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Prior Build 195 chain: final approval + send-time preflight as expected ---
if (priorApproval.authorizes_jason_operated_one_message_send !== true) fail('prior Build 195 approval must authorize the Jason-operated one-message send');
if (priorApproval.authorizes_build_environment_send !== false) fail('prior Build 195 approval must NOT authorize a build-environment send');
if (priorPreflight.decision !== 'READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND') fail('prior Build 195 send-time preflight must be READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND');

// --- Build 196 closeout evidence: required markers/booleans/codes ---
if (closeout.build !== 196) fail('closeout build must be 196');
const requiredCloseout = {
  pilot_manual_attempt_captured: true,
  send_attempt_count: 1,
  sms_was_sent: true,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  retry_performed: false,
  no_live_action_during_closeout: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  build_environment_send: false,
  jason_operated_send: true,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseout)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
if (closeout.stop_rollback_owner_label !== 'Jason Lohse') fail('closeout stop/rollback owner must be Jason Lohse');
const ndo = closeout.what_this_closeout_does_not_do || {};
for (const k of ['send_sms', 'construct_twilio_client', 'call_messages_create', 'run_retry', 'make_external_call',
  'contact_any_roofer_or_homeowner', 'use_production_data', 'activate_live_automation',
  'add_public_routes_webhooks_cron_schedulers_dispatchers', 'store_secrets_or_phone_numbers_in_repo_or_chat',
  'authorize_unrestricted_launch']) {
  if (ndo[k] !== false) fail('closeout "does not do" flag must be false: ' + k);
}
pass('build_196_closeout_records_successful_jason_operated_one_message_send_no_live_closeout_action');

// --- Manual execution evidence preserved and corroborates the closeout ---
const evRef = closeout.manual_execution_evidence_reference || {};
if (evRef.evidence_path !== evidencePath) fail('closeout must reference the preserved manual execution evidence path');
if (evRef.preserved_unchanged !== true) fail('closeout must record the manual execution evidence is preserved unchanged');
if (evidence.send_attempt_count !== 1) fail('manual evidence send_attempt_count must be 1');
if (evidence.sms_was_sent !== true) fail('manual evidence sms_was_sent must be true');
if (evidence.auto_retry_performed !== false) fail('manual evidence auto_retry_performed must be false');
if (evidence.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('manual evidence final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (evidence.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('manual evidence gate decision must be CONTROLLED_LIVE_SMS_PERMITTED');
if (evidence.pre_flight_permitted !== true) fail('manual evidence pre_flight_permitted must be true');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('manual evidence must NOT record the recipient number');
if (evidence.reads_secret_values !== false) fail('manual evidence must not read secret values');
if (evidence.real_homeowner_contact !== false) fail('manual evidence must record no real homeowner contact');
pass('build_196_preserved_manual_execution_evidence_corroborates_one_message_sent_no_retry');

// --- Closeout safety attestations: live-action flags false, automation stays disabled ---
const att = closeout.closeout_safety_attestations || {};
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_closeout',
  'network_or_external_call_made', 'real_roofer_contacted_during_closeout', 'real_homeowner_contacted',
  'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'email_call_calendar_crm_automation_added',
  'schema_auth_rls_security_changes'];
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
pass('build_196_closeout_local_only_no_send_no_network_no_secrets');

// --- Launch-readiness summary: lanes + pilot-gated + broader automation disabled ---
if (summary.build !== 196) fail('summary build must be 196');
const lanes = summary.readiness_lanes || {};
const local = lanes.local_suite || {};
if (local.passed !== 30 || local.total !== 30 || local.all_passed !== true) fail('summary local suite must be 30/30 passed');
const mock = lanes.mock_adapter_suite || {};
if (mock.passed !== 30 || mock.total !== 30 || mock.all_passed !== true) fail('summary mock adapter suite must be 30/30 passed');
const sandbox = lanes.sandbox_test_sms || {};
if (sandbox.simulated_safely !== true || sandbox.live_send !== false) fail('summary sandbox lane must be simulated safely (no live send)');
const liveJason = lanes.controlled_live_sms_to_jason || {};
if (liveJason.send_attempt_count !== 1 || liveJason.sms_was_sent !== true || liveJason.retry_performed !== false || liveJason.one_message_succeeded !== true) {
  fail('summary controlled live SMS to Jason lane must record one message succeeded, 1 attempt, no retry');
}
const pilot = lanes.controlled_roofer_pilot_one_message_sms || {};
if (pilot.pilot_manual_attempt_captured !== true) fail('summary pilot lane must record the manual attempt captured');
if (pilot.send_attempt_count !== 1 || pilot.sms_was_sent !== true || pilot.retry_performed !== false) fail('summary pilot lane must record one message sent, 1 attempt, no retry');
if (pilot.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary pilot lane final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (pilot.build_environment_send !== false || pilot.jason_operated_send !== true) fail('summary pilot lane must record Jason-operated send (not build environment)');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (!/expansion_decision/.test(summary.next_step || '')) fail('summary next_step must point at the controlled pilot expansion decision');
pass('build_196_launch_readiness_summary_records_pilot_sms_success_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 196 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|send_attempt_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_196_artifact');

// --- Closeout wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-readonly.js')) fail('wrapper must run the Build 196 verifier');
pass('build_196_closeout_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 196', 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT', 'Jason-operated',
  'no retry', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_196_closeout_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['closeout', closeout], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 196 closes out the Jason-operated controlled roofer pilot one-message SMS (sent=true, 1 attempt, no retry).');
console.log('PASS: Manual execution evidence preserved and corroborates CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT.');
console.log('PASS: Build 196 closeout is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 196 verifier passed (' + passCount + ' assertions).');
