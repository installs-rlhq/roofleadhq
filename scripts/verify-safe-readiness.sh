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


# Build 151 registry reference only:
# docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_149_BUILD_146_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_CAPTURE.md
# backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-149-build-146-fresh-chain-wiring-correction-approval-capture.json
# backend/scripts/verify-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-149-build-146-fresh-chain-wiring-correction-approval-capture-readonly.js
# scripts/run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-149-build-146-fresh-chain-wiring-correction-approval-capture-dry-run.sh
# command_execution_status: not_run_by_this_packet
# runner_execution_status: not_run_by_this_packet
