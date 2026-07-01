# Structured Appointment Config Evidence — Captured (Build 279, repo-only)

decision_token = JASON_HAS_NOW_MANUALLY_CONFIGURED_THE_VAPI_TEST_ROOFING_ASSISTANT_STRUCTURED_OUTPUTS_OUT_OF_BAND_AND_PROVIDED_SANITIZED_VAPI_UI_SCREENSHOT_EVIDENCE_SHOWING_APPOINTMENT_REQUESTED_BOOLEAN_APPOINTMENT_TIME_STRING_APPOINTMENT_BOOKED_BOOLEAN_ATTACHED_TO_THE_TEST_ROOFING_ASSISTANT_WITH_STATUS_PUBLISHED_SO_BUILD_279_CAPTURES_THAT_EVIDENCE_RECONFIRMS_THE_OFFLINE_CASE2_BOOKING_PROOF_AND_CREATES_THE_NARROW_ONE_CONTROLLED_PSTN_RETEST_APPROVAL_NO_CALL_NO_SMS_NO_PROVIDER_ACTION_NO_DEPLOY_BUILD_279

Build 279 closes the Build 278 gap. Build 278 recorded that the frontier was waiting on **Vapi Test
Roofing Assistant structured-data config evidence** and, because that evidence was missing, **withheld**
the one-controlled-PSTN-retest approval. Jason has now configured the assistant out-of-band (strictly
within the Build 277 §5 boundary) and supplied **sanitized** Vapi UI screenshot evidence. This build
captures that evidence repo-only, re-asserts the Build 277/278 offline booking proof (the SAME verbal
call creates the booking once structured appointment fields arrive), and — because config evidence now
aligns exactly with the Build 277/278 requirements — creates the **narrow one controlled PSTN retest
approval** (`docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_APPROVAL_BUILD_279.md`). It changes no backend
code, performs no provider action, and places no call.

build_mode = structured_appointment_config_evidence_repo_only
build_271_redone = false
build_276_redone = false
build_277_redone = false
build_278_redone = false
current_frontier = one_controlled_pstn_retest_after_structured_config_evidence
preferred_path = structured_vapi_appointment_fields
opt2_code_fallback_status = deferred
build_278_prerequisite_commit = 2c98570
build_277_prerequisite_commit = 5b723f8
build_276_prerequisite_commit = b642e93
build_271_prerequisite_commit = 4d36bdf

---

## 1. What Build 277 / 278 established (carried forward, not re-litigated)

- The first-roofer E2E path resolves the mapped roofer and persists **lead + call**; only **booking**
  was not created, because the Test Roofing Assistant's End Of Call Report carried **no** structured
  appointment fields and the backend normalizer reads appointment signals from **structured fields only**
  (no transcript/summary fallback).
- The backend **already reads** `analysis.structuredData.appointment_booked` / `appointment_time` /
  `appointment_requested`, and `createVapiBooking` gates on
  `!appointment_booked || !appointment_time`. So the fix is a **Vapi assistant config** (Option 1), not
  a code change.
- Build 277 CASE 2 proved **offline** that the SAME verbal-appointment call that produced
  `booking_id=null` in Build 274/276 **creates the booking** once the assistant emits those structured
  fields — with **no** backend code change. Build 278 re-asserted that proof and recorded the missing
  config evidence as the one remaining gap.

offline_booking_case2_status = passed
build_277_offline_proof_reconfirmed_in_build_279 = true

---

## 2. Vapi structured config evidence captured (this build's core deliverable)

Jason configured the assistant out-of-band and provided **sanitized** Vapi UI screenshot evidence. The
following is captured from that evidence (no secrets, no API keys, no full phone numbers, no real
homeowner/roofer PII, no production data):

- **Vapi page:** Test Roofing Assistant → **Analysis**.
- **Assistant status:** visible as **Published**.
- **Structured Outputs section** shows these fields **attached to the Test Roofing Assistant**:

| Field (structured output) | Type (as shown in Vapi UI) | Backend read path (already implemented) |
|---|---|---|
| `appointment_requested` | Boolean | `analysis.structuredData.appointment_requested` |
| `appointment_time` | String | `analysis.structuredData.appointment_time` |
| `appointment_booked` | Boolean | `analysis.structuredData.appointment_booked` |

- **Expected backend payload location** remains **`message.analysis.structuredData`** (unchanged — this
  is exactly what the current compiled normalizer reads).

Configured structured-output expectation (consistent with Build 277 §4):

- `appointment_booked`: boolean — `true` when the homeowner agreed to and scheduled a specific visit.
- `appointment_time`: string, **ISO 8601** datetime, set **only** when scheduled.
- `appointment_requested`: boolean — optional/supporting signal (the homeowner asked for a visit).

vapi_structured_config_evidence_status = captured
appointment_booked_field_evidence = captured
appointment_time_field_evidence = captured
appointment_requested_field_evidence = captured
assistant_status_visible = published
structured_fields_expected_under = message.analysis.structuredData

### Sanitization attestation

