# SMS Dispatcher Execution Plan

Date: 2026-06-02

## Purpose

Plan a future SMS dispatcher execution path before enabling any outbound SMS.

This is planning only.

No SMS sending is enabled.
No Twilio calls are made.
No Supabase writes are enabled.
No cron or live scheduler is enabled.

## Current Verified State

- SMS schema readiness read-only verification passes.
- SMS safety service verification passes.
- SMS dispatcher planner verification passes.
- SMS dispatcher data shape read-only verification passes.
- PostgreSQL CHECK constraints support planning/test-only SMS safety work.
- Existing roofers have SMS disabled.
- No outbound SMS sender is connected.

## Future Dispatcher Responsibility

A future approved dispatcher should:

1. Query due scheduled follow-ups.
2. Fetch related lead and roofer records.
3. Map follow-up type to approved SMS template.
4. Call `planSmsDispatch()`.
5. Return a planned action:
   - `send`
   - `skip`
   - `reschedule`
6. Only after separate approval, execute writes/sends.

## Required Due Follow-Up Query

Future dispatcher should only inspect rows where:

- `follow_ups.status = scheduled`
- `follow_ups.scheduled_for <= now()`
- `follow_ups.roofer_id is not null`
- `follow_ups.lead_id is not null`

The dispatcher must not assume every due row is eligible to send.

Eligibility must be decided by the SMS safety service.

## Required Related Data

Each due follow-up needs:

From `follow_ups`:

- `id`
- `roofer_id`
- `lead_id`
- `status`
- `followup_type`
- `scheduled_for`
- `message_body`

From `leads`:

- `id`
- `phone`
- `status`

From `roofers`:

- `id`
- `sms_confirmation_enabled`
- `timezone`

## Required Safety Decision

The dispatcher must call `planSmsDispatch()` before any write or send.

The planner must block or reschedule when:

- roofer SMS is disabled
- homeowner phone is invalid
- lead is opted out
- lead is booked
- lead is cancelled
- lead is lost
- follow-up is not due
- template is not approved
- duplicate send exists
- current local time is quiet hours

## Duplicate Send Check

Before any future send, dispatcher must verify no prior outbound SMS message already exists for the same follow-up decision.

Recommended duplicate protection should use one or more of:

- `messages.provider_message_id`
- `messages.metadata.follow_up_id` if metadata is added later
- `workflow_events.metadata.follow_up_id`
- future dedicated `follow_ups.sent_at` plus `status = sent`

Current implementation should stay planning-only until duplicate write strategy is approved.

## Planning-Only Execution Mode

The next safe implementation, if approved later, should be a verifier script that:

1. Reads a small number of due follow-ups.
2. Builds planner inputs.
3. Calls `planSmsDispatch()`.
4. Prints planned actions.
5. Performs no writes.
6. Sends no SMS.
7. Calls no Twilio APIs.

Recommended file:

- `backend/scripts/verify-sms-dispatcher-execution-plan-readonly.js`

## Future Write-Enabled Milestones

These must be separate approvals:

1. Write skipped/rescheduled decisions to `workflow_events`.
2. Update quiet-hour reschedules in `follow_ups`.
3. Insert outbound message audit record before send.
4. Send through Twilio.
5. Update message record with provider result.
6. Mark follow-up sent/failed/skipped.
7. Add cron or scheduled execution.

## Not Approved

- Twilio outbound SMS sending
- Production homeowner SMS
- Roofer SMS
- Updating follow-ups
- Inserting messages
- Inserting workflow events
- Calendar confirmation SMS
- Reminder SMS
- Resend production emails
- Lindy production triggers
- Cron scheduling
- Live dispatcher execution

## Decision

PASS to create a planning-only/read-only dispatcher execution verifier.

Do not enable live SMS sending without explicit approval.
