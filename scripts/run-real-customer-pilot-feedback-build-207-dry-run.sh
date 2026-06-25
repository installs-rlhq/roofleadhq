#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Real-Customer Pilot Feedback Capture + Next Decision Packet Dry Run (Build 207) =="
echo "Scope: LOCAL-ONLY real-customer pilot feedback-capture + next-decision packet. After Build 206"
echo "recorded the post-pilot observation and the POST_PILOT_FEEDBACK_REQUIRED decision, this build captures"
echo "Jason's roofer-feedback summary from the Build 207 instructions (names/booleans/codes ONLY). Jason left"
echo "every bracketed feedback item unchanged, so each field is recorded as not_provided_by_jason and"
echo "feedback_captured=false (feedback remains pending). It records the next decision packet"
echo "(NEXT_ACTION_REVIEW_REQUIRED) and four UNSIGNED recommended options for the next step."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "It does NOT approve copy revision sends, expansion, homeowner contact, or unrestricted launch. The next"
echo "step is for Jason to provide roofer feedback, then a Jason decision — NOT unrestricted launch. Any"
echo "further live send requires a NEW, explicit, per-attempt signed approval. No homeowner contact is"
echo "authorized. Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-feedback-build-207-readonly.js"
FEEDBACK="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-207.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-207.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
OBSERVATION="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-observation-build-206.json"
SCAN_TARGETS=(
  "$FEEDBACK"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 207 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 207 artifacts are well-formed JSON (read-only) --"
for f in "$FEEDBACK" "$SUMMARY" "$EVIDENCE" "$OBSERVATION"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 207 artifacts are valid JSON."

echo "-- Running Build 207 read-only feedback capture verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 207 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 207 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 207 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 207 real-customer pilot feedback capture + next decision packet dry run passed (read-only)."
echo "Note: Real-customer pilot SMS was sent once (Jason-operated, Build 205) and succeeded. Jason left every"
echo "      bracketed feedback item unchanged in the Build 207 instructions, so feedback_captured=false and"
echo "      each status is not_provided_by_jason (feedback still pending). Decision is"
echo "      NEXT_ACTION_REVIEW_REQUIRED with four UNSIGNED recommended options (A/B/C/D) and no approval"
echo "      granted. No homeowner contact is authorized. Next step is for Jason to provide roofer feedback,"
echo "      then a Jason decision, NOT unrestricted launch. Launch remains pilot-gated, NOT unrestricted."
