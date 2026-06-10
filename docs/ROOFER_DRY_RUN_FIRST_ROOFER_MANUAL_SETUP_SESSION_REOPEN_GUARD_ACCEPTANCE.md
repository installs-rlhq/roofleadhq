# Roofer Dry-Run — First Roofer Manual Setup Session Reopen Guard Acceptance

## Purpose

Records founder/operator acceptance of the First Roofer Manual Setup Session Reopen Guard.

This packet confirms the reopen guard has been reviewed, the preserved and frozen session chain remains protected from accidental mutation, and any future reopen requires an explicit founder/operator decision.

This packet is dry-run only, internal-only, founder/operator-only, and does not activate production automation.

## Required Upstream Chain

- session runbook
- session notes
- session QA
- session QA acceptance
- session closeout
- session handoff
- session handoff acceptance
- session next action
- session next action acceptance
- session outcome
- session outcome acceptance
- session final summary
- session final summary acceptance
- session archive
- session archive acceptance
- session archive final check
- session archive final check acceptance
- session completion lock
- session completion lock acceptance
- session final lock
- session final lock acceptance
- session preservation snapshot
- session operator handoff freeze
- session reopen guard

## Acceptance Criteria

Founder/operator acceptance confirms:

- the reopen guard has passed
- the operator handoff freeze has passed
- the preservation snapshot has passed
- the final lock acceptance remains intact
- accidental mutation is blocked unless a reopen decision is explicitly recorded
- any future reopen decision must explain scope, reason, affected packet, corrective or clarification-only intent, and follow-up acceptance/freeze needs
- live automation remains disabled

## Required Safety Flags

WORKSPACE_MODE=dry-run
SMS_ACTIVATION=false
CALENDAR_ACTIVATION=false
VAPI_ACTIVATION=false
SUPABASE_WRITES=false
CONTRACTOR_NOTIFICATION=false
HOMEOWNER_NOTIFICATION=false
CRON_ACTIVATION=false
SCHEDULER_ACTIVATION=false
DISPATCHER_ACTIVATION=false
PUBLIC_ROUTE_ACTIVATION=false

## Decision Language

MANUAL SETUP SESSION REOPEN GUARD ACCEPTANCE PASS
MANUAL SETUP SESSION REOPEN GUARD ACCEPTANCE HOLD
MANUAL SETUP SESSION REOPEN GUARD ACCEPTANCE BLOCKED

## PASS

Use PASS only when founder/operator review confirms the reopen guard is complete, verified, dry-run only, and accepted as the controlling rule for any future session-chain reopening.

## HOLD

Use HOLD when the chain is safe but needs a non-blocking clarification before the reopen guard acceptance should be relied on.

## BLOCKED

Use BLOCKED when any upstream dependency, safety flag, read-only verification requirement, aggregate wiring, context reference, or no-production-activation guard is missing.

## Safety

This packet does not send SMS, does not make calls, does not send email, does not write to Supabase, does not notify contractors, does not notify homeowners, does not book Calendar events, does not activate Vapi, does not activate Retell, does not start cron, does not start a scheduler, does not start a dispatcher, and does not expose a public route.
