# Build 230 — Manual Outreach Single-SMS Live Retest Closeout + Cleanup Evidence

Decision token: `MANUAL_OUTREACH_DUPLICATE_SCHEDULE_GUARD_LIVE_SINGLE_SMS_RETEST_PASSED_AND_CLEANED_UP`

Status: repo-only evidence closeout slice. Docs + read-only verifier + dry-run wrapper only.
**Not deployed. No SMS sent. No provider called. No homeowner or roofer contacted. No schema / auth /
RLS / security change. No production data accessed or written beyond the repo-local/static counts and
ids recorded below.** This build documents a live retest that was already performed and cleaned up
out-of-band under separate Jason approval; Build 230 itself takes no live action.

---

## 1. Source of truth

- Build 229 commit `8a9a70d` ("guard manual outreach duplicate scheduling build 229").
- `HEAD == origin/main` at `8a9a70d` at the start of Build 230.
- Build 229 added the manual-outreach duplicate-schedule guard
  (`backend/src/services/manual-outreach.service.ts`) and was redeployed to Railway.

---

## 2. Build 229 deployment

- Build 229 was committed, pushed, and redeployed to the Railway `roofleadhq-api` production service.
- Post-redeploy health check: `GET /health` returned **HTTP/2 200**.
- The duplicate-schedule guard from Build 229 is therefore live in the production runtime.

---

## 3. Live single-SMS retest (Test Roofing)

Under a **separate, explicit Jason approval**, Jason sent **exactly one** SMS from his own iPhone to
the Jason-owned Test Roofing number (ending **4990**) to confirm the Build 229 guard end-to-end in the
live runtime. This is the single-message retest that Build 229 deferred to separate approval.

### Baseline (before the retest)
- leads `23`, messages `11`, workflow_events `93`, follow_ups `126`.

### Post-retest (after the retest)
- leads `23`, messages `11`, workflow_events `95`, follow_ups `130`.

### Result — guard confirmed; no amplification
- **No new lead** (leads stayed at 23 — the existing test lead was reused).
- Exactly **1** `manual_outreach_received` event.
- Exactly **1** `followup_scheduled` event.
- Exactly **4** scheduled follow-ups created (workflow_events `93 → 95` = +2; follow_ups `126 → 130`
  = +4).
- Twilio `MessageSid` observed in metadata: `SM67c...869c`.
- **The Build 229 duplicate explosion did not recur.** Under Build 229 the prior incident amplified a
  single lead to 24 scheduled follow-ups (4 × 6 re-deliveries); the retest produced exactly one
  4-follow-up set, which is the correct first-outreach behavior.

---

## 4. Cleanup (Jason-approved, scoped to the 4 retest follow-ups only)

Jason approved cleanup of **only** the 4 scheduled follow-ups created by this single-SMS retest.

- The 4 follow-ups were updated to `status = skipped` with
  `skipped_reason = build_229_single_sms_retest_followup_cleanup`.
- One workflow event was inserted:
  `event_type = build_229_single_sms_retest_cleanup`.
- Cleanup workflow event id: `7aab35d2-6d19-48bb-9d2c-e9273a559fd8`.
- Cleanup event metadata: `followups_updated_count = 4`, `deletion_performed = false`,
  `sms_sent = false`, `provider_calls = false`.

### Cleanup verification
- total_followups `28`, skipped `28`, scheduled_remaining `0`, cleanup_event_exists `true`.
- **No deletion** (`deletion_performed = false`), **no SMS sends**, **no provider calls**, **no
  homeowner or roofer contact.** The cleanup only flipped status and inserted one audit event.

---

## 5. Safety invariants (Build 230)

- No deploy. No SMS sent. No Twilio / Vapi / Resend / Lindy provider call. No homeowner or roofer
  contact.
- No schema / auth / RLS / security change. No new DB column.
- No production data read or written by Build 230; the counts and ids above are a static record of an
  already-completed out-of-band retest and cleanup.
- The retest itself sent **exactly one** SMS (Jason-owned, separately approved); the guard held and no
  follow-up amplification occurred.
- The cleanup performed **no deletion**, **no SMS sends**, and **no provider calls**
  (`deletion_performed = false`, `sms_sent = false`, `provider_calls = false`).
- All live-automation-disabled guardrails preserved.

---

## 6. Outcome

The Build 229 manual-outreach duplicate-schedule guard is **live-validated**: a clean single-message
SMS retest produced exactly one lead-reuse, one `manual_outreach_received`, one `followup_scheduled`,
and exactly 4 scheduled follow-ups — no recurrence of the Build 229 duplicate explosion. The 4 retest
follow-ups were cleaned up to `skipped` with a single audit event and zero destructive or outbound
side effects. No further SMS-proof build is required for this guard.
