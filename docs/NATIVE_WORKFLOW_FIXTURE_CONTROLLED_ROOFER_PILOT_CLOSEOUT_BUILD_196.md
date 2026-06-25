# Native Workflow Fixture — Controlled Roofer Pilot One-Message SMS Closeout (Build 196)

**Type:** LOCAL-ONLY closeout that captures the **successful** result of the already-completed
**Jason-operated** controlled roofer pilot one-message SMS send. Records the outcome as
names/booleans/codes only; performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Final decision (from the manual send):** **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** (1 attempt, no
retry).
**Live action during this closeout:** **NONE.**

## Why this build exists

Build 195 captured Jason's final signed one-message **send** approval and produced a send-time
preflight of `READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND`. Jason then ran the actual one-message send
**separately, in his own controlled environment**, with live credentials and the approved destination
supplied in his shell, the deliberate confirm token armed, exactly once, with no retry. The send
succeeded. Build 196 is the **closeout**: it captures that successful result as names/booleans/codes
only and preserves the manual execution evidence — while performing no live action of its own.

## Jason-operated send result (as captured, names/booleans/codes only)

| Marker | Value |
| --- | --- |
| gate_decision_before_execution | CONTROLLED_LIVE_SMS_PERMITTED |
| pre_flight_permitted | true |
| send_attempt_count | 1 |
| sms_was_sent | **true** |
| retry_performed | **false** |
| final_decision | **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** |
| build_environment_send | **false** |
| jason_operated_send | **true** |
| recipient_number_recorded_in_evidence | **false** |

## What Build 196 does (and does not do)

Build 196 **does**:

- **Preserve** the manual pilot execution evidence unchanged
  (`controlled-live-sms-one-message-execution-evidence.json`).
- Capture **closeout evidence** (`controlled-roofer-pilot-closeout-build-196.json`):
  `pilot_manual_attempt_captured=true`, `send_attempt_count=1`, `sms_was_sent=true`,
  `final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`, `retry_performed=false`,
  `no_live_action_during_closeout=true`, `no_secret_values_recorded=true`,
  `no_phone_number_recorded=true`, `build_environment_send=false`, `jason_operated_send=true`,
  `safety_posture=demo_ready_with_live_automation_disabled`.
- Update the **launch-readiness summary** (local 30/30, mock adapter 30/30, sandbox simulated, the
  controlled live SMS to Jason succeeded, the controlled roofer pilot one-message SMS succeeded,
  broader automation disabled), keeping launch **pilot-gated**.
- Verify all of the above **read-only**.

Build 196 **does not**:

- Send an SMS, construct a Twilio client, call `messages.create`, arm the confirm token, or run any
  retry.
- Make any Twilio / network / external call.
- Contact any real roofer or homeowner.
- Read, store, or record any secret value, SID, token, recipient phone number, or production data.
- Activate live automation, or add any public route, cron, scheduler, webhook, dispatcher, billing,
  quote, invoice, deposit, email, call, calendar, or CRM automation.
- Touch schema / auth / RLS / security.
- Authorize unrestricted launch.

All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| Controlled roofer pilot one-message SMS | **one message sent** (1 attempt, no retry), Jason-operated |
| Broader live automation | all remains disabled |

**Next step:** post-pilot observation, then a **controlled pilot expansion decision** (local-only) —
**not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Preserved manual execution evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Closeout evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-closeout-build-196.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-196.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-readonly.js` |
| Closeout wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_CLOSEOUT_BUILD_196.md` |

## How to run (local-only, read-only)

```bash
# Full local-only closeout verification + wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-closeout-build-196-readonly.js
```

## What still gates a broader launch

The controlled roofer pilot delivered **exactly one** message to one consenting test roofer, SMS only,
no retry, with the one-time approval consumed. That is a **pilot**, not a launch. Any expansion (more
messages, more roofers, additional channels, or any broader automation) requires a **separate, fresh,
explicit** decision and approval — none of which this build performs. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
