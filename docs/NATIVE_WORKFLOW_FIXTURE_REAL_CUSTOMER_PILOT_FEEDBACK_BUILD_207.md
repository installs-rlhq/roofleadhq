# Native Workflow Fixture — Real-Customer Pilot Feedback Capture + Next Decision Packet (Build 207)

**Type:** LOCAL-ONLY real-customer pilot **feedback-capture** + **next-decision** packet.
Captures Jason's roofer-feedback summary (names/booleans/codes only) and records the next decision packet
plus four **unsigned** recommended options. Performs **no live action**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`NEXT_ACTION_REVIEW_REQUIRED`** — Jason provides roofer feedback, then a Jason decision. No
copy-revision send, expansion, homeowner contact, or unrestricted launch is approved.

## Why this build exists

Build 205 sent the real-customer pilot one-message SMS (Jason-operated, 1 attempt, no retry, Build 204
approval consumed) and it **succeeded**. Build 206 recorded the post-pilot observation and the
`POST_PILOT_FEEDBACK_REQUIRED` decision. Build 207 captures Jason's roofer-feedback summary and prepares the
next **decision** — without sending anything and without authorizing any further live action.

## Jason feedback summary (as captured)

Jason left **every** bracketed feedback item unchanged in the Build 207 instructions. Per the rule "if Jason
leaves any bracketed item unchanged, record it as `not_provided_by_jason`," each field is recorded as
`not_provided_by_jason` and `feedback_captured=false` (feedback remains pending).

| Field | Value |
| --- | --- |
| feedback_captured | **false** |
| sms_received_status | **not_provided_by_jason** |
| message_clarity_status | **not_provided_by_jason** |
| value_understood_status | **not_provided_by_jason** |
| continue_testing_status | **not_provided_by_jason** |
| requested_changes_summary_names_only | **not_provided_by_jason** |
| no_secret_values_recorded | **true** |
| no_phone_number_recorded | **true** |
| no_live_action_during_feedback_capture | **true** |

Record answers as names/booleans/codes only — never phone numbers, SIDs, tokens, secret values, or
production data.

## 1. Next decision packet

| Field | Value |
| --- | --- |
| decision | **NEXT_ACTION_REVIEW_REQUIRED** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |
| next_live_send_requires_fresh_signed_approval | **true** |

## 2. Recommended next options (UNSIGNED)

- **Option A** — revise message copy only, no send.
- **Option B** — one more roofer SMS after copy revision, one message, no retry.
- **Option C** — prepare homeowner-facing consent/opt-out copy, no send.
- **Option D** — pause live testing and improve intake/reporting flow.

`approval_signed=false`, `approval_granted=false`, `authorizes_live_action_now=false`. None of these
options is approved by this build; each live option would require a new, explicit, per-attempt signed
approval.

## What Build 207 does (and does not do)

Build 207 **does**: capture the real-customer pilot feedback evidence (names/booleans/codes only, all
`not_provided_by_jason` this round), record the `NEXT_ACTION_REVIEW_REQUIRED` decision and four unsigned
recommended options, update the launch-readiness summary, and verify all of the above read-only.

Build 207 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm
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
| Real-customer pilot one-message SMS | **succeeded** (1 attempt, SMS sent, no retry), Jason-operated |
| Post-pilot feedback | **pending** (Jason left all brackets unchanged; `feedback_captured=false`) |
| Homeowner contact | **not authorized** |
| Broader live automation | all remains disabled |

**Narrative:** the controlled test SMS to Jason **succeeded**; the first controlled roofer pilot
**succeeded**; the controlled expansion retry **succeeded**; the **real-customer pilot one-message SMS
succeeded**; **post-pilot feedback is pending** (`feedback_captured=false`); **no homeowner contact** is
authorized; broader live automation **remains disabled**; the next step is a **Jason decision after
feedback**, not unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Feedback + next-decision packet | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-feedback-build-207.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-207.json` |
| Read-only verifier | `backend/scripts/verify-real-customer-pilot-feedback-build-207-readonly.js` |
| Dry-run wrapper | `scripts/run-real-customer-pilot-feedback-build-207-dry-run.sh` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| Prior observation (Build 206) | `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-observation-build-206.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_FEEDBACK_BUILD_207.md` |

## How to run (local-only, read-only)

```bash
# Full local-only feedback capture verification + dry-run wrapper
bash scripts/run-real-customer-pilot-feedback-build-207-dry-run.sh

# Verifier on its own
node backend/scripts/verify-real-customer-pilot-feedback-build-207-readonly.js
```

## What still gates any further live action

The one-time Build 204 approval was consumed by the Build 205 send. **No new approval exists.** Any
further live send — including Option B (one more roofer SMS after copy revision) or any homeowner contact —
requires a new, explicit, **per-attempt** signed approval (a fresh decision + final send approval +
send-time preflight) and Jason running the existing fail-closed one-message runner **exactly once with no
retry** in his own controlled environment. This repo performs none of that. Launch remains **pilot-gated,
not unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
