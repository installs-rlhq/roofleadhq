# First-Roofer E2E Persistence Evidence Correction — Not a No-Op; Lead+Call Persisted, Booking Not Created (Build 276, repo-only)

decision_token = FIRST_ROOFER_PSTN_E2E_WAS_A_REAL_MAPPED_ROOFER_INSERT_NOT_A_NO_OP_WEBHOOK_RESPONSE_SHOWED_OK_TRUE_INSERTED_TRUE_DUPLICATE_FALSE_MATCHED_LEAD_ID_PRESENT_CALL_ID_PRESENT_PROVIDER_CALL_ID_PRESENT_ROOFER_MATCHED_LAUNCH_TEST_ROOFING_CLEAN_VAPI_LAST4_0389_BUT_BOOKING_ID_NULL_BECAUSE_NORMALIZED_APPOINTMENT_BOOKED_FALSE_REQUESTED_FALSE_TIME_NULL_LEAD_AND_CALL_PERSISTED_BOOKING_GATED_OFF_REMAINING_GAP_IS_APPOINTMENT_EXTRACTION_OR_BOOKING_CREATION_NO_CALL_NO_RETRY_NO_DEPLOY_FIX_PROPOSED_NOT_APPLIED_BUILD_276

Build 276 corrects the Build 274 interpretation using new masked webhook-response evidence Jason
captured after Build 275. The Build 275 leading hypothesis — a Build 268 controlled 200 no-op from a
`twilio_number` format mismatch — is **ruled out**. The webhook response proves the mapped roofer
resolved and the **persisting** 200 branch (`inserted:true`) ran: a lead was matched/inserted and a
call row was inserted. Only the **booking** did not persist (`booking_id=null`), because the
normalized appointment fields were false/null. This build is repo-only: it records the corrected
evidence, diagnoses the booking gap offline against the real compiled service, and adds fixture
coverage. It places **no** call, requests **no** retry, and changes **no** production code behavior,
config, provider state, schema, or deploy. A source fix is **proposed but not applied**.

build_mode = first_roofer_e2e_persistence_evidence_correction_repo_only
call_performed_by_build_276 = false
retry_count = 0
build_275_prerequisite_commit = 85da8e3
build_274_prerequisite_commit = dd1c1b8
build_271_prerequisite_commit = 4d36bdf
build_268_prerequisite_commit = 4c08b5e

---

## 1. The new masked webhook-response evidence (from Jason, after Build 275)

Jason inspected the actual EOCR webhook response for the one Build 274 first-roofer PSTN E2E call and
reported (masked; no full number, UUID, provider call id, email, recording URL, or verbatim
transcript):

- HTTP status: **200**.
- Response body fields:
  - `ok = true`
  - `dry_run = false`
  - `inserted = true`
  - `duplicate = false`
  - `call_id` — **present**
  - `provider_call_id` — **present**
  - `matched_lead_id` — **present**
  - `booking_id = null`
  - roofer matched to `Launch Test Roofing 1780434363`
  - roofer destination normalized to the clean Vapi number (last-4 `0389`)
  - normalized transcript and summary — **present**
  - `appointment_booked = false`
  - `appointment_requested = false`
  - `appointment_time = null`

`Launch Test Roofing 1780434363` is Jason's chosen row LABEL (not a phone number). The full clean
Vapi number is never written to the repo; only last-4 `0389` appears.

first_roofer_e2e_webhook_status = 200
first_roofer_e2e_response_inserted = true
first_roofer_e2e_response_booking_id = null

---

## 2. Build 274 was NOT a no-op — the response body proves the persisting branch ran

The Build 275 verifier enumerated every `ok:true` (HTTP 200) return of `processVapiCallCompleted`
(`backend/src/services/vapi-webhook.service.ts`). Only **one** of them persists and it is the only one
that returns `inserted:true` **together with** `matched_lead_id`, `call_id`, and a `booking_id` field —
the terminal success return (service lines ~887–899):

    return {
      ok: true, dry_run: false, inserted: true, duplicate: false,
      call_id: insertedCall.id, provider_call_id: normalized.provider_call_id,
      matched_lead_id: matchedLeadId, booking_id: bookingId,
      roofer_id: roofer.id, roofer, normalized,
    };

Every no-op 200 branch is distinguishable from this:

