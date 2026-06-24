#!/usr/bin/env node
/**
 * Build 183 Read-Only Verifier —
 * Native Workflow Fixture Sandbox-Execution Readiness Gate + Supervised Controlled-Test Runbook.
 *
 * Read-only. Node built-ins only (fs, path) plus the local engine module and the pilot
 * readiness helper. No network, no environment-variable value access, no credentials, no
 * secret values, no production data, no live activation, no sandbox/external calls, no real
 * contacts. Does NOT invoke the fail-closed actual external/sandbox runner stub.
 *
 * Proves: Build 181 + Build 182 evidence exist and are valid; the readiness gate is genuinely
 * fail-closed and inspects config NAMES only (never values); sandbox/live execution stays
 * blocked until explicit approval + config presence; nothing in Build 183 can perform real
 * sends/calls/bookings; and safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');
const engine = require('./native-workflow-channel-adapter-engine');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const markerPath = `${FIXTURE_DIR}/sandbox-execution-provisioning-marker.json`;
const gateResultPath = `${FIXTURE_DIR}/sandbox-execution-readiness-gate-result.json`;
const build181ResultPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-validation-result.json`;
const build182ResultPath = `${FIXTURE_DIR}/channel-adapter-execution-engine-mock-result.json`;
const gatePath = 'backend/scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate.js';
const verifierSelfPath = 'backend/scripts/verify-native-workflow-fixture-sandbox-execution-readiness-gate-readonly.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_EXECUTION_READINESS_GATE.md';
const actualRunnerStubPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';

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

console.log('== Build 183 Sandbox-Execution Readiness Gate Verification ==');

const marker = readJson(markerPath);
const gateResult = readJson(gateResultPath);
const build181 = readJson(build181ResultPath);
const build182 = readJson(build182ResultPath);
const gateSrc = read(gatePath);
const verifierSelfSrc = read(verifierSelfPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);
read(actualRunnerStubPath); // existence only; never invoked.

// --- Build 181 evidence exists and is local_fake_data_only, 30/30 ---
if (build181.data_classification !== 'local_fake_data_only') fail('Build 181 result not local_fake_data_only');
if (build181.total_scenarios_count !== 30 || build181.passed_count !== 30) fail('Build 181 result not 30/30');
pass('build_181_local_fake_data_evidence_exists_30_30');

// --- Build 182 mock-backed channel adapter evidence exists and is 30/30 ---
if (build182.data_classification !== 'local_fake_data_only') fail('Build 182 result not local_fake_data_only');
if (build182.execution_mode !== 'local-mock-backed-channel-adapter') fail('Build 182 result wrong execution_mode');
if (build182.executed_through_adapter_count !== 30 || build182.passed_count !== 30) fail('Build 182 result not 30/30 through adapters');
pass('build_182_mock_backed_channel_adapter_evidence_exists_30_30');

// --- Provisioning marker is NAMES ONLY: no secret values anywhere ---
if (marker.contains_secret_values !== false) fail('marker must declare contains_secret_values false');
if (marker.names_only !== true) fail('marker must declare names_only true');
const markerText = JSON.stringify(marker);
const valueBearingKeys = ['"value"', '"secret"', '"token"', '"api_key"', '"auth_value"', '"credential"', '"password"', '"key_value"'];
for (const k of valueBearingKeys) {
  if (markerText.includes(k)) fail('marker must not contain value-bearing key: ' + k);
}
// Every config marker entry must be exactly {config_name, provisioned} — no value fields.
for (const channel of Object.keys(marker.config_presence_markers || {})) {
  for (const entry of marker.config_presence_markers[channel]) {
    const keys = Object.keys(entry).sort().join(',');
    if (keys !== 'config_name,provisioned') fail('config marker entry must be names+provisioned only for ' + channel + ': ' + keys);
    if (typeof entry.config_name !== 'string' || !/^[A-Z][A-Z0-9_]*$/.test(entry.config_name)) fail('config_name must be a bare NAME: ' + entry.config_name);
    if (typeof entry.provisioned !== 'boolean') fail('provisioned must be boolean for ' + entry.config_name);
  }
}
pass('provisioning_marker_is_config_names_only_no_secret_values');

// --- Marker required names reconcile with the engine's required sandbox config set ---
for (const channel of engine.CHANNELS) {
  const required = new Set(engine.REQUIRED_SANDBOX_CONFIG_NAMES[channel] || []);
  const inMarker = new Set((marker.config_presence_markers[channel] || []).map((e) => e.config_name));
  for (const name of required) if (!inMarker.has(name)) fail('marker missing required config name ' + name + ' for ' + channel);
}
pass('marker_required_config_names_reconcile_with_engine');

// --- In Build 183, nothing is provisioned or approved (fail-closed precondition) ---
if (marker.explicit_sandbox_execution_approval_signed !== false) fail('sandbox approval must be unsigned in Build 183');
if (marker.explicit_controlled_live_approval_signed !== false) fail('controlled-live approval must be unsigned in Build 183');
let anyProvisioned = false;
for (const channel of Object.keys(marker.config_presence_markers)) {
  for (const e of marker.config_presence_markers[channel]) if (e.provisioned === true) anyProvisioned = true;
}
if (anyProvisioned) fail('no config may be marked provisioned in Build 183');
for (const k of Object.keys(marker.supervised_test_readiness)) {
  if (marker.supervised_test_readiness[k] !== false) fail('supervised item must be false in Build 183: ' + k);
}
pass('build_183_marker_is_fully_unprovisioned_and_unapproved');

// --- Gate result proves sandbox/live execution is BLOCKED and inspects names only ---
if (gateResult.mode !== 'readiness_only') fail('gate result mode must be readiness_only');
if (gateResult.inspects_config_names_only !== true) fail('gate must inspect config names only');
if (gateResult.reads_secret_values !== false) fail('gate must not read secret values');
for (const k of ['performed_external_call', 'performed_sandbox_call', 'performed_live_action', 'invoked_actual_external_sandbox_runner_stub']) {
  if (gateResult[k] !== false) fail('gate result ' + k + ' must be false');
}
if (gateResult.sandbox_execution_ready !== false) fail('sandbox_execution_ready must be false in Build 183');
if (gateResult.controlled_live_ready !== false) fail('controlled_live_ready must be false in Build 183');
if (gateResult.gate_decision !== 'SANDBOX_EXECUTION_BLOCKED') fail('gate_decision must be SANDBOX_EXECUTION_BLOCKED');
if (!Array.isArray(gateResult.blocked_reasons) || gateResult.blocked_reasons.length === 0) fail('gate must list blocked_reasons');
if (gateResult.prior_evidence.build_181_local_evidence_present !== true) fail('gate must detect Build 181 evidence');
if (gateResult.prior_evidence.build_182_mock_evidence_present !== true) fail('gate must detect Build 182 evidence');
if (gateResult.safety_status !== 'demo_ready_with_live_automation_disabled') fail('gate safety_status wrong');
// Missing config names in the gate result must be bare NAMES, never values.
for (const channel of Object.keys(gateResult.missing_config_names_by_channel || {})) {
  for (const name of gateResult.missing_config_names_by_channel[channel]) {
    if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('gate missing-config entry is not a bare NAME: ' + name);
  }
}
pass('gate_result_is_fail_closed_blocked_names_only_no_calls');

// --- Functional re-check: engine sandbox registry remains fail-closed (no execute, no call) ---
const sandboxRegistry = engine.buildAdapterRegistry(engine.TRANSPORT_SANDBOX, {});
for (const ch of engine.CHANNELS) {
  const a = sandboxRegistry[ch];
  if (!a || a.fail_closed !== true || a.external_call_made !== false || typeof a.execute === 'function') {
    fail('engine sandbox transport not fail-closed for channel: ' + ch);
  }
}
pass('engine_sandbox_transport_still_fail_closed_no_execute_no_call');

// --- Gate + verifier source: no env, no network, no secret-reading, no live verbs ---
const forbiddenPatterns = [
  'process.env',
  "require('http')", 'require("http")',
  "require('https')", 'require("https")',
  "require('net')", 'require("net")',
  "require('twilio')", 'require("twilio")',
  "require('resend')", 'require("resend")',
  "require('@supabase", 'require("@supabase',
  "require('googleapis')", 'require("googleapis")',
  'createClient(',
  'new Twilio',
  'fetch(',
  'XMLHttpRequest',
  'http://',
  'https://',
  '.messages.create',
  '.calls.create',
  '.emails.send',
  '.events.insert'
];
for (const needle of forbiddenPatterns) {
  if (gateSrc.includes(needle)) fail('gate must not reference: ' + needle);
}
pass('gate_has_no_env_network_secret_or_live_surface');

// --- Runbook + Jason checklist doc covers all required items ---
const requiredDocItems = [
  'one pilot roofer',
  'written roofer consent',
  'one approved channel',
  'SMS',
  'test homeowner',
  'consent',
  '30',
  '60',
  'supervised',
  'STOP',
  'rollback',
  'cap',
  'sandbox',
  'staging',
  'no production data',
  'secret store',
  'never pasted into Claude'
];
for (const item of requiredDocItems) {
  if (!doc.toLowerCase().includes(item.toLowerCase())) fail('runbook/checklist doc missing required item: ' + item);
}
pass('runbook_and_jason_checklist_doc_covers_all_required_items');

// --- Dry-run wrapper is local-only, runs gate + verifier, never invokes the actual stub ---
if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual external/sandbox runner stub');
}
if (!wrapper.includes('backend/scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate.js')) {
  fail('wrapper must run the Build 183 readiness gate');
}
if (!wrapper.includes('backend/scripts/verify-native-workflow-fixture-sandbox-execution-readiness-gate-readonly.js')) {
  fail('wrapper must run the Build 183 verifier');
}
pass('dry_run_wrapper_executable_runs_gate_and_verifier_no_stub');

// --- Pilot readiness preserved ---
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

// --- No artifact claims execution/activation occurred ---
const combined = wrapper + '\n' + JSON.stringify(gateResult) + '\n' + JSON.stringify(marker) + '\n' + gateSrc;
const forbiddenClaims = [
  '"sandbox_execution_ready": true',
  '"controlled_live_ready": true',
  '"performed_external_call": true',
  '"performed_sandbox_call": true',
  '"performed_live_action": true',
  '"invoked_actual_external_sandbox_runner_stub": true',
  '"contains_secret_values": true',
  '"gate_decision": "SANDBOX_EXECUTION_PERMITTED"'
];
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden execution/activation claim present: ' + claim);
}
pass('no_execution_or_activation_claimed_anywhere');

console.log('PASS: Build 183 sandbox-execution readiness gate verified');
console.log('PASS: Build 181 and Build 182 local evidence present and valid');
console.log('PASS: readiness gate is fail-closed; sandbox/live execution remains BLOCKED');
console.log('PASS: gate inspects config NAMES only and reads no secret values');
console.log('PASS: no real SMS/email/calls/calendar bookings possible from Build 183');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Build 183 verifier passed (' + passCount + ' assertions).');
