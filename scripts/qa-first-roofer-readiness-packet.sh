#!/usr/bin/env bash
set -euo pipefail

cd /root/roofleadhq

SLUG="${1:-first-roofer-readiness-packet}"
WORKSPACE_DIR=".roofleadhq/onboarding/${SLUG}"

if [[ ! "$SLUG" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "FAIL: roofer slug must use lowercase letters, numbers, and hyphens only."
  exit 1
fi

echo "=== First Roofer Dry-Run Readiness Packet QA ==="

scripts/verify-source-of-truth.sh

scripts/qa-roofer-dry-run-onboarding.sh "$SLUG"

required_docs=(
  docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md
  docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md
  docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md
)

for doc in "${required_docs[@]}"; do
  test -f "$doc" || {
    echo "FAIL: missing required first roofer readiness packet doc: $doc"
    exit 1
  }
done

required_verifiers=(
  backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js
  backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js
  backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js
)

for verifier in "${required_verifiers[@]}"; do
  test -f "$verifier" || {
    echo "FAIL: missing required first roofer readiness packet verifier: $verifier"
    exit 1
  }
  node --check "$verifier"
  node "$verifier"
done

grep -Fq "PASS: dry-run onboarding workspace is ready for founder/operator manual review." docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md || {
  echo "FAIL: acceptance checklist missing PASS decision language."
  exit 1
}

grep -Fq "HOLD: dry-run onboarding workspace needs correction before review." docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md || {
  echo "FAIL: acceptance checklist missing HOLD decision language."
  exit 1
}

grep -Fq "BLOCKED: production activation, data mutation, notification, route, credential, or approval risk was found." docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md || {
  echo "FAIL: acceptance checklist missing BLOCKED decision language."
  exit 1
}

grep -Fq "PROCEED TO MANUAL SETUP PLANNING" docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md || {
  echo "FAIL: first roofer setup packet missing proceed decision language."
  exit 1
}

grep -Fq "HOLD FOR MISSING INFORMATION" docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md || {
  echo "FAIL: first roofer setup packet missing hold decision language."
  exit 1
}

grep -Fq "BLOCKED BY SAFETY RISK" docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md || {
  echo "FAIL: first roofer setup packet missing blocked decision language."
  exit 1
}

required_flags=(
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
)

for flag in "${required_flags[@]}"; do
  grep -R -Fq "$flag" \
    docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md \
    docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md \
    docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md || {
      echo "FAIL: missing required dry-run flag across readiness packet docs: $flag"
      exit 1
    }
done

required_safety_text=(
  "Production activation remains disabled."
  "Do not activate production."
  "Do not send live SMS."
  "Do not mutate Supabase."
  "Do not notify contractors or homeowners."
  "No secrets are exposed."
)

for text in "${required_safety_text[@]}"; do
  grep -R -Fq "$text" \
    docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md \
    docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md || {
      echo "FAIL: missing required safety text across readiness packet docs: $text"
      exit 1
    }
done

if [ -d "$WORKSPACE_DIR" ]; then
  echo "FAIL: readiness packet QA left temporary workspace behind: $WORKSPACE_DIR"
  exit 1
fi

echo "PASS: first roofer dry-run readiness packet QA completed with production activation disabled."
