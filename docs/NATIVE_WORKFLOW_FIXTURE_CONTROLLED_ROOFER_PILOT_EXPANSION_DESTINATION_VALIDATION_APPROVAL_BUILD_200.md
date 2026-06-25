# Native Workflow Fixture — Corrected Destination Validation + Fresh Expansion Approval/Preflight (Build 200)

**Type:** LOCAL-ONLY capture of (1) a corrected destination validation marker, (2) a fresh signed
one-message expansion approval, and (3) a send-time preflight gate that is ready for a separate
Jason-operated one-message send. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Selected expansion option:** **Option B** — same consenting test roofer, second controlled SMS.
**Send-time preflight decision:**
**`READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION`**.

## Why this build exists

Build 199 closed out the failed Jason-operated Option B expansion attempt: exactly one send was
attempted, the SMS was **not** sent, Twilio rejected it with error code **21211 / status 400**, no
retry was run, and the one-time Build 198 approval was **consumed**. The metadata-only diagnosis was
`root_cause_class = recipient_destination_validation_rejection` and required Jason to **validate the
approved destination number** first, then capture a **fresh signed approval** before any further
attempt — explicitly **not** a retry of the consumed approval.

Build 200 captures exactly that, as names/booleans/codes only:

1. **Corrected destination validation marker** — Jason independently reviewed the approved destination
   number in his own controlled environment after the 21211/400 failure and corrected or validated it
   **outside the repo and chat**. The destination value is **not** stored, inspected, printed, or
   committed.
2. **Fresh signed one-message expansion approval** — a **new** one-time, one-message, no-retry,
   Jason-operated approval, gated on the destination validation. It is **not** a retry of the consumed
   Build 198 approval and does **not** authorize a build-environment send.
3. **Send-time preflight gate** — evaluates to
   `READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION` with
   `send_attempt_count=0` and no live send.

**This build performs none of the send and makes no external call.**

## What Build 200 captures (names/booleans/codes only)

| Marker | Value |
| --- | --- |
| expansion_option | **B_same_roofer_second_controlled_sms** |
| destination validation status | `validated_or_corrected_outside_repo_in_jason_controlled_environment` |
| destination value recorded | **false** |
| addresses root_cause_class | `recipient_destination_validation_rejection` |
| fresh approval signed | **true** (is_fresh_signed_approval=true) |
| is retry of consumed approval | **false** |
| max message count / retry allowed | **1 / false** |
| authorizes build-environment send | **false** |
| send-time preflight decision | `READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION` |
| preflight send_attempt_count / sms_sent | **0 / false** |
| prior failure error_code / status | **21211 / 400** |

The corrected/validated destination is supplied **only** in Jason's shell at send time; it is never
written to the repo, a fixture, chat, or a placeholder number.

## Destination validation (corrected outside the repo)

`destination_validation_status = validated_or_corrected_outside_repo_in_jason_controlled_environment`

Jason performed the destination validation/correction **independently of the build environment**, in
his own controlled environment, after the Build 199 21211/400 failure. The marker records only that the
validation occurred and that the corrected destination is ready to be supplied in Jason's shell. It does
**not** assert the specific destination digits, carrier identity, or any secret, and the build
environment never inspected or stored the value.

## What still gates the send

The fresh approval authorizes exactly **one** Jason-operated message, SMS only, **no retry**, to the
**same** consenting test roofer, with the corrected/validated destination supplied only in Jason's
shell. Before the message is sent, Jason must (in his own controlled environment) re-run the readiness
gate so it reports `CONTROLLED_LIVE_SMS_PERMITTED`, supply live credentials and the validated
destination in his shell, arm the deliberate confirm token, and run the existing fail-closed
one-message runner **exactly once with no retry**. The repo performs none of that. See the
Jason-operated send command runbook (Build 200).

## What Build 200 does (and does not do)

Build 200 **does**: capture the corrected destination validation marker; capture a fresh signed
one-message expansion approval; produce a send-time preflight gate
(`READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION`); update the
launch-readiness summary; verify all of the above read-only.

Build 200 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record/inspect/print any secret value/SID/token/destination/recipient phone number/production
data, authorize Claude or the build environment to send, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM
automation, or touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion Option B attempt | attempted once, **FAILED 21211/400**, no retry, approval consumed |
| Controlled pilot expansion failure diagnosis | `recipient_destination_validation_rejection` (metadata-only) |
| Corrected destination validation | **validated/corrected outside repo** (value not stored) |
| Fresh expansion approval | **signed** (fresh, one message, no retry, not a retry of consumed approval) |
| Send-time preflight | `READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_RETRY_AFTER_DESTINATION_VALIDATION` |
| Broader live automation | all remains disabled |

**Next step:** a separate Jason-operated one-message expansion send in Jason's controlled environment
with the validated destination, then a LOCAL-ONLY closeout — **not** a retry of the consumed approval,
**not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Corrected destination validation marker | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-destination-validation-build-200.json` |
| Fresh signed expansion approval | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-final-send-approval-build-200-signed.json` |
| Send-time preflight gate | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-send-time-preflight-build-200.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-200.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-dry-run.sh` |
| Jason-operated send command runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_JASON_OPERATED_SEND_COMMAND_RUNBOOK_BUILD_200.md` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_DESTINATION_VALIDATION_APPROVAL_BUILD_200.md` |

## How to run (local-only, read-only)

```bash
# Full local-only destination validation + fresh approval/preflight verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-destination-validation-approval-build-200-readonly.js
```

## Safety posture

Launch remains **pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`. This Build 200 approval does **not** authorize Claude or the
build environment to send SMS or make external calls; the one future controlled expansion SMS is a
separate, deliberate, Jason-operated action performed entirely outside this repository.
