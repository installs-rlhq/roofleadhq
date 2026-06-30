# Vapi Webhook Payload-Shape Diagnosis — Repo-Only (Build 243)

Decision token: `VAPI_WEBHOOK_PAYLOAD_SHAPE_DIAGNOSIS_MISSING_REQUIRED_FIELD_REPO_ONLY`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `b6fafe4` (Build 242 closeout), HEAD == origin/main.

## What this build is

Build 243 is a **repo-only, read-only diagnosis** of why authenticated Vapi-originated webhook event
payloads returned **HTTP 400** at `/webhooks/vapi/call-completed` (observed and confirmed in Build
242). It inspects **only repo source files, tests, and docs** — it performs **no** runtime action.

Build 243 itself performs **no** runtime/external action. **No** Vapi was run, **no** Talk was
clicked, **no** live webhook was called, **no** `curl` was run against production, **no** SMS was
sent, **no** Twilio was used, **no** homeowner or roofer was contacted, **no** Railway/Vapi config was
changed, **no** secret was read, and `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. This
build is **diagnosis-only**.

## Prerequisite (Build 242, confirmed)

- **Build 242** (commit `b6fafe4`) confirmed Vapi-originated webhook delivery reached
  `/webhooks/vapi/call-completed` via `POST`, returning **HTTP 400** with body `{}`, across the
  observed Vapi event types **End Of Call Report**, **Status Update**, **Conversation Update**, and
  **Speech Update**.
- Build 242 interpretation carried forward: `backend_receipt_confirmed = true`,
  `auth_likely_passed = true` (400 not 401), `full_payload_processing_status = not_yet_validated`,
  `real_call_test_status = not_started`. The Build 239 approval was consumed; **no rerun is
  authorized**.

## Repo files inspected (read-only)

- `backend/src/routes/vapi-webhooks.ts` — the `POST /call-completed` route.
- `backend/src/middleware/vapi-webhook-auth.ts` — the fail-closed shared-secret guard.
- `backend/src/services/vapi-webhook.service.ts` — payload normalization, required-field validation,
  and the call/lead/booking write path.
- `backend/src/integrations/vapi.ts` — Vapi integration surface (no outbound call wiring; smoke-guarded).
- Existing Vapi tests/fixtures/verifiers — e.g. `backend/scripts/verify-vapi-phone-lead-smoke-readonly.js`,
  `backend/scripts/verify-vapi-missing-fields-readiness-gate-readonly.js`,
  `backend/scripts/test-vapi-dry-run-payloads.sh`, and the Vapi sample/discovery docs
  (`docs/VAPI_SAMPLE_PAYLOAD_MAPPING.md`, `docs/VAPI_POST_CALL_PAYLOAD_DISCOVERY.md`).
- `grep` over `backend/src` for `message.type` / `end-of-call` / `status-update` /
  `conversation-update` / `speech-update` returned **no matches** — there is no message-type
  discrimination anywhere in source.

## Where the HTTP 400 comes from (grounded in source)

- Auth runs first (`requireVapiWebhookSecret`). It returns **401** (`unauthorized`) on a missing/invalid
  secret — `backend/src/middleware/vapi-webhook-auth.ts:116-119`. Because the observed response was
  **400, not 401**, the request **passed auth** and reached the handler. This corroborates Build 242's
  `auth_likely_passed = true`.
- The route returns **HTTP 400** in exactly one place — when the service result carries
  `error === 'missing_required_field'` — `backend/src/routes/vapi-webhooks.ts:13-15`.
- That error is produced by the required-field gate in
  `backend/src/services/vapi-webhook.service.ts:518-529`:

  ```
  if (
    !normalized.provider_call_id ||
    !normalized.caller_phone ||
    !normalized.roofer_destination_number
  ) {
    return { ok: false, dry_run: false, error: 'missing_required_field', normalized };
  }
  ```

## Required fields currently causing `missing_required_field`

The gate requires **all three** of the following to be non-null after normalization
(`normalizeVapiCallCompletedPayload`, `backend/src/services/vapi-webhook.service.ts:145-344`):

1. `provider_call_id` — sourced from many id paths (`payload.call_id`, `call.id`, `message.call_id`, …).
2. `caller_phone` — `normalizePhone(...)` of caller-number paths
   (`customer.number` / `customer.phone` / `call.from` / `message.customer.number` …).
3. `roofer_destination_number` — `normalizePhone(...)` of destination-number paths
   (`phoneNumber.number` / `phoneNumber.phoneNumber` / `call.to` / `message.to` …).

## Which normalized fields are null on the observed synthetic / Vapi-originated browser path

The Build 241/242 action was a **browser Talk / webCall** (WebRTC), not a PSTN phone call:

- `caller_phone` → **null**. A browser webCall has **no PSTN caller number**, so
  `customer.number` / `customer.phone` / `call.from` are absent and `normalizePhone(...)` returns null.
- `roofer_destination_number` → **null**. A browser webCall **dials no destination/Twilio number**, so
  `phoneNumber.number` / `call.to` / `message.to` are absent and `normalizePhone(...)` returns null.
- `provider_call_id` → likely **present** (`call.id`), but the gate requires **all three**, so two
  null phone fields are sufficient to return `missing_required_field` → HTTP 400.

Compounding cause across the four observed event types: the handler does **not** discriminate by Vapi
`message.type`. Vapi delivers **all** server-message types to the same server URL, but
`/webhooks/vapi/call-completed` treats **every** event as a call-completion. The non-terminal events
(**Status Update**, **Conversation Update**, **Speech Update**) inherently do **not** carry
call-completion phone fields, so each independently fails the same required-field gate and returns
**HTTP 400** — which is exactly why all four observed event types returned 400, not just one.

## Likely cause of HTTP 400 body {}

- **Primary cause:** `missing_required_field` — for the browser/web path, `caller_phone` and
  `roofer_destination_number` normalize to **null** (no PSTN numbers exist on a WebRTC webCall),
  failing the all-three required-field gate.
- **Compounding cause:** no `message.type` routing, so interim Vapi event types (Status / Conversation
  / Speech Update) are also processed as call-completions and fail the same gate.
- **On the observed body `{}`:** the 400 code path actually returns
  `{ ok: false, dry_run: false, error: 'missing_required_field', normalized }`, not an empty object.
  The `{}` shown in the Vapi Webhooks log is therefore an **observability/display detail** (Vapi's
  captured/rendered body), **not** evidence of a distinct empty-body code path. The only source path
  that returns 400 is the `missing_required_field` branch above. This minor discrepancy is worth
  confirming when delivery observability is improved, but it does not change the diagnosis.

## Safest recommended Build 244 fix plan

Diagnosis indicates the fix is **not** tiny-and-test-covered today (no fixtures/tests exist for these
event types, and changing phone-keyed routing has product implications), so Build 243 performs **no**
code fix and recommends the following for Build 244 — additive, local, test-first:

1. **Add Vapi `message.type` routing** at the top of the handler/service: run full call-completion
   processing **only** for the terminal `end-of-call-report` event. For non-terminal types
   (`status-update`, `conversation-update`, `speech-update`, and any unrecognized type), return
   **HTTP 200** with an `ignored` / `acknowledged` body so Vapi stops treating them as failures and
   stops retrying. Purely local, additive — no schema/auth/RLS change.
2. **Handle the web / browser (no-PSTN-phone) call case explicitly:** for a browser webCall there is no
   caller/destination phone, so the current required-field set can never be satisfied. Choose one,
   behind tests:
   - treat web test calls as a distinct, non-roofer-routed path (skip the phone-keyed roofer lookup), or
   - relax the required-field gate for web-transport calls so they do not return 400.
3. **Add fixtures + unit tests** for each of the four event types plus a web-transport
   `end-of-call-report`, asserting: non-terminal types → 200 ack; web end-of-call → no
   `missing_required_field` 400. Wire them into the existing read-only verifier/dry-run pattern.
4. Keep all of this **repo-only and test-covered**; make **no** further Vapi-originated or real-call
   action without a **new, separate approval**.

## Status fields (machine-checkable)

- `build_242_prerequisite_status = validated`
- `build_242_prerequisite_commit = b6fafe4`
- `diagnosis_mode = repo_only_read_only`
- `vapi_originated_delivery_status = observed`
- `backend_receipt_confirmed = true`
- `auth_likely_passed = true`
- `http_400_source = missing_required_field`
- `required_field_provider_call_id = required`
- `required_field_caller_phone = required`
- `required_field_roofer_destination_number = required`
- `null_on_web_path_caller_phone = true`
- `null_on_web_path_roofer_destination_number = true`
- `message_type_routing_present = false`
- `likely_400_cause_documented = true`
- `recommended_build_244_fix_plan_present = true`
- `code_fix_performed_by_build_243 = false`
- `full_payload_processing_status = not_yet_validated`
- `real_call_test_status = not_started`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `runtime_action_performed_by_build_243 = false`
- `secret_value_recorded = false` / `value_redacted = true`

## What was NOT done in this build

- **No Vapi Talk** clicked or used; **no Vapi rerun**; **no call** placed, received, or routed.
- **No live webhook call**; **no `curl`** against production.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No homeowner or roofer contact** of any kind; **no phone number dialed**.
- **No Railway / Vapi config change**; **no deploy / redeploy / restart**.
- **No code fix applied** — diagnosis + Build 244 plan only.
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. Only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded.
- **No raw call IDs, phone numbers, tokens, API keys, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change**; **no production data export, billing, CRM, or
  public/live automation change**.

## Safety invariants (held by Build 243)

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
- No code fix applied by this build.
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

## Diagnosis summary table

| Item | Finding | Source |
|---|---|---|
| Auth result | passed (400 not 401) | `middleware/vapi-webhook-auth.ts:116-119` |
| 400 source | `missing_required_field` only | `routes/vapi-webhooks.ts:13-15` |
| Required-field gate | provider_call_id + caller_phone + roofer_destination_number | `services/vapi-webhook.service.ts:518-529` |
| Null on web path | caller_phone, roofer_destination_number | `services/vapi-webhook.service.ts:185-223` |
| Message-type routing | absent (all types treated as call-completed) | `grep` over `backend/src` → no matches |
| Observed body `{}` | display/observability detail; 400 path returns `{error, normalized}` | `routes/vapi-webhooks.ts:13-15` |
| Code fix in B243 | none — diagnosis + B244 plan only | this doc |
| Full payload processing | not_yet_validated | carried from B242 |
| Real call test | not_started | carried from B242 |

## Exact next recommended step (Build 244)

Implement the **Build 244 fix plan** above — **repo-only, test-first**: add Vapi `message.type` routing
so only `end-of-call-report` runs full processing while `status-update` / `conversation-update` /
`speech-update` are acknowledged with HTTP 200; handle the web/browser (no-PSTN-phone) call case so it
does not fail the phone-keyed required-field gate; and add fixtures + unit tests for all four event
types plus a web `end-of-call-report`. Make **no** further Vapi-originated or real-call action
**without a new, separate approval**. A first real call remains a later, separately-approved gate.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at b6fafe4`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `b6fafe4`.

## Files added in Build 243

- `docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_DIAGNOSIS_BUILD_243.md` (this doc)
- `backend/scripts/verify-vapi-webhook-payload-shape-diagnosis-build-243-readonly.js`
- `scripts/run-vapi-webhook-payload-shape-diagnosis-build-243-dry-run.sh`
