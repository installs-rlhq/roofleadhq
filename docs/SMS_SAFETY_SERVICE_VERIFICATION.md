# SMS Safety Service Verification

Date: 2026-06-02

## Purpose

Record verification of the test-only SMS safety decision service.

This is not an SMS sender.

No homeowner SMS, roofer SMS, Calendar action, Vapi action, Resend action, or Lindy trigger is enabled by this service.

## Files Verified

- `backend/src/services/sms-safety.service.ts`
- `backend/scripts/verify-sms-safety-service.js`

## Verified Behavior

The SMS safety service returns a decision only:

- send
- skip
- reschedule

It does not call Twilio.
It does not send SMS.
It does not write to Supabase.
It does not trigger external services.

## Verified Safety Cases

The verification script passed these cases:

- SMS disabled blocks sends.
- Invalid phone blocks sends.
- opted_out lead blocks sends.
- booked lead blocks sends.
- cancelled lead blocks sends.
- lost lead blocks sends.
- missing required field blocks sends.
- future follow-up blocks sends.
- unapproved template blocks sends.
- duplicate send blocks sends.
- quiet hours reschedule sends.
- allowed window permits eligible sends.
- 7:59 AM local time blocks sends.
- 8:00 AM local time permits sends.
- 8:59 PM local time permits sends.
- 9:00 PM local time blocks sends.
- STOP opt-out detected.
- lowercase stop opt-out detected.
- UNSUBSCRIBE opt-out detected.
- normal homeowner replies are not treated as opt-out.
- opt-out workflow can be planned without writes.
- non-opt-out workflow is ignored.
- invalid phone opt-out workflow is blocked.

## Build Verification

Backend build passed.

Verification script passed:

- `node backend/scripts/verify-sms-safety-service.js`

## Current Source Of Truth

Verified commits:

- `a39c31c docs(pilot): add sms safety verification script to index`
- `f2ee2af feat(sms): add test-only safety decision service`

## Not Approved

- Twilio outbound SMS sending
- Homeowner production SMS
- Roofer production SMS
- SMS dispatcher
- Calendar confirmation SMS
- Reminder SMS
- Resend production email
- Lindy production automation

## Recommended Next Step

Add opt-out parsing as test-only logic.

It should not send SMS.
It should not call Twilio.
It should not update Supabase until separately approved.
