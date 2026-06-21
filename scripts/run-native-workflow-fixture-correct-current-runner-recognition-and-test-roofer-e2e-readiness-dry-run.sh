#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Correct Current Runner Recognition And Test Roofer E2E Readiness Dry Run =="
echo "Review-only correction packet. This wrapper does not invoke the actual external/sandbox validation runner."
node backend/scripts/verify-native-workflow-fixture-correct-current-runner-recognition-and-test-roofer-e2e-readiness-readonly.js
