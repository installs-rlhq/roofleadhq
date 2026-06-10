#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

scripts/verify-source-of-truth.sh
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-acceptance-readonly.js
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh
