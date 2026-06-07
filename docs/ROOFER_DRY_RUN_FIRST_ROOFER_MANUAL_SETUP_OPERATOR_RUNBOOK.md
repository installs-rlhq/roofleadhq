# Roofer Dry-Run First Roofer Manual Setup Operator Runbook

## Purpose

This operator runbook converts the first-roofer manual setup rehearsal into a structured internal dry-run checklist for founder/operator use.

This is operator-runbook-only and dry-run only. It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions.

## Operator runbook scope

- Verify source of truth in Terminal 1.
- Confirm manual setup planning QA exists.
- Confirm manual setup rehearsal exists.
- Run the manual setup rehearsal wrapper.
- Confirm production gate checks remain passing.
- Confirm aggregate safe readiness remains passing.
- Exit without production activation.

## Required files

- `scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh`
- `scripts/rehearse-first-roofer-manual-setup-dry-run.sh`
- `scripts/qa-first-roofer-manual-setup-planning.sh`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js`
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

## Operator checklist

1. Confirm Terminal 1 source-of-truth verification passes.
2. Confirm the manual setup planning QA wrapper passes.
3. Confirm the manual setup rehearsal wrapper passes.
4. Confirm production gates pass.
5. Confirm aggregate safe readiness passes.
6. Confirm no production systems are activated.
7. Confirm the next action remains internal operator review only.

## Operator decision language

MANUAL SETUP OPERATOR RUNBOOK PASS: manual setup rehearsal can be used internally by the founder/operator in dry-run mode only.

MANUAL SETUP OPERATOR RUNBOOK HOLD: missing wrapper, missing rehearsal verifier, missing safety language, or unclear operator status must be fixed.

MANUAL SETUP OPERATOR RUNBOOK BLOCKED: production activation, data mutation, notification, route, credential, secret, or destructive-action risk must be resolved before continuing.

## Final safety confirmation

This operator runbook is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
