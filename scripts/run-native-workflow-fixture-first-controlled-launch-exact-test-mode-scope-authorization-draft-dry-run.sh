#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft Dry Run =="
echo "Mode: local fake-data exact test-mode scope authorization draft dry-run; targeted verifier smoke."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js
echo "PASS: first controlled launch exact test-mode scope authorization draft runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js
echo "PASS: first controlled launch exact test-mode scope authorization draft verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js > /dev/null
echo "PASS: first controlled launch exact test-mode scope authorization draft dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js

echo "PASS: Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft Dry Run wrapper passed."