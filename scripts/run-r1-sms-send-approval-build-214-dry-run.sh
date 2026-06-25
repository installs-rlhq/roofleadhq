#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ R1 SMS Guarded Send Fresh Signed Approval Capture Dry Run (Build 214) =="
echo "Scope: LOCAL-ONLY packet that CAPTURES Jason's fresh, signed, per-attempt approval for ONE Jason-operated"
echo "controlled live roofer SMS send using the Build 213 fixed/guarded R1 message binding (variant R1,"
echo "new_lead_fast_response_alert). The prior approval was consumed/expired after the Build 212 attempt, so a"
echo "NEW fresh signed approval is required before any one-message attempt. It records approval_signed=true and"
echo "approval_granted=true with the exact approved scope (names/booleans/codes ONLY): one SMS, SMS-only, no"
echo "retry, no homeowner contact, no live automation activation, no unrestricted launch, no production data,"
echo "destination entered silently outside repo/chat/logs, secrets/phone numbers not recorded, guarded message"
echo "binding required, outbound body must equal the approved R1 message exactly, send-time preflight required,"
echo "and approval expires after one attempt whether sent or failed. It records the next decision packet"
echo "(R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED, recommended_next_option="
echo "run_send_time_preflight_then_one_guarded_jason_operated_sms_attempt, authorizes_send_now=false) and a"
echo "fail-closed send-time preflight checklist (armed_by_build=false, executed_by_build=false) that also"
echo "verifies the guarded resolved outbound body equals the approved R1 text and is not the stale generic copy."
echo "It performs NO live action: No SMS. No retry. No Twilio. No Twilio client. No messages.create. No network."
echo "No real roofer or homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone"
echo "numbers. No destination recorded. It does NOT run the live SMS execution runner and does NOT arm the live"
echo "confirm token. Capturing approval does NOT send. The next step is for Jason to run a send-time preflight"
echo "and then exactly ONE guarded Jason-operated SMS attempt in his controlled environment — NOT send now, NOT"
echo "unrestricted launch. No homeowner contact is authorized. Launch remains pilot-gated."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-r1-sms-send-approval-build-214-readonly.js"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-214.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-214.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_BINDING_FIX="backend/fixtures/native-workflow-demo-roofer/r1-sms-content-mismatch-feedback-build-213.json"
SCAN_TARGETS=(
  "$APPROVAL"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 214 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 214 artifacts are well-formed JSON (read-only) --"
for f in "$APPROVAL" "$SUMMARY" "$EVIDENCE" "$PRIOR_BINDING_FIX"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 214 artifacts are valid JSON."

echo "-- Running Build 214 read-only guarded signed approval capture verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number + raw-SID scan over Build 214 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, or phone-number-shaped content found in Build 214 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, or phone-number-shaped values in Build 214 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 214 R1 SMS guarded send fresh signed approval capture dry run passed (read-only)."
echo "Note: Build 213 fixed and locally proved the R1 message binding (resolveOutboundBody()===R1, fail-closed"
echo "      guard blocks generic/non-approved copy). Build 214 captures Jason's fresh signed approval for ONE"
echo "      Jason-operated R1 SMS using that guarded binding (approval_signed=true, approval_granted=true) —"
echo "      capturing approval is NOT a send. Decision = R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_"
echo "      REQUIRED; authorizes_send_now=false. The verifier proves DYNAMICALLY that the runner's resolved"
echo "      outbound body equals the approved R1 text and the guard blocks the stale generic copy. The approval"
echo "      is single-use and expires after one attempt whether sent or failed. Next step is a send-time"
echo "      preflight then one guarded Jason-operated SMS attempt, NOT send now. Launch remains pilot-gated."
