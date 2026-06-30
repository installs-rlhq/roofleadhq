#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 255 — Vapi True PSTN Validation Dial Approval-Capture & Fresh Fail-Closed Guard Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 254 + Build 253 + Build 252 + Build 250 verifiers + Vapi smoke regression."
echo "Approval-capture + fresh fail-closed guard only. No PSTN validation executed. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Guard: Captures the user's explicit approval for exactly ONE true PSTN validation dial, placed from Jason's own physical phone / iPhone Phone app to the Vapi number assigned to Test Roofing Assistant (no Vapi Test, no Vapi Talk), sanitized evidence capture only, no retry without new approval. Stop conditions: unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, unsafe behavior. true_pstn_validation_status=approved_not_yet_executed; full_final_report_processing_status=not_validated. Build 255 does NOT perform the dial."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js
echo "PASS: Build 255 script syntax check succeeded."

echo ""
echo "== Build 255 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no dial; no runtime/external action) =="
node backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js

echo ""
echo "== Regression: Build 254 Vapi PSTN validation method-clarification read-only verifier =="
node backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js

echo ""
echo "== Regression: Build 253 Vapi PSTN call-path setup read-only-diagnosis verifier =="
node backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js

echo ""
echo "== Regression: Build 252 Vapi PSTN-validation ambiguous-evidence-capture read-only verifier =="
node backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js

echo ""
echo "== Regression: Build 250 Vapi PSTN end-of-call-report validation approval-capture & guard read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 255 Vapi true PSTN validation dial approval-capture & fresh guard dry-run passed."
echo "build_mode=true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard  pstn_validation_action_performed_by_build_255=false  runtime_action_performed_by_build_255=false  true_pstn_validation_status=approved_not_yet_executed  build_254_prerequisite_commit=9f60fed  build_254_prerequisite_status=validated  build_254_method_clarification_preserved=true  prior_attempt_was_vapi_test_not_true_pstn=true  approval_captured_verbatim=true  approval_scope=one_true_pstn_validation_dial  one_dial_limit=true  true_pstn_dial_limit=1  dial_origin=jason_owned_physical_phone_or_iphone_phone_app  dial_destination=vapi_number_assigned_to_test_roofing_assistant  approved_assistant=test_roofing_assistant_only  no_vapi_test=true  no_vapi_talk=true  sanitized_evidence_capture_only=true  no_real_homeowner_traffic=true  no_real_roofer_traffic=true  no_sms_unless_separately_approved=true  no_production_data_export=true  no_schema_auth_rls_changes=true  no_billing_crm_automation=true  no_public_live_automation=true  no_retry_without_new_approval=true  stop_on_unexpected_sms=true  stop_on_real_traffic=true  stop_on_http_401=true  stop_on_http_400=true  stop_on_http_500=true  stop_on_missing_end_of_call_report=true  stop_on_unsafe_behavior=true  stop_after_one_dial=true  stop_conditions_documented=true  evidence_capture_fields_documented=true  true_pstn_call_performed=false  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
