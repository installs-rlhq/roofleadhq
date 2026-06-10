# Roofer Dry-Run — First Roofer Manual Setup Session Reopen Guard

## Purpose

Defines the internal founder/operator guard for safely reopening the fully accepted, preserved, and operator-handoff-frozen First Roofer Manual Setup Session dry-run chain.

This packet confirms the operator handoff freeze has passed and prevents accidental mutation of the final accepted session record.

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

## Reopen Rule

Do not modify the preserved session chain unless founder/operator review explicitly records a reopen decision.

A reopen decision must state:

- why the preserved chain needs to be reopened
- which packet or dependency is affected
- whether the change is clarification-only or corrective
- whether another acceptance/freeze layer is required afterward
- that live automation remains disabled

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

MANUAL SETUP SESSION REOPEN GUARD PASS
MANUAL SETUP SESSION REOPEN GUARD HOLD
MANUAL SETUP SESSION REOPEN GUARD BLOCKED

## PASS

Use PASS only when founder/operator review confirms the frozen session chain is complete, verified, dry-run only, and protected from accidental mutation unless a reopen decision is explicitly recorded.

## HOLD

Use HOLD when the chain is safe but needs a non-blocking clarification before the reopen guard should be relied on.

## BLOCKED

Use BLOCKED when any upstream dependency, safety flag, read-only verification requirement, aggregate wiring, context reference, or no-production-activation guard is missing.

## Safety

This packet does not send SMS, does not make calls, does not send email, does not write to Supabase, does not notify contractors, does not notify homeowners, does not book Calendar events, does not activate Vapi, does not activate Retell, does not start cron, does not start a scheduler, does not start a dispatcher, and does not expose a public route.
