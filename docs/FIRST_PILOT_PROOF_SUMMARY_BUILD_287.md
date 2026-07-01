# Build 287 — First Pilot Proof Summary (roofer-facing, honest, conservative)

**Date:** 2026-07-01 · **Mode:** repo-only draft. Nothing here is sent. No call, SMS, email, provider action,
config change, or deploy. Part of `docs/FIRST_PILOT_SALES_PACKAGE_BUILD_287.md`.

This is a plain-language summary a roofing contractor can read. It states **what was proven** and, just as
importantly, **what was not claimed**.

---

## What RoofLeadHQ does (in one sentence)

When a homeowner calls your roofing business, an AI phone assistant answers, captures the caller as a lead, and
**books an in-person inspection/appointment** — then records the lead, the call, and the booking to your
dashboard so nothing falls through the cracks.

## What we proved (controlled end-to-end test)

We ran a controlled, single test call through the exact pilot path and confirmed the full chain worked
end-to-end:

- **The call reached the right business.** The call was matched to the correct roofer record (number mapping).
- **The lead was captured.** A lead record was created from the call.
- **The call was recorded.** The call itself was saved and linked to the lead.
- **An inspection/appointment was booked.** The assistant scheduled an in-person site visit and saved it as a
  booking on the dashboard, with a specific date and time (an in-person inspection on July 2nd at 2:00 PM in the
  test).

In short: **inbound call → lead captured → call recorded → inspection/appointment booked → all visible on the
dashboard.** That's the whole loop, proven once, controlled, no retries.

## What we did NOT claim

We are deliberately conservative. This summary does **not** promise:

- ❌ A guaranteed number of leads, appointments, jobs, or revenue.
- ❌ "Booked jobs." We book **inspections and appointments** (site visits), not signed/closed jobs.
- ❌ Quotes, estimates, pricing, invoicing, or taking payment. The assistant does **not** do any of that.
- ❌ Anything about your existing business phone line. Your current number and setup are **not changed** for the
  pilot; the controlled pilot uses a separate, clean, managed number.

## What the controlled demo path looks like for a pilot

- The pilot uses a **clean, managed phone number** (a dedicated test/pilot line, not your main business line).
- Your existing phone routing stays exactly as it is — **we don't touch it.**
- Calls to the pilot number are answered by the assistant, and every lead + call + booking shows on a dashboard
  you can see.
- It runs **low-volume and founder-supervised** so we can watch every call and fix anything quickly.

## Honest limitations to set expectations

- This is an **early controlled pilot**, not a mass-scale, hands-off product yet.
- The proof so far is **one controlled end-to-end pass**, not a large sample. The pilot's job is to see it work
  on **your** real inbound calls.
- The assistant books **inspections/appointments**; your team still runs the inspection, the quote, and the
  sale. RoofLeadHQ handles **lead-to-inspection intake, missed-call capture, inspection scheduling, and
  reporting** — not the estimate or the money.

## The pilot's success definition (what "working" means)

At least one **real inbound call** to the pilot number is answered, captured as a lead, recorded, and results in
a booked inspection/appointment that you can see on your dashboard — mirroring the controlled pass above.

- `proof_summary_status = created`
- `overclaim_check = no_guarantees_no_booked_jobs_no_quote_estimate_invoice_payment_claims`
