#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Successful Real-Customer Pilot One-Message SMS Closeout Dry Run (Build 205) =="
echo "Scope: LOCAL-ONLY consolidated closeout of the SUCCESSFUL Jason-operated real-customer pilot"
echo "one-message SMS. After Build 204 captured the real-customer pilot consent/readiness markers,"
echo "recorded Jason's SIGNED final one-message approval, and produced a READY send-time preflight,"
echo "Jason ran the separate, fail-closed, Jason-operated one-message send in his own controlled"
echo "environment under that signed Build 204 approval. The gate reported CONTROLLED_LIVE_SMS_PERMITTED,"
echo "pre-flight was PERMITTED, exactly one send was attempted, the SMS WAS sent, evidence was written,"
echo "final decision was CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit status 0, and no retry was run."
echo "This wrapper preserves the recorded manual execution evidence, captures the Build 205 closeout, and"
echo "updates the launch-readiness summary from METADATA ONLY (names/booleans/codes)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "The one-time Build 204 approval is consumed; the next step is post-pilot observation and customer"
echo "feedback — NOT a retry, NOT unrestricted launch. Any further live send requires a NEW, explicit,"
echo "per-attempt signed approval. No homeowner contact is authorized."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-sms-closeout-build-205-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRESERVED="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-one-message-execution-evidence-preserved-build-205.json"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-sms-closeout-build-205.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-205.json"
SCAN_TARGETS=(
  "$PRESERVED"
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 205 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 205 artifacts are well-formed JSON (read-only) --"
for f in "$EVIDENCE" "$PRESERVED" "$CLOSEOUT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 205 artifacts are valid JSON."

echo "-- Running Build 205 read-only real-customer pilot SMS closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 205 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 205 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 205 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 205 successful real-customer pilot one-message SMS closeout dry run passed (read-only)."
echo "Note: Real-customer pilot send attempted once (Jason-operated); SMS SENT; final decision"
echo "      CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT; exit status 0; no retry; one-time Build 204 approval"
echo "      consumed. All four controlled sends (Jason number, first roofer pilot, expansion retry,"
echo "      real-customer pilot) have succeeded. No homeowner contact is authorized. Next step is"
echo "      post-pilot observation and customer feedback, NOT unrestricted launch. Launch remains"
echo "      pilot-gated, NOT unrestricted."
