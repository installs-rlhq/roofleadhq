#!/usr/bin/env bash
set -euo pipefail

EXPECTED_ROOT="/root/roofleadhq"
WORKTREE_ROOT="/root/roofleadhq-worktrees"

TASK_NAME="${1:-}"

if [ -z "$TASK_NAME" ]; then
  echo "Usage: scripts/agent-create-worktree.sh <safe-task-name>"
  exit 1
fi

if ! [[ "$TASK_NAME" =~ ^[a-z0-9][a-z0-9-]*$ ]]; then
  echo "FAIL: unsafe task name. Use lowercase letters, numbers, and hyphens only."
  exit 1
fi

cd "$EXPECTED_ROOT"
scripts/agent-preflight.sh

mkdir -p "$WORKTREE_ROOT"

BRANCH="agent/$TASK_NAME"
TARGET="$WORKTREE_ROOT/$TASK_NAME"

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  echo "FAIL: branch already exists: $BRANCH"
  exit 1
fi

if [ -e "$TARGET" ]; then
  echo "FAIL: worktree path already exists: $TARGET"
  exit 1
fi

git worktree add -b "$BRANCH" "$TARGET" origin/main

if [ -d "$EXPECTED_ROOT/backend/node_modules" ] && [ ! -e "$TARGET/backend/node_modules" ]; then
  ln -s "$EXPECTED_ROOT/backend/node_modules" "$TARGET/backend/node_modules"
  EXCLUDE_PATH="$(git -C "$TARGET" rev-parse --git-path info/exclude)"
  mkdir -p "$(dirname "$EXCLUDE_PATH")"
  grep -qxF "/backend/node_modules" "$EXCLUDE_PATH" 2>/dev/null || echo "/backend/node_modules" >> "$EXCLUDE_PATH"
  echo "PASS: linked backend/node_modules from canonical repo and excluded it from worktree status"
fi

echo "PASS: created worktree $TARGET on branch $BRANCH"
