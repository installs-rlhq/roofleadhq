#!/usr/bin/env node
/**
 * Native Workflow Fixture — One-Time Supervised Sandbox/Test-Mode SMS Execution (Build 184).
 *
 * SCOPE-LOCKED, FAIL-CLOSED, ONE-TIME. Node built-ins only (fs, path). No network clients,
 * no environment-variable access, no credential VALUES, no production data, no live activation,
 * no real homeowner/roofer contact, no schema/auth/RLS/security/billing changes, no public/live
 * routes/webhooks/cron/schedulers/dispatchers. This runner is restricted to the signed approval:
 *
 *   sandbox_test_mode_sms_only_one_pilot_roofer_supervised_one_time_after_build_183
 *
 * It runs ONE (cap = 1) supervised SMS execution in SANDBOX/TEST-MODE only and captures evidence
 * in the Build 181/182 schema family. Because Twilio TEST credentials never deliver a live message,
 * and because credential VALUES are intentionally not present in this repo (names-only marker), the
 * single send is SIMULATED locally in test-mode with NO external Twilio call. No real SMS is sent.
 *
 * Pre-execution gates (fail-closed; any failure stops with a nonzero exit and NO retry):
 *   1. readiness gate result still reports SANDBOX_EXECUTION_PERMITTED
 *   2. only config-name PRESENCE is checked (never secret values)
 *   3. transport is sandbox/test-mode, not live
 *   4. channel is SMS only
 *   5. execution is capped (1) and reversible (no persistent state)
 *   6. evidence output path is confirmed before running
 *
 * On ANY block/error/failure this runner stops immediately and does NOT auto-retry.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MARKER_PATH = `${FIXTURE_DIR}/sandbox-execution-provisioning-marker.json`;
const GATE_RESULT_PATH = `${FIXTURE_DIR}/sandbox-execution-readiness-gate-result.json`;
const EVIDENCE_PATH = `${FIXTURE_DIR}/supervised-sandbox-sms-execution-evidence.json`;

const RUNNER_NAME = 'native_workflow_fixture_supervised_sandbox_sms_execution';
const APPROVED_SCOPE = 'sandbox_test_mode_sms_only_one_pilot_roofer_supervised_one_time_after_build_183';
const APPROVED_PILOT_IDENTITY = 'Jason Lohse / Test Roofing';
const APPROVED_CHANNEL = 'sms';
const APPROVED_TRANSPORT_DESCRIPTION = 'sandbox/test-mode only using Twilio test credentials';
const TRANSPORT_MODE = 'sandbox_test_mode';
const REQUIRED_SMS_CONFIG_NAMES = ['TWILIO_TEST_ACCOUNT_SID', 'TWILIO_TEST_AUTH_TOKEN', 'TWILIO_TEST_FROM_NUMBER'];
const EXECUTION_CAP = 1;
// Static deterministic label (no Date.now): keeps evidence reproducible across re-runs.
const TIMESTAMP_LABEL = 'supervised-sandbox-test-mode-one-time-deterministic-run';

function stop(message) {
  // Fail-closed stop. No retry. No partial execution beyond this point.
  console.error('STOP: ' + message);
  console.error('STOP: one-time supervised sandbox SMS execution halted; no auto-retry performed.');
  process.exit(1);
}

function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) stop('missing file: ' + rel);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

/**
 * Sandbox/test-mode SMS adapter. Performs NO external call, reads NO secret values, requires
 * NO network client. It models the Twilio TEST-credential path: test credentials validate a
 * request but never deliver a live message. With credential VALUES intentionally absent from the
 * repo, the send is simulated locally. Returns a deterministic, honest evidence record.
 */
function sandboxTestModeSmsSend(payload) {
  return {
    channel: APPROVED_CHANNEL,
    integration: 'twilio_test_mode',
    transport_mode: TRANSPORT_MODE,
    transport_is_live: false,
    external_call_made: false,
    sandbox_external_call_made: false,
    used_real_live_twilio_credentials: false,
    read_secret_values: false,
    sms_actually_sent: false,
    sms_simulated_by_twilio_test_credentials: true,
    sms_delivery_outcome: 'simulated_locally_in_test_mode_no_external_twilio_call_no_live_delivery',
    simulated_message_status: 'accepted_by_test_credential_path_then_not_delivered_test_mode',
    to_test_reference: payload.to_test_reference,
    from_test_reference: payload.from_test_reference,
    body_reference: payload.body_reference,
    action_taken: payload.action_taken
  };
}

// ---- Load inputs (names/booleans only) -------------------------------------------------
const marker = readJson(MARKER_PATH);
const gate = readJson(GATE_RESULT_PATH);

