#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Roofer Pilot Readiness Dry Run (Build 193) =="
echo "Scope: LOCAL-ONLY readiness packet. Converts the successful one-message SMS proof (Build 192:"
echo "gate PERMITTED, 1 send attempt, 1 SMS sent, no retry, one-time approval consumed) into a safe,"
echo "documented controlled real-roofer pilot readiness plan: scope, setup-completeness checklist,"
echo "no-go blockers, and a FRESH UNSIGNED pilot approval template. It ACTIVATES NOTHING."
echo "This wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT set the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-readiness-build-193-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-readiness-build-193-evidence.json"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-approval-build-193-template.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-193.json"
SCAN_TARGETS=(
  "$EVIDENCE"
  "$APPROVAL"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 193 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 193 readiness artifacts are well-formed JSON (read-only) --"
for f in "$EVIDENCE" "$APPROVAL" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 193 readiness artifacts are valid JSON."

echo "-- Running Build 193 read-only readiness verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 193 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 193 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 193 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 193 controlled roofer pilot readiness dry run passed (read-only)."
echo "Note: nothing activated; pilot gate decision = NO_GO; fresh pilot approval is UNSIGNED;"
echo "      0 send attempts; no retry; no network call. Launch remains pilot-gated, NOT unrestricted."
