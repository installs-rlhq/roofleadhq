# Human Takeover / Escalation — Out-of-Band Schema Application Record (Build 226)

Date: 2026-06-27
Build: 226
Starting commit: ae410ce — `test(workflow): add guarded human takeover escalation build 225`
Decision token: **HUMAN_TAKEOVER_SCHEMA_APPLIED_AWAITING_RUNTIME_GATE_ENABLEMENT_APPROVAL**

## Purpose

Record, after the fact, that the Build 225 Human Takeover / Escalation schema was **applied
out-of-band by Jason** in the Supabase SQL Editor — and that nothing else changed. This is a
documentation + verification slice only.

- `schema_applied_by_jason=true`
- Runtime gate `HUMAN_TAKEOVER_SCHEMA_READY` is **unchanged — remains unset / false**.
- No runtime behavior changed. No route was enabled. No env/Railway var was set.
- No SMS sent. No Twilio/Vapi/Resend/Lindy call. No credentials read. No Supabase call from this
  build. No homeowner or roofer contact. No production data export.

The Build 225 readiness artifact (`docs/HUMAN_TAKEOVER_SCHEMA_READINESS.md`) is **preserved
unchanged**: it correctly said `schema_applied=false` / "NOT APPLIED" at its commit time. That
document is the historical "before" record; this document is the "after" record. History is not
rewritten.

## What Jason applied (out-of-band, manual Supabase SQL Editor)

Supabase returned: **"Success. No rows returned."**

The applied DDL matches the Build 225 proposed SQL **exactly — no deviation**:

```sql
-- Build 225 Human Takeover / Escalation MVP — APPLIED out-of-band by Jason in Supabase SQL Editor.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS needs_human_takeover       boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS human_takeover_at          timestamptz,
  ADD COLUMN IF NOT EXISTS human_takeover_by          uuid        REFERENCES roofers(id),
  ADD COLUMN IF NOT EXISTS human_takeover_notes       text,
  ADD COLUMN IF NOT EXISTS human_takeover_resolved_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_leads_pending_review
  ON leads (roofer_id, human_takeover_at DESC)
  WHERE needs_human_takeover = true;
```

Applied objects:

| Object | Type | State |
|---|---|---|
| `leads.needs_human_takeover` | `boolean NOT NULL DEFAULT false` | applied |
| `leads.human_takeover_at` | `timestamptz` | applied |
| `leads.human_takeover_by` | `uuid REFERENCES roofers(id)` | applied |
| `leads.human_takeover_notes` | `text` | applied |
| `leads.human_takeover_resolved_at` | `timestamptz` | applied |
| `idx_leads_pending_review` | partial index on `leads (roofer_id, human_takeover_at DESC) WHERE needs_human_takeover = true` | applied |

## Post-schema verification already run locally

```
HUMAN_TAKEOVER_SCHEMA_READY=true scripts/run-human-takeover-escalation-build-225-dry-run.sh
```

Result: **PASS** — no SMS sent, no provider calls, no credentials read, no writes outside the
mock/offline verifier, no homeowner or roofer contact, no automation activation. Running the Build 225
dry-run with `HUMAN_TAKEOVER_SCHEMA_READY=true` exercises the gate-on code path against the offline
mock only; it does **not** connect to Supabase and does **not** enable the live runtime route.

## Runtime gate status — UNCHANGED

`backend/src/services/lead-takeover.service.ts` resolves the gate via
`source.HUMAN_TAKEOVER_SCHEMA_READY === 'true'` and **defaults to false**. Build 226 does not change
that code, does not set the env var anywhere, and does not touch Railway. The mutating takeover routes,
the dashboard `pendingReview` live counts, and the dispatcher schema-gated projection all remain inert
until the env var is set under a separate approval.

## Open pre-runtime checklist item (NOT actioned in Build 226)

`workflow_events.event_type` — if this column is a Postgres enum, the three new event types may need to
be added **before** runtime enablement:

- `human_takeover_started`
- `human_takeover_released`
- `human_takeover_resolved`

This is recorded as an open item only. **Do not apply that SQL now.** It is unverified whether
`event_type` is an enum or free text; resolve before flipping the runtime gate, not in this build.

## Runtime enablement is deferred

Runtime enablement is deferred to a **future, separately approved build**. The exact next manual step,
to be performed only on Jason's separate explicit approval after review:

1. (If `workflow_events.event_type` is an enum) add the three event-type values above.
2. Set `HUMAN_TAKEOVER_SCHEMA_READY=true` in the backend (Railway) environment.
3. Re-run `scripts/run-human-takeover-escalation-build-225-dry-run.sh` against the live-schema instance
   to confirm the gate flips and the pause/review loop is exercised.
4. Only then do the mutating takeover routes and dashboard `pendingReview` live counts activate.

Build 226 performs **none** of these steps.

## Decision

**HUMAN_TAKEOVER_SCHEMA_APPLIED_AWAITING_RUNTIME_GATE_ENABLEMENT_APPROVAL**

Schema is live in Supabase; runtime remains gated off; enablement awaits a separate Jason approval.
