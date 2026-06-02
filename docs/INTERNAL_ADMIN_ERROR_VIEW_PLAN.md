# Internal Admin Error View Plan

Date: 2026-06-01

## Purpose

Create a simple internal-only view so Jason can quickly see RoofLeadHQ workflow problems before pilot/client launch.

This is planning only. No production workflow triggers are enabled by this document.

## Safety Rules

- Internal/admin only.
- Read-only view.
- No homeowner SMS.
- No roofer SMS.
- No Calendar creation.
- No Vapi calls.
- No Resend sends.
- No Lindy triggers.
- No workflow retries from the UI.
- No live action buttons.
- Display data safely using textContent/createElement only.

## Tables To Read

Primary tables:

- workflow_events
- messages
- follow_ups
- bookings
- calls
- leads
- roofers

## View Sections

### 1. Recent Workflow Errors

Source:

- workflow_events

Filter:

- event_type = workflow_error
- created_at desc
- last 50 events

Show:

- created_at
- roofer/business
- lead/homeowner if linked
- event_type
- error summary
- metadata excerpt
- recommended manual next step

### 2. Failed Messages

Source:

- messages

Filter:

- status = failed
- created_at desc
- last 50 messages

Show:

- created_at
- roofer/business
- lead/homeowner
- channel
- direction
- provider
- error/status detail
- message intent/template if available

### 3. Failed Or Stuck Follow-Ups

Source:

- follow_ups

Filters:

- status = failed
- status = scheduled and due_at < now()
- status = skipped with stopped_reason requiring review

Show:

- due_at
- roofer/business
- lead/homeowner
- followup_type
- status
- stopped_reason
- next safe manual action

### 4. Booking Failures

Source:

- workflow_events
- bookings

Filters:

- workflow_events.event_type = booking_failed
- bookings.status = failed if available

Show:

- created_at
- roofer/business
- lead/homeowner
- requested time
- failure reason
- calendar/provider metadata if available

### 5. Vapi Calls With Missing Fields

Source:

- calls
- workflow_events

Filters:

- calls with missing caller_phone, summary, outcome, or lead_id
- workflow_events event_type = workflow_error and metadata references vapi

Show:

- created_at
- roofer/business
- caller phone
- provider_call_id
- missing fields
- call summary if available
- recommended review step

### 6. Unmatched Inbound Messages

Source:

- messages
- workflow_events

Filters:

- inbound messages with no lead_id
- workflow_events event_type = unmatched_inbound_message if implemented later

Show:

- created_at
- roofer/business if known
- from phone
- to phone
- body preview
- reason unmatched

## MVP Dashboard Layout

Simple internal page:

- KPI row:
  - Workflow Errors
  - Failed Messages
  - Overdue Follow-Ups
  - Booking Failures
  - Vapi Review Needed
  - Unmatched Messages

- Below KPI row:
  - Recent Workflow Errors table
  - Failed Messages table
  - Stuck Follow-Ups table
  - Booking Failures table
  - Vapi Review Needed table
  - Unmatched Messages table

## Recommended Backend Endpoint

Future endpoint:

GET /api/internal/admin-errors

Query params:

- roofer_id optional
- limit optional, default 50
- since optional

Response shape:

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

## Recommended Frontend Location

Future file option:

website/dashboard/internal-errors.html

or add internal section later only if protected.

For now, plan only.

## Security Notes

Before building:

- Confirm internal access strategy.
- Do not expose service role key client-side.
- Do not expose this page publicly without protection.
- Do not include raw payloads by default if they may contain private homeowner data.
- Use short metadata excerpts and expand later only if needed.

## First Implementation Recommendation

Build backend endpoint first as read-only.

Then build internal frontend view after endpoint is verified.

Do not add retry buttons, SMS buttons, Vapi buttons, Calendar buttons, Resend buttons, or Lindy buttons in MVP.

## Done Criteria For Future MVP

- Endpoint returns 200.
- Endpoint is read-only.
- No external services are triggered.
- Dashboard renders using safe DOM only.
- Empty states are clear.
- Recent problems are visible in under 10 seconds.
- No public/customer-facing action is possible from the view.
