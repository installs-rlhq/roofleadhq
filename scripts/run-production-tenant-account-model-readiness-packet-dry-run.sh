#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Production Tenant / Account Model Readiness Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Production Tenant / Account Model Readiness Packet (Slice 2). Jason (founder/operator) must use this packet to define and approve the tenant/account model before any future schema, auth, RLS, production writes, contractor portal, dashboard exposure, or live integration work begins. 1. Internal-only dry-run scope, 2. Tenant/account model readiness purpose, 3. Source-of-truth prerequisite, 4. Input from Production Config / Env Readiness Audit Packet, 5. Tenant/account model boundary, 6. Roofer account inventory readiness, 7. Homeowner lead/account association readiness, 8. Tenant identifier and naming readiness, 9. Tenant isolation assumption checklist, 10. Role and access boundary readiness, 11. Account lifecycle readiness, 12. Guided Setup account data requirements, 13. Multi-roofer expansion constraints, 14. Reporting and account aggregation boundaries, 15. Contractor dashboard/portal exposure hold, 16. Production write/schema/auth/RLS hold gates, 17. Account model verifier expectations, 18. Owner approval evidence checklist, 19. Tenant/account risk and blocker register, 20. PASS/HOLD/BLOCKED tenant/account readiness decision, 21. Safety guardrails, 22. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Tenant Account Readiness Tracker, Roofer Account Inventory Tracker, Homeowner Lead Association Tracker, Tenant Identifier Naming Tracker, Tenant Isolation Assumption Tracker, Role Access Boundary Tracker, Account Lifecycle Readiness Tracker, Portal Exposure Hold Tracker, Tenant Account Readiness Decision Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Includes the Guided Setup phone-number usage and calendar configuration readiness dependency (internal-only) without activating phone/SMS/calls/calendar booking. Internal-only / dry-run / founder-operator-only. Readiness/planning/approval only. No tenant accounts, users, account records, schema, auth, RLS, migrations, production data writes, backend/src changes, public routes, contractor portal exposure, external calls, live sends, scheduler/cron/dispatcher activation, credentials, env changes, or production behavior."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated production tenant account model readiness packet verifier
node backend/scripts/verify-production-tenant-account-model-readiness-packet-readonly.js

# Run agent product quality gate verifier directly (per specification: only this + node--check + verifier; no aggregate/source-of-truth-dependent verifiers in wrapper)
node backend/scripts/verify-agent-product-quality-gate-readonly.js

echo "PASS: Production Tenant / Account Model Readiness Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
