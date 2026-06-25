#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Successful Controlled Pilot Expansion (Option B) Retry Closeout Dry Run (Build 202) =="
echo "Scope: LOCAL-ONLY consolidated closeout of the SUCCESSFUL Jason-operated controlled pilot Option B"
echo "expansion retry one-message SMS (same consenting test roofer, second controlled SMS). After the"
echo "Build 199 failed first attempt (Twilio 21211/400, no retry, approval consumed) and the Build 200"
echo "corrected destination validation OUTSIDE the repo + fresh signed one-message approval + READY"
echo "preflight, Jason ran the separate, fail-closed, Jason-operated one-message send in his own"
echo "controlled environment. The gate reported CONTROLLED_LIVE_SMS_PERMITTED, pre-flight was PERMITTED,"
echo "exactly one send was attempted, the SMS WAS sent, evidence was written, final decision was"
echo "CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit status 0, and no retry was run."
echo "This wrapper preserves the recorded manual execution evidence, captures the Build 202 closeout, and"
echo "updates the launch-readiness summary from METADATA ONLY (names/booleans/codes)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "The fresh one-time Build 200 expansion approval is consumed; the next step is Jason's REAL-CUSTOMER"
echo "pilot decision with explicit per-attempt approval — NOT a retry, NOT unrestricted launch."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-retry-closeout-build-202.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-202.json"
SCAN_TARGETS=(
  "$EVIDENCE"
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 202 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 202 artifacts are well-formed JSON (read-only) --"
for f in "$EVIDENCE" "$CLOSEOUT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 202 artifacts are valid JSON."

echo "-- Running Build 202 read-only expansion retry closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 202 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 202 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 202 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 202 successful controlled pilot expansion retry closeout dry run passed (read-only)."
echo "Note: Option B retry attempted once (Jason-operated); SMS SENT; final decision"
echo "      CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT; exit status 0; no retry; fresh one-time Build 200"
echo "      approval consumed. The first Option B attempt had failed with 21211/400; the destination was"
echo "      validated/corrected OUTSIDE the repo before this successful retry. Next step is Jason's"
echo "      REAL-CUSTOMER pilot decision with explicit per-attempt approval, NOT unrestricted launch."
echo "      Launch remains pilot-gated, NOT unrestricted."
