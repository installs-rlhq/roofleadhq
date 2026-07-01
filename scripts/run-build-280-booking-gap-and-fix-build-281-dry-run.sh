#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 281 — Build 280 Booking-Persistence Gap + Structured-Outputs Fix (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Captures the sanitized backend-side response evidence from the SAME already-completed Build 280 controlled PSTN call (HTTP 200, ok:true, inserted:true, duplicate:false; call_id/provider_call_id/matched_lead_id/roofer_id present; mapped destination last-4 0389; booking_id=null; normalized.appointment_booked=false, appointment_requested=false, appointment_time=null; transcript indicated a Thursday 2 PM visit). Lead + call + mapped roofer PASSED; booking FAILED."
echo "Diagnosis: the assistant emits appointment fields via Vapi Structured Outputs (message.analysis.structuredOutputs), a container the pre-Build-281 normalizer never read (it read only structuredData). Build 281 adds a shape-tolerant structuredOutputs reader appended AFTER the existing structuredData candidates (legacy behavior preserved)."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. LIVE-SHAPE = structuredOutputs payload -> lead+call persist AND booking created (fix proof). SHAPE TOLERANCE = array + keyed-by-name variants. REGRESSION A = verbal EOCR with NO structured fields -> booking_id=null (no transcript parsing). REGRESSION B = legacy structuredData -> booking created. Plus evidence-doc grounding, non-overclaim, and no-secret/PII scans."
echo "This build performs NO Vapi config, NO provider action, NO call, NO additional call, NO retry, NO SMS, NO deploy, NO config/schema/RLS change, NO phone number change, NO production data export, NO secret read. Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-280-booking-gap-and-fix-build-281-readonly.js
echo "PASS: Build 281 booking-gap-and-fix verifier syntax check succeeded."

echo ""
echo "== Build 281 booking-gap-and-fix read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-build-280-booking-gap-and-fix-build-281-readonly.js

echo ""
echo "== Regression: Build 280 controlled-pstn-retest-outcome verifier (offline booking proof + absence proof) =="
node backend/scripts/verify-controlled-pstn-retest-outcome-build-280-readonly.js

echo ""
echo "== Regression: Build 279 structured-appointment-config-evidence verifier (offline booking proof + approval presence) =="
node backend/scripts/verify-structured-appointment-config-evidence-build-279-readonly.js

echo ""
echo "PASS: Build 281 booking-gap-and-fix dry-run passed."
echo "build_mode=build_280_booking_gap_and_structured_outputs_fix_repo_only  build_281_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_279_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_pstn_retest_execution_status=already_completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=failed_or_fixed_by_offline_replay  first_roofer_e2e_status=partial_pass_booking_gap_or_offline_fix_ready  live_call_booking_id_status=null_in_build_280_response  actual_gap=backend_structured_appointment_ingestion_or_payload_path_mismatch  structured_outputs_offline_fix_status=passed  opt2_code_fallback_status=deferred_unless_structured_output_unavailable  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_inspects_persisted_raw_payload_of_the_build_280_call_row_out_of_band_to_confirm_structuredoutputs_shape_then_deploy_the_build_281_normalizer_fix_no_new_call"