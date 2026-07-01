# Controlled PSTN Booking Revalidation — Outcome (Build 280, repo-only)

decision_token = JASON_HAS_NOW_EXECUTED_THE_EXACTLY_ONE_BUILD_279_APPROVED_CONTROLLED_PSTN_RETEST_ONE_JASON_OWNED_PHYSICAL_PHONE_CALL_TO_THE_CLEAN_VAPI_TEST_NUMBER_LAST4_0389_NO_RETRY_ACTING_AS_HOMEOWNER_VERBALLY_SCHEDULING_A_VISIT_AND_REPORTS_THE_CALL_COMPLETED_AN_EOCR_ANALYSIS_EXISTS_WITH_STRUCTURED_OUTPUTS_APPOINTMENT_BOOKED_TRUE_APPOINTMENT_TIME_POPULATED_APPOINTMENT_REQUESTED_TRUE_AND_WEBHOOK_BACKEND_DELIVERY_COMPLETED_BUT_DID_NOT_SUPPLY_THE_SANITIZED_BACKEND_RESPONSE_BODY_OR_DB_ROW_EVIDENCE_SO_BUILD_280_CAPTURES_THE_OUTCOME_MARKS_A_PARTIAL_PASS_WITH_A_SPECIFIC_BACKEND_PERSISTENCE_CONFIRMATION_GAP_NO_CALL_NO_RETRY_NO_SMS_NO_PROVIDER_ACTION_NO_DEPLOY_BUILD_280

Build 280 is the **outcome-capture checkpoint** for the one controlled PSTN retest that Build 279
approved (`docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_APPROVAL_BUILD_279.md`). Jason has now placed the
**exactly one** approved Jason-owned physical-phone PSTN call to the clean Vapi-managed Test Number
(last-4 `0389`), acting as the homeowner and verbally scheduling a visit. This build captures the
**sanitized** outcome he reported, re-asserts the Build 277/278/279 offline booking proof (unchanged),
and makes an **honest, non-overclaiming** determination of the first-roofer end-to-end status. It
changes no backend code, performs no provider action, and places no call.

build_mode = controlled_pstn_booking_revalidation_outcome_repo_only
build_271_redone = false
build_276_redone = false
build_277_redone = false
build_278_redone = false
build_279_redone = false
build_279_one_call_approval_consumed = true
current_frontier = backend_side_persistence_confirmation_from_the_completed_pstn_retest_call
preferred_path = structured_vapi_appointment_fields
opt2_code_fallback_status = deferred
build_279_prerequisite_commit = fa04692
build_278_prerequisite_commit = 2c98570
build_277_prerequisite_commit = 5b723f8
build_276_prerequisite_commit = b642e93
build_271_prerequisite_commit = 4d36bdf

---

## 1. What Builds 271 → 279 established (carried forward, not re-litigated)

- **Mapping is live:** exactly one mapped roofer exists — `Launch Test Roofing 1780434363`, with its
  `twilio_number` mapped to the clean Vapi-managed Test Number (last-4 `0389`), assigned to the Test
  Roofing Assistant (Builds 272/273).
- **Lead + call persist on a live mapped-roofer call:** Build 274's live PSTN call, corrected in Build
  276 from Jason's masked webhook-response body, proved the mapped roofer resolves and **lead + call
  persist**; only the **booking** was not created because that EOCR carried **no** structured
  appointment fields.
- **Booking is a config problem, not a code problem:** the backend already reads
  `analysis.structuredData.appointment_booked` / `appointment_time` / `appointment_requested`, and
  `createVapiBooking` gates on `!appointment_booked || !appointment_time`. Build 277/278/279 proved
  **offline** (CASE 2) that the SAME verbal call **creates the booking** once the assistant emits those
  structured fields — with **no** backend code change.
- **Structured config evidence captured (Build 279):** Test Roofing Assistant → Analysis → Structured
  Outputs shows `appointment_requested` (Boolean), `appointment_time` (String), `appointment_booked`
  (Boolean); status **Published**; expected payload location `message.analysis.structuredData`; clean
  Test Number (last-4 `0389`) still assigned.
- **Build 279 created the one-call approval** and it is now **consumed** by the single call reported here.

build_279_one_call_approval_consumed = true
offline_booking_case2_status = passed

---

## 2. The controlled PSTN retest that Jason executed (sanitized report)

