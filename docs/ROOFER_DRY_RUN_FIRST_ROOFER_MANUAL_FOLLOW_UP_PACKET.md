# Roofer Dry-Run First Roofer Manual Follow-Up Packet

Purpose: give the founder/operator a planning-only follow-up script and question checklist when the first roofer dry-run readiness packet results in HOLD or missing information.

This packet is planning-only. It does not activate production.

## When to use this packet

Use this after:

1. `scripts/qa-first-roofer-readiness-packet.sh <roofer-slug>` passes.
2. `docs/ROOFER_DRY_RUN_OPERATOR_ACCEPTANCE_CHECKLIST.md` is marked HOLD, or
3. `docs/ROOFER_DRY_RUN_FIRST_ROOFER_SETUP_PACKET.md` is marked HOLD FOR MISSING INFORMATION.

Do not use this packet to activate live services.

## Follow-up status

Choose one:

- READY TO CONTACT ROOFER: missing information is clearly listed for founder/operator manual follow-up.
- HOLD FOR INTERNAL REVIEW: missing information is unclear or needs cleanup before contacting the roofer.
- BLOCKED BY SAFETY RISK: production activation, data mutation, notification, route, credential, or approval risk was found.

## Founder/operator opening script

Use this as a manual call or email guide:

Thanks again for helping us set up your RoofLeadHQ dry-run workspace. Before we move into any real setup planning, I want to confirm a few details so everything is accurate. This is still a manual planning step. We are not activating live texts, calls, calendar booking, notifications, or production automation from this review.

## Company profile questions

- What is the exact roofing company name you want used in customer-facing copy later?
- Who is the main owner/operator contact for setup questions?
- What phone number should be treated as the primary business number?
- What email should be treated as the primary business email?
- What website should be referenced?
- What Google Business Profile should be referenced?
- What Facebook page should be referenced?

## Service area questions

- Which cities should be included?
- Which states should be included?
- What is the normal service radius?
- Are there cities, counties, or neighborhoods you do not want to serve?
- Are there storm-season exceptions to your normal service area?

## Services and qualification questions

- Do you handle emergency leaks?
- Do you handle storm damage?
- Do you help homeowners with insurance claims?
- Do you offer roof inspections?
- Do you offer roof replacement?
- Do you offer roof repair?
- Do you offer gutters?
- Are there services you do not want RoofLeadHQ to mention later?
- Are there service types that should always be manually reviewed?

## Booking preference questions

- Do you want leads booked directly only after manual review, or should booking remain disabled for now?
- What appointment windows do you prefer?
- Is your calendar ready for planning, or should calendar setup remain marked not ready?
- How should after-hours leads be handled?
- How should missed calls be handled?
- What should happen when a lead sounds urgent?

## Emergency and insurance questions

- What qualifies as an emergency leak for your company?
- What should happen if a homeowner reports active interior water?
- What storm damage details matter most to you?
- Do you want insurance-claim leads treated differently?
- What should be escalated to you manually before any future automation is considered?

## Lead source questions

- Which lead sources should be included in the dry-run plan?
- Website forms?
- Google Business Profile?
- Facebook?
- Phone calls?
- Texts?
- Emails?
- Other sources?
- Are any lead sources out of scope for the first setup?

## Manual review and reporting questions

- Which leads do you want manually reviewed?
- Who should manually review urgent leads?
- How often do you want a lead summary report later?
- What information should appear in weekly reporting?
- What information should appear in monthly reporting?
- What decisions should remain founder/operator review only?

## Follow-up notes

- Missing company details:
- Missing service area details:
- Missing services or qualification details:
- Missing booking preference details:
- Missing emergency or insurance details:
- Missing lead source details:
- Missing manual review or reporting details:
- Internal notes:
- Founder/operator follow-up owner:
- Target follow-up date:

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

## Final follow-up decision

Choose one:

- ROOFER FOLLOW-UP READY: founder/operator can manually contact the roofer with the questions above.
- HOLD FOR CLEANUP: missing information needs to be clarified internally before contacting the roofer.
- BLOCKED BY SAFETY RISK: production activation, data mutation, notification, route, credential, or approval risk must be resolved first.

## Safety boundary

Production activation remains disabled.

Do not activate production.

Do not send live SMS.

Do not mutate Supabase.

Do not notify contractors or homeowners.

Do not enable Calendar booking, Vapi production webhook ingestion, Retell routes, cron, scheduler, dispatcher, or public production routes.
