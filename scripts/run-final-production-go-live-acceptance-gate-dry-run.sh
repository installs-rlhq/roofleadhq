#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Final Production Go-Live Acceptance Gate Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the master Final Production Go-Live Acceptance Gate. Jason (founder/operator) must use before any future approval to start production implementation or live integration activation. Combines the prior first-paid launch system, second paid repeatability, multi-roofer safety, production security/auth/rls/schema readiness, and live integration activation readiness into one final PASS/HOLD/BLOCKED go-live decision artifact. 1. Internal-only dry-run scope, 2. Final go-live acceptance purpose, 3. Source-of-truth prerequisite, 4. First paid roofer launch readiness gate, 5. Second paid roofer repeatability readiness gate, 6. Multi-roofer safety / tenant isolation gate, 7. Production security / auth / RLS / schema gate, 8. Live integration activation gate, 9. Data protection and access boundary gate, 10. Customer-facing language and offer boundary gate, 11. Rollback and kill-switch readiness gate, 12. Credential and environment-change hold gate, 13. Production write hold gate, 14. Contractor portal / dashboard hold gate, 15. External integration hold gate, 16. Founder/operator approval evidence checklist, 17. Risk and blocker register, 18. Final implementation handoff artifact, 19. PASS/HOLD/BLOCKED final go-live decision, 20. Safety guardrails, 21. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (First Paid Launch Readiness Tracker, Second Paid Repeatability Tracker, Multi-Roofer Safety Tracker, Production Security Readiness Tracker, Live Integration Readiness Tracker, Data Protection Access Boundary Tracker, Rollback Kill-Switch Tracker, Founder Approval Evidence Tracker, Final Go-Live Decision Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Canonical source of truth before this worktree verified at a11bfbd. Rollback/kill-switch readiness and source-of-truth verification required before any future activation or implementation approval. Internal-only / dry-run / founder-operator-only. Final readiness/acceptance only."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated final production go-live acceptance gate verifier
node backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Final Production Go-Live Acceptance Gate dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
