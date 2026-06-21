#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq-worktrees/native-workflow-fixture-fresh-runner-decision-after-build-169-correction

echo "Build 170 review-only decision/template; this wrapper does not run the actual runner, capture approval, or create a guard."
node backend/scripts/verify-native-workflow-fixture-fresh-runner-decision-after-build-169-correction-readonly.js
