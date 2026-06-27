# Railway Backend/API Live Runtime Verification + Controlled Live Roofer Pilot Prep (Build 228)

Date: 2026-06-27
Build: 228
Starting commit: 07d0843 — `test(workflow): add human takeover runtime gate enablement readiness build 227`
Decision token: **RAILWAY_BACKEND_LIVE_READONLY_VERIFIED_AWAITING_CONTROLLED_LIVE_ROOFER_PILOT_APPROVAL**

## Purpose

Record, in the repo only, that the RoofLeadHQ backend/API is now **deployed and serving live on
Railway**, that a **read-only** human-takeover smoke test passed against it, and that nothing
mutating, no SMS, and no provider/contact action occurred. Then define the next practical,
safety-gated steps toward a **controlled live roofer pilot** — selecting the first real roofer
candidate, collecting minimum onboarding inputs, confirming consent/scope, configuring dashboard
access and lead paths safely, and running read-only checks — with any live SMS/calls/contact left to
**separate, explicit, later approvals**.

This is a readiness / verification / runbook slice. It changes **no runtime behavior**, sets **no
env/Railway var**, makes **no Supabase write**, and contains **no secret, token, key, or phone-number
value**.

This continues the established record-then-act pattern of Builds 225–227 (schema readiness → schema
applied out-of-band → runtime gate enablement readiness), now extended to the first **live runtime**
verification milestone after Railway deployment.

## Scope guardrails (held by this build)

- Repo work only. No SMS sends. No Twilio/Vapi/Resend/Lindy provider calls. No homeowner contact.
  No real roofer contact. No production data export. No schema/auth/RLS/security changes.
  No Railway/env changes. No Supabase writes. No billing/payment/deposit/quote/estimate/invoice
  automation. No CRM integration.
- No secret values are printed, inspected, copied, or recorded. No dashboard token values, service
  role keys, or phone numbers appear in any file in this build.

## A. Railway backend/API deployment configuration (sanitized)

The backend/API service was configured and deployed in production with the following **non-secret**
settings (secret values intentionally omitted):

| Setting | Value |
|---|---|
| Service | `roofleadhq-api` (production) |
| Source repo | `installs-rlhq/roofleadhq` |
| Branch | `main` |
| Root directory | `/backend` |
| Build command | `npm install && npm run build` |
| Start command | `npm run start` |
| Healthcheck path | `/health` |
| `PORT` | removed/unset (Railway injects it) |
| `HUMAN_TAKEOVER_SCHEMA_READY` | `true` (set on this service) |
| Public domain | `https://roofleadhq-api-production.up.railway.app` |

Secrets (Supabase keys, dashboard tokens, provider credentials) were configured directly in the
Railway service environment and are **not** reproduced here.

## B. Live runtime verification evidence (read-only)

All checks below were **read-only GETs**. No POST takeover/release, no write, no SMS, no provider call.

1. **Public health check — PASS.**
   `GET https://roofleadhq-api-production.up.railway.app/health` → **HTTP 200**, environment
   `production`.

2. **Unauthenticated pending-review fails closed — PASS.**
   `GET /api/leads/pending-review` (no token) → **HTTP 401**. The route refuses access without a
   valid dashboard token (fail-closed).

3. **Authenticated pending-review — PASS (read-only).**
   `GET /api/leads/pending-review` with a controlled **test** roofer dashboard token (reset for
   read-only smoke testing only) → **HTTP 200** with body:
   ```json
   {"schemaReady":true,"count":0,"pendingReview":[]}
   ```
   `schemaReady:true` confirms the runtime gate is live (the Build 227 enablement step was performed
   out-of-band on the Railway service); `count:0` / empty list confirms no pending-review leads and
   no data exposure.

### What did NOT happen (negative evidence)

- No SMS was sent. No Twilio / Vapi / Resend / Lindy provider call was made.
- No mutating route was called: no `POST /api/leads/:id/takeover`, no `POST /api/leads/:id/release`.
- No homeowner contact, no real-roofer contact.
- No production data was exported; the authenticated response contained zero leads.
- No schema / auth / RLS / security change, no Railway/env change, no Supabase write occurred in this
  build. The only env value relevant to the live read path (`HUMAN_TAKEOVER_SCHEMA_READY=true`) was
  set out-of-band earlier and is merely **observed** here, not changed.

## C. Reusable safe smoke-test script

`scripts/run-railway-live-runtime-smoke-test.sh` reproduces the read-only checks above safely:

