#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Contractor Estimate Review Command Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator rehearsal only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated contractor estimate review command packet verifier
node backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Roofer Contractor Estimate Review Command Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
