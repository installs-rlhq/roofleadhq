#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Paid Roofer Prospect Pipeline / Tracker Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "This is the First Paid Roofer Prospect Pipeline / Tracker Packet. Covers prospect source list, ideal fit filters, bad-fit/disqualifiers, prospect tracker table with 21 concrete columns, outreach/follow-up/demo status stages, fit scorecard, evidence log, next action queue, handoff readiness to Sales Outreach System Packet, no-go/nurture handling, weekly review checklist, daily command center, and all 15 explicit safety guardrails enforced. No live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated first paid roofer prospect pipeline tracker packet verifier
node backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js

# Run the agent product quality gate (which itself runs its verifier, production gates, and safe readiness)
scripts/check-agent-product-quality-gate.sh

echo "PASS: First Paid Roofer Prospect Pipeline / Tracker Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."
