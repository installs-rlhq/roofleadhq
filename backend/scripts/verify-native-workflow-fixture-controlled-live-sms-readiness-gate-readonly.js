#!/usr/bin/env node
/**
 * Build 185 Read-Only Verifier —
 * Controlled Live SMS Readiness Gate, ONE MESSAGE ONLY (readiness/approval materials only).
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no secret values, no production data, no live
 * activation, no SMS, no external Twilio call, no real contacts. Does NOT invoke the fail-closed
 * actual external/sandbox runner stub and runs no live execution.
 *
 * Proves: the gate is FAIL-CLOSED and returns CONTROLLED_LIVE_SMS_BLOCKED in Build 185 (live
 * approval unsigned + live credentials not provisioned); only config NAME presence is checked (no
 * secret values); the prior verified chain (181/182/183/184) is confirmed; the one-message cap,
 * Jason-own-consenting-recipient, STOP/rollback owner+procedure, no-production-data, no-real-
 * homeowner, and no-billing requirements are encoded; the gate has no env/network/secret/live-
 * client surface; no public-route/webhook/cron/scheduler/dispatcher is created; and the demo
 * safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const markerPath = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;
const gateResultPath = `${FIXTURE_DIR}/controlled-live-sms-readiness-gate-result.json`;
const gateRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_BLOCKED_READINESS_GATE_AFTER_BUILD_184.md';
const actualRunnerStubPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';

const REQUIRED_LIVE_SMS_CONFIG_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];

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

console.log('== Build 185 Controlled Live SMS Readiness Gate (one message only) Verification ==');

const marker = readJson(markerPath);
const gate = readJson(gateResultPath);
const gateRunnerSrc = read(gateRunnerPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
read(actualRunnerStubPath); // existence only; never invoked.

// --- Gate is FAIL-CLOSED and BLOCKED by design in Build 185 ---
if (gate.gate_decision !== 'CONTROLLED_LIVE_SMS_BLOCKED') fail('gate decision must be CONTROLLED_LIVE_SMS_BLOCKED');
if (gate.controlled_live_sms_ready !== false) fail('controlled_live_sms_ready must be false');
if (!Array.isArray(gate.blocked_reasons) || gate.blocked_reasons.length === 0) fail('gate must list blocked_reasons');
if (!gate.blocked_reasons.includes('explicit_controlled_live_sms_one_message_approval_not_signed')) {
  fail('blocked_reasons must include unsigned approval');
}
if (!gate.blocked_reasons.some((r) => r.startsWith('live_twilio_credentials_not_provisioned_in_jason_controlled_store'))) {
  fail('blocked_reasons must include live credentials not provisioned');
}
pass('gate_is_fail_closed_and_blocked_with_unsigned_approval_and_unprovisioned_live_creds');

// --- Gate performed nothing live: no send, no external/twilio call, no secret values ---
for (const k of ['performed_external_call', 'performed_external_twilio_call', 'performed_live_action', 'sent_sms', 'reads_secret_values', 'invoked_actual_external_sandbox_runner_stub']) {
  if (gate[k] !== false) fail('gate ' + k + ' must be false');
}
if (gate.inspects_config_names_only !== true) fail('gate must inspect config names only');
if (gate.mode !== 'readiness_and_approval_only') fail('gate mode must be readiness_and_approval_only');
if (gate.build !== 185) fail('gate build must be 185');
pass('gate_sent_nothing_made_no_external_twilio_call_and_read_no_secret_values');

// --- Prior verified chain (181/182/183/184) confirmed ---
const chain = gate.prior_chain_evidence || {};
for (const k of ['build_181_local_30_30_present', 'build_182_mock_30_30_present', 'build_183_sandbox_execution_permitted', 'build_184_sandbox_sms_simulated_not_sent']) {
  if (chain[k] !== true) fail('prior chain evidence not confirmed: ' + k);
}
if (gate.prior_chain_complete !== true) fail('prior_chain_complete must be true');
pass('prior_verified_chain_181_182_183_184_confirmed');

// --- LIVE config presence is NAMES ONLY and currently NOT provisioned ---
const lc = gate.live_config_readiness || {};
const requiredNames = Array.isArray(lc.required_live_config_names) ? lc.required_live_config_names : [];
for (const name of REQUIRED_LIVE_SMS_CONFIG_NAMES) {
  if (!requiredNames.includes(name)) fail('gate missing required live config NAME: ' + name);
  if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('live config entry is not a bare NAME identifier: ' + name);
}
if (lc.live_credentials_provisioned_in_jason_controlled_store !== false) fail('live creds must NOT be provisioned in Build 185');
const missing = Array.isArray(lc.missing_live_config_names) ? lc.missing_live_config_names : [];
for (const name of REQUIRED_LIVE_SMS_CONFIG_NAMES) {
  if (!missing.includes(name)) fail('missing_live_config_names must list ' + name);
}
if (typeof lc.live_credentials_location_requirement !== 'string' || !lc.live_credentials_location_requirement.includes('jason_controlled')) {
  fail('live credentials must be required only in Jason-controlled store');
}
// Marker carries no secret values.
if (marker.values_recorded !== false || marker.names_only !== true) fail('marker must be names-only with no recorded values');
pass('live_config_presence_is_names_only_required_in_jason_controlled_store_not_provisioned');

// --- One-message cap, recipient identity, STOP/rollback, and no-prod/no-homeowner/no-billing requirements ---
const r = gate.one_message_live_readiness || {};
if (r.one_message_cap_set !== true || r.one_message_cap_value !== 1 || gate.one_message_cap_value !== 1) {
  fail('one-message cap of exactly 1 must be encoded');
}
if (r.recipient_is_jason_own_consenting_test_identity !== true) fail('recipient must be Jason own consenting test identity');
if (r.recipient_consent_on_file !== true) fail('recipient consent must be on file');
if (r.recipient_is_not_a_real_homeowner !== true) fail('recipient must not be a real homeowner');
if (r.stop_rollback_owner_named !== true) fail('STOP/rollback owner must be named');
if (r.stop_rollback_procedure_documented !== true) fail('STOP/rollback procedure must be documented');
if (r.no_production_supabase_or_data_confirmed !== true) fail('no production supabase/data must be confirmed');
if (r.no_real_homeowner_contact_confirmed !== true) fail('no real homeowner contact must be confirmed');
if (r.no_billing_payment_deposit_quote_estimate_invoice_automation_confirmed !== true) fail('no billing automation must be confirmed');
if (r.live_automation_disabled_except_future_one_message_sms_confirmed !== true) fail('live automation must remain disabled except future one-message sms');
pass('one_message_cap_recipient_stop_rollback_no_prod_no_homeowner_no_billing_encoded');

// --- Channel is SMS only; future requirements list demands signed approval before any send ---
if (gate.approved_channel_for_controlled_live_test !== 'sms' || gate.channel_only_sms !== true) fail('channel must be sms only');
const reqs = Array.isArray(gate.requires_before_any_real_sms) ? gate.requires_before_any_real_sms : [];
if (!reqs.includes('explicit_signed_one_message_controlled_live_sms_approval')) fail('must require explicit signed approval before any send');
if (!reqs.includes('live_twilio_credentials_provisioned_only_in_jason_controlled_secret_store')) fail('must require Jason-controlled live creds before any send');
pass('channel_sms_only_and_future_send_requires_signed_approval_and_jason_controlled_creds');

// --- Gate runner source: no env, no network, no live-service clients, no live send verbs ---
const forbiddenClientPatterns = [
  'process.env',
  "require('http')", 'require("http")',
  "require('https')", 'require("https")',
  "require('net')", 'require("net")',
  "require('dns')", 'require("dns")',
  "require('twilio')", 'require("twilio")',
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
  if (gateRunnerSrc.includes(needle)) fail('gate runner must not reference: ' + needle);
}
pass('gate_runner_has_no_env_network_or_live_service_client_surface');

const forbiddenLiveVerbs = ['.messages.create', '.calls.create', '.emails.send', '.events.insert', 'sendMessage(', 'placeCall('];
for (const verb of forbiddenLiveVerbs) {
  if (gateRunnerSrc.includes(verb)) fail('gate runner must not contain live send/call/book verb: ' + verb);
}
pass('gate_runner_has_no_live_send_call_or_booking_verbs');

// --- No public route / webhook / cron / scheduler / dispatcher introduced ---
const forbiddenInfra = ['app.get(', 'app.post(', 'router.get(', 'router.post(', 'express(', 'createServer(', 'cron.schedule(', 'new CronJob', 'setInterval(', 'webhook'];
for (const needle of forbiddenInfra) {
  if (gateRunnerSrc.includes(needle)) fail('gate runner must not introduce route/webhook/cron/scheduler/dispatcher: ' + needle);
}
pass('no_public_route_webhook_cron_scheduler_or_dispatcher_in_gate_runner');

// --- Dry-run wrapper: local-only, runs gate (expects BLOCKED) + verifier, no actual stub ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual external/sandbox runner stub');
}
if (!wrapper.includes('backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js')) {
  fail('wrapper must run the Build 185 gate');
}
if (!wrapper.includes('backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js')) {
  fail('wrapper must run the Build 185 verifier');
}
pass('dry_run_wrapper_runs_build_185_gate_and_verifier_and_does_not_invoke_actual_stub');

// --- One-message approval packet/template doc present and labeled BLOCKED ---
if (!doc.includes('CONTROLLED_LIVE_SMS_BLOCKED')) fail('doc must reference CONTROLLED_LIVE_SMS_BLOCKED');
for (const needle of ['One-Message Approval Packet', 'Signature', 'one_message_cap', 'STOP', 'Jason']) {
  if (!doc.includes(needle)) fail('approval packet doc missing required section/marker: ' + needle);
}
if (doc.includes('Do not send SMS') === false && doc.includes('No SMS') === false) fail('doc must state no SMS is sent in Build 185');
pass('one_message_approval_packet_doc_present_and_blocked_labeled');

// --- No artifact claims live/external/send activation occurred ---
const combined = wrapper + '\n' + JSON.stringify(gate) + '\n' + JSON.stringify(marker) + '\n' + gateRunnerSrc + '\n' + doc;
const forbiddenClaims = [
  '"sent_sms": true',
  '"performed_external_call": true',
  '"performed_external_twilio_call": true',
  '"performed_live_action": true',
  '"controlled_live_sms_ready": true',
  '"gate_decision": "CONTROLLED_LIVE_SMS_PERMITTED"',
  '"explicit_controlled_live_sms_one_message_approval_signed": true',
  '"live_credentials_provisioned_in_jason_controlled_store": true'
];
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden live/external/send activation claim present: ' + claim);
}
pass('no_live_external_or_send_activation_claimed_anywhere');

// --- Pilot readiness preserved ---
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 185 controlled live SMS readiness gate verified (readiness/approval only)');
console.log('PASS: gate is fail-closed and BLOCKED by design (no signed approval, no provisioned live creds)');
console.log('PASS: names/booleans only; no secret values; no SMS sent; no external Twilio call');
console.log('PASS: prior chain 181/182/183/184 confirmed; one-message cap + Jason-own recipient + STOP/rollback encoded');
console.log('PASS: no production data, no real homeowner, no billing, no schema/security/public-route changes');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Build 185 verifier passed (' + passCount + ' assertions).');
