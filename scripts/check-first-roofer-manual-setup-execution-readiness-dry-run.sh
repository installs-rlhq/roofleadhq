#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Execution Readiness Dry-Run =="
echo "Mode: execution readiness only, dry-run only"
echo "No production activation, no external sends, no data mutation."

# Verify source of truth
scripts/verify-source-of-truth.sh

# Verify execution readiness packet exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md

# Verify execution readiness wrapper exists
test -f scripts/check-first-roofer-manual-setup-execution-readiness-dry-run.sh

# Verify execution readiness verifier exists
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-execution-readiness-readonly.js

# Verify final go/no-go chain
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FINAL_GO_NO_GO.md
test -f scripts/review-first-roofer-manual-setup-final-go-no-go-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-final-go-no-go-readonly.js

# Verify founder approval evidence QA chain
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md
test -f scripts/qa-first-roofer-manual-setup-founder-approval-evidence.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-qa-readonly.js

# Verify founder approval evidence chain
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md
test -f scripts/collect-first-roofer-manual-setup-founder-approval-evidence-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js

# Verify founder approval chain
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md
test -f scripts/approve-first-roofer-manual-setup-founder-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js

# Verify operator acceptance chain
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md
test -f scripts/accept-first-roofer-manual-setup-operator-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js

# Verify operator runbook, rehearsal, planning QA
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md

# Verify required dry-run flags
grep -q "WORKSPACE_MODE=dry-run" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md
grep -q "SMS_ACTIVATION=false" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md

# Verify exact PASS/HOLD/BLOCKED execution readiness language
grep -q "MANUAL SETUP EXECUTION READINESS PASS" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md
grep -q "MANUAL SETUP EXECUTION READINESS HOLD" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md
grep -q "MANUAL SETUP EXECUTION READINESS BLOCKED" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md

# Run the final go/no-go wrapper
scripts/review-first-roofer-manual-setup-final-go-no-go-dry-run.sh

# Run production gate checks
scripts/check-production-gates.sh

# Run aggregate safe readiness
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup execution readiness is ready for internal founder/operator dry-run execution only."
