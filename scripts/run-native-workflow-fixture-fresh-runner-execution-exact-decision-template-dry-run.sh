#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Fresh Runner-Execution Exact Decision Template Dry Run =="
echo "Mode: local fresh runner-execution exact decision template only; review-only; not signed; not approved; not runner execution; not activation; non-executing."
echo "This wrapper validates committed fresh runner-execution exact decision template packet artifacts — it does NOT run the runner, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 77f2a00. Build 108 runner state wiring correction (77f2a00), Build 107 blocked command evidence (4a618fa), Build 106 runner-execution pre-run guard (b834baa), Build 105 signed runner-execution approval capture (bb0bc14), Build 104 runner-execution exact approval template (67393ed), and Build 103 runner scaffolding build (145bf15) are referenced."
echo "runner_state_wiring_correction_status is corrected_review_only."
echo "prior_one_time_execution_attempt_consumption_status is consumed_by_blocked_attempt."
echo "fresh_exact_execution_decision_required is true. fresh_execution_pre_run_guard_required is true."
echo "runner_command_path_status is corrected_fail_closed_pending_fresh_exact_execution_decision."
echo "total_manifest_scenarios_count is 30. all_manifest_scenarios_execution_status is not_run. all_manifest_scenarios_pass_fail_status is not_captured."
echo "fresh_runner_execution_decision_template_status is created_review_only."
echo "fresh_runner_execution_approval_capture_status is not_captured. fresh_runner_execution_jason_signed_approval_status is not_signed."
echo "fresh_runner_execution_exact_values_required_count is 24. fresh_runner_execution_exact_values_accepted_count is 0. fresh_runner_execution_exact_values_approved_count is 0."
echo "fresh_runner_execution_approval_status is not_granted. fresh_execution_pre_run_guard_status is not_passed."
echo "external_sandbox_calls_approval_status is not_granted_by_this_packet. credentials_access_approval_status is not_granted_by_this_packet."
echo "test_account_use_approval_status is not_granted_by_this_packet. production_data_access_approval_status is not_granted."
echo "exact_working_directory: /root/roofleadhq"
echo "exact_runner_path: scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "exact_manifest_path: backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json"
echo "exact_scenario_count: 30"
echo "exact_command documented (not executed from this wrapper)."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, SMS/email/calls/calendar booking, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "future_command_status is blocked_until_fresh_runner_execution_approval_captured."
echo "command_execution_status is not_run_by_this_packet. runner_execution_status is not_run_by_this_packet."
echo "runner_command_invoked_by_this_packet is false."
echo "approved_for_activation_now is false."
echo "Next step is Jason review/sign fresh exact runner-execution approval template, or stop/review — NOT execution."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-fresh-runner-execution-exact-decision-template-readonly.js
echo "PASS: fresh runner-execution exact decision template verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-fresh-runner-execution-exact-decision-template-readonly.js

echo "PASS: Native Workflow Fixture Fresh Runner-Execution Exact Decision Template Dry Run wrapper passed."
echo "Note: This local fresh runner-execution exact decision template does NOT run the runner, capture approval, or execute anything."
echo "Note: Fresh runner-execution exact approval is not captured and not signed."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Next step is Jason review/sign fresh exact runner-execution approval template, or stop/review — NOT execution."