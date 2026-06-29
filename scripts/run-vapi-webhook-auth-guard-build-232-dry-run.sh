#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 232 — Vapi Webhook Fail-Closed Auth Guard Dry-Run =="
echo "Mode: local-only. Behavioral test (mock req/res/next) + read-only static verifier + smoke regression."
echo "No call. No deploy. No live HTTP. No Supabase call. No SMS. No Twilio/Vapi/Retell/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data read/write. No Twilio/Railway/Vapi config change."
echo "No schema/auth/RLS/security change. No secrets printed."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/test-vapi-webhook-auth-guard-build-232.js
node --check backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js
echo "PASS: Build 232 script syntax checks succeeded."

echo ""
echo "== Build 232 focused behavioral auth-guard test (mock req/res/next; no live HTTP) =="
node backend/scripts/test-vapi-webhook-auth-guard-build-232.js

echo ""
echo "== Build 232 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 232 Vapi webhook auth-guard dry-run passed."
echo "live_http_called=false  call_placed=false  live_sms_sent=false  provider_calls_made=false  config_changed=false  fail_closed=true  repo_unchanged=true"
