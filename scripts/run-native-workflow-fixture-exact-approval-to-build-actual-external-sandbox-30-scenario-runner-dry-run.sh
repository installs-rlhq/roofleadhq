#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Exact Approval to Build Actual External/Sandbox 30-Scenario Runner Dry Run =="
echo "Mode: local approval-template only; review-only; not approval; not activation; non-executing."
echo "This wrapper validates committed build-runner exact approval template packet artifacts — it does NOT build, run, approve, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 40d0d24. Build 99 runner design packet (40d0d24) is referenced."
echo "current_runner_gap_status is existing_wrapper_is_local_only_not_actual_external_sandbox_runner."
echo "different_runner_required is true. prior_proposed_runner_status is design_only_not_built_not_approved_not_run."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "build runner approval is not captured and not signed."
echo "build_runner_exact_values_required_count is 19. build_runner_exact_values_accepted_count is 0. build_runner_exact_values_approved_count is 0."
echo "runner_execution_approval_status is not_granted. external_calls_approval_status is not_granted."
echo "credentials_access_approval_status is not_granted. production_data_access_approval_status is not_granted."
echo "Proposed future command path is documented as reference default only (not built, not executable from this wrapper)."
echo "Proposed working directory (reference default only): /root/roofleadhq"
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is blocked_until_build_runner_exact_approval_captured."
echo "command_execution_status is not_run_by_this_packet."
echo "Next step is Jason review/sign exact build-runner approval, or stop/review."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-readonly.js
echo "PASS: build-runner exact approval verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-readonly.js

echo "PASS: Native Workflow Fixture Exact Approval to Build Actual External/Sandbox 30-Scenario Runner Dry Run wrapper passed."
echo "Note: This local build-runner approval template does NOT build, run, approve, capture, or execute anything."
echo "Note: Build runner exact approval is not captured and not signed."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Next step is Jason review/sign exact build-runner approval, or stop/review."