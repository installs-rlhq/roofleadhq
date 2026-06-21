#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Fresh Runner Execution Decision After Build 156 Fresh Chain Wiring Correction Dry Run =="
echo "Review-only fresh decision/template. This wrapper does not run the runner."
node backend/scripts/verify-native-workflow-fixture-fresh-runner-execution-decision-after-build-156-fresh-chain-wiring-correction-readonly.js
