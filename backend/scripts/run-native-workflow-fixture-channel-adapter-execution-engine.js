#!/usr/bin/env node
/**
 * Native Workflow Fixture — Channel-Adapter Execution Engine Runner (Build 182).
 *
 * LOCAL-ONLY, MOCK-BACKED. Node built-ins only (fs, path) plus the local engine module.
 * No network, no external URLs, no environment-variable access, no credentials, no production data,
 * no live activation, no real contacts, no sandbox/external calls.
 *
 * Runs all 30 manifest scenarios through the channel-adapter interface using deterministic
 * MOCK transport, and emits evidence in the Build 181 schema plus transport_mode/sandbox_later.
 *
 * Transport selection (default = mock):
 *   (no flag)            -> mock transport, full 30/30 scoring, writes evidence.
 *   --transport=sandbox  -> FAIL-CLOSED. Prints MISSING CONFIG NAMES ONLY and exits nonzero.
 *                           Never reads/prints secret values; never makes external calls.
 */

const fs = require('fs');
const path = require('path');
const engine = require('./native-workflow-channel-adapter-engine');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MANIFEST_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-validation-manifest.json`;
const INPUTS_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-fake-inputs.json`;
const EXPECTED_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-expected-outputs.json`;
const RESULT_PATH = `${FIXTURE_DIR}/channel-adapter-execution-engine-mock-result.json`;

const RUNNER_NAME = 'native_workflow_fixture_channel_adapter_execution_engine';
const DATA_CLASSIFICATION = 'local_fake_data_only';
const STATIC_TIMESTAMP_LABEL = 'local-mock-backed-deterministic-run';
const REVIEWER_INITIALS = 'LOCAL';

function fail(message) {
  console.error('FAIL: ' + message);
  process.exit(1);
}

function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail('missing file: ' + rel);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

function parseTransportArg() {
  const arg = process.argv.find((a) => a.startsWith('--transport='));
  if (!arg) return engine.TRANSPORT_MOCK;
  const value = arg.split('=')[1];
  return value || engine.TRANSPORT_MOCK;
}

const transportMode = parseTransportArg();

// ---- FAIL-CLOSED sandbox path ----------------------------------------------------------
if (transportMode === engine.TRANSPORT_SANDBOX) {
  // Build 182 never provisions sandbox config; provisioned names = {}.
  const registry = engine.buildAdapterRegistry(engine.TRANSPORT_SANDBOX, {});
  const missingByChannel = {};
  for (const channel of engine.CHANNELS) {
    const adapter = registry[channel];
    if (adapter && Array.isArray(adapter.missing_config_names) && adapter.missing_config_names.length > 0) {
      missingByChannel[channel] = adapter.missing_config_names;
    }
  }
  console.error('SANDBOX TRANSPORT FAIL-CLOSED: sandbox config is not provisioned in Build 182.');
  console.error('No external calls were made. No secret values were read or logged.');
  console.error('Missing sandbox config names (names only, never values):');
  console.error(JSON.stringify(missingByChannel, null, 2));
  console.error('Sandbox execution requires separate approval and correct credential provisioning by Jason.');
  process.exit(2);
}

if (transportMode !== engine.TRANSPORT_MOCK) {
  fail('unsupported transport mode: ' + transportMode + ' (supported: mock_now, sandbox)');
}

// ---- MOCK transport path ---------------------------------------------------------------
const manifest = readJson(MANIFEST_PATH);
const inputsDoc = readJson(INPUTS_PATH);
const expectedDoc = readJson(EXPECTED_PATH);

const manifestScenarios = Array.isArray(manifest.scenarios) ? manifest.scenarios : [];
const inputs = Array.isArray(inputsDoc.inputs) ? inputsDoc.inputs : [];
const expected = Array.isArray(expectedDoc.expected_outputs) ? expectedDoc.expected_outputs : [];

const inputsById = new Map(inputs.map((item) => [item.scenario_id, item]));
const expectedById = new Map(expected.map((item) => [item.scenario_id, item]));

const registry = engine.buildAdapterRegistry(engine.TRANSPORT_MOCK, {});

const results = [];
const channelCounts = {};
for (const channel of engine.CHANNELS) channelCounts[channel] = { executed: 0, passed: 0, failed: 0 };

let passedCount = 0;
let failedCount = 0;
let capturedCount = 0;
let missingCount = 0;
let stopConditionsCount = 0;
let executedThroughAdapterCount = 0;

for (const scenario of manifestScenarios) {
  const id = scenario.scenario_id;
  const input = inputsById.get(id);
  const exp = expectedById.get(id);
  const channel = engine.resolveChannelForScenario(scenario);

  if (!input || !exp || !channel) {
    missingCount += 1;
    results.push({
      scenario_id: id,
      scenario_group: scenario.scenario_group,
      scenario_name: scenario.scenario_name,
      channel: channel || 'unresolved',
      pass_fail_status: 'missing',
      diagnostics: [
        !input ? 'no local fake input fixture' : null,
        !exp ? 'no expected output fixture' : null,
        !channel ? 'no channel adapter mapping for group' : null
      ].filter(Boolean)
    });
    continue;
  }

  capturedCount += 1;
  const adapter = registry[channel];
  const { response, observedResult, observedStop, diagnostics } = engine.scoreScenarioThroughAdapter({
    scenario,
    input,
    expected: exp,
    adapter
  });

  executedThroughAdapterCount += response ? 1 : 0;
  channelCounts[channel].executed += 1;
  if (observedStop) stopConditionsCount += 1;

  const status = diagnostics.length === 0 ? 'passed' : 'failed';
  if (status === 'passed') {
    passedCount += 1;
    channelCounts[channel].passed += 1;
  } else {
    failedCount += 1;
    channelCounts[channel].failed += 1;
  }

  results.push({
    scenario_id: id,
    scenario_group: scenario.scenario_group,
    scenario_name: scenario.scenario_name,
    channel,
    adapter_integration: response ? response.adapter_integration : engine.CHANNEL_INTEGRATION[channel],
    transport_mode: engine.TRANSPORT_MOCK,
    external_call_made: false,
    approved_boundary_checked: input.approved_boundary_checked === true,
    service_mode: input.service_mode,
    test_account_reference: input.test_account_reference,
    input_fixture: input.input_fixture,
    action_taken: input.action_taken,
    expected_result: exp.expected_result,
    observed_result: observedResult,
    pass_fail_status: status,
    evidence_log_reference: 'local_fake_data_only:mock_transport:no_external_log',
    stop_condition_triggered: observedStop,
    reviewer_initials: REVIEWER_INITIALS,
    timestamp: STATIC_TIMESTAMP_LABEL,
    diagnostics
  });
}

const totalScenarios = manifestScenarios.length;
const allPass =
  totalScenarios === 30 &&
  capturedCount === 30 &&
  passedCount === 30 &&
  failedCount === 0 &&
  missingCount === 0 &&
  executedThroughAdapterCount === 30;

const resultDoc = {
  runner_name: RUNNER_NAME,
  data_classification: DATA_CLASSIFICATION,
  delivery_mode: 'local-only',
  execution_mode: 'local-mock-backed-channel-adapter',
  transport_mode: engine.TRANSPORT_MOCK,
  sandbox_later: true,
  sandbox_transport_status: 'fail_closed_not_provisioned_not_approved_in_build_182',
  reads_manifest: MANIFEST_PATH,
  reads_fake_inputs: INPUTS_PATH,
  reads_expected_outputs: EXPECTED_PATH,
  invoked_actual_external_sandbox_runner_stub: false,
  channels_registered: engine.CHANNELS,
  channels_registered_count: engine.CHANNELS.length,
  total_scenarios_count: totalScenarios,
  captured_count: capturedCount,
  executed_through_adapter_count: executedThroughAdapterCount,
  passed_count: passedCount,
  failed_count: failedCount,
  missing_count: missingCount,
  stop_conditions_count: stopConditionsCount,
  external_calls_count: 0,
  credential_values_logged_count: 0,
  production_data_touches_count: 0,
  real_contact_touches_count: 0,
  external_calls: false,
  credentials_used: false,
  production_data_used: false,
  live_activation: false,
  real_homeowner_contact: false,
  real_roofer_contact: false,
  sandbox_external_calls: false,
  safety_status: 'demo_ready_with_live_automation_disabled',
  per_channel_counts: channelCounts,
  local_mock_validation_status: allPass ? 'captured_local_mock_backed' : 'incomplete_local_mock_backed',
  final_decision: allPass
    ? 'PASS LOCAL MOCK-BACKED CHANNEL-ADAPTER 30-SCENARIO EXECUTION'
    : 'FAIL LOCAL MOCK-BACKED CHANNEL-ADAPTER 30-SCENARIO EXECUTION',
  scenarios: results
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log(
  'SUMMARY: transport=' + engine.TRANSPORT_MOCK +
  ' captured=' + capturedCount +
  ' executed=' + executedThroughAdapterCount +
  ' passed=' + passedCount +
  ' failed=' + failedCount +
  ' missing=' + missingCount
);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
console.log('FINAL DECISION: ' + resultDoc.final_decision);

process.exit(allPass ? 0 : 1);
