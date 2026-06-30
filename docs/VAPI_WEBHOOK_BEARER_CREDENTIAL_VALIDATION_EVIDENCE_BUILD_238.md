# Vapi Webhook Bearer Credential Validation — Evidence Packet (Build 238)

Decision token: `VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATED_400_AUTH_BEARER_HEADER_PASS`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `48bb25d` (Build 237 closeout), HEAD == origin/main.

## What this build is

Build 238 captures two things:

1. The **Vapi assistant credential assignment** that was performed out-of-band after Build 237 — the
   Test Roofing Assistant's Webhook Server is now configured to send an `Authorization: Bearer
   <secret>` header using the explicitly-assigned credential.
2. A **direct backend Bearer-header auth validation**: a probe presenting the
   `Authorization: Bearer <final Build 237 secret>` header (the exact header format the Vapi
   credential is configured to send) → **HTTP 400 `missing_required_field`**. The request **passed
   authentication** via the `Authorization: Bearer` path and reached normal application payload
   validation, where a deliberately incomplete synthetic payload was rejected.

This validates the **exact header format** the Vapi credential will send. It is a **PASS for direct
Bearer-header auth validation**.

This is a **repo-only evidence packet**. It records a sanitized status code and a sanitized response
body from an authorized synthetic read-of-behavior probe. It is **NOT** a Vapi-originated webhook
test, **NOT** a full Vapi payload processing pass, and **NOT** a real call test.

## Build 237 predecessor summary (what was already proven)

Build 237 (commit `48bb25d`) proved the webhook auth **gate pair** against the live redeployed
runtime using the final 64-character Build 237 `VAPI_WEBHOOK_SECRET`:

- Unauthenticated POST (no secret header) → **HTTP 401 unauthorized** (traffic blocked).
- Authorized POST presenting the `x-vapi-webhook-secret` header → **HTTP 400 `missing_required_field`**
  (passed auth into normal payload validation).

Build 237 used the `x-vapi-webhook-secret` header form. Build 238 validates the **other** accepted
header form — `Authorization: Bearer <secret>` — which is the form the Vapi assistant credential is
configured to send.

## Vapi assistant credential assignment (out-of-band; redacted)

After Build 237 closed, the Vapi **Test Roofing Assistant** was updated and **published**:

- **Webhook Server URL** (unchanged):
  `https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
- **Authorization credential explicitly assigned**: `RoofLeadHQ Production Webhook Secret`
- **Authentication Type**: `Bearer Token`
- **Header Name**: `Authorization`
- **Include Bearer Prefix**: `ON`
- **Assistant published**: yes

This means on its real callbacks the assistant will present
`Authorization: Bearer <RoofLeadHQ Production Webhook Secret>`. No Railway variable was set by this
build, no deploy/restart was triggered by this build, and no Twilio config was changed by this build.
The secret value was never requested, typed, printed, or committed by this build. The local final
secret source file (`/tmp/roofleadhq-vapi-webhook-secret-build237`) was **not read** by this build
and is **not** committed.

## Sanitized Bearer-header evidence

### Evidence field 1 — Vapi credential configuration (machine-checkable)

- `vapi_credential_assigned = true` (`RoofLeadHQ Production Webhook Secret`)
- `vapi_credential_type = Bearer Token`
- `vapi_header_name = Authorization`
- `vapi_include_bearer_prefix = ON`
- `vapi_assistant_published = true`

### Evidence field 2 — direct Bearer-header auth probe result

`AUTH_BEARER_HTTP_STATUS=400`

`POST https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed` with the
`Authorization: Bearer <final Build 237 secret>` header and an incomplete synthetic body →
**HTTP 400 `missing_required_field`**. The request **passed authentication** (it did not 401, did not
503) via the `Authorization: Bearer` path and reached normal application payload validation, which
rejected the incomplete payload. This proves the Bearer-presented secret **matched** Railway's
`VAPI_WEBHOOK_SECRET`.

### Evidence field 3 — authorized response body (sanitized)

```json
{"ok":false,"dry_run":false,"error":"missing_required_field","normalized":{"provider_call_id":"synthetic-redacted-build-238-bearer-header","caller_phone":null,"roofer_destination_number":null,"call_started_at":null,"call_ended_at":null,"duration_seconds":null,"transcript":null,"summary":null,"outcome":null,"appointment_booked":false,"appointment_requested":false,"recording_url":null,"appointment_time":null}}
```

This body is grounded in the real source: `processVapiCallCompleted` returns
`{ ok: false, dry_run: false, error: 'missing_required_field', normalized }` whenever the normalized
payload lacks `provider_call_id`, `caller_phone`, **or** `roofer_destination_number` (see
`backend/src/services/vapi-webhook.service.ts`), and `routes/vapi-webhooks.ts` maps that error to
**HTTP 400**. The Bearer path itself is grounded in `backend/src/middleware/vapi-webhook-auth.ts`:
`extractProvidedSecret` matches `Authorization: Bearer <token>` (the `BEARER_PREFIX` regex) with
precedence over `x-vapi-webhook-secret`. The synthetic payload supplied only a redacted
`provider_call_id` (`synthetic-redacted-build-238-bearer-header`) and **no** `caller_phone` and
**no** `roofer_destination_number` — both `null` — so the 400 is exactly the expected
fail-on-incomplete-payload result for an authenticated request. No real phone number, no PII, and no
secret appear in the body.

## Interpretation

