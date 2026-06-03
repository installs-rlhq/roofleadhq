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

## Remaining Uncertainty

Direct PostgreSQL CHECK constraint definitions were not inspected because no direct DATABASE_URL or Postgres connection string is available in backend/.env.

The repo and docs indicate opted_out and stopped_reason are supported, but raw database constraints should be verified later through Supabase SQL editor or a safe server-side introspection method before production SMS activation.

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
