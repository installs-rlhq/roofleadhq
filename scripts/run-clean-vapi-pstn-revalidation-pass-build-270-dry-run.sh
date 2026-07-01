#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 270 — Clean Vapi-Managed Test-Number Single Controlled True PSTN Revalidation Call PASS + Evidence Closeout (repo-only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 269 approval + Build 268 EOCR terminal-fix verifiers + Vapi smoke regression."
echo "Repo-only PASS + evidence-closeout packet. The single human physical-phone PSTN revalidation call was already completed by Jason; this build only records sanitized evidence. No call placed by the agent. No retry. No second call. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No invented evidence. No first-roofer live-test approval created. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed."
echo "Records the successful outcome of the Build 269-approved single controlled true PSTN revalidation call: true PSTN reached the clean Vapi-managed Test Number, a Vapi inbound Phone/PSTN call record existed, the Test Roofing Assistant answered, a Vapi webhook stream existed, an End Of Call Report was observed (POST), and the EOCR POST to /webhooks/vapi/call-completed returned HTTP 200 against the deployed Build 268 fix. Records the additional sanitized Vapi webhook details (started 2026-07-01T04:13:54.914Z / finished 2026-07-01T04:13:56.030Z / duration 1.12s / host shape railway_production_api_host / path /webhooks/vapi/call-completed / method POST / Content-Type application/json / Accept-Encoding identity / list response HTTP 200). Confirms the Build 268 fix is validated and the technical voice path is validated end-to-end to backend 200 (true PSTN -> clean Vapi number -> Test Roofing Assistant -> EOCR -> backend HTTP 200). Does NOT overclaim full lead processing: the clean test number is still unmapped, so final processing is a controlled 200 no-op for the unmapped clean test number. Preserves the existing Twilio -> Retell number untouched. Documents the next strategic step (first roofer test wiring: map a clean Vapi number/assistant to a demo or pilot roofer record -> confirm reporting/lead-persistence path -> then request a SEPARATE controlled first-roofer end-to-end test approval) WITHOUT creating any live-roofer-test approval. pstn_revalidation_execution_status=completed_sanitized_evidence_captured; build_268_fix_validated=true; technical_voice_path_status=validated_end_to_end_to_backend_200; final_report_processing_status=controlled_200_noop_unmapped_clean_test_number; next_step=first_roofer_test_wiring. Build 270 performs NO call and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js
echo "PASS: Build 270 clean-Vapi-PSTN-revalidation-PASS script syntax check succeeded."

echo ""
echo "== Build 270 clean-Vapi-PSTN-revalidation-PASS read-only static verifier (non-mutating; no live HTTP; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 269 clean Vapi PSTN revalidation approval read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 270 clean Vapi-managed test-number single controlled true PSTN revalidation call PASS + evidence-closeout dry-run passed."
echo "build_mode=clean_vapi_pstn_revalidation_pass_evidence_capture_repo_only  runtime_action_performed_by_build_270=false  fix_or_config_change_performed_by_build_270=false  build_269_prerequisite_commit=164449c  build_268_prerequisite_commit=4c08b5e  build_268_prerequisite_status=validated  build_268_deploy_status=confirmed_active_before_revalidation  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  pstn_revalidation_execution_status=completed_sanitized_evidence_captured  pstn_to_clean_vapi_status=passed  vapi_inbound_call_record_status=passed  test_roofing_assistant_used=true  vapi_webhook_stream_observed=true  end_of_call_report_observed=true  vapi_eocr_delivery_status=passed  backend_eocr_response_status=200  eocr_webhook_target_path_shape=/webhooks/vapi/call-completed  eocr_webhook_method=POST  eocr_webhook_duration_seconds=1.12  eocr_webhook_list_response_http_code=200  eocr_webhook_details_captured=true  build_268_fix_validated=true  final_report_processing_status=controlled_200_noop_unmapped_clean_test_number  full_lead_processing_claimed=false  clean_test_number_still_unmapped=true  technical_voice_path_status=validated_end_to_end_to_backend_200  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  sanitized_evidence_captured=true  evidence_not_invented=true  next_step=first_roofer_test_wiring  next_step_substeps_documented=true  first_roofer_live_test_approval_created=false  first_roofer_live_test_approved=false  no_call_placed_by_agent=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  stop_condition_triggered=false  call_placed_by_agent=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  evidence_invented=false  repo_unchanged=true"
