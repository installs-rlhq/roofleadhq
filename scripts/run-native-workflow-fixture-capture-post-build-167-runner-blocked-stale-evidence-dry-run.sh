#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Capture Post Build 167 Runner Blocked Stale Evidence Dry Run =="
echo "Blocked/stale evidence capture only; this wrapper does not run the actual runner or create a new guard."
node backend/scripts/verify-native-workflow-fixture-capture-post-build-167-runner-blocked-stale-evidence-readonly.js
