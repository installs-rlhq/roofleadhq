#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Monthly Success / Retention Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Monthly Success / Retention Kit. Covers manual monthly success, retention, value reporting, and ongoing customer-status tracking after the first paid roofer completes the first month and moves into ongoing monthly operations: guide monthly value reporting, roofer feedback review, appointment/lead trend review, missed-lead recovery review, retention-risk detection, blocker handling, support boundaries, next-month operating plan, cancellation-risk handling, and ongoing customer success handoff; 1. Internal-only dry-run scope, 2. Monthly success and retention purpose, 3. Inputs from First-Month Operating Kit, 4. Monthly customer status confirmation, 5. Monthly lead and appointment trend review, 6. Response and follow-up performance review, 7. Missed-lead recovery performance review, 8. Monthly value report preparation, 9. Roofer feedback and satisfaction review, 10. Retention-risk and cancellation-risk review, 11. Support boundary and scope review, 12. Blocker and issue escalation register, 13. Next-month operating plan, 14. Monthly success review agenda and script, 15. Ongoing customer success handoff, 16. Monthly PASS/HOLD/BLOCKED retention gate, 17. Safety guardrails, 18. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Monthly Customer Status Tracker, Lead Appointment Trend Review Tracker, Response Follow-Up Performance Tracker, Missed-Lead Recovery Performance Tracker, Monthly Value Report Tracker, Roofer Feedback Satisfaction Tracker, Retention Risk Review Tracker, Monthly Issue Escalation Tracker, Next-Month Operating Plan Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-monthly-success-retention-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer monthly success retention kit verifier
node backend/scripts/verify-first-paid-roofer-monthly-success-retention-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Monthly Success / Retention Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
