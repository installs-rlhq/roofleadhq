# RoofLeadHQ Roofer Onboarding Commands

## Purpose

Exact Terminal 1 commands for safely onboarding a roofer.

Use Terminal 1 in:

/root/roofleadhq

## Source of Truth Check

Always run first:

cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -5

Expected repo root:

/root/roofleadhq

## Full Readiness Check

Run:

cd /root/roofleadhq
scripts/verify-roofer-onboarding-readiness.sh

This verifies:

- Correct repo
- Backend build
- Backend .env exists
- Supabase keys exist without printing secrets
- Existing roofer Calendar/SMS flags are disabled
- Dry-run onboarding script works
- Write script refuses to write without confirmation

## Dry-Run Onboarding Command

Replace values before running:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
  --business_name="ROOFER BUSINESS NAME" \
  --owner_full_name="OWNER FULL NAME" \
  --owner_email="OWNER EMAIL" \
  --owner_cell_phone="+15551234567" \
  --business_phone="+15551234568" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO" \
  --city="Denver" \
  --state="CO"

Expected safe output:

Dry-run only. Add --confirm_write=true to create the roofer.

## Real Onboarding Write Command

Only run after dry-run passes.

Replace values before running:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
  --business_name="ROOFER BUSINESS NAME" \
  --owner_full_name="OWNER FULL NAME" \
  --owner_email="OWNER EMAIL" \
  --owner_cell_phone="+15551234567" \
  --business_phone="+15551234568" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO" \
  --city="Denver" \
  --state="CO" \
  --confirm_write=true

## Required Safety Defaults

Every new roofer must be created with:

calendar_sync_enabled = false
sms_confirmation_enabled = false

## After Onboarding Verification

Run:

cd /root/roofleadhq
node backend/scripts/verify-roofer-flags-readonly.js

Confirm the new roofer shows:

Calendar sync enabled: false
SMS confirmation enabled: false

## What This Does Not Do

The onboarding write command does not:

- Send homeowner SMS
- Send roofer SMS
- Create Google Calendar events
- Trigger Vapi
- Trigger Resend
- Trigger Lindy
- Create leads
- Create bookings
- Create follow-ups

## Duplicate Protection

If the Twilio number already belongs to another roofer, the script should stop with:

FAIL: Twilio number already belongs to:

## Final Git Verification

Run:

cd /root/roofleadhq
git status --short
git log --oneline -5
