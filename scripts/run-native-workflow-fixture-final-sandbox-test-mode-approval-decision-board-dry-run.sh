#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Final Sandbox/Test-Mode Approval Decision Board Dry Run =="
echo "Mode: local fake-data review-only planning-only final approval decision board; not approval; not activation; non-executing."
echo "This wrapper validates committed final decision board artifacts — it does NOT approve, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "All 19 exact values remain not approved (0 accepted, 0 approved). Master gate remains NO_GO/HOLD."
echo "Channel validation 0/30 captured. Setup steps 0/12 captured. Limited validation 0/5 captured."
echo "Approval capture NOT CAPTURED / NOT SIGNED / NOT GRANTED. Sandbox/test-mode and live activation remain blocked."
echo "Final decision board does not equal approval. Operator runbook draft does not equal approval. Pre-run guard draft does not equal approval."
echo "future_command_status is blocked_until_exact_signed_approval_and_gate_pass."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-readonly.js
echo "PASS: final sandbox/test-mode approval decision board verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Final Sandbox/Test-Mode Approval Decision Board Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."