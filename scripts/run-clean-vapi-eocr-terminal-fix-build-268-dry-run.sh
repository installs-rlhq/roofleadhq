#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 268 — Clean Vapi EOCR terminal-path FIX (repo-only, offline behavioral) Dry-Run =="
echo "Mode: local-only. Compiles the backend and drives the ACTUAL compiled service in-process with a FAKE Supabase client (require-cache interception). No network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no Vapi rerun, no call, no SMS, no Twilio, no Retell, no deploy, no restart, no config change, no secret file read, no env persisted."
echo "Turns the Build 266/267 diagnosis into a narrow fail-controlled backend fix: a clean Vapi PSTN End-Of-Call Report whose destination number is not mapped to any roofer now returns a controlled 200 no-op (reason unknown_roofer_destination_unmapped) instead of HTTP 404. Non-terminal 200 no-ops, browser/webCall 200 no-ops, missing_required_field 400, unknown_roofer defensive 404, unauthorized 401, and missing-runtime-secret 503 are all preserved. Repo-only; NOT deployed."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js
echo "PASS: Build 268 fix verifier syntax check succeeded."

echo ""
echo "== Build 268 clean-Vapi-EOCR terminal-path FIX behavioral verifier (offline; fake Supabase; non-mutating) =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: Build 267 production EOCR-404 route & deployment diagnosis read-only verifier =="
node backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js

echo ""
echo "== Regression: Build 266 clean Vapi PSTN EOCR 404 evidence + diagnosis read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 268 clean Vapi EOCR terminal-path FIX dry-run passed."
echo "build_mode=clean_vapi_eocr_terminal_fix_repo_only  backend_source_changed=true  eocr_404_root_cause_status=application_level_terminal_payload_handling_identified  eocr_404_fix_status=implemented_repo_only_not_deployed  production_route_status=reachable_same_path_nonterminal_200  unmapped_roofer_eocr_now_200_noop=true  mapped_roofer_still_processes=true  required_field_gate_preserved_400=true  nonterminal_and_webcall_noops_preserved=true  auth_401_503_preserved=true  route_defensive_404_branch_retained=true  deploy_status=not_approved_not_performed  retry_call_status=not_approved_not_performed  no_call_placed=true  no_sms_sent=true  no_config_changed=true  no_deploy=true  vapi_test_used=false  vapi_talk_used=false  vapi_webcall_used=false  curl_used=false  live_webhook_called=false  real_supabase_used=false  twilio_used=false  retell_used=false  secret_file_read=false  repo_tracked_files_unchanged_by_verifier=true"
