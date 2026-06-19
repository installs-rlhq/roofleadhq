#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Pilot Readiness Master NO-GO / Approval Dependency Summary Dry Run =="
echo "Mode: local fake-data review-only; planning-only; not-approved; non-executing."
echo "This wrapper validates committed pilot readiness master dependency summary artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No roofer contact, no email, no SMS, no calls."
echo "Local demo E2E evidence chain is passed."
echo "Pilot readiness master gate decision is NO_GO (HOLD)."
echo "Master summary does not equal approval. Dependency summary does not equal approval."
echo "Approval capture status is not_captured. Jason signed approval status is not_signed."
echo "All 19 exact values remain proposed (RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED)."
echo "Accepted exact values count remains 0. Approved exact values filled count remains 0."
echo "Sandbox/test-mode channel validation: 0 captured of 30 scenarios (30 missing)."
echo "Controlled real roofer setup: 0 captured of 12 steps (12 missing)."
echo "Controlled real roofer limited validation: 0 captured of 5 scenarios (5 missing)."
echo "Channel validation gate decision is NO_GO (HOLD). Controlled real roofer setup gate decision is NO_GO (HOLD)."
echo "Controlled real roofer limited validation gate decision is NO_GO (HOLD). Approval capture gate decision is NO_GO (HOLD)."
echo "Default sandbox/test-mode decision remains HOLD."
echo "Sandbox/test-mode activation remains blocked. Live activation remains blocked."
echo "Real roofer onboarding/contact remains blocked. Controlled real roofer validation remains blocked."
echo "NOT CAPTURED / NOT SIGNED / NOT GRANTED."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-readonly.js
echo "PASS: Pilot readiness master dependency summary verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Pilot Readiness Master NO-GO / Approval Dependency Summary Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."