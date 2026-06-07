#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

if [ "$#" -lt 1 ]; then
  echo "Usage: scripts/onboard-roofer.sh <roofer-slug>"
  echo "Example: scripts/onboard-roofer.sh acme-roofing"
  exit 1
fi

ROOFER_SLUG="$1"

if [[ ! "$ROOFER_SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "FAIL: roofer slug must use lowercase letters, numbers, and hyphens only."
  exit 1
fi

BASE_DIR=".roofleadhq/onboarding/${ROOFER_SLUG}"
mkdir -p "$BASE_DIR"

cat > "${BASE_DIR}/README.md" <<EOF_INNER
# Roofer Onboarding Dry-Run Workspace

Roofer slug: ${ROOFER_SLUG}

This workspace is planning-only.

No production SMS, Calendar booking, Vapi, Supabase write, contractor notification, homeowner notification, cron, scheduler, dispatcher, or public route activation was performed.
EOF_INNER

cat > "${BASE_DIR}/activation-flags.env" <<'EOF_INNER'
SMS_ACTIVATION=false
CALENDAR_ACTIVATION=false
VAPI_ACTIVATION=false
SUPABASE_WRITES=false
CONTRACTOR_NOTIFICATION=false
HOMEOWNER_NOTIFICATION=false
CRON_ACTIVATION=false
SCHEDULER_ACTIVATION=false
DISPATCHER_ACTIVATION=false
PUBLIC_ROUTE_ACTIVATION=false
EOF_INNER

cat > "${BASE_DIR}/onboarding-checklist.md" <<'EOF_INNER'
# Onboarding Checklist

- Company name:
- Service area:
- Office phone:
- Lead sources:
- Booking preferences:
- Calendar preference:
- Follow-up preference:
- Reporting preference:
- Emergency escalation preference:
- Contractor notification preference:

## Safety

Production activation remains disabled until explicit approval and Terminal 1 verification.
EOF_INNER

echo "PASS: dry-run onboarding workspace created at ${BASE_DIR}"
echo "No production action was activated."
