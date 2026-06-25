#!/usr/bin/env node
/**
 * Build 214 Read-Only Verifier — R1 SMS Guarded Send Fresh Signed Approval Capture.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper AND a side-effect-free
 * require of the Build 213 fixed/guarded live runner module to PROVE the resolved outbound message (the
 * runner's live send path is guarded behind require.main===module, so requiring it performs NO send and NO
 * process.exit). No network, no process.env secret-value access, no credentials, no secret VALUES, no
 * production data, no live activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT
 * invoke the runner's live execution; does NOT construct a Twilio client; does NOT call messages.create;
 * does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 214 CAPTURES Jason's fresh, signed, per-attempt GUARDED approval for ONE Jason-operated controlled
 *    live roofer SMS send using the Build 213 fixed/guarded R1 message binding: approval_signed=true,
 *    approval_granted=true, build_213_message_binding_fix_required/verified=true, selected_message_variant=R1,
 *    selected_variant_label=new_lead_fast_response_alert, approved_message_text===R1, guarded_message_binding_
 *    required=true, outbound_body_must_equal_approved_message=true, max_message_count=1, sms_only=true,
 *    retry_allowed=false, jason_operated_send_only=true, build_environment_send=false, homeowner_contact_
 *    authorized=false, live_automation_activation_authorized=false, unrestricted_launch_authorized=false,
 *    production_data_authorized=false, destination_entry_silent_outside_repo_chat_logs_required=true,
 *    secrets_phone_numbers_not_recorded_required=true, send_time_preflight_required=true,
 *    approval_expires_after_one_attempt_whether_sent_or_failed=true.
 *  - The approved R1 text matches EXACTLY the Build 210 selection and the Build 211 approval, is roofer-facing
 *    + SMS-only, contains opt-out language, and contains no guarantee/booked-jobs/estimate/quote/invoice/
 *    payment/deposit claim language.
 *  - DYNAMICALLY (side-effect-free) the Build 213 fixed/guarded runner's resolveOutboundBody() equals THIS
 *    packet's approved_message_text (R1) and !== the stale generic copy; the fail-closed guard PERMITS the
 *    approved R1 body and BLOCKS the stale generic body, any non-approved body, and an empty body. This proves
 *    the next guarded send will deliver exactly the freshly-approved R1 text.
 *  - The next decision packet records R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED,
 *    authorizes_send_now=false, send_time_preflight_required=true, guarded_message_binding_required=true.
 *  - The send-time preflight checklist records the required fail-closed steps (including the guarded-body
 *    checks) and never arms/executes a send.
 *  - The launch-readiness summary records the guarded approval captured and the next step (preflight then one
 *    guarded attempt, NOT send now, NOT unrestricted launch).
 *  - The Build 214 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values, phone numbers, or raw SIDs; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const approvalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-214.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-214.json`;
const priorBindingFixPath = `${FIXTURE_DIR}/r1-sms-content-mismatch-feedback-build-213.json`;
const priorApprovalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-211.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-212.json`;
const priorSelectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const wrapperPath = 'scripts/run-r1-sms-send-approval-build-214-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_APPROVAL_BUILD_214.md';

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

console.log('== Build 214 R1 SMS Guarded Send Fresh Signed Approval Capture Verification (local-only) ==');

const approval = readJson(approvalPath);
const summary = readJson(summaryPath);
const priorBindingFix = readJson(priorBindingFixPath);
const priorApproval = readJson(priorApprovalPath);
const priorCloseout = readJson(priorCloseoutPath);
const priorSelection = readJson(priorSelectionPath);
const evidence = readJson(evidencePath);
const liveRunner = read(liveRunnerPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';
const genericText = 'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.';

// Forbidden marketing/claim language (must not appear in the APPROVED variant text).
const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

// --- Approval packet: top-level identity + posture ---
if (approval.build !== 214) fail('approval packet build must be 214');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_send_time_preflight_then_one_guarded_attempt: true,
  next_step_is_send_now: false,
  authorizes_send_now: false,
  guarded_message_binding_required: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (approval[k] !== v) fail('approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(approval[k]) + ')');
}
pass('build_214_approval_packet_is_pilot_gated_guarded_no_send_now_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Signed approval capture evidence (fresh guarded per-attempt approval for one R1 SMS) ---
const cap = approval.signed_approval_capture_evidence || {};
const requiredCap = {
  approval_signed: true,
  approval_granted: true,
  build_213_message_binding_fix_required: true,
  build_213_message_binding_fix_verified: true,
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  guarded_message_binding_required: true,
  outbound_body_must_equal_approved_message: true,
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
if (cap.approved_message_text !== expectedR1Text) fail('signed_approval_capture_evidence.approved_message_text must match the approved R1 text exactly');
if (cap.selected_variant_text !== expectedR1Text) fail('signed_approval_capture_evidence.selected_variant_text must match the approved R1 text exactly');
if (cap.approved_message_text !== cap.selected_variant_text) fail('approved_message_text and selected_variant_text must be identical (the approved R1 text)');
// Approved text must equal the Build 210 selection AND the Build 211 approval exactly (source-of-truth consistency).
if ((priorSelection.copy_selection_evidence || {}).selected_variant_text !== cap.approved_message_text) {
  fail('approved_message_text must match the Build 210 selected R1 text exactly');
}
if ((priorApproval.signed_approval_capture_evidence || {}).selected_variant_text !== cap.approved_message_text) {
  fail('approved_message_text must match the Build 211 approved R1 text exactly');
}
// Approved text is roofer-facing SMS, opt-out present, no forbidden claim language.
if (!/reply stop/i.test(cap.approved_message_text) && !/stop to opt out/i.test(cap.approved_message_text)) {
  fail('approved_message_text must include STOP opt-out language');
}
for (const pat of forbiddenClaimPatterns) {
  if (pat.test(cap.approved_message_text)) fail('approved_message_text contains forbidden claim/guarantee language: ' + pat);
}
// Exact approval statement text present and references the Build 213 guarded binding, one SMS, no retry, preflight, single-attempt expiry.
const stmt = cap.exact_approval_statement_text;
if (typeof stmt !== 'string') fail('signed_approval_capture_evidence.exact_approval_statement_text must be a string');
if (!/Jason Lohse/.test(stmt)) fail('exact approval statement must name Jason Lohse');
if (!/Build 213 fixed\/guarded R1 message binding/.test(stmt)) fail('exact approval statement must reference the Build 213 fixed/guarded R1 message binding');
if (stmt.indexOf(expectedR1Text) === -1) fail('exact approval statement must contain the exact approved R1 text');
for (const needle of ['one SMS only', 'no retry', 'no homeowner contact', 'no live automation activation', 'no unrestricted launch', 'no production data', 'send-time preflight required', 'guarded message binding', 'expires after one attempt']) {
  if (stmt.toLowerCase().indexOf(needle.toLowerCase()) === -1) fail('exact approval statement must include scope phrase: ' + needle);
}
pass('build_214_signed_approval_capture_evidence_records_fresh_guarded_one_r1_sms_approval_exact_text_no_retry_preflight_required');

// --- 2. DYNAMIC PROOF against the Build 213 fixed/guarded runner module (side-effect-free require) ---
// Static checks against the runner source: body bound to resolvedBody, not a hardcoded generic literal.
if (!/body:\s*resolvedBody/.test(liveRunner)) fail('runner messages.create body must be bound to resolvedBody (the approved selected variant)');
if (/body:\s*'RoofLeadHQ controlled live test/.test(liveRunner)) fail('runner must NOT pass the hardcoded generic body literal as the messages.create body');
if (!liveRunner.includes('signed_approval_capture_evidence')) fail('runner must read the approved variant from signed_approval_capture_evidence');
if (!liveRunner.includes('selected_variant_text')) fail('runner must bind to selected_variant_text');
if (!/require\.main\s*===\s*module/.test(liveRunner)) fail('runner live execution must be guarded behind require.main===module');

const runner = require(fullPath(liveRunnerPath));
if (typeof runner.resolveOutboundBody !== 'function') fail('runner must export resolveOutboundBody()');
if (typeof runner.resolveApprovedVariant !== 'function') fail('runner must export resolveApprovedVariant()');
if (typeof runner.assertOutboundBodyMatchesApprovedVariant !== 'function') fail('runner must export assertOutboundBodyMatchesApprovedVariant()');
if (runner.FORBIDDEN_STALE_GENERIC_BODY !== genericText) fail('runner FORBIDDEN_STALE_GENERIC_BODY must equal the known stale generic copy');

const resolvedBody = runner.resolveOutboundBody();
if (resolvedBody !== expectedR1Text) fail('runner.resolveOutboundBody() must equal the approved R1 text exactly (got: ' + JSON.stringify(resolvedBody) + ')');
if (resolvedBody !== cap.approved_message_text) fail('runner.resolveOutboundBody() must equal THIS packet approved_message_text exactly');
if (resolvedBody === genericText) fail('runner.resolveOutboundBody() must NOT equal the stale generic copy');

const approvedVariant = runner.resolveApprovedVariant();
if (approvedVariant.ok !== true) fail('runner.resolveApprovedVariant() must resolve ok against the signed approval source');
if (approvedVariant.signed !== true || approvedVariant.granted !== true) fail('runner.resolveApprovedVariant() must reflect a signed+granted approval source');

// Fail-closed guard behavior proves the guarded send will deliver exactly R1.
if (runner.assertOutboundBodyMatchesApprovedVariant(resolvedBody, approvedVariant).length !== 0) {
  fail('guard must PERMIT the approved R1 body (expected no block reasons)');
}
const genericBlocks = runner.assertOutboundBodyMatchesApprovedVariant(genericText, approvedVariant);
if (genericBlocks.length === 0) fail('guard must BLOCK the stale generic delivery-test copy');
if (!genericBlocks.includes('outbound_body_is_stale_generic_delivery_test_copy')) fail('guard must flag the stale generic copy explicitly');
if (runner.assertOutboundBodyMatchesApprovedVariant('some other non-approved text', approvedVariant).length === 0) {
  fail('guard must BLOCK any non-approved outbound body');
}
if (runner.assertOutboundBodyMatchesApprovedVariant('', approvedVariant).length === 0) fail('guard must BLOCK an empty outbound body');
pass('build_214_runner_resolved_outbound_body_equals_approved_r1_not_generic_guard_blocks_generic_and_non_approved');

// --- Guarded runner binding reference in the packet matches reality ---
const bindRef = approval.guarded_runner_binding_reference || {};
if (bindRef.runner_path !== liveRunnerPath) fail('guarded_runner_binding_reference.runner_path must point to the live runner');
const requiredBindRef = {
  outbound_body_bound_to_approved_selected_variant: true,
  fail_closed_guard_function_name: 'assertOutboundBodyMatchesApprovedVariant',
  resolve_function_name: 'resolveOutboundBody',
  runner_require_is_side_effect_free_no_send_no_exit: true,
  resolved_outbound_body_equals_approved_r1: true,
  resolved_outbound_body_equals_generic_delivery_test_copy: false,
  guard_blocks_any_non_approved_or_stale_generic_body: true
};
for (const [k, v] of Object.entries(requiredBindRef)) {
  if (bindRef[k] !== v) fail('guarded_runner_binding_reference ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(bindRef[k]) + ')');
}
if (typeof runner[bindRef.fail_closed_guard_function_name] !== 'function') fail('packet-named guard function must exist on the runner module');
if (typeof runner[bindRef.resolve_function_name] !== 'function') fail('packet-named resolve function must exist on the runner module');
pass('build_214_guarded_runner_binding_reference_matches_runner_module');

// --- 3. Next decision packet ---
const decision = approval.next_decision_packet || {};
const requiredDecision = {
  decision: 'R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_send_time_preflight_then_one_guarded_jason_operated_sms_attempt',
  authorizes_send_now: false,
  send_time_preflight_required: true,
  guarded_message_binding_required: true,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_214_next_decision_packet_r1_guarded_signed_approval_captured_send_time_preflight_required');

// --- 4. Send-time preflight checklist (no arm / no execute; includes guarded-body checks) ---
const pre = approval.send_time_preflight_checklist || {};
if (pre.armed_by_build !== false) fail('preflight checklist armed_by_build must be false');
if (pre.executed_by_build !== false) fail('preflight checklist executed_by_build must be false');
const checklist = Array.isArray(pre.checklist) ? pre.checklist.map((c) => String(c).toLowerCase()) : [];
const requiredChecklistNeedles = [
  'source secrets only from /root/roofleadhq-local-secrets/live-sms.env',
  'enter destination silently outside repo/chat/logs',
  'names-only env presence check',
  'verify approved message equals r1 exactly',
  'verify guarded resolved outbound body equals approved r1 exactly',
  'verify resolved outbound body is not generic delivery-test copy',
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
  verify_approved_message_equals_r1: true,
  verify_guarded_resolved_outbound_body_equals_r1: true,
  verify_resolved_outbound_body_not_generic: true,
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
if (pre.guarded_fail_closed_runner_reference !== liveRunnerPath) fail('preflight checklist must reference the guarded fail-closed runner');
pass('build_214_send_time_preflight_checklist_records_guarded_fail_closed_steps_never_arms_or_executes');

// --- Homeowner boundary preserved ---
const home = approval.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_214_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Approval-capture safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called',
  'sms_sent_during_approval_capture', 'network_or_external_call_made', 'retry_performed', 'confirm_token_armed',
  'live_runner_executed_live', 'real_roofer_contacted_during_approval_capture', 'real_homeowner_contacted',
  'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added',
  'schema_auth_rls_security_changes'];
const att = approval.approval_capture_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('approval packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('approval-capture safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('approval-capture other_live_automation_remains_disabled must be true');
pass('build_214_approval_capture_attestations_no_send_no_network_no_retry_no_live_runner_exec_no_secrets_no_automation');

// --- Reference integrity: builds on Build 213 fix; prior artifacts preserved/consistent ---
if (approval.prior_build_213_reference.build_213_decision !== 'R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND') {
  fail('Build 214 must reference the Build 213 decision');
}
if (approval.prior_build_213_reference.build_213_message_binding_fix_applied !== true) fail('Build 214 must reference Build 213 message binding fix applied');
if (priorBindingFix.build !== 213) fail('prior binding-fix packet must be build 213');
if ((priorBindingFix.message_binding_fix || {}).resolved_outbound_message_equals_r1 !== true) fail('Build 213 resolved_outbound_message_equals_r1 must remain true (unchanged)');
if (approval.prior_build_212_reference.build_212_sms_sent !== true) fail('Build 214 must reference Build 212 sms_sent=true');
if (approval.prior_build_212_reference.build_212_approval_consumed !== true) fail('Build 214 must reference Build 212 approval consumed');
if (priorCloseout.build !== 212) fail('prior closeout must be build 212');
if ((priorCloseout.send_closeout_evidence || {}).sms_sent !== true) fail('Build 212 sms_sent must remain true (unchanged)');
if (priorApproval.build !== 211) fail('prior approval must be build 211');
if ((priorApproval.signed_approval_capture_evidence || {}).approval_signed !== true) fail('Build 211 approval_signed must remain true (unchanged)');
if (priorSelection.build !== 210) fail('prior selection must be build 210');
if ((priorSelection.copy_selection_evidence || {}).selected_variant_id !== 'R1') fail('Build 210 selection selected_variant_id must remain R1 (unchanged)');
// Manual execution evidence preserved: sent, no recipient number, and message body NOT recorded.
if (evidence.sms_was_sent !== true) fail('manual execution evidence must remain sms_was_sent=true');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence recipient number must remain not recorded');
if (Object.prototype.hasOwnProperty.call(evidence, 'message_body') || Object.prototype.hasOwnProperty.call(evidence, 'body')) {
  fail('manual execution evidence must not record the message body');
}
pass('build_214_builds_on_build_213_and_prior_artifacts_preserved_evidence_has_no_message_body');

// --- 5. Launch-readiness summary ---
if (summary.build !== 214) fail('summary build must be 214');
const lanes = summary.readiness_lanes || {};
const gaLane = lanes.r1_sms_guarded_send_approval || {};
const requiredGaLane = {
  selected_message_variant: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  build_213_message_binding_fix_required: true,
  build_213_message_binding_fix_verified: true,
  approval_signed: true,
  approval_granted: true,
  guarded_message_binding_required: true,
  outbound_body_must_equal_approved_message: true,
  resolved_outbound_message_equals_r1: true,
  resolved_outbound_message_equals_generic: false,
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
  decision: 'R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_send_time_preflight_then_one_guarded_jason_operated_sms_attempt',
  authorizes_send_now: false,
  next_step_is_send_time_preflight_then_one_guarded_attempt_not_send_now: true
};
for (const [k, v] of Object.entries(requiredGaLane)) {
  if (gaLane[k] !== v) fail('summary r1_sms_guarded_send_approval lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(gaLane[k]) + ')');
}
// Prior lanes preserved.
const cmLane = lanes.r1_sms_content_mismatch_feedback_and_fix || {};
if (cmLane.message_binding_fix_applied !== true) fail('summary must preserve Build 213 message_binding_fix_applied=true');
if (cmLane.resolved_outbound_message_equals_r1 !== true) fail('summary must preserve Build 213 resolved_outbound_message_equals_r1=true');
const coLane = lanes.r1_sms_send_closeout || {};
if (coLane.sms_sent !== true) fail('summary must preserve Build 212 closeout sms_sent=true');
if (coLane.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary must preserve Build 212 final_decision');
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven',
  'build_212_delivery_succeeded_technically',
  'build_213_fixed_the_send_message_binding_to_the_approved_selected_variant',
  'build_213_added_fail_closed_guard_blocking_any_non_approved_or_stale_generic_outbound_body',
  'build_213_resolved_outbound_message_verified_locally_equals_r1_not_generic',
  'build_214_new_fresh_signed_guarded_approval_captured_for_one_r1_sms',
  'build_214_approval_is_single_use_and_expires_after_one_attempt_whether_sent_or_failed',
  'build_214_guarded_message_binding_required_outbound_body_must_equal_approved_r1',
  'build_214_runner_resolved_outbound_body_verified_locally_equals_r1_not_generic',
  'capturing_approval_is_not_a_send',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_send_time_preflight_then_one_guarded_jason_operated_sms_attempt_not_send_now',
  'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled',
  'next_step_is_not_unrestricted_launch']) {
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
if (summary.next_step_is_send_time_preflight_then_one_guarded_attempt !== true) fail('summary next step must be preflight then one guarded attempt');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.guarded_message_binding_required !== true) fail('summary guarded_message_binding_required must be true');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_214_launch_readiness_summary_records_guarded_approval_captured_preflight_then_one_guarded_attempt_next');

// --- No secret values / phone numbers / raw SIDs anywhere in Build 214 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(approval), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count|one_message_cap)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_or_raw_sids_present_in_any_build_214_artifact');

// The live confirm-token NAME and its arming VALUE, constructed via concatenation so neither full literal
// appears contiguously in this verifier's own source — that lets the self-check below assert the verifier
// never ARMS the token without the self-check tripping on its own legitimate references.
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
if (!wrapper.includes('verify-r1-sms-send-approval-build-214-readonly.js')) fail('wrapper must run the Build 214 verifier');
pass('build_214_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not arm/send: no twilio sdk require, no messages.create, no confirm-token arming ---
const selfText = read('backend/scripts/verify-r1-sms-send-approval-build-214-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
const confirmArmLines = selfText.split('\n').filter((line) => line.includes(confirmArmLiteral)
  && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//')
  && !line.includes('confirmTokenName') && !line.includes('confirmArmValue') && !line.includes('confirmArmLiteral'));
if (confirmArmLines.length > 0) fail('verifier must not arm the live confirm token');
pass('build_214_verifier_is_read_only_requires_runner_module_side_effect_free_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 214', 'R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  'new_lead_fast_response_alert', 'guarded', 'message binding', 'resolveOutboundBody', 'send-time preflight',
  'one attempt', 'roofer-facing', 'homeowner', 'opt-out', 'no send', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_214_r1_sms_guarded_send_approval_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['approval', approval], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 214 captures Jason\'s fresh, signed, per-attempt GUARDED approval — one Jason-operated controlled live roofer SMS using the Build 213 fixed/guarded R1 message binding (new_lead_fast_response_alert); approval_signed=true, approval_granted=true.');
console.log('PASS: DYNAMIC PROOF — the Build 213 fixed/guarded runner resolveOutboundBody()===the approved R1 text (and !==generic); the fail-closed guard PERMITS the approved R1 body and BLOCKS the stale generic copy and any non-approved/empty body. Requiring the runner module is side-effect-free (no send, no exit). The next guarded send will deliver exactly the approved R1 text.');
console.log('PASS: Decision = R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED; authorizes_send_now=false; one SMS, no retry; guarded message binding required; approval expires after one attempt whether sent or failed.');
console.log('PASS: Build 214 is local-only — no live action, no SMS, no Twilio, no network, no retry, no live-runner live execution, no real contact, no secrets/numbers/SIDs, no automation. Next step = send-time preflight then one guarded Jason-operated SMS attempt, NOT send now, NOT unrestricted launch.');
console.log('PASS: Build 214 verifier passed (' + passCount + ' assertions).');
