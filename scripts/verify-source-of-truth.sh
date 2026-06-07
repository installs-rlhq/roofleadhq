#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

echo "=== RoofLeadHQ Source-of-Truth Verification ==="
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -12

LOCAL_HEAD="$(git rev-parse HEAD)"
ORIGIN_HEAD="$(git rev-parse origin/main)"

if [ "$LOCAL_HEAD" != "$ORIGIN_HEAD" ]; then
  echo "FAIL: local HEAD does not match origin/main"
  echo "local : $(git rev-parse --short HEAD)"
  echo "origin: $(git rev-parse --short origin/main)"
  exit 1
fi

echo "PASS: HEAD and origin/main match at $(git rev-parse --short HEAD)"
