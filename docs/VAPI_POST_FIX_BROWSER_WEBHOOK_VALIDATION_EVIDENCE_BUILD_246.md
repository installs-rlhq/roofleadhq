# Post-Fix Vapi Browser/webCall Webhook Validation — Sanitized CSV Evidence (Build 246)

Decision token: `POST_FIX_VAPI_BROWSER_WEBHOOK_DELIVERY_OBSERVED_200_NO_400_END_OF_CALL_REPORT_NOT_OBSERVED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `cc3007c` (Build 245 closeout), HEAD == origin/main.

## What this build is

Build 246 is a **repo-only evidence-capture packet**. It records, in sanitized form, the outcome of
the **single** post-fix Vapi-originated synthetic **browser/webCall** validation that the Build 245
approval permitted and that was performed **exactly once** using the **Test Roofing Assistant only**.

The evidence source is an **uploaded, sanitized Vapi call-logs CSV** that was inspected off-repo. This
build only **transcribes the sanitized counts and outcomes** into a repo document and adds a read-only
verifier; it performs **no** runtime/external action of any kind.

Build 246 itself places **no** call, dials **no** phone number, clicks **no** Vapi Talk, runs **no**
`curl`, sends **no** SMS, uses **no** Twilio, contacts **no** homeowner or roofer, changes **no**
Railway/Vapi config, reads/prints **no** secret, and does **not** read
`/tmp/roofleadhq-vapi-webhook-secret-build237`.

## Prerequisite validated states (already proven)

- **Build 244** (commit `7342539`) — Vapi webhook **payload-shape fix** (repo-only, test-first):
  non-terminal events → HTTP 200 no-op; browser/webCall end-of-call-report with null PSTN phone
  fields → HTTP 200 no-op (no longer `400 missing_required_field`); unauth → HTTP 401.
  - `build_244_prerequisite_status = validated`
  - `build_244_prerequisite_commit = 7342539`
  - `build_244_fix_evidence_doc = docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md`
- **Build 245** (commit `cc3007c`) — captured the **explicit approval** for exactly one post-fix
  Vapi-originated synthetic browser/webCall validation (Test Roofing Assistant only, sanitized
  evidence only) and the fail-closed fresh pre-run guard.
  - `build_245_prerequisite_status = validated`
  - `build_245_prerequisite_commit = cc3007c`
  - `build_245_guard_doc = docs/VAPI_POST_FIX_VALIDATION_GUARD_BUILD_245.md`

## Build 245 guard re-run immediately before the action (passed)

The Build 245 fail-closed guard was re-run immediately before the approved action and **passed**,
holding every invariant:

- `build_245_guard_rerun_before_action = pass`
- `live_http_called = false`
- `phone_dialed = false`
- `vapi_talk_used = false`
- `curl_used = false`
- `call_placed = false`
- `live_sms_sent = false`
- `twilio_used = false`
- `deploy = false`
- `railway_var_set = false`
- `vapi_config_changed = false`
- `secret_file_read = false`
- `build_244_prerequisite_commit = 7342539`
- `approval_captured = true`
- `approval_count_limit = 1`
- `approved_assistant = Test Roofing Assistant only`
- `evidence_mode = sanitized evidence capture only`

## The approved action (performed exactly once)

- `post_fix_vapi_browser_webcall_action_performed = true`
- `approved_action_performed_count = 1`
- `approved_assistant = Test Roofing Assistant only`
- The action was a **browser-only Vapi Talk / webCall** validation.
- `no_phone_number_dialed = true` — no phone number was entered or dialed.
- `no_twilio_call = true` — no Twilio call was placed.
- `no_sms = true` — no SMS was sent.
- `no_real_homeowner_traffic = true` — no real homeowner traffic occurred.
- `no_real_roofer_traffic = true` — no real roofer traffic occurred.
- The approval is now **consumed**; the action must **not** be rerun.

## Uploaded sanitized CSV evidence (machine-checkable)

Evidence was read from an uploaded, sanitized Vapi call-logs CSV. No raw payloads, secrets, tokens,
call IDs, phone numbers, or PII were transcribed into this repo — only counts, message types, methods,
URLs (path), and HTTP status codes.

- `csv_filename = call-logs-2026-06-30T16-11-00-739Z.csv`
- `csv_total_rows = 293`
- `csv_columns = Time, Level, Category, Message, Raw Data`
- `csv_webhook_rows_observed = true`
- `csv_webhook_row_count = 54`
- `csv_request_initiated_rows = 18`
- `csv_response_successful_rows = 18`
- `csv_request_completed_rows = 18`

### Request shape observed on every webhook request row

- `request_url = https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
- `request_path = /webhooks/vapi/call-completed`
- `request_method = POST`
- `auth_headers_present = true`
- `auth_headers_redacted = true` (auth headers were present in the Vapi logs but redacted)

### Response counts by message type (each HTTP 200)

