#!/usr/bin/env node
/**
 * Build 182 Read-Only Verifier —
 * Native Workflow Fixture Channel-Adapter Execution Engine (local-only, mock-backed).
 *
 * Read-only. Node built-ins only (fs, path) plus the local engine module and the existing
 * pilot readiness helper. No network, no process.env value access, no credentials, no
 * production data, no live activation, no real contacts, no sandbox/external calls. Does NOT
 * invoke the fail-closed actual external/sandbox runner stub.
 *
 * Proves: all 30 scenarios execute through the adapter interface; mock transport passes
 * 30/30; the engine has no env/network/secret/live-client surface; the sandbox transport is
 * genuinely fail-closed (names-only, no calls); and safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');
const engine = require('./native-workflow-channel-adapter-engine');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const manifestPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-validation-manifest.json`;
const inputsPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-fake-inputs.json`;
const expectedPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-expected-outputs.json`;
const resultPath = `${FIXTURE_DIR}/channel-adapter-execution-engine-mock-result.json`;
const enginePath = 'backend/scripts/native-workflow-channel-adapter-engine.js';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-channel-adapter-execution-engine.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-channel-adapter-execution-engine-dry-run.sh';
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

console.log('== Build 182 Channel-Adapter Execution Engine Verification ==');

const manifest = readJson(manifestPath);
const inputsDoc = readJson(inputsPath);
const expectedDoc = readJson(expectedPath);
const result = readJson(resultPath);
const engineSrc = read(enginePath);
const runnerSrc = read(runnerPath);
const wrapper = read(wrapperPath);
read(actualRunnerStubPath); // existence only; never invoked.

const manifestScenarios = Array.isArray(manifest.scenarios) ? manifest.scenarios : [];
if (manifestScenarios.length !== 30) fail('manifest must define 30 scenarios');
pass('manifest_defines_30_scenarios');

// --- Engine registers all 9 channels including email-for-future ---
const expectedChannels = ['sms', 'voice', 'email', 'lead', 'review', 'calendar', 'report', 'audit', 'stop'];
for (const ch of expectedChannels) if (!engine.CHANNELS.includes(ch)) fail('engine missing channel: ' + ch);
if (engine.CHANNELS.length !== expectedChannels.length) fail('engine channel count mismatch');
pass('engine_registers_all_nine_channels_including_email_for_future');

// --- Every manifest group resolves to a channel adapter ---
const groups = new Set(manifestScenarios.map((s) => s.scenario_group));
for (const g of groups) {
  if (!engine.GROUP_TO_CHANNEL[g]) fail('no channel mapping for manifest group: ' + g);
}
pass('all_manifest_groups_map_to_a_channel_adapter');

// --- Mock registry: every adapter exists and makes no external call ---
const mockRegistry = engine.buildAdapterRegistry(engine.TRANSPORT_MOCK, {});
for (const ch of engine.CHANNELS) {
  const a = mockRegistry[ch];
  if (!a || typeof a.execute !== 'function') fail('mock adapter missing execute for channel: ' + ch);
  if (a.external_call_made !== false) fail('mock adapter must not make external calls: ' + ch);
  if (a.transport_mode !== engine.TRANSPORT_MOCK) fail('mock adapter transport_mode wrong: ' + ch);
}
pass('mock_registry_has_executable_no_external_call_adapter_per_channel');

// --- Mock adapter is deterministic: same input -> same observed result twice ---
const sampleInput = { simulated_observed_result: 'determinism_probe_value', simulated_stop_condition_triggered: false };
const r1 = mockRegistry.sms.execute(sampleInput);
const r2 = mockRegistry.sms.execute(sampleInput);
if (r1.observed_result !== 'determinism_probe_value' || r2.observed_result !== r1.observed_result) {
  fail('mock adapter not deterministic');
}
if (r1.external_call_made !== false || r2.external_call_made !== false) fail('mock adapter reported external call');
pass('mock_adapter_execution_is_deterministic_and_no_external_call');

// --- Sandbox transport is genuinely fail-closed (names only, no calls) ---
const sandboxRegistry = engine.buildAdapterRegistry(engine.TRANSPORT_SANDBOX, {});
for (const ch of engine.CHANNELS) {
  const a = sandboxRegistry[ch];
  if (!a || a.fail_closed !== true) fail('sandbox adapter not fail_closed for channel: ' + ch);
  if (a.external_call_made !== false) fail('sandbox adapter must not make external calls: ' + ch);
  if (!Array.isArray(a.missing_config_names)) fail('sandbox adapter must list missing_config_names: ' + ch);
  if (typeof a.execute === 'function') fail('sandbox adapter must not expose execute in Build 182: ' + ch);
  // Required config names must be NAMES only (uppercase identifiers), never look like secret values.
  for (const name of a.missing_config_names) {
    if (!/^[A-Z][A-Z0-9_]*$/.test(name)) fail('sandbox config entry is not a bare NAME identifier: ' + name);
  }
}
pass('sandbox_transport_is_fail_closed_names_only_no_execute_no_external_call');

// --- Result is mock-backed, 30/30 through adapters, labeled local-only ---
if (result.data_classification !== 'local_fake_data_only') fail('result must be local_fake_data_only');
if (result.execution_mode !== 'local-mock-backed-channel-adapter') fail('result execution_mode wrong');
if (result.transport_mode !== engine.TRANSPORT_MOCK) fail('result transport_mode must be mock_now');
if (result.sandbox_later !== true) fail('result sandbox_later must be true');
if (result.sandbox_transport_status !== 'fail_closed_not_provisioned_not_approved_in_build_182') fail('result sandbox_transport_status wrong');
if (result.invoked_actual_external_sandbox_runner_stub !== false) fail('result must not invoke actual stub');
if (result.total_scenarios_count !== 30) fail('result total_scenarios_count must be 30');
if (result.captured_count !== 30) fail('result captured_count must be 30');
if (result.executed_through_adapter_count !== 30) fail('result executed_through_adapter_count must be 30');
if (result.passed_count !== 30) fail('result passed_count must be 30');
if (result.failed_count !== 0) fail('result failed_count must be 0');
if (result.missing_count !== 0) fail('result missing_count must be 0');
for (const k of ['external_calls_count', 'credential_values_logged_count', 'production_data_touches_count', 'real_contact_touches_count']) {
  if (result[k] !== 0) fail('result ' + k + ' must be 0');
}
for (const k of ['external_calls', 'credentials_used', 'production_data_used', 'live_activation', 'real_homeowner_contact', 'real_roofer_contact', 'sandbox_external_calls']) {
  if (result[k] !== false) fail('result ' + k + ' must be false');
}
if (result.local_mock_validation_status !== 'captured_local_mock_backed') fail('result local_mock_validation_status wrong');
if (result.final_decision !== 'PASS LOCAL MOCK-BACKED CHANNEL-ADAPTER 30-SCENARIO EXECUTION') fail('result final_decision wrong');
if (result.safety_status !== 'demo_ready_with_live_automation_disabled') fail('result safety_status wrong');
pass('result_is_mock_backed_30_30_through_adapters_no_external_no_production_no_live');

// --- Each result scenario executed through its channel adapter with no external call ---
const resultScenarios = Array.isArray(result.scenarios) ? result.scenarios : [];
if (resultScenarios.length !== 30) fail('result must contain 30 scenarios');
const expectedById = new Map(expectedDoc.expected_outputs.map((e) => [e.scenario_id, e]));
const manifestById = new Map(manifestScenarios.map((s) => [s.scenario_id, s]));
let stopCount = 0;
for (const s of resultScenarios) {
  const m = manifestById.get(s.scenario_id);
  if (!m) fail('result scenario not in manifest: ' + s.scenario_id);
  if (s.pass_fail_status !== 'passed') fail('result scenario not passed: ' + s.scenario_id);
  if (s.transport_mode !== engine.TRANSPORT_MOCK) fail('result scenario transport not mock: ' + s.scenario_id);
  if (s.external_call_made !== false) fail('result scenario reports external call: ' + s.scenario_id);
  const expChannel = engine.GROUP_TO_CHANNEL[m.scenario_group];
  if (s.channel !== expChannel) fail('result scenario channel mismatch for ' + s.scenario_id);
  const exp = expectedById.get(s.scenario_id);
  if (!exp) fail('no expected output for ' + s.scenario_id);
  if (s.observed_result !== exp.expected_result) fail('observed != expected for ' + s.scenario_id);
  if (s.evidence_log_reference !== 'local_fake_data_only:mock_transport:no_external_log') fail('evidence_log_reference wrong for ' + s.scenario_id);
  if (s.stop_condition_triggered === true) stopCount += 1;
}
if (stopCount !== result.stop_conditions_count) fail('stop_conditions_count mismatch');
pass('all_30_result_scenarios_executed_through_adapter_and_match_expected');

// --- Engine + runner source: no env, no network, no live-service clients ---
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
for (const src of [engineSrc, runnerSrc]) {
  for (const needle of forbiddenClientPatterns) {
    if (src.includes(needle)) fail('engine/runner must not reference: ' + needle);
  }
}
pass('engine_and_runner_have_no_env_network_or_live_service_client_surface');

// --- No real SMS/email/calls/calendar booking verbs implying live action in engine/runner ---
const forbiddenLiveVerbs = ['.messages.create', '.calls.create', '.emails.send', '.events.insert', 'sendMessage(', 'placeCall('];
for (const src of [engineSrc, runnerSrc]) {
  for (const verb of forbiddenLiveVerbs) {
    if (src.includes(verb)) fail('engine/runner must not contain live send/call/book verb: ' + verb);
  }
}
pass('no_live_send_call_or_booking_verbs_in_engine_or_runner');

// --- Dry-run wrapper is local-only and must not invoke the actual runner stub ---
if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual external/sandbox runner stub');
}
pass('wrapper_does_not_invoke_actual_external_sandbox_runner_stub');
if (!wrapper.includes('backend/scripts/run-native-workflow-fixture-channel-adapter-execution-engine.js')) {
  fail('wrapper must run the Build 182 engine runner');
}
if (!wrapper.includes('backend/scripts/verify-native-workflow-fixture-channel-adapter-execution-engine-readonly.js')) {
  fail('wrapper must run the Build 182 verifier');
}
pass('wrapper_runs_build_182_engine_and_verifier');

// --- Pilot readiness preserved ---
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

// --- No artifact claims external/live/production/sandbox activation occurred ---
const combined = wrapper + '\n' + JSON.stringify(result) + '\n' + engineSrc + '\n' + runnerSrc;
const forbiddenClaims = [
  '"external_calls": true',
  '"credentials_used": true',
  '"production_data_used": true',
  '"live_activation": true',
  '"real_homeowner_contact": true',
  '"real_roofer_contact": true',
  '"sandbox_external_calls": true',
  '"invoked_actual_external_sandbox_runner_stub": true',
  '"external_call_made": true'
];
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden external/live/production/sandbox activation claim present: ' + claim);
}
pass('no_external_live_production_or_sandbox_activation_claimed_anywhere');

console.log('PASS: Build 182 mock-backed channel-adapter execution engine verified');
console.log('PASS: all 30 scenarios execute through the channel-adapter interface (mock transport)');
console.log('PASS: mock transport passes 30/30 with no external calls');
console.log('PASS: sandbox transport is fail-closed (missing config names only, no calls)');
console.log('PASS: engine/runner have no env/network/secret/live-client surface');
console.log('PASS: actual external/sandbox stub runner not invoked');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Build 182 verifier passed (' + passCount + ' assertions).');
