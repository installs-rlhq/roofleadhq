# Vapi Webhook Runtime-Enablement Readiness & Runbook — Build 233

Decision token: `VAPI_WEBHOOK_GUARD_IN_CODE_RUNTIME_SECRET_AND_DEPLOY_AWAITING_SEPARATE_APPROVAL`

Date: 2026-06-29
Branch: `main`
Source-of-truth commit at packet creation: `6a56b1b` (Build 232 closeout), HEAD == origin/main.

## What this build is

A **repo-only** readiness/runbook packet. Build 233 reads the Build 231 inspection and the Build 232
fail-closed auth guard already in code, then writes down the **exact, separately-approved runtime
actions** required to enable the Vapi post-call webhook in production — and the precise safety gates
that bound those actions.

**This build sets no env var, runs no deploy, calls no Vapi, sends no live HTTP, places no call, and
changes no runtime/Railway/Vapi/Twilio configuration.** It is the runtime-enablement analogue of the
SMS-path and human-takeover readiness packets (Builds 217–232): document and gate first, act only
under a later, separately-approved, explicitly-gated build. It adds NEW files only; it modifies no
existing source, doc, verifier, schema, or config.

## Source-of-truth preflight (run before authoring)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 6a56b1b`

Fail-closed: this packet is only valid when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `6a56b1b`.

## Current state (verified against repo source)

The Build 232 fail-closed shared-secret guard **is in code today** and is wired BEFORE the route
handler:

- Guard: `backend/src/middleware/vapi-webhook-auth.ts` — `requireVapiWebhookSecret` reads the secret
  from `config.vapiWebhookSecret` (`backend/src/config/config.ts` → `process.env.VAPI_WEBHOOK_SECRET`),
  accepts either `Authorization: Bearer <secret>` or `x-vapi-webhook-secret: <secret>`, compares with
  `crypto.timingSafeEqual` (constant-time, length-pre-checked), and **fails closed** — it returns
  before `next()` on every unauthorized case, so `processVapiCallCompleted` and all
  `calls`/`leads`/`bookings` writes are never reached.
- Route: `backend/src/routes/vapi-webhooks.ts` registers the guard as middleware before the
  `/call-completed` handler: `router.post('/call-completed', requireVapiWebhookSecret, … )`.

**The runtime secret is NOT yet enabled.** `VAPI_WEBHOOK_SECRET` is not set in the Railway runtime
for `roofleadhq-api` production. Because the guard fails closed, the live webhook currently rejects
**all** traffic with `503 webhook_auth_not_configured`. That is the safe posture: no unauthenticated
write is possible, and no authenticated write is possible either, until the secret is deliberately set
under a separate approval.

**No deploy has been approved.** Setting the env var and restarting/redeploying the backend so it
loads are separate, explicitly-approved steps — NOT part of this build.

## Accepted request headers (the secret Vapi must send)

Once the runtime secret is enabled, Vapi must send the **same** value using exactly one of these
accepted headers (the guard checks `Authorization` first, then falls back):

1. `Authorization: Bearer <VAPI_WEBHOOK_SECRET>`
2. `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`

A whitespace-only or empty token counts as "no secret presented". The value is **never** logged,
echoed, or returned in any response body — rejection responses carry only a reason code
(`missing_request_secret` / `invalid_secret`), never the value.

## Next separately-approved runtime actions (the runbook)

Each step below is a **separate, explicitly-approved runtime action**. None is performed in Build 233.
They must be executed in order, only after their own approval, and captured as their own build
artifact (exactly as the SMS-path and human-takeover runtime gates were).

1. **Set `VAPI_WEBHOOK_SECRET` in Railway** for the `roofleadhq-api` **production** service. Generate
   a high-entropy random value out-of-band; set it as a Railway service variable. Do **not** print,
   echo, paste into chat, or commit the value. (Names only in this repo.)
2. **Redeploy / restart the Railway backend** so the new variable is loaded into the running process
   (`config.vapiWebhookSecret` is read at config load, so the process must restart to pick it up).
3. **Configure Vapi** to send the **same** secret on its post-call webhook using exactly one accepted
   header: `Authorization: Bearer <VAPI_WEBHOOK_SECRET>` **or**
   `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`. The value Vapi sends must byte-match the Railway
   value.
