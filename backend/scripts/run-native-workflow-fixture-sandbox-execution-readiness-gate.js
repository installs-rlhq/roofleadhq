#!/usr/bin/env node
/**
 * Native Workflow Fixture — Sandbox-Execution Readiness Gate (Build 183).
 *
 * LOCAL-ONLY, READINESS-ONLY. Node built-ins only (fs, path) plus the local engine module.
 * No network, no external URLs, no environment-variable access, no credentials, no secret
 * values, no production data, no live activation, no sandbox/external calls, no real contacts.
 *
 * This gate is FAIL-CLOSED. It inspects the local provisioning marker for required config
 * NAMES (presence booleans only — never values) and supervised-test readiness booleans, then
 * reports whether sandbox execution is permitted. In Build 183 nothing is provisioned or
 * approved, so the gate reports BLOCKED and exits nonzero. It performs no execution.
 */

const fs = require('fs');
const path = require('path');
const engine = require('./native-workflow-channel-adapter-engine');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MARKER_PATH = `${FIXTURE_DIR}/sandbox-execution-provisioning-marker.json`;
const BUILD_181_RESULT_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-validation-result.json`;
const BUILD_182_RESULT_PATH = `${FIXTURE_DIR}/channel-adapter-execution-engine-mock-result.json`;
const RESULT_PATH = `${FIXTURE_DIR}/sandbox-execution-readiness-gate-result.json`;

const GATE_NAME = 'native_workflow_fixture_sandbox_execution_readiness_gate';

function fail(message) {
  console.error('FAIL: ' + message);
  process.exit(1);
}

function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail('missing file: ' + rel);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

const marker = readJson(MARKER_PATH);
const build181 = readJson(BUILD_181_RESULT_PATH);
const build182 = readJson(BUILD_182_RESULT_PATH);

// --- Prior-evidence preconditions (local-only) ---
const priorEvidence = {
  build_181_local_evidence_present: build181.data_classification === 'local_fake_data_only' &&
    build181.passed_count === 30 && build181.total_scenarios_count === 30,
  build_182_mock_evidence_present: build182.data_classification === 'local_fake_data_only' &&
    build182.passed_count === 30 && build182.executed_through_adapter_count === 30
};

// --- Config presence (NAMES ONLY) per channel, reconciled against the engine's required set ---
const approvedChannel = marker.approved_channel_for_first_test;
const configMarkers = marker.config_presence_markers || {};
const requiredByChannel = engine.REQUIRED_SANDBOX_CONFIG_NAMES;

const configReadiness = {};
const missingConfigNamesByChannel = {};
for (const channel of engine.CHANNELS) {
  const required = requiredByChannel[channel] || [];
  const provided = Array.isArray(configMarkers[channel]) ? configMarkers[channel] : [];
  const provisionedNames = new Set(
    provided.filter((e) => e && e.provisioned === true).map((e) => e.config_name)
  );
  const missing = required.filter((name) => !provisionedNames.has(name));
  configReadiness[channel] = missing.length === 0;
  if (missing.length > 0) missingConfigNamesByChannel[channel] = missing; // names only
}

// --- Supervised-test readiness booleans ---
const supervised = marker.supervised_test_readiness || {};
const supervisedItems = Object.keys(supervised);
const unmetSupervisedItems = supervisedItems.filter((k) => supervised[k] !== true);
const supervisedAllMet = supervisedItems.length > 0 && unmetSupervisedItems.length === 0;

// --- Approvals (signed flags only) ---
const sandboxApprovalSigned = marker.explicit_sandbox_execution_approval_signed === true;
const controlledLiveApprovalSigned = marker.explicit_controlled_live_approval_signed === true;

// --- Gate decision (fail-closed) ---
const approvedChannelConfigReady = configReadiness[approvedChannel] === true;
const sandboxExecutionReady =
  priorEvidence.build_181_local_evidence_present &&
  priorEvidence.build_182_mock_evidence_present &&
  sandboxApprovalSigned &&
  approvedChannelConfigReady &&
  supervisedAllMet;

const controlledLiveReady = sandboxExecutionReady && controlledLiveApprovalSigned;

const blockedReasons = [];
if (!priorEvidence.build_181_local_evidence_present) blockedReasons.push('build_181_local_evidence_missing');
if (!priorEvidence.build_182_mock_evidence_present) blockedReasons.push('build_182_mock_evidence_missing');
if (!sandboxApprovalSigned) blockedReasons.push('explicit_sandbox_execution_approval_not_signed');
if (!approvedChannelConfigReady) blockedReasons.push('approved_channel_sandbox_config_not_provisioned:' + approvedChannel);
for (const item of unmetSupervisedItems) blockedReasons.push('supervised_item_unmet:' + item);
if (!controlledLiveApprovalSigned) blockedReasons.push('explicit_controlled_live_approval_not_signed');

const resultDoc = {
  gate_name: GATE_NAME,
  data_classification: 'local_readiness_marker_names_only',
  mode: 'readiness_only',
  reads_marker: MARKER_PATH,
  reads_build_181_result: BUILD_181_RESULT_PATH,
  reads_build_182_result: BUILD_182_RESULT_PATH,
  inspects_config_names_only: true,
  reads_secret_values: false,
  performed_external_call: false,
  performed_sandbox_call: false,
  performed_live_action: false,
  invoked_actual_external_sandbox_runner_stub: false,
  approved_channel_for_first_test: approvedChannel,
  prior_evidence: priorEvidence,
  config_readiness_by_channel: configReadiness,
  missing_config_names_by_channel: missingConfigNamesByChannel,
  supervised_test_readiness: supervised,
  unmet_supervised_items: unmetSupervisedItems,
  explicit_sandbox_execution_approval_signed: sandboxApprovalSigned,
  explicit_controlled_live_approval_signed: controlledLiveApprovalSigned,
  sandbox_execution_ready: sandboxExecutionReady,
  controlled_live_ready: controlledLiveReady,
  blocked_reasons: blockedReasons,
  gate_decision: sandboxExecutionReady ? 'SANDBOX_EXECUTION_PERMITTED' : 'SANDBOX_EXECUTION_BLOCKED',
  safety_status: 'demo_ready_with_live_automation_disabled'
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log('GATE DECISION: ' + resultDoc.gate_decision);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
if (!sandboxExecutionReady) {
  console.error('BLOCKED: sandbox execution is not permitted. Missing config names and unmet readiness items listed above (names only; no secret values).');
}

// Fail-closed: nonzero exit while not ready.
process.exit(sandboxExecutionReady ? 0 : 3);