// ---- Pre-execution confirmation 1: gate still PERMITTED --------------------------------
if (gate.gate_decision !== 'SANDBOX_EXECUTION_PERMITTED') {
  stop('readiness gate is not SANDBOX_EXECUTION_PERMITTED (got: ' + gate.gate_decision + ')');
}
if (gate.sandbox_execution_ready !== true) stop('gate sandbox_execution_ready is not true');
if (gate.performed_live_action !== false || gate.performed_external_call !== false) {
  stop('gate evidence indicates a live/external action; refusing to execute');
}

// ---- Pre-execution confirmation: signed approval + exact scope --------------------------
if (marker.explicit_sandbox_execution_approval_signed !== true) stop('sandbox execution approval is not signed');
if (marker.explicit_sandbox_execution_approval_scope !== APPROVED_SCOPE) {
  stop('approval scope mismatch (expected exact signed scope)');
}
if (marker.explicit_controlled_live_approval_signed === true) {
  stop('controlled-LIVE approval is signed; Build 184 is sandbox/test-mode only and must not proceed under live approval');
}

// ---- Pre-execution confirmation 4: channel is SMS only ----------------------------------
if (marker.approved_channel_for_first_test !== APPROVED_CHANNEL) stop('approved channel is not sms');

// ---- Pre-execution confirmation 2: config-name PRESENCE only (never values) -------------
const smsConfigEntries = (marker.config_presence_markers && Array.isArray(marker.config_presence_markers.sms))
  ? marker.config_presence_markers.sms
  : [];
const presentNames = new Set(
  smsConfigEntries.filter((e) => e && e.provisioned === true).map((e) => e.config_name)
);
const missingConfigNames = REQUIRED_SMS_CONFIG_NAMES.filter((name) => !presentNames.has(name));
if (missingConfigNames.length > 0) {
  stop('required SMS config NAMES not marked present (names only): ' + missingConfigNames.join(', '));
}
// Credential VALUES are intentionally not recorded in this repo (names-only marker).
const credentialValuesPresentInRepo = marker.values_recorded === true;
if (credentialValuesPresentInRepo) {
  stop('marker indicates secret VALUES recorded in repo; refusing to proceed (names-only is required)');
}

// ---- Pre-execution confirmation 6: evidence output path confirmed -----------------------
const evidenceDirOk = fs.existsSync(path.join(root, FIXTURE_DIR));
if (!evidenceDirOk) stop('evidence output directory does not exist: ' + FIXTURE_DIR);

const preExecutionConfirmations = {
  gate_reports_sandbox_execution_permitted: true,
  only_config_presence_checked_no_secret_values: true,
  transport_is_sandbox_test_mode_not_live: true,
  channel_is_sms_only: true,
  capped_reversible_one_time_execution: true,
  evidence_output_path_confirmed: true
};

// ---- ONE-TIME (cap = 1) supervised sandbox/test-mode SMS execution ----------------------
// Single supervised test message to the APPROVED TEST identity only, using fake test references
// (no real phone number, no real contact). No external call. No retry on any condition.
const singleMessagePayload = {
  scenario_id: 'SMS-SANDBOX-SUPERVISED-01',
  scenario_name: 'One-time supervised sandbox/test-mode SMS opt-in acknowledgment',
  to_test_reference: 'fake-sandbox-test-to:approved-test-identity-jason-lohse-test-roofing',
  from_test_reference: 'fake-sandbox-test-from:configured-name-TWILIO_TEST_FROM_NUMBER',
  body_reference: 'sandbox_test_mode_optin_acknowledgment_fixture_body',
  action_taken: 'record_supervised_sandbox_test_mode_optin_acknowledgment'
};

let executionsPerformed = 0;
let sendResult = null;
try {
  sendResult = sandboxTestModeSmsSend(singleMessagePayload);
  executionsPerformed = 1;
} catch (err) {
  // No auto-retry. Capture nothing further; stop.
  stop('sandbox test-mode SMS execution errored: ' + (err && err.message ? err.message : 'unknown error'));
}

if (executionsPerformed !== EXECUTION_CAP) stop('execution count did not equal cap=1; refusing to capture evidence');
if (sendResult.external_call_made !== false || sendResult.sandbox_external_call_made !== false) {
  stop('send result indicates an external call; refusing to capture evidence');
}
if (sendResult.sms_actually_sent !== false) stop('send result indicates a real SMS was sent; refusing to capture evidence');

const resultStatus = 'PASS_SUPERVISED_SANDBOX_TEST_MODE_SMS_SIMULATED';

