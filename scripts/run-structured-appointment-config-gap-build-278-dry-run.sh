#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 278 — Structured Appointment Config Evidence Gap (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Evidence-capture checkpoint after the Build 277 approval packet. Re-asserts the Build 277 offline booking proof (the SAME verbal call creates the booking once structured appointment fields arrive), then records that no manual Vapi Test Roofing Assistant structured-data config evidence is present in the repo or as a safe local artifact — so NO controlled PSTN retest approval is created."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. CASE 1 = verbal EOCR with NO structured fields -> lead+call persist, booking_id=null. CASE 2 = the SAME call now EMITTING structured appointment fields -> booking_id present, NO code change. Plus gap-doc grounding and an absence proof that no PSTN-retest approval doc exists yet."
echo "This build performs NO Vapi config, NO provider action, NO call, NO SMS, NO deploy, NO config/schema/RLS change, NO phone number change, NO secret read. Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-structured-appointment-config-gap-build-278-readonly.js
echo "PASS: Build 278 structured-appointment-config-gap verifier syntax check succeeded."

echo ""
echo "== Build 278 structured-appointment-config-gap read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-structured-appointment-config-gap-build-278-readonly.js

echo ""
echo "== Regression: Build 277 structured-appointment-fields readiness verifier (offline booking proof) =="
node backend/scripts/verify-structured-appointment-fields-build-277-readonly.js

echo ""
echo "== Regression: Build 276 first-roofer-e2e-persistence-evidence-correction verifier (booking frontier) =="
node backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js

echo ""
echo "PASS: Build 278 structured-appointment-config-gap dry-run passed."
echo "build_mode=structured_appointment_config_gap_repo_only  build_278_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  current_frontier=structured_vapi_config_evidence_then_one_pstn_retest  preferred_path=structured_vapi_appointment_fields  opt2_code_fallback_status=deferred  structured_fields_expected_under=message.analysis.structuredData  appointment_booked_field_required=true  appointment_time_field_required=true  appointment_requested_field_optional_or_supported=true  offline_booking_case2_status=passed  vapi_structured_config_evidence_status=missing_gap_identified  controlled_pstn_retest_approval_status=withheld_until_config_evidence_captured  live_pstn_retest_approval_status=not_created_this_build  backend_code_change=false  no_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_by_this_build=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_supplies_sanitized_vapi_test_roofing_assistant_structured_data_config_evidence_then_next_build_creates_one_controlled_pstn_retest_approval"
