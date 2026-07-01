# Structured Appointment Fields — Post-Build-276 Readiness + Test Roofing Assistant Config Approval Packet (Build 277, repo-only)

decision_token = FIRST_ROOFER_E2E_FRONTIER_IS_BOOKING_EXTRACTION_AFTER_BUILD_276_LEAD_AND_CALL_PERSIST_BUT_BOOKING_ID_NULL_BECAUSE_THE_TEST_ROOFING_ASSISTANT_EOCR_CARRIES_NO_STRUCTURED_APPOINTMENT_FIELDS_PREFERRED_FIX_IS_OPTION_1_CONFIGURE_THE_ASSISTANT_STRUCTURED_DATA_SCHEMA_TO_EMIT_APPOINTMENT_BOOKED_BOOLEAN_APPOINTMENT_TIME_ISO_AND_APPOINTMENT_REQUESTED_BOOLEAN_WHICH_THE_BACKEND_ALREADY_READS_SO_BOOKING_IS_CREATED_WITH_NO_CODE_CHANGE_OFFLINE_CASE2_PROVES_THE_SAME_VERBAL_CALL_NOW_CREATES_A_BOOKING_OPTION_2_CODE_TRANSCRIPT_SUMMARY_FALLBACK_IS_DEFERRED_NO_CALL_NO_SMS_NO_PROVIDER_ACTION_NO_DEPLOY_BUILD_277

Build 277 moves the first-roofer E2E frontier from Build 276's **"lead + call persisted, booking not
created"** to **"booking extraction ready for one controlled retest"** — repo-only, offline, with **no**
backend code change, **no** provider action, and **no** live call. It does two things:

1. Adds an **offline post-config proof** (Build 277 verifier CASE 2) that the SAME verbal-appointment
   call that produced `booking_id=null` in Build 274/276 will **create the booking** once the Test
   Roofing Assistant emits the structured appointment fields the backend already reads — with **no code
   change**.
2. Captures the **minimal approval packet** Jason needs to make exactly that one Vapi assistant
   configuration change (Option 1), inside a tightly bounded scope. **No such approval existed in the
   repo before this build**, so this build creates it and stops. Build 277 performs **no** Vapi config
   itself.

build_mode = structured_appointment_fields_readiness_repo_only
build_271_redone = false
build_276_redone = false
current_frontier = booking_extraction_after_build_276
preferred_path = structured_vapi_appointment_fields
build_276_prerequisite_commit = b642e93
build_271_prerequisite_commit = 4d36bdf

---

## 1. Where we are (carried from Build 276, not re-litigated)

Build 276 corrected the Build 274 interpretation against the real compiled service + a fake in-process
Supabase:

- **Mapped roofer match — PASSED** (`Launch Test Roofing 1780434363`, clean Vapi number last-4 `0389`).
  `Launch Test Roofing 1780434363` is Jason's chosen row LABEL, not a phone number.
- **Lead persistence — PASSED / MATCHED** (`matched_lead_id` present).
- **Call persistence — PASSED** (`inserted:true`, `duplicate:false`, `call_id` present).
- **Booking persistence — FAILED / NOT CREATED** (`booking_id = null`).

corrected_first_roofer_e2e_result = partial_pass_lead_and_call_persisted_booking_not_created

The gap is **booking appointment extraction**, not booking creation. See Build 276 CASE 2: a control
EOCR that carries structured fields already creates the booking, so the insert path works.

current_frontier = booking_extraction_after_build_276

---

## 2. Why booking failed (exact, grounded in source)

`createVapiBooking` (`backend/src/services/vapi-webhook.service.ts` ~line 630) gates on:

    if (!normalized.appointment_booked || !normalized.appointment_time) {
      return null;
    }

The normalizer `normalizeVapiCallCompletedPayload` derives those fields from **structured payload fields
only**, with **no transcript/summary fallback**:

- `appointment_booked`  ← `firstBooleanValue(... structuredData.appointment_booked ...)` → default **false**
- `appointment_time`    ← `firstTimestampValue(... structuredData.appointment_time ...)` → default **null**
- `appointment_requested` ← `firstBooleanValue(... structuredData.appointment_requested ...)` → default **false**

`structuredData` is sourced from `analysis.structuredData` (on an EOCR: `message.analysis.structuredData`).
The Build 274 call's homeowner **verbally** agreed to a Thursday 2 PM site visit, but the assistant's
EOCR carried **no** structured appointment fields, so the backend normalized `appointment_booked=false`,
`appointment_time=null` → the gate short-circuited → `booking_id=null`, while lead + call still persisted.

booking_not_created_cause = assistant_eocr_carried_no_structured_appointment_fields
appointment_extraction = structured_fields_only_no_transcript_summary_fallback

