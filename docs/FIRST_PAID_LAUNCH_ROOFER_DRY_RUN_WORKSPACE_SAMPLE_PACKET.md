# First Paid Launch Roofer Dry-Run Workspace Sample Packet

## Purpose

This packet adds a known-good sample roofer dry-run workspace fixture.

The sample gives Terminal 1 a stable planning-only reference for comparing generated onboarding workspaces.

## Fixture

- `fixtures/roofer-dry-run-workspace/sample-roofer/README.md`
- `fixtures/roofer-dry-run-workspace/sample-roofer/intake.md`
- `fixtures/roofer-dry-run-workspace/sample-roofer/safety-flags.env`
- `fixtures/roofer-dry-run-workspace/sample-roofer/activation-flags.env`
- `fixtures/roofer-dry-run-workspace/sample-roofer/workspace-metadata.env`
- `fixtures/roofer-dry-run-workspace/sample-roofer/onboarding-checklist.md`

## Safety

This fixture is planning-only.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

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
