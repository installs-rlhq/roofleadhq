# Native Workflow Fixture — Jason-Owned Test Identity Workflow Validation (Build 216)

**Type:** LOCAL-ONLY build that **pivots** the active pilot path from "small consenting roofer pilot
recipients" to **Jason-owned test identity workflow validation** — because there are **no consenting real
roofer pilot candidates available yet**. All initial roofer testing is done through **Jason-owned**
phone/email channels as owned test identities, recorded by **labels only** (no raw phone numbers or email
addresses).
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL`** — the leanest path is now to validate the
full lead-to-roofer workflow using Jason-owned channels first, then package that proof for sales conversations
and recruit real roofer pilots. **No send** is performed in this build. No SMS, no email, no Twilio, no
call/calendar provider, no network/external call, no retry, no live-runner execution, no confirm token armed,
no homeowner contact, no real roofer contact, no live automation, and no unrestricted launch.

## Why this build exists

Build 215 proved **guarded R1 live SMS delivery** and **exact approved-copy binding** (the recipient confirmed
the actual received text matched the approved R1 message exactly). The next step was a small consenting roofer
workflow validation packet — but **Jason currently has no consenting real roofer pilot candidates**. So Build
216 pivots to **Jason-owned test identity workflow validation first**, without losing the business goal: get
RoofLeadHQ to live workflow testing and selling within the next few days, using **jason_owned** channels first,
then convert that proof into real roofer pilot/sales outreach. **Fewer, bigger, strategic builds only.**

Raw operational contact details Jason provided in chat are intentionally **not** recorded in repo/docs/logs.
Only **labels** are used: `jason_operator`, `jason_owned_sms_destination`, `jason_owned_email_destination`,
`Test Roofing`, `test_roofing_twilio_sender`.

## 1. Jason-owned pilot constraint evidence

| Field | Value |
| --- | --- |
| no_real_roofer_pilot_candidates_available | **true** |
| initial_testing_uses_jason_owned_channels | **true** |
| actual_phone_email_values_recorded | **false** |
| label_only_test_identities_required | **true** |
| homeowner_contact_authorized | **false** |
| real_roofer_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## 2. Owned test identities (labels only)

`jason_as_test_roofer_label`, `jason_as_test_homeowner_label` (draft-only / not contacted),
`jason_as_operator_label`, `owned_sms_destination_label_only`, `owned_email_destination_label_only`.
**No raw phone numbers. No raw email addresses.** Operational labels: `jason_operator`,
`jason_owned_sms_destination`, `jason_owned_email_destination`, `Test Roofing`, `test_roofing_twilio_sender`.

## 3. Fastest Jason-owned workflow validation plan (business-critical only)

1. A fake/owned lead comes in.
2. RoofLeadHQ recognizes it as a roofing lead / inspection request.
3. The system prepares or sends **only an explicitly approved, Jason-operated** notification to a Jason-owned
   roofer identity.
4. The message binding is **exact and guarded** — the outbound body must equal the approved copy.
5. Jason confirms receipt and value.
6. The lead status / follow-up summary is visible locally.
7. The output can be shown in a sales conversation.

Live action is allowed **only after a fresh, signed, per-attempt approval**. No homeowner contact. No real
roofer contact.

## 4. Validation scenarios (5)

| Scenario | Inbound lead type | Roofer-facing output | Channel | Feedback question |
| --- | --- | --- | --- | --- |
| `new_roof_inspection_lead_alert` (required) | new owned-test inspection request | fast SMS new-lead alert | sms | Did it arrive, match the approved copy, and read as useful? |
| `missed_or_slow_lead_follow_up_nudge` (required) | owned-test lead with no first reply | SMS follow-up nudge | sms | Did the nudge arrive at the right moment and feel helpful? |
| `daily_open_lead_recap` (required) | aggregate of open owned-test leads | internal daily recap | internal | Is the recap clear, accurate, and worth checking each morning? |
| `lead_source_routing_flag` (optional) | owned-test lead with a source label | internal source/routing flag | internal | Is the routing flag visible and correct locally? |
| `homeowner_consent_boundary_reminder` (optional) | owned-test lead implying homeowner outreach | internal consent-boundary reminder | internal | Does it keep homeowner outreach blocked until separately approved? |

Every scenario gates live action behind a fresh approval.

## 5. Message set (roofer-facing; opt-out where SMS; no forbidden claims)

Roofer-facing messages only. **No** guarantee / booked-jobs / estimate / quote / invoice / payment / deposit
language. SMS messages include **opt-out** (`Reply STOP to opt out`). Homeowner-facing copy is **draft-only and
not approved**.

- **M1 (sms):** New roof inspection lead alert with a fast-first-reply prompt + opt-out.
- **M2 (sms):** Missed/slow lead follow-up nudge + opt-out.
- **M3 (internal):** Daily open-lead recap.
- **M4 (internal):** Lead source/routing flag.
- **M5 (internal):** Homeowner consent boundary reminder.
- **H1_DRAFT (draft-only, not approved):** Homeowner acknowledgement draft — requires separate consent + a
  separate signed approval before it could ever be considered.

## 6. Lindy decision

Lindy should **not** own the product workflow. Lindy may remain a **temporary bridge only** to help
capture/organize owned test leads or notify Jason internally. Lindy must **not** autonomously
text/email/call/book/sync CRM/contact homeowners/contact roofers. **Audit status: `pending_lindy_audit`.**
Recommended pilot mode: **internal notify / organize only**. `lindy_live_enabled=false`.

## 7. Sales-demo-readiness checklist

- owned workflow proof complete *(pending)*
- one clean demo story *(pending)*
- one screenshot/evidence packet with **no secrets/phone/email values** *(pending)*
- simple offer: **$399–$799/mo + $499 setup, 14-day trial after go-live** *(ready)*
- sales conversation script points *(ready)*
- pilot next step: **"I can test this with your inbound leads under manual approval first."** *(ready)*

## 8. Strategic next decision packet

| Field | Value |
| --- | --- |
| decision | **JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL** |
| recommended_next_option | **run_owned_identity_workflow_validation_scenarios_after_fresh_approval** |
| authorizes_send_now | **false** |
| next_live_send_requires_new_fresh_signed_approval | **true** |
| unrestricted_launch | **false** |
| homeowner_contact_authorized | **false** |
| real_roofer_contact_authorized | **false** |
| live_automation_remains_disabled | **true** |

## 10. Active context / handoff (this is the active path)

- **Jason-owned testing first** using label-only identities.
- **Sales/demo readiness within days.**
- **Recruit real roofer pilots after** the owned workflow proof.
- **Fewer, bigger, strategic builds only.**

This supersedes the Build 215 "small consenting roofer workflow validation packet" path, which assumed
consenting roofer candidates that do not exist yet. The business goal is preserved.

## What Build 216 does (and does not do)

Build 216 **does**: capture the Jason-owned pilot constraint, label-only identities, the lean owned workflow
validation plan, the validation scenarios, the roofer-facing message set, the Lindy decision, the
sales-demo-readiness checklist, the next decision packet, and the active context/handoff path; update the
launch-readiness summary; preserve the safety posture.

Build 216 **does not**: send an SMS or email, construct a Twilio client, call `messages.create`, call any
call/calendar provider, arm the confirm token, run any retry, run the live execution runner, make any
network/external call, contact any roofer or homeowner, read/store/record any secret value/SID/token/phone
number/email address/production data, authorize a send now, authorize unrestricted launch, authorize homeowner
contact, activate live automation, or add any public route/cron/scheduler/webhook/dispatcher/billing/quote/
invoice/deposit/email/call/calendar/CRM automation, or touch schema/auth/RLS/security. All broader live
automation remains **disabled**. Capturing this packet is **not** a send.

## Artifacts

| Artifact | Path |
| --- | --- |
| Jason-owned workflow validation packet | `backend/fixtures/native-workflow-demo-roofer/jason-owned-workflow-validation-build-216.json` |
| Launch-readiness summary | `backend/fixtures/native-workflow-demo-roofer/launch-readiness-summary-build-216.json` |
| Read-only verifier | `backend/scripts/verify-jason-owned-workflow-validation-build-216-readonly.js` |
| Dry-run wrapper | `scripts/run-jason-owned-workflow-validation-build-216-dry-run.sh` |
| Prior guarded R1 send closeout (Build 215) | `backend/fixtures/native-workflow-demo-roofer/r1-sms-send-closeout-build-215.json` |
| This runbook | `docs/NATIVE_WORKFLOW_FIXTURE_JASON_OWNED_WORKFLOW_VALIDATION_BUILD_216.md` |

## How to run (local-only, read-only)

```bash
# Full local-only Jason-owned workflow validation verification + dry-run wrapper
bash scripts/run-jason-owned-workflow-validation-build-216-dry-run.sh

# Verifier on its own
node backend/scripts/verify-jason-owned-workflow-validation-build-216-readonly.js
```

## What still gates any further live send

This build performs **no send**, **no retry**, and makes no Twilio/network/email call. Before any live step,
Jason must capture a **NEW fresh signed per-attempt approval**, run the **send-time preflight**, and then the
guarded fail-closed one-message runner **exactly once with no retry** in his own controlled environment,
entering the Jason-owned destination **silently outside repo/chat/logs**. Launch remains **pilot-gated, not
unrestricted**, and the safety posture stays `demo_ready_with_live_automation_disabled`.
