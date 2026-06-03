# SMS Opt-Out And Quiet-Hour Implementation Plan

Date: 2026-06-02

## Purpose

Plan the safety layer required before any homeowner SMS sending is enabled.

This is planning only.

No SMS sending is enabled by this document.

## Required Safety Features

Before production homeowner SMS:

- STOP/UNSUBSCRIBE detection
- Lead status update to opted_out
- Pending follow-ups skipped after opt-out
- Quiet-hour blocking
- Quiet-hour rescheduling
- Failed send logging
- Per-roofer SMS activation flag
- Test-only verification script
- Explicit approval before production send

## Opt-Out Keywords

Treat these as opt-out:

- STOP
- STOPALL
- UNSUBSCRIBE
- CANCEL
- END
- QUIT

Matching should be case-insensitive and trim whitespace.

## Opt-Out Behavior

When an opt-out is received:

1. Match homeowner to lead.
2. Set leads.status = opted_out.
3. Mark pending follow_ups as skipped.
4. Store stopped_reason = homeowner_opted_out where supported.
5. Create workflow_event = homeowner_opted_out.
6. Do not send future homeowner SMS.
7. Keep dashboard visibility.

## Quiet-Hour Rule

Do not send homeowner SMS between:

- 9:00 PM and 8:00 AM local time

Preferred timezone source:

1. Roofer timezone
2. Lead/property timezone if later added
3. Fallback: America/Denver

## Quiet-Hour Behavior

If a follow-up is due during quiet hours:

1. Do not send.
2. Reschedule to next allowed window.
3. Log workflow_event = followup_rescheduled_quiet_hours.
4. Keep follow_up status scheduled unless schema needs rescheduled status later.

## Send Eligibility Checks

Before sending homeowner SMS, require:

- Roofer SMS activation flag is enabled
- Lead is not opted_out
- Lead is not booked
- Lead is not cancelled
- Lead is not lost
- Current time is outside quiet hours
- Follow-up is due
- Template is approved
- Phone number is valid E.164

## Failure Logging

If SMS send fails:

- Mark follow_up status = failed
- Create message record with failed status if supported
- Create workflow_event = message_failed
- Surface in dashboard/internal review
- Do not retry endlessly

## Required Test Cases

1. STOP reply marks lead opted_out.
2. stop lowercase works.
3. UNSUBSCRIBE works.
4. Pending follow-ups are skipped.
5. Follow-up due at 10 PM is not sent.
6. Follow-up due at 7 AM is not sent.
7. Follow-up due at 8 AM can send if all checks pass.
8. Booked lead does not receive follow-up.
9. Failed send logs message_failed.
10. SMS disabled flag blocks sending.

## Implementation Scope Later

Likely files to inspect before code:

- backend/src/routes/webhooks.ts
- backend/src/services/manual-outreach.service.ts
- backend/src/services
- backend/scripts
- Supabase follow_ups/messages/workflow_events usage

## Not Approved Yet

- Production homeowner SMS
- Roofer SMS
- Dispatcher send logic
- Calendar confirmations
- Reminder sends

## Next Step

Inspect current SMS/webhook/follow-up code before writing implementation.

