#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# BLOCKED / NO-GO - FAIL-CLOSED RUNNER AFTER BUILD 163 RECOGNITION CORRECTION
# =============================================================================
# This script is scaffolding for the actual external/sandbox 30-scenario
# validation runner. Direct invocation remains blocked and exits nonzero.
# Build 162 captured that the post-Build-161 exact command attempt was
# blocked/nonzero and consumed the prior one-time approval/guard chain.
#
# source_of_truth_commit: 3f97a7f
# prior_post_build_161_blocked_evidence_commit: 3f97a7f
# prior_fresh_execution_pre_run_guard_commit: dd05289
# prior_approval_capture_commit: 46ca819
# prior_fresh_decision_commit: 0eefaf3
# prior_runner_execution_path_commit: 28b6413
# prior_post_build_156_blocked_evidence_commit: 5dde6ce
# prior_stale_runner_reported_source_of_truth_commit: 0c6abaf (historical only, not current)
# runner_recognizes_build_158_159_160_161_162_chain: true
# runner_stale_pre_build_158_159_160_161_state_retired_as_historical: true
# approval_guard_chain_consumed: true
# immediate_rerun_allowed: false
# fresh_decision_required_after_build_163_correction: true
# fresh_approval_capture_required_after_build_163_correction: true
# fresh_pre_run_guard_required_after_build_163_correction: true
# =============================================================================

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MANIFEST_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
PROPOSED_EVIDENCE_LOG_PATH="logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log"
PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH="backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json"

echo "== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner =="
echo ""
echo "BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this blocked path."
echo "NO-GO: Build 162 captured the post-Build-161 exact command attempt as blocked/nonzero. That attempt consumed the prior one-time approval/guard chain. Immediate rerun is not allowed."
echo ""
echo "source_of_truth_commit: 3f97a7f"
echo "prior_post_build_161_blocked_evidence_commit: 3f97a7f"
echo "prior_fresh_execution_pre_run_guard_commit: dd05289"
echo "prior_approval_capture_commit: 46ca819"
echo "prior_fresh_decision_commit: 0eefaf3"
echo "prior_runner_execution_path_commit: 28b6413"
echo "prior_post_build_156_blocked_evidence_commit: 5dde6ce"
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
echo "-- Consumed prior chain --"
echo "approval_guard_chain_consumed: true"
echo "prior_one_time_approval_guard_chain_consumed_by_blocked_build_161_command_attempt: true"
echo "prior_exact_command_attempt_after_build_161_status: attempted_blocked_nonzero"
echo "prior_exact_command_exit_status: nonzero_blocked"
echo ""
echo "-- Required next chain after Build 163 correction --"
echo "runner_direct_invocation_status_after_correction: blocked_nonzero_expected"
echo "runner_execution_status: not_run"
echo "command_execution_status: not_run"
echo "immediate_rerun_allowed: false"
echo "runner_command_rerun_allowed: false"
echo "fresh_decision_required_after_build_163_correction: true"
echo "fresh_approval_capture_required_after_build_163_correction: true"
echo "fresh_pre_run_guard_required_after_build_163_correction: true"
echo "future_command_status: blocked_until_fresh_decision_fresh_approval_capture_and_fresh_pre_run_guard_after_build_163_correction"
echo ""
echo "This runner does NOT make external calls."
echo "This runner does NOT access credentials."
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
echo "Next step: fresh runner-execution decision, fresh approval capture, and fresh pre-run guard after Build 163 correction. This direct path remains blocked."
echo ""
echo "EXIT: non-zero (blocked)"

exit 1
