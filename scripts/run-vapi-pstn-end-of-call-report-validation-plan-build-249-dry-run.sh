#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 249 — Vapi PSTN End-of-Call-Report Validation Plan (Documentation-Only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 248 + Build 246 verifiers + Vapi smoke regression."
echo "Documentation-only plan. No validation executed. No call. No phone dialed. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Plan: a future PSTN end-of-call-report validation is the next meaningful validation (browser/webCall webhook events reached the backend and returned HTTP 200; end-of-call-report is enabled in serverMessages per the Build 248 read-only dashboard inspection but was NOT observed in the Build 246 browser/webCall CSV; the PSTN call path is the likely path to produce a full final report with phone-routing fields). The plan defines preconditions (separate explicit approval, one attempt only, Test Roofing Assistant or approved assistant only, Jason-owned/test number only, no real traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS change, no billing/CRM/public automation), the exact sanitized evidence to capture, the stop conditions, and the post-validation decision tree. full_final_report_processing_status remains not_validated; real_call_test_status remains not_started; a future PSTN validation REQUIRES a new, separate approval (the Build 245 approval is consumed)."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js
echo "PASS: Build 249 script syntax check succeeded."

echo ""
echo "== Build 249 read-only static verifier (non-mutating; no live HTTP; no validation executed; no runtime/external action) =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js

echo ""
echo "== Regression: Build 248 Vapi serverMessages read-only dashboard inspection evidence read-only verifier =="
node backend/scripts/verify-vapi-server-messages-readonly-inspection-build-248-readonly.js

echo ""
echo "== Regression: Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence read-only verifier =="
node backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 249 Vapi PSTN end-of-call-report validation plan dry-run passed."
echo "build_mode=documentation_only  plan_documentation_only=true  validation_executed=false  pstn_validation_plan_status=documented_not_executed  runtime_action_performed_by_build_249=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_248_prerequisite_commit=3c97ddb  build_246_prerequisite_commit=563044c  all_observed_responses_http_200=true  http_400_observed=false  end_of_call_report_appears_enabled=true  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  pstn_is_next_meaningful_validation=true  future_pstn_validation_requires_new_approval=true  one_attempt_limit=true  pstn_validation_attempt_limit=1  evidence_capture_fields_documented=true  stop_conditions_documented=true  decision_tree_documented=true  further_vapi_originated_action_authorized=false  approval_consumed=true  rerun_permitted_without_new_approval=false  repo_unchanged=true"
