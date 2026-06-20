#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Runner State Wiring Correction Dry Run =="
echo "Mode: local runner state wiring correction only; review-only; not external validation; not activation; non-executing."
echo "This wrapper validates committed runner state wiring correction packet artifacts — it does NOT run the runner for validation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 4a618fa. Build 107 capture runner command blocked evidence packet (4a618fa) is referenced and verified."
echo "Build 106 runner-execution pre-run guard packet (b834baa) is referenced and verified."
echo "Build 105 signed runner-execution approval capture packet (bb0bc14) is referenced and verified."
echo "Build 104 runner-execution exact approval template packet (67393ed) and Build 103 runner scaffolding build (145bf15) are referenced."
echo "runner_state_wiring_gap_status_before_packet is detected."
echo "runner_state_wiring_correction_status is corrected_review_only."
echo "exact_command_attempted_once_status is attempted_blocked_nonzero."
echo "prior_one_time_execution_attempt_consumption_status is consumed_by_blocked_attempt."
echo "fresh_exact_execution_decision_required is true. fresh_execution_pre_run_guard_required is true."
echo "prior_runner_execution_approval_capture_status is captured. prior_runner_execution_jason_signed_approval_status is signed."
echo "prior_runner_execution_exact_values_required_count is 24. prior_runner_execution_exact_values_accepted_count is 24. prior_runner_execution_exact_values_approved_count is 24."
echo "prior_execution_pre_run_guard_status is passed. execution_pre_run_guard_checks_required_count is 30."
echo "execution_pre_run_guard_checks_passed_count is 30. execution_pre_run_guard_failed_count is 0."
echo "runner_command_path_status is corrected_fail_closed_pending_fresh_exact_execution_decision."
echo "runner_command_rerun_by_this_packet is false."
echo "runner_execution_status is not_run_to_validation_by_this_packet. command_execution_status is not_run_to_validation_by_this_packet."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass."
echo "approved_for_activation_now is false. Next step is fresh exact runner-execution decision/template and fresh execution pre-run guard, not immediate rerun."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-runner-state-wiring-correction-readonly.js
echo "PASS: runner state wiring correction verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-runner-state-wiring-correction-readonly.js

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
if echo "$RUNNER_OUTPUT" | grep -q "future_command_status: blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass"; then
  echo "PASS: fail-closed sanity check confirmed corrected future_command_status."
else
  echo "FAIL: fail-closed sanity check missing corrected future_command_status."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "runner_execution_approval_status: not_granted"; then
  echo "FAIL: fail-closed sanity check still emits stale runner_execution_approval_status not_granted."
  exit 1
fi
echo "PASS: fail-closed sanity check confirmed non-zero blocked exit and corrected state (sanity only, not validation)."

echo "PASS: Native Workflow Fixture Runner State Wiring Correction Dry Run wrapper passed."
echo "Note: This packet fixes runner state messaging/wiring only — it does NOT rerun the runner for validation."
echo "Note: This packet does NOT perform actual 30-scenario validation."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Controlled real roofer setup and live activation remain blocked."
echo "Note: Next step is fresh exact runner-execution decision/template and fresh execution pre-run guard, not immediate rerun."