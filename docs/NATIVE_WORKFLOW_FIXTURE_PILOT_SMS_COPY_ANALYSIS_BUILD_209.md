# Native Workflow Fixture — Pilot SMS Workflow/Message-Copy Analysis + Revision Packet (Build 209)

**Type:** LOCAL-ONLY SMS **workflow/message-copy analysis and revision** packet for the next controlled
pilot send. Analyzes why the real-customer pilot message did not validate value, drafts revised
**roofer-facing** SMS copy variants for review, records the **homeowner-facing** copy boundary, records the
next decision packet, and includes an **unsigned** next-send approval template. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`COPY_REVISED_REVIEW_REQUIRED`** — Jason reviews the revised roofer-facing SMS copy and
selects one **before** any further live send. No send, expansion, homeowner contact, or unrestricted launch
is approved.

## Why this build exists

The live SMS delivery path works. The real-customer pilot one-message SMS (Jason-operated, Build 205,
1 attempt, no retry, Build 204 approval consumed) **succeeded technically** — but the message content was
**generic delivery-test copy only**:

> "RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing).
> No action needed."

That text **proved delivery** but **did not validate RoofLeadHQ value**. Build 208 captured Jason's
corrected feedback and set the decision `MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND`. Build 209
performs that analysis and drafts replacement copy — **without sending anything** and **without authorizing
any further live action**.

## 1. Message-copy analysis evidence

| Field | Value |
| --- | --- |
| current_message_was_generic_delivery_test | **true** |
| delivery_test_proven | **true** |
| value_messaging_not_validated | **true** |
| workflow_copy_revision_required | **true** |
| no_live_action_during_copy_analysis | **true** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |

**Interpretation:** the generic delivery-test copy was a pure delivery probe — it described the test itself
and asked for no action. The next controlled send should use workflow-appropriate **roofer-facing** copy
that reflects a real RoofLeadHQ moment while keeping all messaging honest.

## 2. Roofer-facing SMS copy variants (for review — none approved for send)

SMS-only. No guarantee language. No "booked jobs" claims. No estimate/quote/invoice/payment/deposit claims.
Focused on **lead response, inspection requests, missed-lead prevention, and faster follow-up**. Opt-out
language included. `selected_variant=pending_jason_review`; `no_variant_approved_for_send=true`.

- **R1 — new_lead_fast_response_alert** *(lead response)* — "RoofLeadHQ: New roofing lead just came in. A
  quick first reply now helps you reach them while they're still looking. Reply STOP to opt out."
- **R2 — missed_lead_prevention_nudge** *(missed-lead prevention)* — "RoofLeadHQ: A lead from earlier still
  has no first reply. A short follow-up now helps you avoid losing them to a faster response elsewhere.
  Reply STOP to opt out."
- **R3 — inspection_request_flag** *(inspection requests)* — "RoofLeadHQ: A homeowner asked about a roof
  inspection. Want us to flag it for follow-up? Reply with your next step. Reply STOP to opt out."
- **R4 — faster_follow_up_daily_nudge** *(faster follow-up)* — "RoofLeadHQ: A few new leads are still
  waiting on a first reply today. Faster follow-up keeps more of them engaged. Reply STOP to opt out."
- **R5 — open_follow_up_recap** *(faster follow-up)* — "RoofLeadHQ recap: leads received and follow-ups
  still open today. Reply RECAP for the list. Reply STOP to opt out."

These are **drafts for Jason's review**, not approved messages. No variant is selected or authorized for
any send.

## 3. Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved now.** Any homeowner-facing message requires **separate consent and
a separate signed approval**. `homeowner_facing_sms_approved_now=false`;
`requires_separate_consent_and_approval=true`; `homeowner_contact_authorized=false`.

Draft **principles only** (for future review): identify the roofing business clearly by name; reference the
homeowner's own prior inquiry (never cold contact); obtain and record per-homeowner consent first; state
plainly why they are being contacted; include clear opt-out language; honor quiet hours in the roofer's
local timezone; no guarantees, pressure, booked-jobs, or estimate/quote/invoice/payment/deposit claims.

A single placeholder example is included **clearly marked `[DRAFT - NOT APPROVED]`**; it is not consented,
not approved, and not to be sent.

## 4. Next decision packet

| Field | Value |
| --- | --- |
| decision | **COPY_REVISED_REVIEW_REQUIRED** |
| recommended_next_option | **review_copy_before_any_live_send** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_fresh_signed_approval | **true** |

## 5. Unsigned next-send approval template

`approval_signed=false`, `approval_granted=false`, `authorizes_live_action_now=false`,
`selected_message_variant=pending_jason_review`. The template documents the shape of the per-attempt signed
approval Jason would complete **outside this build** before any live send (reviewed/selected variant id,
consenting roofer label, destination marker only, opt-out language final, single-message + no-retry +
rollback-owner acknowledgements). It authorizes **nothing**; homeowner messages require a separate approval.

## What Build 209 does (and does not do)

Build 209 **does**: record the message-copy analysis evidence, draft 3–5 honest roofer-facing SMS copy
variants for review, record the homeowner-facing copy boundary (not approved), record the
`COPY_REVISED_REVIEW_REQUIRED` decision with `recommended_next_option=review_copy_before_any_live_send`,
include an unsigned next-send approval template, update the launch-readiness summary, and verify all of the
above read-only.

Build 209 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, approve any send,
authorize expansion, authorize homeowner contact, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or
touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## 6. Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion retry send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot one-message SMS | **delivery succeeded** (1 attempt, no retry); generic delivery-test copy **did not validate value** |
| Post-pilot feedback | **captured** (Build 208); message-copy analysis needed |
| Pilot SMS copy analysis | **SMS mechanics proven**; copy **revised for review**; `COPY_REVISED_REVIEW_REQUIRED` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

**Narrative:** SMS mechanics are proven and the real-customer pilot **delivery succeeded**; the previous
copy was **generic delivery-test copy** that did not validate value; the message/workflow copy is now
**revised for review**; homeowner-facing copy is **not approved**; the next step is **Jason copy review,
not a live send**, and not unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Copy-analysis + revision packet | `backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-analysis-build-209.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-209.json` |
| Read-only verifier | `backend/scripts/verify-pilot-sms-copy-analysis-build-209-readonly.js` |
| Dry-run wrapper | `scripts/run-pilot-sms-copy-analysis-build-209-dry-run.sh` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Prior corrected feedback (Build 208) | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-208.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_PILOT_SMS_COPY_ANALYSIS_BUILD_209.md` |

## How to run (local-only, read-only)

```bash
# Full local-only copy-analysis verification + dry-run wrapper
bash scripts/run-pilot-sms-copy-analysis-build-209-dry-run.sh

# Verifier on its own
node backend/scripts/verify-pilot-sms-copy-analysis-build-209-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval was consumed by the Build 205 send. **No new approval exists.** Any further
live send — including a send of any revised variant, or any homeowner contact — requires a new, explicit,
**per-attempt** signed approval (a fresh decision + final send approval + send-time preflight) and Jason
running the existing fail-closed one-message runner **exactly once with no retry** in his own controlled
environment. This repo performs none of that. The immediate next step is **Jason copy review**, not a live
send. Launch remains **pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`.
