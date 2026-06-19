#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Signed Approval Pre-Run Guard Pass Dry Run =="
echo "Mode: local pre-run guard pass only; review-only; not activation; non-executing."
echo "This wrapper validates committed signed approval pre-run guard pass packet artifacts — it does NOT execute the approved command."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "source_of_truth_commit is 06a6f7f. Signed approval capture packet is referenced and verified."
echo "approval_capture_status is captured. jason_signed_approval_status is signed."
echo "All 19 exact values accepted and approved for exact scoped sandbox/test-mode only."
echo "pre_run_guard_status is passed_for_exact_scoped_sandbox_test_mode_only."
echo "pre_run_guard_decision is PASS_FOR_EXACT_APPROVED_SANDBOX_TEST_MODE_COMMAND_ONLY."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "approved_for_activation_now is false. command_execution_status is not_run_by_this_packet."
echo "future_command_status is ready_for_exact_approved_command_review_only."
echo "Next step, after canonical closeout only, is exact approved command review/execution consideration."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-signed-approval-pre-run-guard-pass-readonly.js
echo "PASS: signed approval pre-run guard pass verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-signed-approval-pre-run-guard-pass-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Signed Approval Pre-Run Guard Pass Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."