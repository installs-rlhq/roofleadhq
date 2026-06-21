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


# Build 152 registry reference:
# Native Workflow Fixture Capture Post Build 151 Runner Command Blocked Evidence
# native workflow fixture capture post build 151 runner command blocked evidence
# scripts/run-native-workflow-fixture-capture-post-build-151-runner-command-blocked-evidence-dry-run.sh

# Build 153 registry reference:
# Native Workflow Fixture Runner Execution Path After Build 151 Fresh Chain Wiring Correction
# native workflow fixture runner execution path after build 151 fresh chain wiring correction
# scripts/run-native-workflow-fixture-runner-execution-path-after-build-151-fresh-chain-wiring-correction-dry-run.sh

# Build 154 registry reference:
# Native Workflow Fixture Fresh Runner Execution Decision After Build 151 Fresh Chain Wiring Correction
# native workflow fixture fresh runner execution decision after build 151 fresh chain wiring correction
# scripts/run-native-workflow-fixture-fresh-runner-execution-decision-after-build-151-fresh-chain-wiring-correction-dry-run.sh

# Build 155 registry reference:
# Native Workflow Fixture Capture Fresh Runner Execution Approval After Build 154 Build 151 Fresh Chain Wiring Correction
# native workflow fixture capture fresh runner execution approval after build 154 build 151 fresh chain wiring correction
# scripts/run-native-workflow-fixture-capture-fresh-runner-execution-approval-after-build-154-build-151-fresh-chain-wiring-correction-dry-run.sh

# Build 156 registry reference:
# Native Workflow Fixture Fresh Execution Pre Run Guard After Build 154 Build 151 Fresh Chain Wiring Correction Approval Capture
# native workflow fixture fresh execution pre run guard after build 154 build 151 fresh chain wiring correction approval capture
# scripts/run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-154-build-151-fresh-chain-wiring-correction-approval-capture-dry-run.sh

# Build 157 registry reference:
# Native Workflow Fixture Capture Post Build 156 Runner Command Blocked Evidence
# native workflow fixture capture post build 156 runner command blocked evidence
# scripts/run-native-workflow-fixture-capture-post-build-156-runner-command-blocked-evidence-dry-run.sh

# Build 158 registry reference:
# Native Workflow Fixture Runner Execution Path After Build 156 Fresh Chain Wiring Correction
# native workflow fixture runner execution path after build 156 fresh chain wiring correction
# scripts/run-native-workflow-fixture-runner-execution-path-after-build-156-fresh-chain-wiring-correction-dry-run.sh

# Build 159 registry reference:
# Native Workflow Fixture Fresh Runner Execution Decision After Build 156 Fresh Chain Wiring Correction
# native workflow fixture fresh runner execution decision after build 156 fresh chain wiring correction
# scripts/run-native-workflow-fixture-fresh-runner-execution-decision-after-build-156-fresh-chain-wiring-correction-dry-run.sh

# Build 160 registry reference:
# Native Workflow Fixture Capture Fresh Runner Execution Approval After Build 159 Build 156 Fresh Chain Wiring Correction
# native workflow fixture capture fresh runner execution approval after build 159 build 156 fresh chain wiring correction
# scripts/run-native-workflow-fixture-capture-fresh-runner-execution-approval-after-build-159-build-156-fresh-chain-wiring-correction-dry-run.sh

# Build 161 registry reference:
# Native Workflow Fixture Fresh Execution Pre-Run Guard After Build 159 Build 156 Fresh Chain Wiring Correction Approval Capture
# native workflow fixture fresh execution pre run guard after build 159 build 156 fresh chain wiring correction approval capture
# scripts/run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-159-build-156-fresh-chain-wiring-correction-approval-capture-dry-run.sh

# Build 162 registry reference:
# Native Workflow Fixture Capture Post Build 161 Runner Command Blocked Evidence
# native workflow fixture capture post build 161 runner command blocked evidence
# scripts/run-native-workflow-fixture-capture-post-build-161-runner-command-blocked-evidence-dry-run.sh

# Build 163 registry reference:
# Native Workflow Fixture Correct Current Runner Recognition And Test Roofer E2E Readiness
# native workflow fixture correct current runner recognition and test roofer e2e readiness
# scripts/run-native-workflow-fixture-correct-current-runner-recognition-and-test-roofer-e2e-readiness-dry-run.sh
# next step: fresh decision, fresh approval capture, and fresh pre-run guard after Build 163 correction

# Build 164 registry reference:
# Native Workflow Fixture Fresh Runner Decision And Approval Template After Build 163 Correction
# native workflow fixture fresh runner decision and approval template after build 163 correction
# scripts/run-native-workflow-fixture-fresh-runner-decision-and-approval-template-after-build-163-correction-dry-run.sh
# next step: Jason signed approval capture, then fresh pre-run guard, before one exact runner command attempt

# Build 165 registry reference:
# Native Workflow Fixture Capture Signed Runner Approval After Build 164
# native workflow fixture capture signed runner approval after build 164
# scripts/run-native-workflow-fixture-capture-signed-runner-approval-after-build-164-dry-run.sh
# next step: separate fresh pre-run guard after Build 165 signed approval capture before one exact runner command attempt

# Build 166 registry reference:
# Native Workflow Fixture Capture Premature Runner Command Blocked Before Guard Closeout
# native workflow fixture capture premature runner command blocked before guard closeout
# scripts/run-native-workflow-fixture-capture-premature-runner-command-blocked-before-guard-closeout-dry-run.sh
# blocked evidence only; no immediate rerun; create a new fresh pre-run guard after Build 166 blocked evidence source-of-truth closeout

# Build 167 registry reference:
# Native Workflow Fixture Fresh Pre-Run Guard After Build 166 Blocked Evidence Cleanup
# native workflow fixture fresh pre run guard after build 166 blocked evidence cleanup
# scripts/run-native-workflow-fixture-fresh-pre-run-guard-after-build-166-blocked-evidence-cleanup-dry-run.sh
# ready only after Build 167 is committed, pushed, fetched, source-of-truth verified, and final git status is blank
# actual validation remains 0 captured / 0 passed / 30 missing

# Build 168 registry reference:
# Native Workflow Fixture Capture Post Build 167 Runner Blocked Stale Evidence
# native workflow fixture capture post build 167 runner blocked stale evidence
# scripts/run-native-workflow-fixture-capture-post-build-167-runner-blocked-stale-evidence-dry-run.sh
# Build 167 guard closed at e0be19f, but pasted runner output stayed stale at cf6d8c4 / Build 164 template-only state
# future_runner_attempt_status: blocked_until_runner_state_correction_and_new_approval_guard_chain
# no immediate rerun; correction packet required before any future approval/guard/attempt chain
