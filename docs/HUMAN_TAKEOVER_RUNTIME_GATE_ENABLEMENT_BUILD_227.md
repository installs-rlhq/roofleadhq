# Human Takeover / Escalation — Runtime Gate Enablement Readiness (Build 227)

Date: 2026-06-27
Build: 227
Starting commit: 713f845 — `test(workflow): record out-of-band human takeover schema application build 226`
Decision token: **HUMAN_TAKEOVER_RUNTIME_GATE_ENABLEMENT_READY_AWAITING_SEPARATE_ENV_APPROVAL**

## Purpose

Record, in the repo only, that the Human Takeover / Escalation feature is **ready for runtime gate
enablement** — and define the exact, separately-approved manual step that will enable it. This is a
readiness / checklist / verifier slice. It changes **no runtime behavior**.

- **No env/Railway var is set by this build.** `HUMAN_TAKEOVER_SCHEMA_READY` remains unset / false.
- **No runtime is enabled.** The mutating takeover routes and dashboard live counts stay inert.
- No Supabase call. No SMS. No Twilio/Vapi/Resend/Lindy call. No credentials read. No production data
  export. No homeowner or roofer contact. No live route write. No existing runtime code changed.

This continues the established record-then-act pattern:
- Build 225 (`docs/HUMAN_TAKEOVER_SCHEMA_READINESS.md`) — proposed schema, "NOT APPLIED".
- Build 226 (`docs/HUMAN_TAKEOVER_SCHEMA_APPLICATION_BUILD_226.md`) — schema applied out-of-band by
  Jason; runtime gate left off.
- Build 227 (this doc) — runtime gate **enablement readiness**; enablement itself deferred to a
  separate, explicitly-approved manual env step.

## Prerequisite state (verified before this build)

- **Schema is live.** Jason applied the Build 225 `ALTER TABLE leads … ` + `idx_leads_pending_review`
  index out-of-band in the Supabase SQL Editor (Supabase returned "Success. No rows returned."),
  acknowledged in Build 226 with `schema_applied_by_jason=true`.
- **`workflow_events.event_type` is `text`, not a Postgres enum.** Checked directly in Supabase.
  Therefore **no enum value migration is required** for the three new event types
  (`human_takeover_started`, `human_takeover_released`, `human_takeover_resolved`); the best-effort
  `appendWorkflowEvent` insert in `lead-takeover.service.ts` writes plain text and is compatible
  as-is. This closes the only open pre-runtime checklist item carried by Build 226.
- **Runtime gate is still off.** `backend/src/services/lead-takeover.service.ts` resolves the gate via
  `source.HUMAN_TAKEOVER_SCHEMA_READY === 'true'` and defaults to **false**.

## What the runtime gate actually controls (blast radius)

`isHumanTakeoverSchemaReady()` (the env reader) is referenced in exactly these live call sites:

| Call site | Effect when `HUMAN_TAKEOVER_SCHEMA_READY=true` |
|---|---|
| `routes/lead-takeover.ts` → `GET /api/leads/pending-review` | Returns live pending-review list (read-only) instead of an empty schema-not-ready placeholder. |
| `routes/lead-takeover.ts` → `POST /api/leads/:id/takeover` | Performs the takeover write **only on an authenticated POST**, instead of `503 schema_not_applied`. |
| `routes/lead-takeover.ts` → `POST /api/leads/:id/release` | Performs the release/mark-handled write **only on an authenticated POST**, instead of `503`. |
| `routes/dashboard.ts` `/overview` `pendingReview` | Surfaces live pending-review counts instead of `{ schemaReady:false, count:0, leads:[] }`. |

**Nothing else reads the env flag.** Specifically the flag does **not** enable any SMS send, Twilio /
Vapi / Resend / Lindy call, or any provider action.

### The dispatcher is NOT wired to this env flag

`sms-dispatcher-dry-run-executor.service.ts` accepts `humanTakeoverSchemaReady` as a **function
parameter**, never from `process.env`. Both wired callers invoke the executor **without passing that
argument**, so it defaults to `false` regardless of the env var:

- `sms-dispatcher-production-runner.service.ts:234` — `executeSmsDispatcherDryRun({ supabase, dryRun:true, currentTime, limit })`
- `sms-dispatcher-manual-test-runner.service.ts:138` — `executeSmsDispatcherDryRun({ supabase, dryRun:true, currentTime, limit })`

