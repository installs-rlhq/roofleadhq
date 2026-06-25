# Native Workflow Fixture — Real-Customer Pilot Post-Pilot Observation + Feedback Decision Packet (Build 206)

**Type:** LOCAL-ONLY post-real-customer-pilot **observation** + **customer-feedback** decision packet.
Captures the post-pilot observation status from recorded repo metadata only (names/booleans/codes),
provides an unfilled customer feedback capture template, and records the next decision packet plus four
**unsigned** options. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`POST_PILOT_FEEDBACK_REQUIRED`** — collect roofer feedback, then a Jason decision. No
expansion, homeowner contact, or unrestricted launch is approved.

## Why this build exists

The controlled test SMS to Jason succeeded, the first controlled roofer pilot one-message SMS succeeded,
the controlled pilot expansion retry succeeded (Build 202), and the **real-customer pilot one-message SMS
succeeded** (Build 205: 1 send attempt, SMS sent, exit status 0, no retry, one-time Build 204 approval
consumed). What is **not** yet known is whether the message was actually delivered, whether the roofer
understood and valued it, and what should change next. Build 206 captures that **observation + feedback**
state and sets up the next **decision** — without sending anything and without authorizing any further
live action.

## 1. Post-pilot observation evidence (recorded metadata only)

| Marker | Value |
| --- | --- |
| real_customer_pilot_sms_sent | **true** |
| send_attempt_count | **1** |
| retry_performed | **false** |
| delivery_confirmation_status | **not_recorded_by_build** |
| roofer_feedback_status | **not_recorded_by_build** |
| customer_value_validation_status | **pending_human_feedback** |
| no_live_action_during_observation_capture | **true** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |

The repo execution evidence records the send as accepted/`queued` (send-acceptance, **not** a final
delivery confirmation). Final delivery confirmation, roofer feedback, and customer-value validation are
**external/human signals not collected by this build**.

## 2. Customer feedback capture template (unfilled — to be completed by Jason)

1. Did the roofer receive the SMS?
2. Did the roofer understand what RoofLeadHQ does?
3. Was the message useful?
4. What should change before the next real pilot interaction?
5. Should we proceed, pause, or revise?

Record answers as names/booleans/codes only — never phone numbers, SIDs, tokens, secret values, or
production data.

## 3. Next decision packet

| Field | Value |
| --- | --- |
| decision | **POST_PILOT_FEEDBACK_REQUIRED** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_fresh_signed_approval | **true** |

## 4. Options for the next step (UNSIGNED)

- **Option A** — collect roofer feedback only, no send.
- **Option B** — one more real-customer pilot SMS, one message, no retry.
- **Option C** — prepare homeowner-facing consent copy, no send.
- **Option D** — pause live testing and improve product flow.

`approval_signed=false`, `approval_granted=false`, `authorizes_live_action_now=false`. None of these
options is approved by this build; each live option would require a new, explicit, per-attempt signed
approval.

## What Build 206 does (and does not do)

Build 206 **does**: capture the post-pilot observation evidence (names/booleans/codes only), provide the
unfilled customer-feedback template, record the `POST_PILOT_FEEDBACK_REQUIRED` decision and four unsigned
options, update the launch-readiness summary, and verify all of the above read-only.

Build 206 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, authorize expansion,
authorize homeowner contact, activate live automation, add any public route/cron/scheduler/webhook/
dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or touch
schema/auth/RLS/security. All broader live automation remains **disabled**.

## 5. Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion retry send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot one-message SMS | **succeeded** (1 attempt, SMS sent, no retry), Jason-operated |
| Post-pilot feedback | **pending** (delivery + feedback not recorded by build; value validation pending) |
| Homeowner contact | **not authorized** |
| Broader live automation | all remains disabled |

**Narrative:** the controlled test SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; the **real-customer pilot one-message SMS
succeeded**; **post-pilot feedback is pending**; **no homeowner contact** is authorized; broader live
automation **remains disabled**; the next step is a **Jason decision after feedback**, not unrestricted
launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Observation + feedback + decision packet | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-observation-build-206.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-206.json` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-observation-build-206-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-observation-build-206-dry-run.sh` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Prior closeout (Build 205) | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-sms-closeout-build-205.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_OBSERVATION_BUILD_206.md` |

## How to run (local-only, read-only)

```bash
# Full local-only post-pilot observation verification + dry-run wrapper
bash scripts/run-real-customer-pilot-observation-build-206-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-observation-build-206-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval was consumed by the Build 205 send. **No new approval exists.** Any
further live send — including Option B (one more real-customer pilot message) or any homeowner contact —
requires a new, explicit, **per-attempt** signed approval (a fresh decision + final send approval +
send-time preflight) and Jason running the existing fail-closed one-message runner **exactly once with no
retry** in his own controlled environment. This repo performs none of that. Launch remains **pilot-gated,
not unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
