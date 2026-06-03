# SMS Opt-Out Workflow Implementation Plan

Date: 2026-06-02

## Purpose

Plan how RoofLeadHQ will process homeowner SMS opt-out replies.

This is planning only.

No SMS sending is enabled by this document.
No Supabase writes are enabled by this document.
No Twilio outbound calls are enabled by this document.

## Current Verified State

Implemented and verified:

- `backend/src/services/sms-safety.service.ts`
- `backend/scripts/verify-sms-safety-service.js`

The SMS safety service currently supports:

- SMS send eligibility decisions
- quiet-hour rescheduling decisions
- E.164 phone validation
- duplicate-send blocking
- lead status blocking
- test-only opt-out keyword parsing

Verified opt-out keywords:

- STOP
- stop
- UNSUBSCRIBE

The parser also supports:

- STOPALL
- CANCEL
- END
- QUIT

## Future Goal

When a homeowner replies with an opt-out keyword, RoofLeadHQ should safely:

1. Detect the opt-out keyword.
2. Match the inbound phone number to the correct roofer and lead.
3. Set the lead status to `opted_out`.
4. Skip pending scheduled follow-ups for that lead.
5. Store `stopped_reason = homeowner_opted_out`.
6. Create a `workflow_events` audit record.
7. Keep dashboard visibility for review.
8. Send no further homeowner SMS.

## Required Inputs

From inbound Twilio webhook:

- To
- From
- Body
- MessageSid

Derived fields:

- roofer_id from `To` mapped to `roofers.twilio_number`
- homeowner phone from `From`
- opt-out keyword from `Body`
- matching lead by `roofer_id` and homeowner phone

## Proposed Future Files

Likely existing file to extend later:

- `backend/src/routes/webhooks.ts`

Likely service to reuse:

- `backend/src/services/sms-safety.service.ts`

Possible future test script:

- `backend/scripts/verify-sms-optout-workflow.js`

## Proposed Database Updates Later

Only after separate approval:

### leads

Update matching lead:

- `status = opted_out`

### follow_ups

Update matching pending follow-ups:

- `status = skipped`
- `stopped_reason = homeowner_opted_out`

Target only follow-ups where:

- `roofer_id` matches
- `lead_id` matches
- `status` is `scheduled` or `pending`

### workflow_events

Insert audit event:

- `event_type = homeowner_opted_out`
- `event_source = twilio`
- `event_status = completed`
- `metadata.keyword`
- `metadata.message_sid`
- `metadata.from`
- `metadata.to`

## Safety Rules

The opt-out workflow must not:

- send homeowner SMS
- send roofer SMS
- return TwiML `<Message>`
- trigger Calendar
- trigger Vapi
- trigger Resend
- trigger Lindy
- update unrelated leads
- update unrelated roofers
- update unrelated follow-ups

## Test Cases Required Before Production

1. `STOP` marks matching lead opted_out.
2. lowercase `stop` marks matching lead opted_out.
3. `UNSUBSCRIBE` marks matching lead opted_out.
4. Non-opt-out reply does not mark opted_out.
5. Unknown homeowner phone creates no unsafe update.
6. Unknown roofer Twilio number creates no unsafe update.
7. Pending follow-ups are skipped.
8. Already sent follow-ups are not modified.
9. Workflow event is created.
10. Duplicate MessageSid is not processed twice if duplicate protection is connected.

## Not Approved

- Production homeowner SMS
- Roofer SMS
- Twilio outbound SMS
- SMS dispatcher
- Calendar confirmation SMS
- Reminder SMS
- Resend production email
- Lindy production automation

## Recommended Next Step

Build a test-only opt-out workflow verifier before connecting it to the live webhook.

The verifier should use fake/test records or dry-run logic first.

Production database writes require separate verification and approval.
