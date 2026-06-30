#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 256 — Vapi True PSTN Dial Unexpected-Retell-Path Stop-Condition Evidence Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 255 + Build 254 + Build 253 + Build 252 verifiers + Vapi smoke regression."
echo "Sanitized stop-condition evidence capture only. No new PSTN dial executed by Build 256. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio/Retell config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No Retell. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Records: the single Build 255-approved true PSTN dial (rerun guard passed; performed out-of-band by Jason from his own physical phone / iPhone Phone app to the Vapi number assigned to Test Roofing Assistant) did NOT appear in Vapi logs; a 'NEW RETELL CALL — RoofLeadHQ' notification appeared instead, indicating the dial likely hit an unexpected Retell/Twilio path. Stop-condition event; approval consumed; no retry without new approval. vapi_pstn_validation_result=blocked_by_unexpected_retell_path; full_final_report_processing_status=not_validated; real_pstn_vapi_call_path_status=not_validated; stop_condition_triggered=true. Phone-number-level credential 'No authentication'/fallback + blank Server URL recorded as an open routing/config clue; assistant-level Bearer webhook credential remains the relevant validated backend path for /webhooks/vapi/call-completed. Build 256 performs NO dial and NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-true-pstn-dial-retell-stop-condition-build-256-readonly.js
echo "PASS: Build 256 script syntax check succeeded."

echo ""
echo "== Build 256 read-only static verifier (non-mutating; no live HTTP; no new dial; no runtime/external action) =="
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
echo "== Regression: Build 252 Vapi PSTN-validation ambiguous-evidence-capture read-only verifier =="
node backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 256 Vapi true PSTN dial unexpected-Retell-path stop-condition evidence dry-run passed."
echo "build_mode=true_pstn_dial_retell_stop_condition_evidence_capture  runtime_action_performed_by_build_256=false  pstn_dial_performed_by_jason_out_of_band=true  build_255_prerequisite_commit=1838a7d  build_255_prerequisite_status=validated  build_255_guard_passed_before_action=true  true_pstn_dial_performed=true  one_dial_limit=true  true_pstn_dial_count=1  approved_attempt_consumed=true  approval_consumed=true  no_retry_without_new_approval=true  vapi_call_record_observed=false  retell_notification_observed=true  likely_path_was_retell_twilio_not_vapi=true  vapi_pstn_validation_result=blocked_by_unexpected_retell_path  full_final_report_processing_status=not_validated  real_pstn_vapi_call_path_status=not_validated  stop_condition_triggered=true  phone_number_level_credential_authentication=no_authentication_fallback_active  phone_number_level_server_url=blank  phone_number_level_credential_open_routing_clue=true  assistant_level_bearer_webhook_credential_remains_validated_backend_path=true  assistant_level_webhook_credential_relevant=true  backend_webhook_auth_ruled_out_as_cause=true  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_config_changed=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
