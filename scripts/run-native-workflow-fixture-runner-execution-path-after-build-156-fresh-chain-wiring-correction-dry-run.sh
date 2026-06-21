#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Runner Execution Path After Build 156 Fresh Chain Wiring Correction Dry Run =="
echo "Review-only path correction. This wrapper does not rerun the runner."
node backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-build-156-fresh-chain-wiring-correction-readonly.js
