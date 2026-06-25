# Native Workflow Fixture — R1 SMS Guarded Send Fresh Signed Approval Capture (Build 214)

**Type:** LOCAL-ONLY build that **captures Jason's fresh, signed, per-attempt approval** for **one**
Jason-operated controlled live **roofer** SMS send using the **Build 213 fixed/guarded R1 message binding**
(variant **R1**, `new_lead_fast_response_alert`). Records **names/booleans/codes only**. Capturing approval
**is not a send**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED`** — the fresh guarded
approval is captured; the next step is a **send-time preflight** and then **exactly one guarded Jason-operated
SMS attempt**. **No send** is performed in this build. No retry, no Twilio call, no live-runner live execution,
no confirm token armed, no homeowner contact, no live automation, and no unrestricted launch.

## Why this build exists

Build 212 sent one approved Jason-operated R1 SMS and **consumed/expired** the single-use approval. Build 213
found the received copy was still the older **generic delivery-test copy** (delivery validated, R1 value
messaging not validated), **root-caused** it to a hardcoded generic body with a missing selected-variant
binding, and **fixed + guarded** the live runner: the outbound body is now bound to the approved selected
variant and a **fail-closed guard** blocks any send whose body is not exactly the approved R1 text. Build 213's
decision required a **new fresh signed approval before the next send**.

Build 214 is that **required gate**: it captures the new fresh signed approval so Jason can immediately run a
send-time preflight and then the now-guarded one-message runner exactly once. The build is kept **lean** — every
artifact directly supports the next guarded one-message R1 send.

## Exact approved statement (captured)

> I, Jason Lohse, approve one Jason-operated controlled live roofer SMS send using the Build 213 fixed/guarded
> R1 message binding only.

## Approved message (variant R1 — roofer-facing, SMS-only, opt-out included)

> "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're still
> looking. Reply STOP to opt out."

## Signed approval capture evidence (names/booleans/codes only)

| Field | Value |
| --- | --- |
| approval_signed | **true** |
| approval_granted | **true** |
| build_213_message_binding_fix_required | **true** |
| build_213_message_binding_fix_verified | **true** |
| selected_message_variant | **R1** |
| selected_variant_label | **new_lead_fast_response_alert** |
| approved_message_text | **(exact R1 text above)** |
| guarded_message_binding_required | **true** |
| outbound_body_must_equal_approved_message | **true** |
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

## Local proof — guarded binding will deliver exactly R1 (read-only, no send)

The Build 214 verifier `require`s the Build 213 fixed/guarded runner module (side-effect-free — the live send
path is guarded behind `require.main === module`) and proves, dynamically:

- `runner.resolveOutboundBody()` **=== the approved R1 text** and **=== this packet's `approved_message_text`**,
  and **!== the stale generic delivery-test copy**.
- `runner.assertOutboundBodyMatchesApprovedVariant(R1, approved)` returns **no** block reasons (permitted).
- the same fail-closed guard **blocks** the stale generic copy (flagging
  `outbound_body_is_stale_generic_delivery_test_copy`), blocks any non-approved body, and blocks an empty body.
- the runner's `messages.create` body is bound to `resolvedBody`, not a hardcoded generic literal.

This proves the next guarded send will deliver **exactly the freshly-approved R1 text** — the Build 212
content-mismatch cannot recur.

## Next decision packet

| Field | Value |
| --- | --- |
| decision | **R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED** |
| recommended_next_option | **run_send_time_preflight_then_one_guarded_jason_operated_sms_attempt** |
| authorizes_send_now | **false** |
| send_time_preflight_required | **true** |
| guarded_message_binding_required | **true** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## Send-time preflight checklist (Jason runs OUTSIDE this build; this build arms/executes nothing)

1. source secrets **only** from `/root/roofleadhq-local-secrets/live-sms.env`
2. enter destination **silently outside repo/chat/logs**; convert to E.164 outside repo/chat/logs
3. names-only env presence check
4. verify approved message equals R1 exactly
5. verify **guarded resolved outbound body equals approved R1 exactly**
6. verify resolved outbound body is **not** generic delivery-test copy
7. verify exactly one attempt; no retry
8. verify no homeowner contact; no live automation activation
9. unset env values after attempt

`armed_by_build=false`, `executed_by_build=false`, `confirm_token_armed_by_build=false`.

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved.** This approval is for the one roofer-facing R1 SMS only.
`homeowner_facing_sms_approved_now=false`, `requires_separate_consent_and_approval=true`,
`homeowner_contact_authorized=false`, `approved_for_homeowner_send=false`. Any homeowner-facing message requires
separate consent capture and a separate signed approval.

## What Build 214 does (and does not do)

Build 214 **does**: capture the fresh guarded signed approval (names/booleans/codes only), record the next
decision packet and the fail-closed send-time preflight checklist, **prove dynamically** that the guarded runner
resolves exactly R1 and the guard blocks generic/non-approved copy, update the launch-readiness summary, and
carry forward the primary remaining objective.

Build 214 **does not**: send an SMS, construct a Twilio client, call `messages.create`, arm the confirm token,
run any retry, run the live execution runner live, make any Twilio/network/external call, contact any roofer or
homeowner, read/store/record any secret value/SID/token/recipient phone number/production data, authorize a send
now, authorize expansion, authorize homeowner contact, activate live automation, add any public route/cron/
scheduler/webhook/dispatcher/billing/quote/invoice/deposit/email/call/calendar/CRM automation, or touch schema/
auth/RLS/security. All broader live automation remains **disabled**. Capturing approval is **not** a send.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message delivered (1 attempt, no retry); content was generic delivery-test copy |
| Pilot SMS copy selection (Build 210) | **R1 selected** |
| R1 SMS send approval (Build 211) | fresh signed approval captured (consumed/expired in Build 212) |
| R1 SMS send closeout (Build 212) | delivery succeeded (1 attempt, no retry); approval consumed/expired |
| R1 content-mismatch feedback + fix (Build 213) | received copy was generic; root cause fixed; **binding fixed + fail-closed guard + verified locally** |
| R1 guarded send approval (Build 214) | **new fresh signed guarded approval captured**; runner resolves R1 (verified); `R1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

