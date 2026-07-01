# Build 286 — First Pilot Roofer Outreach / Onboarding Readiness Packet

**Purpose:** Now that Build 286 captured the **first controlled roofer end-to-end live pass** (mapped roofer +
lead + call + booking all persisted live from one Build 285-approved PSTN call, no retry — see
`docs/FIRST_ROOFER_E2E_LIVE_BOOKING_PASS_EVIDENCE_BUILD_286.md`), the technical path is validated in
production. This packet identifies the next **material business step**: preparing the first real pilot roofer
outreach/onboarding — without expanding any live automation or contacting anyone without separate approval.

**Mode:** repo-only planning document. This packet performs no call, no SMS, no provider action, no config
change, no deploy, and contacts no real homeowner or roofer. Every outward action below is gated behind a
separate explicit approval.

---

## 1. Where we are

- **Technical readiness:** VALIDATED live. First controlled roofer E2E is a full pass — mapped roofer resolves,
  lead persists, call persists, and booking persists, all from a single approved live PSTN call to the clean
  Vapi Test Number ending `0389`. Build 284's conservative summary/transcript booking fallback is deployed and
  proven live; Build 281 structuredOutputs support is preserved.
- **Business readiness:** the next step is to prepare the first **real** pilot roofer outreach/onboarding
  package, not another technical live test.

## 2. Hard guardrails for the pilot (unchanged from prior builds)

1. **Do NOT change the existing Twilio→Retell number.** The established Twilio→Retell voice route stays exactly
   as configured. The pilot does not touch it.
2. **Use the clean Vapi-managed number path** (clean Vapi Test Number ending `0389`, already mapped to the
   controlled test roofer row) for the controlled pilot — the same path just validated end-to-end.
3. **No public / live automation expansion without separate approval.** No new outbound automation, no bulk
   SMS, no broadening of the webhook/number surface beyond the single mapped pilot path.
4. **No real homeowner or real roofer contact without separate approval.** Outreach copy and onboarding steps
   are prepared here as drafts; sending/onboarding anyone real requires a separate explicit Jason approval.
5. **One controlled action at a time.** Any live step (a pilot roofer's first mapped call, any outreach send)
   is a single, separately-approved, no-retry action with sanitized evidence captured afterward.

## 3. First pilot roofer outreach/onboarding package — components to prepare

These are the concrete deliverables for the next build(s); this packet frames them, it does not send anything.

1. **Target profile:** one local roofing contractor willing to run a short controlled pilot (single mapped
   number, founder-led, low volume). No list-building or mass outreach.
2. **Outreach message (draft only):** a short, honest founder-led note explaining the offer — inbound roofing
   calls answered by an AI assistant that books in-person site visits and persists the lead + call + booking to
   the roofer's dashboard. Prepared as a draft; not sent without separate approval.
3. **Onboarding intake:** reuse the existing intake templates
   (`docs/REAL_PILOT_CLIENT_INTAKE_TEMPLATE.md`, `docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md`) to collect
   the pilot roofer's business details and the destination the mapped clean Vapi path should route bookings to.
4. **Number mapping:** the pilot uses the clean Vapi-managed number path (last-4 `0389`) already mapped to the
   controlled test roofer row; a real pilot roofer's own row/mapping change is an out-of-band, separately
   approved single-row action (as in Builds 272–273), never an in-repo agent write.
5. **Success definition for the pilot:** at least one real inbound call → answered → lead + call + booking
   persisted and visible to the roofer, mirroring the now-validated E2E path.
6. **Sanitized evidence capture plan:** each pilot milestone captured repo-only with masked IDs/phone/email,
   consistent with Builds 274–286.

## 4. Explicitly NOT in scope for this packet

- No changes to the Twilio→Retell number or route.
- No new calls, SMS, or provider/config/deploy actions.
- No real homeowner or real roofer contact.
- No public automation expansion or number-surface broadening.
- No schema/auth/RLS change, no production data export, no secret read.

## 5. Next single material step

Prepare the first real pilot roofer outreach draft + onboarding intake bundle (components §3.1–§3.3) as
repo-only drafts, then obtain a **separate explicit approval** before any real contact. The controlled pilot
call path itself remains the already-validated clean Vapi-managed number path (last-4 `0389`); the existing
Twilio→Retell number is not changed.

- `live_roofer_testing_sales_readiness_status = ready_for_pilot_package`
- `pilot_number_path = clean_vapi_managed_last4_0389`
- `existing_twilio_retell_number_changed = false`
- `public_live_automation_expansion = none_without_separate_approval`
- `real_homeowner_or_roofer_contact = none_without_separate_approval`
