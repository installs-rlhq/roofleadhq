#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Live SMS Failed-Attempt Diagnosis + Reconciliation Dry Run (Build 187) =="
echo "Scope: inspection, diagnosis, and verifier state reconciliation ONLY."
echo "No SMS. No retry. No external Twilio call. No live execution. No production data. No secret VALUES."
echo "This wrapper does NOT run the controlled live SMS execution runner, the readiness gate runner,"
echo "or any actual external/sandbox runner stub. Names/codes/booleans only."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

RECONCILED_185_VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js"
BUILD_187_VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js"

node --check "$RECONCILED_185_VERIFIER"
echo "PASS: reconciled Build 185 verifier syntax check (node --check) succeeded."
node --check "$BUILD_187_VERIFIER"
echo "PASS: Build 187 verifier syntax check (node --check) succeeded."

echo "-- Running reconciled Build 185 readiness-gate verifier (EXPECT PASS / exit 0; no longer stale) --"
node "$RECONCILED_185_VERIFIER"

echo "-- Running Build 187 failed-attempt diagnosis + reconciliation verifier --"
node "$BUILD_187_VERIFIER"

echo "-- Inline names-only secret scan over Build 187 artifacts (no external scanner installed) --"
SCAN_TARGETS=(
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result-build-185-blocked.json"
)
# Boundaried 32-hex so legitimate 40-char git commit SHAs (provenance) do not false-positive.
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer ' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped content found in Build 187 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped values found in Build 187 artifacts (names/codes/booleans only)."

echo ""
echo "PASS: Controlled Live SMS Failed-Attempt Reconciliation dry run passed (diagnosis + reconciliation only)."
echo "Note: no send, no retry, no external Twilio call; the consumed Build 186 one-time approval does NOT carry over."