---

## 3. Why the structured Vapi fields are the preferred next path (Option 1)

The backend **already reads** the exact structured schema; nothing on the backend must change. The only
missing piece is that the **Vapi Test Roofing Assistant is not configured to EMIT** that schema on its
End Of Call Report. Configuring the assistant's structured-data / analysis schema to emit these fields:

- Requires **no backend code change, no deploy, no schema/RLS change**.
- Uses Vapi's own LLM-backed analysis to produce a firm boolean + ISO time — the intended source of
  truth — rather than a fragile backend transcript parser.
- Is scoped to a **single test assistant** and is fully reversible.

By contrast, Option 2 (a backend transcript/summary fallback) changes production normalization/booking
behavior for **every** roofer and every call, so it is **deferred** (see §7).

preferred_path = structured_vapi_appointment_fields

---

## 4. Exact structured appointment fields required

Configure the Test Roofing Assistant's **structured-data / analysis extraction schema** so its End Of
Call Report carries, under `message.analysis.structuredData`, exactly:

| Field (schema key) | Type | Semantics | Backend read path (already implemented) |
|---|---|---|---|
| `appointment_booked` | boolean | `true` when the homeowner agreed to and scheduled a specific visit | `analysis.structuredData.appointment_booked` |
| `appointment_time` | string (**ISO 8601** datetime, e.g. `2026-07-02T14:00:00Z`) | the scheduled visit time; set only when `appointment_booked` is true | `analysis.structuredData.appointment_time` |
| `appointment_requested` | boolean | `true` when the homeowner asked for a visit (even if no firm time) | `analysis.structuredData.appointment_requested` |

Notes:
- **Both** `appointment_booked=true` **and** a non-empty `appointment_time` (ISO 8601) are required for a
  booking to be created (the gate needs both).
- `appointment_requested` is a supported field; define it if the assistant's schema supports it (the
  backend reads it and stores it, and it enables the future needs-attention path). It is **not** required
  for booking creation.
- Optionally keep `analysis.successEvaluation = "appointment_booked"` — the backend maps it into
  `outcome`, but it is not required for booking creation.

appointment_booked_field_defined = true
appointment_time_field_defined = true
appointment_requested_field_defined_if_supported = true

---

## 5. Approval / config boundary (what Jason is asked to approve — and only this)

No approval for this step existed in the repo before Build 277. This is the **new, minimal** approval
packet. If approved, the out-of-band configuration action must stay strictly within this boundary:

**ALLOWED (exactly this, out-of-band, by Jason):**
- Configure the **Test Roofing Assistant only** — its EOCR / analysis structured-data schema for
  appointment-booking extraction.
- Define `appointment_booked` (boolean).
- Define `appointment_time` (ISO 8601 datetime, set when scheduled).
- Define `appointment_requested` (boolean) if supported.
- Keep the clean Vapi-managed **Test Number ending 0389** assigned to the Test Roofing Assistant.

**NOT ALLOWED under this approval:**
- **No phone number change** (the number ending 0389 stays as-is).
- No Twilio / Retell / Railway / backend env / deploy / schema / auth / RLS changes.
- No call. No SMS. No homeowner or roofer contact.
- No change to any other assistant, roofer row, or production data.

Build 277 (this build) performs **none** of the above — it only documents the boundary and proves the
offline outcome. The actual Vapi assistant configuration is an **out-of-band action for Jason**, and
after it is done, the reconfirmation is offline (§6), **not** a live call.

structured_fields_config_approval_status = new_packet_created
no_vapi_config_changed_by_this_build = true
no_phone_number_changed = true

---

## 6. Exact post-config offline proof required (already added in this build)

The Build 277 verifier
`backend/scripts/verify-structured-appointment-fields-build-277-readonly.js` compiles the current
backend and drives the **real** `processVapiCallCompleted` against a fake in-process Supabase (no
network, no real Supabase):

- **CASE 1 — regression / the gap:** the Build 276 verbal-appointment fixture
  (`docs/samples/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`), which carries **no**
  structured appointment fields → `appointment_booked=false`, `appointment_time=null` → mapped roofer
  resolves, lead + call persist, **`booking_id=null`**. Confirms the frontier is unchanged until the
  assistant emits the schema.
- **CASE 2 — post-config offline proof:** a new fixture
  (`docs/samples/vapi-event-structured-appointment-post-config.fake.json`) that **mirrors the same
  Build 276 verbal call** (same homeowner intent: a Thursday 2 PM site visit) but now **emits** the
  structured appointment fields under `message.analysis.structuredData`
  (`appointment_booked=true`, `appointment_time` ISO, `appointment_requested=true`) → the mapped roofer
  resolves, lead + call persist, and `createVapiBooking` **creates the booking** (`booking_id` present)
  — **with no backend code change**. This is the exact "reconfirm offline" step Build 276 §9 called for.

