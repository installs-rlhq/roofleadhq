# Vapi Webhook Post-Enablement Smoke — Evidence Packet (Build 235)

Decision token: `VAPI_WEBHOOK_POST_ENABLEMENT_SMOKE_BLOCKED_RUNTIME_SECRET_NOT_LOADED_503`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `6c5e758` (Build 234 closeout), HEAD == origin/main.

## What this build is

Build 235 is the **post-enablement controlled-smoke evidence** step for the guarded Vapi post-call
webhook. After Build 234 captured signed approval and the live **pre-enablement** fail-closed
baseline (health 200; unauthenticated POST → **503 webhook_auth_not_configured**), Jason reported the
out-of-band setup as complete:

- Railway `VAPI_WEBHOOK_SECRET` set
- backend redeployed/restarted
- Vapi webhook header configured/published on the Test Roofing Assistant only
- no real inbound call traffic routed

Build 235 was authored to capture the post-enablement smoke evidence: (1) health still 200, (2)
unauthenticated POST now returns **401 unauthorized**, (3) one authorized synthetic/sanitized
`call-completed` POST returns the expected processing result — all sanitized, stopping before any real
inbound call traffic.

## Honest outcome — BLOCKED at the runtime layer (not fabricated)

**The live evidence contradicts the "secret loaded in runtime" assumption.** The post-enablement
unauthenticated smoke still returned **HTTP 503 `webhook_auth_not_configured`**, not the expected
**401**. Per the build's own stop rule — *"If 503 still appears, stop and report runtime secret is not
loaded."* — this build **stops** and records the BLOCKED state honestly.

The Build 232 guard returns `503 webhook_auth_not_configured` **only** when
`config.vapiWebhookSecret` is empty in the running process (see
`backend/src/middleware/vapi-webhook-auth.ts`, `evaluateVapiWebhookAuth` →
`'missing_secret_config'`). A live 503 therefore proves the **process currently serving
`roofleadhq-api-production`** has **no** `VAPI_WEBHOOK_SECRET` loaded.

The authorized synthetic POST was **NOT executed** and **no 401 / 200 result is fabricated**. This
continues the established honest record-then-act pattern (Builds 225–234): the repo records only
sanitized + live read-only evidence and never invents a result.

**This 503 is explicitly marked as a FAILURE / BLOCKED runtime outcome — it is not a passing
post-enablement state.**

## Likely cause (diagnostic, no control-plane action taken here)

A live 503 after a reported out-of-band set means one of:

1. The Railway `VAPI_WEBHOOK_SECRET` variable was set on a **different service/environment** than the
   one serving `roofleadhq-api-production`, or under a different variable name.
2. The variable was set but the backend was **not actually redeployed/restarted**, so the running
   process still holds the old (empty) config (`config.vapiWebhookSecret` is read once at config
   load — see `backend/src/config/config.ts`).
3. The redeploy was triggered but had **not finished / propagated** to the serving instance at probe
   time.

The sandbox in which this build was authored has **no Railway CLI, no Railway credentials, and no
Vapi credentials**, so it **cannot** inspect or change the Railway variable, redeploy, or change the
Vapi config to resolve this. Those are out-of-band actions for Jason. **No control-plane action was
taken by Build 235.**

## Secret availability (redacted)

| Item | Status |
|---|---|
| `VAPI_WEBHOOK_SECRET` present in sandbox env var | `present_in_env=false` |
| `VAPI_WEBHOOK_SECRET` present in gitignored `backend/.env` | `present=false` |
| Secret value printed / echoed / logged / committed by Build 235 | **NO** (no secret value exists in this packet) |

Because the secret is **not** available to the sandbox (and must never be requested or typed here per
the approval), the authorized synthetic POST could not be executed from here even if the runtime had
been correctly enabled. The secret-safe command kit below lets Jason run it from his own terminal once
the runtime 503→401 transition is confirmed.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 6c5e758`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `6c5e758`.

## Out-of-band setup status (as reported by Jason; redacted)

| Item | Reported by Jason | Verified live by Build 235 |
|---|---|---|
| Railway `VAPI_WEBHOOK_SECRET` set | reported done | **NOT confirmed** — runtime still returns 503 (`configured` status fields would be `value_redacted=true` only; never the value) |
| backend redeployed / restarted | reported done | **NOT confirmed** — serving process has empty `config.vapiWebhookSecret` |
| Vapi webhook header configured (Test Roofing Assistant only) | reported done | not testable until runtime secret loads (would need authorized POST) |
| real inbound call traffic routed | reported NOT routed | not contradicted; no real traffic was generated by this build |

No Railway variable was set, no deploy/restart was triggered, and no Vapi config was changed by Build
235. The only status this repo will ever record about the secret is `configured=true /
value_redacted=true / secret_sent=true` — **never** the value.

## Health result (live, read-only — performed)

`GET https://roofleadhq-api-production.up.railway.app/health` → **HTTP 200**, environment
`production`.

