#!/usr/bin/env node
/**
 * Build 218 — M1 Guarded Live-Validation NEGATIVE GUARD TESTS (read-only, no send).
 *
 * Proves, locally and side-effect-free, that the guarded M1 runner FAILS CLOSED on every prohibited
 * condition. Drives the runner's PURE guard helpers (evaluateM1GuardedSend /
 * assertProducedBodyMatchesSignedM1 / assertSignedApprovalValid) plus the real native-workflow body
 * production (bindRooferAlert). Constructs NO provider client, calls NO messages.create, reads NO
 * credential value, records NO destination value, makes NO network call, and arms NO token. The
 * synthetic "dirty worktree" case is exercised purely through the guard's state object and never
 * touches the real worktree.
 */

const path = require('path');
const runner = require('./run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js');

const {
  EXACT_M1,
  EXACT_M2,
  M1_CONFIRM_TOKEN,
  EXPECTED_BUILD_218_SUBJECT,
  BOUND_BUILD_217_SOURCE_COMMIT,
  FORBIDDEN_GENERIC_BODIES,
  evaluateM1GuardedSend,
  assertProducedBodyMatchesSignedM1,
  assertSignedApprovalValid,
  produceM1BodyViaNativeWorkflow
} = runner;

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }

// A fully valid, signed, M1-only approval object (mirrors the real Build 218 artifact shape).
function validApproval() {
  return {
    signed_m1_approval: {
      approval_signed: true,
      approval_granted: true,
      scenario_key: 'new_roof_inspection_lead_alert',
      message_id: 'M1',
      channel: 'sms',
      selected_variant_text: EXACT_M1,
      max_message_count: 1,
      retry_allowed: false,
      approval_single_use: true,
      approval_consumed: false,
      approval_expired: false,
      authorizes_m1: true,
      authorizes_m2: false,
      m2_approved: false,
      bound_build_217_source_commit: BOUND_BUILD_217_SOURCE_COMMIT
    }
  };
}

// Baseline state where EVERY gate passes (the only permitted configuration).
function validState() {
  return {
    branch: 'main',
    headEqualsOrigin: true,
    worktreeClean: true,
    headSubject: EXPECTED_BUILD_218_SUBJECT,
    approval: validApproval(),
    producedBody: EXACT_M1,
    signedM1Text: EXACT_M1,
    destinationCount: 1,
    credentialNamesPresent: true,
    confirmToken: M1_CONFIRM_TOKEN,
    retryRequested: false
  };
}

console.log('== Build 218 M1 Guarded Negative Guard Tests (read-only, no send) ==');

// Sanity: the baseline must be permitted, otherwise the negatives prove nothing.
const baseline = evaluateM1GuardedSend(validState());
if (baseline.permitted !== true) fail('baseline valid state must be permitted (got blocked: ' + baseline.blockedReasons.join(', ') + ')');
pass('baseline_fully_valid_state_is_permitted');

// Helper: mutate one field, assert blocked, assert the expected reason appears.
function expectBlocked(label, mutate, expectedReasonSubstring) {
  const state = validState();
  mutate(state);
  const res = evaluateM1GuardedSend(state);
  if (res.permitted !== false) fail(label + ' — expected BLOCKED but guard permitted the send');
  if (expectedReasonSubstring && !res.blockedReasons.some((r) => r.includes(expectedReasonSubstring))) {
    fail(label + ' — blocked, but missing expected reason "' + expectedReasonSubstring + '" (got: ' + res.blockedReasons.join(', ') + ')');
  }
  pass(label);
}

// 1. M2 copy (wrong scenario message).
expectBlocked('blocks_m2_copy', (s) => { s.producedBody = EXACT_M2; }, 'produced_body_is_m2_not_m1');

// 2. Generic delivery-test copy.
expectBlocked('blocks_generic_delivery_test_copy', (s) => { s.producedBody = FORBIDDEN_GENERIC_BODIES[0]; }, 'produced_body_is_generic_or_stale_copy');

// 3. Empty body.
expectBlocked('blocks_empty_body', (s) => { s.producedBody = ''; }, 'produced_body_empty');

// 4. Modified M1 (one character changed).
expectBlocked('blocks_modified_m1', (s) => { s.producedBody = EXACT_M1 + ' '; }, 'produced_body_does_not_match_signed_m1_exactly');

