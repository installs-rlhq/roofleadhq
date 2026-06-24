#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Controlled Live SMS Readiness Gate Dry Run — ONE MESSAGE ONLY (Build 185) =="
echo "Scope: readiness and approval materials ONLY. No SMS. No external Twilio call. No live execution."
echo "Gate is FAIL-CLOSED and is expected to return CONTROLLED_LIVE_SMS_BLOCKED in Build 185 because the"
echo "explicit one-message live approval is UNSIGNED and live Twilio credentials are NOT provisioned."
echo "Names/booleans only; no secret VALUES are read, printed, or logged. No production data. No real"
echo "homeowner contact. No schema/auth/RLS/security changes. No billing/payment/quote/estimate/invoice"
echo "automation. No public/live routes, webhooks, cron jobs, schedulers, or dispatchers."
echo "This wrapper does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh."
echo "demo_ready_with_live_automation_disabled preserved."

GATE="backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js"
VERIFIER="backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js"

node --check "$GATE"
echo "PASS: Build 185 gate syntax check (node --check) succeeded."
node --check "$VERIFIER"
echo "PASS: Build 185 verifier syntax check (node --check) succeeded."

echo "-- Running controlled live SMS readiness gate (EXPECT CONTROLLED_LIVE_SMS_BLOCKED / nonzero) --"
if node "$GATE"; then
  echo "FAIL: gate unexpectedly returned a zero exit; in Build 185 it must be fail-closed (BLOCKED)." >&2
  exit 1
else
  echo "PASS: gate is fail-closed as required (nonzero exit, BLOCKED, names only, no SMS, no external call)."
fi

echo "-- Running Build 185 read-only verifier --"
node "$VERIFIER"

echo "PASS: Controlled Live SMS Readiness Gate Dry Run wrapper passed (readiness/approval only)."
echo "Note: gate is BLOCKED by design; one real SMS remains gated behind a future signed one-message approval"
echo "and Jason-controlled live credential provisioning. No SMS sent; no external Twilio call made in Build 185."