- **This is a PASS for direct Bearer-header auth validation.**
- **400 `missing_required_field` on the `Authorization: Bearer` request** proves the Bearer-presented
  secret matched Railway's `VAPI_WEBHOOK_SECRET` and the request passed authentication into normal
  application payload validation.
- **This validates the exact header format the Vapi credential is configured to send**
  (`Authorization: Bearer <secret>`, header name `Authorization`, Include Bearer Prefix ON).
- It is **NOT** a Vapi-originated webhook test yet (`vapi_originated_webhook_status = not_started`).
  The probe was sent directly, not by Vapi.
- It is **NOT** a full Vapi payload processing pass (`full_payload_processing_status = not_started`).
  A complete payload with a known TEST roofer's `roofer_destination_number` has not been processed
  end-to-end.
- It is **NOT** a real call test (`real_call_test_status = not_started`).
- **No** real call, SMS, homeowner contact, roofer contact, production data export, schema/auth/RLS
  change, billing/CRM/public automation, or external live automation occurred.

## Status fields (machine-checkable)

- `vapi_credential_assigned = true`
- `vapi_credential_type = Bearer Token`
- `vapi_header_name = Authorization`
- `vapi_include_bearer_prefix = ON`
- `vapi_assistant_published = true`
- `auth_bearer_http_status = 400`
- `authorized_error = missing_required_field`
- `bearer_header_auth_status = pass`
- `vapi_originated_webhook_status = not_started`
- `full_payload_processing_status = not_started`
- `real_call_test_status = not_started`
- `normalized_provider_call_id = synthetic-redacted-build-238-bearer-header`
- `normalized_caller_phone = null`
- `normalized_roofer_destination_number = null`
- `secret_value_recorded = false` / `value_redacted = true`

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 48bb25d`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `48bb25d`.

## What was NOT done in this build

- **No Vapi-originated webhook test.** The probe was sent directly to the endpoint, not by the Vapi
  assistant. (gated — next step)
- **No full Vapi payload processing pass.** Only the incomplete-payload authorized Bearer probe (400)
  was run; a complete payload for a known TEST roofer has not been processed.
- **No real call test.** No real call was placed, received, or routed.
- **No SMS** was sent.
- **No real roofer or homeowner contact** of any kind.
- **No secret value** was read, typed, printed, or committed; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read. Only the markers `value_redacted=true` / `secret_value_recorded=false` are recorded.
- **No phone numbers or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No Railway variable set, no deploy/redeploy/restart** triggered by this build.
- **No Twilio config change** by this build. (The Vapi credential assignment was performed
  out-of-band; this build performed none.)

## Bearer-header sanitized evidence summary

| Phase | Request | Auth header | Expected | Actual | Captured |
|---|---|---|---|---|---|
| Direct Bearer auth | `POST /webhooks/vapi/call-completed` | `Authorization: Bearer` (final B237 secret) | past-auth (400/404/200) | **HTTP 400 missing_required_field** ✅ | ✅ live — admitted past gate |
| Vapi-originated webhook (gated) | real Vapi callback w/ assistant credential | `Authorization: Bearer` (Vapi-sent) | controlled validation | **not executed** | ⛔ gated; next step |
| Full payload (gated) | authorized `POST` w/ complete payload, known TEST roofer | 200/404 processing | **not executed** | ⛔ gated; not fabricated |
| Real call (gated) | real Vapi-originated call | n/a | **not executed** | ⛔ later separate gate |

The captured row is real, captured live. The gated rows are expectations, not results, and are
explicitly not captured.

## Safety invariants (held by Build 238)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No SMS sent.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (the credential assignment was out-of-band; no Vapi change
  by this build at all).
- No Vapi-originated webhook test executed.
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

## What was actually executed vs. not executed

**Executed (live, read-only behavior probe / from authorized terminal):**
- Source-of-truth preflight + `scripts/verify-source-of-truth.sh` → PASS at `48bb25d`.
- Direct `POST /webhooks/vapi/call-completed` (`Authorization: Bearer` = final B237 secret,
  incomplete synthetic body) → **HTTP 400 `missing_required_field`**. Sanitized: status code +
  sanitized body (redacted synthetic `provider_call_id`, all phone fields null).

**NOT executed (gated / out-of-band):**
- Any Vapi-originated webhook callback. (gated — next step)
- Authorized POST with a **complete** payload for a known TEST roofer (expected 200/404). (gated; not
  fabricated)
- Any real Vapi-originated call. (later separate gate)
- Any Railway variable set / redeploy / restart. (none by this build)
- The Vapi credential assignment itself. (performed out-of-band; this build performed none)

## Exact next gated step

The next gated step requires **separate approval** before any Vapi-originated traffic:

1. **Only after separate approval**, run a **Vapi-originated synthetic / controlled webhook
   validation** — a controlled Vapi test event or controlled call that drives a webhook callback from
   the assistant (now configured to send `Authorization: Bearer`) through the endpoint for a known
   TEST roofer — and capture only the **sanitized** result (status code + sanitized row summary of
   ids/booleans). Record `configured=true / value_redacted=true`. Never the secret, never real PII,
   never tokens/SIDs/call-ids/API-keys.

**Do not** repoint the production Twilio number's voice config, **do not** accept real homeowner Vapi
call traffic, **do not** place or route a real call, **do not** send SMS, and **do not** contact any
real roofer or homeowner. A first real call is a later, separately-approved gate.

## Files added in Build 238

- `docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md` (this doc)
- `backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js`
- `scripts/run-vapi-webhook-bearer-credential-validation-build-238-dry-run.sh`
