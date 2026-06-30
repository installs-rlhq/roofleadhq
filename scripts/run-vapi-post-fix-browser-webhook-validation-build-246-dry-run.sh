#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 246 — Post-Fix Vapi Browser/webCall Webhook Validation Sanitized CSV Evidence Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 245 + Build 242 + Build 241 + Build 240 + Build 239 + Build 238 + Build 237 verifiers + Vapi smoke regression."
echo "No call. No phone dialed. No Vapi Talk. No Vapi rerun. No curl against the live webhook/production. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: the single approved post-fix Vapi-originated synthetic browser/webCall validation (Test Roofing Assistant only) was performed exactly once; the Build 245 guard was re-run and passed immediately beforehand. An uploaded sanitized Vapi call-logs CSV (293 rows, 54 webhook rows: 18 initiated / 18 response / 18 completed) showed every webhook POST to /webhooks/vapi/call-completed returning HTTP 200 (assistant.started 1, status-update 2, speech-update 11, conversation-update 4), no HTTP 400 observed, completed rows success=true. PASS for observed webhook delivery/no-op; Build 244 fix eliminated the prior observed 400. NO end-of-call-report row was present: end_of_call_report_observed=false, full_final_report_processing_status=not_validated; real_call_test_status=not_started. Build 245 approval consumed; no rerun without new approval."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js
echo "PASS: Build 246 script syntax check succeeded."

echo ""
echo "== Build 246 read-only static verifier (non-mutating; no live HTTP; no runtime/external action) =="
node backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js

echo ""
echo "== Regression: Build 245 post-fix Vapi browser/webCall validation approval & fresh-guard read-only verifier =="
node backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js

echo ""
echo "== Regression: Build 242 Vapi-originated webhook delivery corrected evidence read-only verifier =="
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
echo "PASS: Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence dry-run passed."
echo "live_http_called=false  phone_dialed=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_244_prerequisite_commit=7342539  build_245_prerequisite_commit=cc3007c  build_245_guard_rerun_before_action=pass  approved_action_performed_count=1  approved_assistant=test_roofing_assistant_only  csv_webhook_row_count=54  request_path=/webhooks/vapi/call-completed  request_method=POST  auth_headers_present=true  auth_headers_redacted=true  assistant_started=1@200  status_update=2@200  speech_update=11@200  conversation_update=4@200  all_observed_responses_http_200=true  http_400_observed=false  completed_rows_success=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_246=false  repo_unchanged=true"
