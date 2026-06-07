#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Dry-Run Rehearsal =="
echo "Mode: rehearsal only, dry-run only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js

scripts/qa-first-roofer-manual-setup-planning.sh

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup dry-run rehearsal is ready for internal operator rehearsal only."
