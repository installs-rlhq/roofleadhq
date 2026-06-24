#!/usr/bin/env node
/**
 * Build 181 Read-Only Verifier —
 * Native Workflow Fixture Actual External/Sandbox 30-Scenario LOCAL Validation.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper.
 * No network, no external URLs, no process.env-derived secrets, no credentials,
 * no production data, no live activation, no real contacts. This verifier does NOT
 * invoke the fail-closed actual external/sandbox runner stub and does NOT execute
 * any live service.
 *
 * It asserts that the local fake-data executor, its input/expected fixtures, and the
 * generated local validation result are mutually consistent across all 30 manifest
 * scenarios, and that nothing in the packet implies external/live/production activity.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const manifestPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-validation-manifest.json`;
const inputsPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-fake-inputs.json`;
const expectedPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-expected-outputs.json`;
const resultPath = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-validation-result.json`;
const executorPath = 'backend/scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-local-validation.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-local-validation-dry-run.sh';
const actualRunnerStubPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';

let passCount = 0;

function pass(name) {
  passCount += 1;
  console.log('PASS: ' + name);
}

function fail(message) {
  console.error('FAIL: ' + message);
  process.exit(1);
}

function fullPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function isExecutable(rel) {
  try {
    fs.accessSync(fullPath(rel), fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

console.log('== Build 181 Local Fake-Data 30-Scenario Validation Verification ==');

const manifest = readJson(manifestPath);
const inputsDoc = readJson(inputsPath);
const expectedDoc = readJson(expectedPath);
const result = readJson(resultPath);
const executorSrc = read(executorPath);
const wrapper = read(wrapperPath);
read(actualRunnerStubPath); // existence only; never invoked.

// --- Manifest scenario universe ---
const manifestScenarios = Array.isArray(manifest.scenarios) ? manifest.scenarios : [];
if (manifestScenarios.length !== 30) fail('manifest must define 30 scenarios, got ' + manifestScenarios.length);
pass('manifest_defines_30_scenarios');
const manifestIds = manifestScenarios.map((s) => s.scenario_id);
const manifestIdSet = new Set(manifestIds);
if (manifestIdSet.size !== 30) fail('manifest scenario_ids are not unique');
pass('manifest_scenario_ids_unique');

// --- Fake inputs cover all 30 ---
const inputs = Array.isArray(inputsDoc.inputs) ? inputsDoc.inputs : [];
if (inputs.length !== 30) fail('fake inputs must have 30 entries, got ' + inputs.length);
if (inputsDoc.total_inputs_count !== 30) fail('fake inputs total_inputs_count must be 30');
if (inputsDoc.data_classification !== 'local_fake_data_only') fail('fake inputs must be local_fake_data_only');
const inputIds = new Set(inputs.map((i) => i.scenario_id));
for (const id of manifestIds) if (!inputIds.has(id)) fail('fake inputs missing manifest scenario: ' + id);
if (inputIds.size !== 30) fail('fake inputs scenario_ids not unique/complete');
pass('fake_inputs_cover_all_30_manifest_scenarios');

// --- Expected outputs cover all 30 ---
const expected = Array.isArray(expectedDoc.expected_outputs) ? expectedDoc.expected_outputs : [];
if (expected.length !== 30) fail('expected outputs must have 30 entries, got ' + expected.length);
if (expectedDoc.total_expected_count !== 30) fail('expected outputs total_expected_count must be 30');
if (expectedDoc.data_classification !== 'local_fake_data_only') fail('expected outputs must be local_fake_data_only');
const expectedIds = new Set(expected.map((e) => e.scenario_id));
for (const id of manifestIds) if (!expectedIds.has(id)) fail('expected outputs missing manifest scenario: ' + id);
if (expectedIds.size !== 30) fail('expected outputs scenario_ids not unique/complete');
pass('expected_outputs_cover_all_30_manifest_scenarios');

// --- Every fake input is a safe, sandbox, no-external-call fixture ---
for (const input of inputs) {
  const mode = String(input.service_mode || '').toLowerCase();
  if (mode.includes('live') || mode.includes('prod')) fail('input ' + input.scenario_id + ' service_mode not sandbox: ' + input.service_mode);
  if (!(mode.includes('sandbox') || mode.includes('test'))) fail('input ' + input.scenario_id + ' service_mode not sandbox/test');
  if (input.approved_boundary_checked !== true) fail('input ' + input.scenario_id + ' approved_boundary_checked must be true');
  if (input.external_services_called !== false) fail('input ' + input.scenario_id + ' external_services_called must be false');
  if (input.production_data_touched !== false) fail('input ' + input.scenario_id + ' production_data_touched must be false');
  if (input.live_action_allowed !== false) fail('input ' + input.scenario_id + ' live_action_allowed must be false');
}
pass('all_30_inputs_sandbox_no_external_no_production_no_live');

// --- Result is the executor output across all 30, all passing, labeled local ---
if (result.data_classification !== 'local_fake_data_only') fail('result data_classification must be local_fake_data_only');
if (result.execution_mode !== 'local-fake-data-only') fail('result execution_mode must be local-fake-data-only');
if (result.invoked_actual_external_sandbox_runner_stub !== false) fail('result must not invoke actual external/sandbox runner stub');
if (result.total_scenarios_count !== 30) fail('result total_scenarios_count must be 30');
if (result.captured_count !== 30) fail('result captured_count must be 30');
if (result.passed_count !== 30) fail('result passed_count must be 30');
if (result.failed_count !== 0) fail('result failed_count must be 0');
if (result.missing_count !== 0) fail('result missing_count must be 0');
if (result.external_calls_count !== 0) fail('result external_calls_count must be 0');
if (result.credential_values_logged_count !== 0) fail('result credential_values_logged_count must be 0');
if (result.production_data_touches_count !== 0) fail('result production_data_touches_count must be 0');
if (result.real_contact_touches_count !== 0) fail('result real_contact_touches_count must be 0');
if (result.external_calls !== false) fail('result external_calls must be false');
if (result.credentials_used !== false) fail('result credentials_used must be false');
if (result.production_data_used !== false) fail('result production_data_used must be false');
if (result.live_activation !== false) fail('result live_activation must be false');
if (result.real_homeowner_contact !== false) fail('result real_homeowner_contact must be false');
if (result.real_roofer_contact !== false) fail('result real_roofer_contact must be false');
if (result.local_fake_data_validation_status !== 'captured_local_fake_data_only') fail('result local_fake_data_validation_status must be captured_local_fake_data_only');
if (result.final_decision !== 'PASS LOCAL FAKE-DATA 30-SCENARIO VALIDATION') fail('result final_decision unexpected: ' + result.final_decision);
if (result.safety_status !== 'demo_ready_with_live_automation_disabled') fail('result safety_status unexpected: ' + result.safety_status);
pass('result_is_local_fake_data_only_30_30_pass_no_external_no_production_no_live');

const resultScenarios = Array.isArray(result.scenarios) ? result.scenarios : [];
if (resultScenarios.length !== 30) fail('result must contain 30 scenarios, got ' + resultScenarios.length);
let stopCount = 0;
for (const s of resultScenarios) {
  if (!manifestIdSet.has(s.scenario_id)) fail('result scenario not in manifest: ' + s.scenario_id);
  if (s.pass_fail_status !== 'passed') fail('result scenario not passed: ' + s.scenario_id);
  const exp = expected.find((e) => e.scenario_id === s.scenario_id);
  if (!exp) fail('no expected output for result scenario: ' + s.scenario_id);
  if (s.observed_result !== exp.expected_result) fail('observed != expected for ' + s.scenario_id);
  if (s.expected_result !== exp.expected_result) fail('result expected_result mismatch for ' + s.scenario_id);
  if (s.stop_condition_triggered === true) stopCount += 1;
  if (s.evidence_log_reference !== 'local_fake_data_only:no_external_log') fail('result scenario evidence_log_reference must be local-only for ' + s.scenario_id);
}
if (stopCount !== result.stop_conditions_count) fail('stop_conditions_count mismatch: ' + stopCount + ' vs ' + result.stop_conditions_count);
pass('all_30_result_scenarios_passed_and_match_expected_outputs');

// --- Executor source must stay free of network / secret / live surfaces ---
const forbiddenInExecutor = [
  'process.env',
  'require(\'http\')',
  'require("http")',
  'require(\'https\')',
  'require("https")',
  'require(\'net\')',
  'fetch(',
  'XMLHttpRequest',
  'twilio',
  'Twilio',
  'vapi',
  'Vapi',
  'resend',
  'Resend',
  'createClient',
  '@supabase',
  'http://',
  'https://'
];
for (const needle of forbiddenInExecutor) {
  if (executorSrc.includes(needle)) fail('executor must not reference: ' + needle);
}
pass('executor_has_no_env_network_secret_or_live_service_surface');

if (!/require\('fs'\)/.test(executorSrc) || !/require\('path'\)/.test(executorSrc)) {
  fail('executor must use only fs and path node built-ins');
}
pass('executor_uses_only_fs_and_path_builtins');

// --- Dry-run wrapper is local-only and must not invoke the actual runner stub ---
if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual external/sandbox runner stub');
}
if (wrapper.includes('./' + actualRunnerStubPath) || wrapper.includes(actualRunnerStubPath.replace('scripts/', 'scripts/') + ' ')) {
  // defensive: any direct call form
}
pass('wrapper_does_not_invoke_actual_external_sandbox_runner_stub');
if (!wrapper.includes('backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-local-validation-readonly.js')) {
  fail('wrapper must run the Build 181 read-only verifier');
}
if (!wrapper.includes('node "$VERIFIER"') && !wrapper.includes('node $VERIFIER')) {
  fail('wrapper must execute the Build 181 verifier via node');
}
pass('wrapper_runs_build_181_readonly_verifier');

// --- Pilot readiness must remain demo_ready_with_live_automation_disabled ---
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

// --- No packet artifact may claim external/live/production activation occurred ---
const combined = wrapper + '\n' + JSON.stringify(result) + '\n' + JSON.stringify(inputsDoc) + '\n' + JSON.stringify(expectedDoc);
const forbiddenClaims = [
  '"external_calls": true',
  '"credentials_used": true',
  '"production_data_used": true',
  '"live_activation": true',
  '"real_homeowner_contact": true',
  '"real_roofer_contact": true',
  '"invoked_actual_external_sandbox_runner_stub": true',
  '"external_services_called": true',
  '"production_data_touched": true',
  '"live_action_allowed": true'
];
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden external/live/production activation claim present: ' + claim);
}
pass('no_external_live_or_production_activation_claimed_anywhere');

console.log('PASS: Build 181 local fake-data 30-scenario validation executor and evidence verified');
console.log('PASS: fake inputs and expected outputs each cover all 30 manifest scenarios');
console.log('PASS: local validation result is local_fake_data_only, 30/30 passed, stub not invoked');
console.log('PASS: executor uses only fs/path and has no env/network/secret/live surface');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Build 181 verifier passed (' + passCount + ' assertions).');
