# Native Workflow Fixture — R1 SMS Send Successful Closeout (Build 212)

**Type:** LOCAL-ONLY packet that **closes out** the one approved, Jason-operated, **successful** controlled
live **roofer** SMS send of Build 210/211 selected variant **R1** (`new_lead_fast_response_alert`). Records
the observed terminal result of that single approved attempt — **names/booleans/codes only**. Performs **no
live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED`** — the next step is to **collect roofer
feedback only** on the one sent R1 SMS. **Capturing the closeout is not a send.** No send is performed, no
retry, no confirm token is armed, no homeowner contact, no live automation, and no unrestricted launch is
performed in this build. Any further live send requires a **new, fresh, signed, per-attempt approval**.

## Why this build exists

Build 211 captured Jason's fresh signed per-attempt approval for one Jason-operated R1 SMS, leaving the
decision `R1_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED`. Jason then ran the send-time preflight
and the existing fail-closed one-message runner **exactly once** in his own controlled environment. That one
approved attempt **succeeded**. Build 212 **closes out** that result locally — recording
**names/booleans/codes only** — and sets the next step as **feedback capture only**. This build **does not
send** and does **not** retry.

## Observed terminal result captured (names/booleans/codes only)

| Field | Value |
| --- | --- |
| gate_decision_before_execution | **CONTROLLED_LIVE_SMS_PERMITTED** |
| preflight_status | **PERMITTED** |
| send_attempt_count | **1** |
| sms_sent | **true** |
| retry_performed | **false** |
| final_decision | **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** |
| exit_status | **0** |
| selected_variant | **R1** |
| selected_variant_label | **new_lead_fast_response_alert** |
| approval_consumed | **true** |
| approval_expired_after_attempt | **true** |
| env_clear_check_passed | **true** |
| no_retry_allowed_after_success | **true** |

**Closed-out R1 text (roofer-facing, SMS-only, opt-out included) — matches Build 210/211 exactly:**

> "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're
> still looking. Reply STOP to opt out."

The verifier confirms the closed-out R1 text matches the Build 211 approval and the Build 210 selection
**exactly**, is roofer-facing + SMS-only, includes STOP opt-out language, and carries no
guarantee/booked-jobs/estimate/quote/invoice/payment/deposit claims.

### Post-send env-clear check (names only)

The observed post-send env-clear status is recorded by **name only** (cleared booleans). No secret value,
phone number, SID, or token value is read or recorded. Cleared env names: `TWILIO_LIVE_ACCOUNT_SID`,
`TWILIO_LIVE_AUTH_TOKEN`, `TWILIO_LIVE_FROM_NUMBER`, `CONTROLLED_LIVE_SMS_TO_NUMBER`,
`CONTROLLED_LIVE_SMS_CONFIRM`, `RAW_NUMBER`, `CLEAN_NUMBER`.

## Safety evidence (no live action during closeout)

| Field | Value |
| --- | --- |
| no_live_action_during_closeout | **true** |
| no_additional_sms_sent_during_closeout | **true** |
| no_twilio_call_during_closeout | **true** |
| no_network_external_call_during_closeout | **true** |
| no_roofer_or_homeowner_contact_during_closeout | **true** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |
| no_raw_sid_recorded | **true** |
| no_production_data_used | **true** |
| live_automation_remains_disabled | **true** |

## Next decision packet

| Field | Value |
| --- | --- |
| decision | **R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED** |
| recommended_next_option | **collect_roofer_feedback_only_no_send** |
| authorizes_send_now | **false** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_new_fresh_signed_approval | **true** |

## Feedback capture template (capture-only; no send during capture)

A capture-only template Jason fills in **outside this build** when collecting roofer feedback on the one sent
R1 SMS. All fields start **pending**; no send occurs during feedback capture
(`no_send_during_feedback_capture_required=true`):

- `sms_received_status` = **pending_roofer_feedback**
- `message_clarity_status` = **pending_roofer_feedback**
- `value_understood_status` = **pending_roofer_feedback**
- `reply_or_action_taken_status` = **pending_roofer_feedback**
- `continue_testing_status` = **pending_jason_review**
- `requested_changes_summary` = **pending_roofer_feedback**

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved.** The one sent R1 SMS was roofer-facing only.
`homeowner_facing_sms_approved_now=false`, `requires_separate_consent_and_approval=true`,
`homeowner_contact_authorized=false`, `approved_for_homeowner_send=false`. Any homeowner-facing message
requires separate consent capture and a separate signed approval.

## What Build 212 does (and does not do)

Build 212 **does**: record the observed terminal result of the one approved Jason-operated R1 SMS send
(`r1_send_closeout_captured=true`, `sms_sent=true`, `send_attempt_count=1`, `retry_performed=false`,
`final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`, `exit_status=0`), record that the single-use approval
is **consumed and expired** and the post-send env-clear check passed, record the
`R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED` decision and a feedback-capture template, update the
launch-readiness summary, and verify all of the above read-only.

Build 212 **does not**: send an SMS, send any additional SMS, construct a Twilio client, call
`messages.create`, arm the confirm token, run any retry, make any Twilio/network/external call, contact any
roofer or homeowner, read/store/record any secret value/SID/token/recipient phone number/production data,
authorize a send now, authorize expansion, authorize homeowner contact, activate live automation, add any
public route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM
automation, or touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| Real-customer pilot one-message SMS | **delivery succeeded** (1 attempt, no retry); generic delivery-test copy **did not validate value** |
| Pilot SMS copy analysis (Build 209) | **SMS mechanics proven**; copy **revised for review** (5 variants) |
| Pilot SMS copy selection (Build 210) | **R1 selected** for next controlled roofer pilot review |
| R1 SMS send approval (Build 211) | **Jason's fresh signed approval captured** for one Jason-operated R1 SMS |
| R1 SMS send closeout (Build 212) | **one Jason-operated R1 SMS sent successfully** (1 attempt, no retry); approval **consumed/expired**; `R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

