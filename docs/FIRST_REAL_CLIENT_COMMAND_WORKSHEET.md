# First Real Client Command Worksheet

Date: 2026-06-02

## Purpose

A fill-in worksheet for preparing the exact onboarding command for the first real RoofLeadHQ pilot client.

## Required Values

Fill these in before running any onboarding command:

BUSINESS_NAME=""
OWNER_FULL_NAME=""
OWNER_EMAIL=""
OWNER_CELL_PHONE=""
BUSINESS_PHONE=""
TWILIO_NUMBER=""
TIMEZONE=""
SERVICE_AREA=""
CITY=""
STATE=""

## Required Format Checks

Phone numbers must be E.164 format.

Examples:

- +13035551234
- +15125551234

Timezone examples:

- America/Denver
- America/Chicago
- America/New_York
- America/Los_Angeles

## Dry-Run Command

Run dry-run first:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
  --business_name="$BUSINESS_NAME" \
  --owner_full_name="$OWNER_FULL_NAME" \
  --owner_email="$OWNER_EMAIL" \
  --owner_cell_phone="$OWNER_CELL_PHONE" \
  --business_phone="$BUSINESS_PHONE" \
  --twilio_number="$TWILIO_NUMBER" \
  --timezone="$TIMEZONE" \
  --service_area="$SERVICE_AREA" \
  --city="$CITY" \
  --state="$STATE"

Expected result:

Dry-run only. Add --confirm_write=true to create the roofer.

## Write Command

Only run after dry-run passes:

cd /root/roofleadhq

/root/.local/bin/node backend/scripts/onboard-roofer.js \
  --business_name="$BUSINESS_NAME" \
  --owner_full_name="$OWNER_FULL_NAME" \
  --owner_email="$OWNER_EMAIL" \
  --owner_cell_phone="$OWNER_CELL_PHONE" \
  --business_phone="$BUSINESS_PHONE" \
  --twilio_number="$TWILIO_NUMBER" \
  --timezone="$TIMEZONE" \
  --service_area="$SERVICE_AREA" \
  --city="$CITY" \
  --state="$STATE" \
  --confirm_write=true

## After Write

Save dashboard token privately.

Do not paste dashboard token into chat.

Verify:

- Roofer ID created
- Dashboard access enabled
- Calendar sync enabled false
- SMS confirmation enabled false
- No SMS sent
- No Calendar event created
- No Vapi triggered
