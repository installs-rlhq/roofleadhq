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

echo "---- Backend Build Check ----"
cd /root/roofleadhq/backend
/root/.local/bin/npm run build
cd /root/roofleadhq
echo "OK: backend build passed"

echo "---- Backend .env Presence ----"

ENV_FILE="/root/roofleadhq/backend/.env"

if [ -f "$ENV_FILE" ]; then
  echo "OK: backend/.env exists"
else
  echo "FAIL: backend/.env does not exist"
  exit 1
fi

if grep -q '^SUPABASE_URL=' "$ENV_FILE"; then
  echo "OK: SUPABASE_URL exists in backend/.env"
else
  echo "FAIL: SUPABASE_URL missing from backend/.env"
  exit 1
fi

if grep -q '^SUPABASE_SERVICE_ROLE_KEY=' "$ENV_FILE"; then
  echo "OK: SUPABASE_SERVICE_ROLE_KEY exists in backend/.env"
else
  echo "FAIL: SUPABASE_SERVICE_ROLE_KEY missing from backend/.env"
  exit 1
fi

echo "OK: secret values were not printed"

echo
echo "---- Roofer Flags Read-Only DB Check ----"
node /root/roofleadhq/backend/scripts/verify-roofer-flags-readonly.js
echo "OK: roofer Calendar/SMS flags verified read-only"

echo
echo "---- Onboarding Dry-Run Script Check ----"
node /root/roofleadhq/backend/scripts/onboard-roofer-dry-run.js \
  --business_name="Readiness Demo Roofing" \
  --owner_name="Readiness Demo Owner" \
  --owner_email="readiness-demo@example.com" \
  --owner_phone="+15551234567" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO"
echo "OK: onboarding dry-run script passed"

echo
echo "---- Onboarding Write Script Safe-Failure Check ----"
set +e
WRITE_CHECK_OUTPUT=$(node /root/roofleadhq/backend/scripts/onboard-roofer.js \
  --business_name="Readiness Write Safety Test" \
  --owner_full_name="Readiness Write Owner" \
  --owner_email="readiness-write@example.com" \
  --owner_cell_phone="+15551239991" \
  --business_phone="+15551239992" \
  --twilio_number="+15551239993" \
  --timezone="America/Denver" \
  --service_area="Denver, CO" \
  --city="Denver" \
  --state="CO" 2>&1)
WRITE_CHECK_EXIT=$?
set -e

echo "$WRITE_CHECK_OUTPUT"

if [ "$WRITE_CHECK_EXIT" -eq 0 ]; then
  echo "FAIL: write script should not succeed without --confirm_write=true"
  exit 1
fi

if echo "$WRITE_CHECK_OUTPUT" | grep -q "Dry-run only. Add --confirm_write=true to create the roofer."; then
  echo "OK: write script safely refused to write without confirmation"
else
  echo "FAIL: write script did not show expected safe-failure message"
  exit 1
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
