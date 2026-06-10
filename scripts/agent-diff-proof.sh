#!/usr/bin/env bash
set -euo pipefail

echo "== Agent diff proof =="
pwd
git rev-parse --show-toplevel
git branch --show-current
git status --short
git diff --stat
git diff
