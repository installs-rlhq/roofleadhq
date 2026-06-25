#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Roofer Pilot Post-Pilot Observation + Expansion Decision Dry Run (Build 197) =="
echo "Scope: LOCAL-ONLY post-pilot observation capture for the already-completed Jason-operated pilot"
echo "one-message SMS, plus a controlled pilot expansion DECISION packet (names/booleans only)."
echo "It does NOT approve expansion and does NOT activate anything. The expansion decision evaluates to"
echo "EXPANSION_NOT_APPROVED_REVIEW_REQUIRED with an UNSIGNED options template (A/B/C) and no-go blockers."
echo "This wrapper performs NO live action: No SMS. No retry. No Twilio. No network. No real roofer or"
echo "homeowner contact. No production data. No secret VALUES. No SIDs. No tokens. No phone numbers."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-observation-build-197-readonly.js"
OBSERVATION="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-post-pilot-observation-build-197.json"
EXPANSION="backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-decision-build-197.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-197.json"
SCAN_TARGETS=(
  "$OBSERVATION"
  "$EXPANSION"
  "$SUMMARY"
)

node --check "$VERIFIER"
echo "PASS: Build 197 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 197 artifacts are well-formed JSON (read-only) --"
for f in "$OBSERVATION" "$EXPANSION" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 197 artifacts are valid JSON."

echo "-- Running Build 197 read-only observation + expansion-decision verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 197 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 197 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 197 artifacts (names/booleans/codes only)."

echo ""
echo "PASS: Build 197 controlled roofer pilot post-pilot observation + expansion decision dry run passed (read-only)."
echo "Note: post-pilot observation captured (pilot SMS sent=true; 1 attempt; no retry; delivery/feedback"
echo "      NOT build-recorded). Expansion decision = EXPANSION_NOT_APPROVED_REVIEW_REQUIRED; options"
echo "      template UNSIGNED; 3 no-go blockers outstanding. Next step is Jason's expansion decision."
echo "      Launch remains pilot-gated, NOT unrestricted."
