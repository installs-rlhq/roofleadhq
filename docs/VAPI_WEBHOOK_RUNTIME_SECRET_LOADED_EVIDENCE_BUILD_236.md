# Vapi Webhook Runtime Secret Loaded — Evidence Packet (Build 236)

Decision token: `VAPI_WEBHOOK_RUNTIME_SECRET_LOADED_UNAUTH_SMOKE_NOW_401_FIXED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `09ecfab` (Build 235 closeout), HEAD == origin/main.

## What this build is

Build 236 is the **runtime-secret-loaded evidence** step for the guarded Vapi post-call webhook. It
records that the runtime blocker reported in Build 235 has been **fixed**: the unauthenticated Vapi
webhook smoke now **fails closed with HTTP 401 unauthorized** instead of the previous HTTP 503
`webhook_auth_not_configured`. That transition proves `VAPI_WEBHOOK_SECRET` is now loaded in the
Railway production runtime serving `roofleadhq-api-production`.

This is a **repo-only evidence packet**. It records the sanitized outcome of an out-of-band
operational fix and an unauthenticated read-of-behavior smoke. It performs no authorized synthetic
POST, no real call, no SMS, and no control-plane action.

## Build 235 blocker summary (what was wrong)

Build 235's post-enablement unauthenticated smoke returned **HTTP 503 `webhook_auth_not_configured`**
instead of the expected **HTTP 401 unauthorized**. The Build 232 guard returns
`503 webhook_auth_not_configured` **only** when `config.vapiWebhookSecret` is empty in the running
process (see `backend/src/middleware/vapi-webhook-auth.ts`, `evaluateVapiWebhookAuth` →
`'missing_secret_config'`). A live 503 therefore proved the process serving
`roofleadhq-api-production` had **no** `VAPI_WEBHOOK_SECRET` loaded at that time. Build 235 stopped and
recorded that BLOCKED runtime state honestly; no authorized POST result was fabricated.

## Jason's operational action (out-of-band; redacted)

After Build 235 closed, Jason performed the out-of-band runtime remediation:

- **Repasted / reset `VAPI_WEBHOOK_SECRET`** on the Railway `roofleadhq-api` **production** service
  (the one serving `roofleadhq-api-production.up.railway.app`), under the exact variable name.
- **Redeployed** the backend so the process reloaded config (`config.vapiWebhookSecret` is read once
  at config load — see `backend/src/config/config.ts`).

No Railway variable was set by this build, no deploy/restart was triggered by this build, and no Vapi
or Twilio config was changed by this build. The secret value was never requested, typed, printed, or
committed. The only status this repo will ever record about the secret is
`configured=true / value_redacted=true` — **never** the value.

## New unauthenticated smoke result (the fix, sanitized)

A fresh unauthenticated smoke against the redeployed runtime:

`POST https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed` with a synthetic
body and **no** secret header → **HTTP 401 unauthorized**.

**Before (Build 235):** HTTP 503 `webhook_auth_not_configured` (runtime secret NOT loaded — BLOCKED).
**After (Build 236):** HTTP 401 `unauthorized` (runtime secret loaded; request had no/invalid secret).
**Transition:** **503 → 401**, exactly the transition Build 235 named as the proof the runtime secret
is loaded.

## Meaning

The **503 → 401** transition means two things simultaneously:

1. **The runtime secret is now loaded.** The guard no longer reaches the
   `missing_secret_config → 503` branch, so `config.vapiWebhookSecret` is non-empty in the serving
   process.
2. **The guard still fails closed correctly.** With the secret loaded, a request that presents **no
   matching request secret** is rejected with **401 unauthorized** before any write path (the guard
   returns before `next()`). The webhook is not open — it rejects unauthenticated callers.

This is the expected post-enablement runtime state. The Build 235 runtime blocker is **fixed**.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 09ecfab`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `09ecfab`.

## What was NOT done in this build

