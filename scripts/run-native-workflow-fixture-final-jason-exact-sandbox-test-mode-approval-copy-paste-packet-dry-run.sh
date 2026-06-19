#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Final Jason Exact Sandbox/Test-Mode Approval Copy/Paste Packet Dry Run =="
echo "Mode: local fake-data review-only planning-only template-only; not approval; not activation; non-executing."
echo "This wrapper validates committed copy/paste template packet artifacts — it does NOT approve, capture approval, or execute activation."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "All 19 exact values remain not approved (0 accepted, 0 approved). Master gate remains NO_GO/HOLD."
echo "Channel validation 0/30 captured. Setup steps 0/12 captured. Limited validation 0/5 captured."
echo "Approval capture NOT CAPTURED / NOT SIGNED / NOT GRANTED. Sandbox/test-mode and live activation remain blocked."
echo "Copy/paste packet does not equal approval. Template presence does not equal approval. Recommended defaults are not approval."
echo "Vague approval phrases (go, ok, looks good, approved, etc.) do not count as approval."
echo "future_command_status is blocked_until_exact_signed_approval_and_gate_pass."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-readonly.js
echo "PASS: final jason exact sandbox/test-mode approval copy/paste packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Final Jason Exact Sandbox/Test-Mode Approval Copy/Paste Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."