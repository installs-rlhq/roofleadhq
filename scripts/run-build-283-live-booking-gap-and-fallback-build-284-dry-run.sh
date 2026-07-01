#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 284 — Second Live Booking Observation Gap + Conservative Summary/Transcript Fallback (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Captures the sanitized backend response from the SECOND live booking-observation call (Build 283-approved, consumed once, no retry): HTTP 200, ok:true, inserted:true, duplicate:false; call_id/provider_call_id/matched_lead_id/roofer_id present (masked); mapped destination last-4 0389; booking_id=null; normalized.appointment_booked=false, appointment_requested=false, appointment_time=null; transcript+summary clearly indicated a Thursday, July 2nd, 2 PM in-person site visit. Mapped roofer + lead + call PASSED live; booking FAILED again — even with the Build 281 structuredOutputs fix DEPLOYED (proved by Build 283)."
echo "Diagnosis: the live call-completed payload carried NO usable structured appointment fields at backend-processing time (neither structuredData nor structuredOutputs). The booking intent + time lived ONLY in the trusted Vapi summary + transcript. actual_gap=live_webhook_missing_or_unreadable_structured_appointment_fields."
echo "Fix (Build 284): a conservative summary/transcript booking fallback in normalizeVapiCallCompletedPayload. It runs ONLY when the structured signal did not book with a time (structured precedence preserved), prefers summary then transcript, and requires ALL of: confident booking language + an appointment noun + an EXPLICIT calendar date (month+day; a bare weekday is NOT sufficient) + a clock time. Vague interest, callback-only, and emergency-without-a-scheduled-visit do NOT book."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase. LIVE-SHAPE = summary/transcript-only payload -> lead+call persist AND booking created (fix proof, time=2026-07-02T14:00:00.000Z). NEGATIVES = callback-with-date (no noun), weekday-only verbal (Build 276/281 FIX_VERBAL invariant preserved), vague callback + emergency. REGRESSION = legacy structuredData AND Build 281 structuredOutputs both still create the booking via the structured path. Plus evidence-doc grounding, non-overclaim, and no-secret/PII scans."
echo "This build performs NO Vapi config, NO provider action, NO call, NO additional call, NO retry, NO SMS, NO deploy, NO config/schema/RLS change, NO phone number change, NO production data export, NO secret read. Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-283-live-booking-gap-and-fallback-build-284-readonly.js
echo "PASS: Build 284 live-booking-gap-and-fallback verifier syntax check succeeded."

echo ""
echo "== Build 284 live-booking-gap-and-fallback read-only verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-build-283-live-booking-gap-and-fallback-build-284-readonly.js

echo ""
echo "== Regression: Build 283 runtime-deployment verifier (Build 281 fix live; structuredOutputs still normalizes) =="
node backend/scripts/verify-build-282-runtime-deployment-build-283-readonly.js

echo ""
echo "== Regression: Build 281 booking-gap-and-fix verifier (structuredOutputs fix + offline booking proof; FIX_VERBAL still booking_id=null) =="
node backend/scripts/verify-build-280-booking-gap-and-fix-build-281-readonly.js

echo ""
echo "PASS: Build 284 live-booking-gap-and-fallback dry-run passed."
echo "build_mode=build_283_live_booking_gap_and_summary_transcript_fallback_repo_only  build_284_status=completed  build_271_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_283_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_live_booking_observation_status=completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=failed_again_after_deployed_build_281_fix_or_fixed_by_offline_replay  live_call_booking_id_status=null  actual_gap=live_webhook_missing_or_unreadable_structured_appointment_fields  summary_transcript_fallback_status=implemented  offline_fallback_replay_status=passed  first_roofer_e2e_status=partial_pass_booking_gap_or_offline_fix_ready  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_deploys_build_284_fallback_then_places_exactly_one_separately_approved_live_booking_observation_call_to_last4_0389_no_retry"
