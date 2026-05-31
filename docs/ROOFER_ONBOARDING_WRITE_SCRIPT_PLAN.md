# RoofLeadHQ Roofer Onboarding Write Script Plan

## Purpose

Plan the first real onboarding script that can create a roofer row in Supabase safely.

Future script:

backend/scripts/onboard-roofer.js

## Current Status

Safe onboarding foundation is complete:

- Readiness script exists.
- Backend build check passes.
- Backend .env check passes.
- Roofer Calendar/SMS flags are read-only verified.
- Dry-run onboarding script works.
- Dry-run script performs no writes.
- No SMS, Calendar, or Vapi triggers are enabled.

## Source of Truth

Terminal 1 in /root/roofleadhq is the source of truth.

Before using any onboarding script, run:

cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -5

Expected repo root:

/root/roofleadhq

## Future Script

backend/scripts/onboard-roofer.js

## Safety Rule

The first write script may create a roofer row only.

It must not:

- Send SMS
- Create Google Calendar events
- Trigger Vapi
- Trigger Resend
- Trigger Lindy
- Create leads
- Create bookings
- Create follow_ups
- Enable Calendar sync
- Enable SMS confirmations

## Required Inputs

- business_name
- owner_name
- owner_email
- owner_phone
- twilio_number
- timezone
- service_area

## Required Defaults

The script must always create new roofers with:

calendar_sync_enabled = false
sms_confirmation_enabled = false

These values should not be user-overridable in the first version.

## Preflight Checks

Before writing, the script should:

1. Load backend/.env.
2. Confirm SUPABASE_URL exists.
3. Confirm SUPABASE_SERVICE_ROLE_KEY exists.
4. Validate owner_phone is E.164.
5. Validate twilio_number is E.164.
6. Check whether twilio_number already exists.
7. Stop if twilio_number already exists.
8. Print the proposed payload.
9. Require an explicit confirmation flag.

## Required Confirmation Flag

The script should require:

--confirm_write=true

Without this flag, the script should fail safely and say:

Dry-run only. Add --confirm_write=true to create the roofer.

## Insert Behavior

The script should insert one row into roofers.

Minimum insert fields:

- business_name
- owner_name
- owner_email
- owner_phone
- twilio_number
- timezone
- service_area
- calendar_sync_enabled = false
- sms_confirmation_enabled = false

If any column does not exist, stop and report the missing column instead of guessing.

## After Insert Verification

After insert, the script should read the created roofer row and print:

- roofer_id
- business_name
- owner_email
- twilio_number
- timezone
- service_area
- calendar_sync_enabled
- sms_confirmation_enabled

It should also print:

Writes performed: yes
SMS sent: no
Calendar events created: no
Vapi triggered: no

## Failure Behavior

The script should stop safely if:

- Required input is missing
- Phone format is invalid
- Supabase env is missing
- Twilio number already exists
- Supabase insert fails
- Required columns are missing

## Recommended Sequence

1. Create this plan.
2. Inspect actual roofers table columns.
3. Create write script.
4. Test with a fake roofer and unused Twilio number.
5. Verify row in Supabase.
6. Keep Calendar/SMS disabled.
7. Add script to readiness check only after safe test passes.

## Not Yet Approved

Do not enable:

- Calendar sync
- SMS confirmations
- homeowner SMS
- roofer SMS
- Vapi live triggers
- automated booking creation for new roofer onboarding
