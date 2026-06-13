#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Trial Reporting + Success Review Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Trial Reporting + Success Review Kit. Covers manual trial reporting and success review during and at the end of the 14-day trial after Trial Day One: daily trial reporting rhythm, lead intake and source performance review, response and follow-up outcome review, missed-lead recovery outcome review, booked homeowner appointment tracking, roofer communication and feedback review, trial health scorecard, blocker and risk review, pre-payment email readiness checklist, cancellation/no-go handling, first monthly payment handoff readiness, success review call agenda and script, end-of-trial PASS/HOLD/BLOCKED decision gate; 9 copy-paste tracker tables (Daily Trial Reporting Tracker, Lead Source Performance Tracker, Response Follow-Up Outcome Tracker, Missed-Lead Recovery Outcome Tracker, Booked Homeowner Appointment Tracker, Roofer Feedback Review Tracker, Trial Health Scorecard Tracker, Pre-Payment Email Readiness Tracker, End-of-Trial Decision Handoff Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer trial reporting + success review kit verifier
node backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Trial Reporting + Success Review Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
