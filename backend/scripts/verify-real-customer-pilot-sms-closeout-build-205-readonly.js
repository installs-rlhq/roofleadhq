#!/usr/bin/env node
/**
 * Build 205 Read-Only Verifier — Real-Customer Pilot One-Message SMS Closeout.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - The Build 205 closeout fixture captures the SUCCESSFUL Jason-operated real-customer pilot one-message
 *    SMS using names/booleans/codes only: real_customer_pilot_manual_attempt_captured=true, sms_was_sent=true,
 *    send_attempt_count=1, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, retry_performed=false,
 *    no_live_action_during_closeout=true, no_secret_values_recorded=true, no_phone_number_recorded=true,
 *    build_environment_send=false, jason_operated_send=true, homeowner_contact_authorized=false,
 *    unrestricted_launch=false, safety_posture=demo_ready_with_live_automation_disabled.
 *  - The manual execution evidence is preserved (referenced + snapshotted) and records the successful send.
 *  - The launch-readiness summary records the four controlled-send successes (Jason number, first roofer
 *    pilot, expansion retry, real-customer pilot), no homeowner contact authorized, broader automation
 *    disabled, and that the next step is post-pilot observation/customer feedback — NOT unrestricted launch.
 *  - The Build 205 closeout/runbook doc and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const closeoutPath = `${FIXTURE_DIR}/real-customer-pilot-sms-closeout-build-205.json`;
const preservedPath = `${FIXTURE_DIR}/real-customer-pilot-one-message-execution-evidence-preserved-build-205.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-205.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-204.json`;
const consentPath = `${FIXTURE_DIR}/real-customer-pilot-consent-readiness-build-204.json`;
const approvalPath = `${FIXTURE_DIR}/real-customer-pilot-final-one-message-approval-build-204-signed.json`;
const preflightPath = `${FIXTURE_DIR}/real-customer-pilot-send-time-preflight-build-204.json`;
const wrapperPath = 'scripts/run-real-customer-pilot-sms-closeout-build-205-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_SMS_CLOSEOUT_BUILD_205.md';

const FINAL_DECISION = 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT';

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

console.log('== Build 205 Real-Customer Pilot One-Message SMS Closeout Verification (local-only) ==');

const closeout = readJson(closeoutPath);
const preserved = readJson(preservedPath);
const evidence = readJson(evidencePath);
const summary = readJson(summaryPath);
const priorSummary = readJson(priorSummaryPath);
const consent = readJson(consentPath);
const approval = readJson(approvalPath);
const preflight = readJson(preflightPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Closeout fixture: exact required booleans/codes from the build spec ---
if (closeout.build !== 205) fail('closeout fixture build must be 205');
const requiredCloseout = {
  real_customer_pilot_manual_attempt_captured: true,
  sms_was_sent: true,
  send_attempt_count: 1,
  final_decision: FINAL_DECISION,
  retry_performed: false,
  no_live_action_during_closeout: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  build_environment_send: false,
  jason_operated_send: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseout)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
pass('build_205_closeout_records_successful_real_customer_pilot_one_message_send_names_booleans_codes_only');

// --- Closeout fixture: local-only attestations + correct gate/preflight/exit + no retry ---
const requiredCloseoutFlags = {
  gate_decision_before_execution: 'CONTROLLED_LIVE_SMS_PERMITTED',
  pre_flight_permitted: true,
  exit_status: 0,
  auto_retry_on_failure: false,
  auto_retry_performed: false,
  ran_under_build_204_signed_approval: true,
  build_204_approval_consumed: true,
  no_network_or_external_call_during_closeout: true,
  no_twilio_call_during_closeout: true,
  no_retry_during_closeout: true,
  no_sid_or_token_recorded: true,
  production_data_used: false,
  real_roofer_contacted_during_closeout: false,
  real_homeowner_contacted: false,
  manual_evidence_preserved: true,
  manual_evidence_unmodified_by_closeout: true,
  next_step_is_unrestricted_launch: false,
  next_step_is_post_pilot_observation_customer_feedback: true,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredCloseoutFlags)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
if (closeout.manual_execution_evidence_reference !== evidencePath) fail('closeout must reference the canonical manual execution evidence');
if (closeout.preserved_execution_evidence_reference !== preservedPath) fail('closeout must reference the preserved evidence snapshot');
if (closeout.signed_approval_reference !== approvalPath) fail('closeout must reference the Build 204 signed approval');
pass('build_205_closeout_is_local_only_under_build_204_signed_approval_no_send_no_network_no_retry');

// --- Closeout safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = closeout.closeout_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('closeout missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
pass('build_205_closeout_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Manual execution evidence preserved + records the successful send ---
if (evidence.sms_was_sent !== true) fail('manual execution evidence must record sms_was_sent=true');
if (evidence.send_attempt_count !== 1) fail('manual execution evidence must record send_attempt_count=1');
if (evidence.auto_retry_performed !== false) fail('manual execution evidence must record auto_retry_performed=false');
if (evidence.final_decision !== FINAL_DECISION) fail('manual execution evidence final_decision must be ' + FINAL_DECISION);
if (evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must not record a recipient number');
pass('build_205_manual_execution_evidence_preserved_records_successful_one_message_send_no_number');

// --- Preserved snapshot mirrors the success without secrets/numbers ---
if (preserved.build !== 205) fail('preserved snapshot build must be 205');
const requiredPreserved = {
  sms_was_sent: true,
  send_attempt_count: 1,
  retry_performed: false,
  final_decision: FINAL_DECISION,
  build_environment_send: false,
  jason_operated_send: true,
  homeowner_contact_authorized: false,
  recipient_number_recorded_in_evidence: false,
  reads_secret_values: false,
  production_data_used: false,
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredPreserved)) {
  if (preserved[k] !== v) fail('preserved snapshot ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(preserved[k]) + ')');
}
if (preserved.captured_from_reference !== evidencePath) fail('preserved snapshot must reference the canonical evidence file');
pass('build_205_preserved_evidence_snapshot_mirrors_success_names_booleans_codes_only');

// --- Build 204 packet preserved (reference integrity) ---
if (approval.approval_signed !== true || approval.authorizes_jason_operated_one_message_send !== true) fail('Build 204 signed approval must be preserved');
if (approval.authorizes_build_environment_send !== false || approval.authorizes_homeowner_contact !== false || approval.authorizes_unrestricted_launch !== false) {
  fail('Build 204 approval must keep build/homeowner/unrestricted NOT authorized');
}
if (consent.build !== 204) fail('Build 204 consent fixture must be preserved');
if (preflight.decision !== 'READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND') fail('Build 204 preflight decision must be preserved');
if (priorSummary.build !== 204) fail('prior summary must be build 204');
pass('build_205_references_build_204_signed_approval_consent_preflight');

// --- Launch-readiness summary: four successes + narrative + pilot-gated next step ---
if (summary.build !== 205) fail('summary build must be 205');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
if ((lanes.first_controlled_roofer_pilot_one_message_sms || {}).first_controlled_roofer_pilot_succeeded !== true) fail('summary must record first controlled roofer pilot succeeded');
if ((lanes.controlled_pilot_expansion_retry_send || {}).controlled_pilot_expansion_retry_succeeded !== true) fail('summary must record controlled expansion retry succeeded');
const rcpLane = lanes.real_customer_pilot_one_message_sms || {};
if (rcpLane.real_customer_pilot_one_message_sms_succeeded !== true) fail('summary must record real-customer pilot one-message SMS succeeded');
if (rcpLane.send_attempt_count !== 1 || rcpLane.sms_was_sent !== true || rcpLane.retry_performed !== false) fail('summary real-customer pilot lane must record 1 send, sent, no retry');
if (rcpLane.final_decision !== FINAL_DECISION) fail('summary real-customer pilot lane final_decision must be ' + FINAL_DECISION);
if (rcpLane.build_environment_send !== false || rcpLane.jason_operated_send !== true) fail('summary real-customer pilot lane must record Jason-operated, not build-env');
if (rcpLane.homeowner_contact_authorized !== false) fail('summary real-customer pilot lane must record homeowner contact not authorized');
const narrative = summary.narrative || {};
for (const k of ['controlled_live_sms_to_jason_succeeded', 'first_controlled_roofer_pilot_succeeded',
  'controlled_expansion_retry_succeeded', 'real_customer_pilot_one_message_sms_succeeded',
  'no_homeowner_contact_authorized', 'broader_live_automation_remains_disabled',
  'next_step_is_post_pilot_observation_and_customer_feedback_not_unrestricted_launch']) {
  if (narrative[k] !== true) fail('summary narrative must record: ' + k);
}
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'crm_sync_automation_enabled', 'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.next_step_is_post_pilot_observation_customer_feedback !== true) fail('summary next step must be post-pilot observation/customer feedback');
pass('build_205_launch_readiness_summary_records_four_successes_keeps_launch_pilot_gated_next_step_observation');

// --- No secret values / phone numbers anywhere in Build 205 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(preserved), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_205_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-real-customer-pilot-sms-closeout-build-205-readonly.js')) fail('wrapper must run the Build 205 verifier');
pass('build_205_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-real-customer-pilot-sms-closeout-build-205-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_205_verifier_is_read_only_does_not_send');

// --- Closeout/runbook doc present and labeled with required markers ---
for (const needle of ['Build 205', FINAL_DECISION, 'real-customer pilot', 'one message', 'no retry',
  'Jason', 'homeowner', 'post-pilot observation', 'customer feedback', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_205_closeout_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['closeout', closeout], ['preserved', preserved], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 205 closes out the SUCCESSFUL Jason-operated real-customer pilot one-message SMS (1 attempt, sent, no retry).');
console.log('PASS: Manual execution evidence preserved (referenced + snapshotted); no recipient number, SID, token, or secret value recorded.');
console.log('PASS: Summary records all four controlled-send successes; next step = post-pilot observation/customer feedback, NOT unrestricted launch.');
console.log('PASS: Build 205 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 205 verifier passed (' + passCount + ' assertions).');
