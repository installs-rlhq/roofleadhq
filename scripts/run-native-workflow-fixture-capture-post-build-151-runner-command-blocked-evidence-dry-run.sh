#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Capture Post Build 151 Runner Command Blocked Evidence Dry Run =="
echo "Review-only blocked evidence capture. This wrapper does not invoke the actual external/sandbox 30-scenario runner."
node backend/scripts/verify-native-workflow-fixture-capture-post-build-151-runner-command-blocked-evidence-readonly.js
