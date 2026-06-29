# Vapi Webhook Runtime Enablement & Controlled Smoke — Evidence / Staging Packet (Build 234)

Decision token: `VAPI_WEBHOOK_RUNTIME_ENABLEMENT_APPROVED_BUT_AWAITING_OUT_OF_BAND_RAILWAY_AND_VAPI_CONFIGURATION`

Date: 2026-06-29
Branch: `main`
Source-of-truth commit at packet creation: `e28a1f9` (Build 233 closeout), HEAD == origin/main.

## What this build is

Build 234 is the separately-approved **runtime-enablement + controlled smoke** step for the guarded
Vapi post-call webhook. Jason signed an explicit approval (captured in chat) to enable
`VAPI_WEBHOOK_SECRET` in Railway, redeploy, configure the matching Vapi-side header, run one
unauthenticated rejection smoke, run one authorized synthetic/sanitized `call-completed` POST, and
capture before/after evidence — **stopping before any real inbound call traffic.**

**Honest execution boundary.** The sandbox in which this build was authored has **no Railway CLI,
no Railway credentials, and no Vapi credentials.** Therefore the **control-plane** actions
(setting `VAPI_WEBHOOK_SECRET` in Railway, redeploying/restarting the backend, configuring the
Vapi-side header) **could not be performed from here** and were **NOT performed**. This packet
records what was actually executed (a read-only health probe and the unauthenticated rejection smoke,
both live against production), provides a **secret-safe runbook + command kit** for the out-of-band
Railway/Vapi configuration Jason performs, and **stages** the post-enablement unauthenticated (401)
and authorized synthetic (200) smokes as the **exact next gated step**. No post-enablement smoke
result is fabricated.

This continues the established record-then-act pattern (Builds 225–233): control-plane changes are
performed out-of-band by the owner; the repo captures sanitized + live read-only evidence and gates
every mutation.

## Approval captured

**Signed approval was present.** Jason captured, in chat, an explicit signed approval for Build 234
limited to:

> "I approve Build 234 only for Vapi webhook runtime enablement and controlled smoke evidence."

Approved scope: set `VAPI_WEBHOOK_SECRET` in Railway for `roofleadhq-api` production using a
high-entropy secret generated/set out-of-band without printing it; redeploy/restart the backend;
configure Vapi to send the same secret using exactly one accepted header
(`Authorization: Bearer <VAPI_WEBHOOK_SECRET>` **or** `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`);
run one unauthenticated live webhook smoke and confirm rejection; run one authorized
synthetic/sanitized `call-completed` POST and confirm expected processing; capture before/after
evidence without printing secrets, phone numbers, or real PII; **stop before any real inbound call
traffic.**

Explicitly **not** approved: no real roofer contact; no real homeowner contact; no real inbound call
test; no SMS; no provider calls beyond the approved Vapi-side webhook configuration/check; no
production data export; no schema/auth/RLS changes; no billing automation; no CRM integration; no
public automation expansion; no secrets printed; no additional runtime/config changes beyond
`VAPI_WEBHOOK_SECRET` + the matching Vapi webhook header.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at e28a1f9`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `e28a1f9`.

## Runtime env enablement status (redacted)

| Item | Status |
|---|---|
| `VAPI_WEBHOOK_SECRET` set in Railway (`roofleadhq-api` production) by this build | **NO — not performed** (sandbox has no Railway credentials) |
| Secret value printed / echoed / logged / committed | **NO** (no secret value exists in this packet) |
| Secret status fields available to record after out-of-band set | `configured=true`, `length_present=true`, `value_redacted=true` |
| Out-of-band set required before post-enablement smokes | **YES** |

No Railway environment variable was set by Build 234. When Jason performs the out-of-band set, the
only status this repo will record is `configured=true / length_present=true / value_redacted=true` —
**never** the value.

## Redeploy / restart status

**Not performed.** No Railway deploy or restart was triggered by Build 234 (no Railway access from
the sandbox). The backend must be restarted/redeployed out-of-band after the secret is set so the
process loads `config.vapiWebhookSecret` (read once at config load).

## Health check result (live, read-only — performed)

`GET https://roofleadhq-api-production.up.railway.app/health` → **HTTP 200**,
`{"status":"ok","message":"RoofLeadHQ backend is running","environment":"production"}`.

The backend is live and serving in production. This is a read-only GET; no mutation, no provider
call, no secret.

## Vapi-side header configuration status (redacted)