offline_booking_case2_status = passed

Run both cases (plus the Build 276 booking-frontier regression) via
`scripts/run-structured-appointment-fields-build-277-dry-run.sh`.

---

## 7. Why the Option 2 code fallback is deferred

Option 2 would add a transcript/summary fallback to `normalizeVapiCallCompletedPayload` so the backend
can derive `appointment_requested`/`appointment_booked` and parse `appointment_time` when structured
fields are absent. It is **deferred** because:

- It changes production normalization/booking behavior for **every** roofer and **every** call — a
  broad, higher-risk change — versus Option 1's single-test-assistant, reversible config change.
- Option 1 is the more reliable primary source of truth (Vapi's own analysis vs a backend heuristic).
- It is only warranted if the structured-field path is proven impossible or still fails after this
  offline proof — which CASE 2 shows it does not.

opt2_code_fallback_status = deferred
opt2_trigger = only_if_structured_field_path_proven_impossible_or_fails_after_offline_proof

---

## 8. Sequence to end-to-end booking persistence (one controlled retest, later)

1. **[Jason, out-of-band, within §5 boundary]** Configure the Test Roofing Assistant structured-data
   schema to emit `appointment_booked` / `appointment_time` / `appointment_requested`.
2. **[repo-only]** Reconfirm offline — Build 277 CASE 2 already proves the backend side; if Jason wants,
   re-run the dry-run after config to re-assert readiness.
3. **[separate approval, NOT requested here]** Exactly **one** separately-approved PSTN retest to the
   clean Vapi Test Number (last-4 0389) to prove end-to-end lead + call + **booking** persistence.

The live PSTN retest approval is **not requested by this build** and must not be created until the
offline proof passes (it does) **and** Jason has completed the §5 config — to avoid burning the one-call
budget on a call that would still emit no structured fields.

live_pstn_retest_approval_status = not_requested_until_offline_passes
next_single_material_step = jason_configures_test_roofing_assistant_structured_appointment_schema_out_of_band_within_section_5_boundary

---

## 9. Safety invariants (Build 277)

- No call. No second call. No retry. No SMS. No homeowner contact. No roofer contact.
- No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No Retell API. No Vapi API. No curl / live HTTP.
  No real Supabase connection. No production DB read/export.
- **This build changes no Vapi config** — it only documents the config Jason may perform out-of-band.
- No phone number change. No Twilio/Retell/Railway config change. No backend env var change. No
  schema/auth/RLS change. No backend deploy/redeploy/restart. No roofer row written or modified.
- No secret read or printed. `backend/.env` values not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call id, provider
  call id, email, recording URL, or verbatim transcript written. Reserved fictional 555-01xx numbers
  only in the fixture. Existing Twilio → Retell → Vapi route preserved untouched.

no_call_placed = true
no_sms_sent = true
no_phone_number_changed = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_railway_config_changed = true
no_backend_deploy = true
no_vapi_config_changed_by_this_build = true
no_env_var_changed = true
no_schema_auth_rls_changed = true
no_secret_printing = true
full_clean_vapi_number_recorded_in_repo = false

---

## 10. Final status block

    build_mode = structured_appointment_fields_readiness_repo_only
    build_277_status = completed
    build_271_redone = false
    build_276_redone = false
    current_frontier = booking_extraction_after_build_276
    preferred_path = structured_vapi_appointment_fields
    opt2_code_fallback_status = deferred
    appointment_booked_field_defined = true
    appointment_time_field_defined = true
    appointment_requested_field_defined_if_supported = true
    structured_fields_config_approval_status = new_packet_created
    offline_booking_case2_status = passed
    verbal_without_structured_fields_still_booking_null = true
    post_config_structured_fields_create_booking = true
    backend_code_change = false
    live_pstn_retest_approval_status = not_requested_until_offline_passes
    no_call_placed = true
    no_sms_sent = true
    no_phone_number_changed = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_railway_config_changed = true
    no_backend_deploy = true
    no_vapi_config_changed_by_this_build = true
    no_env_var_changed = true
    no_schema_auth_rls_changed = true
    no_production_data_export = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    clean_vapi_number_last4 = 0389
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    build_276_prerequisite_commit = b642e93
    build_271_prerequisite_commit = 4d36bdf
    next_step = jason_configures_test_roofing_assistant_structured_appointment_schema_out_of_band_then_one_separately_approved_pstn_retest_for_booking_persistence
