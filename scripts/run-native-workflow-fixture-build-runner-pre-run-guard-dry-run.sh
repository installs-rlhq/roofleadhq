#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Build-Runner Pre-Run Guard Dry Run =="
echo "Mode: local build-runner pre-run guard only; review-only; not runner build; not runner execution; not activation; non-executing."
echo "This wrapper validates committed build-runner pre-run guard packet artifacts — it does NOT build the runner, run the runner, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 912b3aa. Build 101 signed build-runner approval capture packet (912b3aa) is referenced and verified."
echo "approval_scope is build_actual_external_sandbox_30_scenario_runner_scaffolding_only."
echo "signed_approval_timestamp is 06/19/2026 9:13pm Mountain Time."
echo "current_runner_gap_status is existing_wrapper_is_local_only_not_actual_external_sandbox_runner."
echo "different_runner_required is true. prior_proposed_runner_status is design_only_not_built_not_approved_not_run."
echo "build_runner_approval_capture_status is captured. build_runner_jason_signed_approval_status is signed."
echo "build_runner_exact_values_required_count is 19. build_runner_exact_values_accepted_count is 19. build_runner_exact_values_approved_count is 19."
echo "build_runner_pre_run_guard_status is passed. build_runner_pre_run_guard_checks_required_count is 20."
echo "build_runner_pre_run_guard_checks_passed_count is 20. build_runner_pre_run_guard_failed_count is 0."
echo "runner_execution_approval_status is not_granted. external_calls_approval_status is not_granted."
echo "credentials_access_approval_status is not_granted. production_data_access_approval_status is not_granted."
echo "runner_build_status is not_built_by_this_packet. runner_execution_status is not_run_by_this_packet."
echo "command_execution_status is not_run_by_this_packet."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is ready_for_build_runner_scaffolding_packet_review_only."
echo "approved_for_activation_now is false. Next step is a separate runner scaffolding build packet, not execution."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-build-runner-pre-run-guard-readonly.js
echo "PASS: build-runner pre-run guard verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-build-runner-pre-run-guard-readonly.js

echo "PASS: Native Workflow Fixture Build-Runner Pre-Run Guard Dry Run wrapper passed."
echo "Note: This build-runner pre-run guard does NOT build the runner, run the runner, or approve runner execution."
echo "Note: Build-runner pre-run guard passed for scoped scaffolding review only."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Controlled real roofer setup and live activation remain blocked."
echo "Note: Next step is a separate runner scaffolding build packet, not execution."