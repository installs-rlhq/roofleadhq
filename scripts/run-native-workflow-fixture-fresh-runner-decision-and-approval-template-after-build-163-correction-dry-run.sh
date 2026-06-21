#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "== Native Workflow Fixture Fresh Runner Decision And Approval Template After Build 163 Correction Dry Run =="
echo "Review-only decision/template packet. This wrapper does not invoke the actual external/sandbox validation runner."
node backend/scripts/verify-native-workflow-fixture-fresh-runner-decision-and-approval-template-after-build-163-correction-readonly.js
