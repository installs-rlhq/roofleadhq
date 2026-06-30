#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 263 — Clean Vapi-Managed Test-Number Approval + Provisioning Readiness (repo-only, awaiting human UI action) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 262 clean-number-path + Build 262 API-lookup-401 + Build 261 verifiers + Vapi smoke regression."
echo "Repo-only APPROVAL + provisioning-readiness packet. No provisioning executed. No call. No SMS. No Twilio config change. No Retell config change. No backend/Railway deploy. No use or change of the existing Twilio/Retell number. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No secret file read. No runtime/external action."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed. No PSTN validation approval created."
echo "Captures Jason's narrow approval to provision/select ONE clean Vapi-managed (or cleanly provisioned) test number and assign it to the Test Roofing Assistant, records the exact allowed/not-allowed scope, preserves the existing Twilio -> Retell number untouched as rollback, and provides the exact manual Vapi dashboard checklist (Vapi -> Phone Numbers -> create/select clean number -> assign Test Roofing Assistant -> confirm provider/status, webhook/server URL pointed at the RoofLeadHQ backend path, end-of-call-report/server messages enabled -> save only the clean test-number assignment) plus the sanitized evidence template Jason reports back (CLEAN_VAPI_NUMBER_RECORD_FOUND / PROVIDER / STATUS / ASSIGNED_ASSISTANT=Test Roofing Assistant / WEBHOOK_SERVER_URL_CONFIGURED / WEBHOOK_AUTH_CONFIGURED / END_OF_CALL_REPORT_ENABLED / EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED / NO_CALL_PLACED / NO_SMS_SENT / NO_TWILIO_CONFIG_CHANGED / NO_RETELL_CONFIG_CHANGED / NO_BACKEND_DEPLOY). Provisioning is a human Vapi UI action because the Vapi API is blocked_by_401 and no other approved route exists, so it is marked awaiting_human_ui_action. clean_vapi_number_path_approval_status=captured; clean_vapi_number_provisioning_status=awaiting_human_ui_action; existing_twilio_retell_route_status=preserved_untouched; pstn_validation_status=not_approved. No PSTN call/validation approved. Build 263 performs NO provisioning and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js
echo "PASS: Build 263 clean-Vapi-number-approval script syntax check succeeded."

echo ""
echo "== Build 263 clean-Vapi-number-approval read-only static verifier (non-mutating; no live HTTP; no provisioning; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-number-approval-build-263-readonly.js

echo ""
echo "== Regression: Build 262 clean Vapi-managed test-number path strategic-decision read-only verifier =="
node backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js

echo ""
echo "== Regression: Build 262 Vapi API metadata-lookup-401 evidence read-only verifier =="
node backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js

echo ""
echo "== Regression: Build 261 Vapi integration/connection inspection + Twilio routing-fork read-only verifier =="
node backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 263 clean Vapi-managed test-number approval + provisioning-readiness dry-run passed."
echo "build_mode=clean_vapi_number_path_approval_capture_repo_only  runtime_action_performed_by_build_263=false  fix_or_config_change_performed_by_build_263=false  build_262_prerequisite_commit=176be0f  build_262_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_captured_verbatim=true  allowed_not_allowed_scope_documented=true  provisioning_requires_human_ui_action=true  provisioning_automation_blocked_reason=vapi_api_blocked_by_401_and_no_other_approved_route  manual_vapi_dashboard_checklist_documented=true  sanitized_evidence_template_documented=true  provisioning_evidence_captured_in_this_build=false  stop_conditions_documented=true  decision_logic_documented=true  next_step=jason_completes_vapi_ui_provisioning_then_request_separate_pstn_validation_approval  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  clean_vapi_number_path_approval_status=captured  clean_vapi_number_provisioning_status=awaiting_human_ui_action  existing_twilio_retell_route_status=preserved_untouched  EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true  pstn_validation_status=not_approved  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  no_retry_without_new_approval=true  stop_rule_in_force=no_call_no_sms_no_twilio_no_retell_no_deploy_no_pstn_validation_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
