#!/usr/bin/env node
/**
 * Build 211 Read-Only Verifier — R1 SMS Send Signed Approval Capture Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 211 CAPTURES Jason's fresh, signed, per-attempt approval for ONE Jason-operated controlled live
 *    roofer SMS send using Build 210 selected variant R1 (new_lead_fast_response_alert): approval_signed=true,
 *    approval_granted=true, selected_message_variant=R1, selected_variant_label=new_lead_fast_response_alert,
 *    max_message_count=1, sms_only=true, retry_allowed=false, jason_operated_send_only=true,
 *    build_environment_send=false, homeowner_contact_authorized=false, live_automation_activation_authorized=false,
 *    unrestricted_launch_authorized=false, production_data_authorized=false,
 *    destination_entry_silent_outside_repo_chat_logs_required=true, secrets_phone_numbers_not_recorded_required=true,
 *    send_time_preflight_required=true, approval_expires_after_one_attempt_whether_sent_or_failed=true.
 *  - The approved variant text matches EXACTLY the Build 210 selected R1 text (and the Build 209 R1 variant),
 *    is roofer-facing + SMS-only, contains opt-out language, and contains no guarantee/booked-jobs/estimate/
 *    quote/invoice/payment/deposit claim language.
 *  - The next decision packet records decision=R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED,
 *    recommended_next_option=run_send_time_preflight_before_one_jason_operated_sms_attempt, authorizes_send_now=false,
 *    send_time_preflight_required=true, unrestricted_launch=false, homeowner_contact_authorized=false,
 *    live_automation_remains_disabled=true.
 *  - The send-time preflight checklist records the required fail-closed steps and never arms/executes a send.
 *  - The launch-readiness summary records SMS mechanics proven, Build 210 R1 selected, Build 211 approval captured,
 *    and that the next step is a send-time preflight (NOT send now, NOT unrestricted launch).
 *  - The Build 211 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const approvalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-211.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-211.json`;
const priorSelectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-210.json`;
const priorAnalysisPath = `${FIXTURE_DIR}/pilot-sms-copy-analysis-build-209.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-r1-sms-send-approval-build-211-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_APPROVAL_BUILD_211.md';

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

console.log('== Build 211 R1 SMS Send Signed Approval Capture Verification (local-only) ==');

const approval = readJson(approvalPath);
const summary = readJson(summaryPath);
const priorSelection = readJson(priorSelectionPath);
const priorSummary = readJson(priorSummaryPath);
const priorAnalysis = readJson(priorAnalysisPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// Forbidden marketing/claim language (must not appear in the APPROVED variant text).
const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';

// --- Approval packet: top-level identity + posture ---
if (approval.build !== 211) fail('approval packet build must be 211');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_send_time_preflight: true,
  next_step_is_send_now: false,
  authorizes_send_now: false,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (approval[k] !== v) fail('approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(approval[k]) + ')');
}
pass('build_211_approval_packet_is_pilot_gated_no_send_now_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Signed approval capture evidence (fresh per-attempt approval for one R1 SMS) ---
const cap = approval.signed_approval_capture_evidence || {};
const requiredCap = {
  approval_signed: true,
  approval_granted: true,
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  max_message_count: 1,
  sms_only: true,
  retry_allowed: false,
  jason_operated_send_only: true,
  build_environment_send: false,
  homeowner_contact_authorized: false,
  live_automation_activation_authorized: false,
  unrestricted_launch_authorized: false,
  production_data_authorized: false,
  destination_entry_silent_outside_repo_chat_logs_required: true,
  secrets_phone_numbers_not_recorded_required: true,
  send_time_preflight_required: true,
  approval_expires_after_one_attempt_whether_sent_or_failed: true
};
for (const [k, v] of Object.entries(requiredCap)) {
  if (cap[k] !== v) fail('signed_approval_capture_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(cap[k]) + ')');
}
if (cap.selected_variant_text !== expectedR1Text) fail('signed_approval_capture_evidence.selected_variant_text must match the approved R1 text exactly');
// Approved text must equal the Build 210 selection AND the Build 209 R1 variant text exactly (source-of-truth consistency).
const priorSel = priorSelection.copy_selection_evidence || {};
if (priorSel.selected_variant_text !== cap.selected_variant_text) fail('approved selected_variant_text must match Build 210 selected R1 text exactly');
if (priorSel.selected_variant_label !== cap.selected_variant_label) fail('approved selected_variant_label must match Build 210 selected R1 label exactly');
const priorR1 = ((priorAnalysis.roofer_facing_sms_copy_variants || {}).variants || []).find((v) => v.id === 'R1');
if (!priorR1) fail('Build 209 analysis must contain variant R1');
if (priorR1.text !== cap.selected_variant_text) fail('approved selected_variant_text must match Build 209 variant R1 text exactly');
// Approved text is roofer-facing SMS, opt-out present, no forbidden claim language.
if (!/reply stop/i.test(cap.selected_variant_text) && !/stop to opt out/i.test(cap.selected_variant_text)) {
  fail('approved selected_variant_text must include STOP opt-out language');
}
for (const pat of forbiddenClaimPatterns) {
  if (pat.test(cap.selected_variant_text)) fail('approved selected_variant_text contains forbidden claim/guarantee language: ' + pat);
}
// Exact approval statement text present and references R1, one SMS, no retry, send-time preflight, single-attempt expiry.
const stmt = cap.exact_approval_statement_text;
if (typeof stmt !== 'string') fail('signed_approval_capture_evidence.exact_approval_statement_text must be a string');
if (!/Jason Lohse/.test(stmt)) fail('exact approval statement must name Jason Lohse');
if (!/R1/.test(stmt)) fail('exact approval statement must reference variant R1');
if (stmt.indexOf(expectedR1Text) === -1) fail('exact approval statement must contain the exact approved R1 text');
for (const needle of ['one SMS only', 'no retry', 'no homeowner contact', 'no live automation activation', 'no unrestricted launch', 'no production data', 'send-time preflight required', 'expires after one attempt']) {
  if (stmt.toLowerCase().indexOf(needle.toLowerCase()) === -1) fail('exact approval statement must include scope phrase: ' + needle);
}
pass('build_211_signed_approval_capture_evidence_records_fresh_one_r1_sms_approval_exact_text_no_retry_preflight_required');

// --- 2. Next decision packet ---
const decision = approval.next_decision_packet || {};
const requiredDecision = {
  decision: 'R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_send_time_preflight_before_one_jason_operated_sms_attempt',
  authorizes_send_now: false,
  send_time_preflight_required: true,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_211_next_decision_packet_r1_signed_approval_captured_send_time_preflight_required');

// --- 3. Send-time preflight checklist (no arm / no execute) ---
const pre = approval.send_time_preflight_checklist || {};
if (pre.armed_by_build !== false) fail('preflight checklist armed_by_build must be false');
if (pre.executed_by_build !== false) fail('preflight checklist executed_by_build must be false');
const checklist = Array.isArray(pre.checklist) ? pre.checklist.map((c) => String(c).toLowerCase()) : [];
const requiredChecklistNeedles = [
  'source secrets from /root/roofleadhq-local-secrets/live-sms.env',
  'enter destination silently outside repo/chat/logs',
  'convert destination to e.164',
  'names-only env presence check',
  'verify selected r1 message text',
  'verify exactly one attempt',
  'verify no retry',
  'verify no homeowner contact',
  'verify no live automation activation',
  'unset env values after attempt'
];
for (const needle of requiredChecklistNeedles) {
  if (!checklist.some((c) => c.includes(needle))) fail('preflight checklist must include step: ' + needle);
}
const requiredPreFlags = {
  secret_values_read_in_this_build: false,
  destination_recorded_in_repo: false,
  destination_converted_to_e164_outside_repo: true,
  names_only_env_presence_check: true,
  verify_selected_r1_message_text: true,
  verify_exactly_one_attempt: true,
  verify_no_retry: true,
  verify_no_homeowner_contact: true,
  verify_no_live_automation_activation: true,
  unset_env_values_after_attempt: true,
  confirm_token_armed_by_build: false
};
for (const [k, v] of Object.entries(requiredPreFlags)) {
  if (pre[k] !== v) fail('preflight checklist ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(pre[k]) + ')');
}
if (pre.secret_source_path_name_only !== '/root/roofleadhq-local-secrets/live-sms.env') fail('preflight checklist must reference the secret source path by name only');
pass('build_211_send_time_preflight_checklist_records_fail_closed_steps_never_arms_or_executes');

// --- Homeowner boundary preserved ---
const home = approval.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_211_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Approval-capture safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_approval_capture',
  'network_or_external_call_made', 'retry_performed', 'confirm_token_armed', 'real_roofer_contacted_during_approval_capture',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = approval.approval_capture_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('approval packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('approval-capture safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('approval-capture other_live_automation_remains_disabled must be true');
pass('build_211_approval_capture_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Reference integrity: builds on Build 210, prior selection/evidence preserved/consistent ---
if (approval.prior_build_210_reference.build_210_decision !== 'R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED') {
  fail('Build 211 must reference Build 210 decision R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED');
}
if (approval.prior_build_210_reference.build_210_selected_variant !== 'R1') {
  fail('Build 211 must reference Build 210 selected_variant R1');
}
if (priorSelection.build !== 210) fail('prior selection must be build 210');
if ((priorSelection.copy_selection_evidence || {}).selected_variant_id !== 'R1') {
  fail('Build 210 selection selected_variant_id must remain R1 (unchanged)');
}
if (priorSummary.build !== 210) fail('prior summary must be build 210');
if (approval.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('approval must reference the canonical manual execution evidence');
if (approval.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('approval must record recipient number NOT recorded in evidence');
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
pass('build_211_builds_on_build_210_and_preserves_prior_selection_and_evidence_consistent');

// --- 4. Launch-readiness summary: SMS mechanics proven + Build 210 R1 selected + Build 211 approval captured ---
if (summary.build !== 211) fail('summary build must be 211');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
const rcLane = lanes.real_customer_pilot_one_message_sms || {};
if (rcLane.real_customer_pilot_delivery_succeeded !== true) fail('summary must record real-customer pilot delivery succeeded');
if (rcLane.message_content_validated_value !== false) fail('summary must record message content did NOT validate value');
const csLane = lanes.pilot_sms_copy_selection || {};
if (csLane.selected_variant_id !== 'R1') fail('summary must record Build 210 selected variant R1');
if (csLane.decision !== 'R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED') fail('summary must preserve Build 210 decision');
const apLane = lanes.r1_sms_send_approval || {};
const requiredApLane = {
  sms_mechanics_proven: true,
  build_210_r1_selected: true,
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  approval_signed: true,
  approval_granted: true,
  max_message_count: 1,
  sms_only: true,
  retry_allowed: false,
  jason_operated_send_only: true,
  build_environment_send: false,
  homeowner_contact_authorized: false,
  live_automation_activation_authorized: false,
  unrestricted_launch_authorized: false,
  production_data_authorized: false,
  send_time_preflight_required: true,
  approval_expires_after_one_attempt_whether_sent_or_failed: true,
  no_live_action_during_approval_capture: true,
  decision: 'R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_send_time_preflight_before_one_jason_operated_sms_attempt',
  authorizes_send_now: false,
  next_step_is_send_time_preflight_not_send_now: true
};
for (const [k, v] of Object.entries(requiredApLane)) {
  if (apLane[k] !== v) fail('summary r1_sms_send_approval lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(apLane[k]) + ')');
}
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven', 'real_customer_pilot_delivery_succeeded',
  'build_210_r1_selected_for_next_controlled_roofer_pilot_review',
  'build_211_jason_fresh_signed_approval_captured_for_one_r1_sms',
  'approval_is_single_use_and_expires_after_one_attempt_whether_sent_or_failed',
  'capturing_approval_is_not_a_send',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_send_time_preflight_not_send_now', 'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled', 'next_step_is_jason_operated_send_time_preflight_not_unrestricted_launch']) {
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
if (summary.next_step_is_send_time_preflight !== true) fail('summary next step must be send-time preflight');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_211_launch_readiness_summary_records_sms_proven_r1_selected_approval_captured_preflight_next');

// --- No secret values / phone numbers anywhere in Build 211 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(approval), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_211_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-r1-sms-send-approval-build-211-readonly.js')) fail('wrapper must run the Build 211 verifier');
pass('build_211_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-r1-sms-send-approval-build-211-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_211_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 211', 'R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED', 'new_lead_fast_response_alert',
  'roofer-facing', 'homeowner', 'opt-out', 'send-time preflight', 'one attempt', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_211_r1_sms_send_approval_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['approval', approval], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 211 captures Jason\'s fresh, signed, per-attempt approval — one Jason-operated controlled live roofer SMS using Build 210 selected variant R1 (new_lead_fast_response_alert); approval_signed=true, approval_granted=true.');
console.log('PASS: Approved R1 text matches Build 210 selection and Build 209 R1 exactly, roofer-facing + SMS-only, opt-out included, no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims.');
console.log('PASS: Decision = R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED; authorizes_send_now=false; one SMS, no retry; approval expires after one attempt whether sent or failed.');
console.log('PASS: Build 211 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation. Next step = send-time preflight, NOT send now, NOT unrestricted launch.');
console.log('PASS: Build 211 verifier passed (' + passCount + ' assertions).');
