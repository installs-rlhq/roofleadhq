#!/usr/bin/env node
/**
 * Build 208 Read-Only Verifier — CORRECTED Real-Customer Pilot Feedback Capture + Next Decision Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 208 corrects Build 207's missing feedback: feedback_captured=true with Jason's ACTUAL feedback
 *    (sms_received_status=yes, message_clarity_status=yes_as_technical_delivery_test_only,
 *    value_understood_status=no_generic_test_message_only, continue_testing_status=yes_for_delivery_proof_only,
 *    a requested-changes summary, workflow_message_content_analysis_needed=true,
 *    current_message_was_generic_delivery_test=true), names/booleans/codes only, no live action.
 *  - The next decision packet records decision=MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND,
 *    recommended_option=A_revise_message_copy_only_no_send, unrestricted_launch=false,
 *    homeowner_contact_authorized=false, live_automation_remains_disabled=true,
 *    next_live_send_requires_fresh_signed_approval=true.
 *  - The four UNSIGNED recommended options (A/B/C/D) are present with approval_signed=false,
 *    approval_granted=false, authorizes_live_action_now=false.
 *  - The launch-readiness summary records that the real-customer pilot SMS succeeded TECHNICALLY but the
 *    generic delivery-test copy did NOT validate value, that the next step is message-copy/workflow-content
 *    analysis before any further live send, and that this is NOT unrestricted launch.
 *  - The Build 208 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const feedbackPath = `${FIXTURE_DIR}/real-customer-pilot-feedback-build-208.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-208.json`;
const priorFeedbackPath = `${FIXTURE_DIR}/real-customer-pilot-feedback-build-207.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-207.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-real-customer-pilot-feedback-build-208-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_FEEDBACK_BUILD_208.md';

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

console.log('== Build 208 CORRECTED Real-Customer Pilot Feedback Capture + Next Decision Packet Verification (local-only) ==');

const feedback = readJson(feedbackPath);
const summary = readJson(summaryPath);
const priorFeedback = readJson(priorFeedbackPath);
const priorSummary = readJson(priorSummaryPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Feedback packet: top-level identity + posture ---
if (feedback.build !== 208) fail('feedback packet build must be 208');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_message_copy_analysis_required: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (feedback[k] !== v) fail('feedback ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(feedback[k]) + ')');
}
pass('build_208_feedback_packet_is_pilot_gated_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Corrected real-customer pilot feedback evidence ---
const fb = feedback.real_customer_pilot_feedback_evidence || {};
const requiredFb = {
  feedback_captured: true,
  sms_received_status: 'yes',
  message_clarity_status: 'yes_as_technical_delivery_test_only',
  value_understood_status: 'no_generic_test_message_only',
  continue_testing_status: 'yes_for_delivery_proof_only',
  workflow_message_content_analysis_needed: true,
  current_message_was_generic_delivery_test: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  no_live_action_during_feedback_capture: true
};
for (const [k, v] of Object.entries(requiredFb)) {
  if (fb[k] !== v) fail('corrected feedback evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(fb[k]) + ')');
}
if (typeof fb.requested_changes_summary_names_only !== 'string' || fb.requested_changes_summary_names_only.length === 0) {
  fail('corrected feedback requested_changes_summary_names_only must be a non-empty names-only summary');
}
if (!/analyze and replace/i.test(fb.requested_changes_summary_names_only) || !/generic test sms copy/i.test(fb.requested_changes_summary_names_only)) {
  fail('requested_changes_summary must capture analyze/replace the generic test SMS copy');
}
if (fb.requested_changes_summary_names_only === 'not_provided_by_jason') fail('Build 208 must NOT leave feedback unfilled');
pass('build_208_corrected_feedback_evidence_captured_received_clear_as_delivery_test_value_not_validated_names_only');

// --- 2. Next decision packet ---
const decision = feedback.next_decision_packet || {};
const requiredDecision = {
  decision: 'MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND',
  recommended_option: 'A_revise_message_copy_only_no_send',
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true,
  next_live_send_requires_fresh_signed_approval: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_208_next_decision_packet_message_copy_analysis_required_recommended_option_a_no_launch_no_homeowner');

// --- 3. Four UNSIGNED recommended options ---
const optionsBlock = feedback.recommended_next_options_unsigned || {};
const options = Array.isArray(optionsBlock.options) ? optionsBlock.options : [];
const requiredOptionIds = ['A', 'B', 'C', 'D'];
for (const id of requiredOptionIds) {
  const o = options.find((entry) => entry && entry.id === id);
  if (!o) fail('recommended options missing option: ' + id);
  if (typeof o.label !== 'string' || o.label.length === 0) fail('recommended option missing label: ' + id);
  if (typeof o.description !== 'string' || o.description.length === 0) fail('recommended option missing description: ' + id);
}
if (options.length !== requiredOptionIds.length) fail('recommended options must contain exactly options A, B, C, D');
const byId = Object.fromEntries(options.map((o) => [o.id, o]));
if (!/analyze/.test(byId.A.label) || !/copy/.test(byId.A.label) || !/no_send/.test(byId.A.label)) fail('option A must be analyze/revise SMS workflow copy only, no send');
if (!/one_more_pilot_sms/.test(byId.B.label) || !/no_retry/.test(byId.B.label)) fail('option B must be one more pilot SMS after copy revision, no retry');
if (!/homeowner/.test(byId.C.label) || !/no_send/.test(byId.C.label)) fail('option C must be homeowner consent/opt-out copy, no send');
if (!/pause_live_testing/.test(byId.D.label)) fail('option D must be pause live testing and improve intake/reporting flow');
if (optionsBlock.approval_signed !== false) fail('recommended options approval_signed must be false');
if (optionsBlock.approval_granted !== false) fail('recommended options approval_granted must be false');
if (optionsBlock.authorizes_live_action_now !== false) fail('recommended options authorizes_live_action_now must be false');
pass('build_208_four_unsigned_recommended_options_present_no_approval_no_live_action');

// --- Feedback safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_feedback_capture',
  'network_or_external_call_made', 'retry_performed', 'real_roofer_contacted_during_feedback_capture',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = feedback.feedback_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('feedback packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('feedback safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('feedback other_live_automation_remains_disabled must be true');
pass('build_208_feedback_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Reference integrity: corrects Build 207, prior evidence preserved/consistent ---
if (feedback.corrects_build_207.build_207_feedback_captured !== false) fail('Build 208 must record that Build 207 feedback_captured was false');
if (feedback.corrects_build_207.build_207_decision !== 'NEXT_ACTION_REVIEW_REQUIRED') fail('Build 208 must reference Build 207 decision NEXT_ACTION_REVIEW_REQUIRED');
if (priorFeedback.build !== 207) fail('prior feedback must be build 207');
if ((priorFeedback.real_customer_pilot_feedback_evidence || {}).feedback_captured !== false) fail('Build 207 feedback_captured must remain false (corrected by 208)');
if (feedback.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('feedback must reference the canonical manual execution evidence');
if (feedback.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('feedback must record recipient number NOT recorded in evidence');
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
if (priorSummary.build !== 207) fail('prior summary must be build 207');
pass('build_208_corrects_build_207_and_preserves_prior_evidence_consistent');

// --- 4. Launch-readiness summary: technical success but value not validated + copy-analysis next step ---
if (summary.build !== 208) fail('summary build must be 208');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
if ((lanes.first_controlled_roofer_pilot_one_message_sms || {}).first_controlled_roofer_pilot_succeeded !== true) fail('summary must record first controlled roofer pilot succeeded');
if ((lanes.controlled_pilot_expansion_retry_send || {}).controlled_pilot_expansion_retry_succeeded !== true) fail('summary must record controlled expansion retry succeeded');
const rcLane = lanes.real_customer_pilot_one_message_sms || {};
if (rcLane.real_customer_pilot_one_message_sms_succeeded_technically !== true) fail('summary must record real-customer pilot SMS succeeded technically');
if (rcLane.message_content_validated_value !== false) fail('summary must record message content did NOT validate value');
if (rcLane.message_content_was_generic_delivery_test !== true) fail('summary must record message content was generic delivery test');
const fbLane = lanes.post_pilot_feedback || {};
if (fbLane.feedback_captured !== true) fail('summary feedback lane feedback_captured must be true');
if (fbLane.decision !== 'MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND') fail('summary feedback lane decision must be MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND');
if (fbLane.workflow_message_content_analysis_needed !== true) fail('summary feedback lane must record workflow_message_content_analysis_needed');
const narrative = summary.narrative || {};
for (const k of ['controlled_live_sms_to_jason_succeeded', 'first_controlled_roofer_pilot_succeeded',
  'controlled_expansion_retry_succeeded', 'real_customer_pilot_one_message_sms_succeeded_technically',
  'message_content_did_not_validate_value_generic_delivery_test_copy', 'corrected_feedback_captured',
  'next_step_is_message_copy_workflow_content_analysis_before_any_further_live_send',
  'no_homeowner_contact_authorized', 'broader_live_automation_remains_disabled',
  'next_step_is_jason_decision_after_copy_analysis_not_unrestricted_launch']) {
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
if (summary.next_step_is_message_copy_analysis_required !== true) fail('summary next step must be message copy analysis required');
if (summary.next_step_is_jason_decision_after_copy_analysis !== true) fail('summary next step must be Jason decision after copy analysis');
pass('build_208_launch_readiness_summary_records_technical_success_value_not_validated_next_step_copy_analysis');

// --- No secret values / phone numbers anywhere in Build 208 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(feedback), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_208_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-real-customer-pilot-feedback-build-208-readonly.js')) fail('wrapper must run the Build 208 verifier');
pass('build_208_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-real-customer-pilot-feedback-build-208-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_208_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 208', 'MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND', 'real-customer pilot',
  'feedback_captured', 'generic delivery-test', 'message-copy', 'Jason', 'homeowner', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_208_feedback_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['feedback', feedback], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 208 corrects Build 207 — feedback_captured=true with Jason\'s actual feedback (received=yes; clear as delivery test only; value NOT validated by generic test copy; continue for delivery proof only; analyze/replace the copy).');
console.log('PASS: Next decision = MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND; recommended_option=A; four UNSIGNED options (A/B/C/D); no approval, no homeowner contact, no unrestricted launch.');
console.log('PASS: Build 208 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation.');
console.log('PASS: Summary records real-customer pilot SMS succeeded technically but generic delivery-test copy did NOT validate value; next step = message-copy/workflow-content analysis, NOT unrestricted launch.');
console.log('PASS: Build 208 verifier passed (' + passCount + ' assertions).');
