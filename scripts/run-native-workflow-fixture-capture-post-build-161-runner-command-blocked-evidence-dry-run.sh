#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Capture Post Build 161 Runner Command Blocked Evidence Dry Run =="
echo "Review-only blocked evidence capture. This wrapper does not rerun the runner."
node backend/scripts/verify-native-workflow-fixture-capture-post-build-161-runner-command-blocked-evidence-readonly.js
