#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Pricing Volume Guardrail + Intake Alignment Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No live website publication, no Fillout changes, no legal publication, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-pricing-volume-guardrail-and-intake-alignment-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-pricing-volume-guardrail-and-intake-alignment-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Pricing Volume Guardrail + Intake Alignment dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."