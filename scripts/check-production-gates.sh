#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ production gate check =="
echo "Repo: $ROOT_DIR"

required_files=(
  "docs/FIRST_PAID_LAUNCH_PRODUCTION_GATE_CHECK_SCRIPT_PACKET.md"
  "docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md"
  "docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md"
  "docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md"
  "backend/src/services/sms-production-send-intent-bridge.service.ts"
  "backend/scripts/verify-sms-production-send-intent-bridge.js"
  "scripts/onboard-roofer.sh"
  "scripts/verify-roofer-dry-run-onboarding-workspace.sh"
  "scripts/verify-roofer-onboarding-readiness.sh"
)

for file in "${required_files[@]}"; do
  test -f "$file" || {
    echo "Missing required file: $file" >&2
    exit 1
  }
done

required_strings=(
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
  "Do not activate production"
  "Do not send live SMS"
  "Do not mutate Supabase"
  "Step 66"
  "9ddfebd"
  "a01693d"
)

for needle in "${required_strings[@]}"; do
  if ! grep -R --fixed-strings --quiet "$needle" \
    docs/FIRST_PAID_LAUNCH_PRODUCTION_GATE_CHECK_SCRIPT_PACKET.md \
    docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md \
    scripts/onboard-roofer.sh \
    scripts/verify-roofer-dry-run-onboarding-workspace.sh \
    backend/src/services/sms-production-send-intent-bridge.service.ts \
    backend/scripts/verify-sms-production-send-intent-bridge.js 2>/dev/null; then
    echo "Missing required production gate string: $needle" >&2
    exit 1
  fi
done

blocked_enabled_patterns=(
  "SMS_ACTIVATION=true"
  "CALENDAR_ACTIVATION=true"
  "VAPI_ACTIVATION=true"
  "SUPABASE_WRITES=true"
  "CONTRACTOR_NOTIFICATION=true"
  "HOMEOWNER_NOTIFICATION=true"
  "CRON_ACTIVATION=true"
  "SCHEDULER_ACTIVATION=true"
  "DISPATCHER_ACTIVATION=true"
  "PUBLIC_ROUTE_ACTIVATION=true"
)

blocked_language_patterns=(
  "live Twilio send enabled"
  "production Supabase writes enabled"
  "Vapi production webhook enabled"
  "Retell route enabled"
  "contractor notifications enabled"
  "homeowner notifications enabled"
  "cron activation enabled"
  "scheduler activation enabled"
  "dispatcher activation enabled"
  "public production route enabled"
)

search_targets=(
  docs
  backend/src
  backend/scripts
  scripts
)

exclude_paths=(
  --exclude="check-production-gates.sh"
  --exclude="verify-first-paid-launch-production-gate-check-script-packet-readonly.js"
)

for pattern in "${blocked_enabled_patterns[@]}"; do
  if grep -R --fixed-strings --line-number "${exclude_paths[@]}" "$pattern" "${search_targets[@]}" 2>/dev/null; then
    echo "Blocked production activation flag found: $pattern" >&2
    exit 1
  fi
done

for pattern in "${blocked_language_patterns[@]}"; do
  if grep -R --fixed-strings --line-number "${exclude_paths[@]}" "$pattern" "${search_targets[@]}" 2>/dev/null; then
    echo "Blocked production activation language found: $pattern" >&2
    exit 1
  fi
done

echo "Production gate check passed: no production activation flags or blocked language found."
