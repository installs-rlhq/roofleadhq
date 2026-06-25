#!/usr/bin/env node
/**
 * Build 206 Read-Only Verifier — Real-Customer Pilot Post-Pilot Observation + Feedback Decision Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - The Build 206 observation packet captures the post-real-customer-pilot observation evidence from
 *    recorded metadata only: real_customer_pilot_sms_sent=true, send_attempt_count=1, retry_performed=false,
 *    delivery_confirmation_status=not_recorded_by_build, roofer_feedback_status=not_recorded_by_build,
 *    customer_value_validation_status=pending_human_feedback, no_live_action_during_observation_capture=true,
 *    no_secret_values_recorded=true, no_phone_number_recorded=true.
 *  - The customer-feedback capture template carries the five required questions and is unfilled (pending).
 *  - The next decision packet records decision=POST_PILOT_FEEDBACK_REQUIRED, unrestricted_launch=false,
 *    homeowner_contact_authorized=false, live_automation_remains_disabled=true,
 *    next_live_send_requires_fresh_signed_approval=true.
 *  - The four UNSIGNED next-step options (A/B/C/D) are present with approval_signed=false,
 *    approval_granted=false, authorizes_live_action_now=false.
 *  - The launch-readiness summary records the four controlled-send successes, post-pilot feedback pending,
 *    and that the next step is a Jason decision after feedback — NOT unrestricted launch.
 *  - The Build 206 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const observationPath = `${FIXTURE_DIR}/real-customer-pilot-observation-build-206.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-206.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-205.json`;
const closeoutPath = `${FIXTURE_DIR}/real-customer-pilot-sms-closeout-build-205.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-real-customer-pilot-observation-build-206-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_OBSERVATION_BUILD_206.md';

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

console.log('== Build 206 Real-Customer Pilot Post-Pilot Observation + Feedback Decision Packet Verification (local-only) ==');

const observation = readJson(observationPath);
const summary = readJson(summaryPath);
const priorSummary = readJson(priorSummaryPath);
const closeout = readJson(closeoutPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Observation packet: top-level identity + posture ---
if (observation.build !== 206) fail('observation packet build must be 206');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_post_pilot_feedback_required: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (observation[k] !== v) fail('observation ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(observation[k]) + ')');
}
pass('build_206_observation_packet_is_pilot_gated_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Post-pilot observation evidence ---
const obs = observation.post_pilot_observation_evidence || {};
const requiredObs = {
  real_customer_pilot_sms_sent: true,
  send_attempt_count: 1,
  retry_performed: false,
  delivery_confirmation_status: 'not_recorded_by_build',
  roofer_feedback_status: 'not_recorded_by_build',
  customer_value_validation_status: 'pending_human_feedback',
  no_live_action_during_observation_capture: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true
};
for (const [k, v] of Object.entries(requiredObs)) {
  if (obs[k] !== v) fail('observation evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(obs[k]) + ')');
}
pass('build_206_post_pilot_observation_evidence_records_sent_one_attempt_no_retry_feedback_pending_names_only');

// --- 2. Customer-feedback capture template: five required questions, unfilled ---
const template = observation.customer_feedback_capture_template || {};
if (template.status !== 'unfilled_pending_human_feedback') fail('feedback template status must be unfilled_pending_human_feedback');
const questions = Array.isArray(template.questions) ? template.questions : [];
const requiredQuestionIds = ['received_sms', 'understood_product', 'message_useful', 'what_should_change', 'proceed_pause_revise'];
for (const id of requiredQuestionIds) {
  const q = questions.find((entry) => entry && entry.id === id);
  if (!q) fail('feedback template missing required question: ' + id);
  if (typeof q.question !== 'string' || q.question.length === 0) fail('feedback template question text missing for: ' + id);
  if (q.answer !== null) fail('feedback template answer must be unfilled (null) for: ' + id);
}
if (questions.length !== requiredQuestionIds.length) fail('feedback template must carry exactly the five required questions');
pass('build_206_customer_feedback_capture_template_has_five_questions_unfilled_pending');

// --- 3. Next decision packet ---
const decision = observation.next_decision_packet || {};
const requiredDecision = {
  decision: 'POST_PILOT_FEEDBACK_REQUIRED',
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true,
  next_live_send_requires_fresh_signed_approval: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_206_next_decision_packet_post_pilot_feedback_required_no_launch_no_homeowner_automation_disabled');

// --- 4. Four UNSIGNED next-step options ---
const optionsBlock = observation.next_step_options_unsigned || {};
const options = Array.isArray(optionsBlock.options) ? optionsBlock.options : [];
const requiredOptionIds = ['A', 'B', 'C', 'D'];
for (const id of requiredOptionIds) {
  const o = options.find((entry) => entry && entry.id === id);
  if (!o) fail('next-step options missing option: ' + id);
  if (typeof o.label !== 'string' || o.label.length === 0) fail('next-step option missing label: ' + id);
  if (typeof o.description !== 'string' || o.description.length === 0) fail('next-step option missing description: ' + id);
}
if (options.length !== requiredOptionIds.length) fail('next-step options must contain exactly options A, B, C, D');
if (optionsBlock.approval_signed !== false) fail('next-step options approval_signed must be false');
if (optionsBlock.approval_granted !== false) fail('next-step options approval_granted must be false');
if (optionsBlock.authorizes_live_action_now !== false) fail('next-step options authorizes_live_action_now must be false');
pass('build_206_four_unsigned_next_step_options_present_no_approval_no_live_action');

// --- Observation safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_observation',
  'network_or_external_call_made', 'retry_performed', 'real_roofer_contacted_during_observation',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = observation.observation_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('observation packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('observation safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('observation other_live_automation_remains_disabled must be true');
pass('build_206_observation_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Reference integrity: prior build evidence preserved and consistent ---
if (observation.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('observation must reference the canonical manual execution evidence');
if (observation.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('observation must record recipient number NOT recorded in evidence');
if (observation.prior_build_205_reference.build_205_final_decision !== FINAL_DECISION) fail('observation must reference Build 205 final decision');
if (closeout.sms_was_sent !== true || closeout.send_attempt_count !== 1 || closeout.retry_performed !== false) fail('Build 205 closeout evidence must remain sent/1/no-retry');
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
if (priorSummary.build !== 205) fail('prior summary must be build 205');
pass('build_206_references_build_205_closeout_and_preserved_evidence_consistent');

// --- 5. Launch-readiness summary: four successes + feedback pending + Jason-decision next step ---
if (summary.build !== 206) fail('summary build must be 206');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
if ((lanes.first_controlled_roofer_pilot_one_message_sms || {}).first_controlled_roofer_pilot_succeeded !== true) fail('summary must record first controlled roofer pilot succeeded');
if ((lanes.controlled_pilot_expansion_retry_send || {}).controlled_pilot_expansion_retry_succeeded !== true) fail('summary must record controlled expansion retry succeeded');
if ((lanes.real_customer_pilot_one_message_sms || {}).real_customer_pilot_one_message_sms_succeeded !== true) fail('summary must record real-customer pilot one-message SMS succeeded');
const fbLane = lanes.post_pilot_feedback || {};
if (fbLane.post_pilot_feedback_pending !== true) fail('summary must record post-pilot feedback pending');
if (fbLane.decision !== 'POST_PILOT_FEEDBACK_REQUIRED') fail('summary feedback lane decision must be POST_PILOT_FEEDBACK_REQUIRED');
if (fbLane.customer_value_validation_status !== 'pending_human_feedback') fail('summary feedback lane customer_value_validation_status must be pending_human_feedback');
const narrative = summary.narrative || {};
for (const k of ['controlled_live_sms_to_jason_succeeded', 'first_controlled_roofer_pilot_succeeded',
  'controlled_expansion_retry_succeeded', 'real_customer_pilot_one_message_sms_succeeded',
  'post_pilot_feedback_is_pending', 'no_homeowner_contact_authorized', 'broader_live_automation_remains_disabled',
  'next_step_is_jason_decision_after_feedback_not_unrestricted_launch']) {
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
if (summary.next_step_is_post_pilot_feedback_required !== true) fail('summary next step must be post-pilot feedback required');
if (summary.next_step_is_jason_decision_after_feedback !== true) fail('summary next step must be Jason decision after feedback');
pass('build_206_launch_readiness_summary_records_four_successes_feedback_pending_next_step_jason_decision');

// --- No secret values / phone numbers anywhere in Build 206 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(observation), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_206_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-real-customer-pilot-observation-build-206-readonly.js')) fail('wrapper must run the Build 206 verifier');
pass('build_206_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-real-customer-pilot-observation-build-206-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_206_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 206', 'POST_PILOT_FEEDBACK_REQUIRED', 'real-customer pilot', 'post-pilot observation',
  'customer feedback', 'Jason', 'homeowner', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_206_observation_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['observation', observation], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 206 captures post-real-customer-pilot observation (sent, 1 attempt, no retry; delivery + feedback NOT recorded by build; customer value validation pending).');
console.log('PASS: Customer-feedback capture template carries the five required questions, unfilled and pending human feedback.');
console.log('PASS: Next decision = POST_PILOT_FEEDBACK_REQUIRED; four UNSIGNED options (A/B/C/D); no approval, no homeowner contact, no unrestricted launch.');
console.log('PASS: Build 206 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation.');
console.log('PASS: Summary records all four controlled-send successes + feedback pending; next step = Jason decision after feedback, NOT unrestricted launch.');
console.log('PASS: Build 206 verifier passed (' + passCount + ' assertions).');
