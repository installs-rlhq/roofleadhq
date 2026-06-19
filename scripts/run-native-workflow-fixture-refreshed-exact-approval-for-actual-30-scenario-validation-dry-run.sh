#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Refreshed Exact Approval for Actual 30-Scenario Validation Dry Run =="
echo "Mode: local refreshed approval template only; review-only; not approval; not activation; non-executing."
echo "This wrapper validates committed refreshed exact approval template packet artifacts — it does NOT approve, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 6411949. One-time approval consumption decision (6411949) and upstream evidence chain packets are referenced."
echo "prior_one_time_approval_consumption_decision is consumed_by_local_wrapper_execution."
echo "refreshed_exact_approval_required_for_future_30_scenario_validation is true."
echo "refreshed exact approval is not captured and not signed."
echo "refreshed_exact_values_required_count is 19. refreshed_exact_values_accepted_count is 0. refreshed_exact_values_approved_count is 0."
echo "future_command_status is blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes."
echo "command_execution_status is not_run_by_this_packet."
echo "actual_30_scenario_external_validation_captured_count is 0. actual_30_scenario_external_validation_passed_count is 0."
echo "actual_30_scenario_external_validation_status is not_captured_by_this_run."
echo "Historical/local channel validation evidence still reports 0 of 30 scenarios captured."
echo "Recommended defaults do not equal approval. Prior consumed approval does not equal refreshed approval."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "approved_for_activation_now is false. This packet does not grant refreshed approval."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js
echo "PASS: refreshed exact approval verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js

echo "PASS: Native Workflow Fixture Refreshed Exact Approval for Actual 30-Scenario Validation Dry Run wrapper passed."
echo "Note: This local refreshed approval template does NOT approve, capture, or execute anything."
echo "Note: Refreshed exact approval is not captured and not signed."
echo "Note: actual 30-scenario external validation remains 0 captured."
echo "Note: Controlled real roofer setup and live activation remain blocked."