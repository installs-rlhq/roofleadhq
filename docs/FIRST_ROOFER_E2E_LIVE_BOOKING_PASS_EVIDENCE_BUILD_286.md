# Build 286 — First Controlled Roofer E2E Live Pass Evidence (lead + call + BOOKING persisted live)

**Mode:** repo-only, offline. No call. No additional call. No retry. No SMS. No Vapi Test/Talk/browserWebCall.
No Twilio/Retell/Vapi API. No provider config change. No phone-number change. No Railway/backend config or env
change. No deploy/redeploy/restart. No schema/auth/RLS change. No production data export. No secret read. The
local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**. This build neither creates
nor consumes any new live-call approval — the single Build 285-approved call has already been consumed once.

**Predecessor:** Build 285 (`ef2467d`) confirmed Build 284 (`44ed7cd`, conservative summary/transcript booking
fallback) is **live** on Railway `roofleadhq-api` (unauthenticated `GET /health` → `commit_short=44ed7cd`,
`environment=production`), while preserving the Build 281 structuredOutputs support. Build 285 explicitly
approved exactly **one** live booking-observation PSTN call after that deployment. Jason has now performed that
**one** approved call. **No retry** was performed.

---

## 1. What was performed

- Exactly **one** Build 285-approved live booking-observation call was performed by Jason from his own physical
  phone to the clean Vapi Test Number ending **0389**.
- **No retry** was performed. No second call, no SMS, no config change, no deploy during or after the test.
- Jason supplied the sanitized backend response evidence below. The raw webhook body (full UUIDs, full phone
  numbers, email, recording URL, full transcript) is **NOT committed**; only masked/sanitized values and a
  short paraphrased summary are recorded here.

- `build_285_one_call_approval_consumed = true`
- `no_new_call_placed = true`
- `no_retry_performed = true`
- `controlled_live_booking_observation_status = completed_once_no_retry`

## 2. Sanitized final live backend response evidence

| Field | Value |
| --- | --- |
| Endpoint | `/webhooks/vapi/call-completed` |
| HTTP status | `200` |
| `ok` | `true` |
| `dry_run` | `false` |
| `inserted` | `true` |
| `duplicate` | `false` |
| `call_id` | present, masked (`call_****`) |
| `provider_call_id` | present, masked (`vapi_****`) |
| `matched_lead_id` | present, masked (`lead_****`) |
| `roofer_id` | present, masked (`roofer_****`) |
| mapped roofer | present (mapped destination = clean Vapi Test Number last-4 `0389`) |
| `booking_id` | present, masked (`booking_****`) — **NON-NULL** |
| `normalized.appointment_booked` | `true` |
| `normalized.appointment_requested` | `true` |
| `normalized.appointment_time` | `2026-07-02T14:00:00.000Z` (populated) |

`webhook_backend_delivery_status = completed_200_ok`. `live_call_booking_id_status = non_null`.

**Transcript/summary (paraphrased, raw NOT committed):** The transcript and summary confirmed an in-person
**site visit scheduled for Thursday, July 2nd, at 2 PM** (an explicit calendar date, not a bare weekday). The
raw transcript, raw body, recording URL, email, and full identifiers are summarized only and are **not**
committed to the repo. Reserved fictional `555-01xx` values stand in wherever an example is needed.

## 3. Final live persistence statuses

- `mapped_roofer_status = passed`
- `lead_persistence_status = passed`
- `call_persistence_status = passed`
- `booking_persistence_status = passed`
- `first_roofer_e2e_status = passed`

The mapped roofer resolved (destination last-4 `0389`), the lead and call persisted (`inserted:true`, masked
`matched_lead_id` / `call_id` present), **and the booking was created** (masked `booking_id` present, non-null).
This is the **FIRST controlled roofer end-to-end FULL PASS** — mapped roofer + lead + call + booking all
persisted live from a single approved PSTN call, with no retry.

## 4. Key technical conclusion — the Build 284 fallback fixed the live booking gap

The two prior live observations (Builds 274 and 283/284) reached the backend with the mapped roofer resolving
and the lead + call persisting, but `booking_id` was `null` because the live call-completed webhook payload
carried **no usable structured appointment fields** (`analysis.structuredData` / `analysis.structuredOutputs`
did not deliver `appointment_booked` / `appointment_time`), so `createVapiBooking`'s
`normalized.appointment_booked && normalized.appointment_time` gate stayed false.

On this Build 285-approved call, the **Build 284 conservative summary/transcript fallback** in
`backend/src/services/vapi-webhook.service.ts` (`deriveBookingTimeFromText`, wired **after** the structured
`structuredData → structuredOutputs` reads and gated to run only when `!finalAppointmentBooked ||
!finalAppointmentTime`) derived `appointment_booked=true`, `appointment_requested=true`, and
`appointment_time=2026-07-02T14:00:00.000Z` from the trusted Vapi **summary + transcript** — the same live
webhook shape where structured appointment fields were not usable. That is exactly why the live booking was
created this time.

- `build_284_fallback_live_status = validated`
- **Build 284 conservative fallback fixed the live booking gap** — it handled the live webhook shape where the
  structured appointment fields were not usable, deriving a booking from summary/transcript.
- **Build 281 structuredOutputs support remains preserved** — structured fields (`structuredData` →
  `structuredOutputs`) are still read first and take precedence; the fallback fires only when structured did
  **not** book with a time. No existing structured behavior changed.

The offline verifier for this build exercises the **real compiled backend service** against an eq-aware fake
Supabase using `docs/samples/vapi-event-mapped-eocr-summary-booking-no-structured-build-284.fake.json` (the
sanitized representation of exactly this live shape: summary/transcript describe the July 2nd 2 PM site visit,
**no** usable structured fields) and confirms it normalizes `booked=true` / `requested=true` /
`time=2026-07-02T14:00:00.000Z` and creates the booking (`booking_id` present) — while the structured live-shape
fixture still books via the structured path (precedence preserved).

## 5. Safety attestations (this build)

- `no_new_call_placed = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_phone_number_changed = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_vapi_config_changed = true`
- `no_railway_config_changed = true`
- `no_backend_deploy = true`
- `no_schema_auth_rls_changed = true`
- `no_production_data_export = true`
- `no_secret_printing = true`
- `full_clean_vapi_number_recorded_in_repo = false` (clean Vapi number referenced only by last-4 `0389`)
- Raw transcript/body/recording URL/email/UUIDs NOT committed; all IDs/phone/email masked; reserved fictional
  `555-01xx` fixtures only.
- The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.

## 6. Readiness

- `live_roofer_testing_sales_readiness_status = ready_for_pilot_package`

With the first controlled roofer E2E now a full live pass, the technical path (mapped roofer → lead → call →
booking) is validated end-to-end in production. The next material step is a **business** step, not another
technical live test: prepare the first real pilot roofer outreach / onboarding package. See
`docs/FIRST_PILOT_ROOFER_OUTREACH_ONBOARDING_READINESS_PACKET_BUILD_286.md`.

## 7. Next single material step toward live roofer testing and selling

Prepare and (under separate approval) execute the first real pilot roofer outreach/onboarding package using the
**clean Vapi-managed number path** for the controlled pilot. Do **not** change the existing Twilio→Retell
number. No public/live automation expansion and no real homeowner or real roofer contact without separate
explicit approval.
