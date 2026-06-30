# Vapi True PSTN Validation Dial — Approval Capture & Fresh Fail-Closed Guard (Build 255)

Decision token: `VAPI_TRUE_PSTN_VALIDATION_DIAL_APPROVAL_CAPTURED_FRESH_FAIL_CLOSED_GUARD_ONE_DIAL_FROM_JASON_PHONE_TO_TEST_ROOFING_ASSISTANT_NUMBER_NO_VAPI_TEST_NO_VAPI_TALK_APPROVED_NOT_YET_EXECUTED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `9f60fed` (Build 254 closeout), HEAD == origin/main.

## What this build is

Build 255 **captures the explicit user approval** for exactly **one true PSTN validation dial** — a
**real PSTN call placed from Jason's own physical phone / iPhone Phone app to the Vapi number assigned to
Test Roofing Assistant** — and builds a **fresh, fail-closed guard packet** for that single future dial.
It writes only this guard document, a read-only verifier, and a dry-run wrapper.

Build 255 **does NOT perform the PSTN dial.** The approved dial is a **separate, future** step that is
**not** carried out here. This build performs **no** runtime/external action of any kind.

Build 255 itself places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no**
Vapi **Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends
**no** SMS, uses **no** Twilio, contacts **no** homeowner or roofer, changes **no** Railway/Vapi config,
publishes **no** Vapi assistant, triggers **no** deploy, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard`
- `pstn_validation_action_performed_by_build_255 = false`
- `runtime_action_performed_by_build_255 = false`
- `true_pstn_validation_status = approved_not_yet_executed`

## Prerequisite validated state (already proven)

- **Build 254** (commit `9f60fed`) — clarified that the prior attempted PSTN validation used the Vapi
  **Test** control (web transport), **not** a true PSTN dial; this explained the prior Vapi Calls
  `Type = Web` evidence and the absence of any PSTN call record / end-of-call report.
  - `build_254_prerequisite_commit = 9f60fed`
  - `build_254_prerequisite_status = validated`
  - `build_254_method_clarification_preserved = true`
  - `prior_attempt_was_vapi_test_not_true_pstn = true`

Carried forward unchanged from Build 254:

- `true_pstn_call_performed = false`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `true_pstn_validation_status = not_executed` → now `approved_not_yet_executed` (this build captures the
  approval; the dial itself is still not executed)

---

## 1. Captured approval (verbatim)

The user granted the following approval. It is captured here **exactly**, verbatim, and is the sole
authorization the single future true PSTN validation dial may rely on:

> I approve one true PSTN validation dial for RoofLeadHQ Build 255 from my Jason-owned physical phone/iPhone Phone app to the Vapi number assigned to Test Roofing Assistant, with sanitized evidence capture only, no Vapi Test, no Vapi Talk, no retry without new approval, no real homeowner traffic, no real roofer traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation. Stop on any unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, or unsafe behavior.

- `approval_captured_verbatim = true`
- `approval_scope = one_true_pstn_validation_dial`
- `approval_build_reference = build_255`

## 2. Approval boundaries (the fresh guard the future dial must satisfy)

The single approved future true PSTN dial is authorized **only** within every boundary below. Any
deviation voids the approval and requires a new, separate approval.

- **One true PSTN validation dial only.** `one_dial_limit = true` / `true_pstn_dial_limit = 1`.
- **Placed from Jason's own physical phone / iPhone Phone app** — a real PSTN origination, not a
  dashboard control. `dial_origin = jason_owned_physical_phone_or_iphone_phone_app`.
- **Destination = the Vapi number assigned to Test Roofing Assistant** — no production assistant, no
  other number. `dial_destination = vapi_number_assigned_to_test_roofing_assistant`;
  `approved_assistant = test_roofing_assistant_only`.
- **No Vapi Test.** `no_vapi_test = true`.
- **No Vapi Talk.** `no_vapi_talk = true`.
- **Sanitized evidence capture only.** `sanitized_evidence_capture_only = true`.
- **No real homeowner traffic.** `no_real_homeowner_traffic = true`.
- **No real roofer traffic.** `no_real_roofer_traffic = true`.
- **No SMS unless separately approved.** `no_sms_unless_separately_approved = true`.
- **No production data export.** `no_production_data_export = true`.
- **No schema / auth / RLS changes.** `no_schema_auth_rls_changes = true`.
- **No billing / CRM automation.** `no_billing_crm_automation = true`.
- **No public / live automation.** `no_public_live_automation = true`.
- **No retry without a new, separate approval.** `no_retry_without_new_approval = true`.

## 3. Stop conditions (fail-closed)

The single approved future dial must **stop immediately** (one dial only; no retry without a new,
separate approval) on any of the following:

