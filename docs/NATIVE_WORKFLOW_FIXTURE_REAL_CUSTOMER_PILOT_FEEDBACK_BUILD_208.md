# Native Workflow Fixture — CORRECTED Real-Customer Pilot Feedback Capture + Next Decision Packet (Build 208)

**Type:** LOCAL-ONLY **corrected** real-customer pilot **feedback-capture** + **next-decision** packet.
Corrects Build 207 (which closed with `feedback_captured=false` because the bracketed feedback fields were
left unchanged) by capturing Jason's **actual** roofer-feedback summary (names/booleans/codes only) and
recording the next decision packet plus four **unsigned** options. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND`** — analyze/revise the generic SMS
workflow copy before any further live send, then a Jason decision. No copy-revision send, expansion,
homeowner contact, or unrestricted launch is approved.

## Why this build exists

Build 205 sent the real-customer pilot one-message SMS (Jason-operated, 1 attempt, no retry, Build 204
approval consumed) and it succeeded **technically**. Build 206 recorded the post-pilot observation; Build
207 attempted feedback capture but the placeholder fields were left unchanged, so it closed with
`feedback_captured=false`. Build 208 **corrects** that by recording Jason's actual feedback and the next
decision — without sending anything and without authorizing any further live action.

## Corrected Jason feedback summary (as captured)

| Field | Value |
| --- | --- |
| feedback_captured | **true** |
| sms_received_status | **yes** |
| message_clarity_status | **yes_as_technical_delivery_test_only** |
| value_understood_status | **no_generic_test_message_only** |
| continue_testing_status | **yes_for_delivery_proof_only** |
| requested_changes_summary_names_only | Analyze and replace the generic test SMS copy before any future real workflow or customer-facing message. (The text sent was generic delivery-test copy only.) |
| workflow_message_content_analysis_needed | **true** |
| current_message_was_generic_delivery_test | **true** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |
| no_live_action_during_feedback_capture | **true** |

**Interpretation:** delivery worked and the message was understandable *as a technical delivery test*, but
the content was generic test copy that did **not** demonstrate RoofLeadHQ's value. Jason will keep testing
**for delivery proof only** and asks that the SMS workflow copy be analyzed/replaced before any real
workflow or customer-facing message. Recorded as names/booleans/codes only — no phone numbers, SIDs,
tokens, secret values, or production data.

## 1. Next decision packet

| Field | Value |
| --- | --- |
| decision | **MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND** |
| recommended_option | **A_revise_message_copy_only_no_send** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_fresh_signed_approval | **true** |

## 2. Recommended next options (UNSIGNED)

- **Option A** *(recommended)* — analyze/revise SMS workflow copy only, no send.
- **Option B** — one more pilot SMS after copy revision, one message, no retry.
- **Option C** — prepare homeowner-facing consent/opt-out copy, no send.
- **Option D** — pause live testing and improve intake/reporting flow.

`approval_signed=false`, `approval_granted=false`, `authorizes_live_action_now=false`. None of these
options is approved by this build; each live option would require a new, explicit, per-attempt signed
approval.

## What Build 208 does (and does not do)

Build 208 **does**: capture the corrected real-customer pilot feedback evidence (names/booleans/codes only,
`feedback_captured=true`), record the `MESSAGE_COPY_ANALYSIS_REQUIRED_BEFORE_NEXT_LIVE_SEND` decision with
recommended option A and four unsigned options, update the launch-readiness summary, and verify all of the
above read-only.

Build 208 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
token, run any retry, make any Twilio/network/external call, contact any roofer or homeowner,
read/store/record any secret value/SID/token/recipient phone number/production data, authorize copy-revision
sends, authorize expansion, authorize homeowner contact, activate live automation, add any public
route/cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or
touch schema/auth/RLS/security. All broader live automation remains **disabled**.

## 3. Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message succeeded (1 attempt, no retry) |
| First controlled roofer pilot one-message SMS | **succeeded** (1 attempt, no retry), Jason-operated |
| Controlled pilot expansion retry send | **succeeded** (1 attempt, no retry), Jason-operated |
| Real-customer pilot one-message SMS | **succeeded technically** (1 attempt, no retry); generic delivery-test copy **did not validate value** |
| Post-pilot feedback | **captured** (`feedback_captured=true`); message-copy analysis needed |
| Homeowner contact | **not authorized** |
| Broader live automation | all remains disabled |

**Narrative:** the controlled test SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; the real-customer pilot one-message SMS
**succeeded technically** but the **generic delivery-test copy did not validate RoofLeadHQ value**; the
**corrected feedback is captured**; **no homeowner contact** is authorized; broader live automation
**remains disabled**; the next step is **message-copy/workflow-content analysis before any further live
send**, then a Jason decision — not unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Corrected feedback + next-decision packet | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-208.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-208.json` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-feedback-build-208-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-feedback-build-208-dry-run.sh` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Prior feedback (Build 207, uncorrected) | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-207.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_FEEDBACK_BUILD_208.md` |

## How to run (local-only, read-only)

```bash
# Full local-only corrected feedback capture verification + dry-run wrapper
bash scripts/run-real-customer-pilot-feedback-build-208-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-feedback-build-208-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval was consumed by the Build 205 send. **No new approval exists.** Any
further live send — including Option B (one more pilot SMS after copy revision) or any homeowner contact —
requires a new, explicit, **per-attempt** signed approval (a fresh decision + final send approval +
send-time preflight) and Jason running the existing fail-closed one-message runner **exactly once with no
retry** in his own controlled environment. This repo performs none of that. Launch remains **pilot-gated,
not unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
