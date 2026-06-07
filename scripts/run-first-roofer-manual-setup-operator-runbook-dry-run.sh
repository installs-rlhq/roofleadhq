#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Operator Runbook Dry-Run =="
echo "Mode: operator runbook only, dry-run only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js

scripts/rehearse-first-roofer-manual-setup-dry-run.sh

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup operator runbook is ready for internal dry-run operator use only."
