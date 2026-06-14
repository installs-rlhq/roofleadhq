#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Production Security / Auth / RLS / Schema Readiness Plan Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Production Security / Auth / RLS / Schema Readiness Plan. Practical planning and acceptance packet Jason (founder/operator) must use before any production security/auth/RLS/schema implementation begins. Converts the multi-roofer safety gate (at cc80caf) into a concrete implementation-readiness plan with clear hold gates, required decisions, risks, acceptance criteria, and handoff artifacts. 1. Internal-only dry-run scope, 2. Production security readiness purpose, 3. Inputs from Multi-Roofer Safety / Tenant-Isolation Acceptance Gate, 4. Auth readiness decision log, 5. RLS readiness decision log, 6. Schema readiness decision log, 7. Migration readiness decision log, 8. Tenant isolation acceptance criteria, 9. Data access boundary acceptance criteria, 10. Contractor portal hold boundary, 11. Production write hold boundary, 12. Live automation hold boundary, 13. Security implementation prerequisite checklist, 14. Risk and blocker register, 15. Approval evidence checklist, 16. Implementation handoff artifact, 17. PASS/HOLD/BLOCKED production security readiness gate, 18. Safety guardrails, 19. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Auth Readiness Decision Tracker, RLS Readiness Decision Tracker, Schema Readiness Decision Tracker, Migration Readiness Decision Tracker, Tenant Isolation Acceptance Tracker, Data Access Boundary Tracker, Production Write Hold Tracker, Contractor Portal Hold Tracker, Security Readiness Gate Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. References MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (cc80caf) + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md. Dry-run/internal-only/founder-operator-only. Planning/readiness/acceptance only. No auth/RLS/security, schema, migrations, production writes, contractor portal, live automation, credentials, env changes, or backend/src changes."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated production security auth rls schema readiness plan verifier
node backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: Production Security / Auth / RLS / Schema Readiness Plan dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
