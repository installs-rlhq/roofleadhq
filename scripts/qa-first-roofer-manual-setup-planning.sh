#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ First Roofer Manual Setup Planning QA =="
echo "Mode: dry-run verification only"
echo "No production activation, no external sends, no data mutation."

scripts/verify-source-of-truth.sh

node --check backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js

node backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js
node backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh

echo "PASS: first roofer manual setup planning QA remains dry-run only."
