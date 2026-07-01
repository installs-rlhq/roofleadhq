# Controlled PSTN Booking Revalidation — One-Call Approval Packet (Build 279, repo-only)

decision_token = STRUCTURED_VAPI_CONFIG_EVIDENCE_IS_NOW_CAPTURED_BUILD_279_SO_THE_FRONTIER_GATE_IS_SATISFIED_AND_THIS_PACKET_REQUESTS_EXACTLY_ONE_JASON_OWNED_PHYSICAL_PHONE_PSTN_CALL_TO_THE_CLEAN_VAPI_TEST_NUMBER_LAST4_0389_TO_VALIDATE_MAPPED_ROOFER_LEAD_PLUS_CALL_PLUS_BOOKING_PERSISTENCE_AFTER_THE_STRUCTURED_APPOINTMENT_FIELDS_CONFIG_NO_RETRY_NO_SMS_NO_PROVIDER_OR_CONFIG_OR_DEPLOY_CHANGE_DURING_THE_TEST_BUILD_279

This packet is the **one controlled PSTN retest approval** the Build 278 gap doc deferred. It is created
now because Build 279 captured the missing prerequisite — **sanitized Vapi UI evidence** that the Test
Roofing Assistant emits the structured appointment fields the backend reads
(`docs/VAPI_STRUCTURED_APPOINTMENT_CONFIG_EVIDENCE_BUILD_279.md`). This document does **not** place a
call; it defines the exact, narrow boundary within which Jason may place exactly one call.

build_mode = controlled_pstn_booking_revalidation_approval_repo_only
current_frontier = one_controlled_pstn_retest_after_structured_config_evidence
approval_type = one_controlled_pstn_call
controlled_pstn_retest_approval_status = created

---

## 1. Precondition satisfied (why this approval exists now)

- **Offline booking proof** (Build 277/278 CASE 2) passes: the SAME verbal call creates the booking once
  structured fields arrive, with no backend code change. Re-confirmed by the Build 279 verifier.
- **Vapi structured config evidence captured** (Build 279 §2): Test Roofing Assistant → Analysis →
  Structured Outputs shows `appointment_requested` (Boolean), `appointment_time` (String),
  `appointment_booked` (Boolean); assistant status **Published**; expected payload location
  `message.analysis.structuredData`; clean Test Number (last-4 `0389`) still assigned.

Both the necessary (offline) and previously-missing (config evidence) conditions are now met, so the
one-call budget will not be spent on a call that would still emit no structured fields.

precondition_offline_booking_case2_status = passed
precondition_vapi_structured_config_evidence_status = captured

---

## 2. Exactly what is approved (and only this)

**ALLOWED — exactly one call, by Jason:**
- **Exactly one** Jason-owned **physical-phone** PSTN call.
- **Target:** the clean Vapi-managed **Test Number ending 0389** only.
- **Purpose:** validate mapped-roofer **lead + call + booking** persistence after the structured
  appointment fields config — i.e. Jason, acting as the homeowner, verbally agrees to and schedules a
  specific visit so the assistant emits `appointment_booked=true` + an ISO `appointment_time`.

approved_call_count = 1
approved_target = clean_vapi_test_number_last4_0389
approved_purpose = validate_mapped_roofer_lead_call_and_booking_persistence

**NOT ALLOWED under this approval:**
- **No retry** unless separately approved (if the first call is inconclusive, stop and report — do not
  redial).
- **No SMS.**
- **No Twilio change.**
- **No Retell change.**
- **No Vapi config change during the test** (the structured-outputs config captured in Build 279 stays
  exactly as-is; do not edit the assistant mid-test).
- **No Railway / backend config / env / deploy / restart.**
- **No schema / auth / RLS change.**
- **No production data export.**
- **No real homeowner contact.**
- **No real roofer contact** beyond the already-controlled pilot/demo mapping path
  (`Launch Test Roofing 1780434363`, clean Vapi number last-4 `0389`).

