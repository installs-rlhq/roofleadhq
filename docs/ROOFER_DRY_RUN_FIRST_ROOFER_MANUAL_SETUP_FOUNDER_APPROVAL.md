# Roofer Dry-Run First Roofer Manual Setup Founder Approval

## Purpose

This founder approval packet converts the first-roofer manual setup operator acceptance into a structured PASS, HOLD, or BLOCKED internal founder review.

This is founder-approval-only and dry-run only. It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions.

## Founder approval scope

- Verify source of truth in Terminal 1.
- Confirm operator acceptance packet exists.
- Confirm operator acceptance wrapper exists.
- Confirm operator acceptance verifier exists.
- Confirm operator runbook exists.
- Confirm manual setup rehearsal exists.
- Confirm manual setup planning QA exists.
- Verify required dry-run safety flags.
- Verify explicit do-not-activate gates.
- Run the operator acceptance wrapper.
- Run production gate checks.
- Run aggregate safe readiness.
- Exit without production activation.

## Required files

- `scripts/approve-first-roofer-manual-setup-founder-dry-run.sh`
- `scripts/accept-first-roofer-manual-setup-operator-dry-run.sh`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_FOUNDER_APPROVAL.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_OPERATOR_ACCEPTANCE.md`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js`

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

## Founder approval checklist

1. Confirm Terminal 1 source-of-truth verification passes.
2. Confirm the operator acceptance wrapper passes.
3. Confirm production gates pass.
4. Confirm aggregate safe readiness passes.
5. Confirm no production systems are activated.
6. Confirm the next action remains internal founder/operator acceptance review only.

## Founder approval decision language

MANUAL SETUP FOUNDER APPROVAL PASS: operator acceptance can be approved internally by the founder/operator in dry-run mode only.

MANUAL SETUP FOUNDER APPROVAL PASS: manual/internal founder/operator

MANUAL SETUP FOUNDER APPROVAL PASS: No production activation

MANUAL SETUP FOUNDER APPROVAL HOLD: missing acceptance packet, missing runbook, missing rehearsal verifier, missing safety language, or unclear founder approval status must be fixed.

MANUAL SETUP FOUNDER APPROVAL BLOCKED: production activation, data mutation, notification, route, credential, secret, or destructive-action risk must be resolved before continuing.

## Final safety confirmation

This founder approval packet is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
