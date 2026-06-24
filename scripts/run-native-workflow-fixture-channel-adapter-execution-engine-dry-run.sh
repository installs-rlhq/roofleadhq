#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Native Workflow Fixture Channel-Adapter Execution Engine Dry Run (Build 182) =="
echo "Mode: local-only, mock-backed. Deterministic. No external calls, no credentials, no env secrets,"
echo "no production data, no live activation, no real homeowner/roofer contact, no SMS/email/calls/calendar booking."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh"
echo "(that actual external/sandbox runner remains a fail-closed stub and is not run here)."
echo "transport_mode is mock_now. sandbox_later is true. Sandbox transport stays fail-closed until separately"
echo "approved and correctly provisioned; Build 182 makes no sandbox or live external calls."
echo "demo_ready_with_live_automation_disabled preserved."

ENGINE="backend/scripts/native-workflow-channel-adapter-engine.js"
RUNNER="backend/scripts/run-native-workflow-fixture-channel-adapter-execution-engine.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-channel-adapter-execution-engine-readonly.js"

node --check "$ENGINE"
echo "PASS: engine module syntax check (node --check) succeeded."
node --check "$RUNNER"
echo "PASS: engine runner syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 182 verifier syntax check (node --check) succeeded."

echo "-- Demonstrating fail-closed sandbox transport (prints MISSING CONFIG NAMES ONLY, no calls) --"
if node "$RUNNER" --transport=sandbox; then
  echo "FAIL: sandbox transport unexpectedly succeeded; it must be fail-closed in Build 182." >&2
  exit 1
else
  echo "PASS: sandbox transport is fail-closed as required (nonzero exit, names only, no external calls)."
fi

echo "-- Running mock-backed channel-adapter execution engine (deterministic; writes mock evidence only) --"
node "$RUNNER"

echo "-- Running Build 182 read-only verifier --"
node "$VERIFIER"

echo "PASS: Native Workflow Fixture Channel-Adapter Execution Engine Dry Run wrapper passed."
echo "Note: 30 scenarios executed through channel adapters using mock transport only; NOT the external/sandbox runner."
echo "Note: sandbox transport remains fail-closed until separately approved and credential-provisioned."
echo "Note: Live activation, real contact, production writes, and external/sandbox calls remain disabled and not performed."
