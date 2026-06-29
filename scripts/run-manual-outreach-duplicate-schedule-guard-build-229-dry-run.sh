#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 229 — Manual Outreach Duplicate-Schedule Guard Dry-Run =="
echo "Mode: repo-only. Code guard + offline mock test + read-only static verifier + docs."
echo "No deploy. No live HTTP. No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data export. No schema/auth/RLS change. No mutation."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/test-manual-outreach-duplicate-schedule-guard-build-229.js
echo "PASS: Build 229 behavioral test syntax check succeeded."
node --check backend/scripts/verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js
echo "PASS: Build 229 read-only verifier syntax check succeeded."

echo ""
echo "== Build 229 behavioral unit test (offline; compiles service to OS-temp; in-memory mock Supabase) =="
node backend/scripts/test-manual-outreach-duplicate-schedule-guard-build-229.js

echo ""
echo "== Build 229 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js

echo ""
echo "== Regression: existing manual outreach smoke read-only verifier =="
node backend/scripts/verify-manual-outreach-smoke-readonly.js

echo ""
echo "PASS: Build 229 manual outreach duplicate-schedule guard dry-run passed."
echo "live_http_called=false  live_sms_sent=false  provider_calls_made=false  schema_changed=false  repo_unchanged=true"
