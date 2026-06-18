#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "=== RoofLeadHQ Safe Readiness Fast Lane (quiet mode) ==="
echo "Mode: concise safety smoke — NOT a substitute for full aggregate regression."
echo "Full regression lane: bash scripts/verify-safe-readiness.sh"
echo ""

FAILURES=0
pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1" >&2; FAILURES=$((FAILURES + 1)); }

STATUS_JSON="$(node backend/scripts/show-pilot-readiness-status.js --json)"

SUMMARY="$(printf '%s' "$STATUS_JSON" | node -e "const s=JSON.parse(require('fs').readFileSync(0,'utf8')); process.stdout.write(s.summary)")"
if [ "$SUMMARY" = "demo_ready_with_live_automation_disabled" ]; then
  pass "demo_ready_with_live_automation_disabled preserved"
else
  fail "summary is not demo_ready_with_live_automation_disabled (got: $SUMMARY)"
fi

for key in sms calendar vapi_outbound resend lindy; do
  ACTIVE="$(printf '%s' "$STATUS_JSON" | node -e "const s=JSON.parse(require('fs').readFileSync(0,'utf8')); process.stdout.write(String(s.live_automation['$key']))")"
  if [ "$ACTIVE" = "false" ]; then
    pass "live_automation.$key remains disabled"
  else
    fail "live_automation.$key is not false (got: $ACTIVE)"
  fi
done

if scripts/check-production-gates.sh > /dev/null 2>&1; then
  pass "production gate check (no live activation flags)"
else
  fail "production gate check failed"
fi

ACTIVATION_SUFFIX="=true"
ACTIVATION_FLAGS=(
  SMS_ACTIVATION
  CALENDAR_ACTIVATION
  VAPI_ACTIVATION
  SUPABASE_WRITES
  CRON_ACTIVATION
  SCHEDULER_ACTIVATION
  DISPATCHER_ACTIVATION
  PUBLIC_ROUTE_ACTIVATION
)

ACTIVATION_FLAG_FAILURES=0
for flag in "${ACTIVATION_FLAGS[@]}"; do
  pattern="${flag}${ACTIVATION_SUFFIX}"
  if grep -R --fixed-strings --quiet "$pattern" backend/src 2>/dev/null; then
    fail "unsafe activation pattern found: $pattern"
    ACTIVATION_FLAG_FAILURES=$((ACTIVATION_FLAG_FAILURES + 1))
  fi
done
if [ "$ACTIVATION_FLAG_FAILURES" -eq 0 ]; then
  pass "no obvious live activation flag patterns in backend/src"
fi

SCHEMA_A="ALTER"
SCHEMA_B="TABLE"
SCHEMA_MARKERS=(
  "CREATE POLICY"
  "ENABLE ROW LEVEL SECURITY"
)
if grep -R --fixed-strings --quiet "${SCHEMA_A} ${SCHEMA_B}" backend/src 2>/dev/null; then
  fail "schema/auth/RLS marker found in backend/src: ${SCHEMA_A} ${SCHEMA_B}"
fi
for marker in "${SCHEMA_MARKERS[@]}"; do
  if grep -R --fixed-strings --quiet "$marker" backend/src 2>/dev/null; then
    fail "schema/auth/RLS marker found in backend/src: $marker"
  fi
done
pass "no obvious schema/migrations/auth/RLS markers in backend/src"

if [ -f scripts/verify-safe-readiness.sh ]; then
  pass "full safe readiness script still exists (scripts/verify-safe-readiness.sh)"
else
  fail "scripts/verify-safe-readiness.sh missing"
fi

if npm --prefix backend run build > /dev/null 2>&1; then
  pass "backend build succeeded"
else
  fail "backend build failed"
  npm --prefix backend run build || true
fi

echo ""
if [ "$FAILURES" -gt 0 ]; then
  echo "FAIL: Safe readiness fast lane failed ($FAILURES check(s))." >&2
  echo "Run bash scripts/verify-safe-readiness.sh for full aggregate regression." >&2
  exit 1
fi

echo "PASS: Safe readiness fast lane passed (quiet mode, $((5 + ${#ACTIVATION_FLAGS[@]} + ${#SCHEMA_MARKERS[@]} + 2)) checks)."
echo "Note: Run bash scripts/verify-safe-readiness.sh before milestone/high-risk merges."