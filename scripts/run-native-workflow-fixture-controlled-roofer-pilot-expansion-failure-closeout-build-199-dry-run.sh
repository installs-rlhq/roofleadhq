#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Pilot Expansion (Option B) Failure Closeout + Diagnosis Dry Run (Build 199) =="
echo "Scope: LOCAL-ONLY closeout of the Jason-operated controlled pilot Option B expansion one-message"
echo "SMS attempt (same consenting test roofer, second controlled SMS). Exactly one send was attempted;"
echo "the SMS was NOT sent; Twilio rejected it with error code 21211 / status 400; no retry was run."
echo "This wrapper preserves the recorded manual execution evidence, captures the closeout, and diagnoses"
echo "from METADATA ONLY (root_cause_class=recipient_destination_validation_rejection)."
echo "It performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or homeowner"
echo "contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "The one-time expansion approval is consumed; the next step is Jason validating the approved"
echo "destination number in his controlled store, then a FRESH signed approval before any further attempt"
echo "— NOT a retry of the consumed approval, NOT unrestricted launch."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-failure-closeout-build-199.json"
DIAGNOSIS="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-failure-diagnosis-build-199.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-199.json"
SCAN_TARGETS=(
  "$EVIDENCE"
  "$CLOSEOUT"
  "$DIAGNOSIS"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 199 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 199 artifacts are well-formed JSON (read-only) --"
for f in "$EVIDENCE" "$CLOSEOUT" "$DIAGNOSIS" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 199 artifacts are valid JSON."

echo "-- Running Build 199 read-only expansion failure closeout + diagnosis verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 199 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 199 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 199 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 199 controlled pilot expansion failure closeout + diagnosis dry run passed (read-only)."
echo "Note: Option B attempted once (Jason-operated); SMS NOT sent; error 21211 / status 400; no retry;"
echo "      one-time approval consumed. Root cause class = recipient_destination_validation_rejection"
echo "      (metadata-only). Next step is destination validation + a fresh signed approval, NOT a retry"
echo "      and NOT unrestricted launch. Launch remains pilot-gated, NOT unrestricted."