- `response_assistant_started_count = 1` (HTTP 200)
- `response_status_update_count = 2` (HTTP 200)
- `response_speech_update_count = 11` (HTTP 200)
- `response_conversation_update_count = 4` (HTTP 200)
- Sum of typed responses = `1 + 2 + 11 + 4 = 18` (matches `csv_response_successful_rows = 18`).

### Aggregate response/outcome status

- `all_observed_responses_http_200 = true`
- `http_400_observed = false`
- `post_fix_400_regression_status = not_observed`
- `completed_rows_success = true` (every completed webhook row showed `success=true`)

### End-of-call-report coverage (the important gap)

- `end_of_call_report_observed = false` — **no** end-of-call-report row was present in the uploaded CSV.
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`

## Status fields (machine-checkable)

- `post_fix_vapi_observed_webhook_delivery_status = pass_for_observed_events`
- `post_fix_400_regression_status = not_observed`
- `end_of_call_report_observed = false`
- `full_final_report_processing_status = not_validated`
- `real_call_test_status = not_started`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `runtime_action_performed_by_build_246 = false`
- `secret_value_recorded = false` / `value_redacted = true`

## Interpretation

- This is a **PASS for observed post-fix Vapi webhook delivery / no-op handling**. For every
  browser/webCall webhook event type present in the uploaded CSV (assistant.started, status-update,
  speech-update, conversation-update), the backend at `/webhooks/vapi/call-completed` returned
  **HTTP 200** and each completed row reported `success=true`.
- It shows the **Build 244 fix eliminated the prior observed 400 behavior** for the observed
  browser/webCall webhook event types: `http_400_observed = false`,
  `post_fix_400_regression_status = not_observed`.
- It is **NOT** a full end-of-call-report processing pass: `end_of_call_report_observed = false`, so
  `full_final_report_processing_status = not_validated`. No end-of-call-report row was present in this
  CSV.
- It is **NOT** a real call test: `real_call_test_status = not_started`.
- It is **NOT** a PSTN lead/booking processing validation.
- The Build 245 approval was **consumed**; `rerun_permitted_without_new_approval = false`. No further
  Vapi-originated or real-call action is permitted without a new, separate approval.

## What was NOT done in this build

- **No runtime/external action of any kind by Build 246.** This build only transcribes sanitized CSV
  evidence into the repo and adds a read-only verifier.
- **No Vapi Talk** clicked, no Vapi rerun (the approved action is already consumed).
- **No call** placed or received; **no phone number dialed**.
- **No `curl`** run against production; **no live HTTP**.
- **No SMS** sent; **no Twilio** used; no Twilio config change.
- **No homeowner or roofer contact** of any kind.
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. Only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No Railway / Vapi config change**; no deploy/redeploy/restart.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 246)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Evidence summary table

| Item | Value | Captured |
|---|---|---|
| Build 244 prerequisite | validated (webCall → 200 no-op, not 400; unauth → 401) | ✅ `7342539` |
| Build 245 prerequisite | approval + fresh guard, validated | ✅ `cc3007c` |
| Guard re-run before action | pass | ✅ |
| Approved action | one browser/webCall validation, Test Roofing Assistant only | ✅ performed once |
| CSV webhook rows observed | 54 (18 initiated / 18 response / 18 completed) | ✅ |
| Request URL / method | `/webhooks/vapi/call-completed` / POST | ✅ |
| Auth headers | present but redacted | ✅ |
| assistant.started | 1 response, HTTP 200 | ✅ |
| status-update | 2 responses, HTTP 200 | ✅ |
| speech-update | 11 responses, HTTP 200 | ✅ |
| conversation-update | 4 responses, HTTP 200 | ✅ |
| All observed responses | HTTP 200 | ✅ |
| HTTP 400 observed | none | ✅ not_observed |
| Completed rows | success=true | ✅ |
| End-of-call-report row | not present | ⛔ not observed |
| Full final-report processing | not_validated | ⛔ gated |
| Real call test | not_started | ⛔ later separate gate |

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at cc3007c`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `cc3007c`.

## Next recommended step

**Repo-only diagnose** why the end-of-call-report was **not** observed in the uploaded Vapi CSV
(`end_of_call_report_observed = false`) **before any further Vapi-originated or real-call action**.
Inspect the backend webhook-handling source and the Vapi assistant/webhook configuration semantics
(e.g. whether the browser/webCall session terminated before an end-of-call-report was emitted, or
whether the end-of-call-report message type is delivered to a different path) using
**repo-only source inspection first**. Make **no** further Vapi-originated action and **no** real-call
action **without a new, separate approval** — the Build 245 approval is consumed.

## Files added in Build 246

- `docs/VAPI_POST_FIX_BROWSER_WEBHOOK_VALIDATION_EVIDENCE_BUILD_246.md` (this doc)
- `backend/scripts/verify-vapi-post-fix-browser-webhook-validation-build-246-readonly.js`
- `scripts/run-vapi-post-fix-browser-webhook-validation-build-246-dry-run.sh`
