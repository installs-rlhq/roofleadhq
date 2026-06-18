#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture P3 Future Approval Planning Packet Dry Run =="
echo "Mode: local fake-data P3 future approval planning packet; review-only."
echo "This wrapper validates committed P3 planning packet artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js
echo "PASS: P3 future approval planning packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture P3 Future Approval Planning Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."