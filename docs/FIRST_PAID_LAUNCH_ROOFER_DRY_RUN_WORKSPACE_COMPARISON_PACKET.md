# First Paid Launch Roofer Dry-Run Workspace Comparison Packet

## Purpose

This packet adds a comparison verifier for roofer dry-run onboarding workspaces.

It generates a fresh local dry-run workspace, compares required structure and safety content against the known-good sample fixture, and then cleans up the temporary workspace.

## Verifier

- `backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js`

## Sample fixture

- `fixtures/roofer-dry-run-workspace/sample-roofer/`

## Safety

This verifier is local and planning-only.

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
