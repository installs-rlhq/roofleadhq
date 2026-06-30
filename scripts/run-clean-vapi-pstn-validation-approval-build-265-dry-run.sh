#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 265 — Clean Vapi-Managed Test-Number Single Controlled True PSTN Validation Call Approval + One-Call Evidence Flow (repo-only, awaiting human single call) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 264 evidence + Build 263 approval + Build 262 clean-number-path verifiers + Vapi smoke regression."
echo "Repo-only APPROVAL + one-call evidence-flow packet. No call placed by the agent. Exactly one human physical-phone PSTN call approved; no retry. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No invented evidence. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed."
echo "Captures Jason's approval for EXACTLY ONE controlled true PSTN call from his Jason-owned physical phone/iPhone Phone app to the clean Vapi-managed Test Number (provisioned + assigned to Test Roofing Assistant in Build 264), records the exact allowed/not-allowed scope + four stop conditions (stop if not Phone/PSTN, stop if no end-of-call-report, stop if backend non-2xx/validation error, stop after the single attempt regardless of outcome), preserves the existing Twilio -> Retell number untouched as rollback, and provides the manual single-call execution checklist (confirm clean-number target not the existing Twilio/Retell number -> own physical phone only -> place exactly one call -> no Vapi Test/Talk/browser/webCall -> end the call normally after a short assistant interaction -> do not retry) plus the sanitized evidence template Jason reports back (PSTN_VALIDATION_APPROVAL_STATUS=captured / CALL_ATTEMPT_COUNT / CALL_PLACED_FROM=jason_owned_physical_phone / CALL_TARGET=clean_vapi_managed_test_number / EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true / VAPI_CALL_RECORD_FOUND / VAPI_CALL_TYPE / VAPI_CALL_ID_PRESENT / END_OF_CALL_REPORT_OBSERVED / VAPI_WEBHOOK_LOG_OBSERVED / BACKEND_WEBHOOK_RECEIVED / BACKEND_WEBHOOK_RESPONSE_STATUS / LEAD_OR_FINAL_REPORT_PROCESSING_STATUS / STOP_CONDITION_TRIGGERED / NO_RETRY_PERFORMED=true / NO_SMS_SENT=true / NO_TWILIO_CONFIG_CHANGED=true / NO_RETELL_CONFIG_CHANGED=true / NO_BACKEND_DEPLOY=true). The single call is a human physical-phone action, so execution is marked awaiting_human_single_call; evidence is never invented. pstn_validation_approval_status=captured; pstn_validation_execution_status=awaiting_human_single_call; clean_vapi_number_target_status=selected_for_one_call_validation; existing_twilio_retell_route_status=preserved_untouched. Build 265 performs NO call and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js
echo "PASS: Build 265 clean-Vapi-PSTN-validation-approval script syntax check succeeded."

echo ""
echo "== Build 265 clean-Vapi-PSTN-validation-approval read-only static verifier (non-mutating; no live HTTP; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js

echo ""
echo "== Regression: Build 264 clean Vapi-managed test-number provisioning/assignment evidence read-only verifier =="
node backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js

echo ""
echo "== Regression: Build 263 clean Vapi-managed test-number approval + provisioning-readiness read-only verifier =="
node backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js

echo ""
echo "== Regression: Build 262 clean Vapi-managed test-number path strategic-decision read-only verifier =="
node backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 265 clean Vapi-managed test-number single controlled true PSTN validation call approval + one-call evidence-flow dry-run passed."
echo "build_mode=clean_vapi_pstn_validation_approval_capture_repo_only  runtime_action_performed_by_build_265=false  fix_or_config_change_performed_by_build_265=false  build_264_prerequisite_commit=8e36101  build_264_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  stop_conditions_documented=true  manual_single_call_checklist_documented=true  checklist_targets_only_clean_number=true  sanitized_evidence_template_documented=true  evidence_not_invented=true  pstn_validation_approval_status=captured  pstn_validation_execution_status=awaiting_human_single_call  call_executed_in_this_build=false  evidence_captured_in_this_build=false  clean_vapi_number_target_status=selected_for_one_call_validation  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  decision_logic_documented=true  next_step=jason_places_single_pstn_call_to_clean_vapi_test_number_then_capture_sanitized_evidence  no_call_placed_by_agent=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_performed=true  no_retry_without_new_approval=true  stop_rule_in_force=exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  evidence_invented=false  repo_unchanged=true"
