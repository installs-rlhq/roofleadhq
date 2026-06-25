#!/usr/bin/env node
/**
 * Build 210 Read-Only Verifier — Pilot SMS Copy Selection + Next-Send Approval/Preflight Template Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 210 records Jason's copy SELECTION of variant R1 (new_lead_fast_response_alert) for the next
 *    controlled ROOFER pilot, with selected_for_homeowner_send=false, no_live_action_during_selection=true,
 *    no_secret_values_recorded=true, no_phone_number_recorded=true, and selection-is-not-send-authorization.
 *  - The selected variant text matches EXACTLY the Build 209 R1 variant text, is roofer-facing + SMS-only,
 *    contains opt-out language, and contains no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit
 *    claim language.
 *  - The rationale records the required reasons (strongest concise value test, new-lead response value,
 *    avoids guarantee/booked-jobs/estimate-quote-invoice-payment-deposit, includes STOP opt-out).
 *  - The next decision packet records decision=R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED,
 *    recommended_next_option=fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_sms,
 *    unrestricted_launch=false, homeowner_contact_authorized=false, live_automation_remains_disabled=true,
 *    next_live_send_requires_fresh_signed_approval=true.
 *  - The UNSIGNED exact approval statement template records approval_signed=false, approval_granted=false,
 *    authorizes_live_action_now=false, selected_message_variant=R1, max_message_count=1, retry_allowed=false,
 *    sms_only=true, jason_operated_send_only=true, build_environment_send=false, and authorizes no homeowner
 *    contact / no live automation / no unrestricted launch.
 *  - The send-time preflight checklist template records the required steps and never arms/executes a send.
 *  - The launch-readiness summary records SMS mechanics proven, Build 209 copy revised, R1 selected for the
 *    next controlled roofer pilot review, and that the next step is fresh signed approval + send-time
 *    preflight (NOT send now, NOT unrestricted launch).
 *  - The Build 210 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const selectionPath = `${FIXTURE_DIR}/pilot-sms-copy-selection-build-210.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-210.json`;
const priorAnalysisPath = `${FIXTURE_DIR}/pilot-sms-copy-analysis-build-209.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-209.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-pilot-sms-copy-selection-build-210-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_SMS_COPY_SELECTION_BUILD_210.md';

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

console.log('== Build 210 Pilot SMS Copy Selection + Next-Send Approval/Preflight Template Verification (local-only) ==');

const selection = readJson(selectionPath);
const summary = readJson(summaryPath);
const priorAnalysis = readJson(priorAnalysisPath);
const priorSummary = readJson(priorSummaryPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// Forbidden marketing/claim language (must not appear in the SELECTED variant text).
const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

// --- Selection packet: top-level identity + posture ---
if (selection.build !== 210) fail('selection packet build must be 210');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_fresh_signed_approval_then_send_time_preflight: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (selection[k] !== v) fail('selection ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(selection[k]) + ')');
}
pass('build_210_selection_packet_is_pilot_gated_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Copy selection evidence (R1 selected for next controlled roofer pilot) ---
const sel = selection.copy_selection_evidence || {};
const requiredSel = {
  selected_variant_id: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  selected_for_next_controlled_roofer_pilot: true,
  selected_for_homeowner_send: false,
  no_live_action_during_selection: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true
};
for (const [k, v] of Object.entries(requiredSel)) {
  if (sel[k] !== v) fail('copy_selection_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(sel[k]) + ')');
}
if (sel.selection_is_review_recommendation_not_send_authorization !== true) {
  fail('copy_selection_evidence must record selection_is_review_recommendation_not_send_authorization=true');
}
const expectedR1Text = 'RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out.';
if (sel.selected_variant_text !== expectedR1Text) {
  fail('selected_variant_text must match the Build 210 R1 text exactly');
}
// Selected text must equal the Build 209 R1 variant text exactly (source-of-truth consistency).
const priorR1 = ((priorAnalysis.roofer_facing_sms_copy_variants || {}).variants || []).find((v) => v.id === 'R1');
if (!priorR1) fail('Build 209 analysis must contain variant R1');
if (priorR1.text !== sel.selected_variant_text) fail('selected_variant_text must match Build 209 variant R1 text exactly');
if (priorR1.label !== sel.selected_variant_label) fail('selected_variant_label must match Build 209 variant R1 label exactly');
// Selected text is roofer-facing SMS, opt-out present, no forbidden claim language.
if (!/reply stop/i.test(sel.selected_variant_text) && !/stop to opt out/i.test(sel.selected_variant_text)) {
  fail('selected_variant_text must include STOP opt-out language');
}
for (const pat of forbiddenClaimPatterns) {
  if (pat.test(sel.selected_variant_text)) fail('selected_variant_text contains forbidden claim/guarantee language: ' + pat);
}
pass('build_210_copy_selection_evidence_records_r1_for_next_roofer_pilot_exact_text_optout_no_claims');

// --- 2. Selection rationale ---
const rationale = selection.selection_rationale || {};
if (rationale.selected_variant_id !== 'R1') fail('selection_rationale.selected_variant_id must be R1');
const reasons = Array.isArray(rationale.reasons) ? rationale.reasons.map((r) => String(r).toLowerCase()) : [];
const requiredReasonNeedles = [
  'strongest concise value test',
  'demonstrates new-lead response value',
  'avoids guarantee language',
  'avoids booked-jobs claims',
  'avoids estimates/quotes/invoices/payments/deposits',
  'includes stop opt-out language'
];
for (const needle of requiredReasonNeedles) {
  if (!reasons.some((r) => r.includes(needle))) fail('selection_rationale.reasons must include: ' + needle);
}
pass('build_210_selection_rationale_records_value_test_no_guarantees_no_claims_optout');

// --- 3. Next decision packet ---
const decision = selection.next_decision_packet || {};
const requiredDecision = {
  decision: 'R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED',
  recommended_next_option: 'fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_sms',
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true,
  next_live_send_requires_fresh_signed_approval: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_210_next_decision_packet_r1_copy_selected_next_send_approval_required');

// --- 4. Unsigned exact approval statement template (authorizes nothing) ---
const tmpl = selection.unsigned_exact_approval_statement_template || {};
const requiredTmpl = {
  approval_signed: false,
  approval_granted: false,
  authorizes_live_action_now: false,
  selected_message_variant: 'R1',
  max_message_count: 1,
  retry_allowed: false,
  sms_only: true,
  jason_operated_send_only: true,
  build_environment_send: false,
  authorizes_homeowner_contact: false,
  authorizes_live_automation: false,
  authorizes_unrestricted_launch: false
};
for (const [k, v] of Object.entries(requiredTmpl)) {
  if (tmpl[k] !== v) fail('unsigned approval template ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(tmpl[k]) + ')');
}
const mustRemainFalse = tmpl.must_remain_false_in_this_build || {};
for (const k of ['approval_signed', 'approval_granted', 'authorizes_live_action_now', 'authorizes_homeowner_contact', 'authorizes_live_automation', 'authorizes_unrestricted_launch']) {
  if (mustRemainFalse[k] !== false) fail('unsigned approval template must_remain_false_in_this_build.' + k + ' must be false');
}
if (typeof tmpl.exact_statement_text_to_be_signed_outside_repo_by_jason !== 'string' || !/R1/.test(tmpl.exact_statement_text_to_be_signed_outside_repo_by_jason)) {
  fail('unsigned approval template must include an exact statement text referencing R1');
}
pass('build_210_unsigned_exact_approval_statement_template_authorizes_nothing_variant_r1_one_message_no_retry');

// --- 5. Send-time preflight checklist template (no arm / no execute) ---
const pre = selection.send_time_preflight_checklist_template || {};
if (pre.armed_by_build !== false) fail('preflight checklist armed_by_build must be false');
if (pre.executed_by_build !== false) fail('preflight checklist executed_by_build must be false');
const checklist = Array.isArray(pre.checklist) ? pre.checklist.map((c) => String(c).toLowerCase()) : [];
const requiredChecklistNeedles = [
  'source secrets only from /root/roofleadhq-local-secrets/live-sms.env',
  'destination entered silently outside repo/chat/logs',
  'names-only env presence check',
  'exact one-message command remains gated until fresh signed approval exists',
  'no retry',
  'unset env values after attempt'
];
for (const needle of requiredChecklistNeedles) {
  if (!checklist.some((c) => c.includes(needle))) fail('preflight checklist must include step: ' + needle);
}
const requiredPreFlags = {
  secret_values_read_in_this_build: false,
  destination_recorded_in_repo: false,
  names_only_env_presence_check: true,
  exact_one_message_command_gated_until_fresh_signed_approval: true,
  retry_allowed: false,
  unset_env_values_after_attempt: true,
  confirm_token_armed_by_build: false
};
for (const [k, v] of Object.entries(requiredPreFlags)) {
  if (pre[k] !== v) fail('preflight checklist ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(pre[k]) + ')');
}
pass('build_210_send_time_preflight_checklist_template_records_fail_closed_steps_never_arms_or_executes');

// --- Homeowner boundary preserved ---
const home = selection.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (home.selected_for_homeowner_send !== false) fail('homeowner boundary selected_for_homeowner_send must be false');
pass('build_210_homeowner_facing_copy_not_selected_not_approved_requires_separate_consent');

// --- Copy-selection safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_selection',
  'network_or_external_call_made', 'retry_performed', 'confirm_token_armed', 'real_roofer_contacted_during_selection',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = selection.copy_selection_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('selection packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('copy-selection safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('copy-selection other_live_automation_remains_disabled must be true');
pass('build_210_copy_selection_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Reference integrity: builds on Build 209, prior evidence preserved/consistent ---
if (selection.prior_build_209_reference.build_209_decision !== 'COPY_REVISED_REVIEW_REQUIRED') {
  fail('Build 210 must reference Build 209 decision COPY_REVISED_REVIEW_REQUIRED');
}
if (selection.prior_build_209_reference.build_209_selected_variant !== 'pending_jason_review') {
  fail('Build 210 must reference Build 209 selected_variant pending_jason_review');
}
if (priorAnalysis.build !== 209) fail('prior analysis must be build 209');
if ((priorAnalysis.roofer_facing_sms_copy_variants || {}).selected_variant !== 'pending_jason_review') {
  fail('Build 209 analysis selected_variant must remain pending_jason_review (unchanged)');
}
if (selection.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('selection must reference the canonical manual execution evidence');
if (selection.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('selection must record recipient number NOT recorded in evidence');
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
if (priorSummary.build !== 209) fail('prior summary must be build 209');
pass('build_210_builds_on_build_209_and_preserves_prior_evidence_consistent');

// --- 6. Launch-readiness summary: SMS mechanics proven + Build 209 copy revised + R1 selected ---
if (summary.build !== 210) fail('summary build must be 210');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
const rcLane = lanes.real_customer_pilot_one_message_sms || {};
if (rcLane.real_customer_pilot_delivery_succeeded !== true) fail('summary must record real-customer pilot delivery succeeded');
if (rcLane.message_content_validated_value !== false) fail('summary must record message content did NOT validate value');
const csLane = lanes.pilot_sms_copy_selection || {};
const requiredCsLane = {
  sms_mechanics_proven: true,
  build_209_copy_revised: true,
  selected_variant_id: 'R1',
  selected_variant_label: 'new_lead_fast_response_alert',
  selected_for_next_controlled_roofer_pilot: true,
  selected_for_homeowner_send: false,
  selection_is_review_recommendation_not_send_authorization: true,
  no_live_action_during_selection: true,
  next_send_unsigned_approval_template_present: true,
  send_time_preflight_checklist_template_present: true,
  decision: 'R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED',
  recommended_next_option: 'fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_sms',
  next_step_is_fresh_signed_approval_and_send_time_preflight_not_send_now: true
};
for (const [k, v] of Object.entries(requiredCsLane)) {
  if (csLane[k] !== v) fail('summary pilot_sms_copy_selection lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(csLane[k]) + ')');
}
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven', 'real_customer_pilot_delivery_succeeded',
  'previous_copy_was_generic_delivery_test_copy', 'build_209_message_workflow_copy_revised_for_review',
  'r1_selected_for_next_controlled_roofer_pilot_review', 'selection_is_review_recommendation_not_send_authorization',
  'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_fresh_signed_approval_and_send_time_preflight_not_send_now', 'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled', 'next_step_is_jason_decision_after_fresh_approval_not_unrestricted_launch']) {
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
if (summary.next_step_is_fresh_signed_approval_and_send_time_preflight !== true) fail('summary next step must be fresh signed approval and send-time preflight');
if (summary.next_step_is_send_now !== false) fail('summary next_step_is_send_now must be false');
pass('build_210_launch_readiness_summary_records_sms_proven_copy_revised_r1_selected_fresh_approval_next');

// --- No secret values / phone numbers anywhere in Build 210 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(selection), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_210_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-pilot-sms-copy-selection-build-210-readonly.js')) fail('wrapper must run the Build 210 verifier');
pass('build_210_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-pilot-sms-copy-selection-build-210-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_210_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 210', 'R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED', 'new_lead_fast_response_alert',
  'roofer-facing', 'homeowner', 'opt-out', 'fresh signed approval', 'send-time preflight', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_210_copy_selection_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['selection', selection], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 210 records Jason\'s copy selection — R1 (new_lead_fast_response_alert) selected for the next controlled ROOFER pilot review; selection is a review recommendation, NOT a send authorization.');
console.log('PASS: Selected R1 text matches Build 209 R1 exactly, roofer-facing + SMS-only, opt-out included, no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims.');
console.log('PASS: Decision = R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED; unsigned exact approval statement template + send-time preflight checklist template authorize/arm NOTHING.');
console.log('PASS: Build 210 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation. Next step = fresh signed approval + send-time preflight, NOT send now, NOT unrestricted launch.');
console.log('PASS: Build 210 verifier passed (' + passCount + ' assertions).');
