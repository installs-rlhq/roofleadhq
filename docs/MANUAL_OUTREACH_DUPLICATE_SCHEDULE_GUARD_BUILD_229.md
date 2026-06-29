# Build 229 — Manual Outreach Duplicate-Schedule Guard + Live Test Roofing SMS Runtime Finding

Decision token: `MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_ADDED_AWAITING_SINGLE_MESSAGE_LIVE_RETEST_APPROVAL`

Status: repo-only readiness/verification slice. Code guard + offline tests + docs only.
**Not deployed. No SMS sent. No provider called. No homeowner or roofer contacted. No schema / auth /
RLS / security change. No production data accessed beyond the repo-local/static record below.**

---

## 1. Live Test Roofing inbound-SMS runtime finding (what happened)

Jason-owned **Test Roofing** (`roofer_id be7efc94-bd68-43af-81b2-dc7b869b42df`, number ending **4990**)
was used to manually exercise the real inbound manual-outreach SMS path after Railway/Twilio config
fixes. The finding below was observed in the live runtime; it is recorded here for the repo audit
trail. No production data is copied into this repo beyond these counts/ids.

### Railway route / token fix
- The Railway API route is reachable.
- `TWILIO_AUTH_TOKEN` is configured on the Railway service.
- An **unsigned** webhook probe to the manual-outreach route returns **403** (signature validation
  fails closed) — the correct, secure behavior.

### Twilio active-configuration correction (Lindy → RoofLeadHQ)
- The Twilio number's **Messaging** webhook was pointed at the workflow-assistant (Lindy) endpoint.
- It was corrected to the RoofLeadHQ backend route:
  `https://roofleadhq-api-production.up.railway.app/webhooks/twilio/manual-outreach`
- After the correction, an iPhone SMS from Jason eventually reached RoofLeadHQ.

### Successful inbound SMS evidence
- A live test lead was created: `bd1584d9-bcbc-46c4-bdb4-b3cd9d07e244`.
- Lead shape: `source_path = manual`, `source_detail = angi`, `status = new`.

### Duplicate / delayed-SMS finding (the bug)
Several earlier failed/delayed SMS attempts were re-delivered by the carrier/Twilio as **distinct
`MessageSid` values**. The webhook's duplicate check keys on `MessageSid` only, so each re-delivery
looked new and the service scheduled **another full set of 4 follow-ups** each time.

Observed amplification for the single lead:
- leads `22 → 23` (one lead — correct), workflow_events `79 → 92`, follow_ups `102 → 126`.
- 6 `manual_outreach_received` events with **6 unique `MessageSid` values**.
- 6 `followup_scheduled` events.
- **24 scheduled follow_ups for one lead** (4 per inbound message × 6 inbounds).

Root cause: the `MessageSid` duplicate check in `backend/src/routes/webhooks.ts` cannot catch
re-deliveries that arrive under new `MessageSid` values. There was no guard at the
schedule-creation layer.

### Cleanup evidence (Jason-approved, scoped to the 24 rows only)
- The 24 follow_ups were updated to `status = skipped` with
  `skipped_reason` / `stopped_reason = jason_owned_duplicate_sms_test_cleanup_after_delayed_failed_sms_delivery`.
- One workflow event was inserted:
  `event_type = jason_owned_duplicate_sms_test_cleanup`.
- Verification: total_followups 24, skipped 24, scheduled_remaining 0, cleanup_event_count 1.
- **No deletion, no SMS sends, no provider calls, no homeowner/roofer contact.**

---

## 2. Follow-up guard added in Build 229

File: `backend/src/services/manual-outreach.service.ts` (`createManualOutreach`).

Conservative duplicate-schedule guard on the start / plain-phone path (the path that schedules a
new set of 4 follow-ups):

1. Before scheduling, query active follow-ups for the same `roofer_id` + lead
   (`status in ('scheduled','pending')`). The lead is already resolved by `roofer_id` + homeowner
   `phone`, so this is exactly the same roofer + homeowner phone.
