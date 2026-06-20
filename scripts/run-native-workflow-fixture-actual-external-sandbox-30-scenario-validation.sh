#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO — FAIL-CLOSED RUNNER SCAFFOLDING ONLY
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. It is NOT approved to run.
#
# runner_execution_approval_status: not_granted
# runner_command_path_status: created_fail_closed_not_approved_to_run
# future_command_status: blocked_until_runner_execution_exact_approval_captured_and_execution_pre_run_guard_passes
#
# This runner must NOT:
# - make external calls
# - access credentials
# - access production data
# - send SMS/email/calls
# - create calendar bookings
# - contact real homeowners or roofers
# =============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
PROPOSED_EVIDENCE_LOG_PATH="logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log"
PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json"

echo "== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner =="
echo ""
echo "BLOCKED: This runner is scaffolding only and is NOT approved to run."
echo "NO-GO: Runner execution requires future exact runner-execution approval and a future execution pre-run guard pass."
echo ""
echo "runner_execution_approval_status: not_granted"
echo "runner_command_path_status: created_fail_closed_not_approved_to_run"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "future_command_status: blocked_until_runner_execution_exact_approval_captured_and_execution_pre_run_guard_passes"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
echo "This runner does NOT access production data."
echo "This runner does NOT send SMS, email, or calls."
echo "This runner does NOT create calendar bookings."
echo "This runner does NOT contact real homeowners or roofers."
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
echo "Next step: separate runner-execution exact approval template or stop/review — NOT execution."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1