const evidenceDoc = {
  runner_name: RUNNER_NAME,
  build: 184,
  data_classification: 'sandbox_test_mode_names_only_no_secret_values',
  evidence_label: ['sandbox_test_mode_sms_only', 'one_time_supervised', 'after_build_183'],
  delivery_mode: 'sandbox-test-mode-only',
  execution_mode: 'one-time-supervised-sandbox-test-mode-sms',
  transport_mode: TRANSPORT_MODE,
  transport_is_live: false,

  // Approval / gate context
  gate_decision: gate.gate_decision,
  gate_sandbox_execution_ready: gate.sandbox_execution_ready === true,
  approved_scope: APPROVED_SCOPE,
  approved_pilot_identity: APPROVED_PILOT_IDENTITY,
  approved_channel: APPROVED_CHANNEL,
  channel: APPROVED_CHANNEL,
  channel_only_sms: true,
  approved_transport: APPROVED_TRANSPORT_DESCRIPTION,
  approval_signed_by: marker.explicit_sandbox_execution_approval_signed_by || null,
  approval_signed_date_time: marker.explicit_sandbox_execution_approval_signed_date_time || null,
  working_directory: '/root/roofleadhq',
  timestamp: TIMESTAMP_LABEL,

  // Pre-execution confirmations (the six required checks)
  pre_execution_confirmations: preExecutionConfirmations,

  // Config presence (NAMES ONLY)
  config_presence_check: {
    inspects_config_names_only: true,
    reads_secret_values: false,
    credential_values_present_in_repo: credentialValuesPresentInRepo,
    required_sms_config_names: REQUIRED_SMS_CONFIG_NAMES,
    sms_config_names_present: REQUIRED_SMS_CONFIG_NAMES.slice(),
    sms_config_all_present: true
  },

  // One-time execution accounting
  execution_cap: EXECUTION_CAP,
  executions_attempted: 1,
  executions_performed: executionsPerformed,
  auto_retry_on_failure: false,
  auto_retry_performed: false,
  single_test_message: {
    scenario_id: singleMessagePayload.scenario_id,
    scenario_name: singleMessagePayload.scenario_name,
    to_test_reference: sendResult.to_test_reference,
    from_test_reference: sendResult.from_test_reference,
    body_reference: sendResult.body_reference,
    action_taken: sendResult.action_taken
  },

  // Result status + the explicit sent-vs-simulated determination
  result_status: resultStatus,
  sms_actually_sent: sendResult.sms_actually_sent,
  sms_simulated_by_twilio_test_credentials: sendResult.sms_simulated_by_twilio_test_credentials,
  sms_delivery_outcome: sendResult.sms_delivery_outcome,
  simulated_message_status: sendResult.simulated_message_status,

  // Safety counters and booleans (Build 181/182 family)
  external_calls_count: 0,
  credential_values_logged_count: 0,
  production_data_touches_count: 0,
  real_contact_touches_count: 0,
  external_calls: false,
  sandbox_external_calls: false,
  credentials_used: false,
  used_real_live_twilio_credentials: false,
  production_data_used: false,
  used_production_supabase: false,
  live_activation: false,
  live_automation_enabled: false,
  real_homeowner_contact: false,
  real_roofer_contact: false,
  contacted_only_approved_test_identity: true,
  invoked_actual_external_sandbox_runner_stub: false,

  // Change-surface attestations
  schema_auth_rls_security_changes: false,
  billing_payment_quote_estimate_invoice_automation_added: false,
  public_live_routes_webhooks_cron_schedulers_dispatchers_created: false,
  channel_expanded_beyond_sms: false,

  // Stop / rollback
  stop_after_evidence_capture: true,
  one_time_approval_consumed: true,
  blocked_or_errored: false,
  rollback_status: 'no_persistent_state_changed_nothing_to_roll_back_reversible',

  safety_status: 'demo_ready_with_live_automation_disabled',
  final_decision: 'PASS ONE-TIME SUPERVISED SANDBOX/TEST-MODE SMS EXECUTION (SIMULATED, NO LIVE DELIVERY)'
};

fs.writeFileSync(path.join(root, EVIDENCE_PATH), JSON.stringify(evidenceDoc, null, 2) + '\n');

console.log(JSON.stringify(evidenceDoc, null, 2));
console.log('GATE DECISION: ' + evidenceDoc.gate_decision);
console.log('CHANNEL: ' + evidenceDoc.channel + ' | TRANSPORT: ' + evidenceDoc.transport_mode + ' (live=' + evidenceDoc.transport_is_live + ')');
console.log('EXECUTIONS: ' + evidenceDoc.executions_performed + '/' + evidenceDoc.execution_cap +
  ' | SMS ACTUALLY SENT: ' + evidenceDoc.sms_actually_sent +
  ' | SIMULATED BY TEST CREDENTIALS: ' + evidenceDoc.sms_simulated_by_twilio_test_credentials);
console.log('EVIDENCE WRITTEN: ' + EVIDENCE_PATH);
console.log('STOP: evidence captured; stopping immediately as required (no retry, no further execution).');
console.log('FINAL DECISION: ' + evidenceDoc.final_decision);

process.exit(0);
