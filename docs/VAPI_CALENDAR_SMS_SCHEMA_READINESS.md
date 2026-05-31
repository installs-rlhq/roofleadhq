# Vapi Calendar/SMS Schema Readiness

**Date:** 2026-05-31  
**Repo:** /root/roofleadhq  
**Status:** Planning-only — No implementation

## Purpose
This document checks whether the current Supabase schema supports the future Calendar/SMS controls defined in `VAPI_CALENDAR_SMS_READINESS_PLAN.md`. No code changes or triggers are made.

## 1. Existing Columns Confirmed (from verified booking row)

The following columns already exist on the `bookings` table:

- `booking_id`
- `roofer_id`
- `lead_id`
- `appointment_type`
- `booked_time`
- `calendar_provider` (value: `vapi`)
- `status`
- `is_qualified`
- `qualification_status`
- `qualification_reason`
- `counts_toward_confidence_promise`
- `calendar_event_id` (currently `null`)
- `confirmation_sent_at` (currently `null`)
- `reminder_sent_at` (currently `null`)

The `calls` and `leads` tables already support the current Vapi flow (lead matching + booking creation).

## 2. Missing Columns

The following columns referenced in the readiness plan are **not yet confirmed** in the schema:

**On `roofers` table:**
- `calendar_sync_enabled` (boolean, default false)
- `sms_confirmation_enabled` (boolean, default false)

**On `bookings` table:**
- `calendar_sync_failed` (boolean or status field)
- `calendar_sync_attempts` (integer or jsonb for retry tracking)
- `sms_confirmation_failed` (boolean or status field)
- `sms_failure_reason` (text)

No dedicated `calendar_sync_attempts` table or logging table for Calendar/SMS failures was found in the current schema.

## 3. Recommended Safe Migration Plan (Planning Only)

If the missing columns are needed later, the recommended order is:

1. Add roofer-level flags first:
   - `ALTER TABLE roofers ADD COLUMN calendar_sync_enabled BOOLEAN DEFAULT false;`
   - `ALTER TABLE roofers ADD COLUMN sms_confirmation_enabled BOOLEAN DEFAULT false;`

2. Add booking-level failure tracking:
   - `ALTER TABLE bookings ADD COLUMN calendar_sync_failed BOOLEAN DEFAULT false;`
   - `ALTER TABLE bookings ADD COLUMN calendar_sync_attempts INTEGER DEFAULT 0;`
   - `ALTER TABLE bookings ADD COLUMN sms_confirmation_failed BOOLEAN DEFAULT false;`

3. Consider a lightweight `calendar_sync_log` or reuse `workflow_events` for detailed failure logging.

All migrations must remain behind feature flags and never enabled for production roofers until explicitly approved.

## 4. Implementation Blockers

- No `calendar_sync_enabled` / `sms_confirmation_enabled` flags on roofers yet.
- No failure tracking fields on bookings yet.
- No background job framework for Calendar sync or SMS sending has been approved.
- Google Calendar credentials storage mechanism not yet defined.
- SMS provider integration (Twilio usage for confirmations) not yet approved for this flow.

## 5. Explicit Safety Statement

**No production Calendar/SMS triggers were enabled.**  
This check was read-only. No Google Calendar API calls, SMS sending, Resend, Lindy, or follow-up automation was implemented or activated. The system remains in the approved state: Vapi webhook creates booking rows only.

---

**Planning complete.** Schema gaps noted for future discussion only.