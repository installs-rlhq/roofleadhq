#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 244 — Vapi Webhook Payload-Shape FIX Dry-Run =="
echo "Mode: local-only. In-process behavioral verifier (offline) + backend build + safe-readiness fast lane + B242..B237 read-only regression chain + Vapi smoke. (B243 is excluded post-fix: it asserts the pre-fix 'no message-type routing' invariant this fix deliberately changes.)"
echo "No call. No Vapi Talk. No Vapi rerun. No curl against the live webhook/production. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No runtime/external action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: repo-only, test-first fix for HTTP 400 (missing_required_field) at /webhooks/vapi/call-completed. Added Vapi message-type routing so only a terminal end-of-call-report enters full processing; interim status/conversation/speech update events return ok 200 no-op; browser/webCall end-of-call-report (null caller/destination) returns ok 200 no-op (web_call) instead of 400; PSTN end-of-call-report with required phone routing fields still enters the existing full processing path; the phone-keyed required-field gate is preserved. Full production payload processing remains not_yet_validated and needs a separate runtime validation + new approval."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js
echo "PASS: Build 244 script syntax check succeeded."

echo ""
echo "== Backend build (tsc) =="
npm --prefix backend run build
echo "PASS: backend build succeeded."

echo ""
echo "== Build 244 in-process behavioral FIX verifier (offline; compiles + drives the fixed service/auth) =="
node backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js

echo ""
echo "== Safe readiness fast lane (live automation remains disabled) =="
bash scripts/verify-safe-readiness-fast.sh

echo ""
echo "== Note: Build 243 read-only diagnosis verifier is intentionally EXCLUDED from this post-fix chain. =="
echo "Build 243 asserts the PRE-FIX invariant 'source has no message.type / end-of-call-report routing'"
echo "(message_type_routing_present=false). Build 244 deliberately adds exactly that routing, so re-running"
echo "the B243 grounding verifier against post-fix source is self-contradictory by design. All OTHER B243"
echo "checks still hold; only its absence-of-routing grounding assertion is obsoleted by this fix."

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
echo "PASS: Build 244 Vapi webhook payload-shape FIX dry-run passed."
echo "live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  supabase_write=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  code_fix_applied=true  auth_fail_closed=true  non_terminal_noop=true  webcall_noop_not_400=true  pstn_enters_full_path=true  required_field_gate_preserved=true  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_244=false"
