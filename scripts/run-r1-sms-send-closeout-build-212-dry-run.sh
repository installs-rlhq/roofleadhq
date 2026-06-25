#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ R1 SMS Send Successful Closeout Dry Run (Build 212) =="
echo "Scope: LOCAL-ONLY packet that CLOSES OUT the one approved, Jason-operated, successful controlled live"
echo "roofer SMS send of Build 210/211 selected variant R1 (new_lead_fast_response_alert). It records the"
echo "observed terminal result of that single approved attempt (names/booleans/codes ONLY):"
echo "gate_decision_before_execution=CONTROLLED_LIVE_SMS_PERMITTED, preflight_status=PERMITTED,"
echo "send_attempt_count=1, sms_sent=true, retry_performed=false,"
echo "final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0, approval_consumed=true,"
echo "approval_expired_after_attempt=true, env_clear_check_passed=true, no_retry_allowed_after_success=true."
echo "It records the next decision packet (R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED,"
echo "recommended_next_option=collect_roofer_feedback_only_no_send, authorizes_send_now=false) and a"
echo "feedback-capture template (no send during feedback capture)."
echo "It performs NO live action: No SMS. No retry. No additional send. No Twilio. No Twilio client. No"
echo "messages.create. No network. No real roofer or homeowner contact. No production data. No secret VALUES."
echo "No raw SIDs. No tokens. No phone numbers. No destination recorded. It does NOT run the live SMS execution"
echo "runner and does NOT arm the live confirm token. Capturing the closeout does NOT send. The next step is"
echo "for Jason to collect roofer feedback ONLY on the one sent R1 SMS — NOT another send, NOT unrestricted"
echo "launch. Any further live send requires a NEW, fresh, signed, per-attempt approval. No homeowner contact"
echo "is authorized. Launch remains pilot-gated. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-r1-sms-send-closeout-build-212-readonly.js"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-212.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-212.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_APPROVAL="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json"
SCAN_TARGETS=(
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 212 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 212 artifacts are well-formed JSON (read-only) --"
for f in "$CLOSEOUT" "$SUMMARY" "$EVIDENCE" "$PRIOR_APPROVAL"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 212 artifacts are valid JSON."

echo "-- Running Build 212 read-only successful closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number + raw-SID scan over Build 212 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, or phone-number-shaped content found in Build 212 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, or phone-number-shaped values in Build 212 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 212 R1 SMS send successful closeout dry run passed (read-only)."
echo "Note: SMS mechanics are proven, Build 210 selected R1, and Build 211 captured Jason's fresh signed"
echo "      approval. Build 212 closes out the ONE approved Jason-operated R1 SMS send: send_attempt_count=1,"
echo "      sms_sent=true, no retry, final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT, exit_status=0. The"
echo "      single-use approval is consumed and expired; the post-send env-clear check passed. Capturing the"
echo "      closeout is NOT a send. Decision = R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED;"
echo "      authorizes_send_now=false. No homeowner contact authorized, no live automation. Next step is to"
echo "      collect roofer feedback ONLY — NOT another send. Any further live send requires a new fresh signed"
echo "      approval. Launch remains pilot-gated."
