# Roofer Dry-Run First Roofer Founder Review Decision Packet

Purpose: give the founder/operator one final planning-only PASS / HOLD / BLOCKED decision packet after internal handoff review and before any real contractor setup planning.

This packet is planning-only. It does not activate production.

## When to use this packet

Use this after:

1. `scripts/qa-first-roofer-readiness-packet.sh <roofer-slug>` passes.
2. `docs/ROOFER_DRY_RUN_FIRST_ROOFER_INTERNAL_HANDOFF_SUMMARY_PACKET.md` is reviewed.
3. Any needed `docs/ROOFER_DRY_RUN_FIRST_ROOFER_MANUAL_FOLLOW_UP_PACKET.md` items are resolved or clearly marked still missing.

Do not use this packet to activate live services.

## Founder review status

Choose one:

- PASS TO MANUAL SETUP PLANNING: founder/operator approves moving to manual setup planning only.
- HOLD FOR ROOFER FOLLOW-UP: missing roofer information must be collected manually before setup planning continues.
- HOLD FOR INTERNAL CLEANUP: the internal packet needs cleanup before setup planning.
- BLOCKED BY SAFETY RISK: production activation, data mutation, notification, route, credential, or approval risk was found.

## Review inputs

Confirm each source was reviewed before making the decision:

- First roofer readiness packet QA reviewed:
- First roofer setup packet reviewed:
- First roofer manual follow-up packet reviewed if needed:
- First roofer internal handoff summary reviewed:
- Missing information status reviewed:
- Safety boundary reviewed:
- Final founder/operator decision recorded:

## Founder/operator decision summary

- Roofer slug:
- Roofing company name:
- Founder/operator reviewer:
- Review date:
- Decision:
- Reason for decision:
- Remaining information needed:
- Internal cleanup needed:
- Safety risk found:
- Next manual owner:
- Target next review date:

## PASS criteria

Choose PASS TO MANUAL SETUP PLANNING only if:

- Dry-run readiness QA passed.
- The setup packet is complete enough for internal planning.
- Missing information is either resolved or clearly assigned for manual follow-up.
- The internal handoff summary is clear.
- No live service action is required.
- All production activation flags remain false.
- No secrets are exposed.
- Founder/operator understands this is manual planning only.

## HOLD criteria

Choose HOLD FOR ROOFER FOLLOW-UP if:

- Roofer company details are missing.
- Service area details are missing.
- Services or qualification details are missing.
- Booking preferences are missing.
- Emergency or insurance handling details are missing.
- Lead source details are missing.
- Manual review or reporting preferences are missing.
- Founder/operator cannot proceed without manual roofer confirmation.

Choose HOLD FOR INTERNAL CLEANUP if:

- Packet details conflict.
- Notes are unclear.
- The handoff summary is incomplete.
- Missing information is not clearly assigned.
- The founder/operator decision cannot be made from the current packet.

## BLOCKED criteria

Choose BLOCKED BY SAFETY RISK if:

- Any production activation flag is true.
- Any live SMS, call, email, notification, Calendar booking, Vapi production ingestion, Retell production route, Supabase mutation, cron, scheduler, dispatcher, public route, credential, secret exposure, or destructive action is requested.
- Any contractor or homeowner notification is requested.
- Any step implies production activation before explicit founder/operator approval.

## Founder/operator decision note

Use this section as the final internal note.

The founder/operator reviewed the first roofer dry-run packet chain. This decision is planning-only. A PASS means manual setup planning may continue, not production activation. A HOLD means manual follow-up or internal cleanup is required. A BLOCKED decision means the safety risk must be resolved before any further setup planning.

## Approved next manual action

Choose one:

- Continue to manual setup planning.
- Contact roofer manually for missing information.
- Clean up internal packet before review.
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

## Final founder decision

Choose one:

- FOUNDER PASS: continue to manual setup planning only.
- FOUNDER HOLD: collect missing roofer information manually.
- FOUNDER HOLD: clean up internal packet before review.
- FOUNDER BLOCKED: resolve safety risk before continuing.

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not place live calls.

Do not send live emails.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
