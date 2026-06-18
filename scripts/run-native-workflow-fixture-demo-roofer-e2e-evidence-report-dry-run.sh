#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Demo Roofer E2E Evidence Report Dry Run =="
echo "Mode: local fake-data demo roofer E2E evidence report; review-only."
echo "This wrapper summarizes 25 demo roofer E2E scenarios and scenario review runner output — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js
echo "PASS: evidence report generator syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-demo-roofer-e2e-evidence-report-readonly.js
echo "PASS: evidence report verifier syntax check (node --check) succeeded."

node backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js > /dev/null
echo "PASS: evidence report generator executed and produced JSON summary."

node backend/scripts/verify-native-workflow-fixture-demo-roofer-e2e-evidence-report-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Demo Roofer E2E Evidence Report Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."