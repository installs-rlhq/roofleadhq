#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Pilot Expansion Decision (Option B) + Final Send Approval + Send-Time Preflight Dry Run (Build 198) =="
echo "Scope: LOCAL-ONLY capture of Jason's SIGNED controlled pilot expansion decision (Option B: same"
echo "consenting test roofer, second controlled SMS, one message maximum, no retry) and final"
echo "one-message send approval (names/booleans only), plus a send-time preflight gate that evaluates"
echo "to READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND."
echo "It authorizes a fail-closed, JASON-OPERATED one-message send to be run separately by Jason in his"
echo "own controlled environment. It does NOT authorize Claude or the build environment to send."
echo "This wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-readonly.js"
DECISION="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-decision-build-198-signed.json"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-final-send-approval-build-198-signed.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-send-time-preflight-build-198.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-198.json"
SCAN_TARGETS=(
  "$DECISION"
  "$APPROVAL"
  "$PREFLIGHT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 198 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 198 artifacts are well-formed JSON (read-only) --"
for f in "$DECISION" "$APPROVAL" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 198 artifacts are valid JSON."

echo "-- Running Build 198 read-only expansion-decision + final-send-approval verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 198 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 198 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 198 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 198 controlled pilot expansion decision + final send approval + send-time preflight dry run passed (read-only)."
echo "Note: Option B selected (same roofer, second controlled SMS); final send approval captured;"
echo "      send-time preflight = READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND; 0 send attempts;"
echo "      no retry; no network call; build environment send NOT authorized. Next step is a separate,"
echo "      Jason-operated one-message send. Launch remains pilot-gated, NOT unrestricted."
