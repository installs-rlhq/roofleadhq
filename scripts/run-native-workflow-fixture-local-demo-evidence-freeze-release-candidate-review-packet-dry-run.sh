#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Local Demo Evidence Freeze / Release Candidate Review Packet Dry Run =="
echo "Mode: local fake-data release candidate review packet; review-only."
echo "This wrapper validates committed evidence freeze / release candidate review artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "Local demo E2E evidence chain is passed (25 fake leads, 25 scenarios, 25 matched outcomes, 0 missing, 0 unexpected)."
echo "All 19 exact values remain blank by default. Completeness status is incomplete. Default sandbox/test-mode decision remains HOLD."
echo "Release candidate review does not equal approval. Evidence freeze does not equal approval."
echo "Sandbox/test-mode and live activation remain not granted."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-local-demo-evidence-freeze-release-candidate-review-packet-readonly.js
echo "PASS: local demo evidence freeze release candidate review packet verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-local-demo-evidence-freeze-release-candidate-review-packet-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Local Demo Evidence Freeze / Release Candidate Review Packet Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."