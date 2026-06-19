#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet Dry Run =="
echo "Mode: local fake-data review-only; planning-only; not-approved; non-executing."
echo "This wrapper validates committed controlled real roofer pilot setup evidence capture packet artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No roofer contact, no email, no SMS, no calls."
echo "Local demo E2E evidence chain is passed."
echo "Channel validation completeness gate is completed upstream (source_of_truth_commit cc67563 referenced)."
echo "All 12 recommended setup steps remain blank (not_captured)."
echo "All 19 recommended exact values remain proposed (RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED)."
echo "Accepted exact values count remains 0. Approved exact values filled count remains 0. Completeness status is incomplete."
echo "Approval capture status is not_captured. Jason signed approval status is not_signed."
echo "Channel validation gate decision is NO_GO (HOLD). Controlled real roofer setup gate decision is NO_GO (HOLD)."
echo "Recommended setup step counts are not approval."
echo "Setup evidence capture packet does not equal approval."
echo "Setup evidence template does not equal approval."
echo "Setup no-go review does not equal approval."
echo "Default sandbox/test-mode decision remains HOLD."
echo "Controlled real roofer setup blocked until sandbox/test-mode evidence is complete and separately approved."
echo "Sandbox/test-mode and live activation remain not granted. Real roofer onboarding/contact remains blocked."
echo "No setup evidence captured yet — NOT CAPTURED / NOT SIGNED / NOT GRANTED."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-readonly.js
echo "PASS: Controlled real roofer pilot setup evidence capture packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."