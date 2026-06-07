# First Paid Launch Roofer Dry-Run Workspace Smoke Packet

## Purpose

This packet adds an end-to-end smoke verifier for roofer dry-run onboarding workspace generation.

It proves that `scripts/onboard-roofer.sh` can create a planning-only roofer workspace from templates, validate disabled production flags, and clean up its test workspace.

## Verifier

- `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-smoke-readonly.js`

## Safety

This verifier is local and read-only except for temporary local dry-run workspace creation under `.roofleadhq/onboarding/`.

It performs no production activation.

It does not send live SMS.

It does not mutate Supabase.

It does not notify contractors or homeowners.

It does not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

## Required disabled flags

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
