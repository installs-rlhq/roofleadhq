#!/usr/bin/env node
/**
 * Build 194 Read-Only Verifier — Controlled Roofer Pilot Setup/Approval Capture (local-only).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The signed setup/approval evidence records the required markers/booleans: approval_signed=true,
 *    approval_granted_for_setup_capture=true, authorizes_live_pilot_send_now=false, all three setup
 *    markers present, approved_destination_number_recorded=false, sms_only=true, max_message_count=1,
 *    retry_allowed=false, homeowner_contact_allowed=false.
 *  - The no-go blocker closure clears blockers FOR SETUP/PREFLIGHT ONLY and keeps the live pilot SEND
 *    blocked behind a separate final preflight/send approval.
 *  - The preflight gate evaluates to READY_FOR_FINAL_SEND_APPROVAL, NOT sent, NOT active, and does
 *    not authorize a live send.
 *  - The launch-readiness summary records the controlled live SMS proof, the captured setup markers,
 *    next step = final one-message pilot send approval/preflight, and keeps launch pilot-gated.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const signedPath = `${FIXTURE_DIR}/controlled-roofer-pilot-setup-approval-build-194-signed.json`;
const closurePath = `${FIXTURE_DIR}/controlled-roofer-pilot-no-go-blocker-closure-build-194.json`;
const preflightPath = `${FIXTURE_DIR}/controlled-roofer-pilot-preflight-gate-build-194.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-194.json`;
const priorReadinessPath = `${FIXTURE_DIR}/controlled-roofer-pilot-readiness-build-193-evidence.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_SETUP_BUILD_194.md';

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

console.log('== Build 194 Controlled Roofer Pilot Setup/Approval Capture Verification (local-only) ==');

const signed = readJson(signedPath);
const closure = readJson(closurePath);
const preflight = readJson(preflightPath);
const summary = readJson(summaryPath);
const priorReadiness = readJson(priorReadinessPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Signed setup/approval evidence: required markers/booleans ---
if (signed.build !== 194) fail('signed evidence build must be 194');
if (priorReadiness.pilot_gate_decision !== 'NO_GO') fail('prior Build 193 readiness must record NO_GO gate');
const requiredSigned = {
  approval_signed: true,
  approval_granted_for_setup_capture: true,
  authorizes_live_pilot_send_now: false,
  consenting_test_roofer_marker_present: true,
  roofer_test_identity_marker_present: true,
  approved_destination_marker_present: true,
  approved_destination_number_recorded: false,
  sms_only: true,
  max_message_count: 1,
  retry_allowed: false,
  homeowner_contact_allowed: false
};
for (const [k, v] of Object.entries(requiredSigned)) {
  if (signed[k] !== v) fail('signed evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(signed[k]) + ')');
}
if (signed.approval_signature_label !== 'Jason Lohse') fail('signed evidence approval_signature_label must be Jason Lohse');
if (signed.jason_approval_statement_recorded !== true) fail('signed evidence must record the Jason approval statement');
const ndna = signed.what_this_approval_does_not_authorize || {};
for (const k of ['send_sms_now', 'contact_the_roofer_now', 'contact_any_homeowner', 'use_production_data',
  'make_external_calls', 'activate_live_automation', 'add_public_routes_webhooks_cron_schedulers_dispatchers',
  'store_secrets_or_phone_numbers']) {
  if (ndna[k] !== false) fail('signed evidence "does not authorize" flag must be false: ' + k);
}
pass('build_194_signed_setup_approval_records_required_markers_setup_only_no_send');

// --- No-go blocker closure: setup/preflight only; live send still blocked ---
if (closure.build !== 194) fail('closure build must be 194');
if (closure.blocker_closure_scope !== 'setup_and_preflight_only_not_live_send') fail('closure scope must be setup_and_preflight_only_not_live_send');
if (closure.all_setup_preflight_blockers_cleared !== true) fail('closure all_setup_preflight_blockers_cleared must be true');
if (closure.setup_preflight_blockers_outstanding_count !== 0) fail('closure outstanding count must be 0');
if (closure.setup_preflight_blockers_cleared_count !== 6) fail('closure cleared count must be 6');
const lsg = closure.live_send_gate || {};
if (lsg.live_pilot_send_blocked !== true) fail('closure live_pilot_send_blocked must be true');
if (lsg.live_pilot_send_requires_separate_final_preflight_send_approval !== true) fail('closure must require separate final preflight/send approval');
if (lsg.final_one_message_send_approval_signed !== false) fail('closure final_one_message_send_approval_signed must be false');
if (lsg.live_credentials_present_in_repo !== false) fail('closure live_credentials_present_in_repo must be false');
if (lsg.confirm_token_set !== false) fail('closure confirm_token_set must be false');
pass('build_194_no_go_blocker_closure_setup_preflight_only_send_still_blocked');

// --- Preflight gate: READY_FOR_FINAL_SEND_APPROVAL, not sent, not active ---
if (preflight.build !== 194) fail('preflight build must be 194');
if (preflight.preflight_gate_decision !== 'READY_FOR_FINAL_SEND_APPROVAL') fail('preflight decision must be READY_FOR_FINAL_SEND_APPROVAL');
if (preflight.sent !== false) fail('preflight sent must be false');
if (preflight.active !== false) fail('preflight active must be false');
if (preflight.live_send_armed !== false) fail('preflight live_send_armed must be false');
if (preflight.authorizes_live_pilot_send_now !== false) fail('preflight authorizes_live_pilot_send_now must be false');
if (preflight.no_network_or_external_action !== true) fail('preflight no_network_or_external_action must be true');
const pin = preflight.preflight_inputs || {};
for (const k of ['approval_signed', 'consenting_test_roofer_marker_present', 'roofer_test_identity_marker_present',
  'approved_destination_marker_present', 'sms_only', 'all_setup_preflight_blockers_cleared']) {
  if (pin[k] !== true) fail('preflight input must be true: ' + k);
}
if (pin.approved_destination_number_recorded !== false) fail('preflight input approved_destination_number_recorded must be false');
if (pin.retry_allowed !== false) fail('preflight input retry_allowed must be false');
if (pin.max_message_count !== 1) fail('preflight input max_message_count must be 1');
const still = preflight.what_is_still_required_before_send || {};
for (const k of ['separate_final_one_message_send_approval_signed', 'final_preflight_at_send_time_via_existing_failclosed_runner',
  'live_credentials_present_in_repo', 'approved_destination_number_recorded', 'confirm_token_set']) {
  if (still[k] !== false) fail('preflight "still required before send" flag must be false (unmet): ' + k);
}
pass('build_194_preflight_gate_ready_for_final_send_approval_not_sent_not_active');

// --- Safety attestations across all three packets ---
const attBlocks = [
  ['signed', signed.setup_capture_safety_attestations],
  ['closure', closure.closure_safety_attestations],
  ['preflight', preflight.preflight_safety_attestations]
];
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'sms_sent', 'network_or_external_call_made', 'real_roofer_contacted', 'real_homeowner_contacted',
  'production_data_used', 'live_automation_activated'];
for (const [label, att] of attBlocks) {
  if (!att) fail(label + ' missing safety attestations');
  for (const k of mustBeFalse) {
    if (att[k] !== false) fail(label + ' safety attestation must be false: ' + k);
  }
  if (att.other_live_automation_remains_disabled !== true) fail(label + ' other_live_automation_remains_disabled must be true');
}
pass('build_194_all_packets_local_only_no_send_no_network_no_secrets');

// --- Launch-readiness summary keeps launch pilot-gated and records the right next step ---
if (summary.build !== 194) fail('summary build must be 194');
const lanes = summary.readiness_lanes || {};
const sLive = lanes.controlled_live_sms || {};
if (sLive.send_attempt_count !== 1 || sLive.sms_was_sent !== true || sLive.retry_performed !== false || sLive.one_message_succeeded !== true) {
  fail('summary controlled live SMS lane must record one message succeeded, 1 attempt, no retry');
}
const sSetup = lanes.controlled_roofer_pilot_setup || {};
if (sSetup.approval_signed !== true) fail('summary setup lane approval_signed must be true');
if (sSetup.authorizes_live_pilot_send_now !== false) fail('summary setup lane authorizes_live_pilot_send_now must be false');
if (sSetup.consenting_test_roofer_marker_present !== true) fail('summary setup lane consenting_test_roofer_marker_present must be true');
if (sSetup.approved_destination_number_recorded !== false) fail('summary setup lane approved_destination_number_recorded must be false');
if (sSetup.all_setup_preflight_blockers_cleared !== true) fail('summary setup lane all_setup_preflight_blockers_cleared must be true');
const sPre = lanes.controlled_roofer_pilot_preflight || {};
if (sPre.preflight_gate_decision !== 'READY_FOR_FINAL_SEND_APPROVAL') fail('summary preflight lane decision must be READY_FOR_FINAL_SEND_APPROVAL');
if (sPre.sent !== false || sPre.active !== false || sPre.live_pilot_send_authorized_now !== false) fail('summary preflight lane must be not sent/active/authorized');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
pass('build_194_launch_readiness_summary_records_setup_captured_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 194 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(signed), JSON.stringify(closure), JSON.stringify(preflight), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|setup_preflight_blockers_cleared_count|setup_preflight_blockers_outstanding_count|checklist_items_total|checklist_items_satisfied_count|blockers_outstanding_count|no_go_blockers_outstanding_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_194_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('wrapper must NOT set the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-readonly.js')) fail('wrapper must run the Build 194 verifier');
pass('build_194_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 194', 'READY_FOR_FINAL_SEND_APPROVAL', 'setup', 'approval_signed',
  'no homeowner contact', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_194_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['signed', signed], ['closure', closure], ['preflight', preflight], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 194 captures Jason\'s signed controlled roofer pilot setup/approval markers (names/booleans only).');
console.log('PASS: Setup/preflight no-go blockers cleared; live pilot SEND remains blocked behind a separate final approval.');
console.log('PASS: Preflight gate = READY_FOR_FINAL_SEND_APPROVAL — not sent, not active, no live send authorized.');
console.log('PASS: Build 194 is local-only — no live action, no network, no SMS, no Twilio, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 194 verifier passed (' + passCount + ' assertions).');
