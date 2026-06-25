#!/usr/bin/env node
/**
 * Build 219 — Guarded M2 Live-Validation Execution Runner (FUTURE live runner; permission-gated).
 *
 * SCOPE-LOCKED, FAIL-CLOSED, ONE-MESSAGE-ONLY, NO AUTO-RETRY, M2 ONLY. This runner finalizes the
 * actual guarded execution path for exactly ONE future Jason-operated, SMS-only controlled live
 * validation send of scenario missed_or_slow_lead_follow_up_nudge (M2). It is the runner Jason would
 * use OUTSIDE this build, AFTER a NON-MUTATING send-time preflight passes and AFTER a scenario-specific
 * confirmation token is deliberately supplied.
 *
 * Two modes:
 *   - PREFLIGHT (default; also `--preflight`): computes the full fail-closed guard decision and prints
 *     a sanitized preflight result to STDOUT (optionally also to a /tmp file with `--write-tmp`). It
 *     NEVER modifies any tracked repository file, NEVER constructs a provider client, NEVER reads a
 *     credential value, NEVER records a destination, and NEVER sends. A dry run/preflight can never
 *     send, and (correcting the Build 218 defect) it leaves `git status` byte-for-byte unchanged.
 *   - LIVE (`--arm-live-send`): only reachable when EVERY guard passes AND the scenario-specific
 *     confirm token is present in the environment. Exactly ONE messages.create. No loop. No retry.
 *
 * The outbound body is PRODUCED BY THE NATIVE WORKFLOW (roofer-alert-binding.service /
 * bindRooferAlert), not a separate literal, generic fallback, or environment-provided body. A
 * fail-closed guard verifies the produced body equals the signed M2 text exactly and rejects M1,
 * empty, generic, substituted, modified, environment-overridden, and wrong-scenario copy.
 *
 * M1 IS PERMANENTLY CONSUMED: this runner additionally requires that the Build 218 M1 approval
 * remains consumed/expired and refuses to run if anything would reuse or reauthorize M1.
 *
 * Requiring this module is SIDE-EFFECT FREE: it performs no send, constructs no client, reads no
 * credential, writes no file, and never calls process.exit. The Twilio SDK is required LAZILY inside
 * the live send path only. Pure helpers are exported so the read-only verifier and negative-guard
 * tests can prove fail-closed behaviour WITHOUT any send, client, credential, network, or destination.
 *
 * Build 219 itself runs ONLY the (non-mutating) preflight, never arms the token, and never sends.
 *
 * Required environment for a FUTURE live attempt (NAMES only; values never read into evidence/logs):
 *   TWILIO_LIVE_ACCOUNT_SID, TWILIO_LIVE_AUTH_TOKEN, TWILIO_LIVE_FROM_NUMBER,
 *   M2_LIVE_VALIDATION_TO_NUMBER          (destination, entered silently at execution time, E.164),
 *   M2_LIVE_VALIDATION_CONFIRM=SEND_ONE_M2_LIVE_VALIDATION_SMS   (scenario-specific arming token)
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const backendRoot = path.join(repoRoot, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const APPROVAL_PACKET_PATH = `${FIXTURE_DIR}/m2-live-validation-signed-approval-build-219.json`;
// The Build 218 M1 approval must remain consumed; this runner reads it READ-ONLY to confirm that.
const M1_APPROVAL_PACKET_PATH = `${FIXTURE_DIR}/m1-live-validation-signed-approval-build-218.json`;
// Sanitized preflight output is OPTIONAL and goes to /tmp only — never a tracked repo file.
const PREFLIGHT_TMP_RESULT_PATH = path.join(os.tmpdir(), 'roofleadhq-b219-m2-guarded-send-time-preflight-result.json');

const RUNNER_NAME = 'native_workflow_fixture_m2_guarded_live_validation_execution_build_219';
const M1_SCENARIO_KEY = 'new_roof_inspection_lead_alert';
const M2_SCENARIO_KEY = 'missed_or_slow_lead_follow_up_nudge';
const M2_MESSAGE_ID = 'M2';
const APPROVED_CHANNEL = 'sms';
const EXECUTION_CAP = 1;

// Bound, verified Build 217 source-of-truth commit (the foundational integrated-workflow commit).
const BOUND_BUILD_217_SOURCE_COMMIT = '8d92939';
// Verified Build 218 commit (captured + then consumed the M1 approval).
const VERIFIED_BUILD_218_COMMIT = '21b840b';
// Because a commit cannot contain its own final hash, Build 219 is validated DYNAMICALLY by subject.
const EXPECTED_BUILD_219_SUBJECT = 'test(workflow): close m1 and capture m2 approval build 219';

// Scenario-specific arming token (M2 only). NEVER armed by Build 219.
const M2_CONFIRM_TOKEN = 'SEND_ONE_M2_LIVE_VALIDATION_SMS';
const CONFIRM_TOKEN_ENV_NAME = 'M2_LIVE_VALIDATION_CONFIRM';
const DESTINATION_ENV_NAME = 'M2_LIVE_VALIDATION_TO_NUMBER';
const REQUIRED_LIVE_CRED_ENV_NAMES = ['TWILIO_LIVE_ACCOUNT_SID', 'TWILIO_LIVE_AUTH_TOKEN', 'TWILIO_LIVE_FROM_NUMBER'];

// The exact signed M2 text (independent restatement; cross-checked against the native binding + approval).
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';
const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";

// Generic / stale bodies that must never be produced or sent (substituted-copy protection).
const FORBIDDEN_GENERIC_BODIES = [
  'RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No action needed.',
  'RoofLeadHQ test message. No action needed.',
  'Test message.'
];

function fullPath(rel) {
  return path.isAbsolute(rel) ? rel : path.join(repoRoot, rel);
}
function readJsonAt(rel) {
  const full = fullPath(rel);
  if (!fs.existsSync(full)) return { ok: false, reason: 'missing_required_file:' + rel, value: null };
  try { return { ok: true, reason: null, value: JSON.parse(fs.readFileSync(full, 'utf8')) }; }
  catch (e) { return { ok: false, reason: 'unreadable_json:' + rel, value: null }; }
}

// -------------------------------------------------------------------------------------------------
// PURE HELPERS — native body production + fail-closed binding + full guard. No network, no Twilio,
// no env mutation, no credentials, no destination value, no process.exit, no tracked-file writes.
// Exported for verifier/tests.
// -------------------------------------------------------------------------------------------------

/**
 * Compile + load the native roofer-alert-binding module and produce the M2 body THROUGH the native
 * workflow path (bindRooferAlert). This is the ONLY source of the outbound body — never a literal,
 * a generic fallback, or an environment-provided body. tsc emits to /tmp only (no tracked-file write).
 */
