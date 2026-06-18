#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture First Controlled Launch Final Activation Command Draft Dry Run =="
echo "Mode: local fake-data final activation command draft verifier smoke only."
echo "This wrapper documents a proposed command draft — it does NOT approve or execute activation."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js
echo "PASS: first controlled launch final activation command draft verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js

echo "PASS: Native Workflow Fixture First Controlled Launch Final Activation Command Draft Dry Run wrapper passed."