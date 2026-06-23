#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Fresh Pre-Run Guard After Build 171 Signed Approval Capture Dry Run =="
echo "Fresh pre-run guard only. This wrapper does not run the actual runner."
node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-171-signed-approval-capture-readonly.js
