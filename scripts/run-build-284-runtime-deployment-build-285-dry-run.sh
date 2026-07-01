#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 285 — Build 284 Runtime Deployment Evidence (backend/API deploy verification, repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Under Jason's explicit backend/API deploy approval, confirms Railway service roofleadhq-api is running Build 284 HEAD commit 44ed7cd (unauthenticated GET /health -> status=ok, environment=production, commit_short=44ed7cd), which means the Build 284 conservative summary/transcript booking fallback is LIVE. Production was already at 44ed7cd when checked, so NO redeploy was performed by the agent."
echo "This build makes NO env/config/schema/provider change, NO Vapi/Twilio/Retell change, NO phone-number change, NO call, NO retry, NO SMS, NO homeowner/roofer contact, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. It neither creates nor consumes any live-call approval. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-284-runtime-deployment-build-285-readonly.js
echo "PASS: Build 285 runtime-deployment verifier syntax check succeeded."

echo ""
echo "== Build 285 runtime-deployment read-only verifier (in-process; real compiled config/service; commit-marker behavior; fallback still books; non-mutating) =="
node backend/scripts/verify-build-284-runtime-deployment-build-285-readonly.js

echo ""
echo "== Regression: Build 284 booking-gap-and-fallback verifier (conservative summary/transcript fallback + offline booking proof) =="
node backend/scripts/verify-build-283-live-booking-gap-and-fallback-build-284-readonly.js

echo ""
echo "== Regression: Build 283 runtime-deployment verifier (/health commit marker + one-call approval) =="
node backend/scripts/verify-build-282-runtime-deployment-build-283-readonly.js

echo ""
echo "PASS: Build 285 runtime-deployment dry-run passed."
echo "build_mode=build_284_runtime_deployment_evidence_repo_only  build_285_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_284_redone=false  build_284_fix_status=offline_replay_passed  build_284_runtime_deployment_status=deployed  deployed_commit_short=44ed7cd  deploy_scope=railway_roofleadhq_api_backend_only  redeploy_performed_by_agent=false  env_config_schema_provider_changes=false  live_booking_observation_approval_status=not_created_in_this_build  no_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_places_exactly_one_separately_approved_live_booking_observation_pstn_call_to_the_clean_vapi_test_number_last4_0389_no_retry_then_a_later_build_captures_sanitized_lead_call_and_booking_persistence_evidence"
