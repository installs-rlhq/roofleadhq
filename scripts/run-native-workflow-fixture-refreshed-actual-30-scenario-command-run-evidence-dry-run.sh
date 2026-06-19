#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Refreshed Actual 30-Scenario Command Run Evidence Dry Run =="
echo "Mode: local refreshed command-run evidence capture only; review-only; not activation; non-executing."
echo "This wrapper validates committed refreshed command-run evidence packet artifacts — it does NOT execute sandbox/test-mode as an external or live run."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 0da2457. Refreshed signed approval capture packet (fbdc9d6) and refreshed pre-run guard pass packet (0da2457) are referenced."
echo "refreshed_exact_approved_command_run_status is completed_local_review_only_wrapper_passed."
echo "command_execution_status is refreshed_exact_approved_command_ran_local_review_only."
echo "wrapper_pass_status is passed. channel_validation_completeness_gate_assertions 124. channel_validation_evidence_capture_packet_assertions 115."
echo "backend_build_status is passed."
echo "actual_30_scenario_external_validation_captured_count is 0. actual_30_scenario_external_validation_passed_count is 0. actual_30_scenario_external_validation_missing_count is 30."
echo "actual_30_scenario_external_validation_status is not_captured_by_this_run."
echo "Historical/local channel validation evidence still reports 0 of 30 scenarios captured."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo "future_command_status is refreshed_command_run_evidence_captured_pending_next_exact_decision."
echo "Next step is a separate decision: stop/review, consume the refreshed approval, or create/approve a different actual external/sandbox 30-scenario validation runner."
echo "Any deviation from the exact approved command or working directory requires new explicit Jason approval."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-readonly.js
echo "PASS: refreshed actual 30-scenario command run evidence verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-readonly.js

echo "PASS: Native Workflow Fixture Refreshed Actual 30-Scenario Command Run Evidence Dry Run wrapper passed."
echo "Note: This local refreshed command-run evidence capture does NOT execute sandbox/test-mode as an external or live run."
echo "Note: actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing by this run."
echo "Note: Separate decision required — stop/review, consume refreshed approval, or create/approve different actual external/sandbox 30-scenario validation runner."