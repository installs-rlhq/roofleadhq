#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Twilio SDK Readiness Dry Run (Build 191) =="
echo "Scope: LOCAL-ONLY dependency/readiness correction. Confirms the Twilio SDK dependency is"
echo "declared in backend/package.json, present in the lockfile, installed, and IMPORTABLE by the"
echo "existing fail-closed one-message live SMS runner."
echo "This wrapper performs NO live action: No SMS. No retry. No external Twilio call. No network."
echo "No live execution. No production data. No secret VALUES. No phone numbers. No client constructed."
echo "It does NOT run the live SMS execution runner and does NOT set the live confirm token."
echo ""
echo "IMPORTANT: Build 191 only installs/verifies SDK import readiness. It does NOT consume the"
echo "still-pending approved Build 190 one-message attempt, because no send attempt occurred. The"
echo "single approved attempt remains pending Jason's human-operated execution in his controlled env."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-twilio-sdk-readiness-build-191-readonly.js"
CHECK="backend/scripts/check-twilio-sdk-readiness-build-191.js"
READINESS_FIXTURE="backend/fixtures/native-workflow-demo-roofer/twilio-sdk-readiness-build-191.json"
SCAN_TARGETS=(
  "$READINESS_FIXTURE"
)

node --check "$VERIFIER"
node --check "$CHECK"
echo "PASS: Build 191 verifier + check syntax check (node --check) succeeded."

echo "-- Validating Build 191 readiness fixture is well-formed JSON (read-only) --"
node -e "JSON.parse(require('fs').readFileSync('$READINESS_FIXTURE','utf8'))"
echo "PASS: Build 191 readiness fixture is valid JSON."

echo "-- Running Build 191 local-only Twilio SDK readiness check (EXPECT PASS / exit 0) --"
node "$CHECK"

echo "-- Running Build 191 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 191 DATA artifact --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 191 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 191 artifacts (names/booleans/version only)."

echo ""
echo "PASS: Build 191 Twilio SDK readiness dry run passed (read-only)."
echo "Note: SDK present and importable; 0 send attempts; SMS not sent; no network call. The single"
echo "      approved Build 190 attempt is UNCONSUMED and pending Jason's human-operated execution via:"
echo "      backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js"
