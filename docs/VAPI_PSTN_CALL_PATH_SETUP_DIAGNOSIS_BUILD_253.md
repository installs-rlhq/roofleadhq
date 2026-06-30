# Vapi PSTN Call-Path Setup — Repo-Only / Read-Only Diagnosis (Build 253)

Decision token: `VAPI_PSTN_CALL_PATH_DIAGNOSIS_WEB_TRANSPORT_MOST_LIKELY_READONLY_DASHBOARD_INSPECTION_NEXT_NO_NEW_CALL_WITHOUT_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `424c081` (Build 252 closeout), HEAD == origin/main.

## What this build is

Build 253 is a **repo-only, read-only diagnosis** of why the single approved controlled PSTN
end-of-call-report validation attempt (Build 252) produced **only web-visible call evidence** (Vapi
Calls `Type = Web`) and **no confirmed PSTN call record**. It reasons over **repo source + docs +
previously-captured (sanitized) Vapi UI evidence only**. It writes only this document, a read-only
verifier, and a dry-run wrapper.

Build 253 performs **no** runtime/external action of any kind. It places **no** call, dials **no**
phone number, clicks **no** Vapi Talk, performs **no** browser/webCall, runs **no** `curl`, calls
**no** live webhook, sends **no** SMS, uses **no** Twilio, changes **no** Vapi/Railway config,
publishes **no** Vapi assistant, triggers **no** deploy, requests **no** new call, contacts **no**
homeowner or roofer, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_pstn_call_path_readonly_diagnosis`
- `runtime_action_performed_by_build_253 = false`
- `diagnosis_inputs = repo_source_docs_and_prior_sanitized_vapi_ui_evidence_only`
- `another_call_requested = false`

## Prerequisite validated state (already proven)

- **Build 250** (commit `a487f13`) — approval + guard for exactly **one** controlled PSTN
  end-of-call-report validation attempt using **Test Roofing Assistant only** and a **Jason-owned /
  test number only**.
- **Build 251** (commit `828ea19`) — corrected the Vapi phone-number assistant assignment from
  **Appointment Receptionist** to **Test Roofing Assistant** (Inbound Settings);
  `corrected_assistant_assignment = test_roofing_assistant`; `sms_enabled_visible = true`;
  phone-level Server URL blank; phone-level credential **No authentication / fallback active**;
  assistant-level webhook credential = validated **Bearer** path (unchanged).
- **Build 252** (commit `424c081`) — captured the attempt as **ambiguous / not_confirmed**: one
  approved attempt reported completed once, approval **consumed**; uploaded Vapi CSV appeared
  **web/browser** (webhook rows all HTTP 200, no HTTP 400, no end-of-call-report, no PSTN/Twilio
  indicators); Vapi Calls UI showed `Type = Web` only; user reported "No PSTN results that I can find."
  - `build_252_prerequisite_commit = 424c081`
  - `build_252_prerequisite_status = validated`
  - `pstn_validation_attempt_consumed = true`
  - `no_retry_without_new_approval = true`
  - `pstn_call_record_confirmed = false`
  - `end_of_call_report_observed = false`
  - `full_final_report_processing_status = not_validated`
  - `real_pstn_call_path_validation_status = ambiguous_not_confirmed`

These prior states are **preserved unchanged** by Build 253.

---

## Diagnostic questions and repo-grounded answers

### Q1. From repo/docs/evidence, what are the required Vapi phone-number settings for inbound PSTN to reach Test Roofing Assistant?

From `docs/VAPI_PHONE_LEAD_PATH_SPEC.md` (§3 High-Level Flow, §6 Lead Matching) and the backend
classifier in `backend/src/services/vapi-webhook.service.ts`:

1. The inbound call must arrive through the roofer's **connected Twilio/Vapi phone path** (spec §3.1:
   "Inbound call arrives through the roofer's connected Twilio/Vapi phone path").
2. The Vapi **phone number** must be **assigned to the assistant** via **Inbound Settings** (the
   Build 251 correction set this to **Test Roofing Assistant**).
3. Vapi then emits a **post-call webhook**. For the backend to treat it as a real phone lead, the
   payload's transport must resolve to **`phone`** — `detectVapiCallTransport()` returns `phone` when
   `call.type` / `call.transport` contains `phone` or `pstn`, **or** when a PSTN destination
   (`roofer_destination_number`) is present (`vapi-webhook.service.ts:400-424`).
4. The roofer is identified by the **called number** mapped to a roofer (spec §6.1; the backend looks
   up `twilio_number` against `roofer_destination_number` — `vapi-webhook.service.ts:748-749`).

- `required_inbound_pstn_settings_documented = true`

### Q2. Is there evidence the phone number was assigned to Test Roofing Assistant after Build 251?

**Yes.** Build 251 (commit `828ea19`) captured the correction:
`corrected_assistant_assignment = test_roofing_assistant`, `assignment_corrected = true`,
`corrected_assignment_satisfies_build_250_scope = true` (via phone-number **Inbound Settings**). The
Build 250 guard was then rerun **after** Build 251 and passed (recorded in Build 252).

