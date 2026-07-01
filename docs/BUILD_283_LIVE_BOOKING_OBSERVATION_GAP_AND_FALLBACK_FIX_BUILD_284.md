# Build 284 — Second Live Booking Observation Gap + Conservative Summary/Transcript Fallback Fix

**Mode:** repo-only, offline. No call. No additional call. No retry. No SMS. No Vapi Test/Talk/browserWebCall. No Twilio/Retell/Vapi API. No provider config change. No phone-number change. No Railway/backend config or env change. No deploy/redeploy/restart. No schema/auth/RLS change. No production data export. No secret read. The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.

**Predecessor:** Build 283 (`8ba1c18`) captured runtime-deployment evidence that Build 282 (`613ce56`) is live on Railway, which means the Build 281 structuredOutputs normalizer fix (`72f834f`, an ancestor of `613ce56`) is DEPLOYED — and created a narrow one-call live booking observation approval. Jason has now **consumed that one-call approval with exactly one physical-phone PSTN call** to the clean Vapi Test Number ending **0389**. No retry is approved or was performed.

---

## 1. What was performed

- Exactly **one** Build 283-approved live booking observation call was performed by Jason from his own physical phone to the clean Vapi Test Number ending **0389**.
- **No retry** was performed. No second call, no SMS, no config change, no deploy during or after the test.
- Jason supplied the sanitized backend response evidence below from that single call. The raw webhook body (full UUIDs, full phone numbers, email, recording URL, full transcript) is **NOT committed**; only masked/sanitized values and a paraphrased summary are recorded here.

## 2. Sanitized second live backend response evidence

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
| `booking_id` | `null` |
| `normalized.appointment_booked` | `false` |
| `normalized.appointment_requested` | `false` |
| `normalized.appointment_time` | `null` |

**Transcript/summary (paraphrased, raw NOT committed):** The transcript clearly confirmed an in-person site visit booked for **Thursday, July 2nd, at 2 PM**, and the summary clearly stated an emergency in-person site visit was scheduled for **Thursday, July 2nd, at 2 PM**. The raw transcript and raw body are summarized only and are not committed to the repo.

## 3. Live persistence statuses

- `mapped_roofer_status = passed`
- `lead_persistence_status = passed`
- `call_persistence_status = passed`
- `booking_persistence_status = failed_again_after_deployed_build_281_fix`
- `first_roofer_e2e_status = partial_pass_booking_gap`

The mapped roofer resolved, and the lead and call persisted (`inserted:true`, masked `matched_lead_id` / `call_id` present). Only the **booking** was not created (`booking_id=null`). This is the SECOND consecutive live failure of booking persistence, this time **after** the Build 281 structuredOutputs fix was confirmed deployed (Build 283).

## 4. Diagnosis — why live booking still failed

`createVapiBooking` gates on `normalized.appointment_booked && normalized.appointment_time`. Both were `false`/`null` live.

Build 281 added a shape-tolerant reader for Vapi **Structured Outputs** (`message.analysis.structuredOutputs`) on top of the legacy **Structured Data** (`message.analysis.structuredData`). That fix is deployed (Build 283) and provably works offline. Yet the live normalized appointment fields are still `false`/`false`/`null` while the transcript and summary unambiguously describe a scheduled Thursday, July 2nd, 2 PM site visit.

**Conclusion:** the live call-completed webhook payload carried **no usable structured appointment fields at backend-processing time** — neither `structuredData` nor `structuredOutputs` delivered `appointment_booked`/`appointment_time`. Vapi's Structured Outputs were either absent from the call-completed webhook payload, or only available at a runtime-only location not present in the delivered body. `actual_gap = live_webhook_missing_or_unreadable_structured_appointment_fields`.

The **pure structured-output path is no longer sufficient**. The booking intent and time were present live **only** in the trusted Vapi summary and transcript text. A conservative backend fallback from summary/transcript is therefore justified (`opt2`), and is implemented in Build 284.

## 5. Fix implemented (Build 284) — conservative summary/transcript booking fallback

Source: `backend/src/services/vapi-webhook.service.ts` (`normalizeVapiCallCompletedPayload`).

**Precedence preserved.** Structured fields (`structuredData` → `structuredOutputs`) are read first and take precedence exactly as before. The fallback runs **only** when the structured signal did not yield a booked appointment with a time (`!appointment_booked || !appointment_time`).

