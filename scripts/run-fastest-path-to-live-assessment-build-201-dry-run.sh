#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Fastest Path to Live Assessment Dry Run (Build 201) =="
echo "Scope: LOCAL-ONLY application assessment + fastest-path-to-live recommendation."
echo "It reviews the repo, evidence chain, build history, readiness summaries, and launch blockers and"
echo "captures a machine-readable assessment plus a decision document. It performs NO live action:"
echo "No SMS. No Twilio. No network. No real roofer or homeowner contact. No production data."
echo "No secret VALUES. No SIDs. No tokens. No phone numbers. No live automation. No schema/auth/RLS."
echo "It does NOT run the live SMS execution runner and does NOT arm the live confirm token."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

VERIFIER="backend/scripts/verify-fastest-path-to-live-assessment-build-201-readonly.js"
ASSESSMENT="backend/fixtures/native-workflow-demo-roofer/fastest-path-to-live-assessment-build-201.json"
DOC="docs/ROOFLEADHQ_BUILD_201_FASTEST_PATH_TO_LIVE_ASSESSMENT.md"
SCAN_TARGETS=(
  "$ASSESSMENT"
)

node --check "$VERIFIER"
echo "PASS: Build 201 verifier syntax check (node --check) succeeded."

echo "-- Validating Build 201 assessment is well-formed JSON (read-only) --"
node -e "JSON.parse(require('fs').readFileSync('$ASSESSMENT','utf8'))"
test -f "$DOC" || { echo "FAIL: decision document missing: $DOC" >&2; exit 1; }
echo "PASS: Build 201 assessment is valid JSON and the decision document exists."

echo "-- Running Build 201 read-only fastest-path-to-live assessment verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline names-only secret + phone-number scan over Build 201 DATA artifact --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped or phone-number-shaped content found in Build 201 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped or phone-number-shaped values in Build 201 artifact (names/booleans/codes/counts only)."

echo ""
echo "PASS: Build 201 fastest path to live assessment dry run passed (read-only)."
echo "Note: Recommendation = stop the per-state fixture ceremony; Jason runs the already-approved"
echo "      one-message send; onboard ONE real roofer; run ONE real lead end-to-end manually. Best next"
echo "      build = Build 202 consolidated closeout AFTER the send. Estimated 2-4 builds to a useful"
echo "      live pilot. No live action occurred. Launch remains pilot-gated, NOT unrestricted."
