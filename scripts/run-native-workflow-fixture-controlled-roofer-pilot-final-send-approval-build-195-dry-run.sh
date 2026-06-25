#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Roofer Pilot Final Send Approval + Send-Time Preflight Dry Run (Build 195) =="
echo "Scope: LOCAL-ONLY capture of Jason's FINAL signed one-message pilot send approval (names/booleans"
echo "only) and a send-time preflight gate that evaluates to READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND."
echo "It authorizes a fail-closed, JASON-OPERATED one-message send to be run separately by Jason in his"
echo "own controlled environment. It does NOT authorize Claude or the build environment to send."
echo "This wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-final-send-approval-build-195-readonly.js"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-final-send-approval-build-195-signed.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-send-time-preflight-build-195.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-195.json"
SCAN_TARGETS=(
  "$APPROVAL"
  "$PREFLIGHT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 195 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 195 artifacts are well-formed JSON (read-only) --"
for f in "$APPROVAL" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 195 artifacts are valid JSON."

echo "-- Running Build 195 read-only final-send-approval verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 195 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 195 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 195 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 195 controlled roofer pilot final send approval + send-time preflight dry run passed (read-only)."
echo "Note: final send approval captured; send-time preflight = READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND;"
echo "      0 send attempts; no retry; no network call; build environment send NOT authorized."
echo "      Next step is a separate, Jason-operated one-message send. Launch remains pilot-gated."
