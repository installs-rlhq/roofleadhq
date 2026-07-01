#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 286 — First Controlled Roofer E2E Live Pass Evidence (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Captures that the single Build 285-approved live booking-observation PSTN call (consumed once, no retry) was a FULL first-roofer end-to-end PASS: mapped roofer + lead + call + BOOKING all persisted live (booking_id NON-NULL, normalized.appointment_booked=true, appointment_time=2026-07-02T14:00:00.000Z). The Build 284 conservative summary/transcript fallback (deployed + confirmed live in Build 285) handled the live webhook shape where structured appointment fields were not usable; Build 281 structuredOutputs support remains preserved (precedence)."
echo "This build makes NO env/config/schema/provider change, NO Vapi/Twilio/Retell change, NO phone-number change, NO call, NO retry, NO SMS, NO homeowner/roofer contact, NO deploy, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. It neither creates nor consumes any live-call approval. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-285-first-roofer-e2e-live-pass-build-286-readonly.js
echo "PASS: Build 286 first-roofer-e2e live-pass verifier syntax check succeeded."

echo ""
echo "== Build 286 first-roofer-e2e live-pass read-only verifier (in-process; real compiled service; fallback books the live shape; structured precedence preserved; non-mutating) =="
node backend/scripts/verify-build-285-first-roofer-e2e-live-pass-build-286-readonly.js

echo ""
echo "== Regression: Build 285 runtime-deployment verifier (Build 284 fallback deployed + /health commit marker) =="
node backend/scripts/verify-build-284-runtime-deployment-build-285-readonly.js

echo ""
echo "== Regression: Build 284 booking-gap-and-fallback verifier (conservative summary/transcript fallback + offline booking proof) =="
node backend/scripts/verify-build-283-live-booking-gap-and-fallback-build-284-readonly.js

echo ""
echo "PASS: Build 286 first-roofer-e2e live-pass dry-run passed."
echo "build_mode=first_roofer_e2e_live_pass_evidence_repo_only  build_286_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_284_redone=false  build_285_redone=false  build_285_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_live_booking_observation_status=completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=passed  live_call_booking_id_status=non_null  first_roofer_e2e_status=passed  build_284_fallback_live_status=validated  live_roofer_testing_sales_readiness_status=ready_for_pilot_package  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=prepare_first_real_pilot_roofer_outreach_onboarding_draft_bundle_then_obtain_separate_approval_before_any_real_contact_using_the_clean_vapi_managed_number_path_without_changing_the_existing_twilio_retell_number"
