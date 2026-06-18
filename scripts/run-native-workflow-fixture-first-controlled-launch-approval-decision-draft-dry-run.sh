#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture First Controlled Launch Approval Decision Draft Dry Run =="
echo "Mode: local fake-data approval decision draft dry-run; targeted verifier smoke."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-decision-draft.js
echo "PASS: first controlled launch approval decision draft runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-decision-draft-readonly.js
echo "PASS: first controlled launch approval decision draft verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-decision-draft.js > /dev/null
echo "PASS: first controlled launch approval decision draft dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-decision-draft-readonly.js

echo "PASS: Native Workflow Fixture First Controlled Launch Approval Decision Draft Dry Run wrapper passed."