# Roofer Dry-Run First Roofer Setup Packet

Purpose: provide a founder/operator-ready planning packet for the first roofer after the dry-run QA wrapper passes and the operator acceptance checklist is reviewed.

This packet is planning-only. It does not activate production.

## When to use this packet

Use this after:

1. `scripts/qa-roofer-dry-run-onboarding.sh <roofer-slug>` passes.
2. `docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md` is reviewed.
3. The founder/operator is ready to summarize the roofer setup plan for manual review.

Do not use this packet to activate live services.

## Packet status

Choose one:

- READY FOR MANUAL REVIEW: dry-run intake is complete enough for founder/operator review.
- NEEDS ROOFER FOLLOW-UP: missing information must be collected before setup planning continues.
- BLOCKED: production activation, data mutation, notification, route, credential, or approval risk was found.

## Roofer profile summary

- Roofer slug:
- Roofing company name:
- Owner/operator name:
- Primary phone:
- Primary email:
- Website:
- Google Business Profile:
- Facebook page:

## Service area summary

- Cities:
- States:
- Service radius:
- Excluded areas:
- Notes or missing information:

## Service offering summary

- Emergency leaks:
- Storm damage:
- Insurance claims:
- Roof inspections:
- Roof replacement:
- Roof repair:
- Gutters:
- Other:
- Notes or missing information:

## Booking preference summary

- Appointment booking preference:
- Preferred appointment windows:
- Calendar readiness:
- After-hours handling:
- Missed-call recovery preference:
- Notes or missing information:

## Lead source summary

- Website forms:
- Google Business Profile:
- Facebook:
- Phone calls:
- Texts:
- Emails:
- Other:
- Notes or missing information:

## Manual review and reporting summary

- Manual review preference:
- Emergency escalation preference:
- Contractor notification preference:
- Reporting preference:
- Internal notes:
- Notes or missing information:

## Founder/operator setup notes

Use this section to record the next manual setup tasks without activating production.

- Copy or configuration needed:
- Questions for roofer:
- Follow-up needed:
- Manual review owner:
- Target review date:
- Setup risk notes:

## Dry-run safety confirmation

Required dry-run flags:

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

Required safety decision:

- Production activation remains disabled.
- No live SMS or Twilio send is approved.
- No Supabase mutation is approved.
- No contractor or homeowner notification is approved.
- No Calendar booking activation is approved.
- No Vapi production webhook ingestion is approved.
- No Retell production route is approved.
- No cron, scheduler, dispatcher, or public route activation is approved.
- No secrets are exposed.

## Final decision

Choose one:

- PROCEED TO MANUAL SETUP PLANNING: dry-run packet is ready for founder/operator planning.
- HOLD FOR MISSING INFORMATION: more roofer information is needed.
- BLOCKED BY SAFETY RISK: production activation, data mutation, notification, route, credential, or approval risk must be resolved first.

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