- `GET /health` with **no secret** (default mode).
- `--with-pending-review` adds the authenticated read-only check. The dashboard token is read from a
  **local-only** env var `RLHQ_DASHBOARD_ACCESS_TOKEN` or **prompted for silently** (`read -rs`); it
  is **never echoed**, and is passed to `curl` via a `0600` temp header file so it never appears in
  the process list.
- The script performs **GET requests only** — it never POSTs takeover/release and never writes
  production data. It prints only structural shape (`count`), never lead/PII content.

## D. Controlled live roofer pilot prep — next practical steps

The following is the safety-gated path from "live read-only verified" to a first controlled live
roofer pilot. **Each live-contact step requires its own separate explicit approval from Jason** and
is NOT performed by this build.

### D1. Select first real roofer candidate
- Choose one roofer Jason already has a direct relationship with (warm, consenting, local).
- Confirm they understand this is a **controlled founder-led pilot**, not a finished product.
- Do not make hard promises about job volume, revenue, or fixed appointment counts.

### D2. Collect minimum onboarding inputs
- Business name, owner name, primary contact, service area (zip/city list).
- One destination for lead notifications that the roofer **owns and consents to**.
- Preferred response/working hours.
- Record these in the founder's private notes — **not** committed to the repo; no PII in git.

### D3. Confirm consent and test scope (written)
- Roofer consents in writing to: receiving test/live lead notifications, the read-only dashboard,
  and the founder-led monitoring model.
- Explicitly scope the pilot as **read-only first**: dashboard visibility and pending-review only.
- Any live SMS to homeowners, any outbound calls, and any automated provider action are **out of
  scope** until separately approved (see D6).

### D4. Configure dashboard access (read-only)
- Provision a dashboard access token for the roofer through the normal flow (token value handled
  out-of-band; never recorded in the repo).
- Verify the roofer can authenticate and see their (initially empty) pending-review/dashboard view.
- Run `scripts/run-railway-live-runtime-smoke-test.sh --with-pending-review` with the roofer's token
  (entered at the silent prompt) to confirm `HTTP 200` + `schemaReady:true` read-only.

### D5. Configure lead paths safely
- Wire the roofer to the lead intake/dashboard surface in **observe-only** mode.
- Confirm SMS/Calendar/Vapi/Resend/Lindy live automations remain **disabled**
  (`scripts/verify-safe-readiness-fast.sh` must still report
  `demo_ready_with_live_automation_disabled` and each `live_automation.*` false).
- No automated outbound is armed by this configuration.

### D6. Run read-only checks, then defer live actions to separate approvals
- Run the read-only smoke test and the safe readiness fast lane; confirm fail-closed auth and zero
  data exposure.
- **Only after a separate, explicit Jason approval** for that specific action:
  - any live homeowner SMS,
  - any human-takeover/release POST,
  - any outbound call or provider automation.
- Each such approval should be captured as its own build artifact, mirroring the controlled-live-SMS
  approval pattern used earlier in this project.

## E. Build 228 verification (local / read-only / offline only)

- `node --check backend/scripts/verify-railway-live-runtime-and-pilot-prep-build-228-readonly.js`
- `node backend/scripts/verify-railway-live-runtime-and-pilot-prep-build-228-readonly.js`
- `bash -n scripts/run-railway-live-runtime-smoke-test.sh` (smoke-test script syntax check; not run
  live in this build)
- `bash scripts/run-railway-live-runtime-and-pilot-prep-build-228-dry-run.sh`
- `bash scripts/run-human-takeover-runtime-gate-build-227-dry-run.sh` (Build 227 regression)
- `HUMAN_TAKEOVER_SCHEMA_READY=true bash scripts/run-human-takeover-escalation-build-225-dry-run.sh`
  (offline/mock; gate-on code path, no Supabase, no SMS)
- `bash scripts/verify-safe-readiness-fast.sh`
- `npm --prefix backend run build`
- `bash scripts/verify-source-of-truth.sh`

## Decision

**RAILWAY_BACKEND_LIVE_READONLY_VERIFIED_AWAITING_CONTROLLED_LIVE_ROOFER_PILOT_APPROVAL**

The backend/API is live on Railway and verified healthy; the human-takeover read path is gated on and
returns read-only, fail-closed, zero-data results. No mutating, SMS, provider, or contact action
occurred. The next milestone — a controlled live roofer pilot — is scoped and runbooked here, with
every live-contact step deferred to its own separate explicit approval.
