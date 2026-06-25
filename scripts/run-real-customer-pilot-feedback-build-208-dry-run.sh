#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ CORRECTED Real-Customer Pilot Feedback Capture + Next Decision Packet Dry Run (Build 208) =="
echo "Scope: LOCAL-ONLY corrected real-customer pilot feedback-capture + next-decision packet. Build 207"
echo "closed with feedback_captured=false because the bracketed feedback fields were left unchanged. This"
echo "build captures Jason's ACTUAL feedback (names/booleans/codes ONLY): the real-customer pilot SMS was"
echo "received and was clear AS A TECHNICAL DELIVERY TEST ONLY, but the generic test message did NOT validate"
echo "RoofLeadHQ value; Jason will continue testing for delivery proof only and requests the generic test SMS"
echo "copy be analyzed and replaced before any future real workflow or customer-facing message. It records the"
echo "next decision packet (MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND, recommended_option=A) and"
echo "four UNSIGNED options for the next step."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "It does NOT approve copy-revision sends, expansion, homeowner contact, or unrestricted launch. The next"
echo "step is to analyze/revise the generic SMS workflow copy before any further live send, then a Jason"
echo "decision — NOT unrestricted launch. Any further live send requires a NEW, explicit, per-attempt signed"
echo "approval. No homeowner contact is authorized. Launch remains pilot-gated, NOT unrestricted."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-feedback-build-208-readonly.js"
FEEDBACK="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-208.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-208.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_FEEDBACK="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-207.json"
SCAN_TARGETS=(
  "$FEEDBACK"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 208 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 208 artifacts are well-formed JSON (read-only) --"
for f in "$FEEDBACK" "$SUMMARY" "$EVIDENCE" "$PRIOR_FEEDBACK"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 208 artifacts are valid JSON."

echo "-- Running Build 208 read-only corrected feedback capture verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 208 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 208 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 208 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 208 corrected real-customer pilot feedback capture + next decision packet dry run passed (read-only)."
echo "Note: Real-customer pilot SMS was sent once (Jason-operated, Build 205) and succeeded TECHNICALLY, but"
echo "      the generic delivery-test copy did NOT validate RoofLeadHQ value. Corrected feedback is captured"
echo "      (feedback_captured=true). Decision is MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND with"
echo "      recommended_option=A and four UNSIGNED options (A/B/C/D), no approval granted. No homeowner"
echo "      contact is authorized. Next step is to analyze/revise the generic SMS workflow copy before any"
echo "      further live send, then a Jason decision, NOT unrestricted launch. Launch remains pilot-gated."
