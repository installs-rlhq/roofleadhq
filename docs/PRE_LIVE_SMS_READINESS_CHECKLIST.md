# Pre-Live SMS Readiness Checklist

Status: pre-live only

Do not enable live SMS until explicitly approved.

This checklist does not enable live SMS, Twilio sends, routes, cron, scheduler, auto-start, or production runner automation.

## Current verified state

Latest verified source-of-truth commit:

- `d2c197f test(sms): verify send intent adapter contract`

Verified complete:

- Production runner fake send-intent bridge verification
- Send-intent planner verification
- Disabled Twilio adapter verification
- Send-intent to disabled adapter fake contract verification
- Backend build

Still not enabled:

- Live SMS
- Live Twilio send
- Production cron
- Production scheduler
- Production route trigger
- Background auto-start
- Twilio adapter wiring into production runner

## Required before any live SMS test

1. HEAD and origin/main must match.
2. Working tree must be clean.
3. Repo must be /root/roofleadhq.
4. All fake verifiers must pass.
5. Backend build must pass.
6. Exact test roofer must be approved.
7. Exact test lead must be approved.
8. Exact follow_up_id must be approved.
9. Exact destination phone number must be approved.
10. Exact message body must be approved.
11. Exact Twilio from-number must be approved.
12. Batch size must be 1.
13. Duplicate-send check must pass.
14. Opt-out check must pass.
15. Quiet-hours check must pass.

## Stop conditions

Stop immediately if:

- More than one candidate is selected.
- Approved follow_up_id does not match.
- Duplicate message exists.
- Opt-out is present.
- Quiet hours block the send.
- Twilio credentials are missing or unexpected.
- Build fails.
- Any verifier fails.
- Working tree is dirty unexpectedly.
- HEAD and origin/main do not match.

## Next safe milestone

Add a read-only live SMS candidate preparation script that prints the exact candidate and exact future command, but still sends no SMS and makes no Twilio calls.