| Branch | Shape | Matches Jason's body? |
|--------|-------|------------------------|
| `acknowledge_non_terminal` | `acknowledged:true, processed:false`, no `inserted`/`call_id` | No |
| `acknowledge_web_call` | `web_call:true, processed:false`, no `inserted`/`call_id` | No |
| `unknown_roofer_destination_unmapped` (Build 268 no-op) | `acknowledged:true, reason:'unknown_roofer_destination_unmapped'`, no `inserted`/`call_id`/`matched_lead_id` | No |
| `duplicate` | `duplicate:true, inserted:false` | No (`inserted=true, duplicate=false`) |
| **`inserted:true` (persisting)** | **`inserted:true, duplicate:false, call_id, provider_call_id, matched_lead_id, booking_id`, roofer resolved** | **Yes** |

Jason's body has `inserted=true`, `duplicate=false`, a present `call_id`, `provider_call_id`,
`matched_lead_id`, a `booking_id` key, and a resolved roofer. That shape is produced by **exactly one**
branch — the persisting success return. A Build 268 no-op cannot emit `inserted:true`, `call_id`, or
`matched_lead_id`. **Therefore Build 274 was a real mapped-roofer insert/match, not a no-op.**

build_274_noop_hypothesis_status = ruled_out_by_webhook_response
mapped_roofer_match_status = passed

---

## 3. Corrected persistence statuses

- **Mapped roofer match — PASSED.** The roofer resolved (`roofer` present, destination normalized to
  last-4 `0389`, matched to `Launch Test Roofing 1780434363`). The Build 275 format-mismatch no-op
  hypothesis is ruled out: the stored `twilio_number` byte-matched the normalized E.164 destination.
- **Lead persistence — PASSED / MATCHED.** `matched_lead_id` is present. Per the service, `matchedLeadId`
  is either an existing lead for `(roofer_id, caller_phone)` or a freshly created lead. A present value
  means a lead exists and is linked to the call.
- **Call persistence — PASSED.** `inserted:true`, `duplicate:false`, and a present `call_id` mean a new
  `calls` row was inserted for the mapped roofer.
- **Booking persistence — FAILED / NOT CREATED.** `booking_id = null`.

lead_persistence_status = passed_or_matched
call_persistence_status = passed
booking_persistence_status = failed_or_not_created
corrected_first_roofer_e2e_result = partial_pass_lead_and_call_persisted_booking_not_created

---

## 4. Why booking did not persist — the exact gate (grounded in source)

Booking creation is gated in `createVapiBooking` (`backend/src/services/vapi-webhook.service.ts` ~line
630):

    if (!normalized.appointment_booked || !normalized.appointment_time) {
      return null;
    }

`processVapiCallCompleted` calls it as:

    const bookingId = matchedLeadId
      ? await createVapiBooking(supabase, roofer.id, matchedLeadId, normalized)
      : null;

Jason's body reported `appointment_booked=false` and `appointment_time=null`. With **either** falsy the
gate returns `null`, so `booking_id=null` — while the lead and call still persist. **The gate behaved
correctly given false/null inputs; the booking did not persist because the normalized appointment
fields were false/null, not because of any DB/booking-insert failure** (a booking-insert error would be
swallowed to `booking_id=null` too, but here the inputs never even reached the insert — the gate
short-circuited first).

booking_gate = appointment_booked_AND_appointment_time_required
booking_not_created_cause = normalized_appointment_fields_false_or_null

---

## 5. Why a verbally-scheduled visit normalizes to appointment_booked=false / appointment_time=null

The normalizer derives the appointment fields **only from structured payload fields**, with **no
transcript/summary fallback** (`normalizeVapiCallCompletedPayload`, ~lines 233–256, 326–335):

- `appointment_booked` ← `firstBooleanValue(payload.appointment_booked | appointmentBooked |
  message.* | structuredData.appointment_booked | appointmentBooked | booked | analysis.* )`. If none
  of these structured fields is present, `firstBooleanValue` returns its default **`false`**.
- `appointment_requested` ← the analogous structured-only lookup → default **`false`**.
- `appointment_time` ← `firstTimestampValue(payload.appointment_time | appointmentTime | message.* |
  structuredData.appointment_time | appointmentTime | booked_time | bookedTime )`. If none present →
  **`null`**.

Crucially, `transcript` and `summary` are normalized and stored, but they are **never consulted** to
derive `appointment_booked` / `appointment_requested` / `appointment_time`. So a call in which the
homeowner **verbally** scheduled a visit — but whose EOCR did **not** carry structured appointment
fields — normalizes to `appointment_booked=false`, `appointment_requested=false`,
`appointment_time=null`, even though the transcript/summary clearly describe a scheduled visit. That is
exactly Jason's Build 274 body.

