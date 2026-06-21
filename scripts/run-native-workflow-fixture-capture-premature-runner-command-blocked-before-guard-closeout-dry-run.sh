#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Capture Premature Runner Command Blocked Before Guard Closeout Dry Run =="
echo "Blocked-evidence capture only; this wrapper does not run the actual runner."
node backend/scripts/verify-native-workflow-fixture-capture-premature-runner-command-blocked-before-guard-closeout-readonly.js
