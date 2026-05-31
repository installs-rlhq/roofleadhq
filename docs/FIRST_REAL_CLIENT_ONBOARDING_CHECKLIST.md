# RoofLeadHQ First Real Client Onboarding Checklist

## Purpose

Use this checklist before onboarding the first real roofing client.

## Source of Truth

Terminal 1 in /root/roofleadhq is the source of truth.

Always start with:

cd /root/roofleadhq
pwd
git rev-parse --show-toplevel
git fetch origin main
git status --short
git log --oneline -5

## Current Verified Commit Before This Checklist

171408b Update ROOFER_ONBOARDING_COMPLETION_STATUS.md

## Pre-Onboarding Requirements

Before onboarding a real roofer, collect:

- Business name
- Owner full name
- Owner email
- Owner cell phone
- Business phone
- Assigned Twilio number
- Timezone
- Service area
- City
- State
- Plan
- Lead volume limit

## Safety Defaults

Confirm these remain false:

calendar_sync_enabled = false
sms_confirmation_enabled = false

Do not enable:

- Homeowner SMS
- Roofer SMS
- Google Calendar
- Vapi live triggers
- Resend
- Lindy production automation

## Step 1: Run Readiness Check

Terminal 1:

cd /root/roofleadhq
scripts/verify-roofer-onboarding-readiness.sh

Continue only if it passes.

## Step 2: Run Dry-Run Onboarding

Terminal 1:

cd /root/roofleadhq

backend/scripts/onboard-roofer-dry-run.js \
  --business_name="REAL ROOFER BUSINESS NAME" \
  --owner_name="REAL OWNER FULL NAME" \
  --owner_email="REAL OWNER EMAIL" \
  --owner_phone="+15551234567" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO"

Expected:

Writes performed: no
SMS sent: no
Calendar events created: no
Vapi triggered: no

## Step 3: Run Real Onboarding Write

Only run after dry-run passes.

Terminal 1:

cd /root/roofleadhq

backend/scripts/onboard-roofer.js \
  --business_name="REAL ROOFER BUSINESS NAME" \
  --owner_full_name="REAL OWNER FULL NAME" \
  --owner_email="REAL OWNER EMAIL" \
  --owner_cell_phone="+15551234567" \
  --business_phone="+15551234568" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO" \
  --city="Denver" \
  --state="CO" \
  --confirm_write=true

## Step 4: Verify Flags

Terminal 1:

cd /root/roofleadhq
node backend/scripts/verify-roofer-flags-readonly.js

Confirm the new roofer shows:

Calendar sync enabled: false
SMS confirmation enabled: false

## Step 5: Verify Dashboard Visibility

Use the new roofer ID from the onboarding output.

Terminal 1:

cd /root/roofleadhq

node backend/scripts/verify-roofer-dashboard-visibility.js \
  --roofer_id="NEW ROOFER ID"

Expected:

Dashboard visibility: pass
Writes performed: no
SMS sent: no
Calendar events created: no
Vapi triggered: no

## Step 6: Final Git Check

Terminal 1:

cd /root/roofleadhq
git status --short
git log --oneline -5

## First Client Go-Live Blockers

Do not go live until these are confirmed:

- Roofer row exists
- Twilio number is correct
- Dashboard visibility passes
- Calendar sync is disabled
- SMS confirmation is disabled
- No homeowner SMS is live unless explicitly approved
- No Google Calendar event creation is live unless explicitly approved

## Notes

This checklist prepares the roofer record only.

It does not activate production homeowner communication.