**Not performed.** No Vapi configuration was changed by Build 234 (no Vapi credentials from the
sandbox). When configured out-of-band, Vapi must send the **same** secret via exactly **one** accepted
header — the guard checks `Authorization` first, then falls back:

1. `Authorization: Bearer <VAPI_WEBHOOK_SECRET>`
2. `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`

The value Vapi sends must byte-match the Railway value. The secret is never logged or returned in any
response body.

## Unauthenticated smoke result (live — performed)

**Performed live against production. Confirmed rejection.**

`POST https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
with a synthetic body and **no** secret header →
**HTTP 503** `{"ok":false,"error":"webhook_auth_not_configured"}`.

This is the expected **pre-enablement** rejection: because `VAPI_WEBHOOK_SECRET` is not yet set in
the runtime, the Build 232 fail-closed guard rejects **all** traffic with `503
webhook_auth_not_configured` before any service / roofer lookup / Supabase write path is reached. The
synthetic body never reached a write path. No PII, no real contact, no secret.

**After the out-of-band secret set + restart**, the same unauthenticated POST (no/invalid secret)
must instead return **HTTP 401** `{"ok":false,"error":"unauthorized"}`. That post-enablement
rejection is **staged** below — **not yet captured** (the secret is not yet set).

## Authorized synthetic smoke result

**NOT executed. Staged as the next gated step.** The authorized synthetic/sanitized `call-completed`
POST requires presenting the configured secret, which (a) does not yet exist in the runtime and
(b) must never be typed/printed in this terminal per the approval. No authorized POST was run and
**no 200 result is fabricated.** Its expected outcome and a **secret-safe** command kit are recorded
below for execution immediately after Jason completes the out-of-band Railway/Vapi configuration.

## Live fail-closed baseline (sanitized factual evidence)

Recorded as sanitized factual evidence only — no runtime action is implied or added by this record:

- Production health check returned **HTTP 200**, environment `production`.
- Unauthenticated POST to `/webhooks/vapi/call-completed` returned **HTTP 503
  `webhook_auth_not_configured`**.
- This confirms the Build 232 guard is **live in production** and currently **fails closed** because
  `VAPI_WEBHOOK_SECRET` is **not yet set** in the runtime.
- **No handler / service / Supabase write path was reached** (the guard returns before `next()`).
- **No real PII, no phone numbers, no secrets, no request payload, no tokens, no call IDs** were
  recorded or exposed.
- **No Railway env var was set.**
- **No deploy / restart was performed.**
- **No Vapi-side config was changed.**
- **No authorized synthetic POST was run.**
- Post-enablement **401** (unauthenticated, post-secret) and authorized **200** (synthetic) smoke
  tests **remain the next gated step** — not executed, not fabricated.

## Before/after evidence summary

| Phase | Action | Result | Captured |
|---|---|---|---|
| Before (now) | `GET /health` | HTTP 200 production | ✅ live |
| Before (now) | unauthenticated `POST /webhooks/vapi/call-completed` (no secret) | **HTTP 503 webhook_auth_not_configured** | ✅ live |
| Enablement | set `VAPI_WEBHOOK_SECRET` in Railway + redeploy + Vapi header | — | ⏳ out-of-band (Jason) |
| After (gated) | unauthenticated `POST` (no/invalid secret) | expect **HTTP 401 unauthorized** | ⏳ next gated step |
| After (gated) | one authorized synthetic/sanitized `POST` (matching secret) | expect **HTTP 200**, single authenticated write of synthetic row | ⏳ next gated step |

The "before" rows are real, captured live. The "after" rows are **expectations**, not results, and
are explicitly not yet captured.

## Out-of-band enablement runbook (Jason performs; secret never printed)

1. **Generate a high-entropy secret out-of-band** (e.g. `openssl rand -base64 48`) **in your own
   terminal, not in this session.** Do not paste the value into this chat.
2. **Set it in Railway** for the `roofleadhq-api` **production** service as `VAPI_WEBHOOK_SECRET`
   (Railway dashboard → Variables, or `railway variables --set` in your own authenticated shell).
   Do not change any other Railway variable.
3. **Redeploy / restart** the `roofleadhq-api` production service so the process reloads config.
4. **Configure Vapi** to send the **same** value on its post-call webhook using exactly one accepted
   header (`Authorization: Bearer <secret>` **or** `x-vapi-webhook-secret: <secret>`). Change no other
   Vapi setting; change no Twilio setting; do not repoint any phone number's voice config.
5. **Confirm health** after redeploy: `GET /health` → 200.

## Secret-safe authorized POST command kit (run after step 4)

The secret is read from an environment variable you export in **your own** shell (or from a
gitignored file), so the value never appears in this repo, this chat, or a committed script.

```bash
# In YOUR own authenticated terminal (NOT this session). The secret is never printed.
# Option A: export it (value not echoed):
read -rs VAPI_WEBHOOK_SECRET; export VAPI_WEBHOOK_SECRET   # paste secret silently, press enter