The backend is live and serving in production. Read-only GET; no mutation, no provider call, no
secret. (Sanitized: status code + environment only.)

## Unauthenticated rejection smoke (live — performed) — BLOCKED RESULT

`POST https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed` with a synthetic
body and **no** secret header → **HTTP 503 `webhook_auth_not_configured`**.

**Expected (post-enablement):** HTTP 401 `unauthorized`.
**Actual:** HTTP 503 `webhook_auth_not_configured`.
**Interpretation:** the runtime secret is **NOT loaded** in the serving process. **STOP CONDITION
TRIGGERED.** This is recorded as a **FAILURE / BLOCKED** post-enablement result, not a pass.

The synthetic body never reached a write path (the guard returns before `next()`). No PII, no real
contact, no secret. (Sanitized: status code + error code only.)

## Authorized synthetic smoke result — NOT EXECUTED (blocked; not fabricated)

**NOT executed.** Two independent blockers:

1. The runtime secret is not loaded (unauthenticated smoke returned 503), so even a correct authorized
   POST would be rejected with 503 — testing it now proves nothing about the guard's authorized path.
2. The secret value is not available to the sandbox (`present_in_env=false`, `backend/.env`
   `present=false`) and must never be requested/typed/printed here.

**No 401 and no 200 result is fabricated.** The authorized synthetic POST remains the next gated step
**after** the runtime 503→401 transition is confirmed.

## Before/after sanitized evidence summary

| Phase | Action | Expected | Actual | Captured |
|---|---|---|---|---|
| Before (B234) | `GET /health` | 200 | HTTP 200 production | ✅ live (B234) |
| Before (B234) | unauthenticated `POST` (no secret) | 503 pre-enablement | HTTP 503 webhook_auth_not_configured | ✅ live (B234) |
| Enablement | set secret + redeploy + Vapi header | applied | **NOT confirmed in runtime** | ⚠️ reported, unverified |
| After (B235) | `GET /health` | 200 | **HTTP 200 production** | ✅ live |
| After (B235) | unauthenticated `POST` (no secret) | **401 unauthorized** | **HTTP 503 webhook_auth_not_configured** ❌ | ✅ live — BLOCKED |
| After (gated) | authorized synthetic `POST` (matching secret) | 200 expected processing | **not executed** | ⛔ blocked; not fabricated |

The before/after rows that are marked captured are real, captured live. The "after" authorized row is
an expectation, not a result, and is explicitly not captured.

## Re-enablement runbook (Jason performs out-of-band; secret never printed)

To clear the 503 BLOCKED state:

1. **Confirm the variable is on the right service/environment.** In Railway, verify
   `VAPI_WEBHOOK_SECRET` is set on the **exact** `roofleadhq-api` **production** service that serves
   `roofleadhq-api-production.up.railway.app` (not a staging/preview environment, not a sibling
   service), under the exact name `VAPI_WEBHOOK_SECRET`. Do not change any other variable. Do not
   print the value.
2. **Force a fresh redeploy/restart** of that service so the process reloads config
   (`config.vapiWebhookSecret` is read once at load).
3. **Confirm health** after redeploy: `GET /health` → 200.
4. **Re-run the unauthenticated smoke** and confirm the transition to **HTTP 401 `unauthorized`**.
   Only then is the runtime secret confirmed loaded.
5. **Then** run the authorized synthetic POST kit below.

## Secret-safe authorized POST command kit (run only after step 4 shows 401)

The secret is read from an environment variable exported in **your own** shell, so the value never
appears in this repo, this chat, or any committed script. The value is **never printed**.

The guard accepts exactly one of two headers — use whichever matches the Vapi assistant config:
`Authorization: Bearer <VAPI_WEBHOOK_SECRET>` (checked first) **or**
`x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>` (fallback). The kit below uses the `Authorization`
form; swap in `-H "x-vapi-webhook-secret: $VAPI_WEBHOOK_SECRET"` if the assistant sends that header
instead.

