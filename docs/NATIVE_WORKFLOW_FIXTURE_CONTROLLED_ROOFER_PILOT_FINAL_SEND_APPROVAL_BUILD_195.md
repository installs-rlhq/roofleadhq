# Native Workflow Fixture — Controlled Roofer Pilot Final Send Approval + Send-Time Preflight (Build 195)

**Type:** LOCAL-ONLY capture of Jason's FINAL signed one-message pilot **send** approval, plus a
send-time preflight gate. Captures approval and readiness; performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Send-time preflight decision:** **READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND** (0 send attempts,
nothing sent).
**Jason-operated one-message send ready:** **YES** (to be run separately by Jason). **Build/Claude
send authorized:** **NO.**

## Why this build exists

Build 194 captured the controlled roofer pilot setup markers and reached preflight
`READY_FOR_FINAL_SEND_APPROVAL`. Build 195 captures Jason's **final** signed one-message **send**
approval and produces a **send-time preflight** that evaluates to
`READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND`. The actual send is a separate, fail-closed,
**Jason-operated** action in Jason's own controlled environment — this build performs none of it.

## Jason approval statement (recorded as names/booleans only)

Jason Lohse approved Build 195 to capture the **final** controlled roofer pilot one-message send
approval and send-time preflight packet only. The pilot remains: one consenting test roofer only, SMS
only, one message maximum, no retry, approved destination **marker only with no phone number stored**
in repo/chat, no homeowner contact, no production data, no non-SMS channel, no broader live
automation. The approval **does not** itself authorize Claude or the build environment to send SMS or
make external calls; it prepares a fail-closed, Jason-operated one-message send that Jason may run
separately in his controlled environment with live credentials and the approved destination.

## What Build 195 does (and does not do)

Build 195 **does**:

- Capture the **final signed send approval**: `approval_signed=true`,
  `authorizes_jason_operated_one_message_send=true`, `authorizes_build_environment_send=false`,
  `sms_only=true`, `max_message_count=1`, `retry_allowed=false`, `homeowner_contact_allowed=false`,
  `production_data_allowed=false`, `approved_destination_number_recorded=false`.
- Produce a **send-time preflight gate** = `READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND` with
  `send_attempt_count=0`, `sms_sent=false`, `live_send_executed_by_build=false`,
  `no_network_external_action=true`.
- Provide a **Jason-operated command runbook** for the actual send using the existing fail-closed
  one-message runner (env vars in Jason's shell only, deliberate confirm token, exactly one run, no
  retry, evidence as names/codes only).
- Update the launch-readiness summary (proof succeeded; setup complete; final send approval captured;
  next step = Jason-operated one-message send), keeping launch **pilot-gated**.
- Verify all of the above **read-only**.

Build 195 **does not**:

- Send an SMS, construct a Twilio client, call `messages.create`, arm the confirm token, or run any
  retry.
- Make any Twilio / network / external call.
- Contact any real roofer or homeowner.
- Read, store, or record any secret value, SID, token, recipient phone number, or production data
  (the approved destination number is **not** recorded — only a marker boolean is set).
- Authorize Claude or the build environment to send.
- Activate live automation, or add any public route, cron, scheduler, webhook, dispatcher, billing,
  quote, invoice, deposit, email, call, calendar, or CRM automation.
- Touch schema / auth / RLS / security.

All broader live automation remains **disabled**.

## Final send approval markers (fixture)

| Marker | Value |
| --- | --- |
| approval_signed | true |
| authorizes_jason_operated_one_message_send | true |
| authorizes_build_environment_send | **false** |
| sms_only | true |
| max_message_count | 1 |
| retry_allowed | **false** |
| homeowner_contact_allowed | **false** |
| production_data_allowed | **false** |
| approved_destination_number_recorded | **false** |

## Send-time preflight gate

`decision = READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND`, `send_attempt_count=0`, `sms_sent=false`,
`live_send_executed_by_build=false`, `no_network_external_action=true`,
`no_secret_values_recorded=true`, `no_phone_number_recorded=true`.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS | one message succeeded (1 attempt, no retry) |
| Controlled roofer pilot setup | complete; all setup/preflight blockers cleared |
| Controlled roofer pilot final send approval | captured; Jason-operated send authorized, build send NOT |
| Controlled roofer pilot send-time preflight | READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND (0 attempts) |
| Broader live automation | all remains disabled |

**Next step:** Jason-operated one-message pilot send in his controlled environment, then a LOCAL-ONLY
closeout — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Final signed send approval | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-final-send-approval-build-195-signed.json` |
| Send-time preflight gate | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-send-time-preflight-build-195.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-195.json` |
| Jason-operated command runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_JASON_OPERATED_SEND_COMMAND_RUNBOOK_BUILD_195.md` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-final-send-approval-build-195-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-final-send-approval-build-195-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_FINAL_SEND_APPROVAL_BUILD_195.md` |

## How to run (local-only, read-only)

```bash
# Full local-only final-send-approval verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-final-send-approval-build-195-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-final-send-approval-build-195-readonly.js
```

## What still gates the actual pilot send

Build 195 captures the final approval and reaches send-time preflight
`READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND`; it sends nothing. The actual send still requires Jason,
in his own controlled environment, to set the live credentials and approved destination **in his
shell**, arm the deliberate confirm token, and run the existing fail-closed one-message runner
**exactly once with no retry** — none of which this repo performs. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
