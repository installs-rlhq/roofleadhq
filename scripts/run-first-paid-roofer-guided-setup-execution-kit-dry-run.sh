#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Guided Setup Execution Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Guided Setup Execution Kit. Covers post-yes/post-close manual Guided Setup: intake checklist, business profile worksheet, lead source worksheet, response/follow-up preferences, booking/calendar preferences, reporting preferences, blocker register with PASS/HOLD/BLOCKED, call agenda, customer-facing script (Guided Setup first + 14-day trial after setup live + automated email 2d before first monthly + cancel anytime + no contract), go-live readiness, setup-to-launch handoff, 9 copy-paste tracker tables, exhaustive safety. No live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer guided setup execution kit verifier
node backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Guided Setup Execution Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
