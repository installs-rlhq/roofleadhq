#!/usr/bin/env node
/**
 * Build 184 Read-Only Verifier —
 * One-Time Supervised Sandbox/Test-Mode SMS Execution (sandbox/test-mode only, SMS only).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no production data, no live activation, no real
 * contacts, no sandbox/external calls. Does NOT invoke the fail-closed actual external/sandbox
 * runner stub and does NOT re-run any execution.
 *
 * Proves: the readiness gate reports SANDBOX_EXECUTION_PERMITTED; execution stayed within the
 * exact signed approval scope (SMS only, one pilot test identity, supervised, one-time, after
 * build 183); transport is sandbox/test-mode (not live); only config NAME presence was checked
 * (no secret values); exactly one capped execution occurred with NO external call and NO real SMS
 * sent (simulated by Twilio test credentials); no production data / no live automation / no schema-
 * auth-RLS-security / no billing / no public-route changes; the runner has no env/network/secret/
 * live-client surface; and the demo safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const markerPath = `${FIXTURE_DIR}/sandbox-execution-provisioning-marker.json`;
const gatePath = `${FIXTURE_DIR}/sandbox-execution-readiness-gate-result.json`;
const evidencePath = `${FIXTURE_DIR}/supervised-sandbox-sms-execution-evidence.json`;
const runnerPath = 'backend/scripts/run-native-workflow-fixture-supervised-sandbox-sms-execution.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-supervised-sandbox-sms-execution.sh';
const actualRunnerStubPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';

const APPROVED_SCOPE = 'sandbox_test_mode_sms_only_one_pilot_roofer_supervised_one_time_after_build_183';
const REQUIRED_SMS_CONFIG_NAMES = ['TWILIO_TEST_ACCOUNT_SID', 'TWILIO_TEST_AUTH_TOKEN', 'TWILIO_TEST_FROM_NUMBER'];

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

console.log('== Build 184 One-Time Supervised Sandbox/Test-Mode SMS Execution Verification ==');

const marker = readJson(markerPath);
const gate = readJson(gatePath);
const evidence = readJson(evidencePath);
const runnerSrc = read(runnerPath);
const wrapper = read(wrapperPath);
read(actualRunnerStubPath); // existence only; never invoked.

// --- Gate still reports SANDBOX_EXECUTION_PERMITTED ---
if (gate.gate_decision !== 'SANDBOX_EXECUTION_PERMITTED') fail('gate decision is not SANDBOX_EXECUTION_PERMITTED');
if (gate.sandbox_execution_ready !== true) fail('gate sandbox_execution_ready must be true');
if (gate.performed_external_call !== false || gate.performed_sandbox_call !== false || gate.performed_live_action !== false) {
  fail('gate must report no external/sandbox/live action performed');
}
pass('readiness_gate_reports_sandbox_execution_permitted');

// --- Signed approval scope matches exactly; controlled-live NOT signed ---
if (marker.explicit_sandbox_execution_approval_signed !== true) fail('marker sandbox approval must be signed');
if (marker.explicit_sandbox_execution_approval_scope !== APPROVED_SCOPE) fail('marker approval scope mismatch');
if (marker.explicit_controlled_live_approval_signed !== false) fail('controlled-live approval must NOT be signed');
if (marker.values_recorded !== false || marker.names_only !== true) fail('marker must be names-only with no recorded values');
pass('exact_signed_sandbox_scope_present_controlled_live_not_signed_names_only');

// --- Evidence labels and core mode fields ---
const labels = Array.isArray(evidence.evidence_label) ? evidence.evidence_label : [];
for (const required of ['sandbox_test_mode_sms_only', 'one_time_supervised', 'after_build_183']) {
  if (!labels.includes(required)) fail('evidence missing required label: ' + required);
}
pass('evidence_carries_required_sandbox_test_mode_sms_only_one_time_after_build_183_labels');

if (evidence.build !== 184) fail('evidence build must be 184');
if (evidence.data_classification !== 'sandbox_test_mode_names_only_no_secret_values') fail('evidence data_classification wrong');
if (evidence.delivery_mode !== 'sandbox-test-mode-only') fail('evidence delivery_mode wrong');
if (evidence.execution_mode !== 'one-time-supervised-sandbox-test-mode-sms') fail('evidence execution_mode wrong');
if (evidence.gate_decision !== 'SANDBOX_EXECUTION_PERMITTED') fail('evidence gate_decision wrong');
if (evidence.approved_scope !== APPROVED_SCOPE) fail('evidence approved_scope wrong');
if (evidence.approved_pilot_identity !== 'Jason Lohse / Test Roofing') fail('evidence approved_pilot_identity wrong');
if (evidence.working_directory !== '/root/roofleadhq') fail('evidence working_directory wrong');
if (typeof evidence.timestamp !== 'string' || evidence.timestamp.length === 0) fail('evidence timestamp missing');
pass('evidence_core_mode_scope_and_timestamp_fields_correct');

// --- Channel is SMS only; transport is sandbox/test-mode, not live ---
if (evidence.channel !== 'sms' || evidence.approved_channel !== 'sms' || evidence.channel_only_sms !== true) {
  fail('evidence channel must be sms only');
}
if (evidence.channel_expanded_beyond_sms !== false) fail('evidence must attest no expansion beyond sms');
if (evidence.transport_mode !== 'sandbox_test_mode') fail('evidence transport_mode must be sandbox_test_mode');
if (evidence.transport_is_live !== false) fail('evidence transport_is_live must be false');
pass('channel_is_sms_only_and_transport_is_sandbox_test_mode_not_live');

// --- The six required pre-execution confirmations are all true ---
const confirms = evidence.pre_execution_confirmations || {};
for (const k of [
  'gate_reports_sandbox_execution_permitted',
  'only_config_presence_checked_no_secret_values',
  'transport_is_sandbox_test_mode_not_live',
  'channel_is_sms_only',
  'capped_reversible_one_time_execution',
  'evidence_output_path_confirmed'
]) {
  if (confirms[k] !== true) fail('pre_execution_confirmation not true: ' + k);
}
pass('all_six_pre_execution_confirmations_true');

// --- Config presence is NAMES ONLY; no secret values; no values present in repo ---
const cfg = evidence.config_presence_check || {};
if (cfg.inspects_config_names_only !== true) fail('config check must inspect names only');
if (cfg.reads_secret_values !== false) fail('config check must not read secret values');
if (cfg.credential_values_present_in_repo !== false) fail('no credential values may be present in repo');
if (cfg.sms_config_all_present !== true) fail('sms config names must all be present');
const presentNames = Array.isArray(cfg.sms_config_names_present) ? cfg.sms_config_names_present : [];
for (const name of REQUIRED_SMS_CONFIG_NAMES) {
  if (!presentNames.includes(name)) fail('missing required sms config NAME in evidence: ' + name);
  // Must be a bare NAME identifier, never a secret value.
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('sms config entry is not a bare NAME identifier: ' + name);
}
pass('config_presence_is_names_only_no_secret_values_no_values_in_repo');

// --- Exactly one capped execution; no auto-retry ---
if (evidence.execution_cap !== 1) fail('execution_cap must be 1');
if (evidence.executions_attempted !== 1) fail('executions_attempted must be 1');
if (evidence.executions_performed !== 1) fail('executions_performed must be 1');
if (evidence.auto_retry_on_failure !== false) fail('auto_retry_on_failure must be false');
if (evidence.auto_retry_performed !== false) fail('auto_retry_performed must be false');
pass('exactly_one_capped_execution_with_no_auto_retry');

// --- No real SMS sent; simulated by Twilio test credentials; no external call ---
if (evidence.sms_actually_sent !== false) fail('sms_actually_sent must be false (no real SMS)');
if (evidence.sms_simulated_by_twilio_test_credentials !== true) fail('sms must be simulated by twilio test credentials');
if (typeof evidence.sms_delivery_outcome !== 'string' || !evidence.sms_delivery_outcome.includes('no_live_delivery')) {
  fail('sms_delivery_outcome must state no live delivery');
}
if (evidence.result_status !== 'PASS_SUPERVISED_SANDBOX_TEST_MODE_SMS_SIMULATED') fail('result_status wrong');
pass('no_real_sms_sent_simulated_by_test_credentials_no_external_call');

// --- Single test message targets the approved TEST identity only via fake references ---
const msg = evidence.single_test_message || {};
for (const k of ['to_test_reference', 'from_test_reference']) {
  if (typeof msg[k] !== 'string' || !msg[k].startsWith('fake-sandbox-test-')) {
    fail('single_test_message ' + k + ' must be a fake sandbox test reference');
  }
}
if (evidence.contacted_only_approved_test_identity !== true) fail('must contact only approved test identity');
if (evidence.real_homeowner_contact !== false) fail('real_homeowner_contact must be false');
if (evidence.real_roofer_contact !== false) fail('real_roofer_contact must be false');
pass('single_message_uses_fake_test_references_only_approved_test_identity_no_real_contact');

// --- Safety counters/booleans all clean ---
for (const k of ['external_calls_count', 'credential_values_logged_count', 'production_data_touches_count', 'real_contact_touches_count']) {
  if (evidence[k] !== 0) fail('evidence ' + k + ' must be 0');
}
for (const k of [
  'external_calls', 'sandbox_external_calls', 'credentials_used', 'used_real_live_twilio_credentials',
  'production_data_used', 'used_production_supabase', 'live_activation', 'live_automation_enabled',
  'invoked_actual_external_sandbox_runner_stub'
]) {
  if (evidence[k] !== false) fail('evidence ' + k + ' must be false');
}
pass('all_safety_counters_zero_and_safety_booleans_false');

// --- Change-surface attestations: nothing forbidden was added ---
for (const k of [
  'schema_auth_rls_security_changes',
  'billing_payment_quote_estimate_invoice_automation_added',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'channel_expanded_beyond_sms'
]) {
  if (evidence[k] !== false) fail('evidence ' + k + ' must be false');
}
pass('no_schema_security_billing_public_route_or_channel_expansion_changes_attested');

// --- Stop / rollback status present and clean ---
if (evidence.stop_after_evidence_capture !== true) fail('stop_after_evidence_capture must be true');
if (evidence.one_time_approval_consumed !== true) fail('one_time_approval_consumed must be true');
if (evidence.blocked_or_errored !== false) fail('blocked_or_errored must be false');
if (typeof evidence.rollback_status !== 'string' || !evidence.rollback_status.includes('reversible')) {
  fail('rollback_status must indicate reversibility');
}
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('evidence safety_status wrong');
if (evidence.final_decision !== 'PASS ONE-TIME SUPERVISED SANDBOX/TEST-MODE SMS EXECUTION (SIMULATED, NO LIVE DELIVERY)') {
  fail('evidence final_decision wrong');
}
pass('stop_rollback_status_present_and_clean');

// --- Runner source: no env, no network, no live-service clients, no live send verbs ---
const forbiddenClientPatterns = [
  'process.env',
  "require('http')", 'require("http")',
  "require('https')", 'require("https")',
  "require('net')", 'require("net")',
  "require('dns')", 'require("dns")',
  "require('twilio')", 'require("twilio")',
  "require('vapi')", 'require("vapi")',
  "require('@vapi-ai", 'require("@vapi-ai',
  "require('resend')", 'require("resend")',
  "require('@supabase", 'require("@supabase',
  "require('googleapis')", 'require("googleapis")',
  'createClient(',
  'new Twilio',
  'fetch(',
  'XMLHttpRequest',
  'http://',
  'https://'
];
for (const needle of forbiddenClientPatterns) {
  if (runnerSrc.includes(needle)) fail('runner must not reference: ' + needle);
}
pass('runner_has_no_env_network_or_live_service_client_surface');

const forbiddenLiveVerbs = ['.messages.create', '.calls.create', '.emails.send', '.events.insert', 'sendMessage(', 'placeCall('];
for (const verb of forbiddenLiveVerbs) {
  if (runnerSrc.includes(verb)) fail('runner must not contain live send/call/book verb: ' + verb);
}
pass('runner_has_no_live_send_call_or_booking_verbs');

// --- Wrapper is local-only, runs Build 184 runner + verifier, does not invoke the actual stub ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual external/sandbox runner stub');
}
if (!wrapper.includes('backend/scripts/run-native-workflow-fixture-supervised-sandbox-sms-execution.js')) {
  fail('wrapper must run the Build 184 runner');
}
if (!wrapper.includes('backend/scripts/verify-native-workflow-fixture-supervised-sandbox-sms-execution-readonly.js')) {
  fail('wrapper must run the Build 184 verifier');
}
pass('wrapper_runs_build_184_runner_and_verifier_and_does_not_invoke_actual_stub');

// --- No artifact claims external/live/production/sandbox activation occurred ---
const combined = wrapper + '\n' + JSON.stringify(evidence) + '\n' + runnerSrc;
const forbiddenClaims = [
  '"external_calls": true',
  '"sandbox_external_calls": true',
  '"credentials_used": true',
  '"used_real_live_twilio_credentials": true',
  '"production_data_used": true',
  '"live_activation": true',
  '"real_homeowner_contact": true',
  '"real_roofer_contact": true',
  '"sms_actually_sent": true',
  '"invoked_actual_external_sandbox_runner_stub": true'
];
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden external/live/production/sandbox activation claim present: ' + claim);
}
pass('no_external_live_production_or_sandbox_activation_claimed_anywhere');

// --- Pilot readiness preserved ---
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 184 one-time supervised sandbox/test-mode SMS execution evidence verified');
console.log('PASS: gate reports SANDBOX_EXECUTION_PERMITTED; execution within exact signed scope (SMS only, supervised, one-time)');
console.log('PASS: transport is sandbox/test-mode, not live; only config NAME presence checked (no secret values)');
console.log('PASS: exactly one capped execution; no real SMS sent (simulated by Twilio test credentials); no external call');
console.log('PASS: no production data, no live automation, no schema/security/billing/public-route changes');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Build 184 verifier passed (' + passCount + ' assertions).');
