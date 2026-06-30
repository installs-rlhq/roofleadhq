#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 258 — Twilio Voice Routing → Retell SIP Trunk Confirmed (repo-only, read-only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 257 + Build 256 + Build 255 + Build 254 + Build 253 + Build 231 verifiers + Vapi smoke regression."
echo "Repo-only read-only evidence capture. No fix. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No live HTTP. No Supabase write. No SMS. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Captures the sanitized read-only Twilio Console evidence Jason gathered after Build 257: the dialed number's Voice and emergency calling config shows incoming-call handling = Sip Trunk named 'Retell Trunk' (a TK-prefixed trunk SID, value redacted). This confirms inbound PSTN voice routes to Retell, NOT Vapi, and explains why the single Build 256 true PSTN dial surfaced as a 'NEW RETELL CALL — RoofLeadHQ' notification with no Vapi call record. The Messaging tab showed separate messaging webhook/service details (not the voice-routing cause). vapi_pstn_validation_result=blocked_by_twilio_voice_routing_to_retell. Build 256 approval consumed; no retry, no new call, no config change without a new separate approval. Safest next step = repo-only remediation plan to move the Twilio voice route from Retell to Vapi (no config change until separately approved). Build 258 performs NO fix and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js
echo "PASS: Build 258 script syntax check succeeded."

echo ""
echo "== Build 258 read-only static verifier (non-mutating; no live HTTP; no fix; no config change; no runtime/external action) =="
node backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js

echo ""
echo "== Regression: Build 257 Twilio/Retell/Vapi number-routing repo-only read-only diagnosis verifier =="
node backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js

echo ""
echo "== Regression: Build 256 Vapi true PSTN dial unexpected-Retell-path stop-condition evidence read-only verifier =="
node backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js

echo ""
echo "== Regression: Build 255 Vapi true PSTN validation dial approval-capture & fresh guard read-only verifier =="
node backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js

echo ""
echo "== Regression: Build 254 Vapi PSTN validation method-clarification read-only verifier =="
node backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js

echo ""
echo "== Regression: Build 253 Vapi PSTN call-path setup read-only-diagnosis verifier =="
node backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js

echo ""
echo "== Regression: Build 231 call-path inspection (Twilio voice = Retell Trunk routing evidence) read-only verifier =="
node backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 258 Twilio voice-routing-confirmed evidence dry-run passed."
echo "build_mode=twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture  runtime_action_performed_by_build_258=false  fix_or_config_change_performed_by_build_258=false  build_257_prerequisite_commit=915855a  build_257_prerequisite_status=validated  build_256_prerequisite_commit=1f9dd92  true_pstn_dial_performed=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  stop_condition_triggered=true  twilio_number_found=true  voice_configuration_visible=true  voice_configuration_type=sip_trunk  voice_sip_trunk_name=Retell_Trunk  voice_sip_trunk_value_redacted=true  voice_sip_trunk_value_format=TK_prefixed_trunk_identifier  voice_points_to_retell=true  voice_points_to_vapi=false  retell_route_confirmed=true  explanation_links_retell_notification_to_twilio_voice_routing=true  explanation_links_no_vapi_call_record_to_twilio_voice_routing=true  messaging_config_separate_from_voice_routing=true  messaging_config_is_voice_routing_cause=false  vapi_pstn_validation_result=blocked_by_twilio_voice_routing_to_retell  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  safest_next_step=repo_only_remediation_plan_to_move_twilio_voice_route_from_retell_to_vapi_no_config_change_without_new_approval  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
