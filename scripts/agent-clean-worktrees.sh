#!/usr/bin/env bash
set -euo pipefail

WORKTREE_ROOT="/root/roofleadhq-worktrees"

echo "== Git worktrees =="
git worktree list

echo
echo "Agent worktree root: $WORKTREE_ROOT"
echo "Manual cleanup only. Never remove /root/roofleadhq."
