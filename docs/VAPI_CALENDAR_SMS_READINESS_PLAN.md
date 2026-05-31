# Vapi Calendar/SMS Readiness Plan

**Date:** 2026-05-31  
**Repo:** /root/roofleadhq  
**Status:** Planning-only — No implementation yet

## 1. When a Booking Is Safe to Sync to Google Calendar

A booking becomes eligible for Calendar sync **only** when **all** of the following are true:

- `appointment_booked = true`
- `appointment_time` is present and is a valid future timestamp
- `lead_id` is not null (booking must be linked to a lead)
- `roofer_id` is valid and the roofer has Google Calendar connected (future `calendar_credentials` table / column)
- `status = 'scheduled'`
- `calendar_event_id IS NULL` (prevents re-sync)

**Gate:** The Vapi webhook should **never** trigger Calendar sync. Calendar sync must be handled by a separate, later background job or explicit endpoint.

## 2. Preventing Duplicate Calendar Events

Primary idempotency strategy:

- Store `calendar_event_id` on the booking row **immediately** after successful Calendar creation.
- Before attempting sync, check `WHERE calendar_event_id IS NULL`.
- Add a unique constraint or application-level check on `(roofer_id, appointment_time, lead_id)` as a secondary guard.
- Use Google Calendar’s `idempotency` / `conferenceData` or `extendedProperties` if supported, but **do not rely on it alone**.

## 3. Required Booking Fields for Calendar Sync

Minimum required fields before attempting Calendar creation:

- `roofer_id`
- `lead_id`
- `appointment_time`
- `appointment_type` (default: `site_visit`)
- `is_qualified = true`
- `qualification_status = 'qualified'`

Optional but recommended:
- `qualification_reason`
- Lead name / phone (from joined leads table)
- Roofer business name + phone

## 4. calendar_event_id as Idempotency Marker

**Yes** — `calendar_event_id` should be the primary idempotency marker.

- Once set, the booking is considered “synced”.
- Any future retry or re-processing must skip if `calendar_event_id IS NOT NULL`.
- The field is already present in the schema (confirmed in verified booking row).

## 5. SMS Confirmation Timing

**SMS confirmation must wait until Calendar sync succeeds.**

Recommended flow:

1. Vapi webhook creates booking (current behavior).
2. Separate Calendar sync job/process runs.
3. **Only on successful Calendar sync** → trigger confirmation SMS (homeowner + optional roofer notification).
4. Store `confirmation_sent_at` timestamp on success.

This keeps the confirmation truthful (the appointment actually exists on the roofer’s calendar).

## 6. Failure Handling (Calendar Sync Fails)

If Calendar sync fails:

- Do **not** send confirmation SMS.
- Log failure with error details (in `workflow_events` or new `calendar_sync_attempts` table).
- Booking remains in `status = 'scheduled'` with `calendar_event_id = NULL`.
- Retry policy: exponential backoff (max 3–5 attempts) via background worker.
- After final failure: mark booking with `calendar_sync_failed = true` and notify roofer via dashboard / future alert (no SMS yet).
- Manual “Retry Calendar Sync” action in dashboard (future).

## 7. SMS Content Guidelines (Future)

**Homeowner SMS (confirmation):**
- Business name
- Confirmed date/time (human readable)
- Address or “we’ll confirm location” note
- Roofer phone number
- Opt-out / reschedule instructions

**Roofer SMS (notification):**
- Homeowner name + phone
- Confirmed appointment time
- Lead source (if available)
- Link to dashboard or quick actions

**Safety:** All SMS templates must be stored in config / database, never hardcoded in webhook code.

## 8. Safety Rules — Test Mode vs Production Mode

| Aspect                    | Test Mode                                      | Production Mode                              |
|---------------------------|------------------------------------------------|----------------------------------------------|
| Calendar sync             | Dry-run only (log what would be created)       | Real Google Calendar write                   |
| SMS sending               | Disabled or routed to test number              | Real homeowner + roofer numbers              |
| Environment flag          | `NODE_ENV=test` or `VAPI_CALENDAR_MODE=test`   | `NODE_ENV=production`                        |
| calendar_event_id         | Still written (for verification)               | Written on real success                      |
| Failure behavior          | Never blocks booking creation                  | Same, but with real alerts                   |
| Roofer visibility         | Test roofer only (`ABC Roofing Test`)          | All production roofers                       |
| Approval gate             | Always allowed in test                         | Requires explicit production enable flag     |

**Recommended implementation flag:** Add `calendar_sync_enabled` and `sms_confirmation_enabled` columns (or config) at the roofer level.

## 9. Summary of Gates

- **Current state (approved):** Booking row creation only.
- **Next allowed step:** This plan only.
- **Blocked until explicit approval:** Any Google Calendar API calls, SMS sending logic, Resend, or Lindy triggers.

---

**Planning complete.** No Calendar, SMS, Resend, Lindy, or follow-up automation implemented.
## Disabled Calendar Sync Placeholder — 2026-05-31

Implementation status:

- Added disabled-by-default Calendar sync dry-run service.
- Added script: backend/scripts/sync-vapi-calendar-bookings.js.
- Calendar sync requires roofers.calendar_sync_enabled = true.
- Current expected eligible count is 0 because all roofer flags default false.
- No Google Calendar events are created.
- No SMS is sent.
- No Resend, Lindy, or follow-up automation is triggered.
- This is a safe placeholder only. Real Google Calendar integration remains blocked until credentials, calendar ownership, retry behavior, and production enablement rules are explicitly approved.

