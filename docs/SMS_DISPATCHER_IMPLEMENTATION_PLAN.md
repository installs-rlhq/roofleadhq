# SMS Dispatcher Implementation Plan

Date: 2026-06-02

## Purpose

Plan the future SMS dispatcher before any outbound homeowner SMS is enabled.

This is planning only.

No SMS sending is enabled by this document.

## Current State

Verified:

- `backend/src/services/sms-safety.service.ts` evaluates whether an SMS should be sent, skipped, or rescheduled.
- `backend/scripts/verify-sms-safety-service.js` passes.
- `backend/scripts/verify-sms-schema-readiness-readonly.js` passes.
- `backend/scripts/verify-sms-optout-workflow.js` passes.
- Current roofers have `sms_confirmation_enabled=false`.
- No Twilio outbound SMS sender is connected.

Important note:

- `backend/src/services/followUpService.ts` appears outdated and uses `status = pending`.
- Current `follow_ups` workflow and SMS safety service use `status = scheduled`.
- Future dispatcher work should not rely on `followUpService.ts` without refactoring or replacing it.

## Future Dispatcher Goal

The dispatcher should process due SMS follow-ups safely.

It should:

1. Read due `follow_ups` rows.
2. Join or fetch related `leads` and `roofers`.
3. Call `evaluateSmsSafety()`.
4. Skip, reschedule, or send based on the safety decision.
5. Log every decision.
6. Never send SMS unless the roofer SMS flag is enabled.
7. Avoid duplicate sends.

## Required Query Scope

Future dispatcher should only consider rows where:

- `follow_ups.status = scheduled`
- `follow_ups.scheduled_for <= now()`
- `follow_ups.followup_type` maps to an approved SMS template
- `follow_ups.roofer_id` is present
- `follow_ups.lead_id` is present

## Required Safety Inputs

For each follow-up, dispatcher must provide:

- `rooferSmsEnabled`
- `homeownerPhone`
- `leadStatus`
- `followUpStatus`
- `scheduledFor`
- `currentTime`
- `rooferTimezone`
- `templateType`
- `duplicateSendExists`

## Required Skip Rules

Dispatcher must skip if:

- roofer SMS is disabled
- homeowner phone is invalid
- lead is `opted_out`
- lead is `booked`
- lead is `cancelled`
- lead is `lost`
- follow-up is not due
- template is not approved
- duplicate send exists

## Quiet-Hour Rule

If current local roofer time is from 9:00 PM through 7:59 AM:

- do not send
- planner should return a proposed reschedule time at next 8:00 AM local time
- future approved dispatcher may update `follow_ups.scheduled_for`
- future approved dispatcher should log `sms_rescheduled_quiet_hours`

## Future Send Behavior

Only after explicit approval, dispatcher may send via Twilio.

When sending is later approved, it must:

1. Insert or update message audit record.
2. Send through Twilio.
3. Store provider message ID.
4. Mark follow-up `sent`.
5. Set `sent_at`.
6. Create workflow event.

## Required Logging

For skip/reschedule/send decisions, create `workflow_events`.

Suggested event types:

- `sms_send_planned`
- `sms_sent`
- `sms_send_failed`
- `sms_skipped`
- `sms_rescheduled_quiet_hours`
- `sms_blocked_sms_disabled`
- `sms_blocked_invalid_phone`
- `sms_blocked_opted_out`
- `sms_blocked_status`
- `sms_blocked_duplicate`
- `sms_blocked_template_not_approved`

## Required Future Files

Recommended future files:

- `backend/src/services/sms-dispatcher.service.ts`
- `backend/scripts/verify-sms-dispatcher-plan.js`

Optional later file:

- `backend/scripts/run-sms-dispatcher.js`

## Not Approved

- Twilio outbound SMS sending
- production homeowner SMS
- roofer SMS
- Calendar confirmation SMS
- reminder SMS
- Resend or Lindy production triggers
- cron scheduling
- live dispatcher execution

## Recommended Next Step

Build a test-only SMS dispatcher planner that returns planned actions but performs no writes and sends no SMS.

Proposed file:

- `backend/src/services/sms-dispatcher-planner.service.ts`

Proposed verifier:

- `backend/scripts/verify-sms-dispatcher-planner.js`
