#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture First Controlled Launch Approval Boundary Guard Dry Run =="
echo "Mode: local fake-data approval boundary guard dry-run; fast lane smoke."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available via scripts/verify-safe-readiness.sh for milestone/high-risk review."

node --check backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.js
echo "PASS: first controlled launch approval boundary guard runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run-readonly.js
echo "PASS: first controlled launch approval boundary guard verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.js > /dev/null
echo "PASS: first controlled launch approval boundary guard dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run-readonly.js

bash scripts/verify-safe-readiness-fast.sh

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture First Controlled Launch Approval Boundary Guard Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available via scripts/verify-safe-readiness.sh for milestone/high-risk review."