#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Pilot SMS Copy Selection + Next-Send Approval/Preflight Template Dry Run (Build 210) =="
echo "Scope: LOCAL-ONLY packet that records Jason's copy SELECTION of roofer-facing SMS variant R1"
echo "(new_lead_fast_response_alert) as the recommended NEXT controlled-pilot message, and prepares the exact"
echo "next-send approval/preflight TEMPLATE. Build 209 produced five roofer-facing variants and left"
echo "selected_variant=pending_jason_review; Build 210 resolves that to selected_variant_id=R1 for the next"
echo "controlled ROOFER pilot review (names/booleans/codes ONLY), records the rationale, records the next"
echo "decision packet (R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED,"
echo "recommended_next_option=fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_sms),"
echo "includes an UNSIGNED exact approval statement template (selected_message_variant=R1, approval_signed=false),"
echo "and includes a send-time preflight checklist template (armed_by_build=false, executed_by_build=false)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner contact."
echo "No production data. No secret VALUES. No SIDs. No tokens. No phone numbers. No destination recorded."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Selecting copy does NOT approve, schedule, or perform any send. It does NOT approve any send, expansion,"
echo "homeowner contact, live automation, or unrestricted launch. The next step is for Jason to complete a"
echo "FRESH signed per-attempt approval for R1 and a send-time preflight before ONE Jason-operated SMS in his"
echo "controlled environment — NOT send now, NOT unrestricted launch. No homeowner contact is authorized."
echo "Launch remains pilot-gated. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-pilot-sms-copy-selection-build-210-readonly.js"
SELECTION="backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-selection-build-210.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-210.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_ANALYSIS="backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-analysis-build-209.json"
SCAN_TARGETS=(
  "$SELECTION"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 210 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 210 artifacts are well-formed JSON (read-only) --"
for f in "$SELECTION" "$SUMMARY" "$EVIDENCE" "$PRIOR_ANALYSIS"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 210 artifacts are valid JSON."

echo "-- Running Build 210 read-only copy-selection verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 210 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 210 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 210 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 210 pilot SMS copy selection + next-send approval/preflight template dry run passed (read-only)."
echo "Note: SMS mechanics are proven and Build 209 copy was revised. Build 210 records Jason's selection of R1"
echo "      (new_lead_fast_response_alert) for the NEXT controlled roofer pilot review only — selecting copy is"
echo "      NOT a send authorization. Decision = R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED. The unsigned exact"
echo "      approval statement template and send-time preflight checklist template authorize/arm NOTHING. No"
echo "      approval granted, no homeowner contact authorized, no live automation. Next step is a FRESH signed"
echo "      approval + send-time preflight before one Jason-operated SMS, NOT send now. Launch remains pilot-gated."
