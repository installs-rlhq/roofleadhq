# SMS CHECK Constraint Readiness Verification

Date: 2026-06-02

## Purpose

Record read-only PostgreSQL CHECK constraint verification for SMS safety planning.

This was planning and inspection only.

No writes were performed by the verifier.
No SMS was sent.
No Twilio calls were made.

## Verified Result

SMS safety planning is not blocked by current CHECK constraints.

Verified constraints:

- `public.leads.status` includes `opted_out`.
- `public.follow_ups.status` includes `scheduled`, `sent`, `skipped`, `failed`, and `cancelled`.
- `public.follow_ups.followup_type` includes `initial`, `2h`, `12h`, `24h`, `48h`, `reminder`, and `manual_outreach`.
- `public.messages.channel` includes `sms`.
- `public.messages.direction` includes `inbound` and `outbound`.
- `public.roofers.status` includes `active`, `paused`, and `cancelled`.

## Notes

- `messages.status` did not appear with a CHECK constraint.
- `workflow_events` did not appear with CHECK constraints.
- This is acceptable for planning/test-only SMS safety work.

## Not Approved

- Twilio outbound SMS sending
- Production homeowner SMS
- Roofer SMS
- Calendar confirmation SMS
- Reminder SMS
- Resend production emails
- Lindy production triggers
- Cron scheduling
- Live dispatcher execution

## Final Decision

PASS for planning/test-only SMS safety and dispatcher planner work.

Production SMS activation still requires explicit approval and separate sender/write-path verification.
