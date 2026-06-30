# Vapi-Originated Webhook Delivery — Corrected Evidence (Build 242)

Decision token: `VAPI_ORIGINATED_WEBHOOK_DELIVERY_OBSERVED_RECEIPT_CONFIRMED_400`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `5f70e03` (Build 241 closeout), HEAD == origin/main.

## What this build is

Build 242 is a **repo-only correction/evidence packet**. It corrects the Build 241 outcome
(`ambiguous / not_confirmed`) using a **later, deeper Vapi Observe → Logs → Webhooks inspection** that
surfaced the webhook-delivery evidence the first exported call logs and first Railway log review had
missed. It does **one** thing and **only** this one thing:

1. Records — as sanitized, repo-only evidence — that the single, already-performed (Build 241)
   Vapi-originated browser test **did** deliver webhooks to the backend, that **backend receipt is
   confirmed** at the intended `/webhooks/vapi/call-completed` endpoint, and that each visible row
   returned **HTTP 400** (auth-passed, application/payload validation failure).

Build 242 itself performs **no** runtime action. **No** Vapi was rerun, **no** Talk was clicked, **no**
new call was placed, **no** `curl` was run against the live webhook, **no** SMS was sent, **no** Twilio
was used, **no** homeowner or roofer was contacted, **no** secret was read or printed, and
`/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. This build is
**documentation/correction-only**.

## Correction of Build 241

- **Build 241** (commit `5f70e03`) recorded the one Vapi-originated browser webCall as
  **`ambiguous / not_confirmed`** because the **first** exported Vapi call logs and the **first**
  Railway log review did not show a confirmed backend receipt (no server/webhook/call-completed row was
  visible; only container restart/startup lines appeared in Railway around the test window; the webhook
  HTTP status was not observed).
- **After Build 241**, an additional **Vapi Observe → Logs → Webhooks** inspection found the missing
  webhook evidence. Build 242 corrects the Build 241 conclusion: **Vapi-originated webhook delivery was
  observed after all**, and **backend receipt is confirmed**.
- `build_241_recorded_result = ambiguous_not_confirmed`
- `build_242_correction = vapi_originated_webhook_delivery_observed`

## Corrected evidence discovered after Build 241 (sanitized)

From the Vapi **Observe → Logs → Webhooks** view at the browser-test time:

- The Vapi Webhooks log showed **multiple POST webhook rows** at the browser-test time.
- Observed webhook types included:
  - **End Of Call Report**
  - **Status Update**
  - **Conversation Update**
  - **Speech Update**
- Each visible row showed response **HTTP code 400**.
- The top **End Of Call Report** detail showed:
  - URL: `https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
  - Path: `/webhooks/vapi/call-completed`
  - Method: `POST`
  - Code: `400`
  - Body: `{}`
- **No** raw call ID, phone number, secret, token, API key, or PII was recorded in this corrected
  evidence.

## Status fields (machine-checkable)

