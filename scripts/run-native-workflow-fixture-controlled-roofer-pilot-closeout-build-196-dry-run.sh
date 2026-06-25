#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Roofer Pilot One-Message SMS Closeout Dry Run (Build 196) =="
echo "Scope: LOCAL-ONLY closeout that captures the SUCCESSFUL result of the already-completed"
echo "Jason-operated controlled roofer pilot one-message SMS send (names/booleans/codes only)."
echo "The send itself was performed separately by Jason in his own controlled environment; this"
echo "wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-readonly.js"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-closeout-build-196.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-196.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
SCAN_TARGETS=(
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 196 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 196 artifacts (and preserved evidence) are well-formed JSON (read-only) --"
for f in "$CLOSEOUT" "$SUMMARY" "$EVIDENCE"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 196 artifacts and preserved manual execution evidence are valid JSON."

echo "-- Running Build 196 read-only closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 196 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 196 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 196 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 196 controlled roofer pilot one-message SMS closeout dry run passed (read-only)."
echo "Note: pilot one-message SMS sent=true; 1 send attempt; no retry; Jason-operated (build send NOT used);"
echo "      no live action during closeout; no network call. Next step is post-pilot observation /"
echo "      controlled pilot expansion decision. Launch remains pilot-gated, NOT unrestricted."
