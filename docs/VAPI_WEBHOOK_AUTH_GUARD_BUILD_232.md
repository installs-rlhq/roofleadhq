# Vapi Webhook Fail-Closed Auth Guard — Build 232

Decision token: `VAPI_WEBHOOK_AUTH_GUARD_FAIL_CLOSED_IMPLEMENTED_AWAITING_VAPI_WEBHOOK_SECRET_RUNTIME_SET`

Date: 2026-06-29
Branch: `main`
Source-of-truth commit at packet creation: `a9b6c18` (Build 231 closeout), HEAD == origin/main.

## What this build is

A small, surgical security build that closes the **Build 231 finding**: the live
`POST /webhooks/vapi/call-completed` route performed **mutating Supabase writes**
(`calls` / `leads` / `bookings`) with **no signature/secret validation**, so any unauthenticated
POST matching a known roofer could write rows.

Build 232 adds a **fail-closed shared-secret guard** that runs **before** the route handler — and
therefore before any service call, roofer lookup, or Supabase write. Valid Vapi webhook processing
is preserved unchanged for requests that present the configured shared secret.

This build changes only the Vapi webhook route + its new guard + config; it touches **no other
route**, no schema, no auth/RLS, and makes no provider or live-HTTP call.

## Build 231 finding being closed

From `docs/CALL_PATH_INSPECTION_AND_JASON_OWNED_CALL_TEST_READINESS_BUILD_231.md`:

> **Security gap (finding):** the implemented `/webhooks/vapi/call-completed` route performs **no
> signature/secret validation** — there is no `VAPI_WEBHOOK_SECRET` check in the code. … Any
> unauthenticated POST that matches a known roofer would write rows. This must be closed before the
> route accepts real Vapi traffic.

Build 232 implements exactly that check. The route now fails closed before the service is reached.

## Accepted request headers

Either header is sufficient (checked in this order):

1. `Authorization: Bearer <VAPI_WEBHOOK_SECRET>`
2. `x-vapi-webhook-secret: <VAPI_WEBHOOK_SECRET>`

The presented value is compared to the configured secret using a **constant-time** comparison
(`crypto.timingSafeEqual`, with a length pre-check so it never throws). A whitespace-only or empty
token is treated as "no secret presented".

## Runtime env requirement

- `VAPI_WEBHOOK_SECRET` — the shared secret, read at config load
  (`backend/src/config/config.ts` → `config.vapiWebhookSecret`, from `process.env.VAPI_WEBHOOK_SECRET`).
- The secret is **never logged, echoed, or returned** in any response body. Rejection responses log
  only a reason code (`missing_request_secret` / `invalid_secret`), never the value.

**This secret is NOT yet set in the runtime (Railway).** Until it is set, the guard fails closed and
the live webhook will reject **all** traffic with `503 webhook_auth_not_configured` — which is the
safe posture: no unauthenticated writes are possible.

## Fail-closed behavior

| Condition | Result | HTTP | Handler / Supabase reached? |
|---|---|---|---|
| `VAPI_WEBHOOK_SECRET` not set in runtime | reject | `503 webhook_auth_not_configured` | no |
| Request presents neither accepted header | reject | `401 unauthorized` | no |
| Request secret does not match | reject | `401 unauthorized` | no |
| Request secret matches (either header) | pass through | existing handler behavior | yes (unchanged) |

On every rejection the guard returns before calling `next()`, so `processVapiCallCompleted` — and all
`calls`/`leads`/`bookings` writes — are never invoked for unauthorized traffic.

## Files changed in Build 232

Added:
- `backend/src/middleware/vapi-webhook-auth.ts` — the guard (pure helpers + Express middleware).
- `backend/scripts/test-vapi-webhook-auth-guard-build-232.js` — focused behavioral test (mock req/res/next).
- `backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js` — static read-only verifier.
- `scripts/run-vapi-webhook-auth-guard-build-232-dry-run.sh` — dry-run wrapper.
- `docs/VAPI_WEBHOOK_AUTH_GUARD_BUILD_232.md` — this doc.

Modified (Vapi-webhook-local only):
- `backend/src/routes/vapi-webhooks.ts` — wires `requireVapiWebhookSecret` before the handler.
- `backend/src/config/config.ts` — adds `vapiWebhookSecret` from `VAPI_WEBHOOK_SECRET`.
- `backend/src/middleware/index.ts` — re-exports the new middleware.

No service logic, normalization, schema, RLS, or other route was changed.

## Safety invariants (Build 232)

This build, its verifier, its behavioral test, and its dry-run wrapper guarantee:

- No live call placed or received.
- No SMS sent.
- No provider calls (no Vapi / Twilio / Retell / Resend / Lindy API call).
- No live HTTP request.
- No Twilio configuration change.
- No Railway configuration change.
- No Vapi configuration change.
- No real roofer contact.
- No real homeowner contact.
- No production data export.
- No schema / auth / RLS / security-policy change (this is an app-layer request guard only).
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (the secret is referenced by env-var name only; test uses a throwaway token).
- No deploy.

The guard is purely additive request-authentication in front of an existing route; it changes no
data model and removes no existing rejection path.

## Verification

- `node backend/scripts/test-vapi-webhook-auth-guard-build-232.js` — builds (git-ignored `dist/`) and
  exercises the real compiled middleware with mock req/res/next, proving: missing-env fail-closed,
  missing-request-secret fail-closed, wrong-secret fail-closed (both headers), correct-secret reaches
  the handler (both headers), and that `next()` is never called on any unauthorized case (so no
  Supabase write path is reached).
- `node backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js` — static, non-mutating
  (before/after `git status` equality) checks that the route wires the guard before the handler, the
  guard reads `VAPI_WEBHOOK_SECRET`, uses constant-time comparison, never logs the secret, and that
  this doc records the accepted headers + fail-closed table.
- `scripts/run-vapi-webhook-auth-guard-build-232-dry-run.sh` — syntax checks + behavioral test +
  read-only verifier + the existing Vapi phone-lead smoke verifier regression.
- `cd backend && npm run build` — TypeScript compiles.

## Whether any runtime env/config is still needed before deployment

**Yes.** Before this route may accept real Vapi traffic, `VAPI_WEBHOOK_SECRET` must be set in the
Railway runtime **and** the same value configured as the secret Vapi sends (as
`Authorization: Bearer <secret>` or the `x-vapi-webhook-secret` header). Until then the guard
correctly fails closed (503) and no live traffic should be routed. Setting that env var and deploying
are **separate, explicitly-approved steps** — not part of this build.

## Exact next gated step after review

After this build is reviewed and merged, the next gated step is a **runtime-enablement build**:
set `VAPI_WEBHOOK_SECRET` in Railway, configure the matching secret header on the Vapi side, then run
a single **authorized** synthetic/sanitized `call-completed` POST against the live webhook to confirm
(a) unauthenticated POSTs are rejected and (b) one authenticated POST processes end-to-end — captured
as its own approved build artifact, exactly as the SMS-path and human-takeover chains were gated.
This is also the point at which the now-stale "no Vapi webhook" docs
(`VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`, `VAPI_MISSING_FIELDS_READINESS_GATE.md`, flagged in
Build 231) should be reconciled.
