#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Sandbox-Execution Readiness Gate Dry Run (Build 183) =="
echo "Mode: local-only, readiness-only. No external calls, no sandbox calls, no credentials, no env secrets,"
echo "no production data, no live activation, no real homeowner/roofer contact, no SMS/email/calls/calendar booking."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "(that actual external/sandbox runner remains a fail-closed stub and is not run here)."
echo "The readiness gate inspects required config NAMES/presence markers ONLY — never secret values."
echo "Sandbox/live execution remains BLOCKED until a separate signed approval and provisioned config are present."
echo "demo_ready_with_live_automation_disabled preserved."

GATE="backend/scripts/run-native-workflow-fixture-sandbox-execution-readiness-gate.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-sandbox-execution-readiness-gate-readonly.js"

node --check "$GATE"
echo "PASS: readiness gate syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 183 verifier syntax check (node --check) succeeded."

echo "-- Running sandbox-execution readiness gate (expected: BLOCKED / fail-closed, names only) --"
if node "$GATE"; then
  echo "FAIL: readiness gate reported sandbox execution PERMITTED; it must be fail-closed in Build 183." >&2
  exit 1
else
  echo "PASS: readiness gate is fail-closed as required (nonzero exit, BLOCKED, config names only, no calls)."
fi

echo "-- Running Build 183 read-only verifier --"
node "$VERIFIER"

echo "PASS: Native Workflow Fixture Sandbox-Execution Readiness Gate Dry Run wrapper passed."
echo "Note: Sandbox/live execution stays blocked until Jason signs the scoped approval AND provisions config in his own store."
echo "Note: The gate never reads or prints secret values; it checks config NAMES and presence booleans only."
echo "Note: Live activation, real contact, production writes, and external/sandbox calls remain disabled and not performed."
