#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ R1 SMS Guarded Successful Send Closeout Dry Run (Build 215) =="
echo "Scope: LOCAL-ONLY packet that CLOSES OUT the one approved, Jason-operated, SUCCESSFUL guarded controlled"
echo "live roofer SMS send of selected variant R1 (new_lead_fast_response_alert) using the Build 213 fixed/guarded"
echo "message binding. It records the observed terminal result — names/booleans/codes ONLY — gate_decision="
echo "CONTROLLED_LIVE_SMS_PERMITTED, message_binding bound_to_approved_selected_variant=true and outbound_body_"
echo "equals_approved_selected_variant=true, preflight_status=PERMITTED, send_attempt_count=1, sms_sent=true,"
echo "retry_performed=false, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0, approval"
echo "consumed/expired, and the post-send env-clear check passed. CRITICAL NEW PROOF: the recipient confirmed the"
echo "actual received text matched the approved R1 message EXACTLY (the stale generic delivery-test copy was NOT"
echo "received), so the R1 message binding is validated LIVE and R1 value-message delivery is proven end-to-end."
echo "It records the strategic next decision packet (GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_"
echo "FOR_APPROVAL, recommended_next_option=small_consenting_roofer_workflow_validation_packet, authorizes_send_"
echo "now=false), a lean fastest-pilot-path, and a lean feedback-capture template. It performs NO live action: No"
echo "SMS. No retry. No Twilio. No Twilio client. No messages.create. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers. It does NOT run the"
echo "live SMS execution runner and does NOT arm the live confirm token. Capturing the closeout does NOT send. Any"
echo "further live send requires a NEW fresh signed per-attempt approval. Launch remains pilot-gated, NOT"
echo "unrestricted. No homeowner contact is authorized. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-r1-sms-send-closeout-build-215-readonly.js"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-215.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-215.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_APPROVAL="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-214.json"
SCAN_TARGETS=(
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 215 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 215 artifacts are well-formed JSON (read-only) --"
for f in "$CLOSEOUT" "$SUMMARY" "$EVIDENCE" "$PRIOR_APPROVAL"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 215 artifacts are valid JSON."

echo "-- Running Build 215 read-only guarded successful send closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number + raw-SID scan over Build 215 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, or phone-number-shaped content found in Build 215 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, or phone-number-shaped values in Build 215 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 215 R1 SMS guarded successful send closeout dry run passed (read-only)."
echo "Note: Build 213 fixed and locally proved the R1 message binding; Build 214 captured Jason's fresh signed"
echo "      guarded approval; Jason then ran the guarded one-message runner exactly once. Build 215 closes out"
echo "      that SUCCESSFUL guarded R1 send (1 attempt, no retry) AND records that the recipient confirmed the"
echo "      actual received text matched R1 EXACTLY — R1 message binding is validated LIVE, R1 value-message"
echo "      delivery proven end-to-end. The verifier proves DYNAMICALLY that the runner's resolved outbound body"
echo "      equals the approved R1 text and the guard blocks the stale generic copy. The single-use approval is"
echo "      consumed/expired; any further live send requires a NEW fresh signed approval. Decision ="
echo "      GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL; authorizes_send_now=false."
echo "      Next step = small consenting roofer workflow validation packet (1-3 consenting roofers, each with its"
echo "      own fresh signed approval), move immediately from proof SMS to sales/pilot conversation. NOT send now,"
echo "      NOT unrestricted launch. Launch remains pilot-gated."
