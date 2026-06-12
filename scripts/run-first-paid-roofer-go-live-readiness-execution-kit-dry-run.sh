#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Go-Live Readiness Execution Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Go-Live Readiness Execution Kit. Covers post-Guided-Setup manual readiness review: setup completion review, lead source readiness, response/follow-up readiness, booking/calendar readiness, reporting readiness, trial/payment language confirmation with exact approved strings (RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery; Guided Setup happens first; The 14-day trial begins after RoofLeadHQ AI setup goes live; An automated email is sent 2 days before the first monthly payment; Cancel anytime; No long-term contract), data protection and tenant isolation checkpoint (refs WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md), go-live blocker register with PASS/HOLD/BLOCKED, decision gate, setup-to-trial handoff artifact, trial day-one readiness handoff, 9 copy-paste tracker tables (Setup Completion Review Tracker, Lead Source Readiness Tracker, Response Follow-Up Readiness Tracker, Booking Calendar Readiness Tracker, Reporting Readiness Tracker, Trial Payment Language Confirmation Tracker, Data Protection Checkpoint Tracker, Go-Live Blocker Register, Setup-to-Trial Handoff Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer go-live readiness execution kit verifier
node backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Go-Live Readiness Execution Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
