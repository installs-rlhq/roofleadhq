#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Agent Product Quality Gate =="
echo "Mode: read-only verification of product-depth standard"
echo "Local read-only only. No Supabase reads or writes."
echo "No external service calls."
echo "No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls."
echo "No route, cron, scheduler, or dispatcher activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

# Run node --check on the verifier (syntax only)
node --check backend/scripts/verify-agent-product-quality-gate-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated product quality verifier
node backend/scripts/verify-agent-product-quality-gate-readonly.js

# Run production gates
scripts/check-production-gates.sh

# Run safe readiness (context, milestones, aggregate, build)
scripts/verify-safe-readiness.sh

echo "PASS: Agent product quality gate passed. Reusable depth standard enforced for future agent tasks."
echo "Next: run scripts/agent-diff-proof.sh and confirm Terminal 1 source-of-truth before any commit consideration."
