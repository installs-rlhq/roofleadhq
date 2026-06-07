# Roofer Dry-Run First Roofer Manual Setup Operator Acceptance

## Purpose

This operator acceptance packet converts the first-roofer manual setup operator runbook into a structured PASS, HOLD, or BLOCKED internal acceptance review.

This is operator-acceptance-only and dry-run only. It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions.

## Operator acceptance scope

- Verify source of truth in Terminal 1.
- Confirm manual setup planning QA exists.
- Confirm manual setup rehearsal exists.
- Confirm manual setup operator runbook exists.
- Run the manual setup operator runbook wrapper.
- Confirm production gate checks remain passing.
- Confirm aggregate safe readiness remains passing.
- Exit without production activation.

## Required files

- `scripts/accept-first-roofer-manual-setup-operator-dry-run.sh`
- `scripts/run-first-roofer-manual-setup-operator-runbook-dry-run.sh`
- `scripts/rehearse-first-roofer-manual-setup-dry-run.sh`
- `scripts/qa-first-roofer-manual-setup-planning.sh`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_RUNBOOK.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_REHEARSAL.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_QA.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js`
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

## Acceptance checklist

1. Confirm Terminal 1 source-of-truth verification passes.
2. Confirm the manual setup planning QA wrapper passes.
3. Confirm the manual setup rehearsal wrapper passes.
4. Confirm the manual setup operator runbook wrapper passes.
5. Confirm production gates pass.
6. Confirm aggregate safe readiness passes.
7. Confirm no production systems are activated.
8. Confirm the next action remains internal founder/operator acceptance review only.

## Operator acceptance decision language

MANUAL SETUP OPERATOR ACCEPTANCE PASS: manual setup operator runbook can be accepted internally by the founder/operator in dry-run mode only.

MANUAL SETUP OPERATOR ACCEPTANCE HOLD: missing wrapper, missing runbook verifier, missing safety language, or unclear acceptance status must be fixed.

MANUAL SETUP OPERATOR ACCEPTANCE BLOCKED: production activation, data mutation, notification, route, credential, secret, or destructive-action risk must be resolved before continuing.

## Final safety confirmation

This operator acceptance packet is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
