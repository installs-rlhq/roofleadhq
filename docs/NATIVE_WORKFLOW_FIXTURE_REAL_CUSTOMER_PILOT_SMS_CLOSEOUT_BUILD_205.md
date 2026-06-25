# Native Workflow Fixture — Successful Real-Customer Pilot One-Message SMS Closeout (Build 205)

**Type:** LOCAL-ONLY consolidated closeout of the **successful** Jason-operated **real-customer pilot**
one-message SMS. Captures the successful outcome, preserves the recorded manual execution evidence, and
reports from **recorded metadata only**. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Pilot result:** **`CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`** — 1 send attempt, SMS **sent**, exit status
**0**, **no retry**, one-time Build 204 approval **consumed**.

## Why this build exists

The controlled test SMS to Jason succeeded, the first controlled roofer pilot one-message SMS succeeded,
and the controlled pilot expansion retry succeeded (closed out in Build 202). Build 204 then captured the
**real-customer pilot** consent/readiness markers (real-roofer/customer consent present, approved
destination marker present with **no phone number recorded**, STOP/opt-out language finalized), recorded
Jason's **SIGNED** final one-message approval (Jason-operated send only — **not** build/Claude, **not**
homeowner contact, **not** unrestricted launch), and produced a **READY** send-time preflight
(`READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND`, 0 send attempts, nothing armed by the
build).

Jason then ran the separate, fail-closed, **Jason-operated** one-message send in his own controlled
environment under that signed Build 204 approval. The gate reported `CONTROLLED_LIVE_SMS_PERMITTED`,
pre-flight was `PERMITTED`, exactly one send was attempted, the SMS **was sent**, evidence was written,
the final decision was `CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`, exit status was **0**, and **no retry** was
run. Build 205 closes out that successful **real-customer pilot** from recorded metadata only. **This
build performs none of the send and does not retry.**

## What happened (recorded metadata only)

| Marker | Value |
| --- | --- |
| gate_decision_before_execution | `CONTROLLED_LIVE_SMS_PERMITTED` |
| pre_flight_permitted | true |
| real_customer_pilot_manual_attempt_captured | **true** |
| send_attempt_count | **1** |
| sms_was_sent | **true** |
| final_decision | **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** |
| exit_status | **0** |
| twilio_result_metadata | `sid_present=true`, `status=queued`, `error_code=null` |
| send_error_metadata | **null** |
| retry_performed | **false** |
| build_environment_send | **false** |
| jason_operated_send | **true** |
| homeowner_contact_authorized | **false** |
| ran_under_build_204_signed_approval | **true** |
| build_204_approval_consumed | **true** |
| recipient number recorded | **false** |
| secret values / SIDs / tokens recorded | **false** |

The recipient number and all secret values/SIDs/tokens were **not** recorded in the evidence.

## What Build 205 does (and does not do)

Build 205 **does**: preserve the recorded manual execution evidence (which records the successful send,
unmodified by the closeout logic) and snapshot it as a Build 205 preserved copy (names/booleans/codes
only); capture the successful real-customer pilot closeout; update the launch-readiness summary; verify
all of the above read-only.

Build 205 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, authorize Claude or
the build environment to send, authorize homeowner contact, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation,
or touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion retry send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot one-message SMS | **succeeded** (1 attempt, SMS sent, no retry), Jason-operated |
| Homeowner contact | **not authorized** |
| Broader live automation | all remains disabled |

**Narrative:** the controlled test SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; the **real-customer pilot one-message SMS
succeeded**; **no homeowner contact** is authorized; broader live automation **remains disabled**; the
next step is **post-pilot observation and customer feedback**, not unrestricted launch.

**Next step:** **post-pilot observation and customer feedback** collection — **not** a retry, **not**
unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Preserved execution evidence snapshot (Build 205) | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-one-message-execution-evidence-preserved-build-205.json` |
| Real-customer pilot SMS closeout | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-sms-closeout-build-205.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-205.json` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-sms-closeout-build-205-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-sms-closeout-build-205-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_SMS_CLOSEOUT_BUILD_205.md` |

## How to run (local-only, read-only)

```bash
# Full local-only real-customer pilot SMS closeout verification + dry-run wrapper
bash scripts/run-real-customer-pilot-sms-closeout-build-205-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-sms-closeout-build-205-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval authorized exactly one Jason-operated message, which has now been sent
successfully. Any further live send — including any expansion beyond this one real-customer pilot message
or any homeowner contact — requires a new, explicit, **per-attempt** signed approval (a fresh decision +
final send approval + send-time preflight) and Jason running the existing fail-closed one-message runner
**exactly once with no retry** in his own controlled environment. This repo performs none of that. Launch
remains **pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`.
