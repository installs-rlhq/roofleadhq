#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ R1 SMS Send Signed Approval Capture Dry Run (Build 211) =="
echo "Scope: LOCAL-ONLY packet that CAPTURES Jason's fresh, signed, per-attempt approval for ONE Jason-operated"
echo "controlled live roofer SMS send using Build 210 selected variant R1 (new_lead_fast_response_alert)."
echo "It records approval_signed=true and approval_granted=true with the exact approved scope (names/booleans/"
echo "codes ONLY): one SMS, SMS-only, no retry, no homeowner contact, no live automation activation, no"
echo "unrestricted launch, no production data, destination entered silently outside repo/chat/logs, secrets/"
echo "phone numbers not recorded, send-time preflight required, and approval expires after one attempt whether"
echo "sent or failed. It records the next decision packet (R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_"
echo "REQUIRED, recommended_next_option=run_send_time_preflight_before_one_jason_operated_sms_attempt,"
echo "authorizes_send_now=false) and a fail-closed send-time preflight checklist (armed_by_build=false,"
echo "executed_by_build=false)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No Twilio client. No messages.create. No network."
echo "No real roofer or homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone"
echo "numbers. No destination recorded. It does NOT run the live SMS execution runner and does NOT arm the live"
echo "confirm token. Capturing approval does NOT send. The next step is for Jason to run a send-time preflight"
echo "before ONE Jason-operated SMS attempt in his controlled environment — NOT send now, NOT unrestricted"
echo "launch. No homeowner contact is authorized. Launch remains pilot-gated. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-r1-sms-send-approval-build-211-readonly.js"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-211.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_SELECTION="backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-selection-build-210.json"
SCAN_TARGETS=(
  "$APPROVAL"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 211 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 211 artifacts are well-formed JSON (read-only) --"
for f in "$APPROVAL" "$SUMMARY" "$EVIDENCE" "$PRIOR_SELECTION"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 211 artifacts are valid JSON."

echo "-- Running Build 211 read-only signed approval capture verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 211 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 211 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 211 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 211 R1 SMS send signed approval capture dry run passed (read-only)."
echo "Note: SMS mechanics are proven and Build 210 selected R1. Build 211 captures Jason's fresh signed approval"
echo "      for ONE Jason-operated R1 SMS (approval_signed=true, approval_granted=true) — capturing approval is"
echo "      NOT a send. Decision = R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED; authorizes_send_now=false."
echo "      The send-time preflight checklist arms/executes NOTHING. No homeowner contact authorized, no live"
echo "      automation. The approval is single-use and expires after one attempt whether sent or failed. Next step"
echo "      is a send-time preflight before one Jason-operated SMS attempt, NOT send now. Launch remains pilot-gated."
