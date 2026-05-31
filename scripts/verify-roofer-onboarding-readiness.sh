#!/usr/bin/env bash
set -euo pipefail

echo "=== RoofLeadHQ Roofer Onboarding Readiness Check ==="

echo
echo "---- Repo Check ----"
cd /root/roofleadhq
pwd
git rev-parse --show-toplevel

if [ "$(git rev-parse --show-toplevel)" != "/root/roofleadhq" ]; then
  echo "FAIL: wrong repo root"
  exit 1
fi

echo
echo "---- Git Status ----"
git fetch origin main
git status --short
git log --oneline -5

echo
echo "---- Required Files ----"
test -f docs/ROOFER_ONBOARDING_SCRIPT_PLAN.md && echo "OK: onboarding plan exists"
test -f backend/scripts/test-vapi-calls-insert.sh && echo "OK: Vapi calls test script exists"
test -f backend/scripts/sync-vapi-calendar-bookings.js && echo "OK: Calendar sync dry-run script exists"

echo
echo "---- Environment Variable Presence ----"
if [ -n "${SUPABASE_URL:-}" ]; then
  echo "OK: SUPABASE_URL is set"
else
  echo "WARN: SUPABASE_URL is not set in this shell"
fi

if [ -n "${SUPABASE_SERVICE_ROLE_KEY:-}" ]; then
  echo "OK: SUPABASE_SERVICE_ROLE_KEY is set"
else
  echo "WARN: SUPABASE_SERVICE_ROLE_KEY is not set in this shell"
fi

echo
echo "---- Safety Flag Reminder ----"
echo "New roofers must default to:"
echo "calendar_sync_enabled = false"
echo "sms_confirmation_enabled = false"

echo
echo "No Calendar events or homeowner SMS should be enabled by this readiness check."

echo
echo "=== Readiness Check Complete ==="
