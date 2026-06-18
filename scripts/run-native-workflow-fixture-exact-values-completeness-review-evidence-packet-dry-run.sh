#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Exact Values Completeness Review Evidence Packet Dry Run =="
echo "Mode: local fake-data exact values completeness review evidence packet; review-only."
echo "This wrapper validates committed completeness review evidence artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "All 19 exact values remain blank by default. Completeness status is incomplete. Blank placeholders are not approval."
echo "Evidence review does not equal approval. Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js
echo "PASS: exact values completeness review evidence packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Exact Values Completeness Review Evidence Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."