function produceM2BodyViaNativeWorkflow() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b219-native');
  fs.mkdirSync(outDir, { recursive: true });
  const file = path.join(backendRoot, 'src/services', 'roofer-alert-binding.service.ts');
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [file, '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'ignore' }
  );
  const binding = require(path.join(outDir, 'roofer-alert-binding.service.js'));
  const bound = binding.bindRooferAlert(M2_SCENARIO_KEY);
  return {
    ok: bound.ok === true,
    body: bound.ok ? bound.boundBody : null,
    messageId: bound.messageId || null,
    scenarioKey: bound.scenarioKey || null,
    reasons: bound.reasons || []
  };
}

/**
 * Fail-closed guard on the native-workflow-produced body vs. the signed M2 text.
 * Returns an array of block reasons (empty == exact match permitted). Rejects M1, empty, generic,
 * substituted, modified, and wrong-scenario copy.
 */
function assertProducedBodyMatchesSignedM2(producedBody, signedM2Text) {
  const reasons = [];
  if (typeof signedM2Text !== 'string' || signedM2Text.trim().length === 0) {
    reasons.push('signed_m2_text_unavailable');
    return reasons;
  }
  if (typeof producedBody !== 'string' || producedBody.trim().length === 0) {
    reasons.push('produced_body_empty');
    return reasons;
  }
  if (producedBody === EXACT_M1) reasons.push('produced_body_is_m1_not_m2');
  if (FORBIDDEN_GENERIC_BODIES.includes(producedBody)) reasons.push('produced_body_is_generic_or_stale_copy');
  if (producedBody !== signedM2Text) reasons.push('produced_body_does_not_match_signed_m2_exactly');
  return reasons;
}

