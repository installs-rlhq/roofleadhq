# Vapi PSTN Validation — Ambiguous / Not-Confirmed Evidence (Build 252)

Decision token: `VAPI_PSTN_VALIDATION_ATTEMPT_CONSUMED_EVIDENCE_AMBIGUOUS_WEB_ONLY_NO_PSTN_RECORD_NO_RETRY_WITHOUT_NEW_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `828ea19` (Build 251 closeout), HEAD == origin/main.

## What this build is

Build 252 **captures evidence** that the single approved controlled PSTN end-of-call-report
validation attempt was **reported completed once** by Jason, and that the post-attempt evidence is
**ambiguous / not confirmed**: the Vapi-visible records show **web/browser** call evidence only, with
**no confirmed PSTN call record** and **no end-of-call-report observed**. It writes only this
document, a read-only verifier, and a dry-run wrapper.

Build 252 **does NOT perform the PSTN validation**, **does NOT retry it**, and performs **no**
runtime/external action of any kind. The one approved attempt is **consumed**; **no retry is
permitted without a new, separate approval.**

Build 252 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, performs
**no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no**
Twilio, contacts **no** homeowner or roofer, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_pstn_validation_ambiguous_evidence_capture`
- `pstn_validation_action_performed_by_build_252 = false`
- `runtime_action_performed_by_build_252 = false`
- `pstn_validation_attempt_consumed = true`
- `no_retry_without_new_approval = true`

## Prerequisite validated state (already proven)

- **Build 250** (commit `a487f13`) — captured the user's explicit approval for exactly **one
  controlled PSTN end-of-call-report validation attempt** using the **Test Roofing Assistant only**
  and a **Jason-owned / test number only**, and built the fresh fail-closed guard for that single
  future attempt. It executed no runtime action and performed no PSTN validation.
  - `build_250_prerequisite_status = validated`
  - `build_250_prerequisite_commit = a487f13`
  - `build_250_guard_doc = docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md`
  - `approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt`
  - `approved_assistant = test_roofing_assistant_only`
  - `approved_number = jason_owned_or_test_number_only`
  - `one_attempt_limit = true`
- **Build 251** (commit `828ea19`) — captured the Vapi phone-number assistant-assignment correction
  (was **Appointment Receptionist**, corrected via Inbound Settings to **Test Roofing Assistant**)
  performed before the approved attempt.
  - `build_251_prerequisite_status = validated`
  - `build_251_prerequisite_commit = 828ea19`
  - `build_251_doc = docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md`
  - `corrected_assistant_assignment = test_roofing_assistant`

## Guard rerun after Build 251 (passed)

After Build 251, the Build 250 guard was **rerun and passed** with the recorded approval state:

- `guard_rerun_after_build_251 = passed`
- `pstn_validation_status_at_guard = approved_not_yet_executed`
- `approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt`
- `approved_assistant = test_roofing_assistant_only`
- `approved_number = jason_owned_or_test_number_only`
- `sanitized_evidence_capture_only = true`
- `one_attempt_limit = true`
- `no_retry_without_new_approval = true`
- `end_of_call_report_appears_enabled = true`
- `full_final_report_processing_status = not_validated`
- `phone_dialed_at_guard = false`
- `live_sms_sent_at_guard = false`
- `repo_unchanged_at_guard = true`

---

## 1. What happened (sequence of events, sanitized)

1. The Build 250 guard was **rerun after Build 251 and passed** (`approved_not_yet_executed`).
2. Jason then reported: the **PSTN validation call completed once**. The single approved attempt is
   now **consumed**.
3. After the attempt, Jason uploaded a Vapi CSV and a Vapi Observe → Logs → Calls screenshot for
   evidence.
4. The post-attempt evidence was reviewed **read-only** in this build.

- `pstn_validation_attempt_reported_completed = true`
- `pstn_validation_attempt_consumed = true`
- `attempt_count = 1`
- `retry_performed = false`

## 2. Post-attempt evidence reviewed (sanitized)

**Uploaded Vapi CSV (after the attempt):**

- `webhook_rows_observed = true`
- `all_observed_webhook_responses_http_200 = true`
- `http_400_observed = false`
- `end_of_call_report_observed = false`
- `csv_call_type_appeared = web_browser`
- `pstn_twilio_indicators_observed = false`

