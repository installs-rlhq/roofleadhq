# Roofer Dry-Run First Roofer Manual Setup Planning Packet

Purpose: convert a founder/operator PASS decision into a safe, planning-only manual setup checklist before any real contractor setup work begins.

This packet is planning-only. It does not activate production.

## When to use this packet

Use this after:

1. `docs/ROOFER_DRY_RUN_FIRST_ROOFER_FOUNDER_REVIEW_DECISION_PACKET.md` is marked FOUNDER PASS.
2. The founder/operator confirms the next action is manual setup planning only.
3. All dry-run safety flags remain disabled.

Do not use this packet to activate live services.

## Manual setup planning status

Choose one:

- READY FOR MANUAL SETUP PLANNING: founder PASS exists and setup planning can be outlined without production activation.
- HOLD FOR FOUNDER REVIEW: founder PASS is missing, unclear, or incomplete.
- HOLD FOR ROOFER FOLLOW-UP: missing roofer information must be collected manually before setup planning.
- BLOCKED BY SAFETY RISK: production activation, data mutation, notification, route, credential, or approval risk was found.

## Required inputs

Confirm each item before planning:

- Founder review decision packet reviewed:
- Final founder decision is FOUNDER PASS:
- Internal handoff summary reviewed:
- Setup packet reviewed:
- Manual follow-up packet reviewed if needed:
- Missing information resolved or assigned:
- Safety boundary reviewed:
- Production activation remains disabled:

## Manual setup planning checklist

Use this section to outline safe planning work only.

- Roofer profile copy to prepare:
- Service area notes to prepare:
- Services and qualification notes to prepare:
- Emergency handling notes to prepare:
- Insurance/storm handling notes to prepare:
- Lead source notes to prepare:
- Manual review rules to prepare:
- Reporting preference notes to prepare:
- Internal QA notes to prepare:
- Founder/operator review notes to prepare:

## Explicit do-not-activate gates

Do not continue if any item below is requested or implied:

- Activate production.
- Send live SMS.
- Place live calls.
- Send live emails.
- Mutate Supabase.
- Notify contractors.
- Notify homeowners.
- Enable Calendar booking.
- Enable Vapi production webhook ingestion.
- Enable Retell production routes.
- Enable cron, scheduler, dispatcher, or public production routes.
- Add or expose secrets.
- Run destructive actions.

## Planning-only allowed work

The following work is allowed only as local planning or documentation:

- Draft setup notes.
- Draft intake copy.
- Draft manual review rules.
- Draft service area notes.
- Draft service qualification notes.
- Draft emergency handling notes.
- Draft reporting preferences.
- Draft internal QA checklist items.
- Prepare questions for founder/operator review.
- Prepare questions for manual roofer follow-up.

## Manual setup planning note

Use this section as the setup planning summary.

The first roofer has a founder/operator PASS for manual setup planning only. This packet does not approve production activation. Setup planning may continue as documentation and internal review only. Any live service action requires a separate explicit approval and a separate production gate.

## Next safe action

Choose one:

- Draft manual setup notes.
- Prepare founder/operator review notes.
- Contact roofer manually for remaining information.
- Stop and resolve safety risk.

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
- No live calls are approved.
- No live email send is approved.
- No Supabase mutation is approved.
- No contractor or homeowner notification is approved.
- No Calendar booking activation is approved.
- No Vapi production webhook ingestion is approved.
- No Retell production route is approved.
- No cron, scheduler, dispatcher, or public route activation is approved.
- No secrets are exposed.

## Final setup planning decision

Choose one:

- SETUP PLANNING READY: continue local documentation and internal review only.
- SETUP PLANNING HOLD: founder review, roofer follow-up, or internal cleanup is still needed.
- SETUP PLANNING BLOCKED: resolve safety risk before continuing.

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not place live calls.

Do not send live emails.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
