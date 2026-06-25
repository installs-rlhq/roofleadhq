# Native Workflow Fixture — Successful Controlled Pilot Expansion (Option B) Retry Closeout (Build 202)

**Type:** LOCAL-ONLY consolidated closeout of the **successful** Jason-operated controlled pilot
**Option B** expansion **retry** one-message SMS. Captures the successful outcome, preserves the recorded
manual execution evidence, and reports from **recorded metadata only**. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Selected expansion option:** **Option B** — same consenting test roofer, second controlled SMS.
**Retry result:** **`CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`** — 1 send attempt, SMS **sent**, exit status
**0**, **no retry**, fresh one-time Build 200 approval **consumed**.

## Why this build exists

The first controlled roofer pilot one-message SMS succeeded. The first Option B **expansion** attempt
(Build 198 approval) then **failed** — Twilio returned error code **21211 / status 400**, no retry was
run, and that one-time approval was consumed (closed out in Build 199). Build 200 captured the corrected
**destination validation** performed **outside the repo** in Jason's controlled environment (addressing
the `recipient_destination_validation_rejection` root cause), a **fresh** signed one-message approval
(NOT a retry of the consumed Build 198 approval), and a send-time preflight that evaluated to
`READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION`.

Jason then ran the separate, fail-closed, **Jason-operated** one-message send in his own controlled
environment. The gate reported `CONTROLLED_LIVE_SMS_PERMITTED`, pre-flight was `PERMITTED`, exactly one
send was attempted, the SMS **was sent**, evidence was written, the final decision was
`CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`, exit status was **0**, and **no retry** was run. Build 202 closes
out that successful **expansion retry** from recorded metadata only. **This build performs none of the
send and does not retry.**

## What happened (recorded metadata only)

| Marker | Value |
| --- | --- |
| expansion_option | **B_same_roofer_second_controlled_sms** |
| gate_decision_before_execution | `CONTROLLED_LIVE_SMS_PERMITTED` |
| pre_flight_permitted | true |
| send_attempt_count | **1** |
| sms_was_sent | **true** |
| final_decision | **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** |
| exit_status | **0** |
| twilio_result_metadata | `sid_present=true`, `status=queued`, `error_code=null` |
| send_error_metadata | **null** |
| retry_performed | **false** |
| build_environment_send | **false** |
| jason_operated_send | **true** |
| fresh_approval_consumed | **true** |
| recipient number recorded | **false** |
| secret values recorded | **false** |

The recipient number and all secret values/SIDs/tokens were **not** recorded in the evidence.

## How the failure was corrected before this retry

`addressed root_cause_class = recipient_destination_validation_rejection`

The first Option B attempt failed with Twilio error code **21211 / status 400** — a **destination
validation** rejection. Before this successful retry, Jason **validated/corrected the approved
destination OUTSIDE the repo** in his own controlled environment (Build 200 destination validation
marker). The corrected destination value was **never recorded** in the repo. A **fresh** signed
one-message approval (Build 200) — not a retry of the consumed Build 198 approval — authorized the
Jason-operated retry, which then succeeded.

## What Build 202 does (and does not do)

Build 202 **does**: preserve the recorded manual execution evidence (which now records the successful
send, unmodified by the closeout logic); capture the successful expansion retry closeout
(names/booleans/codes only); update the launch-readiness summary; verify all of the above read-only.

Build 202 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, authorize Claude or
the build environment to send, activate live automation, add any public route/cron/scheduler/webhook/
dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or touch
schema/auth/RLS/security. All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion Option B first attempt | **FAILED 21211/400, no retry, approval consumed** |
| Controlled pilot expansion destination validation | corrected **outside the repo** (value not recorded) |
| Controlled pilot expansion fresh approval | Build 200 signed, one message, no retry, consumed |
| Controlled pilot expansion **retry** send | **SUCCEEDED** (1 attempt, SMS sent, no retry), Jason-operated |
| Broader live automation | all remains disabled |

**Narrative:** the first controlled roofer pilot **succeeded**; the Option B expansion **initially
failed** with **21211/400**; the destination was **corrected outside the repo**; the **expansion retry
succeeded**; broader live automation **remains disabled**; the next step is a **real-customer pilot
decision**, not unrestricted launch.

**Next step:** Jason makes the **real-customer pilot decision** with explicit **per-attempt approval** —
**not** a retry, **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Preserved manual execution evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Expansion retry closeout | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-retry-closeout-build-202.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-202.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_RETRY_CLOSEOUT_BUILD_202.md` |

## How to run (local-only, read-only)

```bash
# Full local-only expansion retry closeout verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-retry-closeout-build-202-readonly.js
```

## What still gates any further live action

The fresh one-time Build 200 approval authorized exactly one Jason-operated message, which has now been
sent successfully. Any further live send — including the first **real-customer** pilot — requires a new,
explicit, **per-attempt** signed approval (a fresh decision + final send approval + send-time preflight)
and Jason running the existing fail-closed one-message runner **exactly once with no retry** in his own
controlled environment. This repo performs none of that. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
