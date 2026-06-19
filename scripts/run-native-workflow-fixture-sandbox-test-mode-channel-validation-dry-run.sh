#!/usr/bin/env bash
set -eo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

EXACT_APPROVED_COMMAND="bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh"
EXACT_APPROVED_WORKING_DIRECTORY="/root/roofleadhq"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox/Test-Mode Channel Validation Dry Run =="
echo "EXACT APPROVED COMMAND PATH: ${EXACT_APPROVED_COMMAND}"
echo "EXACT APPROVED WORKING DIRECTORY: ${EXACT_APPROVED_WORKING_DIRECTORY}"
echo "Current working directory: $(pwd)"
echo ""
echo "Mode: local review-only dry-run validation; not activation; non-executing external/live sandbox/test-mode run."
echo "This is the exact approved command wrapper path materialized by the approved command wrapper correction packet."
echo "Wrapper correction does NOT itself equal new approval. Any deviation requires new explicit Jason approval."
echo "No external calls, no credentials, no production data, no roofer/homeowner contact, no SMS/email/calls/calendar booking."
echo "No activation of public routes/webhooks/schedulers/cron/dispatchers."
echo "No activation of live Twilio/Vapi/Resend/Lindy/Calendar/Supabase production behavior."
echo "approval_capture_status is captured. jason_signed_approval_status is signed."
echo "prior_pre_run_guard_status is passed_for_exact_scoped_sandbox_test_mode_only."
echo "prior_pre_run_guard_decision is PASS_FOR_EXACT_APPROVED_SANDBOX_TEST_MODE_COMMAND_ONLY."
echo "sandbox_test_mode_approval_status is granted_scoped_one_time_pending_pre_run_guard."
echo "Live activation, real homeowner contact, real roofer contact, production Supabase writes,"
echo "schema/auth/RLS/security changes, and billing/payment automation remain not_granted."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

echo "-- Local verifier syntax checks (node --check) --"
node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-channel-validation-completeness-gate-readonly.js
echo "PASS: channel validation completeness gate verifier syntax check succeeded."

node --check backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-readonly.js
echo "PASS: channel validation evidence capture packet verifier syntax check succeeded."

echo ""
echo "-- Local sandbox/test-mode channel validation evidence/completeness verifiers (read-only, non-live) --"
node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-channel-validation-completeness-gate-readonly.js
echo "PASS: channel validation completeness gate verifier passed."

node backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-readonly.js
echo "PASS: channel validation evidence capture packet verifier passed."

npm --prefix backend run build > /dev/null 2>&1
echo "PASS: backend build succeeded."

echo ""
echo "PASS: Native Workflow Fixture Sandbox/Test-Mode Channel Validation Dry Run wrapper passed."
echo "Note: This local dry-run wrapper does NOT execute sandbox/test-mode as an external or live run."
echo "Note: After canonical main closeout, rerun safe source-of-truth and exact command review before any execution."
echo "Note: Any deviation from the exact approved command or working directory requires new explicit Jason approval."