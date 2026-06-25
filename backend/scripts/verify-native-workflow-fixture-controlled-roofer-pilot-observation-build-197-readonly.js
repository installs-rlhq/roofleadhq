#!/usr/bin/env node
/**
 * Build 197 Read-Only Verifier — Controlled Roofer Pilot Post-Pilot Observation + Expansion Decision Prep.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke the live
 * execution runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - Post-pilot observation evidence records (names/booleans only): pilot_send_captured=true,
 *    pilot_sms_sent=true, send_attempt_count=1, retry_performed=false, delivery + roofer feedback
 *    statuses NOT recorded as confirmations by the build, no_live_action_during_observation_capture=true,
 *    no_secret_values_recorded=true, no_phone_number_recorded=true.
 *  - Expansion decision = EXPANSION_NOT_APPROVED_REVIEW_REQUIRED, unrestricted_launch=false,
 *    live_automation_remains_disabled=true, expansion_requires_fresh_signed_approval=true.
 *  - Expansion options template is UNSIGNED (approval_granted=false, approval_signed=false,
 *    authorizes_expansion_now=false) with options A/B/C present, each SMS-only/one-message/no-retry.
 *  - No-go blockers present, with the three "missing" blockers outstanding and not all cleared.
 *  - The launch-readiness summary records the lanes, observation captured, expansion not approved,
 *    and keeps launch pilot-gated (not unrestricted).
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const observationPath = `${FIXTURE_DIR}/controlled-roofer-pilot-post-pilot-observation-build-197.json`;
const expansionPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-decision-build-197.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-197.json`;
const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-closeout-build-196.json`;
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_OBSERVATION_BUILD_197.md';

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

console.log('== Build 197 Controlled Roofer Pilot Post-Pilot Observation + Expansion Decision Verification (local-only) ==');

const observation = readJson(observationPath);
const expansion = readJson(expansionPath);
const summary = readJson(summaryPath);
const evidence = readJson(evidencePath);
const priorCloseout = readJson(priorCloseoutPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Prior Build 196 chain corroborates the pilot send ---
if (priorCloseout.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('prior Build 196 closeout final_decision must be CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT');
if (evidence.sms_was_sent !== true || evidence.send_attempt_count !== 1 || evidence.auto_retry_performed !== false) fail('manual execution evidence must corroborate one message sent, 1 attempt, no retry');

// --- Post-pilot observation evidence: required markers/booleans ---
if (observation.build !== 197) fail('observation build must be 197');
const requiredObservation = {
  pilot_send_captured: true,
  pilot_sms_sent: true,
  send_attempt_count: 1,
  retry_performed: false,
  no_live_action_during_observation_capture: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true
};
for (const [k, v] of Object.entries(requiredObservation)) {
  if (observation[k] !== v) fail('observation ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(observation[k]) + ')');
}
// delivery + roofer-feedback statuses must NOT claim a recorded confirmation by the build.
if (typeof observation.delivery_observation_status !== 'string' || /confirmed|delivered_confirmed/.test(observation.delivery_observation_status) && !/no_final_delivery_confirmation_recorded_by_build/.test(observation.delivery_observation_status)) {
  fail('observation delivery_observation_status must not claim a build-recorded delivery confirmation');
}
if (observation.roofer_feedback_status !== 'not_recorded_by_build') fail('observation roofer_feedback_status must be not_recorded_by_build');
if (observation.stop_rollback_owner_label !== 'Jason Lohse') fail('observation stop/rollback owner must be Jason Lohse');
pass('build_197_post_pilot_observation_records_pilot_send_no_build_recorded_external_signals');

// --- Observation safety attestations: live-action flags false ---
const oatt = observation.post_pilot_observation_safety_attestations || {};
const mustBeFalseObs = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_observation',
  'network_or_external_call_made', 'real_roofer_contacted_during_observation', 'real_homeowner_contacted',
  'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'email_call_calendar_crm_automation_added',
  'schema_auth_rls_security_changes'];
for (const k of mustBeFalseObs) {
  if (oatt[k] !== false) fail('observation safety attestation must be false: ' + k);
}
if (oatt.other_live_automation_remains_disabled !== true) fail('observation other_live_automation_remains_disabled must be true');
pass('build_197_post_pilot_observation_local_only_no_send_no_network_no_secrets');

// --- Expansion readiness decision ---
if (expansion.build !== 197) fail('expansion build must be 197');
const dec = expansion.expansion_readiness_decision || {};
if (dec.decision !== 'EXPANSION_NOT_APPROVED_REVIEW_REQUIRED') fail('expansion decision must be EXPANSION_NOT_APPROVED_REVIEW_REQUIRED');
if (dec.unrestricted_launch !== false) fail('expansion unrestricted_launch must be false');
if (dec.live_automation_remains_disabled !== true) fail('expansion live_automation_remains_disabled must be true');
if (dec.expansion_requires_fresh_signed_approval !== true) fail('expansion must require a fresh signed approval');
pass('build_197_expansion_decision_not_approved_review_required');

// --- Expansion options template UNSIGNED with options A/B/C ---
const tmpl = expansion.expansion_options_template_unsigned || {};
if (tmpl.approval_granted !== false) fail('expansion template approval_granted must be false');
if (tmpl.approval_signed !== false) fail('expansion template approval_signed must be false');
if (tmpl.authorizes_expansion_now !== false) fail('expansion template authorizes_expansion_now must be false');
if (tmpl.selected_option !== 'none') fail('expansion template selected_option must be none');
const opts = tmpl.options || {};
for (const key of ['option_a', 'option_b', 'option_c']) {
  if (!opts[key]) fail('expansion template missing ' + key);
  if (opts[key].sms_only !== true) fail(key + ' must be sms_only');
  if (opts[key].retry_allowed !== false) fail(key + ' must have retry_allowed=false');
}
if (opts.option_a.one_message_maximum !== true) fail('option_a must be one message maximum');
if (opts.option_b.one_message_maximum !== true) fail('option_b must be one message maximum');
if (!/hold/.test(opts.option_c.label)) fail('option_c must be the hold / no expansion option');
pass('build_197_expansion_options_template_unsigned_with_options_abc_sms_only_no_retry');

// --- No-go blockers: three "missing" blockers outstanding, not all cleared ---
const blk = expansion.expansion_no_go_blockers || {};
for (const k of ['missing_fresh_signed_expansion_approval', 'missing_explicit_option_selection', 'missing_consent_marker_for_any_additional_roofer']) {
  if (blk[k] !== true) fail('expansion no-go blocker must be present (true): ' + k);
}
for (const k of ['any_homeowner_contact', 'any_production_data', 'any_non_sms_channel', 'any_retry_or_automation_beyond_one_message']) {
  if (blk[k] !== false) fail('expansion forbidden-scope blocker must be false (not present): ' + k);
}
if (expansion.expansion_no_go_blockers_outstanding_count !== 3) fail('expansion outstanding blocker count must be 3');
if (expansion.all_expansion_blockers_cleared !== false) fail('expansion all_expansion_blockers_cleared must be false');
pass('build_197_expansion_no_go_blockers_present_and_not_cleared');

// --- Expansion decision safety attestations ---
const eatt = expansion.expansion_decision_safety_attestations || {};
const mustBeFalseExp = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'email_call_calendar_crm_automation_added', 'schema_auth_rls_security_changes'];
for (const k of mustBeFalseExp) {
  if (eatt[k] !== false) fail('expansion safety attestation must be false: ' + k);
}
if (eatt.other_live_automation_remains_disabled !== true) fail('expansion other_live_automation_remains_disabled must be true');
pass('build_197_expansion_decision_local_only_no_send_no_network_no_secrets');

// --- Launch-readiness summary: lanes + pilot-gated + broader automation disabled ---
if (summary.build !== 197) fail('summary build must be 197');
const lanes = summary.readiness_lanes || {};
const local = lanes.local_suite || {};
if (local.passed !== 30 || local.total !== 30 || local.all_passed !== true) fail('summary local suite must be 30/30 passed');
const mock = lanes.mock_adapter_suite || {};
if (mock.passed !== 30 || mock.total !== 30 || mock.all_passed !== true) fail('summary mock adapter suite must be 30/30 passed');
const sandbox = lanes.sandbox_test_sms || {};
if (sandbox.simulated_safely !== true || sandbox.live_send !== false) fail('summary sandbox lane must be simulated safely (no live send)');
const liveJason = lanes.controlled_live_sms_to_jason || {};
if (liveJason.sms_was_sent !== true || liveJason.one_message_succeeded !== true) fail('summary controlled live SMS to Jason lane must record success');
const pilot = lanes.controlled_roofer_pilot_one_message_sms || {};
if (pilot.sms_was_sent !== true || pilot.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') fail('summary pilot lane must record one message sent');
const obs = lanes.post_pilot_observation || {};
if (obs.pilot_send_captured !== true || obs.pilot_sms_sent !== true) fail('summary post-pilot observation lane must record the pilot send captured');
if (obs.roofer_feedback_status !== 'not_recorded_by_build') fail('summary observation lane roofer_feedback_status must be not_recorded_by_build');
const expLane = lanes.controlled_pilot_expansion_decision || {};
if (expLane.decision !== 'EXPANSION_NOT_APPROVED_REVIEW_REQUIRED') fail('summary expansion lane decision must be EXPANSION_NOT_APPROVED_REVIEW_REQUIRED');
if (expLane.all_expansion_blockers_cleared !== false) fail('summary expansion lane all_expansion_blockers_cleared must be false');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
pass('build_197_launch_readiness_summary_records_observation_and_expansion_not_approved');

// --- No secret values / phone numbers anywhere in Build 197 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(observation), JSON.stringify(expansion), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|send_attempt_count|expansion_no_go_blockers_outstanding_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_197_artifact');

// --- Wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-readonly.js')) fail('wrapper must run the Build 197 verifier');
pass('build_197_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 197', 'EXPANSION_NOT_APPROVED_REVIEW_REQUIRED', 'post-pilot observation',
  'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_197_observation_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['observation', observation], ['expansion', expansion], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 197 captures post-pilot observation (pilot send=true, 1 attempt, no retry; delivery/feedback not build-recorded).');
console.log('PASS: Expansion decision = EXPANSION_NOT_APPROVED_REVIEW_REQUIRED — unsigned options A/B/C, 3 blockers outstanding.');
console.log('PASS: Build 197 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 197 verifier passed (' + passCount + ' assertions).');
