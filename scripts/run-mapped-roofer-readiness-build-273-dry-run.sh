#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 273 — Mapped Roofer Readiness: Runtime Mapping Evidence Captured (repo-only) Dry-Run =="
echo "Mode: local-only, read-only. Repo-evidence verifier + Build 272/271/270/268 clean-Vapi regression + Vapi phone-lead smoke."
echo "Build 272 stopped safely because the runtime mapping (set one roofers.twilio_number == the clean Vapi-managed Test Number) required private values the agent could not safely obtain. Jason has now performed that mapping OUT-OF-BAND via a single Supabase row update and reported it in masked form only: mapped roofer = Launch Test Roofing 1780434363, twilio_number_last4 = 0389, mapped_roofer_count = 1, Vapi Test Number assigned to the Test Roofing Assistant (confirmed by Jason). That clears the Build 272 blocker. Build 271 already proved by fixture that a mapped clean-Vapi EOCR event persists lead + booking + call, so the mapped clean-Vapi EOCR path is now staged and ready for a SEPARATE single-call approval."
echo "This build is repo-only evidence/readiness. No roofer row written by this build. No production connection. No Supabase/Vapi/Twilio/Retell call. No live call. No SMS. No homeowner contact. No roofer contact. No Twilio/Retell/Vapi/Railway config change. No env var change. No schema/auth/RLS change. No backend deploy/redeploy/restart. No production data export. No secret read or printed. Full clean Vapi number never written (last-4 0389 only). Existing Twilio -> Retell route untouched. First PSTN E2E test still NOT approved."
echo "Next step = request explicit SEPARATE approval for exactly one controlled PSTN first-roofer E2E test call. build_272_runtime_mapping_blocker_status=cleared; mapped_roofer_count=1; first_roofer_e2e_test_readiness=ready_for_separate_single_call_approval; first_roofer_e2e_test_approval_status=not_approved."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js
echo "PASS: Build 273 mapped-roofer-readiness verifier syntax check succeeded."

echo ""
echo "== Build 273 mapped-roofer-readiness read-only verifier (repo-evidence only; no prod/provider; non-mutating) =="
node backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js

echo ""
echo "== Regression: Build 272 controlled-roofer-runtime-mapping BLOCKED/gap verifier (blocker now cleared by this build's evidence) =="
node backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "== Regression: Build 270 clean Vapi PSTN revalidation PASS read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 269 clean Vapi PSTN revalidation approval read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 273 mapped-roofer-readiness dry-run passed."
echo "build_mode=mapped_roofer_readiness_evidence_repo_only  runtime_update_performed_by_build_273=false  build_272_runtime_mapping_blocker_status=cleared  runtime_mapping_blocker_from_build_272=cleared_by_manual_supabase_update  mapped_roofer_count=1  mapped_roofer_identifier=Launch Test Roofing 1780434363  clean_vapi_number_last4=0389  clean_vapi_number_assignment_status=confirmed_by_jason  vapi_test_number_assigned_to_test_roofing_assistant=confirmed_by_jason  mapped_clean_vapi_eocr_path_status=ready_for_separate_single_call_approval  first_roofer_e2e_test_readiness=ready_for_separate_single_call_approval  first_roofer_e2e_test_approval_status=not_approved  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  existing_twilio_retell_route_status=preserved_untouched  build_272_prerequisite_commit=0930813  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_call_placed=true  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_secret_printing=true  full_clean_vapi_number_recorded_in_repo=false  roofer_row_written=false  production_connected=false  secret_file_read=false  repo_unchanged=true"
