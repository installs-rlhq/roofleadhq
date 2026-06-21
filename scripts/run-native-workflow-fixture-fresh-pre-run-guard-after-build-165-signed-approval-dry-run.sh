#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Fresh Pre-Run Guard After Build 165 Signed Approval Dry Run =="
echo "Fresh pre-run guard only. This wrapper does not run the runner."
node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-165-signed-approval-readonly.js
