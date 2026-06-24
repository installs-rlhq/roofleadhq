#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture One-Time Supervised Sandbox/Test-Mode SMS Execution (Build 184) =="
echo "Scope (signed): sandbox_test_mode_sms_only_one_pilot_roofer_supervised_one_time_after_build_183"
echo "Mode: sandbox/test-mode ONLY, SMS ONLY, one capped supervised execution. No live automation."
echo "No external/sandbox calls, no real/live Twilio credentials, no secret VALUES (config NAME presence only),"
echo "no production Supabase/data, no real homeowner/roofer contact (approved test identity only),"
echo "no schema/auth/RLS/security changes, no billing/payment/quote/estimate/invoice automation,"
echo "no public/live routes/webhooks/cron/schedulers/dispatchers, no expansion beyond SMS."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "(that actual external/sandbox runner remains a fail-closed stub and is not run here)."
echo "demo_ready_with_live_automation_disabled preserved."

GATE="backend/scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate.js"
RUNNER="backend/scripts/run-native-workflow-fixture-supervised-sandbox-sms-execution.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-supervised-sandbox-sms-execution-readonly.js"

node --check "$GATE"
echo "PASS: readiness gate syntax check (node --check) succeeded."
node --check "$RUNNER"
echo "PASS: Build 184 runner syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 184 verifier syntax check (node --check) succeeded."

echo "-- Confirming readiness gate still reports SANDBOX_EXECUTION_PERMITTED (names-only, no calls) --"
GATE_DECISION="$(node "$GATE" | node -e "const s=JSON.parse(require('fs').readFileSync('backend/fixtures/native-workflow-demo-roofer/sandbox-execution-readiness-gate-result.json','utf8')); process.stdout.write(s.gate_decision)")"
if [ "$GATE_DECISION" != "SANDBOX_EXECUTION_PERMITTED" ]; then
  echo "FAIL: readiness gate is not SANDBOX_EXECUTION_PERMITTED (got: $GATE_DECISION); refusing to execute." >&2
  exit 1
fi
echo "PASS: readiness gate reports SANDBOX_EXECUTION_PERMITTED."

echo "-- Running ONE-TIME supervised sandbox/test-mode SMS execution (capped, simulated, no live delivery) --"
node "$RUNNER"

echo "-- Running Build 184 read-only verifier --"
node "$VERIFIER"

echo "PASS: Native Workflow Fixture One-Time Supervised Sandbox/Test-Mode SMS Execution wrapper passed."
echo "Note: exactly one capped SMS execution ran in sandbox/test-mode; no real SMS sent (simulated by Twilio test credentials)."
echo "Note: no external/sandbox calls, no live activation, no real contact, no production data, no schema/security/billing/public-route changes."
echo "Note: execution stopped immediately after evidence capture; no auto-retry."
