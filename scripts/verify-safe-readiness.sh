#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

# Full aggregate regression lane. For normal fixture/readiness builds use:
#   bash scripts/verify-safe-readiness-fast.sh
# See docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md

echo "=== RoofLeadHQ Safe Readiness Verification (full regression lane) ==="

node backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js
node backend/scripts/verify-next-chat-context-latest-milestones-readonly.js
node backend/scripts/verify-latest-milestone-self-check-readonly.js
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
npm --prefix backend run build

echo "PASS: Safe readiness verification passed."
