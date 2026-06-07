# Roofer Dry-Run Operator Acceptance Checklist

Purpose: give the founder/operator a clear internal pass/fail review before moving any roofer from dry-run onboarding toward real setup planning.

This checklist is planning-only. It does not activate production.

## When to use this checklist

Use this after the one-command QA wrapper passes:

    scripts/qa-roofer-dry-run-onboarding.sh <roofer-slug>

Use it before any real contractor setup, production data work, notifications, booking activation, SMS, Vapi ingestion, scheduler, dispatcher, cron, or public route activation.

## Acceptance result

Choose one:

- PASS: dry-run onboarding workspace is ready for founder/operator manual review.
- HOLD: dry-run onboarding workspace needs correction before review.
- BLOCKED: production activation, data mutation, notification, route, credential, or approval risk was found.

## Required dry-run workspace checks

The workspace must include:

- `README.md`
- `intake.md`
- `safety-flags.env`
- `activation-flags.env`
- `workspace-metadata.env`
- `onboarding-checklist.md`

The workspace must include:

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

## Required operator review checks

Mark PASS, HOLD, or BLOCKED for each item.

| Check | Result | Notes |
| --- | --- | --- |
| Company and owner/operator details are present or clearly marked missing |  |  |
| Service area is present or clearly marked missing |  |  |
| Services offered are present or clearly marked missing |  |  |
| Emergency leak handling preference is present or clearly marked missing |  |  |
| Storm damage and insurance claim handling preference is present or clearly marked missing |  |  |
| Appointment booking preference is present or clearly marked missing |  |  |
| Calendar readiness is marked as dry-run only or not ready |  |  |
| Lead source channels are present or clearly marked missing |  |  |
| Missed-call recovery preference is present or clearly marked missing |  |  |
| Manual review preference is present or clearly marked missing |  |  |
| Reporting preference is present or clearly marked missing |  |  |
| Safety language is visible in generated workspace files |  |  |
| No production activation flags are enabled |  |  |
| No secrets are exposed |  |  |
| No live SMS, calls, emails, notifications, routes, cron, scheduler, dispatcher, or Supabase writes are requested |  |  |

## Manual decision

PASS only if:

- The QA wrapper passed.
- All production activation flags remain false.
- Missing roofer information is clearly visible for manual follow-up.
- No live service action is required.
- Founder/operator can review the dry-run workspace without relying on production automation.

HOLD if:

- Required roofer details are missing and not clearly marked.
- The intake is unclear.
- The workspace needs formatting or copy cleanup.
- The founder/operator cannot confidently review the dry-run package yet.

BLOCKED if:

- Any production activation flag is true.
- Any live SMS, Calendar booking, Vapi production ingestion, Retell route, Supabase mutation, contractor notification, homeowner notification, cron, scheduler, dispatcher, public route, credential, or destructive action is requested.
- Any secret is exposed.

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
