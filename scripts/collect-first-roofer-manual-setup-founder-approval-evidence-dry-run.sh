#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Founder Approval Evidence Dry-Run =="
echo "Mode: evidence collection only, dry-run only"
echo "No production activation, no external sends, no data mutation."

# Verify source of truth
scripts/verify-source-of-truth.sh

# Verify founder approval packet exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md

# Verify founder approval wrapper exists
test -f scripts/approve-first-roofer-manual-setup-founder-dry-run.sh

# Verify founder approval verifier exists
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js

# Verify operator acceptance packet exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md

# Verify operator acceptance wrapper exists
test -f scripts/accept-first-roofer-manual-setup-operator-dry-run.sh

# Verify operator runbook exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md

# Verify rehearsal exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md

# Verify planning QA exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md

# Verify required dry-run flags
grep -q "WORKSPACE_MODE=dry-run" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md
grep -q "SMS_ACTIVATION=false" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md

# Verify PASS/HOLD/BLOCKED evidence language
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE PASS" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE HOLD" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE BLOCKED" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md

# Run founder approval wrapper
scripts/approve-first-roofer-manual-setup-founder-dry-run.sh

# Run production gate checks
scripts/check-production-gates.sh

# Run aggregate safe readiness
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup founder approval evidence is complete, internally reviewable, and dry-run only."
