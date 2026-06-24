#!/usr/bin/env node
/**
 * Native Workflow Fixture — Actual External/Sandbox 30-Scenario LOCAL Validation Executor
 *
 * LOCAL FAKE-DATA ONLY. Node built-ins only (fs, path). No network, no external URLs,
 * no environment-variable access, no credentials, no production data, no live activation, no real contacts.
 *
 * This is NOT the external/sandbox runner. It does NOT invoke
 * scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh
 * (which remains a fail-closed stub). It reads the 30-scenario manifest plus local fake
 * input/expected-output fixtures, scores each scenario deterministically, and produces a
 * local fake-data evidence result. Observed results are SIMULATED fake values, not real
 * service responses.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MANIFEST_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-validation-manifest.json`;
const INPUTS_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-fake-inputs.json`;
const EXPECTED_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-expected-outputs.json`;
const RESULT_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-validation-result.json`;

const RUNNER_NAME = 'native_workflow_fixture_actual_external_sandbox_30_scenario_local_validation';
const DATA_CLASSIFICATION = 'local_fake_data_only';
const STATIC_TIMESTAMP_LABEL = 'local-fake-data-deterministic-run';
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

function isSandboxMode(mode) {
  if (typeof mode !== 'string') return false;
  const lowered = mode.toLowerCase();
  if (lowered.includes('live') || lowered.includes('production') || lowered.includes('prod')) {
    return false;
  }
  return lowered.includes('sandbox') || lowered.includes('test');
}

const manifest = readJson(MANIFEST_PATH);
const inputsDoc = readJson(INPUTS_PATH);
const expectedDoc = readJson(EXPECTED_PATH);

const manifestScenarios = Array.isArray(manifest.scenarios) ? manifest.scenarios : [];
const inputs = Array.isArray(inputsDoc.inputs) ? inputsDoc.inputs : [];
const expected = Array.isArray(expectedDoc.expected_outputs) ? expectedDoc.expected_outputs : [];

const inputsById = new Map(inputs.map((item) => [item.scenario_id, item]));
const expectedById = new Map(expected.map((item) => [item.scenario_id, item]));

const results = [];
let passedCount = 0;
let failedCount = 0;
let capturedCount = 0;
let missingCount = 0;
let stopConditionsCount = 0;

for (const scenario of manifestScenarios) {
  const id = scenario.scenario_id;
  const input = inputsById.get(id);
  const exp = expectedById.get(id);
  const diagnostics = [];

  if (!input || !exp) {
    missingCount += 1;
    results.push({
      scenario_id: id,
      scenario_group: scenario.scenario_group,
      scenario_name: scenario.scenario_name,
      pass_fail_status: 'missing',
      diagnostics: [!input ? 'no local fake input fixture' : null, !exp ? 'no expected output fixture' : null].filter(Boolean)
    });
    continue;
  }

  capturedCount += 1;

  // Safety boundary scoring (can genuinely fail).
  if (!isSandboxMode(input.service_mode)) diagnostics.push('service_mode not sandbox/test: ' + input.service_mode);
  if (input.approved_boundary_checked !== true) diagnostics.push('approved_boundary_checked must be true');
  if (input.external_services_called !== false) diagnostics.push('external_services_called must be false');
  if (input.production_data_touched !== false) diagnostics.push('production_data_touched must be false');
  if (input.live_action_allowed !== false) diagnostics.push('live_action_allowed must be false');

  // Correctness scoring: observed (simulated) vs expected.
  const observedResult = input.simulated_observed_result;
  const observedStop = input.simulated_stop_condition_triggered === true;
  const expectedStop = exp.expected_stop_condition_triggered === true;
  if (observedResult !== exp.expected_result) {
    diagnostics.push('observed_result "' + observedResult + '" != expected_result "' + exp.expected_result + '"');
  }
  if (observedStop !== expectedStop) {
    diagnostics.push('stop_condition_triggered ' + observedStop + ' != expected ' + expectedStop);
  }
  if (exp.expect_pass !== true) diagnostics.push('expected fixture expect_pass must be true');

  if (observedStop) stopConditionsCount += 1;

  const status = diagnostics.length === 0 ? 'passed' : 'failed';
  if (status === 'passed') passedCount += 1;
  else failedCount += 1;

  results.push({
    scenario_id: id,
    scenario_group: scenario.scenario_group,
    scenario_name: scenario.scenario_name,
    approved_boundary_checked: input.approved_boundary_checked === true,
    service_mode: input.service_mode,
    test_account_reference: input.test_account_reference,
    input_fixture: input.input_fixture,
    action_taken: input.action_taken,
    expected_result: exp.expected_result,
    observed_result: observedResult,
    pass_fail_status: status,
    evidence_log_reference: 'local_fake_data_only:no_external_log',
    stop_condition_triggered: observedStop,
    reviewer_initials: REVIEWER_INITIALS,
    timestamp: STATIC_TIMESTAMP_LABEL,
    diagnostics
  });
}

const totalScenarios = manifestScenarios.length;
const allPass = totalScenarios === 30 && capturedCount === 30 && passedCount === 30 && failedCount === 0 && missingCount === 0;

const resultDoc = {
  runner_name: RUNNER_NAME,
  data_classification: DATA_CLASSIFICATION,
  delivery_mode: 'local-only',
  execution_mode: 'local-fake-data-only',
  reads_manifest: MANIFEST_PATH,
  reads_fake_inputs: INPUTS_PATH,
  reads_expected_outputs: EXPECTED_PATH,
  invoked_actual_external_sandbox_runner_stub: false,
  total_scenarios_count: totalScenarios,
  captured_count: capturedCount,
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
  safety_status: 'demo_ready_with_live_automation_disabled',
  actual_external_sandbox_validation_status_via_stub_path: 'not_captured_by_stub_path',
  local_fake_data_validation_status: allPass ? 'captured_local_fake_data_only' : 'incomplete_local_fake_data_only',
  final_decision: allPass
    ? 'PASS LOCAL FAKE-DATA 30-SCENARIO VALIDATION'
    : 'FAIL LOCAL FAKE-DATA 30-SCENARIO VALIDATION',
  scenarios: results
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log(
  'SUMMARY: captured=' + capturedCount + ' passed=' + passedCount + ' failed=' + failedCount + ' missing=' + missingCount
);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
console.log('FINAL DECISION: ' + resultDoc.final_decision);

process.exit(allPass ? 0 : 1);
