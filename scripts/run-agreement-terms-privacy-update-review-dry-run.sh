#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Agreement / Terms / Privacy Update Review Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator legal/policy review planning only"
echo "No legal publication, no website publication, no production data reads, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-agreement-terms-privacy-update-review-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Agreement / Terms / Privacy Update Review Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."