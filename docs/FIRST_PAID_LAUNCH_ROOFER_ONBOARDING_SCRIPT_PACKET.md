# First Paid Launch Roofer Onboarding Script Packet

## Purpose

The First Paid Launch Roofer Onboarding Script Packet starts moving RoofLeadHQ from manual agent-driven setup toward repeatable, repo-controlled roofer onboarding.

The goal is to create safe onboarding script foundations that can prepare roofer-specific configuration checks without activating production SMS, Calendar booking, Vapi, Supabase writes, cron, scheduler, dispatcher, or public production routes.

## Current Role

This packet is docs, script skeletons, and read-only verification only.

It does not onboard a live roofer automatically.

It does not activate production systems.

It prepares the safe path for repeatable onboarding.

## Added Scripts

- `scripts/onboard-roofer.sh`
- `scripts/verify-roofer-dry-run-onboarding-workspace.sh`

## Existing Readiness Script Preservation

The existing tracked script `scripts/verify-roofer-onboarding-readiness.sh` is preserved and must not be overwritten by this packet.

The new dry-run workspace verifier is intentionally separate so older repo, build, environment, and onboarding readiness checks remain intact.

## onboard-roofer.sh

The onboarding script is a safe skeleton for future roofer setup.

It accepts a roofer slug and creates a local dry-run onboarding workspace under:

- `.roofleadhq/onboarding/<roofer-slug>/`

The script writes planning-only files and does not mutate production systems.

## verify-roofer-dry-run-onboarding-workspace.sh

The readiness verifier checks for required local onboarding files and confirms production activation flags remain disabled.

It is intended to support future repeatable onboarding without relying on agent improvisation.

## Required Safe Flags

Future roofer onboarding must preserve explicit production safety flags.

Required disabled defaults:

- SMS activation disabled
- Calendar activation disabled
- Vapi activation disabled
- Supabase writes disabled
- Contractor notification disabled
- Homeowner notification disabled
- Cron activation disabled
- Scheduler activation disabled
- Dispatcher activation disabled
- Public route activation disabled

## Future Per-Roofer Configuration

Future onboarding may include safe per-roofer planning fields such as:

- roofer slug
- company name
- service area
- office phone
- lead sources
- booking preferences
- calendar preference
- follow-up preference
- reporting preference
- emergency escalation preference
- contractor notification preference

These fields must remain planning-only until explicit production approval is granted.

## Activation Gates

No production behavior may be activated unless all of the following are true:

1. The founder explicitly approves the production activation.
2. The relevant production flag is changed intentionally.
3. Terminal 1 verifies the diff.
4. Read-only verifiers pass.
5. Backend build passes.
6. `HEAD` and `origin/main` match after commit/push.
7. The activation is documented in the relevant launch packet.

## What Not To Touch

Do not send SMS.

Do not write to Supabase.

Do not mutate schema.

Do not activate Vapi.

Do not activate Retell.

Do not book Calendar appointments.

Do not send Resend emails.

Do not activate Lindy production workflows.

Do not notify contractors.

Do not notify homeowners.

Do not activate cron.

Do not activate scheduler.

Do not activate dispatcher.

Do not activate public production routes.

Do not expose secrets.

Do not perform destructive operations.

## Business Language

Use book inspections and book appointments.

Do not use job-booking phrasing, guaranteed work claims, revenue-result guarantee claims, or legacy short-pilot wording.

## Safety Confirmation

Safety remains demo-ready with live automation disabled.

No live SMS/Twilio sends.

No production Supabase writes.

No Supabase schema mutation.

No Vapi production webhook ingestion.

No live Vapi webhook route.

No Vapi calls from code.

No Retell route activation.

No Calendar booking activation.

No Resend production activation.

No Lindy production activation.

No cron activation.

No scheduler activation.

No dispatcher activation.

No public production route activation.

No secrets exposure.

No destructive operations.

`scripts/verify-roofer-onboarding-readiness.sh` is preserved.

`scripts/verify-roofer-dry-run-onboarding-workspace.sh` verifies the dry-run onboarding workspace.

The existing readiness script must not be overwritten by this packet.
