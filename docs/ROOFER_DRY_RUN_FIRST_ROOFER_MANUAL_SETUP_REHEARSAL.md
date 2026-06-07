# Roofer Dry-Run First Roofer Manual Setup Rehearsal

## Purpose

This rehearsal packet verifies that the first-roofer manual setup planning QA chain can be rehearsed internally before any real setup work begins.

This is rehearsal-only and dry-run only. It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions.

## Rehearsal scope

- Verify source of truth in Terminal 1.
- Verify manual setup planning QA is present.
- Verify manual setup planning QA wrapper is executable.
- Verify manual setup planning QA verifier is present.
- Run the manual setup planning QA wrapper.
- Run production gate checks.
- Run aggregate safe readiness.
- Exit without production activation.

## Required files

- `scripts/rehearse-first-roofer-manual-setup-dry-run.sh`
- `scripts/qa-first-roofer-manual-setup-planning.sh`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js`

## Required dry-run flags

- WORKSPACE_MODE=dry-run
- SMS_ACTIVATION=false
- CALENDAR_ACTIVATION=false
- VAPI_ACTIVATION=false
- SUPABASE_WRITES=false
- CONTRACTOR_NOTIFICATION=false
- HOMEOWNER_NOTIFICATION=false
- CRON_ACTIVATION=false
- SCHEDULER_ACTIVATION=false
- DISPATCHER_ACTIVATION=false
- PUBLIC_ROUTE_ACTIVATION=false

## Rehearsal decision language

MANUAL SETUP REHEARSAL PASS: manual setup planning QA can be rehearsed internally in dry-run mode only.

MANUAL SETUP REHEARSAL HOLD: missing wrapper, missing QA verifier, missing safety language, or unclear rehearsal status must be fixed.

MANUAL SETUP REHEARSAL BLOCKED: production activation, data mutation, notification, route, credential, secret, or destructive-action risk must be resolved before continuing.

## Final safety confirmation

This rehearsal is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
