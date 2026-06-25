#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Corrected Live SMS Pre-Flight Readiness Dry Run (Build 188) =="
echo "Scope: corrected credential-readiness self-check + corrected one-message pre-flight gate + verifier."
echo "Both the self-check and the gate are FAIL-CLOSED and BLOCKED by design in Build 188."
echo "No SMS. No retry. No external Twilio call. No live execution. No production data. No secret VALUES."
echo "This wrapper does NOT run the live SMS execution runner, the pre-186 readiness gate runner,"
echo "or any actual external/sandbox runner stub. Names/metadata/booleans only."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

SELF_CHECK="backend/scripts/run-native-workflow-fixture-controlled-live-sms-credential-readiness-self-check.js"
GATE="backend/scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-gate.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-readonly.js"

node --check "$SELF_CHECK"
echo "PASS: Build 188 credential self-check syntax check (node --check) succeeded."
node --check "$GATE"
echo "PASS: Build 188 corrected pre-flight gate syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 188 verifier syntax check (node --check) succeeded."

echo "-- Running Build 188 credential-readiness self-check (EXPECT BLOCKED / nonzero exit by design) --"
set +e
node "$SELF_CHECK"
SELF_CHECK_EXIT=$?
set -e
if [ "$SELF_CHECK_EXIT" -eq 0 ]; then
  echo "FAIL: self-check unexpectedly PASSED; in Build 188 it must be BLOCKED (values not revalidated after 401)." >&2
  exit 1
fi
echo "PASS: self-check is fail-closed and BLOCKED (exit $SELF_CHECK_EXIT)."

echo "-- Running Build 188 corrected one-message pre-flight gate (EXPECT BLOCKED / nonzero exit by design) --"
set +e
node "$GATE"
GATE_EXIT=$?
set -e
if [ "$GATE_EXIT" -eq 0 ]; then
  echo "FAIL: gate unexpectedly PERMITTED; in Build 188 it must be BLOCKED (self-check not passed + approval unsigned)." >&2
  exit 1
fi
echo "PASS: corrected pre-flight gate is fail-closed and BLOCKED (exit $GATE_EXIT)."

echo "-- Running Build 188 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret scan over Build 188 DATA artifacts (no external scanner installed) --"
SCAN_TARGETS=(
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-revalidation-marker.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-readiness-self-check-result.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-preflight-gate-result.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-one-message-retry-approval-build-188-template.json"
)
# Boundaried 32-hex so legitimate 40-char git commit SHAs (provenance) do not false-positive.
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer ' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped content found in Build 188 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped values found in Build 188 artifacts (names/metadata/booleans only)."

echo ""
echo "PASS: Corrected Live SMS Pre-Flight Readiness dry run passed (readiness/approval only)."
echo "Note: no send, no retry, no external Twilio call; the corrected gate stays BLOCKED until Jason"
echo "      independently revalidates the live credential VALUES and signs the fresh one-message approval."
