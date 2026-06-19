#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet Dry Run =="
echo "Mode: local approval-capture only; review-only; not activation; non-executing."
echo "This wrapper validates committed signed approval capture packet artifacts — it does NOT execute the approved command."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "Approval capture status is captured. Jason signed approval status is signed."
echo "All 19 exact values accepted and approved for exact scoped sandbox/test-mode only."
echo "sandbox_test_mode_approval_status is granted_scoped_one_time_pending_pre_run_guard."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes, schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "approved_for_activation_now is false. command_execution_status is not_run_by_this_packet."
echo "future_command_status is blocked_until_pre_run_guard_passes."
echo "Next step is separate pre-run guard pass before any command execution."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js
echo "PASS: signed sandbox/test-mode approval capture packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."