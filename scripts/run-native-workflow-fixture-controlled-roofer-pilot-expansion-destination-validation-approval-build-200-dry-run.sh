#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Corrected Destination Validation + Fresh Expansion Approval/Preflight Dry Run (Build 200) =="
echo "Scope: LOCAL-ONLY. After the Build 199 failed Option B expansion attempt (Twilio error 21211 /"
echo "status 400, sms_was_sent=false, no retry, one-time approval consumed), Jason independently"
echo "reviewed the approved destination number in HIS OWN controlled environment and corrected or"
echo "validated it OUTSIDE the repo/chat. This wrapper captures, as names/booleans/codes only:"
echo "  - the corrected destination validation marker (destination value NOT stored),"
echo "  - a FRESH signed one-message expansion approval (NOT a retry of the consumed Build 198 approval),"
echo "  - a send-time preflight = READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION,"
echo "  - an updated launch-readiness summary."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No destination/phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "The next step is a SEPARATE Jason-operated one-message send in Jason's controlled environment with"
echo "the corrected/validated destination supplied only in his shell — NOT a retry of the consumed"
echo "approval, NOT unrestricted launch."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-readonly.js"
VALIDATION="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-destination-validation-build-200.json"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-final-send-approval-build-200-signed.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-send-time-preflight-build-200.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-200.json"
SCAN_TARGETS=(
  "$VALIDATION"
  "$APPROVAL"
  "$PREFLIGHT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 200 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 200 artifacts are well-formed JSON (read-only) --"
for f in "$VALIDATION" "$APPROVAL" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 200 artifacts are valid JSON."

echo "-- Running Build 200 read-only destination validation + fresh approval/preflight verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 200 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 200 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 200 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 200 corrected destination validation + fresh expansion approval/preflight dry run passed (read-only)."
echo "Note: Destination validated/corrected OUTSIDE the repo by Jason (value not stored). Fresh one-time,"
echo "      one-message, no-retry approval signed. Send-time preflight ="
echo "      READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION. No live"
echo "      action occurred. Next step is a separate Jason-operated one-message send (NOT a retry of the"
echo "      consumed approval, NOT unrestricted launch). Launch remains pilot-gated, NOT unrestricted."
