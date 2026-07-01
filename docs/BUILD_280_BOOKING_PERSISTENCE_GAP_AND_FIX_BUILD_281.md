# Build 281 — Build 280 Backend Booking-Persistence Evidence, Gap Diagnosis, and Offline Fix

Repo-only, offline. No call, no retry, no SMS, no provider API, no Vapi/Twilio/Retell/Railway config,
no deploy, no schema/auth/RLS change, no production data export, no secret read. The local secret file
`/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**. All IDs, phone numbers, email, recording
URL, and transcript specifics from the raw backend response are **masked/sanitized**; no raw body is
committed. Reserved fictional 555-01xx numbers are used in fixtures.

## 1. Scope

Build 279 approved exactly ONE controlled PSTN retest. Build 280 consumed it: Jason placed exactly one
Jason-owned physical-phone PSTN call to the clean Vapi-managed Test Number (last-4 **0389**), acted as the
homeowner, and verbally scheduled a Thursday 2:00 PM site visit. No retry, no additional call, no SMS.

Build 280 recorded `partial_pass_with_specific_gap` because the backend-side response body had not yet been
captured. Jason has now supplied the backend response evidence from that **same completed Build 280 call**.
Build 281 captures that evidence (sanitized), diagnoses the exact booking gap, and implements the
source-only fix validated by offline fake-Supabase replay.

- `build_279_one_call_approval_consumed = true`
- `no_new_call_placed = true`
- `no_retry_performed = true`
- `controlled_pstn_retest_execution_status = already_completed_once_no_retry`
- `webhook_backend_delivery_status = completed_200_ok`

## 2. Sanitized backend response evidence (same completed Build 280 call)

Endpoint: `POST /webhooks/vapi/call-completed`

| Field | Value (sanitized) |
| --- | --- |
| HTTP status | `200` |
| `ok` | `true` |
| `dry_run` | `false` |
| `inserted` | `true` |
| `duplicate` | `false` |
| `call_id` | present — masked `call_********` |
| `provider_call_id` | present — masked `vapi_call_********` |
| `matched_lead_id` | present — masked `lead_********` |
| `roofer_id` | present — masked `roofer_********` |
| mapped roofer | present (the Build 273 out-of-band-mapped pilot roofer) |
| mapped destination | clean Vapi Test Number ending **0389** |
| `booking_id` | `null` |
| `normalized.appointment_booked` | `false` |
| `normalized.appointment_requested` | `false` |
| `normalized.appointment_time` | `null` |
| transcript / summary | clearly indicated a scheduled **Thursday 2:00 PM** site visit (raw transcript NOT committed) |

Full UUIDs, full phone numbers, the homeowner email, the recording URL, and raw transcript text from the
raw body are intentionally omitted/masked here and in all fixtures.

## 3. Persistence determination (honest, non-overclaimed)

- `mapped_roofer_status = passed` — the destination (last-4 0389) resolved to the mapped pilot roofer;
  `roofer_id` present.
- `lead_persistence_status = passed` — `inserted:true`, `matched_lead_id` present.
- `call_persistence_status = passed` — `call_id` + `provider_call_id` present, `ok:true`, HTTP 200.
- `booking_persistence_status = failed` — `booking_id=null`; the normalized appointment fields were
  `false/false/null` so `createVapiBooking` was gated off, despite the transcript/summary and the Vapi UI
  indicating a booked Thursday 2 PM visit.
- `first_roofer_e2e_status = partial_pass_booking_gap`
- `live_call_booking_id_status = null_in_build_280_response`

## 4. Root-cause diagnosis: structured-output PATH mismatch

The backend normalizer (`backend/src/services/vapi-webhook.service.ts`) read appointment signals from the
Vapi **legacy "Structured Data"** path only:

```
message.analysis.structuredData.appointment_booked / appointment_time / appointment_requested
```

Build 279 evidence shows Jason configured the Test Roofing Assistant via **Analysis → Structured Outputs**
(Vapi's newer feature), which delivers named outputs under a **different container**:

```
message.analysis.structuredOutputs   (NOT structuredData)
```

So the live Build 280 EOCR carried `appointment_booked=true`, `appointment_time=<populated>`,
`appointment_requested=true` under `analysis.structuredOutputs`, but the normalizer never read that
container → it normalized all three to `false/false/null` → `createVapiBooking` gated off → `booking_id=null`.
The mapped roofer still resolved and lead + call still persisted, exactly matching the observed response.

`actual_gap = backend_structured_appointment_ingestion_or_payload_path_mismatch`

The evaluated alternatives and why this is the leading cause:

- **Different path (structuredData vs structuredOutputs)** — MOST LIKELY. The normalizer already covered
  every `structuredData` variant (analysis/message/payload, camelCase + snake_case), yet the fields came
  back false/null; and Build 279 evidence confirms the config was authored as **Structured Outputs**, whose
  documented delivery container is `structuredOutputs`. This is the diagnosed cause and the fix target.
- Different field names — the configured names (`appointment_booked` / `appointment_time` /
  `appointment_requested`) match what the normalizer reads, so a name mismatch is unlikely; the fix reads
  the same names from the new container.
- Vapi omitted the fields entirely — contradicted by the Vapi UI showing populated Structured Outputs;
  treated as unlikely but see §7 for the definitive confirmation step.

## 5. Fix implemented (source-only, offline-validated)

Preferred fix per plan: make the normalizer read appointment fields from the **actual Vapi structured
output location**, preserving all existing behavior. Broad transcript parsing was intentionally NOT added
(`opt2_code_fallback_status = deferred`) because the structured-output path is available and sufficient.

Change (`backend/src/services/vapi-webhook.service.ts`):

1. Added a `structuredOutputs` container read using the same analysis/message/payload precedence as
   `structuredData` (`analysis.structuredOutputs` / `structured_outputs`, then message, then payload).
2. Added a **shape-tolerant** `extractStructuredOutputValue(container, name)` reader that resolves a single
   named output from any observed Vapi structuredOutputs shape:
   - A. array of `{ name, result }` entries,
   - B. object keyed by field name → direct value,
   - C. object keyed by field name → `{ result }` / `{ value }` box,
   - D. object keyed by output id → `{ name, result }`.
3. Appended the structured-output values as **additional fallback candidates** to the existing
   `appointment_booked` / `appointment_requested` / `appointment_time` resolution chains, AFTER the existing
   `structuredData` candidates. When `structuredData` is present (legacy path) its value still wins — zero
   behavior change; the structuredOutputs path is consulted only when structuredData is absent.

Mapped-roofer resolution, lead creation, call insertion, and the existing booking-gating logic are
unchanged.

### Offline replay proof (real compiled service + eq-aware fake Supabase)

Using the sanitized live-shape fixture
`docs/samples/vapi-event-structured-outputs-appointment-live-shape.fake.json` (appointment fields under
`message.analysis.structuredOutputs`, keyed-by-output-id `{ name, result }`):

- normalizes to `appointment_booked=true`, `appointment_requested=true`, `appointment_time` populated
  (`2026-07-02T14:00:00.000Z`),
- mapped roofer resolves, lead + call persist (`inserted:true`), and `createVapiBooking` now returns a
  **booking_id** (`booking-new-281`) — the Build 280 gap is closed offline.

Shape tolerance additionally proven for array and keyed-by-name shapes. Regressions preserved:

- verbal EOCR with NO structured fields still normalizes `false/false/null` → `booking_id=null` (no
  transcript parsing introduced),
- legacy `structuredData` EOCR still normalizes `true/…/time` → booking created.

`booking_persistence_status = failed_or_fixed_by_offline_replay` (live = failed; offline replay = fixed).
`first_roofer_e2e_status = partial_pass_booking_gap_or_offline_fix_ready`.

## 6. Guardrails / non-actions attested

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
- `opt2_code_fallback_status = deferred_unless_structured_output_unavailable`
- `full_clean_vapi_number_recorded_in_repo = false` (masked as last-4 0389 only)

## 7. Single material next step toward live roofer testing and selling

The offline fix is ready but **not yet live-validated**. The backend already persists the raw Vapi payload
(`raw_payload: payload` on the calls insert), so the definitive confirmation of the exact live
structuredOutputs container shape is available **without any new call**:

> Jason (out-of-band, no secret shared with the agent) inspects the persisted `raw_payload` of the Build 280
> call row and confirms the appointment fields live under `message.analysis.structuredOutputs` in one of the
> shapes the Build 281 reader handles (§5). If confirmed, deploy the Build 281 normalizer change to Railway;
> the same mapped-roofer EOCR will then persist lead + call **and** booking end-to-end. If the live shape
> differs, supply the sanitized container shape so the reader is extended before deploy.

Only after that confirmation is a further separately-approved single PSTN retest warranted (to observe a
live `booking_id`), not before.
