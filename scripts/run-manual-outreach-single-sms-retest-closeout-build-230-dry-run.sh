#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 230 — Manual Outreach Single-SMS Retest Closeout Dry-Run =="
echo "Mode: repo-only evidence closeout. Docs + read-only static verifier only."
echo "No deploy. No live HTTP. No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data read/write. No schema/auth/RLS/security change. No mutation."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-manual-outreach-single-sms-retest-closeout-build-230-readonly.js
echo "PASS: Build 230 read-only verifier syntax check succeeded."

echo ""
echo "== Build 230 read-only static verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-manual-outreach-single-sms-retest-closeout-build-230-readonly.js

echo ""
echo "== Regression: Build 229 duplicate-schedule guard read-only verifier =="
node backend/scripts/verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js

echo ""
echo "PASS: Build 230 manual outreach single-SMS retest closeout dry-run passed."
echo "live_http_called=false  live_sms_sent=false  provider_calls_made=false  schema_changed=false  repo_unchanged=true"
