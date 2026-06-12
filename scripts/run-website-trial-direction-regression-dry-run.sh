#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Website Trial Direction Regression Dry-Run =="
echo "Mode: read-only verification and internal founder/operator rehearsal only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Protects revised public direction: RoofLeadHQ AI + booked inspections/appointments + Guided Setup first + 14-day trial after live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract."
echo "Public surfaces: clean revised AI/trial language only. Internal founder/manual/review/coordination language stays in dry-run safety artifacts with explicit internal-only scoping."

# Run node --check on the new trial direction regression verifier (syntax only)
node --check backend/scripts/verify-website-trial-direction-regression-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated website trial direction regression verifier
node backend/scripts/verify-website-trial-direction-regression-readonly.js

# Run prior website verifiers for combined safety baseline (positioning + copy polish + demo + screenshot + historical founder-led cleanup layers)
node backend/scripts/verify-website-positioning-recovery-readonly.js
node backend/scripts/verify-website-copy-layout-polish-readonly.js
node backend/scripts/verify-website-homepage-screenshot-placement-readonly.js
node backend/scripts/verify-website-demo-screenshot-assets-readonly.js
node backend/scripts/verify-website-founder-led-launch-copy-readonly.js
node backend/scripts/verify-website-founder-led-conversion-polish-readonly.js

# Run agent product quality gate verifier directly (per verification commands + aggregate wiring requirement)
node backend/scripts/verify-agent-product-quality-gate-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Website Trial Direction Regression dry-run wrapper passed."
echo "Revised 14-day trial direction + AI booked appointments positioning + automated 2-day pre-billing email + cancel/no-contract language protected from regression."
echo "All forbidden public phrases (founder-led, manual review/coordination, Live Automation Disabled, day-15 billing, 7/5-day pilot, booked-jobs, guarantees, auto-estimate/quote/invoice/payment) confirmed absent from public-facing website files."
echo "Public vs internal boundary upheld: context docs clarify internal-only scope for founder/operator/manual artifacts."
echo "Next: run scripts/show-diff-proof.sh and confirm all gates before any further review consideration."
