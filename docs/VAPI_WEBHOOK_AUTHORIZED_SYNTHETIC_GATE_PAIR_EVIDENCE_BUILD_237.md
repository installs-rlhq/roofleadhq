# Vapi Webhook Authorized Synthetic Gate-Pair — Evidence Packet (Build 237)

Decision token: `VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_VALIDATED_401_UNAUTH_400_AUTH_PASS`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `c6b90e1` (Build 236 closeout), HEAD == origin/main.

## What this build is

Build 237 is the **authorized synthetic gate-pair validation** step for the guarded Vapi post-call
webhook. It records the sanitized outcome of a **gate pair** run against the live redeployed runtime:

1. An **unauthenticated** POST (no secret header) → **HTTP 401 unauthorized** — unauthenticated
   traffic is blocked.
2. An **authorized** POST presenting the `x-vapi-webhook-secret` header → **HTTP 400
   `missing_required_field`** — the request **passed authentication** and reached normal application
   payload validation, where a deliberately incomplete synthetic payload was rejected.

Together these two results are the **gate pair**: 401 proves the gate rejects callers without the
secret; 400 proves a caller **with** the matching secret is admitted past the gate into ordinary
request handling. That is a **PASS for webhook auth gate-pair validation**.

This is a **repo-only evidence packet**. It records sanitized status codes and a sanitized response
body from an authorized synthetic read-of-behavior probe. It is **not** a full Vapi payload
processing pass and **not** a real call test.

## Build 236 predecessor summary (what was already proven)

Build 236 (commit `c6b90e1`) proved the Railway production runtime serving
`roofleadhq-api-production` had `VAPI_WEBHOOK_SECRET` **loaded**, because the unauthenticated POST
transitioned from Build 235's HTTP 503 `webhook_auth_not_configured` to HTTP 401 `unauthorized`. The
503 → 401 transition meant the guard no longer reached its `missing_secret_config → 503` branch, so
`config.vapiWebhookSecret` was non-empty in the serving process. Build 236 explicitly did **not**
run the authorized synthetic POST — it named that as the next gated step. Build 237 is that step.

## Jason's operational action (out-of-band; redacted)

After Build 236 closed, and after secret-mismatch confusion, Jason performed the out-of-band setup:

- **Generated a fresh, final Build 237 64-character webhook secret locally.**
- **Set it in the Railway variable `VAPI_WEBHOOK_SECRET`** on the `roofleadhq-api` service (the one
  serving `roofleadhq-api-production.up.railway.app`), under the exact variable name.
- **Redeployed `roofleadhq-api`** so the process reloaded config (`config.vapiWebhookSecret` is read
  once at config load — see `backend/src/config/config.ts`).

No Railway variable was set by this build, no deploy/restart was triggered by this build, and no Vapi
or Twilio config was changed by this build. The secret value was never requested, typed, printed, or
committed by this build. The only properties this repo records about the secret are its **length**
(`64`) and that its value is **redacted/absent**. The local final secret source file
(`/tmp/roofleadhq-vapi-webhook-secret-build237`) was **not read** by this build and is **not**
committed.

## Sanitized gate-pair evidence

### Evidence field 1 — local final secret length

`FINAL_SECRET_LOCAL_LENGTH=64`

The final Build 237 secret generated locally is **64 characters**. No secret value is recorded —
only the length and a `value_redacted=true` marker.

### Evidence field 2 — unauthenticated POST result

`UNAUTH_HTTP_STATUS=401`

`POST https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed` with a synthetic
body and **no** secret header → **HTTP 401 unauthorized**. Unauthenticated traffic is rejected before
any service / Supabase write path (the guard returns before `next()`).

### Evidence field 3 — authorized POST result (x-vapi-webhook-secret)

`AUTH_X_HEADER_HTTP_STATUS=400`

The same endpoint with the `x-vapi-webhook-secret` header set to the final Build 237 secret, plus an
incomplete synthetic body → **HTTP 400 `missing_required_field`**. The request **passed
authentication** (it did not 401, did not 503) and reached normal application payload validation,
which rejected the incomplete payload. This proves the request secret **matched** Railway's
`VAPI_WEBHOOK_SECRET`.

### Evidence field 4 — authorized response body (sanitized)

```json
{"ok":false,"dry_run":false,"error":"missing_required_field","normalized":{"provider_call_id":"synthetic-redacted-build-237-final-auth","caller_phone":null,"roofer_destination_number":null,"call_started_at":null,"call_ended_at":null,"duration_seconds":null,"transcript":null,"summary":null,"outcome":null,"appointment_booked":false,"appointment_requested":false,"recording_url":null,"appointment_time":null}}
```

This body is grounded in the real source: `processVapiCallCompleted` returns
`{ ok: false, dry_run: false, error: 'missing_required_field', normalized }` whenever the normalized
payload lacks `provider_call_id`, `caller_phone`, **or** `roofer_destination_number` (see
`backend/src/services/vapi-webhook.service.ts`), and `routes/vapi-webhooks.ts` maps that error to
**HTTP 400**. The synthetic payload supplied only a redacted `provider_call_id`
(`synthetic-redacted-build-237-final-auth`) and **no** `caller_phone` and **no**
`roofer_destination_number` — both `null` — so the 400 is exactly the expected fail-on-incomplete-
payload result for an authenticated request. No real phone number, no PII, and no secret appear in
the body.

