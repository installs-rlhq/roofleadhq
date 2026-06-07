#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

if [ "$#" -lt 2 ]; then
  echo "Usage: scripts/record-milestone.sh <commit-short-hash> <commit-subject>"
  echo "Example: scripts/record-milestone.sh abc1234 \"test(pilot): add example packet\""
  exit 1
fi

COMMIT_HASH="$1"
shift
COMMIT_SUBJECT="$*"
MILESTONE="${COMMIT_HASH} ${COMMIT_SUBJECT}"

CONTEXT_FILE="docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md"
LATEST_VERIFIER="backend/scripts/verify-next-chat-context-latest-milestones-readonly.js"
SELF_CHECK="backend/scripts/verify-latest-milestone-self-check-readonly.js"

python3 - "$MILESTONE" "$CONTEXT_FILE" "$LATEST_VERIFIER" "$SELF_CHECK" <<'PY'
from pathlib import Path
import sys

milestone, context_file, latest_verifier, self_check = sys.argv[1:]

for raw_path in [latest_verifier, self_check]:
    path = Path(raw_path)
    text = path.read_text()
    if milestone in text:
        print(f"already guarded: {path}")
        continue

    marker = "const required"
    idx = text.find(marker)
    if idx == -1:
        raise SystemExit(f"Could not find required array marker in {path}")

    bracket = text.find("[", idx)
    if bracket == -1:
        raise SystemExit(f"Could not find required array opening bracket in {path}")

    insert_at = bracket + 1
    text = text[:insert_at] + f"\n  '{milestone}'," + text[insert_at:]
    path.write_text(text)
    print(f"guarded: {path}")

context = Path(context_file)
text = context.read_text()

if milestone not in text:
    section = f"""
## Latest Source-of-Truth Milestone

Commit: {milestone}

This milestone was recorded through the repo-controlled milestone helper script.

Terminal 1 remains the source of truth. Agent-reported commits or pushes are not trusted unless Terminal 1 verifies them with git fetch, git status, git log, and HEAD/origin confirmation.

No live automation activated. Safety remains demo-ready with live automation disabled.
"""
    text = text.rstrip() + "\n\n" + section.strip() + "\n"
    context.write_text(text)
    print(f"updated: {context}")
else:
    print(f"already present in context: {context}")
PY

echo
echo "Milestone recorded locally:"
echo "$MILESTONE"
echo
echo "Next: run scripts/verify-safe-readiness.sh, inspect diff, then commit/push from Terminal 1."
