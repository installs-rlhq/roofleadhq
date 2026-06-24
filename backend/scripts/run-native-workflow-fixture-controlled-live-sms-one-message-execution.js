#!/usr/bin/env node
/**
 * Native Workflow Fixture — One-Message Controlled LIVE SMS Execution (Build 186).
 *
 * SCOPE-LOCKED, FAIL-CLOSED, ONE-MESSAGE-ONLY, NO AUTO-RETRY. This is the FIRST runner in the
 * 181..186 chain permitted to make a real external Twilio call, and ONLY for exactly ONE (1) live
 * SMS message to Jason's own consenting test identity, strictly within the signed approval scope:
 *
 *   controlled_live_sms_one_message_only_to_jason_own_consenting_test_identity_after_build_184
 *
 * Hard rules enforced here (any violation => fail-closed STOP, nonzero exit, NO send, NO retry):
 *   - The readiness gate result must report CONTROLLED_LIVE_SMS_PERMITTED (re-run it first).
 *   - One-message cap == 1; SMS channel only; recipient == approved test identity label.
 *   - No production Supabase/data; no real homeowner contact; no billing/quote/estimate/invoice.
 *   - Secret VALUES are never read into evidence, never printed, never logged, never committed.
 *   - The LIVE Twilio credentials are read ONLY from Jason's controlled environment (never repo).
 *   - The recipient destination number is read ONLY from Jason's controlled environment via
 *     CONTROLLED_LIVE_SMS_TO_NUMBER (never repo, never a fixture, never a fictional 555 number).
 *   - The Twilio client is constructed ONLY after every pre-flight gate passes. If any gate fails
 *     (including a missing recipient number), the process exits BEFORE any network client exists.
 *   - Exactly ONE messages.create call. No loop. No retry on failure/ambiguity/error.
 *
 * Required environment (NAMES only; values never read into evidence or logs):
 *   TWILIO_LIVE_ACCOUNT_SID, TWILIO_LIVE_AUTH_TOKEN, TWILIO_LIVE_FROM_NUMBER,
 *   CONTROLLED_LIVE_SMS_TO_NUMBER  (the approved consenting test-identity destination, E.164)
 *
 * Usage: a deliberate human-confirmation token is required to arm the live send, so this runner
 * cannot fire from an incidental invocation:
 *   CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS node <this script>
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const MARKER_PATH = `${FIXTURE_DIR}/controlled-live-sms-provisioning-marker.json`;
const GATE_RESULT_PATH = `${FIXTURE_DIR}/controlled-live-sms-readiness-gate-result.json`;
const EVIDENCE_PATH = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;

const RUNNER_NAME = 'native_workflow_fixture_controlled_live_sms_one_message_execution';
const APPROVED_SCOPE = 'controlled_live_sms_one_message_only_to_jason_own_consenting_test_identity_after_build_184';
const APPROVED_RECIPIENT_LABEL = 'Jason Lohse / Test Roofing (own consenting test identity)';
const APPROVED_CHANNEL = 'sms';
const TRANSPORT_MODE = 'controlled_live_twilio_sms';
const EXECUTION_CAP = 1;
const CONFIRM_TOKEN = 'SEND_ONE_LIVE_SMS';
const TIMESTAMP_LABEL = 'controlled-live-sms-one-message-execution';

const REQUIRED_LIVE_CRED_ENV_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];
const RECIPIENT_ENV_NAME = 'CONTROLLED_LIVE_SMS_TO_NUMBER';

const blockedReasons = [];
function block(reason) { blockedReasons.push(reason); }

function readJson(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) { block('missing_required_file:' + rel); return null; }
  try { return JSON.parse(fs.readFileSync(full, 'utf8')); }
  catch (e) { block('unreadable_json:' + rel); return null; }
}

// Presence-only env check (never records or prints the value).
function envPresent(name) {
  const v = process.env[name];
  return typeof v === 'string' && v.trim().length > 0;
}

// ---------------------------------------------------------------------------------------------
// PRE-FLIGHT GATES (fail-closed; collect ALL blocked reasons; never send if any fail)
// ---------------------------------------------------------------------------------------------
const marker = readJson(MARKER_PATH);
const gate = readJson(GATE_RESULT_PATH);

// 2/3 gate decision + one-message cap
if (!gate || gate.gate_decision !== 'CONTROLLED_LIVE_SMS_PERMITTED') {
  block('gate_not_permitted:' + (gate ? gate.gate_decision : 'no_gate_result'));
}
if (gate && gate.controlled_live_sms_ready !== true) block('gate_controlled_live_sms_ready_not_true');
if (gate && gate.one_message_cap_value !== 1) block('gate_one_message_cap_value_not_1');

// 4 channel sms only
if (!marker || marker.approved_channel_for_controlled_live_test !== APPROVED_CHANNEL) block('approved_channel_not_sms');
if (!marker || marker.channel_only_sms !== true) block('channel_only_sms_not_true');

// signed approval + exact scope
if (!marker || marker.explicit_controlled_live_sms_one_message_approval_signed !== true) block('approval_not_signed');
if (!marker || marker.explicit_controlled_live_sms_one_message_approval_scope !== APPROVED_SCOPE) block('approval_scope_mismatch');

// 5 recipient identity == approved test identity
const readiness = (marker && marker.one_message_live_readiness) || {};
if (readiness.recipient_is_jason_own_consenting_test_identity !== true) block('recipient_not_jason_consenting_test_identity');
if (readiness.recipient_consent_on_file !== true) block('recipient_consent_not_on_file');
if (readiness.recipient_is_not_a_real_homeowner !== true) block('recipient_is_a_real_homeowner');

// 3/6/7/8 one-message cap + safety attestations
if (readiness.one_message_cap_set !== true || readiness.one_message_cap_value !== 1) block('one_message_cap_not_1');
if (readiness.no_production_supabase_or_data_confirmed !== true) block('production_supabase_or_data_not_excluded');
if (readiness.no_real_homeowner_contact_confirmed !== true) block('real_homeowner_contact_not_excluded');
if (readiness.no_billing_payment_deposit_quote_estimate_invoice_automation_confirmed !== true) block('billing_quote_estimate_invoice_automation_not_excluded');
if (readiness.stop_rollback_owner_named !== true || readiness.stop_rollback_procedure_documented !== true) block('stop_rollback_not_in_place');

// marker must remain names-only (no secret values in repo)
if (marker && marker.values_recorded === true) block('secret_values_recorded_in_repo');

// LIVE credentials present in controlled environment (NAMES only; values never read)
const credPresence = {};
for (const name of REQUIRED_LIVE_CRED_ENV_NAMES) {
  const present = envPresent(name);
  credPresence[name] = present;
  if (!present) block('live_credential_not_present_in_controlled_env:' + name);
}

// Approved recipient destination number present in controlled environment (NAMES only)
const recipientPresent = envPresent(RECIPIENT_ENV_NAME);
if (!recipientPresent) block('approved_recipient_destination_number_not_provisioned_in_controlled_env:' + RECIPIENT_ENV_NAME);

// Deliberate human arming token (prevents incidental live send)
const confirmArmed = process.env.CONTROLLED_LIVE_SMS_CONFIRM === CONFIRM_TOKEN;
if (!confirmArmed) block('live_send_not_armed:set_CONTROLLED_LIVE_SMS_CONFIRM=' + CONFIRM_TOKEN);

const permitted = blockedReasons.length === 0;

// ---------------------------------------------------------------------------------------------
// EXECUTION — only if permitted. Exactly ONE messages.create. No loop. No retry.
// Wrapped in an async main() because CommonJS has no top-level await.
// ---------------------------------------------------------------------------------------------
async function performSend() {
  const out = { sendAttemptCount: 0, smsSent: false, twilioResultMetadata: null, sendError: null };
  if (!permitted) return out;

  // Twilio client constructed ONLY here, after all gates passed.
  // Credential values are passed straight from env into the SDK and never captured/printed.
  let twilio;
  try { twilio = require('twilio'); }
  catch (e) { block('twilio_sdk_not_available'); return out; }

  const client = twilio(process.env.TWILIO_LIVE_ACCOUNT_SID, process.env.TWILIO_LIVE_AUTH_TOKEN);
  out.sendAttemptCount = 1; // exactly one attempt; no retry under any outcome
  try {
    const msg = await client.messages.create({
      to: process.env[RECIPIENT_ENV_NAME],
      from: process.env.TWILIO_LIVE_FROM_NUMBER,
      body: 'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.'
    });
    out.smsSent = true;
    // Metadata ONLY — no full numbers, no auth, no secret values.
    out.twilioResultMetadata = {
      sid_present: typeof msg.sid === 'string' && msg.sid.length > 0,
      status: msg.status || null,
      error_code: msg.errorCode || null,
      error_message: msg.errorMessage || null,
      num_segments: msg.numSegments || null,
      direction: msg.direction || null
    };
  } catch (err) {
    // No auto-retry. Record sanitized error metadata only.
    out.smsSent = false;
    out.sendError = { name: err && err.name ? err.name : 'Error', code: (err && err.code) || null, status: (err && err.status) || null };
  }
  return out;
}

async function main() {
const send = await performSend();
const sendAttemptCount = send.sendAttemptCount;
const smsSent = send.smsSent;
const twilioResultMetadata = send.twilioResultMetadata;
const sendError = send.sendError;

// ---------------------------------------------------------------------------------------------
// EVIDENCE
// ---------------------------------------------------------------------------------------------
const finalDecision = permitted
  ? (smsSent ? 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT' : 'CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY')
  : 'CONTROLLED_LIVE_SMS_BLOCKED';

const evidenceDoc = {
  runner_name: RUNNER_NAME,
  build: 186,
  data_classification: 'controlled_live_execution_evidence_names_only_no_secret_values',
  evidence_label: [
    'controlled_live_sms_one_message',
    'to_jason_own_consenting_test_identity',
    'after_build_184',
    'after_gate_permitted'
  ],
  signed_approval_scope: APPROVED_SCOPE,
  gate_decision_before_execution: gate ? gate.gate_decision : null,
  timestamp: TIMESTAMP_LABEL,
  channel: APPROVED_CHANNEL,
  channel_only_sms: marker ? marker.channel_only_sms === true : false,
  transport_mode: TRANSPORT_MODE,
  transport_is_live: true,
  one_message_cap: EXECUTION_CAP,

  // Pre-flight outcome
  pre_flight_permitted: permitted,
  blocked_reasons: blockedReasons,
  live_credential_presence_names_only: credPresence,
  approved_recipient_destination_number_provisioned: recipientPresent,
  live_send_armed: confirmArmed,
  reads_secret_values: false,
  secret_values_printed_logged_or_committed: false,

  // Execution accounting
  send_attempt_count: sendAttemptCount,
  auto_retry_on_failure: false,
  auto_retry_performed: false,
  sms_was_sent: smsSent,
  delivery_was_simulated_or_live: smsSent ? 'live' : 'none_no_send_performed',
  twilio_result_metadata: twilioResultMetadata,
  send_error_metadata: sendError,

  // Recipient (label only; no personal data / no number recorded)
  recipient_identity_label: APPROVED_RECIPIENT_LABEL,
  recipient_number_recorded_in_evidence: false,

  // Safety attestations
  production_data_used: false,
  used_production_supabase: false,
  real_homeowner_contact: false,
  contacted_only_approved_test_identity: true,
  billing_payment_deposit_quote_estimate_invoice_automation_added: false,
  schema_auth_rls_security_changes: false,
  public_live_routes_webhooks_cron_schedulers_dispatchers_created: false,
  channel_expanded_beyond_sms: false,
  other_live_automation_remains_disabled: true,

  // Stop / rollback
  stop_after_result_captured: true,
  stop_rollback_owner_label: readiness.stop_rollback_owner_label || null,
  rollback_status: smsSent
    ? 'one_message_delivered_one_time_approval_consumed_no_further_sends'
    : 'no_send_performed_nothing_to_roll_back',

  final_decision: finalDecision,
  safety_status: 'demo_ready_with_live_automation_disabled'
};

fs.writeFileSync(path.join(root, EVIDENCE_PATH), JSON.stringify(evidenceDoc, null, 2) + '\n');

console.log(JSON.stringify(evidenceDoc, null, 2));
console.log('GATE DECISION BEFORE EXECUTION: ' + evidenceDoc.gate_decision_before_execution);
console.log('PRE-FLIGHT: ' + (permitted ? 'PERMITTED' : 'BLOCKED'));
if (!permitted) {
  console.error('BLOCKED — no SMS sent, no external Twilio call made. Reasons:');
  for (const r of blockedReasons) console.error('  - ' + r);
}
console.log('SEND ATTEMPTS: ' + sendAttemptCount + ' | SMS SENT: ' + smsSent);
console.log('EVIDENCE WRITTEN: ' + EVIDENCE_PATH);
console.log('FINAL DECISION: ' + finalDecision);

// Fail-closed: nonzero exit unless exactly-one live message was actually sent.
process.exit(smsSent ? 0 : 3);
}

main().catch((err) => {
  console.error('STOP: unexpected runner error; no auto-retry. ' + (err && err.message ? err.message : 'unknown'));
  process.exit(1);
});
