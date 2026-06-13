#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer First-Month Operating Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer First-Month Operating Kit. Covers manual first-month kickoff, ongoing lead/appointment tracking, missed-lead recovery review, weekly value reporting, roofer feedback, blocker handling, cancellation-risk monitoring, support boundaries, monthly success review, and handoff into ongoing monthly operations after the first paid roofer converts from trial into paid status. 9 copy-paste tracker tables (First-Month Kickoff Tracker, Paid Customer Status Tracker, Lead Intake Operating Tracker, Response Follow-Up Monitoring Tracker, Missed-Lead Recovery Review Tracker, Booked Homeowner Appointment Tracker, Weekly Value Report Tracker, Roofer Feedback Support Tracker, First-Month Success Review Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer first-month operating kit verifier
node backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer First-Month Operating Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