## Interpretation

- **This is a PASS for webhook auth gate-pair validation.**
- **401 on the unauthenticated request** proves unauthenticated traffic is blocked.
- **400 `missing_required_field` on the authorized request** proves the `x-vapi-webhook-secret` value
  matched Railway's `VAPI_WEBHOOK_SECRET` and the request passed authentication into normal
  application payload validation.
- It is **NOT** a full Vapi payload processing pass yet (`full_payload_processing_status =
  not_yet_validated`). A complete payload with a known TEST roofer's `roofer_destination_number` has
  not been processed end-to-end.
- It is **NOT** a real call test (`real_call_test_status = not_started`).
- **No** real call, SMS, homeowner contact, roofer contact, production data export, schema/auth/RLS
  change, billing/CRM/public automation, or external live automation occurred.

## Status fields (machine-checkable)

- `auth_gate_pair_status = pass`
- `full_payload_processing_status = not_yet_validated`
- `real_call_test_status = not_started`
- `final_secret_local_length = 64`
- `secret_value_recorded = false` / `value_redacted = true`
- `unauth_http_status = 401`
- `auth_x_header_http_status = 400`
- `authorized_error = missing_required_field`
- `normalized_provider_call_id = synthetic-redacted-build-237-final-auth`
- `normalized_caller_phone = null`
- `normalized_roofer_destination_number = null`

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at c6b90e1`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `c6b90e1`.

## What was NOT done in this build

- **No full Vapi payload processing pass.** Only the incomplete-payload authorized probe (400) was
  run; a complete payload for a known TEST roofer has not been processed.
- **No real call test.** No real call was placed, received, or routed.
- **No SMS** was sent.
- **No real roofer or homeowner contact** of any kind.
- **No secret value** was read, typed, printed, or committed; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read. Only the length (`64`) and `value_redacted=true` are recorded.
- **No phone numbers or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No Railway variable set, no deploy/redeploy/restart** triggered by this build.
- **No Vapi or Twilio config change** by this build.

## Gate-pair sanitized evidence summary

| Phase | Request | Secret header | Expected | Actual | Captured |
|---|---|---|---|---|---|
| Gate (unauth) | `POST /webhooks/vapi/call-completed` | none | 401 | **HTTP 401 unauthorized** ✅ | ✅ live — blocked |
| Gate (auth) | `POST /webhooks/vapi/call-completed` | `x-vapi-webhook-secret` (final B237 secret) | past-auth (400/404/200) | **HTTP 400 missing_required_field** ✅ | ✅ live — admitted past gate |
| Full payload (gated) | authorized `POST` w/ complete payload, known TEST roofer | 200/404 processing | **not executed** | ⛔ gated; not fabricated |
| Real call (gated) | real Vapi-originated call | n/a | **not executed** | ⛔ later separate gate |

The captured rows are real, captured live. The gated rows are expectations, not results, and are
explicitly not captured.

## Safety invariants (held by Build 237)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No SMS sent.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only the length `64` and
  `value_redacted=true` are recorded; `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## What was actually executed vs. not executed

**Executed (live, read-only behavior probe / from authorized terminal):**
- Source-of-truth preflight + `scripts/verify-source-of-truth.sh` → PASS at `c6b90e1`.
- Unauthenticated `POST /webhooks/vapi/call-completed` (synthetic body, no secret) → **HTTP 401
  unauthorized**. Sanitized: status code only.
- Authorized `POST /webhooks/vapi/call-completed` (`x-vapi-webhook-secret` = final B237 secret,
  incomplete synthetic body) → **HTTP 400 `missing_required_field`**. Sanitized: status code +
  sanitized body (redacted synthetic `provider_call_id`, all phone fields null).

**NOT executed (gated / out-of-band):**
- Authorized POST with a **complete** payload for a known TEST roofer (expected 200/404). (gated —
  next step; not fabricated)
- Any real Vapi-originated call. (later separate gate)
- Any Railway variable set / redeploy / restart. (Jason performed the secret set + redeploy
  out-of-band; this build performed none.)
- Any Vapi-side config change. (not done)

## Exact next gated step

The next gated step requires **separate approval** before any Vapi-originated traffic:

1. Update the **Vapi assistant Webhook Server Authorization credential** to the **same final Build 237
   secret** (so Vapi presents the matching `x-vapi-webhook-secret` header on its real callbacks).
2. **Only after separate approval**, run a **Vapi-originated synthetic / controlled webhook
   validation** — a controlled call or Vapi test event that drives a complete payload through the
   webhook for a known TEST roofer — and capture the sanitized result (status code + sanitized row
   summary of ids/booleans). Record `configured=true / value_redacted=true`. Never the secret, never
   real PII, never tokens/SIDs/call-ids/API-keys.

**Do not** repoint the production Twilio number's voice config, **do not** accept real homeowner Vapi
call traffic, **do not** place or route a real call, **do not** send SMS, and **do not** contact any
real roofer or homeowner. A first real call is a later, separately-approved gate.

## Files added in Build 237

- `docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md` (this doc)
- `backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js`
- `scripts/run-vapi-webhook-authorized-synthetic-gate-pair-build-237-dry-run.sh`
</content>
</invoke>
