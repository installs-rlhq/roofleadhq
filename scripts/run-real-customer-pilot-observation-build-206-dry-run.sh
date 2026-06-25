#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Real-Customer Pilot Post-Pilot Observation + Feedback Decision Packet Dry Run (Build 206) =="
echo "Scope: LOCAL-ONLY post-real-customer-pilot observation + customer-feedback decision packet. After"
echo "Build 205 closed out the SUCCESSFUL Jason-operated real-customer pilot one-message SMS (1 attempt,"
echo "SMS sent, no retry, one-time Build 204 approval consumed), this build captures the post-pilot"
echo "observation status from recorded repo metadata ONLY (names/booleans/codes); provides an unfilled"
echo "customer-feedback capture template; and records the next decision packet (POST_PILOT_FEEDBACK_REQUIRED)"
echo "and four UNSIGNED options for the next step."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "It does NOT approve expansion, homeowner contact, or unrestricted launch. The next step is to collect"
echo "roofer feedback, then a Jason decision — NOT unrestricted launch. Any further live send requires a NEW,"
echo "explicit, per-attempt signed approval. No homeowner contact is authorized."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-observation-build-206-readonly.js"
OBSERVATION="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-observation-build-206.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-206.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-sms-closeout-build-205.json"
SCAN_TARGETS=(
  "$OBSERVATION"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 206 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 206 artifacts are well-formed JSON (read-only) --"
for f in "$OBSERVATION" "$SUMMARY" "$EVIDENCE" "$CLOSEOUT"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 206 artifacts are valid JSON."

echo "-- Running Build 206 read-only post-pilot observation verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 206 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 206 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 206 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 206 real-customer pilot post-pilot observation + feedback decision packet dry run passed (read-only)."
echo "Note: Real-customer pilot SMS was sent once (Jason-operated, Build 205); delivery confirmation and"
echo "      roofer feedback are NOT recorded by the build; customer value validation is pending human"
echo "      feedback. Decision is POST_PILOT_FEEDBACK_REQUIRED with four UNSIGNED options (A/B/C/D) and no"
echo "      approval granted. No homeowner contact is authorized. Next step is to collect roofer feedback,"
echo "      then a Jason decision, NOT unrestricted launch. Launch remains pilot-gated, NOT unrestricted."
