#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ CSV Export Readiness Packet Dry-Run =="
echo "Mode: read-only verification and internal founder/operator planning only"
echo "No live CSV generation, no production data reads, no CRM connection, no production activation."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."

node --check backend/scripts/verify-csv-export-readiness-readonly.js
echo "PASS: verifier syntax check (node --check) succeeded."

node backend/scripts/verify-csv-export-readiness-readonly.js

scripts/check-agent-product-quality-gate.sh

scripts/check-production-gates.sh

scripts/verify-safe-readiness.sh

echo "PASS: CSV Export Readiness Packet dry-run wrapper passed."
echo "Next: run scripts/agent-diff-proof.sh and confirm all gates before any further review consideration."