/**
 * Validate the signed Build 219 M2 approval object. Returns block reasons (empty == valid M2 approval).
 */
function assertSignedApprovalValid(approval) {
  const reasons = [];
  if (!approval || typeof approval !== 'object') { reasons.push('approval_artifact_missing'); return reasons; }
  const a = approval.signed_m2_approval || approval;
  if (a.approval_signed !== true) reasons.push('approval_not_signed');
  if (a.approval_granted !== true) reasons.push('approval_not_granted');
  if (a.scenario_key !== M2_SCENARIO_KEY) reasons.push('approval_scenario_not_m2');
  if (a.message_id !== M2_MESSAGE_ID) reasons.push('approval_message_id_not_m2');
  if (a.channel !== APPROVED_CHANNEL) reasons.push('approval_channel_not_sms');
  if (a.selected_variant_text !== EXACT_M2) reasons.push('approval_variant_text_not_exact_m2');
  if (a.max_message_count !== 1) reasons.push('approval_max_message_count_not_1');
  if (a.retry_allowed !== false) reasons.push('approval_retry_not_disallowed');
  if (a.approval_single_use !== true) reasons.push('approval_not_single_use');
  if (a.approval_consumed !== false) reasons.push('approval_already_consumed');
  if (a.approval_expired !== false) reasons.push('approval_already_expired');
  if (a.authorizes_m2 !== true) reasons.push('approval_does_not_authorize_m2');
  if (a.authorizes_m1 !== false) reasons.push('approval_must_not_authorize_m1');
  if (a.m1_approved !== false) reasons.push('approval_m1_must_remain_unapproved');
  if (a.bound_build_217_source_commit !== BOUND_BUILD_217_SOURCE_COMMIT) reasons.push('approval_not_bound_to_build_217_commit_8d92939');
  if (a.verified_build_218_commit !== VERIFIED_BUILD_218_COMMIT) reasons.push('approval_not_bound_to_build_218_commit_21b840b');
  return reasons;
}

/**
 * Confirm M1 remains permanently consumed/expired. Returns block reasons (empty == M1 stays consumed).
 * The M2 path must never reuse or reauthorize M1.
 */
function assertM1RemainsConsumed(m1Approval) {
  const reasons = [];
  if (!m1Approval || typeof m1Approval !== 'object') { reasons.push('m1_approval_artifact_missing'); return reasons; }
  const a = m1Approval.signed_m1_approval || m1Approval;
  if (a.approval_consumed !== true) reasons.push('m1_approval_not_consumed');
  if (a.approval_expired !== true) reasons.push('m1_approval_not_expired');
  return reasons;
}

/**
 * PURE full send-time guard. Takes an explicit state object so the verifier/negative tests can drive
 * every branch with synthetic inputs (no git, no env, no send). Returns { permitted, blockedReasons }.
 *
 * state = {
 *   branch, headEqualsOrigin, worktreeClean, headSubject,
 *   approval, m1Approval, producedBody, signedM2Text,
 *   destinationCount, credentialNamesPresent, confirmToken, retryRequested
 * }
 */
