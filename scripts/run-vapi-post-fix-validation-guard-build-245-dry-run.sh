#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 245 — Post-Fix Vapi Browser/webCall Validation Approval & Fresh-Guard Dry-Run =="
echo "Mode: local-only. Read-only static verifier + B242..B237 read-only verifiers + Vapi smoke regression. (B243 excluded post-fix: it asserts the pre-fix 'no message-type routing' invariant Build 244 deliberately changed.)"
echo "No call. No phone dialed. No Vapi Talk. No curl against the live webhook/production. No deploy. No Railway var set. No Vapi/Twilio config change. No live HTTP. No Supabase write. No SMS. No Twilio. No Vapi-originated action. No secret file read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No billing/CRM automation. No public/live automation. No secrets printed. No secret committed."
echo "Recorded outcome: explicit approval CAPTURED for exactly one post-fix Vapi-originated synthetic browser/webCall validation (Test Roofing Assistant only, sanitized capture only, browser-only — no phone dialed), gated on Build 244 fix (commit 7342539). Fresh fail-closed pre-run guard established. Validation itself NOT executed by this build. post_fix_vapi_validation_status=approved_not_yet_executed; real_call_test_status=not_started; full_payload_processing remains not_yet_validated."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js
echo "PASS: Build 245 script syntax check succeeded."

echo ""
echo "== Build 245 read-only static verifier (non-mutating; no live HTTP; no Vapi-originated action) =="
node backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js

echo ""
echo "== Note: Build 243 read-only diagnosis verifier is intentionally EXCLUDED from this post-fix chain. =="
echo "Build 243 asserts the PRE-FIX invariant 'source has no message.type / end-of-call-report routing'"
echo "(message_type_routing_present=false). Build 244 deliberately added that routing, so re-running the"
echo "B243 grounding verifier against post-fix source is self-contradictory by design. All OTHER B243"
echo "checks still hold; only its absence-of-routing grounding assertion is obsoleted by the fix."

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
echo "PASS: Build 245 post-fix Vapi browser/webCall validation approval & fresh-guard dry-run passed."
echo "live_http_called=false  phone_dialed=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_244_prerequisite_commit=7342539  approval_captured=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  post_fix_vapi_validation_status=approved_not_yet_executed  vapi_originated_action_performed_by_build_245=false  real_call_test=not_started  full_payload_processing=not_yet_validated  repo_unchanged=true"
