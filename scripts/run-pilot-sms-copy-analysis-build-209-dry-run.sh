#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Pilot SMS Workflow/Message-Copy Analysis + Revision Packet Dry Run (Build 209) =="
echo "Scope: LOCAL-ONLY SMS workflow/message-copy analysis and revision packet for the next controlled"
echo "pilot send. The real-customer pilot SMS (Jason-operated, Build 205) proved live delivery TECHNICALLY,"
echo "but the message content was generic delivery-test copy only ('RoofLeadHQ controlled live test: ...')"
echo "that did NOT validate RoofLeadHQ value. This build analyzes that gap and drafts revised roofer-facing"
echo "SMS copy variants for review (names/booleans/codes ONLY), records the homeowner-facing copy boundary"
echo "(NOT approved now; separate consent + approval required), records the next decision packet"
echo "(COPY_REVISED_REVIEW_REQUIRED, recommended_next_option=review_copy_before_any_live_send), and includes"
echo "an UNSIGNED next-send approval template (selected_message_variant=pending_jason_review)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "It does NOT approve any send, expansion, homeowner contact, live automation, or unrestricted launch."
echo "The next step is for Jason to review the revised roofer-facing SMS copy and select one before any"
echo "further live send — NOT a live send, NOT unrestricted launch. Any further live send requires a NEW,"
echo "explicit, per-attempt signed approval. No homeowner contact is authorized. Launch remains pilot-gated."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-pilot-sms-copy-analysis-build-209-readonly.js"
ANALYSIS="backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-analysis-build-209.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-209.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
PRIOR_FEEDBACK="backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-208.json"
SCAN_TARGETS=(
  "$ANALYSIS"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 209 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 209 artifacts are well-formed JSON (read-only) --"
for f in "$ANALYSIS" "$SUMMARY" "$EVIDENCE" "$PRIOR_FEEDBACK"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 209 artifacts are valid JSON."

echo "-- Running Build 209 read-only copy-analysis verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 209 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 209 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 209 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 209 pilot SMS workflow/message-copy analysis + revision packet dry run passed (read-only)."
echo "Note: Live SMS delivery is proven; the previous pilot copy was generic delivery-test copy only. Build"
echo "      209 drafts 3-5 honest roofer-facing SMS variants (no guarantees / no booked-jobs / no estimate/"
echo "      quote/invoice/payment/deposit claims; opt-out included), keeps homeowner-facing SMS UNAPPROVED"
echo "      (separate consent + approval required), and records decision COPY_REVISED_REVIEW_REQUIRED with"
echo "      recommended_next_option=review_copy_before_any_live_send and an UNSIGNED next-send approval"
echo "      template (selected_message_variant=pending_jason_review). No approval granted, no homeowner"
echo "      contact authorized. Next step is Jason copy review, NOT a live send. Launch remains pilot-gated."
