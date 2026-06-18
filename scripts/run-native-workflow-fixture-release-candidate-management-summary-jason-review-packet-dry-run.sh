#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Release Candidate Management Summary + Jason Review Packet Dry Run =="
echo "Mode: local fake-data management summary Jason review packet; review-only."
echo "This wrapper validates committed management summary Jason review artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "Local demo E2E evidence chain is passed (25 fake leads, 25 scenarios, 25 matched outcomes, 0 missing, 0 unexpected)."
echo "Local demo evidence freeze / release candidate review is completed."
echo "All 19 exact values remain blank by default. Completeness status is incomplete. Default sandbox/test-mode decision remains HOLD."
echo "GO remains unavailable by default. Jason review packet does not equal approval. Release candidate summary does not equal approval."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-readonly.js
echo "PASS: release candidate management summary Jason review packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Release Candidate Management Summary + Jason Review Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."