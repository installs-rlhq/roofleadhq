#!/usr/bin/env node
/**
 * Build 209 Read-Only Verifier — Pilot SMS Workflow/Message-Copy Analysis + Revision Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create; does NOT arm a confirm token.
 *
 * Proves:
 *  - Build 209 records the message-copy analysis evidence: current_message_was_generic_delivery_test=true,
 *    delivery_test_proven=true, value_messaging_not_validated=true, workflow_copy_revision_required=true,
 *    no_live_action_during_copy_analysis=true, no_secret_values_recorded=true, no_phone_number_recorded=true.
 *  - 3 to 5 concise roofer-facing SMS copy variants exist, SMS-only, with no guarantee/booked-jobs/
 *    estimate-quote-invoice-payment-deposit language, focused on lead response / inspection requests /
 *    missed-lead prevention / faster follow-up, and including opt-out language; no variant approved for send.
 *  - The homeowner-facing copy boundary records homeowner SMS NOT approved now, requires separate consent
 *    and approval, and any placeholder examples are clearly DRAFT/NOT APPROVED.
 *  - The next decision packet records decision=COPY_REVISED_REVIEW_REQUIRED,
 *    recommended_next_option=review_copy_before_any_live_send, unrestricted_launch=false,
 *    homeowner_contact_authorized=false, live_automation_remains_disabled=true,
 *    next_live_send_requires_fresh_signed_approval=true.
 *  - The UNSIGNED next-send approval template records approval_signed=false, approval_granted=false,
 *    authorizes_live_action_now=false, selected_message_variant=pending_jason_review.
 *  - The launch-readiness summary records SMS mechanics proven, real-customer pilot delivery succeeded,
 *    previous copy was generic delivery-test copy, message/workflow copy revised for review, and that the
 *    next step is Jason copy review (NOT live send, NOT unrestricted launch).
 *  - The Build 209 doc/runbook and dry-run wrapper exist and never run or arm any live send.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const analysisPath = `${FIXTURE_DIR}/pilot-sms-copy-analysis-build-209.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-209.json`;
const priorFeedbackPath = `${FIXTURE_DIR}/real-customer-pilot-feedback-build-208.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-208.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const wrapperPath = 'scripts/run-pilot-sms-copy-analysis-build-209-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_SMS_COPY_ANALYSIS_BUILD_209.md';

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

console.log('== Build 209 Pilot SMS Workflow/Message-Copy Analysis + Revision Packet Verification (local-only) ==');

const analysis = readJson(analysisPath);
const summary = readJson(summaryPath);
const priorFeedback = readJson(priorFeedbackPath);
const priorSummary = readJson(priorSummaryPath);
const evidence = readJson(evidencePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// Forbidden marketing/claim language (must not appear in any roofer/homeowner copy text).
const forbiddenClaimPatterns = [
  /guarantee/i, /guaranteed/i, /booked job/i, /booked jobs/i, /\bestimate\b/i, /\bquote\b/i,
  /\binvoice\b/i, /\bpayment\b/i, /\bdeposit\b/i
];

// --- Analysis packet: top-level identity + posture ---
if (analysis.build !== 209) fail('analysis packet build must be 209');
const requiredTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_copy_review_required: true,
  homeowner_contact_authorized: false,
  unrestricted_launch: false,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredTop)) {
  if (analysis[k] !== v) fail('analysis ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(analysis[k]) + ')');
}
pass('build_209_analysis_packet_is_pilot_gated_no_homeowner_no_unrestricted_posture_preserved');

// --- 1. Message-copy analysis evidence ---
const ev = analysis.message_copy_analysis_evidence || {};
const requiredEv = {
  current_message_was_generic_delivery_test: true,
  delivery_test_proven: true,
  value_messaging_not_validated: true,
  workflow_copy_revision_required: true,
  no_live_action_during_copy_analysis: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true
};
for (const [k, v] of Object.entries(requiredEv)) {
  if (ev[k] !== v) fail('message_copy_analysis_evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(ev[k]) + ')');
}
if (typeof ev.current_message_text_for_analysis !== 'string' || !/controlled live test/i.test(ev.current_message_text_for_analysis)) {
  fail('analysis evidence must quote the current generic delivery-test copy for analysis');
}
pass('build_209_message_copy_analysis_evidence_records_generic_delivery_test_value_not_validated_revision_required');

// --- 2. Roofer-facing SMS copy variants (3 to 5, SMS-only, honest, opt-out) ---
const roofer = analysis.roofer_facing_sms_copy_variants || {};
if (roofer.audience !== 'roofer_only_not_homeowner') fail('roofer variants audience must be roofer_only_not_homeowner');
if (roofer.channel_only_sms !== true) fail('roofer variants must be SMS-only');
const variants = Array.isArray(roofer.variants) ? roofer.variants : [];
if (variants.length < 3 || variants.length > 5) fail('there must be 3 to 5 roofer-facing variants (got ' + variants.length + ')');
if (roofer.variant_count !== variants.length) fail('roofer variant_count must match the number of variants');
if (roofer.selected_variant !== 'pending_jason_review') fail('roofer selected_variant must be pending_jason_review');
if (roofer.no_variant_approved_for_send !== true) fail('roofer no_variant_approved_for_send must be true');
const allowedIntents = ['lead_response', 'inspection_requests', 'missed_lead_prevention', 'faster_follow_up'];
const seenIds = new Set();
let optOutCount = 0;
for (const v of variants) {
  if (typeof v.id !== 'string' || v.id.length === 0) fail('roofer variant missing id');
  if (seenIds.has(v.id)) fail('roofer variant id duplicated: ' + v.id);
  seenIds.add(v.id);
  if (typeof v.label !== 'string' || v.label.length === 0) fail('roofer variant missing label: ' + v.id);
  if (!allowedIntents.includes(v.intent)) fail('roofer variant ' + v.id + ' intent must be one of ' + allowedIntents.join('/') + ' (got ' + JSON.stringify(v.intent) + ')');
  if (typeof v.text !== 'string' || v.text.length === 0) fail('roofer variant missing text: ' + v.id);
  if (v.text.length > 320) fail('roofer variant text must stay concise (<=320 chars): ' + v.id);
  for (const pat of forbiddenClaimPatterns) {
    if (pat.test(v.text)) fail('roofer variant ' + v.id + ' contains forbidden claim/guarantee language: ' + pat);
  }
  if (/RoofLeadHQ/.test(v.text)) { /* brand-identified */ }
  if (/stop to opt out/i.test(v.text) || /reply stop/i.test(v.text)) optOutCount += 1;
}
if (optOutCount < variants.length) fail('every roofer variant should include opt-out language (got ' + optOutCount + '/' + variants.length + ')');
// At least one variant per focus theme should be represented across the set.
const intentsCovered = new Set(variants.map((v) => v.intent));
for (const needed of ['lead_response', 'inspection_requests', 'missed_lead_prevention', 'faster_follow_up']) {
  if (!intentsCovered.has(needed)) fail('roofer variants must cover focus intent: ' + needed);
}
pass('build_209_three_to_five_honest_roofer_facing_sms_variants_opt_out_no_claims_no_variant_approved');