function evaluateM2GuardedSend(state) {
  const s = state || {};
  const blockedReasons = [];

  // Source-of-truth / send-time source guard.
  if (s.branch !== 'main') blockedReasons.push('branch_not_main');
  if (s.headEqualsOrigin !== true) blockedReasons.push('head_not_equal_origin_main');
  if (s.worktreeClean !== true) blockedReasons.push('worktree_not_clean');
  if (s.headSubject !== EXPECTED_BUILD_219_SUBJECT) blockedReasons.push('head_subject_not_build_219');

  // Approval (existence, signature, scope, single-use, M2-only, source binding).
  for (const r of assertSignedApprovalValid(s.approval)) blockedReasons.push('approval_guard:' + r);

  // M1 must remain permanently consumed; M2 never reuses or reauthorizes M1.
  for (const r of assertM1RemainsConsumed(s.m1Approval)) blockedReasons.push('m1_consumed_guard:' + r);

  // Exact M2 binding on the native-workflow-produced body.
  for (const r of assertProducedBodyMatchesSignedM2(s.producedBody, s.signedM2Text)) blockedReasons.push('binding_guard:' + r);

  // Exactly one valid destination present (silently, at execution time).
  if (typeof s.destinationCount !== 'number' || s.destinationCount < 1) blockedReasons.push('destination_missing');
  else if (s.destinationCount > 1) blockedReasons.push('multiple_destinations_present');

  // Required credential NAMES present (values never read here).
  if (s.credentialNamesPresent !== true) blockedReasons.push('required_credential_names_absent');

  // Scenario-specific confirmation token must match exactly.
  if (s.confirmToken !== M2_CONFIRM_TOKEN) blockedReasons.push('scenario_specific_confirm_token_absent_or_wrong');

  // Exactly one attempt; any retry / multiple-attempt request fails closed.
  if (s.retryRequested === true) blockedReasons.push('retry_or_multiple_attempt_requested');

  return { permitted: blockedReasons.length === 0, blockedReasons };
}

module.exports = {
  RUNNER_NAME,
  M1_SCENARIO_KEY,
  M2_SCENARIO_KEY,
  M2_MESSAGE_ID,
  APPROVAL_PACKET_PATH,
  M1_APPROVAL_PACKET_PATH,
  PREFLIGHT_TMP_RESULT_PATH,
  BOUND_BUILD_217_SOURCE_COMMIT,
  VERIFIED_BUILD_218_COMMIT,
  EXPECTED_BUILD_219_SUBJECT,
  M2_CONFIRM_TOKEN,
  CONFIRM_TOKEN_ENV_NAME,
  DESTINATION_ENV_NAME,
  REQUIRED_LIVE_CRED_ENV_NAMES,
  EXACT_M1,
  EXACT_M2,
  FORBIDDEN_GENERIC_BODIES,
  produceM2BodyViaNativeWorkflow,
  assertProducedBodyMatchesSignedM2,
  assertSignedApprovalValid,
  assertM1RemainsConsumed,
  evaluateM2GuardedSend,
  buildPreflightResult
};

// -------------------------------------------------------------------------------------------------
// STATE GATHERERS — read-only. Used by preflight + (future) live arming. No secret VALUES recorded.
// -------------------------------------------------------------------------------------------------
function git(args) {
  try { return execFileSync('git', args, { cwd: repoRoot }).toString().trim(); }
  catch (e) { return null; }
}
function envPresent(name) {
  const v = process.env[name];
  return typeof v === 'string' && v.trim().length > 0;
}

function gatherSourceState() {
  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  const head = git(['rev-parse', 'HEAD']);
  const origin = git(['rev-parse', 'origin/main']);
  const statusPorcelain = git(['status', '--porcelain']);
  const headSubject = git(['log', '-1', '--format=%s']);
  return {
    branch,
    headEqualsOrigin: head !== null && origin !== null && head === origin,
    worktreeClean: statusPorcelain === '',
    headSubject
  };
}

