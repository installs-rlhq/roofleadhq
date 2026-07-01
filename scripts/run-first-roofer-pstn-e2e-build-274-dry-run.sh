#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 274 — First Roofer PSTN E2E: One Approved Call, Backend 200, Persistence Not Observed (repo-only) Dry-Run =="
echo "Mode: local-only, read-only. Repo-evidence verifier + Build 273/272/271/270/269/268 clean-Vapi regression + Vapi phone-lead smoke."
echo "Build 273 staged exactly one controlled PSTN first-roofer E2E test for a SEPARATE single-call approval. That approval was granted for one call only. Jason placed exactly one true PSTN call to the clean Vapi-managed Test Number (last-4 0389), mapped to the single roofer row Launch Test Roofing 1780434363 and answered by the Test Roofing Assistant. The Vapi call record and EOCR were visible; the EOCR reached the backend and the webhook returned HTTP 200. However, Supabase lead / booking / call records do NOT appear to have been created (persistence NOT observed)."
echo "Determination: INCONCLUSIVE — backend 200 but lead/booking/call persistence not proven and appears not observed. This is NOT a full pass. A 200 alone cannot distinguish the Build 268 controlled no-op from Build 271's mapped-persist path, so 200 without visible records is inconclusive."
echo "This build is repo-only closeout evidence. This build (the agent) placed no call, requested no retry, and requested no second call. No production connection. No Supabase/Vapi/Twilio/Retell call. No SMS. No homeowner contact. No real roofer contact. No Twilio/Retell/Vapi/Railway config change. No env var change. No schema/auth/RLS change. No backend deploy/redeploy/restart. No production data export. No secret read or printed. Full clean Vapi number never written (last-4 0389 only); no full UUID/call-id/email written. Existing Twilio -> Retell route untouched."
echo "Next step = diagnose why the backend returned 200 without a visibly persisted lead/booking/call for the mapped roofer, WITHOUT another call unless separately approved. first_roofer_pstn_e2e_execution_status=completed_one_call; true_pstn_call_count=1; retry_count=0; eocr_to_backend_status=200; first_roofer_e2e_result=inconclusive_backend_200_persistence_not_observed."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-first-roofer-pstn-e2e-build-274-readonly.js
echo "PASS: Build 274 first-roofer-pstn-e2e verifier syntax check succeeded."

echo ""
echo "== Build 274 first-roofer-pstn-e2e read-only verifier (repo-evidence only; no prod/provider; no call; non-mutating) =="
node backend/scripts/verify-first-roofer-pstn-e2e-build-274-readonly.js

echo ""
echo "== Regression: Build 273 mapped-roofer-readiness verifier (staged this one-call approval) =="
node backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js

echo ""
echo "== Regression: Build 272 controlled-roofer-runtime-mapping verifier (blocker cleared by B273) =="
node backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "== Regression: Build 270 clean Vapi PSTN revalidation PASS read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 269 clean Vapi PSTN revalidation approval read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 274 first-roofer-pstn-e2e dry-run passed."
echo "build_mode=first_roofer_pstn_e2e_closeout_evidence_repo_only  call_performed_by_build_274=false  first_roofer_pstn_e2e_execution_status=completed_one_call  true_pstn_call_count=1  retry_count=0  clean_vapi_number_last4=0389  assistant_used=Test Roofing Assistant  mapped_roofer_identifier=Launch Test Roofing 1780434363  call_completion_status=observed_via_vapi_record_and_eocr  assistant_answered_status=observed_test_roofing_assistant_used  eocr_to_backend_status=200  mapped_roofer_path_status=attempted_backend_200  mapped_roofer_count=1  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  lead_persistence_status=inconclusive_or_not_observed  booking_persistence_status=inconclusive_or_not_observed  call_persistence_status=inconclusive_or_not_observed  first_roofer_e2e_result=inconclusive_backend_200_persistence_not_observed  first_roofer_e2e_full_pass_claimed=false  second_call_placed=false  second_call_requested=false  existing_twilio_retell_route_status=preserved_untouched  build_273_prerequisite_commit=0cfa8cf  build_272_prerequisite_commit=0930813  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_retry=true  no_second_call=true  no_sms_sent=true  no_homeowner_contact=true  no_real_roofer_contact=true  no_config_deploy_schema_changes=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_env_var_changed=true  no_production_data_export=true  no_secret_printing=true  full_clean_vapi_number_recorded_in_repo=false  roofer_row_written=false  production_connected=false  secret_file_read=false  repo_unchanged=true  next_step=diagnose_backend_200_without_visible_persistence_for_mapped_roofer_no_new_call_unless_separately_approved"
