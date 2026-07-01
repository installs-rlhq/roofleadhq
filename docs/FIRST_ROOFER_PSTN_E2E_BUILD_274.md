# First Roofer PSTN E2E — One Approved Call Executed, Backend 200, Persistence Not Observed (Build 274, repo-only closeout)

decision_token = FIRST_ROOFER_PSTN_E2E_EXECUTED_EXACTLY_ONE_APPROVED_CALL_MAPPED_ROOFER_LAUNCH_TEST_ROOFING_CLEAN_VAPI_NUMBER_ENDING_0389_TEST_ROOFING_ASSISTANT_ANSWERED_EOCR_REACHED_BACKEND_200_BUT_LEAD_BOOKING_CALL_PERSISTENCE_NOT_OBSERVED_RESULT_INCONCLUSIVE_NO_RETRY_NO_SECOND_CALL_BUILD_274

Build 274 captures the honest masked closeout of the exactly-one, separately-approved PSTN
first-roofer E2E test call that Jason placed after Build 273. The call reached the backend
(EOCR → HTTP 200), but lead / booking / call persistence for the mapped roofer was **not observed**
in Supabase. **The result is therefore inconclusive: backend returned 200, but full lead
persistence was not proven.** This build records evidence only — it is repo-only. It places **no**
call, requests **no** retry, and changes **no** code behavior, config, provider state, schema, or
deploy.

build_mode = first_roofer_pstn_e2e_closeout_evidence_repo_only
call_performed_by_build_274 = false
call_performed_out_of_band_by_jason = true
true_pstn_call_count = 1
retry_count = 0
build_273_prerequisite_commit = 0cfa8cf
build_272_prerequisite_commit = 0930813
build_271_prerequisite_commit = 4d36bdf
build_270_prerequisite_commit = 1248386
build_268_prerequisite_commit = 4c08b5e

---

## 1. What was approved, and what Jason did

Build 273 staged exactly one controlled PSTN first-roofer E2E test and left
`first_roofer_e2e_test_approval_status = not_approved`, requiring a SEPARATE single-call approval.
That separate approval was granted for exactly one call only. Jason then placed exactly one true
PSTN call to the clean Vapi-managed Test Number (ending `0389`), which is mapped to the single roofer
row `Launch Test Roofing 1780434363` and assigned to the Test Roofing Assistant. The agent placed no
call in Build 273 or Build 274; the one call was performed out-of-band by Jason under that one-call
approval. No retry and no second call were made or requested.

first_roofer_pstn_e2e_execution_status = completed_one_call
true_pstn_call_count = 1
retry_count = 0
second_call_placed = false
second_call_requested = false

---

## 2. Masked observations from the one call (as reported by Jason)

Recorded in masked form per the no-full-number / no-raw-id rule. Jason's first two template lines were
left as literal "yes/no", but the visible Vapi call record, the visible EOCR, the backend 200, and the
confirmed assistant-used together imply the call completed and the assistant answered; phrased
conservatively below.

- Assistant used: Test Roofing Assistant — yes.
- Vapi call record visible: yes.
- EOCR visible in Vapi: yes.
- Webhook / backend status visible: yes; backend status = 200.
- Supabase lead created: unsure — does not look like it (not observed).
- Supabase booking created: unsure — does not look like it (not observed).
- Supabase call record created: unsure — does not look like it (not observed).
- Retry count: 0.
- SMS sent: no.
- Homeowner contact: no.
- Roofer contact: no.
- Config / deploy / schema changes: no.

call_completion_status = observed_via_vapi_record_and_eocr
assistant_answered_status = observed_test_roofing_assistant_used
assistant_used = Test Roofing Assistant
clean_vapi_number_last4 = 0389
mapped_roofer_identifier = Launch Test Roofing 1780434363
eocr_to_backend_status = 200

The mapped roofer identifier above is Jason's chosen label for the mapped test row (NOT a phone
number). The full clean Vapi number is never written into repo docs or verifiers; only the last-4
`0389` appears.

---

## 3. Backend 200 vs persistence — the exact gap

