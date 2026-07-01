#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 277 — Structured Appointment Fields Readiness after Build 276 (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Moves the first-roofer E2E frontier from Build 276's 'lead+call persisted, booking not created' to 'booking extraction ready for one controlled retest' — with NO backend code change and NO provider action. Preferred path is Option 1: configure the Test Roofing Assistant's structured-data schema to EMIT the appointment fields the backend already reads (analysis.structuredData.appointment_booked / appointment_time / appointment_requested)."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. CASE 1 = the Build 276 verbal EOCR with NO structured fields -> lead+call persist, booking_id=null (frontier reproduced). CASE 2 = the SAME verbal call now EMITTING structured appointment fields -> booking_id present, NO code change (the post-config offline proof). Plus static grounding of the exact structured-data paths the assistant must emit and the booking gate."
echo "This build performs NO Vapi config — it documents the config Jason may perform out-of-band inside a tight boundary and captures the new approval packet. No production connection. No real Supabase. No Vapi/Twilio/Retell API. No call. No SMS. No deploy. No config/schema/RLS change. No phone number change. No secret read."
echo "Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389; no real number/UUID/call-id/PII. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-structured-appointment-fields-build-277-readonly.js
echo "PASS: Build 277 structured-appointment-fields verifier syntax check succeeded."

echo ""
echo "== Build 277 structured-appointment-fields read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-structured-appointment-fields-build-277-readonly.js

echo ""
echo "== Regression: Build 276 first-roofer-e2e-persistence-evidence-correction verifier (booking frontier) =="
node backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "PASS: Build 277 structured-appointment-fields dry-run passed."
echo "build_mode=structured_appointment_fields_readiness_repo_only  build_277_status=completed  build_271_redone=false  build_276_redone=false  current_frontier=booking_extraction_after_build_276  preferred_path=structured_vapi_appointment_fields  opt2_code_fallback_status=deferred  appointment_booked_field_defined=true  appointment_time_field_defined=true  appointment_requested_field_defined_if_supported=true  structured_fields_config_approval_status=new_packet_created  offline_booking_case2_status=passed  verbal_without_structured_fields_still_booking_null=true  post_config_structured_fields_create_booking=true  backend_code_change=false  live_pstn_retest_approval_status=not_requested_until_offline_passes  no_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_by_this_build=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_configures_test_roofing_assistant_structured_appointment_schema_out_of_band_then_one_separately_approved_pstn_retest_for_booking_persistence"
