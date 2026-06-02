# Internal Admin Errors Endpoint Plan

Date: 2026-06-01

## Purpose

Plan a read-only backend endpoint that powers the future internal admin/error view.

This is planning only. No code changes. No production workflow triggers.

## Proposed Endpoint

GET /api/internal/admin-errors

## Scope

Read-only aggregation endpoint for internal visibility into:

- workflow errors
- failed messages
- overdue/stuck follow-ups
- booking failures
- Vapi calls needing review
- unmatched inbound messages

## Safety Rules

- Read-only only.
- No inserts.
- No updates.
- No deletes.
- No retries.
- No homeowner SMS.
- No roofer SMS.
- No Calendar creation.
- No Vapi calls.
- No Resend sends.
- No Lindy triggers.
- No service role key exposed client-side.
- No raw payload dump by default.

## Query Parameters

Optional:

- roofer_id
- limit
- since

Defaults:

- limit = 50
- since = last 30 days if omitted

## Response Shape

{
  "kpi": {
    "workflowErrors": 0,
    "failedMessages": 0,
    "overdueFollowups": 0,
    "bookingFailures": 0,
    "vapiReviewNeeded": 0,
    "unmatchedMessages": 0
  },
  "recentWorkflowErrors": [],
  "failedMessages": [],
  "stuckFollowups": [],
  "bookingFailures": [],
  "vapiReviewNeeded": [],
  "unmatchedMessages": []
}

## Tables Read

- workflow_events
- messages
- follow_ups
- bookings
- calls
- leads
- roofers

## Data Rules

### recentWorkflowErrors

Source:

- workflow_events

Filter:

- event_type = workflow_error
- optional roofer_id
- created_at >= since
- order created_at desc
- limit

Return:

- id
- created_at
- roofer_id
- business_name
- lead_id
- homeowner_name
- event_type
- summary
- metadata_excerpt

### failedMessages

Source:

- messages

Filter:

- status = failed
- optional roofer_id
- created_at >= since
- order created_at desc
- limit

Return:

- id
- created_at
- roofer_id
- business_name
- lead_id
- homeowner_name
- channel
- direction
- provider
- status
- error_summary

### stuckFollowups

Source:

- follow_ups

Filter:

- status = failed
- OR status = scheduled AND due_at < now()
- OR status = skipped AND stopped_reason is not null
- optional roofer_id
- order due_at asc
- limit

Return:

- id
- due_at
- roofer_id
- business_name
- lead_id
- homeowner_name
- followup_type
- status
- stopped_reason

### bookingFailures

Source:

- workflow_events
- bookings

Filter:

- workflow_events.event_type = booking_failed
- OR bookings.status = failed if column/status exists
- optional roofer_id
- created_at >= since
- order created_at desc
- limit

Return:

- id
- created_at
- roofer_id
- business_name
- lead_id
- homeowner_name
- requested_time
- failure_summary

### vapiReviewNeeded

Source:

- calls
- workflow_events

Filter:

- provider = vapi
- AND one or more important fields missing:
  - caller_phone
  - summary
  - outcome
  - lead_id
- OR workflow_events.event_type = workflow_error and metadata references vapi
- optional roofer_id
- order created_at desc
- limit

Return:

- id
- created_at
- roofer_id
- business_name
- lead_id
- caller_phone
- provider_call_id
- missing_fields
- summary

### unmatchedMessages

Source:

- messages
- workflow_events

Filter:

- direction = inbound
- lead_id is null
- optional roofer_id
- created_at >= since
- order created_at desc
- limit

Return:

- id
- created_at
- roofer_id
- business_name
- from_phone
- to_phone
- channel
- body_preview
- reason

## Recommended Files For Future Implementation

Possible backend files:

- backend/src/routes/internal-admin.ts
- backend/src/services/internal-admin-errors.service.ts

Possible app registration:

- backend/src/index.ts

Do not implement yet.

## Backend Build Requirement After Future Code

Run:

cd /root/roofleadhq/backend
/root/.local/bin/npm run build

## Test Plan For Future Implementation

Use curl only. No browser needed first.

Example:

curl -sS "http://127.0.0.1:3000/api/internal/admin-errors?roofer_id=be7efc94-bd68-43af-81b2-dc7b869b42df" | python3 -m json.tool

Expected:

- HTTP 200
- kpi object exists
- six arrays exist
- no external action triggered
- no SMS sent
- no Calendar created
- no Vapi called
- no Resend sent
- no Lindy triggered

## Implementation Recommendation

Build backend endpoint first.

Keep the first version simple:

1. One route.
2. One service.
3. Read-only Supabase queries.
4. No frontend yet.
5. No auth complexity until internal access strategy is chosen.
6. No raw payloads in response.
7. No action buttons or retry actions.

## Open Questions Before Code

1. Should endpoint be localhost/admin-only first?
2. Should it require a simple internal token header?
3. Should it return all roofers or require roofer_id?
4. Should metadata excerpts be truncated to 300 characters?
5. Should PII be partially masked in the first version?

## Done Criteria For Future Endpoint

- Endpoint returns 200.
- Endpoint is read-only.
- Endpoint does not trigger external services.
- Limit and roofer_id filters work.
- Response shape matches plan.
- Backend build passes.
- Curl verification passes.
- No frontend is added until backend is verified.
