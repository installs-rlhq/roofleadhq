# Vapi Phone-Number Assistant Assignment Correction (Build 251)

Decision token: `VAPI_PHONE_NUMBER_ASSISTANT_ASSIGNMENT_CORRECTED_TEST_ROOFING_ASSISTANT_PRIOR_GUARD_STALE_PSTN_APPROVED_NOT_YET_EXECUTED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `a487f13` (Build 250 closeout), HEAD == origin/main.

## What this build is

Build 251 **captures a necessary Vapi phone-number assistant-assignment correction** that Jason made
before the single approved PSTN end-of-call-report validation attempt could be performed, and it
**marks the Build 250 pre-run guard as stale** because the Vapi configuration changed after that guard
was last rerun. It writes only this document, a read-only verifier, and a dry-run wrapper.

Build 251 **does NOT perform the PSTN validation.** The single approved attempt (captured verbatim in
Build 250) remains a **separate, future** step that is **not** carried out here. This build performs
**no** runtime/external action of any kind.

Build 251 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, performs
**no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no**
Twilio, contacts **no** homeowner or roofer, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_phone_assignment_correction_capture`
- `pstn_validation_action_performed_by_build_251 = false`
- `runtime_action_performed_by_build_251 = false`
- `pstn_validation_status = approved_not_yet_executed`
- `real_call_test_status = approved_not_yet_executed`

## Prerequisite validated state (already proven)

- **Build 250** (commit `a487f13`) — captured the user's explicit approval for exactly **one
  controlled PSTN end-of-call-report validation attempt** using the **Test Roofing Assistant only** and
  a **Jason-owned / test number only**, and built the fresh fail-closed guard for that single future
  attempt. It executed no runtime action and performed no PSTN validation.
  - `build_250_prerequisite_status = validated`
  - `build_250_prerequisite_commit = a487f13`
  - `build_250_guard_doc = docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md`
  - `approved_assistant = test_roofing_assistant_only`
  - `approved_number = jason_owned_or_test_number_only`

Earlier validated states carried forward unchanged:

- **Build 248** (commit `3c97ddb`) — `end-of-call-report` is a visible (enabled) `serverMessages`
  chip (`end_of_call_report_appears_enabled = true`).
- **Build 246** (commit `563044c`) — browser/webCall webhook rows returned HTTP 200, no HTTP 400,
  `end_of_call_report_observed = false`.

## Carried-forward outcomes (unchanged, preserved)

- `all_observed_responses_http_200 = true`  (Build 246)
- `http_400_observed = false`  (Build 246)
- `end_of_call_report_appears_enabled = true`  (Build 248)
- `end_of_call_report_observed = false`  (Build 246)
- `full_final_report_processing_status = not_validated`

---

## 1. What happened (sequence of events, sanitized)

1. The Build 250 guard was **rerun and passed** immediately before the approved action, as Build 250's
   next step requires.
2. **Before placing the call**, Jason performed a **read-only check** of the Vapi phone-number
   assistant assignment.
3. The Vapi phone number was found assigned to **Appointment Receptionist**, **not** Test Roofing
   Assistant. That assignment would **not** satisfy the Build 250 approved scope
   (`approved_assistant = test_roofing_assistant_only`).
4. Jason **corrected** the Vapi phone-number **Inbound Settings** assistant assignment to **Test
   Roofing Assistant** and saved it.
5. **No PSTN call was placed. No SMS was sent. No webhook validation attempt was performed.**

- `guard_rerun_before_check = passed`
- `readonly_assignment_check_performed = true`

## 2. The mismatch and the correction (captured evidence)

- **Before correction:** Vapi phone-number assistant assignment was **Appointment Receptionist**.
  - `pre_correction_assistant_assignment = appointment_receptionist`
  - `assignment_mismatch_documented = true`
  - `pre_correction_assignment_satisfied_build_250_scope = false`
- **After correction:** Vapi phone-number **Inbound Settings** assistant is **Test Roofing
  Assistant**.
  - `corrected_assistant_assignment = test_roofing_assistant`
  - `assignment_corrected = true`
  - `corrected_assignment_satisfies_build_250_scope = true`
- **Phone number value:** redacted — not recorded in this packet.
  - `phone_number_redacted = true`
  - `value_redacted = true`

## 3. Other phone-number-screen observations (sanitized)

- **SMS Enabled** was visible on the phone-number screen, but **no SMS was sent** by this build or by
  the read-only check / correction.
  - `sms_enabled_visible = true`
  - `sms_sent = false`
