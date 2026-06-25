#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ M1 Guarded Signed Approval Dry Run (Build 218) =="
echo "Scope: LOCAL-ONLY capture of Jason's signed, single-use, scenario-specific M1 approval and"
echo "finalization of the guarded M1 execution path (future live runner + send-time source guard)."
echo "It performs NO live action: No SMS. No Twilio. No provider client. No messages.create. No network/"
echo "external call. No credential load/inspection. No destination value recorded. No confirm-token arming."
echo "No retry. No homeowner or real-roofer contact. The runner is invoked in PREFLIGHT mode ONLY and can"
echo "never send. This approval authorizes M1 ONLY and never M2. Launch remains pilot-gated, NOT unrestricted."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

RUNNER="backend/scripts/run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js"
NEGATIVES="backend/scripts/verify-m1-guarded-live-validation-negative-guards-build-218-readonly.js"
VERIFIER="backend/scripts/verify-m1-live-validation-approval-build-218-readonly.js"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/m1-live-validation-signed-approval-build-218.json"
PREFLIGHT="backend/fixtures/native-workflow-demo-roofer/m1-guarded-send-time-preflight-result-build-218.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-218.json"
DOC="docs/NATIVE_WORKFLOW_FIXTURE_M1_LIVE_VALIDATION_APPROVAL_BUILD_218.md"
SCAN_TARGETS=(
  "$APPROVAL"
  "$PREFLIGHT"
  "$SUMMARY"
  "$DOC"
)

node --check "$RUNNER"
node --check "$NEGATIVES"
node --check "$VERIFIER"
echo "PASS: Build 218 runner + negatives + verifier syntax check (node --check) succeeded."

echo "-- Running Build 218 guarded M1 runner in PREFLIGHT mode (EXPECT no send; would_permit_live_send=false) --"
node "$RUNNER" --preflight

echo "-- Running Build 218 negative guard tests (EXPECT PASS / exit 0; fail-closed proofs; no send) --"
node "$NEGATIVES"

echo "-- Validating Build 218 artifacts are well-formed JSON (read-only) --"
for f in "$APPROVAL" "$PREFLIGHT" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 218 artifacts are valid JSON."

echo "-- Running Build 218 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 218 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 218 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 218 artifacts (labels/booleans only)."

echo ""
echo "PASS: Build 218 M1 guarded signed approval dry run passed (read-only verification; preflight only, no send)."
echo "Note: M1 is signed, scenario-specific, and bound to the verified Build 217 source commit 8d92939 (not the"
echo "      Build 216 base 8a7ad6b). The guarded runner produces the body via the native workflow and fails closed"
echo "      on M2/generic/empty/modified/env-overridden copy, missing/unsigned/consumed approval, wrong source"
echo "      chain, dirty worktree, wrong branch/HEAD/subject, missing/wrong token, missing/multiple destination,"
echo "      missing credentials, and retry. M2 remains unsigned and unapproved. Decision ="
echo "      M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED; authorizes_send_now=false. Next step"
echo "      = run the M1 send-time preflight, then at most ONE guarded M1 attempt (single-use, send-time confirmed,"
echo "      destination entered silently). NOT send now, NOT unrestricted launch. demo_ready_with_live_automation_disabled preserved."
