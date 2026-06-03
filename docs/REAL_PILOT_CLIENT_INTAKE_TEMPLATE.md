# Real Pilot Client Intake Template

Date: 2026-06-02

## Purpose

Collect the exact information needed before creating a real RoofLeadHQ pilot client record.

## Client Information

Business name:

Owner full name:

Owner email:

Owner cell phone:

Business phone:

Website:

City:

State:

Timezone:

Service area:

## RoofLeadHQ Setup Information

Assigned Twilio number:

Plan:

Lead volume limit:

Dashboard slug preference:

## Lead Sources Included

Check all that apply:

- Website form:
- Google Business Profile:
- Phone calls:
- Text messages:
- Email leads:
- Angi:
- Thumbtack:
- HomeAdvisor:
- Referrals:
- Other:

## Scheduling Information

Preferred inspection days:

Preferred inspection hours:

Calendar owner:

Calendar email:

Calendar sync approved yet:

## Safety Flags

Default values for first pilot:

calendar_sync_enabled=false
sms_confirmation_enabled=false

Do not enable without explicit approval:

- homeowner SMS
- roofer SMS
- Google Calendar creation
- live Vapi production actions
- Resend production emails
- Lindy production automations

## Billing / Agreement

Setup payment completed or intentionally waived:

Monthly plan selected or pilot billing terms documented:

Payment method/process documented:

Founder-led launch expectations explained:

First-Month Confidence Promise explained:

No hard appointment guarantee promised:

## Dry-Run Command Template

Replace all values before running:

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

## Write Command Template

Only run after dry-run passes:

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

## Post-Onboarding Checks

- Save dashboard token privately
- Verify dashboard access
- Verify no-token request is Unauthorized
- Verify Calendar/SMS flags remain false
- Verify Twilio number maps to roofer
- Add client to daily monitoring process
