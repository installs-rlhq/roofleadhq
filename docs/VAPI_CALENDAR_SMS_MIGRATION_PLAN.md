# Vapi Calendar/SMS Migration Plan

**Date:** 2026-05-31  
**Repo:** /root/roofleadhq  
**Status:** Planning-only — Documentation only. No migrations executed.

## Purpose
This document defines a safe, reversible migration path to add the columns required for future Calendar/SMS controls. No code is written and no migrations are run.

## Proposed Migration SQL

```sql
-- 1. Add roofer-level feature flags
ALTER TABLE roofers
  ADD COLUMN IF NOT EXISTS calendar_sync_enabled BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS sms_confirmation_enabled BOOLEAN NOT NULL DEFAULT false;

-- 2. Add Calendar sync tracking to bookings
ALTER TABLE bookings
 ADD COLUMN IF NOT EXISTS calendar_sync_status TEXT NOT NULL DEFAULT 'pending',
 ADD COLUMN IF NOT EXISTS calendar_sync_error TEXT,
 ADD COLUMN IF NOT EXISTS calendar_synced_at TIMESTAMPTZ;

DO $$
BEGIN
 IF NOT EXISTS (
 SELECT 1
 FROM pg_constraint
 WHERE conname = 'chk_calendar_sync_status'
 ) THEN
 ALTER TABLE bookings
 ADD CONSTRAINT chk_calendar_sync_status
 CHECK (calendar_sync_status IN ('pending', 'synced', 'failed', 'skipped'));
 END IF;
END $$;

-- 3. Add SMS confirmation tracking to bookings
ALTER TABLE bookings
 ADD COLUMN IF NOT EXISTS sms_confirmation_status TEXT NOT NULL DEFAULT 'pending',
 ADD COLUMN IF NOT EXISTS sms_confirmation_error TEXT;

DO $$
BEGIN
 IF NOT EXISTS (
 SELECT 1
 FROM pg_constraint
 WHERE conname = 'chk_sms_confirmation_status'
 ) THEN
 ALTER TABLE bookings
 ADD CONSTRAINT chk_sms_confirmation_status
 CHECK (sms_confirmation_status IN ('pending', 'sent', 'failed', 'skipped'));
 END IF;
END $$;
```

**Notes on the SQL:**
- Uses `IF NOT EXISTS` for safety.
- `calendar_sync_status` and `sms_confirmation_status` use text with sensible defaults (`pending`).
- Error columns are nullable.
- `calendar_synced_at` is nullable (only set on success).

## Exact Safe Rollout Order

1. Add columns to `roofers` table first (feature flags).
2. Add columns to `bookings` table second.
3. Verify columns exist via Supabase dashboard or `\d bookings` / `\d roofers`.
4. Backfill defaults only on test roofer(s) if needed.
5. Never enable `calendar_sync_enabled = true` or `sms_confirmation_enabled = true` on any production roofer without explicit approval.

## Test-Mode Rules

- All new columns default to disabled (`false` / `pending`).
- Test roofer (`ABC Roofing Test`) may have flags set to `true` for dry-run testing only.
- In test mode, Calendar/SMS logic must remain in dry-run / logging mode — no real API calls.
- Production roofers must remain at default (`false` / `pending`) indefinitely until a separate production enablement decision.

## Rollback Notes

To reverse this migration:

```sql
ALTER TABLE roofers
  DROP COLUMN IF EXISTS calendar_sync_enabled,
  DROP COLUMN IF EXISTS sms_confirmation_enabled;

ALTER TABLE bookings
  DROP COLUMN IF EXISTS calendar_sync_status,
  DROP COLUMN IF EXISTS calendar_sync_error,
  DROP COLUMN IF EXISTS calendar_synced_at,
  DROP COLUMN IF EXISTS sms_confirmation_status,
  DROP COLUMN IF EXISTS sms_confirmation_error;
```

Rollback is considered low-risk because the columns are additive and have safe defaults.

## Implementation Blockers

- No background job system approved for Calendar sync or SMS sending.
- No Google Calendar credential storage mechanism defined.
- No SMS template storage or sending logic approved.
- No production enablement process defined for the new flags.
- Schema changes must remain behind feature flags until all dependent systems are approved.

## Live Migration Verification — 2026-05-31

- Supabase migration was run successfully through SQL Editor.
- Verified roofers.calendar_sync_enabled boolean default false not null.
- Verified roofers.sms_confirmation_enabled boolean default false not null.
- Verified bookings.calendar_sync_status text default pending not null.
- Verified bookings.calendar_sync_error text nullable.
- Verified bookings.calendar_synced_at timestamptz nullable.
- Verified bookings.sms_confirmation_status text default pending not null.
- Verified bookings.sms_confirmation_error text nullable.
- Verified chk_calendar_sync_status constraint allows only pending, synced, failed, skipped.
- Verified chk_sms_confirmation_status constraint allows only pending, sent, failed, skipped.
- Calendar/SMS remain disabled because roofer flags default false.
- No Calendar, SMS, Resend, Lindy, or follow-up automation was enabled.

## Explicit Statement

**This is documentation only.**  
No migrations were executed. No Calendar, SMS, Resend, Lindy, or follow-up automation was implemented or enabled. The system remains in the approved state: Vapi webhook creates booking rows only.

---

**Planning complete.** Ready for review.