// --- 3. Homeowner-facing copy boundary ---
const home = analysis.homeowner_facing_copy_boundary || {};
if (home.homeowner_facing_sms_approved_now !== false) fail('homeowner_facing_sms_approved_now must be false');
if (home.requires_separate_consent_and_approval !== true) fail('homeowner boundary requires_separate_consent_and_approval must be true');
if (home.homeowner_contact_authorized !== false) fail('homeowner boundary homeowner_contact_authorized must be false');
if (!Array.isArray(home.draft_principles_only) || home.draft_principles_only.length === 0) fail('homeowner boundary must list draft principles only');
const placeholders = Array.isArray(home.placeholder_examples_not_approved) ? home.placeholder_examples_not_approved : [];
for (const p of placeholders) {
  if (!/NOT APPROVED/i.test(p.id || '') && !/DRAFT/i.test(p.id || '')) fail('homeowner placeholder example must be marked DRAFT/NOT APPROVED in its id: ' + JSON.stringify(p.id));
  if (typeof p.text !== 'string' || !/\[DRAFT - NOT APPROVED\]/.test(p.text)) fail('homeowner placeholder text must be prefixed [DRAFT - NOT APPROVED]');
  for (const pat of forbiddenClaimPatterns) {
    if (pat.test(p.text)) fail('homeowner placeholder contains forbidden claim/guarantee language: ' + pat);
  }
}
pass('build_209_homeowner_facing_copy_not_approved_requires_separate_consent_drafts_marked_not_approved');

