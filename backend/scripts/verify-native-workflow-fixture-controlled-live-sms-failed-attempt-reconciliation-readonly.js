#!/usr/bin/env node
/**
 * Build 187 Read-Only Verifier —
 * Controlled Live SMS Failed-Attempt Diagnosis + Readiness-Verifier State Reconciliation.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no real contacts. Inspects only local committed
 * Build 186 evidence/closeout and the Build 187 diagnosis + reconciliation artifacts.
 *
 * Proves:
 *  - The Build 186 controlled live SMS attempt failed exactly once with NO retry, sending nothing,
 *    and the captured error metadata is NAMES/CODES ONLY (no secret values).
 *  - The Build 187 diagnosis packet correctly classifies the failure as a Twilio authentication
 *    rejection (HTTP 401 / code 20003) and rules out gate/cap/consent/retry/data faults.
 *  - The stale Build 185 readiness-verifier divergence is reconciled by VERSIONING: the historical
 *    Build 185 CONTROLLED_LIVE_SMS_BLOCKED state is preserved in a versioned snapshot while the live
 *    gate-result file legitimately advanced to CONTROLLED_LIVE_SMS_PERMITTED under the signed
 *    one-time Build 186 approval. Both states are representable; no stale failing assertion remains.
 *  - The corrected-retry approval template exists but is UNSIGNED / NOT GRANTED / NOT APPROVED.
 *  - No secret values appear in any Build 187 artifact; the demo safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const evidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const closeoutPath = `${FIXTURE_DIR}/controlled-live-sms-one-message-build-186-closeout.json`;
const liveGatePath = `${FIXTURE_DIR}/controlled-live-sms-readiness-gate-result.json`;
const historicalBlockedSnapshotPath = `${FIXTURE_DIR}/controlled-live-sms-readiness-gate-result-build-185-blocked.json`;
const diagnosisPath = `${FIXTURE_DIR}/controlled-live-sms-failed-attempt-build-187-diagnosis.json`;
const retryTemplatePath = `${FIXTURE_DIR}/controlled-live-sms-corrected-retry-approval-template.json`;
const reconciledVerifierPath = 'backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_FAILED_ATTEMPT_RECONCILIATION_AFTER_BUILD_186.md';

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

console.log('== Build 187 Controlled Live SMS Failed-Attempt Diagnosis + Reconciliation Verification ==');

const evidence = readJson(evidencePath);
const closeout = readJson(closeoutPath);
const liveGate = readJson(liveGatePath);
const snapshot = readJson(historicalBlockedSnapshotPath);
const diagnosis = readJson(diagnosisPath);
const retryTemplate = readJson(retryTemplatePath);
const reconciledVerifierSrc = read(reconciledVerifierPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Build 186 outcome: attempted exactly once, failed, no retry, nothing sent ---
if (evidence.final_decision !== 'CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY') fail('evidence final_decision must be ATTEMPTED_FAILED_NO_RETRY');
if (evidence.gate_decision_before_execution !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('evidence gate decision before execution must be PERMITTED');
if (evidence.send_attempt_count !== 1) fail('evidence send_attempt_count must be exactly 1');
if (evidence.sms_was_sent !== false) fail('evidence sms_was_sent must be false');
if (evidence.auto_retry_on_failure !== false || evidence.auto_retry_performed !== false) fail('evidence must record no retry');
if (closeout.one_time_approval_status !== 'consumed_no_further_controlled_live_sms_permitted') fail('closeout must mark one-time approval consumed');
pass('build_186_attempt_was_single_failed_no_retry_nothing_sent_and_approval_consumed');

// --- Captured error metadata is NAMES/CODES ONLY, no secret values, recipient number not recorded ---
const err = evidence.send_error_metadata || {};
if (err.code !== 20003 || err.status !== 401) fail('evidence error metadata must be Twilio code 20003 / status 401');
if (evidence.recipient_number_recorded_in_evidence !== false) fail('recipient number must NOT be recorded in evidence');
if (evidence.reads_secret_values !== false || evidence.secret_values_printed_logged_or_committed !== false) fail('evidence must attest no secret values');
const evidenceErrKeys = Object.keys(err).sort().join(',');
if (evidenceErrKeys !== 'code,name,status') fail('error metadata must contain only name/code/status keys, got: ' + evidenceErrKeys);
pass('captured_error_metadata_is_names_and_codes_only_no_secret_values');

// --- Build 187 diagnosis packet: correct classification + ruled-out causes + names only ---
if (diagnosis.build !== 187) fail('diagnosis build must be 187');
if (diagnosis.root_cause_class !== 'twilio_authentication_rejection_at_transport_layer') fail('diagnosis root cause class wrong');
const capt = diagnosis.captured_error_metadata_names_only || {};
if (capt.code !== 20003 || capt.status !== 401) fail('diagnosis must carry the 20003/401 metadata');
if (capt.no_secret_values_in_error_metadata !== true) fail('diagnosis must attest no secret values in error metadata');
for (const k of ['reads_secret_values', 'performed_external_call', 'performed_external_twilio_call', 'performed_live_action', 'sent_sms']) {
  if (diagnosis[k] !== false) fail('diagnosis ' + k + ' must be false');
}
if (diagnosis.no_send_performed_in_build_187 !== true || diagnosis.no_retry_performed_in_build_187 !== true) fail('diagnosis must confirm no send/retry in Build 187');
const ruledOut = Array.isArray(diagnosis.ruled_out_causes) ? diagnosis.ruled_out_causes.join('|') : '';
for (const needle of ['safety_gate_misfire', 'recipient_consent_missing', 'one_message_cap_breach', 'auto_retry_loop', 'secret_value_leak']) {
  if (!ruledOut.includes(needle)) fail('diagnosis must rule out: ' + needle);
}
if (diagnosis.diagnosis_name !== 'controlled_live_sms_one_message_build_187_failed_attempt_diagnosis') fail('diagnosis name mismatch');
pass('diagnosis_classifies_twilio_auth_rejection_and_rules_out_gate_cap_consent_retry_leak');

// --- Diagnosis traces to the exact Build 186 source commit and evidence/closeout paths ---
const ri = diagnosis.rich_inputs || {};
if (ri.build_186_source_commit !== '0d3ceff53ff0b6451a260661d255bff9a3208b73') fail('diagnosis must cite Build 186 source commit');
if (ri.build_186_evidence_path !== evidencePath) fail('diagnosis must cite the Build 186 evidence path');
if (ri.build_186_closeout_path !== closeoutPath) fail('diagnosis must cite the Build 186 closeout path');
pass('diagnosis_traces_to_build_186_commit_evidence_and_closeout');

// --- RECONCILIATION (versioned): historical BLOCKED snapshot preserved; live file legitimately PERMITTED ---
if (snapshot.build !== 185) fail('historical snapshot must be build 185');
if (snapshot.gate_decision !== 'CONTROLLED_LIVE_SMS_BLOCKED') fail('historical snapshot must preserve CONTROLLED_LIVE_SMS_BLOCKED');
if (snapshot.controlled_live_sms_ready !== false) fail('historical snapshot controlled_live_sms_ready must be false');
if (!Array.isArray(snapshot.blocked_reasons) || snapshot.blocked_reasons.length === 0) fail('historical snapshot must keep blocked_reasons');
if (!snapshot.blocked_reasons.includes('explicit_controlled_live_sms_one_message_approval_not_signed')) fail('snapshot must keep unsigned-approval blocked reason');
if (liveGate.gate_decision !== 'CONTROLLED_LIVE_SMS_PERMITTED') fail('live gate-result must reflect Build 186 PERMITTED state');
if (liveGate.gate_decision !== evidence.gate_decision_before_execution) fail('live gate decision must match the evidence gate decision before execution');
if (snapshot.gate_decision === liveGate.gate_decision) fail('snapshot and live gate must represent DISTINCT historical vs current states');
pass('historical_185_blocked_snapshot_and_186_permitted_live_state_both_represented');

// --- The reconciled Build 185 verifier no longer hard-asserts BLOCKED against the live (mutated) file ---
// It must read the versioned snapshot for the historical BLOCKED assertions instead of the live file.
if (!reconciledVerifierSrc.includes('controlled-live-sms-readiness-gate-result-build-185-blocked.json')) {
  fail('Build 185 verifier must read the versioned historical BLOCKED snapshot');
}
if (!reconciledVerifierSrc.includes('CONTROLLED_LIVE_SMS_PERMITTED')) {
  fail('Build 185 verifier must acknowledge the live file legitimately advanced to PERMITTED');
}
pass('build_185_verifier_retargeted_to_snapshot_and_acknowledges_permitted_advance');

// --- Corrected-retry approval template exists but is UNSIGNED / NOT GRANTED / NOT APPROVED ---
if (retryTemplate.status !== 'TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED') fail('retry template status must be TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED');
for (const k of ['approval_granted', 'approval_signed', 'authorizes_send_now', 'authorizes_retry_now']) {
  if (retryTemplate[k] !== false) fail('retry template ' + k + ' must be false');
}
for (const k of ['approval_signed_by', 'approval_signed_date_time', 'approval_signature']) {
  if (retryTemplate[k] !== null) fail('retry template ' + k + ' must be null (unsigned)');
}
const sb = retryTemplate.signature_block_leave_blank_until_a_future_approved_build || {};
for (const k of ['approved_by_name', 'one_message_scope_string', 'date_time_with_zone', 'signature']) {
  if (sb[k] !== '') fail('retry template signature block field must be blank: ' + k);
}
if (!retryTemplate.supersedes_consumed_approval || retryTemplate.supersedes_consumed_approval.carries_over !== false) {
  fail('retry template must record that the consumed Build 186 approval does NOT carry over');
}
pass('corrected_retry_approval_template_present_but_unsigned_not_granted_not_approved');

// --- No secret values anywhere in Build 187 DATA artifacts (names/booleans/codes only) ---
// Scope: the JSON data fixtures + the prose doc. The dry-run wrapper is intentionally excluded
// because it documents the names-only scan PATTERNS themselves (e.g. AUTH_TOKEN=), which are not
// secrets. Config identifiers like TWILIO_LIVE_AUTH_TOKEN are NAMES, not values.
const secretLikePatterns = [
  'AC0', 'AC1', 'SK0', 'SK1', // Twilio SID-shaped prefixes
  'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ',
  'BEGIN PRIVATE KEY', 'BEGIN RSA'
];
const dataArtifactText = [JSON.stringify(evidence), JSON.stringify(closeout), JSON.stringify(diagnosis), JSON.stringify(retryTemplate), JSON.stringify(snapshot), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
// A standalone 32-hex run resembles a Twilio auth token / account SID body and may not appear.
// Boundaried so legitimate 40-char git commit SHAs (referenced as provenance) do not match.
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) {
  fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
}
pass('no_secret_values_present_in_any_build_187_artifact_names_codes_only');

// --- No live/external/send activation claimed in Build 187 artifacts ---
const forbiddenClaims = ['"sms_was_sent": true', '"sent_sms": true', '"authorizes_send_now": true', '"authorizes_retry_now": true', '"approval_granted": true', '"approval_signed": true'];
for (const claim of forbiddenClaims) {
  if (dataArtifactText.includes(claim)) fail('forbidden live/send/approval activation claim present: ' + claim);
}
pass('no_live_send_or_approval_activation_claimed_in_build_187_artifacts');

// --- Dry-run wrapper is local-only: never runs the live execution / gate / actual-stub runners ---
if (wrapper.includes('run-native-workflow-fixture-controlled-live-sms-one-message-execution.js')) {
  fail('wrapper must NOT run the controlled live SMS execution runner');
}
if (wrapper.includes('run-native-workflow-fixture-controlled-live-sms-readiness-gate.js')) {
  fail('wrapper must NOT run the readiness gate runner');
}
if (wrapper.includes('run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must NOT run the actual external/sandbox runner stub');
}
if (!wrapper.includes('verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js')) {
  fail('wrapper must run the Build 187 verifier');
}
pass('dry_run_wrapper_is_local_only_and_runs_no_live_execution_gate_or_actual_stub_runner');

// --- Safety posture preserved across every artifact + pilot readiness helper ---
for (const [label, obj] of [['diagnosis', diagnosis], ['retryTemplate', retryTemplate], ['evidence', evidence], ['closeout', closeout]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + readiness.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 187 failed-attempt diagnosis verified (Twilio auth rejection 401/20003; no send; no retry).');
console.log('PASS: Build 185 BLOCKED state versioned in a snapshot; Build 186 PERMITTED state on the live file; divergence reconciled.');
console.log('PASS: corrected-retry approval template present but unsigned/not granted/not approved.');
console.log('PASS: names/codes/booleans only; no secret values in any artifact.');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled.');
console.log('PASS: Build 187 verifier passed (' + passCount + ' assertions).');
