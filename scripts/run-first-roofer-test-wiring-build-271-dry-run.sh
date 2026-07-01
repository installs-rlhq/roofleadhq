#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 271 — First Roofer Test Wiring Readiness (repo-only) Dry-Run =="
echo "Mode: local-only, offline. Compiles the backend and exercises the REAL compiled Vapi webhook service in-process against a FAKE Supabase client to prove the MAPPED clean-Vapi EOCR final-report persistence path (lead + booking + call). Then runs the Build 270/269/268 clean-Vapi PSTN regression verifiers and the Vapi phone-lead smoke regression."
echo "Repo-only readiness build. No call placed. No SMS. No second call. No retry. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook. No live HTTP. No real Supabase. No Supabase write. No Twilio CLI/API. No Retell API. No production provider API. No Twilio/Retell/Vapi/Railway config change. No backend/Railway deploy/redeploy/restart. No env change. No schema/auth/RLS change. No production data export. No homeowner or roofer contact. No secret file read. No secrets printed. No secret committed. No first-roofer live-test approval created. No runtime/external action."
echo "Proves: clean Vapi number maps to a roofer via roofers.twilio_number == EOCR destination; a MAPPED terminal EOCR (appointment booked) creates a lead + a booking + a call (inserted:true); an UNMAPPED destination remains the Build 268 controlled 200 no-op; non-terminal events stay no-ops; replays are idempotent. Documents the one remaining runtime mapping gap (seed a demo/pilot roofer's twilio_number to a clean Vapi number) and the next-step requirement for a SEPARATE first-roofer end-to-end test approval — WITHOUT creating one. first_roofer_test_wiring_status=repo_ready_persistence_proven_runtime_mapping_gap_identified; mapped_roofer_final_report_path_status=validated_by_fixture; live_first_roofer_test_approval_status=not_requested."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js
echo "PASS: Build 271 first-roofer-test-wiring verifier syntax check succeeded."

echo ""
echo "== Build 271 first-roofer-test-wiring readiness verifier (offline, in-process, fake Supabase; non-mutating) =="
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
echo "PASS: Build 271 first-roofer-test-wiring readiness dry-run passed."
echo "build_mode=first_roofer_test_wiring_readiness_repo_only  runtime_action_performed_by_build_271=false  fix_or_config_change_performed_by_build_271=false  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  first_roofer_test_wiring_status=repo_ready_persistence_proven_runtime_mapping_gap_identified  clean_vapi_number_mapping_status=defined_via_roofers_twilio_number_equality_runtime_seeding_gap  mapped_roofer_final_report_path_status=validated_by_fixture  mapped_eocr_creates_lead=true  mapped_eocr_creates_booking=true  mapped_eocr_creates_call=true  unmapped_eocr_controlled_200_noop=true  nonterminal_noop_preserved=true  idempotent_duplicate_preserved=true  existing_twilio_retell_route_status=preserved_untouched  live_first_roofer_test_approval_status=not_requested  first_roofer_live_test_approval_created=false  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  call_placed=false  second_call=false  retry=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  curl_used=false  live_webhook_called=false  twilio_used=false  retell_used=false  real_supabase_used=false  supabase_write=false  deploy=false  config_changed=false  secret_file_read=false  repo_unchanged=true"
