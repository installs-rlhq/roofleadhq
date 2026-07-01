#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 276 — First-Roofer E2E Persistence Evidence Correction (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Corrects the Build 274 interpretation with Jason's new masked webhook-response evidence: the one first-roofer PSTN E2E was NOT a Build 268 no-op — it was the persisting inserted:true branch. A lead was matched/inserted and a call row was inserted (matched_lead_id + call_id present); only the booking did not persist (booking_id=null) because the normalized appointment fields were false/null."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase + statically ground the route contract, the persisting success return shape, the booking gate (!appointment_booked || !appointment_time), and the structured-only appointment extraction (no transcript/summary fallback). No production connection. No real Supabase. No Vapi/Twilio/Retell API. No call. No SMS. No deploy. No config/schema/RLS change. No secret read."
echo "Finding: corrected first-roofer E2E result = partial_pass_lead_and_call_persisted_booking_not_created. Booking gap = appointment EXTRACTION (assistant EOCR carried no structured appointment fields; backend has no transcript/summary fallback), not booking creation (CASE 2 control proves a structured EOCR creates the booking). Proposed fix (Vapi assistant structured-data schema, or a code transcript/summary fallback) is CAPTURED but NOT applied; the code option requires separate approval."
echo "Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389; no real number/UUID/call-id/PII. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js
echo "PASS: Build 276 first-roofer-e2e-persistence-evidence-correction verifier syntax check succeeded."

echo ""
echo "== Build 276 first-roofer-e2e-persistence-evidence-correction read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js

echo ""
echo "== Regression: Build 275 mapped-roofer-persistence-gap verifier =="
node backend/scripts/verify-mapped-roofer-persistence-gap-build-275-readonly.js

echo ""
echo "== Regression: Build 274 first-roofer-pstn-e2e closeout evidence verifier =="
node backend/scripts/verify-first-roofer-pstn-e2e-build-274-readonly.js

echo ""
echo "== Regression: Build 273 mapped-roofer-readiness verifier =="
node backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js

echo ""
echo "== Regression: Build 272 controlled-roofer-runtime-mapping verifier =="
node backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "== Regression: Build 270 clean Vapi PSTN revalidation PASS verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 276 first-roofer-e2e-persistence-evidence-correction dry-run passed."
echo "build_mode=first_roofer_e2e_persistence_evidence_correction_repo_only  build_276_evidence_correction_status=completed  build_274_noop_hypothesis_status=ruled_out_by_webhook_response  mapped_roofer_match_status=passed  lead_persistence_status=passed_or_matched  call_persistence_status=passed  booking_persistence_status=failed_or_not_created  corrected_first_roofer_e2e_result=partial_pass_lead_and_call_persisted_booking_not_created  booking_not_created_cause=normalized_appointment_fields_false_or_null  appointment_extraction=structured_fields_only_no_transcript_summary_fallback  remaining_gap=booking_appointment_extraction_or_creation  verbal_appointment_without_structured_fields_reproduces_symptom=true  control_structured_appointment_creates_booking=true  production_safe_fix_added=false  source_fix_made=false  source_fix_proposed=true  another_pstn_retest_justified=only_after_assistant_emits_structured_appointment_fields  no_call=true  no_second_call=true  retry_count=0  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  config_changed=false  secret_file_read=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=apply_vapi_assistant_structured_appointment_schema_out_of_band_then_reconfirm_offline_then_one_separately_approved_pstn_retest_for_booking_persistence"