BASE=https://roofleadhq-api-production.up.railway.app

# 1) Post-enablement UNAUTHENTICATED smoke — expect HTTP 401 unauthorized
curl -sS -X POST "$BASE/webhooks/vapi/call-completed" \
  -H 'Content-Type: application/json' \
  -d '{"test":"synthetic-build-234","note":"post-enablement-no-auth"}' \
  -w '\nHTTP_STATUS=%{http_code}\n'

# 2) AUTHORIZED synthetic/sanitized smoke — expect HTTP 200
#    Body is fully synthetic: fake roofer + fake homeowner, no real PII, no real phone.
#    Use a known TEST roofer identifier that exists in the data set for smoke purposes only.
curl -sS -X POST "$BASE/webhooks/vapi/call-completed" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $VAPI_WEBHOOK_SECRET" \
  -d '{
        "roofer_id": "<TEST_ROOFER_ID>",
        "homeowner_name": "Synthetic Tester",
        "homeowner_phone": "<TEST_HOMEOWNER_PHONE_E164>",
        "call_outcome": "test",
        "transcript": "synthetic build-234 smoke; not a real call"
      }' \
  -w '\nHTTP_STATUS=%{http_code}\n'

unset VAPI_WEBHOOK_SECRET
```

Notes:
- Replace `<TEST_HOMEOWNER_PHONE_E164>` with a reserved fictitious test number (e.g. a 555-line
  placeholder) and `<TEST_ROOFER_ID>` with a known test roofer id. Keep all values synthetic; never
  use a real homeowner number.
- Capture only the **status codes** and a sanitized row summary (ids/booleans), never the secret,
  never real PII, never tokens/SIDs/call-ids/API-keys.
- If the authorized POST returns anything other than 200, or any response suggests an unexpected
  write, **stop and report** before re-running.

## Safety invariants (held by Build 234)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No SMS sent.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; the secret is referenced by env-var name
  only).
- No secret committed.

The only live actions Build 234 performed were a read-only `GET /health` and one unauthenticated
`POST` that the fail-closed guard rejected with 503 before any write path — neither carried a secret
or real PII.

## What was actually executed vs. not executed

**Executed (live, from sandbox):**
- Source-of-truth preflight + `scripts/verify-source-of-truth.sh` → PASS at `e28a1f9`.
- `GET /health` → 200 production.
- Unauthenticated `POST /webhooks/vapi/call-completed` (synthetic body, no secret) → **503
  webhook_auth_not_configured** (fail-closed confirmed in production).

**NOT executed (no sandbox credentials / requires out-of-band):**
- Setting `VAPI_WEBHOOK_SECRET` in Railway. (not done)
- Redeploy / restart of the backend. (not done)
- Vapi-side header configuration. (not done)
- Post-enablement unauthenticated smoke (expected 401). (staged)
- Authorized synthetic/sanitized POST (expected 200). (staged — not fabricated)

## Exact next gated step

The next gated step is the **out-of-band runtime enablement + post-enablement smoke capture**:
Jason (1) generates a high-entropy `VAPI_WEBHOOK_SECRET` out-of-band, (2) sets it on the
`roofleadhq-api` production Railway service, (3) redeploys/restarts, (4) configures the matching Vapi
header, then runs the secret-safe command kit above — capturing the post-enablement unauthenticated
rejection (**401**) and the single authorized synthetic/sanitized **200** — and records those
sanitized results as the Build 234 closeout addendum (or a Build 235 evidence note). **Stop before
any real inbound call traffic:** do not repoint the production Twilio number's voice config, do not
accept real Vapi call traffic, and do not contact any real roofer or homeowner. Real inbound traffic
is a later, separately-approved gate. This is also the point at which the now-stale "no Vapi webhook"
docs (`VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`, `VAPI_MISSING_FIELDS_READINESS_GATE.md`, flagged in
Build 231) should be reconciled.

## Files added in Build 234

- `docs/VAPI_WEBHOOK_RUNTIME_ENABLEMENT_AND_CONTROLLED_SMOKE_EVIDENCE_BUILD_234.md` (this doc)
- `backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js`
- `scripts/run-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-dry-run.sh`
</content>
</invoke>
