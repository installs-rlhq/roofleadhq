#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox/Test-Mode Human Review Packet Dry Run =="
echo "Mode: local fake-data sandbox/test-mode human review packet dry-run; fast lane smoke."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available via scripts/verify-safe-readiness.sh."

node --check backend/scripts/run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.js
echo "PASS: sandbox test mode human review packet runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run-readonly.js
echo "PASS: sandbox test mode human review packet verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.js > /dev/null
echo "PASS: sandbox test mode human review packet dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run-readonly.js

bash scripts/verify-safe-readiness-fast.sh

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Sandbox/Test-Mode Human Review Packet Dry Run wrapper passed."
echo "Next: Terminal 1 should run full regression lane (scripts/verify-safe-readiness.sh with log redirection) before merge."