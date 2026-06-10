#!/usr/bin/env bash
set -euo pipefail

MESSAGE="${1:-}"

if [ -z "$MESSAGE" ]; then
  echo "Usage: scripts/agent-finalize-branch.sh \"commit message\""
  exit 1
fi

ROOT="$(git rev-parse --show-toplevel)"
PWD_NOW="$(pwd)"
BRANCH="$(git branch --show-current)"
HEAD_BEFORE="$(git rev-parse HEAD)"

echo "== Agent finalize branch =="
echo "Repo: $ROOT"
echo "PWD: $PWD_NOW"
echo "Branch: $BRANCH"
echo "HEAD before: $HEAD_BEFORE"

if [ "$BRANCH" = "main" ]; then
  echo "FAIL: refusing to finalize directly on main"
  exit 1
fi

case "$BRANCH" in
  agent/*) ;;
  *)
    echo "FAIL: refusing to finalize non-agent branch: $BRANCH"
    exit 1
    ;;
esac

case "$ROOT" in
  /root/roofleadhq-worktrees/*) ;;
  *)
    echo "FAIL: refusing to finalize outside /root/roofleadhq-worktrees/*"
    exit 1
    ;;
esac

echo "== Running worktree gates =="
scripts/agent-run-gates.sh

echo "== Running diff proof =="
scripts/agent-diff-proof.sh

echo "== Status before staging =="
git status --short

if [ -z "$(git status --short)" ]; then
  echo "FAIL: no changes to commit"
  exit 1
fi

echo "== Staging changes =="
git add -A

echo "== Staged diff summary =="
git diff --cached --stat

if git diff --cached --quiet; then
  echo "FAIL: no staged changes after git add -A"
  exit 1
fi

echo "== Creating commit =="
git commit -m "$MESSAGE"

HEAD_AFTER="$(git rev-parse HEAD)"
echo "HEAD after: $HEAD_AFTER"

if [ "$HEAD_AFTER" = "$HEAD_BEFORE" ]; then
  echo "FAIL: HEAD did not change after commit"
  exit 1
fi

echo "== Status after commit =="
git status --short

if [ -n "$(git status --short)" ]; then
  echo "FAIL: worktree is not clean after commit"
  exit 1
fi

if [ "${AGENT_FINALIZE_PUSH:-0}" = "1" ]; then
  echo "== Pushing agent branch =="
  git push -u origin "$BRANCH"
  echo "PASS: committed and pushed agent branch $BRANCH at $HEAD_AFTER."
else
  echo "PASS: committed agent branch $BRANCH at $HEAD_AFTER."
  echo "NOTE: agent branch was not pushed. Set AGENT_FINALIZE_PUSH=1 to push during finalize."
fi
