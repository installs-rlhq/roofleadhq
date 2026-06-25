# Native Workflow Fixture — Controlled Pilot Expansion Decision (Option B) + Final Send Approval + Send-Time Preflight (Build 198)

**Type:** LOCAL-ONLY capture of Jason's SIGNED controlled pilot **expansion decision** (Option B) and
**final** one-message **send** approval, plus a send-time preflight gate. Captures decision/approval and
readiness; performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Selected expansion option:** **Option B** — same consenting test roofer, **second** controlled SMS,
one message maximum, no retry.
**Send-time preflight decision:** **READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND** (0 send
attempts, nothing sent).
**Jason-operated expansion send ready:** **YES** (to be run separately by Jason). **Build/Claude send
authorized:** **NO.**

## Why this build exists

Build 197 captured the post-pilot observation and prepared an unsigned expansion options template, with
the expansion decision evaluating to `EXPANSION_NOT_APPROVED_REVIEW_REQUIRED`. Build 198 captures
Jason's **signed** expansion decision selecting **Option B**, his **final** signed one-message **send**
approval, and a **send-time preflight** that evaluates to
`READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND`. The actual send is a separate, fail-closed,
**Jason-operated** action in Jason's own controlled environment — this build performs none of it.

## Jason approval statement (recorded as names/booleans only)

Jason Lohse approved Build 198 to capture his controlled pilot expansion decision and final one-message
send approval/preflight packet only. He selects **Option B**: the same consenting test roofer may
receive exactly **one second controlled SMS** — SMS only, one message maximum, no retry, no homeowner
contact, no production data, no non-SMS channel, no broader live automation, and **no phone number or
secrets stored** in repo/chat. The approval **does not** authorize Claude or the build environment to
send SMS or make external calls; it prepares a fail-closed, Jason-operated one-message send that Jason
may run separately in his controlled environment with live credentials, the approved destination, and a
deliberate confirm token.

## Signed expansion decision (Option B)

| Marker | Value |
| --- | --- |
| selected_option | **B_same_roofer_second_controlled_sms** |
| approval_signed | true |
| approval_granted_for_expansion_decision | true |
| unrestricted_launch | **false** |
| live_automation_remains_disabled | true |
| authorizes_live_pilot_send_now | **false** |

Option B scope: **same** consenting test roofer only (no additional roofer, no new consent marker
required), SMS only, one message maximum, no retry, no homeowner contact, no production data, no
non-SMS channel.

## Final send approval markers (fixture)

| Marker | Value |
| --- | --- |
| authorizes_jason_operated_one_message_send | true |
| authorizes_build_environment_send | **false** |
| sms_only | true |
| max_message_count | 1 |
| retry_allowed | **false** |
| homeowner_contact_allowed | **false** |
| production_data_allowed | **false** |
| approved_destination_number_recorded | **false** |

## Send-time preflight gate

`decision = READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND`, `send_attempt_count=0`,
`sms_sent=false`, `live_send_executed_by_build=false`, `no_network_external_action=true`,
`no_secret_values_recorded=true`, `no_phone_number_recorded=true`.

## What Build 198 does (and does not do)

Build 198 **does**: capture the signed Option B expansion decision; capture the final signed
one-message send approval; produce a send-time preflight gate; provide a Jason-operated command
runbook (existing fail-closed runner, env-in-shell, deliberate confirm token, one run, no retry,
evidence names/codes only); update the launch-readiness summary; verify all of the above read-only.

Build 198 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, add a second
roofer, authorize Claude or the build environment to send, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM
automation, or touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | succeeded (1 attempt, no retry), Jason-operated |
| Post-pilot observation | captured (delivery/feedback not build-recorded) |
| Controlled pilot expansion decision | **Option B selected**, signed |
| Controlled pilot expansion final send approval | captured; Jason-operated send authorized, build send NOT |
| Controlled pilot expansion send-time preflight | READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND (0 attempts) |
| Broader live automation | all remains disabled |

**Next step:** Jason-operated one-message expansion send in his controlled environment, then a
LOCAL-ONLY closeout — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Signed expansion decision | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-decision-build-198-signed.json` |
| Final signed send approval | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-final-send-approval-build-198-signed.json` |
| Send-time preflight gate | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-send-time-preflight-build-198.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-198.json` |
| Jason-operated command runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_JASON_OPERATED_SEND_COMMAND_RUNBOOK_BUILD_198.md` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_DECISION_BUILD_198.md` |

## How to run (local-only, read-only)

```bash
# Full local-only expansion-decision + final-send-approval verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-decision-build-198-readonly.js
```

## What still gates the actual expansion send

Build 198 captures the signed Option B decision and the final approval, and reaches send-time preflight
`READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND`; it sends nothing. The actual send still requires
Jason, in his own controlled environment, to set the live credentials and approved destination **in his
shell**, arm the deliberate confirm token, and run the existing fail-closed one-message runner **exactly
once with no retry** — none of which this repo performs. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
