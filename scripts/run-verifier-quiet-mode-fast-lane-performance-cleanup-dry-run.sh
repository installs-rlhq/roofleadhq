#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Verifier Quiet Mode + Fast-Lane Performance Cleanup Dry-Run =="
echo "Mode: local read-only verification; fast lane smoke; no source-of-truth check in worktree."
echo "No schema changes, no production data reads, no production activation."
echo "Full aggregate regression remains available via scripts/verify-safe-readiness.sh."

node --check backend/scripts/verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js
echo "PASS: cleanup verifier syntax check (node --check) succeeded."

node backend/scripts/verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js

bash scripts/verify-safe-readiness-fast.sh

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Verifier Quiet Mode + Fast-Lane Performance Cleanup dry-run wrapper passed."
echo "Next: Terminal 1 should run full regression lane (scripts/verify-safe-readiness.sh with log redirection) before merge."