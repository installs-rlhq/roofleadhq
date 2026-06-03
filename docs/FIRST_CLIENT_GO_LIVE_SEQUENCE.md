# First Client Go-Live Sequence

Date: 2026-06-02

## Purpose

Exact sequence for moving the first real RoofLeadHQ pilot client from intake to safe founder-led go-live.

## Step 1: Collect Client Intake

Use:

- docs/REAL_PILOT_CLIENT_INTAKE_TEMPLATE.md

Required before onboarding:

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

## Step 2: Run Readiness Check

Terminal 1:

cd /root/roofleadhq
scripts/verify-roofer-onboarding-readiness.sh

Continue only if it passes.

## Step 3: Prepare Command Worksheet

Use:

- docs/FIRST_REAL_CLIENT_COMMAND_WORKSHEET.md

Fill in all required values.

## Step 4: Run Dry-Run Onboarding

Terminal 1:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
  --business_name="REAL ROOFER BUSINESS NAME" \
  --owner_full_name="REAL OWNER FULL NAME" \
  --owner_email="REAL OWNER EMAIL" \
  --owner_cell_phone="+15551234567" \
  --business_phone="+15551234568" \
  --twilio_number="+15557654321" \
  --timezone="America/Denver" \
  --service_area="Denver, CO" \
  --city="Denver" \
  --state="CO"

Expected:

Dry-run only. Add --confirm_write=true to create the roofer.

## Step 5: Run Real Onboarding Write

Only after dry-run passes.

Terminal 1:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
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

## Step 6: Save Dashboard Token Privately

The token appears once.

Do not paste it into chat.

Save it securely.

## Step 7: Verify Safety Flags

Terminal 1:

cd /root/roofleadhq
node backend/scripts/verify-roofer-flags-readonly.js

Confirm new roofer shows:

- calendar_sync_enabled=false
- sms_confirmation_enabled=false

## Step 8: Verify Dashboard

Confirm:

- Dashboard token works
- No-token request returns Unauthorized
- Metrics load
- Manual Outreach section loads
- Dashboard remains read-only

## Step 9: Verify Twilio Mapping

Confirm:

- Assigned Twilio number is correct
- Twilio number maps to the new roofer
- Manual Outreach command path is safe
- No homeowner SMS is sent automatically

## Step 10: Confirm Billing / Agreement

Before go-live, confirm:

- Setup payment completed or intentionally waived
- Monthly plan selected or pilot billing terms documented
- Payment method/process documented
- Founder-led launch expectations explained
- First-Month Confidence Promise explained
- No hard appointment guarantee promised

## Step 11: Run SMS Read-Only Safety Checks

Terminal 1:

cd /root/roofleadhq
node backend/scripts/verify-sms-schema-readiness-readonly.js
node backend/scripts/verify-sms-safety-service.js
node backend/scripts/verify-sms-optout-workflow.js
node backend/scripts/verify-sms-dispatcher-planner.js
node backend/scripts/verify-sms-dispatcher-data-shape-readonly.js
node backend/scripts/verify-sms-dispatcher-execution-plan-readonly.js

Pass condition:

- All checks pass.
- send: 0 unless production SMS has been explicitly approved.
- No writes are performed.
- No SMS is sent.
- No Twilio calls are made.

## Step 12: Use Go-Live Decision Checklist

Use:

- docs/PILOT_GO_LIVE_DECISION_CHECKLIST.md

Go live only if all required checks pass.

## Step 13: Operate Daily

Use:

- docs/DAILY_PILOT_OPERATIONS_CHECKLIST.md
- docs/FOUNDER_LED_PILOT_RUNBOOK.md

## Hard Stop Rules

Do not enable without explicit approval:

- homeowner SMS
- roofer SMS
- Google Calendar creation
- live Vapi production actions
- Resend production emails
- Lindy production automations
