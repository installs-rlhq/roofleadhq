# RoofLeadHQ Roofer Onboarding Dashboard Visibility Plan

## Purpose

Make sure a newly onboarded roofer can be verified in dashboard/API data after creation.

This is a plan only.

## Current Status

Roofer onboarding scripts are working safely.

Latest verified commit before this plan:

8b2e213 Update ROOFER_ONBOARDING_COMPLETION_STATUS.md

## Goal

After a roofer is onboarded, confirm the roofer is visible to backend/dashboard queries without enabling live Calendar/SMS.

## Safety Rule

Dashboard visibility checks must be read-only.

They must not:

- Send SMS
- Create Calendar events
- Trigger Vapi
- Trigger Resend
- Trigger Lindy
- Create leads
- Create bookings
- Create follow-ups
- Change roofer flags

## Future Script

Recommended future script:

backend/scripts/verify-roofer-dashboard-visibility.js

## Inputs

Required:

- roofer_id

Optional:

- owner_email
- twilio_number

## Checks To Perform

The script should read from Supabase and verify:

1. Roofer row exists.
2. Roofer status is active.
3. business_name exists.
4. owner_email exists.
5. twilio_number exists.
6. timezone exists.
7. service_area exists.
8. calendar_sync_enabled is false.
9. sms_confirmation_enabled is false.
10. Dashboard API can safely query this roofer.

## Suggested Read-Only Query

The script should query:

roofers

Using:

- id
- business_name
- owner_email
- twilio_number
- timezone
- service_area
- status
- plan
- calendar_sync_enabled
- sms_confirmation_enabled

## Expected Output

Dashboard visibility verification:

- Roofer ID:
- Business:
- Owner email:
- Twilio number:
- Status:
- Plan:
- Timezone:
- Service area:
- Calendar sync enabled:
- SMS confirmation enabled:
- Dashboard visibility: pass
- Writes performed: no

## Failure Cases

Fail safely if:

- roofer_id is missing
- roofer row is not found
- status is not active
- required fields are missing
- calendar_sync_enabled is true
- sms_confirmation_enabled is true
- Supabase read fails

## Recommended Sequence

1. Create this plan.
2. Create read-only dashboard visibility script.
3. Test with ABC Roofing Test.
4. Add script to onboarding commands doc.
5. Run after each real roofer onboarding.
6. Do not enable Calendar/SMS yet.

## Not Yet Approved

Do not build client login, auth changes, or dashboard redesign as part of this step.
