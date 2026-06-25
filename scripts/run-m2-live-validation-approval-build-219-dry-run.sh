#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ M1 Closeout + M2 Guarded Signed Approval Dry Run (Build 219) =="
echo "Scope: LOCAL-ONLY closeout of the one authorized M1 live-validation send and capture of Jason's"
echo "signed, single-use, scenario-specific M2 approval, plus finalization of the guarded M2 execution"
echo "path (future live runner + NON-MUTATING send-time source guard)."
echo "It performs NO live action: No SMS. No Twilio. No provider client. No messages.create. No network/"
echo "external call. No credential load/inspection. No destination value recorded. No confirm-token arming."
echo "No retry. No homeowner or real-roofer contact. The runner is invoked in PREFLIGHT mode ONLY and can"
echo "never send. This M2 approval authorizes M2 ONLY and never M1; M1 remains permanently consumed."
echo "Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

RUNNER="backend/scripts/run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js"
NEGATIVES="backend/scripts/verify-m2-guarded-live-validation-negative-guards-build-219-readonly.js"
NO_MUTATION="backend/scripts/verify-m2-preflight-no-mutation-build-219-readonly.js"
VERIFIER="backend/scripts/verify-m2-live-validation-approval-build-219-readonly.js"
CLOSEOUT="backend/fixtures/native-workflow-demo-roofer/m1-live-validation-closeout-evidence-build-219.json"
APPROVAL="backend/fixtures/native-workflow-demo-roofer/m2-live-validation-signed-approval-build-219.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-219.json"
DOC="docs/NATIVE_WORKFLOW_FIXTURE_M2_LIVE_VALIDATION_APPROVAL_BUILD_219.md"
SCAN_TARGETS=(
  "$CLOSEOUT"
  "$APPROVAL"
  "$SUMMARY"
  "$DOC"
)

node --check "$RUNNER"
node --check "$NEGATIVES"
node --check "$NO_MUTATION"
node --check "$VERIFIER"
echo "PASS: Build 219 runner + negatives + no-mutation + verifier syntax check (node --check) succeeded."

echo "-- Running Build 219 guarded M2 runner in PREFLIGHT mode (EXPECT no send; would_permit_live_send=false; non-mutating) --"
node "$RUNNER" --preflight

echo "-- Proving the M2 send-time preflight is NON-MUTATING (git status identical before/after) --"
node "$NO_MUTATION"

echo "-- Running Build 219 negative guard tests (EXPECT PASS / exit 0; fail-closed proofs; no send) --"
node "$NEGATIVES"

echo "-- Validating Build 219 artifacts are well-formed JSON (read-only) --"
for f in "$CLOSEOUT" "$APPROVAL" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 219 artifacts are valid JSON."

echo "-- Running Build 219 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 219 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 219 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 219 artifacts (labels/booleans only)."

echo ""
echo "PASS: Build 219 M1 closeout + M2 guarded signed approval dry run passed (read-only verification; preflight only, no send)."
echo "Note: M1 is live-validated, confirmed, and permanently consumed. M2 is signed, scenario-specific, and bound to the"
echo "      verified Build 217 source commit 8d92939 and verified Build 218 commit 21b840b. The guarded M2 runner produces"
echo "      the body via the native workflow and fails closed on M1/generic/empty/modified/env-overridden copy, missing/"
echo "      unsigned/consumed approval, wrong source chain, M1 reuse, dirty worktree, wrong branch/HEAD/subject, missing/"
echo "      wrong token, missing/multiple destination, missing credentials, and retry. The send-time preflight is NON-"
echo "      MUTATING. Decision = M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED;"
echo "      authorizes_send_now=false. Next step = run the NON-MUTATING M2 send-time preflight, then at most ONE guarded M2"
echo "      attempt (single-use, send-time confirmed, destination entered silently). NOT send now, NOT unrestricted launch."
echo "      demo_ready_with_live_automation_disabled preserved."
