#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Website Lead-to-Inspection Positioning Update Dry-Run =="
echo "Mode: read-only verification and internal founder/operator rehearsal only"
echo "No production activation, no external sends, no data mutation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Do not run aggregate readiness, safe readiness, handoff integrity, launch safety meta, or source-of-truth commit chain from the worktree as a required pre-push step."

# Run node --check on the new website lead-to-inspection positioning update verifier (syntax only)
node --check backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

# Run the dedicated website lead-to-inspection positioning update verifier
node backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js

# Run agent product quality gate verifier directly (per user spec for this wrapper)
node backend/scripts/verify-agent-product-quality-gate-readonly.js

echo "PASS: Website Lead-to-Inspection Positioning Update dry-run wrapper passed."
echo "Next: run the specified worktree-safe checks only (node --check, node verifier, wrapper, quality gate, npm build, agent-diff-proof, git diff --stat, git status --short). Stop. Do not commit. Do not push."
