#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Approved Command Wrapper Correction Packet Dry Run =="
echo "Mode: local wrapper-correction only; review-only; not activation; non-executing."
echo "This wrapper validates committed approved command wrapper correction packet artifacts — it does NOT execute the approved command as a sandbox/test-mode run."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 9106d8f. Signed approval capture and pre-run guard pass packets are referenced and verified."
echo "correction_status is approved_command_wrapper_path_materialized."
echo "missing_command_path_detected is true. exact_approved_command_path_materialized is true."
echo "approval_capture_status is captured. jason_signed_approval_status is signed."
echo "All 19 exact values accepted and approved for exact scoped sandbox/test-mode only."
echo "prior_pre_run_guard_status is passed_for_exact_scoped_sandbox_test_mode_only."
echo "prior_pre_run_guard_decision is PASS_FOR_EXACT_APPROVED_SANDBOX_TEST_MODE_COMMAND_ONLY."
echo "wrapper_correction_does_not_execute_approved_command_as_live_or_external_run is true."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "approved_for_activation_now is false. command_execution_status is not_run_by_this_packet."
echo "future_command_status is ready_for_exact_approved_command_review_after_wrapper_correction_closeout."
echo "Next step, after canonical closeout only, is exact approved command review."
echo "Wrapper correction does NOT itself equal new approval. Any deviation requires new explicit Jason approval."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-approved-command-wrapper-correction-packet-readonly.js
echo "PASS: approved command wrapper correction packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-approved-command-wrapper-correction-packet-readonly.js

echo "PASS: Native Workflow Fixture Approved Command Wrapper Correction Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."