// -------------------------------------------------------------------------------------------------
// PREFLIGHT — computes the guard decision and returns a sanitized result OBJECT. It is PURE w.r.t the
// repository: it NEVER writes a tracked file, NEVER sends, NEVER arms, NEVER constructs a client,
// NEVER reads a credential value, NEVER records a destination value. (Corrects the Build 218 defect
// where the preflight overwrote a tracked result file and dirtied the worktree.)
// -------------------------------------------------------------------------------------------------
function buildPreflightResult() {
  const approvalRes = readJsonAt(APPROVAL_PACKET_PATH);
  const approval = approvalRes.ok ? approvalRes.value : null;
  const signedM2Text =
    approval && approval.signed_m2_approval ? approval.signed_m2_approval.selected_variant_text : null;

  const m1ApprovalRes = readJsonAt(M1_APPROVAL_PACKET_PATH);
  const m1Approval = m1ApprovalRes.ok ? m1ApprovalRes.value : null;

  let produced = { ok: false, body: null, reasons: ['native_body_not_produced_in_preflight'] };
  try { produced = produceM2BodyViaNativeWorkflow(); } catch (e) { produced = { ok: false, body: null, reasons: ['native_compile_failed'] }; }

  const source = gatherSourceState();
  const destinationPresent = envPresent(DESTINATION_ENV_NAME);
  const credentialNamesPresent = REQUIRED_LIVE_CRED_ENV_NAMES.every(envPresent);
  const confirmTokenPresent = envPresent(CONFIRM_TOKEN_ENV_NAME);

  const guard = evaluateM2GuardedSend({
    branch: source.branch,
    headEqualsOrigin: source.headEqualsOrigin,
    worktreeClean: source.worktreeClean,
    headSubject: source.headSubject,
    approval,
    m1Approval,
    producedBody: produced.body,
    signedM2Text,
    destinationCount: destinationPresent ? 1 : 0,
    credentialNamesPresent,
    confirmToken: confirmTokenPresent ? process.env[CONFIRM_TOKEN_ENV_NAME] : undefined,
    retryRequested: false
  });

  const nativeBindingMatchesSignedM2 =
    produced.ok && assertProducedBodyMatchesSignedM2(produced.body, signedM2Text).length === 0;
  const m1StaysConsumed = assertM1RemainsConsumed(m1Approval).length === 0;

  return {
    result_name: 'm2_guarded_send_time_preflight_result_build_219',
    build: 219,
    runner_name: RUNNER_NAME,
    mode: 'preflight',
    data_classification: 'labels_booleans_codes_only_no_secret_values_no_phone_numbers_no_email_addresses_no_raw_sids_no_destination_values_no_production_data',
    preflight_is_non_mutating: true,
    preflight_writes_tracked_repo_file: false,
    bound_build_217_source_commit: BOUND_BUILD_217_SOURCE_COMMIT,
    verified_build_218_commit: VERIFIED_BUILD_218_COMMIT,
    expected_build_219_subject: EXPECTED_BUILD_219_SUBJECT,
    build_219_validated_dynamically_at_send_time: true,

    source_state: {
      branch_is_main: source.branch === 'main',
      head_equals_origin_main: source.headEqualsOrigin,
      worktree_clean: source.worktreeClean,
      head_subject_is_build_219: source.headSubject === EXPECTED_BUILD_219_SUBJECT
    },

    native_workflow_body_production: {
      body_produced_by_native_bindRooferAlert: produced.ok,
      produced_message_id: produced.messageId || null,
      produced_scenario_key: produced.scenarioKey || null,
      produced_body_equals_signed_m2_exactly: nativeBindingMatchesSignedM2,
      produced_body_is_m1: produced.body === EXACT_M1,
      produced_body_is_generic_or_stale: FORBIDDEN_GENERIC_BODIES.includes(produced.body),
      hardcoded_or_env_provided_body_used: false
    },

    approval_guard: {
      approval_artifact_present: approval !== null,
      approval_valid_m2_only: approval !== null && assertSignedApprovalValid(approval).length === 0,
      approval_bound_to_build_217_commit_8d92939:
        approval !== null &&
        approval.signed_m2_approval &&
        approval.signed_m2_approval.bound_build_217_source_commit === BOUND_BUILD_217_SOURCE_COMMIT,
      approval_bound_to_build_218_commit_21b840b:
        approval !== null &&
        approval.signed_m2_approval &&
        approval.signed_m2_approval.verified_build_218_commit === VERIFIED_BUILD_218_COMMIT,
      m2_approved: approval !== null && approval.signed_m2_approval && approval.signed_m2_approval.authorizes_m2 === true,
      m1_unapproved: approval !== null && approval.signed_m2_approval && approval.signed_m2_approval.authorizes_m1 === false,
      approval_unconsumed:
        approval !== null &&
        approval.signed_m2_approval &&
        approval.signed_m2_approval.approval_consumed === false &&
        approval.signed_m2_approval.approval_expired === false
    },

    m1_consumption_guard: {
      m1_approval_artifact_present: m1Approval !== null,
      m1_remains_consumed_and_expired: m1StaysConsumed,
      m1_cannot_be_reauthorized_here: true
    },

    execution_inputs_presence_only: {
      exactly_one_destination_present: destinationPresent,
      destination_value_recorded: false,
      required_credential_names_present: credentialNamesPresent,
      scenario_specific_confirm_token_present: confirmTokenPresent,
      scenario_specific_confirm_token_armed_by_build: false
    },

    would_permit_live_send: guard.permitted,
    blocked_reasons: guard.blockedReasons,
    send_time_preflight_required: true,
    authorizes_send_now: false,

    preflight_safety_attestations: {
      sms_sent: false,
      twilio_called: false,
      twilio_client_constructed: false,
      messages_create_called: false,
      credentials_loaded_or_inspected: false,
      destination_value_recorded: false,
      phone_number_recorded: false,
      email_address_recorded: false,
      raw_sid_recorded: false,
      network_or_external_call_made: false,
      confirm_token_armed: false,
      retry_performed: false,
      tracked_repo_file_modified: false,
      live_automation_remains_disabled: true
    },

    decision: 'M2_GUARDED_SEND_TIME_PREFLIGHT_COMPUTED_NO_SEND',
    launch_status: 'pilot_gated_not_unrestricted',
    safety_posture: 'demo_ready_with_live_automation_disabled',
    safety_status: 'demo_ready_with_live_automation_disabled'
  };
}

