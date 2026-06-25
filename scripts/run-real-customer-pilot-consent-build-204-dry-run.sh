#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Real-Customer Pilot Consent/Readiness + Final One-Message Approval/Preflight Dry Run (Build 204) =="
echo "Scope: LOCAL-ONLY real-customer pilot consent/readiness capture + final Jason-operated one-message"
echo "approval/preflight packet. After Build 203 recorded REAL_CUSTOMER_PILOT_REVIEW_REQUIRED (approval"
echo "UNSIGNED), Jason confirmed OUTSIDE the repo/chat that one real roofer/customer agreed to a controlled"
echo "pilot, an approved SMS destination marker exists WITHOUT storing any phone number, and STOP/opt-out"
echo "language is finalized. This packet captures those consent/readiness markers, records Jason's SIGNED"
echo "final one-message approval, and produces a READY send-time preflight gate."
echo "It AUTHORIZES only a Jason-operated one-message send: approval_signed=true,"
echo "authorizes_jason_operated_one_message_send=true, authorizes_build_environment_send=false,"
echo "authorizes_homeowner_contact=false, authorizes_unrestricted_launch=false."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers. No live"
echo "automation. No schema/auth/RLS changes. No public routes/webhooks/cron/schedulers/dispatchers."
echo "No CRM/billing/quote/invoice/deposit/email/call/calendar automation."
echo "It does NOT run any live SMS execution runner and does NOT arm any live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-consent-build-204-readonly.js"
CONSENT="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-consent-readiness-build-204.json"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-final-one-message-approval-build-204-signed.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-send-time-preflight-build-204.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-204.json"
SCAN_TARGETS=(
  "$CONSENT"
  "$APPROVAL"
  "$PREFLIGHT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 204 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 204 artifacts are well-formed JSON (read-only) --"
for f in "$CONSENT" "$APPROVAL" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 204 artifacts are valid JSON."

echo "-- Running Build 204 read-only real-customer pilot consent verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 204 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 204 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 204 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 204 real-customer pilot consent dry run passed (read-only)."
echo "Note: consent/readiness markers captured; final one-message approval SIGNED (Jason-operated send"
echo "      only); send-time preflight = READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND."
echo "      The three controlled sends (Jason number, first roofer pilot, expansion retry) succeeded."
echo "      Next step is Jason running the existing fail-closed one-message runner EXACTLY ONCE, NO RETRY,"
echo "      in his own controlled environment under the signed Build 204 approval — NOT unrestricted launch."
echo "      No homeowner contact is authorized. Launch remains pilot-gated, NOT unrestricted."
