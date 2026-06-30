# Vapi Webhook Payload-Shape Fix — Repo-Only, Test-First (Build 244)

Decision token: `VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_MESSAGE_TYPE_ROUTING_AND_WEBCALL_REPO_ONLY`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `60db75f` (Build 243 closeout), HEAD == origin/main.

## What this build is

Build 244 is a **repo-only, test-first backend fix** for the Build 243 diagnosis: authenticated
Vapi-originated webhook payloads returned **HTTP 400** (`missing_required_field`) at
`/webhooks/vapi/call-completed`. It changes only local backend source, adds local fake fixtures, adds
an in-process behavioral verifier, and adds this doc. It performs **no** runtime action.

Build 244 itself performs **no** runtime/external action. **No** Vapi was run, **no** Talk was
clicked, **no** live webhook was called, **no** `curl` was run against production, **no** SMS was
sent, **no** Twilio was used, **no** homeowner or roofer was contacted, **no** Railway/Vapi config was
changed, **no** secret was read, and `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. The
fix and its verifier are fully offline; the verifier's no-op paths return before any Supabase client
is constructed.

## Root cause (carried from Build 243)

- Auth passes first (`requireVapiWebhookSecret` → 401 on missing/invalid secret). The observed Vapi
  response was **400, not 401**, so the request was authorized and reached the handler.
- The route returns **400** in exactly one place: when the service result is
  `error === 'missing_required_field'` (`backend/src/routes/vapi-webhooks.ts`).
- The required-field gate in `vapi-webhook.service.ts` required **all three** of `provider_call_id`,
  `caller_phone`, and `roofer_destination_number`.
- **Browser/webCall** events have no PSTN numbers, so `caller_phone` and `roofer_destination_number`
  normalize to **null** → `missing_required_field` → **400**.
- The handler did **not** branch on Vapi `message.type`. All server-message types (End Of Call
  Report, **Status Update**, **Conversation Update**, **Speech Update**) hit the same full-processing
  path and independently failed the same gate → 400 for every observed event type.

## The fix (files changed)

### `backend/src/services/vapi-webhook.service.ts`

- Added pure, exported, Supabase-free routing helpers:
  - `extractVapiEventType(payload)` — normalizes the Vapi event/message type
    (`message.type` / `payload.event` / `payload.type`, lowercased, spaces/underscores → hyphens).
  - `detectVapiCallTransport(payload, normalized)` — `'web' | 'phone' | 'unknown'` from `call.type`
    (`webCall` → web, `…PhoneCall` → phone), falling back to whether a PSTN destination exists.
  - `classifyVapiWebhookEvent(payload, normalized?)` — returns a routing decision:
    `process_call_completed` | `acknowledge_non_terminal` | `acknowledge_web_call`.
  - `TERMINAL_EVENT_TYPES` (`end-of-call-report`, plus the legacy `call.completed` / `call-completed`
    convention already used by repo fixtures) and `KNOWN_NON_TERMINAL_EVENT_TYPES`
    (`status-update`, `conversation-update`, `speech-update`).
- `processVapiCallCompleted` now classifies **before** the required-field gate and before any
  Supabase access:
  - **Known non-terminal** (and any unrecognized non-terminal) event → returns
    `{ ok: true, acknowledged: true, processed: false }` (HTTP 200 no-op). No lead/booking.
  - **Browser/webCall** final report with **no** PSTN roofer destination → returns
    `{ ok: true, acknowledged: true, processed: false, web_call: true }` (HTTP 200 no-op). No
    lead/booking; it does **not** hit the required-field gate, so **no 400**.
  - **Terminal report with a PSTN roofer destination** → enters the **existing** full processing
    path. The phone-keyed required-field gate is unchanged, so real PSTN phone-lead behavior (e.g. a
    PSTN report missing `caller_phone` still returns 400) is preserved.
- Extended the result type with optional `acknowledged` / `processed` / `web_call` / `event_type` /
  `reason` fields.

A null/absent event type is treated as terminal-eligible so legacy/typeless payloads keep their prior
behavior. Only **explicitly known** interim types (and clearly non-terminal named types) are no-op'd;
this avoids silently dropping a genuine final report delivered under an unexpected type name.

### `backend/src/routes/vapi-webhooks.ts`

- **Unchanged.** No-op acknowledgements are `ok: true`, which the route already returns as **HTTP
  200**. The fail-closed 401 auth guard still runs before the handler.

### Fixtures added (`docs/samples/`, all fake/sanitized, reserved 555-01xx numbers, no PII)

- `vapi-event-end-of-call-report.fake.json` — PSTN End Of Call Report (all required fields present).
- `vapi-event-status-update.fake.json` — interim Status Update.
- `vapi-event-conversation-update.fake.json` — interim Conversation Update.
- `vapi-event-speech-update.fake.json` — interim Speech Update.
- `vapi-event-webcall-end-of-call-report.fake.json` — browser/webCall End Of Call Report with null
  caller/destination.

### Verifier + dry-run added

- `backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js` — compiles the backend and
  drives the compiled service/auth in-process against the fixtures (offline).
- `scripts/run-vapi-webhook-payload-shape-fix-build-244-dry-run.sh` — wraps the verifier, the backend
  build, the safe-readiness fast lane, and the B243→B237 read-only regression chain + Vapi smoke.

## Behavior before / after

| Scenario | Before (Build 243) | After (Build 244) |
|---|---|---|
| Missing/invalid webhook secret | 401 (fail closed) | 401 (fail closed) — unchanged |
| Status / Conversation / Speech Update | 400 `missing_required_field` | **200** no-op (`acknowledged`, `processed:false`) |
| Browser/webCall End Of Call Report (null phones) | 400 `missing_required_field` | **200** no-op (`web_call:true`), no lead/booking |
| PSTN End Of Call Report with required fields | full processing | full processing — unchanged |
| PSTN report missing `caller_phone` | 400 `missing_required_field` | 400 `missing_required_field` — unchanged |
| Legacy `event: call.completed` fixtures | full processing | full processing — unchanged (backward compatible) |

## Test / verifier results (machine-checkable)

- `auth_fail_closed = true` (missing config / missing header / bad secret rejected; match authorized)
- `non_terminal_noop = true` (status/conversation/speech update → ok 200 no-op, no lead/booking)
- `webcall_noop_not_400 = true` (webCall eocr → ok 200 no-op, `web_call:true`, not 400)
- `pstn_enters_full_path = true` (PSTN eocr → `process_call_completed`, all required fields present)
- `legacy_call_completed_backward_compatible = true`
- `lead_or_booking_created_for_noop = false`
- `required_field_gate_preserved = true`
- `code_fix_performed_by_build_244 = true`
- `runtime_action_performed_by_build_244 = false`
- `secret_value_recorded = false` / `value_redacted = true`

## Remaining limitation

This is a **repo-only** compatibility fix validated by **offline** unit/in-process tests. Full
production payload processing of a real Vapi-originated end-of-call-report (the actual write path
through Supabase: roofer lookup, lead match/create, call insert, booking) is **`not_yet_validated`**
and still needs a **separate runtime validation after this fix and a new, separate approval**. The
Build 239 approval was consumed; **no** further Vapi-originated or real-call action is authorized by
this build.

## What was NOT done in this build

- **No Vapi Talk** clicked or used; **no Vapi rerun**; **no call** placed, received, or routed.
- **No live webhook call**; **no `curl`** against production; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio** used; **no Twilio config change**.
- **No homeowner or roofer contact**; **no phone number dialed**.
- **No Railway / Vapi config change**; **no deploy / redeploy / restart**.
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No schema / auth / RLS / billing / CRM / public-automation change.**

## Safety invariants (held by Build 244)

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
- No full Vapi payload processing pass executed against production.
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

## Exact next recommended step

Create a **new approval/guard packet for one post-fix Vapi-originated validation** (a single
authorized end-of-call-report delivery to confirm the full Supabase write path), with **no real call
yet**. The first real call remains a later, separately-approved gate.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean before edits
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 60db75f`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean
before edits, and HEAD == origin/main at `60db75f`.

## Files added/changed in Build 244

- `backend/src/services/vapi-webhook.service.ts` (changed — message-type routing + webCall handling)
- `docs/samples/vapi-event-end-of-call-report.fake.json` (added)
- `docs/samples/vapi-event-status-update.fake.json` (added)
- `docs/samples/vapi-event-conversation-update.fake.json` (added)
- `docs/samples/vapi-event-speech-update.fake.json` (added)
- `docs/samples/vapi-event-webcall-end-of-call-report.fake.json` (added)
- `backend/scripts/verify-vapi-webhook-payload-shape-fix-build-244.js` (added)
- `scripts/run-vapi-webhook-payload-shape-fix-build-244-dry-run.sh` (added)
- `docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md` (this doc)
