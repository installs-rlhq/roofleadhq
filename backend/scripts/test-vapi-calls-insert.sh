#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
ENDPOINT="$BASE_URL/webhooks/vapi/call-completed"

PASS_COUNT=0
FAIL_COUNT=0
LAST_BODY_FILE=""

run_test() {
  local name="$1"
  local expected_status="$2"
  local expected_body_text="$3"
  local payload="$4"

  local body_file
  body_file="$(mktemp)"
  LAST_BODY_FILE="$body_file"

  local status
  status="$(curl -sS -o "$body_file" -w "%{http_code}" \
    -X POST "$ENDPOINT" \
    -H "Content-Type: application/json" \
    -d "$payload")"

  echo
  echo "---- $name ----"
  echo "HTTP $status"
  cat "$body_file"
  echo

  if [[ "$status" != "$expected_status" ]]; then
    echo "FAIL: Expected HTTP $expected_status but got HTTP $status"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    return
  fi

  if ! grep -q "$expected_body_text" "$body_file"; then
    echo "FAIL: Expected response body to contain: $expected_body_text"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    return
  fi

  echo "PASS"
  PASS_COUNT=$((PASS_COUNT + 1))
}

PROVIDER_CALL_ID="vapi_insert_test_$(date +%s)"
MATCH_PROVIDER_CALL_ID="vapi_match_test_$(date +%s)"

KNOWN_ROOFER_PAYLOAD='{
  "provider_call_id": "'"$PROVIDER_CALL_ID"'",
  "caller_phone": "512-555-1234",
  "destination_number": "+15127123200",
  "call_started_at": "2026-06-05T10:00:00Z",
  "call_ended_at": "2026-06-05T10:03:15Z",
  "duration_seconds": 195,
  "transcript": "Test homeowner called about a roof leak.",
  "summary": "Homeowner requested help with a roof leak.",
  "outcome": "qualified_phone_lead",
  "appointment_booked": true,
  "appointment_requested": true,
  "recording_url": "https://example.com/test-recording.mp3"
}'

MATCH_EXISTING_LEAD_PAYLOAD='{
  "provider_call_id": "'"$MATCH_PROVIDER_CALL_ID"'",
  "caller_phone": "+15557654321",
  "destination_number": "+15127123200",
  "call_started_at": "2026-06-05T11:00:00Z",
  "call_ended_at": "2026-06-05T11:02:00Z",
  "duration_seconds": 120,
  "transcript": "Existing phone lead called again.",
  "summary": "Existing lead matched by phone.",
  "outcome": "matched_existing_lead",
  "appointment_booked": true,
  "appointment_requested": true,
  "recording_url": "https://example.com/test-recording-match.mp3"
}'

UNKNOWN_ROOFER_PAYLOAD='{
  "provider_call_id": "vapi_unknown_roofer_'"$(date +%s)"'",
  "caller_phone": "512-555-1234",
  "destination_number": "+15129999999",
  "appointment_booked": false,
  "appointment_requested": true
}'

MISSING_PROVIDER_CALL_ID_PAYLOAD='{
  "caller_phone": "512-555-1234",
  "destination_number": "+15127123200"
}'

echo "Testing Vapi calls insert against: $ENDPOINT"
echo "Provider call id: $PROVIDER_CALL_ID"
echo "Match provider call id: $MATCH_PROVIDER_CALL_ID"

run_test \
  "Known roofer payload should insert one calls row with no lead match" \
  "200" \
  '"inserted":true' \
  "$KNOWN_ROOFER_PAYLOAD"

run_test \
  "Existing lead phone should attach matched lead_id" \
  "200" \
  '"matched_lead_id":"82d8a020-71df-4c94-ae01-9a4fbfabf6c7"' \
  "$MATCH_EXISTING_LEAD_PAYLOAD"

run_test \
  "Duplicate provider_call_id should return duplicate true" \
  "200" \
  '"duplicate":true' \
  "$KNOWN_ROOFER_PAYLOAD"

run_test \
  "Unknown roofer destination should return 404" \
  "404" \
  '"error":"unknown_roofer"' \
  "$UNKNOWN_ROOFER_PAYLOAD"

run_test \
  "Missing provider_call_id should return 400" \
  "400" \
  '"error":"missing_required_field"' \
  "$MISSING_PROVIDER_CALL_ID_PAYLOAD"

rm -f "${LAST_BODY_FILE:-}"

echo
echo "---- SUMMARY ----"
echo "PASS: $PASS_COUNT"
echo "FAIL: $FAIL_COUNT"

if [[ "$FAIL_COUNT" -ne 0 ]]; then
  exit 1
fi

echo "All Vapi calls insert tests passed."
