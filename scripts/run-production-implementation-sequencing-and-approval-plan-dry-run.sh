#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Production Implementation Sequencing and Approval Plan Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Production Implementation Sequencing and Approval Plan. Jason (founder/operator) must use before any production implementation slice begins. Converts the Final Production Go-Live Acceptance Gate (f3c3e80) into an ordered implementation roadmap with approval checkpoints, risk controls, rollback requirements, verifier expectations, and PASS/HOLD/BLOCKED decision points for each future implementation slice. 1. Internal-only dry-run scope, 2. Implementation sequencing purpose, 3. Source-of-truth prerequisite, 4. Final go-live gate input summary, 5. Implementation slice approval model, 6. Slice 1: production configuration inventory / env readiness audit, 7. Slice 2: tenant/account model implementation readiness, 8. Slice 3: schema/migration implementation readiness, 9. Slice 4: auth/RLS/security implementation readiness, 10. Slice 5: production write boundary readiness, 11. Slice 6: integration adapter readiness, 12. Slice 7: live communication activation readiness, 13. Slice 8: calendar booking activation readiness, 14. Slice 9: contractor dashboard/portal readiness, 15. Slice 10: payment/billing automation readiness, 16. Required verifier model for each slice, 17. Rollback and kill-switch requirements, 18. Owner approval evidence checklist, 19. Risk and blocker register, 20. PASS/HOLD/BLOCKED implementation sequencing decision, 21. Safety guardrails, 22. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Source-of-Truth Readiness Tracker, Implementation Slice Approval Tracker, Config Env Readiness Tracker, Tenant Schema Auth Readiness Tracker, Production Write Boundary Tracker, Integration Activation Hold Tracker, Rollback Kill-Switch Tracker, Owner Approval Evidence Tracker, Implementation Sequencing Decision Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Internal-only / dry-run / founder-operator-only. Sequencing/readiness/approval only. No implementation or activation of live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migrations, auth/RLS/security implementation, contractor portal, backend/src changes, or production behavior."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated production implementation sequencing and approval plan verifier
node backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Production Implementation Sequencing and Approval Plan dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
