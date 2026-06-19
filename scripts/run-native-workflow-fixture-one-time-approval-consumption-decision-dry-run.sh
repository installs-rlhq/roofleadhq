#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture One-Time Approval Consumption Decision Dry Run =="
echo "Mode: local approval-consumption decision only; review-only; not activation; non-executing."
echo "This wrapper validates committed one-time approval consumption decision packet artifacts — it does NOT execute sandbox/test-mode as an external or live run."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 415abca. Signed approval capture (06a6f7f), pre-run guard pass (9106d8f), wrapper correction (fbe793e), and post-run evidence (415abca) packets are referenced."
echo "exact_approved_command_run_status is completed_local_review_only_wrapper_passed."
echo "one_time_approval_consumption_decision is consumed_by_local_wrapper_execution."
echo "The prior one-time approval is treated as consumed by the local wrapper execution."
echo "refreshed_exact_approval_required_for_future_30_scenario_validation is true."
echo "future_command_status is blocked_until_refreshed_exact_approval_for_actual_30_scenario_validation."
echo "command_execution_status is no_further_command_execution_approved_by_this_packet."
echo "actual_30_scenario_external_validation_captured_count is 0. actual_30_scenario_external_validation_passed_count is 0."
echo "actual_30_scenario_external_validation_status is not_captured_by_this_run."
echo "Historical/local channel validation evidence still reports 0 of 30 scenarios captured."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "approved_for_activation_now is false. This packet does not approve any new command."
echo "Next step: refreshed exact approval packet required if Jason wants to run actual 30-scenario validation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-one-time-approval-consumption-decision-readonly.js
echo "PASS: one-time approval consumption decision verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-one-time-approval-consumption-decision-readonly.js

echo "PASS: Native Workflow Fixture One-Time Approval Consumption Decision Dry Run wrapper passed."
echo "Note: This local approval-consumption decision does NOT execute sandbox/test-mode as an external or live run."
echo "Note: The prior one-time approval is treated as consumed by the local wrapper execution."
echo "Note: Refreshed exact approval is required for any future actual 30-scenario validation batch."
echo "Note: actual 30-scenario external validation remains 0 captured."