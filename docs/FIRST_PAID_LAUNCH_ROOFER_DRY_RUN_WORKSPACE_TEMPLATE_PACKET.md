# First Paid Launch Roofer Dry-Run Workspace Template Packet

## Purpose

This packet adds reusable planning-only templates for roofer dry-run onboarding workspaces.

The templates support the Founder-Led Launch Program by standardizing intake, safety flags, and workspace notes before any production activation exists.

## Files

- `templates/roofer-dry-run-workspace/intake.md`
- `templates/roofer-dry-run-workspace/safety-flags.env`
- `templates/roofer-dry-run-workspace/README.md`

## Safety

All template workspaces must remain planning-only.

Required disabled flags:

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

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.

## Step 66 bridge rule

The Step 66 production send intent bridge remains present and guarded.

It does not authorize live SMS sends.
