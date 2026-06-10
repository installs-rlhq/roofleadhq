#!/usr/bin/env bash
set -euo pipefail

CANONICAL_ROOT="/root/roofleadhq"
ROOT_NOW="$(git rev-parse --show-toplevel)"
BRANCH_NOW="$(git branch --show-current)"

if [ "$#" -gt 0 ]; then
  for cmd in "$@"; do
    echo "== Running targeted gate: $cmd =="
    if [[ "$cmd" == *.sh ]]; then
      "$cmd"
    elif [[ "$cmd" == *.js ]]; then
      node "$cmd"
    else
      echo "FAIL: unsupported targeted gate: $cmd"
      exit 1
    fi
  done
fi

scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh
npm --prefix backend run build

if [ "$ROOT_NOW" = "$CANONICAL_ROOT" ] && [ "$BRANCH_NOW" = "main" ]; then
  node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
  echo "PASS: agent gates passed with aggregate readiness on canonical main."
else
  echo "PASS: agent worktree gates passed."
  echo "NOTE: aggregate first-paid readiness is intentionally skipped in worktrees because legacy onboarding workspace verifiers write .roofleadhq scratch output against the canonical repo."
  echo "Run aggregate readiness from /root/roofleadhq main after merge/cherry-pick/final review."
fi
