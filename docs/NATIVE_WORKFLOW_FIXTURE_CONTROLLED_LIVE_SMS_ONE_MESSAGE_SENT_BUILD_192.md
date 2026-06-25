# Native Workflow Fixture — Controlled Live SMS One-Message Sent Closeout (Build 192)

**Type:** LOCAL-ONLY closeout of an already-completed, human-operated live SMS attempt.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Result:** Gate `CONTROLLED_LIVE_SMS_PERMITTED` → exactly **1 send attempt** → **1 SMS sent** to
Jason's own consenting test identity → **no retry**. Final decision:
**`CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`**. The one-time approval is now consumed.

## Why this build exists

Jason completed the controlled live SMS attempt manually in his own controlled environment. The
pre-flight gate returned PERMITTED, a single message was sent successfully, and the execution
evidence was written. Build 192 **captures and closes out** that successful result. It records the
outcome as names/booleans/codes and preserves the manual execution evidence — nothing more.

This is a **closeout** build, not an execution build. It performs **no live action**.

## What Build 192 does (and does not do)

Build 192 **does**:

- Preserve the manual execution evidence
  (`controlled-live-sms-one-message-execution-evidence.json`) recording
  `send_attempt_count=1`, `sms_was_sent=true`, `final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`,
  with **no recipient number** and **no secret values** recorded.
- Write a names/booleans/codes-only closeout fixture for the result.
- Write a launch-readiness summary of where the program stands.
- Verify all of the above read-only.

Build 192 **does not**:

- Send an SMS, construct a Twilio client, call `messages.create`, or run **any retry**.
- Make any Twilio / network / external call. (`no_live_action_during_closeout=true`,
  `no_network_call_during_closeout=true`.)
- Read or record any secret value, SID, token, recipient phone number, or production data.
  (`no_secret_values_recorded=true`, `no_recipient_number_recorded=true`.)
- Set the live confirm token or run the live execution runner.
- Touch schema / auth / RLS / security, or add any public route, cron, scheduler, webhook,
  dispatcher, billing, quote, invoice, deposit, email, call, or calendar automation.

All broader live automation remains **disabled**.

## Closeout booleans (fixture)

- `manual_attempt_captured=true`
- `send_attempt_count=1`
- `sms_was_sent=true`
- `final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`
- `retry_performed=false`
- `no_live_action_during_closeout=true`
- `no_secret_values_recorded=true`
- `no_recipient_number_recorded=true`
- `safety_posture=demo_ready_with_live_automation_disabled`

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS | one message succeeded (1 attempt, no retry) |
| Broader live automation | all remains disabled |

**Next step:** controlled live roofer pilot readiness — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Preserved manual execution evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Build 192 closeout fixture | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-192-closeout.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-192.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-readonly.js` |
| Dry-run / closeout wrapper | `scripts/run-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT_BUILD_192.md` |

## How to run (local-only, read-only)

```bash
# Full local-only closeout verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-live-sms-one-message-sent-build-192-readonly.js
```

## What is now consumed / what still gates further live sends

The single one-time approval is **consumed** — one message delivered, **no further sends**. Any
future live send requires a **new** signed one-message approval and a fresh pass through the existing
fail-closed runner
`backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`, which
re-gates at send time and requires live credentials, the approved recipient number, and the
deliberate confirm token — none of which exist in this repo. Build 192 changes none of that. The
program now advances toward **controlled live roofer pilot readiness**, not unrestricted launch.
