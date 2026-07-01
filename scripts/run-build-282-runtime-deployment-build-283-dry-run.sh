#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 283 — Build 282 Runtime Deployment Evidence + One-Call Live Booking Observation Approval (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Captures sanitized runtime-deployment evidence that Build 282 commit 613ce56 is DEPLOYED on Railway service roofleadhq-api (unauthenticated GET /health -> status=ok, environment=production, commit_short=613ce56), which means the Build 281 Structured-Outputs booking fix (72f834f, an ancestor of 613ce56) is LIVE. Only because runtime deployment is now confirmed, this build creates the separate narrow one-call live booking observation retest approval that Build 282 explicitly withheld."
echo "Jason manually deployed/redeployed roofleadhq-api under the Build 282 approval; this build makes NO deploy of its own. It performs NO call, NO retry, NO SMS, NO Vapi/Twilio/Retell config, NO phone-number change, NO Railway env/config change, NO schema/auth/RLS change, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-282-runtime-deployment-build-283-readonly.js
echo "PASS: Build 283 runtime-deployment verifier syntax check succeeded."

echo ""
echo "== Build 283 runtime-deployment read-only verifier (in-process; real compiled config/service; commit-marker behavior; non-mutating) =="
node backend/scripts/verify-build-282-runtime-deployment-build-283-readonly.js

echo ""
echo "== Regression: Build 282 deployment-readiness verifier (/health commit marker + narrow deploy approval) =="
node backend/scripts/verify-build-281-deployment-readiness-build-282-readonly.js

echo ""
echo "== Regression: Build 281 booking-gap-and-fix verifier (structuredOutputs fix + offline booking proof) =="
node backend/scripts/verify-build-280-booking-gap-and-fix-build-281-readonly.js

echo ""
echo "PASS: Build 283 runtime-deployment dry-run passed."
echo "build_mode=build_282_runtime_deployment_evidence_and_live_booking_observation_approval_repo_only  build_283_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_281_fix_status=offline_replay_passed  build_281_runtime_deployment_status=deployed  build_282_health_marker_status=deployed_and_verified  deployed_commit_short=613ce56  live_booking_observation_retest_approval_status=created  first_roofer_e2e_status=partial_pass_booking_gap_until_live_fix_observed  no_new_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_env_var_changed=true  no_backend_deploy_by_agent=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_places_exactly_one_live_booking_observation_pstn_call_to_the_clean_vapi_test_number_last4_0389_then_a_later_build_captures_sanitized_lead_call_and_booking_persistence_evidence"
