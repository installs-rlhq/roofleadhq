# Roofer Dry-Run First Roofer Readiness Packet QA

Purpose: provide a one-command QA path for the full first roofer dry-run readiness packet before manual setup planning.

This QA path is planning-only. It does not activate production.

## Command

Run from Terminal 1:

    scripts/qa-first-roofer-readiness-packet.sh

Optional slug override:

    scripts/qa-first-roofer-readiness-packet.sh acme-roofing

## What this verifies

The wrapper verifies the full local dry-run planning chain:

1. Roofer dry-run onboarding QA wrapper.
2. Operator acceptance checklist.
3. First roofer setup packet.

It confirms:

- Source of truth is verified.
- The one-command onboarding QA wrapper passes.
- Required planning docs exist.
- Required read-only verifiers exist.
- Required read-only verifiers pass.
- PASS/HOLD/BLOCKED decision language exists.
- First roofer setup packet final decision language exists.
- Required dry-run flags remain present.
- Required safety language remains present.
- The temporary workspace is cleaned up.
- Production activation remains disabled.

## Required planning docs

- `docs/ROOFER_DRY_RUN_ONBOARDING_QA_WRAPPER.md`
- `docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md`

## Required verifiers

- `backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js`
- `backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js`

## Required disabled flags

- `WORKSPACE_MODE=dry-run`
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

No secrets are exposed.
