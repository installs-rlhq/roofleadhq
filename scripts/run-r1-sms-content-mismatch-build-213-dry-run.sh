#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ R1 SMS Content-Mismatch Feedback + Root-Cause Triage + Message-Binding FIX Dry Run (Build 213) =="
echo "Scope: LOCAL-ONLY build that (1) CAPTURES the post-send recipient feedback discrepancy on the one"
echo "approved Jason-operated controlled live roofer SMS closed out in Build 212, (2) ROOT-CAUSES it locally,"
echo "and (3) FIXES the local send-message binding now. Delivery mechanics were validated (sms_received=yes,"
echo "one attempt, no retry, approval consumed/expired), but R1 VALUE messaging was NOT validated by that send:"
echo "the actual received text remained the older GENERIC delivery-test copy instead of Build 210/211 selected"
echo "variant R1 (new_lead_fast_response_alert)."
echo "Root cause (local file inspection only): the existing fail-closed one-message runner carried a HARDCODED"
echo "generic message body with NO binding to the selected approved variant"
echo "(root_cause_status=send_script_hardcoded_generic_body_and_missing_selected_variant_binding;"
echo "stale_fixture_lookup=false; wrong_fixture_reference=false)."
echo "FIX APPLIED IN THIS BUILD: the runner outbound body is now BOUND to the approved selected variant text"
echo "read from the current signed approval packet, the hardcoded generic literal is removed from the send"
echo "path, and a FAIL-CLOSED guard (assertOutboundBodyMatchesApprovedVariant) blocks any live send unless the"
echo "resolved outbound body EXACTLY equals the approved selected variant (and explicitly rejects the stale"
echo "generic copy). A read-only verifier PROVES resolveOutboundBody()===R1 and !==generic WITHOUT any send,"
echo "Twilio client, or network call (requiring the runner module is side-effect-free)."
echo "Decision: R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND"
echo "(recommended_next_option=capture_new_fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_r1_sms,"
echo "authorizes_send_now=false)."
echo "It performs NO live action: No SMS. No retry. No send. No Twilio. No Twilio client. No messages.create."
echo "No network. No live-runner live execution. No real roofer or homeowner contact. No production data."
echo "No secret VALUES. No raw SIDs. No tokens. No phone numbers. No destination recorded. The FIX is a local"
echo "code change only — it does NOT send and does NOT arm the live confirm token. Any further live send"
echo "requires a NEW, fresh, signed, per-attempt approval AND a send-time preflight (the prior approval was"
echo "consumed/expired in Build 212). No homeowner contact is authorized. Launch remains pilot-gated."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-r1-sms-content-mismatch-build-213-readonly.js"
PACKET="backend/fixtures/native-workflow-demo-roofer/r1-sms-content-mismatch-feedback-build-213.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-213.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-212.json"
SCAN_TARGETS=(
  "$PACKET"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 213 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 213 artifacts are well-formed JSON (read-only) --"
for f in "$PACKET" "$SUMMARY" "$EVIDENCE" "$PRIOR_CLOSEOUT"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 213 artifacts are valid JSON."

echo "-- Running Build 213 read-only content-mismatch + root-cause triage + message-binding-fix verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number + raw-SID scan over Build 213 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, or phone-number-shaped content found in Build 213 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, or phone-number-shaped values in Build 213 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 213 R1 SMS content-mismatch feedback + root-cause triage + message-binding-fix dry run passed (read-only)."
echo "Note: Build 212 delivery succeeded technically (sms_sent=true, one attempt, no retry), but Build 213"
echo "      feedback shows the received copy remained the GENERIC delivery-test copy — R1 value messaging was"
echo "      NOT validated by that send. Root cause = hardcoded generic body + missing selected-variant binding"
echo "      in the live runner (no stale-fixture lookup, no wrong-fixture reference). FIX APPLIED + VERIFIED"
echo "      LOCALLY: outbound body now bound to the approved selected variant; fail-closed guard blocks any"
echo "      send from stale/non-approved copy; resolveOutboundBody()===R1 and !==generic. Decision ="
echo "      R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND;"
echo "      authorizes_send_now=false. The fix is a code change only — NOT a send. Any further live send"
echo "      requires a new fresh signed approval AND a send-time preflight. Launch remains pilot-gated."
