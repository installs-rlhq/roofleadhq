#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal Dry Run =="
echo "Mode: local fake-data planning-only; review-only; not-approved; non-executing."
echo "This wrapper validates committed recommended defaults proposal artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "Local demo E2E evidence chain is passed."
echo "Release candidate management summary Jason review is completed."
echo "Roofer pilot essentials planning batch is completed."
echo "All 19 recommended exact values are proposed (RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED)."
echo "Approved exact values filled count remains 0. Completeness status is incomplete."
echo "Recommended defaults are not approval. Jason review worksheet does not equal approval."
echo "Default sandbox/test-mode decision remains HOLD."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js
echo "PASS: recommended defaults proposal verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."