// 5. Environment-overridden body — an externally supplied body that differs from native M1 is rejected.
{
  const overrideBody = 'RoofLeadHQ: env-overridden body that is not the native M1 copy.';
  const reasons = assertProducedBodyMatchesSignedM1(overrideBody, EXACT_M1);
  if (reasons.length === 0) fail('env-overridden body must be rejected by the binding guard');
  // And prove the native production path ignores the environment entirely.
  process.env.M1_LIVE_VALIDATION_BODY_OVERRIDE = overrideBody;
  process.env.OUTBOUND_BODY = overrideBody;
  const produced = produceM1BodyViaNativeWorkflow();
  delete process.env.M1_LIVE_VALIDATION_BODY_OVERRIDE;
  delete process.env.OUTBOUND_BODY;
  if (!produced.ok || produced.body !== EXACT_M1) fail('native body production must ignore any environment-provided body and produce exact M1');
  pass('blocks_environment_overridden_body_and_native_production_ignores_env');
}

// 6. Missing approval.
expectBlocked('blocks_missing_approval', (s) => { s.approval = null; }, 'approval_artifact_missing');

// 7. Unsigned approval.
expectBlocked('blocks_unsigned_approval', (s) => { s.approval.signed_m1_approval.approval_signed = false; }, 'approval_not_signed');

// 8. Consumed approval.
expectBlocked('blocks_consumed_approval', (s) => { s.approval.signed_m1_approval.approval_consumed = true; }, 'approval_already_consumed');

// 9. Wrong source chain (bound to the incorrect 8a7ad6b instead of verified 8d92939).
expectBlocked('blocks_wrong_source_chain', (s) => { s.approval.signed_m1_approval.bound_build_217_source_commit = '8a7ad6b'; }, 'approval_not_bound_to_build_217_commit_8d92939');

// 9b. M2 must remain unapproved (approval that tries to authorize M2).
expectBlocked('blocks_approval_that_authorizes_m2', (s) => { s.approval.signed_m1_approval.authorizes_m2 = true; }, 'approval_must_not_authorize_m2');

// 10. Dirty worktree (synthetic; never touches the real worktree).
expectBlocked('blocks_dirty_worktree', (s) => { s.worktreeClean = false; }, 'worktree_not_clean');

// 10b. HEAD not equal origin/main.
expectBlocked('blocks_head_not_equal_origin', (s) => { s.headEqualsOrigin = false; }, 'head_not_equal_origin_main');

// 10c. Wrong branch.
expectBlocked('blocks_branch_not_main', (s) => { s.branch = 'feature'; }, 'branch_not_main');

// 10d. Wrong HEAD subject.
expectBlocked('blocks_wrong_head_subject', (s) => { s.headSubject = 'test(workflow): something else'; }, 'head_subject_not_build_218');

// 11. Missing confirmation token.
expectBlocked('blocks_missing_confirm_token', (s) => { s.confirmToken = undefined; }, 'scenario_specific_confirm_token_absent_or_wrong');

// 12. Wrong confirmation token.
expectBlocked('blocks_wrong_confirm_token', (s) => { s.confirmToken = 'SEND_ONE_LIVE_SMS'; }, 'scenario_specific_confirm_token_absent_or_wrong');

// 13. Missing destination.
expectBlocked('blocks_missing_destination', (s) => { s.destinationCount = 0; }, 'destination_missing');

// 13b. Multiple destinations.
expectBlocked('blocks_multiple_destinations', (s) => { s.destinationCount = 2; }, 'multiple_destinations_present');

// 13c. Missing required credential names.
expectBlocked('blocks_missing_credential_names', (s) => { s.credentialNamesPresent = false; }, 'required_credential_names_absent');

// 14. Multiple-attempt / retry request.
expectBlocked('blocks_retry_or_multiple_attempt', (s) => { s.retryRequested = true; }, 'retry_or_multiple_attempt_requested');

// Independent proof that the native workflow really produces exact M1 (and never M2/generic).
{
  const produced = produceM1BodyViaNativeWorkflow();
  if (!produced.ok || produced.body !== EXACT_M1 || produced.messageId !== 'M1') fail('native bindRooferAlert must produce exact M1');
  if (produced.body === EXACT_M2) fail('native production must not produce M2');
  if (FORBIDDEN_GENERIC_BODIES.includes(produced.body)) fail('native production must not produce generic copy');
  if (assertSignedApprovalValid(validApproval()).length !== 0) fail('a fully valid approval must pass assertSignedApprovalValid');
  pass('native_workflow_produces_exact_m1_and_valid_approval_passes');
}

console.log('PASS: Build 218 negative guard tests — the guarded M1 runner fails closed on M2, generic, empty,');
console.log('      modified M1, env-overridden body, missing/unsigned/consumed approval, wrong source chain,');
console.log('      M2-authorizing approval, dirty worktree, wrong branch/HEAD/subject, missing/wrong confirm');
console.log('      token, missing/multiple destination, missing credential names, and retry/multi-attempt.');
console.log('PASS: Build 218 negative guard tests passed (' + passCount + ' assertions). No send, no client, no network, no secrets.');
