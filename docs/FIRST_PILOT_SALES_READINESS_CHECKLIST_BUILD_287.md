# Build 287 — Sales-Readiness Checklist (first pilot roofer)

**Date:** 2026-07-01 · **Mode:** repo-only checklist. No outward action. Part of
`docs/FIRST_PILOT_SALES_PACKAGE_BUILD_287.md`.

- `sales_readiness_checklist_status = created`

---

## A. What Jason can show a roofer RIGHT NOW (no new approval needed)

- [x] Honest roofer-facing proof summary — `docs/FIRST_PILOT_PROOF_SUMMARY_BUILD_287.md`.
- [x] Controlled end-to-end pass: inbound call → lead captured → call recorded → **inspection booked** → all on
      the dashboard (Build 286, one call, no retry). Evidence:
      `docs/FIRST_ROOFER_E2E_LIVE_BOOKING_PASS_EVIDENCE_BUILD_286.md`.
- [x] The controlled demo path (clean managed pilot number, existing line untouched).
- [x] Outreach drafts to review — `docs/FIRST_PILOT_ROOFER_OUTREACH_DRAFTS_BUILD_287.md` (nothing sent).
- [x] Clear scope + guardrails — `docs/FIRST_PILOT_SCOPE_GUARDRAILS_BUILD_287.md`.
- [x] Conservative framing: books **inspections/appointments**, no guarantees, no quote/estimate/invoice/payment
      claims.

*Note: "show now" = talk through these materials. It does **not** authorize contacting a real roofer — that is
a separate approval (Section C).*

## B. What must be configured PER pilot roofer (before their pilot goes live)

- [ ] Complete the intake bundle with the roofer — `docs/FIRST_PILOT_ROOFER_ONBOARDING_INTAKE_BUNDLE_BUILD_287.md`.
- [ ] Confirm service area, booking rules, emergency/insurance handling, tone, exclusions.
- [ ] **Separate approval** → out-of-band single-row mapping of the pilot number (last-4 `0389`) to the roofer's
      record (never an in-repo agent write).
- [ ] **Separate approval** → assistant script/config within the approved boundary (as in Builds 277–279).
- [ ] Confirm dashboard visibility + reporting recipients for the roofer.
- [ ] Do **not** change the roofer's existing business line or the Twilio→Retell route.

## C. Approvals required BEFORE first real pilot contact

- [ ] **Approval 1 — Outreach send:** Jason selects one real roofer and gets explicit approval to send **one**
      Jason-operated outreach message (no automation, no retry). Draft: Component 2.
- [ ] **Approval 2 — Onboarding/config:** after the roofer agrees, explicit approval for the out-of-band mapping
      + assistant config within boundary.
- [ ] **Approval 3 — Controlled test call:** explicit approval for **one** no-retry test/observation call before
      real homeowner traffic, sanitized evidence captured after.
- [ ] **Approval 4 — Go-live for real inbound traffic:** explicit go/no-go before advertising/using the pilot
      number for real homeowners.

Each approval is separate, single-scope, and no-retry. No real homeowner or roofer contact happens without the
matching approval above.

## D. What remains AFTER the first pilot (future builds, not now)

- [ ] Capture sanitized pilot outcome evidence (leads/calls/bookings observed, roofer feedback).
- [ ] Go/no-go on expanding beyond one roofer (still separate-approval gated).
- [ ] Consider CRM/export needs surfaced during the pilot (`docs/CSV_EXPORT_READINESS_PACKET.md`).
- [ ] Revisit whether any live automation (e.g., SMS follow-up) is warranted — only with separate approval and
      documented consent.
- [ ] Pricing/agreement for a paid engagement (see existing pilot/launch docs) — separate from this build.

## E. Overall readiness status

- `first_roofer_e2e_status = passed`
- `sales_package_ready_to_show = true`
- `first_real_pilot_contact_status = blocked_pending_separate_approval`
- `real_roofer_contact_status = not_performed`
- `real_homeowner_contact_status = not_performed`