## Primary remaining objective (carried forward)

**Get RoofLeadHQ to live roofer workflow testing and selling within the next few days.** Keep required gate
builds lean; every artifact must directly support the next guarded one-message R1 send. The fewest-build path:
Build 214 captures the guarded approval (**done**) → Jason runs the send-time preflight then the guarded
one-message runner exactly once (no retry) → Build 215 closes out the send and captures roofer feedback
confirming the received text equals the R1 value message → then decide pilot expansion (each consenting roofer
with its own signed approval) before any selling.

## Artifacts

| Artifact | Path |
| --- | --- |
| Guarded send signed approval packet | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-214.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-214.json` |
| Read-only verifier | `backend/scripts/verify-r1-sms-send-approval-build-214-readonly.js` |
| Dry-run wrapper | `scripts/run-r1-sms-send-approval-build-214-dry-run.sh` |
| Prior binding-fix packet (Build 213) | `backend/fixtures/native-workflow-demo-roofer/r1-sms-content-mismatch-feedback-build-213.json` |
| Guarded live runner (binding fixed in Build 213) | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_SEND_APPROVAL_BUILD_214.md` |

## How to run (local-only, read-only)

```bash
# Full local-only guarded approval capture verification + dry-run wrapper
bash scripts/run-r1-sms-send-approval-build-214-dry-run.sh

# Verifier on its own
node backend/scripts/verify-r1-sms-send-approval-build-214-readonly.js
```

## What still gates any further live send

This build **captures the fresh guarded approval** but performs **no send**, **no retry**, and makes no
Twilio/network call. Before any send, Jason must run the **send-time preflight** and then the now-guarded
fail-closed one-message runner **exactly once with no retry** in his own controlled environment, entering the
destination **silently outside repo/chat/logs**. The runner's fail-closed guard **blocks any send whose body is
not exactly the approved R1 text** and explicitly rejects the stale generic copy. The approval is single-use and
**expires after one attempt whether sent or failed**. Launch remains **pilot-gated, not unrestricted**, and the
safety posture stays `demo_ready_with_live_automation_disabled`.
