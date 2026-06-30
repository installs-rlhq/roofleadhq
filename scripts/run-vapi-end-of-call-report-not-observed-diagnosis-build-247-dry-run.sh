#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 247 — Repo-Only End-Of-Call-Report-Not-Observed Diagnosis Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 246 + Build 245 + Build 244-fix verifiers + Vapi smoke regression."
echo "No fix applied. No call. No phone dialed. No Vapi Talk. No Vapi rerun. No curl against the live webhook/production. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Diagnosis: end_of_call_report_observed=false in the Build 246 CSV is NOT a backend-code defect. The backend expects end-of-call-report as terminal (TERMINAL_EVENT_TYPES) and would return HTTP 200 for a browser/webCall EOCR (acknowledge_web_call no-op), so an interim-only stream (assistant.started + status/speech/conversation updates) is handled exactly as observed. Most likely cause: Vapi serverMessages config (end-of-call-report not enabled in the Test Roofing Assistant; off-repo dashboard config the repo cannot confirm), with browser-webCall/CSV-export timing contributing. Backend readiness for end-of-call-report = ready. Safest Build 248 next step: repo + Vapi serverMessages config inspection only — no new call, no new approval for inspection; a PSTN full-report validation needs a new separate approval (Build 245 approval is consumed)."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js
echo "PASS: Build 247 script syntax check succeeded."

echo ""
echo "== Build 247 read-only static verifier (non-mutating; no live HTTP; no fix; no runtime/external action) =="
node backend/scripts/verify-vapi-end-of-call-report-not-observed-diagnosis-build-247-readonly.js

echo ""
echo "== Regression: Build 246 post-fix Vapi browser/webCall webhook validation sanitized CSV evidence read-only verifier =="
node backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js

echo ""
echo "== Regression: Build 245 post-fix Vapi browser/webCall validation approval & fresh-guard read-only verifier =="
node backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js

echo ""
echo "== Regression: Build 244 Vapi webhook payload-shape fix read-only verifier =="
node backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 247 repo-only end-of-call-report-not-observed diagnosis dry-run passed."
echo "diagnosis_mode=repo_only  fix_applied=false  runtime_action_performed_by_build_247=false  live_http_called=false  phone_dialed=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_246_prerequisite_commit=563044c  build_245_prerequisite_commit=cc3007c  build_244_prerequisite_commit=7342539  backend_expects_end_of_call_report_as_terminal=true  backend_handles_browser_webcall_eocr_as_200_noop=true  backend_readiness_for_end_of_call_report=ready  repo_contains_vapi_servermessages_enablement_config=false  cause_backend_code=ruled_out  cause_vapi_servermessage_config=most_likely  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  real_call_test_status=not_started  safest_build_248_next_step=config_inspection_only  approval_consumed=true  rerun_permitted_without_new_approval=false  repo_unchanged=true"
