#!/usr/bin/env node
/**
 * Build 216 Read-Only Verifier — Jason-Owned Test Identity Workflow Validation Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network, no
 * process.env secret-value access, no credentials, no secret VALUES, no phone numbers, no email addresses,
 * no production data, no live activation, no SMS, no email, no external Twilio/call/calendar call, no retry,
 * no real contacts. Does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm
 * token. Capturing/verifying this packet is NOT a send.
 *
 * Proves Build 216:
 *  - PIVOTS the active pilot path from 'small consenting roofer pilot recipients' to 'Jason-owned test
 *    identity workflow validation' (no consenting real roofer pilot candidates exist yet), labels only.
 *  - Records the Jason-owned pilot constraint evidence, label-only owned test identities (no raw phone/email),
 *    the leanest owned workflow validation plan, 3-5 validation scenarios, a concise roofer-facing message set
 *    (opt-out where SMS; no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims; homeowner copy
 *    draft-only/not approved), the Lindy decision (internal notify/organize only; pending_lindy_audit), the
 *    sales-demo-readiness checklist, the strategic next decision packet, and the active context/handoff path.
 *  - Updates the launch-readiness summary; preserves the safety posture demo_ready_with_live_automation_disabled.
 *  - Carries no secret values, phone numbers, email addresses, or raw SIDs in any Build 216 artifact.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const packetPath = `${FIXTURE_DIR}/jason-owned-workflow-validation-build-216.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-216.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/r1-sms-send-closeout-build-215.json`;
const wrapperPath = 'scripts/run-jason-owned-workflow-validation-build-216-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_JASON_OWNED_WORKFLOW_VALIDATION_BUILD_216.md';

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

console.log('== Build 216 Jason-Owned Test Identity Workflow Validation Verification (local-only) ==');

const packet = readJson(packetPath);
const summary = readJson(summaryPath);
const priorCloseout = readJson(priorCloseoutPath);
const doc = read(docPath);
const wrapper = read(wrapperPath);

const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

// --- Top-level identity + posture ---
if (packet.build !== 216) fail('packet build must be 216');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_jason_owned_workflow_validation: true,
  next_step_is_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  authorizes_send_now: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (packet[k] !== v) fail('packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(packet[k]) + ')');
}
pass('build_216_packet_is_pilot_gated_no_send_now_no_homeowner_no_real_roofer_no_unrestricted_posture_preserved');

// --- 1. Jason-owned pilot constraint evidence ---
const c = packet.jason_owned_pilot_constraint || {};
const requiredConstraint = {
  no_real_roofer_pilot_candidates_available: true,
  initial_testing_uses_jason_owned_channels: true,
  actual_phone_email_values_recorded: false,
  label_only_test_identities_required: true,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredConstraint)) {
  if (c[k] !== v) fail('jason_owned_pilot_constraint ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(c[k]) + ')');
}
pass('build_216_jason_owned_pilot_constraint_evidence_recorded');

// --- 2. Owned test identities (labels only, no raw phone/email) ---
const ids = packet.owned_test_identities || {};
if (ids.raw_phone_values_recorded !== false) fail('owned_test_identities.raw_phone_values_recorded must be false');
if (ids.raw_email_values_recorded !== false) fail('owned_test_identities.raw_email_values_recorded must be false');
const idLabels = (ids.identities || []).map((x) => x.label);
for (const needle of ['jason_as_test_roofer_label', 'jason_as_test_homeowner_label', 'jason_as_operator_label',
  'owned_sms_destination_label_only', 'owned_email_destination_label_only']) {
  if (!idLabels.includes(needle)) fail('owned_test_identities must define label: ' + needle);
}
for (const idEntry of (ids.identities || [])) {
  if (idEntry.raw_value_recorded !== false) fail('owned identity must have raw_value_recorded=false: ' + idEntry.label);
}
const opLabels = ids.operational_labels || {};
const requiredOpLabels = {
  jason_operator_label: 'jason_operator',
  jason_owned_sms_destination_label: 'jason_owned_sms_destination',
  jason_owned_email_destination_label: 'jason_owned_email_destination',
  test_business_label: 'Test Roofing',
  twilio_sender_label: 'test_roofing_twilio_sender'
};
for (const [k, v] of Object.entries(requiredOpLabels)) {
  if (opLabels[k] !== v) fail('operational_labels ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(opLabels[k]) + ')');
}
pass('build_216_owned_test_identities_labels_only_no_raw_phone_or_email');

// --- 3. Owned workflow validation plan (business-critical workflow only) ---
const plan = packet.owned_workflow_validation_plan || {};
if (!Array.isArray(plan.business_critical_workflow_steps) || plan.business_critical_workflow_steps.length < 5) {
  fail('owned_workflow_validation_plan must list the business-critical workflow steps');
}
for (const needle of ['fake_or_owned_lead_comes_in', 'roofleadhq_recognizes_it_as_a_roofing_lead_or_inspection_request',
  'message_binding_is_exact_and_guarded_outbound_body_must_equal_approved_copy', 'jason_confirms_receipt_and_value',
  'output_can_be_shown_in_a_sales_conversation']) {
  if (!plan.business_critical_workflow_steps.includes(needle)) fail('workflow plan must include step: ' + needle);
}
if (plan.live_action_allowed_only_after_fresh_signed_per_attempt_approval !== true) fail('workflow plan must gate live action behind a fresh signed per-attempt approval');
if (plan.no_homeowner_contact !== true) fail('workflow plan must record no_homeowner_contact=true');
if (plan.no_real_roofer_contact !== true) fail('workflow plan must record no_real_roofer_contact=true');
pass('build_216_owned_workflow_validation_plan_business_critical_only_live_action_gated');

// --- 4. Validation scenarios (3-5; required ones present; each fully defined) ---
const sc = packet.validation_scenarios || {};
const scenarios = Array.isArray(sc.scenarios) ? sc.scenarios : [];
if (scenarios.length < 3 || scenarios.length > 5) fail('validation_scenarios must have 3 to 5 scenarios (got ' + scenarios.length + ')');
if (sc.scenario_count !== scenarios.length) fail('validation_scenarios.scenario_count must equal the number of scenarios');
const scenarioLabels = scenarios.map((s) => s.scenario_label);
for (const needle of ['new_roof_inspection_lead_alert', 'missed_or_slow_lead_follow_up_nudge', 'daily_open_lead_recap']) {
  if (!scenarioLabels.includes(needle)) fail('validation_scenarios must include required scenario: ' + needle);
}
for (const s of scenarios) {
  for (const field of ['scenario_label', 'inbound_lead_type', 'expected_roofer_facing_output', 'channel', 'feedback_question']) {
    if (typeof s[field] !== 'string' || s[field].trim().length === 0) fail('scenario ' + (s.scenario_label || '?') + ' missing field: ' + field);
  }
  if (!['sms', 'email', 'internal'].includes(s.channel)) fail('scenario channel must be sms/email/internal: ' + s.scenario_label);
  if (s.live_action_allowed_only_after_fresh_approval !== true) fail('scenario must gate live action behind fresh approval: ' + s.scenario_label);
}
pass('build_216_validation_scenarios_3_to_5_required_present_each_fully_defined_live_gated');

// --- 5. Message set (roofer-facing; opt-out where SMS; no forbidden claims; homeowner draft-only) ---
const ms = packet.message_set || {};
const roofMsgs = Array.isArray(ms.roofer_facing_messages) ? ms.roofer_facing_messages : [];
if (roofMsgs.length < 3) fail('message_set must include the roofer-facing messages');
for (const m of roofMsgs) {
  if (typeof m.text !== 'string' || m.text.trim().length === 0) fail('roofer-facing message missing text: ' + m.message_id);
  for (const pat of forbiddenClaimPatterns) {
    if (pat.test(m.text)) fail('roofer-facing message ' + m.message_id + ' contains forbidden claim/guarantee language: ' + pat);
  }
  if (m.channel === 'sms' && !/reply stop|stop to opt out/i.test(m.text)) {
    fail('SMS roofer-facing message ' + m.message_id + ' must include STOP opt-out language');
  }
  if (m.requires_fresh_signed_approval_before_send !== true) fail('roofer-facing message must require fresh signed approval before send: ' + m.message_id);
}
const homeMsgs = Array.isArray(ms.homeowner_facing_messages_draft_only) ? ms.homeowner_facing_messages_draft_only : [];
if (homeMsgs.length < 1) fail('message_set must include the homeowner-facing draft-only message');
for (const h of homeMsgs) {
  if (h.approved_for_send !== false) fail('homeowner-facing draft message must have approved_for_send=false: ' + h.message_id);
  if (h.status !== 'draft_only_not_approved') fail('homeowner-facing message status must be draft_only_not_approved: ' + h.message_id);
}
pass('build_216_message_set_roofer_facing_opt_out_no_forbidden_claims_homeowner_draft_only');

// --- 6. Lindy decision ---
const lindy = packet.lindy_decision || {};
const requiredLindy = {
  lindy_should_own_product_workflow: false,
  lindy_temporary_bridge_allowed_for_internal_notify_or_organize_only: true,
  lindy_must_not_autonomously_text: true,
  lindy_must_not_autonomously_email: true,
  lindy_must_not_autonomously_call: true,
  lindy_must_not_autonomously_book: true,
  lindy_must_not_sync_crm: true,
  lindy_must_not_contact_homeowners: true,
  lindy_must_not_contact_roofers: true,
  lindy_audit_status: 'pending_lindy_audit',
  recommended_lindy_pilot_mode: 'internal_notify_or_organize_only',
  lindy_live_enabled: false
};
for (const [k, v] of Object.entries(requiredLindy)) {
  if (lindy[k] !== v) fail('lindy_decision ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(lindy[k]) + ')');
}
pass('build_216_lindy_decision_internal_notify_or_organize_only_pending_audit_no_autonomy');

// --- 7. Sales-demo-readiness checklist ---
const sd = packet.sales_demo_readiness || {};
const checklistItems = (sd.checklist || []).map((x) => x.item);
for (const needle of ['owned_workflow_proof_complete', 'one_clean_demo_story',
  'one_screenshot_or_evidence_packet_no_secrets_phone_email', 'simple_offer',
  'sales_conversation_script_points', 'pilot_next_step_line']) {
  if (!checklistItems.includes(needle)) fail('sales_demo_readiness checklist must include: ' + needle);
}
const offer = sd.simple_offer || {};
if (offer.monthly_low !== 399 || offer.monthly_high !== 799) fail('simple_offer monthly range must be 399-799');
if (offer.setup_fee !== 499) fail('simple_offer setup_fee must be 499');
if (offer.trial_days_after_go_live !== 14) fail('simple_offer trial_days_after_go_live must be 14');
if (!Array.isArray(sd.sales_conversation_script_points) || sd.sales_conversation_script_points.length < 3) {
  fail('sales_demo_readiness must include sales conversation script points');
}
if (typeof sd.pilot_next_step_line !== 'string' || !/manual approval first/i.test(sd.pilot_next_step_line)) {
  fail('sales_demo_readiness.pilot_next_step_line must offer to test under manual approval first');
}
for (const pt of sd.sales_conversation_script_points) {
  for (const pat of forbiddenClaimPatterns) {
    if (pat.test(pt)) fail('sales conversation script point contains forbidden claim/guarantee language: ' + pat);
  }
}
pass('build_216_sales_demo_readiness_checklist_offer_399_799_setup_499_trial_14_manual_approval_first');

// --- 8. Strategic next decision packet ---
const decision = packet.next_decision_packet || {};
const requiredDecision = {
  decision: 'JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL',
  recommended_next_option: 'run_owned_identity_workflow_validation_scenarios_after_fresh_approval',
  authorizes_send_now: false,
  next_live_send_requires_new_fresh_signed_approval: true,
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next_decision_packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_216_next_decision_packet_jason_owned_workflow_validation_ready_for_approval');

// --- 10. Active context/handoff path ---
const ach = packet.active_context_handoff || {};
if (ach.active_path !== 'jason_owned_test_identity_workflow_validation_first') fail('active_context_handoff.active_path must be jason_owned_test_identity_workflow_validation_first');
if (ach.make_this_the_active_path !== true) fail('active_context_handoff.make_this_the_active_path must be true');
for (const needle of ['jason_owned_testing_first_using_label_only_identities', 'sales_and_demo_readiness_within_days',
  'recruit_real_roofer_pilots_after_owned_workflow_proof', 'fewer_bigger_strategic_builds_only']) {
  if (!(ach.active_path_steps || []).includes(needle)) fail('active_context_handoff.active_path_steps must include: ' + needle);
}
pass('build_216_active_context_handoff_makes_jason_owned_path_active');

// --- Safety evidence + attestations ---
const safety = packet.safety_evidence || {};
const requiredSafety = {
  no_live_action_during_build: true, no_sms_sent: true, no_email_sent: true, no_twilio_call: true,
  no_call_or_calendar_provider_call: true, no_network_external_call: true, no_roofer_or_homeowner_contact: true,
  no_secret_values_recorded: true, no_phone_number_recorded: true, no_email_address_recorded: true,
  no_raw_sid_recorded: true, no_production_data_used: true, live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredSafety)) {
  if (safety[k] !== v) fail('safety_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(safety[k]) + ')');
}
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'email_address_recorded', 'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called',
  'sms_sent', 'email_sent', 'network_or_external_call_made', 'retry_performed', 'confirm_token_armed',
  'live_runner_executed_live', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used',
  'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added',
  'schema_auth_rls_security_changes', 'lindy_live_workflow_execution'];
const att = packet.build_safety_attestations || {};
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('build safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('build attestation other_live_automation_remains_disabled must be true');
pass('build_216_safety_evidence_and_attestations_no_live_action_no_secrets_no_numbers_no_email');

// --- Homeowner boundary preserved ---
const home = packet.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.approved_for_homeowner_send !== false) fail('homeowner boundary approved_for_homeowner_send must be false');
pass('build_216_homeowner_facing_copy_not_approved_requires_separate_consent');

// --- Reference integrity: builds on Build 215 ---
if (priorCloseout.build !== 215) fail('prior closeout must be build 215');
if ((priorCloseout.guarded_r1_send_closeout_evidence || {}).sms_sent !== true) fail('Build 215 sms_sent must remain true (unchanged)');
if (packet.prior_build_215_reference.build_215_decision !== 'GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL') {
  fail('Build 216 must reference the Build 215 decision');
}
pass('build_216_builds_on_build_215_prior_artifacts_preserved');

// --- 9. Launch-readiness summary ---
if (summary.build !== 216) fail('summary build must be 216');
const lanes = summary.readiness_lanes || {};
const jLane = lanes.jason_owned_workflow_validation || {};
const requiredJLane = {
  no_real_roofer_pilot_candidates_available: true,
  initial_testing_uses_jason_owned_channels: true,
  actual_phone_email_values_recorded: false,
  label_only_test_identities_required: true,
  validation_scenario_count: 5,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  live_automation_remains_disabled: true,
  decision: 'JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL',
  recommended_next_option: 'run_owned_identity_workflow_validation_scenarios_after_fresh_approval'
};
for (const [k, v] of Object.entries(requiredJLane)) {
  if (jLane[k] !== v) fail('summary jason_owned_workflow_validation lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(jLane[k]) + ')');
}
if (jLane.validation_scenario_count !== scenarios.length) fail('summary scenario count must equal packet scenario count');
// Build 215 lane preserved.
const r1Lane = lanes.r1_sms_guarded_send_closeout || {};
if (r1Lane.sms_sent !== true) fail('summary must preserve Build 215 guarded R1 send (sms_sent=true)');
if (r1Lane.r1_value_message_delivery_validated !== true) fail('summary must preserve Build 215 r1_value_message_delivery_validated=true');
const narrative = summary.narrative || {};
for (const k of ['guarded_r1_sms_delivery_proven', 'exact_approved_copy_binding_proven_live',
  'no_real_roofer_pilots_available_yet', 'active_path_is_jason_owned_workflow_validation',
  'jason_owned_testing_uses_label_only_identities', 'actual_phone_or_email_values_not_recorded',
  'next_step_is_small_owned_identity_workflow_validation_run_then_sales_demo_packaging_and_recruiting_real_pilots',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval', 'no_homeowner_contact_authorized',
  'no_real_roofer_contact_authorized', 'broader_live_automation_remains_disabled',
  'next_step_is_not_unrestricted_launch', 'next_live_send_requires_new_fresh_signed_approval',
  'fewer_bigger_strategic_builds_only']) {
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
if (summary.next_step_is_jason_owned_workflow_validation !== true) fail('summary next step must be jason owned workflow validation');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
if (summary.next_live_send_requires_new_fresh_signed_approval !== true) fail('summary next_live_send_requires_new_fresh_signed_approval must be true');
if (summary.authorizes_send_now !== false) fail('summary authorizes_send_now must be false');
pass('build_216_launch_readiness_summary_records_pivot_to_jason_owned_validation_preserves_215_proof');

// --- No secret values / phone numbers / email addresses / raw SIDs in Build 216 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(packet), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
// Email-address-shaped scan (no raw email addresses anywhere).
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|scenario_count|max_allowed|validation_scenario_count|monthly_low|monthly_high|setup_fee|trial_days_after_go_live)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_email_addresses_or_raw_sids_present_in_any_build_216_artifact');

// --- Dry-run wrapper: local-only; runs verifier only; never arms/sends ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
const messagesCreateCall = 'messages' + '.create' + '(';
if (wrapper.includes(messagesCreateCall)) fail('wrapper must not call messages.create');
if (/CONTROLLED_LIVE_SMS_CONFIRM\s*=/.test(wrapper)) fail('wrapper must not arm the live confirm token');
if (/\bnode\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (!wrapper.includes('verify-jason-owned-workflow-validation-build-216-readonly.js')) fail('wrapper must run the Build 216 verifier');
pass('build_216_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not send/arm ---
const selfText = read('backend/scripts/verify-jason-owned-workflow-validation-build-216-readonly.js');
if (/require\(['"]twilio/.test(selfText)) fail('verifier must not require the twilio sdk');
const selfSendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall)
  && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (selfSendLines.length > 0) fail('verifier must not call messages.create');
pass('build_216_verifier_is_read_only_does_not_send_or_arm');

// --- Doc present and labeled ---
for (const needle of ['Build 216', 'JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL',
  'jason_owned', 'labels only', 'pending_lindy_audit', 'opt-out', 'homeowner', 'no send', 'pilot-gated',
  'manual approval first', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_216_jason_owned_workflow_validation_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['packet', packet], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 216 pivots the active pilot path to Jason-owned test identity workflow validation (labels only, no consenting real roofer candidates yet) without losing the business goal.');
console.log('PASS: Records the owned constraint evidence, label-only identities, lean owned workflow validation plan, ' + scenarios.length + ' validation scenarios, roofer-facing message set (opt-out where SMS, no forbidden claims), homeowner draft-only copy, Lindy internal-notify/organize-only decision (pending_lindy_audit), sales-demo-readiness checklist, next decision packet, and active context/handoff path.');
console.log('PASS: Build 216 is local-only — no live action, no SMS, no email, no Twilio, no call/calendar provider, no network, no retry, no real contact, no secrets/phone numbers/email addresses/SIDs, no automation.');
console.log('PASS: Decision = JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL; authorizes_send_now=false; next live send requires a NEW fresh signed approval; launch remains pilot-gated, not unrestricted.');
console.log('PASS: Build 216 verifier passed (' + passCount + ' assertions).');
