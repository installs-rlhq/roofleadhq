#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO — FAIL-CLOSED RUNNER (STATE WIRING CORRECTED)
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. It remains NOT approved to run validation now.
#
# prior_runner_execution_approval_capture_status: captured (Build 105)
# prior_execution_pre_run_guard_status: passed (Build 106)
# prior_one_time_execution_attempt_consumption_status: consumed_by_blocked_attempt (Build 107)
# runner_state_wiring_correction_status: corrected_review_only
# runner_command_path_status: corrected_fail_closed_pending_fresh_exact_execution_decision
# future_command_status: blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass
#
# This runner must NOT:
# - make external calls
# - access credentials
# - access production data
# - send SMS/email/calls
# - create calendar bookings
# - contact real homeowners or roofers
# - execute actual 30-scenario validation without fresh exact execution decision
#   and fresh execution pre-run guard pass
# =============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
PROPOSED_EVIDENCE_LOG_PATH="logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log"
PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json"

echo "== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner =="
echo ""
echo "BLOCKED: This runner remains fail-closed and is NOT approved to run validation now."
echo "NO-GO: Fresh exact runner-execution decision and fresh execution pre-run guard are required before any future attempt."
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
echo "runner_command_path_status: corrected_fail_closed_pending_fresh_exact_execution_decision"
echo "runner_direct_invocation_status_after_correction: blocked_nonzero_expected"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "fresh_exact_execution_decision_required: true"
echo "fresh_execution_pre_run_guard_required: true"
echo "no_immediate_rerun_allowed: true"
echo "future_command_status: blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
echo "This runner does NOT access production data."
echo "This runner does NOT send SMS, email, or calls."
echo "This runner does NOT create calendar bookings."
echo "This runner does NOT contact real homeowners or roofers."
echo "This runner does NOT execute actual 30-scenario validation without fresh exact execution decision and fresh execution pre-run guard pass."
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
echo "Next step: fresh exact runner-execution decision/template and fresh execution pre-run guard — NOT immediate rerun."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1