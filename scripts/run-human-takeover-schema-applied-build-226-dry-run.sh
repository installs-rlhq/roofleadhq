#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 226 Out-of-Band Human Takeover Schema Application Dry-Run =="
echo "Mode: documentation + acknowledgement verification only."
echo "Records that Jason manually applied the Build 225 schema out-of-band in Supabase SQL Editor"
echo "(Supabase returned: 'Success. No rows returned.'). Runtime gate stays unset/false."
echo "No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read. No env change."
echo "No homeowner or roofer contact. No production data export. No runtime route enabled."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-human-takeover-schema-applied-build-226-readonly.js
echo "PASS: Build 226 verifier syntax check succeeded."

echo ""
echo "== Build 226 acknowledgement verifier (read-only, non-mutating) =="
node backend/scripts/verify-human-takeover-schema-applied-build-226-readonly.js

echo ""
echo "== Regression: Build 225 human takeover gate verifier (unchanged) =="
node backend/scripts/verify-human-takeover-escalation-build-225-readonly.js

echo ""
echo "PASS: Build 226 out-of-band schema application acknowledgement dry-run passed."
echo "schema_applied_by_jason=true  runtime_gate_enabled=false  live_sms_sent=false  provider_calls_made=false"
