#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

if [ "$#" -lt 1 ]; then
  echo "Usage: scripts/verify-roofer-dry-run-onboarding-workspace.sh <roofer-slug>"
  exit 1
fi

ROOFER_SLUG="$1"
BASE_DIR=".roofleadhq/onboarding/${ROOFER_SLUG}"
FLAGS_FILE="${BASE_DIR}/activation-flags.env"

test -f "${BASE_DIR}/README.md"
test -f "${BASE_DIR}/onboarding-checklist.md"
test -f "${FLAGS_FILE}"

required_disabled_flags=(
  "SMS_ACTIVATION=false"
  "CALENDAR_ACTIVATION=false"
  "VAPI_ACTIVATION=false"
  "SUPABASE_WRITES=false"
  "CONTRACTOR_NOTIFICATION=false"
  "HOMEOWNER_NOTIFICATION=false"
  "CRON_ACTIVATION=false"
  "SCHEDULER_ACTIVATION=false"
  "DISPATCHER_ACTIVATION=false"
  "PUBLIC_ROUTE_ACTIVATION=false"
)

for flag in "${required_disabled_flags[@]}"; do
  grep -qx "$flag" "$FLAGS_FILE"
done

grep -q "No production action was activated" "${BASE_DIR}/README.md"
grep -q "Production activation remains disabled" "${BASE_DIR}/onboarding-checklist.md"

echo "PASS: roofer dry-run onboarding workspace verified for ${ROOFER_SLUG}"
echo "PASS: all production activation flags remain disabled"
