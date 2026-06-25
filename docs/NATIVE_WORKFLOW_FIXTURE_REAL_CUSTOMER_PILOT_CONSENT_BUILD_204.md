# Native Workflow Fixture — Real-Customer Pilot Consent/Readiness + Final One-Message Approval/Preflight Packet (Build 204)

**Type:** LOCAL-ONLY real-customer pilot **consent/readiness capture** + **final Jason-operated
one-message approval/preflight** packet. Records markers from what Jason confirmed **outside the
repo/chat**. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Preflight decision:** **`READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND`**
**Homeowner contact authorized:** **false.** **Build/Claude send authorized:** **false.**

## Why this build exists

Build 203 recorded the decision `REAL_CUSTOMER_PILOT_REVIEW_REQUIRED` with an **UNSIGNED** approval
template — it authorized nothing. Jason has since confirmed, **outside the repo/chat**, that **one real
roofer/customer** has agreed to a controlled pilot, that an **approved SMS destination marker** exists
**without storing any phone number**, and that **STOP/opt-out language is finalized**. Build 204
captures those consent/readiness markers, records Jason's **signed** final one-message approval, and
produces a **send-time preflight gate** that is **READY** for a Jason-operated one-message send.

Build 204 prepares a **fail-closed, Jason-operated** one-message send step that **Jason may run
separately** in his controlled environment with live credentials, the approved destination, and a
deliberate confirm token. **This build sends nothing.**

## Consent / readiness markers (recorded markers only)

| Marker | Value |
| --- | --- |
| real_roofer_customer_consent_marker_present | **true** |
| approved_destination_marker_present | **true** |
| approved_destination_number_recorded | **false** |
| stop_opt_out_language_finalized | **true** |
| homeowner_contact_authorized | **false** |
| sms_only | **true** |
| max_message_count | **1** |
| retry_allowed | **false** |
| production_automation_allowed | **false** |
| unrestricted_launch | **false** |

## Final signed one-message approval

The signed approval (`real-customer-pilot-final-one-message-approval-build-204-signed.json`) records:

- `approval_signed=true`
- `authorizes_jason_operated_one_message_send=true`
- `authorizes_build_environment_send=false`
- `authorizes_homeowner_contact=false`
- `authorizes_unrestricted_launch=false`

It is **one-time / per-attempt**, SMS-only, one message, no retry, Jason-operated only. It does **not**
authorize Claude or the build environment to send, and it does **not** authorize homeowner contact.

## Send-time preflight gate

The preflight gate (`real-customer-pilot-send-time-preflight-build-204.json`) records:

- `decision=READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND`
- `send_attempt_count=0`
- `sms_sent=false`
- `live_send_executed_by_build=false`
- `no_network_external_action=true`
- `no_secret_values_recorded=true`
- `no_phone_number_recorded=true`

It arms **no** confirm token. The send remains a separate, Jason-operated action.

## What Build 204 does (and does not do)

Build 204 **does**: record the real-customer pilot consent/readiness markers; record Jason's signed
final one-message approval; produce a READY send-time preflight gate; provide the Jason-operated send
command runbook; update the launch-readiness summary; verify all of the above read-only.

Build 204 **does not**: send an SMS; construct a Twilio client; call `messages.create`; arm any confirm
token; run any retry; make any Twilio/network/external call; contact any roofer or homeowner;
read/store/record any secret value/SID/token/recipient phone number/production data; authorize Claude
or the build environment to send; authorize homeowner contact; authorize unrestricted launch; activate
live automation; add any public route/cron/scheduler/webhook/dispatcher/CRM/billing/quote/invoice/
deposit/email/call/calendar automation; or touch schema/auth/RLS/security. All broader live automation
remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion **retry** send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot consent markers | **captured** (consent, destination marker, STOP/opt-out final) |
| Final one-message approval | **signed** (Jason-operated send only) |
| Send-time preflight | **READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND** |
| Broader live automation | all remains disabled |

**Narrative:** the controlled live SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; real-customer pilot **consent markers are
captured**; the final one-message approval is **signed**; broader live automation **remains disabled**;
the next step is a **Jason-operated one-message real-customer pilot send**, not unrestricted launch.

**Next step:** Jason runs the existing fail-closed one-message runner **exactly once, no retry**, in his
own controlled environment under the **signed Build 204** approval — **not** unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Consent/readiness markers | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-consent-readiness-build-204.json` |
| Signed one-message approval | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-final-one-message-approval-build-204-signed.json` |
| Send-time preflight gate | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-send-time-preflight-build-204.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-204.json` |
| Jason-operated send command runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_JASON_OPERATED_ONE_MESSAGE_SEND_COMMAND_RUNBOOK_BUILD_204.md` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-consent-build-204-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-consent-build-204-dry-run.sh` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_CONSENT_BUILD_204.md` |

## How to run (local-only, read-only)

```bash
# Full local-only real-customer pilot consent verification + dry-run wrapper
bash scripts/run-real-customer-pilot-consent-build-204-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-consent-build-204-readonly.js
```

## What still gates any further live action

The first **real-customer** live send is a separate, deliberate, **Jason-operated** action: Jason runs
the existing fail-closed one-message runner **exactly once with no retry** in his own controlled
environment with live credentials and the approved destination (never stored in the repo). Any
**homeowner-facing** message requires a **separate** approval — Build 204 does **not** authorize it.
This repo performs none of that. Launch remains **pilot-gated, not unrestricted**, and the safety
posture stays `demo_ready_with_live_automation_disabled`.
