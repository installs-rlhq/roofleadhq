#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

scripts/verify-source-of-truth.sh
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-preservation-snapshot-readonly.js
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh
