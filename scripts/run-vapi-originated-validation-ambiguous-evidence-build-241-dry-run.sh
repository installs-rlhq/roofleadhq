#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 241 — Vapi-Originated Validation Ambiguous/Not-Confirmed Evidence Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 240 + Build 239 + Build 238 + Build 237 verifiers + Vapi smoke regression."
echo "No call. No Vapi Talk. No curl against the live webhook. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No Vapi-originated action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: the single, already-approved (Build 239) Vapi-originated synthetic/controlled browser test was performed exactly once under the Build 240 fresh pre-run guard (Test Roofing Assistant only). Observed result is AMBIGUOUS/NOT_CONFIRMED (backend webhook receipt not confirmed), not pass. Approval is consumed; no rerun without a new separate approval. Full payload processing remains not_yet_validated; real call test remains not_started."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js
echo "PASS: Build 241 script syntax check succeeded."

echo ""
echo "== Build 241 read-only static verifier (non-mutating; no live HTTP; no Vapi-originated action) =="
node backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js

echo ""
echo "== Regression: Build 240 Vapi-originated validation fresh pre-run guard read-only verifier =="
node backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js

echo ""
echo "== Regression: Build 239 Vapi-originated validation approval & guard read-only verifier =="
node backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js

echo ""
echo "== Regression: Build 238 Vapi webhook Bearer credential validation read-only verifier =="
node backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js

echo ""
echo "== Regression: Build 237 Vapi webhook authorized synthetic gate-pair read-only verifier =="
node backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 241 Vapi-originated validation ambiguous/not-confirmed evidence dry-run passed."
echo "live_http_called=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_240_guard_passed_before_action=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  build_240_prerequisite_commit=9b5f8ff  vapi_originated_action_performed=true  vapi_originated_action_count=1  phone_number_dialed=false  twilio_call_placed=false  sms_sent=false  vapi_call_record_observed=true  vapi_log_export_showed_server_webhook_request=false  railway_log_review_confirmed_backend_receipt=false  backend_receipt_confirmed=false  vapi_originated_validation_result=ambiguous_not_confirmed  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  repo_unchanged=true"
