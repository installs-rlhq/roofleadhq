#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Final Local Demo E2E Readiness Summary + Next Decision Dry Run =="
echo "Mode: local fake-data final local demo E2E readiness summary + next decision; review-only."
echo "This wrapper validates committed readiness summary and next decision artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-readonly.js
echo "PASS: final local demo E2E readiness summary + next decision verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Final Local Demo E2E Readiness Summary + Next Decision Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."