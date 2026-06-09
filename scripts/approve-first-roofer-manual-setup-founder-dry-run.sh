#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Founder Approval Dry-Run =="
echo "Mode: founder approval only, dry-run only"
echo "No production activation, no external sends, no data mutation."

# Verify source of truth
scripts/verify-source-of-truth.sh

# Verify operator acceptance packet exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md

# Verify operator acceptance wrapper exists
test -f scripts/accept-first-roofer-manual-setup-operator-dry-run.sh

# Verify operator acceptance verifier exists
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js

# Verify operator runbook exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md

# Verify manual setup rehearsal exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md

# Verify manual setup planning QA exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md

# Verify required dry-run safety flags
grep -q "WORKSPACE_MODE=dry-run" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md
grep -q "SMS_ACTIVATION=false" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md

# Verify explicit do-not-activate gates
grep -q "No production activation" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md

# Run the operator acceptance wrapper
scripts/accept-first-roofer-manual-setup-operator-dry-run.sh

# Run production gate checks
scripts/check-production-gates.sh

# Run aggregate safe readiness
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup founder approval is ready for internal dry-run founder review only."
