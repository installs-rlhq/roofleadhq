#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 275 — Mapped-Roofer Persistence Gap Diagnosis (repo-only, offline) Dry-Run =="
echo "Mode: local-only, in-process. Diagnoses why the Build 274 mapped-roofer PSTN E2E returned backend HTTP 200 but did NOT visibly persist a lead + booking + call in Supabase."
echo "Method: exercise the REAL compiled backend service against an eq-AWARE fake Supabase (byte-exact roofers.twilio_number matching, mirroring Postgres text equality) + statically ground the route's HTTP mapping. No production connection. No real Supabase. No Vapi/Twilio/Retell API. No call. No SMS. No deploy. No config/schema/RLS change. No secret read."
echo "Finding: 200 is returned iff ok:true; exactly ONE of six ok:true branches persists (inserted:true). The most likely Build 274 branch is the Build 268 controlled no-op (unknown_roofer_destination_unmapped) caused by a stored roofers.twilio_number format mismatch vs the strict-E.164 EOCR destination. DB failures return 500/400, so a visible 200 is NOT a swallowed call-insert failure. Proposed fix (data-only re-store to strict E.164, or code normalize-both-sides) is CAPTURED but NOT applied; code option requires separate approval."
echo "Reserved fictional 555 numbers only; clean Vapi number masked as last-4 0389; no real number/UUID/call-id/PII. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-mapped-roofer-persistence-gap-build-275-readonly.js
echo "PASS: Build 275 mapped-roofer-persistence-gap verifier syntax check succeeded."

echo ""
echo "== Build 275 mapped-roofer-persistence-gap read-only diagnostic verifier (in-process; real compiled service + eq-aware fake Supabase; non-mutating) =="
node backend/scripts/verify-mapped-roofer-persistence-gap-build-275-readonly.js

echo ""
echo "== Regression: Build 274 first-roofer-pstn-e2e closeout evidence verifier =="
node backend/scripts/verify-first-roofer-pstn-e2e-build-274-readonly.js

echo ""
echo "== Regression: Build 273 mapped-roofer-readiness verifier =="
node backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js

echo ""
echo "== Regression: Build 272 controlled-roofer-runtime-mapping verifier =="
node backend/scripts/verify-controlled-roofer-runtime-mapping-build-272-readonly.js

echo ""
echo "== Regression: Build 271 first-roofer-test-wiring readiness verifier (mapped persistence proven by fixture) =="
node backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js

echo ""
echo "== Regression: Build 270 clean Vapi PSTN revalidation PASS verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-pass-build-270-readonly.js

echo ""
echo "== Regression: Build 269 clean Vapi PSTN revalidation approval verifier =="
node backend/scripts/verify-clean-vapi-pstn-revalidation-approval-build-269-readonly.js

echo ""
echo "== Regression: Build 268 clean Vapi EOCR terminal-path fix verifier =="
node backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 275 mapped-roofer-persistence-gap dry-run passed."
echo "build_mode=mapped_roofer_persistence_gap_diagnosis_repo_only  build_275_diagnosis_status=completed  first_roofer_e2e_gap=backend_200_persistence_not_observed  suspected_branch_identified=true  most_likely_200_without_persistence_branch=build_268_controlled_no_op_unmapped_destination  fixture_gap_identified=true  near_miss_format_mismatch_reproduces_symptom=true  only_persisting_200_branch=inserted_true  db_failure_is_500_not_200=true  production_safe_fix_added=false  mapped_roofer_persistence_readiness=blocked_pending_specific_masked_evidence  another_pstn_retest_justified=only_after_masked_evidence_and_mapping_fix  no_call=true  no_second_call=true  retry_count=0  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  config_changed=false  secret_file_read=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=obtain_masked_stored_twilio_number_format_or_backend_reason_then_apply_option_1_data_fix_then_one_separately_approved_pstn_retest"