**Vapi Observe → Logs → Calls screenshot:**

- Visible calls for **Test Roofing Assistant** were **Type = Web only**.
  - `visible_vapi_calls_type = web_only`
- After checking filters, Jason reported: **"No PSTN results that I can find."**
  - `user_reported_no_pstn_results = true`
  - `pstn_call_record_confirmed = false`

**No end-of-call-report was observed. No SMS was reported. No retry was performed.**

## 3. Interpretation (captured, not re-executed)

- The approved PSTN validation attempt is **consumed**.
- PSTN validation result is **ambiguous / not confirmed**.
- Vapi-visible evidence shows **web-only** call records, **not** a confirmed PSTN call record.
- Full final report processing remains **not_validated**.
- Real PSTN call-path validation remains **not_confirmed**.
- **No retry is permitted without a new, separate approval.**
- The next step is a **repo-only / read-only diagnosis** of why the attempted PSTN path produced only
  web-visible evidence or no PSTN call record.

- `pstn_validation_result = ambiguous_not_confirmed`
- `real_pstn_call_path_validation_status = ambiguous_not_confirmed`
- `full_final_report_processing_status = not_validated`

---

## Status fields (machine-checkable)

- `build_mode = vapi_pstn_validation_ambiguous_evidence_capture`
- `pstn_validation_action_performed_by_build_252 = false`
- `runtime_action_performed_by_build_252 = false`
- `build_250_prerequisite_commit = a487f13`
- `build_250_prerequisite_status = validated`
- `build_251_prerequisite_commit = 828ea19`
- `build_251_prerequisite_status = validated`
- `approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt`
- `approved_assistant = test_roofing_assistant_only`
- `approved_number = jason_owned_or_test_number_only`
- `corrected_assistant_assignment = test_roofing_assistant`
- `guard_rerun_after_build_251 = passed`
- `one_attempt_limit = true`
- `attempt_count = 1`
- `pstn_validation_attempt_reported_completed = true`
- `pstn_validation_attempt_consumed = true`
- `retry_performed = false`
- `no_retry_without_new_approval = true`
- `webhook_rows_observed = true`
- `all_observed_webhook_responses_http_200 = true`
- `http_400_observed = false`
- `csv_call_type_appeared = web_browser`
- `pstn_twilio_indicators_observed = false`
- `visible_vapi_calls_type = web_only`
- `user_reported_no_pstn_results = true`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_appears_enabled = true`
- `end_of_call_report_observed = false`
- `sms_reported = false`
- `twilio_action_confirmed = false`
- `full_final_report_processing_status = not_validated`
- `pstn_validation_result = ambiguous_not_confirmed`
- `real_pstn_call_path_validation_status = ambiguous_not_confirmed`
- `phone_dialed = false`
- `live_sms_sent = false`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No PSTN validation executed.** Evidence capture only.
- **No retry of the consumed attempt.** No retry without a new, separate approval.
- **No runtime/external action of any kind by Build 252.**
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

> Note: the PSTN validation **attempt** described above was a **manual** action Jason performed
> **outside** this build, and the CSV/screenshot were **manual** uploads. Build 252 only **captures**
> that reported attempt and its ambiguous evidence; the build itself places no call and changes no
> Vapi/Twilio/Railway configuration.

## Safety invariants (held by Build 252)

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
- No Vapi configuration change by this build.
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed by this build.
- No retry of the consumed approved attempt.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 828ea19`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `828ea19` before edits.

## Next recommended step

**Run a repo-only / read-only diagnosis of the PSTN call-path setup** — investigate why the attempted
PSTN path produced only web-visible call records (Type = Web) and why no PSTN call record or
end-of-call-report was observed in Vapi Logs. Examine the relationship between the Vapi phone-number
(Twilio) configuration, the assistant routing, and the webhook/server-message wiring **in the repo and
documentation only**, without placing any call, dialing any number, using Vapi Talk, running a
browser/webCall, calling the live webhook, or touching Twilio. The single approved PSTN attempt is
**consumed**; **no new attempt or retry** may occur until a **new, separate approval** is captured.

## Files added in Build 252

- `docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md` (this doc)
- `backend/scripts/verify-vapi-pstn-validation-ambiguous-evidence-build-252-readonly.js`
- `scripts/run-vapi-pstn-validation-ambiguous-evidence-build-252-dry-run.sh`
