#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Post-Approval Sandbox/Test-Mode Pre-Run Guard Draft Dry Run =="
echo "Mode: local fake-data review-only; planning-only; not-approved; non-executing."
echo "This wrapper validates committed post-approval pre-run guard draft artifacts — it does NOT approve or execute activation."
echo "No activation, no command execution, no external calls, no credentials, no production data."
echo "No roofer contact, no email, no SMS, no calls."
echo "Source-of-truth commit is 7f57e7d. Post-approval operator runbook draft is completed."
echo "Pilot readiness master NO-GO / approval dependency summary is completed."
echo "Pilot readiness master gate decision is NO_GO (HOLD). Pre-run guard decision is NO_GO (HOLD)."
echo "Pre-run guard status is blocked. Pre-run guard draft does not equal approval."
echo "Pre-run guard no-go review does not equal approval. Operator runbook draft does not equal approval."
echo "Approval capture status is not_captured. Jason signed approval status is not_signed. Approval capture gate decision is NO_GO (HOLD)."
echo "All 19 exact values remain unaccepted (0 accepted, 0 approved)."
echo "Sandbox/test-mode channel validation: 0 captured of 30 scenarios (30 missing). Channel validation gate decision is NO_GO (HOLD)."
echo "Controlled real roofer setup gate decision is NO_GO (HOLD). Controlled real roofer limited validation gate decision is NO_GO (HOLD)."
echo "Default sandbox/test-mode decision remains HOLD."
echo "future_command_status is blocked_until_exact_signed_approval_and_gate_pass."
echo "Sandbox/test-mode activation remains blocked. Live activation remains blocked."
echo "Real roofer onboarding/contact remains blocked. Controlled real roofer validation remains blocked."
echo "NOT CAPTURED / NOT SIGNED / NOT GRANTED."
echo "All 20 blocked pre-run guard checks remain blocked_until_prerequisites."
echo "No source-of-truth check inside this wrapper (agent worktrees can be ahead/behind main during branch review)."
echo "Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."

node --check backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-readonly.js
echo "PASS: Post-approval pre-run guard draft verifier syntax check (node --check) succeeded."

node backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-readonly.js

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo "PASS: Native Workflow Fixture Post-Approval Sandbox/Test-Mode Pre-Run Guard Draft Dry Run wrapper passed."
echo "Note: Full aggregate regression remains available for milestone/high-risk review (Terminal 1)."