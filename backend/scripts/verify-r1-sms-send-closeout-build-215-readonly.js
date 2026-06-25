#!/usr/bin/env node
/**
 * Build 215 Read-Only Verifier — R1 SMS Guarded Successful Send Closeout.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper AND a side-effect-free
 * require of the Build 213 fixed/guarded live runner module to PROVE the resolved outbound message (the runner's
 * live send path is guarded behind require.main===module, so requiring it performs NO send and NO process.exit).
 * No network, no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the runner's live
 * execution; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 215 CLOSES OUT the one approved, Jason-operated, SUCCESSFUL guarded controlled live roofer SMS send of
 *    Build 210/211/214 selected variant R1 (new_lead_fast_response_alert) using the Build 213 fixed/guarded
 *    message binding: gate_decision_before_execution=CONTROLLED_LIVE_SMS_PERMITTED,
 *    message_binding_bound_to_approved_selected_variant=true, outbound_body_equals_approved_selected_variant=true,
 *    preflight_status=PERMITTED, send_attempt_count=1, sms_sent=true, retry_performed=false,
 *    final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0, selected_variant=R1,
 *    approved_message_text===R1, approval_consumed=true, approval_expired_after_attempt=true,
 *    env_clear_check_passed=true, no_retry_allowed_after_success=true.
 *  - The NEW live proof: recipient_confirmed_sms_received=true, recipient_confirmed_actual_text_matches_r1=true,
 *    recipient_confirmed_generic_copy_not_received=true, r1_message_binding_validated_live=true,
 *    r1_value_message_delivery_validated=true.
 *  - DYNAMICALLY (side-effect-free) the Build 213 fixed/guarded runner's resolveOutboundBody() equals the closeout
 *    approved_message_text (R1) and !== the stale generic copy; the fail-closed guard PERMITS the approved R1 body
 *    and BLOCKS the stale generic body. This corroborates that the sent body equalled exactly R1.
 *  - The strategic next decision packet records GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_
 *    APPROVAL, recommended_next_option=small_consenting_roofer_workflow_validation_packet, authorizes_send_now=false,
 *    next_live_send_requires_new_fresh_signed_approval=true, unrestricted_launch=false,
 *    homeowner_contact_authorized=false, live_automation_remains_disabled=true.
 *  - The fastest-pilot-path and lean feedback-capture template are recorded (no send during feedback).
 *  - The launch-readiness summary records the successful guarded send + live R1 match and the next step
 *    (small consenting roofer workflow validation, NOT send now, NOT unrestricted launch).
 *  - The Build 215 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values, phone numbers, or raw SIDs; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const closeoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-215.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-215.json`;
const priorApprovalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-214.json`;
const priorBindingFixPath = `${FIXTURE_DIR}/r1-sms-content-mismatch-feedback-build-213.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-212.json`;
const priorSelectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const wrapperPath = 'scripts/run-r1-sms-send-closeout-build-215-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_CLOSEOUT_BUILD_215.md';

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

console.log('== Build 215 R1 SMS Guarded Successful Send Closeout Verification (local-only) ==');

const closeout = readJson(closeoutPath);
const summary = readJson(summaryPath);
const priorApproval = readJson(priorApprovalPath);
const priorBindingFix = readJson(priorBindingFixPath);
const priorCloseout = readJson(priorCloseoutPath);
const priorSelection = readJson(priorSelectionPath);
const evidence = readJson(evidencePath);
const liveRunner = read(liveRunnerPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';
const genericText = 'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.';

const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

// --- Closeout packet: top-level identity + posture ---
if (closeout.build !== 215) fail('closeout packet build must be 215');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_small_consenting_roofer_workflow_validation: true,
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
pass('build_215_closeout_packet_is_pilot_gated_no_send_now_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Successful guarded R1 send closeout evidence ---
const ev = closeout.guarded_r1_send_closeout_evidence || {};
const requiredEv = {
  guarded_r1_send_closeout_captured: true,
  gate_decision_before_execution: 'CONTROLLED_LIVE_SMS_PERMITTED',
  message_binding_bound_to_approved_selected_variant: true,
  outbound_body_equals_approved_selected_variant: true,
  preflight_status: 'PERMITTED',
  send_attempt_count: 1,
  sms_sent: true,
  retry_performed: false,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  exit_status: 0,
  selected_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  recipient_confirmed_sms_received: true,
  recipient_confirmed_actual_text_matches_r1: true,
  recipient_confirmed_generic_copy_not_received: true,
  r1_message_binding_validated_live: true,
  r1_value_message_delivery_validated: true,
  approval_consumed: true,
  approval_expired_after_attempt: true,
  env_clear_check_passed: true,
  no_retry_allowed_after_success: true,
  recipient_number_recorded: false,
  raw_sid_recorded: false
};
for (const [k, v] of Object.entries(requiredEv)) {
  if (ev[k] !== v) fail('guarded_r1_send_closeout_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(ev[k]) + ')');
}
if (ev.approved_message_text !== expectedR1Text) fail('guarded_r1_send_closeout_evidence.approved_message_text must match the approved R1 text exactly');
if (!/reply stop/i.test(ev.approved_message_text) && !/stop to opt out/i.test(ev.approved_message_text)) {
  fail('approved_message_text must include STOP opt-out language');
}
for (const pat of forbiddenClaimPatterns) {
  if (pat.test(ev.approved_message_text)) fail('approved_message_text contains forbidden claim/guarantee language: ' + pat);
}
// Approved text must equal the Build 210 selection AND the Build 214 approval exactly (source-of-truth consistency).
if ((priorSelection.copy_selection_evidence || {}).selected_variant_text !== ev.approved_message_text) {
  fail('approved_message_text must match the Build 210 selected R1 text exactly');
}
if ((priorApproval.signed_approval_capture_evidence || {}).approved_message_text !== ev.approved_message_text) {
  fail('approved_message_text must match the Build 214 approved R1 text exactly');
}
pass('build_215_closeout_evidence_records_successful_guarded_one_r1_send_recipient_confirmed_exact_r1_match');

// --- 2. DYNAMIC PROOF against the Build 213 fixed/guarded runner module (side-effect-free require) ---
if (!/body:\s*resolvedBody/.test(liveRunner)) fail('runner messages.create body must be bound to resolvedBody (the approved selected variant)');
if (/body:\s*'RoofLeadHQ controlled live test/.test(liveRunner)) fail('runner must NOT pass the hardcoded generic body literal as the messages.create body');
if (!/require\.main\s*===\s*module/.test(liveRunner)) fail('runner live execution must be guarded behind require.main===module');

const runner = require(fullPath(liveRunnerPath));
if (typeof runner.resolveOutboundBody !== 'function') fail('runner must export resolveOutboundBody()');
if (typeof runner.resolveApprovedVariant !== 'function') fail('runner must export resolveApprovedVariant()');
if (typeof runner.assertOutboundBodyMatchesApprovedVariant !== 'function') fail('runner must export assertOutboundBodyMatchesApprovedVariant()');
if (runner.FORBIDDEN_STALE_GENERIC_BODY !== genericText) fail('runner FORBIDDEN_STALE_GENERIC_BODY must equal the known stale generic copy');

const resolvedBody = runner.resolveOutboundBody();
if (resolvedBody !== expectedR1Text) fail('runner.resolveOutboundBody() must equal the approved R1 text exactly (got: ' + JSON.stringify(resolvedBody) + ')');
if (resolvedBody !== ev.approved_message_text) fail('runner.resolveOutboundBody() must equal THIS closeout approved_message_text exactly');
if (resolvedBody === genericText) fail('runner.resolveOutboundBody() must NOT equal the stale generic copy');

const approvedVariant = runner.resolveApprovedVariant();
if (approvedVariant.ok !== true) fail('runner.resolveApprovedVariant() must resolve ok against the signed approval source');
if (approvedVariant.signed !== true || approvedVariant.granted !== true) fail('runner.resolveApprovedVariant() must reflect a signed+granted approval source');
if (runner.assertOutboundBodyMatchesApprovedVariant(resolvedBody, approvedVariant).length !== 0) {
  fail('guard must PERMIT the approved R1 body (expected no block reasons)');
}
const genericBlocks = runner.assertOutboundBodyMatchesApprovedVariant(genericText, approvedVariant);
if (genericBlocks.length === 0) fail('guard must BLOCK the stale generic delivery-test copy');
if (!genericBlocks.includes('outbound_body_is_stale_generic_delivery_test_copy')) fail('guard must flag the stale generic copy explicitly');
pass('build_215_runner_resolved_outbound_body_equals_approved_r1_not_generic_corroborates_live_match');

// --- 2b. Manual execution evidence preserved: sent, message binding bound to R1, no recipient number, no body ---
if (evidence.sms_was_sent !== true) fail('manual execution evidence must remain sms_was_sent=true');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence recipient number must remain not recorded');
const evBinding = evidence.message_binding || {};
if (evBinding.bound_to_approved_selected_variant !== true) fail('evidence message_binding.bound_to_approved_selected_variant must be true');
if (evBinding.outbound_body_equals_approved_selected_variant !== true) fail('evidence message_binding.outbound_body_equals_approved_selected_variant must be true');
if (evBinding.selected_variant !== 'R1') fail('evidence message_binding.selected_variant must be R1');
if (evBinding.outbound_body_is_stale_generic_delivery_test_copy !== false) fail('evidence message_binding.outbound_body_is_stale_generic_delivery_test_copy must be false');
if (Object.prototype.hasOwnProperty.call(evidence, 'message_body') || Object.prototype.hasOwnProperty.call(evidence, 'body')) {
  fail('manual execution evidence must not record the message body');
}
if (evidence.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('evidence final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
pass('build_215_manual_execution_evidence_preserved_message_binding_bound_to_r1_no_number_no_body');

// --- 3. Strategic next decision packet ---
const decision = closeout.next_decision_packet || {};
const requiredDecision = {
  decision: 'GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL',
  recommended_next_option: 'small_consenting_roofer_workflow_validation_packet',
  authorizes_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_215_next_decision_packet_guarded_r1_live_delivery_confirmed_small_roofer_pilot_ready_for_approval');

// --- 4. Fastest pilot path (lean, fewest useful steps; no homeowner contact; per-recipient approval) ---
const fpp = closeout.fastest_pilot_path || {};
const requiredFppFlags = {
  no_homeowner_contact_yet_unless_separately_approved: true,
  no_unrestricted_launch: true,
  no_live_automation_activation_beyond_explicitly_approved_jason_operated_sms_attempts: true,
  each_recipient_requires_its_own_fresh_signed_approval_before_send: true,
  move_immediately_from_proof_sms_to_sales_pilot_conversation: true
};
for (const [k, v] of Object.entries(requiredFppFlags)) {
  if (fpp[k] !== v) fail('fastest_pilot_path ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(fpp[k]) + ')');
}
if (!Array.isArray(fpp.steps) || fpp.steps.length < 3) fail('fastest_pilot_path.steps must be a lean list of steps');
const validateOnly = Array.isArray(fpp.validate_only) ? fpp.validate_only : [];
for (const needle of ['message_received_and_matched_expected_copy', 'roofer_understands_value', 'roofer_wants_to_continue_into_workflow_validation_or_sales_conversation']) {
  if (!validateOnly.includes(needle)) fail('fastest_pilot_path.validate_only must include: ' + needle);
}
pass('build_215_fastest_pilot_path_lean_validate_three_things_only_no_homeowner_per_recipient_approval');

// --- 5. Lean feedback-capture template (all pending; no send during capture) ---
const fb = closeout.feedback_capture_template || {};
const requiredPendingKeys = ['sms_received_status', 'message_match_status', 'value_understood_status',
  'useful_for_roofer_status', 'wants_next_step_status', 'sales_or_pilot_interest_status', 'requested_changes_summary'];
for (const k of requiredPendingKeys) {
  if (fb[k] !== 'pending') fail('feedback_capture_template ' + k + ' must be "pending" (got ' + JSON.stringify(fb[k]) + ')');
}
if (fb.no_send_during_feedback_capture_required !== true) fail('feedback_capture_template must require no send during feedback capture');
pass('build_215_lean_feedback_capture_template_all_pending_no_send_during_capture');

// --- Post-send env-clear check (names-only; cleared booleans) ---
const envClear = closeout.post_send_env_clear_check || {};
if (envClear.env_clear_check_passed !== true) fail('post_send_env_clear_check.env_clear_check_passed must be true');
if (envClear.secret_values_read_in_this_build !== false) fail('post_send_env_clear_check.secret_values_read_in_this_build must be false');
if (envClear.all_listed_env_names_cleared !== true) fail('post_send_env_clear_check.all_listed_env_names_cleared must be true');
for (const name of ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER', 'CONTROLLED_LIVE_SMS_TO_NUMBER', 'CONTROLLED_LIVE_SMS_CONFIRM', 'RAW_NUMBER', 'CLEAN_NUMBER']) {
  if (!(envClear.cleared_env_names || []).includes(name)) fail('post_send_env_clear_check.cleared_env_names must include ' + name);
}
pass('build_215_post_send_env_clear_check_passed_names_only_all_cleared');

// --- 2. Safety evidence (closeout did no live action) ---
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
pass('build_215_safety_evidence_no_live_action_no_additional_sms_no_twilio_no_network_no_contact_no_secrets');

// --- Homeowner boundary preserved ---
const home = closeout.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_215_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Closeout safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called',
  'sms_sent_during_closeout', 'additional_sms_sent_during_closeout', 'network_or_external_call_made',
  'retry_performed', 'confirm_token_armed', 'live_runner_executed_live', 'real_roofer_contacted_during_closeout',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = closeout.closeout_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('closeout packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('closeout safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
pass('build_215_closeout_attestations_no_send_no_network_no_retry_no_live_runner_exec_no_secrets_no_automation');

// --- Reference integrity: builds on Build 214 approval; prior artifacts preserved/consistent ---
if (closeout.prior_build_214_reference.build_214_decision !== 'R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED') {
  fail('Build 215 must reference the Build 214 decision');
}
if (closeout.prior_build_214_reference.build_214_approval_signed !== true) fail('Build 215 must reference Build 214 approval signed');
if (closeout.prior_build_214_reference.build_214_guarded_message_binding_required !== true) fail('Build 215 must reference Build 214 guarded message binding required');
if (priorApproval.build !== 214) fail('prior approval packet must be build 214');
if ((priorApproval.signed_approval_capture_evidence || {}).approval_signed !== true) fail('Build 214 approval_signed must remain true (unchanged)');
if (priorBindingFix.build !== 213) fail('prior binding-fix packet must be build 213');
if ((priorBindingFix.message_binding_fix || {}).resolved_outbound_message_equals_r1 !== true) fail('Build 213 resolved_outbound_message_equals_r1 must remain true (unchanged)');
if (priorCloseout.build !== 212) fail('prior closeout must be build 212');
if ((priorCloseout.send_closeout_evidence || {}).sms_sent !== true) fail('Build 212 sms_sent must remain true (unchanged)');
if (priorSelection.build !== 210) fail('prior selection must be build 210');
if ((priorSelection.copy_selection_evidence || {}).selected_variant_id !== 'R1') fail('Build 210 selection selected_variant_id must remain R1 (unchanged)');
pass('build_215_builds_on_build_214_and_prior_artifacts_preserved');

// --- 6. Launch-readiness summary ---
if (summary.build !== 215) fail('summary build must be 215');
const lanes = summary.readiness_lanes || {};
const coLane = lanes.r1_sms_guarded_send_closeout || {};
const requiredCoLane = {
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  gate_decision_before_execution: 'CONTROLLED_LIVE_SMS_PERMITTED',
  message_binding_bound_to_approved_selected_variant: true,
  outbound_body_equals_approved_selected_variant: true,
  preflight_status: 'PERMITTED',
  send_attempt_count: 1,
  sms_sent: true,
  retry_performed: false,
  final_decision: 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT',
  exit_status: 0,
  recipient_confirmed_sms_received: true,
  recipient_confirmed_actual_text_matches_r1: true,
  recipient_confirmed_generic_copy_not_received: true,
  r1_message_binding_validated_live: true,
  r1_value_message_delivery_validated: true,
  approval_consumed: true,
  approval_expired_after_attempt: true,
  env_clear_check_passed: true,
  no_retry_allowed_after_success: true,
  decision: 'GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL',
  recommended_next_option: 'small_consenting_roofer_workflow_validation_packet'
};
for (const [k, v] of Object.entries(requiredCoLane)) {
  if (coLane[k] !== v) fail('summary r1_sms_guarded_send_closeout lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(coLane[k]) + ')');
}
// The controlled-live lane must now record validated value (the live match).
const liveLane = lanes.controlled_live_sms_to_jason || {};
if (liveLane.message_content_validated_value !== true) fail('summary controlled_live_sms_to_jason lane must record message_content_validated_value=true');
if (liveLane.outbound_body_equals_approved_selected_variant !== true) fail('summary controlled_live_sms_to_jason lane must record outbound_body_equals_approved_selected_variant=true');
// Prior lanes preserved.
const gaLane = lanes.r1_sms_guarded_send_approval || {};
if (gaLane.approval_signed !== true) fail('summary must preserve Build 214 approval_signed=true');
if (gaLane.resolved_outbound_message_equals_r1 !== true) fail('summary must preserve Build 214 resolved_outbound_message_equals_r1=true');
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven',
  'build_213_fixed_the_send_message_binding_to_the_approved_selected_variant',
  'build_214_new_fresh_signed_guarded_approval_captured_for_one_r1_sms',
  'build_215_guarded_r1_live_sms_sent_successfully_one_attempt_no_retry',
  'build_215_message_binding_bound_to_approved_selected_variant_outbound_body_equalled_approved_r1',
  'build_215_recipient_confirmed_actual_received_text_matched_r1_exactly',
  'build_215_recipient_confirmed_generic_delivery_test_copy_not_received',
  'build_215_r1_message_binding_validated_live',
  'build_215_r1_value_message_delivery_validated_end_to_end',
  'build_215_sms_delivery_plus_approved_copy_binding_now_proven',
  'capturing_closeout_is_not_a_send',
  'next_move_is_small_consenting_roofer_workflow_validation_not_more_infrastructure_scaffolding',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled',
  'next_step_is_not_unrestricted_launch',
  'next_live_send_requires_new_fresh_signed_approval']) {
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
if (summary.next_step_is_small_consenting_roofer_workflow_validation !== true) fail('summary next step must be small consenting roofer workflow validation');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.next_live_send_requires_new_fresh_signed_approval !== true) fail('summary next_live_send_requires_new_fresh_signed_approval must be true');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_215_launch_readiness_summary_records_successful_guarded_send_live_match_small_roofer_pilot_next');

// --- No secret values / phone numbers / raw SIDs anywhere in Build 215 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count|one_message_cap)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_or_raw_sids_present_in_any_build_215_artifact');

// The live confirm-token NAME and its arming VALUE, constructed via concatenation so neither full literal
// appears contiguously in this verifier's own source.
const confirmTokenName = 'CONTROLLED' + '_LIVE_SMS_' + 'CONFIRM';
const confirmArmValue = 'SEND_ONE' + '_LIVE_SMS';
const confirmArmLiteral = confirmTokenName + '=' + confirmArmValue;

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
const runnerPathEscaped = liveRunnerPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const armLiteralEscaped = confirmArmLiteral.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
if (new RegExp(armLiteralEscaped + '\\s+node\\s+' + runnerPathEscaped).test(wrapper)) {
  fail('wrapper must NOT arm + run the live execution runner');
}
if (wrapper.includes(confirmArmLiteral)) fail('wrapper must NOT arm the live confirm token');
if (new RegExp('node\\s+' + runnerPathEscaped).test(wrapper)) fail('wrapper must NOT run the live execution runner');
if (!wrapper.includes('verify-r1-sms-send-closeout-build-215-readonly.js')) fail('wrapper must run the Build 215 verifier');
pass('build_215_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not arm/send ---
const selfText = read('backend/scripts/verify-r1-sms-send-closeout-build-215-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
const confirmArmLines = selfText.split('\n').filter((line) => line.includes(confirmArmLiteral)
  && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//')
  && !line.includes('confirmTokenName') && !line.includes('confirmArmValue') && !line.includes('confirmArmLiteral'));
if (confirmArmLines.length > 0) fail('verifier must not arm the live confirm token');
pass('build_215_verifier_is_read_only_requires_runner_module_side_effect_free_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 215', 'GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL',
  'new_lead_fast_response_alert', 'guarded', 'message binding', 'recipient confirmed', 'small consenting roofer',
  'one attempt', 'roofer-facing', 'homeowner', 'opt-out', 'no send', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_215_r1_sms_guarded_successful_send_closeout_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['closeout', closeout], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 215 closes out the one approved, Jason-operated, SUCCESSFUL guarded controlled live roofer R1 SMS send (new_lead_fast_response_alert): gate PERMITTED, 1 attempt, sms_sent=true, no retry, final CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit 0.');
console.log('PASS: Recipient confirmed the actual received text matched the approved R1 message EXACTLY (generic copy NOT received) — R1 message binding validated LIVE and R1 value-message delivery proven end-to-end.');
console.log('PASS: DYNAMIC corroboration — the Build 213 fixed/guarded runner resolveOutboundBody()===the approved R1 text (and !==generic); the fail-closed guard PERMITS R1 and BLOCKS the stale generic copy. Requiring the runner module is side-effect-free (no send, no exit).');
console.log('PASS: Decision = GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL; authorizes_send_now=false; approval consumed/expired; next live send requires a NEW fresh signed approval.');
console.log('PASS: Build 215 is local-only — no live action, no SMS, no Twilio, no network, no retry, no live-runner live execution, no real contact, no secrets/numbers/SIDs, no automation. Next step = small consenting roofer workflow validation packet, NOT send now, NOT unrestricted launch.');
console.log('PASS: Build 215 verifier passed (' + passCount + ' assertions).');
