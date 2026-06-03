# SMS Safety Service Implementation Plan

Date: 2026-06-02

## Purpose

Plan a dedicated SMS safety service before any outbound homeowner SMS implementation.

This is planning only.

No SMS sending is enabled by this document.

## Goal

Create a safe internal service that can answer:

Should RoofLeadHQ send this homeowner SMS right now?

The service should return either:

- allowed
- blocked
- rescheduled
- failed_validation

## Proposed Future File

`backend/src/services/sms-safety.service.ts`

## Required Inputs

- roofer_id
- lead_id
- follow_up_id
- homeowner_phone
- template_type
- scheduled_for
- current_time
- roofer_timezone

## Required Checks

1. Roofer SMS flag is enabled.
2. Homeowner phone is valid E.164.
3. Lead is not opted_out.
4. Lead is not booked.
5. Lead is not cancelled.
6. Lead is not lost.
7. Follow-up is due.
8. Template type is approved.
9. Current time is outside quiet hours.
10. No duplicate send exists for the same follow_up_id.

## Required Outputs

Allowed response:

- allowed: true
- action: send
- reason: eligible

Blocked response:

- allowed: false
- action: skip
- reason: opted_out, booked, cancelled, lost, invalid_phone, sms_disabled, duplicate_send, template_not_approved

Rescheduled response:

- allowed: false
- action: reschedule
- reason: quiet_hours
- rescheduled_for: next allowed send window

## Quiet-Hour Rule

No homeowner SMS from 9:00 PM through 7:59 AM local time.

Allowed window begins at 8:00 AM local time.

## Logging Requirements

Every non-send decision should be logged as a workflow_event.

Recommended event types:

- sms_blocked_opted_out
- sms_blocked_status
- sms_blocked_invalid_phone
- sms_blocked_sms_disabled
- sms_blocked_duplicate
- sms_rescheduled_quiet_hours
- sms_blocked_template_not_approved

## Test Requirements

Create a test-only verification script before production use.

Proposed script:

`backend/scripts/verify-sms-safety-service.js`

The script must prove:

- SMS disabled flag blocks sends
- opted_out blocks sends
- booked blocks sends
- invalid phone blocks sends
- quiet hours reschedule sends
- allowed window permits eligible sends
- duplicate follow-up blocks sends

## Production Rule

This service may be built and tested, but no Twilio send call should be connected until explicit approval.

## Not Approved Yet

- Twilio outbound SMS send
- SMS dispatcher
- homeowner production SMS
- roofer production SMS
- booking confirmation SMS
- reminder SMS
