# Native Workflow Fixture — Pilot SMS Copy Selection + Next-Send Approval/Preflight Template (Build 210)

**Type:** LOCAL-ONLY packet that records Jason's copy **selection** of roofer-facing SMS variant **R1**
(`new_lead_fast_response_alert`) as the recommended **next controlled-pilot** message, and prepares the exact
**next-send approval/preflight template**. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED`** — Jason completes a **fresh signed**
per-attempt approval for R1 and a **send-time preflight** before one Jason-operated SMS. **Selecting copy is
not a send authorization.** No send, expansion, homeowner contact, live automation, or unrestricted launch is
approved.

## Why this build exists

Build 209 analyzed why the real-customer pilot message (generic delivery-test copy) did not validate value,
drafted **five** honest roofer-facing SMS copy variants for review, and left
`selected_variant=pending_jason_review` with decision `COPY_REVISED_REVIEW_REQUIRED`. Build 210 resolves that
review: Jason's recommended selected variant for the next controlled pilot is **R1**. This build records the
selection and prepares the exact next-send approval and send-time preflight **templates** — **without sending
anything** and **without authorizing any live action**.

## 1. Copy selection evidence

| Field | Value |
| --- | --- |
| selected_variant_id | **R1** |
| selected_variant_label | **new_lead_fast_response_alert** |
| selected_for_next_controlled_roofer_pilot | **true** |
| selected_for_homeowner_send | **false** |
| no_live_action_during_selection | **true** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |
| selection_is_review_recommendation_not_send_authorization | **true** |

**Selected R1 text (roofer-facing, SMS-only, opt-out included):**

> "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're
> still looking. Reply STOP to opt out."

The verifier confirms this text matches the Build 209 R1 variant **exactly**. R1 is selected for the next
controlled **roofer** pilot review only — it is **not** selected for any homeowner send.

## 2. Selection rationale

R1 is the **strongest concise value test**: it **demonstrates new-lead response value**, **avoids guarantee
language**, **avoids booked-jobs claims**, **avoids estimates/quotes/invoices/payments/deposits**, and
**includes STOP opt-out language**.

## 3. Next decision packet

| Field | Value |
| --- | --- |
| decision | **R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED** |
| recommended_next_option | **fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_sms** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_fresh_signed_approval | **true** |

## 4. Unsigned exact approval statement template

`approval_signed=false`, `approval_granted=false`, `authorizes_live_action_now=false`,
`selected_message_variant=R1`, `max_message_count=1`, `retry_allowed=false`, `sms_only=true`,
`jason_operated_send_only=true`, `build_environment_send=false`; authorizes **no homeowner contact**, **no
live automation**, **no unrestricted launch**. It carries an exact statement text that Jason would sign
**outside this build** before any live send. It authorizes **nothing** in this build.

## 5. Send-time preflight checklist template

A **fail-closed** checklist Jason would follow **outside this build** at send time, **only after** a fresh
signed approval exists (`armed_by_build=false`, `executed_by_build=false`):

- source secrets only from `/root/roofleadhq-local-secrets/live-sms.env`
- destination entered silently outside repo/chat/logs
- names-only env presence check
- exact one-message command remains gated until fresh signed approval exists
- no retry
- unset env values after attempt

This build reads **no** secret values, records **no** destination, and arms **no** confirm token.

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT selected and NOT approved.** R1 is roofer-facing only.
`homeowner_facing_sms_approved_now=false`, `requires_separate_consent_and_approval=true`,
`homeowner_contact_authorized=false`, `selected_for_homeowner_send=false`. Any homeowner-facing message
requires separate consent capture and a separate signed approval.

## What Build 210 does (and does not do)

Build 210 **does**: record Jason's R1 copy selection for the next controlled roofer pilot review, record the
selection rationale, record the `R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED` decision, include an unsigned
exact approval statement template and a send-time preflight checklist template, update the launch-readiness
summary, and verify all of the above read-only.

Build 210 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
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
| Real-customer pilot one-message SMS | **delivery succeeded** (1 attempt, no retry); generic delivery-test copy **did not validate value** |
| Pilot SMS copy analysis (Build 209) | **SMS mechanics proven**; copy **revised for review** (5 variants) |
| Pilot SMS copy selection (Build 210) | **R1 selected** for next controlled roofer pilot review; `R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

**Narrative:** SMS mechanics are proven; Build 209 copy was revised; **R1 is selected** for the next
controlled roofer pilot review (a review recommendation, **not** a send authorization); homeowner-facing copy
is **not approved**; the next step is a **fresh signed approval + send-time preflight**, **not a send now**,
and not unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Copy-selection + next-send template packet | `backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-selection-build-210.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-210.json` |
| Read-only verifier | `backend/scripts/verify-pilot-sms-copy-selection-build-210-readonly.js` |
| Dry-run wrapper | `scripts/run-pilot-sms-copy-selection-build-210-dry-run.sh` |
| Prior copy-analysis packet (Build 209) | `backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-analysis-build-209.json` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_PILOT_SMS_COPY_SELECTION_BUILD_210.md` |

## How to run (local-only, read-only)

```bash
# Full local-only copy-selection verification + dry-run wrapper
bash scripts/run-pilot-sms-copy-selection-build-210-dry-run.sh

# Verifier on its own
node backend/scripts/verify-pilot-sms-copy-selection-build-210-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval was consumed by the Build 205 send. **No new approval exists.** Selecting R1
in Build 210 authorizes **nothing**. Any further live send — including a send of R1, or any homeowner contact
— requires a new, explicit, **per-attempt** signed approval (a **fresh signed approval** + a **send-time
preflight**) and Jason running the existing fail-closed one-message runner **exactly once with no retry** in
his own controlled environment. This repo performs none of that. The immediate next step is a **fresh signed
approval + send-time preflight**, not a send now. Launch remains **pilot-gated, not unrestricted**, and the
safety posture stays `demo_ready_with_live_automation_disabled`.
