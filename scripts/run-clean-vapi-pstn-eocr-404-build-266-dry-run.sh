#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 266 — Clean Vapi-Managed Test-Number One-Call True PSTN Validation Evidence + Terminal End-Of-Call-Report 404 Diagnosis (repo-only, read-only diagnosis) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 265 approval + Build 264 evidence verifiers + Vapi phone-lead smoke regression."
echo "Repo-only EVIDENCE + read-only DIAGNOSIS packet. No call placed by the agent. Exactly one human physical-phone PSTN call already occurred (Jason, approved in Build 265); no retry. No call to the existing Twilio/Retell number. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy/redeploy/restart. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No invented evidence. Read-only repo inspection only. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Captures the sanitized evidence from the single controlled true PSTN call to the clean Vapi-managed Test Number: major pass (true PSTN reached the clean number, Test Roofing Assistant associated, Vapi inbound call record present, Vapi webhook stream present, non-terminal webhook events returned 200, End Of Call Report observed and POSTed to https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed); and the one blocker (terminal End Of Call Report POST returned HTTP 404 with body {} in 1.09s). Does NOT overclaim backend processing: final-report processing is recorded as blocked_by_backend_404. Diagnoses via read-only repo inspection that the route IS registered at repo HEAD (index.ts mounts /webhooks/vapi + vapi-webhooks.ts registers POST /call-completed) and that the route's only application 404 (unknown_roofer) returns a POPULATED body — so the observed empty-{} 404 is NOT producible by the app route and, combined with earlier builds seeing 401/400 at the same URL, indicates a production runtime/routing/deploy mismatch, NOT a Vapi delivery failure. Creates no approval for another call and no approval for a deploy/config change (redeploy is a future-decision template only). pstn_validation_execution_status=completed_sanitized_evidence_captured; final_report_processing_status=blocked_by_backend_404; existing_twilio_retell_route_status=preserved_untouched. Build 266 performs NO call and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js
echo "PASS: Build 266 clean-Vapi-PSTN-EOCR-404 script syntax check succeeded."

echo ""
echo "== Build 266 clean-Vapi-PSTN-EOCR-404 evidence + diagnosis read-only static verifier (non-mutating; no live HTTP; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js

echo ""
echo "== Regression: Build 265 clean Vapi-managed test-number single controlled true PSTN validation call approval read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-validation-approval-build-265-readonly.js

echo ""
echo "== Regression: Build 264 clean Vapi-managed test-number provisioning/assignment evidence read-only verifier =="
node backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 266 clean Vapi-managed test-number one-call true PSTN validation evidence + terminal EOCR 404 diagnosis dry-run passed."
echo "build_mode=clean_vapi_pstn_eocr_404_evidence_and_diagnosis_repo_only  runtime_action_performed_by_build_266=false  fix_or_config_change_performed_by_build_266=false  build_265_prerequisite_commit=1f27d35  build_265_prerequisite_status=validated  pstn_validation_execution_status=completed_sanitized_evidence_captured  pstn_to_clean_vapi_status=passed  vapi_inbound_call_record_status=passed  vapi_nonterminal_webhook_status=passed_200  vapi_eocr_delivery_status=observed_posted_to_expected_path  backend_eocr_response_status=404  eocr_response_body_shape=empty_json_object  final_report_processing_status=blocked_by_backend_404  stop_condition_triggered=true_backend_eocr_404  repo_route_registered_at_head=true  repo_app_404_body_shape=populated_unknown_roofer_not_empty_object  observed_404_body_shape=empty_json_object  diagnosis=production_runtime_routing_deploy_mismatch_not_vapi_delivery_failure  vapi_delivery_status=succeeded_got_http_response_1.09s  existing_twilio_retell_route_status=preserved_untouched  next_step=read_only_production_route_deployment_diagnosis_before_any_deploy_or_config_approval  no_new_call_approved=true  no_deploy_or_config_approved=true  no_call_placed_by_agent=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  evidence_invented=false  repo_unchanged=true"
