# Live Booking Observation Retest — One-Call Approval Packet (Build 283, repo-only)

decision_token = BUILD_282_COMMIT_613ce56_IS_CONFIRMED_DEPLOYED_ON_RAILWAY_ROOFLEADHQ_API_VIA_GET_HEALTH_COMMIT_SHORT_613ce56_ENVIRONMENT_PRODUCTION_WHICH_MEANS_THE_BUILD_281_STRUCTUREDOUTPUTS_BOOKING_FIX_72f834f_IS_LIVE_SO_THIS_PACKET_REQUESTS_EXACTLY_ONE_JASON_OWNED_PHYSICAL_PHONE_PSTN_CALL_TO_THE_CLEAN_VAPI_TEST_NUMBER_LAST4_0389_TO_OBSERVE_LIVE_MAPPED_ROOFER_LEAD_PLUS_CALL_PLUS_BOOKING_PERSISTENCE_NO_RETRY_NO_SMS_NO_PROVIDER_OR_CONFIG_OR_DEPLOY_CHANGE_DURING_THE_TEST_BUILD_283

This packet is the **one live booking observation retest approval** that Build 282 explicitly **withheld**
until runtime deployment was confirmed. It is created now because Build 283 captured the missing
prerequisite — **sanitized runtime evidence** that Build 282 commit `613ce56` is deployed on Railway
service `roofleadhq-api` (`GET /health` → `commit_short = 613ce56`, `environment = production`), which
means the Build 281 Structured-Outputs booking fix (`72f834f`, an ancestor of `613ce56`) is **live**. This
document does **not** place a call; it defines the exact, narrow boundary within which Jason may place
exactly one call.

    build_mode = live_booking_observation_retest_approval_repo_only
    current_frontier = one_live_booking_observation_after_runtime_deployment_confirmed
    approval_type = one_live_booking_observation_pstn_call
    live_booking_observation_retest_approval_status = created

---

## 1. Precondition satisfied (why this approval exists now)

- **Runtime deployment confirmed** (Build 283 §3): `GET /health` returns `status = ok`,
  `environment = production`, `commit = 613ce56a115e8b5ebb089d751958a7a09b2b2605`,
  `commit_short = 613ce56` — no longer `unknown`. Railway dashboard shows an active successful deployment
  of `roofleadhq-api` for that commit.
- **Build 281 fix is therefore live**: `72f834f` is an ancestor of the running commit `613ce56`, so the
  normalizer that ingests `message.analysis.structuredOutputs` and un-gates `createVapiBooking` is running
  in production.
- **Offline booking proof** still passes: the live-shape structuredOutputs payload normalizes
  `appointment_booked = true` + populated `appointment_time`, so `createVapiBooking` fires — re-confirmed
  by the Build 283 verifier with no code change.
- **Vapi structured config evidence** captured earlier (Build 279): Test Roofing Assistant emits the
  structured appointment fields; clean Test Number last-4 `0389` still assigned.

    precondition_build_282_runtime_deployment_status = deployed
    precondition_build_281_fix_runtime_status = live
    precondition_offline_booking_proof_status = passed
    precondition_vapi_structured_config_evidence_status = captured
    deployed_commit_short = 613ce56

---

## 2. Exactly what is approved (and only this)

**ALLOWED — exactly one call, by Jason:**
- **Exactly one** Jason-owned **physical-phone** PSTN call.
- **Target:** the clean Vapi-managed **Test Number ending 0389** only.
- **Purpose:** observe live mapped-roofer **lead + call + booking** persistence now that the Build 281
  structuredOutputs fix is deployed — i.e. Jason, acting as the homeowner, verbally agrees to and schedules
  a specific visit so the assistant emits `appointment_booked = true` + an ISO `appointment_time`, and the
  live backend creates the booking.

    approved_call_count = 1
    approved_target = clean_vapi_test_number_last4_0389
    approved_purpose = observe_live_mapped_roofer_lead_call_and_booking_persistence

**NOT ALLOWED under this approval:**
- **No retry** unless separately approved (if the first call is inconclusive, stop and report — do not
  redial).
