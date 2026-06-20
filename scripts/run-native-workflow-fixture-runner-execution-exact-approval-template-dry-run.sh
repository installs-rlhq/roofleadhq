#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Runner-Execution Exact Approval Template Dry Run =="
echo "Mode: local runner-execution approval-template only; review-only; not signed; not approved; not runner execution; not activation; non-executing."
echo "This wrapper validates committed runner-execution exact approval template packet artifacts — it does NOT run the runner, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 145bf15. Build 99 runner design (40d0d24), Build 100 build-runner template (07421c8), Build 101 signed build-runner capture (912b3aa), Build 102 build-runner pre-run guard (640df59), and Build 103 runner scaffolding build (145bf15) are referenced."
echo "runner_scaffolding_build_status is built_review_only."
echo "runner_command_path_status is created_fail_closed_not_approved_to_run."
echo "runner_fail_closed_sanity_check_status is blocked_exit_code_1."
echo "total_manifest_scenarios_count is 30. all_manifest_scenarios_execution_status is not_run. all_manifest_scenarios_pass_fail_status is not_captured."
echo "runner_execution_approval_template_status is created_review_only."
echo "runner_execution_approval_capture_status is not_captured. runner_execution_jason_signed_approval_status is not_signed."
echo "runner_execution_exact_values_required_count is 24. runner_execution_exact_values_accepted_count is 0. runner_execution_exact_values_approved_count is 0."
echo "runner_execution_approval_status is not_granted. external_sandbox_calls_approval_status is not_granted."
echo "credentials_access_approval_status is not_granted. test_account_use_approval_status is not_granted. production_data_access_approval_status is not_granted."
echo "exact_working_directory (reference default only): /root/roofleadhq"
echo "exact_runner_path (reference default only): scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "exact_manifest_path (reference default only): backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
echo "exact_scenario_count (reference default only): 30"
echo "exact_command documented as reference default only (not executed from this wrapper)."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, SMS/email/calls/calendar booking, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "future_command_status is blocked_until_runner_execution_exact_approval_captured."
echo "command_execution_status is not_run_by_this_packet. runner_execution_status is not_run_by_this_packet."
echo "approved_for_activation_now is false."
echo "Next step is Jason review/sign exact runner-execution approval template, or stop/review — NOT execution."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-runner-execution-exact-approval-template-readonly.js
echo "PASS: runner-execution exact approval verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-runner-execution-exact-approval-template-readonly.js

echo "PASS: Native Workflow Fixture Runner-Execution Exact Approval Template Dry Run wrapper passed."
echo "Note: This local runner-execution approval template does NOT run the runner, capture approval, or execute anything."
echo "Note: Runner-execution exact approval is not captured and not signed."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Next step is Jason review/sign exact runner-execution approval template, or stop/review — NOT execution."