#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 279 — Structured Appointment Config Evidence Captured (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Closes the Build 278 gap: Jason configured the Vapi Test Roofing Assistant out-of-band (within the Build 277 §5 boundary) and provided SANITIZED Vapi UI screenshot evidence (Analysis -> Structured Outputs: appointment_requested Boolean, appointment_time String, appointment_booked Boolean; status Published; payload under message.analysis.structuredData; clean Test Number last-4 0389 still assigned). This build captures that evidence, re-asserts the Build 277/278 offline booking proof, and creates the narrow one-controlled-PSTN-retest approval packet."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. CASE 1 = verbal EOCR with NO structured fields -> lead+call persist, booking_id=null. CASE 2 = the SAME call now EMITTING structured appointment fields -> booking_id present, NO code change. Plus evidence-doc grounding, a PRESENCE proof that the controlled-PSTN-retest approval packet now exists, and a no-secret/PII scan of both docs."
echo "This build performs NO Vapi config, NO provider action, NO call, NO SMS, NO deploy, NO config/schema/RLS change, NO phone number change, NO secret read. Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-structured-appointment-config-evidence-build-279-readonly.js
echo "PASS: Build 279 structured-appointment-config-evidence verifier syntax check succeeded."

echo ""
echo "== Build 279 structured-appointment-config-evidence read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-structured-appointment-config-evidence-build-279-readonly.js

echo ""
echo "== Regression: Build 278 structured-appointment-config-gap verifier (offline booking proof + withheld-approval absence proof) =="
node backend/scripts/verify-structured-appointment-config-gap-build-278-readonly.js

echo ""
echo "== Regression: Build 277 structured-appointment-fields readiness verifier (offline booking proof) =="
node backend/scripts/verify-structured-appointment-fields-build-277-readonly.js

echo ""
echo "== Regression: Build 276 first-roofer-e2e-persistence-evidence-correction verifier (booking frontier) =="
node backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js

echo ""
echo "PASS: Build 279 structured-appointment-config-evidence dry-run passed."
echo "build_mode=structured_appointment_config_evidence_repo_only  build_279_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  current_frontier=one_controlled_pstn_retest_after_structured_config_evidence  preferred_path=structured_vapi_appointment_fields  opt2_code_fallback_status=deferred  structured_fields_expected_under=message.analysis.structuredData  appointment_booked_field_evidence=captured  appointment_time_field_evidence=captured  appointment_requested_field_evidence=captured  assistant_status_visible=published  offline_booking_case2_status=passed  vapi_structured_config_evidence_status=captured  controlled_pstn_retest_approval_status=created  live_pstn_retest_call_placed=false  backend_code_change=false  no_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_by_this_build=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_places_exactly_one_controlled_pstn_call_to_the_clean_vapi_test_number_last4_0389_under_the_build_279_approval_packet"