- **Phone-number-level Server URL** was **blank**.
  - `phone_level_server_url_blank = true`
- **Phone-number-level Credential** showed **No authentication / fallback active**.
  - `phone_level_credential_no_auth_fallback = true`
- The **assistant-level webhook credential** from prior builds **remains** the validated **Bearer**
  credential path (unchanged by this build).
  - `assistant_level_webhook_credential = bearer_validated_path_unchanged`

## 4. Build 250 prior guard is now STALE

The Build 250 pre-run guard was rerun and passed, but the Vapi configuration **changed afterward**
(the phone-number assistant assignment was corrected from Appointment Receptionist to Test Roofing
Assistant). Because the guard's preconditions reflected the **pre-change** configuration, that prior
guard rerun is now **stale** and **must not** be relied upon for the approved PSTN attempt.

- `build_250_prior_guard_status = stale`
- `guard_stale_reason = vapi_config_changed_after_guard_rerun`
- `fresh_guard_rerun_required = true`

A **fresh** Build 250 guard rerun is **required** immediately before any PSTN attempt. The one approved
attempt remains **approved but not yet executed**.

---

## Status fields (machine-checkable)

- `build_mode = vapi_phone_assignment_correction_capture`
- `pstn_validation_action_performed_by_build_251 = false`
- `runtime_action_performed_by_build_251 = false`
- `build_250_prerequisite_commit = a487f13`
- `build_250_prerequisite_status = validated`
- `approved_assistant = test_roofing_assistant_only`
- `approved_number = jason_owned_or_test_number_only`
- `guard_rerun_before_check = passed`
- `readonly_assignment_check_performed = true`
- `pre_correction_assistant_assignment = appointment_receptionist`
- `pre_correction_assignment_satisfied_build_250_scope = false`
- `assignment_mismatch_documented = true`
- `corrected_assistant_assignment = test_roofing_assistant`
- `assignment_corrected = true`
- `corrected_assignment_satisfies_build_250_scope = true`
- `phone_number_redacted = true`
- `value_redacted = true`
- `sms_enabled_visible = true`
- `sms_sent = false`
- `phone_level_server_url_blank = true`
- `phone_level_credential_no_auth_fallback = true`
- `assistant_level_webhook_credential = bearer_validated_path_unchanged`
- `build_250_prior_guard_status = stale`
- `guard_stale_reason = vapi_config_changed_after_guard_rerun`
- `fresh_guard_rerun_required = true`
- `pstn_validation_status = approved_not_yet_executed`
- `real_call_test_status = approved_not_yet_executed`
- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `end_of_call_report_appears_enabled = true`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `call_placed = false`
- `phone_dialed = false`
- `twilio_action_performed = false`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No PSTN validation executed.** Assignment-correction capture only.
- **No runtime/external action of any kind by Build 251.**
- **No call placed.** **No phone number dialed.**
- **No Vapi Talk** clicked; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** action; **no Twilio config change**.
- **No Vapi publish**; **no Railway config change**; **no deploy / redeploy / restart**; **no Railway
  variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

> Note: the Vapi phone-number **assistant-assignment correction** described above was a **manual** Vapi
> dashboard change Jason performed **outside** this build to align the configuration with the Build 250
> approved scope. Build 251 only **captures** that correction as evidence; the build itself changes no
> Vapi configuration.

## Safety invariants (held by Build 251)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No `curl` executed.
- No live webhook called.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No Vapi configuration change by this build (the captured correction was a manual change outside this
  build).
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at a487f13`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `a487f13` before edits.

## Next recommended step

**Rerun a fresh Build 250 guard immediately before the single approved controlled PSTN validation
attempt** (`bash scripts/run-vapi-pstn-end-of-call-report-validation-guard-build-250-dry-run.sh`) —
the prior guard rerun is now stale because the Vapi configuration changed after it. Confirm the fresh
guard passes, then **perform exactly one attempt** using the now-correctly-assigned **Test Roofing
Assistant** and a Jason-owned / test number, **capturing sanitized evidence only**, honoring every
stop condition. One attempt only; no retry without a new, separate approval.

## Files added in Build 251

- `docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md` (this doc)
- `backend/scripts/verify-vapi-phone-assignment-correction-build-251-readonly.js`
- `scripts/run-vapi-phone-assignment-correction-build-251-dry-run.sh`
