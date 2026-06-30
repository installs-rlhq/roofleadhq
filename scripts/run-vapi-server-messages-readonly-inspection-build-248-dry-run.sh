#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 248 — Vapi serverMessages Read-Only Dashboard Inspection Evidence Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 247 + Build 246 verifiers + Vapi smoke regression."
echo "No fix applied. No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Evidence: a read-only Vapi dashboard inspection (Test Roofing Assistant only) found the Webhook Server URL https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed with the RoofLeadHQ Production Webhook Secret (Bearer Token) credential assigned and Authentication Enabled visible (no custom HTTP headers), and a Server Messages section whose visible chips include end-of-call-report, conversation-update, and function-call (+8 more). end-of-call-report appears ENABLED in serverMessages, so the missing end-of-call-report in the Build 246 CSV is UNLIKELY to be due to a visibly-disabled serverMessages config. Remaining likely causes: browser/webCall behavior, CSV/export timing or observability, delayed final report, or a Vapi delivery nuance not resolvable from repo/read-only dashboard inspection alone. full_final_report_processing_status remains not_validated; real_call_test_status remains not_started; no further Vapi-originated action is authorized."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js
echo "PASS: Build 248 script syntax check succeeded."

echo ""
echo "== Build 248 read-only static verifier (non-mutating; no live HTTP; no fix; no runtime/external action) =="
node backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js

echo ""
echo "== Regression: Build 247 repo-only end-of-call-report-not-observed diagnosis read-only verifier =="
node backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js

echo ""
echo "== Regression: Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence read-only verifier =="
node backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 248 Vapi serverMessages read-only dashboard inspection evidence dry-run passed."
echo "inspection_mode=readonly_dashboard  dashboard_inspection_performed=true  fix_applied=false  runtime_action_performed_by_build_248=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_247_prerequisite_commit=a7adaf5  build_246_prerequisite_commit=563044c  webhook_server_url_documented=true  webhook_bearer_credential_assigned=true  webhook_authentication_enabled_visible=true  webhook_custom_http_headers_configured=false  server_messages_section_found=true  server_messages_end_of_call_report_visible=true  server_messages_conversation_update_visible=true  server_messages_function_call_visible=true  end_of_call_report_appears_enabled=true  missing_eocr_due_to_visibly_disabled_servermessages=unlikely  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  further_vapi_originated_action_authorized=false  approval_consumed=true  rerun_permitted_without_new_approval=false  repo_unchanged=true"
