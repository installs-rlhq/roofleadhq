#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 243 — Vapi Webhook Payload-Shape Diagnosis Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 242 + Build 241 + Build 240 + Build 239 + Build 238 + Build 237 verifiers + Vapi smoke regression."
echo "No call. No Vapi Talk. No Vapi rerun. No curl against the live webhook/production. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No code fix. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: repo-only diagnosis of HTTP 400 at /webhooks/vapi/call-completed. Auth passed (400 not 401). 400 source is missing_required_field, gated on provider_call_id + caller_phone + roofer_destination_number (services/vapi-webhook.service.ts). On the observed browser/web (no-PSTN) path caller_phone and roofer_destination_number normalize to null; additionally there is no message.type routing, so Status/Conversation/Speech Update events are also processed as call-completed and 400. Recommends Build 244 fix plan (message.type routing + web-call handling + tests). No code fix applied. full_payload_processing remains not_yet_validated; real_call_test remains not_started."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-webhook-payload-shape-diagnosis-build-243-readonly.js
echo "PASS: Build 243 script syntax check succeeded."

echo ""
echo "== Build 243 read-only diagnosis verifier (non-mutating; grounded in real source; no runtime/external action) =="
node backend/scripts/verify-vapi-webhook-payload-shape-diagnosis-build-243-readonly.js

echo ""
echo "== Regression: Build 242 Vapi-originated webhook delivery corrected evidence read-only verifier =="
node backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js

echo ""
echo "== Regression: Build 241 Vapi-originated validation ambiguous/not-confirmed read-only verifier =="
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
echo "PASS: Build 243 Vapi webhook payload-shape diagnosis dry-run passed."
echo "live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  code_fix_applied=false  build_242_prerequisite_commit=b6fafe4  diagnosis_mode=repo_only_read_only  http_400_source=missing_required_field  message_type_routing_present=false  recommended_build_244_fix_plan_present=true  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_243=false  repo_unchanged=true"