function runPreflight(options) {
  const opts = options || {};
  const result = buildPreflightResult();

  // Output goes to STDOUT (capturable). A /tmp sanitized copy is OPTIONAL (--write-tmp). NEVER a
  // tracked repository file — the preflight must leave `git status` byte-for-byte unchanged.
  const serialized = JSON.stringify(result, null, 2);
  if (opts.writeTmp) {
    fs.writeFileSync(PREFLIGHT_TMP_RESULT_PATH, serialized + '\n');
  }

  console.log('=== Build 219 — Guarded M2 Send-Time Preflight (NO SEND · NON-MUTATING) ===');
  console.log('Mode: PREFLIGHT · no Twilio · no client · no credentials · no destination value · no send · writes no tracked file.');
  console.log('Native body produced by bindRooferAlert: ' + result.native_workflow_body_production.body_produced_by_native_bindRooferAlert);
  console.log('Produced body equals signed M2 exactly: ' + result.native_workflow_body_production.produced_body_equals_signed_m2_exactly);
  console.log('Approval valid (M2 only, bound to 8d92939 + 21b840b, unconsumed): ' +
    (result.approval_guard.approval_valid_m2_only && result.approval_guard.approval_bound_to_build_217_commit_8d92939 &&
      result.approval_guard.approval_bound_to_build_218_commit_21b840b && result.approval_guard.approval_unconsumed));
  console.log('M1 remains permanently consumed/expired: ' + result.m1_consumption_guard.m1_remains_consumed_and_expired);
  console.log('Would permit live send now: ' + result.would_permit_live_send + ' (expected false during Build 219).');
  if (!result.would_permit_live_send) {
    console.log('Blocked reasons (preflight required before any attempt):');
    for (const r of result.blocked_reasons) console.log('  - ' + r);
  }
  if (opts.writeTmp) console.log('Sanitized result also written to (non-tracked /tmp): ' + PREFLIGHT_TMP_RESULT_PATH);
  console.log('--- BEGIN SANITIZED PREFLIGHT RESULT (stdout) ---');
  console.log(serialized);
  console.log('--- END SANITIZED PREFLIGHT RESULT (stdout) ---');
  console.log('Decision: ' + result.decision);
  return result;
}

