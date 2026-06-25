# Native Workflow Fixture — R1 SMS Content-Mismatch Feedback + Root-Cause Triage + Message-Binding FIX (Build 213)

**Type:** LOCAL-ONLY build that (1) **captures the post-send recipient feedback discrepancy** on the one
approved, Jason-operated controlled live **roofer** SMS send that Build 212 closed out, (2) performs a
**LOCAL-ONLY root-cause triage** of why the received message content remained the older **generic
delivery-test copy** instead of the Build 210/211 selected variant **R1** (`new_lead_fast_response_alert`),
and (3) **FIXES the local send-message binding now** so the outbound body is bound to the approved selected
variant, with a **fail-closed guard** that blocks any send from stale/non-approved copy.
Records **names/booleans/codes only**. The fix is a **local code change only — it does not send**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND`**
— the message binding is fixed and verified locally; the next step is to capture a **new, fresh, signed,
per-attempt approval** and a send-time preflight before any one Jason-operated R1 SMS. **No send** is
performed in this build. No retry, no Twilio call, no live-runner live execution, no confirm token armed, no
homeowner contact, no live automation, and no unrestricted launch.

## Why this build exists

Build 212 closed out one approved Jason-operated controlled live R1 SMS send: `sms_sent=true`,
`send_attempt_count=1`, `retry_performed=false`, `final_decision=CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT`, and
the single-use approval was **consumed and expired**. The decision was
`R1_CONTROLLED_LIVE_SMS_SENT_FEEDBACK_REQUIRED` — collect roofer feedback only.

Jason's feedback after Build 212: the SMS was **received** (delivery succeeded), but the **actual received
text was still the generic delivery-test copy**, not the selected R1 value messaging. Jason's note: *"This is
just a test text... So when we get ready for live roofer testing, the types of texts will be evaluated and
adjusted at that time."* Build 213 **captures that discrepancy**, **root-causes it locally**, and **fixes the
binding**: delivery mechanics are validated, but **R1 value messaging was NOT validated** by that send, so
future sends are blocked until the resolved outbound message equals the approved selected variant.

## Feedback discrepancy evidence (names/booleans/codes only)

| Field | Value |
| --- | --- |
| feedback_captured | **true** |
| sms_received_status | **yes** |
| actual_received_message_label | **generic_delivery_test_copy** |
| expected_selected_variant | **R1** |
| expected_selected_variant_label | **new_lead_fast_response_alert** |
| actual_message_matches_expected_r1 | **false** |
| delivery_mechanics_validated | **true** |
| r1_value_messaging_validated | **false** |
| approval_consumed | **true** |
| approval_expired_after_attempt | **true** |
| retry_allowed | **false** |
| no_retry_performed | **true** |

**Actual received text (for analysis — the generic delivery-test copy):**

> "RoofLeadHQ controlled live test: one-message SMS to your own consenting test identity (Test Roofing). No
> action needed."

**Expected selected variant R1 (Build 210/211 — roofer-facing, SMS-only, opt-out included):**

> "RoofLeadHQ: New roofing lead just came in. A quick first reply now helps you reach them while they're
> still looking. Reply STOP to opt out."

The verifier confirms the **expected R1 text matches the Build 210 selection and the Build 211 approval
exactly**, and that the **actual received text differs from it** (the mismatch is real).

## Root-cause triage (local file inspection only)

| Field | Value |
| --- | --- |
| root_cause_status | **send_script_hardcoded_generic_body_and_missing_selected_variant_binding** |
| hardcoded_generic_text_in_send_script (before fix) | **true** |
| missing_selected_variant_binding (before fix) | **true** |
| stale_fixture_lookup | **false** |
| wrong_fixture_reference | **false** |
| send_path_references_to_R1_or_selected_variant_before_fix_count | **0** |

**Root cause summary:** The existing fail-closed one-message runner
(`backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`, originally Build
186) constructed the Twilio `messages.create` body from a **hardcoded generic delivery-test string literal**
and contained **no reference to, lookup of, or binding to** the Build 210/211 selected approved variant R1.
Because the send body was static and **predated the Build 210 R1 copy selection**, the one approved send
delivered the generic delivery-test copy regardless of the R1 selection/approval. This was **not** a
stale-fixture lookup or a wrong-fixture reference (the body was not sourced from any fixture at all); the
defect was a **hardcoded generic body plus a missing selected-variant binding**, with **no
selected-variant-equals-sent-body assertion** in the send-time preflight.

**Local files inspected (by name; no secrets/numbers/SIDs read or recorded):**

- `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json`
- `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-212.json`
- `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json`
- `backend/fixtures/native-workflow-demo-roofer/pilot-sms-copy-selection-build-210.json`

## The fix (local code change only — no send)

The runner's outbound body is no longer a hardcoded generic literal. It is **bound to the approved selected
variant text** read from the current signed approval packet
(`r1-sms-send-approval-build-211.json` → `signed_approval_capture_evidence.selected_variant_text`). The
approved-variant source is **explicit and verified**.

- `resolveApprovedVariant()` / `resolveOutboundBody()` resolve the outbound body from the signed approval
  packet (R1), not from any hardcoded copy.
- `assertOutboundBodyMatchesApprovedVariant()` is a **fail-closed guard**: it blocks the send unless the
  resolved outbound body **exactly equals** the approved selected variant text, explicitly rejects the known
  **stale generic delivery-test copy**, blocks any non-approved or empty body, and fails closed when the
  approved variant is unavailable or the approval packet is not signed/granted.
- The guard is asserted at the preflight gate **and re-asserted immediately before `messages.create`**
  (defense in depth). **No live send may proceed from stale generic message copy.**
- The pure helpers are **exported** and the live execution path is guarded behind `require.main === module`,
  so a read-only verifier can `require` the module and prove the resolved body **without any send, Twilio
  client, or network call** (requiring the module is side-effect-free).

| Field | Value |
| --- | --- |
| fix_applied_in_this_build | **true** |
| fixed_file | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js` |
| approved_variant_source_path | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-approval-build-211.json` |
| outbound_body_now_bound_to_approved_selected_variant | **true** |
| hardcoded_generic_body_removed_from_send_path | **true** |
| resolved_outbound_message_equals_r1 | **true** |
| resolved_outbound_message_equals_generic | **false** |
| fail_closed_message_guard_added | **true** |
| runner_require_is_side_effect_free_no_send_no_exit | **true** |

## Local proof (read-only, no send)

The Build 213 verifier `require`s the actual runner module (side-effect-free) and proves, dynamically:

- `runner.resolveOutboundBody() === R1 text` and `!== generic delivery-test copy`.
- `runner.assertOutboundBodyMatchesApprovedVariant(R1, approved)` returns **no** block reasons (permitted).
- the same guard **blocks** the stale generic copy (flagging `outbound_body_is_stale_generic_delivery_test_copy`),
  blocks any non-approved body, and blocks an empty body.
- the runner's `messages.create` body is bound to `resolvedBody`, not a hardcoded generic literal; the
  approved-variant source is the explicit signed approval packet; the one-message cap and `no-retry` posture
  are preserved.

## Future-send blocker

| Field | Value |
| --- | --- |
| decision | **R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND** |
| recommended_next_option | **capture_new_fresh_signed_approval_then_send_time_preflight_before_one_jason_operated_r1_sms** |
| content_mismatch_root_cause_fixed_locally | **true** |
| message_binding_verified_locally_equals_r1_not_generic | **true** |
| authorizes_send_now | **false** |
| next_live_send_requires_new_fresh_signed_approval | **true** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## Homeowner-facing copy boundary

**Homeowner-facing SMS is NOT approved.** This discrepancy, triage, and message-binding fix concern the one
roofer-facing controlled live test SMS only. `homeowner_facing_sms_approved_now=false`,
`requires_separate_consent_and_approval=true`, `homeowner_contact_authorized=false`,
`approved_for_homeowner_send=false`. Any homeowner-facing message requires separate consent capture and a
separate signed approval.

## What Build 213 does (and does not do)

Build 213 **does**: capture the post-send feedback discrepancy, record the local-only root-cause triage
(`root_cause_status=send_script_hardcoded_generic_body_and_missing_selected_variant_binding`) with the exact
local files inspected, **apply the local message-binding fix**, **add the fail-closed guard**, prove the
resolved outbound message equals R1 (and not generic copy) read-only, record the future-send blocker, update
the launch-readiness summary, and carry forward the primary remaining objective.

Build 213 **does not**: send an SMS, send any additional SMS, construct a Twilio client, call
`messages.create`, arm the confirm token, run any retry, run the live execution runner live, make any
Twilio/network/external call, contact any roofer or homeowner, read/store/record any secret value/SID/token/
recipient phone number/production data, authorize a send now, authorize expansion, authorize homeowner
contact, activate live automation, add any public route/cron/scheduler/webhook/dispatcher/billing/quote/
invoice/deposit/email/call/calendar/CRM automation, or touch schema/auth/RLS/security. All broader live
automation remains **disabled**. The fix is a code change only — **no send**.

## Primary remaining objective (carried forward)

**Get RoofLeadHQ to live roofer workflow testing and selling within the next few days.**

**Build strategy:** fewer, bigger, strategic builds only; no rework; no non-focused capture/template/doc-only
builds unless strictly required to unblock a real safety/live gate; every build must materially advance live
roofer testing, workflow validation, selling readiness, or a blocking safety fix; if a root cause can be
identified and safely fixed locally in the same build, do it in the same build; do not split
triage/fix/capture into separate builds unless absolutely necessary; ask for Claude insight when a strategic
decision can avoid wasted work; preserve hard safety rules but optimize for momentum toward a live functional
business.

## Launch-readiness summary (where we stand)

| Lane | Result |
| --- | --- |
| Local suite | 30 / 30 passed |
| Mock adapter suite | 30 / 30 passed |
| Sandbox / test SMS | simulated safely (no live send) |
| Controlled live SMS to Jason | one message delivered (1 attempt, no retry); content was generic delivery-test copy |
| Pilot SMS copy selection (Build 210) | **R1 selected** for next controlled roofer pilot review |
| R1 SMS send approval (Build 211) | **Jason's fresh signed approval captured** for one Jason-operated R1 SMS |
| R1 SMS send closeout (Build 212) | **delivery succeeded** (1 attempt, no retry); approval **consumed/expired** |
| R1 SMS content-mismatch feedback + fix (Build 213) | **received copy remained generic delivery-test copy**; **R1 value messaging not validated**; root cause = **hardcoded generic body + missing_selected_variant_binding**; **binding fixed + fail-closed guard added + verified locally**; `R1_SMS_MESSAGE_BINDING_FIXED_AND_VERIFIED_LOCALLY_NEW_SIGNED_APPROVAL_REQUIRED_BEFORE_NEXT_SEND` |
| Homeowner contact | **not authorized** (separate consent + approval required) |
| Broader live automation | all remains disabled |

**Narrative:** SMS mechanics are proven and Build 212's send **succeeded technically**, but Build 213
feedback shows the received copy **remained the generic delivery-test copy** — **R1 value messaging is not
validated** by that send. The **root cause** is a **hardcoded** generic body and a
`missing_selected_variant_binding` in the live runner (no stale-fixture lookup, no wrong-fixture reference).
Build 213 **fixes** it: the outbound body is now bound to the approved selected variant and a **fail-closed**
**guard** (`resolveOutboundBody`/`assertOutboundBodyMatchesApprovedVariant`) blocks any send from stale or
non-approved copy. The single-use approval is **consumed and expired**; retry is **not allowed** and none was
performed. The fix is a local code change only and is **not** a send. The next step is to capture a **new,
fresh, signed, per-attempt approval** and a send-time preflight before one Jason-operated R1 SMS — not
unrestricted launch.

## Artifacts

| Artifact | Path |
| --- | --- |
| Content-mismatch feedback + triage + fix packet | `backend/fixtures/native-workflow-demo-roofer/r1-sms-content-mismatch-feedback-build-213.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-213.json` |
| Read-only verifier | `backend/scripts/verify-r1-sms-content-mismatch-build-213-readonly.js` |
| Dry-run wrapper | `scripts/run-r1-sms-content-mismatch-build-213-dry-run.sh` |
| Prior successful-closeout packet (Build 212) | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-212.json` |
| Live runner (message binding fixed in this build) | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js` |
| Preserved manual execution evidence (canonical) | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_R1_SMS_CONTENT_MISMATCH_BUILD_213.md` |

## How to run (local-only, read-only)

```bash
# Full local-only content-mismatch + root-cause triage + message-binding-fix verification + dry-run wrapper
bash scripts/run-r1-sms-content-mismatch-build-213-dry-run.sh

# Verifier on its own
node backend/scripts/verify-r1-sms-content-mismatch-build-213-readonly.js
```

## What still gates any further live send

This build **fixes and verifies the message binding locally** but performs **no send**, **no retry**, and
makes no Twilio/network call. The single-use approval is **consumed and expired**. Before any further live
send, Jason must capture a **new, fresh, signed, per-attempt approval**, run the send-time preflight, and run
the now-guarded fail-closed one-message runner **exactly once with no retry** in his own controlled
environment, entering the destination **silently outside repo/chat/logs**. The runner's fail-closed guard now
**blocks any send whose body is not exactly the approved selected variant (R1)** and explicitly rejects the
stale generic copy. This repo performs none of that. Launch remains **pilot-gated, not unrestricted**, and the
safety posture stays `demo_ready_with_live_automation_disabled`.
