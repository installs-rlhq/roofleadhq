# Vapi PSTN End-of-Call-Report Validation — Approval Capture & Fail-Closed Guard (Build 250)

Decision token: `VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_APPROVAL_CAPTURED_FAIL_CLOSED_GUARD_ONE_ATTEMPT_APPROVED_NOT_YET_EXECUTED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `3683853` (Build 249 closeout), HEAD == origin/main.

## What this build is

Build 250 **captures the explicit user approval** for exactly **one controlled PSTN
end-of-call-report validation attempt** and builds a **fresh, fail-closed guard packet** for that
single future attempt. It writes only this guard document, a read-only verifier, and a dry-run
wrapper.

Build 250 **does NOT perform the PSTN validation.** The approved attempt is a **separate, future**
step that is **not** carried out here. This build performs **no** runtime/external action of any
kind.

Build 250 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, performs
**no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no**
Twilio, contacts **no** homeowner or roofer, changes **no** Railway/Vapi config, publishes **no**
Vapi assistant, triggers **no** deploy, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = approval_capture_and_fail_closed_guard`
- `pstn_validation_action_performed_by_build_250 = false`
- `runtime_action_performed_by_build_250 = false`
- `pstn_validation_status = approved_not_yet_executed`

## Prerequisite validated state (already proven)

- **Build 249** (commit `3683853`) — defined the documentation-only **PSTN end-of-call-report
  validation plan**: preconditions, the exact sanitized evidence to capture, stop conditions, and the
  post-validation decision tree. It executed no runtime action and granted no approval; a future PSTN
  validation required a new, separate, explicit approval.
  - `build_249_prerequisite_status = validated`
  - `build_249_prerequisite_commit = 3683853`
  - `build_249_plan_doc = docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md`

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
- `real_call_test_status = approved_not_yet_executed`

---

## 1. Captured approval (verbatim)

The user granted the following approval. It is captured here **exactly**, verbatim, and is the sole
authorization the single future PSTN attempt may rely on:

> I approve one controlled PSTN end-of-call-report validation attempt for RoofLeadHQ Build 250 using the Test Roofing Assistant only and a Jason-owned/test number only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no SMS unless separately approved, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation. One attempt only; stop on any unexpected SMS, real traffic, 401, 400, 500, missing end-of-call-report, or unsafe behavior; no retry without new approval.

- `approval_captured_verbatim = true`
- `approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt`
- `approval_build_reference = build_250`

## 2. Approval boundaries (the guard the future attempt must satisfy)

The single approved future PSTN attempt is authorized **only** within every boundary below. Any
deviation voids the approval and requires a new, separate approval.

- **One controlled PSTN end-of-call-report validation attempt only.** `one_attempt_limit = true` /
  `pstn_validation_attempt_limit = 1`.
- **Test Roofing Assistant only** — no production assistant.
  `approved_assistant = test_roofing_assistant_only`.
- **A Jason-owned / test phone number only** — no homeowner, no roofer, no third-party number.
  `approved_number = jason_owned_or_test_number_only`.
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

The single approved future attempt must **stop immediately** (one attempt only; no retry without a
new, separate approval) on any of the following:

- **Any unexpected SMS.** `stop_on_unexpected_sms = true`.
- **Any real traffic** (real homeowner or roofer). `stop_on_real_traffic = true`.
- **HTTP 401.** `stop_on_http_401 = true`.
- **HTTP 400.** `stop_on_http_400 = true`.
- **HTTP 500.** `stop_on_http_500 = true`.
- **Missing end-of-call-report.** `stop_on_missing_end_of_call_report = true`.
- **Any unsafe behavior.** `stop_on_unsafe_behavior = true`.
- **Stop after the one attempt regardless of outcome.** `stop_after_one_attempt = true`.

- `stop_conditions_documented = true`

## 4. Exact sanitized evidence to capture (if/when the attempt is later executed)

When — and only when — the single approved attempt is executed under a fresh re-run of this guard,
the executor must capture the following, all **sanitized**:

- **Vapi Webhooks rows** for the attempt (sanitized listing).
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

- `build_mode = approval_capture_and_fail_closed_guard`
- `pstn_validation_action_performed_by_build_250 = false`
- `runtime_action_performed_by_build_250 = false`
- `pstn_validation_status = approved_not_yet_executed`
- `approval_captured_verbatim = true`
- `approval_scope = one_controlled_pstn_end_of_call_report_validation_attempt`
- `approved_assistant = test_roofing_assistant_only`
- `approved_number = jason_owned_or_test_number_only`
- `sanitized_evidence_capture_only = true`
- `one_attempt_limit = true`
- `pstn_validation_attempt_limit = 1`
- `no_retry_without_new_approval = true`
- `no_real_homeowner_traffic = true`
- `no_real_roofer_traffic = true`
- `no_sms_unless_separately_approved = true`
- `no_production_data_export = true`
- `no_schema_auth_rls_changes = true`
- `no_billing_crm_automation = true`
- `no_public_live_automation = true`
- `stop_conditions_documented = true`
- `evidence_capture_fields_documented = true`
- `build_249_prerequisite_commit = 3683853`
- `build_249_prerequisite_status = validated`
- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `end_of_call_report_appears_enabled = true`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = approved_not_yet_executed`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No PSTN validation executed.** Approval-capture and guard only.
- **No runtime/external action of any kind by Build 250.**
- **No Vapi Talk** clicked; **no browser/webCall**; **no call** placed or received; **no phone number
  dialed**.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy
  / restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the credential **value** was not viewed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 250)

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
- No unrelated Vapi configuration change (no Vapi change by this build at all).
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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 3683853`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `3683853` before edits.

## Next recommended step

**Rerun the Build 250 guard immediately before the single approved controlled PSTN validation
attempt** (`bash scripts/run-vapi-pstn-end-of-call-report-validation-guard-build-250-dry-run.sh`),
confirm it passes, then **perform exactly one attempt** using the Test Roofing Assistant and a
Jason-owned / test number, **capturing sanitized evidence only**, honoring every stop condition. One
attempt only; no retry without a new, separate approval.

## Files added in Build 250

- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_GUARD_BUILD_250.md` (this doc)
- `backend/scripts/verify-vapi-pstn-end-of-call-report-validation-guard-build-250-readonly.js`
- `scripts/run-vapi-pstn-end-of-call-report-validation-guard-build-250-dry-run.sh`
