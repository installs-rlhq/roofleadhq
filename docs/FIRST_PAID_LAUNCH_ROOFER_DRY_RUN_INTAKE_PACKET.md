# First Paid Launch Roofer Dry-Run Intake Packet

## Purpose

This packet defines the planning-only intake information needed before creating a roofer dry-run onboarding workspace.

It supports the Founder-Led Launch Program by making roofer setup repeatable without activating production systems.

## Safety posture

This packet is docs/read-only only.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

## Required roofer intake fields

Collect these before running a dry-run onboarding workspace:

- Roofing company name
- Primary owner/operator name
- Primary phone
- Primary email
- Service area cities
- Service area states
- Roofing services offered
- Emergency leak handling preference
- Storm damage / insurance claim handling preference
- Appointment booking preference
- Calendar readiness status
- Preferred appointment windows
- Lead source channels
- Existing website URL
- Google Business Profile URL if available
- Facebook page URL if available
- After-hours handling preference
- Missed-call recovery preference
- Manual review preference
- Reporting preference
- Internal notes

## Dry-run workspace rule

Use `scripts/onboard-roofer.sh` only for planning-only dry-run workspace creation.

The dry-run workspace must preserve:

- `SMS_ACTIVATION=false`
- `CALENDAR_ACTIVATION=false`
- `VAPI_ACTIVATION=false`
- `SUPABASE_WRITES=false`
- `CONTRACTOR_NOTIFICATION=false`
- `HOMEOWNER_NOTIFICATION=false`
- `CRON_ACTIVATION=false`
- `SCHEDULER_ACTIVATION=false`
- `DISPATCHER_ACTIVATION=false`
- `PUBLIC_ROUTE_ACTIVATION=false`

## Step 66 bridge rule

The Step 66 production send intent bridge remains present and guarded.

It does not authorize live SMS sends.

## Founder-led launch language

Use:

- Founder-Led Launch Program
- founder-led launch
- first-paid launch
- book inspections
- book appointments
- lead response
- missed-call recovery
- speed-to-lead
- storm season readiness
- manual review
- recommended actions

Avoid:

- guaranteed revenue
- guaranteed jobs
- job-booking language
- legacy short-pilot promises
- specific appointment-count promises
