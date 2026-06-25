#!/usr/bin/env node
/**
 * Build 219 — M2 Guarded Live-Validation NEGATIVE GUARD TESTS (read-only, no send).
 *
 * Proves, locally and side-effect-free, that the guarded M2 runner FAILS CLOSED on every prohibited
 * condition. Drives the runner's PURE guard helpers (evaluateM2GuardedSend /
 * assertProducedBodyMatchesSignedM2 / assertSignedApprovalValid / assertM1RemainsConsumed) plus the
 * real native-workflow body production (bindRooferAlert). Constructs NO provider client, calls NO
 * messages.create, reads NO credential value, records NO destination value, makes NO network call,
 * arms NO token, and writes NO tracked file. The synthetic "dirty worktree" case is exercised purely
 * through the guard's state object and never touches the real worktree.
 */

const runner = require('./run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js');

const {
  EXACT_M1,
  EXACT_M2,
  M2_CONFIRM_TOKEN,
  EXPECTED_BUILD_219_SUBJECT,
  BOUND_BUILD_217_SOURCE_COMMIT,
  VERIFIED_BUILD_218_COMMIT,
  FORBIDDEN_GENERIC_BODIES,
  evaluateM2GuardedSend,
  assertProducedBodyMatchesSignedM2,
  assertSignedApprovalValid,
  assertM1RemainsConsumed,
  produceM2BodyViaNativeWorkflow
} = runner;

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }

// A fully valid, signed, M2-only approval object (mirrors the real Build 219 artifact shape).
function validApproval() {
  return {
    signed_m2_approval: {
      approval_signed: true,
      approval_granted: true,
      scenario_key: 'missed_or_slow_lead_follow_up_nudge',
      message_id: 'M2',
      channel: 'sms',
      selected_variant_text: EXACT_M2,
      max_message_count: 1,
      retry_allowed: false,
      approval_single_use: true,
      approval_consumed: false,
      approval_expired: false,
      authorizes_m2: true,
      authorizes_m1: false,
      m1_approved: false,
      bound_build_217_source_commit: BOUND_BUILD_217_SOURCE_COMMIT,
      verified_build_218_commit: VERIFIED_BUILD_218_COMMIT
    }
  };
}

// A consumed/expired M1 approval (M1 is permanently consumed after Build 218's authorized attempt).
function consumedM1Approval() {
  return { signed_m1_approval: { approval_consumed: true, approval_expired: true } };
}

// Baseline state where EVERY gate passes (the only permitted configuration).
function validState() {
  return {
    branch: 'main',
    headEqualsOrigin: true,
    worktreeClean: true,
    headSubject: EXPECTED_BUILD_219_SUBJECT,
    approval: validApproval(),
    m1Approval: consumedM1Approval(),
    producedBody: EXACT_M2,
    signedM2Text: EXACT_M2,
    destinationCount: 1,
    credentialNamesPresent: true,
    confirmToken: M2_CONFIRM_TOKEN,
    retryRequested: false
  };
}

console.log('== Build 219 M2 Guarded Negative Guard Tests (read-only, no send) ==');

// Sanity: the baseline must be permitted, otherwise the negatives prove nothing.
const baseline = evaluateM2GuardedSend(validState());
if (baseline.permitted !== true) fail('baseline valid state must be permitted (got blocked: ' + baseline.blockedReasons.join(', ') + ')');
pass('baseline_fully_valid_state_is_permitted');

// Helper: mutate one field, assert blocked, assert the expected reason appears.
function expectBlocked(label, mutate, expectedReasonSubstring) {
  const state = validState();
  mutate(state);
  const res = evaluateM2GuardedSend(state);
  if (res.permitted !== false) fail(label + ' — expected BLOCKED but guard permitted the send');
  if (expectedReasonSubstring && !res.blockedReasons.some((r) => r.includes(expectedReasonSubstring))) {
    fail(label + ' — blocked, but missing expected reason "' + expectedReasonSubstring + '" (got: ' + res.blockedReasons.join(', ') + ')');
  }
  pass(label);
}

// 1. M1 copy (wrong scenario message) — any attempt to reuse M1's body is blocked.
expectBlocked('blocks_m1_body', (s) => { s.producedBody = EXACT_M1; }, 'produced_body_is_m1_not_m2');

// 2. Generic delivery-test copy.
expectBlocked('blocks_generic_delivery_test_copy', (s) => { s.producedBody = FORBIDDEN_GENERIC_BODIES[0]; }, 'produced_body_is_generic_or_stale_copy');

// 3. Empty body.
expectBlocked('blocks_empty_body', (s) => { s.producedBody = ''; }, 'produced_body_empty');

// 4. Modified M2 (one character changed).
expectBlocked('blocks_modified_m2', (s) => { s.producedBody = EXACT_M2 + ' '; }, 'produced_body_does_not_match_signed_m2_exactly');

// 5. Environment-overridden body — an externally supplied body that differs from native M2 is rejected.
{
  const overrideBody = 'RoofLeadHQ: env-overridden body that is not the native M2 copy.';
  const reasons = assertProducedBodyMatchesSignedM2(overrideBody, EXACT_M2);
  if (reasons.length === 0) fail('env-overridden body must be rejected by the binding guard');
  // And prove the native production path ignores the environment entirely.
  process.env.M2_LIVE_VALIDATION_BODY_OVERRIDE = overrideBody;
  process.env.OUTBOUND_BODY = overrideBody;
  const produced = produceM2BodyViaNativeWorkflow();
  delete process.env.M2_LIVE_VALIDATION_BODY_OVERRIDE;
  delete process.env.OUTBOUND_BODY;
  if (!produced.ok || produced.body !== EXACT_M2) fail('native body production must ignore any environment-provided body and produce exact M2');
  pass('blocks_environment_overridden_body_and_native_production_ignores_env');
}

