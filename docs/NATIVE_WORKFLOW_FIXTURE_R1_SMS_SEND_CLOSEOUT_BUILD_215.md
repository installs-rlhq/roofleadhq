# Native Workflow Fixture — R1 SMS Guarded Successful Send Closeout (Build 215)

**Type:** LOCAL-ONLY build that **closes out** the one approved, Jason-operated, **successful** guarded controlled
live **roofer** SMS send of variant **R1** (`new_lead_fast_response_alert`) using the **Build 213 fixed/guarded
message binding**. Records **names/booleans/codes only**. Capturing the closeout **is not a send**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL`** — the guarded R1 live
SMS was sent successfully and the recipient confirmed the exact R1 text was received; the next step is the **small
consenting roofer workflow validation packet**, not another send. **No send** is performed in this build. No retry,
no Twilio call, no live-runner live execution, no confirm token armed, no homeowner contact, no live automation, and
no unrestricted launch.

## Why this build exists

Build 214 captured Jason's fresh, signed, per-attempt **guarded** approval for one R1 SMS using the Build 213
fixed/guarded binding. Jason then ran the send-time preflight and the now-guarded one-message runner **exactly
once** in his controlled environment. This build records the **terminal result** of that single attempt and the
**recipient confirmation** that closes the loop opened in Build 212 (where the received copy was the stale generic
delivery-test text). Exactly **one attempt** was made, with no retry. Build 215 is kept **lean** — every artifact
directly supports closing the guarded R1 proof and moving to small consenting roofer workflow validation/selling.

## What was proven (the guarded R1 send + live match)

| Field | Value |
| --- | --- |
| gate_decision_before_execution | **CONTROLLED_LIVE_SMS_PERMITTED** |
| message_binding_bound_to_approved_selected_variant | **true** |
| outbound_body_equals_approved_selected_variant | **true** |
| preflight_status | **PERMITTED** |
| send_attempt_count | **1** |
| sms_sent | **true** |
| retry_performed | **false** |
| final_decision | **CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT** |
| exit_status | **0** |
| selected_variant / label | **R1** / **new_lead_fast_response_alert** |
| recipient_confirmed_sms_received | **true** |
| recipient_confirmed_actual_text_matches_r1 | **true** |
| recipient_confirmed_generic_copy_not_received | **true** |
| r1_message_binding_validated_live | **true** |
| r1_value_message_delivery_validated | **true** |
| approval_consumed / approval_expired_after_attempt | **true** / **true** |
| env_clear_check_passed | **true** |
| no_retry_allowed_after_success | **true** |

### Recipient confirmation (from Jason)

> RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're still
> looking. Reply STOP to opt out.

The **actual received text matched R1 exactly** (roofer-facing, SMS-only, with STOP **opt-out** language); the stale
generic delivery-test copy was **not** received this time.
SMS delivery **plus** approved-copy binding are now **proven end-to-end** — the Build 212 content mismatch did not
recur.

## Local corroboration — guarded binding resolves exactly R1 (read-only, no send)

The Build 215 verifier `require`s the Build 213 fixed/guarded runner module (side-effect-free — the live send path
is guarded behind `require.main === module`) and proves, dynamically:

- `runner.resolveOutboundBody()` **=== the approved R1 text** and **=== this closeout's `approved_message_text`**,
  and **!== the stale generic delivery-test copy**.
- `runner.assertOutboundBodyMatchesApprovedVariant(R1, approved)` returns **no** block reasons (permitted), and the
  same fail-closed guard **blocks** the stale generic copy.
- the preserved manual execution evidence records `message_binding.bound_to_approved_selected_variant=true` and
  `outbound_body_equals_approved_selected_variant=true`, with **no** recipient number and **no** message body stored.

## Strategic next decision packet

| Field | Value |
| --- | --- |
| decision | **GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL** |
| recommended_next_option | **small_consenting_roofer_workflow_validation_packet** |
| authorizes_send_now | **false** |
| next_live_send_requires_new_fresh_signed_approval | **true** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## Fastest pilot path (the fewest useful steps)

1. Select **1 to 3 consenting roofer** pilot recipients.
2. Use **guarded message binding only** (outbound body must equal the approved copy).
3. Send **one approved SMS per recipient** (or one small batch) **only after explicit signed approval** — one fresh
   signed per-attempt approval per recipient.
4. Validate **three things only**: (a) message received and matched expected copy, (b) roofer understands value,
   (c) roofer wants to continue into workflow validation / sales conversation.
5. **Move immediately from proof SMS to the sales/pilot conversation.**

**No homeowner contact** yet unless separately approved. **No unrestricted launch.** No live automation activation
beyond explicitly approved Jason-operated SMS attempts.

## Lean feedback-capture template (capture only; no send during capture)

`sms_received_status`, `message_match_status`, `value_understood_status`, `useful_for_roofer_status`,
`wants_next_step_status`, `sales_or_pilot_interest_status`, `requested_changes_summary` — all **pending** until real
roofer feedback / Jason review is recorded.

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved.** The one sent R1 SMS was roofer-facing only.
`homeowner_facing_sms_approved_now=false`, `requires_separate_consent_and_approval=true`,
`homeowner_contact_authorized=false`, `approved_for_homeowner_send=false`. Any homeowner-facing message requires
separate consent capture and a separate signed approval.

## What Build 215 does (and does not do)

Build 215 **does**: capture the successful guarded R1 send closeout (names/booleans/codes only), record the
recipient's exact-R1-match confirmation, record the strategic next decision packet, the lean fastest-pilot-path and
feedback-capture template, **corroborate dynamically** that the guarded runner resolves exactly R1, update the
launch-readiness summary, and carry forward the primary remaining objective.

Build 215 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm token, run
any retry, run the live execution runner live, make any Twilio/network/external call, contact any roofer or
homeowner, read/store/record any secret value/SID/token/recipient phone number/production data, authorize a send
now, authorize unrestricted launch, authorize homeowner contact, activate live automation, add any public route/
cron/scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or touch schema/
auth/RLS/security. All broader live automation remains **disabled**. Capturing the closeout is **not** a send.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message delivered (1 attempt, no retry); **content value now validated** (R1 received exactly) |
| Pilot SMS copy selection (Build 210) | **R1 selected** |
| R1 content-mismatch feedback + fix (Build 213) | received copy was generic; root cause fixed; **binding fixed + fail-closed guard + verified locally** |
| R1 guarded send approval (Build 214) | fresh signed guarded approval captured |
| R1 guarded send closeout (Build 215) | **guarded R1 sent successfully; recipient confirmed exact R1 text; binding validated LIVE; `GUARDED_R1_LIVE_DELIVERY_CONFIRMED_SMALL_ROOFER_PILOT_READY_FOR_APPROVAL`** |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

## Primary remaining objective (carried forward)

**Get RoofLeadHQ to live roofer workflow testing and selling within the next few days.** Fewer, bigger, strategic
builds only — avoid rework and non-focused builds. Every next build must directly advance live roofer testing, sales
readiness, or a hard blocker. The fewest-build path from here: Build 215 closes the guarded R1 proof (**done**) →
Jason selects 1–3 consenting roofers, each with its own fresh signed per-attempt guarded approval → run one guarded
Jason-operated SMS per recipient (or one small approved batch), no retry → validate the three things and **move
immediately from proof SMS to the sales/pilot conversation**. **Next move is small consenting roofer workflow
validation/selling, not more infrastructure scaffolding.**

## Artifacts

| Artifact | Path |
| --- | --- |
| Guarded successful send closeout packet | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-215.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-215.json` |
| Read-only verifier | `backend/scripts/verify-r1-sms-send-closeout-build-215-readonly.js` |
| Dry-run wrapper | `scripts/run-r1-sms-send-closeout-build-215-dry-run.sh` |
| Prior guarded approval packet (Build 214) | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-214.json` |
| Guarded live runner (binding fixed in Build 213) | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_CLOSEOUT_BUILD_215.md` |

## How to run (local-only, read-only)

```bash
# Full local-only guarded successful send closeout verification + dry-run wrapper
bash scripts/run-r1-sms-send-closeout-build-215-dry-run.sh

# Verifier on its own
node backend/scripts/verify-r1-sms-send-closeout-build-215-readonly.js
```

## What still gates any further live send

This build **closes out the successful guarded R1 send** but performs **no send**, **no retry**, and makes no
Twilio/network call. The single-use approval is **consumed and expired**. Before any further live send, Jason must
capture a **NEW fresh signed per-attempt approval** (one per recipient), run the **send-time preflight**, and then
the guarded fail-closed one-message runner **exactly once with no retry** in his own controlled environment,
entering the destination **silently outside repo/chat/logs**. Launch remains **pilot-gated, not unrestricted**, and
the safety posture stays `demo_ready_with_live_automation_disabled`.
