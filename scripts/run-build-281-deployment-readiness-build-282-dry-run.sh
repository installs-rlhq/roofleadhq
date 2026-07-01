#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 282 — Build 281 Deployment Readiness + Narrow Backend Deploy Approval (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Determines runtime-deployment readiness for the Build 281 Structured-Outputs normalizer fix WITHOUT triggering another PSTN call. Deployment status is UNKNOWN this turn (no Railway tooling available to the agent, no sanitized Railway evidence supplied, and — until this build — no runtime commit marker to interrogate). So this build does NOT deploy; it adds a secretless /health commit marker and grounds a narrow deploy approval packet, withholding the next live-call approval until deployment is confirmed."
echo "Build 282 change: GET /health now reports commit + commit_short sourced from Railway-injected RAILWAY_GIT_COMMIT_SHA (a git hash, NOT a secret; no env/config/schema change made). After the approved deploy, an unauthenticated GET /health confirms the running commit == the deployed Build 282 SHA, proving the Build 281 fix is live with no dashboard and no secret."
echo "This build performs NO deploy, NO call, NO retry, NO SMS, NO Vapi/Twilio/Retell config, NO phone-number change, NO schema/auth/RLS change, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-281-deployment-readiness-build-282-readonly.js
echo "PASS: Build 282 deployment-readiness verifier syntax check succeeded."

echo ""
echo "== Build 282 deployment-readiness read-only verifier (in-process; real compiled config/service; commit-marker behavior; non-mutating) =="
node backend/scripts/verify-build-281-deployment-readiness-build-282-readonly.js

echo ""
echo "== Regression: Build 281 booking-gap-and-fix verifier (structuredOutputs fix + offline booking proof) =="
node backend/scripts/verify-build-280-booking-gap-and-fix-build-281-readonly.js

echo ""
echo "== Regression: Build 280 controlled-pstn-retest-outcome verifier (offline booking proof + absence proof) =="
node backend/scripts/verify-controlled-pstn-retest-outcome-build-280-readonly.js

echo ""
echo "PASS: Build 282 deployment-readiness dry-run passed."
echo "build_mode=build_281_deployment_readiness_and_deploy_approval_repo_only  build_282_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_281_fix_status=offline_replay_passed  build_281_runtime_deployment_status=unknown  deployment_approval_status=created  live_booking_observation_retest_approval_status=withheld  first_roofer_e2e_status=partial_pass_booking_gap_until_runtime_fix_verified  health_commit_marker_added=true  health_commit_marker_secretless=true  no_new_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_env_var_changed=true  no_backend_deploy_by_agent=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_deploys_roofleadhq_api_to_main_head_build_282_per_the_approval_packet_then_confirms_via_get_health_commit_short_no_new_call"