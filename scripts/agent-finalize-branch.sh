#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-}"

if [ -z "$MESSAGE" ]; then
  echo "Usage: scripts/agent-finalize-branch.sh \"commit message\""
  exit 1
fi

BRANCH="$(git branch --show-current)"

if [ "$BRANCH" = "main" ]; then
  echo "FAIL: refusing to finalize directly on main"
  exit 1
fi

scripts/agent-run-gates.sh
scripts/agent-diff-proof.sh

if [ -z "$(git status --short)" ]; then
  echo "FAIL: no changes to commit"
  exit 1
fi

git add -A
git commit -m "$MESSAGE"
git push -u origin "$BRANCH"

echo "PASS: pushed agent branch $BRANCH. Do not merge without Terminal 1/PR review."
