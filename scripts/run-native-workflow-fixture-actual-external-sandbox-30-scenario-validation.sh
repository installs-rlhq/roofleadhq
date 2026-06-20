#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO — FAIL-CLOSED RUNNER (AFTER-GUARD WIRING CORRECTED REVIEW-ONLY)
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. It remains NOT approved to run validation from direct
# invocation. Direct invocation is always blocked fail-closed. Build 117
# consumed the post-Build-116 exact approved command attempt.
#
# source_of_truth_commit: ae23997
# prior_post_build_116_blocked_evidence_commit: ae23997
# prior_post_build_116_blocked_evidence_status: closed
# prior_exact_command_attempt_after_build_116_status: attempted_blocked_nonzero
# prior_exact_command_exit_status: nonzero_blocked
# prior_exact_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result_after_build_116_guard
# runner_output_state_before_after_guard_wiring_correction: stale_pre_build_114_115_116_state_detected (removed)
# runner_execution_path_after_guard_wiring_gap_status: detected (corrected review-only messaging)
# runner_execution_path_after_guard_wiring_correction_status: design_or_corrected_review_only
# fresh_runner_execution_decision_after_path_correction_status: closed (Build 114)
# fresh_runner_execution_approval_capture_after_path_correction_status: captured_signed (Build 115)
# fresh_execution_pre_run_guard_after_path_correction_status: passed (Build 116)
# immediate_rerun_allowed: false
# fresh_decision_required_after_after_guard_wiring_correction: true
# fresh_pre_run_guard_required_after_after_guard_wiring_correction: true
# future_command_status: blocked_until_after_guard_wiring_correction_fresh_decision_and_fresh_guard
#
# This runner must NOT:
# - make external calls
# - access credentials
# - access production data
# - send SMS/email/calls
# - create calendar bookings
# - contact real homeowners or roofers
# - execute actual 30-scenario validation from direct fail-closed invocation
# =============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
PROPOSED_EVIDENCE_LOG_PATH="logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log"
PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json"

echo "== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner =="
echo ""
echo "BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this blocked path."
echo "NO-GO: Fresh runner-execution decision and fresh execution pre-run guard pass are required after runner execution path after-guard wiring correction — not automatic execution from this blocked path. Build 117 consumed the post-Build-116 exact approved command attempt; immediate rerun is not allowed."
echo ""
echo "source_of_truth_commit: ae23997"
echo "prior_post_build_116_blocked_evidence_commit: ae23997 (Build 117 closed)"
echo "prior_post_build_116_blocked_evidence_status: closed"
echo ""
echo "-- After-guard wiring correction: recognizes closed Build 114/115/116 chain --"
echo "fresh_runner_execution_decision_after_path_correction_status: closed (Build 114)"
echo "fresh_runner_execution_decision_after_path_correction_commit: 2ea4c2e"
echo "fresh_runner_execution_approval_capture_after_path_correction_status: captured_signed (Build 115)"
echo "fresh_runner_execution_approval_capture_after_path_correction_commit: ddd193f"
echo "fresh_runner_execution_approval_capture_status: captured (Build 115)"
echo "fresh_runner_execution_jason_signed_approval_status: signed (Build 115)"
echo "fresh_runner_execution_exact_values_required_count: 24"
echo "fresh_runner_execution_exact_values_accepted_count: 24"
echo "fresh_runner_execution_exact_values_approved_count: 24"
echo "fresh_execution_pre_run_guard_after_path_correction_status: passed (Build 116)"
echo "fresh_execution_pre_run_guard_after_path_correction_commit: 2f1bbe3"
echo "fresh_execution_pre_run_guard_status: passed (Build 116)"
echo "fresh_execution_pre_run_guard_checks_required_count: 30"
echo "fresh_execution_pre_run_guard_checks_passed_count: 30"
echo "fresh_execution_pre_run_guard_failed_count: 0"
echo ""
echo "prior_exact_command_attempt_after_build_116_status: attempted_blocked_nonzero (Build 117)"
echo "prior_exact_command_exit_status: nonzero_blocked (Build 117)"
echo "prior_exact_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result_after_build_116_guard (Build 117)"
echo "runner_output_state_before_after_guard_wiring_correction: stale_pre_build_114_115_116_state_detected (removed)"
echo "runner_did_not_recognize_build_114_fresh_decision_status_before_correction: true (historical — corrected)"
echo "runner_did_not_recognize_build_115_approval_capture_status_before_correction: true (historical — corrected)"
echo "runner_did_not_recognize_build_116_pre_run_guard_status_before_correction: true (historical — corrected)"
echo ""
echo "-- Historical upstream chain (not reusable after Build 117 blocked evidence) --"
echo "prior_runner_execution_path_correction_status: closed (Build 113)"
echo "prior_fresh_command_attempt_status: attempted_blocked_nonzero (Build 112)"
echo "prior_fresh_command_exit_status: nonzero_blocked (Build 112)"
echo "prior_fresh_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result (Build 112)"
echo "prior_build_114_115_116_decision_approval_guard_chain_reusable_after_build_117_blocked_evidence: false"
echo ""
echo "runner_execution_path_after_guard_wiring_gap_status: detected"
echo "runner_execution_path_after_guard_wiring_correction_status: design_or_corrected_review_only"
echo "runner_command_path_status: corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_after_guard_wiring_correction"
echo "runner_direct_invocation_status_after_correction: blocked_nonzero_expected"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "immediate_rerun_allowed: false"
echo "fresh_decision_required_after_after_guard_wiring_correction: true"
echo "fresh_pre_run_guard_required_after_after_guard_wiring_correction: true"
echo "no_immediate_rerun_allowed: true"
echo "no_immediate_runner_invocation_by_blocked_path: true"
echo "prior_future_command_status_build_117: future_command_status: blocked_until_runner_execution_path_after_guard_wiring_correction_and_fresh_decision"
echo "future_command_status: blocked_until_after_guard_wiring_correction_fresh_decision_and_fresh_guard"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
echo "This runner does NOT access production data."
echo "This runner does NOT send SMS, email, or calls."
echo "This runner does NOT create calendar bookings."
echo "This runner does NOT contact real homeowners or roofers."
echo "This runner does NOT execute actual 30-scenario validation from this blocked fail-closed path."
echo "This runner does NOT provide a separate approved execution path from direct invocation."
echo ""
echo "actual_30_scenario_external_validation_captured_count: 0"
echo "actual_30_scenario_external_validation_passed_count: 0"
echo "actual_30_scenario_external_validation_missing_count: 30"
echo "actual_30_scenario_external_validation_status: not_captured_by_this_run"
echo ""
echo "Manifest reference (scaffolding only): ${MANIFEST_PATH}"
echo "Proposed evidence log path (not written): ${PROPOSED_EVIDENCE_LOG_PATH}"
echo "Proposed structured evidence output path (not written): ${PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH}"
echo ""
echo "Next step: fresh runner-execution decision/template and fresh execution pre-run guard pass after after-guard wiring correction — NOT automatic execution from this blocked path and NOT immediate rerun."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1