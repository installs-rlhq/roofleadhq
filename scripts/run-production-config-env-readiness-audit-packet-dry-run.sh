#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Production Config / Env Readiness Audit Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the Production Config / Env Readiness Audit Packet (Slice 1). Jason (founder/operator) must use this packet to audit production configuration, env vars, secrets placeholders, vendor settings, domain settings, webhook settings, feature flags, integration readiness markers, and activation holds before any future implementation slice begins. 1. Internal-only dry-run scope, 2. Production config/env audit purpose, 3. Source-of-truth prerequisite, 4. Input from Production Implementation Sequencing and Approval Plan, 5. Config inventory boundary, 6. Env variable placeholder inventory, 7. Secret handling and no-secret-output rule, 8. Vendor credential readiness checklist, 9. Supabase config readiness checklist, 10. Twilio/SMS config readiness checklist, 11. Vapi/calling config readiness checklist, 12. Calendar booking config readiness checklist, 13. Resend/email config readiness checklist, 14. Lindy/automation config readiness checklist, 15. Domain/webhook/public route readiness checklist, 16. Feature flag and kill-switch readiness checklist, 17. Local/staging/production separation checklist, 18. Config owner approval evidence checklist, 19. Config risk and blocker register, 20. PASS/HOLD/BLOCKED config/env readiness decision, 21. Safety guardrails, 22. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Source-of-Truth Config Audit Tracker, Env Placeholder Inventory Tracker, Secret Handling Hold Tracker, Vendor Credential Readiness Tracker, Supabase Config Readiness Tracker, Live Integration Config Hold Tracker, Domain Webhook Route Readiness Tracker, Feature Flag Kill-Switch Tracker, Config Env Readiness Decision Tracker). Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery. Guided Setup happens first. The 14-day trial begins after RoofLeadHQ AI setup goes live. An automated email is sent 2 days before the first monthly payment. Cancel anytime. No long-term contract. Internal-only / dry-run / founder-operator-only."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated production config env readiness audit packet verifier
node backend/scripts/verify-production-config-env-readiness-audit-packet-readonly.js

# Run agent product quality gate verifier directly (per specification: only this + node--check + verifier; no aggregate/source-of-truth-dependent verifiers in wrapper)
node backend/scripts/verify-agent-product-quality-gate-readonly.js

echo "PASS: Production Config / Env Readiness Audit Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