// 6. Missing approval.
expectBlocked('blocks_missing_approval', (s) => { s.approval = null; }, 'approval_artifact_missing');

// 7. Unsigned approval.
expectBlocked('blocks_unsigned_approval', (s) => { s.approval.signed_m2_approval.approval_signed = false; }, 'approval_not_signed');

// 8. Consumed approval.
expectBlocked('blocks_consumed_approval', (s) => { s.approval.signed_m2_approval.approval_consumed = true; }, 'approval_already_consumed');

// 9. Wrong source chain (bound to the incorrect 8a7ad6b instead of verified 8d92939).
expectBlocked('blocks_wrong_source_chain_217', (s) => { s.approval.signed_m2_approval.bound_build_217_source_commit = '8a7ad6b'; }, 'approval_not_bound_to_build_217_commit_8d92939');

// 9a. Wrong Build 218 binding.
expectBlocked('blocks_wrong_build_218_binding', (s) => { s.approval.signed_m2_approval.verified_build_218_commit = 'deadbee'; }, 'approval_not_bound_to_build_218_commit_21b840b');

// 9b. M1 must remain unapproved (approval that tries to authorize M1).
expectBlocked('blocks_approval_that_authorizes_m1', (s) => { s.approval.signed_m2_approval.authorizes_m1 = true; }, 'approval_must_not_authorize_m1');

// 9c. Any attempt to reuse M1 — M1 approval no longer consumed/expired must fail closed.
expectBlocked('blocks_attempt_to_reuse_m1_not_consumed', (s) => { s.m1Approval = { signed_m1_approval: { approval_consumed: false, approval_expired: false } }; }, 'm1_approval_not_consumed');
expectBlocked('blocks_missing_m1_consumption_proof', (s) => { s.m1Approval = null; }, 'm1_approval_artifact_missing');

// 10. Dirty worktree (synthetic; never touches the real worktree).
expectBlocked('blocks_dirty_worktree', (s) => { s.worktreeClean = false; }, 'worktree_not_clean');

// 10b. HEAD not equal origin/main.
expectBlocked('blocks_head_not_equal_origin', (s) => { s.headEqualsOrigin = false; }, 'head_not_equal_origin_main');

// 10c. Wrong branch.
expectBlocked('blocks_branch_not_main', (s) => { s.branch = 'feature'; }, 'branch_not_main');

// 10d. Wrong HEAD subject.
expectBlocked('blocks_wrong_head_subject', (s) => { s.headSubject = 'test(workflow): something else'; }, 'head_subject_not_build_219');

// 11. Missing confirmation token.
expectBlocked('blocks_missing_confirm_token', (s) => { s.confirmToken = undefined; }, 'scenario_specific_confirm_token_absent_or_wrong');

// 12. Wrong confirmation token (including the M1 token — M1's token must never arm M2).
expectBlocked('blocks_wrong_confirm_token', (s) => { s.confirmToken = 'SEND_ONE_LIVE_SMS'; }, 'scenario_specific_confirm_token_absent_or_wrong');
expectBlocked('blocks_m1_confirm_token_for_m2', (s) => { s.confirmToken = 'SEND_ONE_M1_LIVE_VALIDATION_SMS'; }, 'scenario_specific_confirm_token_absent_or_wrong');

// 13. Missing destination.
expectBlocked('blocks_missing_destination', (s) => { s.destinationCount = 0; }, 'destination_missing');

// 13b. Multiple destinations.
expectBlocked('blocks_multiple_destinations', (s) => { s.destinationCount = 2; }, 'multiple_destinations_present');

// 13c. Missing required credential names.
expectBlocked('blocks_missing_credential_names', (s) => { s.credentialNamesPresent = false; }, 'required_credential_names_absent');

// 14. Multiple-attempt / retry request.
expectBlocked('blocks_retry_or_multiple_attempt', (s) => { s.retryRequested = true; }, 'retry_or_multiple_attempt_requested');

// Independent proof that the native workflow really produces exact M2 (and never M1/generic).
{
  const produced = produceM2BodyViaNativeWorkflow();
  if (!produced.ok || produced.body !== EXACT_M2 || produced.messageId !== 'M2') fail('native bindRooferAlert must produce exact M2');
  if (produced.body === EXACT_M1) fail('native production must not produce M1');
  if (FORBIDDEN_GENERIC_BODIES.includes(produced.body)) fail('native production must not produce generic copy');
  if (assertSignedApprovalValid(validApproval()).length !== 0) fail('a fully valid approval must pass assertSignedApprovalValid');
  if (assertM1RemainsConsumed(consumedM1Approval()).length !== 0) fail('a consumed M1 approval must pass assertM1RemainsConsumed');
  pass('native_workflow_produces_exact_m2_and_valid_approval_passes_and_m1_stays_consumed');
}

console.log('PASS: Build 219 negative guard tests — the guarded M2 runner fails closed on M1, generic, empty,');
console.log('      modified M2, env-overridden body, missing/unsigned/consumed approval, wrong source chain,');
console.log('      wrong Build 218 binding, M1-authorizing approval, any attempt to reuse M1, missing M1');
console.log('      consumption proof, dirty worktree, wrong branch/HEAD/subject, missing/wrong confirm token,');
console.log('      missing/multiple destination, missing credential names, and retry/multi-attempt.');
console.log('PASS: Build 219 negative guard tests passed (' + passCount + ' assertions). No send, no client, no network, no secrets.');