// -------------------------------------------------------------------------------------------------
// LIVE SEND — only reachable with explicit `--arm-live-send`, every guard passing, and the
// scenario-specific token present. Exactly ONE messages.create. No loop. No retry. Consumes approval.
// Build 219 NEVER calls this.
// -------------------------------------------------------------------------------------------------
async function runArmedLiveSend() {
  const approvalRes = readJsonAt(APPROVAL_PACKET_PATH);
  const approval = approvalRes.ok ? approvalRes.value : null;
  const signedM2Text =
    approval && approval.signed_m2_approval ? approval.signed_m2_approval.selected_variant_text : null;

  const m1ApprovalRes = readJsonAt(M1_APPROVAL_PACKET_PATH);
  const m1Approval = m1ApprovalRes.ok ? m1ApprovalRes.value : null;

  let produced = { ok: false, body: null };
  try { produced = produceM2BodyViaNativeWorkflow(); } catch (e) { produced = { ok: false, body: null }; }

  const source = gatherSourceState();
  const destinationPresent = envPresent(DESTINATION_ENV_NAME);
  const credentialNamesPresent = REQUIRED_LIVE_CRED_ENV_NAMES.every(envPresent);

  const guard = evaluateM2GuardedSend({
    branch: source.branch,
    headEqualsOrigin: source.headEqualsOrigin,
    worktreeClean: source.worktreeClean,
    headSubject: source.headSubject,
    approval,
    m1Approval,
    producedBody: produced.body,
    signedM2Text,
    destinationCount: destinationPresent ? 1 : 0,
    credentialNamesPresent,
    confirmToken: process.env[CONFIRM_TOKEN_ENV_NAME],
    retryRequested: false
  });

  // Consume/expire the single-use approval BEFORE any attempt (fail-closed against re-runs). This is
  // the ONE intentional write the live path performs, and only when actually arming a live send.
  function consumeApproval(outcomeLabel) {
    if (!approval || !approval.signed_m2_approval) return;
    approval.signed_m2_approval.approval_consumed = true;
    approval.signed_m2_approval.approval_expired = true;
    approval.signed_m2_approval.approval_consumed_outcome = outcomeLabel;
    if (approval.next_decision_packet) approval.next_decision_packet.m2_approval_consumed = true;
    fs.writeFileSync(fullPath(APPROVAL_PACKET_PATH), JSON.stringify(approval, null, 2) + '\n');
  }

  if (!guard.permitted) {
    consumeApproval('blocked');
    console.error('BLOCKED — no SMS sent, no Twilio call, no client constructed. Reasons:');
    for (const r of guard.blockedReasons) console.error('  - ' + r);
    process.exit(3);
    return;
  }

  // Every gate passed AND the token is present. Consume first, then exactly one attempt.
  consumeApproval('attempted');
  let smsSent = false;
  let sendError = null;
  try {
    const twilio = require('twilio'); // lazy — required only here, after all gates passed.
    const client = twilio(process.env.TWILIO_LIVE_ACCOUNT_SID, process.env.TWILIO_LIVE_AUTH_TOKEN);
    const msg = await client.messages.create({
      to: process.env[DESTINATION_ENV_NAME], // entered silently; never printed or persisted.
      from: process.env.TWILIO_LIVE_FROM_NUMBER,
      body: produced.body // native-workflow-produced; verified === signed M2.
    });
    smsSent = true;
  } catch (err) {
    smsSent = false;
    sendError = { name: err && err.name ? err.name : 'Error', code: (err && err.code) || null };
  }

  console.log('SEND ATTEMPTS: 1 (no retry) · SMS SENT: ' + smsSent);
  console.log('APPROVAL CONSUMED/EXPIRED: true');
  process.exit(smsSent ? 0 : 3);
}

if (require.main === module) {
  const armLive = process.argv.includes('--arm-live-send');
  if (!armLive) {
    runPreflight({ writeTmp: process.argv.includes('--write-tmp') });
    process.exit(0);
  } else {
    runArmedLiveSend().catch((err) => {
      console.error('STOP: unexpected runner error; no auto-retry. ' + (err && err.message ? err.message : 'unknown'));
      process.exit(1);
    });
  }
}