Jason performed the **exactly one** call approved in Build 279. The following is captured from Jason's
sanitized report (no secrets, no API keys, no full phone numbers, no real homeowner/roofer PII, no
production data, no raw UUID/call id, no verbatim transcript):

- **Exactly one approved PSTN retest was performed** — one Jason-owned physical-phone call.
- **Target:** the clean Vapi-managed **Test Number ending 0389** only.
- **No retry** was performed (and none was approved).
- Jason acted as the **homeowner** and **verbally scheduled a specific visit**.
- **Call completed.**
- **End Of Call Report / analysis existed.**
- **Structured Outputs** (under `message.analysis.structuredData`):
  - `appointment_booked` = **true**
  - `appointment_time` = **populated**
  - `appointment_requested` = **true**
- **Webhook / backend delivery completed** (the EOCR webhook reached the backend).

controlled_pstn_retest_execution_status = completed_once_no_retry
call_completed = true
eocr_analysis_exists = true
appointment_booked_structured_output = true
appointment_time_structured_output = populated
appointment_requested_structured_output = true
webhook_backend_delivery_status = completed

### Sanitization attestation

No secrets, API keys, full phone numbers, real homeowner data, real roofer contact data, or production
data were captured. The clean Vapi-managed Test Number is referenced only by last-4 `0389`. No JWT /
`sk-` / `xox` token, no raw UUID, no call id, no provider call id, no email, no recording URL, and no
verbatim transcript is recorded here. The local secret file
`/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**.

---

## 3. Offline booking proof re-confirmed (Build 277/278/279 CASE 2, no code change)

The Build 280 verifier `backend/scripts/verify-controlled-pstn-retest-outcome-build-280-readonly.js`
compiles the **current** backend and drives the **real** `processVapiCallCompleted` against a fake
in-process Supabase (no network, no real Supabase):

- **CASE 1 — regression / the pre-config gap:** the verbal-appointment fixture with **no** structured
  appointment fields → mapped roofer resolves, **lead + call persist**, `booking_id=null`.
- **CASE 2 — the exact live condition Jason reported:** the fixture that **emits** the structured fields
  under `message.analysis.structuredData` (`appointment_booked=true`, ISO `appointment_time`,
  `appointment_requested=true`) → mapped roofer resolves, **lead + call persist**, and
  `createVapiBooking` **creates the booking** (`booking_id` present) — with **no** backend code change.

This confirms that the structured-output values Jason's live EOCR reported are **exactly** the input
condition the real compiled backend turns into a persisted booking. It is a strong, code-grounded
expectation — but it is an **offline** proof against a fake Supabase, **not** direct observation of the
production DB rows from Jason's live call. See §4/§5 for the honest determination.

case1_offline_booking_status = booking_id_null_as_expected
case2_offline_booking_status = booking_created_as_expected
offline_booking_case2_status = passed

---

## 4. Honest determination: what the reported evidence does and does not prove

**Proven by the reported evidence (Vapi / transport side):**

- The one approved call completed with **no retry**.
- The EOCR / analysis exists and its **Structured Outputs carry the exact gate fields the backend reads**
  — `appointment_booked=true`, `appointment_time` populated, `appointment_requested=true`.
- The webhook **reached the backend** (delivery completed).

**Not yet proven for THIS live call (backend / persistence side):**

The Build 279 approval §3 success criterion was an **EOCR webhook response body** showing `ok:true`,
`inserted:true`, a `matched_lead_id`, a `call_id`, and a **non-null `booking_id`** — or an equivalent
sanitized DB row confirmation. Jason reported that delivery **completed**, but did **not** supply that
sanitized backend response body or a masked DB row check. So for **this specific call** we do **not** yet
have direct sanitized evidence that:

- a **lead** row was persisted (`matched_lead_id`),
- a **call** row was persisted (`call_id`),
- a **booking** row was created (non-null `booking_id`).

This is deliberately **not overclaimed**. Prior builds proved the mapped-roofer **lead + call** persist
branch on a live call (Build 274/276) and the offline CASE 2 proves the booking is created from exactly
these structured fields — together they make persistence **strongly expected** — but the backend-side
confirmation for the Build 280 call itself has not been captured.

mapped_roofer_lead_persistence_status = unverified_gap
mapped_roofer_call_persistence_status = unverified_gap
mapped_roofer_booking_persistence_status = unverified_gap

---

## 5. First-roofer E2E status

first_roofer_e2e_status = partial_pass_with_specific_gap

- **Transport / Vapi side: PASS.** Clean Vapi PSTN call → EOCR structured outputs
  (`appointment_booked=true`, `appointment_time` populated, `appointment_requested=true`) → webhook
  delivered to backend. The single largest prior blocker (an EOCR with no structured fields, Build
  274/276) is now resolved in a real live call.
- **Backend / persistence side: UNVERIFIED GAP.** No sanitized backend response body or DB row evidence
  from **this** call confirms the lead / call / booking rows.

**Specific remaining gap (single, precise):** capture the **sanitized backend-side outcome of the
already-completed Build 280 call** — the EOCR webhook response body (`ok`, `inserted`, `duplicate`,
`matched_lead_id` present/masked, `call_id` present/masked, `booking_id` present/non-null,
`appointment_booked`, `appointment_time` present) **or** a masked DB row confirmation (lead + call +
booking rows for that call). This closes the E2E to a full pass.

**Important — this gap does NOT require another call.** The one approved call is already completed and
consumed. Closing the gap needs only backend-side evidence (Railway HTTP/webhook response line or a
masked DB check) from that **same** call. Therefore Build 280 does **not** create, and does **not**
request, another PSTN-retest approval.

no_additional_pstn_retest_approval_created = true
gap_closure_requires_another_call = false

---

## 6. Opt-2 backend transcript/summary fallback remains deferred

Option 2 (a backend transcript/summary fallback in `normalizeVapiCallCompletedPayload`) changes
production normalization/booking behavior for **every** roofer and **every** call, so it stays
**deferred**. It is not required to close the Build 280 gap: the live EOCR already emitted the structured
fields, so Option 1 (the configured structured schema) worked as intended.

opt2_code_fallback_status = deferred

---

## 7. Safety invariants (Build 280)

- No call. No additional call. No retry. No SMS. No homeowner contact. No roofer contact.
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

no_retry_performed = true
no_call_placed_by_agent = true
no_additional_call_placed = true
no_sms_sent = true
no_phone_number_changed = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_vapi_config_changed_during_test = true
no_railway_config_changed = true
no_backend_deploy = true
no_env_var_changed = true
no_schema_auth_rls_changed = true
no_secret_printing = true
full_clean_vapi_number_recorded_in_repo = false

---

## 8. Final status block

    build_mode = controlled_pstn_booking_revalidation_outcome_repo_only
    build_280_status = completed
    build_271_redone = false
    build_276_redone = false
    build_277_redone = false
    build_278_redone = false
    build_279_redone = false
    build_279_one_call_approval_consumed = true
    controlled_pstn_retest_execution_status = completed_once_no_retry
    call_completed = true
    eocr_analysis_exists = true
    appointment_booked_structured_output = true
    appointment_time_structured_output = populated
    appointment_requested_structured_output = true
    webhook_backend_delivery_status = completed
    offline_booking_case2_status = passed
    mapped_roofer_lead_persistence_status = unverified_gap
    mapped_roofer_call_persistence_status = unverified_gap
    mapped_roofer_booking_persistence_status = unverified_gap
    first_roofer_e2e_status = partial_pass_with_specific_gap
    opt2_code_fallback_status = deferred
    gap_closure_requires_another_call = false
    no_additional_pstn_retest_approval_created = true
    no_retry_performed = true
    no_call_placed_by_agent = true
    no_additional_call_placed = true
    no_sms_sent = true
    no_phone_number_changed = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_vapi_config_changed_during_test = true
    no_railway_config_changed = true
    no_backend_deploy = true
    no_env_var_changed = true
    no_schema_auth_rls_changed = true
    no_production_data_export = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    clean_vapi_number_last4 = 0389
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    build_279_prerequisite_commit = fa04692
    build_278_prerequisite_commit = 2c98570
    build_277_prerequisite_commit = 5b723f8
    build_276_prerequisite_commit = b642e93
    build_271_prerequisite_commit = 4d36bdf
    next_step = jason_supplies_the_sanitized_backend_side_outcome_of_the_same_already_completed_build_280_call_the_eocr_webhook_response_body_ok_inserted_matched_lead_id_call_id_non_null_booking_id_or_a_masked_db_row_confirmation_no_new_call_no_new_approval
