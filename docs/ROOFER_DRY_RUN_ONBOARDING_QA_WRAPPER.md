# Roofer Dry-Run Onboarding QA Wrapper

This document records the safe one-command QA wrapper for roofer dry-run onboarding.

## Command

Run from Terminal 1:

    scripts/qa-roofer-dry-run-onboarding.sh

Optional slug override:

    scripts/qa-roofer-dry-run-onboarding.sh acme-roofing

## What the wrapper verifies

The wrapper performs the local dry-run onboarding QA sequence in one step:

- Verifies source of truth when `scripts/verify-source-of-truth.sh` is available.
- Creates a temporary roofer dry-run workspace under `.roofleadhq/onboarding/`.
- Confirms the expected generated files exist.
- Confirms `WORKSPACE_MODE=dry-run`.
- Confirms all production activation flags are false.
- Confirms safety language exists in the generated workspace.
- Compares generated files against the known-good sample fixture.
- Cleans up the temporary workspace.
- Exits without production activation.

## Required generated files

- `README.md`
- `intake.md`
- `safety-flags.env`
- `activation-flags.env`
- `workspace-metadata.env`
- `onboarding-checklist.md`

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

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
