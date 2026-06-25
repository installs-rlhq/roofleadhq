#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Corrected Controlled Live SMS Retry Dry Run / Closeout (Build 190) =="
echo "Scope: read-only verification of the Build 190 corrected-retry evidence:"
echo "  signed approval + credential revalidation attestation + corrected self-check (PASS)"
echo "  + corrected pre-flight gate (PERMITTED) + execution evidence + closeout."
echo "This wrapper performs NO live action: No SMS. No retry. No external Twilio call. No live"
echo "execution. No production data. No secret VALUES. No phone numbers. Names/booleans/codes only."
echo "It does NOT run the live SMS execution runner and does NOT set the live confirm token."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""
echo "IMPORTANT: The single approved live SMS attempt is gate-PERMITTED but was NOT armable in this"
echo "build environment (live Twilio credentials, recipient number, Twilio SDK, and confirm token live"
echo "ONLY in Jason's controlled environment). The one approved attempt must be fired by Jason."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-readonly.js"
SCAN_TARGETS=(
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-revalidation-attestation-build-190.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-one-message-approval-signed-build-190.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-readiness-self-check-result-build-190.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-preflight-gate-result-build-190.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence-build-190.json"
  "backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-190-closeout.json"
)

node --check "$VERIFIER"
echo "PASS: Build 190 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 190 evidence files are well-formed JSON (read-only) --"
for f in "${SCAN_TARGETS[@]}"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: all Build 190 evidence files are valid JSON."

echo "-- Running Build 190 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 190 DATA artifacts --"
# Boundaried 32-hex so legitimate git SHAs do not false-positive; also flag E.164-ish digit runs.
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 190 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 190 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 190 corrected controlled live SMS retry dry run / closeout passed (read-only)."
echo "Note: preflight PERMITTED; 0 send attempts; SMS not sent; no retry. The single approved attempt"
echo "      is pending Jason's human-operated execution in his controlled environment via:"
echo "      backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js"
