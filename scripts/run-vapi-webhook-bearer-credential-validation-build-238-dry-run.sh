#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 238 — Vapi Webhook Bearer Credential Validation Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 237 + Build 236 + Build 235 + Build 234 + Build 233 + Build 232 verifiers + Vapi smoke regression."
echo "No call. No deploy. No Railway var set. No Vapi/Twilio config change. No live mutating HTTP. No Supabase write. No SMS. No Vapi-originated test. No full payload pass. No real call test. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No secrets printed. No secret committed."
echo "Recorded outcome: direct Bearer-header auth PASS (Authorization: Bearer <final B237 secret> POST -> 400 missing_required_field). Vapi-originated test + full payload pass + real call test NOT executed, NOT fabricated."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js
echo "PASS: Build 238 script syntax check succeeded."

echo ""
echo "== Build 238 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js

echo ""
echo "== Regression: Build 237 Vapi webhook authorized synthetic gate-pair read-only verifier =="
node backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js

echo ""
echo "== Regression: Build 236 Vapi webhook runtime-secret-loaded read-only verifier =="
node backend/scripts/verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js

echo ""
echo "== Regression: Build 235 Vapi webhook post-enablement smoke read-only verifier =="
node backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js

echo ""
echo "== Regression: Build 234 Vapi webhook runtime-enablement & controlled-smoke read-only verifier =="
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
echo "PASS: Build 238 Vapi webhook Bearer credential validation dry-run passed."
echo "live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  call_placed=false  live_sms_sent=false  provider_calls_made=false  config_changed=false  guard_in_code=true  vapi_credential_assigned=true  vapi_credential_type=bearer_token  bearer_header_auth=400_missing_required_field_live  bearer_header_auth_status=pass  vapi_originated_webhook=not_started  full_payload_processing=not_started  real_call_test=not_started  repo_unchanged=true"
