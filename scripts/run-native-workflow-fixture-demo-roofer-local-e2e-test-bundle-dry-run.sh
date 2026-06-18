#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Demo Roofer Local E2E Test Bundle Dry Run =="
echo "Mode: local fake-data demo roofer E2E test bundle; review-only."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js
echo "PASS: demo roofer local E2E test bundle verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Demo Roofer Local E2E Test Bundle Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."