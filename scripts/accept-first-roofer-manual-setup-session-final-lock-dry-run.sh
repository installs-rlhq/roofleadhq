#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== First Roofer Manual Setup Session Final Lock Acceptance Dry Run ==="

scripts/verify-source-of-truth.sh
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: First roofer manual setup session final lock acceptance dry run passed."
