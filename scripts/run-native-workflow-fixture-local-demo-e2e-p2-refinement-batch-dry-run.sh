#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Local Demo E2E P2 Refinement Batch Dry Run =="
echo "Mode: local fake-data P2 refinement batch; review-only."
echo "This wrapper validates committed P2 refinement packet artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-readonly.js
echo "PASS: P2 refinement batch verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Local Demo E2E P2 Refinement Batch Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."