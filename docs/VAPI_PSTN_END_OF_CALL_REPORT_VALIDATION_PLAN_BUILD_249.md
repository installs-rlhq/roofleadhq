# Vapi PSTN End-of-Call-Report Validation — Plan (Build 249)

Decision token: `VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_DOCUMENTATION_ONLY_NEW_APPROVAL_REQUIRED_ONE_ATTEMPT`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `3c97ddb` (Build 248 closeout), HEAD == origin/main.

## What this build is

Build 249 is a **repo-only, documentation-only plan**. It defines — but does **not** execute — the
future **PSTN end-of-call-report validation** that would exercise the full Vapi final-report write
path. It writes only a plan document, a read-only verifier, and a dry-run wrapper.

This build performs **no** runtime/external action of any kind. The PSTN validation it describes is a
**separate, future, approval-gated** step that is **not** carried out here.

Build 249 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, performs
**no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no** SMS, uses **no**
Twilio, contacts **no** homeowner or roofer, changes **no** Railway/Vapi config, publishes **no**
Vapi assistant, triggers **no** deploy, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = documentation_only`
- `plan_documentation_only = true`
- `validation_executed = false`
- `pstn_validation_plan_status = documented_not_executed`
- `runtime_action_performed_by_build_249 = false`

## Prerequisite validated states (already proven)

- **Build 248** (commit `3c97ddb`) — captured the sanitized **read-only Vapi dashboard inspection**:
  the Webhook Server URL is documented, the Bearer credential is explicitly assigned with
  Authentication Enabled, the Server Messages section was found, and `end-of-call-report` is a visible
  (enabled) `serverMessages` chip. Conclusion: the missing EOCR in the Build 246 CSV is **unlikely**
  caused by a visibly-disabled `serverMessages` config.
  - `build_248_prerequisite_status = validated`
  - `build_248_prerequisite_commit = 3c97ddb`
  - `build_248_inspection_doc = docs/VAPI_SERVER_MESSAGES_READONLY_INSPECTION_BUILD_248.md`
- **Build 246** (commit `563044c`) — captured the sanitized post-fix browser/webCall CSV evidence:
  observed webhook rows returned HTTP 200, no HTTP 400, `end_of_call_report_observed = false`,
  `full_final_report_processing_status = not_validated`.
  - `build_246_prerequisite_commit = 563044c`
  - `build_246_evidence_doc = docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md`

## Carried-forward outcomes (unchanged, preserved)

Build 249 preserves — does not alter — the established outcomes:

- `all_observed_responses_http_200 = true`  (Build 246 — browser/webCall webhook rows returned 200)
- `http_400_observed = false`  (Build 246)
- `end_of_call_report_appears_enabled = true`  (Build 248 — visible `serverMessages` chip)
- `end_of_call_report_observed = false`  (Build 246 — not observed in browser/webCall CSV)
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`

---

## 1. Why PSTN validation is the next meaningful validation

- **Browser/webCall webhook events reached the backend and returned HTTP 200.** Build 246 proved the
  delivery + auth + payload-shape path is healthy for observed rows (`all_observed_responses_http_200
  = true`, `http_400_observed = false`). Connectivity is not the gap.
- **`end-of-call-report` is enabled but was not observed in the browser/webCall CSV.** Build 248's
  read-only dashboard inspection showed `end-of-call-report` is a visible (enabled) `serverMessages`
  chip (`end_of_call_report_appears_enabled = true`), yet Build 246 recorded
  `end_of_call_report_observed = false`. A visibly-disabled config is ruled out as the likely cause.
- **The PSTN call path is the likely path to produce a full final report with phone-routing fields.**
  A browser/webCall session closed by the tester may never emit/deliver an end-of-call-report; a real
  **PSTN** call (carrying a phone destination and phone-routing fields) is the path that exercises
  Vapi's full final-report emission and the backend's `process_call_completed` write path.

- `pstn_is_next_meaningful_validation = true`
- `pstn_rationale = browser_webcall_200_but_eocr_enabled_and_unobserved__pstn_is_likely_full_final_report_path`

## 2. Preconditions before any future PSTN validation

Every item below is **mandatory** before any future PSTN attempt. None of them is satisfied by this
build; this build only documents them.

- **A separate, explicit approval is required** (the Build 245 approval is consumed; Build 249 grants
  none). `future_pstn_validation_requires_new_approval = true`.
- **One attempt only.** `pstn_validation_attempt_limit = 1` / `one_attempt_limit = true`.
- **Test Roofing Assistant (or an explicitly approved assistant) only** — no production assistant.
- **A Jason-owned / test phone number only** — no homeowner, no roofer, no third-party number.
- **No real homeowner or roofer traffic.**
- **No SMS** unless separately approved.
- **No production data export.**
- **No schema / auth / RLS change.**
- **No billing / CRM / public automation.**

