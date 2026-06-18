#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Demo Roofer Scenario Review Runner Dry Run =="
echo "Mode: local fake-data demo roofer scenario review; review-only."
echo "This wrapper walks 25 demo roofer E2E scenarios against 25 expected outcomes — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js
echo "PASS: scenario review runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js
echo "PASS: scenario review runner verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js > /dev/null
echo "PASS: scenario review runner executed and produced JSON summary."

node backend/scripts/verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Demo Roofer Scenario Review Runner Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."