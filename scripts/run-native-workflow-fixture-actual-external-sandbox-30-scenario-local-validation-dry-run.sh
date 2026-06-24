#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Actual External/Sandbox 30-Scenario LOCAL Validation Dry Run =="
echo "Mode: local fake-data only. Deterministic. No external calls, no credentials, no env secrets,"
echo "no production data, no live activation, no real homeowner/roofer contact, no SMS/email/calls/calendar booking."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "(that actual external/sandbox runner remains a fail-closed stub and is not run here)."
echo "data_classification is local_fake_data_only. Observed results are SIMULATED fake values, not real service responses."
echo "actual_external_sandbox_validation_status_via_stub_path remains not_captured_by_stub_path."
echo "demo_ready_with_live_automation_disabled preserved."

EXECUTOR="backend/scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-local-validation.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-local-validation-readonly.js"

node --check "$EXECUTOR"
echo "PASS: local executor syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 181 verifier syntax check (node --check) succeeded."

echo "-- Running local fake-data executor (deterministic; writes local validation result only) --"
node "$EXECUTOR"

echo "-- Running Build 181 read-only verifier --"
node "$VERIFIER"

echo "PASS: Native Workflow Fixture Actual External/Sandbox 30-Scenario LOCAL Validation Dry Run wrapper passed."
echo "Note: This run scores 30 scenarios from local fake fixtures only; it is NOT the external/sandbox runner."
echo "Note: actual 30-scenario external validation via the stub path remains 0 captured / 0 passed / 30 missing."
echo "Note: Live activation, real contact, production writes, and external calls remain disabled and not performed."
