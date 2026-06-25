# Native Workflow Fixture — R1 SMS Send Signed Approval Capture (Build 211)

**Type:** LOCAL-ONLY packet that **captures** Jason's fresh, signed, per-attempt approval for **one**
Jason-operated controlled live **roofer** SMS send using Build 210 selected variant **R1**
(`new_lead_fast_response_alert`). Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED`** — the next step is a **send-time
preflight** before any **one** Jason-operated SMS attempt. **Capturing approval is not a send.** No send is
performed, no confirm token is armed, no homeowner contact, no live automation, and no unrestricted launch is
performed in this build.

## Why this build exists

Build 210 resolved the copy review by selecting roofer-facing variant **R1** for the next controlled pilot
and prepared an **unsigned** approval/preflight template, leaving the decision
`R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED`. Build 211 captures Jason's **fresh signed** per-attempt
approval for one Jason-operated R1 SMS — recording **names/booleans/codes only** — and prepares the
**send-time preflight** as the explicit next step. This build **does not send**.

## Exact approval statement captured

> I, Jason Lohse, approve one Jason-operated controlled live roofer SMS send using Build 210 selected variant
> R1 only: "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while
> they're still looking. Reply STOP to opt out." Scope: one SMS only, SMS-only, no retry, no homeowner
> contact, no live automation activation, no unrestricted launch, no production data, no secrets/phone numbers
> recorded in repo/chat/logs, destination entered silently outside repo/chat/logs, send-time preflight
> required before any attempt, and approval expires after one attempt whether sent or failed.

The verifier confirms the approved R1 text matches the Build 210 selection and the Build 209 R1 variant
**exactly**, is roofer-facing + SMS-only, includes STOP opt-out language, and carries no
guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims.

## 1. Signed approval capture evidence

| Field | Value |
| --- | --- |
| approval_signed | **true** |
| approval_granted | **true** |
| selected_message_variant | **R1** |
| selected_variant_label | **new_lead_fast_response_alert** |
| max_message_count | **1** |
| sms_only | **true** |
| retry_allowed | **false** |
| jason_operated_send_only | **true** |
| build_environment_send | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_activation_authorized | **false** |
| unrestricted_launch_authorized | **false** |
| production_data_authorized | **false** |
| destination_entry_silent_outside_repo_chat_logs_required | **true** |
| secrets_phone_numbers_not_recorded_required | **true** |
| send_time_preflight_required | **true** |
| approval_expires_after_one_attempt_whether_sent_or_failed | **true** |

**Approved R1 text (roofer-facing, SMS-only, opt-out included):**

> "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're
> still looking. Reply STOP to opt out."

## 2. Next decision packet

| Field | Value |
| --- | --- |
| decision | **R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED** |
| recommended_next_option | **run_send_time_preflight_before_one_jason_operated_sms_attempt** |
| authorizes_send_now | **false** |
| send_time_preflight_required | **true** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## 3. Send-time preflight checklist

A **fail-closed** checklist Jason would follow **outside this build** at send time, **after** this captured
approval and **before** any one Jason-operated SMS attempt (`armed_by_build=false`,
`executed_by_build=false`):

- source secrets from `/root/roofleadhq-local-secrets/live-sms.env`
- enter destination silently outside repo/chat/logs
- convert destination to E.164
- names-only env presence check
- verify selected R1 message text
- verify exactly one attempt
- verify no retry
- verify no homeowner contact
- verify no live automation activation
- unset env values after attempt

This build reads **no** secret values, records **no** destination, and arms **no** confirm token.

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved.** R1 is roofer-facing only.
`homeowner_facing_sms_approved_now=false`, `requires_separate_consent_and_approval=true`,
`homeowner_contact_authorized=false`, `approved_for_homeowner_send=false`. Any homeowner-facing message
requires separate consent capture and a separate signed approval.

## What Build 211 does (and does not do)

Build 211 **does**: capture Jason's fresh signed per-attempt approval for one Jason-operated R1 SMS
(`approval_signed=true`, `approval_granted=true`) with the exact approved scope, record the
`R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED` decision, record a fail-closed send-time preflight
checklist, update the launch-readiness summary, and verify all of the above read-only.

Build 211 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, authorize a send now,
authorize expansion, authorize homeowner contact, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or
touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## 4. Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| Real-customer pilot one-message SMS | **delivery succeeded** (1 attempt, no retry); generic delivery-test copy **did not validate value** |
| Pilot SMS copy analysis (Build 209) | **SMS mechanics proven**; copy **revised for review** (5 variants) |
| Pilot SMS copy selection (Build 210) | **R1 selected** for next controlled roofer pilot review; `R1_COPY_SELECTED_NEXT_SEND_APPROVAL_REQUIRED` |
| R1 SMS send approval (Build 211) | **Jason's fresh signed approval captured** for one Jason-operated R1 SMS; `R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

**Narrative:** SMS mechanics are proven; Build 210 selected R1; **Build 211 captures Jason's fresh signed
approval** for one Jason-operated R1 SMS — capturing approval is **not** a send; the approval is single-use
and **expires after one attempt whether sent or failed**; homeowner-facing copy is **not approved**; the next
step is a **send-time preflight** before one Jason-operated SMS attempt, **not a send now**, and not
unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Signed approval capture packet | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-211.json` |
| Read-only verifier | `backend/scripts/verify-r1-sms-send-approval-build-211-readonly.js` |
| Dry-run wrapper | `scripts/run-r1-sms-send-approval-build-211-dry-run.sh` |
| Prior copy-selection packet (Build 210) | `backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-selection-build-210.json` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_APPROVAL_BUILD_211.md` |

## How to run (local-only, read-only)

```bash
# Full local-only signed-approval-capture verification + dry-run wrapper
bash scripts/run-r1-sms-send-approval-build-211-dry-run.sh

# Verifier on its own
node backend/scripts/verify-r1-sms-send-approval-build-211-readonly.js
```

## What still gates any live send

This build **captures the approval** but performs **no send**. Before any live send Jason must run the
**send-time preflight** (above) and then run the existing fail-closed one-message runner **exactly once with
no retry** in his own controlled environment, entering the destination **silently outside repo/chat/logs**.
The approval is **single-use** and **expires after one attempt whether sent or failed** — a further send
would require a new, explicit, **per-attempt** signed approval. This repo performs none of that. The immediate
next step is a **send-time preflight**, not a send now. Launch remains **pilot-gated, not unrestricted**, and
the safety posture stays `demo_ready_with_live_automation_disabled`.
