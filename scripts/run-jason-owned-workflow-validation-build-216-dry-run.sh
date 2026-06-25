#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Jason-Owned Test Identity Workflow Validation Dry Run (Build 216) =="
echo "Scope: LOCAL-ONLY packet that PIVOTS the active pilot path from 'small consenting roofer pilot recipients'"
echo "(no consenting real roofer candidates exist yet) to 'Jason-owned test identity workflow validation' using"
echo "LABEL-ONLY identities (jason_operator, jason_owned_sms_destination, jason_owned_email_destination, Test"
echo "Roofing, test_roofing_twilio_sender) - NO raw phone numbers or email addresses. It records the owned pilot"
echo "constraint evidence, the leanest owned workflow validation plan, 3-5 validation scenarios, a concise"
echo "roofer-facing message set (opt-out where SMS; no guarantee/booked-jobs/estimate/quote/invoice/payment/"
echo "deposit claims; homeowner copy draft-only/not approved), the Lindy internal-notify/organize-only decision"
echo "(pending_lindy_audit), a sales-demo-readiness checklist, the strategic next decision packet, and the active"
echo "context/handoff path. It performs NO live action: No SMS. No email. No Twilio. No Twilio client. No"
echo "messages.create. No call/calendar provider. No network. No real roofer or homeowner contact. No production"
echo "data. No secret VALUES. No SIDs. No tokens. No phone numbers. No email addresses. It does NOT run the live"
echo "SMS execution runner and does NOT arm the live confirm token. Capturing this packet does NOT send. Any"
echo "further live send requires a NEW fresh signed per-attempt approval. Launch remains pilot-gated, NOT"
echo "unrestricted. No homeowner contact is authorized. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-jason-owned-workflow-validation-build-216-readonly.js"
PACKET="backend/fixtures/native-workflow-demo-roofer/jason-owned-workflow-validation-build-216.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-216.json"
PRIOR_CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-215.json"
SCAN_TARGETS=(
  "$PACKET"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 216 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 216 artifacts are well-formed JSON (read-only) --"
for f in "$PACKET" "$SUMMARY" "$PRIOR_CLOSEOUT"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 216 artifacts are valid JSON."

echo "-- Running Build 216 read-only Jason-owned workflow validation verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 216 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 216 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 216 artifacts (labels/booleans only)."

echo ""
echo "PASS: Build 216 Jason-owned test identity workflow validation dry run passed (read-only)."
echo "Note: Build 215 proved guarded R1 live SMS delivery and exact approved-copy binding. No consenting real"
echo "      roofer pilot candidates exist yet, so Build 216 pivots the active path to Jason-owned test identity"
echo "      workflow validation first (labels only), then sales/demo packaging within days, then recruiting real"
echo "      roofer pilots after the owned workflow proof. Decision = JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_"
echo "      APPROVAL; authorizes_send_now=false. Next step = run the owned identity workflow validation scenarios"
echo "      after a fresh signed per-attempt approval. NOT send now, NOT unrestricted launch. Launch remains"
echo "      pilot-gated; demo_ready_with_live_automation_disabled preserved."
