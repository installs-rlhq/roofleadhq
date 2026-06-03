# SMS Safety Schema Readiness

Date: 2026-06-02

## Purpose

Record schema readiness before building any SMS safety service.

This is inspection and planning only.

No homeowner SMS sending is enabled by this document.

## Verified Tables And Columns

### roofers

Supports:

- sms_confirmation_enabled
- timezone
- twilio_number
- status

SMS safety use:

- sms_confirmation_enabled gates all homeowner SMS.
- timezone supports quiet-hour checks.
- twilio_number supports roofer-owned number context.

### leads

Supports:

- status
- phone
- roofer_id
- source_path
- source_detail

SMS safety use:

- status can block sends for opted_out, booked, cancelled, or lost leads.
- phone supports homeowner destination validation.
- roofer_id links lead to the SMS-enabled roofer.

### follow_ups

Supports:

- status
- followup_type
- scheduled_for
- sent_at
- skipped_reason
- stopped_reason
- message_body
- roofer_id
- lead_id

SMS safety use:

- scheduled_for supports due checks.
- status supports scheduled, sent, skipped, and failed behavior.
- stopped_reason supports homeowner opt-out or roofer stop reasons.
- lead_id and roofer_id support scoped duplicate/eligibility checks.

### messages

Supports:

- channel
- direction
- status
- provider
- provider_message_id
- error_message
- from_number
- to_number
- sent_at
- received_at
- message_body
- roofer_id
- lead_id

SMS safety use:

- provider_message_id can help audit Twilio sends.
- status and error_message support failed-send logging.
- direction supports inbound/outbound message history.

### workflow_events

Supports:

- event_type
- event_status
- event_source
- description
- metadata
- roofer_id
- lead_id

SMS safety use:

- event_type can record opt-out, blocked, skipped, failed, and quiet-hour decisions.
- metadata can store reason codes and safety context.

## Verified Safety State

- Existing roofers have sms_confirmation_enabled=false.
- Current SMS docs confirm homeowner SMS remains disabled.
- Current code inspection found no outbound Twilio homeowner SMS sender.
- Manual Outreach remains inbound-only and returns empty TwiML.
- No SMS, Calendar, Vapi, Resend, or Lindy production triggers are enabled by this inspection.

## Schema Readiness Decision

PASS for planning and test-only SMS safety service design.

The current schema appears sufficient for:

- SMS disabled gate
- homeowner opt-out blocking
- booked/cancelled/lost blocking
- quiet-hour reschedule decisions
- follow-up skipped/stopped reasons
- failed-send logging
- workflow event audit trail
- duplicate-send audit using follow_up_id and messages/provider fields

## Read-Only Supabase Verification

Date: 2026-06-02

A read-only Supabase service-role check verified that these SMS safety columns are queryable:

- roofers: id, business_name, sms_confirmation_enabled, timezone, twilio_number, status
- leads: id, roofer_id, phone, status, source_path, source_detail
- follow_ups: id, roofer_id, lead_id, status, followup_type, scheduled_for, sent_at, skipped_reason, stopped_reason, message_body
- messages: id, roofer_id, lead_id, channel, direction, status, provider, provider_message_id, error_message, from_number, to_number, sent_at, received_at, message_body
- workflow_events: id, roofer_id, lead_id, event_type, event_status, event_source, description, metadata

Result:

- PASS: Read-only SMS schema readiness check passed.
- PASS: No roofers have sms_confirmation_enabled=true.
- No writes were performed.
- No SMS was sent.
- No Twilio calls were made.

Reusable verifier added:

- backend/scripts/verify-sms-schema-readiness-readonly.js

Run with:

    cd /root/roofleadhq
    node backend/scripts/verify-sms-schema-readiness-readonly.js

## Remaining Uncertainty

Direct PostgreSQL CHECK constraint definitions were not inspected because no direct DATABASE_URL or Postgres connection string is available in backend/.env.

The repo and Supabase read-only checks indicate opted_out, stopped_reason, and required SMS audit columns are supported, but raw database constraints should still be verified later through Supabase SQL editor or a safe server-side introspection method before production SMS activation.

## Not Approved

- Twilio outbound SMS sending
- Homeowner production SMS
- Roofer production SMS
- SMS dispatcher
- Calendar confirmation SMS
- Reminder SMS
- Resend or Lindy production triggers

## Recommended Next Step

Build a test-only SMS safety service that returns decisions but does not send messages.

Proposed file:

- backend/src/services/sms-safety.service.ts

Proposed verification script:

- backend/scripts/verify-sms-safety-service.js

The service must not call Twilio.
The script must not send SMS.
Production sends require explicit approval.

## PostgreSQL CHECK Constraint Inspection

Date: 2026-06-02

A manual read-only Supabase SQL Editor inspection verified CHECK constraints for SMS safety planning.

Verified constraints:

- `public.leads.status` includes `opted_out`.
- `public.follow_ups.status` includes `scheduled`, `sent`, `skipped`, `failed`, and `cancelled`.
- `public.follow_ups.followup_type` includes `initial`, `2h`, `12h`, `24h`, `48h`, `reminder`, and `manual_outreach`.
- `public.messages.channel` includes `sms`.
- `public.messages.direction` includes `inbound` and `outbound`.
- `public.roofers.status` includes `active`, `paused`, and `cancelled`.

No blocking constraint issue was found for planning/test-only SMS safety service work.

Notes:

- `messages.status` did not appear with a CHECK constraint in this inspection.
- `workflow_events` did not appear with CHECK constraints in this inspection.
- This is acceptable for planning/test-only SMS safety work.
- Production SMS activation still requires explicit approval and separate sender/write-path verification.
