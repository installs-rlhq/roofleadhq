#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Scaffolding Build Dry Run =="
echo "Mode: local runner scaffolding build only; review-only; not runner execution; not activation; non-executing."
echo "This wrapper validates committed runner scaffolding build packet artifacts — it does NOT run the runner or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 640df59. Build 102 build-runner pre-run guard packet (640df59) is referenced and verified."
echo "Build 101 signed build-runner approval capture (912b3aa) and Build 100 template (07421c8) and Build 99 design (40d0d24) are referenced."
echo "approval_scope is build_actual_external_sandbox_30_scenario_runner_scaffolding_only."
echo "signed_approval_timestamp is 06/19/2026 9:13pm Mountain Time."
echo "build_runner_approval_capture_status is captured. build_runner_jason_signed_approval_status is signed."
echo "build_runner_exact_values_required_count is 19. build_runner_exact_values_accepted_count is 19. build_runner_exact_values_approved_count is 19."
echo "build_runner_pre_run_guard_status is passed. build_runner_pre_run_guard_checks_required_count is 20."
echo "build_runner_pre_run_guard_checks_passed_count is 20. build_runner_pre_run_guard_failed_count is 0."
echo "runner_scaffolding_build_status is built_review_only."
echo "runner_command_path_status is created_fail_closed_not_approved_to_run."
echo "runner_execution_approval_status is not_granted. external_calls_approval_status is not_granted."
echo "credentials_access_approval_status is not_granted. production_data_access_approval_status is not_granted."
echo "runner_execution_status is not_run_by_this_packet. command_execution_status is not_run_by_this_packet."
echo "current_runner_gap_status is scaffolding_created_but_execution_not_approved_not_run."
echo "different_runner_required is true. total_manifest_scenarios_count is 30."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is blocked_until_runner_execution_exact_approval_captured_and_execution_pre_run_guard_passes."
echo "approved_for_activation_now is false. Next step is separate runner-execution exact approval template or stop/review, not execution."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-scaffolding-build-readonly.js
echo "PASS: runner scaffolding build verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-scaffolding-build-readonly.js

echo "PASS: Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Scaffolding Build Dry Run wrapper passed."
echo "Note: This scaffolding build does NOT run the runner or approve runner execution."
echo "Note: Runner scaffolding built review-only; runner command path is fail-closed and not approved to run."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Controlled real roofer setup and live activation remain blocked."
echo "Note: Next step is separate runner-execution exact approval template or stop/review, not execution."