The structured appointment fields are populated by the **Vapi assistant's analysis / structured-data
extraction** (`analysis.structuredData.appointment_booked` / `appointment_time`, or a `booked`
`successEvaluation`). When the assistant is not configured to emit that schema, those fields are absent
and the backend has nothing structured to read.

appointment_extraction = structured_fields_only_no_transcript_summary_fallback
firstBooleanValue_default = false

---

## 6. Most likely booking gap

**The gap is appointment extraction, not booking creation.** Ranked:

1. **MOST LIKELY — the assistant EOCR carried no structured appointment fields.** The Vapi Test Roofing
   Assistant's analysis/structured-data extraction did not emit `structuredData.appointment_booked` /
   `appointment_time` (nor a `booked` success evaluation), so the backend normalized them to
   false/null. This is a **Vapi assistant configuration** condition (out of scope here: no Vapi config
   change is made or requested). It fully explains the corrected symptom: mapped, lead+call persisted,
   `appointment_booked=false`, `appointment_time=null`, `booking_id=null`.
2. **CONTRIBUTING (code robustness) — no transcript/summary fallback.** Even a well-behaved call is
   fragile: if the assistant omits the structured fields, the backend cannot recover appointment intent
   or time from the transcript/summary it already stores. A structured-data-only extraction has a
   single point of failure.

remaining_gap = booking_appointment_extraction_or_creation
most_likely_booking_gap = assistant_eocr_carried_no_structured_appointment_fields_and_backend_has_no_transcript_summary_fallback

---

## 7. Offline reproduction added (Build 276 verifier + fixture)

`backend/scripts/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly.js`
compiles the current backend and drives the **real** `processVapiCallCompleted` against a fake
in-process Supabase (no network, no real Supabase):

- **CASE 1 — corrected Build 274 symptom (new fixture
  `docs/samples/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`).** A mapped-roofer
  terminal PSTN EOCR whose transcript/summary verbally schedule a Thursday site visit but which carries
  **no** structured appointment fields → normalizes `appointment_booked=false`,
  `appointment_requested=false`, `appointment_time=null` → result is `ok:true, inserted:true,
  duplicate:false`, `matched_lead_id` present, `call_id` present, **`booking_id=null`**. Lead + call
  persist; booking does not. This is the exact masked shape Jason reported.
- **CASE 2 — control (Build 271 fixture with structured appointment fields).** The same mapped path,
  but the EOCR carries `structuredData.appointment_booked=true` + `appointment_time` → `booking_id`
  present. Proves the booking gate and insert path work when the structured fields ARE present, so the
  Build 274 gap is isolated to appointment-field extraction, not to booking creation.
- **STATIC grounding** — asserts the booking gate
  (`!normalized.appointment_booked || !normalized.appointment_time`), the structured-only appointment
  lookups, the absence of any transcript/summary appointment fallback, and the persisting success
  return shape (`inserted:true` + `matched_lead_id` + `booking_id`).

Reserved fictional 555 numbers only; no real number, UUID, call id, or PII. Numbers masked as last-4
(`0389`) in this doc. Run via
`scripts/run-first-roofer-e2e-persistence-evidence-correction-build-276-dry-run.sh`.

verbal_appointment_without_structured_fields_reproduces_symptom = true
control_structured_appointment_creates_booking = true

---

## 8. Proposed fix — captured, NOT applied (requires separate approval)

No source behavior is changed in Build 276. Options toward booking persistence, in preferred order:

- **Option 1 (preferred, Vapi config — out of scope here):** configure the Test Roofing Assistant's
  structured-data / analysis schema to emit `appointment_booked` (boolean) and `appointment_time`
  (ISO timestamp) — and ideally `appointment_requested` — on the End Of Call Report. The backend already
  reads these; once the assistant emits them, the existing gate and insert path create the booking with
  **no code change**. This is a **Vapi configuration change** and is explicitly NOT performed or
  requested by this build.
- **Option 2 (code robustness — requires separate approval):** add a transcript/summary fallback to
  `normalizeVapiCallCompletedPayload` so that when structured appointment fields are absent, the backend
  can (a) derive `appointment_requested`/`appointment_booked` from clear scheduling language and/or
  (b) parse an `appointment_time`. This changes production normalization/booking behavior for **every**
  roofer and every call, so it must not be applied silently; it requires separate approval and its own
  validation. Even then, Option 1 is the more reliable primary source of truth.
