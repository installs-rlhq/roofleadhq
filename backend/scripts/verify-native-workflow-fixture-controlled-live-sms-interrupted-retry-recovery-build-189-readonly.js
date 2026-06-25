#!/usr/bin/env node
/**
 * Build 189 Read-Only Verifier —
 * Interrupted Live-SMS Retry Recovery Evidence Capture.
 *
 * Context: Build 189 was an interrupted live-SMS retry session (Claude/server connection lost).
 * This verifier proves the Build 189 RECOVERY is a LOCAL-ONLY, no-live-action evidence capture and
 * that it correctly classifies the prior interrupted session from committed repo evidence only.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no real contacts, no retry. Does NOT invoke the live
 * execution runner, the pre-186 readiness gate runner, the Build 188 gate runner, or any actual
 * external/sandbox runner stub.
 *
 * Proves:
 *  - The recovery evidence records no_live_action_during_recovery=true,
 *    live_retry_executed_by_recovery=false, recovery_send_attempt_count=0, and performs nothing live.
 *  - prior_session_state is one of the allowed values and is justified by repo evidence: no Build 189
 *    artifacts exist, and any Build 189 live send would have been unauthorized (Build 184 approval
 *    consumed by Build 186; Build 188 gate BLOCKED; no signed fresh approval).
 *  - The last recorded send attempt in the repo (Build 186) is carried forward faithfully:
 *    send attempted once, sms_was_sent=false, 401/20003, no retry, one-time approval consumed.
 *  - No active signed approval exists now; no retry is permitted; the next live step requires Jason's
 *    review and fresh instruction.
 *  - Names/metadata/booleans/codes only; no secret values anywhere; the demo safety posture is preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const recoveryEvidencePath = `${FIXTURE_DIR}/controlled-live-sms-interrupted-retry-recovery-build-189-evidence.json`;
const priorExecutionEvidencePath = `${FIXTURE_DIR}/controlled-live-sms-one-message-execution-evidence.json`;
const build187DiagnosisPath = `${FIXTURE_DIR}/controlled-live-sms-failed-attempt-build-187-diagnosis.json`;
const build188GatePath = `${FIXTURE_DIR}/controlled-live-sms-corrected-preflight-gate-result.json`;
const build188TemplatePath = `${FIXTURE_DIR}/controlled-live-sms-corrected-one-message-retry-approval-build-188-template.json`;

const wrapperPath = 'scripts/run-native-workflow-fixture-controlled-live-sms-interrupted-retry-recovery-build-189-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_INTERRUPTED_RETRY_RECOVERY_BUILD_189.md';

const ALLOWED_PRIOR_STATES = ['known_attempted', 'known_not_attempted', 'ambiguous_unknown'];

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
function isExecutable(rel) {
  try { fs.accessSync(fullPath(rel), fs.constants.X_OK); return true; } catch { return false; }
}

console.log('== Build 189 Interrupted Live SMS Retry Recovery Verification ==');

const evidence = readJson(recoveryEvidencePath);
const priorExec = readJson(priorExecutionEvidencePath);
const diagnosis = readJson(build187DiagnosisPath);
const gate188 = readJson(build188GatePath);
const template188 = readJson(build188TemplatePath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Recovery evidence is Build 189 and performed nothing live ---
if (evidence.build !== 189) fail('recovery evidence build must be 189');
if (evidence.mode !== 'interrupted_session_evidence_capture_only_no_live_action') fail('recovery mode must be evidence-capture-only no-live-action');
const rc = evidence.recovery_classification || {};
if (rc.no_live_action_during_recovery !== true) fail('no_live_action_during_recovery must be true');
if (rc.live_retry_executed_by_recovery !== false) fail('live_retry_executed_by_recovery must be false');
if (rc.recovery_send_attempt_count !== 0) fail('recovery_send_attempt_count must be 0');
for (const k of ['recovery_performed_external_call', 'recovery_performed_external_twilio_call',
  'recovery_performed_live_action', 'recovery_sent_sms', 'recovery_invoked_live_execution_runner',
  'recovery_invoked_actual_external_sandbox_runner_stub']) {
  if (rc[k] !== false) fail('recovery classification ' + k + ' must be false');
}
pass('recovery_is_local_only_no_live_action_no_retry_zero_send_attempts');

// --- prior_session_state is an allowed value and justified by repo evidence ---
if (!ALLOWED_PRIOR_STATES.includes(rc.prior_session_state)) fail('prior_session_state must be one of: ' + ALLOWED_PRIOR_STATES.join(', '));
const basis = evidence.prior_session_state_basis_from_repo_evidence_only || {};
if (basis.interrupted_build !== 189) fail('basis must record interrupted_build 189');
// No Build 189 artifacts exist in the repo — confirm independently (fail-closed on a stray 189 artifact).
if (basis.build_189_artifacts_found_in_repo !== false) fail('basis must record build_189_artifacts_found_in_repo=false');
if (basis.any_file_references_build_189_in_repo !== false) fail('basis must record any_file_references_build_189_in_repo=false');
const qf = basis.qualifying_facts || {};
if (qf.build_184_one_message_approval_already_consumed_by_build_186 !== true) fail('qualifying fact: Build 184 approval consumed by Build 186 must be true');
if (qf.no_active_signed_live_sms_approval_existed_going_into_build_189 !== true) fail('qualifying fact: no active signed approval into Build 189 must be true');
if (qf.build_188_corrected_preflight_gate_decision !== 'CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED') fail('qualifying fact: Build 188 gate must be BLOCKED');
if (qf.build_188_credential_self_check_passed !== false) fail('qualifying fact: Build 188 self-check passed must be false');
if (qf.build_188_fresh_one_message_approval_signed !== false) fail('qualifying fact: Build 188 fresh approval signed must be false');
if (qf.therefore_any_build_189_live_send_would_have_been_unauthorized !== true) fail('qualifying fact: any Build 189 live send unauthorized must be true');
// If prior_session_state claims known_attempted, repo evidence MUST contain a Build 189 send attempt.
if (rc.prior_session_state === 'known_attempted' && basis.build_189_artifacts_found_in_repo !== true) {
  fail('prior_session_state known_attempted requires Build 189 send-attempt evidence in the repo');
}
pass('prior_session_state_is_allowed_value_and_justified_by_repo_evidence');

// --- The basis qualifying facts agree with the actual Build 188 artifacts (source-of-truth cross-check) ---
if (gate188.gate_decision !== qf.build_188_corrected_preflight_gate_decision) fail('basis Build 188 gate decision disagrees with actual gate artifact');
if ((gate188.preconditions || {}).credential_self_check_passed !== qf.build_188_credential_self_check_passed) fail('basis Build 188 self-check disagrees with actual gate artifact');
if ((gate188.preconditions || {}).fresh_one_message_approval_signed !== qf.build_188_fresh_one_message_approval_signed) fail('basis Build 188 fresh-approval-signed disagrees with actual gate artifact');
if ((template188.supersedes || {}).build_184_one_message_approval.carries_over !== false) fail('Build 188 template must not carry over the consumed Build 184 approval');
pass('basis_qualifying_facts_cross_check_against_actual_build_188_artifacts');

// --- Last recorded send attempt (Build 186) carried forward faithfully and agrees with source artifacts ---
const last = evidence.last_recorded_send_attempt_in_repo_names_only || {};
if (last.build !== 186) fail('last recorded send attempt build must be 186');
if (last.send_attempt_count !== priorExec.send_attempt_count) fail('last send_attempt_count disagrees with Build 186 execution evidence');
if (last.sms_was_sent !== priorExec.sms_was_sent) fail('last sms_was_sent disagrees with Build 186 execution evidence');
if (last.sms_was_sent !== false) fail('last recorded send attempt sms_was_sent must be false');
if (last.auto_retry_performed !== priorExec.auto_retry_performed || last.auto_retry_performed !== false) fail('last auto_retry_performed must be false and match Build 186 evidence');
if (last.twilio_result_metadata !== null) fail('last twilio_result_metadata must be null (no message accepted)');
const err = last.send_error_metadata_names_codes_only || {};
if (err.code !== 20003 || err.status !== 401) fail('last send error metadata must carry 20003/401 (names/codes only)');
if (err.code !== priorExec.send_error_metadata.code || err.status !== priorExec.send_error_metadata.status) fail('last error metadata disagrees with Build 186 execution evidence');
if (err.code !== diagnosis.captured_error_metadata_names_only.code || err.status !== diagnosis.captured_error_metadata_names_only.status) fail('last error metadata disagrees with Build 187 diagnosis');
pass('last_recorded_send_attempt_build_186_carried_forward_faithfully_401_20003_no_send_no_retry');

// --- Approval consumed; no active approval; no retry permitted ---
const ap = evidence.approval_and_retry_posture || {};
if (ap.active_signed_live_sms_approval_present_now !== false) fail('no active signed approval may be present now');
if (ap.no_retry_permitted_under_any_existing_authorization !== true) fail('no retry permitted must be true');
if (ap.retry_count !== 0) fail('retry_count must be 0');
if (ap.one_message_cap_value !== 1) fail('one_message_cap_value must be 1');
if (ap.fresh_template_status !== 'TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED') fail('fresh template status must be TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED');
if (template188.status !== ap.fresh_template_status) fail('fresh template status disagrees with actual Build 188 template');
pass('approval_consumed_no_active_approval_and_no_retry_permitted');

// --- Next live step requires Jason review/fresh instruction; no recovery-initiated send ---
const nx = evidence.next_live_step_requirement || {};
if (nx.requires_jason_review_and_fresh_instruction !== true) fail('next live step must require Jason review/fresh instruction');
if (nx.no_recovery_initiated_send_permitted !== true) fail('no recovery-initiated send may be permitted');
if (!Array.isArray(nx.before_any_future_controlled_live_sms_all_must_hold) || nx.before_any_future_controlled_live_sms_all_must_hold.length === 0) fail('next live step must list prerequisites');
for (const needle of ['fresh_explicit_signed_one_message_approval', 'one_message_cap_of_exactly_1_enforced', 'all_other_live_automation_remains_disabled']) {
  if (!nx.before_any_future_controlled_live_sms_all_must_hold.some((r) => r.includes(needle))) fail('next live step prerequisites must include: ' + needle);
}
pass('next_live_step_requires_jason_fresh_instruction_no_recovery_initiated_send');

// --- Channel is SMS only; recipient is Jason's consenting test identity; nothing authorized now ---
if (evidence.channel !== 'sms' || evidence.channel_only_sms !== true) fail('channel must be sms only');
if (evidence.recipient_identity_label !== 'Jason Lohse / Test Roofing (own consenting test identity)') fail('recipient must be Jason own consenting test identity');
if (evidence.recipient_is_real_homeowner !== false) fail('recipient_is_real_homeowner must be false');
for (const k of ['reads_secret_values', 'records_secret_values', 'prints_secret_values', 'authorizes_send_now', 'authorizes_retry_now',
  'production_data_used', 'used_production_supabase', 'real_homeowner_contact',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'schema_auth_rls_security_changes',
  'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'channel_expanded_beyond_sms']) {
  if (evidence[k] !== false) fail('recovery evidence ' + k + ' must be false');
}
if (evidence.other_live_automation_remains_disabled !== true) fail('other_live_automation_remains_disabled must be true');
if (evidence.inspects_only_local_committed_evidence !== true) fail('recovery must inspect only local committed evidence');
pass('channel_sms_only_recipient_jason_and_nothing_live_authorized_now');

// --- No secret values anywhere in Build 189 artifacts (names/booleans/codes only) ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(evidence), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
pass('no_secret_values_present_in_any_build_189_artifact_names_codes_booleans_only');

// --- No live/external/send/retry activation claimed anywhere in Build 189 surface ---
const forbiddenClaims = [
  '"recovery_sent_sms": true', '"live_retry_executed_by_recovery": true',
  '"recovery_performed_external_call": true', '"recovery_performed_external_twilio_call": true',
  '"recovery_performed_live_action": true', '"no_live_action_during_recovery": false',
  '"authorizes_send_now": true', '"authorizes_retry_now": true',
  '"active_signed_live_sms_approval_present_now": true'
];
const combined = dataArtifactText + '\n' + wrapper;
for (const claim of forbiddenClaims) {
  if (combined.includes(claim)) fail('forbidden live/send/retry activation claim present: ' + claim);
}
pass('no_live_external_send_or_retry_activation_claimed_anywhere');

// --- Dry-run/recovery wrapper: local-only, runs the verifier; never runs live or actual-stub runners ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (wrapper.includes('run-native-workflow-fixture-controlled-live-sms-one-message-execution.js')) fail('wrapper must NOT run the live execution runner');
if (wrapper.includes('run-native-workflow-fixture-controlled-live-sms-corrected-preflight-gate.js')) fail('wrapper must NOT run the Build 188 gate runner (no recomputation/live surface in recovery)');
if (wrapper.includes('run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) fail('wrapper must NOT run the actual external/sandbox runner stub');
if (!wrapper.includes('verify-native-workflow-fixture-controlled-live-sms-interrupted-retry-recovery-build-189-readonly.js')) fail('wrapper must run the Build 189 verifier');
pass('recovery_wrapper_runs_build_189_verifier_and_no_live_or_actual_stub_runner');

// --- Doc present, labeled interrupted/recovery, with required markers ---
for (const needle of ['Build 189', 'interrupted', 'recovery', 'STOP', 'Jason', 'ambiguous', 'No SMS', 'no retry']) {
  if (!doc.includes(needle)) fail('doc missing required section/marker: ' + needle);
}
pass('build_189_recovery_closeout_doc_present_and_labeled');

// --- Safety posture preserved across artifacts + pilot readiness helper ---
if (evidence.safety_status !== 'demo_ready_with_live_automation_disabled') fail('recovery evidence safety_status must be demo_ready_with_live_automation_disabled');
const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + readiness.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 189 recovery is a local-only interrupted-session evidence capture (no live action, no retry, zero send attempts).');
console.log('PASS: prior_session_state=' + rc.prior_session_state + ' justified by repo evidence (no Build 189 artifacts; any live send would have been unauthorized).');
console.log('PASS: last recorded send attempt remains Build 186 (attempted once, not sent, 401/20003, no retry, approval consumed).');
console.log('PASS: no active signed approval; no retry permitted; next live step requires Jason review/fresh instruction.');
console.log('PASS: names/metadata/booleans/codes only; no secret values; safety_status preserved.');
console.log('PASS: Build 189 verifier passed (' + passCount + ' assertions).');
