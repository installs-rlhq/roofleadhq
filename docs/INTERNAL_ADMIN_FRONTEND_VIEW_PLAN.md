# Internal Admin Frontend View Plan

Date: 2026-06-01

## Purpose

Plan a simple internal-only frontend view for the read-only admin errors endpoint.

This is planning only. No frontend code yet.

## Existing Backend Endpoint

GET /api/internal/admin-errors

Verified response sections:

- kpi
- recentWorkflowErrors
- failedMessages
- stuckFollowups
- bookingFailures
- vapiReviewNeeded
- unmatchedMessages

## Proposed Frontend File

website/dashboard/internal-errors.html

## Scope

Create a private/internal dashboard page for Jason to quickly see workflow problems before pilot/client launch.

This page should help answer:

- What broke?
- Which roofer is affected?
- Which lead is affected?
- What needs review?
- Is the issue SMS, booking, follow-up, Vapi, or message matching?

## Safety Rules

- Read-only only.
- No action buttons.
- No retry buttons.
- No SMS buttons.
- No Vapi buttons.
- No Calendar buttons.
- No Resend buttons.
- No Lindy buttons.
- No workflow trigger language.
- No service role key in frontend.
- No secrets in frontend.
- Use only fetch to read the internal endpoint.
- Use textContent/createElement for API-rendered values.
- Do not use innerHTML for API values.
- Mask phone numbers.
- Do not expose raw payloads by default.

## MVP Layout

### Header

Title:

Internal Admin Errors

Subtitle:

Read-only workflow health view for RoofLeadHQ.

Small warning:

Internal tool only. This page does not send messages, trigger calls, create calendar events, or retry workflows.

### Controls

- Roofer ID input
- Limit select
  - 10
  - 25
  - 50
  - 100
- Refresh button

Refresh button only reloads data. It must not trigger workflow actions.

### KPI Row

Cards:

- Workflow Errors
- Failed Messages
- Overdue Follow-Ups
- Booking Failures
- Vapi Review Needed
- Unmatched Messages

### Sections

1. Recent Workflow Errors
2. Failed Messages
3. Stuck Or Overdue Follow-Ups
4. Booking Failures
5. Vapi Calls Needing Review
6. Unmatched Inbound Messages

## Table Columns

### Recent Workflow Errors

- Created
- Roofer
- Homeowner
- Event Type
- Summary

### Failed Messages

- Created
- Roofer
- Homeowner
- Channel
- Provider
- Direction
- Status
- Error

### Stuck Or Overdue Follow-Ups

- Due
- Roofer
- Homeowner
- Follow-Up Type
- Status
- Stopped Reason

### Booking Failures

- Created
- Roofer
- Homeowner
- Requested Time
- Failure Summary

### Vapi Calls Needing Review

- Created
- Roofer
- Homeowner
- Caller
- Provider Call ID
- Missing Fields
- Summary

### Unmatched Inbound Messages

- Created
- Roofer
- From
- To
- Channel
- Preview
- Reason

## Empty States

Each section should show a simple empty state:

No items found.

## Error State

If fetch fails:

Could not load internal admin errors. Check backend logs.

Do not show raw technical errors to normal page users.

## Recommended Styling

Use existing dashboard styling direction where practical:

- Simple cards
- Clear section headings
- Compact tables
- Status labels
- Mobile responsive stacking
- Plain-English labels

## Data Rendering Rules

Allowed:

- document.createElement
- element.textContent
- appendChild
- replaceChildren

Avoid for API values:

- innerHTML
- insertAdjacentHTML
- template strings injected as HTML

## Suggested API Call

/api/internal/admin-errors?roofer_id=<roofer_id>&limit=<limit>

Default roofer_id:

be7efc94-bd68-43af-81b2-dc7b869b42df

Default limit:

25

## Security Notes

Before public deployment, choose one:

1. Keep page unlinked and internal only.
2. Add a simple internal token gate.
3. Put behind hosting-level protection.
4. Move to authenticated admin area later.

Do not expose Supabase keys or service-role credentials in frontend.

## First Implementation Recommendation

Build one static HTML file first:

website/dashboard/internal-errors.html

Include:

- CSS inline or dashboard-consistent styling
- fetch call
- safe render helpers
- section render helpers
- no action buttons

Do not modify the customer-facing dashboard yet.

## Future Improvements

Later only:

- Date range filter
- Roofer dropdown
- Search
- Severity labels
- Copy diagnostic summary
- Link to lead detail view
- Auth protection

Do not add:

- Retry workflow
- Send SMS
- Start Vapi
- Create Calendar event
- Send Resend email
- Trigger Lindy

## Done Criteria For Future Frontend

- Page loads.
- Backend endpoint returns 200.
- KPI cards render.
- All six sections render.
- Empty states work.
- Fetch error state works.
- Phone numbers remain masked.
- API values use textContent/createElement.
- No write/action buttons exist.
- No external service triggers exist.
