#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Channel Replay Acceptance Gate Dry Run =="
echo "Mode: local fake-data channel replay acceptance gate dry-run; fast lane smoke."
echo "No schema changes, no production data reads, no production or test-mode activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available via scripts/verify-safe-readiness.sh."

node --check backend/scripts/run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.js
echo "PASS: channel replay acceptance gate runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-channel-replay-acceptance-gate-dry-run-readonly.js
echo "PASS: channel replay acceptance gate verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.js > /dev/null
echo "PASS: channel replay acceptance gate dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-channel-replay-acceptance-gate-dry-run-readonly.js

bash scripts/verify-safe-readiness-fast.sh

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Channel Replay Acceptance Gate Dry Run wrapper passed."
echo "Next: Terminal 1 should run full regression lane (scripts/verify-safe-readiness.sh with log redirection) before merge."