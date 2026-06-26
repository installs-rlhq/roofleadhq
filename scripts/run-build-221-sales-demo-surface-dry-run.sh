#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 221 — Sanitized Sales-Demo Surface Dry Run =="
echo "Scope: LOCAL-ONLY generation + read-only verification of one sanitized sales-demo surface that is"
echo "generated from the native workflow modules on SYNTHETIC data."
echo "It performs NO live action: No SMS. No email. No Twilio. No provider client. No messages.create."
echo "No network/external call. No credential load/inspection. No destination value recorded. No"
echo "confirm-token arming. No retry. No homeowner or real-roofer contact. M1 and M2 remain permanently"
echo "consumed. Launch remains pilot-gated, NOT unrestricted. demo_ready_with_live_automation_disabled preserved."
echo ""

GENERATOR="backend/scripts/build-sales-demo-surface-build-221.js"
VERIFIER="backend/scripts/verify-sales-demo-surface-build-221-readonly.js"
B220_M2_CLOSEOUT_VERIFIER="backend/scripts/verify-m2-live-validation-closeout-build-220-readonly.js"
B220_MILESTONE_VERIFIER="backend/scripts/verify-jason-owned-m1-m2-live-validation-milestone-build-220-readonly.js"
B220_SALES_VERIFIER="backend/scripts/verify-sales-demo-readiness-build-220-readonly.js"
B217_VERIFIER="backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js"

HTML="website/demo/sales-demo.html"
CONTENT="backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-content-build-221.json"
STATE="backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-state-build-221.json"
READINESS="backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-readiness-build-221.json"
DOC="docs/NATIVE_WORKFLOW_FIXTURE_SANITIZED_SALES_DEMO_SURFACE_BUILD_221.md"
SCAN_TARGETS=(
  "$HTML"
  "$CONTENT"
  "$STATE"
  "$READINESS"
  "$DOC"
)

node --check "$GENERATOR"
node --check "$VERIFIER"
echo "PASS: Build 221 generator + verifier syntax check (node --check) succeeded."

echo "-- Running Build 221 generator (EXPECT PASS / exit 0; exercises native modules; no send) --"
node "$GENERATOR"

echo "-- Validating Build 221 JSON artifacts are well-formed (read-only) --"
for f in "$STATE" "$READINESS"; do
  node -e "JSON.parse(require('fs').readFileSync('$f','utf8'))"
done
echo "PASS: Build 221 JSON artifacts are valid."

echo "-- Running Build 221 read-only verifier (EXPECT PASS / exit 0) --"
node "$VERIFIER"

echo "-- Re-running Build 220 verifiers (EXPECT PASS / exit 0; predecessor preserved) --"
node "$B220_M2_CLOSEOUT_VERIFIER"
node "$B220_MILESTONE_VERIFIER"
node "$B220_SALES_VERIFIER"

echo "-- Re-running Build 217 verifier (EXPECT PASS / exit 0; foundation preserved) --"
node "$B217_VERIFIER"

echo "-- Inline secret + phone-number + email-address + raw-SID scan over Build 221 artifacts --"
if grep -nPi '(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)' "${SCAN_TARGETS[@]}"; then
  echo "FAIL: secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped content found in Build 221 artifacts." >&2
  exit 1
fi
echo "PASS: no secret-shaped, raw-SID-shaped, email-address-shaped, or phone-number-shaped values in Build 221 artifacts."

echo ""
echo "PASS: Build 221 sanitized sales-demo surface dry run passed (read-only; no send)."
echo "Note: One usable sanitized sales-demo surface exists at website/demo/sales-demo.html, generated from"
echo "      the native workflow modules on synthetic data. Decision ="
echo "      SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH; authorizes_send_now=false. NOT send"
echo "      now, NOT unrestricted launch. demo_ready_with_live_automation_disabled preserved."
