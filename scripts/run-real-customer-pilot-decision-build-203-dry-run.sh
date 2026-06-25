#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Real-Customer Pilot Decision + Consent/Onboarding Packet Dry Run (Build 203) =="
echo "Scope: LOCAL-ONLY real-customer pilot DECISION + consent/onboarding packet. After Build 202 closed"
echo "out the successful Jason-operated controlled Option B expansion retry (1 send, SMS sent, no retry,"
echo "fresh one-time approval consumed), the next step is a real-customer pilot decision/consent review."
echo "This packet records decision=REAL_CUSTOMER_PILOT_REVIEW_REQUIRED, a narrow pilot scope, a"
echo "consent/onboarding checklist, a go/no-go checklist, and an UNSIGNED approval template."
echo "It APPROVES and ACTIVATES nothing: real_customer_pilot_authorized_now=false,"
echo "homeowner_contact_authorized_now=false, approval_signed=false, approval_granted=false."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers. No live"
echo "automation. No schema/auth/RLS changes. No public routes/webhooks/cron/schedulers/dispatchers."
echo "No CRM/billing/quote/invoice/deposit/email/call/calendar automation."
echo "It does NOT run any live SMS execution runner and does NOT arm any live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-real-customer-pilot-decision-build-203-readonly.js"
DECISION="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-decision-build-203.json"
TEMPLATE="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-unsigned-approval-template-build-203.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-203.json"
SCAN_TARGETS=(
  "$DECISION"
  "$TEMPLATE"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 203 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 203 artifacts are well-formed JSON (read-only) --"
for f in "$DECISION" "$TEMPLATE" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 203 artifacts are valid JSON."

echo "-- Running Build 203 read-only real-customer pilot decision verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 203 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 203 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 203 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 203 real-customer pilot decision dry run passed (read-only)."
echo "Note: decision=REAL_CUSTOMER_PILOT_REVIEW_REQUIRED; real-customer pilot NOT authorized now;"
echo "      homeowner contact NOT authorized now; approval UNSIGNED/UNGRANTED. The three controlled"
echo "      sends (Jason number, first roofer pilot, expansion retry) succeeded. Next step is Jason's"
echo "      real-customer pilot decision + consent capture OUTSIDE the repo, then a fresh per-attempt"
echo "      signed approval before any live send — NOT unrestricted launch."
echo "      Launch remains pilot-gated, NOT unrestricted."
