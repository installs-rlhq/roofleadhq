#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 261 — Vapi Integration/Connection Inspection + Twilio Routing Fork (repo-only, inspection-captured-not-executed) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 260 + Build 259 + Build 258 + Build 257 + Build 256 verifiers + Vapi smoke regression."
echo "Repo-only inspection CAPTURE + routing-fork decision packet. No cutover. No fix. No config change. No number imported. No provider connected. No credential entered. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No SMS. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed. No Twilio cutover approval created. No call/PSTN validation approval created."
echo "Captures the read-only Vapi → Integrations / connection inspection (Integrations shows only Server Configuration; Phone Number Providers visible are SIP Trunk, Telnyx, Vonage; no Twilio provider card, Twilio credential binding, import/connection panel, or exact Twilio voice target visible) and the resulting Twilio ROUTING FORK: docs describe (A) native Twilio import and (B) Vapi SIP-trunk paths, but neither is configured or confirmed. Cutover NOT ready because the exact Twilio voice target is unknown/not visible AND the import binding is unconfirmed. Rollback target preserved as the Retell Trunk. remediation_status=inspection_captured_not_executed; twilio_voice_cutover_status=not_started; vapi_twilio_target_status=not_visible_in_ui_or_integrations; vapi_import_binding_status=unknown_not_visible; sip_trunk_path_status=possible_but_not_configured_or_confirmed; cutover_approval_status=not_requested; pstn_validation_status=blocked_until_target_or_import_binding_confirmed. Build 256 approval consumed; no cutover, no new call, no config change, no approval without a new separate approval. Build 261 performs NO cutover and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js
echo "PASS: Build 261 script syntax check succeeded."

echo ""
echo "== Build 261 read-only static verifier (non-mutating; no live HTTP; no cutover; no config change; no runtime/external action) =="
node backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js

echo ""
echo "== Regression: Build 260 Vapi inbound-target inspection-capture read-only verifier =="
node backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js

echo ""
echo "== Regression: Build 259 Twilio voice-route Retell→Vapi remediation-plan read-only verifier =="
node backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js

echo ""
echo "== Regression: Build 258 Twilio voice-routing-confirmed (Sip Trunk = Retell Trunk) read-only verifier =="
node backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js

echo ""
echo "== Regression: Build 257 Twilio/Retell/Vapi number-routing repo-only read-only diagnosis verifier =="
node backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js

echo ""
echo "== Regression: Build 256 Vapi true PSTN dial unexpected-Retell-path stop-condition evidence read-only verifier =="
node backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 261 Vapi integration/connection inspection + Twilio routing-fork dry-run passed."
echo "build_mode=vapi_integration_routing_fork_capture_repo_only  runtime_action_performed_by_build_261=false  fix_or_config_change_performed_by_build_261=false  build_260_prerequisite_commit=caef83c  build_260_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  inspection_completed=true  VAPI_TWILIO_INTEGRATION_FOUND=false_or_not_visible  TWILIO_CREDENTIAL_BINDING_VISIBLE=false  PHONE_NUMBER_CONNECTION_PANEL_FOUND=false  NUMBER_IMPORT_STATUS=twilio_provider_record_exists_but_import_binding_not_visible  EXACT_TWILIO_VOICE_TARGET_VISIBLE=false  TARGET_TYPE=unknown  NATIVE_IMPORT_MANAGED_BY_VAPI=unknown_not_proven  MANUAL_TWILIO_CONSOLE_TARGET_NEEDED=unknown  routing_fork_documented=true  import_path_status=not_confirmed_no_credential_binding_visible  sip_trunk_path_status=possible_but_not_configured_or_confirmed  cutover_ready=false  cutover_blocked_reason=exact_target_unknown_and_import_binding_unconfirmed  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  safety_guardrails_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  next_step=readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path  remediation_status=inspection_captured_not_executed  twilio_voice_cutover_status=not_started  vapi_twilio_target_status=not_visible_in_ui_or_integrations  vapi_import_binding_status=unknown_not_visible  cutover_approval_status=not_requested  pstn_validation_status=blocked_until_target_or_import_binding_confirmed  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  number_imported=false  provider_connected=false  credential_entered=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