- `precondition_separate_approval = required`
- `precondition_one_attempt_only = required`
- `precondition_approved_assistant_only = required`
- `precondition_jason_owned_test_number_only = required`
- `precondition_no_real_traffic = required`
- `precondition_no_sms_unless_separately_approved = required`
- `precondition_no_production_data_export = required`
- `precondition_no_schema_auth_rls_change = required`
- `precondition_no_billing_crm_public_automation = required`

## 3. Exact evidence to capture if later approved

If — and only if — a future, separate approval is granted, the executor must capture the following,
all **sanitized**:

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
- `evidence_field_vapi_webhooks_rows = required`
- `evidence_field_end_of_call_report_observed = required`
- `evidence_field_endpoint_url_path = required`
- `evidence_field_http_method_post = required`
- `evidence_field_http_status = required`
- `evidence_field_sanitized_response_body_summary = required`
- `evidence_field_backend_receipt_status = required`
- `evidence_field_full_payload_processing_succeeded = required`
- `evidence_field_lead_or_booking_write_or_blocked = required`
- `evidence_field_no_raw_call_ids_phones_tokens_secrets_pii = required`

## 4. Risks and stop conditions

The future attempt must **stop** (no retry without a new approval) on any of:

- **Stop after one attempt** — regardless of outcome.
- **Stop on any non-200 unexpected status.**
- **Stop if SMS / Twilio / real traffic is triggered unexpectedly.**
- **Stop if the Vapi webhook does not show `end-of-call-report`.**
- **No retry without a new, separate approval.**

- `stop_conditions_documented = true`
- `stop_after_one_attempt = true`
- `stop_on_non_200_unexpected = true`
- `stop_on_unexpected_sms_twilio_real_traffic = true`
- `stop_if_eocr_not_shown = true`
- `no_retry_without_new_approval = true`

## 5. Decision tree after future validation

- **If `end-of-call-report` returns HTTP 200 and the expected no-op / write behavior is observed** →
  capture the closeout (full final-report path validated).
- **If `end-of-call-report` is missing** → diagnose Vapi PSTN delivery / config (delivery nuance,
  delayed report, routing).
- **If HTTP 400 / 500** → diagnose backend payload processing.
- **If HTTP 401** → diagnose credential mismatch (Bearer token).
- **If SMS / real-traffic risk appears** → stop and disable the path.

- `decision_tree_documented = true`
- `decision_200_expected_behavior = capture_closeout`
- `decision_eocr_missing = diagnose_vapi_pstn_delivery_or_config`
- `decision_400_or_500 = diagnose_backend_payload_processing`
- `decision_401 = diagnose_credential_mismatch`
- `decision_sms_or_real_traffic_risk = stop_and_disable_path`

---

## Status fields (machine-checkable)

- `build_mode = documentation_only`
- `plan_documentation_only = true`
- `validation_executed = false`
- `pstn_validation_plan_status = documented_not_executed`
- `runtime_action_performed_by_build_249 = false`
- `build_248_prerequisite_commit = 3c97ddb`
- `build_248_prerequisite_status = validated`
- `build_246_prerequisite_commit = 563044c`
- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `end_of_call_report_appears_enabled = true`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`
- `pstn_is_next_meaningful_validation = true`
- `future_pstn_validation_requires_new_approval = true`
- `one_attempt_limit = true`
- `pstn_validation_attempt_limit = 1`
- `evidence_capture_fields_documented = true`
- `stop_conditions_documented = true`
- `decision_tree_documented = true`
- `further_vapi_originated_action_authorized = false`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No validation executed.** Documentation-only plan.
- **No runtime/external action of any kind by Build 249.**
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

## Safety invariants (held by Build 249)

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
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 3c97ddb`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `3c97ddb` before edits.

## Next recommended step

**Obtain a new, separate, explicit approval for a single PSTN end-of-call-report validation attempt**
using the Test Roofing Assistant (or an approved assistant) and a Jason-owned / test number, then
execute exactly this plan (one attempt, capture the sanitized evidence fields, honor the stop
conditions and decision tree). Until that approval exists, make **no** call, **no** Vapi Talk, **no**
publish, and **no** config change.

## Files added in Build 249

- `docs/VAPI_PSTN_END_OF_CALL_REPORT_VALIDATION_PLAN_BUILD_249.md` (this doc)
- `backend/scripts/verify-vapi-pstn-end-of-call-report-validation-plan-build-249-readonly.js`
- `scripts/run-vapi-pstn-end-of-call-report-validation-plan-build-249-dry-run.sh`
