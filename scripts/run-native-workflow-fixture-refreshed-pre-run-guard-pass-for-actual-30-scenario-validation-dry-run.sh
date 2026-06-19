#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Refreshed Pre-Run Guard Pass for Actual 30-Scenario Validation Dry Run =="
echo "Mode: local refreshed pre-run guard pass only; review-only; not activation; non-executing."
echo "This wrapper validates committed refreshed pre-run guard pass packet artifacts — it does NOT execute the approved command."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is fbdc9d6. Refreshed signed approval capture packet (fbdc9d6) is referenced and verified."
echo "refreshed_approval_capture_status is captured. refreshed_jason_signed_approval_status is signed."
echo "refreshed_exact_values_required_count is 19. refreshed_exact_values_accepted_count is 19. refreshed_exact_values_approved_count is 19."
echo "refreshed_pre_run_guard_status is passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only."
echo "refreshed_pre_run_guard_decision is PASS_FOR_EXACT_APPROVED_ACTUAL_30_SCENARIO_SANDBOX_TEST_MODE_COMMAND_ONLY."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "approved_for_activation_now is false. command_execution_status is not_run_by_this_packet."
echo "future_command_status is ready_for_exact_approved_actual_30_scenario_command_review_only."
echo "Next step, after canonical closeout only, is exact approved actual 30-scenario command review/execution consideration."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-readonly.js
echo "PASS: refreshed pre-run guard pass verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-readonly.js

echo "PASS: Native Workflow Fixture Refreshed Pre-Run Guard Pass for Actual 30-Scenario Validation Dry Run wrapper passed."
echo "Note: This refreshed pre-run guard pass does NOT execute the approved command or activate sandbox/test-mode."
echo "Note: Refreshed pre-run guard passed for exact scoped actual 30-scenario sandbox/test-mode validation only."
echo "Note: actual 30-scenario external validation remains 0 captured."
echo "Note: Controlled real roofer setup and live activation remain blocked."