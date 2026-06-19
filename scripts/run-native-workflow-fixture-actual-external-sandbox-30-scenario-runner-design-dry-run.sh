#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design Dry Run =="
echo "Mode: local design-only review; not approval; not activation; non-executing."
echo "This wrapper validates committed runner design packet artifacts — it does NOT build, approve, or run any actual external/sandbox 30-scenario validation runner."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 0150699. Upstream refreshed command run evidence packet (0150699) is referenced."
echo "prior_refreshed_command_run_status is completed_local_review_only_wrapper_passed."
echo "current_runner_gap_status is existing_wrapper_is_local_only_not_actual_external_sandbox_runner."
echo "different_runner_required is true. proposed_runner_status is design_only_not_built_not_approved_not_run."
echo "actual_30_scenario_external_validation remains 0 captured / 0 passed / 30 missing / not_captured_by_this_run."
echo "Proposed future command path is documented in the design packet only (proposed only, not built, not executable from this wrapper)."
echo "Proposed working directory (proposed only): /root/roofleadhq"
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes."
echo "command_execution_status is not_run_by_this_packet."
echo "Next step is separate exact approval to build the different actual external/sandbox runner, or stop/review."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js
echo "PASS: actual external/sandbox 30-scenario runner design verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js

echo "PASS: Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design Dry Run wrapper passed."
echo "Note: This local runner design packet does NOT build, approve, or execute any actual external/sandbox 30-scenario validation runner."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing."
echo "Note: Next step is separate exact approval to build the different actual external/sandbox runner, or stop/review."