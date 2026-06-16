#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Entity State Implementation Plan Dry-Run =="
echo "Mode: read-only verification and native workflow entity/state implementation planning only"
echo "No schema changes, no production data reads, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-entity-state-implementation-plan-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Native Workflow Entity State Implementation Plan dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."