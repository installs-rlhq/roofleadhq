#!/usr/bin/env node
/**
 * Native Workflow Fixture — Corrected Live-SMS Credential-Readiness Self-Check (Build 188).
 *
 * READINESS / SELF-CHECK ONLY. FAIL-CLOSED. Node built-ins only (fs, path). No network, no external
 * URLs, no environment-variable access, no credentials, no secret VALUES, no production data, no
 * live activation, no SMS, no external Twilio call, no real contacts.
 *
 * WHY THIS EXISTS: In Build 186 a single permitted controlled live SMS attempt was rejected by
 * Twilio at the authentication layer (HTTP 401 / code 20003). The pre-186 readiness checks treated
 * a credential NAME-present marker as sufficient. The Build 187 diagnosis showed it is not: a name
 * being present does not prove the underlying VALUE is valid, current, and matched to the account
 * and from-number. This corrected self-check therefore requires, in addition to NAME presence, an
 * explicit post-186 revalidation attestation (booleans only) that Jason independently revalidated
 * the credential VALUES in his controlled store. Until that attestation is true, the self-check
 * FAILS CLOSED. It inspects names/metadata/booleans only and never reads or prints a secret value.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const PROVISIONING_MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;
const REVALIDATION_MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-credential-revalidation-marker.json`;
const BUILD_186_EVIDENCE_PATH = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const BUILD_187_DIAGNOSIS_PATH = `${FIXTURE_DIR}/controlled-live-sms-failed-attempt-build-187-diagnosis.json`;
const RESULT_PATH = `${FIXTURE_DIR}/controlled-live-sms-credential-readiness-self-check-result.json`;

const CHECK_NAME = 'native_workflow_fixture_controlled_live_sms_credential_readiness_self_check';
const REQUIRED_LIVE_SMS_CONFIG_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];

function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail('missing file: ' + rel);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

const provisioning = readJson(PROVISIONING_MARKER_PATH);
const revalidation = readJson(REVALIDATION_MARKER_PATH);
const evidence = readJson(BUILD_186_EVIDENCE_PATH);
const diagnosis = readJson(BUILD_187_DIAGNOSIS_PATH);

// --- Credential NAME presence (identifiers/booleans only — never any value) ---
const namePresence = revalidation.live_config_name_presence_only || {};
const missingNamePresence = REQUIRED_LIVE_SMS_CONFIG_NAMES.filter((name) => namePresence[name] !== true);
const allNamesPresent = missingNamePresence.length === 0;

// --- Post-186 revalidation attestation (booleans only) ---
const reval = revalidation.post_build_186_revalidation_state || {};
const requiredRevalidationKeys = [
  'credentials_independently_revalidated_after_build_186_authentication_failure',
  'account_sid_auth_token_and_from_number_confirmed_same_active_account',
  'from_number_confirmed_sms_capable_and_authorized_for_destination',
  'revalidation_performed_by_jason_in_controlled_store_never_in_repo'
];
const unmetRevalidationItems = requiredRevalidationKeys.filter((k) => reval[k] !== true);
const revalidationComplete = unmetRevalidationItems.length === 0;

// --- The prior failure is real and must force revalidation before any pass ---
const priorAuthFailureObserved =
  (evidence.send_error_metadata && evidence.send_error_metadata.code === 20003 && evidence.send_error_metadata.status === 401) &&
  diagnosis.root_cause_class === 'twilio_authentication_rejection_at_transport_layer';

// --- Names-only / no-secret-values attestations on the markers themselves ---
const markersAreNamesOnly =
  provisioning.values_recorded === false && provisioning.names_only === true &&
  revalidation.values_recorded === false && revalidation.names_only === true &&
  revalidation.records_secret_values === false;

const blockedReasons = [];
for (const name of missingNamePresence) blockedReasons.push('live_config_name_not_present:' + name);
for (const item of unmetRevalidationItems) blockedReasons.push('credential_revalidation_unmet:' + item);
if (!priorAuthFailureObserved) blockedReasons.push('build_186_authentication_failure_reference_missing');
if (!markersAreNamesOnly) blockedReasons.push('markers_must_be_names_only_no_recorded_values');

// FAIL-CLOSED: the self-check passes only when names are present AND values were independently
// revalidated after the Build 186 authentication failure, with no secret values recorded anywhere.
const credentialSelfCheckPassed =
  allNamesPresent && revalidationComplete && priorAuthFailureObserved && markersAreNamesOnly;

const resultDoc = {
  check_name: CHECK_NAME,
  build: 188,
  data_classification: 'local_readiness_self_check_names_and_booleans_only',
  mode: 'credential_readiness_self_check_only',
  reads_provisioning_marker: PROVISIONING_MARKER_PATH,
  reads_revalidation_marker: REVALIDATION_MARKER_PATH,
  reads_build_186_evidence: BUILD_186_EVIDENCE_PATH,
  reads_build_187_diagnosis: BUILD_187_DIAGNOSIS_PATH,
  inspects_config_names_and_booleans_only: true,
  reads_secret_values: false,
  prints_secret_values: false,
  performed_external_call: false,
  performed_external_twilio_call: false,
  performed_live_action: false,
  sent_sms: false,

  required_live_config_names: REQUIRED_LIVE_SMS_CONFIG_NAMES,
  live_config_name_presence_only: namePresence,
  missing_live_config_name_presence: missingNamePresence,
  all_live_config_names_present: allNamesPresent,
  name_presence_is_not_validity: true,

  prior_build_186_authentication_failure: {
    observed: priorAuthFailureObserved,
    error_code_names_only: { name: 'Error', code: 20003, status: 401 },
    root_cause_class: diagnosis.root_cause_class
  },

  post_build_186_revalidation_state: reval,
  unmet_credential_revalidation_items: unmetRevalidationItems,
  credential_revalidation_complete: revalidationComplete,

  markers_are_names_only_no_recorded_values: markersAreNamesOnly,

  requires_before_self_check_can_pass: [
    'all_required_live_config_names_present',
    'live_credential_values_independently_revalidated_by_jason_in_controlled_store_never_in_repo_after_build_186_failure',
    'account_sid_auth_token_and_from_number_confirmed_same_active_account',
    'from_number_confirmed_sms_capable_and_authorized_for_destination',
    'no_secret_values_recorded_anywhere'
  ],

  blocked_reasons: blockedReasons,
  credential_self_check_passed: credentialSelfCheckPassed,
  self_check_decision: credentialSelfCheckPassed ? 'CREDENTIAL_READINESS_SELF_CHECK_PASSED' : 'CREDENTIAL_READINESS_SELF_CHECK_BLOCKED',
  safety_status: 'demo_ready_with_live_automation_disabled'
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log('SELF-CHECK DECISION: ' + resultDoc.self_check_decision);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
if (!credentialSelfCheckPassed) {
  console.error('BLOCKED (by design in Build 188): credential readiness self-check did not pass. ' +
    'Live credential VALUES have not been independently revalidated by Jason after the Build 186 ' +
    'authentication failure (401 / 20003). Names/booleans only; no secret values read or printed. ' +
    'No SMS sent; no external Twilio call made.');
}

// Fail-closed: nonzero exit while not passed (expected in Build 188).
process.exit(credentialSelfCheckPassed ? 0 : 3);
