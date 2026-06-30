#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 264 — Clean Vapi-Managed Test-Number Provisioning/Assignment Evidence Captured + Next PSTN Validation Prep (repo-only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 263 approval + Build 262 clean-number-path + Build 261 verifiers + Vapi smoke regression."
echo "Repo-only EVIDENCE packet. No provisioning executed. No call. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No use or change of the existing Twilio/Retell number. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed. No PSTN validation approval created. No PSTN validation call executed."
echo "Captures the sanitized evidence (reported by Jason from the Vapi UI) that the clean Vapi-managed Test Number is created/saved/visible (provider=Vapi) and assigned to the Test Roofing Assistant, with the existing Twilio->Retell number untouched as rollback. Records the nuance that the assistant-level backend webhook + end-of-call-report config was previously confirmed on the Test Roofing Assistant, while the phone-number-level custom Server URL field on the clean number screen appears empty/placeholder/not visibly configured (so it is NOT overclaimed). Captures the sanitized evidence values (CLEAN_VAPI_NUMBER_RECORD_FOUND=true / PROVIDER=Vapi / STATUS=created_saved_visible / ASSIGNED_ASSISTANT=Test Roofing Assistant / WEBHOOK_SERVER_URL_CONFIGURED=assistant_level_previously_confirmed_phone_number_custom_server_url_not_visible_or_empty / WEBHOOK_AUTH_CONFIGURED=true / END_OF_CALL_REPORT_ENABLED=previously_confirmed... / EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true / NO_CALL_PLACED / NO_SMS_SENT / NO_TWILIO_CONFIG_CHANGED / NO_RETELL_CONFIG_CHANGED / NO_BACKEND_DEPLOY=true). Prepares — but does NOT execute — the next narrow single-call PSTN validation approval path (one call only, Jason-owned phone only, clean Vapi-managed Test Number only, no existing Twilio/Retell number, no SMS, no Twilio/Retell changes; stop if not Phone/PSTN, no end-of-call-report, or backend non-2xx) plus the expected (templated-empty) validation evidence fields. clean_vapi_number_provisioning_status=completed_sanitized_evidence_captured; clean_vapi_number_assistant_assignment=Test Roofing Assistant; assistant_level_webhook_eocr_status=previously_confirmed; phone_number_level_custom_server_url_status=not_visible_or_empty; existing_twilio_retell_route_status=preserved_untouched; pstn_validation_status=not_approved; next_step=separate_single_pstn_validation_approval. Build 264 performs NO provisioning, NO call, and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js
echo "PASS: Build 264 clean-Vapi-number-evidence script syntax check succeeded."

echo ""
echo "== Build 264 clean-Vapi-number-evidence read-only static verifier (non-mutating; no live HTTP; no provisioning; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-number-evidence-build-264-readonly.js

echo ""
echo "== Regression: Build 263 clean Vapi-managed test-number approval + provisioning-readiness read-only verifier =="
node backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js

echo ""
echo "== Regression: Build 262 clean Vapi-managed test-number path strategic-decision read-only verifier =="
node backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js

echo ""
echo "== Regression: Build 261 Vapi integration/connection inspection + Twilio routing-fork read-only verifier =="
node backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 264 clean Vapi-managed test-number provisioning/assignment evidence dry-run passed."
echo "build_mode=clean_vapi_number_evidence_capture_repo_only  runtime_action_performed_by_build_264=false  fix_or_config_change_performed_by_build_264=false  build_263_prerequisite_commit=846eb98  build_263_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  human_vapi_ui_evidence_captured=true  sanitized_evidence_captured=true  clean_vapi_number_provisioning_status=completed_sanitized_evidence_captured  clean_vapi_number_assistant_assignment=Test Roofing Assistant  assistant_level_webhook_eocr_status=previously_confirmed  phone_number_level_custom_server_url_status=not_visible_or_empty  do_not_overclaim_phone_number_level_server_url=true  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  pstn_validation_status=not_approved  pstn_validation_approval_created_in_this_build=false  pstn_validation_call_executed_in_this_build=false  pstn_validation_evidence_template_documented=true  stop_conditions_documented=true  decision_logic_documented=true  next_step=separate_single_pstn_validation_approval  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_without_new_approval=true  stop_rule_in_force=no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
