#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Roofer Pilot Setup/Approval Capture Dry Run (Build 194) =="
echo "Scope: LOCAL-ONLY capture of Jason's signed controlled real-roofer pilot setup/approval markers"
echo "(names/booleans only), no-go blocker closure FOR SETUP/PREFLIGHT ONLY, and a preflight gate that"
echo "evaluates to READY_FOR_FINAL_SEND_APPROVAL. It captures markers; it does NOT authorize a send."
echo "This wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT set the live confirm token."
echo "Live pilot SEND remains BLOCKED behind a separate final approval. Launch remains pilot-gated."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-setup-build-194-readonly.js"
SIGNED="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-setup-approval-build-194-signed.json"
CLOSURE="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-no-go-blocker-closure-build-194.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-preflight-gate-build-194.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-194.json"
SCAN_TARGETS=(
  "$SIGNED"
  "$CLOSURE"
  "$PREFLIGHT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 194 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 194 setup artifacts are well-formed JSON (read-only) --"
for f in "$SIGNED" "$CLOSURE" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 194 setup artifacts are valid JSON."

echo "-- Running Build 194 read-only setup verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 194 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 194 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 194 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 194 controlled roofer pilot setup/approval capture dry run passed (read-only)."
echo "Note: setup markers captured; setup/preflight blockers cleared; preflight = READY_FOR_FINAL_SEND_APPROVAL;"
echo "      0 send attempts; no retry; no network call; live pilot SEND NOT authorized. Launch remains pilot-gated."
