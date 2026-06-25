#!/usr/bin/env node
/**
 * Build 212 Read-Only Verifier — R1 SMS Send Successful Closeout Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 212 CLOSES OUT the one approved, Jason-operated, successful controlled live roofer SMS send of
 *    Build 210/211 selected variant R1 (new_lead_fast_response_alert): r1_send_closeout_captured=true,
 *    gate_decision_before_execution=CONTROLLED_LIVE_SMS_PERMITTED, preflight_status=PERMITTED,
 *    send_attempt_count=1, sms_sent=true, retry_performed=false,
 *    final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0, selected_variant=R1,
 *    selected_variant_label=new_lead_fast_response_alert, approval_consumed=true,
 *    approval_expired_after_attempt=true, env_clear_check_passed=true, no_retry_allowed_after_success=true.
 *  - The closed-out variant text matches EXACTLY the Build 210 selection and the Build 211 approved R1 text,
 *    is roofer-facing + SMS-only, contains opt-out language, and contains no guarantee/booked-jobs/estimate/
 *    quote/invoice/payment/deposit claim language.
 *  - Safety evidence records no live action during closeout (no additional SMS, no Twilio call, no network/
 *    external call, no roofer/homeowner contact, no secret values, no phone number, no raw SID, no production
 *    data) and live_automation_remains_disabled=true.
 *  - The next decision packet records decision=R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED,
 *    recommended_next_option=collect_roofer_feedback_only_no_send, authorizes_send_now=false,
 *    unrestricted_launch=false, homeowner_contact_authorized=false, live_automation_remains_disabled=true,
 *    next_live_send_requires_new_fresh_signed_approval=true.
 *  - The feedback-capture template records pending statuses and no_send_during_feedback_capture_required=true.
 *  - The launch-readiness summary records SMS mechanics proven, Build 210 R1 selected, Build 211 approval
 *    captured, and Build 212 one successful R1 SMS sent (1 attempt, no retry, approval consumed/expired),
 *    and that the next step is feedback capture only (NOT another send, NOT unrestricted launch).
 *  - Names/metadata/booleans/codes only; no secret values, phone numbers, or raw SIDs; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const closeoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-212.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-212.json`;
const priorApprovalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-211.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-211.json`;
const priorSelectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-r1-sms-send-closeout-build-212-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_CLOSEOUT_BUILD_212.md';

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

console.log('== Build 212 R1 SMS Send Successful Closeout Verification (local-only) ==');

const closeout = readJson(closeoutPath);
const summary = readJson(summaryPath);
const priorApproval = readJson(priorApprovalPath);
const priorSummary = readJson(priorSummaryPath);
const priorSelection = readJson(priorSelectionPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// Forbidden marketing/claim language (must not appear in the closed-out variant text).
const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';

// --- Closeout packet: top-level identity + posture ---
if (closeout.build !== 212) fail('closeout packet build must be 212');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_feedback_capture_only: true,
  next_step_is_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  authorizes_send_now: false,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (closeout[k] !== v) fail('closeout ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(closeout[k]) + ')');
}
pass('build_212_closeout_packet_is_pilot_gated_feedback_only_no_send_now_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Successful send closeout evidence ---
const ev = closeout.send_closeout_evidence || {};
const requiredEv = {
  r1_send_closeout_captured: true,
  gate_decision_before_execution: 'CONTROLLED_LIVE_SMS_PERMITTED',
  preflight_status: 'PERMITTED',
  send_attempt_count: 1,
  sms_sent: true,
  retry_performed: false,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  exit_status: 0,
  selected_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  approval_consumed: true,
  approval_expired_after_attempt: true,
  env_clear_check_passed: true,
  no_retry_allowed_after_success: true,
  recipient_number_recorded: false,
  raw_sid_recorded: false
};
for (const [k, v] of Object.entries(requiredEv)) {
  if (ev[k] !== v) fail('send_closeout_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(ev[k]) + ')');
}
if (ev.selected_variant_text !== expectedR1Text) fail('send_closeout_evidence.selected_variant_text must match the approved R1 text exactly');
// Closed-out text must equal the Build 211 approved text AND the Build 210 selection exactly (source-of-truth consistency).
const priorCap = priorApproval.signed_approval_capture_evidence || {};
if (priorCap.selected_variant_text !== ev.selected_variant_text) fail('closeout selected_variant_text must match Build 211 approved R1 text exactly');
if (priorCap.selected_variant_label !== ev.selected_variant_label) fail('closeout selected_variant_label must match Build 211 approved R1 label exactly');
const priorSel = priorSelection.copy_selection_evidence || {};
if (priorSel.selected_variant_text !== ev.selected_variant_text) fail('closeout selected_variant_text must match Build 210 selected R1 text exactly');
// Closed-out text is roofer-facing SMS, opt-out present, no forbidden claim language.
if (!/reply stop/i.test(ev.selected_variant_text) && !/stop to opt out/i.test(ev.selected_variant_text)) {
  fail('closeout selected_variant_text must include STOP opt-out language');
}
for (const pat of forbiddenClaimPatterns) {
  if (pat.test(ev.selected_variant_text)) fail('closeout selected_variant_text contains forbidden claim/guarantee language: ' + pat);
}
pass('build_212_send_closeout_evidence_records_one_successful_r1_sms_one_attempt_no_retry_approval_consumed_exact_text');

// --- Post-send env-clear check (names-only, no secret values) ---
const envc = closeout.post_send_env_clear_check || {};
if (envc.env_clear_check_passed !== true) fail('post_send_env_clear_check.env_clear_check_passed must be true');
if (envc.checked_names_only !== true) fail('post_send_env_clear_check.checked_names_only must be true');
if (envc.secret_values_read_in_this_build !== false) fail('post_send_env_clear_check.secret_values_read_in_this_build must be false');
if (envc.all_listed_env_names_cleared !== true) fail('post_send_env_clear_check.all_listed_env_names_cleared must be true');
const clearedNames = Array.isArray(envc.cleared_env_names) ? envc.cleared_env_names : [];
for (const name of ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER',
  'CONTROLLED_LIVE_SMS_TO_NUMBER', 'CONTROLLED_LIVE_SMS_CONFIRM', 'RAW_NUMBER', 'CLEAN_NUMBER']) {
  if (!clearedNames.includes(name)) fail('post_send_env_clear_check.cleared_env_names must list (name only): ' + name);
}
pass('build_212_post_send_env_clear_check_passed_names_only_no_secret_values');

// --- 2. Safety evidence (no live action during closeout) ---
const safety = closeout.safety_evidence || {};
const requiredSafety = {
  no_live_action_during_closeout: true,
  no_additional_sms_sent_during_closeout: true,
  no_twilio_call_during_closeout: true,
  no_network_external_call_during_closeout: true,
  no_roofer_or_homeowner_contact_during_closeout: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  no_raw_sid_recorded: true,
  no_production_data_used: true,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredSafety)) {
  if (safety[k] !== v) fail('safety_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(safety[k]) + ')');
}
pass('build_212_safety_evidence_no_live_action_no_additional_sms_no_twilio_no_network_no_contact_no_secrets');

// --- 3. Next decision packet ---
const decision = closeout.next_decision_packet || {};
const requiredDecision = {
  decision: 'R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED',
  recommended_next_option: 'collect_roofer_feedback_only_no_send',
  authorizes_send_now: false,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true,
  next_live_send_requires_new_fresh_signed_approval: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_212_next_decision_packet_r1_controlled_live_sms_sent_feedback_required_no_send_now');

// --- 4. Feedback capture template (pending; no send during capture) ---
const fb = closeout.feedback_capture_template || {};
const requiredFb = {
  sms_received_status: 'pending_roofer_feedback',
  message_clarity_status: 'pending_roofer_feedback',
  value_understood_status: 'pending_roofer_feedback',
  reply_or_action_taken_status: 'pending_roofer_feedback',
  continue_testing_status: 'pending_jason_review',
  requested_changes_summary: 'pending_roofer_feedback',
  no_send_during_feedback_capture_required: true
};
for (const [k, v] of Object.entries(requiredFb)) {
  if (fb[k] !== v) fail('feedback_capture_template ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(fb[k]) + ')');
}
pass('build_212_feedback_capture_template_pending_statuses_no_send_during_capture');

// --- Homeowner boundary preserved ---
const home = closeout.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_212_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Closeout safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called',
  'sms_sent_during_closeout', 'additional_sms_sent_during_closeout', 'network_or_external_call_made',
  'retry_performed', 'confirm_token_armed', 'real_roofer_contacted_during_closeout', 'real_homeowner_contacted',
  'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added',
  'schema_auth_rls_security_changes'];
const att = closeout.closeout_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('closeout packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
pass('build_212_closeout_attestations_no_send_no_network_no_retry_no_secrets_no_sid_no_automation');

// --- Reference integrity: builds on Build 211 approval; prior selection/evidence preserved/consistent ---
if (closeout.prior_build_211_reference.build_211_decision !== 'R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED') {
  fail('Build 212 must reference Build 211 decision R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED');
}
if (closeout.prior_build_211_reference.build_211_selected_variant !== 'R1') {
  fail('Build 212 must reference Build 211 selected_variant R1');
}
if (closeout.prior_build_211_reference.build_211_approval_signed !== true) fail('Build 212 must reference Build 211 approval_signed=true');
if (priorApproval.build !== 211) fail('prior approval must be build 211');
if ((priorApproval.signed_approval_capture_evidence || {}).approval_signed !== true) fail('Build 211 approval_signed must remain true (unchanged)');
if (priorSummary.build !== 211) fail('prior summary must be build 211');
if (priorSelection.build !== 210) fail('prior selection must be build 210');
if ((priorSelection.copy_selection_evidence || {}).selected_variant_id !== 'R1') fail('Build 210 selection selected_variant_id must remain R1 (unchanged)');
if (closeout.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('closeout must reference the canonical manual execution evidence');
if (closeout.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('closeout must record recipient number NOT recorded in evidence');
// Closeout terminal facts must be consistent with the preserved manual execution evidence.
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
if (evidence.send_attempt_count !== 1) fail('manual execution evidence send_attempt_count must remain 1');
if (evidence.auto_retry_performed !== false) fail('manual execution evidence auto_retry_performed must remain false');
if (evidence.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('manual execution evidence gate decision must remain CONTROLLED_LIVE_SMS_PERMITTED');
if (evidence.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('manual execution evidence final_decision must remain CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (ev.send_attempt_count !== evidence.send_attempt_count) fail('closeout send_attempt_count must match the preserved execution evidence');
if (ev.final_decision !== evidence.final_decision) fail('closeout final_decision must match the preserved execution evidence');
pass('build_212_builds_on_build_211_and_consistent_with_preserved_execution_evidence');

// --- 5. Launch-readiness summary: SMS proven + R1 selected + approval captured + successful closeout ---
if (summary.build !== 212) fail('summary build must be 212');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
const csLane = lanes.pilot_sms_copy_selection || {};
if (csLane.selected_variant_id !== 'R1') fail('summary must record Build 210 selected variant R1');
const apLane = lanes.r1_sms_send_approval || {};
if (apLane.approval_signed !== true || apLane.approval_granted !== true) fail('summary must preserve Build 211 approval captured');
if (apLane.decision !== 'R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED') fail('summary must preserve Build 211 decision');
const coLane = lanes.r1_sms_send_closeout || {};
const requiredCoLane = {
  sms_mechanics_proven: true,
  build_211_approval_captured: true,
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  gate_decision_before_execution: 'CONTROLLED_LIVE_SMS_PERMITTED',
  preflight_status: 'PERMITTED',
  send_attempt_count: 1,
  sms_sent: true,
  retry_performed: false,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  exit_status: 0,
  approval_consumed: true,
  approval_expired_after_attempt: true,
  env_clear_check_passed: true,
  no_retry_allowed_after_success: true,
  no_phone_number_recorded: true,
  no_raw_sid_recorded: true,
  no_secret_values_recorded: true,
  no_live_action_during_closeout: true,
  decision: 'R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED',
  recommended_next_option: 'collect_roofer_feedback_only_no_send',
  authorizes_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  next_step_is_feedback_capture_only_not_send: true
};
for (const [k, v] of Object.entries(requiredCoLane)) {
  if (coLane[k] !== v) fail('summary r1_sms_send_closeout lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(coLane[k]) + ')');
}
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven',
  'build_210_r1_selected_for_next_controlled_roofer_pilot_review',
  'build_211_jason_fresh_signed_approval_captured_for_one_r1_sms',
  'build_212_one_jason_operated_r1_sms_sent_successfully_one_attempt_no_retry',
  'send_attempt_count_was_one',
  'approval_is_single_use_and_was_consumed_and_expired_after_the_attempt',
  'post_send_env_clear_check_passed',
  'capturing_the_closeout_is_not_a_send',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_collect_roofer_feedback_only_not_another_send',
  'next_live_send_requires_new_fresh_signed_approval',
  'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled',
  'next_step_is_feedback_capture_only_not_unrestricted_launch']) {
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
if (summary.next_step_is_feedback_capture_only !== true) fail('summary next step must be feedback capture only');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.next_live_send_requires_new_fresh_signed_approval !== true) fail('summary next_live_send_requires_new_fresh_signed_approval must be true');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_212_launch_readiness_summary_records_sms_proven_r1_selected_approval_captured_one_successful_send_feedback_next');

// --- No secret values / phone numbers / raw SIDs anywhere in Build 212 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
// A Twilio SID is a 34-char "AC"+32hex / "SM"+32hex run; also reject any standalone 32-hex run.
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count|one_message_cap)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_or_raw_sids_present_in_any_build_212_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-r1-sms-send-closeout-build-212-readonly.js')) fail('wrapper must run the Build 212 verifier');
pass('build_212_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-r1-sms-send-closeout-build-212-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_212_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 212', 'R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED', 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  'new_lead_fast_response_alert', 'roofer-facing', 'homeowner', 'opt-out', 'feedback', 'one attempt',
  'consumed', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_212_r1_sms_send_closeout_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['closeout', closeout], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 212 closes out the ONE approved, Jason-operated, successful controlled live roofer R1 SMS send (new_lead_fast_response_alert): gate CONTROLLED_LIVE_SMS_PERMITTED, preflight PERMITTED, send_attempt_count=1, sms_sent=true, retry_performed=false, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0.');
console.log('PASS: Single-use approval is consumed and expired after the one attempt; post-send env-clear check passed (names only); closed-out R1 text matches Build 210/211 exactly, roofer-facing + SMS-only, opt-out included, no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims.');
console.log('PASS: Decision = R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED; recommended_next_option=collect_roofer_feedback_only_no_send; authorizes_send_now=false; next live send requires a new fresh signed approval.');
console.log('PASS: Build 212 is local-only — no live action, no additional SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers/SIDs, no automation. Next step = collect roofer feedback only, NOT another send, NOT unrestricted launch.');
console.log('PASS: Build 212 verifier passed (' + passCount + ' assertions).');