// --- 4. Next decision packet ---
const decision = analysis.next_decision_packet || {};
const requiredDecision = {
  decision: 'COPY_REVISED_REVIEW_REQUIRED',
  recommended_next_option: 'review_copy_before_any_live_send',
  unrestricted_launch: false,
  homeowner_contact_authorized: false,
  live_automation_remains_disabled: true,
  next_live_send_requires_fresh_signed_approval: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('next decision packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_209_next_decision_packet_copy_revised_review_required_no_launch_no_homeowner');

// --- 5. Unsigned next-send approval template ---
const tmpl = analysis.unsigned_next_send_approval_template || {};
const requiredTmpl = {
  approval_signed: false,
  approval_granted: false,
  authorizes_live_action_now: false,
  selected_message_variant: 'pending_jason_review',
  authorizes_homeowner_message: false,
  authorizes_live_automation: false
};
for (const [k, v] of Object.entries(requiredTmpl)) {
  if (tmpl[k] !== v) fail('unsigned approval template ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(tmpl[k]) + ')');
}
const mustRemainFalse = tmpl.must_remain_false_in_this_build || {};
for (const k of ['approval_signed', 'approval_granted', 'authorizes_live_action_now', 'authorizes_homeowner_message', 'authorizes_live_automation']) {
  if (mustRemainFalse[k] !== false) fail('unsigned approval template must_remain_false_in_this_build.' + k + ' must be false');
}
if ((tmpl.scope_if_ever_signed || {}).max_message_count !== 1) fail('unsigned approval template scope max_message_count must be 1');
if ((tmpl.scope_if_ever_signed || {}).retry_allowed !== false) fail('unsigned approval template scope retry_allowed must be false');
pass('build_209_unsigned_next_send_approval_template_authorizes_nothing_variant_pending_review');

// --- Copy-analysis safety attestations (all must be false except the disabled flag) ---
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_copy_analysis',
  'network_or_external_call_made', 'retry_performed', 'real_roofer_contacted_during_copy_analysis',
  'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms',
  'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
const att = analysis.copy_analysis_safety_attestations || {};
if (!att || Object.keys(att).length === 0) fail('analysis packet missing safety attestations');
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('copy-analysis safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('copy-analysis other_live_automation_remains_disabled must be true');
pass('build_209_copy_analysis_attestations_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Reference integrity: builds on Build 208, prior evidence preserved/consistent ---
if (analysis.prior_build_208_reference.build_208_decision !== 'MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND') {
  fail('Build 209 must reference Build 208 decision MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND');
}
if (priorFeedback.build !== 208) fail('prior feedback must be build 208');
if ((priorFeedback.real_customer_pilot_feedback_evidence || {}).feedback_captured !== true) fail('Build 208 feedback_captured must remain true');
if (analysis.manual_execution_evidence_reference.evidence_path !== evidencePath) fail('analysis must reference the canonical manual execution evidence');
if (analysis.manual_execution_evidence_reference.recipient_number_recorded_in_evidence !== false) fail('analysis must record recipient number NOT recorded in evidence');
if (evidence.sms_was_sent !== true || evidence.recipient_number_recorded_in_evidence !== false) fail('manual execution evidence must remain sent with no recipient number');
if (priorSummary.build !== 208) fail('prior summary must be build 208');
pass('build_209_builds_on_build_208_and_preserves_prior_evidence_consistent');

// --- 6. Launch-readiness summary: SMS mechanics proven + copy revised for review + Jason copy review next ---
if (summary.build !== 209) fail('summary build must be 209');
const lanes = summary.readiness_lanes || {};
if ((lanes.controlled_live_sms_to_jason || {}).one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
const rcLane = lanes.real_customer_pilot_one_message_sms || {};
if (rcLane.real_customer_pilot_one_message_sms_succeeded_technically !== true) fail('summary must record real-customer pilot SMS succeeded technically');
if (rcLane.real_customer_pilot_delivery_succeeded !== true) fail('summary must record real-customer pilot delivery succeeded');
if (rcLane.message_content_validated_value !== false) fail('summary must record message content did NOT validate value');
if (rcLane.message_content_was_generic_delivery_test !== true) fail('summary must record message content was generic delivery test');
const caLane = lanes.pilot_sms_copy_analysis || {};
const requiredCaLane = {
  sms_mechanics_proven: true,
  real_customer_pilot_delivery_succeeded: true,
  previous_copy_was_generic_delivery_test: true,
  workflow_copy_revision_required: true,
  message_workflow_copy_revised_for_review: true,
  homeowner_facing_sms_approved_now: false,
  homeowner_facing_requires_separate_consent_and_approval: true,
  selected_message_variant: 'pending_jason_review',
  no_live_action_during_copy_analysis: true,
  decision: 'COPY_REVISED_REVIEW_REQUIRED',
  recommended_next_option: 'review_copy_before_any_live_send',
  next_step_is_jason_copy_review_not_live_send: true
};
for (const [k, v] of Object.entries(requiredCaLane)) {
  if (caLane[k] !== v) fail('summary pilot_sms_copy_analysis lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(caLane[k]) + ')');
}
const narrative = summary.narrative || {};
for (const k of ['sms_mechanics_proven', 'real_customer_pilot_delivery_succeeded',
  'previous_copy_was_generic_delivery_test_copy', 'message_content_did_not_validate_value_generic_delivery_test_copy',
  'message_workflow_copy_revised_for_review', 'homeowner_facing_copy_not_approved_requires_separate_consent_and_approval',
  'next_step_is_jason_copy_review_not_live_send', 'no_homeowner_contact_authorized',
  'broader_live_automation_remains_disabled', 'next_step_is_jason_decision_after_copy_review_not_unrestricted_launch']) {
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
if (summary.next_step_is_copy_review_required !== true) fail('summary next step must be copy review required');
if (summary.next_step_is_jason_copy_review_not_live_send !== true) fail('summary next step must be Jason copy review not live send');
pass('build_209_launch_readiness_summary_records_sms_mechanics_proven_copy_revised_for_review_jason_review_next');

// --- No secret values / phone numbers anywhere in Build 209 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(analysis), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count|exit_status|variant_count|roofer_facing_variant_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_209_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-pilot-sms-copy-analysis-build-209-readonly.js')) fail('wrapper must run the Build 209 verifier');
pass('build_209_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-pilot-sms-copy-analysis-build-209-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_209_verifier_is_read_only_does_not_send');

// --- Doc/runbook present and labeled with required markers ---
for (const needle of ['Build 209', 'COPY_REVISED_REVIEW_REQUIRED', 'real-customer pilot',
  'generic delivery-test', 'roofer-facing', 'homeowner', 'opt-out', 'Jason copy review', 'pilot-gated',
  'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_209_copy_analysis_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['analysis', analysis], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 209 records the message-copy analysis — current copy was a generic delivery test, delivery proven, value messaging NOT validated, workflow copy revision required.');
console.log('PASS: 3-5 honest roofer-facing SMS variants (lead response / inspection requests / missed-lead prevention / faster follow-up), opt-out included, no guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims, no variant approved for send.');
console.log('PASS: Homeowner-facing SMS NOT approved (separate consent + approval required); next decision = COPY_REVISED_REVIEW_REQUIRED; unsigned next-send approval template authorizes nothing (selected_message_variant=pending_jason_review).');
console.log('PASS: Build 209 is local-only — no live action, no SMS, no Twilio, no network, no retry, no real contact, no secrets/numbers, no automation. Next step = Jason copy review, NOT a live send, NOT unrestricted launch.');
console.log('PASS: Build 209 verifier passed (' + passCount + ' assertions).');