- `phone_assignment_corrected_to_test_roofing_assistant = true`
- `assignment_correction_considered = true`

### Q3. Is there evidence the Vapi Phone Number uses Provider=Twilio and SMS Enabled=true?

- **SMS Enabled = true:** **documented** from captured UI evidence — Build 251
  `sms_enabled_visible = true` (no SMS was sent). `sms_enabled_documented = true`.
- **Provider = Twilio:** **consistent with** the spec's "connected **Twilio**/Vapi phone path" and
  with an SMS-enabled Vapi number, **but the explicit phone-number `Provider` field value was not
  separately captured** in the prior sanitized UI evidence. It is therefore recorded as an **open
  question** to confirm by read-only inspection, not asserted as proven.
  - `provider_twilio_documented = consistent_not_explicitly_captured`
  - `provider_twilio_open_question = true`

### Q4. Does the phone-number-level Server URL being blank matter if the assistant-level Webhook Server URL is configured?

**No — not for webhook delivery.** In Vapi, the **assistant-level** Server URL is used when the
phone-number-level Server URL is blank. Build 251 recorded phone-level Server URL **blank** and the
assistant-level webhook = validated **Bearer** path (unchanged). Build 246/252 confirm webhook rows
**did reach** the backend at **HTTP 200** (`all_observed_webhook_responses_http_200 = true`,
`http_400_observed = false`), so delivery is **not** blocked by the blank phone-level Server URL. This
is **documented as an open question, not changed** by this build.

- `phone_level_blank_server_url_blocks_delivery = false`
- `phone_level_blank_server_url_open_question_not_changed = true`

### Q5. Does phone-number-level credential "No authentication / fallback active" matter if assistant-level Bearer credential is configured?

**No — not for webhook auth.** The **assistant-level Bearer** credential is the validated auth path
(Build 238/248), and observed webhook rows returned **HTTP 200 with no HTTP 401**, so authentication
succeeded on the path actually used. The phone-level "No authentication / fallback active" did not
block delivery/auth. **Documented as an open question, not changed.**

- `phone_level_no_auth_fallback_blocks_auth = false`
- `phone_level_no_auth_fallback_open_question_not_changed = true`
- `assistant_level_webhook_url_documented = true`
- `assistant_level_bearer_credential_documented = true`

### Q6. Is there any repo-visible reason a PSTN inbound call would not appear in Vapi Calls as Type=Phone/PSTN?

**Yes — the call transport itself.** The backend classifier shows the decisive distinction
(`vapi-webhook.service.ts:455-508`): a call whose `call.type` contains **`web`** is transport `web`,
and a web call **with no PSTN roofer destination** is classified `acknowledge_web_call` — a **no-op**
(`web_call: true`, `processed: false`, reason `web_call_no_destination`). Only a payload with
transport `phone`/`pstn` (or a present PSTN destination number) is routed to
`process_call_completed`. The Vapi Calls UI `Type` column is **Vapi-side**: a call placed via the
**browser/web path** (Vapi **Talk** / webCall) is recorded as **`Type = Web`**, never `Type = Phone`,
regardless of repo config. Build 252's evidence (CSV web/browser, no PSTN/Twilio indicators, Calls UI
`Type = Web` only) is exactly the signature of a **web-transport** call rather than a true PSTN dial.

- `repo_visible_reason_web_transport_not_pstn = true`
- `web_call_no_destination_is_noop = true`

### Q7. Most likely cause classification

Ranked from the repo + prior sanitized evidence:

1. **Most likely — user-side call action/path (web/browser, not a true PSTN dial).** The Vapi Calls UI
   labeled the records `Type = Web` and the CSV carried **no PSTN/Twilio indicators**. That is the
   signature of a call placed through the web/browser path (Talk/webCall) rather than by **dialing the
   PSTN number**. `likely_cause_primary = user_side_call_path_web_not_pstn`.
2. **Possible — phone-number routing/config.** A real PSTN dial that did not route to the
   test-assistant number (or to a different number/assistant) would also leave no `Type = Phone` record
   for this assistant. `likely_cause_secondary = phone_number_routing_or_config`.
3. **Possible — Twilio/provider setup.** If the number's Provider/Twilio binding is incomplete, an
   inbound PSTN dial may not reach Vapi at all. `likely_cause_tertiary = twilio_provider_setup`.
4. **Less likely — Vapi filtering/export.** The user already checked filters and found no PSTN
   results, lowering (not eliminating) this. `likely_cause_filtering_export = less_likely`.
5. **Not fully determinable from the repo alone.** Definitive attribution requires a **read-only**
   Vapi dashboard/API inspection. `likely_cause_unknown_without_readonly_inspection = true`.

- `likely_cause_classification_documented = true`

### Q8. What is the safest next step before any new approval?

A **repo-only-prepared, read-only Vapi dashboard/API inspection** — **no new call**:

