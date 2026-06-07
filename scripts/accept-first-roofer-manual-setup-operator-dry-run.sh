#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Operator Acceptance Dry-Run =="
echo "Mode: operator acceptance only, dry-run only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js

scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup operator acceptance is ready for internal dry-run acceptance review only."