The EOCR reached the backend and the webhook returned HTTP 200. That is necessary but **not
sufficient**: Build 268 introduced a controlled no-op that returns 200 for a clean/unmapped Vapi EOCR
destination, and a mapped destination is expected (per Build 271's fixture proof) to persist
lead + booking + call and also return 200. A 200 alone therefore cannot distinguish "persisted for the
mapped roofer" from "no-op". Jason's Supabase observation was that lead, booking, and call records do
**not** appear to have been created. So while the technical voice path reached the backend with 200,
the persistence half of the mapped-roofer E2E was not observed.

mapped_roofer_path_status = attempted_backend_200
lead_persistence_status = inconclusive_or_not_observed
booking_persistence_status = inconclusive_or_not_observed
call_persistence_status = inconclusive_or_not_observed
first_roofer_e2e_result = inconclusive_backend_200_persistence_not_observed

This build does **not** mark the first-roofer E2E as a full pass. Persistence was not proven and
appears not observed.

---

## 4. Mapping requirement (unchanged) grounded against real service source

Source of truth: `backend/src/services/vapi-webhook.service.ts`. The roofer lookup remains a single
field equality:

    .eq('twilio_number', normalized.roofer_destination_number)

i.e. the mapping is `roofers.twilio_number == <normalized clean Vapi EOCR destination (E.164)>`. Build
273 confirmed exactly one roofer row (`Launch Test Roofing 1780434363`) carries the clean Vapi number
(last-4 `0389`) as its `twilio_number`. This build changes no code and preserves the Build 268
controlled no-op and the Build 271 mapped-persistence path. The observed non-persistence is a runtime
/ data observation to diagnose next — it is NOT a code change made or proposed here.

mapping_requirement_status = confirmed_repo_only
mapping_code_behavior_preserved = true
mapped_roofer_count = 1

---

## 5. Determination

Exactly one approved PSTN call occurred; retry count 0; the Test Roofing Assistant answered; the EOCR
reached the backend and returned HTTP 200. However, lead / booking / call persistence for the mapped
roofer was not observed in Supabase. **Final result: inconclusive — backend 200 but lead/booking/call
persistence not observed.** No full pass is claimed.

first_roofer_pstn_e2e_execution_status = completed_one_call
eocr_to_backend_status = 200
first_roofer_e2e_result = inconclusive_backend_200_persistence_not_observed
first_roofer_e2e_full_pass_claimed = false

---

## 6. Next smallest action (no new call unless separately approved)

Diagnose why the backend returned 200 without a visibly persisted lead / booking / call for the mapped
roofer — **without placing another call**. Candidate read-only / offline diagnostics to run before any
re-test:
- Confirm the normalized EOCR destination (E.164) exactly equals the mapped roofer's stored
  `twilio_number` (normalization / formatting mismatch would send the lookup down the Build 268 no-op).
- Re-check that the one mapped roofer row is the row the webhook resolves (single-field equality; no
  duplicate/whitespace/country-code drift).
- Inspect backend/webhook logs for the specific EOCR (masked) to see whether the mapped branch or the
  Build 268 no-op branch executed.
- Re-run Build 271's offline fake-Supabase fixture to reconfirm the mapped branch persists, isolating
  code-vs-data as the cause.

Any subsequent PSTN call remains OUT OF SCOPE and must be separately approved, one call only. The
existing Twilio → Retell route stays untouched.

next_step = diagnose_backend_200_without_visible_persistence_for_mapped_roofer_no_new_call_unless_separately_approved

---

## 7. Safety invariants (Build 274)

- Exactly one approved PSTN call occurred (placed out-of-band by Jason). No retry. No second call.
- No SMS. No homeowner contact. No real roofer contact.
- This build (the agent) placed no call, requested no retry, and requested no second call.
- No Vapi Test/Talk/browserWebCall initiated by this build. No Twilio CLI/API. No Retell API. No Vapi API call.
- No roofer row written or modified by this build.
- No Twilio / Retell / Vapi / Railway config change. No env var change.
- No schema / auth / RLS change. No backend deploy, redeploy, or restart.
- No production data export. No secret read or printed. `backend/.env` values not read.
  The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call ID, or email written.
- Existing Twilio → Retell route preserved untouched.

no_retry = true
no_second_call = true
no_sms_sent = true
no_homeowner_contact = true
no_real_roofer_contact = true
no_config_deploy_schema_changes = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_vapi_config_changed = true
no_railway_config_changed = true
no_backend_deploy = true
no_schema_auth_rls_changed = true
no_env_var_changed = true
no_production_data_export = true
no_secret_printing = true
full_clean_vapi_number_recorded_in_repo = false

---

## 8. Final status block

    build_mode = first_roofer_pstn_e2e_closeout_evidence_repo_only
    call_performed_by_build_274 = false
    call_performed_out_of_band_by_jason = true
    first_roofer_pstn_e2e_execution_status = completed_one_call
    true_pstn_call_count = 1
    retry_count = 0
    clean_vapi_number_last4 = 0389
    assistant_used = Test Roofing Assistant
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    call_completion_status = observed_via_vapi_record_and_eocr
    assistant_answered_status = observed_test_roofing_assistant_used
    eocr_to_backend_status = 200
    mapped_roofer_path_status = attempted_backend_200
    mapped_roofer_count = 1
    mapping_requirement_status = confirmed_repo_only
    mapping_code_behavior_preserved = true
    lead_persistence_status = inconclusive_or_not_observed
    booking_persistence_status = inconclusive_or_not_observed
    call_persistence_status = inconclusive_or_not_observed
    first_roofer_e2e_result = inconclusive_backend_200_persistence_not_observed
    first_roofer_e2e_full_pass_claimed = false
    second_call_placed = false
    second_call_requested = false
    no_retry = true
    no_second_call = true
    no_sms_sent = true
    no_homeowner_contact = true
    no_real_roofer_contact = true
    no_config_deploy_schema_changes = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_vapi_config_changed = true
    no_railway_config_changed = true
    no_backend_deploy = true
    no_schema_auth_rls_changed = true
    no_env_var_changed = true
    no_production_data_export = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    build_273_prerequisite_commit = 0cfa8cf
    build_272_prerequisite_commit = 0930813
    build_271_prerequisite_commit = 4d36bdf
    build_270_prerequisite_commit = 1248386
    build_268_prerequisite_commit = 4c08b5e
    next_step = diagnose_backend_200_without_visible_persistence_for_mapped_roofer_no_new_call_unless_separately_approved
