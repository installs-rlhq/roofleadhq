# Build 287 — First Pilot Roofer Onboarding / Intake Bundle

**Date:** 2026-07-01 · **Mode:** repo-only intake template. Collecting these answers involves **no** provider
action, config change, deploy, call, SMS, or email send. Actually configuring the pilot from these answers is a
**separately approved** step (the number mapping itself is an out-of-band, single-row action as in Builds
272–273, never an in-repo agent write).

Part of `docs/FIRST_PILOT_SALES_PACKAGE_BUILD_287.md`. Complements the existing
`docs/REAL_PILOT_CLIENT_INTAKE_TEMPLATE.md` and `docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md` — this bundle
is the single intake sheet for the **first controlled pilot roofer**. Fill in `[BRACKETS]` with the roofer at
onboarding; do **not** commit real PII to the repo (keep the completed copy out-of-band).

- `onboarding_intake_bundle_status = created`

---

## 1. Company / contact basics

- Business name: `[  ]`
- Owner / primary contact name: `[  ]`
- Best contact method (call / text / email): `[  ]`
- Contact details (kept out-of-band, not committed): `[  ]`
- Website / social: `[  ]`
- Business hours / timezone: `[  ]`

## 2. Service area

- Cities / counties / ZIP codes served: `[  ]`
- Any areas explicitly **not** served (so the assistant can decline politely): `[  ]`
- Travel / distance limits for inspections: `[  ]`

## 3. Lead sources

- Where inbound calls come from today (Google, referrals, yard signs, ads, etc.): `[  ]`
- Rough current inbound call volume (per day/week): `[  ]`
- Typical after-hours / missed-call volume (missed-call capture is a core value): `[  ]`

## 4. Call routing (controlled pilot)

- Pilot uses the **clean Vapi-managed pilot number** (last-4 `0389`). The roofer's **existing business line and
  Twilio→Retell route are NOT changed.**
- How the roofer wants the pilot number used (forward missed calls to it / advertise it / test-only): `[  ]`
- Who should be notified when a lead or booking comes in: `[  ]`
- Escalation / live-transfer preference if a caller needs a human now: `[  ]` (default: capture lead + message,
  no live transfer during controlled pilot unless separately approved)

## 5. Calendar / booking rules

- Which days/times are bookable for inspections: `[  ]`
- Inspection appointment length / buffer: `[  ]`
- Max inspections per day: `[  ]`
- How far out to book (e.g., next 2 weeks): `[  ]`
- Lead time required before an appointment (e.g., not within 2 hours): `[  ]`
- Double-booking / conflict handling preference: `[  ]`

*The assistant books **inspections/appointments** only. It does not quote, estimate, invoice, or take payment.*

## 6. Emergency handling

- What counts as an emergency for this roofer (active leak, storm damage, etc.): `[  ]`
- How to handle emergencies during the pilot (capture + flag urgent / take message / who to notify): `[  ]`
- No promise of emergency dispatch or response time is made to callers unless the roofer explicitly provides one.

## 7. Insurance handling

- Does the roofer do insurance/storm claims work? `[  ]`
- If yes, what should the assistant capture (carrier, claim #, adjuster status) — **capture only, no advice**: `[  ]`
- The assistant does **not** give insurance advice, coverage opinions, or estimates — it captures and books an
  inspection.

## 8. Script / tone

- Preferred greeting / how to name the business: `[  ]`
- Tone (warm/professional/casual): `[  ]`
- Anything the assistant must **always** say or ask: `[  ]`
- Anything the assistant must **never** say (no pricing, no guarantees, no coverage opinions — enforced): `[  ]`

## 9. Reporting recipients

- Who receives lead/booking notifications and how (dashboard / forwarded summary): `[  ]`
- Daily/weekly summary recipient: `[  ]`
- Preferred reporting cadence: `[  ]`

## 10. CRM / reporting needs

- Existing CRM or spreadsheet the roofer uses (for context only; no live integration in the controlled pilot
  without separate approval): `[  ]`
- What fields the roofer most wants to see (caller name, address, issue, appointment time): `[  ]`
- Export needs (CSV): `[  ]` (see `docs/CSV_EXPORT_READINESS_PACKET.md`)

## 11. Compliance / consent

- Call recording consent: how the roofer wants callers informed (recording notice in greeting): `[  ]`
- SMS consent: **no SMS to homeowners in the controlled pilot** without separate approval and documented consent.
- Any state/local disclosure requirements the roofer knows of: `[  ]`
- No homeowner is contacted by RoofLeadHQ automation during the pilot without separate approval.

## 12. Exclusions / escalation rules

- Job types the roofer does **not** want (e.g., commercial only, no small repairs): `[  ]`
- Callers to decline politely + how (out-of-area, non-roofing): `[  ]`
- When to escalate to the roofer/human immediately vs. capture-and-notify: `[  ]`
- Stop conditions: if the roofer wants to pause the pilot, the pilot number can be taken out of use immediately
  (see `docs/FIRST_PILOT_SCOPE_GUARDRAILS_BUILD_287.md`).

## Onboarding sequence (nothing configured until separately approved)

1. Collect §1–§12 with the roofer (conversation only).
2. Jason reviews and confirms scope fits the controlled pilot guardrails.
3. **Separate approval** → out-of-band single-row mapping of the pilot number to the roofer, plus assistant
   script/config within the approved boundary (as in Builds 272–273 / 277–279).
4. **Separate approval** → one controlled test/observation call, no retry, sanitized evidence captured after.
5. Go/no-go review before any real homeowner traffic.
