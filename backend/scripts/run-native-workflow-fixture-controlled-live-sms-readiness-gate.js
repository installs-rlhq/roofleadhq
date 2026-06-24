#!/usr/bin/env node
/**
 * Native Workflow Fixture — Controlled Live SMS Readiness Gate, ONE MESSAGE ONLY (Build 185).
 *
 * READINESS / APPROVAL ONLY. FAIL-CLOSED. Node built-ins only (fs, path). No network, no external
 * URLs, no environment-variable access, no credentials, no secret VALUES, no production data, no
 * live activation, no SMS, no external Twilio call, no real contacts.
 *
 * This gate decides whether ONE future controlled LIVE SMS message (to Jason's own consenting test
 * identity) is permitted. It inspects local markers for required LIVE config NAMES (presence
 * booleans only — never values), confirms the prior verified chain (Builds 181/182/183/184), and
 * checks one-message live-readiness booleans. In Build 185 the explicit live approval is UNSIGNED
 * and live credentials are NOT provisioned, so the gate returns CONTROLLED_LIVE_SMS_BLOCKED and
 * exits nonzero. It performs no execution and sends nothing.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;
const BUILD_181_RESULT_PATH = `${FIXTURE_DIR}/actual-external-sandbox-30-scenario-local-validation-result.json`;
const BUILD_182_RESULT_PATH = `${FIXTURE_DIR}/channel-adapter-execution-engine-mock-result.json`;
const BUILD_183_GATE_PATH = `${FIXTURE_DIR}/sandbox-execution-readiness-gate-result.json`;
const BUILD_184_EVIDENCE_PATH = `${FIXTURE_DIR}/supervised-sandbox-sms-execution-evidence.json`;
const RESULT_PATH = `${FIXTURE_DIR}/controlled-live-sms-readiness-gate-result.json`;

const GATE_NAME = 'native_workflow_fixture_controlled_live_sms_one_message_readiness_gate';
const APPROVED_CHANNEL = 'sms';
// Required LIVE config NAMES (identifiers only — never values). Used solely to produce a
// fail-closed "missing config" descriptor; this gate never reads any value.
const REQUIRED_LIVE_SMS_CONFIG_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];

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
const build183 = readJson(BUILD_183_GATE_PATH);
const build184 = readJson(BUILD_184_EVIDENCE_PATH);

// --- Prior verified-chain preconditions (local evidence only) ---
const priorChain = {
  build_181_local_30_30_present: build181.data_classification === 'local_fake_data_only' &&
    build181.passed_count === 30 && build181.total_scenarios_count === 30,
  build_182_mock_30_30_present: build182.data_classification === 'local_fake_data_only' &&
    build182.passed_count === 30 && build182.executed_through_adapter_count === 30,
  build_183_sandbox_execution_permitted: build183.gate_decision === 'SANDBOX_EXECUTION_PERMITTED' &&
    build183.sandbox_execution_ready === true,
  build_184_sandbox_sms_simulated_not_sent: build184.sms_actually_sent === false &&
    build184.sms_simulated_by_twilio_test_credentials === true &&
    build184.executions_performed === 1
};
const priorChainComplete = Object.values(priorChain).every((v) => v === true);

// --- LIVE config presence (NAMES ONLY) in Jason-controlled store ---
const liveConfigMarkers = (marker.live_config_presence_markers && Array.isArray(marker.live_config_presence_markers.sms))
  ? marker.live_config_presence_markers.sms
  : [];
const provisionedLiveNames = new Set(
  liveConfigMarkers.filter((e) => e && e.provisioned_in_jason_controlled_store === true).map((e) => e.config_name)
);
const missingLiveConfigNames = REQUIRED_LIVE_SMS_CONFIG_NAMES.filter((name) => !provisionedLiveNames.has(name));
const liveConfigProvisioned = missingLiveConfigNames.length === 0;

// --- One-message live-readiness booleans ---
const readiness = marker.one_message_live_readiness || {};
const requiredReadinessKeys = [
  'recipient_is_jason_own_consenting_test_identity',
  'recipient_consent_on_file',
  'recipient_is_not_a_real_homeowner',
  'one_message_cap_set',
  'stop_rollback_owner_named',
  'stop_rollback_procedure_documented',
  'no_production_supabase_or_data_confirmed',
  'no_real_homeowner_contact_confirmed',
  'no_billing_payment_deposit_quote_estimate_invoice_automation_confirmed',
  'live_automation_disabled_except_future_one_message_sms_confirmed'
];
const unmetReadinessItems = requiredReadinessKeys.filter((k) => readiness[k] !== true);
const oneMessageCapValid = readiness.one_message_cap_set === true && readiness.one_message_cap_value === 1;
if (!oneMessageCapValid) unmetReadinessItems.push('one_message_cap_value_must_be_1');
const readinessAllMet = unmetReadinessItems.length === 0;

// --- Explicit approval (signed flag only) ---
const liveApprovalSigned = marker.explicit_controlled_live_sms_one_message_approval_signed === true;

// --- Gate decision (FAIL-CLOSED): every prerequisite must hold to permit one live message ---
const controlledLiveSmsReady =
  priorChainComplete &&
  liveApprovalSigned &&
  liveConfigProvisioned &&
  readinessAllMet &&
  marker.approved_channel_for_controlled_live_test === APPROVED_CHANNEL &&
  marker.channel_only_sms === true;

const blockedReasons = [];
if (!priorChain.build_181_local_30_30_present) blockedReasons.push('build_181_chain_evidence_missing');
if (!priorChain.build_182_mock_30_30_present) blockedReasons.push('build_182_chain_evidence_missing');
if (!priorChain.build_183_sandbox_execution_permitted) blockedReasons.push('build_183_chain_evidence_missing');
if (!priorChain.build_184_sandbox_sms_simulated_not_sent) blockedReasons.push('build_184_chain_evidence_missing');
if (!liveApprovalSigned) blockedReasons.push('explicit_controlled_live_sms_one_message_approval_not_signed');
if (!liveConfigProvisioned) blockedReasons.push('live_twilio_credentials_not_provisioned_in_jason_controlled_store:' + missingLiveConfigNames.join('+'));
for (const item of unmetReadinessItems) blockedReasons.push('one_message_readiness_unmet:' + item);

const resultDoc = {
  gate_name: GATE_NAME,
  build: 185,
  data_classification: 'local_readiness_marker_names_only',
  mode: 'readiness_and_approval_only',
  reads_marker: MARKER_PATH,
  reads_build_181_result: BUILD_181_RESULT_PATH,
  reads_build_182_result: BUILD_182_RESULT_PATH,
  reads_build_183_gate_result: BUILD_183_GATE_PATH,
  reads_build_184_evidence: BUILD_184_EVIDENCE_PATH,
  inspects_config_names_only: true,
  reads_secret_values: false,
  performed_external_call: false,
  performed_external_twilio_call: false,
  performed_live_action: false,
  sent_sms: false,
  invoked_actual_external_sandbox_runner_stub: false,
  approved_channel_for_controlled_live_test: marker.approved_channel_for_controlled_live_test,
  channel_only_sms: marker.channel_only_sms === true,
  scope_string: marker.scope_string,
  recipient_identity_label: marker.one_message_live_readiness ? marker.one_message_live_readiness.recipient_identity_label : null,

  prior_chain_evidence: priorChain,
  prior_chain_complete: priorChainComplete,

  live_config_readiness: {
    required_live_config_names: REQUIRED_LIVE_SMS_CONFIG_NAMES,
    missing_live_config_names: missingLiveConfigNames,
    live_credentials_provisioned_in_jason_controlled_store: liveConfigProvisioned,
    live_credentials_location_requirement: marker.live_credentials_location_requirement || null
  },

  one_message_live_readiness: readiness,
  unmet_one_message_readiness_items: unmetReadinessItems,
  one_message_cap_value: readiness.one_message_cap_value,

  explicit_controlled_live_sms_one_message_approval_signed: liveApprovalSigned,
  controlled_live_sms_ready: controlledLiveSmsReady,

  requires_before_any_real_sms: [
    'explicit_signed_one_message_controlled_live_sms_approval',
    'live_twilio_credentials_provisioned_only_in_jason_controlled_secret_store',
    'recipient_remains_jason_own_consenting_test_identity',
    'one_message_cap_of_1_enforced',
    'stop_rollback_owner_and_procedure_in_place',
    'no_production_supabase_or_data',
    'no_real_homeowner_contact',
    'no_billing_payment_deposit_quote_estimate_invoice_automation'
  ],

  blocked_reasons: blockedReasons,
  gate_decision: controlledLiveSmsReady ? 'CONTROLLED_LIVE_SMS_PERMITTED' : 'CONTROLLED_LIVE_SMS_BLOCKED',
  safety_status: 'demo_ready_with_live_automation_disabled'
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log('GATE DECISION: ' + resultDoc.gate_decision);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
if (!controlledLiveSmsReady) {
  console.error('BLOCKED (by design in Build 185): controlled live SMS is not permitted. Missing live config NAMES and unmet items listed above (names only; no secret values). No SMS sent; no external Twilio call made.');
}

// Fail-closed: nonzero exit while not permitted (expected in Build 185).
process.exit(controlledLiveSmsReady ? 0 : 3);
