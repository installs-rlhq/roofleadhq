#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 262 — Vapi API Phone-Number Metadata Lookup (EXECUTED option A, returned 401 Invalid Key) Dry-Run =="
echo "Mode: local-only / OFFLINE. Read-only static verifier + Build 261 + Build 260 + Build 258 + Build 256 verifiers + Vapi smoke regression."
echo "This dry-run is OFFLINE: it issues NO live Vapi API call, NO curl, and NO live HTTP. The single read-only GET was performed ONCE during Build 262 itself (returned HTTP 401 Invalid Key) under a now-consumed, separately-approved scope; it is NOT re-issued here."
echo "Repo-only evidence packet for the EXECUTED option-A lookup. No second API attempt. No cutover. No fix. No config change. No number imported. No provider connected. No credential entered. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No live RoofLeadHQ webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No DNS change. No Supabase write. No SMS. No secret value read/printed/committed. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No Retell deletion. No number released. No secrets printed. No secret committed. No Twilio cutover approval created. No call/PSTN validation approval created."
echo "Result captured: one read-only GET https://api.vapi.ai/phone-number returned HTTP 401 Unauthorized ('Invalid Key. Hot tip, you may be using the private key instead of the public key, or vice versa.') => no metadata obtained; import binding / exact Twilio voice target remain unresolved. Per the Build 261 decision tree's 401 branch: STOP API lookup attempts; a fresh Private API key from the correct workspace (or Vapi support, or an explicit SIP-trunk path) is required. Cutover remains NOT ready. Rollback target preserved as the Retell Trunk. Build 256 PSTN-dial approval consumed; the Build 262 one-GET approval consumed; no cutover, no new call, no config change, no further API attempt without a new separate approval."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js
echo "PASS: Build 262 script syntax check succeeded."

echo ""
echo "== Build 262 read-only static verifier (non-mutating; OFFLINE; no live HTTP; no cutover; no config change; no second API attempt) =="
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
echo "== Regression: Build 256 Vapi true PSTN dial unexpected-Retell-path stop-condition evidence read-only verifier =="
node backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 262 Vapi API metadata-lookup-401 evidence dry-run passed."
echo "build_mode=vapi_api_metadata_lookup_executed_401_repo_only_evidence  read_only_api_lookup_executed=true  lookup_http_method=GET  lookup_http_status=401  lookup_result=invalid_key_unauthorized  metadata_obtained=false  lookup_attempts=1  runtime_action_performed_by_build_262=read_only_get_only  fix_or_config_change_performed_by_build_262=false  build_261_prerequisite_commit=575668a  build_261_prerequisite_status=validated  build_258_confirmed_twilio_voice_routes_to_retell_trunk=true  approval_scope=exactly_one_read_only_vapi_api_phone_number_metadata_get  approval_consumed=true  approval_consumed_outcome=executed_returned_401_invalid_key_no_metadata_obtained  key_type_mismatch_suspected=true  wrong_workspace_suspected=true  import_binding_resolved=false  exact_twilio_voice_target_resolved=false  decision_branch_applied=401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path  cutover_ready=false  cutover_blocked_reason=exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized  rollback_target=twilio_sip_trunk_retell_trunk  ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED=true  safety_guardrails_documented=true  stop_conditions_documented=true  decision_tree_documented=true  explicit_recommendation_documented=true  next_step=obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval  twilio_voice_cutover_status=not_started  vapi_twilio_target_status=not_visible_api_lookup_unauthorized  vapi_import_binding_status=unknown_not_resolved  cutover_approval_status=not_requested  pstn_validation_status=blocked_until_target_or_import_binding_confirmed  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_retry_without_new_approval=true  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  secret_value_read=false  secret_value_printed=false  secret_value_committed=false  vapi_response_contained_secret=false  secret_file_read=false  repo_unchanged=true"
