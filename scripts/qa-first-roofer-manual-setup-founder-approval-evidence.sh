#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Founder Approval Evidence QA =="
echo "Mode: QA only, dry-run only"
echo "No production activation, no external sends, no data mutation."

# Verify source of truth
scripts/verify-source-of-truth.sh

# Verify evidence packet exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE.md

# Verify evidence wrapper exists
test -f scripts/collect-first-roofer-manual-setup-founder-approval-evidence-dry-run.sh

# Verify evidence verifier exists
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js

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

# Verify operator acceptance verifier exists
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js

# Verify operator runbook exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md

# Verify rehearsal exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md

# Verify planning QA exists
test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md

# Verify required dry-run flags
grep -q "WORKSPACE_MODE=dry-run" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md
grep -q "SMS_ACTIVATION=false" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md

# Verify PASS/HOLD/BLOCKED QA language
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE QA PASS" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE QA HOLD" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md
grep -q "MANUAL SETUP FOUNDER APPROVAL EVIDENCE QA BLOCKED" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL_EVIDENCE_QA.md

# Run evidence verifier
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js

# Run evidence wrapper
scripts/collect-first-roofer-manual-setup-founder-approval-evidence-dry-run.sh

# Run founder approval wrapper
scripts/approve-first-roofer-manual-setup-founder-dry-run.sh

# Run production gate checks
scripts/check-production-gates.sh

# Run aggregate safe readiness
scripts/verify-safe-readiness.sh

# Backend build readiness (node --check on key verifiers)
node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js
node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js
node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js

echo "PASS: first roofer manual setup founder approval evidence QA is complete, internally reviewable, and dry-run only."
