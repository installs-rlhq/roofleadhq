#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Post-Run Evidence and Demo E2E Readiness Dry Run =="
echo "Mode: local fake-data post-run evidence capture + demo roofer E2E execution readiness; review-only."
echo "This wrapper documents completed post-run evidence and next-step demo roofer readiness — it does NOT approve or execute activation."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-readonly.js
echo "PASS: post-run evidence and demo E2E readiness verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-readonly.js

echo "PASS: Native Workflow Fixture Post-Run Evidence and Demo E2E Readiness Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."