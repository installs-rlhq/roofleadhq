# Roofer Dry-Run First Roofer Manual Setup Planning QA

## Purpose

This QA packet verifies that the first-roofer founder PASS to manual setup planning chain is ready for internal planning review only.

It does not activate production. It does not create production records. It does not mutate Supabase. It does not send messages, emails, calls, alerts, contractor notifications, or homeowner notifications.

## Required source files

- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_READINESS_PACKET_QA.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md`
- `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_SETUP_PLANNING_PACKET.md`
- `scripts/qa-first-roofer-manual-setup-planning.sh`

## Required read-only verifiers

- `backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js`
- `backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js`
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

## QA decision language

MANUAL SETUP QA PASS: founder PASS and manual setup planning chain are ready for internal planning review only.

MANUAL SETUP QA HOLD: missing packet, missing verifier, missing safety language, or unclear planning status must be fixed.

MANUAL SETUP QA BLOCKED: production activation, data mutation, notification, route, credential, secret, or destructive-action risk must be resolved before continuing.

## Final safety confirmation

This QA wrapper is dry-run only. It does not activate production, send SMS, place calls, send emails, mutate Supabase, notify contractors or homeowners, enable Calendar booking, enable Vapi production webhook ingestion, enable Retell routes, enable cron, scheduler, dispatcher, or public production routes, expose secrets, or run destructive actions.
