# Build 287 — First Pilot Scope & Guardrails

**Date:** 2026-07-01 · **Mode:** repo-only. Defines the boundary for the first controlled pilot. No provider
action, config change, or deploy is performed by this document.

Part of `docs/FIRST_PILOT_SALES_PACKAGE_BUILD_287.md`.

- `pilot_scope_guardrails_status = created`

---

## 1. In scope (the controlled pilot path)

- **Clean Vapi-managed number path** for the pilot: the clean Vapi Test/Pilot Number ending `0389`, already
  mapped to the controlled roofer row and validated end-to-end in Build 286.
- Inbound calls to that pilot number are answered by the assistant, captured as a lead, recorded as a call, and
  turned into a booked **inspection/appointment** on the dashboard.
- Low-volume, founder-supervised operation with sanitized evidence captured after each milestone.

## 2. Out of scope / explicitly preserved untouched

- **The existing Twilio→Retell number and route are NOT changed.** They remain exactly as configured. The pilot
  never touches, re-points, or reconfigures them.
- **No public / live automation expansion without separate approval** — no bulk outreach, no broadening of the
  number/webhook surface beyond the single mapped pilot path.
- **No real homeowner or real roofer contact without separate approval.**
- **No SMS / live outreach automation without separate approval.**
- **No new provider config, phone-number change, backend deploy, schema/auth/RLS change, or production data
  export** as part of pilot prep.

## 3. What the assistant does NOT do (product boundary)

- Does not quote, estimate, price, invoice, or take payment.
- Does not guarantee jobs, revenue, or a number of leads/appointments.
- Does not give insurance coverage advice.
- Books **inspections/appointments** (site visits); the roofer's team runs the inspection, quote, and sale.

## 4. Pilot success criteria

The controlled pilot is a success if, on real inbound traffic to the pilot number:

1. At least one **real inbound call** is answered by the assistant.
2. The caller is captured as a **lead** on the dashboard.
3. The **call** is recorded and linked to the lead.
4. At least one **inspection/appointment is booked** and visible to the roofer.
5. The roofer confirms the captured details are usable and the experience was acceptable to callers.

Mirrors the now-validated end-to-end path (mapped roofer → lead → call → booking) from Build 286.

## 5. Rollback / stop criteria

Stop or pause the pilot immediately if **any** of the following occur:

- The roofer asks to pause or stop.
- A caller has a materially bad experience (wrong info captured, rude/confusing handling, missed emergency).
- Any lead/call/booking fails to persist or shows incorrectly on the dashboard.
- Any accuracy problem in booked appointment times or captured details.
- Any sign of unintended automation, unexpected outbound contact, or scope creep beyond the single pilot path.
- Any provider/number/deploy change would be required that has not been separately approved.

**Rollback action:** take the pilot number out of use (stop routing/advertising it) — this is immediate and does
**not** require touching the existing Twilio→Retell number or any production schema. Capture a short sanitized
closeout note. No data is exported.

## 6. One-controlled-action-at-a-time rule

Every live step (mapping a real roofer, a test/observation call, any outreach send) is a single,
separately-approved, no-retry action, with sanitized evidence captured afterward. No batching, no automation,
no retries without a fresh approval.

- `pilot_number_path = clean_vapi_managed_last4_0389`
- `existing_twilio_retell_number_changed = false`
- `public_live_automation_expansion = none_without_separate_approval`
- `sms_live_outreach_automation = none_without_separate_approval`
- `real_homeowner_or_roofer_contact = none_without_separate_approval`
