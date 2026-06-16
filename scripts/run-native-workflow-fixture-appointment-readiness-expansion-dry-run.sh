#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Appointment Readiness Expansion Dry-Run =="
echo "Mode: local fixture-only fake-data dry-run"
echo "No schema changes, no production data reads, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/run-native-workflow-fixture-state-model-dry-run.js
echo "PASS: fixture runner syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js
echo "PASS: existing fixture dry-run verifier syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js
echo "PASS: guard assertions verifier syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js
echo "PASS: reporting snapshot verifier syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js
echo "PASS: review queue verifier syntax check (node --check) succeeded."

node --check backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js
echo "PASS: appointment readiness verifier syntax check (node --check) succeeded."

node backend/scripts/run-native-workflow-fixture-state-model-dry-run.js > /dev/null
echo "PASS: fixture dry-run runner executed (stdout JSON only)."

node backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js

node backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js

node backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js

node backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js

node backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Native Workflow Fixture Appointment Readiness Expansion dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."