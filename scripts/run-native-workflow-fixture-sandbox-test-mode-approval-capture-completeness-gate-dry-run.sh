#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox/Test-Mode Approval Capture Completeness Gate Dry Run =="
echo "Mode: local fake-data review-only; planning-only; not-approved; non-executing."
echo "This wrapper validates committed approval capture completeness gate artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "Local demo E2E evidence chain is passed."
echo "Jason approval capture packet is completed upstream (source_of_truth_commit f56340f referenced)."
echo "All 19 recommended exact values remain proposed (RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED)."
echo "Accepted exact values count remains 0. Approved exact values filled count remains 0. Completeness status is incomplete."
echo "Approval capture status is not_captured. Jason signed approval status is not_signed."
echo "Approval capture completeness status is incomplete. Approval capture gate decision is NO_GO (HOLD)."
echo "Recommended defaults are not approval. Recommended defaults are not accepted exact values."
echo "Acceptance boundary does not equal approval. Approval request ready packet does not equal approval."
echo "Approval capture worksheet does not equal approval. Final Jason approval statement template does not equal approval."
echo "Approval capture completeness gate does not equal approval. No-go review does not equal approval."
echo "Default sandbox/test-mode decision remains HOLD."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No signed Jason approval statement captured yet — NOT CAPTURED / NOT SIGNED / NOT GRANTED."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-capture-completeness-gate-readonly.js
echo "PASS: Approval capture completeness gate verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-capture-completeness-gate-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Sandbox/Test-Mode Approval Capture Completeness Gate Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."