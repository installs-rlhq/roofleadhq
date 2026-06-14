#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Second Paid Roofer Repeatable Launch Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Second Paid Roofer Repeatable Launch Kit. Manual repeatable launch system for preparing a second paid roofer launch using the completed first paid roofer operating sequence (post proof/referral/expansion) as template: qualify second roofer, reuse safe setup/offer/language patterns, prepare Guided Setup, go-live, trial day-one, trial reporting/success review, trial conversion/payment, first-month operating, monthly retention, proof/referral/expansion reuse, multi-roofer safety/tenant-isolation boundary confirmation, blocker register, handoff artifact, and PASS/HOLD/BLOCKED second-roofer launch gate. 1. Internal-only dry-run scope, 2. Second paid roofer repeatable launch purpose, 3. Inputs from first paid roofer proof/referral/expansion kit, 4. Second roofer qualification checklist, 5. Referral/source intake review, 6. Offer and public language confirmation, 7. Guided Setup reuse checklist, 8. Go-live readiness reuse checklist, 9. Trial day-one reuse checklist, 10. Trial reporting and success review reuse checklist, 11. Trial conversion and payment handoff reuse checklist, 12. First-month operating reuse checklist, 13. Monthly retention reuse checklist, 14. Proof/referral/expansion reuse checklist, 15. Multi-roofer safety and tenant-isolation boundary, 16. Second roofer blocker and readiness register, 17. Repeatable launch handoff artifact, 18. PASS/HOLD/BLOCKED second-roofer launch gate, 19. Safety guardrails, 20. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Second Roofer Qualification Tracker, Referral Source Intake Tracker, Offer Language Confirmation Tracker, Guided Setup Reuse Tracker, Go-Live Readiness Reuse Tracker, Trial Operations Reuse Tracker, First-Month Monthly Handoff Tracker, Multi-Roofer Safety Boundary Tracker, Second Roofer Launch Gate Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Dry-run/internal-only/founder-operator-only. Does not authorize or implement production multi-tenant scale, data writes, contractor portal, auth/RLS/security, or live automation of any kind."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated second paid roofer repeatable launch kit verifier
node backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Second Paid Roofer Repeatable Launch Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
