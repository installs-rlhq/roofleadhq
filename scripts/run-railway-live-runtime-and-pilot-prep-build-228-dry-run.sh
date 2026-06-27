#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 228 — Railway Live Runtime Verification + Controlled Live Roofer Pilot Prep Dry-Run =="
echo "Mode: repo-only readiness/verification/runbook. Documents live read-only evidence + the pilot-prep path."
echo "No live HTTP call is made by this dry-run. The smoke script is only syntax-checked, not executed live."
echo "No env/Railway var is set. No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read."
echo "No homeowner or roofer contact. No production data export. No live route write. No mutation."

echo ""
echo "== Syntax check (node --check + bash -n) =="
node --check backend/scripts/verify-railway-live-runtime-and-pilot-prep-build-228-readonly.js
echo "PASS: Build 228 verifier syntax check succeeded."
bash -n scripts/run-railway-live-runtime-smoke-test.sh
echo "PASS: Build 228 smoke-test script syntax check succeeded (NOT run live)."

echo ""
echo "== Build 228 read-only verifier (non-mutating; no live HTTP) =="
node backend/scripts/verify-railway-live-runtime-and-pilot-prep-build-228-readonly.js

echo ""
echo "== Regression: Build 227 runtime gate enablement readiness dry-run =="
bash scripts/run-human-takeover-runtime-gate-build-227-dry-run.sh

echo ""
echo "== Gate-on code path (offline/mock; HUMAN_TAKEOVER_SCHEMA_READY=true, no Supabase) =="
echo "Exercises the gate-on takeover service against the offline mock only; does NOT call the live service."
HUMAN_TAKEOVER_SCHEMA_READY=true scripts/run-human-takeover-escalation-build-225-dry-run.sh

echo ""
echo "PASS: Build 228 Railway live runtime verification + pilot prep dry-run passed."
echo "live_http_called=false  runtime_gate_changed=false  live_sms_sent=false  provider_calls_made=false  repo_unchanged=true"
