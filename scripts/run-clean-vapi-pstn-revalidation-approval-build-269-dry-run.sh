#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 269 — Clean Vapi-Managed Test-Number Single Controlled True PSTN Revalidation Call Approval + One-Call Evidence Flow (repo-only, awaiting human single call) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 268 EOCR terminal-fix + Build 267 diagnosis + Build 266 EOCR-404 verifiers + Vapi smoke regression."
echo "Repo-only APPROVAL + one-call evidence-flow packet. No call placed by the agent. Exactly one human physical-phone PSTN call approved to REVALIDATE the deployed Build 268 fix; no retry. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No invented evidence. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed."
echo "Captures Jason's approval for EXACTLY ONE controlled true PSTN revalidation call from his Jason-owned physical phone/iPhone Phone app to the clean Vapi-managed Test Number, to validate the deployed Build 268 fix in production (unmapped clean-test-number EOCR now returns a controlled 200/2xx instead of 404). Records the exact allowed/not-allowed scope + four stop conditions (stop if not Phone/PSTN, stop if no end-of-call-report, stop if backend still non-2xx/validation error, stop after the single attempt regardless of outcome), records the Build 268 deploy-active confirmation (no deploy performed by this build), preserves the existing Twilio -> Retell number untouched as rollback, and provides the manual single-call execution checklist (confirm clean-number target not the existing Twilio/Retell number -> own physical phone only -> place exactly one call -> no Vapi Test/Talk/browser/webCall -> end the call normally after a short assistant interaction -> do not retry) plus the sanitized evidence template Jason reports back (PSTN_REVALIDATION_APPROVAL_STATUS=captured / CALL_ATTEMPT_COUNT / CALL_PLACED_FROM=jason_owned_physical_phone / CALL_TARGET=clean_vapi_managed_test_number / EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true / VAPI_CALL_RECORD_FOUND / VAPI_CALL_TYPE / VAPI_CALL_ID_PRESENT / END_OF_CALL_REPORT_OBSERVED / VAPI_WEBHOOK_LOG_OBSERVED / EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed / BACKEND_WEBHOOK_RECEIVED / BACKEND_WEBHOOK_RESPONSE_STATUS / LEAD_OR_FINAL_REPORT_PROCESSING_STATUS / BUILD_268_FIX_VALIDATED / STOP_CONDITION_TRIGGERED / NO_RETRY_PERFORMED=true / NO_SMS_SENT=true / NO_TWILIO_CONFIG_CHANGED=true / NO_RETELL_CONFIG_CHANGED=true / NO_BACKEND_DEPLOY=true). The single call is a human physical-phone action, so execution is marked awaiting_human_single_call; evidence is never invented. pstn_revalidation_approval_status=captured; pstn_revalidation_execution_status=awaiting_human_single_call; clean_vapi_number_target_status=selected_for_build_268_fix_revalidation; build_268_deploy_status=confirmed_active_before_approval; existing_twilio_retell_route_status=preserved_untouched. Build 269 performs NO call and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js
echo "PASS: Build 269 clean-Vapi-PSTN-revalidation-approval script syntax check succeeded."

echo ""
echo "== Build 269 clean-Vapi-PSTN-revalidation-approval read-only static verifier (non-mutating; no live HTTP; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: Build 267 production EOCR route deployment-diagnosis read-only verifier =="
node backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js

echo ""
echo "== Regression: Build 266 clean Vapi PSTN EOCR-404 evidence read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 269 clean Vapi-managed test-number single controlled true PSTN revalidation call approval + one-call evidence-flow dry-run passed."
echo "build_mode=clean_vapi_pstn_revalidation_approval_capture_repo_only  runtime_action_performed_by_build_269=false  fix_or_config_change_performed_by_build_269=false  build_268_prerequisite_commit=4c08b5e  build_268_prerequisite_status=validated  build_268_deploy_status=confirmed_active_before_approval  no_manual_deploy_performed_by_build_269=true  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  stop_conditions_documented=true  manual_single_call_checklist_documented=true  checklist_targets_only_clean_number=true  sanitized_evidence_template_documented=true  eocr_webhook_target_path_shape=/webhooks/vapi/call-completed  evidence_not_invented=true  pstn_revalidation_approval_status=captured  pstn_revalidation_execution_status=awaiting_human_single_call  call_executed_in_this_build=false  evidence_captured_in_this_build=false  clean_vapi_number_target_status=selected_for_build_268_fix_revalidation  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  decision_logic_documented=true  next_step=jason_places_single_pstn_revalidation_call_to_clean_vapi_test_number_then_capture_sanitized_evidence  no_call_placed_by_agent=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_performed=true  no_retry_without_new_approval=true  stop_rule_in_force=exactly_one_call_no_retry_no_existing_number_no_sms_no_twilio_no_retell_no_deploy_no_vapi_test_talk_webcall_without_new_separate_approval  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  evidence_invented=false  repo_unchanged=true"
