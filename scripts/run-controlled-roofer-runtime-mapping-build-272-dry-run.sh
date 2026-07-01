#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 272 — Controlled Demo/Pilot Roofer Runtime Mapping: BLOCKED/Gap Evidence (repo-only) Dry-Run =="
echo "Mode: local-only, read-only. Repo-evidence verifier + Build 271/270/268 clean-Vapi regression + Vapi phone-lead smoke."
echo "The approved controlled runtime data mapping (set one demo/pilot roofers.twilio_number == the clean Vapi-managed Test Number) could NOT be safely completed: the exact clean Vapi number is deliberately redacted repo-wide (not guessed), the intended PRODUCTION demo/pilot roofer row is not identifiable from the repo (the only repo demo roofer is a local fake fixture), and there is no safe agent write path within the established out-of-band pattern (DB creds are git-ignored secrets that must not be read). Per the scope's own gate ('perform the update if all required values are known'), the build stops, forces nothing, guesses nothing, and captures a blocked/gap packet with the smallest next action."
echo "No roofer row written. No production connection. No Supabase/Vapi/Twilio/Retell call. No live call. No SMS. No homeowner contact. No unapproved roofer contact. No Twilio/Retell/Vapi config change. No schema/auth/RLS change. No backend/Railway deploy/redeploy/restart. No production data export. No secret read or printed. No full phone number written. Existing Twilio -> Retell route untouched. First PSTN E2E test still NOT approved."
echo "Next step = Jason performs the exactly-one-row Supabase UPDATE out-of-band (masked values), OR safely supplies the clean Vapi number + intended demo/pilot roofer id/slug for a future separately-approved controlled step; then a future build records controlled_runtime_mapping_status=completed. controlled_runtime_mapping_status=blocked_with_known_gap; mapped_roofer_count=0 (target 1); first_roofer_e2e_test_approval_status=not_approved."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js
echo "PASS: Build 272 controlled-roofer-runtime-mapping verifier syntax check succeeded."

echo ""
echo "== Build 272 controlled-roofer-runtime-mapping BLOCKED/gap read-only verifier (repo-evidence only; no prod/provider; non-mutating) =="
node backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "== Regression: Build 270 clean Vapi PSTN revalidation PASS read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 272 controlled-roofer-runtime-mapping BLOCKED/gap dry-run passed."
echo "build_mode=controlled_roofer_runtime_mapping_blocked_gap_evidence_repo_only  runtime_update_performed_by_build_272=false  controlled_runtime_mapping_status=blocked_with_known_gap  mapped_roofer_count=0  mapped_roofer_count_target_if_completed=1  clean_vapi_number_to_roofer_mapping_status=blocked  clean_vapi_number_value_available_in_repo=false  clean_vapi_number_guessed=false  target_production_roofer_row_identified=false  agent_production_write_path_safe=false  clean_vapi_number_assignment_status=pending_safe_confirmation  first_roofer_e2e_test_readiness=blocked_pending_runtime_mapping  first_roofer_e2e_test_approval_status=not_approved  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  existing_twilio_retell_route_status=preserved_untouched  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_call_placed=true  no_sms_sent=true  no_homeowner_contact=true  no_unapproved_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_schema_auth_rls_changed=true  no_backend_deploy=true  no_railway_restart=true  no_production_data_export=true  no_secret_printing=true  roofer_row_written=false  production_connected=false  secret_file_read=false  repo_unchanged=true"