- `build_237_prerequisite_status = validated`
- `build_238_prerequisite_status = validated`
- `build_239_prerequisite_status = validated`
- `build_240_prerequisite_status = validated`
- `build_241_prerequisite_status = validated`
- `build_241_prerequisite_commit = 5f70e03`
- `build_241_recorded_result = ambiguous_not_confirmed`
- `build_242_correction = vapi_originated_webhook_delivery_observed`
- `vapi_originated_webhook_rows_observed = true`
- `webhook_type_end_of_call_report = observed`
- `webhook_type_status_update = observed`
- `webhook_type_conversation_update = observed`
- `webhook_type_speech_update = observed`
- `request_url = https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
- `request_path = /webhooks/vapi/call-completed`
- `request_method = POST`
- `response_code = 400`
- `response_body = {}`
- `backend_receipt_confirmed = true`
- `auth_likely_passed = true` (400 rather than 401)
- `vapi_originated_delivery_status = observed`
- `full_payload_processing_status = not_yet_validated`
- `real_call_test_status = not_started`
- `approval_count_limit = 1`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `runtime_action_performed_by_build_242 = false`
- `secret_value_recorded = false` / `value_redacted = true`

## Prerequisite validated/approved states (already proven)

- **Build 237** (commit `48bb25d`) — webhook auth gate-pair PASS: unauthenticated POST → HTTP 401;
  authorized `x-vapi-webhook-secret` POST → HTTP 400 `missing_required_field`.
- **Build 238** (commit `077716e`) — Vapi Bearer credential direct validation PASS: `Authorization:
  Bearer <secret>` POST → HTTP 400 `missing_required_field`.
- **Build 239** (commit `a17d6f9`) — explicit user approval captured for exactly **one**
  Vapi-originated synthetic/controlled webhook validation (Test Roofing Assistant only, sanitized
  evidence only). Build 239 did not execute the validation.
- **Build 240** (commit `9b5f8ff`) — fresh pre-run guard PASS for that single approved validation.
- **Build 241** (commit `5f70e03`) — captured the one Vapi-originated browser webCall, initially
  recorded as **ambiguous / not_confirmed** because the first log review did not confirm backend
  receipt. Approval consumed.

## Interpretation

- **Corrects Build 241:** the Vapi-originated webhook delivery **was observed** after all.
- **Backend receipt is confirmed** at the intended `/webhooks/vapi/call-completed` endpoint
  (`POST` → `400`, body `{}`).
- Because the backend returns **HTTP 401** for missing/wrong webhook auth, and this Vapi-originated
  request returned **HTTP 400**, **auth likely passed** and the failure was
  **application/payload validation or payload-shape mismatch**, not an auth rejection.
- This is still **NOT** a full payload processing pass. `full_payload_processing_status =
  not_yet_validated`.
- `real_call_test_status` remains **not_started** — a first real call is a later, separately-approved
  gate.
- The one Build 239 approval remains **consumed**; **no rerun** is permitted without a new, separate
  approval.
- **No** real call, SMS, Twilio call, homeowner contact, roofer contact, production data export,
  schema/auth/RLS change, billing/CRM/public automation, or live automation occurred.

## What was NOT done in this build

- **No Vapi rerun.** No Vapi Talk clicked, no new browser webCall, no call placed, received, or routed.
- **No `curl`** run against the live webhook.
- **No SMS** sent.
- **No Twilio** used; no Twilio config change.
- **No homeowner or roofer contact** of any kind.
- **No phone number dialed.**
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. Only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded.
- **No raw call IDs, phone numbers, tokens, API keys, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data export, billing, CRM, or public/live automation change.**
- **No Railway variable set, no deploy/redeploy/restart** triggered by this build.

## Safety invariants (held by Build 242)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
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
  `secret_value_recorded=false` markers are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Corrected evidence summary table

| Item | Value | Captured |
|---|---|---|
| Build 237 prerequisite | validated (401 unauth / 400 authorized) | ✅ `48bb25d` |
| Build 238 prerequisite | validated (Bearer credential + 400 authorized) | ✅ `077716e` |
| Build 239 prerequisite | approval captured (one validation, scoped) | ✅ `a17d6f9` |
| Build 240 prerequisite | fresh pre-run guard PASS | ✅ `9b5f8ff` |
| Build 241 prerequisite | ambiguous/not-confirmed recorded | ✅ `5f70e03` |
| Build 242 correction | Vapi-originated webhook delivery observed | ✅ |
| Vapi webhook rows observed | yes — multiple POST rows | ✅ |
| Webhook types | End Of Call Report, Status Update, Conversation Update, Speech Update | ✅ |
| Request URL | https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed | ✅ |
| Request path | /webhooks/vapi/call-completed | ✅ |
| Request method | POST | ✅ |
| Response code | 400 | ✅ |
| Response body | {} | ✅ |
| Backend receipt confirmed | true | ✅ |
| Auth likely passed (400 not 401) | true | ✅ |
| Vapi-originated delivery status | observed | ✅ |
| Full payload processing | not_yet_validated | ⛔ gated |
| Real call test | not_started | ⛔ later separate gate |
| Approval | consumed; no rerun without new approval | ✅ |

## Exact next recommended step

**Diagnose/fix the backend Vapi payload-shape handling for the Vapi webhook event types that return
HTTP 400** (End Of Call Report, Status Update, Conversation Update, Speech Update), using **repo-only
source inspection first** — read the backend `/webhooks/vapi/call-completed` handler and its payload
validation/normalization, compare the expected required fields against the actual Vapi event shapes,
and identify why authenticated requests fall into `missing_required_field` (HTTP 400) instead of a full
payload processing pass. Make **no** further Vapi-originated action **without a new, separate
approval**. A first real call remains a later, separately-approved gate.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 5f70e03`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `5f70e03`.

## Files added in Build 242

- `docs/VAPI_ORIGINATED_WEBHOOK_DELIVERY_CORRECTED_EVIDENCE_BUILD_242.md` (this doc)
- `backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js`
- `scripts/run-vapi-originated-webhook-delivery-corrected-evidence-build-242-dry-run.sh`
