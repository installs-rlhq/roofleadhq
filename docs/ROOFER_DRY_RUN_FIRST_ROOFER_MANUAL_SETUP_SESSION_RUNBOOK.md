# Roofer Dry-Run First Roofer Manual Setup Session Runbook

## Purpose

This session runbook guides the first manual setup session itself as a controlled internal dry-run procedure. It is an internal dry-run-only founder/operator session runbook without enabling production or performing any live setup automation.

This is session-runbook only and dry-run only. It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose secrets, or run destructive actions.

## Required upstream chain

- Source of truth verification
- Session runbook doc
- Session runbook wrapper
- Session runbook verifier
- Execution readiness doc/wrapper/verifier
- Final go/no-go doc/wrapper/verifier
- Founder approval evidence QA doc/wrapper/verifier
- Founder approval evidence doc/wrapper/verifier
- Founder approval doc/wrapper/verifier
- Operator acceptance doc/wrapper/verifier
- Operator runbook
- Rehearsal
- Planning QA
- Required dry-run flags
- Exact PASS/HOLD/BLOCKED session runbook language

## Pre-session checklist

1. Confirm Terminal 1 source-of-truth verification passes.
2. Confirm session runbook doc, wrapper, and verifier exist.
3. Confirm execution readiness chain exists and passes.
4. Confirm final go/no-go chain exists and passes.
5. Confirm founder approval evidence QA chain exists and passes.
6. Confirm founder approval evidence chain exists and passes.
7. Confirm founder approval chain exists and passes.
8. Confirm operator acceptance chain exists and passes.
9. Confirm operator runbook, rehearsal, and planning QA exist.
10. Confirm required dry-run safety flags are present.
11. Confirm explicit PASS/HOLD/BLOCKED session runbook language is present.
12. Run execution readiness wrapper.
13. Run production gate checks.
14. Run aggregate safe readiness.
15. Confirm no production systems are activated.

## Manual setup session procedure

1. Confirm all upstream verifiers passed.
2. Confirm all dry-run flags validated.
3. Confirm all safety boundaries confirmed.
4. Conduct manual setup session in dry-run mode only.
5. Record session notes using the template below.
6. Log any HOLD or BLOCKED issues immediately.
7. Confirm production activation remains disabled.

## Session note template

- Date / Time:
- Source of truth commit:
- All upstream verifiers: PASS
- Dry-run flags: Confirmed
- Safety boundaries: Confirmed
- Session outcome: PASS / HOLD / BLOCKED
- Notes:
- Next action:

## HOLD / BLOCKED issue logging

Any HOLD or BLOCKED status must be logged with:
- Issue description
- Required fix
- Re-verification steps

## Session runbook decision language

MANUAL SETUP SESSION RUNBOOK PASS: first-roofer manual setup session can be conducted internally by the founder/operator in dry-run mode only, with production activation still disabled.

MANUAL SETUP SESSION RUNBOOK PASS: internal/founder/operator session-runbook

MANUAL SETUP SESSION RUNBOOK HOLD: missing execution readiness proof, missing final go/no-go proof, missing session notes, missing wrapper proof, missing safety confirmation, or unclear session status must be fixed.

MANUAL SETUP SESSION RUNBOOK BLOCKED: production activation, data mutation, notification, route, credential, secret, destructive-action, or external-send risk must be resolved before continuing.

## Allowed actions

Internal founder/operator manual setup session procedure in dry-run mode only (production activation disabled).

## Disallowed actions

Any production activation, live SMS/Twilio, calls, emails, Supabase writes, contractor/homeowner notifications, Calendar booking, Vapi production ingestion, Retell routes, cron/scheduler/dispatcher/public route activation, secrets exposure, or destructive actions.

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

## Safety boundary

- Dry-run only
- Internal/founder/operator session-runbook only
- Manual setup session procedure only
- No production activation
- No live SMS/Twilio
- No calls
- No emails
- No Supabase writes
- No contractor/homeowner notifications
- No Calendar booking
- No Vapi production ingestion
- No Retell routes
- No cron/scheduler/dispatcher/public route activation
- No secrets
- No destructive actions

## Final safety confirmation

This session runbook is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
