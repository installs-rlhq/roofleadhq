#!/usr/bin/env bash
set -euo pipefail

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

node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
scripts/check-production-gates.sh
scripts/verify-safe-readiness.sh
npm --prefix backend run build

echo "PASS: agent gates passed."
