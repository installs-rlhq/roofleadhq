#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Proof / Referral / Expansion Kit Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Proof / Referral / Expansion Kit. Covers manual success proof capture, referral request readiness (without pressure), testimonial/case-study readiness (customer-approved only), and safe expansion/plan-fit review (non-pushy) after the first paid roofer has completed the first month and monthly success review: guide customer proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation, roofer approval and consent checklist, testimonial readiness checklist, case-study readiness checklist, referral request readiness checklist, referral ask script and follow-up tracker, expansion / plan-fit review, non-pushy upgrade boundary, cancellation-risk and trust-risk guardrails, proof asset handoff, ongoing monthly operations handoff, and PASS/HOLD/BLOCKED proof/referral/expansion gate; 1. Internal-only dry-run scope, 2. Proof / referral / expansion purpose, 3. Inputs from Monthly Success / Retention Kit, 4. Customer proof evidence review, 5. Lead and booked homeowner appointment outcome summary, 6. Missed-lead recovery proof summary, 7. Value narrative preparation, 8. Roofer approval and consent checklist, 9. Testimonial readiness checklist, 10. Case-study readiness checklist, 11. Referral request readiness checklist, 12. Referral ask script and follow-up tracker, 13. Expansion / plan-fit review, 14. Non-pushy upgrade boundary, 15. Cancellation-risk and trust-risk guardrails, 16. Proof asset handoff, 17. Ongoing monthly operations handoff, 18. PASS/HOLD/BLOCKED proof/referral/expansion gate, 19. Safety guardrails, 20. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Proof Evidence Tracker, Lead Appointment Outcome Summary Tracker, Missed-Lead Recovery Proof Tracker, Value Narrative Tracker, Roofer Consent Approval Tracker, Testimonial Readiness Tracker, Case Study Readiness Tracker, Referral Request Tracker, Expansion Plan-Fit Review Tracker), exhaustive safety. No live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, payment automation, estimate/quote/invoice automation, or external service calls is activated. Uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract. References Monthly Success / Retention Kit (primary input) + First-Month Operating Kit + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets. Internal-only / dry-run / founder-operator-only. No customer proof publication without explicit roofer consent. No pressure referral language. No guarantees."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer proof referral expansion kit verifier
node backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Proof / Referral / Expansion Kit dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
