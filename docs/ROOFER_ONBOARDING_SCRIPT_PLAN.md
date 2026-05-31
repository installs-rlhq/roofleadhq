# RoofLeadHQ Roofer Onboarding Script Plan

## Purpose

Create a repeatable Terminal-based onboarding process for adding new roofing clients safely.

Future script:

scripts/onboard-roofer.sh

## Source of Truth Rule

Terminal 1 in /root/roofleadhq is the source of truth.

Before onboarding work, run:

cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -5

Expected repo root:

/root/roofleadhq

Do not trust VPS OpenClaw commit or push reports unless Terminal 1 verifies them.

## Safety Defaults

New roofers must default to:

calendar_sync_enabled = false
sms_confirmation_enabled = false

No production Calendar events or homeowner SMS confirmations should be enabled during onboarding unless explicitly approved and verified from Terminal 1.

## Future Script Goals

The onboarding script should eventually:

1. Verify correct repo and branch.
2. Verify required environment variables.
3. Collect roofer business information.
4. Create or update the roofer row in Supabase.
5. Assign or verify Twilio number.
6. Verify Vapi destination number mapping.
7. Keep Calendar sync disabled by default.
8. Keep SMS confirmation disabled by default.
9. Run a safe dry-run Vapi payload test.
10. Print a clear verification summary.

## Required Roofer Fields

Required fields:

- business_name
- owner_name
- owner_email
- owner_phone
- twilio_number
- timezone
- service_area
- calendar_sync_enabled
- sms_confirmation_enabled

Optional later fields:

- website_url
- google_business_profile_url
- calendar_provider
- calendar_id
- vapi_assistant_id
- notes

## Required Preflight Checks

The script should verify:

cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git status --short

The script should fail if run from:

/root/.openclaw/workspace

## Required Environment Checks

The script should confirm required environment variables exist without printing secret values:

- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY

Later optional checks:

- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- VAPI_API_KEY
- GOOGLE_CALENDAR_CLIENT_ID
- GOOGLE_CALENDAR_CLIENT_SECRET

Secrets must never be printed.

## Supabase Insert Behavior

The first implementation should use a backend-safe method only.

Do not expose the service role key in frontend code, browser code, or client-side scripts.

Future script options:

1. Call a protected backend admin route.
2. Use a local Node script that runs only on the VPS/backend environment.
3. Use Supabase SQL manually during early testing.

## Calendar/SMS Safety Flags

Default values:

calendar_sync_enabled = false
sms_confirmation_enabled = false

The script should print:

Calendar sync is disabled.
SMS confirmation is disabled.
No homeowner SMS or Google Calendar events will be created unless flags are explicitly enabled later.

## Verification Output

At the end, the script should print:

Roofer onboarding verification summary:

Business:
Roofer ID:
Twilio number:
Timezone:
Calendar sync enabled:
SMS confirmation enabled:
Vapi destination verified:
Safe dry-run test passed:

## First Implementation Recommendation

Do not build the full script immediately.

Recommended sequence:

1. Create this plan.
2. Create a read-only verification script.
3. Create a dry-run onboarding script.
4. Add actual Supabase write behavior only after review.
5. Keep Calendar/SMS disabled by default.
