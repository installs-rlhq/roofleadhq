#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox/Test-Mode Approval Decision Draft Packet Dry Run =="
echo "Mode: local fake-data sandbox/test-mode approval decision draft packet; review-only."
echo "This wrapper validates committed approval decision draft artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "All 19 exact values remain blank by default. Completeness status is incomplete. Default decision is HOLD."
echo "GO is unavailable until all exact values are complete and Jason gives separate exact scoped approval."
echo "Blank placeholders are not approval. Decision draft does not equal approval. Evidence review does not equal approval."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-readonly.js
echo "PASS: sandbox/test-mode approval decision draft packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Sandbox/Test-Mode Approval Decision Draft Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."