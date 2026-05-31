#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://127.0.0.1:3000}"
ENDPOINT="$BASE_URL/webhooks/vapi/call-completed"

PASS_COUNT=0
FAIL_COUNT=0

run_test() {
  local name="$1"
  local expected_status="$2"
  local expected_body_text="$3"
  local payload="$4"

  local body_file
  body_file="$(mktemp)"

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
    rm -f "$body_file"
    return
  fi

  if ! grep -q "$expected_body_text" "$body_file"; then
    echo "FAIL: Expected response body to contain: $expected_body_text"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    rm -f "$body_file"
    return
  fi

  echo "PASS"
  PASS_COUNT=$((PASS_COUNT + 1))
  rm -f "$body_file"
}

echo "Testing Vapi dry-run payload shapes against: $ENDPOINT"

run_test \
  "Simple dry-run payload should find known roofer" \
  "200" \
  '"roofer_id":"be7efc94-bd68-43af-81b2-dc7b869b42df"' \
  '{
    "provider_call_id": "dryrun_simple_shape_001",
    "caller_phone": "512-555-1234",
    "destination_number": "+15127123200",
    "appointment_booked": true,
    "appointment_requested": true,
    "appointment_time": "2026-06-05T10:00:00Z"
  }'

run_test \
  "Realistic Vapi message.call payload should find known roofer" \
  "200" \
  '"provider_call_id":"dryrun_vapi_nested_shape_001"' \
  '{
    "message": {
      "type": "end-of-call-report",
      "call": {
        "id": "dryrun_vapi_nested_shape_001",
        "customer": {
          "number": "512-555-1234"
        },
        "phoneNumber": {
          "number": "+15127123200"
        }
      },
      "analysis": {
        "structuredData": {
          "appointment_booked": true,
          "appointment_requested": true,
          "appointment_time": "2026-06-05T10:00:00Z"
        }
      }
    }
  }'

run_test \
  "Alternate nested message fields should find known roofer" \
  "200" \
  '"roofer_destination_number":"+15127123200"' \
  '{
    "message": {
      "providerCallId": "dryrun_vapi_alt_shape_001",
      "callerPhone": "(512) 555-1234",
      "destinationNumber": "512-712-3200",
      "structuredData": {
        "appointmentBooked": "yes",
        "appointmentRequested": "yes",
        "preferredTime": "2026-06-06T14:30:00Z"
      }
    }
  }'

run_test \
  "Unknown roofer destination should return 404" \
  "404" \
  '"error":"unknown_roofer"' \
  '{
    "provider_call_id": "dryrun_unknown_roofer_shape_001",
    "caller_phone": "512-555-1234",
    "destination_number": "+15129999999",
    "appointment_booked": false,
    "appointment_requested": true
  }'

run_test \
  "Missing provider_call_id should return 400" \
  "400" \
  '"error":"missing_required_field"' \
  '{
    "caller_phone": "512-555-1234",
    "destination_number": "+15127123200"
  }'

echo
echo "---- SUMMARY ----"
echo "PASS: $PASS_COUNT"
echo "FAIL: $FAIL_COUNT"

if [[ "$FAIL_COUNT" -ne 0 ]]; then
  exit 1
fi

echo "All Vapi dry-run payload shape tests passed."
