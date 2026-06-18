#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Demo Roofer Local E2E Walkthrough + Observation/Triage Dry Run =="
echo "Mode: local fake-data demo walkthrough + observation/triage; review-only."
echo "This wrapper validates committed walkthrough and observation/triage artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js
echo "PASS: demo roofer local E2E walkthrough + observation/triage verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Demo Roofer Local E2E Walkthrough + Observation/Triage Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."