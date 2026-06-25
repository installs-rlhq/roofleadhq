#!/usr/bin/env node
/**
 * Build 193 Read-Only Verifier — Controlled Roofer Pilot Readiness (local-only).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The prior one-message SMS proof is referenced correctly (gate PERMITTED, 1 attempt, sent, no
 *    retry, one-time approval consumed) and the readiness packet activates nothing.
 *  - The pilot scope definition encodes: one consenting test roofer only, Jason-controlled approval
 *    required before any contact, SMS-only first, one controlled interaction at a time, no homeowner
 *    contact until separately approved, no production data, all broader automation disabled.
 *  - The setup-completeness checklist encodes: consent marker required, test identity marker
 *    required, approved destination marker required with NO number stored, STOP/rollback owner Jason
 *    Lohse, max pilot message count default 1 (increase needs separate approval), no-retry default.
 *  - The no-go blockers list encodes all six blockers as outstanding.
 *  - The fresh pilot approval template is UNSIGNED and authorizes nothing
 *    (approval_granted=false, approval_signed=false, authorizes_live_pilot_now=false).
 *  - The launch-readiness summary keeps launch pilot-gated (NOT unrestricted).
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const evidencePath = `${FIXTURE_DIR}/controlled-roofer-pilot-readiness-build-193-evidence.json`;
const approvalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-approval-build-193-template.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-193.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/controlled-live-sms-one-message-build-192-closeout.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_READINESS_BUILD_193.md';

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

console.log('== Build 193 Controlled Roofer Pilot Readiness Verification (local-only) ==');

const evidence = readJson(evidencePath);
const approval = readJson(approvalPath);
const summary = readJson(summaryPath);
const priorCloseout = readJson(priorCloseoutPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Readiness packet references the prior one-message SMS proof and activates nothing ---
if (evidence.build !== 193) fail('evidence build must be 193');
const prior = evidence.prior_proof_reference || {};
if (prior.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('evidence must reference prior gate PERMITTED');
if (prior.send_attempt_count !== 1) fail('evidence prior send_attempt_count must be 1');
if (prior.sms_was_sent !== true) fail('evidence prior sms_was_sent must be true');
if (prior.retry_performed !== false) fail('evidence prior retry_performed must be false');
if (prior.one_time_approval_consumed !== true) fail('evidence prior one_time_approval_consumed must be true');
if (prior.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('evidence prior final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (priorCloseout.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('referenced Build 192 closeout must record CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (evidence.pilot_gate_decision !== 'NO_GO') fail('evidence pilot_gate_decision must be NO_GO');
if (evidence.pilot_activated_now !== false) fail('evidence pilot_activated_now must be false');
if (evidence.authorizes_pilot_now !== false) fail('evidence authorizes_pilot_now must be false');
pass('build_193_readiness_references_prior_one_message_proof_and_activates_nothing');

// --- Pilot scope definition ---
const scope = evidence.pilot_scope_definition || {};
const requiredScope = {
  one_consenting_test_roofer_only: true,
  jason_controlled_approval_required_before_any_contact: true,
  sms_only_first: true,
  one_controlled_pilot_interaction_at_a_time: true,
  no_homeowner_contact_until_separately_approved: true,
  no_production_data: true,
  all_broader_automation_disabled: true
};
for (const [k, v] of Object.entries(requiredScope)) {
  if (scope[k] !== v) fail('scope ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(scope[k]) + ')');
}
if (scope.approval_owner_label !== 'Jason Lohse') fail('scope approval_owner_label must be Jason Lohse');
pass('build_193_pilot_scope_definition_complete');

// --- Setup-completeness checklist ---
const checklist = evidence.pilot_setup_completeness_checklist || {};
if (checklist.roofer_consent_marker_required !== true) fail('checklist roofer_consent_marker_required must be true');
if (checklist.roofer_test_identity_marker_required !== true) fail('checklist roofer_test_identity_marker_required must be true');
if (checklist.approved_destination_marker_required_no_number_stored !== true) fail('checklist approved_destination_marker_required_no_number_stored must be true');
if (checklist.stop_rollback_owner_label !== 'Jason Lohse') fail('checklist stop_rollback_owner_label must be Jason Lohse');
if (checklist.maximum_pilot_message_count_default !== 1) fail('checklist maximum_pilot_message_count_default must be 1');
if (checklist.maximum_pilot_message_count_increase_requires_separate_approval !== true) fail('checklist message-count increase must require separate approval');
if (checklist.no_retry_default !== true) fail('checklist no_retry_default must be true');
pass('build_193_setup_completeness_checklist_complete');

// --- No-go blockers list ---
const blockers = evidence.pilot_no_go_blockers || {};
const requiredBlockers = [
  'missing_consent_marker',
  'missing_approved_test_identity_marker',
  'missing_fresh_signed_pilot_approval',
  'any_request_for_secrets_or_phone_numbers_in_repo_or_chat',
  'any_production_data_or_real_homeowner_scope',
  'any_non_sms_channel'
];
for (const k of requiredBlockers) {
  if (blockers[k] !== true) fail('no-go blocker must be present (true): ' + k);
}
if (blockers.all_blockers_must_clear_before_go !== true) fail('blockers all_blockers_must_clear_before_go must be true');
if (blockers.blockers_outstanding_count !== requiredBlockers.length) fail('blockers_outstanding_count must equal ' + requiredBlockers.length);
pass('build_193_no_go_blockers_list_complete');

// --- Readiness safety attestations ---
const ratt = evidence.readiness_safety_attestations || {};
for (const k of ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'recipient_number_recorded',
  'phone_number_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent',
  'network_or_external_call_made', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used',
  'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'email_call_calendar_crm_automation_added',
  'schema_auth_rls_security_changes']) {
  if (ratt[k] !== false) fail('readiness safety attestation must be false: ' + k);
}
if (ratt.other_live_automation_remains_disabled !== true) fail('readiness attestation other_live_automation_remains_disabled must be true');
if (evidence.no_live_action_during_readiness !== true) fail('evidence no_live_action_during_readiness must be true');
if (evidence.launch_status !== 'pilot_gated_not_unrestricted') fail('evidence launch_status must be pilot_gated_not_unrestricted');
if (evidence.next_step_is_unrestricted_launch !== false) fail('evidence next_step_is_unrestricted_launch must be false');
pass('build_193_readiness_safety_attestations_local_only_and_pilot_gated');

// --- Fresh UNSIGNED pilot approval template authorizes nothing ---
if (approval.build !== 193) fail('approval template build must be 193');
if (approval.approval_granted !== false) fail('approval_granted must be false');
if (approval.approval_signed !== false) fail('approval_signed must be false');
if (approval.authorizes_live_pilot_now !== false) fail('authorizes_live_pilot_now must be false');
if (approval.approval_owner_label !== 'Jason Lohse') fail('approval owner must be Jason Lohse');
if (approval.approval_signature_label !== '') fail('approval_signature_label must be blank (unsigned)');
const req = approval.required_markers_before_sign || {};
for (const k of ['roofer_consent_marker_present', 'roofer_test_identity_marker_present',
  'approved_destination_marker_present_no_number_stored', 'all_build_193_no_go_blockers_cleared']) {
  if (req[k] !== false) fail('approval required marker must be false (not yet satisfied): ' + k);
}
if (evidence.fresh_unsigned_pilot_approval_template_reference !== approvalPath) fail('evidence must reference the approval template path');
pass('build_193_fresh_pilot_approval_template_unsigned_and_authorizes_nothing');

// --- Launch-readiness summary keeps launch pilot-gated (not unrestricted) ---
if (summary.build !== 193) fail('summary build must be 193');
const lanes = summary.readiness_lanes || {};
const sLive = lanes.controlled_live_sms || {};
if (sLive.send_attempt_count !== 1 || sLive.sms_was_sent !== true || sLive.retry_performed !== false || sLive.one_message_succeeded !== true) {
  fail('summary controlled live SMS lane must record one message succeeded, 1 attempt, no retry');
}
const sPilot = lanes.controlled_roofer_pilot_readiness || {};
if (sPilot.readiness_documented !== true) fail('summary pilot lane readiness_documented must be true');
if (sPilot.pilot_gate_decision !== 'NO_GO') fail('summary pilot lane pilot_gate_decision must be NO_GO');
if (sPilot.pilot_activated_now !== false) fail('summary pilot lane pilot_activated_now must be false');
if (sPilot.fresh_signed_pilot_approval_present !== false) fail('summary pilot lane fresh_signed_pilot_approval_present must be false');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
pass('build_193_launch_readiness_summary_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 193 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(evidence), JSON.stringify(approval), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(dataArtifactText.replace(/"(?:code|status|build|passed|total|count|maximum_pilot_message_count|maximum_pilot_message_count_default|checklist_items_total|checklist_items_satisfied_count|blockers_outstanding_count|no_go_blockers_outstanding_count)"\s*:\s*\d+/g, ''))) {
  fail('a phone-number-shaped digit run appears in artifacts');
}
pass('no_secret_values_or_phone_numbers_present_in_any_build_193_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('wrapper must NOT set the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-readonly.js')) fail('wrapper must run the Build 193 verifier');
pass('build_193_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 193', 'controlled', 'pilot readiness', 'one consenting test roofer',
  'SMS-only', 'no homeowner contact', 'NO-GO', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_193_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('evidence safety_status must be demo_ready_with_live_automation_disabled');
if (approval.safety_status !== 'demo_ready_with_live_automation_disabled') fail('approval safety_status must be demo_ready_with_live_automation_disabled');
if (summary.safety_status !== 'demo_ready_with_live_automation_disabled') fail('summary safety_status must be demo_ready_with_live_automation_disabled');
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 193 converts the one-message SMS proof into a controlled roofer pilot readiness packet.');
console.log('PASS: Scope, setup checklist, no-go blockers, and a fresh UNSIGNED pilot approval template all gate any pilot.');
console.log('PASS: Build 193 is local-only — no live action, no network, no SMS, no Twilio, no real contact; nothing activated.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 193 verifier passed (' + passCount + ' assertions).');