No secrets, API keys, full phone numbers, real homeowner data, real roofer contact data, or production
data were captured in this evidence. The clean Vapi-managed Test Number is referenced only by last-4
`0389`. No JWT / `sk-` / `xox` token, no raw UUID, no call id, no provider call id, no email, no
recording URL, and no verbatim transcript is recorded here. The local secret file
`/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.

---

## 3. Manual config scope (what Jason did, out-of-band, within the Build 277 §5 boundary)

- **Test Roofing Assistant only** — its Analysis / Structured Outputs schema.
- Clean Vapi-managed **Test Number ending 0389** remains assigned (no phone number change).
- **No** Twilio change. **No** Retell change. **No** Railway / backend config / env / deploy / restart.
- **No** schema / auth / RLS change. **No** call. **No** SMS. **No** homeowner or roofer contact.

This is the exact Build 277 §5 boundary. Build 279 (this build) performed **none** of the above — it
only captures the evidence that Jason performed the in-boundary configuration.

---

## 4. Offline booking proof re-confirmed (Build 277/278 CASE 2, no code change)

The Build 279 verifier `backend/scripts/verify-structured-appointment-config-evidence-build-279-readonly.js`
compiles the **current** backend and drives the **real** `processVapiCallCompleted` against a fake
in-process Supabase (no network, no real Supabase):

- **CASE 1 — regression / the gap:** the verbal-appointment fixture with **no** structured appointment
  fields → mapped roofer resolves, **lead + call persist**, `booking_id=null`.
- **CASE 2 — post-config proof:** the fixture that **emits** the structured fields under
  `message.analysis.structuredData` (`appointment_booked=true`, `appointment_time` ISO,
  `appointment_requested=true`) → mapped roofer resolves, **lead + call persist**, and
  `createVapiBooking` **creates the booking** (`booking_id` present) — with **no** backend code change.

mapped_roofer_path_status = valid
lead_persistence_path_status = valid
call_persistence_path_status = valid
booking_persistence_on_structured_fields_status = created
offline_booking_case2_status = passed

---

## 5. Why the one controlled PSTN retest approval is created now

Build 278 withheld the approval solely because config evidence was missing — creating it earlier would
have risked burning the one-call budget on a call whose EOCR still emitted no structured fields
(`booking_id=null`). That condition is now resolved: the sanitized Vapi UI evidence in §2 shows the
Test Roofing Assistant emits the exact structured fields the backend reads, Published, with the clean
Test Number (last-4 `0389`) still assigned. Config evidence now aligns exactly with the Build 277/278
requirements, so the narrow approval packet is created in
`docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_APPROVAL_BUILD_279.md`.

controlled_pstn_retest_approval_status = created

The approval is scoped to exactly **one** Jason-owned physical-phone PSTN call to the clean Vapi Test
Number (last-4 `0389`), no retry unless separately approved, no SMS, and no provider/config/deploy
change during the test. See that packet for the full boundary.

---

## 6. Opt-2 backend transcript/summary fallback remains deferred

Option 2 (a backend transcript/summary fallback in `normalizeVapiCallCompletedPayload`) changes
production normalization/booking behavior for **every** roofer and **every** call, so it stays
**deferred**. Option 1 (the now-configured single-test-assistant structured schema) is the reliable,
reversible primary source of truth, and CASE 2 proves it creates the booking with no code change.

opt2_code_fallback_status = deferred

---

## 7. Safety invariants (Build 279)

- No call. No second call. No retry. No SMS. No homeowner contact. No roofer contact.
- No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No Retell API. No Vapi API. No curl / live HTTP.
  No real Supabase connection. No production DB read/export.
- This build changes **no** Vapi config, **no** phone number, **no** Twilio/Retell/Railway config, **no**
  backend env var, **no** schema/auth/RLS, and performs **no** backend deploy/redeploy/restart. No roofer
  row written or modified.
- No backend code change (Option 2 transcript/summary fallback remains deferred).
- No secret read or printed. `backend/.env` values not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call id, provider
  call id, email, recording URL, or verbatim transcript written. Reserved fictional `555-01xx` numbers
  only in fixtures. Existing Twilio → Retell → Vapi route preserved untouched.

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

## 8. Final status block

    build_mode = structured_appointment_config_evidence_repo_only
    build_279_status = completed
    build_271_redone = false
    build_276_redone = false
    build_277_redone = false
    build_278_redone = false
    current_frontier = one_controlled_pstn_retest_after_structured_config_evidence
    preferred_path = structured_vapi_appointment_fields
    opt2_code_fallback_status = deferred
    structured_fields_expected_under = message.analysis.structuredData
    appointment_booked_field_evidence = captured
    appointment_time_field_evidence = captured
    appointment_requested_field_evidence = captured
    assistant_status_visible = published
    offline_booking_case2_status = passed
    build_277_offline_proof_reconfirmed_in_build_279 = true
    vapi_structured_config_evidence_status = captured
    controlled_pstn_retest_approval_status = created
    live_pstn_retest_call_placed = false
    backend_code_change = false
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
    build_278_prerequisite_commit = 2c98570
    build_277_prerequisite_commit = 5b723f8
    build_276_prerequisite_commit = b642e93
    build_271_prerequisite_commit = 4d36bdf
    next_step = jason_places_exactly_one_controlled_pstn_call_to_the_clean_vapi_test_number_last4_0389_to_validate_mapped_roofer_lead_call_and_booking_persistence_under_the_build_279_approval_packet
