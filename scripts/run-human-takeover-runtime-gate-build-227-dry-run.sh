#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 227 Human Takeover Runtime Gate Enablement Readiness Dry-Run =="
echo "Mode: repo-only readiness/checklist/verifier. Documents the future manual env enablement step."
echo "Runtime gate stays unset/false. No env/Railway var is set. No runtime is enabled."
echo "No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read. No env change."
echo "No homeowner or roofer contact. No production data export. No live route write."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-human-takeover-runtime-gate-readiness-build-227-readonly.js
echo "PASS: Build 227 verifier syntax check succeeded."

echo ""
echo "== Build 227 runtime gate enablement readiness verifier (read-only, non-mutating) =="
node backend/scripts/verify-human-takeover-runtime-gate-readiness-build-227-readonly.js

echo ""
echo "== Regression: Build 226 out-of-band schema application acknowledgement verifier =="
node backend/scripts/verify-human-takeover-schema-applied-build-226-readonly.js

echo ""
echo "== Regression: Build 225 human takeover gate verifier (unchanged) =="
node backend/scripts/verify-human-takeover-escalation-build-225-readonly.js

echo ""
echo "== Gate-on code path (offline/mock; HUMAN_TAKEOVER_SCHEMA_READY=true, no Supabase) =="
echo "Exercises the gate-on takeover service against the offline mock only; does NOT enable runtime."
HUMAN_TAKEOVER_SCHEMA_READY=true scripts/run-human-takeover-escalation-build-225-dry-run.sh

echo ""
echo "PASS: Build 227 runtime gate enablement readiness dry-run passed."
echo "runtime_gate_enabled=false  enum_migration_required=false  live_sms_sent=false  provider_calls_made=false"
