#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 254 — Vapi PSTN Validation Method Clarification Read-Only Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 253 + Build 252 + Build 251 + Build 250 verifiers + Vapi smoke regression."
echo "Repo-only read-only clarification capture. No PSTN validation executed. No new call requested. No call placed. No phone dialed. No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl against the live webhook/production. No live webhook called. No deploy. No Railway var set. No Vapi/Twilio config change by this build. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Clarification: After Build 253 diagnosed the most likely cause as a user-side web call path (not a true PSTN dial), Jason clarified LAST_ATTEMPT_METHOD=B (clicked Vapi Test). Vapi Test is a web-transport call, NOT a true PSTN phone dial — this explains the prior Vapi Calls Type=Web evidence and the absence of any PSTN call record / end-of-call report. No true PSTN validation was performed. full_final_report_processing_status=not_validated; true_pstn_validation_status=not_executed; prior_approval_consumed=true. A fresh, separate approval AND a fresh guard are required before any true PSTN phone dial placed from a Jason-owned physical phone / iPhone Phone app to the Vapi number (no Vapi Test, no Vapi Talk)."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js
echo "PASS: Build 254 script syntax check succeeded."

echo ""
echo "== Build 254 read-only static verifier (non-mutating; no live HTTP; no PSTN validation executed; no new call; no runtime/external action) =="
node backend/scripts/verify-vapi-pstn-method-clarification-build-254-readonly.js

echo ""
echo "== Regression: Build 253 Vapi PSTN call-path setup read-only-diagnosis verifier =="
node backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js

echo ""
echo "== Regression: Build 252 Vapi PSTN-validation ambiguous-evidence-capture read-only verifier =="
node backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js

echo ""
echo "== Regression: Build 251 Vapi phone-number assistant-assignment correction-capture read-only verifier =="
node backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js

echo ""
echo "== Regression: Build 250 Vapi PSTN end-of-call-report validation approval-capture & guard read-only verifier =="
node backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 254 Vapi PSTN validation method-clarification dry-run passed."
echo "build_mode=vapi_pstn_validation_method_clarification_readonly  runtime_action_performed_by_build_254=false  another_call_requested=false  build_250_prerequisite_commit=a487f13  build_251_prerequisite_commit=828ea19  build_252_prerequisite_commit=424c081  build_253_prerequisite_commit=617108e  build_253_prerequisite_status=validated  build_253_likely_cause_primary=user_side_call_path_web_not_pstn  build_253_likely_cause_classification_preserved=true  jason_clarified_last_attempt_method=B  last_attempt_method_b_means=clicked_vapi_test  last_attempt_was_true_pstn_dial=false  vapi_test_is_true_pstn_dial=false  vapi_test_transport=web  prior_type_web_evidence_explained_by_vapi_test_web_path=true  build_253_primary_cause_confirmed_by_clarification=true  true_pstn_call_performed=false  pstn_call_record_confirmed=false  end_of_call_report_observed=false  full_final_report_processing_status=not_validated  true_pstn_validation_status=not_executed  prior_approval_consumed=true  fresh_approval_required_before_true_pstn_dial=true  fresh_guard_required_before_true_pstn_dial=true  no_new_call_without_fresh_approval_and_fresh_guard=true  call_placed=false  phone_dialed=false  live_sms_sent=false  vapi_test_used=false  vapi_talk_used=false  browser_webcall_used=false  vapi_publish=false  curl_used=false  live_webhook_called=false  twilio_used=false  deploy=false  railway_var_set=false  secret_file_read=false  repo_unchanged=true"