1. In Vapi **Observe → Logs → Calls**, filter to **phone/PSTN** transport for the test window and
   confirm whether **any** `Type = Phone` record exists for the test number (vs. `Type = Web` only).
2. Read-only confirm the phone-number config: **Provider** (expected Twilio), **assigned assistant**
   (expected Test Roofing Assistant from Build 251), and **Inbound Settings**.
3. Confirm whether the prior attempt was placed by **dialing the PSTN number** or via **Talk/webCall**
   (the latter explains `Type = Web`).

Only **after** that read-only inspection, and only if a true PSTN test is still warranted, obtain a
**new, separate, explicit approval** for **one** attempt — with the explicit instruction to **dial the
PSTN number** (not use Talk/webCall) — honoring all Build 249/250 stop conditions. The Build 252
attempt is **consumed**; **no new call or retry without a new, separate approval.**

- `safest_next_step = readonly_dashboard_api_inspection_before_new_approval`
- `next_step_requires_new_separate_approval_for_any_new_call = true`

---

## Status fields (machine-checkable)

- `build_mode = vapi_pstn_call_path_readonly_diagnosis`
- `runtime_action_performed_by_build_253 = false`
- `another_call_requested = false`
- `build_250_prerequisite_commit = a487f13`
- `build_251_prerequisite_commit = 828ea19`
- `build_252_prerequisite_commit = 424c081`
- `build_252_prerequisite_status = validated`
- `pstn_validation_attempt_consumed = true`
- `no_retry_without_new_approval = true`
- `phone_assignment_corrected_to_test_roofing_assistant = true`
- `assignment_correction_considered = true`
- `sms_enabled_documented = true`
- `provider_twilio_documented = consistent_not_explicitly_captured`
- `provider_twilio_open_question = true`
- `phone_level_blank_server_url_blocks_delivery = false`
- `phone_level_blank_server_url_open_question_not_changed = true`
- `phone_level_no_auth_fallback_blocks_auth = false`
- `phone_level_no_auth_fallback_open_question_not_changed = true`
- `assistant_level_webhook_url_documented = true`
- `assistant_level_bearer_credential_documented = true`
- `repo_visible_reason_web_transport_not_pstn = true`
- `web_call_no_destination_is_noop = true`
- `likely_cause_primary = user_side_call_path_web_not_pstn`
- `likely_cause_secondary = phone_number_routing_or_config`
- `likely_cause_tertiary = twilio_provider_setup`
- `likely_cause_filtering_export = less_likely`
- `likely_cause_unknown_without_readonly_inspection = true`
- `likely_cause_classification_documented = true`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_pstn_call_path_validation_status = ambiguous_not_confirmed`
- `safest_next_step = readonly_dashboard_api_inspection_before_new_approval`
- `next_step_requires_new_separate_approval_for_any_new_call = true`
- `value_redacted = true`
- `secret_value_recorded = false`

## Files inspected (read-only)

- `docs/VAPI_PHONE_LEAD_PATH_SPEC.md` (inbound PSTN flow + lead matching)
- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md` (decision tree: EOCR-missing →
  diagnose PSTN delivery/config/routing)
- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md` (approval scope)
- `docs/VAPI_PHONE_ASSIGNMENT_CORRECTION_BUILD_251.md` (assignment correction + phone-number-screen
  observations)
- `docs/VAPI_PSTN_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_252.md` (ambiguous evidence)
- `backend/src/services/vapi-webhook.service.ts` (`detectVapiCallTransport`,
  `classifyVapiWebhookEvent`, web-call no-op, twilio_number lookup)
- `docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md` (confirmed: manual lead routing,
  not inbound PSTN call routing — not the cause)

## What was NOT done in this build

- **No runtime/external action of any kind by Build 253.** Read-only diagnosis only.
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No Vapi Talk** clicked; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** action; **no Twilio config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy
  / restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 253)

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
- No new call requested or placed.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 424c081`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `424c081` before edits.

## Next recommended step

**Perform a read-only Vapi dashboard/API inspection before any new approval** (no new call): in
Observe → Logs → Calls, filter to **phone/PSTN** and confirm whether any `Type = Phone` record exists
for the test number/time window; read-only confirm the phone-number **Provider** (expected Twilio),
**assigned assistant** (expected Test Roofing Assistant), and **Inbound Settings**; and determine
whether the prior attempt was a **PSTN dial** or a **Talk/webCall** (the latter explains the
`Type = Web` records). Only after that, and only if still warranted, obtain a **new, separate,
explicit approval** for **one** attempt that explicitly **dials the PSTN number** (not Talk/webCall).
The Build 252 attempt is **consumed**; no new call or retry without a new, separate approval.

## Files added in Build 253

- `docs/VAPI_PSTN_CALL_PATH_SETUP_DIAGNOSIS_BUILD_253.md` (this doc)
- `backend/scripts/verify-vapi-pstn-call-path-setup-diagnosis-build-253-readonly.js`
- `scripts/run-vapi-pstn-call-path-setup-diagnosis-build-253-dry-run.sh`
