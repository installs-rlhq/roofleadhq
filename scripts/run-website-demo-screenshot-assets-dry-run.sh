#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Website Demo Screenshot Assets Dry-Run =="
echo "Mode: read-only verification and internal founder/operator rehearsal only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

# Run node --check on the new screenshot assets verifier
node --check backend/scripts/verify-website-demo-screenshot-assets-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated website demo screenshot assets verifier
node backend/scripts/verify-website-demo-screenshot-assets-readonly.js

# Run prior website founder-led verifiers for combined safety baseline (consistent with polish pattern)
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js

# Run agent product quality gate verifier directly (per verification commands + aggregate wiring requirement)
node backend/scripts/verify-agent-product-quality-gate-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Website Demo Screenshot Assets dry-run wrapper passed."
echo "Next: run scripts/show-diff-proof.sh and confirm all gates before any further review consideration."