- **No SMS.**
- **No Twilio change.**
- **No Retell change.**
- **No Vapi config change during the test** (the structured-outputs config stays exactly as-is; do not edit
  the assistant mid-test).
- **No Railway / backend config / env / deploy / restart / redeploy during the test** (the deployed commit
  `613ce56` stays exactly as-is).
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
    no_railway_or_backend_config_env_deploy_restart_during_test = true
    no_schema_auth_rls_change = true
    no_production_data_export = true
    no_real_homeowner_contact = true
    no_real_roofer_contact_beyond_controlled_pilot = true

---

## 3. Expected result if the call is placed under this approval

When Jason places the one approved call and verbally schedules a visit, against the **live deployed** Build
282 backend:

1. Twilio → Retell → Vapi route delivers the call to the Test Roofing Assistant (clean number last-4
   `0389`), unchanged.
2. The assistant's End Of Call Report emits the structured appointment fields
   (`appointment_booked = true`, ISO 8601 `appointment_time`, `appointment_requested = true`).
3. The live backend (running commit `613ce56`, which includes the Build 281 normalizer) resolves the
   mapped roofer, persists **lead + call**, and — because the deployed normalizer now reads the structured
   fields and both gate fields are present — `createVapiBooking` creates the **booking**.

Success criterion: EOCR webhook response body shows `ok:true`, `inserted:true`, a `matched_lead_id`, a
`call_id`, and a **non-null `booking_id`** with `appointment_booked = true` and a non-empty
`appointment_time`. Anything else is inconclusive → stop and report, no redial.

    expected_booking_id = non_null
    expected_appointment_booked = true
    expected_appointment_time = non_empty_iso8601

---

## 4. This packet performs no action

Build 283 creates this approval packet **repo-only**. It places **no** call, sends **no** SMS, and makes
**no** provider/config/deploy change. The single call, if approved by Jason, is an **out-of-band** action
Jason performs from his own physical phone within the boundary above. Evidence of the call's outcome is
captured in a later build (sanitized: no full numbers, no PII, no secrets, no raw UUID/call id).

    no_call_placed_by_this_build = true
    no_sms_sent_by_this_build = true
    no_provider_action_by_this_build = true
    no_deploy_by_this_build = true

---

## 5. Safety invariants (Build 283 approval packet)

- No call placed by this build. No SMS. No homeowner contact. No roofer contact.
- No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No Retell API. No Vapi API. No curl / live HTTP.
  No real Supabase connection. No production DB read/export.
- No Vapi config change. No phone number change. No Twilio/Retell/Railway config change. No backend env
  var change. No schema/auth/RLS change. No backend deploy/redeploy/restart. No roofer row written.
- No backend code change (Option 2 transcript/summary fallback remains deferred; the deployed
  structuredOutputs reader is sufficient once the assistant emits the fields).
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

    build_mode = live_booking_observation_retest_approval_repo_only
    build_283_approval_status = created
    approval_type = one_live_booking_observation_pstn_call
    live_booking_observation_retest_approval_status = created
    approved_call_count = 1
    approved_target = clean_vapi_test_number_last4_0389
    approved_purpose = observe_live_mapped_roofer_lead_call_and_booking_persistence
    precondition_build_282_runtime_deployment_status = deployed
    precondition_build_281_fix_runtime_status = live
    precondition_offline_booking_proof_status = passed
    precondition_vapi_structured_config_evidence_status = captured
    deployed_commit_short = 613ce56
    no_retry_without_separate_approval = true
    no_sms = true
    no_twilio_change = true
    no_retell_change = true
    no_vapi_config_change_during_test = true
    no_railway_or_backend_config_env_deploy_restart_during_test = true
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
    build_283_evidence_doc = docs/BUILD_282_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_283.md
    next_step = jason_places_exactly_one_live_booking_observation_pstn_call_to_the_clean_vapi_test_number_last4_0389_then_a_later_build_captures_sanitized_lead_call_and_booking_persistence_evidence
