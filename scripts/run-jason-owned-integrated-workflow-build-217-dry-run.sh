#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Jason-Owned Integrated Local Workflow Dry Run (Build 217) =="
echo "Scope: LOCAL-ONLY integrated runner that EXERCISES the native RoofLeadHQ workflow modules"
echo "(lead-intake-recognition, roofer-alert-binding, sms-safety, sms-dispatcher-planner,"
echo "sms-send-intent-planner) across all five Build 216 scenarios with deterministic SYNTHETIC data."
echo "It performs NO live action: No SMS. No email. No Twilio. No provider client. No messages.create."
echo "No network/external call. No credential load. No raw phone number or email address. No production"
echo "record. No retry. No confirm-token arming. No homeowner or real-roofer contact. Guarded FUTURE"
echo "M1/M2 live support is permission-only and fails closed; M1 and M2 remain separate scenario-specific"
echo "approvals (M1 never authorizes M2). Launch remains pilot-gated, NOT unrestricted."
echo "demo_ready_with_live_automation_disabled preserved."
echo ""

RUNNER="backend/scripts/run-jason-owned-integrated-workflow-build-217.js"
VERIFIER="backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js"
PACKET="backend/fixtures/native-workflow-demo-roofer/jason-owned-integrated-workflow-build-217.json"
EVIDENCE="backend/fixtures/native-workflow-demo-roofer/integrated-workflow-execution-evidence-build-217.json"
APPROVAL_READY="backend/fixtures/native-workflow-demo-roofer/m1-m2-guarded-live-validation-approval-ready-build-217.json"
SUMMARY="backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-217.json"
DEMO_PROOF="docs/NATIVE_WORKFLOW_DEMO_PROOF_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md"
SCAN_TARGETS=(
  "$PACKET"
  "$EVIDENCE"
  "$APPROVAL_READY"
  "$SUMMARY"
  "$DEMO_PROOF"
)

node --check "$RUNNER"
node --check "$VERIFIER"
echo "PASS: Build 217 runner + verifier syntax check (node --check) succeeded."

echo "-- Running Build 217 integrated local runner (EXPECT PASS / exit 0; exercises native modules; no send) --"
node "$RUNNER"

echo "-- Validating Build 217 artifacts are well-formed JSON (read-only) --"
for f in "$PACKET" "$EVIDENCE" "$APPROVAL_READY" "$SUMMARY"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 217 artifacts are valid JSON."

echo "-- Running Build 217 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 217 DATA artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 217 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 217 artifacts (labels/booleans only)."

echo ""
echo "PASS: Build 217 Jason-owned integrated local workflow dry run passed (read-only verification; runner exercised native modules)."
echo "Note: All five Build 216 scenarios executed against real native logic. M1 and M2 exact binding proven"
echo "      locally; homeowner contact blocked; guarded future M1/M2 live support permission-only and"
echo "      fail-closed. Decision = JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_"
echo "      AVAILABLE; authorizes_send_now=false. Next step = select and sign separate fresh per-attempt M1"
echo "      and M2 Jason-owned live validation approvals (each scenario-specific, single-use, send-time"
echo "      confirmed). NOT send now, NOT unrestricted launch. demo_ready_with_live_automation_disabled preserved."
