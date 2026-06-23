#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Capture Signed Runner Approval After Build 170 Dry Run =="
echo "Approval-capture only. This wrapper does not run the runner or pass the guard."
node backend/scripts/verify-native-workflow-fixture-capture-signed-runner-approval-after-build-170-readonly.js
