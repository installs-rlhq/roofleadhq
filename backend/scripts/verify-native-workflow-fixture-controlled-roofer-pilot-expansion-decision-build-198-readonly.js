#!/usr/bin/env node
/**
 * Build 198 Read-Only Verifier — Controlled Pilot Expansion Decision (Option B) + Final Send Approval
 * + Send-Time Preflight.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The signed expansion decision selects Option B and records approval_signed=true,
 *    approval_granted_for_expansion_decision=true, unrestricted_launch=false,
 *    live_automation_remains_disabled=true.
 *  - The final signed send approval records authorizes_jason_operated_one_message_send=true,
 *    authorizes_build_environment_send=false, sms_only=true, max_message_count=1, retry_allowed=false,
 *    homeowner_contact_allowed=false, production_data_allowed=false,
 *    approved_destination_number_recorded=false.
 *  - The send-time preflight gate = READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND with
 *    send_attempt_count=0, sms_sent=false, live_send_executed_by_build=false,
 *    no_network_external_action=true, no_secret_values_recorded=true, no_phone_number_recorded=true.
 *  - The Jason-operated command runbook references the existing fail-closed runner, env-in-shell,
 *    deliberate confirm token, exactly one run, no retry, and that this repo does not run it.
 *  - The launch-readiness summary records the first pilot success, post-pilot observation, Option B
 *    selection, the expansion send as Jason-operated (not build), and keeps launch pilot-gated.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const decisionPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-decision-build-198-signed.json`;
const approvalPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-final-send-approval-build-198-signed.json`;
const preflightPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-send-time-preflight-build-198.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-198.json`;
const priorExpansionPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-decision-build-197.json`;
const runnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_DECISION_BUILD_198.md';
const commandRunbookPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_JASON_OPERATED_SEND_COMMAND_RUNBOOK_BUILD_198.md';

const OPTION_B = 'B_same_roofer_second_controlled_sms';
const PREFLIGHT_DECISION = 'READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND';

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

console.log('== Build 198 Controlled Pilot Expansion Decision (Option B) + Final Send Approval + Send-Time Preflight Verification (local-only) ==');

const decision = readJson(decisionPath);
const approval = readJson(approvalPath);
const preflight = readJson(preflightPath);
const summary = readJson(summaryPath);
const priorExpansion = readJson(priorExpansionPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
const commandRunbook = read(commandRunbookPath);

// --- Prior Build 197 chain: expansion was NOT approved / review required ---
if ((priorExpansion.expansion_readiness_decision || {}).decision !== 'EXPANSION_NOT_APPROVED_REVIEW_REQUIRED') {
  fail('prior Build 197 expansion decision must be EXPANSION_NOT_APPROVED_REVIEW_REQUIRED');
}

// --- Signed expansion decision: Option B selected, signed, not unrestricted ---
if (decision.build !== 198) fail('decision build must be 198');
if (decision.selected_option !== OPTION_B) fail('decision selected_option must be ' + OPTION_B);
const requiredDecision = {
  approval_signed: true,
  approval_granted_for_expansion_decision: true,
  unrestricted_launch: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('decision ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
if (decision.approval_signature_label !== 'Jason Lohse') fail('decision signature must be Jason Lohse');
if (decision.jason_approval_statement_recorded !== true) fail('decision must record the Jason approval statement');
const sos = decision.selected_option_scope || {};
if (sos.same_consenting_test_roofer_only !== true || sos.additional_roofer_added !== false) fail('Option B scope must be same roofer, no additional roofer');
if (sos.sms_only !== true || sos.one_message_maximum !== true || sos.retry_allowed !== false) fail('Option B scope must be sms-only, one message, no retry');
if (decision.authorizes_live_pilot_send_now !== false) fail('decision must NOT authorize a live send now');
pass('build_198_signed_expansion_decision_selects_option_b_not_unrestricted');

// --- Final signed send approval: required markers ---
if (approval.build !== 198) fail('approval build must be 198');
if (approval.selected_option !== OPTION_B) fail('approval selected_option must be ' + OPTION_B);
const requiredApproval = {
  approval_signed: true,
  authorizes_jason_operated_one_message_send: true,
  authorizes_build_environment_send: false,
  sms_only: true,
  max_message_count: 1,
  retry_allowed: false,
  homeowner_contact_allowed: false,
  production_data_allowed: false,
  approved_destination_number_recorded: false
};
for (const [k, v] of Object.entries(requiredApproval)) {
  if (approval[k] !== v) fail('approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(approval[k]) + ')');
}
if (approval.same_consenting_test_roofer_only !== true || approval.additional_roofer_added !== false) fail('approval must be same roofer, no additional roofer');
const cond = approval.jason_operated_send_conditions || {};
if (cond.uses_existing_fail_closed_one_message_runner !== true) fail('approval must use the existing fail-closed runner');
if (cond.runner_path !== runnerPath) fail('approval runner_path must point at the existing fail-closed runner');
if (cond.deliberate_confirm_token_required !== true) fail('approval must require the deliberate confirm token');
if (cond.exactly_one_run !== true || cond.no_retry !== true) fail('approval must require exactly one run with no retry');
const ndna = approval.what_this_approval_does_not_authorize || {};
for (const k of ['claude_or_build_environment_send_sms', 'claude_or_build_environment_make_external_call',
  'contact_any_homeowner', 'use_production_data', 'non_sms_channel', 'more_than_one_message', 'retry',
  'add_a_second_roofer', 'activate_live_automation', 'add_public_routes_webhooks_cron_schedulers_dispatchers',
  'store_secrets_or_phone_numbers_in_repo_or_chat', 'authorize_unrestricted_launch']) {
  if (ndna[k] !== false) fail('approval "does not authorize" flag must be false: ' + k);
}
pass('build_198_final_send_approval_records_jason_operated_send_not_build_environment_send');

// --- Send-time preflight: READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND, no live action ---
if (preflight.build !== 198) fail('preflight build must be 198');
if (preflight.selected_option !== OPTION_B) fail('preflight selected_option must be ' + OPTION_B);
if (preflight.decision !== PREFLIGHT_DECISION) fail('preflight decision must be ' + PREFLIGHT_DECISION);
if (preflight.send_attempt_count !== 0) fail('preflight send_attempt_count must be 0');
if (preflight.sms_sent !== false) fail('preflight sms_sent must be false');
if (preflight.live_send_executed_by_build !== false) fail('preflight live_send_executed_by_build must be false');
if (preflight.live_send_armed_by_build !== false) fail('preflight live_send_armed_by_build must be false');
if (preflight.no_network_external_action !== true) fail('preflight no_network_external_action must be true');
if (preflight.no_secret_values_recorded !== true) fail('preflight no_secret_values_recorded must be true');
if (preflight.no_phone_number_recorded !== true) fail('preflight no_phone_number_recorded must be true');
const pin = preflight.preflight_inputs || {};
if (pin.authorizes_jason_operated_one_message_send !== true) fail('preflight input authorizes_jason_operated_one_message_send must be true');
if (pin.authorizes_build_environment_send !== false) fail('preflight input authorizes_build_environment_send must be false');
if (pin.approved_destination_number_recorded !== false) fail('preflight input approved_destination_number_recorded must be false');
const req = preflight.jason_operated_send_requirements_outside_repo || {};
if (req.deliberate_confirm_token_required !== true) fail('preflight must require deliberate confirm token');
if (req.exactly_one_run_no_retry !== true) fail('preflight must require exactly one run no retry');
if (req.live_credentials_present_in_repo !== false) fail('preflight must record live credentials NOT present in repo');
if (req.confirm_token_set_in_repo !== false) fail('preflight must record confirm token NOT set in repo');
pass('build_198_send_time_preflight_ready_for_jason_operated_expansion_send_no_live_action');

// --- Safety attestations across decision + approval + preflight ---
const attBlocks = [
  ['decision', decision.expansion_decision_safety_attestations],
  ['approval', approval.final_send_approval_safety_attestations],
  ['preflight', preflight.send_time_preflight_safety_attestations]
];
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'schema_auth_rls_security_changes'];
for (const [label, att] of attBlocks) {
  if (!att) fail(label + ' missing safety attestations');
  for (const k of mustBeFalse) {
    if (att[k] !== false) fail(label + ' safety attestation must be false: ' + k);
  }
  if (att.other_live_automation_remains_disabled !== true) fail(label + ' other_live_automation_remains_disabled must be true');
}
pass('build_198_decision_approval_preflight_local_only_no_send_no_network_no_secrets');

// --- Jason-operated command runbook references the fail-closed runner and its gates ---
if (!commandRunbook.includes(runnerPath)) fail('command runbook must reference the existing fail-closed runner path');
if (!commandRunbook.includes('CONTROLLED_LIVE_SMS_CONFIRM')) fail('command runbook must reference the deliberate confirm token name');
if (!commandRunbook.includes('SEND_ONE_LIVE_SMS')) fail('command runbook must reference the confirm token value name');
for (const needle of ['Jason', "Jason's shell", 'exactly one', 'no retry', 'Option B', 'TWILIO_LIVE_ACCOUNT_SID',
  'TWILIO_LIVE_FROM_NUMBER', 'CONTROLLED_LIVE_SMS_TO_NUMBER']) {
  if (!commandRunbook.includes(needle)) fail('command runbook missing required marker: ' + needle);
}
if (commandRunbook.includes('AUTH_TOKEN=')) fail('command runbook must not contain an AUTH_TOKEN= assignment');
pass('build_198_jason_operated_command_runbook_references_fail_closed_runner_env_and_confirm_token');

// --- Launch-readiness summary keeps launch pilot-gated and records the right lanes ---
if (summary.build !== 198) fail('summary build must be 198');
const lanes = summary.readiness_lanes || {};
const firstPilot = lanes.first_controlled_roofer_pilot_one_message_sms || {};
if (firstPilot.sms_was_sent !== true || firstPilot.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary must record the first controlled roofer pilot succeeded');
const obs = lanes.post_pilot_observation || {};
if (obs.pilot_send_captured !== true) fail('summary must record post-pilot observation captured');
const sDec = lanes.controlled_pilot_expansion_decision || {};
if (sDec.selected_option !== OPTION_B || sDec.approval_signed !== true) fail('summary expansion decision lane must record Option B selected and signed');
const sAppr = lanes.controlled_pilot_expansion_final_send_approval || {};
if (sAppr.authorizes_jason_operated_one_message_send !== true || sAppr.authorizes_build_environment_send !== false) fail('summary expansion approval lane must record Jason-operated send (not build environment)');
const sPre = lanes.controlled_pilot_expansion_send_time_preflight || {};
if (sPre.decision !== PREFLIGHT_DECISION) fail('summary expansion preflight lane decision must be ' + PREFLIGHT_DECISION);
if (sPre.send_attempt_count !== 0 || sPre.sms_sent !== false || sPre.live_send_executed_by_build !== false) fail('summary expansion preflight lane must be no-send');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
pass('build_198_launch_readiness_summary_records_option_b_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 198 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(decision), JSON.stringify(approval), JSON.stringify(preflight), JSON.stringify(summary), doc, commandRunbook].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_198_artifact');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-readonly.js')) fail('wrapper must run the Build 198 verifier');
pass('build_198_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 198', PREFLIGHT_DECISION, 'Option B', 'Jason-operated',
  'no retry', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_198_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['decision', decision], ['approval', approval], ['preflight', preflight], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 198 captures Jason\'s SIGNED Option B expansion decision (same roofer, second controlled SMS).');
console.log('PASS: Final send approval = Jason-operated one-message send (NOT build-environment).');
console.log('PASS: Send-time preflight = ' + PREFLIGHT_DECISION + ' — 0 attempts, no send, no network.');
console.log('PASS: Jason-operated command runbook references the fail-closed runner, env-in-shell, confirm token, one run, no retry.');
console.log('PASS: Build 198 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 198 verifier passed (' + passCount + ' assertions).');
