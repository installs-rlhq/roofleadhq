#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO — FAIL-CLOSED RUNNER (FRESH EXECUTION PRE-RUN GUARD PASSED)
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. It remains NOT approved to run validation from direct
# invocation without explicit separate exact approved command execution review.
#
# prior_runner_execution_approval_capture_status: captured (Build 105)
# prior_execution_pre_run_guard_status: passed (Build 106)
# prior_one_time_execution_attempt_consumption_status: consumed_by_blocked_attempt (Build 107)
# runner_state_wiring_correction_status: corrected_review_only (Build 108)
# fresh_runner_execution_approval_capture_status: captured (Build 110)
# fresh_runner_execution_jason_signed_approval_status: signed (Build 110)
# fresh_execution_pre_run_guard_status: passed (Build 111)
# runner_command_path_status: corrected_fail_closed_ready_for_exact_approved_execution_after_guard
# future_command_status: ready_for_exact_approved_runner_execution_command_review_only
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
echo "NO-GO: Exact approved runner execution command review in Terminal 1 from /root/roofleadhq is the next step — not automatic execution from this blocked path."
echo ""
echo "prior_runner_execution_approval_capture_status: captured (Build 105)"
echo "prior_runner_execution_jason_signed_approval_status: signed"
echo "prior_runner_execution_exact_values_required_count: 24"
echo "prior_runner_execution_exact_values_accepted_count: 24"
echo "prior_runner_execution_exact_values_approved_count: 24"
echo "prior_execution_pre_run_guard_status: passed (Build 106)"
echo "prior_execution_pre_run_guard_checks_required_count: 30"
echo "prior_execution_pre_run_guard_checks_passed_count: 30"
echo "prior_execution_pre_run_guard_failed_count: 0"
echo "exact_command_attempted_once_status: attempted_blocked_nonzero (Build 107)"
echo "prior_one_time_execution_attempt_consumption_status: consumed_by_blocked_attempt"
echo "runner_state_wiring_correction_status: corrected_review_only"
echo "fresh_runner_execution_approval_capture_status: captured (Build 110)"
echo "fresh_runner_execution_jason_signed_approval_status: signed (Build 110)"
echo "fresh_runner_execution_exact_values_required_count: 24"
echo "fresh_runner_execution_exact_values_accepted_count: 24"
echo "fresh_runner_execution_exact_values_approved_count: 24"
echo "fresh_runner_execution_approval_status: granted_scoped_one_time_pending_fresh_execution_pre_run_guard"
echo "fresh_execution_pre_run_guard_status: passed (Build 111)"
echo "fresh_execution_pre_run_guard_checks_required_count: 30"
echo "fresh_execution_pre_run_guard_checks_passed_count: 30"
echo "fresh_execution_pre_run_guard_failed_count: 0"
echo "prior_runner_command_path_status_build_108: runner_command_path_status: corrected_fail_closed_pending_fresh_exact_execution_decision"
echo "runner_command_path_status: corrected_fail_closed_ready_for_exact_approved_execution_after_guard"
echo "runner_direct_invocation_status_after_fresh_guard: blocked_nonzero_expected"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "fresh_exact_execution_decision_required: true"
echo "fresh_execution_pre_run_guard_required: true"
echo "no_immediate_rerun_allowed: true"
echo "no_immediate_runner_invocation_by_blocked_path: true"
echo "prior_future_command_status_build_108: future_command_status: blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass"
echo "future_command_status: ready_for_exact_approved_runner_execution_command_review_only"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
echo "This runner does NOT access production data."
echo "This runner does NOT send SMS, email, or calls."
echo "This runner does NOT create calendar bookings."
echo "This runner does NOT contact real homeowners or roofers."
echo "This runner does NOT execute actual 30-scenario validation from this blocked fail-closed path."
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
echo "Next step: exact approved runner execution command review in Terminal 1 from /root/roofleadhq — NOT automatic execution from this blocked path."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1