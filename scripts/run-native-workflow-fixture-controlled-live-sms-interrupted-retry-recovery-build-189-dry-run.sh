#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Interrupted Live SMS Retry Recovery Dry Run (Build 189) =="
echo "Scope: read-only verification of the Build 189 interrupted-session recovery evidence capture."
echo "Build 189 was an interrupted live-SMS retry session (Claude/server connection lost)."
echo "This recovery performs NO live action: No SMS. No retry. No external Twilio call. No live"
echo "execution. No production data. No secret VALUES. Names/metadata/booleans/codes only."
echo "This wrapper does NOT run the live SMS execution runner, the pre-186 readiness gate runner,"
echo "the Build 188 gate runner, or any actual external/sandbox runner stub."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-interrupted-retry-recovery-build-189-readonly.js"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-interrupted-retry-recovery-build-189-evidence.json"

node --check "$VERIFIER"
echo "PASS: Build 189 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 189 recovery evidence is well-formed JSON (read-only) --"
node -e "JSON.parse(require('fs').readFileSync('$EVIDENCE','utf8'))"
echo "PASS: Build 189 recovery evidence is valid JSON."

echo "-- Running Build 189 read-only recovery verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret scan over Build 189 DATA artifact (no external scanner installed) --"
SCAN_TARGETS=(
  "$EVIDENCE"
)
# Boundaried 32-hex so legitimate 40-char git commit SHAs (provenance) do not false-positive.
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer ' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped content found in Build 189 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped values found in Build 189 artifacts (names/metadata/booleans/codes only)."

echo ""
echo "PASS: Interrupted Live SMS Retry Recovery dry run passed (read-only evidence capture)."
echo "Note: no send, no retry, no external Twilio call. prior_session_state=ambiguous_unknown."
echo "      The next live step requires Jason's review and fresh instruction: the Build 184 approval"
echo "      is consumed, no signed approval exists, and the live credential VALUES must be"
echo "      independently revalidated after the Build 186 401/20003 failure before any future SMS."
