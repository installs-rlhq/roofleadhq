#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Runner State Correction After Build 168 Stale Evidence Dry Run =="
echo "Build 169 runner-state correction only; this wrapper does not run the actual runner, capture approval, or create a guard."
node backend/scripts/verify-native-workflow-fixture-runner-state-correction-after-build-168-stale-evidence-readonly.js
