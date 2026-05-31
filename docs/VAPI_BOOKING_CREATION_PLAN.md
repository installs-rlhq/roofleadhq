# Vapi Booking Creation Plan

Status: Planning only  
Do not implement yet.

## Current Verified Vapi Behavior

- Inserts calls row
- Matches existing lead when exact roofer_id + phone match exists
- Creates new lead when no match exists
- Links calls.lead_id to matched or created lead
- Does not create bookings
- Does not create follow_ups
- Does not send SMS
- Does not create Calendar events
- Does not trigger Resend or Lindy

## Goal

When Vapi says appointment_booked = true, eventually create a booking record.

## Required Before Implementation

Read-only verify bookings table columns.

Likely needed fields:
- id
- roofer_id
- lead_id
- scheduled_start or appointment date/time equivalent
- status
- source_path/source_detail if available
- created_at
- updated_at

## Proposed Booking Rule

Only create booking when:
- lead_id exists
- appointment_booked = true
- appointment date/time exists and is valid
- no existing booking already exists for that lead/call

If appointment_booked = true but no appointment time exists:
- do not create booking yet
- keep lead status booked for now
- future step should flag for review

## Still Not Included

- Google Calendar event
- homeowner SMS
- roofer SMS
- Resend
- Lindy
- follow_ups
