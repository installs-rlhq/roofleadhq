#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 253 — Vapi PSTN Call-Path Setup Read-Only Diagnosis Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 252 + Build 251 + Build 250 verifiers + Vapi smoke regression."
echo "Repo-only read-only diagnosis. No PSTN validation executed. No new call requested. No call placed. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Diagnosis: Build 252 captured the consumed PSTN attempt as ambiguous/not_confirmed with Vapi Calls Type=Web only and no PSTN/Twilio indicators. Grounded in backend/src/services/vapi-webhook.service.ts (detectVapiCallTransport + classifyVapiWebhookEvent): a web-transport call with no PSTN roofer destination is a no-op (web_call=true, processed=false). Most likely cause is user-side call path (web/browser, not a true PSTN dial); phone-number routing/config and Twilio/provider setup are possible; not fully determinable from the repo alone. Phone-level blank Server URL + no-auth/fallback credential are documented as open questions (NOT changed); assistant-level webhook URL + Bearer credential are documented from prior builds. real_pstn_call_path_validation_status=ambiguous_not_confirmed; full_final_report_processing_status=not_validated; pstn_validation_attempt_consumed=true; no_retry_without_new_approval=true. Safest next step is a read-only Vapi dashboard/API inspection before any new approval."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js
echo "PASS: Build 253 script syntax check succeeded."

echo ""
echo "== Build 253 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no new call; no runtime/external action) =="
node backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js

echo ""
echo "== Regression: Build 252 Vapi PSTN-validation ambiguous-evidence-capture read-only verifier =="
node backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js

echo ""
echo "== Regression: Build 251 Vapi phone-number assistant-assignment correction-capture read-only verifier =="
node backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js

echo ""
echo "== Regression: Build 250 Vapi PSTN end-of-call-report validation approval-capture & guard read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 253 Vapi PSTN call-path setup read-only-diagnosis dry-run passed."
echo "build_mode=vapi_pstn_call_path_readonly_diagnosis  runtime_action_performed_by_build_253=false  another_call_requested=false  build_250_prerequisite_commit=a487f13  build_251_prerequisite_commit=828ea19  build_252_prerequisite_commit=424c081  build_252_prerequisite_status=validated  pstn_validation_attempt_consumed=true  no_retry_without_new_approval=true  phone_assignment_corrected_to_test_roofing_assistant=true  assignment_correction_considered=true  sms_enabled_documented=true  provider_twilio_documented=consistent_not_explicitly_captured  provider_twilio_open_question=true  phone_level_blank_server_url_blocks_delivery=false  phone_level_blank_server_url_open_question_not_changed=true  phone_level_no_auth_fallback_blocks_auth=false  phone_level_no_auth_fallback_open_question_not_changed=true  assistant_level_webhook_url_documented=true  assistant_level_bearer_credential_documented=true  repo_visible_reason_web_transport_not_pstn=true  web_call_no_destination_is_noop=true  likely_cause_primary=user_side_call_path_web_not_pstn  likely_cause_secondary=phone_number_routing_or_config  likely_cause_tertiary=twilio_provider_setup  likely_cause_filtering_export=less_likely  likely_cause_unknown_without_readonly_inspection=true  likely_cause_classification_documented=true  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_pstn_call_path_validation_status=ambiguous_not_confirmed  safest_next_step=readonly_dashboard_api_inspection_before_new_approval  next_step_requires_new_separate_approval_for_any_new_call=true  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
