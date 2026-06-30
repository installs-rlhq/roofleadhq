#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 259 — Twilio Voice Route Retell→Vapi Remediation Plan (repo-only, planned-not-executed) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 258 + Build 257 + Build 256 + Build 255 + Build 254 + Build 253 + Build 231 verifiers + Vapi smoke regression."
echo "Repo-only remediation PLAN. No cutover. No fix. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No SMS. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed."
echo "Plans (only) how to safely move the dialed test number's Twilio inbound VOICE routing off the Build-258-confirmed Sip Trunk 'Retell Trunk' (TK-prefixed, redacted) onto Vapi / Test Roofing Assistant. Documents current routing, target routing, required read-only confirmations (Twilio Voice config, Retell ownership + rollback id, Vapi number/import/native + assistant assignment, Vapi inbound connection method TwiML App/webhook URL/SIP/import, required mechanism class), proposed change plan (NOT executed), rollback to the Retell Trunk, safety guardrails, post-cutover validation plan, stop conditions, and decision tree. remediation_status=planned_not_executed; twilio_voice_cutover_status=not_started; vapi_pstn_validation_status=blocked_until_cutover. Build 256 approval consumed; no cutover, no new call, no config change without a new separate approval. Build 259 performs NO cutover and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-twilio-retell-to-vapi-remediation-plan-build-259-readonly.js
echo "PASS: Build 259 script syntax check succeeded."

echo ""
echo "== Build 259 read-only static verifier (non-mutating; no live HTTP; no cutover; no config change; no runtime/external action) =="
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
echo "PASS: Build 259 Twilio voice-route Retell→Vapi remediation-plan dry-run passed."
echo "build_mode=twilio_retell_to_vapi_voice_route_remediation_plan_repo_only  runtime_action_performed_by_build_259=false  fix_or_config_change_performed_by_build_259=false  build_258_prerequisite_commit=c8a8adb  build_258_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  current_routing_confirmed=true  current_voice_route=twilio_sip_trunk_retell_trunk  target_routing_documented=true  target_voice_route=inbound_pstn_to_vapi_test_roofing_assistant  readonly_confirmations_documented=true  change_plan_twilio_voice_fields_documented=true  change_plan_vapi_target_documented=true  rollback_path_documented=true  rollback_target=twilio_sip_trunk_retell_trunk  safety_guardrails_documented=true  validation_plan_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  remediation_status=planned_not_executed  twilio_voice_cutover_status=not_started  vapi_pstn_validation_status=blocked_until_cutover  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