**Trusted text order:** summary first, then transcript.

**Strict guards — ALL of the following are required for the fallback to create a booking:**
1. **Confirmed-booking language** — `scheduled` / `booked` / `arranged` / `reserved` / `confirmed` / "all set" / "agreed to a … visit".
2. **An appointment noun** — `site visit` / `appointment` / `inspection` / `visit`.
3. **An explicit calendar date** — a month name + day-of-month (e.g. "July 2nd"). **A bare weekday (e.g. "Thursday") is intentionally NOT sufficient** — it is too ambiguous to auto-create a booking.
4. **An explicit clock time** — e.g. "2 PM".

The clock time is interpreted in **UTC**, consistent with the rest of the normalizer (all timestamps via `new Date(...).toISOString()`, matching the structured fixtures' `...Z` times). The year is taken from the call date (`call_started_at`, then `call_ended_at`), with a year-rollover adjustment and a forward-window guard (appointment must fall on/around/after the call, within ~1 year) so a stale or out-of-range date does not book.

**Negative guards (do NOT book):**
- Vague interest or callback-only conversations (no appointment noun) — e.g. "Homeowner requested callback." → no booking, even when a date and time are present.
- Emergency/urgency statements with no scheduled visit — e.g. "Water is pouring through my ceiling right now!" → no booking.
- A bare weekday with no explicit calendar date — e.g. "agreed to a site visit on Thursday at 2 PM" → no booking (structured path remains the way such calls should book).

**No existing behavior changed for structured payloads.** When `structuredData` or `structuredOutputs` already yield `appointment_booked=true` + a time, the fallback is never reached. Mapped-roofer, lead, call, and booking behavior are otherwise unchanged. No external APIs were added.

## 6. Offline replay result

The Build 284 verifier exercises the **real compiled backend service** against an eq-aware fake Supabase (no network, no real Supabase):

- **Live-shape fix proof:** the sanitized second-live fixture (summary + transcript describe "Thursday, July 2nd, at 2 PM" site visit; **no** structured fields) now normalizes `appointment_booked=true`, `appointment_requested=true`, `appointment_time` populated (`2026-07-02T14:00:00.000Z`); with the mapped roofer resolving, lead + call persist **and the booking is created** (`booking_id` present). Closes the live gap offline.
- **Negative — callback-with-date:** callback-only conversation with an explicit date/time but no appointment noun → `false`/`false`/`null` → `booking_id=null`.
- **Negative — weekday-only verbal (Build 276/281 `FIX_VERBAL`):** still `false`/`false`/`null` → `booking_id=null` (the Build 277–281 invariant is preserved unchanged; no bare weekday auto-books).
- **Negative — vague/callback + emergency scenarios:** still no booking.
- **Regression — structured paths preserved:** the legacy `structuredData` fixture and the Build 281 `structuredOutputs` live-shape fixture both still create the booking via the structured path (fallback not reached).

`summary_transcript_fallback_status = implemented`. `booking_persistence_status = failed_again_after_deployed_build_281_fix_or_fixed_by_offline_replay`. `first_roofer_e2e_status = partial_pass_booking_gap_or_offline_fix_ready`.

## 7. Honest non-overclaim

The **live** booking is NOT claimed to have passed — the live call returned `booking_id=null`. Build 284 fixes the diagnosed cause offline and does not deploy. Live booking persistence remains validated only after this fix is deployed and one further separately-approved live observation call is placed. `no_backend_deploy = true`.

## 8. Safety attestations

- `build_283_one_call_approval_consumed = true`
- `no_new_call_placed = true`
- `no_retry_performed = true`
- `controlled_live_booking_observation_status = completed_once_no_retry`
- `webhook_backend_delivery_status = completed_200_ok`
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
- Raw transcript/body NOT committed; all IDs/phone/email/recording URL masked; reserved fictional 555-01xx fixtures only.
- The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.

## 9. Next single material step

Deploy the Build 284 fallback to Railway `roofleadhq-api` (main HEAD) under a separate narrow deploy approval, confirm via unauthenticated `GET /health` `commit_short`, then place exactly **one** further separately-approved live booking observation PSTN call to the clean Vapi Test Number last-4 `0389` to confirm end-to-end mapped-roofer **lead + call + BOOKING** persistence live. No retry.
