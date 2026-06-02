# Daily Pilot Operations Checklist

Date: 2026-06-02

## Purpose

Daily checklist for monitoring the first paid RoofLeadHQ pilot safely.

Assumption:
Production SMS, Calendar, Vapi, Resend, and Lindy triggers remain disabled unless explicitly approved.

## Daily Review Cadence

- Morning check
- Midday check
- End-of-day check

## 1. Backend Health

Run:

curl -sS "http://127.0.0.1:3000/health" | python3 -m json.tool

Pass condition:

- Backend returns healthy response.

## 2. Dashboard Access

Run with dashboard token locally only.

Do not paste dashboard tokens into chat.

Pass condition:

- Token resolves correct roofer.
- Dashboard API returns metrics.
- No-token request remains blocked.

## 3. Manual Outreach Activity

Review:

- New manual leads
- Pause commands
- Stop commands
- Unknown sources
- Duplicate-looking homeowner numbers
- Workflow errors

Pass condition:

- Manual Outreach appears in dashboard.
- No homeowner SMS is sent unless separately approved.

## 4. Leads Needing Attention

Prioritize:

1. Homeowner replied but no inspection booked
2. Urgent roofing issue
3. Missing address
4. Failed or skipped follow-up
5. Manual Outreach lead needing human review

## 5. Workflow Errors

Review:

- workflow_error
- booking_failed
- message_failed
- followup_failed
- unmatched inbound message
- missing required fields

Action:

- Handle manually.
- Document issue.
- Do not enable automation as a shortcut.

## 6. Follow-Up Safety

Confirm:

- No unexpected homeowner SMS
- No unexpected roofer SMS
- No automatic Calendar events
- No live Vapi production actions
- No Resend/Lindy production triggers

## 7. Booked Inspections

Confirm:

- Homeowner name
- Phone
- Address
- Date/time
- Source
- Roofer awareness

If automation is disabled, update manually.

## 8. Client Update

Optional daily roofer update:

Quick RoofLeadHQ update:

New leads today:
Manual Outreach activity:
Leads needing attention:
Booked inspections:
Recommended next step:

## 9. End-of-Day Notes

Record:

- What worked
- What failed
- Leads needing tomorrow follow-up
- Client feedback
- Product blockers

## Hard Safety Rules

Do not enable without explicit approval:

- homeowner SMS
- roofer SMS
- Google Calendar creation
- live Vapi calls
- Resend production emails
- Lindy production automations

## Pilot Success Signals

- Leads are captured reliably
- Manual Outreach is visible
- Dashboard data is understandable
- Jason can monitor issues daily
- Roofer sees value before full automation is enabled
- No unsafe production actions happen unexpectedly
