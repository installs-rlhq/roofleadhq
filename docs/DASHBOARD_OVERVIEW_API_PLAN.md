# Dashboard Overview API Plan

## Goal

Create a read-only dashboard overview API for onboarded roofers using Supabase data.

Endpoint:

GET /api/dashboard/overview?roofer_id=<roofer_id>

Fallback test roofer:

be7efc94-bd68-43af-81b2-dc7b869b42df

## Scope

Read-only only.

No writes.
No SMS.
No Calendar.
No Vapi triggers.
No Resend.
No Lindy.

## Current State

Manual Outreach dashboard data already has a live API:

GET /api/dashboard/manual-outreach

Main dashboard sections are still mostly static frontend demo data inside:

website/dashboard/index.html

Current static sections:
- metrics
- leads needing attention
- upcoming booked inspections
- top lead sources
- follow-up performance
- recommended actions

## New Endpoint

Add to:

backend/src/routes/dashboard.ts

Route:

GET /overview

## Data Returned

Return JSON:

{
  "metrics": [],
  "leadsNeedingAttention": [],
  "upcomingInspections": [],
  "topSources": [],
  "followUpPerformance": {},
  "recommendedActions": []
}

## Metrics

Use tables:
- leads
- bookings
- follow_ups
- messages
- calls

Initial metrics:
1. New Leads This Month
2. Booked Inspections This Month
3. Booking Rate
4. Leads Needing Attention
5. Follow-Ups Scheduled
6. Phone Leads
7. Manual Outreach Leads
8. Digital Leads

## Leads Needing Attention

From leads where:
- roofer_id matches
- status = needs_attention

Return:
- id
- homeowner_name
- phone masked
- source_path
- source_detail
- issue_description
- urgency
- status
- created_at
- updated_at

Limit 8.

## Upcoming Inspections

From bookings joined to leads where:
- roofer_id matches
- booked_time >= now
- status = scheduled

Return:
- booking_id
- lead_id
- homeowner_name
- address
- issue_description
- booked_time
- source_path
- source_detail
- confirmation status
- reminder status

Limit 8.

## Top Sources

Group leads by:
- source_path
- source_detail

Calculate:
- lead count
- booked count
- booking rate

## Follow-Up Performance

Return:
- scheduled
- sent
- skipped
- failed

From follow_ups.

## Recommended Actions

Rules-based only:
- If needs_attention > 0: "Review leads needing attention today."
- If manual outreach leads > 0: "Keep sending marketplace/referral leads into RoofLeadHQ."
- If phone leads with needs_attention > 0: "Review phone leads that requested callbacks."
- If follow_up failed > 0: "Review failed follow-ups."

## Safety

This endpoint must not:
- send messages
- create calendar events
- trigger Vapi
- write records
- expose service role secrets
- expose unmasked homeowner phone numbers in list responses

## Test Commands

curl -sS "http://127.0.0.1:3000/api/dashboard/overview?roofer_id=be7efc94-bd68-43af-81b2-dc7b869b42df" | jq

cd /root/roofleadhq/backend
/root/.local/bin/npm run build
