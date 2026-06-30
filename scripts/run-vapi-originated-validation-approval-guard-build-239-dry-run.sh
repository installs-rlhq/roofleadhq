#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 239 — Vapi-Originated Validation Approval & Guard Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 238 + Build 237 verifiers + Vapi smoke regression."
echo "No call. No Vapi Talk. No curl against the live webhook. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No Vapi-originated action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: explicit approval CAPTURED for exactly one Vapi-originated synthetic/controlled webhook validation (Test Roofing Assistant only, sanitized capture only). Validation itself NOT executed by this build. Real call test + full payload processing remain gated."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js
echo "PASS: Build 239 script syntax check succeeded."

echo ""
echo "== Build 239 read-only static verifier (non-mutating; no live HTTP; no Vapi-originated action) =="
node backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js

echo ""
echo "== Regression: Build 238 Vapi webhook Bearer credential validation read-only verifier =="
node backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js

echo ""
echo "== Regression: Build 237 Vapi webhook authorized synthetic gate-pair read-only verifier =="
node backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 239 Vapi-originated validation approval & guard dry-run passed."
echo "live_http_called=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  approval_captured=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  vapi_originated_validation=approved_not_yet_executed  vapi_originated_action_performed=false  real_call_test=not_started  full_payload_processing=not_yet_validated  repo_unchanged=true"
