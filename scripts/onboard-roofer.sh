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

TEMPLATE_DIR="templates/roofer-dry-run-workspace"
BASE_DIR=".roofleadhq/onboarding/${ROOFER_SLUG}"

required_templates=(
  "${TEMPLATE_DIR}/README.md"
  "${TEMPLATE_DIR}/intake.md"
  "${TEMPLATE_DIR}/safety-flags.env"
)

for template in "${required_templates[@]}"; do
  if [ ! -f "$template" ]; then
    echo "FAIL: missing required dry-run onboarding template: $template"
    exit 1
  fi
done

mkdir -p "$BASE_DIR"

cp "${TEMPLATE_DIR}/README.md" "${BASE_DIR}/README.md"
cp "${TEMPLATE_DIR}/intake.md" "${BASE_DIR}/intake.md"
cp "${TEMPLATE_DIR}/safety-flags.env" "${BASE_DIR}/safety-flags.env"

# Backward-compatible filename for existing dry-run onboarding verifier.
cp "${TEMPLATE_DIR}/safety-flags.env" "${BASE_DIR}/activation-flags.env"

cat > "${BASE_DIR}/workspace-metadata.env" <<EOF_INNER
ROOFER_SLUG=${ROOFER_SLUG}
WORKSPACE_MODE=dry-run
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

Use `intake.md` as the source planning document for this roofer dry-run workspace.

## Required planning review

- Confirm company and owner/operator details.
- Confirm service area.
- Confirm services offered.
- Confirm emergency leak handling preference.
- Confirm storm damage and insurance claim handling preference.
- Confirm appointment booking preference.
- Confirm Calendar readiness status.
- Confirm lead source channels.
- Confirm missed-call recovery preference.
- Confirm manual review preference.
- Confirm reporting preference.

## Safety

Production activation remains disabled until explicit approval and Terminal 1 verification.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
EOF_INNER

echo "PASS: dry-run onboarding workspace created at ${BASE_DIR}"
echo "Templates copied from ${TEMPLATE_DIR}"
echo "No production action was activated."