```bash
# In YOUR own authenticated terminal (NOT this session). The secret is never printed.
read -rs VAPI_WEBHOOK_SECRET; export VAPI_WEBHOOK_SECRET   # paste secret silently, press enter

BASE=https://roofleadhq-api-production.up.railway.app

# 1) Confirm runtime secret loaded — UNAUTHENTICATED smoke must now return HTTP 401 unauthorized
curl -sS -X POST "$BASE/webhooks/vapi/call-completed" \
  -H 'Content-Type: application/json' \
  -d '{"test":"synthetic-build-235","note":"post-enablement-no-auth"}' \
  -w '\nHTTP_STATUS=%{http_code}\n'

# 2) AUTHORIZED synthetic/sanitized smoke — fully fake payload, no real PII / no real phone.
#    A synthetic destination number that matches NO real roofer yields the safest authorized
#    result: HTTP 404 unknown_roofer — it proves auth passed (past 503/401) AND that no synthetic
#    row was written (handler returns before any insert). To instead exercise a single authenticated
#    write, use a known TEST roofer's twilio_number; expect HTTP 200 with a single synthetic row.
curl -sS -X POST "$BASE/webhooks/vapi/call-completed" \
  -H 'Content-Type: application/json' \
  -H "Authorization: Bearer $VAPI_WEBHOOK_SECRET" \
  -d '{
        "provider_call_id": "synthetic-build-235-0001",
        "caller_phone": "<SYNTHETIC_CALLER_E164>",
        "roofer_destination_number": "<SYNTHETIC_DEST_E164>",
        "outcome": "test",
        "transcript": "synthetic build-235 smoke; not a real call"
      }' \
  -w '\nHTTP_STATUS=%{http_code}\n'

unset VAPI_WEBHOOK_SECRET
```

Replace `<SYNTHETIC_CALLER_E164>` and `<SYNTHETIC_DEST_E164>` with reserved fictitious test numbers
(e.g. a 555-0100–555-0199 line placeholder); never use a real homeowner or roofer number.
Capture only the **status codes** and a sanitized row summary (ids/booleans), never the secret, never
real PII, never tokens/SIDs/call-ids/API-keys. If the authorized POST returns anything other than the
expected 404 (unknown synthetic roofer) or 200 (known test roofer), or any response suggests an
unexpected write, **stop and report** before re-running. Evidence may only say `configured=true`,
`value_redacted=true`, `secret_sent=true`.

## Safety invariants (held by Build 235)

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
- No deploy / redeploy / restart triggered by this build.

The only live actions Build 235 performed were a read-only `GET /health` (200) and one unauthenticated
`POST` that the fail-closed guard rejected with **503** before any write path — neither carried a
secret or real PII.

## What was actually executed vs. not executed

**Executed (live, from sandbox):**
- Source-of-truth preflight + `scripts/verify-source-of-truth.sh` → PASS at `6c5e758`.
- Sandbox secret-availability check (presence only): `present_in_env=false`, `backend/.env`
  `present=false`.
- `GET /health` → 200 production.
- Unauthenticated `POST /webhooks/vapi/call-completed` (synthetic body, no secret) → **503
  webhook_auth_not_configured** (runtime secret NOT loaded — BLOCKED).

**NOT executed (blocked / requires out-of-band):**
- Authorized synthetic/sanitized POST (expected 200/404). (blocked — runtime 503 + no local secret;
  not fabricated)
- Any Railway variable set / redeploy / restart. (not done — no sandbox credentials)
- Any Vapi-side config change. (not done — no sandbox credentials)

## Exact next gated step

The next gated step is **out-of-band runtime remediation, then re-capture** — it **stops before any
real inbound call traffic and before any real call**:

1. Jason confirms `VAPI_WEBHOOK_SECRET` is set on the **exact** Railway service/environment serving
   `roofleadhq-api-production` (correct name, correct service), then **forces a fresh
   redeploy/restart**.
2. Re-run the unauthenticated smoke; confirm the transition **503 → 401 `unauthorized`**. Only this
   confirms the runtime secret is loaded.
3. Run the secret-safe authorized synthetic POST from Jason's own terminal; capture the sanitized
   status code (expected 404 unknown synthetic roofer, or 200 with a single synthetic row for a known
   test roofer) and record `configured=true / value_redacted=true / secret_sent=true`.
4. Record those sanitized results as a Build 236 closeout addendum.

**Do not** repoint the production Twilio number's voice config, **do not** accept real Vapi call
traffic, **do not** place or route a real call, **do not** send SMS, and **do not** contact any real
roofer or homeowner. Real inbound traffic / a first real call is a later, separately-approved gate.

## Files added in Build 235

- `docs/VAPI_WEBHOOK_POST_ENABLEMENT_SMOKE_EVIDENCE_BUILD_235.md` (this doc)
- `backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js`
- `scripts/run-vapi-webhook-post-enablement-smoke-build-235-dry-run.sh`
</content>
</invoke>
