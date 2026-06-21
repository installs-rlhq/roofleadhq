#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO - FAIL-CLOSED RUNNER AFTER BUILD 164 DECISION/TEMPLATE
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. Direct invocation remains blocked and exits nonzero.
# Build 164 closes a review-only fresh decision and approval template. It does
# not capture Jason approval, does not create/pass a fresh guard, and does not
# allow immediate runner execution.
#
# source_of_truth_commit: cf6d8c4
# prior_runner_recognition_correction_commit: cf6d8c4
# prior_post_build_161_blocked_evidence_commit: 3f97a7f
# prior_fresh_execution_pre_run_guard_commit: dd05289
# prior_approval_capture_commit: 46ca819
# prior_fresh_decision_commit: 0eefaf3
# prior_runner_execution_path_commit: 28b6413
# prior_stale_runner_reported_source_of_truth_commit: 0c6abaf (historical only, not current)
# fresh_runner_execution_decision_after_build_163_correction_status: review_only_no_go_until_signed_approval_and_guard
# approval_template_status: template_only_not_signed_not_captured_not_granted
# jason_signed_approval_status: not_signed
# approval_capture_status: not_captured
# fresh_pre_run_guard_status: not_created_not_passed
# immediate_rerun_allowed: false
# future_command_status: blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164
# =============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
PROPOSED_EVIDENCE_LOG_PATH="logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log"
PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json"

echo "== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner =="
echo ""
echo "BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this blocked path."
echo "NO-GO: Build 164 closes decision/template only. Jason signed approval capture and a fresh pre-run guard after Build 164 are required before one exact command attempt."
echo ""
echo "source_of_truth_commit: cf6d8c4"
echo "prior_runner_recognition_correction_commit: cf6d8c4"
echo "prior_post_build_161_blocked_evidence_commit: 3f97a7f"
echo "prior_fresh_execution_pre_run_guard_commit: dd05289"
echo "prior_approval_capture_commit: 46ca819"
echo "prior_fresh_decision_commit: 0eefaf3"
echo "prior_runner_execution_path_commit: 28b6413"
echo "prior_stale_runner_reported_source_of_truth_commit: 0c6abaf (historical only, not current)"
echo ""
echo "-- Current recognized Build 158/159/160/161/162 chain --"
echo "runner_recognizes_build_158_159_160_161_162_chain: true"
echo "runner_recognized_build_158_path_correction_commit: 28b6413"
echo "runner_recognized_build_159_fresh_decision_commit: 0eefaf3"
echo "runner_recognized_build_160_approval_capture_commit: 46ca819"
echo "runner_recognized_build_161_pre_run_guard_commit: dd05289"
echo "runner_recognized_build_162_blocked_evidence_commit: 3f97a7f"
echo "runner_stale_pre_build_158_159_160_161_state_retired_as_historical: true"
echo "runner_old_build_146_chain_status: historical_only_not_current"
echo "stale_0c6abaf_current_state_allowed: false"
echo ""
echo "-- Build 164 decision/template status --"
echo "fresh_runner_execution_decision_after_build_163_correction_status: review_only_no_go_until_signed_approval_and_guard"
echo "approval_template_status: template_only_not_signed_not_captured_not_granted"
echo "jason_signed_approval_status: not_signed"
echo "approval_capture_status: not_captured"
echo "fresh_pre_run_guard_status: not_created_not_passed"
echo ""
echo "-- Exact values present as unsigned template only --"
echo "exact_working_directory: /root/roofleadhq"
echo "exact_command: bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "exact_runner_path: scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "exact_manifest_path: backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
echo "exact_scenario_count: 30"
echo ""
echo "-- Required next chain after Build 164 --"
echo "runner_direct_invocation_status_after_decision_template: blocked_nonzero_expected"
echo "runner_command_attempt_status: not_attempted_by_this_packet"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "immediate_rerun_allowed: false"
echo "runner_command_rerun_allowed: false"
echo "future_command_status: blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
echo "This runner does NOT expose secrets."
echo "This runner does NOT access production data."
echo "This runner does NOT write production Supabase data."
echo "This runner does NOT send SMS, email, or calls."
echo "This runner does NOT create calendar bookings."
echo "This runner does NOT contact real homeowners or roofers."
echo "This runner does NOT execute actual 30-scenario validation from this blocked fail-closed path."
echo "This runner does NOT approve controlled test-roofer E2E execution."
echo ""
echo "actual_30_scenario_external_validation_captured_count: 0"
echo "actual_30_scenario_external_validation_passed_count: 0"
echo "actual_30_scenario_external_validation_missing_count: 30"
echo "actual_30_scenario_external_validation_status: not_captured_by_this_run"
echo "safety_status: demo_ready_with_live_automation_disabled"
echo "controlled_test_roofer_e2e_status: review_only_not_approved_not_run"
echo "controlled_real_roofer_validation_allowed: false"
echo ""
echo "Manifest reference (scaffolding only): ${MANIFEST_PATH}"
echo "Proposed evidence log path (not written): ${PROPOSED_EVIDENCE_LOG_PATH}"
echo "Proposed structured evidence output path (not written): ${PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH}"
echo ""
echo "Next step: Jason signed approval capture after Build 164, then a fresh pre-run guard. This direct path remains blocked."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1
