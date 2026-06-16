#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Post-Inspection Follow-Up + Feedback Capture Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No live automations, no sends, no CRM connection, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-post-inspection-follow-up-feedback-capture-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-post-inspection-follow-up-feedback-capture-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: Post-Inspection Follow-Up + Feedback Capture Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."