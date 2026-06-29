#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 234 — Vapi Webhook Runtime Enablement & Controlled Smoke Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 233 verifier + Build 232 verifier + Vapi smoke regression."
echo "No call. No deploy. No Railway var set. No Vapi/Twilio config change. No live mutating HTTP. No Supabase write. No SMS."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No secrets printed. No secret committed."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js
echo "PASS: Build 234 script syntax check succeeded."

echo ""
echo "== Build 234 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js

echo ""
echo "== Regression: Build 233 Vapi webhook runtime-enablement readiness read-only verifier =="
node backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js

echo ""
echo "== Regression: Build 232 Vapi webhook auth-guard read-only verifier =="
node backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 234 Vapi webhook runtime enablement & controlled smoke dry-run passed."
echo "live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  call_placed=false  live_sms_sent=false  provider_calls_made=false  config_changed=false  guard_in_code=true  runtime_secret_enabled=false  authorized_smoke=staged_not_fabricated  repo_unchanged=true"
