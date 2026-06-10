#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ROOT="/root/roofleadhq"

cd "$EXPECTED_ROOT"

PWD_NOW="$(pwd)"
ROOT_NOW="$(git rev-parse --show-toplevel)"

if [ "$PWD_NOW" != "$EXPECTED_ROOT" ]; then
  echo "FAIL: pwd is $PWD_NOW, expected $EXPECTED_ROOT"
  exit 1
fi

if [ "$ROOT_NOW" != "$EXPECTED_ROOT" ]; then
  echo "FAIL: repo root is $ROOT_NOW, expected $EXPECTED_ROOT"
  exit 1
fi

git fetch origin main

LOCAL_HEAD="$(git rev-parse HEAD)"
REMOTE_HEAD="$(git rev-parse origin/main)"

if [ "$LOCAL_HEAD" != "$REMOTE_HEAD" ]; then
  echo "FAIL: HEAD does not match origin/main"
  git log --oneline -8
  exit 1
fi

if [ -n "$(git status --short)" ]; then
  echo "FAIL: working tree is not clean"
  git status --short
  exit 1
fi

scripts/verify-source-of-truth.sh

echo "PASS: agent preflight passed."