**Narrative:** SMS mechanics are proven; Build 210 selected R1; Build 211 captured Jason's fresh signed
approval; **Build 212 closes out one successful Jason-operated R1 SMS send** (one attempt, no retry) — capturing
the closeout is **not** a send; the single-use approval is now **consumed and expired**; homeowner-facing copy
is **not approved**; the next step is to **collect roofer feedback only**, **not another send**, and not
unrestricted launch. Any further live send requires a **new, fresh, signed, per-attempt approval**.

## Artifacts

| Artifact | Path |
| --- | --- |
| Successful closeout packet | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-212.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-212.json` |
| Read-only verifier | `backend/scripts/verify-r1-sms-send-closeout-build-212-readonly.js` |
| Dry-run wrapper | `scripts/run-r1-sms-send-closeout-build-212-dry-run.sh` |
| Prior signed-approval packet (Build 211) | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_CLOSEOUT_BUILD_212.md` |

## How to run (local-only, read-only)

```bash
# Full local-only successful-closeout verification + dry-run wrapper
bash scripts/run-r1-sms-send-closeout-build-212-dry-run.sh

# Verifier on its own
node backend/scripts/verify-r1-sms-send-closeout-build-212-readonly.js
```

## What still gates any further live send

This build **closes out** the one successful approved send but performs **no send** and **no retry**. The
single-use approval is **consumed and expired**. Before any further live send Jason must capture a **new,
fresh, signed, per-attempt approval**, then run the send-time preflight and the existing fail-closed
one-message runner **exactly once with no retry** in his own controlled environment, entering the destination
**silently outside repo/chat/logs**. This repo performs none of that. The immediate next step is to **collect
roofer feedback only**, not a send. Launch remains **pilot-gated, not unrestricted**, and the safety posture
stays `demo_ready_with_live_automation_disabled`.
