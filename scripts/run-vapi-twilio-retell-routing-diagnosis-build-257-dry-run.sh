#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 257 — Twilio / Retell / Vapi Number-Routing Diagnosis (repo-only, read-only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 256 + Build 255 + Build 254 + Build 253 + Build 231 verifiers + Vapi smoke regression."
echo "Repo-only read-only diagnosis. No fix. No config change. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No Twilio CLI/API. No Retell API. No live HTTP. No Supabase write. No SMS. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Diagnoses why the single Build 256-approved true PSTN dial surfaced as a 'NEW RETELL CALL — RoofLeadHQ' and never appeared in Vapi logs: expected chain = carrier -> number assigned to Test Roofing Assistant -> Vapi answers -> end-of-call-report -> assistant-level Bearer POST /webhooks/vapi/call-completed; actual chain diverged at the carrier/Twilio voice-routing leg (call answered by Retell, never reached Vapi). Prior evidence: Build 231 found the Twilio number's VOICE config points at a Retell Trunk. Vapi UI assignment alone does NOT prove carrier routing points to Vapi. Phone-number-level blank Server URL + fallback/no-auth credential are webhook-leg clues (already cleared by Build 253 as non-blockers), NOT the inbound-routing cause. Assistant-level Bearer webhook path validated but received nothing for this dial. likely_cause_primary=inbound_voice_routing_still_retell_twilio_trunk_not_vapi. Safest next step = read-only dashboard inspection of Twilio/Retell/Vapi ownership/routing before any new approval. Build 256 approval consumed; no retry, no new call, no config change without a new separate approval. Build 257 performs NO fix and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-twilio-retell-routing-diagnosis-build-257-readonly.js
echo "PASS: Build 257 script syntax check succeeded."

echo ""
echo "== Build 257 read-only static verifier (non-mutating; no live HTTP; no fix; no config change; no runtime/external action) =="
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
echo "PASS: Build 257 Twilio/Retell/Vapi number-routing diagnosis dry-run passed."
echo "build_mode=twilio_retell_vapi_number_routing_diagnosis_repo_only_readonly  runtime_action_performed_by_build_257=false  fix_or_config_change_performed_by_build_257=false  build_256_prerequisite_commit=1f9dd92  build_256_prerequisite_status=validated  true_pstn_dial_performed=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  vapi_pstn_validation_result=blocked_by_unexpected_retell_path  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  stop_condition_triggered=true  expected_vapi_path_documented=true  actual_path_documented=true  prior_evidence_twilio_voice_retell_trunk_documented=true  prior_evidence_source=build_231_call_path_inspection  vapi_ui_assignment_alone_proves_carrier_routing=false  phone_level_blank_server_url_relevant_to_inbound_call_routing=false  phone_level_no_auth_fallback_relevant_to_inbound_call_routing=false  phone_level_credential_likely_not_direct_cause_while_server_url_blank=true  assistant_level_bearer_webhook_path_validated=true  assistant_level_bearer_webhook_received_this_pstn_dial=false  likely_cause_primary=inbound_voice_routing_still_retell_twilio_trunk_not_vapi  likely_cause_secondary=number_ownership_or_routing_mismatch  likely_cause_tertiary_less_likely=vapi_phone_number_level_settings_webhook_leg_only  backend_webhook_auth_ruled_out_as_cause=true  likely_cause_unknown_without_readonly_inspection=true  safest_next_step=readonly_dashboard_inspection_of_twilio_retell_vapi_ownership_and_routing_before_any_new_approval  stop_rule_in_force=no_retry_no_new_call_no_config_change_without_new_separate_approval  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
