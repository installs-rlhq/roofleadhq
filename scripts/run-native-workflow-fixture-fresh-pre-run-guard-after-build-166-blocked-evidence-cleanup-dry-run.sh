#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Fresh Pre-Run Guard After Build 166 Blocked Evidence Cleanup Dry Run =="
echo "Fresh pre-run guard only. This wrapper does not run the actual runner."
node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup-readonly.js
