#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Capture Refreshed Exact Approval for Actual 30-Scenario Validation Dry Run =="
echo "Mode: local refreshed approval-capture only; review-only; not activation; non-executing."
echo "This wrapper validates committed refreshed signed approval capture packet artifacts — it does NOT execute the approved command."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is ae61d53. Refreshed exact approval template packet (ae61d53) and one-time approval consumption decision (6411949) are referenced."
echo "prior_one_time_approval_consumption_decision is consumed_by_local_wrapper_execution."
echo "refreshed_approval_capture_status is captured. refreshed_jason_signed_approval_status is signed."
echo "refreshed_exact_values_required_count is 19. refreshed_exact_values_accepted_count is 19. refreshed_exact_values_approved_count is 19."
echo "actual_30_scenario_validation_approval_status is granted_scoped_one_time_pending_refreshed_pre_run_guard."
echo "future_command_status is blocked_until_refreshed_pre_run_guard_passes."
echo "command_execution_status is not_run_by_this_packet."
echo "actual_30_scenario_external_validation_captured_count is 0. actual_30_scenario_external_validation_passed_count is 0."
echo "actual_30_scenario_external_validation_status is not_captured_by_this_run."
echo "Historical/local channel validation evidence still reports 0 of 30 scenarios captured."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "approved_for_activation_now is false. Next step is separate refreshed pre-run guard pass before any command execution."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-capture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js
echo "PASS: refreshed capture verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-capture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js

echo "PASS: Native Workflow Fixture Capture Refreshed Exact Approval for Actual 30-Scenario Validation Dry Run wrapper passed."
echo "Note: This refreshed approval capture does NOT execute the approved command or pass the refreshed pre-run guard."
echo "Note: Refreshed signed approval is captured for actual 30-scenario sandbox/test-mode validation only."
echo "Note: actual 30-scenario external validation remains 0 captured."
echo "Note: Controlled real roofer setup and live activation remain blocked."