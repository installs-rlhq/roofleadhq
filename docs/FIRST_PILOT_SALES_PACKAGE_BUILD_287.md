# Build 287 — First Pilot Roofer Sales Package (repo-only drafts, nothing sent)

**Date:** 2026-07-01

**Mode:** repo-only business-readiness build. This build and every document in this package perform **no**
call, **no** SMS, **no** email send, **no** real roofer contact, **no** real homeowner contact, **no** Vapi
Test/Talk/browserWebCall, **no** Vapi/Twilio/Retell API call, **no** provider or phone-number config change,
**no** Railway/backend config/env/deploy change, **no** schema/auth/RLS change, and **no** production data
export. No secret was read; the local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not**
read. Every outward action described below is a draft gated behind a **separate explicit approval**.

**Predecessor:** Build 286 (`a23cb81`) captured the **first controlled roofer end-to-end live pass** — one
Build 285-approved PSTN call (no retry) to the clean Vapi Test Number ending `0389` returned HTTP `200` with the
mapped roofer, lead, call, and **booking** all persisted live (`booking_id` non-null,
`normalized.appointment_time = 2026-07-02T14:00:00.000Z`). See
`docs/FIRST_ROOFER_E2E_LIVE_BOOKING_PASS_EVIDENCE_BUILD_286.md` and
`docs/FIRST_PILOT_ROOFER_OUTREACH_ONBOARDING_READINESS_PACKET_BUILD_286.md`. That closed the **technical**
proof. Build 287 is the **business** step: prepare the first real pilot roofer outreach + onboarding +
sales-readiness package as repo-only drafts.

- `first_roofer_e2e_status = passed`

---

## 1. What this package is

A single, honest, conservative package Jason can use to approach the **first real pilot roofer** and, on separate
approval, onboard them onto the already-validated controlled path (clean Vapi-managed number, last-4 `0389`).
It does not expand any live automation and it does not touch the existing Twilio→Retell number.

## 2. Package components (all repo-only, this build)

| # | Component | File | Status |
| --- | --- | --- | --- |
| 1 | Roofer-facing proof summary (what was proven, honestly) | `docs/FIRST_PILOT_PROOF_SUMMARY_BUILD_287.md` | `created` |
| 2 | Outreach drafts (email / SMS-style / phone talk track / DM) — **draft only, nothing sent** | `docs/FIRST_PILOT_ROOFER_OUTREACH_DRAFTS_BUILD_287.md` | `created_repo_only_not_sent` |
| 3 | Onboarding / intake bundle | `docs/FIRST_PILOT_ROOFER_ONBOARDING_INTAKE_BUNDLE_BUILD_287.md` | `created` |
| 4 | Pilot scope + guardrails | `docs/FIRST_PILOT_SCOPE_GUARDRAILS_BUILD_287.md` | `created` |
| 5 | Sales-readiness checklist | `docs/FIRST_PILOT_SALES_READINESS_CHECKLIST_BUILD_287.md` | `created` |

- `pilot_sales_package_status = created`
- `outreach_drafts_status = created_repo_only_not_sent`
- `onboarding_intake_bundle_status = created`
- `pilot_scope_guardrails_status = created`
- `sales_readiness_checklist_status = created`

## 3. Copy discipline (applies to every document here)

- **No guarantees.** No promise of a specific number of jobs, leads, revenue, or booked work.
- **No "booked jobs" language.** We book **inspections / appointments** (site visits). We do not claim to close,
  win, or guarantee jobs.
- **No quote / estimate / invoice / payment automation claims.** The assistant does not quote, price, estimate,
  invoice, or take payment.
- **Preferred framing:** "lead-to-inspection," "appointment intake," "missed-call capture," "inspection
  scheduling," "reporting." The assistant answers inbound roofing calls, captures the lead, and books an
  in-person inspection/appointment, then records the lead + call + booking to the roofer's dashboard.
- **Founder-led, low volume, controlled.** One pilot roofer, one mapped number, one controlled path.

## 4. Hard guardrails (unchanged)

1. **Do not change the existing Twilio→Retell number or route.** It stays exactly as configured.
2. **Use the clean Vapi-managed number path** (last-4 `0389`) for the controlled pilot — the validated path.
3. **No public / live automation expansion without separate approval.**
4. **No real homeowner or real roofer contact without separate approval.**
5. **One controlled, separately-approved, no-retry action at a time**, with sanitized evidence captured after.

## 5. Safety attestations (this build)

- `real_roofer_contact_status = not_performed`
- `real_homeowner_contact_status = not_performed`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_email_sent = true`
- `no_provider_config_changed = true`
- `no_phone_number_changed = true`
- `no_twilio_retell_route_changed = true`
- `no_backend_deploy = true`
- `no_schema_auth_rls_changed = true`
- `no_production_data_export = true`

## 6. Next single material step toward live roofer testing and selling

Jason reviews this package and, when ready, selects **one** real local roofing contractor and — under a
**separate explicit approval** — sends **one** outreach message (Component 2, Jason-operated, no automation). No
real contact happens until that separate approval. The controlled pilot call path remains the already-validated
clean Vapi-managed number path (last-4 `0389`); the existing Twilio→Retell number is not changed.
