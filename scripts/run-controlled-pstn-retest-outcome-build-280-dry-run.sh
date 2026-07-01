#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 280 — Controlled PSTN Retest Outcome (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Captures the outcome of the ONE controlled PSTN retest that Build 279 approved and now consumed. Jason placed exactly one Jason-owned physical-phone PSTN call to the clean Vapi-managed Test Number (last-4 0389), acting as the homeowner and verbally scheduling a visit. He reports: call completed; EOCR/analysis exists; Structured Outputs appointment_booked=true, appointment_time populated, appointment_requested=true (under message.analysis.structuredData); webhook/backend delivery completed. He did NOT supply the sanitized backend response body / DB row evidence, so Build 280 records an honest partial_pass_with_specific_gap (backend-side persistence confirmation) without overclaiming."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. CASE 1 = verbal EOCR with NO structured fields -> lead+call persist, booking_id=null. CASE 2 = structured fields matching Jason's reported live EOCR -> booking_id present, NO code change. Plus outcome-doc grounding, an ABSENCE proof that Build 280 created no new approval doc, and a no-secret/PII scan."
echo "This build performs NO Vapi config, NO provider action, NO call, NO additional call, NO retry, NO SMS, NO deploy, NO config/schema/RLS change, NO phone number change, NO secret read. Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-controlled-pstn-retest-outcome-build-280-readonly.js
echo "PASS: Build 280 controlled-pstn-retest-outcome verifier syntax check succeeded."

echo ""
echo "== Build 280 controlled-pstn-retest-outcome read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-controlled-pstn-retest-outcome-build-280-readonly.js

echo ""
echo "== Regression: Build 279 structured-appointment-config-evidence verifier (offline booking proof + approval presence) =="
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
echo "PASS: Build 280 controlled-pstn-retest-outcome dry-run passed."
echo "build_mode=controlled_pstn_booking_revalidation_outcome_repo_only  build_280_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_279_one_call_approval_consumed=true  controlled_pstn_retest_execution_status=completed_once_no_retry  call_completed=true  eocr_analysis_exists=true  appointment_booked_structured_output=true  appointment_time_structured_output=populated  appointment_requested_structured_output=true  webhook_backend_delivery_status=completed  offline_booking_case2_status=passed  mapped_roofer_lead_persistence_status=unverified_gap  mapped_roofer_call_persistence_status=unverified_gap  mapped_roofer_booking_persistence_status=unverified_gap  first_roofer_e2e_status=partial_pass_with_specific_gap  opt2_code_fallback_status=deferred  gap_closure_requires_another_call=false  no_additional_pstn_retest_approval_created=true  no_retry_performed=true  no_call_placed=true  no_additional_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_during_test=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_supplies_the_sanitized_backend_side_outcome_of_the_same_already_completed_build_280_call_no_new_call_no_new_approval"
