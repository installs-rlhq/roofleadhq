#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 225 Human Takeover / Escalation Dry-Run =="
echo "Mode: offline verification of the human-takeover pause gate, takeover service, and alert copy."
echo "No live Supabase migration applied. No SMS sent. No Twilio/Vapi/Resend call. No credentials read."
echo "No homeowner or roofer contact. Schema columns are NOT applied; all write paths are gated off."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-human-takeover-escalation-build-225-readonly.js
node --check backend/scripts/test-human-takeover-service-build-225.js
echo "PASS: Build 225 verifier + service test syntax check succeeded."

echo ""
echo "== Human takeover service unit test (mock Supabase, offline) =="
node backend/scripts/test-human-takeover-service-build-225.js

echo ""
echo "== Human takeover pause gate + alert copy verifier (non-mutating) =="
node backend/scripts/verify-human-takeover-escalation-build-225-readonly.js

echo ""
echo "== Regression: existing SMS safety + dispatcher dry-run executor verifiers =="
node backend/scripts/verify-sms-safety-service.js
node backend/scripts/verify-sms-dispatcher-dry-run-executor.js

echo ""
echo "PASS: Build 225 Human Takeover / Escalation dry-run wrapper passed."
echo "human_takeover_schema_applied=false  live_sms_sent=false  provider_calls_made=false"
