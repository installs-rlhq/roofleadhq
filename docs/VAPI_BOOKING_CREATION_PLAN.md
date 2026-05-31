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

## Read-Only Bookings Schema Verification — 2026-05-31

Verified bookings columns:

- id
- roofer_id
- lead_id
- appointment_type
- booked_time
- calendar_event_id
- calendar_provider
- status
- confirmation_sent_at
- reminder_sent_at
- is_qualified
- qualification_status
- qualification_reason
- counts_toward_confidence_promise
- notes
- created_at
- updated_at

Safe first booking insert later should use:

- roofer_id
- lead_id
- appointment_type = site_visit
- booked_time
- calendar_provider = vapi
- status = scheduled
- is_qualified = true
- qualification_status = qualified
- qualification_reason
- counts_toward_confidence_promise = true
- notes

## Booking Creation Implementation Verification — 2026-05-31

Verified commit:

- 913f847 feat(vapi): create booking for scheduled calls

Verified behavior:

- Vapi call inserts still pass.
- Existing lead matching still passes.
- New lead creation still passes.
- Duplicate provider_call_id still returns duplicate true.
- Unknown roofer still returns 404 unknown_roofer.
- Missing provider_call_id still returns 400 missing_required_field.
- When appointment_booked = true and appointment_time exists, a bookings row is created.
- Test booking_id returned successfully: 4ecbc0a1-4d7d-4283-ba16-7c3482dee929.
- Booking creation remains gated by appointment_time.
- No SMS, Google Calendar, Resend, or Lindy production triggers were enabled.

