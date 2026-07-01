# Structured Appointment Config Evidence — Gap (Build 278, repo-only)

decision_token = BUILD_277_OFFLINE_BOOKING_PROOF_STILL_PASSES_CASE2_CREATES_THE_BOOKING_ONCE_STRUCTURED_FIELDS_ARRIVE_BUT_NO_MANUAL_VAPI_TEST_ROOFING_ASSISTANT_STRUCTURED_DATA_CONFIG_EVIDENCE_IS_PRESENT_IN_THE_REPO_OR_AS_A_SAFE_LOCAL_ARTIFACT_SO_BUILD_278_DOCUMENTS_THE_GAP_AND_DOES_NOT_CREATE_THE_ONE_CONTROLLED_PSTN_RETEST_APPROVAL_NO_CALL_NO_SMS_NO_PROVIDER_ACTION_NO_DEPLOY_BUILD_278

Build 278 is the **evidence-capture checkpoint** after the Build 277 approval packet. It re-asserts —
repo-only, offline — that the Build 277 booking proof still holds, then records that the one thing the
frontier is waiting on, **Vapi Test Roofing Assistant structured-data config evidence**, is **not yet
present** in the repo or as a safe local artifact. Because that evidence is missing, Build 278 **does not**
create the one-controlled-PSTN-retest approval. It changes no backend code, performs no provider action,
and places no call.

build_mode = structured_appointment_config_gap_repo_only
build_271_redone = false
build_276_redone = false
build_277_redone = false
current_frontier = structured_vapi_config_evidence_then_one_pstn_retest
preferred_path = structured_vapi_appointment_fields
opt2_code_fallback_status = deferred
build_277_prerequisite_commit = 5b723f8
build_276_prerequisite_commit = b642e93
build_271_prerequisite_commit = 4d36bdf

---

## 1. What Build 277 established (carried forward, not re-litigated)

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
  fields — with **no** backend code change.
- Build 277 created the **minimal config approval packet**
  (`docs/VAPI_STRUCTURED_APPOINTMENT_FIELDS_APPROVAL_BUILD_277.md`) scoped to the Test Roofing Assistant
  only, keeping the clean Vapi Test Number (last-4 `0389`) assigned, with no phone/Twilio/Retell/
  Railway/backend/schema changes.

offline_booking_case2_status = passed
build_277_offline_proof_reconfirmed_in_build_278 = true

---

## 2. The gap this build records

Build 278's job was to capture **manual Vapi UI evidence** that Jason configured the Test Roofing
Assistant's structured-data / analysis schema out-of-band (within the Build 277 §5 boundary), and — only
if that evidence were present and aligned exactly with the Build 277 fields — to create the one
controlled PSTN retest approval.

As of this build, **no such evidence is present**:

- No Build 278 config-evidence document or exported/sanitized assistant-schema artifact exists in the
  repo.
- No safe local artifact carrying the assistant's post-config structured-data schema was provided.
- The tracked working tree was clean at build start (nothing new attributable to a manual config drop).

vapi_structured_config_evidence_status = missing_gap_identified

Because the config evidence is missing, creating a live PSTN retest approval now would risk burning the
one-call budget on a call whose EOCR would still emit no structured fields → still `booking_id=null`.
So the retest approval is **withheld** by design.

controlled_pstn_retest_approval_status = withheld_until_config_evidence_captured

---

## 3. What is needed to close the gap (next build's input)

Jason (out-of-band, within the Build 277 §5 boundary) configures the **Test Roofing Assistant only** so
its End Of Call Report emits, under `message.analysis.structuredData`:

| Field | Type | Required for booking |
|---|---|---|
| `appointment_booked` | boolean | yes (must be `true`) |
| `appointment_time` | string, ISO 8601 datetime, set only when scheduled | yes (must be non-empty) |
| `appointment_requested` | boolean | no (supported/optional) |

Then supply, for a future build, **sanitized** evidence that the assistant is so configured — for
example a masked screenshot description or the assistant's structured-data schema keys/types (NO secrets,
NO full phone numbers, NO real homeowner/roofer PII, reserved fictional `555-01xx` values only if an
example is needed). With that evidence captured and aligned to these exact fields, the next build creates
the **one controlled PSTN retest** approval.

next_single_material_step = jason_supplies_sanitized_vapi_test_roofing_assistant_structured_data_config_evidence_then_next_build_creates_one_controlled_pstn_retest_approval

---

## 4. Why no PSTN retest approval is created in this build

- The offline proof passing is **necessary but not sufficient** — it proves the backend side. The live
  retest only makes sense once the assistant is actually emitting the structured fields.
- No committed evidence shows the assistant emits them yet.
- The Build 277 doc itself gates the live approval on config completion (§8): "must not be created until
  the offline proof passes **and** Jason has completed the §5 config."

live_pstn_retest_approval_status = not_created_this_build

---

## 5. Safety invariants (Build 278)

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

## 6. Final status block

    build_mode = structured_appointment_config_gap_repo_only
    build_278_status = completed
    build_271_redone = false
    build_276_redone = false
    build_277_redone = false
    current_frontier = structured_vapi_config_evidence_then_one_pstn_retest
    preferred_path = structured_vapi_appointment_fields
    opt2_code_fallback_status = deferred
    structured_fields_expected_under = message.analysis.structuredData
    appointment_booked_field_required = true
    appointment_time_field_required = true
    appointment_requested_field_optional_or_supported = true
    offline_booking_case2_status = passed
    build_277_offline_proof_reconfirmed_in_build_278 = true
    vapi_structured_config_evidence_status = missing_gap_identified
    controlled_pstn_retest_approval_status = withheld_until_config_evidence_captured
    live_pstn_retest_approval_status = not_created_this_build
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
    build_277_prerequisite_commit = 5b723f8
    build_276_prerequisite_commit = b642e93
    build_271_prerequisite_commit = 4d36bdf
    next_step = jason_supplies_sanitized_vapi_test_roofing_assistant_structured_data_config_evidence_then_next_build_creates_one_controlled_pstn_retest_approval