no_retry_without_separate_approval = true
no_sms = true
no_twilio_change = true
no_retell_change = true
no_vapi_config_change_during_test = true
no_railway_or_backend_config_env_deploy_restart = true
no_schema_auth_rls_change = true
no_production_data_export = true
no_real_homeowner_contact = true
no_real_roofer_contact_beyond_controlled_pilot = true

---

## 3. Expected result if the call is placed under this approval

When Jason places the one approved call and verbally schedules a visit:

1. Twilio → Retell → Vapi route delivers the call to the Test Roofing Assistant (clean number last-4
   `0389`), unchanged.
2. The assistant's End Of Call Report emits, under `message.analysis.structuredData`,
   `appointment_booked=true` and an ISO 8601 `appointment_time` (and optionally
   `appointment_requested=true`).
3. The backend resolves the mapped roofer, persists **lead + call**, and — because both gate fields are
   now present — `createVapiBooking` creates the **booking** (`booking_id` present).

Success criterion: EOCR webhook response body shows `ok:true`, `inserted:true`, a `matched_lead_id`,
a `call_id`, and a **non-null `booking_id`** with `appointment_booked=true` and a non-empty
`appointment_time`. Anything else is inconclusive → stop and report, no redial.

expected_booking_id = non_null
expected_appointment_booked = true
expected_appointment_time = non_empty_iso8601

---

## 4. This packet performs no action

Build 279 creates this approval packet **repo-only**. It places **no** call, sends **no** SMS, and makes
**no** provider/config/deploy change. The single call, if approved by Jason, is an **out-of-band** action
Jason performs from his own physical phone within the boundary above. Evidence of the call's outcome is
captured in a later build (sanitized: no full numbers, no PII, no secrets, no raw UUID/call id).

no_call_placed_by_this_build = true
no_sms_sent_by_this_build = true
no_provider_action_by_this_build = true
no_deploy_by_this_build = true

---

## 5. Safety invariants (Build 279 approval packet)

- No call placed by this build. No SMS. No homeowner contact. No roofer contact.
- No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No Retell API. No Vapi API. No curl / live HTTP.
  No real Supabase connection. No production DB read/export.
- No Vapi config change. No phone number change. No Twilio/Retell/Railway config change. No backend env
  var change. No schema/auth/RLS change. No backend deploy/redeploy/restart. No roofer row written.
- No backend code change (Option 2 transcript/summary fallback remains deferred).
- No secret read or printed. `backend/.env` not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call id, provider
  call id, email, recording URL, or verbatim transcript written.

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

    build_mode = controlled_pstn_booking_revalidation_approval_repo_only
    build_279_approval_status = created
    approval_type = one_controlled_pstn_call
    controlled_pstn_retest_approval_status = created
    approved_call_count = 1
    approved_target = clean_vapi_test_number_last4_0389
    approved_purpose = validate_mapped_roofer_lead_call_and_booking_persistence
    precondition_offline_booking_case2_status = passed
    precondition_vapi_structured_config_evidence_status = captured
    no_retry_without_separate_approval = true
    no_sms = true
    no_twilio_change = true
    no_retell_change = true
    no_vapi_config_change_during_test = true
    no_railway_or_backend_config_env_deploy_restart = true
    no_schema_auth_rls_change = true
    no_production_data_export = true
    no_real_homeowner_contact = true
    no_real_roofer_contact_beyond_controlled_pilot = true
    no_call_placed = true
    no_sms_sent = true
    no_phone_number_changed = true
    no_backend_deploy = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    clean_vapi_number_last4 = 0389
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    build_279_evidence_doc = docs/VAPI_STRUCTURED_APPOINTMENT_CONFIG_EVIDENCE_BUILD_279.md
    next_step = jason_places_exactly_one_controlled_pstn_call_to_the_clean_vapi_test_number_last4_0389_then_a_later_build_captures_sanitized_lead_call_and_booking_persistence_evidence
