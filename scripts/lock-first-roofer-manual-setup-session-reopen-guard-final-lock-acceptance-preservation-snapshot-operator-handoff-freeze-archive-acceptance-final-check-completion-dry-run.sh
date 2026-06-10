#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== First Roofer Manual Setup Session Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Reopen Guard Final Lock Acceptance Preservation Snapshot Operator Handoff Freeze Archive Acceptance Final Check Completion Lock Dry Run ==="

scripts/verify-source-of-truth.sh
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-acceptance-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock dry run passed."
