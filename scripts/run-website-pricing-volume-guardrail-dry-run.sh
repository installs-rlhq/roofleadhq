#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Website Pricing Volume Guardrail Dry-Run =="
echo "Mode: read-only verification of public website pricing/advertising copy"
echo "Static website copy only. No backend live activation, no integrations activated, no external sends."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-website-pricing-volume-guardrail-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-website-pricing-volume-guardrail-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Website Pricing Volume Guardrail dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."