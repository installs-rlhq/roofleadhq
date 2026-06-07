#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

SLUG="${1:-qa-wrapper-roofer}"
WORKSPACE_DIR=".roofleadhq/onboarding/${SLUG}"
SAMPLE_DIR="fixtures/roofer-dry-run-workspace/sample-roofer"

if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "FAIL: roofer slug must use lowercase letters, numbers, and hyphens only."
  exit 1
fi

echo "=== Roofer Dry-Run Onboarding QA Wrapper ==="

if [ -x scripts/verify-source-of-truth.sh ]; then
  scripts/verify-source-of-truth.sh
else
  echo "WARN: scripts/verify-source-of-truth.sh not found or not executable."
fi

rm -rf "$WORKSPACE_DIR"

scripts/onboard-roofer.sh "$SLUG"

required_files=(
  README.md
  intake.md
  safety-flags.env
  activation-flags.env
  workspace-metadata.env
  onboarding-checklist.md
)

for file in "${required_files[@]}"; do
  test -f "${WORKSPACE_DIR}/${file}" || {
    echo "FAIL: missing generated dry-run file: ${WORKSPACE_DIR}/${file}"
    exit 1
  }
done

grep -Fq "WORKSPACE_MODE=dry-run" "${WORKSPACE_DIR}/workspace-metadata.env" || {
  echo "FAIL: generated workspace is not dry-run mode."
  exit 1
}

required_false_flags=(
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
)

for flag in "${required_false_flags[@]}"; do
  grep -Fq "$flag" "${WORKSPACE_DIR}/safety-flags.env" || {
    echo "FAIL: missing disabled flag in safety-flags.env: $flag"
    exit 1
  }
  grep -Fq "$flag" "${WORKSPACE_DIR}/activation-flags.env" || {
    echo "FAIL: missing disabled flag in activation-flags.env: $flag"
    exit 1
  }
  grep -Fq "$flag" "${WORKSPACE_DIR}/workspace-metadata.env" || {
    echo "FAIL: missing disabled flag in workspace-metadata.env: $flag"
    exit 1
  }
done

required_safety_text=(
  "This workspace is planning-only."
  "Do not activate production."
  "Do not send live SMS."
  "Do not mutate Supabase."
  "Do not notify contractors or homeowners."
  "Production activation remains disabled"
)

for text in "${required_safety_text[@]}"; do
  grep -R -Fq "$text" "$WORKSPACE_DIR" || {
    echo "FAIL: missing safety text in generated workspace: $text"
    exit 1
  }
done

for file in README.md intake.md safety-flags.env activation-flags.env onboarding-checklist.md; do
  cmp -s "${SAMPLE_DIR}/${file}" "${WORKSPACE_DIR}/${file}" || {
    echo "FAIL: generated ${file} does not match known-good sample fixture."
    exit 1
  }
done

grep -Fq "ROOFER_SLUG=${SLUG}" "${WORKSPACE_DIR}/workspace-metadata.env" || {
  echo "FAIL: generated metadata does not include expected slug."
  exit 1
}

grep -Fq "WORKSPACE_MODE=dry-run" "${WORKSPACE_DIR}/workspace-metadata.env" || {
  echo "FAIL: generated metadata does not include dry-run mode."
  exit 1
}

rm -rf "$WORKSPACE_DIR"

if [ -d "$WORKSPACE_DIR" ]; then
  echo "FAIL: QA wrapper did not clean up temporary workspace."
  exit 1
fi

echo "PASS: roofer dry-run onboarding QA wrapper completed with production activation disabled."
