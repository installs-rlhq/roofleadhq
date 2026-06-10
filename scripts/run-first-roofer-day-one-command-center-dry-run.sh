#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Founder/Operator Day-One Command Center Dry-Run =="
echo "Mode: read-only verification and internal founder/operator rehearsal only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-roofer-day-one-command-center-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated day-one command center verifier
node backend/scripts/verify-first-roofer-day-one-command-center-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

# Run production gates (explicit, in addition to quality gate)
scripts/check-production-gates.sh

# Run safe readiness (context, milestones, aggregate where appropriate, build)
scripts/verify-safe-readiness.sh

echo "PASS: First Roofer Day-One Command Center dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
