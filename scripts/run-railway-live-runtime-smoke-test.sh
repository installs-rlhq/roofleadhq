#!/usr/bin/env bash
#
# RoofLeadHQ — Railway backend/API live runtime smoke test (READ-ONLY).
#
# Safe by construction:
#   - Tests GET /health with NO secret (public, unauthenticated).
#   - Optionally tests GET /api/leads/pending-review with a dashboard access token that is
#     read from a local-only env var (RLHQ_DASHBOARD_ACCESS_TOKEN) or prompted for SILENTLY.
#   - The token is NEVER echoed, never written to a file under version control, and is passed
#     to curl via a 0600 temp header file (so it is not visible in the process list / argv).
#   - Performs ONLY read-only GET requests. It NEVER POSTs takeover/release or any mutating route.
#   - Writes NO production data. Makes NO SMS / Twilio / Vapi / Resend / Lindy provider call.
#
# Usage:
#   scripts/run-railway-live-runtime-smoke-test.sh                 # /health only (default)
#   RLHQ_API_BASE_URL=https://... scripts/run-railway-live-runtime-smoke-test.sh
#   scripts/run-railway-live-runtime-smoke-test.sh --with-pending-review
#     # also runs the authenticated read-only pending-review check; prompts silently for the
#     # token unless RLHQ_DASHBOARD_ACCESS_TOKEN is already set in the local-only environment.
#
set -euo pipefail

BASE_URL="${RLHQ_API_BASE_URL:-https://roofleadhq-api-production.up.railway.app}"
WITH_PENDING_REVIEW=0
for arg in "$@"; do
  case "$arg" in
    --with-pending-review) WITH_PENDING_REVIEW=1 ;;
    -h|--help)
      grep -E '^#( |$)' "$0" | sed -E 's/^# ?//'
      exit 0
      ;;
    *) echo "Unknown argument: $arg" >&2; exit 2 ;;
  esac
done

FAILURES=0
pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1" >&2; FAILURES=$((FAILURES + 1)); }

echo "=== RoofLeadHQ Railway live runtime smoke test (read-only) ==="
echo "Base URL: $BASE_URL"
echo "Mode: GET-only. No POST. No mutation. No secrets echoed. No production data written."
echo ""

# ---------------------------------------------------------------------------
# 1. GET /health  (public, unauthenticated, no secret)
# ---------------------------------------------------------------------------
HEALTH_BODY="$(mktemp)"
trap 'rm -f "$HEALTH_BODY"' EXIT
HEALTH_CODE="$(curl -fsS -m 20 -o "$HEALTH_BODY" -w '%{http_code}' "$BASE_URL/health" || true)"
if [ "$HEALTH_CODE" = "200" ]; then
  pass "GET /health returned HTTP 200"
else
  fail "GET /health returned HTTP $HEALTH_CODE (expected 200)"
fi
if grep -q '"environment"[[:space:]]*:[[:space:]]*"production"' "$HEALTH_BODY" 2>/dev/null; then
  pass "GET /health reports environment=production"
else
  echo "Note: /health body did not clearly report environment=production (non-fatal)."
fi

# ---------------------------------------------------------------------------
# 2. (optional) GET /api/leads/pending-review  (authenticated, READ-ONLY)
# ---------------------------------------------------------------------------
if [ "$WITH_PENDING_REVIEW" -eq 1 ]; then
  echo ""
  echo "-- Authenticated read-only pending-review check --"

  # Unauthenticated control: must fail closed with 401.
  UNAUTH_CODE="$(curl -fsS -m 20 -o /dev/null -w '%{http_code}' "$BASE_URL/api/leads/pending-review" || true)"
  if [ "$UNAUTH_CODE" = "401" ]; then
    pass "Unauthenticated GET /api/leads/pending-review failed closed with HTTP 401"
  else
    fail "Unauthenticated GET /api/leads/pending-review returned HTTP $UNAUTH_CODE (expected 401)"
  fi

  # Token: local-only env var, else SILENT prompt. Never echoed.
  TOKEN="${RLHQ_DASHBOARD_ACCESS_TOKEN:-}"
  if [ -z "$TOKEN" ]; then
    if [ -t 0 ]; then
      printf 'Enter dashboard access token (input hidden): ' >&2
      read -rs TOKEN
      printf '\n' >&2
    else
      fail "No RLHQ_DASHBOARD_ACCESS_TOKEN set and no TTY to prompt; skipping authenticated check"
      TOKEN=""
    fi
  fi

  if [ -n "$TOKEN" ]; then
    # Pass the token via a 0600 temp header file so it never appears in argv / process list.
    HDR_FILE="$(mktemp)"
    chmod 600 "$HDR_FILE"
    printf 'x-dashboard-access-token: %s\n' "$TOKEN" > "$HDR_FILE"
    unset TOKEN
    AUTH_BODY="$(mktemp)"
    AUTH_CODE="$(curl -fsS -m 20 -H @"$HDR_FILE" -o "$AUTH_BODY" -w '%{http_code}' "$BASE_URL/api/leads/pending-review" || true)"
    rm -f "$HDR_FILE"
    if [ "$AUTH_CODE" = "200" ]; then
      pass "Authenticated GET /api/leads/pending-review returned HTTP 200"
    else
      fail "Authenticated GET /api/leads/pending-review returned HTTP $AUTH_CODE (expected 200)"
    fi
    if grep -q '"schemaReady"[[:space:]]*:[[:space:]]*true' "$AUTH_BODY" 2>/dev/null; then
      pass "pending-review reports schemaReady=true"
    else
      echo "Note: pending-review body did not report schemaReady=true (gate may be off; non-fatal)."
    fi
    # Show only the structural shape, never any lead/PII content.
    COUNT="$(grep -oE '"count"[[:space:]]*:[[:space:]]*[0-9]+' "$AUTH_BODY" 2>/dev/null | head -1 || true)"
    [ -n "$COUNT" ] && echo "pending-review $COUNT"
    rm -f "$AUTH_BODY"
  fi
else
  echo ""
  echo "Note: pending-review check skipped. Re-run with --with-pending-review to include it."
fi

echo ""
if [ "$FAILURES" -gt 0 ]; then
  echo "FAIL: Railway live runtime smoke test failed ($FAILURES check(s))." >&2
  exit 1
fi
echo "PASS: Railway live runtime smoke test passed (read-only)."
echo "mutating_calls=0  sms_sent=0  provider_calls=0  production_data_written=0  token_echoed=0"
