#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 220 — M2 Live-Validation Closeout + Jason-Owned M1/M2 Milestone + Sales-Demo Readiness Dry Run =="
echo "Scope: LOCAL-ONLY closeout of the one authorized M2 live-validation send, the Jason-owned M1/M2 live-validation"
echo "milestone, and a sanitized sales-demo readiness packet."
echo "It performs NO live action: No SMS. No Twilio. No provider client. No messages.create. No network/external call."
echo "No credential load/inspection. No destination value recorded. No confirm-token arming. No retry. No homeowner or"
echo "real-roofer contact. M1 and M2 are both permanently consumed. Launch remains pilot-gated, NOT unrestricted."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

M2_CLOSEOUT_VERIFIER="backend/scripts/verify-m2-live-validation-closeout-build-220-readonly.js"
MILESTONE_VERIFIER="backend/scripts/verify-jason-owned-m1-m2-live-validation-milestone-build-220-readonly.js"
SALES_VERIFIER="backend/scripts/verify-sales-demo-readiness-build-220-readonly.js"
B219_VERIFIER="backend/scripts/verify-m2-live-validation-approval-build-219-readonly.js"
B217_VERIFIER="backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js"

M2_CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/m2-live-validation-closeout-evidence-build-220.json"
MILESTONE="backend/fixtures/native-workflow-demo-roofer/jason-owned-m1-m2-live-validation-milestone-build-220.json"
SALES_PACKET="backend/fixtures/native-workflow-demo-roofer/sales-demo-readiness-packet-build-220.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-220.json"
DOC="docs/NATIVE_WORKFLOW_FIXTURE_M2_LIVE_VALIDATION_CLOSEOUT_AND_SALES_DEMO_BUILD_220.md"
SCAN_TARGETS=(
  "$M2_CLOSEOUT"
  "$MILESTONE"
  "$SALES_PACKET"
  "$SUMMARY"
  "$DOC"
)

node --check "$M2_CLOSEOUT_VERIFIER"
node --check "$MILESTONE_VERIFIER"
node --check "$SALES_VERIFIER"
echo "PASS: Build 220 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 220 artifacts are well-formed JSON (read-only) --"
for f in "$M2_CLOSEOUT" "$MILESTONE" "$SALES_PACKET" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 220 artifacts are valid JSON."

echo "-- Running Build 220 M2 closeout verifier (EXPECT PASS / exit 0) --"
node "$M2_CLOSEOUT_VERIFIER"

echo "-- Running Build 220 Jason-owned M1/M2 milestone verifier (EXPECT PASS / exit 0) --"
node "$MILESTONE_VERIFIER"

echo "-- Running Build 220 sales-demo readiness verifier (EXPECT PASS / exit 0) --"
node "$SALES_VERIFIER"

echo "-- Re-running Build 219 verifier (EXPECT PASS / exit 0; M2 approval now permanently consumed) --"
node "$B219_VERIFIER"

echo "-- Re-running Build 217 verifier (EXPECT PASS / exit 0; foundation preserved) --"
node "$B217_VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 220 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 220 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 220 artifacts."

echo ""
echo "PASS: Build 220 M2 closeout + Jason-owned M1/M2 milestone + sales-demo readiness dry run passed (read-only; no send)."
echo "Note: M1 and M2 are both live-validated, exact-copy confirmed, and permanently consumed. The Jason-owned live SMS"
echo "      validation loop is COMPLETE. Sales-demo readiness packet is ready. A true product demo UI surface does NOT yet"
echo "      exist and is the next strategic build target (no screenshot fabricated). Decision ="
echo "      JASON_OWNED_M1_M2_LIVE_VALIDATION_COMPLETE_SALES_DEMO_PACKET_READY; authorizes_send_now=false. NOT send now,"
echo "      NOT unrestricted launch. demo_ready_with_live_automation_disabled preserved."
