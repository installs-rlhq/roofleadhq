#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Trial Day-One Operating Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Trial Day-One Operating Kit. Covers manual trial day-one operations after Go-Live Readiness PASS and RoofLeadHQ AI setup goes live: trial day-one command center, first lead intake review, response and follow-up monitoring (drafts only), missed-lead recovery review, booked homeowner appointment readiness review, contractor/roofer communication readiness, homeowner communication draft-review checklist, day-one blocker and escalation register with PASS/HOLD/BLOCKED, trial health PASS/HOLD/BLOCKED gate, day-one reporting snapshot, end-of-day handoff into 14-day trial operations; 9 copy-paste tracker tables (Trial Day-One Command Center Tracker, First Lead Intake Review Tracker, Response Follow-Up Monitoring Tracker, Missed-Lead Recovery Tracker, Booked Homeowner Appointment Readiness Tracker, Contractor Roofer Communication Tracker, Homeowner Communication Draft Review Tracker, Day-One Blocker Register, End-of-Day Trial Handoff Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer trial day-one operating kit verifier
node backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Trial Day-One Operating Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
