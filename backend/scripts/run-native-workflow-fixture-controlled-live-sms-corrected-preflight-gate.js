#!/usr/bin/env node
/**
 * Native Workflow Fixture — Corrected One-Message Live SMS Pre-Flight Gate (Build 188).
 *
 * READINESS / APPROVAL ONLY. FAIL-CLOSED. Node built-ins only (fs, path). No network, no external
 * URLs, no environment-variable access, no credentials, no secret VALUES, no production data, no
 * live activation, no SMS, no external Twilio call, no real contacts.
 *
 * This is the CORRECTED pre-flight gate that supersedes the pre-186 readiness gate. After the Build
 * 186 authentication failure (HTTP 401 / code 20003), permitting another single live SMS requires
 * MORE than a name-present marker. This gate returns CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED
 * unless EVERY one of these holds:
 *   1. the corrected credential-readiness self-check passes (names present AND values revalidated),
 *   2. a FRESH explicit one-message approval is SIGNED (the Build 188 template, not a carried-over one),
 *   3. the one-message cap is confirmed at exactly 1,
 *   4. the recipient is Jason's own consenting test identity (by marker only),
 *   5. the retry count is zero (this is a single fresh send, not a retry-loop),
 *   6. all other live automation remains disabled.
 * In Build 188 the self-check is BLOCKED and the fresh approval is UNSIGNED, so this gate is BLOCKED
 * and exits nonzero. It performs no execution and sends nothing.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const SELF_CHECK_RESULT_PATH = `${FIXTURE_DIR}/controlled-live-sms-credential-readiness-self-check-result.json`;
const FRESH_APPROVAL_TEMPLATE_PATH = `${FIXTURE_DIR}/controlled-live-sms-corrected-one-message-retry-approval-build-188-template.json`;
const PROVISIONING_MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;
const REVALIDATION_MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-credential-revalidation-marker.json`;
const RESULT_PATH = `${FIXTURE_DIR}/controlled-live-sms-corrected-preflight-gate-result.json`;

const GATE_NAME = 'native_workflow_fixture_controlled_live_sms_corrected_one_message_preflight_gate';
const APPROVED_CHANNEL = 'sms';

function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail('missing file: ' + rel);
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}
// Soft read: a MISSING self-check result must FAIL CLOSED (treated as not-passed), never crash.
function readJsonSoft(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return null;
  try { return JSON.parse(fs.readFileSync(full, 'utf8')); } catch { return null; }
}

const selfCheck = readJsonSoft(SELF_CHECK_RESULT_PATH);
const approval = readJson(FRESH_APPROVAL_TEMPLATE_PATH);
const provisioning = readJson(PROVISIONING_MARKER_PATH);
const revalidation = readJson(REVALIDATION_MARKER_PATH);

// --- 1. Corrected credential-readiness self-check passes ---
const selfCheckPresent = selfCheck !== null;
const credentialSelfCheckPassed =
  selfCheckPresent &&
  selfCheck.credential_self_check_passed === true &&
  selfCheck.self_check_decision === 'CREDENTIAL_READINESS_SELF_CHECK_PASSED' &&
  selfCheck.reads_secret_values === false;

// --- 2. Fresh explicit one-message approval is SIGNED (Build 188 template; no carry-over) ---
const freshApprovalSigned =
  approval.approval_signed === true &&
  approval.approval_granted === true &&
  typeof approval.approval_signed_by === 'string' && approval.approval_signed_by.length > 0;
const approvalDoesNotCarryOver =
  approval.supersedes &&
  approval.supersedes.build_184_one_message_approval &&
  approval.supersedes.build_184_one_message_approval.carries_over === false &&
  approval.supersedes.build_187_corrected_retry_approval_template &&
  approval.supersedes.build_187_corrected_retry_approval_template.carries_over === false;

// --- 3. One-message cap confirmed at exactly 1 ---
const readiness = provisioning.one_message_live_readiness || {};
const oneMessageCapConfirmed = readiness.one_message_cap_set === true && readiness.one_message_cap_value === 1;

// --- 4. Recipient is Jason's own consenting test identity (by marker only) ---
const recipientIsJasonConsentingTestIdentity =
  readiness.recipient_is_jason_own_consenting_test_identity === true &&
  readiness.recipient_consent_on_file === true &&
  readiness.recipient_is_not_a_real_homeowner === true;

// --- 5. Retry count is zero (single fresh send, never a retry-loop) ---
const proposedRetryCount = typeof approval.proposed_retry_count === 'number' ? approval.proposed_retry_count : null;
const retryCountIsZero = proposedRetryCount === 0;

// --- 6. All other live automation remains disabled ---
const liveAutomationOtherwiseDisabled =
  readiness.live_automation_disabled_except_future_one_message_sms_confirmed === true &&
  readiness.no_production_supabase_or_data_confirmed === true &&
  readiness.no_real_homeowner_contact_confirmed === true &&
  readiness.no_billing_payment_deposit_quote_estimate_invoice_automation_confirmed === true &&
  provisioning.channel_only_sms === true &&
  provisioning.approved_channel_for_controlled_live_test === APPROVED_CHANNEL;

// --- Names-only attestations (no secret values anywhere these markers touch) ---
const markersAreNamesOnly =
  provisioning.values_recorded === false && provisioning.names_only === true &&
  revalidation.values_recorded === false && revalidation.names_only === true;

const blockedReasons = [];
if (!selfCheckPresent) blockedReasons.push('credential_readiness_self_check_result_missing_fail_closed');
if (selfCheckPresent && !credentialSelfCheckPassed) blockedReasons.push('credential_readiness_self_check_not_passed');
if (!freshApprovalSigned) blockedReasons.push('fresh_one_message_approval_not_signed');
if (!approvalDoesNotCarryOver) blockedReasons.push('fresh_approval_must_not_carry_over_consumed_or_prior_template');
if (!oneMessageCapConfirmed) blockedReasons.push('one_message_cap_not_confirmed_at_exactly_1');
if (!recipientIsJasonConsentingTestIdentity) blockedReasons.push('recipient_is_not_jason_own_consenting_test_identity_by_marker');
if (!retryCountIsZero) blockedReasons.push('retry_count_must_be_zero');
if (!liveAutomationOtherwiseDisabled) blockedReasons.push('other_live_automation_must_remain_disabled');
if (!markersAreNamesOnly) blockedReasons.push('markers_must_be_names_only_no_recorded_values');

// FAIL-CLOSED: every prerequisite must hold to permit the one corrected live message.
const correctedPreflightPermitted =
  credentialSelfCheckPassed &&
  freshApprovalSigned &&
  approvalDoesNotCarryOver &&
  oneMessageCapConfirmed &&
  recipientIsJasonConsentingTestIdentity &&
  retryCountIsZero &&
  liveAutomationOtherwiseDisabled &&
  markersAreNamesOnly;

const resultDoc = {
  gate_name: GATE_NAME,
  build: 188,
  data_classification: 'local_readiness_marker_names_and_booleans_only',
  mode: 'readiness_and_approval_only',
  supersedes_pre_186_readiness_gate: true,
  reads_self_check_result: SELF_CHECK_RESULT_PATH,
  reads_fresh_approval_template: FRESH_APPROVAL_TEMPLATE_PATH,
  reads_provisioning_marker: PROVISIONING_MARKER_PATH,
  reads_revalidation_marker: REVALIDATION_MARKER_PATH,
  inspects_config_names_and_booleans_only: true,
  reads_secret_values: false,
  prints_secret_values: false,
  performed_external_call: false,
  performed_external_twilio_call: false,
  performed_live_action: false,
  sent_sms: false,
  invoked_actual_external_sandbox_runner_stub: false,
  approved_channel_for_controlled_live_test: provisioning.approved_channel_for_controlled_live_test,
  channel_only_sms: provisioning.channel_only_sms === true,
  recipient_identity_label: readiness.recipient_identity_label || null,

  preconditions: {
    credential_self_check_passed: credentialSelfCheckPassed,
    fresh_one_message_approval_signed: freshApprovalSigned,
    fresh_approval_does_not_carry_over: approvalDoesNotCarryOver,
    one_message_cap_confirmed_value_1: oneMessageCapConfirmed,
    recipient_is_jason_own_consenting_test_identity_by_marker: recipientIsJasonConsentingTestIdentity,
    retry_count_is_zero: retryCountIsZero,
    other_live_automation_remains_disabled: liveAutomationOtherwiseDisabled,
    markers_are_names_only: markersAreNamesOnly
  },
  proposed_retry_count: proposedRetryCount,
  one_message_cap_value: readiness.one_message_cap_value,

  requires_before_any_corrected_live_sms: [
    'corrected_credential_readiness_self_check_passes_after_build_186_failure',
    'fresh_explicit_signed_one_message_controlled_live_sms_approval_build_188_template',
    'live_twilio_credential_values_independently_revalidated_only_in_jason_controlled_secret_store',
    'one_message_cap_of_exactly_1_enforced',
    'recipient_remains_jason_own_consenting_test_identity',
    'retry_count_zero_no_retry_loop',
    'all_other_live_automation_remains_disabled'
  ],

  blocked_reasons: blockedReasons,
  gate_decision: correctedPreflightPermitted ? 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED' : 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED',
  safety_status: 'demo_ready_with_live_automation_disabled'
};

fs.writeFileSync(path.join(root, RESULT_PATH), JSON.stringify(resultDoc, null, 2) + '\n');

console.log(JSON.stringify(resultDoc, null, 2));
console.log('GATE DECISION: ' + resultDoc.gate_decision);
console.log('RESULT WRITTEN: ' + RESULT_PATH);
if (!correctedPreflightPermitted) {
  console.error('BLOCKED (by design in Build 188): corrected one-message live SMS pre-flight is not permitted. ' +
    'Credential self-check has not passed and/or the fresh one-message approval is unsigned. ' +
    'Names/booleans only; no secret values. No SMS sent; no external Twilio call; no retry.');
}

// Fail-closed: nonzero exit while not permitted (expected in Build 188).
process.exit(correctedPreflightPermitted ? 0 : 3);
