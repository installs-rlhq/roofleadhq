#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

echo "=== git status --short ==="
git status --short

echo
echo "=== git diff --stat ==="
git diff --stat

echo
echo "=== git diff ==="
git diff