- **No authorized synthetic POST was run.** This build performed only the unauthenticated
  (no-secret) read-of-behavior smoke that returned 401. The authorized synthetic/sanitized POST
  remains the next gated step and is **not executed and not fabricated** here.
- **No real call** was placed or received.
- **No SMS** was sent.
- **No real roofer or homeowner contact** of any kind.
- **No secrets printed** — the secret is referenced by env-var name only; no value exists in this
  packet.
- **No phone numbers or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**

## Before/after sanitized evidence summary

| Phase | Action | Expected | Actual | Captured |
|---|---|---|---|---|
| Before (B235) | `GET /health` | 200 | HTTP 200 production | ✅ live (B235) |
| Before (B235) | unauthenticated `POST` (no secret) | 401 post-enablement | **HTTP 503 webhook_auth_not_configured** ❌ | ✅ live — BLOCKED (B235) |
| Fix (Jason) | repaste/reset `VAPI_WEBHOOK_SECRET` + redeploy | applied | applied (out-of-band) | ⚙️ operational |
| After (B236) | unauthenticated `POST` (no secret) | **401 unauthorized** | **HTTP 401 unauthorized** ✅ | ✅ live — FIXED |
| After (gated) | authorized synthetic `POST` (matching secret) | 200/404 expected processing | **not executed** | ⛔ gated; not fabricated |

The captured rows are real, captured live. The authorized row is an expectation, not a result, and is
explicitly not captured.

## Safety invariants (held by Build 236)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No SMS sent.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No authorized synthetic POST executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; the secret is referenced by env-var name
  only).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## What was actually executed vs. not executed

**Executed (live, read-only behavior probe / from sandbox):**
- Source-of-truth preflight + `scripts/verify-source-of-truth.sh` → PASS at `09ecfab`.
- Unauthenticated `POST /webhooks/vapi/call-completed` (synthetic body, no secret) → **HTTP 401
  unauthorized** (runtime secret loaded; guard fails closed — FIXED). Sanitized: status code only.

**NOT executed (gated / out-of-band):**
- Authorized synthetic/sanitized POST (expected 200/404). (gated — next step; not fabricated)
- Any Railway variable set / redeploy / restart. (Jason performed the repaste+redeploy out-of-band;
  this build performed none.)
- Any Vapi-side config change. (not done)

## Exact next gated step

The next gated step is the **authorized synthetic / sanitized POST evidence** — it **stops before any
real inbound call traffic and before any real call**:

1. From Jason's own authenticated terminal (secret read silently into an env var; never printed),
   run one **authorized synthetic / sanitized** `POST /webhooks/vapi/call-completed` with a fully
   fake payload and reserved fictitious test numbers (e.g. a 555-0100–555-0199 placeholder), never a
   real homeowner or roofer number.
2. Expect HTTP 404 `unknown_roofer` for a synthetic destination matching no real roofer (proves auth
   passed past 401 AND that no synthetic row was written), or HTTP 200 with a single synthetic row
   for a known TEST roofer's number.
3. Capture only the sanitized status code and a sanitized row summary (ids/booleans); record
   `configured=true / value_redacted=true / secret_sent=true`. Never the secret, never real PII,
   never tokens/SIDs/call-ids/API-keys.
4. Record those sanitized results as a Build 237 closeout addendum.

**Do not** repoint the production Twilio number's voice config, **do not** accept real Vapi call
traffic, **do not** place or route a real call, **do not** send SMS, and **do not** contact any real
roofer or homeowner. Real inbound traffic / a first real call is a later, separately-approved gate.

## Files added in Build 236

- `docs/VAPI_WEBHOOK_RUNTIME_SECRET_LOADED_EVIDENCE_BUILD_236.md` (this doc)
- `backend/scripts/verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js`
- `scripts/run-vapi-webhook-runtime-secret-loaded-build-236-dry-run.sh`
</content>
</invoke>
