#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Execution Day Dry-Run =="
echo "Mode: execution day only, dry-run only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

node --check backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js
node backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer execution day runbook is ready for internal dry-run execution only."
