#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 242 — Vapi-Originated Webhook Delivery Corrected Evidence Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 241 + Build 240 + Build 239 + Build 238 + Build 237 verifiers + Vapi smoke regression."
echo "No call. No Vapi Talk. No Vapi rerun. No curl against the live webhook. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: corrects Build 241 (ambiguous/not_confirmed). A later Vapi Observe -> Logs -> Webhooks inspection observed multiple POST webhook rows at the browser-test time (End Of Call Report, Status Update, Conversation Update, Speech Update), each HTTP 400; top End Of Call Report POST to /webhooks/vapi/call-completed returned 400 with body {}. Backend receipt CONFIRMED; auth likely passed (400 not 401). Still NOT a full payload processing pass: full_payload_processing remains not_yet_validated; real_call_test remains not_started. Build 239 approval consumed; no rerun without new approval."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js
echo "PASS: Build 242 script syntax check succeeded."

echo ""
echo "== Build 242 read-only static verifier (non-mutating; no live HTTP; no runtime/external action) =="
node backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js

echo ""
echo "== Regression: Build 241 Vapi-originated validation ambiguous/not-confirmed read-only verifier =="
node backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js

echo ""
echo "== Regression: Build 240 Vapi-originated validation fresh pre-run guard read-only verifier =="
node backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js

echo ""
echo "== Regression: Build 239 Vapi-originated validation approval & guard read-only verifier =="
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
echo "PASS: Build 242 Vapi-originated webhook delivery corrected evidence dry-run passed."
echo "live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_241_prerequisite_commit=5f70e03  build_241_recorded_result=ambiguous_not_confirmed  build_242_correction=vapi_originated_webhook_delivery_observed  vapi_originated_webhook_rows_observed=true  request_path=/webhooks/vapi/call-completed  request_method=POST  response_code=400  response_body={}  backend_receipt_confirmed=true  auth_likely_passed=true  vapi_originated_delivery_status=observed  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_242=false  repo_unchanged=true"