- **Option 3 (product decision — requires approval):** relax the booking gate to create a
  provisional/`needs_attention` booking when `appointment_requested=true` (or the transcript indicates
  scheduling) even without a firm `appointment_time`. This is a behavior/product change, not a bug fix,
  and requires separate approval.

Build 276 applies **none** of these.

production_safe_fix_added = false
source_fix_made = false
source_fix_proposed = true
proposed_fix_option_1 = vapi_config_emit_structured_appointment_fields_out_of_scope
proposed_fix_option_2 = code_transcript_summary_appointment_fallback_requires_separate_approval
proposed_fix_option_3 = product_relax_booking_gate_for_requested_appointments_requires_approval

---

## 9. Is another controlled PSTN retest justified now?

**Not before the appointment-extraction gap is closed.** A retest with the assistant still emitting no
structured appointment fields would reproduce the same partial pass (lead+call persist, booking null)
and burn the one-call budget. Correct sequence: (1) apply Option 1 (Vapi assistant structured-data
schema) out-of-band; (2) re-confirm offline that a structured-appointment EOCR creates a booking (Build
276 CASE 2 already proves the backend side); (3) THEN a single separately-approved PSTN retest to prove
end-to-end lead + call + **booking** persistence.

another_pstn_retest_justified = only_after_assistant_emits_structured_appointment_fields

---

## 10. Safety invariants (Build 276)

- No call. No retry. No second call. No SMS. No homeowner contact. No roofer contact.
- This build placed no call and requested none. No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No
  Retell API. No Vapi API. No curl / live HTTP. No real Supabase connection. No production DB read/export.
- No roofer row written or modified by this build. No Twilio/Retell/Vapi/Railway config change. No env
  var change. No schema/auth/RLS change. No backend deploy/redeploy/restart.
- No secret read or printed. `backend/.env` values not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call id,
  provider call id, email, recording URL, or verbatim transcript written. Existing Twilio → Retell route
  preserved untouched.

no_second_call = true
retry_count = 0
no_sms_sent = true
no_homeowner_contact = true
no_roofer_contact = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_vapi_config_changed = true
no_railway_config_changed = true
no_backend_deploy = true
no_env_var_changed = true
no_schema_auth_rls_changed = true
no_secret_printing = true
full_clean_vapi_number_recorded_in_repo = false

---

## 11. Final status block

    build_mode = first_roofer_e2e_persistence_evidence_correction_repo_only
    build_276_evidence_correction_status = completed
    call_performed_by_build_276 = false
    retry_count = 0
    first_roofer_e2e_webhook_status = 200
    build_274_noop_hypothesis_status = ruled_out_by_webhook_response
    mapped_roofer_match_status = passed
    lead_persistence_status = passed_or_matched
    call_persistence_status = passed
    booking_persistence_status = failed_or_not_created
    corrected_first_roofer_e2e_result = partial_pass_lead_and_call_persisted_booking_not_created
    booking_not_created_cause = normalized_appointment_fields_false_or_null
    appointment_extraction = structured_fields_only_no_transcript_summary_fallback
    remaining_gap = booking_appointment_extraction_or_creation
    most_likely_booking_gap = assistant_eocr_carried_no_structured_appointment_fields_and_backend_has_no_transcript_summary_fallback
    verbal_appointment_without_structured_fields_reproduces_symptom = true
    control_structured_appointment_creates_booking = true
    production_safe_fix_added = false
    source_fix_made = false
    source_fix_proposed = true
    another_pstn_retest_justified = only_after_assistant_emits_structured_appointment_fields
    clean_vapi_number_last4 = 0389
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    no_second_call = true
    no_sms_sent = true
    no_homeowner_contact = true
    no_roofer_contact = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_vapi_config_changed = true
    no_railway_config_changed = true
    no_backend_deploy = true
    no_env_var_changed = true
    no_schema_auth_rls_changed = true
    no_production_data_export = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    build_275_prerequisite_commit = 85da8e3
    build_274_prerequisite_commit = dd1c1b8
    build_271_prerequisite_commit = 4d36bdf
    build_268_prerequisite_commit = 4c08b5e
    next_step = apply_vapi_assistant_structured_appointment_schema_out_of_band_then_reconfirm_offline_then_one_separately_approved_pstn_retest_for_booking_persistence
