#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Live SMS One-Message Sent Closeout Dry Run (Build 192) =="
echo "Scope: LOCAL-ONLY closeout. Captures and verifies the result of Jason's already-completed,"
echo "human-operated controlled live SMS attempt: gate PERMITTED, 1 send attempt, 1 SMS sent, no retry."
echo "This wrapper performs NO live action: No SMS. No retry. No external Twilio call. No network."
echo "No live execution. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT set the live confirm token."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-192-closeout.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-192.json"
SCAN_TARGETS=(
  "$EVIDENCE"
  "$CLOSEOUT"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 192 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 192 closeout artifacts are well-formed JSON (read-only) --"
for f in "$EVIDENCE" "$CLOSEOUT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 192 closeout artifacts are valid JSON."

echo "-- Running Build 192 read-only closeout verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 192 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 192 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 192 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 192 controlled live SMS one-message-sent closeout dry run passed (read-only)."
echo "Note: one message delivered under the consumed one-time approval; 0 closeout send attempts; no retry;"
echo "      no network call. Next step is controlled live roofer pilot readiness, NOT unrestricted launch."
