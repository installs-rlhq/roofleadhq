#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 233 — Vapi Webhook Runtime-Enablement Readiness Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 232 verifier + Vapi smoke regression."
echo "No call. No deploy. No live HTTP. No Supabase call. No SMS. No Twilio/Vapi/Retell/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data read/write. No Twilio/Railway/Vapi config change."
echo "No schema/auth/RLS/security change. No runtime env/config change. No secrets printed."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js
echo "PASS: Build 233 script syntax check succeeded."

echo ""
echo "== Build 233 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js

echo ""
echo "== Regression: Build 232 Vapi webhook auth-guard read-only verifier =="
node backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 233 Vapi webhook runtime-enablement readiness dry-run passed."
echo "live_http_called=false  deploy=false  env_changed=false  call_placed=false  live_sms_sent=false  provider_calls_made=false  config_changed=false  guard_in_code=true  runtime_secret_enabled=false  repo_unchanged=true"
