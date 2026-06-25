#!/usr/bin/env node
/**
 * Build 213 Read-Only Verifier — R1 SMS Content-Mismatch Feedback, Root-Cause Triage, and Message-Binding FIX.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper AND a side-effect-free
 * require of the live runner module to PROVE the resolved outbound message (the runner's live send path is
 * guarded behind require.main===module, so requiring it performs NO send and NO process.exit). No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the runner's live
 * execution; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 213 CAPTURES the post-send feedback discrepancy: feedback_captured=true, sms_received_status=yes,
 *    actual_received_message_label=generic_delivery_test_copy, expected_selected_variant=R1,
 *    actual_message_matches_expected_r1=false, delivery_mechanics_validated=true,
 *    r1_value_messaging_validated=false, approval_consumed/expired, retry not allowed/performed.
 *  - Root-cause triage = send_script_hardcoded_generic_body_and_missing_selected_variant_binding
 *    (not a stale-fixture lookup / wrong-fixture reference), with the exact local files inspected recorded.
 *  - The LOCAL message-binding FIX is applied and verified DYNAMICALLY against the actual runner module:
 *    resolveOutboundBody() === the approved R1 text and !== the stale generic copy; the fail-closed guard
 *    permits the approved R1 body but blocks the stale generic body and any non-approved body; the runner's
 *    messages.create body is bound to resolvedBody (not a hardcoded generic literal); the approved-variant
 *    source is the explicit signed approval packet; requiring the module is side-effect-free.
 *  - The future-send blocker records the fix done + verified, authorizes_send_now=false, and that the next
 *    live send requires a NEW fresh signed approval; the launch-readiness summary agrees; homeowner boundary
 *    and safety posture preserved; names/booleans/codes only, no secrets/numbers/SIDs.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const packetPath = `${FIXTURE_DIR}/r1-sms-content-mismatch-feedback-build-213.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-213.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-212.json`;
const priorApprovalPath = `${FIXTURE_DIR}/r1-sms-send-approval-build-211.json`;
const priorSelectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const wrapperPath = 'scripts/run-r1-sms-content-mismatch-build-213-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_CONTENT_MISMATCH_BUILD_213.md';

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

console.log('== Build 213 R1 SMS Content-Mismatch Feedback + Root-Cause Triage + Message-Binding FIX Verification (local-only) ==');

const packet = readJson(packetPath);
const summary = readJson(summaryPath);
const priorCloseout = readJson(priorCloseoutPath);
const priorApproval = readJson(priorApprovalPath);
const priorSelection = readJson(priorSelectionPath);
const evidence = readJson(evidencePath);
const liveRunner = read(liveRunnerPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';
const genericText = 'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.';

// --- Top-level identity + posture ---
if (packet.build !== 213) fail('packet build must be 213');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_capture_new_fresh_signed_approval_then_preflight: true,
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
  if (packet[k] !== v) fail('packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(packet[k]) + ')');
}
pass('build_213_packet_is_pilot_gated_new_approval_next_no_send_now_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Feedback discrepancy evidence ---
const fb = packet.feedback_discrepancy_evidence || {};
const requiredFb = {
  feedback_captured: true,
  sms_received_status: 'yes',
  actual_received_message_label: 'generic_delivery_test_copy',
  actual_received_message_text_for_analysis: genericText,
  expected_selected_variant: 'R1',
  expected_selected_variant_label: 'new_lead_fast_response_alert',
  expected_r1_text: expectedR1Text,
  actual_message_matches_expected_r1: false,
  delivery_mechanics_validated: true,
  r1_value_messaging_validated: false,
  approval_consumed: true,
  approval_expired_after_attempt: true,
  retry_allowed: false,
  no_retry_performed: true
};
for (const [k, v] of Object.entries(requiredFb)) {
  if (fb[k] !== v) fail('feedback_discrepancy_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(fb[k]) + ')');
}
if (fb.actual_received_message_text_for_analysis === fb.expected_r1_text) {
  fail('feedback evidence claims a mismatch but actual text equals expected R1 text');
}
if ((priorSelection.copy_selection_evidence || {}).selected_variant_text !== fb.expected_r1_text) {
  fail('expected_r1_text must match the Build 210 selected R1 text exactly');
}
if ((priorApproval.signed_approval_capture_evidence || {}).selected_variant_text !== fb.expected_r1_text) {
  fail('expected_r1_text must match the Build 211 approved R1 text exactly');
}
pass('build_213_feedback_discrepancy_evidence_received_generic_expected_r1_mismatch_real_delivery_validated_value_not');

// --- 2. Root-cause triage (local inspection only) ---
const rc = packet.root_cause_triage || {};
const requiredRc = {
  triage_is_local_file_inspection_only: true,
  no_live_action_during_triage: true,
  root_cause_status: 'send_script_hardcoded_generic_body_and_missing_selected_variant_binding',
  hardcoded_generic_text_in_send_script: true,
  missing_selected_variant_binding: true,
  stale_fixture_lookup: false,
  wrong_fixture_reference: false,
  send_path_references_to_R1_or_selected_variant_before_fix_count: 0,
  secrets_phone_numbers_raw_sids_tokens_recorded_during_triage: false
};
for (const [k, v] of Object.entries(requiredRc)) {
  if (rc[k] !== v) fail('root_cause_triage ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(rc[k]) + ')');
}
const inspected = Array.isArray(rc.local_files_inspected) ? rc.local_files_inspected : [];
for (const f of [liveRunnerPath, evidencePath, priorCloseoutPath, priorApprovalPath, priorSelectionPath]) {
  if (!inspected.includes(f)) fail('root_cause_triage.local_files_inspected must list: ' + f);
  if (!fs.existsSync(fullPath(f))) fail('root_cause_triage lists a file that does not exist locally: ' + f);
}
pass('build_213_root_cause_triage_hardcoded_body_and_missing_selected_variant_binding_local_only');

// --- 3. LOCAL message-binding FIX — proven dynamically against the actual runner module ---
const mb = packet.message_binding_fix || {};
const requiredMb = {
  fix_applied_in_this_build: true,
  fix_is_local_code_change_only_no_live_action: true,
  fixed_file: liveRunnerPath,
  approved_variant_source_path: priorApprovalPath,
  outbound_body_now_bound_to_approved_selected_variant: true,
  hardcoded_generic_body_removed_from_send_path: true,
  resolved_outbound_message_equals_r1: true,
  resolved_outbound_message_equals_generic: false,
  selected_variant_source_explicit_and_verified: true,
  runner_require_is_side_effect_free_no_send_no_exit: true,
  no_sms_sent_during_fix: true,
  no_twilio_call_during_fix: true,
  no_network_external_call_during_fix: true
};
for (const [k, v] of Object.entries(requiredMb)) {
  if (mb[k] !== v) fail('message_binding_fix ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(mb[k]) + ')');
}

// Static checks against the runner source: body bound to resolvedBody, not a hardcoded generic literal.
if (!/body:\s*resolvedBody/.test(liveRunner)) fail('runner messages.create body must be bound to resolvedBody (the approved selected variant)');
if (/body:\s*'RoofLeadHQ controlled live test/.test(liveRunner)) fail('runner must NOT pass the hardcoded generic body literal as the messages.create body');
if (!liveRunner.includes('signed_approval_capture_evidence')) fail('runner must read the approved variant from signed_approval_capture_evidence');
if (!liveRunner.includes('selected_variant_text')) fail('runner must bind to selected_variant_text');
if (!liveRunner.includes('r1-sms-send-approval-build-211.json')) fail('runner must reference the explicit signed approval packet source');
if (!/require\.main\s*===\s*module/.test(liveRunner)) fail('runner live execution must be guarded behind require.main===module');

// Dynamic proof: require the runner module (side-effect-free) and exercise its pure helpers.
const runner = require(fullPath(liveRunnerPath));
if (typeof runner.resolveOutboundBody !== 'function') fail('runner must export resolveOutboundBody()');
if (typeof runner.resolveApprovedVariant !== 'function') fail('runner must export resolveApprovedVariant()');
if (typeof runner.assertOutboundBodyMatchesApprovedVariant !== 'function') fail('runner must export assertOutboundBodyMatchesApprovedVariant()');
if (runner.FORBIDDEN_STALE_GENERIC_BODY !== genericText) fail('runner FORBIDDEN_STALE_GENERIC_BODY must equal the known stale generic copy');

const resolvedBody = runner.resolveOutboundBody();
if (resolvedBody !== expectedR1Text) fail('runner.resolveOutboundBody() must equal the approved R1 text exactly (got: ' + JSON.stringify(resolvedBody) + ')');
if (resolvedBody === genericText) fail('runner.resolveOutboundBody() must NOT equal the stale generic copy');

const approved = runner.resolveApprovedVariant();
if (approved.ok !== true) fail('runner.resolveApprovedVariant() must resolve ok against the signed approval packet');
if (approved.signed !== true || approved.granted !== true) fail('runner.resolveApprovedVariant() must reflect a signed+granted approval source');

// Fail-closed guard behavior:
if (runner.assertOutboundBodyMatchesApprovedVariant(resolvedBody, approved).length !== 0) {
  fail('guard must PERMIT the approved R1 body (expected no block reasons)');
}
const genericBlocks = runner.assertOutboundBodyMatchesApprovedVariant(genericText, approved);
if (genericBlocks.length === 0) fail('guard must BLOCK the stale generic delivery-test copy');
if (!genericBlocks.includes('outbound_body_is_stale_generic_delivery_test_copy')) fail('guard must flag the stale generic copy explicitly');
if (runner.assertOutboundBodyMatchesApprovedVariant('some other non-approved text', approved).length === 0) {
  fail('guard must BLOCK any non-approved outbound body');
}
if (runner.assertOutboundBodyMatchesApprovedVariant('', approved).length === 0) fail('guard must BLOCK an empty outbound body');
pass('build_213_message_binding_fix_proven_resolved_outbound_equals_r1_not_generic_guard_blocks_generic_and_non_approved');

// --- 4. Fail-closed message guard packet record ---
const guard = packet.fail_closed_message_guard || {};
const requiredGuard = {
  guard_added_to_live_runner_in_this_build: true,
  guard_function_name: 'assertOutboundBodyMatchesApprovedVariant',
  blocks_send_unless_outbound_body_exactly_equals_approved_selected_variant: true,
  blocks_stale_generic_delivery_test_copy_explicitly: true,
  blocks_any_non_approved_body: true,
  blocks_when_approval_packet_not_signed_or_granted: true,
  fails_closed_when_approved_variant_unavailable: true,
  asserted_at_preflight_gate_and_again_immediately_before_messages_create: true,
  gate_decision_name_only: 'CONTROLLED_LIVE_SMS_PERMITTED',
  no_live_send_may_proceed_from_stale_generic_message_copy: true
};
for (const [k, v] of Object.entries(requiredGuard)) {
  if (guard[k] !== v) fail('fail_closed_message_guard ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(guard[k]) + ')');
}
if (guard.guard_function_name !== 'assertOutboundBodyMatchesApprovedVariant' || typeof runner[guard.guard_function_name] !== 'function') {
  fail('packet-named guard function must exist on the runner module');
}
pass('build_213_fail_closed_message_guard_record_matches_runner');

// --- 5. Future-send blocker (fix done; still no send; new approval required) ---
const blocker = packet.future_send_blocker || {};
const requiredBlocker = {
  decision: 'R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND',
  recommended_next_option: 'capture_new_fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_r1_sms',
  content_mismatch_root_cause_fixed_locally: true,
  message_binding_verified_locally_equals_r1_not_generic: true,
  authorizes_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredBlocker)) {
  if (blocker[k] !== v) fail('future_send_blocker ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(blocker[k]) + ')');
}
pass('build_213_future_send_blocker_fix_done_verified_no_send_now_new_approval_required');

// --- 6. Safety evidence (no live action; fix is code-change-only) ---
const safety = packet.discrepancy_and_fix_safety_evidence || {};
const requiredSafety = {
  no_live_action_in_this_build: true,
  no_sms_sent: true,
  no_retry: true,
  no_twilio_call: true,
  no_twilio_client_constructed: true,
  no_messages_create_called: true,
  no_network_external_call: true,
  no_roofer_or_homeowner_contact: true,
  no_confirm_token_armed: true,
  live_runner_executed_live: false,
  live_runner_send_message_binding_corrected: true,
  fix_is_code_change_only_not_a_send: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  no_raw_sid_recorded: true,
  no_production_data_used: true,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredSafety)) {
  if (safety[k] !== v) fail('discrepancy_and_fix_safety_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(safety[k]) + ')');
}
pass('build_213_safety_evidence_no_live_action_no_send_fix_is_code_change_only');

// --- Homeowner boundary preserved ---
const home = packet.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_213_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called',
  'sms_sent', 'additional_sms_sent', 'network_or_external_call_made',
  'retry_performed', 'confirm_token_armed', 'live_runner_executed_live',
  'real_roofer_contacted', 'real_homeowner_contacted',
  'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added',
  'schema_auth_rls_security_changes'];
const att = packet.build_213_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('build_213 safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('build_213 other_live_automation_remains_disabled must be true');
pass('build_213_attestations_no_send_no_network_no_retry_no_live_runner_exec_no_secrets_no_automation');

// --- Reference integrity: builds on Build 212 closeout; prior artifacts preserved/consistent ---
if (packet.prior_build_212_reference.build_212_decision !== 'R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED') {
  fail('Build 213 must reference Build 212 decision R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED');
}
if (packet.prior_build_212_reference.build_212_sms_sent !== true) fail('Build 213 must reference Build 212 sms_sent=true');
if (priorCloseout.build !== 212) fail('prior closeout must be build 212');
if ((priorCloseout.send_closeout_evidence || {}).sms_sent !== true) fail('Build 212 sms_sent must remain true (unchanged)');
if ((priorCloseout.send_closeout_evidence || {}).selected_variant !== 'R1') fail('Build 212 selected_variant must remain R1 (unchanged)');
if (priorApproval.build !== 211) fail('prior approval must be build 211');
if ((priorApproval.signed_approval_capture_evidence || {}).approval_signed !== true) fail('Build 211 approval_signed must remain true (unchanged)');
if (priorSelection.build !== 210) fail('prior selection must be build 210');
if ((priorSelection.copy_selection_evidence || {}).selected_variant_id !== 'R1') fail('Build 210 selection selected_variant_id must remain R1 (unchanged)');
// Manual execution evidence preserved: sent, no recipient number, and message body NOT recorded.
if (evidence.sms_was_sent !== true) fail('manual execution evidence must remain sms_was_sent=true');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence recipient number must remain not recorded');
if (evidence.send_attempt_count !== 1) fail('manual execution evidence send_attempt_count must remain 1');
if (Object.prototype.hasOwnProperty.call(evidence, 'message_body') || Object.prototype.hasOwnProperty.call(evidence, 'body')) {
  fail('manual execution evidence must not record the message body');
}
if (packet.manual_execution_evidence_reference.message_body_recorded_in_evidence !== false) {
  fail('Build 213 must record that the message body was NOT recorded in the execution evidence');
}
pass('build_213_builds_on_build_212_and_prior_artifacts_preserved_evidence_has_no_message_body');

// --- 7. Launch-readiness summary ---
if (summary.build !== 213) fail('summary build must be 213');
const lanes = summary.readiness_lanes || {};
const cmLane = lanes.r1_sms_content_mismatch_feedback_and_fix || {};
const requiredCmLane = {
  feedback_captured: true,
  sms_received_status: 'yes',
  delivery_mechanics_validated: true,
  actual_received_message_label: 'generic_delivery_test_copy',
  expected_selected_variant: 'R1',
  actual_message_matches_expected_r1: false,
  r1_value_messaging_validated: false,
  root_cause_status: 'send_script_hardcoded_generic_body_and_missing_selected_variant_binding',
  message_binding_fix_applied: true,
  resolved_outbound_message_equals_r1: true,
  resolved_outbound_message_equals_generic: false,
  fail_closed_message_guard_added: true,
  decision: 'R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND',
  authorizes_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  next_step_is_capture_new_fresh_signed_approval_then_preflight: true
};
for (const [k, v] of Object.entries(requiredCmLane)) {
  if (cmLane[k] !== v) fail('summary r1_sms_content_mismatch_feedback_and_fix lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(cmLane[k]) + ')');
}
const coLane = lanes.r1_sms_send_closeout || {};
if (coLane.sms_sent !== true) fail('summary must preserve Build 212 closeout sms_sent=true');
if (coLane.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary must preserve Build 212 final_decision');
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven',
  'build_212_delivery_succeeded_technically',
  'build_213_feedback_shows_received_copy_remained_generic_delivery_test_copy',
  'r1_value_messaging_not_validated',
  'root_cause_is_hardcoded_generic_body_and_missing_selected_variant_binding',
  'build_213_fixed_the_send_message_binding_to_the_approved_selected_variant',
  'build_213_added_fail_closed_guard_blocking_any_non_approved_or_stale_generic_outbound_body',
  'resolved_outbound_message_verified_locally_equals_r1_not_generic',
  'fix_is_local_code_change_only_not_a_send',
  'approval_was_consumed_and_expired_after_the_build_212_attempt',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_capture_new_fresh_signed_approval_then_preflight_not_send_now',
  'next_live_send_requires_new_fresh_signed_approval',
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
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.next_live_send_requires_new_fresh_signed_approval !== true) fail('summary next_live_send_requires_new_fresh_signed_approval must be true');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_213_launch_readiness_summary_records_discrepancy_root_cause_fix_applied_verified_new_approval_next');

// --- No secret values / phone numbers / raw SIDs anywhere in Build 213 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(packet), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count|one_message_cap|send_path_references_to_R1_or_selected_variant_before_fix_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_or_raw_sids_present_in_any_build_213_artifact');

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
if (!wrapper.includes('verify-r1-sms-content-mismatch-build-213-readonly.js')) fail('wrapper must run the Build 213 verifier');
pass('build_213_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not arm/send: no twilio sdk require, no messages.create, no confirm-token arming ---
const selfText = read('backend/scripts/verify-r1-sms-content-mismatch-build-213-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
// The verifier references the confirm-token NAME only to assert the WRAPPER never arms it. It must never
// itself ARM the token (token set to the send-confirm value). Exclude the check-machinery lines that build
// the literals from concatenated parts (they never contain the contiguous arming literal anyway).
const confirmArmLines = selfText.split('\n').filter((line) => line.includes(confirmArmLiteral)
  && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//')
  && !line.includes('confirmTokenName') && !line.includes('confirmArmValue') && !line.includes('confirmArmLiteral'));
if (confirmArmLines.length > 0) fail('verifier must not arm the live confirm token');
pass('build_213_verifier_is_read_only_requires_runner_module_side_effect_free_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 213', 'R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND',
  'generic_delivery_test_copy', 'new_lead_fast_response_alert', 'delivery', 'value messaging', 'root cause',
  'hardcoded', 'missing_selected_variant_binding', 'fix', 'fail-closed', 'guard', 'resolveOutboundBody',
  'no send', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_213_r1_sms_message_binding_fix_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['packet', packet], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 213 captures the post-send feedback discrepancy — delivery succeeded (sms_received=yes) but the actual received text remained the GENERIC delivery-test copy, NOT the Build 210/211 selected R1. Delivery mechanics validated; R1 value messaging NOT validated.');
console.log('PASS: Root cause = hardcoded generic body + missing selected-variant binding (not a stale-fixture lookup / wrong-fixture reference).');
console.log('PASS: FIX APPLIED + VERIFIED LOCALLY — the runner outbound body is now bound to the approved selected variant; resolveOutboundBody()===R1 and !==generic; the fail-closed guard PERMITS the approved R1 body and BLOCKS the stale generic copy and any non-approved/empty body; requiring the runner module is side-effect-free (no send, no exit).');
console.log('PASS: Decision = R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND; authorizes_send_now=false; next live send requires a new fresh signed approval, then a send-time preflight.');
console.log('PASS: Build 213 is local-only — no live action, no send, no Twilio, no network, no retry, no live-runner live execution, no real contact, no secrets/numbers/SIDs, no automation. The fix is a code change only, NOT a send.');
console.log('PASS: Build 213 verifier passed (' + passCount + ' assertions).');
