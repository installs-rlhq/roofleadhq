#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 262 — Clean Vapi-Managed Test-Number Path (repo-only strategic decision, planned-not-executed) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 262 API-lookup-401 sibling + Build 261 + Build 260 + Build 258 verifiers + Vapi smoke regression."
echo "Repo-only STRATEGIC DECISION + readiness packet. No provisioning. No cutover. No fix. No config change. No number bought/imported. No provider connected. No credential entered. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No DNS change. No live HTTP. No Supabase write. No SMS. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed. No Twilio cutover approval created. No clean-Vapi-number provisioning approval created. No call/PSTN validation approval created."
echo "Captures the strategic decision to ROUTE AROUND the stuck Twilio/Retell number-import problem by preparing a clean Vapi-managed (or cleanly provisioned) test number assigned to the Test Roofing Assistant, leaving the existing Twilio -> Retell route untouched as rollback. The existing-number Twilio cutover stays blocked_pending_vapi_support_or_target; the Vapi API metadata lookup stays blocked_by_401. Names (does NOT grant) the next useful approval: a narrow approval to provision/use a clean Vapi-managed test number only, not to touch the existing Twilio/Retell number. Documents (does NOT execute) the future validation sequence: provision/select clean Vapi number -> assign Test Roofing Assistant -> confirm webhook/server messages -> one controlled true PSTN call from a Jason-owned phone -> verify Vapi Type=Phone/PSTN call record -> verify end-of-call-report -> verify backend /webhooks/vapi/call-completed processes the final report -> capture sanitized evidence. Documents explicit stop/rollback conditions and the forward decision tree (success -> continue Vapi for live roofer testing; failure -> pivot to Retell and adapt backend/webhook mapping; Vapi-support target -> usable but no longer blocks live testing). current_twilio_retell_route_status=preserved_untouched; twilio_voice_cutover_status=blocked_pending_vapi_support_or_target; vapi_api_metadata_lookup_status=blocked_by_401; clean_vapi_number_path_status=preferred_next_path_planned_not_executed; clean_vapi_number_approval_status=not_requested; pstn_validation_status=not_approved. Build 256 approval consumed; no provisioning, no cutover, no new call, no config change without a new separate approval. Build 262 performs NO provisioning and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js
echo "PASS: Build 262 clean-Vapi-number-path script syntax check succeeded."

echo ""
echo "== Build 262 clean-Vapi-number-path read-only static verifier (non-mutating; no live HTTP; no provisioning; no cutover; no config change; no runtime/external action) =="
node backend/scripts/verify-clean-vapi-number-path-build-262-readonly.js

echo ""
echo "== Regression: Build 262 Vapi API metadata-lookup-401 evidence read-only verifier (sibling) =="
node backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js

echo ""
echo "== Regression: Build 261 Vapi integration/connection inspection + Twilio routing-fork read-only verifier =="
node backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js

echo ""
echo "== Regression: Build 260 Vapi inbound-target inspection-capture read-only verifier =="
node backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js

echo ""
echo "== Regression: Build 258 Twilio voice-routing-confirmed (Sip Trunk = Retell Trunk) read-only verifier =="
node backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 262 clean Vapi-managed test-number path strategic-decision dry-run passed."
echo "build_mode=clean_vapi_number_path_strategic_decision_repo_only  runtime_action_performed_by_build_262=false  fix_or_config_change_performed_by_build_262=false  build_261_prerequisite_commit=575668a  build_261_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  problem_is_external_blocked=true  strategic_decision=route_around_blocker_via_clean_vapi_number  business_path_to_prove=inbound_pstn__vapi_assistant__end_of_call_report__backend_webhooks_vapi_call_completed  clean_number_is_additive_not_a_cutover=true  next_useful_approval=narrow_clean_vapi_managed_test_number_provision_and_use_only  future_validation_sequence_documented=true  future_validation_sequence_executed=false  stop_conditions_documented=true  existing_twilio_retell_number_untouched_invariant=true  decision_tree_documented=true  safety_guardrails_documented=true  explicit_recommendation_documented=true  next_step=request_narrow_clean_vapi_managed_test_number_approval_then_execute_pstn_to_backend_validation  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  current_twilio_retell_route_status=preserved_untouched  twilio_voice_cutover_status=blocked_pending_vapi_support_or_target  vapi_api_metadata_lookup_status=blocked_by_401  clean_vapi_number_path_status=preferred_next_path_planned_not_executed  clean_vapi_number_approval_status=not_requested  pstn_validation_status=not_approved  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_number_provisioned=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_no_provision_without_new_separate_approval  call_placed=false  phone_dialed=false  number_provisioned=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  number_imported=false  provider_connected=false  credential_entered=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  dns_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