2. If an active set already exists, **do not** schedule a second set. Instead:
   - still record `manual_outreach_received` (so the webhook `MessageSid` dedup keeps working), and
   - record a `manual_outreach_duplicate_schedule_skipped` workflow event whose metadata carries
     `reason = active_followups_exist` and the active follow-up count.
   - return `follow_up_count: 0, duplicate_schedule_skipped: true`.
3. If no active set exists (brand-new lead, or a lead whose set was paused/stopped/completed), the
   **first valid manual outreach still schedules exactly one set of 4 follow-ups** — unchanged.

Preserved behavior:
- **MessageSid duplicate check** in `webhooks.ts` is unchanged.
- **pause / stop** commands are handled before the guard and are unaffected (they still skip
  active follow-ups and append `followup_paused` / `followup_stopped`).
- No DB schema change. No new column. No change to auth / RLS / security.
- No live-send path added: the service still has no Twilio `messages.create`, no send-adapter
  import, and no provider trigger wiring.

The service also gained an **optional injected Supabase client** parameter (defaulting to the
existing module-level service-role client) purely to enable the offline unit test below. The two
production call sites (`routes/manual-outreach.ts` and `routes/webhooks.ts`) call
`createManualOutreach` with no second argument, so their behavior is unchanged.

### Why the guard lives in the service, not the webhook
The webhook only knows the `MessageSid`; the amplification is a *scheduling* concern. Putting the
guard at the schedule-creation layer protects every caller of `createManualOutreach` (webhook and
the `/test` dry-run route alike) regardless of how many distinct `MessageSid` values arrive.

---

## 3. Tests / verifiers added

- `backend/scripts/test-manual-outreach-duplicate-schedule-guard-build-229.js` — offline behavioral
  unit test. Compiles the native service with `tsc` and exercises it against an in-memory mock
  Supabase (no live Supabase, no network, no provider, no SMS). Proves:
  - first outreach → one lead + exactly one 4-follow-up set;
  - repeated outreach, same roofer + phone, different `MessageSid` → 0 additional follow-ups +
    `manual_outreach_duplicate_schedule_skipped` event + inbound still acknowledged;
  - **incident replay** of 6 distinct `MessageSid` values → 4 follow-ups, not 24;
  - pause / stop paths unaffected;
  - post-stop re-engagement still schedules a fresh set (guard only blocks ACTIVE sets);
  - no SMS / messages / provider path exercised or present.
- `backend/scripts/verify-manual-outreach-duplicate-schedule-guard-build-229-readonly.js` —
  read-only static verifier. Non-mutating (`git status` before == after). Asserts the guard code,
  preserved invariants, this doc's evidence, and the absence of secret/phone-shaped values.
- `scripts/run-manual-outreach-duplicate-schedule-guard-build-229-dry-run.sh` — dry-run wrapper:
  syntax-checks, runs the behavioral test, the read-only verifier, and the existing manual-outreach
  smoke verifier. Makes no live call.

---

## 4. Safety invariants (Build 229)

- No deploy. No SMS sent. No Twilio / Vapi / Resend / Lindy provider call. No homeowner or roofer
  contact.
- No schema / auth / RLS / security change. No new DB column.
- No production data accessed beyond the repo-local/static counts and ids recorded above.
- All live-automation-disabled guardrails preserved; the `/test` route still rejects non-dry-run.
- The behavioral test writes only to an in-memory JS mock and a throwaway OS-temp build dir; it does
  not mutate the repo or any database.

---

## 5. Remaining next step (separate approval required)

One clean **single-message** SMS retest from the Test Roofing number, to confirm the guard's behavior
end-to-end in the live runtime — to be performed **only after** Build 229 is reviewed, committed,
pushed, and deployed under a **separate, explicit Jason approval**. Build 229 itself stops before
commit.