So enabling `HUMAN_TAKEOVER_SCHEMA_READY` changes the dispatcher's behavior by exactly **zero**. The
takeover-aware projection in the dispatcher is exercised only by explicit verifier scripts that pass
the flag directly.

## Does enabling the flag trigger any automatic production writes? No.

Enabling `HUMAN_TAKEOVER_SCHEMA_READY=true` alone cannot cause any write, because:

- **No scheduler / cron exists.** `backend/src/index.ts` only mounts Express routers — no
  `setInterval`, no cron, no background dispatch loop.
- **The dispatcher production runner is script-only and not env-wired.** It is invoked solely by
  `scripts/run-sms-dispatcher-production-runner.js`, never by a route or timer, and it does not read
  this flag. Its result is `noSmsSent: true`.
- **Route writes require authenticated POSTs.** `takeOverLead` / `releaseLead` / `markHandled` write
  to `leads` + append to `workflow_events` only inside `POST /api/leads/:id/takeover` and
  `POST /api/leads/:id/release`, each behind the dashboard-token auth check.
- **`GET /pending-review` is read-only**, and the dashboard `/overview` projection is a read.
- **No import-time query.** The router's `createClient(...)` is lazy; merely loading the module (or
  flipping the env var) issues no Supabase query.

## Future manual enablement step (NOT performed in Build 227)

To be performed **only on Jason's separate explicit approval after review**:

1. In the **backend / API server Railway service** (the service running the Express API in
   `backend/src/index.ts`), set:
   ```
   HUMAN_TAKEOVER_SCHEMA_READY=true
   ```
2. Redeploy / restart that service so the process reads the new `process.env`.
3. Only then do the takeover routes and the dashboard `pendingReview` live counts activate. No SMS or
   provider behavior changes; the dispatcher is unaffected.

No `workflow_events` enum migration is required (the column is `text`).

## Rollback

1. In the same backend / API Railway service, set `HUMAN_TAKEOVER_SCHEMA_READY=false` (or unset it).
2. Redeploy / restart.

The gate then defaults false again: the mutating takeover routes return `503 schema_not_applied`,
`GET /pending-review` returns the empty schema-not-ready placeholder, and the dashboard projection
returns `{ schemaReady:false, count:0, leads:[] }`. This is a pure runtime toggle — the additive
`leads` columns and index stay in place; no schema or data rollback is involved.

## Post-enablement smoke tests — FUTURE / OPTIONAL only

Not run in Build 227. After the separate env approval, the following are safe checks that contact no
homeowner or roofer and send no SMS:

- **Offline (no Supabase):**
  `HUMAN_TAKEOVER_SCHEMA_READY=true scripts/run-human-takeover-escalation-build-225-dry-run.sh`
  exercises the gate-on takeover service + pause gate against the offline mock only.
- **Optional live read-only:** `GET /api/leads/pending-review` with a test roofer dashboard token →
  expect `schemaReady:true` and a count (read-only; no write, no SMS). Optional and deferred.

Build 227 performs **none** of these.

## Build 227 verification (local / read-only / offline only)

- `node --check backend/scripts/verify-human-takeover-runtime-gate-readiness-build-227-readonly.js`
- `node backend/scripts/verify-human-takeover-runtime-gate-readiness-build-227-readonly.js`
- `bash scripts/run-human-takeover-runtime-gate-build-227-dry-run.sh`
- `bash scripts/run-human-takeover-schema-applied-build-226-dry-run.sh` (Build 226 regression)
- `HUMAN_TAKEOVER_SCHEMA_READY=true bash scripts/run-human-takeover-escalation-build-225-dry-run.sh`
  (offline/mock; gate-on code path, no Supabase, no SMS)
- `bash scripts/verify-safe-readiness-fast.sh`
- `npm --prefix backend run build`
- `bash scripts/verify-source-of-truth.sh`

## Decision

**HUMAN_TAKEOVER_RUNTIME_GATE_ENABLEMENT_READY_AWAITING_SEPARATE_ENV_APPROVAL**

Schema is live; `workflow_events.event_type` is `text` (no enum migration); the runtime gate is
documented, scoped, and verified ready — but remains off. Enablement is a single backend Railway env
var (`HUMAN_TAKEOVER_SCHEMA_READY=true`) plus a redeploy, deferred to a separate Jason approval.
