#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 250 — Vapi PSTN End-of-Call-Report Validation Approval-Capture & Fail-Closed Guard Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 249 + Build 248 verifiers + Vapi smoke regression."
echo "Approval-capture + fail-closed guard only. No PSTN validation executed. No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Approval captured (verbatim) for exactly ONE controlled PSTN end-of-call-report validation attempt using the Test Roofing Assistant only and a Jason-owned/test number only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation. One attempt only; stop on any unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, or unsafe behavior; no retry without new approval. pstn_validation_status=approved_not_yet_executed; full_final_report_processing_status=not_validated; real_call_test_status=approved_not_yet_executed. Build 250 performs NO PSTN validation — it only captures the approval and builds the fresh guard."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js
echo "PASS: Build 250 script syntax check succeeded."

echo ""
echo "== Build 250 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no runtime/external action) =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js

echo ""
echo "== Regression: Build 249 Vapi PSTN end-of-call-report validation plan read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js

echo ""
echo "== Regression: Build 248 Vapi serverMessages read-only dashboard inspection evidence read-only verifier =="
node backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 250 Vapi PSTN end-of-call-report validation approval-capture & guard dry-run passed."
echo "build_mode=approval_capture_and_fail_closed_guard  pstn_validation_action_performed_by_build_250=false  runtime_action_performed_by_build_250=false  pstn_validation_status=approved_not_yet_executed  approval_captured_verbatim=true  approval_scope=one_controlled_pstn_end_of_call_report_validation_attempt  approved_assistant=test_roofing_assistant_only  approved_number=jason_owned_or_test_number_only  sanitized_evidence_capture_only=true  one_attempt_limit=true  pstn_validation_attempt_limit=1  no_retry_without_new_approval=true  no_real_homeowner_traffic=true  no_real_roofer_traffic=true  no_sms_unless_separately_approved=true  no_production_data_export=true  no_schema_auth_rls_changes=true  no_billing_crm_automation=true  no_public_live_automation=true  stop_conditions_documented=true  evidence_capture_fields_documented=true  build_249_prerequisite_commit=3683853  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=approved_not_yet_executed  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  repo_unchanged=true"
