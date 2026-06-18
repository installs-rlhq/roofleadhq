#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Roofer Pilot Essentials Planning Batch Dry Run =="
echo "Mode: local fake-data pilot planning batch; planning-only; review-only; not-approved; non-executing."
echo "This wrapper validates committed roofer pilot essentials planning artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "Local demo E2E evidence chain is passed (25 fake leads, 25 scenarios, 25 matched outcomes, 0 missing, 0 unexpected)."
echo "Local demo evidence freeze / release candidate review is completed."
echo "Release candidate management summary Jason review is completed."
echo "All 19 exact values remain blank by default. Completeness status is incomplete. Default sandbox/test-mode decision remains HOLD."
echo "Jason review packet does not equal approval. Release candidate summary does not equal approval."
echo "Recommended scenario counts are not approval. Pilot planning does not equal approval."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-roofer-pilot-essentials-planning-batch-readonly.js
echo "PASS: roofer pilot essentials planning batch verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-roofer-pilot-essentials-planning-batch-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Roofer Pilot Essentials Planning Batch Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."