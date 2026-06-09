#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Session Notes Dry-Run =="
echo "Mode: session notes only, dry-run only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md
test -f scripts/record-first-roofer-manual-setup-session-notes-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-notes-readonly.js

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_RUNBOOK.md
test -f scripts/run-first-roofer-manual-setup-session-runbook-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-runbook-readonly.js

test -f docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_EXECUTION_READINESS.md
test -f scripts/check-first-roofer-manual-setup-execution-readiness-dry-run.sh
test -f backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-execution-readiness-readonly.js

grep -q "WORKSPACE_MODE=dry-run" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md
grep -q "SMS_ACTIVATION=false" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md

grep -q "MANUAL SETUP SESSION NOTES PASS" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md
grep -q "MANUAL SETUP SESSION NOTES HOLD" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md
grep -q "MANUAL SETUP SESSION NOTES BLOCKED" docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_SESSION_NOTES.md

scripts/run-first-roofer-manual-setup-session-runbook-dry-run.sh
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup session notes are ready for internal founder/operator dry-run recording only."
