#!/usr/bin/env node
/**
 * Build 204 Read-Only Verifier — Real-Customer Pilot Consent/Readiness + Final One-Message Approval/Preflight Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - The Build 204 consent/readiness fixture records the required consent markers: real-roofer/customer
 *    consent present, approved destination marker present (no number recorded), STOP/opt-out finalized,
 *    homeowner contact NOT authorized, SMS-only, max 1 message, no retry, no production automation, no
 *    unrestricted launch, and no live action.
 *  - The final signed one-message approval authorizes a Jason-operated one-message send ONLY:
 *    approval_signed=true, authorizes_jason_operated_one_message_send=true,
 *    authorizes_build_environment_send=false, authorizes_homeowner_contact=false,
 *    authorizes_unrestricted_launch=false.
 *  - The send-time preflight gate is READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND with
 *    send_attempt_count=0, sms_sent=false, live_send_executed_by_build=false, no_network_external_action=true,
 *    no_secret_values_recorded=true, no_phone_number_recorded=true.
 *  - The launch-readiness summary records the three controlled-send successes, the captured consent markers,
 *    the signed approval, the READY preflight, and that the next step is a Jason-operated one-message send
 *    (NOT unrestricted launch); broader automation disabled.
 *  - The Jason-operated command runbook is present and documents the existing fail-closed runner, the
 *    deliberate confirm token (names only), exactly one run, and no retry — without arming anything.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const consentPath = `${FIXTURE_DIR}/real-customer-pilot-consent-readiness-build-204.json`;
const approvalPath = `${FIXTURE_DIR}/real-customer-pilot-final-one-message-approval-build-204-signed.json`;
const preflightPath = `${FIXTURE_DIR}/real-customer-pilot-send-time-preflight-build-204.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-204.json`;
const priorDecisionPath = `${FIXTURE_DIR}/real-customer-pilot-decision-build-203.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-203.json`;
const wrapperPath = 'scripts/run-real-customer-pilot-consent-build-204-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_CONSENT_BUILD_204.md';
const runbookPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_JASON_OPERATED_ONE_MESSAGE_SEND_COMMAND_RUNBOOK_BUILD_204.md';

const PREFLIGHT_DECISION = 'READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND';

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

console.log('== Build 204 Real-Customer Pilot Consent/Readiness + Final One-Message Approval/Preflight Verification (local-only) ==');

const consent = readJson(consentPath);
const approval = readJson(approvalPath);
const preflight = readJson(preflightPath);
const summary = readJson(summaryPath);
const priorDecision = readJson(priorDecisionPath);
const priorSummary = readJson(priorSummaryPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
const runbook = read(runbookPath);

// --- Consent / readiness markers (exact required set from the build spec) ---
if (consent.build !== 204) fail('consent fixture build must be 204');
const markers = consent.consent_readiness_markers || {};
const requiredMarkers = {
  real_roofer_customer_consent_marker_present: true,
  approved_destination_marker_present: true,
  approved_destination_number_recorded: false,
  stop_opt_out_language_finalized: true,
  homeowner_contact_authorized: false,
  sms_only: true,
  max_message_count: 1,
  retry_allowed: false,
  production_automation_allowed: false,
  unrestricted_launch: false
};
for (const [k, v] of Object.entries(requiredMarkers)) {
  if (markers[k] !== v) fail('consent marker ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(markers[k]) + ')');
}
pass('build_204_consent_readiness_markers_present_sms_only_one_message_no_retry_no_homeowner_no_production_automation');

// --- Consent fixture: no live action + outside-repo capture ---
const requiredConsentFlags = {
  consent_captured_outside_repo: true,
  approved_destination_identified_outside_repo: true,
  approved_destination_value_recorded_in_repo: false,
  consent_values_recorded_in_repo: false,
  no_live_action_during_capture: true,
  no_network_or_external_call_during_capture: true,
  no_twilio_call_during_capture: true,
  no_retry_during_capture: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  next_step_is_unrestricted_launch: false,
  next_step_is_jason_operated_one_message_real_customer_pilot_send: true,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredConsentFlags)) {
  if (consent[k] !== v) fail('consent fixture ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(consent[k]) + ')');
}
pass('build_204_consent_capture_is_local_only_outside_repo_no_number_no_live_action');

// --- Final signed one-message approval (exact required set from the build spec) ---
if (approval.build !== 204) fail('approval fixture build must be 204');
const requiredApproval = {
  approval_signed: true,
  authorizes_jason_operated_one_message_send: true,
  authorizes_build_environment_send: false,
  authorizes_homeowner_contact: false,
  authorizes_unrestricted_launch: false,
  recipient_number_recorded: false,
  secret_values_recorded: false,
  sid_or_token_recorded: false,
  no_live_action_by_this_approval: true,
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredApproval)) {
  if (approval[k] !== v) fail('approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(approval[k]) + ')');
}
if (approval.signed_by_label !== 'Jason Lohse') fail('approval signed_by_label must be Jason Lohse');
const apprScope = approval.approved_scope || {};
const requiredApprScope = {
  max_message_count: 1,
  retry_allowed: false,
  channel_only_sms: true,
  jason_operated_send_only: true,
  build_environment_send: false,
  homeowner_contact_authorized: false,
  production_automation_allowed: false,
  unrestricted_launch: false
};
for (const [k, v] of Object.entries(requiredApprScope)) {
  if (apprScope[k] !== v) fail('approval approved_scope ' + k + ' must be ' + JSON.stringify(v));
}
const mustFalse = approval.must_remain_false_in_this_build || {};
for (const k of Object.keys(mustFalse)) {
  if (mustFalse[k] !== false) fail('approval must_remain_false_in_this_build.' + k + ' must be false');
}
if (approval.consent_readiness_reference !== consentPath) fail('approval must reference the consent/readiness fixture');
pass('build_204_final_one_message_approval_signed_authorizes_jason_operated_send_only_not_build_not_homeowner_not_unrestricted');

// --- Send-time preflight gate (exact required set from the build spec) ---
if (preflight.build !== 204) fail('preflight fixture build must be 204');
const requiredPreflight = {
  decision: PREFLIGHT_DECISION,
  send_attempt_count: 0,
  sms_sent: false,
  live_send_executed_by_build: false,
  no_network_external_action: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  confirm_token_armed_by_build: false,
  jason_operated_send_only: true,
  build_environment_send: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredPreflight)) {
  if (preflight[k] !== v) fail('preflight ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(preflight[k]) + ')');
}
if (preflight.existing_fail_closed_runner_reference !== 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js') {
  fail('preflight must reference the existing fail-closed one-message runner');
}
if (preflight.signed_approval_reference !== approvalPath) fail('preflight must reference the signed approval');
const pre = preflight.preflight_preconditions_recorded || {};
for (const [k, v] of Object.entries({
  real_roofer_customer_consent_marker_present: true,
  approved_destination_marker_present: true,
  approved_destination_number_recorded: false,
  stop_opt_out_language_finalized: true,
  approval_signed: true,
  authorizes_jason_operated_one_message_send: true,
  authorizes_build_environment_send: false,
  authorizes_homeowner_contact: false,
  sms_only: true,
  max_message_count: 1,
  retry_allowed: false,
  production_automation_allowed: false,
  unrestricted_launch: false
})) {
  if (pre[k] !== v) fail('preflight precondition ' + k + ' must be ' + JSON.stringify(v));
}
pass('build_204_send_time_preflight_ready_no_send_no_arm_no_network_no_number');

// --- Safety attestations across all three Build 204 artifacts ---
const attBundles = [
  ['consent', consent.consent_readiness_safety_attestations],
  ['preflight', preflight.preflight_safety_attestations]
];
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
for (const [label, att] of attBundles) {
  if (!att) fail(label + ' missing safety attestations');
  for (const k of mustBeFalse) {
    if (att[k] !== false) fail(label + ' safety attestation must be false: ' + k);
  }
  if (att.other_live_automation_remains_disabled !== true) fail(label + ' other_live_automation_remains_disabled must be true');
}
if (preflight.preflight_safety_attestations.confirm_token_armed !== false) fail('preflight confirm_token_armed must be false');
pass('build_204_artifacts_local_only_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Prior Build 203 decision preserved (reference integrity) ---
if (priorDecision.decision !== 'REAL_CUSTOMER_PILOT_REVIEW_REQUIRED') fail('Build 203 decision must be preserved');
if (priorSummary.build !== 203) fail('prior summary must be build 203');
if (consent.prior_decision_reference !== priorDecisionPath) fail('consent must reference the Build 203 decision');
pass('build_204_references_build_203_real_customer_pilot_decision');

// --- Launch-readiness summary records successes + new markers + keeps launch pilot-gated ---
if (summary.build !== 204) fail('summary build must be 204');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
if ((lanes.first_controlled_roofer_pilot_one_message_sms || {}).first_controlled_roofer_pilot_succeeded !== true) fail('summary must record first controlled roofer pilot succeeded');
if ((lanes.controlled_pilot_expansion_retry_send || {}).controlled_pilot_expansion_retry_succeeded !== true) fail('summary must record controlled expansion retry succeeded');
const consentLane = lanes.real_customer_pilot_consent_readiness || {};
if (consentLane.real_customer_pilot_consent_markers_captured !== true) fail('summary must record consent markers captured');
if (consentLane.homeowner_contact_authorized !== false) fail('summary consent lane must record homeowner contact not authorized');
const apprLane = lanes.real_customer_pilot_final_one_message_approval || {};
if (apprLane.approval_signed !== true || apprLane.authorizes_jason_operated_one_message_send !== true) fail('summary must record signed Jason-operated approval');
if (apprLane.authorizes_build_environment_send !== false || apprLane.authorizes_homeowner_contact !== false || apprLane.authorizes_unrestricted_launch !== false) {
  fail('summary approval lane must record build/homeowner/unrestricted NOT authorized');
}
const preLane = lanes.real_customer_pilot_send_time_preflight || {};
if (preLane.decision !== PREFLIGHT_DECISION) fail('summary preflight lane must record ' + PREFLIGHT_DECISION);
if (preLane.send_attempt_count !== 0 || preLane.sms_sent !== false || preLane.live_send_executed_by_build !== false) {
  fail('summary preflight lane must record no send by build');
}
const narrative = summary.narrative || {};
for (const k of ['controlled_live_sms_to_jason_succeeded', 'first_controlled_roofer_pilot_succeeded',
  'controlled_expansion_retry_succeeded', 'real_customer_pilot_consent_markers_captured',
  'final_one_message_approval_signed', 'broader_live_automation_remains_disabled',
  'next_step_is_jason_operated_one_message_real_customer_pilot_send_not_unrestricted_launch']) {
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
if (summary.next_step_is_jason_operated_one_message_real_customer_pilot_send !== true) fail('summary next step must be a Jason-operated one-message send');
pass('build_204_launch_readiness_summary_records_successes_consent_signed_approval_ready_preflight_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 204 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(consent), JSON.stringify(approval), JSON.stringify(preflight), JSON.stringify(summary), doc, runbook].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_204_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-real-customer-pilot-consent-build-204-readonly.js')) fail('wrapper must run the Build 204 verifier');
pass('build_204_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-real-customer-pilot-consent-build-204-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_204_verifier_is_read_only_does_not_send');

// --- Command runbook present and documents the Jason-operated one-message send safely ---
for (const needle of ['Build 204', 'Jason Lohse', 'fail-closed', 'one message', 'No retry',
  'CONTROLLED_LIVE_SMS_CONFIRM', 'run-native-workflow-fixture-controlled-live-sms-one-message-execution.js',
  'must NOT run', 'No homeowner contact', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!runbook.includes(needle)) fail('command runbook missing required marker: ' + needle);
}
// The runbook is the ONLY place the confirm token is shown (as Jason's manual step); it must label it Jason-only.
if (!runbook.includes('Jason') || !runbook.includes('exactly once')) fail('command runbook must restrict the send to Jason, exactly once');
pass('build_204_jason_operated_command_runbook_present_documents_fail_closed_runner_one_run_no_retry');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 204', PREFLIGHT_DECISION, 'real-customer pilot', 'consent', 'STOP/opt-out',
  'signed', 'one message', 'no retry', 'homeowner', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_204_consent_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['consent', consent], ['approval', approval], ['preflight', preflight], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 204 captures real-customer pilot consent/readiness markers and a SIGNED final one-message approval.');
console.log('PASS: Approval authorizes a Jason-operated one-message send ONLY; NOT build/Claude send, NOT homeowner contact, NOT unrestricted launch.');
console.log('PASS: Send-time preflight = READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND; 0 send attempts; nothing armed by the build.');
console.log('PASS: Summary records the three controlled-send successes, captured consent, signed approval, READY preflight; next step = Jason-operated one-message send, NOT unrestricted launch.');
console.log('PASS: Build 204 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers, no automation.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 204 verifier passed (' + passCount + ' assertions).');
