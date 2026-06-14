#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Multi-Roofer Safety / Tenant-Isolation Acceptance Gate Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Multi-Roofer Safety / Tenant-Isolation Acceptance Gate. Manual acceptance gate and readiness packet Jason (founder/operator) must pass before moving beyond one-at-a-time dry-run roofer operations into any multi-roofer production-scale work. Turns prior Data Protection / Tenant Isolation planning into a concrete PASS/HOLD/BLOCKED gate preventing accidental production scale, production data writes, contractor portal exposure, auth/RLS/security changes, or live automation before explicit approval. 1. Internal-only dry-run scope, 2. Multi-roofer safety acceptance purpose, 3. Inputs from Second Paid Roofer Repeatable Launch Kit, 4. Data protection readiness review, 5. Tenant-isolation readiness review, 6. Production auth/RLS/security hold gate, 7. Production schema/migration hold gate, 8. Production data-write hold gate, 9. Contractor portal exposure hold gate, 10. Live automation hold gate, 11. External integration hold gate, 12. Multi-roofer operating boundary, 13. One-at-a-time dry-run operating rule, 14. Approval evidence checklist, 15. Risk and blocker register, 16. Pre-production implementation handoff artifact, 17. PASS/HOLD/BLOCKED multi-roofer safety gate, 18. Safety guardrails, 19. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Data Protection Readiness Tracker, Tenant Isolation Readiness Tracker, Auth RLS Security Hold Tracker, Schema Migration Hold Tracker, Production Data Write Hold Tracker, Contractor Portal Exposure Hold Tracker, Live Automation Hold Tracker, External Integration Hold Tracker, Multi-Roofer Safety Gate Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. References SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md (at 137574f), FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md, FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md, FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md, FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md, WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md. Dry-run / internal-only / founder-operator-only. Acceptance/readiness only. Does not implement auth/RLS/security, schema, migrations, production writes, contractor portal, live automation, or external integrations. Asserts no forbidden implementation files were changed (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation)."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated multi-roofer safety tenant-isolation acceptance gate verifier
node backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Multi-Roofer Safety / Tenant-Isolation Acceptance Gate dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
