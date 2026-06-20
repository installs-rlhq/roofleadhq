#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Runner Execution Path After-After-After-Guard Fresh-Chain Wiring Correction Dry Run =="
echo "Mode: local runner execution path after-after-after-guard fresh-chain wiring correction only; review-only; not external validation; not activation; non-executing."
echo "This wrapper validates committed runner execution path after-after-after-guard fresh-chain wiring correction packet artifacts — it does NOT run the runner for validation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 0e7db2d. Build 127 post-Build-126 blocked evidence packet (0e7db2d) is referenced and verified."
echo "Build 126 fresh execution pre-run guard after after-after-guard fresh-chain wiring correction (4597948) is referenced and verified."
echo "Build 125 fresh runner-execution approval capture after after-after-guard fresh-chain wiring correction (68c220d) is referenced and verified."
echo "Build 124 fresh runner-execution decision after after-after-guard fresh-chain wiring correction (e96c82c) is referenced and verified."
echo "Build 123 runner execution path after-after-guard fresh-chain wiring correction (c678189) is referenced and verified."
echo "runner_execution_path_after_after_after_guard_fresh_chain_wiring_gap_status is detected."
echo "runner_execution_path_after_after_after_guard_fresh_chain_wiring_correction_status is design_or_corrected_review_only."
echo "prior_exact_command_attempt_after_build_126_status is attempted_blocked_nonzero. prior_exact_command_exit_status is nonzero_blocked."
echo "prior_command_attempt_consumption_status is consumed_by_blocked_fail_closed_result_after_build_126_guard."
echo "runner_output_state_after_build_126_status was stale_pre_build_123_124_125_126_state_detected (removed)."
echo "immediate_rerun_allowed is false. fresh_decision_required_after_after_after_guard_fresh_chain_wiring_correction is true."
echo "fresh_pre_run_guard_required_after_after_after_guard_fresh_chain_wiring_correction is true."
echo "fresh_runner_execution_decision_after_after_after_guard_fresh_chain_wiring_correction_status is closed. fresh_runner_execution_approval_capture_after_after_after_guard_fresh_chain_wiring_correction_status is captured_signed."
echo "fresh_execution_pre_run_guard_after_after_after_guard_fresh_chain_wiring_correction_status is passed."
echo "runner_command_path_status is corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_after_after_guard_fresh_chain_wiring_correction."
echo "runner_command_rerun_by_this_packet is false."
echo "runner_execution_status is not_run_by_this_packet. command_execution_status is not_run_by_this_packet."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "incoming future_command_status was blocked_until_runner_execution_path_after_after_after_guard_fresh_chain_wiring_correction_and_fresh_decision."
echo "corrected future_command_status is blocked_until_after_after_after_guard_fresh_chain_wiring_correction_fresh_decision_and_fresh_guard."
echo "approved_for_activation_now is false. Build 127 consumed the post-Build-126 attempt. Next step is fresh runner-execution decision and fresh execution pre-run guard after after-after-after-guard fresh-chain wiring correction, not immediate rerun."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-after-after-guard-fresh-chain-wiring-correction-readonly.js
echo "PASS: runner execution path after-after-after-guard fresh-chain wiring correction verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-after-after-guard-fresh-chain-wiring-correction-readonly.js

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
if echo "$RUNNER_OUTPUT" | grep -q "future_command_status: blocked_until_after_after_after_guard_fresh_chain_wiring_correction_fresh_decision_and_fresh_guard"; then
  echo "PASS: fail-closed sanity check confirmed corrected future_command_status."
else
  echo "FAIL: fail-closed sanity check missing corrected future_command_status."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "runner_execution_path_after_after_guard_fresh_chain_wiring_correction_status: design_or_corrected_review_only (Build 123)"; then
  echo "PASS: fail-closed sanity check confirmed Build 123 after-after-guard fresh-chain wiring correction recognized."
else
  echo "FAIL: fail-closed sanity check missing Build 123 after-after-guard fresh-chain wiring correction recognition."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "fresh_runner_execution_decision_after_after_after_guard_fresh_chain_wiring_correction_status: closed (Build 124)"; then
  echo "PASS: fail-closed sanity check confirmed Build 124 fresh decision recognized."
else
  echo "FAIL: fail-closed sanity check missing Build 124 fresh decision recognition."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "fresh_runner_execution_approval_capture_after_after_after_guard_fresh_chain_wiring_correction_status: captured_signed (Build 125)"; then
  echo "PASS: fail-closed sanity check confirmed Build 125 approval capture recognized."
else
  echo "FAIL: fail-closed sanity check missing Build 125 approval capture recognition."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "fresh_execution_pre_run_guard_after_after_after_guard_fresh_chain_wiring_correction_status: passed (Build 126)"; then
  echo "PASS: fail-closed sanity check confirmed Build 126 pre-run guard recognized."
else
  echo "FAIL: fail-closed sanity check missing Build 126 pre-run guard recognition."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "prior_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result_after_build_126_guard"; then
  echo "PASS: fail-closed sanity check confirmed Build 127 consumed post-Build-126 attempt."
else
  echo "FAIL: fail-closed sanity check missing Build 127 consumed post-Build-126 attempt status."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "future_command_status: blocked_until_after_after_guard_fresh_chain_wiring_correction_fresh_decision_and_fresh_guard"; then
  echo "FAIL: fail-closed sanity check still emits stale blocked_until_after_after_guard_fresh_chain_wiring_correction_fresh_decision_and_fresh_guard as primary future_command_status."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "ready_for_exact_approved_runner_execution_command_after_after_after_guard_fresh_chain_wiring_correction_guard_review_only"; then
  echo "FAIL: fail-closed sanity check still emits stale ready_for_exact_approved_runner_execution_command_after_after_after_guard_fresh_chain_wiring_correction_guard_review_only."
  exit 1
fi
if echo "$RUNNER_OUTPUT" | grep -q "Build 122 consumed the post-Build-121 exact approved command attempt"; then
  echo "FAIL: fail-closed sanity check still emits stale Build 122-era primary NO-GO message."
  exit 1
fi
echo "PASS: fail-closed sanity check confirmed non-zero blocked exit and corrected after-after-after-guard fresh-chain wiring state (sanity only, not validation)."

echo "PASS: Native Workflow Fixture Runner Execution Path After-After-After-Guard Fresh-Chain Wiring Correction Dry Run wrapper passed."
echo "Note: This packet corrects runner execution path after-after-after-guard fresh-chain wiring messaging/design only — it does NOT rerun the runner for validation."
echo "Note: This packet does NOT perform actual 30-scenario validation."
echo "Note: Build 127 consumed the post-Build-126 exact approved command attempt. Immediate rerun is not allowed."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Controlled real roofer setup and live activation remain blocked."
echo "Note: Next step is fresh runner-execution decision and fresh execution pre-run guard after after-after-after-guard fresh-chain wiring correction, not immediate rerun."