#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 252 — Vapi PSTN-Validation Ambiguous-Evidence Capture Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 251 + Build 250 + Build 249 verifiers + Vapi smoke regression."
echo "Evidence capture only. No PSTN validation executed. No retry of the consumed attempt. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Captured: the single approved controlled PSTN end-of-call-report validation attempt was reported completed once (attempt consumed). Post-attempt evidence is ambiguous/not_confirmed: uploaded Vapi CSV showed webhook rows all HTTP 200, no HTTP 400, no end-of-call-report, call type appeared web/browser, no PSTN/Twilio indicators; Vapi Observe → Logs → Calls showed visible Test Roofing Assistant calls were Type=Web only; user reported 'No PSTN results that I can find.' pstn_call_record_confirmed=false; end_of_call_report_observed=false; full_final_report_processing_status=not_validated; real_pstn_call_path_validation_status=ambiguous_not_confirmed. No SMS reported. No Twilio action confirmed. No retry without a new, separate approval. Build 252 performs NO PSTN validation and NO retry — it only captures the ambiguous evidence."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js
echo "PASS: Build 252 script syntax check succeeded."

echo ""
echo "== Build 252 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no retry; no runtime/external action) =="
node backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js

echo ""
echo "== Regression: Build 251 Vapi phone-number assistant-assignment correction-capture read-only verifier =="
node backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js

echo ""
echo "== Regression: Build 250 Vapi PSTN end-of-call-report validation approval-capture & guard read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js

echo ""
echo "== Regression: Build 249 Vapi PSTN end-of-call-report validation plan read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 252 Vapi PSTN-validation ambiguous-evidence-capture dry-run passed."
echo "build_mode=vapi_pstn_validation_ambiguous_evidence_capture  pstn_validation_action_performed_by_build_252=false  runtime_action_performed_by_build_252=false  build_250_prerequisite_commit=a487f13  build_250_prerequisite_status=validated  build_251_prerequisite_commit=828ea19  build_251_prerequisite_status=validated  approval_scope=one_controlled_pstn_end_of_call_report_validation_attempt  approved_assistant=test_roofing_assistant_only  approved_number=jason_owned_or_test_number_only  corrected_assistant_assignment=test_roofing_assistant  guard_rerun_after_build_251=passed  one_attempt_limit=true  attempt_count=1  pstn_validation_attempt_reported_completed=true  pstn_validation_attempt_consumed=true  retry_performed=false  no_retry_without_new_approval=true  webhook_rows_observed=true  all_observed_webhook_responses_http_200=true  http_400_observed=false  csv_call_type_appeared=web_browser  pstn_twilio_indicators_observed=false  visible_vapi_calls_type=web_only  user_reported_no_pstn_results=true  pstn_call_record_confirmed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  sms_reported=false  twilio_action_confirmed=false  full_final_report_processing_status=not_validated  pstn_validation_result=ambiguous_not_confirmed  real_pstn_call_path_validation_status=ambiguous_not_confirmed  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
