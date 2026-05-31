# RoofLeadHQ Roofer Onboarding Dry-Run Script Plan

## Purpose

Plan a dry-run onboarding script before allowing real roofer creation.

Future script:

backend/scripts/onboard-roofer-dry-run.js

## Goal

Validate onboarding inputs and show what would be created without writing to Supabase.

## Safety Rule

This script must not insert, update, delete, send SMS, create Calendar events, or trigger Vapi.

Read-only checks are allowed.

## Inputs To Validate

Required:

- business_name
- owner_name
- owner_email
- owner_phone
- twilio_number
- timezone
- service_area

Default safety flags:

- calendar_sync_enabled = false
- sms_confirmation_enabled = false

## Checks To Perform

1. Confirm backend/.env exists.
2. Confirm Supabase env keys exist.
3. Confirm Twilio number is E.164.
4. Confirm owner phone is E.164.
5. Check if twilio_number already exists in roofers.
6. Check if owner_email already exists if column exists.
7. Print proposed roofer payload.
8. Print safety flag defaults.
9. Confirm no writes were performed.

## Expected Output

Roofer onboarding dry-run summary:

- Business:
- Owner:
- Email:
- Owner phone:
- Twilio number:
- Timezone:
- Service area:
- Existing Twilio number match:
- Calendar sync enabled: false
- SMS confirmation enabled: false
- Writes performed: no

## First Implementation

Build only dry-run behavior.

Do not create real roofer rows yet.
