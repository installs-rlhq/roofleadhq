# Human Takeover / Escalation — Schema Readiness (Build 225)

Date: 2026-06-26
Build: 225
Starting commit: 887c5ee — `test(workflow): align public pricing offer build 224`

## Purpose

Record the schema required for the Human Takeover / Escalation MVP **before** any DDL is applied.
This is inspection and planning only.

- **Schema is NOT applied by this document.** The SQL below is proposed only.
- No homeowner or roofer contact is enabled.
- No SMS is sent. No provider (Twilio / Vapi / Resend) is called. No credentials are read.
- All runtime code that depends on these columns is gated behind `HUMAN_TAKEOVER_SCHEMA_READY=true`
  (default **false**), so the application cannot fail on a not-yet-existing column.

## Goal

Let a roofer take over a hot or complex lead:

1. automation pauses for **that lead only**,
2. the lead appears in a dashboard **Pending Review** section,
3. the roofer can **Take Over**, **Release** (resume), or **Mark Handled**,
4. who/when/notes/resolved-time are recorded.

## Required columns on `leads`

| Column | Type | Purpose |
|---|---|---|
| `needs_human_takeover` | `boolean NOT NULL DEFAULT false` | Pause flag; the SMS safety gate skips all automated sends for this lead while true. |
| `human_takeover_at` | `timestamptz` | When the takeover started. |
| `human_takeover_by` | `uuid REFERENCES roofers(id)` | Who took it over. **See FK note below.** |
| `human_takeover_notes` | `text` | Free-text operator notes. |
| `human_takeover_resolved_at` | `timestamptz` | When released / marked handled. |

### `human_takeover_by` FK / type note

`roofers.id` is a `uuid` throughout the codebase (see `roofer_id` usage in `leads`, `follow_ups`,
`workflow_events`, and the dashboard token lookup). This MVP assumes **one operator per roofer**, so
`human_takeover_by` is modeled as `uuid` referencing `roofers(id)`. If a separate operators/users
table is introduced later, change the reference target then. The application stores the authenticated
`rooferId` here and never depends on the FK existing to function.

## Proposed SQL — NOT APPLIED

```sql
-- Build 225: Human Takeover / Escalation MVP — additive, nullable, safe-default. NOT APPLIED.
ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS needs_human_takeover       boolean     NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS human_takeover_at          timestamptz,
  ADD COLUMN IF NOT EXISTS human_takeover_by          uuid        REFERENCES roofers(id),
  ADD COLUMN IF NOT EXISTS human_takeover_notes       text,
  ADD COLUMN IF NOT EXISTS human_takeover_resolved_at timestamptz;

-- Pending Review only ever filters the active set; a partial index keeps it cheap.
CREATE INDEX IF NOT EXISTS idx_leads_pending_review
  ON leads (roofer_id, human_takeover_at DESC)
  WHERE needs_human_takeover = true;
```

All columns are additive, nullable (or safe-defaulted), so existing rows and the three intake paths
(Path A Digital, Path B Phone, Path C Manual Outreach) are unaffected.

## Status-history / audit trail

Current takeover state lives in the columns above. The full who/when/notes/resolved audit trail is
appended to the existing `workflow_events` table (same pattern as `manual_outreach_received`,
`followup_paused`, `homeowner_opted_out`). New event types:

- `human_takeover_started`
- `human_takeover_released`
- `human_takeover_resolved`

**If `workflow_events.event_type` is a Postgres enum**, add these three values when applying the
migration. If it is free text (as the existing varied inserts suggest), no change is needed. The
takeover write path is gated, so this is only relevant once `HUMAN_TAKEOVER_SCHEMA_READY=true`.

## Runtime dependence on this schema

| Code path | Depends on new columns? | Behavior before schema applied |
|---|---|---|
| `evaluateSmsSafety` `human_takeover` gate | No (pure boolean input) | Inert: input defaults to false; identical behavior to today. |
| `sms-dispatcher-planner.service` | No (optional field, coerced) | Unchanged. |
| `sms-dispatcher-dry-run-executor.service` | Only when `humanTakeoverSchemaReady=true` | Default projection unchanged; column requested only when explicitly gated on. |
| `lead-takeover.service` (takeover/release/handled/pending-review) | Yes | Returns `schema_not_applied` (503) / empty placeholder (200) WITHOUT querying new columns. |
| `routes/lead-takeover.ts` | Via service gate | Same as service. |
| `routes/dashboard.ts` `/overview` `pendingReview` | Via service gate | `{ schemaReady: false, count: 0, leads: [] }` placeholder; rest of overview unchanged. |

Gate variable: **`HUMAN_TAKEOVER_SCHEMA_READY`** — set to `true` only after the SQL above is applied
to the target Supabase instance and the new `workflow_events` event types (if enum) are added.

## Apply order (when approved)

1. Apply the `ALTER TABLE` + index SQL to the target Supabase instance.
2. If `workflow_events.event_type` is an enum, add the 3 new values.
3. Set `HUMAN_TAKEOVER_SCHEMA_READY=true` in the backend environment.
4. Re-run `scripts/run-human-takeover-escalation-build-225-dry-run.sh` to confirm the gate flips and
   the pause/review loop is exercised against the applied schema.

Decision when planning is verified: `HUMAN_TAKEOVER_ESCALATION_MVP_READY_FOR_SCHEMA_APPLICATION_REVIEW`.
