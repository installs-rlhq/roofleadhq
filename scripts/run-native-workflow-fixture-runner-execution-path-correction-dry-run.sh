#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Runner Execution Path Correction Dry Run =="
echo "Mode: local runner execution path correction only; review-only; not external validation; not activation; non-executing."
echo "This wrapper validates committed runner execution path correction packet artifacts — it does NOT run the runner for validation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 847592a. Build 112 capture fresh runner command blocked evidence packet (847592a) is referenced and verified."
echo "Build 111 fresh execution pre-run guard packet (135b367) is referenced and verified."
echo "Build 110 fresh signed runner-execution approval capture packet (a1f4dd7) is referenced and verified."
echo "Build 108 runner state wiring correction (77f2a00) and Build 107 blocked command evidence (4a618fa) are referenced."
echo "runner_execution_path_gap_status is detected."
echo "runner_execution_path_correction_status is design_or_corrected_review_only."
echo "prior_fresh_command_attempt_status is attempted_blocked_nonzero. prior_fresh_command_exit_status is nonzero_blocked."
echo "prior_fresh_command_attempt_consumption_status is consumed_by_blocked_fail_closed_result."
echo "immediate_rerun_allowed is false. fresh_decision_required_after_correction is true."
echo "fresh_pre_run_guard_required_after_correction is true."
echo "fresh_runner_execution_approval_capture_status is captured. fresh_runner_execution_jason_signed_approval_status is signed."
echo "fresh_execution_pre_run_guard_status is passed. fresh_execution_pre_run_guard_checks_required_count is 30."
echo "fresh_execution_pre_run_guard_checks_passed_count is 30. fresh_execution_pre_run_guard_failed_count is 0."
echo "runner_command_path_status is corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_execution_path_correction."
echo "runner_command_rerun_by_this_packet is false."
echo "runner_execution_status is not_run_to_validation_by_this_packet. command_execution_status is not_run_to_validation_by_this_packet."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "incoming future_command_status was blocked_until_runner_execution_path_correction_and_fresh_decision."
echo "corrected future_command_status is blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_runner_execution_path_correction."
echo "approved_for_activation_now is false. Build 112 consumed the fresh attempt. Next step is fresh runner-execution decision/template and fresh execution pre-run guard, not immediate rerun."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-runner-execution-path-correction-readonly.js
echo "PASS: runner execution path correction verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-runner-execution-path-correction-readonly.js

echo ""
echo "== FAIL-CLOSED SANITY CHECK ONLY (not validation) =="
echo "Controlled direct invocation sanity check: expects non-zero exit, no external calls/credentials/production/real contact."
set +e
RUNNER_OUTPUT="$(bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh 2>&1)"
RUNNER_EXIT=$?
set -e
if [[ "$RUNNER_EXIT" -ne 1 ]]; then
  echo "FAIL: fail-closed sanity check expected exit 1 (got ${RUNNER_EXIT})"
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "future_command_status: blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_runner_execution_path_correction"; then
  echo "PASS: fail-closed sanity check confirmed corrected future_command_status."
else
  echo "FAIL: fail-closed sanity check missing corrected future_command_status."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "ready_for_exact_approved_runner_execution_command_review_only"; then
  echo "FAIL: fail-closed sanity check still emits stale ready_for_exact_approved_runner_execution_command_review_only."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "corrected_fail_closed_ready_for_exact_approved_execution_after_guard"; then
  echo "FAIL: fail-closed sanity check still emits stale corrected_fail_closed_ready_for_exact_approved_execution_after_guard."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "prior_fresh_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result"; then
  echo "PASS: fail-closed sanity check confirmed Build 112 consumed fresh attempt."
else
  echo "FAIL: fail-closed sanity check missing Build 112 consumed fresh attempt status."
  exit 1
fi
echo "PASS: fail-closed sanity check confirmed non-zero blocked exit and corrected execution path state (sanity only, not validation)."

echo "PASS: Native Workflow Fixture Runner Execution Path Correction Dry Run wrapper passed."
echo "Note: This packet corrects runner execution path messaging/design only — it does NOT rerun the runner for validation."
echo "Note: This packet does NOT perform actual 30-scenario validation."
echo "Note: Build 112 consumed the fresh one-time attempt. Immediate rerun is not allowed."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Controlled real roofer setup and live activation remain blocked."
echo "Note: Next step is fresh runner-execution decision/template and fresh execution pre-run guard, not immediate rerun."