4. **Run the unauthenticated smoke test** against the live webhook and confirm it is **rejected**:
   - Before the secret is set / before the restart loads it → expect **`503 webhook_auth_not_configured`**.
   - After the secret is loaded, a POST with no/invalid secret → expect **`401 unauthorized`**.
   In short: an unauthenticated POST must return **401 or 503 depending on runtime state**, never 2xx,
   and must never reach a Supabase write.
5. **Run ONE authorized synthetic/sanitized `call-completed` POST** — only after approval — that
   presents the matching secret via an accepted header, carrying clearly **synthetic/sanitized** data
   (fake homeowner, test roofer), and confirm it processes end-to-end (expected `200`). This is the
   first and only authenticated write of the enablement step.
6. **Capture before/after evidence** for the build artifact: the unauthenticated rejection
   (401/503), the single authorized 200, and the resulting row state — with **no secret values** and
   no real PII in the captured evidence.
7. **Stop before any real inbound call traffic.** Do not repoint the production Twilio number's voice
   config, do not accept real Vapi call traffic, and do not contact any real roofer or homeowner.
   Real inbound traffic is a later, separately-approved gate.

## Safety gates (Build 233 — and binding the runtime steps above)

This build, its verifier, and its dry-run wrapper guarantee, and the runtime runbook above is bounded
by:

- No real roofer contact.
- No real homeowner contact.
- No live call placed or received.
- No SMS sent.
- No provider calls (no Vapi / Twilio / Retell / Resend / Lindy API call).
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (every secret is referenced by env-var name only; no value is echoed, logged, or
  committed).
- No deploy.
- No runtime env / config changes (no Railway, Vapi, or Twilio configuration change in this build).

The build itself takes **no live action**; it is a repo-only readiness + runbook packet that defers
every runtime mutation to a separately-approved step.

## Files added in Build 233

- `docs/VAPI_WEBHOOK_RUNTIME_ENABLEMENT_READINESS_BUILD_233.md` (this doc)
- `backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js`
- `scripts/run-vapi-webhook-runtime-enablement-readiness-build-233-dry-run.sh`

## Verification

- `node backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js` —
  read-only, non-mutating (before/after `git status` equality). Proves: this doc exists and references
  source commit `6a56b1b`; recognizes the Build 232 guard is in code (route wires the guard before the
  handler); states the runtime `VAPI_WEBHOOK_SECRET` still requires separate approval; documents both
  accepted headers; documents the unauthenticated (401/503) and authenticated (200) smoke
  expectations; prohibits secrets being printed; prohibits deploy/runtime-config changes in this
  build; and that running it does not mutate the repo.
- `scripts/run-vapi-webhook-runtime-enablement-readiness-build-233-dry-run.sh` — syntax checks + the
  Build 233 read-only verifier + the Build 232 read-only verifier + the existing Vapi phone-lead smoke
  verifier regression.
- `cd backend && npm run build` — TypeScript compiles.

## Whether any runtime env/config is still needed before deployment

**Yes — and it is deliberately deferred.** Before the Vapi webhook may accept any traffic,
`VAPI_WEBHOOK_SECRET` must be set in the Railway runtime, the backend restarted to load it, and the
matching secret configured on the Vapi side. Until then the in-code guard correctly fails closed
(503) and no live traffic should be routed. **Setting that env var, restarting/redeploying, and
configuring Vapi are separate, explicitly-approved steps — not part of Build 233.**

## Exact next gated step after review

After Build 233 is reviewed and merged, the next gated step is the **runtime-enablement execution**
(runbook steps 1–6 above): set `VAPI_WEBHOOK_SECRET` in Railway production, restart/redeploy the
backend, configure the matching Vapi secret header, run the unauthenticated smoke test (expect
401/503), then run a single authorized synthetic/sanitized `call-completed` POST (expect 200), and
capture before/after evidence — **stopping before any real inbound call traffic**. That execution
must be captured as its own approved build artifact. It is also the point at which the now-stale
"no Vapi webhook" docs (`VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`,
`VAPI_MISSING_FIELDS_READINESS_GATE.md`, flagged in Build 231) should be reconciled.
</content>
</invoke>
