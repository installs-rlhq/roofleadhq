#!/usr/bin/env bash
set -euo pipefail

cat <<'EOF'
== RoofLeadHQ Actual External/Sandbox 30-Scenario Validation Runner ==

BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this path.
NO-GO: Build 177 captured a consumed post-Build-176 runner attempt that blocked/nonzero and reported stale Build 164 / cf6d8c4 state.

source_of_truth_commit: 084f039
prior_post_build_176_runner_stale_evidence_commit: 084f039
prior_build_176_fresh_guard_commit: cc6d827
prior_build_175_signed_approval_capture_commit: 5ed0089
prior_build_174_ambiguous_attempt_capture_commit: a67205c
prior_build_170_template_commit: 932b7a4
stale_runner_reported_source_of_truth_commit: cf6d8c4

-- Corrected recognition state after Build 177 --
runner_stale_build_164_state_status: historical_only_not_current
runner_recognizes_build_174_ambiguous_attempt_capture: true
runner_recognizes_build_175_fresh_signed_approval_capture: true
runner_recognizes_build_176_fresh_pre_run_guard: true
runner_recognizes_build_177_post_run_blocked_stale_evidence: true
runner_direct_invocation_status_after_build_177: blocked_nonzero_expected

-- Required next chain after Build 178 correction --
fresh_runner_decision_after_build_178_status: not_created_by_this_runner
fresh_signed_approval_after_build_178_status: not_captured_not_granted
fresh_pre_run_guard_after_build_178_status: not_created_not_passed
runner_command_attempt_status: not_attempted_by_this_invocation
runner_execution_status: not_run_by_this_invocation
command_execution_status: not_run
immediate_rerun_allowed: false
runner_command_rerun_allowed: false
future_command_status: blocked_until_fresh_decision_approval_capture_and_fresh_pre_run_guard_after_build_178

This runner does NOT make external calls.
This runner does NOT access credentials.
This runner does NOT expose secrets.
This runner does NOT access production data.
This runner does NOT write production Supabase data.
This runner does NOT send SMS, email, or calls.
This runner does NOT create calendar bookings.
This runner does NOT contact real homeowners or roofers.
This runner does NOT execute actual 30-scenario validation from this blocked fail-closed path.
This runner does NOT approve controlled test-roofer E2E execution.

actual_30_scenario_external_validation_captured_count: 0
actual_30_scenario_external_validation_passed_count: 0
actual_30_scenario_external_validation_missing_count: 30
actual_30_scenario_external_validation_status: not_captured_by_this_run
safety_status: demo_ready_with_live_automation_disabled
controlled_test_roofer_e2e_status: review_only_not_approved_not_run
controlled_real_roofer_validation_allowed: false

Manifest reference (scaffolding only): backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json

Next step: fresh runner decision/approval template after Build 178 correction. This direct path remains blocked.

EXIT: non-zero (blocked)
EOF

exit 1
