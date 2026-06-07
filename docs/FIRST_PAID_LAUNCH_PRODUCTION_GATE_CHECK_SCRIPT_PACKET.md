# First Paid Launch Production Gate Check Script Packet

## Purpose

This packet adds a repo-controlled, read-only production gate check for RoofLeadHQ founder-led launch safety.

The goal is to make larger onboarding and launch-readiness builds safer by ensuring production activation cannot quietly slip into the repo.

This packet is docs/scripts/read-only only.

## Current source of truth

Latest verified source-of-truth milestone:

- `a01693d test(pilot): record production send intent bridge milestone`

Step 66 is already present and guarded:

- `9ddfebd feat(sms): add production send intent bridge`

Do not cherry-pick, merge, or re-apply Step 66.

## Production gate rules

The production gate check must preserve these disabled states unless explicit founder approval is given:

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

## Additional blocked production paths

The gate check also protects against:

- live SMS/Twilio sends
- production Supabase writes
- Supabase schema mutation or migration
- Vapi production webhook ingestion
- live Vapi webhook route
- Vapi calls from code
- Retell route activation
- Calendar booking activation
- Resend production activation
- Lindy production activation
- contractor notifications
- homeowner notifications
- cron activation
- scheduler activation
- dispatcher activation
- public production route activation
- secrets exposure
- destructive operations

## Step 66 bridge rule

The production send intent bridge exists as a guarded source-code milestone.

It does not authorize live SMS sends.

The bridge must remain separated from live production approval.

## Safe work allowed

Safe work remains:

- docs
- read-only verifiers
- dry-run scripts
- local planning files
- non-production readiness checks
- context updates
- guard scripts
- CI/readiness script improvements

## Required proof

Before commit, Terminal 1 must prove:

- source of truth verified
- production gate verifier passes
- aggregate safe readiness passes
- backend build passes
- diff proof shown
- no production activation occurred
