#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Runner Execution Path After Build 151 Fresh Chain Wiring Correction Dry Run =="
echo "Review-only path correction. This wrapper does not invoke the actual external/sandbox 30-scenario runner."
node backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-build-151-fresh-chain-wiring-correction-readonly.js
