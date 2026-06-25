# Native Workflow Fixture — Controlled Pilot Expansion (Option B) Failure Closeout + Diagnosis (Build 199)

**Type:** LOCAL-ONLY closeout of the Jason-operated controlled pilot **Option B** expansion one-message
SMS attempt. Captures the failed outcome, preserves the recorded manual execution evidence, and
diagnoses from **recorded metadata only**. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Selected expansion option:** **Option B** — same consenting test roofer, second controlled SMS.
**Attempt result:** **`CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY`** — 1 send attempt, SMS **not
sent**, Twilio **error code 21211 / status 400**, **no retry**, one-time approval **consumed**.

## Why this build exists

Build 198 captured Jason's signed Option B expansion decision, the final one-message send approval, and
a send-time preflight that evaluated to `READY_FOR_JASON_OPERATED_ONE_MESSAGE_EXPANSION_SEND`. Jason then
ran the separate, fail-closed, **Jason-operated** one-message send in his own controlled environment.
The gate reported `CONTROLLED_LIVE_SMS_PERMITTED`, pre-flight was `PERMITTED`, and exactly one send was
attempted — but the SMS was **not** sent: Twilio returned error code **21211** with status **400**, and
**no retry** was run (exit status 3). Build 199 closes out that attempt from recorded metadata only and
diagnoses it. **This build performs none of the send and does not retry.**

## What happened (recorded metadata only)

| Marker | Value |
| --- | --- |
| expansion_option | **B_same_roofer_second_controlled_sms** |
| gate_decision_before_execution | `CONTROLLED_LIVE_SMS_PERMITTED` |
| pre_flight_permitted | true |
| send_attempt_count | **1** |
| sms_was_sent | **false** |
| final_decision | **CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY** |
| error_name / error_code / error_status | `Error` / **21211** / **400** |
| retry_performed | **false** |
| approval_consumed | **true** |
| recipient number recorded | **false** |
| secret values recorded | **false** |

The recipient number and all secret values/SIDs/tokens were **not** recorded in the evidence.

## Diagnosis (metadata-only)

`root_cause_class = recipient_destination_validation_rejection`

**Likely issue:** approved destination value/format/carrier/reachability rejected by Twilio. Twilio
error code **21211** is a destination-validation rejection (status **400**). Because the destination
value was deliberately **never recorded**, this diagnosis is **metadata-consistent** but does **not**
assert the specific destination digits, carrier identity, or any secret.

**Ruled out** (with basis recorded in the diagnosis artifact):

| Ruled out | Basis |
| --- | --- |
| missing gate | gate recorded `CONTROLLED_LIVE_SMS_PERMITTED` |
| missing approval | Build 198 final send approval signed; approval_consumed=true |
| missing credential presence | live credential presence (names only) all true in evidence |
| retry loop | send_attempt_count=1; auto_retry_performed=false; retry_performed=false |
| homeowner contact | own consenting test identity; real_homeowner_contact=false |
| production data | production_data_used=false; used_production_supabase=false |
| secret leak | no secret values / phone number / SID / token recorded |

## Next step (what gates any further attempt)

The one-time expansion approval is **consumed**. The next step requires Jason to **validate the approved
destination number** in his controlled store (**destination validation** first), then capture a **fresh
signed approval** before any further attempt. This is **not** a retry of the consumed approval and
**not** unrestricted launch.

## What Build 199 does (and does not do)

Build 199 **does**: preserve the recorded manual execution evidence (unmodified by the closeout logic);
capture the expansion failure closeout (names/booleans/codes only); produce a metadata-only diagnosis;
update the launch-readiness summary; verify all of the above read-only.

Build 199 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
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
| Controlled pilot expansion decision | Option B selected, signed |
| Controlled pilot expansion Option B attempt | **attempted once, FAILED 21211/400, no retry, approval consumed** |
| Controlled pilot expansion failure diagnosis | `recipient_destination_validation_rejection` (metadata-only) |
| Broader live automation | all remains disabled |

**Next step:** Jason validates the approved destination number in his controlled store, then captures a
**fresh signed approval** before any further attempt — **not** a retry, **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Preserved manual execution evidence | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Expansion failure closeout | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-failure-closeout-build-199.json` |
| Expansion failure diagnosis | `backend/fixtures/native-workflow-demo-roofer/controlled-roofer-pilot-expansion-failure-diagnosis-build-199.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-199.json` |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-readonly.js` |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_ROOFER_PILOT_EXPANSION_FAILURE_CLOSEOUT_BUILD_199.md` |

## How to run (local-only, read-only)

```bash
# Full local-only expansion failure closeout + diagnosis verification + dry-run wrapper
bash scripts/run-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-dry-run.sh

# Verifier on its own
node backend/scripts/verify-native-workflow-fixture-controlled-roofer-pilot-expansion-failure-closeout-build-199-readonly.js
```

## What still gates the next expansion attempt

The consumed approval authorized exactly one Jason-operated message, which has now been attempted and
failed. Before any further attempt, Jason must validate the approved destination number in his
controlled store and capture a **fresh signed approval** (a new decision + final send approval +
send-time preflight), then run the existing fail-closed one-message runner **exactly once with no
retry** in his own controlled environment. This repo performs none of that. Launch remains
**pilot-gated, not unrestricted**, and the safety posture stays
`demo_ready_with_live_automation_disabled`.
