#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 251 — Vapi Phone-Number Assistant-Assignment Correction Capture Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 250 + Build 249 verifiers + Vapi smoke regression."
echo "Assignment-correction capture only. No PSTN validation executed. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Captured: Vapi phone-number assistant assignment was Appointment Receptionist (mismatch with Build 250 approved scope), corrected via Inbound Settings to Test Roofing Assistant and saved. Phone number redacted. SMS Enabled was visible but no SMS sent. Phone-number-level Server URL blank; phone-number-level Credential showed No authentication / fallback active; assistant-level webhook credential remains the validated Bearer path (unchanged). The Build 250 prior guard rerun is now STALE because the Vapi config changed after it (guard_stale_reason=vapi_config_changed_after_guard_rerun); a fresh guard rerun is required before any PSTN attempt. pstn_validation_status=approved_not_yet_executed; real_call_test_status=approved_not_yet_executed; full_final_report_processing_status=not_validated. Build 251 performs NO PSTN validation — it only captures the correction."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js
echo "PASS: Build 251 script syntax check succeeded."

echo ""
echo "== Build 251 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no runtime/external action) =="
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
echo "PASS: Build 251 Vapi phone-number assistant-assignment correction-capture dry-run passed."
echo "build_mode=vapi_phone_assignment_correction_capture  pstn_validation_action_performed_by_build_251=false  runtime_action_performed_by_build_251=false  build_250_prerequisite_commit=a487f13  build_250_prerequisite_status=validated  approved_assistant=test_roofing_assistant_only  pre_correction_assistant_assignment=appointment_receptionist  assignment_mismatch_documented=true  corrected_assistant_assignment=test_roofing_assistant  assignment_corrected=true  phone_number_redacted=true  sms_enabled_visible=true  sms_sent=false  phone_level_server_url_blank=true  phone_level_credential_no_auth_fallback=true  assistant_level_webhook_credential=bearer_validated_path_unchanged  build_250_prior_guard_status=stale  guard_stale_reason=vapi_config_changed_after_guard_rerun  fresh_guard_rerun_required=true  pstn_validation_status=approved_not_yet_executed  real_call_test_status=approved_not_yet_executed  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  call_placed=false  phone_dialed=false  twilio_action_performed=false  live_http_called=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
