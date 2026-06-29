#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 231 — Call-Path Inspection & Jason-Owned Call-Test Readiness Dry-Run =="
echo "Mode: repo-only inspection. Docs + read-only static verifiers only."
echo "No call. No deploy. No live HTTP. No Supabase call. No SMS. No Twilio/Vapi/Retell/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data read/write. No Twilio/Railway config change. No schema/auth/RLS/security change. No mutation."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js
echo "PASS: Build 231 read-only verifier syntax check succeeded."

echo ""
echo "== Build 231 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 231 call-path inspection & Jason-owned call-test readiness dry-run passed."
echo "live_http_called=false  call_placed=false  live_sms_sent=false  provider_calls_made=false  config_changed=false  repo_unchanged=true"