- **Any unexpected SMS.** `stop_on_unexpected_sms = true`.
- **Any real traffic** (real homeowner or roofer). `stop_on_real_traffic = true`.
- **HTTP 401.** `stop_on_http_401 = true`.
- **HTTP 400.** `stop_on_http_400 = true`.
- **HTTP 500.** `stop_on_http_500 = true`.
- **Missing end-of-call-report.** `stop_on_missing_end_of_call_report = true`.
- **Any unsafe behavior.** `stop_on_unsafe_behavior = true`.
- **Stop after the one dial regardless of outcome.** `stop_after_one_dial = true`.

- `stop_conditions_documented = true`

## 4. Exact sanitized evidence to capture (if/when the dial is later executed)

When — and only when — the single approved dial is executed under a fresh re-run of this guard, the
executor must capture the following, all **sanitized**:

- **Vapi Calls record** for the dial — confirm `Type = Phone` (true PSTN), not `Type = Web`.
- **Vapi Webhooks rows** for the dial (sanitized listing).
- **`end_of_call_report_observed`** — `true` / `false`.
- **Endpoint URL / path** that received the webhook.
- **HTTP method** — expected `POST`.
- **HTTP status** returned.
- **Sanitized response-body summary** (no raw body containing identifiers).
- **Backend receipt status** — whether the backend recorded receipt.
- **Whether full payload processing succeeded** (`process_call_completed` outcome).
- **Whether a lead / booking write occurred or was intentionally blocked / no-op.**
- **Explicitly NO** raw call IDs, phone numbers, tokens, secrets, API keys, or PII.

- `evidence_capture_fields_documented = true`
- `sanitized_evidence_capture_only = true`

---

## Status fields (machine-checkable)

- `build_mode = true_pstn_validation_dial_approval_capture_and_fresh_fail_closed_guard`
- `pstn_validation_action_performed_by_build_255 = false`
- `runtime_action_performed_by_build_255 = false`
- `true_pstn_validation_status = approved_not_yet_executed`
- `build_254_prerequisite_commit = 9f60fed`
- `build_254_prerequisite_status = validated`
- `build_254_method_clarification_preserved = true`
- `prior_attempt_was_vapi_test_not_true_pstn = true`
- `approval_captured_verbatim = true`
- `approval_scope = one_true_pstn_validation_dial`
- `one_dial_limit = true`
- `true_pstn_dial_limit = 1`
- `dial_origin = jason_owned_physical_phone_or_iphone_phone_app`
- `dial_destination = vapi_number_assigned_to_test_roofing_assistant`
- `approved_assistant = test_roofing_assistant_only`
- `no_vapi_test = true`
- `no_vapi_talk = true`
- `sanitized_evidence_capture_only = true`
- `no_real_homeowner_traffic = true`
- `no_real_roofer_traffic = true`
- `no_sms_unless_separately_approved = true`
- `no_production_data_export = true`
- `no_schema_auth_rls_changes = true`
- `no_billing_crm_automation = true`
- `no_public_live_automation = true`
- `no_retry_without_new_approval = true`
- `stop_on_unexpected_sms = true`
- `stop_on_real_traffic = true`
- `stop_on_http_401 = true`
- `stop_on_http_400 = true`
- `stop_on_http_500 = true`
- `stop_on_missing_end_of_call_report = true`
- `stop_on_unsafe_behavior = true`
- `stop_after_one_dial = true`
- `stop_conditions_documented = true`
- `evidence_capture_fields_documented = true`
- `true_pstn_call_performed = false`
- `pstn_call_record_confirmed = false`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No PSTN validation executed.** Approval-capture and fresh guard only.
- **No runtime/external action of any kind by Build 255.**
- **No call placed.** **No phone number dialed.** **No new call requested beyond capturing the approval.**
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 255)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No Vapi Test used.
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
- No retry of any prior consumed approval.
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 9f60fed`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `9f60fed` before edits.

## Next recommended step

**Rerun the Build 255 guard immediately before the single approved true PSTN validation dial**
(`bash scripts/run-vapi-true-pstn-validation-dial-guard-build-255-dry-run.sh`), confirm it passes, then
**dial exactly once from Jason's own physical phone / iPhone Phone app to the Vapi number assigned to Test
Roofing Assistant** — **no Vapi Test, no Vapi Talk** — **capturing sanitized evidence only** (confirm the
Vapi Calls record is `Type = Phone`), honoring every stop condition. One dial only; no retry without a
new, separate approval.

## Files added in Build 255

- `docs/VAPI_TRUE_PSTN_VALIDATION_DIAL_GUARD_BUILD_255.md` (this doc)
- `backend/scripts/verify-vapi-true-pstn-validation-dial-guard-build-255-readonly.js`
- `scripts/run-vapi-true-pstn-validation-dial-guard-build-255-dry-run.sh`
